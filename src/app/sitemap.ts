import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Canonical indexable URLs only — single landing page, no API or utility routes. */
const SITEMAP_ENTRIES = [
  {
    path: "/" as const,
    changeFrequency: "weekly" as const,
    priority: 1,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_ENTRIES.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

export const revalidate = 86400;
