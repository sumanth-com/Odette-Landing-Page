export const MEETING_URL = "https://cal.com/team-ifranchise-lycrhq/ifranchise";

export const CONTACT_PHONE = "tel:+919129130303";
export const CONTACT_PHONE_DISPLAY = "+91 91291 30303";
export const CONTACT_EMAIL = "contact@ifranchise.in";
export const CONTACT_WEBSITE = "https://www.ifranchise.in";

export const SITE_SECTIONS = [
  { id: "hero", path: "/", label: null },
  { id: "about-odette", path: "/about", label: "About" },
  { id: "why-odette", path: "/why-odette", label: "Why Odette" },
  { id: "invest-process", path: "/franchise-investment", label: "Franchise Investment" },
  { id: "why-ifranchise", path: "/ifranchise", label: "iFranchise" },
  { id: "faq", path: "/faq", label: "FAQ" },
  { id: "contact", path: "/contact", label: "Contact" },
] as const;

export type SectionId = (typeof SITE_SECTIONS)[number]["id"];
export type SectionPath = (typeof SITE_SECTIONS)[number]["path"];

const VALID_PATHS = new Set<string>(SITE_SECTIONS.map((section) => section.path));

export function isValidSectionPath(path: string): path is SectionPath {
  return VALID_PATHS.has(path);
}

export const PATH_TO_SECTION_ID: Record<SectionPath, SectionId> = Object.fromEntries(
  SITE_SECTIONS.map((section) => [section.path, section.id])
) as Record<SectionPath, SectionId>;

export const SECTION_ID_TO_PATH: Record<SectionId, SectionPath> = Object.fromEntries(
  SITE_SECTIONS.map((section) => [section.id, section.path])
) as Record<SectionId, SectionPath>;

export const NAV_LINKS = SITE_SECTIONS.filter(
  (section): section is (typeof SITE_SECTIONS)[number] & { label: string } =>
    section.label !== null
).map((section) => ({
  label: section.label,
  href: section.path,
  sectionId: section.id,
}));

export const CONTACT_PATH = "/contact" as const;
export const HOME_PATH = "/" as const;
