export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is the minimum investment?",
    answer: "Investment starts from ₹45 Lakhs.",
  },
  {
    question: "Who manages the store?",
    answer:
      "The company manages the day-to-day operations under the FICO model.",
  },
  {
    question: "What support will I receive?",
    answer:
      "Support includes guidance for setup, launch, operations, and ongoing business assistance.",
  },
  {
    question: "Which cities are available?",
    answer:
      "Franchise opportunities are available in selected cities across India.",
  },
  {
    question: "How do I get started?",
    answer:
      "Submit the enquiry form and our franchise consultant will contact you to discuss the opportunity.",
  },
];

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
