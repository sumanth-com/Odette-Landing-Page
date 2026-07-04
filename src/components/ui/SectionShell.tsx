import { type ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionShell({ children, className = "", id }: SectionShellProps) {
  return (
    <section id={id} className={`viewport-section ${className}`}>
      <div className="page-container section-offset w-full py-10 lg:py-12">
        {children}
      </div>
    </section>
  );
}
