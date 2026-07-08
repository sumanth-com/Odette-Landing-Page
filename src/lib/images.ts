import dimensions from "@/lib/image-dimensions.json";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

function image(
  path: string,
  width: number,
  height: number,
  alt: string
): SiteImage {
  return { src: path, width, height, alt };
}

/** Stable, SEO-friendly image URLs served from /public/images */
export const SITE_IMAGES = {
  hero: {
    desktop: image(
      "/images/hero/desktop.webp",
      dimensions["hero.desktop"].width,
      dimensions["hero.desktop"].height,
      "Odette premium women's fashion franchise opportunity in India"
    ),
    mobile: image(
      "/images/hero/mobile.webp",
      dimensions["hero.mobile"].width,
      dimensions["hero.mobile"].height,
      "Odette franchise opportunity — mobile hero"
    ),
  },
  brand: {
    odetteLogo: image(
      "/images/brand/odette-logo.webp",
      dimensions["brand.odette-logo"].width,
      dimensions["brand.odette-logo"].height,
      "Odette franchise brand logo"
    ),
    odetteMark: image(
      "/images/brand/odette-mark.webp",
      dimensions["brand.odette-mark"].width,
      dimensions["brand.odette-mark"].height,
      "Odette premium fashion retail brand"
    ),
    iFranchiseLogo: image(
      "/images/brand/ifranchise-logo.ico",
      dimensions["brand.ifranchise-logo"].width,
      dimensions["brand.ifranchise-logo"].height,
      "iFranchise logo"
    ),
  },
  gallery: [
    image(
      "/images/gallery/store-interior.webp",
      dimensions["gallery.store-interior"].width,
      dimensions["gallery.store-interior"].height,
      "Odette premium fashion store interior"
    ),
    image(
      "/images/gallery/retail-showroom.webp",
      dimensions["gallery.retail-showroom"].width,
      dimensions["gallery.retail-showroom"].height,
      "Odette luxury retail showroom"
    ),
    image(
      "/images/gallery/fashion-boutique.webp",
      dimensions["gallery.fashion-boutique"].width,
      dimensions["gallery.fashion-boutique"].height,
      "Odette fashion boutique display"
    ),
    image(
      "/images/gallery/clothing-collection.webp",
      dimensions["gallery.clothing-collection"].width,
      dimensions["gallery.clothing-collection"].height,
      "Odette premium clothing collection"
    ),
    image(
      "/images/gallery/franchise-experience.webp",
      dimensions["gallery.franchise-experience"].width,
      dimensions["gallery.franchise-experience"].height,
      "Odette franchise retail experience"
    ),
    image(
      "/images/gallery/brand-showcase.webp",
      dimensions["gallery.brand-showcase"].width,
      dimensions["gallery.brand-showcase"].height,
      "Odette brand showcase"
    ),
  ],
} as const;

export function absoluteImageUrl(path: string, siteUrl: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteUrl).toString();
}
