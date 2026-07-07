import { CONTACT_WEBSITE } from "@/lib/site";

export const EMAIL_BRAND = {
  name: "Odette",
  tagline: "Premium Fashion Franchise",
  accent: "#5b2d8b",
  accentSoft: "#f3ebf9",
  accentMuted: "#ede4f7",
  text: "#111111",
  textMuted: "#6b7280",
  border: "#e8e5ef",
  surface: "#ffffff",
  surfaceMuted: "#faf9fc",
  shadow: "0 8px 30px rgba(91, 45, 139, 0.08)",
  websiteUrl: CONTACT_WEBSITE,
  websiteLabel: "www.ifranchise.in",
} as const;

export function getOdetteLogoUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) {
    return `${configured}/odette-logo.webp`;
  }

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) {
    return `https://${vercel}/odette-logo.webp`;
  }

  return "http://localhost:3000/odette-logo.webp";
}
