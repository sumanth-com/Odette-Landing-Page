"use client";

import { type ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullViewport?: boolean;
}

export function SectionShell({
  children,
  className = "",
  id,
  fullViewport = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`viewport-section relative bg-white ${
        fullViewport ? "snap-section" : ""
      } ${className}`}
    >
      {fullViewport ? (
        <div className="page-container snap-section-body w-full">
          <div className="snap-section-inner">{children}</div>
        </div>
      ) : (
        <div className="page-container w-full py-8 lg:py-10">{children}</div>
      )}
    </section>
  );
}
