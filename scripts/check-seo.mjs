import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

// Run against `npm run start -- --port 3100` after a production build.
// Requests stay on loopback even when simulating Vercel's domain routing.
const primaryOrigin = "https://www.berkekatranci.com";
const applicationHosts = [
  "berkekatranci.com",
  "www.berkekatranci.com",
  "garibanadam.com",
  "www.garibanadam.com",
  "example.vercel.app"
];
const indexablePaths = [
  "/",
  "/projects/weather-forecasting",
  "/projects/lane-detection",
  "/projects/hardware-aware-gpt"
];
const legalPaths = ["/privacy", "/impressum"];
const retiredAliasPaths = ["/gariban-adam", "/garibanadam", "/gariban_adam"];
// Keep this expectation independent of the application's schema exports.
const expectedAliases = [
  "Berke Katranci",
  "Gariban Adam", "garibanadam", "gariban-adam", "gariban_adam",
  "Fakir Adam", "fakiradam", "fakir-adam", "fakir_adam",
  "Fakfakir Adam", "fakfakiradam", "fakfakir-adam", "fakfakir_adam",
  "Fak Fakir Adam", "fak-fakir-adam", "fak_fakir_adam"
];
let checks = 0;
const failures = [];

function check(condition, message) {
  assert.ok(condition, message);
  checks += 1;
}

function equal(actual, expected, message) {
  assert.equal(actual, expected, message);
  checks += 1;
}

function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (entity, name) => {
    if (/^#x/i.test(name)) return String.fromCodePoint(parseInt(name.slice(2), 16));
    if (name.startsWith("#")) return String.fromCodePoint(parseInt(name.slice(1), 10));
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[name.toLowerCase()] ?? entity;
  });
}

