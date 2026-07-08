import type { MetadataRoute } from "next";
import { absoluteUrl, SECTION_SEO } from "@/lib/seo";
import { SITE_SECTIONS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITE_SECTIONS.map((section) => {
    const seo = SECTION_SEO[section.path];

    return {
      url: absoluteUrl(section.path),
      lastModified,
      changeFrequency: seo.changeFrequency,
      priority: seo.priority,
    };
  });
}

export const revalidate = 86400;
