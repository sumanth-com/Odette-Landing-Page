import { type ReactNode } from "react";

interface PremiumPanelProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  purpleBorder?: boolean;
}

export function PremiumPanel({
  children,
  className = "",
  compact = false,
  purpleBorder = false,
}: PremiumPanelProps) {
  return (
    <div
      className={`luxury-shadow flex min-h-0 w-full flex-col rounded-[20px] border bg-white ${
        purpleBorder ? "border-cta/25" : "border-border/70"
      } ${compact ? "p-3 sm:p-3.5" : "p-5 sm:p-6"} ${className}`}
    >
      {children}
    </div>
  );
}
