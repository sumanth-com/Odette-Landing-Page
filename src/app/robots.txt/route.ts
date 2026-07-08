import { buildRobotsTxt } from "@/lib/sitemap-xml";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET(): Promise<Response> {
  const body = buildRobotsTxt(SITE_URL);

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