function attributes(tag) {
  const result = {};
  const body = tag.replace(/^<\/?[\w:-]+\s*/, "").replace(/\/?\s*>$/, "");
  const pattern = /([^\s=\/"'>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of body.matchAll(pattern)) {
    result[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(([tag]) => attributes(tag));
}

function meta(html, attribute, value) {
  return tags(html, "meta")
    .filter((tag) => tag[attribute]?.toLowerCase() === value.toLowerCase())
    .map((tag) => tag.content ?? "");
}

function single(values, message) {
  equal(values.length, 1, message);
  return values[0];
}

function canonical(html) {
  return single(
    tags(html, "link")
      .filter((tag) => tag.rel?.toLowerCase().split(/\s+/).includes("canonical"))
      .map((tag) => tag.href),
    "expected exactly one canonical link"
  );
}

function schemaObjects(html) {
  const objects = [];
  function visit(value) {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    objects.push(value);
    Object.values(value).forEach(visit);
  }
  const scripts = [...html.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script\s*>/gi)]
    .filter((match) => attributes(match[1]).type === "application/ld+json");
  check(scripts.length > 0, "expected JSON-LD scripts");
  for (const [, , content] of scripts) {
    check(!content.includes("<"), "JSON-LD must escape raw '<' characters");
    visit(JSON.parse(content));
    checks += 1;
  }
  return objects;
}

function hasType(object, type) {
  return [object["@type"]].flat().includes(type);
}

function checkVisibleBody(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i)?.[1];
  check(typeof body === "string", "expected a rendered body");
  // SEO metadata and JSON-LD may contain the alias; page content may not.
  const content = body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const text = decodeHtml(content.replace(/<[^>]*>/g, " "));
  check(!/\b(?:gariban|fakir|fak[\s_-]*fakir)[\s_-]*adam\b/i.test(text), "visible page text should not contain SEO-only aliases");
  check(
    tags(content, "a").every((tag) => {
      if (!tag.href) return true;
      const pathname = decodeURIComponent(new URL(tag.href, primaryOrigin).pathname).replace(/\/+$/, "") || "/";
      return !/^\/(?:gariban|fakir|fak[\s_-]*fakir)[\s_-]*adam$/i.test(pathname);
    }),
    "page content should not link to SEO-only alias routes"
  );
}

// These edge maps are fixtures, not inferred from application redirect rules.
// The www map matches the live domain headers observed on 2026-11-21.
// The reverse map guards against the same bug if the Vercel preference changes.
const platformTopologies = [
  {
    name: "Vercel apex/aliases to www",
    terminalHost: "www.berkekatranci.com",
    redirects: new Map([
      ["berkekatranci.com", "www.berkekatranci.com"],
      ["garibanadam.com", "www.berkekatranci.com"],
      ["www.garibanadam.com", "www.berkekatranci.com"]
    ])
  },
  {
    name: "reverse Vercel www/aliases to apex",
    terminalHost: "berkekatranci.com",
    redirects: new Map([
      ["www.berkekatranci.com", "berkekatranci.com"],
      ["garibanadam.com", "berkekatranci.com"],
      ["www.garibanadam.com", "berkekatranci.com"]
    ])
  }
];

async function traceRedirects(start, edgeRedirects, applicationStep, maxHops = 4) {
  let current = new URL(start);
  const visited = new Set();
  const hops = [];

  for (;;) {
    if (visited.has(current.href)) return { outcome: "cycle", url: current, hops };
    visited.add(current.href);

    const edgeHost = edgeRedirects.get(current.hostname);
    let layer = "application";
    let response;
    if (edgeHost) {
      const target = new URL(current);
      target.hostname = edgeHost;
      response = { status: 308, location: target.href };
      layer = "platform";
    } else {
      response = await applicationStep(current);
    }

    if (![301, 302, 303, 307, 308].includes(response.status)) {
      return { outcome: "complete", status: response.status, url: current, hops };
    }
    if (!response.location) return { outcome: "missing-location", url: current, hops };
    if (hops.length >= maxHops) return { outcome: "limit", url: current, hops };

    const target = new URL(response.location, current);
    hops.push({ layer, status: response.status, from: current.href, to: target.href });
    current = target;
  }
}

async function group(label, action) {
  try {
    await action();
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
  }
}

async function main() {
  const base = new URL(process.argv[2] ?? "http://localhost:3100");
  check(
    ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname) &&
      ["http:", "https:"].includes(base.protocol) &&
      !base.username && !base.password && !base.search && !base.hash && base.pathname === "/",
    "base URL must be a loopback HTTP(S) origin, for example http://localhost:3100"
  );

  async function request(path, options = {}) {
    const url = new URL(path, base);
    assert.equal(url.origin, base.origin, "audit requests must stay on the loopback origin");
    // Native http preserves an explicit Host header; some Node fetch versions
    // replace it, which would leave the domain redirect rules untested.
    return new Promise((resolve, reject) => {
      const transport = url.protocol === "https:" ? httpsRequest : httpRequest;
      const timer = setTimeout(() => req.destroy(new Error("request timed out after 15 seconds")), 15000);
      const req = transport(url, { method: "GET", headers: options.headers }, (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("error", reject);
        response.on("end", () => {
          clearTimeout(timer);
          const headers = new Headers();
          for (const [name, value] of Object.entries(response.headers)) {
            if (Array.isArray(value)) value.forEach((entry) => headers.append(name, entry));
            else if (value !== undefined) headers.set(name, value);
          }
          resolve(new Response(Buffer.concat(chunks), {
            status: response.statusCode,
            statusText: response.statusMessage,
            headers
          }));
        });
      });
      req.on("error", (error) => {
        clearTimeout(timer);
        reject(error);
      });
      req.end();
    });
  }

  const titles = new Set();
  const descriptions = new Set();
  const imageUrls = new Set();

  for (const path of indexablePaths) {
    await group(path, async () => {
      const response = await request(path);
      equal(response.status, 200, "page should return 200");
      const html = await response.text();
      checkVisibleBody(html);
      const title = decodeHtml(single(
        [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((match) => match[1]),
        "expected exactly one title"
      )).trim();
      const description = single(meta(html, "name", "description"), "expected exactly one description").trim();
      check(title.length > 0 && !titles.has(title), "title must be nonempty and unique");
      check(description.length > 0 && !descriptions.has(description), "description must be nonempty and unique");
      equal(single(meta(html, "property", "og:title"), "expected one OG title"), title, "OG title should match page title");
      equal(single(meta(html, "property", "og:description"), "expected one OG description"), description, "OG description should match page description");
      equal(single(meta(html, "name", "twitter:title"), "expected one Twitter title"), title, "Twitter title should match page title");
      equal(single(meta(html, "name", "twitter:description"), "expected one Twitter description"), description, "Twitter description should match page description");
      equal(single(meta(html, "name", "twitter:card"), "expected one Twitter card"), "summary_large_image", "Twitter card type");
      titles.add(title);
      descriptions.add(description);
      equal(new URL(canonical(html)).href, new URL(path, primaryOrigin).href, "canonical should identify this primary-domain page");
      equal(tags(html, "h1").length, 1, "expected exactly one H1");
      const robots = single(meta(html, "name", "robots"), "expected exactly one robots tag");
      check(/\bindex\b/i.test(robots) && !/\bnoindex\b/i.test(robots), "production page should be indexable");
      check(/\bfollow\b/i.test(robots), "production page should allow following links");
      equal(new URL(single(meta(html, "property", "og:url"), "expected one og:url")).href, new URL(path, primaryOrigin).href, "og:url should match canonical");
      const images = meta(html, "property", "og:image");
      check(images.length > 0, "expected Open Graph image");
      for (const image of images) {
        const imageUrl = new URL(image);
        equal(imageUrl.origin, primaryOrigin, "OG image must use primary origin");
        check(imageUrl.pathname.startsWith("/opengraph-image"), "expected generated OG image route");
        imageUrls.add(imageUrl.href);
      }
      const twitterImages = meta(html, "name", "twitter:image");
      check(twitterImages.length > 0, "expected Twitter image");
      for (const image of twitterImages) {
        const imageUrl = new URL(image);
        equal(imageUrl.origin, primaryOrigin, "Twitter image must use primary origin");
        check(images.some((ogImage) => new URL(ogImage).pathname === imageUrl.pathname), "Twitter and OG images should use the same generated image route");
      }
      const schemas = schemaObjects(html);
      const person = schemas.find((object) => hasType(object, "Person"));
      check(Boolean(person), "expected Person schema");
      equal(person.name, "Berke Katrancı", "Person schema name");
      for (const alias of expectedAliases) {
        check(person.alternateName?.includes(alias), `Person schema should include ${alias}`);
      }
      const profiles = schemas.filter((object) => hasType(object, "ProfilePage"));
      const websites = schemas.filter((object) => hasType(object, "WebSite"));
      if (path === "/") {
        equal(websites.length, 1, "homepage should have one WebSite schema");
        const website = websites[0];
        equal(website["@id"], `${primaryOrigin}/#website`, "WebSite identifier");
        equal(new URL(website.url).href, `${primaryOrigin}/`, "WebSite URL should be the canonical root");
        equal(website.name, "Berke Katrancı", "WebSite should retain the primary brand name");
        assert.deepEqual(website.alternateName, ["Gariban Adam"], "WebSite alternate name should identify the established domain nickname only");
        checks += 1;
        equal(website.publisher?.["@id"], person["@id"], "WebSite publisher should reference the same Person");
        equal(profiles.length, 1, "homepage should have one ProfilePage schema");
        const profile = profiles[0];
        equal(profile.url, new URL(path, primaryOrigin).href, "ProfilePage should identify this page");
        equal(profile.mainEntity?.["@id"], person["@id"], "ProfilePage should reference the same Person");
        equal(profile.inLanguage, "en", "homepage ProfilePage language should be English");
      } else {
        equal(profiles.length, 0, "ProfilePage should only describe the homepage");
        equal(websites.length, 0, "WebSite schema should only describe the homepage");
      }
    });
  }

  await group("robots.txt", async () => {
    const response = await request("/robots.txt");
    equal(response.status, 200, "robots should return 200");
    const body = await response.text();
    check(/^User-Agent:\s*\*\s*$/im.test(body), "robots should address all crawlers");
    check(/^Allow:\s*\/\s*$/im.test(body), "production robots should allow crawling");
    check(!/^Disallow:\s*\/\s*$/im.test(body), "production robots should not disallow all");
    check(body.includes(`Sitemap: ${primaryOrigin}/sitemap.xml`), "robots should advertise the primary-domain sitemap");
  });

  await group("sitemap.xml", async () => {
    const response = await request("/sitemap.xml");
    equal(response.status, 200, "sitemap should return 200");
    const urls = [...(await response.text()).matchAll(/<loc>([\s\S]*?)<\/loc>/g)]
      .map((match) => decodeHtml(match[1].trim()));
    equal(urls.length, indexablePaths.length, "sitemap should contain exactly four URLs");
    equal(new Set(urls).size, urls.length, "sitemap should not contain duplicates");
    assert.deepEqual(urls.sort(), indexablePaths.map((path) => new URL(path, primaryOrigin).href).sort(), "sitemap should contain only canonical indexable pages");
    checks += 1;
    check(legalPaths.every((path) => !urls.includes(new URL(path, primaryOrigin).href)), "legal placeholders should not be in sitemap");
  });

  for (const path of legalPaths) {
    await group(path, async () => {
      const response = await request(path);
      equal(response.status, 200, "legal page should return 200");
      const html = await response.text();
      checkVisibleBody(html);
      check(meta(html, "name", "robots").some((value) => /\bnoindex\b/i.test(value)), "legal placeholder should be noindex");
      equal(new URL(canonical(html)).href, new URL(path, primaryOrigin).href, "legal page canonical should identify itself");
    });
  }

  const query = "?ref=seo-check&variant=gariban%20adam";
  for (const host of applicationHosts) {
    for (const path of ["/", "/projects/lane-detection"]) {
      await group(`${host}${path} application response`, async () => {
        const response = await request(`${path}${query}`, { headers: { host } });
        equal(response.status, 200, "application should serve all hosts without duplicating Vercel domain redirects");
        equal(response.headers.get("location"), null, "application should not add a host redirect");
        equal(new URL(canonical(await response.text())).href, new URL(path, primaryOrigin).href, "all served hosts should retain the selected www canonical");
      });
    }

    for (const alias of retiredAliasPaths) {
      await group(`${host}${alias} bounded path redirect`, async () => {
        const logicalUrl = new URL(`${alias}${query}`, `https://${host}`);
        const response = await request(`${alias}${query}`, { headers: { host } });
        equal(response.status, 308, "retired alias should redirect permanently");
        const locationHeader = response.headers.get("location");
        check(locationHeader?.startsWith("/") && !locationHeader.startsWith("//"), "alias redirect should remain a relative path");
        const location = new URL(locationHeader, logicalUrl);
        equal(location.origin, logicalUrl.origin, "path redirect should keep domain routing with Vercel");
        equal(location.pathname, "/", "retired alias route should target the homepage");
        equal(location.search, query, "alias redirect should preserve query parameters");

        const landing = await request(`${location.pathname}${location.search}`, { headers: { host: location.host } });
        equal(landing.status, 200, "retired alias should reach a page after one application redirect");
        equal(landing.headers.get("location"), null, "retired alias landing should not redirect again");
      });
    }
  }

  async function runtimeStep(url) {
    const response = await request(`${url.pathname}${url.search}`, { headers: { host: url.host } });
    return { status: response.status, location: response.headers.get("location") };
  }

  await group("legacy two-layer loop regression fixture", async () => {
    const topology = platformTopologies[0];
    // This deliberately restores the old app-level www -> apex rule on top
    // of the platform's observed apex -> www redirect, without changing code.
    const legacyStep = async (url) => {
      if (url.hostname === "www.berkekatranci.com") {
        const target = new URL(url);
        target.hostname = "berkekatranci.com";
        return { status: 308, location: target.href };
      }
      return runtimeStep(url);
    };
    const result = await traceRedirects(`https://berkekatranci.com/projects/lane-detection${query}`, topology.redirects, legacyStep);
    equal(result.outcome, "cycle", "regression fixture must reproduce the original platform/app redirect loop");
    equal(result.hops.length, 2, "original conflict should cycle after two opposite domain redirects");
    check(result.hops.some(({ layer }) => layer === "platform") && result.hops.some(({ layer }) => layer === "application"), "cycle fixture should exercise both routing layers");
  });

  for (const topology of platformTopologies) {
    for (const host of applicationHosts) {
      for (const path of ["/projects/lane-detection", ...retiredAliasPaths]) {
        await group(`${topology.name}: ${host}${path}`, async () => {
          const result = await traceRedirects(`https://${host}${path}${query}`, topology.redirects, runtimeStep);
          equal(result.outcome, "complete", "combined platform/application graph should terminate without a cycle");
          equal(result.status, 200, "combined routing should end at a working page");
          equal(result.url.hostname, host.endsWith(".vercel.app") ? host : topology.terminalHost, "domain routing should honor the platform-selected host");
          equal(result.url.pathname, retiredAliasPaths.includes(path) ? "/" : path, "combined routing should retain the intended path");
          equal(result.url.search, query, "combined routing should preserve the query");
          check(result.hops.length <= (retiredAliasPaths.includes(path) ? 2 : 1), "combined routing should need at most one domain and one path redirect");
        });
      }
    }
  }

  await group("unknown project", async () => {
    const response = await request("/projects/seo-check-missing-case");
    equal(response.status, 404, "unknown project should return 404");
  });

  for (const image of imageUrls) {
    await group("Open Graph image", async () => {
      const imageUrl = new URL(image);
      const response = await request(`${imageUrl.pathname}${imageUrl.search}`);
      equal(response.status, 200, "generated OG image should return 200");
      check(response.headers.get("content-type")?.startsWith("image/png"), "OG image should be PNG");
      const png = Buffer.from(await response.arrayBuffer());
      check(png.length >= 24 && png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), "OG output should have a PNG signature");
      equal(png.readUInt32BE(16), 1200, "OG image width");
      equal(png.readUInt32BE(20), 630, "OG image height");
    });
  }

  if (failures.length) {
    failures.forEach((failure) => console.error(`FAIL ${failure}`));
    console.error(`SEO audit failed: ${failures.length} group(s), ${checks} checks passed.`);
    process.exitCode = 1;
  } else {
    console.log(`PASS ${checks} SEO checks across 4 pages, host responses, two-layer redirect regression, sitemap, robots, legal metadata, 404 and OG image.`);
  }
}

main().catch((error) => {
  console.error(`SEO audit failed: ${error.message}`);
  process.exitCode = 1;
});
