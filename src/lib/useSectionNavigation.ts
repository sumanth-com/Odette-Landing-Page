"use client";

import { handleSectionNavClick } from "@/lib/scroll";
import type { MouseEvent } from "react";

export function useSectionNavigation() {
  const navigate = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    onAfterScroll?: () => void
  ) => {
    handleSectionNavClick(event, href, onAfterScroll);
  };

  return { navigate };
}
