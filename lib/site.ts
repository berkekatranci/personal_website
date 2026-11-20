import type { Metadata } from "next";
import { socials } from "@/data/profile";

const configuredOrigin =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://berkekatranci.com";

function normalizeOrigin(value: string): string {
  const url = new URL(value.trim());

  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error("SITE_URL must be an absolute HTTP(S) origin without a path, query, or credentials.");
  }

  return url.origin;
}

// One public origin keeps the name and alias domains on the same canonical URLs.
export const siteOrigin = normalizeOrigin(configuredOrigin);
export const siteIsConfigured = true;
export const isIndexableDeployment =
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development";

export const siteName = "Berke Katrancı";
export const defaultTitle =
  "Berke Katrancı";
export const defaultDescription =
  "Berke Katrancı,Explore AI, machine learning and software projects at TU Braunschweig.";

// Personal aliases and their spelling variants belong to the same identity.
// Keep them in metadata; the portfolio's visible text stays unchanged.
const personAlternateNames = [
  "Berke Katranci",
  "Gariban Adam",
  "garibanadam",
  "gariban-adam",
  "gariban_adam",
  "Fakir Adam",
  "fakiradam",
  "fakir-adam",
  "fakir_adam",
  "Fakfakir Adam",
  "fakfakiradam",
  "fakfakir-adam",
  "fakfakir_adam",
  "Fak Fakir Adam",
  "fak-fakir-adam",
  "fak_fakir_adam"
];

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteOrigin}/`).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  locale = "en_US"
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: isIndexableDeployment, follow: true },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName,
      locale,
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Berke Katrancı | AI & Software Portfolio"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")]
    }
  };
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#person"),
  name: "Berke Katrancı",
  alternateName: personAlternateNames,
  url: absoluteUrl("/"),
  description: defaultDescription,
  jobTitle: "Software / AI Developer (student worker)",
  affiliation: { "@type": "CollegeOrUniversity", name: "TU Braunschweig" },
  knowsAbout: ["Artificial Intelligence", "Machine Learning", "Software Engineering", "Data Science"],
  sameAs: [socials.linkedin, socials.instagram]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: siteName,
  alternateName: ["Gariban Adam"],
  url: absoluteUrl("/"),
  inLanguage: "en",
  publisher: { "@id": personSchema["@id"] }
};

export function profilePageSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl(`${path}#profile`),
    url: absoluteUrl(path),
    name: defaultTitle,
    inLanguage: "en",
    isPartOf: { "@id": websiteSchema["@id"] },
    mainEntity: { "@id": personSchema["@id"] }
  };
}
