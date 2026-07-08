import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://odette.ifranchise.in").replace(
  /\/$/,
  ""
);

const lastmod = new Date().toISOString().slice(0, 10);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Disallow: /api/
Disallow: /private/

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`Generated public/sitemap.xml and public/robots.txt for ${siteUrl}`);
