import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

// Run against `npm run start -- --port 3100` after a production build.
// Requests stay on loopback even when checking production URLs and Host redirects.
const primaryOrigin = "https://berkekatranci.com";
const indexablePaths = [
  "/",
  "/projects/weather-forecasting",
  "/projects/lane-detection",
  "/projects/hardware-aware-gpt"
];
const legalPaths = ["/privacy", "/impressum"];
const retiredAliasPaths = ["/gariban-adam", "/garibanadam", "/gariban_adam"];
const expectedAliases = ["Berke Katranci", "Gariban Adam", "garibanadam", "gariban_adam"];
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
  check(!/\bgariban[\s_-]*adam\b/i.test(text), "visible page text should not contain the SEO-only alias");
  check(
    tags(content, "a").every((tag) => {
      if (!tag.href) return true;
      const pathname = new URL(tag.href, primaryOrigin).pathname.replace(/\/+$/, "") || "/";
      return !retiredAliasPaths.includes(pathname);
    }),
    "page content should not link to retired alias routes"
  );
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
      const schemas = schemaObjects(html);
      const person = schemas.find((object) => hasType(object, "Person"));
      check(Boolean(person), "expected Person schema");
      equal(person.name, "Berke Katrancı", "Person schema name");
      for (const alias of expectedAliases) {
        check(person.alternateName?.includes(alias), `Person schema should include ${alias}`);
      }
      const profiles = schemas.filter((object) => hasType(object, "ProfilePage"));
      if (path === "/") {
        equal(profiles.length, 1, "homepage should have one ProfilePage schema");
        const profile = profiles[0];
        equal(profile.url, new URL(path, primaryOrigin).href, "ProfilePage should identify this page");
        equal(profile.mainEntity?.["@id"], person["@id"], "ProfilePage should reference the same Person");
        equal(profile.inLanguage, "en", "homepage ProfilePage language should be English");
      } else {
        equal(profiles.length, 0, "ProfilePage should only describe the homepage");
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

  for (const alias of retiredAliasPaths) {
    await group(alias, async () => {
      const response = await request(`${alias}?ref=seo-check&variant=gariban%20adam`);
      equal(response.status, 308, "alias should redirect permanently");
      const location = new URL(response.headers.get("location"), base);
      equal(location.pathname, "/", "retired alias route should target the homepage");
      equal(location.search, "?ref=seo-check&variant=gariban%20adam", "alias redirect should preserve query parameters");
    });
  }

  for (const host of ["garibanadam.com", "www.garibanadam.com", "www.berkekatranci.com"]) {
    await group(`${host} redirect`, async () => {
      const path = "/projects/lane-detection?ref=seo-check&variant=gariban%20adam";
      const response = await request(path, { headers: { host } });
      equal(response.status, 308, "secondary host should redirect permanently");
      equal(response.headers.get("location"), `${primaryOrigin}${path}`, "host redirect should preserve the full path and query on primary domain");
    });
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
    console.log(`PASS ${checks} SEO checks across 4 pages, visible content, sitemap, robots, redirects, legal metadata, 404 and OG image.`);
  }
}

main().catch((error) => {
  console.error(`SEO audit failed: ${error.message}`);
  process.exitCode = 1;
});
