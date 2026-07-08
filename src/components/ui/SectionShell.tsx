"use client";

import { SectionGradient } from "@/components/ui/SectionGradient";
import { type ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
  fullViewport?: boolean;
  gradientTone?: 0 | 1 | 2 | 3 | 4 | 5;
}

export function SectionShell({
  children,
  className = "",
  id,
  ariaLabel,
  fullViewport = true,
  gradientTone = 0,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`viewport-section relative ${
        fullViewport ? "snap-section" : ""
      } ${className}`}
    >
      <SectionGradient tone={gradientTone} />
      {fullViewport ? (
        <div className="page-container relative z-[1] snap-section-body w-full">
          <div className="snap-section-inner">{children}</div>
        </div>
      ) : (
        <div className="page-container relative z-[1] w-full py-8 lg:py-10">{children}</div>
      )}
    </section>
  );
}
