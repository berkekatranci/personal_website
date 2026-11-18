import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexableDeployment } from "@/lib/site";

const indexablePaths = [
  "/",
  "/projects/weather-forecasting",
  "/projects/lane-detection",
  "/projects/hardware-aware-gpt"
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment) return [];

  // Omit artificial last-modified dates; these are maintained editorial pages.
  return indexablePaths.map((path) => ({ url: absoluteUrl(path) }));
}
