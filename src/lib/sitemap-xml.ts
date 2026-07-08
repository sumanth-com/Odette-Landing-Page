import { SITE_URL } from "@/lib/seo";

/** Single-page landing site: only the canonical homepage is listed. */
export const SITEMAP_PATHS = ["/"] as const;

export type SitemapEntry = {
  path: (typeof SITEMAP_PATHS)[number];
  changeFrequency: "weekly";
  priority: number;
};

export const SITEMAP_ENTRIES: SitemapEntry[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
];

function formatLastmod(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildAbsoluteSitemapUrl(path: string, siteUrl: string = SITE_URL): string {
  const base = siteUrl.replace(/\/$/, "");
  if (path === "/") {
    return `${base}/`;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildSitemapXml(siteUrl: string = SITE_URL, lastModified = new Date()): string {
  const lastmod = formatLastmod(lastModified);

  const urls = SITEMAP_ENTRIES.map((entry) => {
    const loc = escapeXml(buildAbsoluteSitemapUrl(entry.path, siteUrl));
    const priority = entry.priority.toFixed(1);

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildRobotsTxt(siteUrl: string = SITE_URL): string {
  const sitemapUrl = `${siteUrl.replace(/\/$/, "")}/sitemap.xml`;

  return `User-agent: *
Allow: /

Disallow: /api/
Disallow: /private/

Sitemap: ${sitemapUrl}
`;
}
