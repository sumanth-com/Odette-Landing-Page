import type { Metadata } from "next";
import { SITE_IMAGES } from "@/lib/images";
import { FAQ_ITEMS } from "@/lib/faqs";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_WEBSITE,
  SITE_SECTIONS,
  type SectionPath,
} from "@/lib/site";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://odette.ifranchise.in";

export const SITE_NAME = "Odette Franchise by iFranchise";
export const BRAND_NAME = "Odette";
export const PUBLISHER_NAME = "iFranchise";

export const DEFAULT_TITLE =
  "Odette Franchise Opportunity | Premium Women's Fashion Franchise in India";

export const DEFAULT_DESCRIPTION =
  "Partner with Odette through a company-operated FICO franchise model. Investment from ₹45 Lakhs. Premium women's fashion franchise opportunities across selected cities in India with iFranchise consulting.";

export const SEO_KEYWORDS = [
  "Odette Franchise",
  "Odette Franchise Opportunity",
  "Fashion Franchise in India",
  "Women's Fashion Franchise",
  "Franchise Business Opportunity",
  "Premium Fashion Franchise",
  "Franchise Consulting India",
  "Clothing Franchise",
  "Fashion Franchise",
  "Retail Franchise",
  "Women's Clothing Franchise",
  "FICO Franchise Model",
  "Franchise Investment India",
  "Odette Franchise Investment",
  "iFranchise",
] as const;

export const SECTION_SEO: Record<
  SectionPath,
  { title: string; description: string; changeFrequency: "weekly" | "monthly"; priority: number }
> = {
  "/": {
    title: "Odette Franchise Opportunity | Premium Women's Fashion Franchise in India",
    description: DEFAULT_DESCRIPTION,
    changeFrequency: "weekly",
    priority: 1,
  },
  "/about": {
    title: "About Odette | Mass-Premium Fashion Brand Built for India",
    description:
      "Discover Odette — India's mass-premium women's fashion brand with 45+ stores. Learn about the brand, retail footprint, and franchise growth opportunity.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  "/why-odette": {
    title: "Why Odette Franchise | Invest in Premium Fashion Retail in India",
    description:
      "Explore why investors choose Odette: established brand recognition, proven FICO model, premium product range, and structured franchise support.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  "/franchise-investment": {
    title: "Odette Franchise Investment | ₹45 Lakhs+ FICO Model India",
    description:
      "Odette franchise investment overview: from ₹45 Lakhs, FICO company-operated model, 5-year agreement, 45+ outlets, and structured store launch support.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  "/ifranchise": {
    title: "iFranchise Consulting | India's Trusted Franchise Growth Partner",
    description:
      "Partner with iFranchise for end-to-end franchise consulting — opportunity assessment, location analysis, legal support, and launch guidance for Odette.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  "/faq": {
    title: "Odette Franchise FAQ | Investment, Support & Cities",
    description:
      "Answers to common Odette franchise questions: minimum investment, store management, support, available cities, and how to get started.",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  "/contact": {
    title: "Contact Odette Franchise Team | Book a Consultation",
    description:
      "Get in touch with iFranchise consultants about the Odette franchise opportunity. Book a meeting, call, email, or submit your franchise eligibility enquiry.",
    changeFrequency: "weekly",
    priority: 0.95,
  },
};

export function absoluteUrl(path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
}

export function getGoogleSiteVerification(): string | undefined {
  const value = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  return value || undefined;
}

function buildOpenGraph(path: SectionPath, title: string, description: string): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl(path),
    siteName: SITE_NAME,
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} Franchise Opportunity — Premium Fashion Franchise in India`,
      },
    ],
  };
}

function buildTwitter(title: string, description: string): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image"],
  };
}

export function buildSectionMetadata(path: SectionPath): Metadata {
  const section = SECTION_SEO[path];
  const canonical = absoluteUrl(path);

  return {
    title: { absolute: section.title },
    description: section.description,
    keywords: [...SEO_KEYWORDS],
    alternates: {
      canonical,
    },
    openGraph: buildOpenGraph(path, section.title, section.description),
    twitter: buildTwitter(section.title, section.description),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${BRAND_NAME} Franchise`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  applicationName: SITE_NAME,
  authors: [{ name: PUBLISHER_NAME, url: CONTACT_WEBSITE }],
  creator: PUBLISHER_NAME,
  publisher: PUBLISHER_NAME,
  category: "Franchise",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: buildOpenGraph("/", DEFAULT_TITLE, DEFAULT_DESCRIPTION),
  twitter: buildTwitter(DEFAULT_TITLE, DEFAULT_DESCRIPTION),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  verification: getGoogleSiteVerification()
    ? { google: getGoogleSiteVerification() }
    : undefined,
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

export function getBreadcrumbJsonLd(path: SectionPath) {
  const crumbs = [{ name: "Home", path: "/" as SectionPath }];
  if (path !== "/") {
    const section = SITE_SECTIONS.find((item) => item.path === path);
    if (section?.label) {
      crumbs.push({ name: section.label, path });
    }
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function getStructuredDataGraph(path: SectionPath) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: PUBLISHER_NAME,
    url: CONTACT_WEBSITE,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE_IMAGES.brand.odetteLogo.src),
    },
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_DISPLAY,
    sameAs: [CONTACT_WEBSITE],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: SECTION_SEO[path].title,
    description: SECTION_SEO[path].description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#franchise-service` },
    inLanguage: "en-IN",
  };

  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#franchise-service`,
    name: `${BRAND_NAME} Franchise Consulting by ${PUBLISHER_NAME}`,
    url: absoluteUrl(path),
    image: absoluteUrl(SITE_IMAGES.brand.odetteLogo.src),
    description:
      "Franchise consulting and Odette premium women's fashion franchise opportunities across India.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: [
      "Franchise Consulting",
      "Franchise Opportunity Assessment",
      "Fashion Franchise Investment Advisory",
    ],
    telephone: CONTACT_PHONE_DISPLAY,
    email: CONTACT_EMAIL,
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faq`,
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const graph: Record<string, unknown>[] = [
    organization,
    website,
    webPage,
    professionalService,
    getBreadcrumbJsonLd(path),
  ];

  if (path === "/faq" || path === "/") {
    graph.push(faqPage);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
