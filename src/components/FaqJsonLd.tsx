import { getFaqJsonLd } from "@/lib/faqs";

export function FaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
    />
  );
}
