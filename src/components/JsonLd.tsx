import { getStructuredDataGraph } from "@/lib/seo";
import type { SectionPath } from "@/lib/site";

interface JsonLdProps {
  path: SectionPath;
}

export function JsonLd({ path }: JsonLdProps) {
  const data = getStructuredDataGraph(path);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
