import {
  PATH_TO_SECTION_ID,
  type SectionId,
  type SectionPath,
  isValidSectionPath,
} from "@/lib/site";
import type { MouseEvent } from "react";

let programmaticScrollUntil = 0;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isScrollingProgrammatically() {
  return Date.now() < programmaticScrollUntil;
}

function markProgrammaticScroll() {
  programmaticScrollUntil = Date.now() + (prefersReducedMotion() ? 80 : 900);
}

export function sectionIdFromPath(path: string): SectionId | null {
  if (!isValidSectionPath(path)) return null;
  return PATH_TO_SECTION_ID[path];
}

export function getSectionScrollTop(id: string) {
  const el = document.getElementById(id);
  if (!el) return null;

  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY;

  if (id === "contact") {
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    return Math.min(top, maxScroll);
  }

  return top;
}

function applySectionScroll(top: number) {
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  markProgrammaticScroll();
  const top = getSectionScrollTop(id);
  if (top === null) return false;

  applySectionScroll(top);

  if (id === "contact") {
    const settle = () => {
      const nextTop = getSectionScrollTop(id);
      if (nextTop !== null) {
        window.scrollTo({ top: Math.max(0, nextTop), behavior: "auto" });
      }
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(settle);
    });
  }

  return true;
}

export function scrollToPath(path: SectionPath) {
  const sectionId = sectionIdFromPath(path);
  if (!sectionId) return false;

  if (sectionId === "hero") {
    markProgrammaticScroll();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    return true;
  }

  return scrollToSection(sectionId);
}

export function scrollToPathWhenReady(path: SectionPath, attempt = 0) {
  const maxAttempts = 12;
  const didScroll = scrollToPath(path);

  if (!didScroll && attempt < maxAttempts) {
    window.requestAnimationFrame(() => scrollToPathWhenReady(path, attempt + 1));
  }
}

export function syncUrlToPath(path: SectionPath, replace = false) {
  if (window.location.pathname === path) return;

  if (replace) {
    window.history.replaceState({ sectionPath: path }, "", path);
  } else {
    window.history.pushState({ sectionPath: path }, "", path);
  }
}

export function navigateToSectionPath(
  path: SectionPath,
  options?: { replace?: boolean; onAfter?: () => void }
) {
  scrollToPathWhenReady(path);
  syncUrlToPath(path, options?.replace ?? false);
  options?.onAfter?.();
}

export function handleSectionNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  onAfterScroll?: () => void
) {
  if (!href.startsWith("/") || !isValidSectionPath(href)) return;

  event.preventDefault();
  navigateToSectionPath(href, { onAfter: onAfterScroll });
}
