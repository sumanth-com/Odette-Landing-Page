import type { MouseEvent } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  window.scrollTo({
    top: el.offsetTop,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function handleSectionNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  onAfterScroll?: () => void
) {
  if (!href.startsWith("#")) return;
  event.preventDefault();
  scrollToSection(href.slice(1));
  onAfterScroll?.();
}
