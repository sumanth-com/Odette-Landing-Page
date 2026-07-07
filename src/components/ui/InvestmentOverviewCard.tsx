"use client";

import { type ElementType } from "react";
import {
  Building2,
  CalendarClock,
  Clock3,
  IndianRupee,
  MapPin,
  Receipt,
  Ruler,
  TrendingUp,
} from "lucide-react";
import { handleSectionNavClick } from "@/lib/scroll";
import { CardTitleHighlight, ctaButtonClass } from "./GoldButton";
import { PremiumPanel } from "./PremiumPanel";

const rowIcons: Record<string, ElementType> = {
  Investment: IndianRupee,
  "Franchise Fee": Receipt,
  "Space Required": Ruler,
  Returns: TrendingUp,
  "Lock-in Period": Clock3,
  "Payback Period": CalendarClock,
  Outlets: MapPin,
};

const investmentOverview = [
  { label: "Investment", value: "₹45 Lakhs onwards" },
  { label: "Franchise Fee", value: "₹7 Lakhs + GST" },
  { label: "Space Required", value: "700 Sq.ft" },
  {
    label: "Returns",
    value: "₹1.25 / Month or 12% Revenue Share",
    subValue: "(Whichever Is Higher)",
  },
  { label: "Lock-in Period", value: "5 Years" },
] as const;

const extendedOverviewRows = [
  { label: "Payback Period", value: "24 - 28 months" },
  { label: "Outlets", value: "40+" },
] as const;

type OverviewRow = {
  label: string;
  value: string;
  subValue?: string;
};

interface InvestmentOverviewCardProps {
  showCta?: boolean;
  className?: string;
  compact?: boolean;
  extended?: boolean;
  fillHeight?: boolean;
  purpleBorder?: boolean;
}

export function InvestmentOverviewCard({
  showCta = true,
  className = "",
  compact = false,
  extended = false,
  fillHeight = false,
  purpleBorder = false,
}: InvestmentOverviewCardProps) {
  const rows: OverviewRow[] = extended
    ? [...investmentOverview, ...extendedOverviewRows]
    : [...investmentOverview];

  const rowTextClass = fillHeight
    ? "text-[12px] sm:text-[13px] lg:text-sm"
    : compact
      ? "text-sm"
      : "text-sm";

  const panelClass = `${fillHeight ? "h-full min-h-0 justify-between" : ""} ${className}`;

  return (
    <PremiumPanel compact={compact || fillHeight} purpleBorder={purpleBorder} className={panelClass}>
      {compact ? (
        <CardTitleHighlight compact>Investment Overview</CardTitleHighlight>
      ) : (
        <h2 className="text-center font-display text-lg text-charcoal sm:text-xl">
          Investment Overview
        </h2>
      )}

      <dl
        className={`${compact || fillHeight ? "mt-2.5" : "mt-5"} ${
          fillHeight
            ? "grid min-h-0 flex-1 grid-cols-2 gap-x-2 lg:flex lg:flex-col lg:divide-y lg:divide-border/80"
            : "flex flex-col divide-y divide-border/80"
        }`}
      >
        {rows.map((row) => {
          const RowIcon = rowIcons[row.label] ?? Building2;
          const isWideRow = row.label === "Returns";

          return (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-2 ${
                fillHeight
                  ? `border-b border-border/60 py-1.5 last:border-b-0 lg:border-b-0 lg:py-2 lg:first:pt-0 lg:last:pb-0 ${
                      isWideRow ? "col-span-2" : ""
                    }`
                  : compact
                    ? "py-2.5 first:pt-0 last:pb-0"
                    : "py-3.5"
              }`}
            >
              <dt
                className={`flex min-w-0 items-center gap-1.5 text-taupe lg:gap-2 ${rowTextClass}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cta/10 bg-cta/[0.05] text-cta lg:h-7 lg:w-7">
                  <RowIcon className="h-3 w-3 lg:h-3.5 lg:w-3.5" strokeWidth={2} />
                </span>
                <span className="leading-snug">{row.label}</span>
              </dt>
              <dd
                className={`shrink-0 text-right font-semibold leading-snug text-charcoal ${rowTextClass} ${
                  isWideRow ? "max-w-[70%]" : "max-w-[56%]"
                } sm:max-w-[52%]`}
              >
                {row.value}
                {row.subValue ? (
                  <span className="mt-0.5 block text-[10px] font-medium leading-tight text-charcoal/75 sm:text-[11px] lg:text-xs">
                    {row.subValue}
                  </span>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>

      {showCta && (
        <a
          href="#contact"
          onClick={(e) => handleSectionNavClick(e, "#contact")}
          className={`mt-2.5 shrink-0 ${ctaButtonClass({ fullWidth: true })}`}
        >
          Request Information
        </a>
      )}
    </PremiumPanel>
  );
}
