"use client";

import { handleSectionNavClick } from "@/lib/scroll";
import { CardTitleHighlight } from "./GoldButton";

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

const mobileRowOrder: Record<string, string> = {
  Investment: "max-lg:order-1",
  "Franchise Fee": "max-lg:order-2",
  "Space Required": "max-lg:order-3",
  Outlets: "max-lg:order-4",
  Returns: "max-lg:order-5",
  "Lock-in Period": "max-lg:order-6",
  "Payback Period": "max-lg:order-7",
};

function getMobileRowOrder(label: string) {
  return mobileRowOrder[label] ?? "";
}

interface InvestmentOverviewCardProps {
  showCta?: boolean;
  className?: string;
  compact?: boolean;
  extended?: boolean;
  fillHeight?: boolean;
}

export function InvestmentOverviewCard({
  showCta = true,
  className = "",
  compact = false,
  extended = false,
  fillHeight = false,
}: InvestmentOverviewCardProps) {
  const rows: OverviewRow[] = extended
    ? [...investmentOverview, ...extendedOverviewRows]
    : [...investmentOverview];

  const rowTextClass = fillHeight
    ? "text-sm sm:text-[15px]"
    : compact
      ? "text-xs"
      : "text-sm";

  return (
    <div
      className={`luxury-shadow flex w-full flex-col rounded-[20px] border border-border bg-white ${fillHeight ? "h-full" : ""} ${compact ? "p-3 sm:p-3.5" : "p-5 sm:p-6"} ${className}`}
    >
      {compact ? (
        <CardTitleHighlight>Investment Overview</CardTitleHighlight>
      ) : (
        <h2 className="text-center font-display text-lg text-charcoal sm:text-xl">
          Investment Overview
        </h2>
      )}

      <dl
        className={`${compact ? "mt-2 sm:mt-3" : "mt-4"} grid grid-cols-2 gap-2 lg:flex lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-border ${fillHeight ? "lg:flex-1 lg:flex-col lg:justify-between" : ""}`}
      >
        {rows.map((row) => {
          const isWideRow = row.label === "Returns";

          return (
            <div
              key={row.label}
              className={`flex flex-col gap-0.5 rounded-lg border border-border/60 bg-beige/50 p-2 lg:order-none lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 ${getMobileRowOrder(row.label)} ${
                isWideRow ? "col-span-2 lg:col-span-1" : ""
              } ${
                fillHeight
                  ? "lg:min-h-[3rem] lg:py-2.5"
                  : compact
                    ? "lg:py-1.5"
                    : "lg:py-3"
              } lg:flex-row lg:items-center lg:justify-between lg:gap-3`}
            >
              <dt className={`shrink-0 text-taupe ${rowTextClass}`}>{row.label}</dt>
              <dd
                className={`min-w-0 font-semibold leading-snug text-charcoal lg:text-right ${rowTextClass} ${!fillHeight && !compact ? "lg:max-w-[62%]" : ""}`}
              >
                {row.value}
                {row.subValue ? (
                  <span className={`mt-0.5 block font-medium text-charcoal/90 ${rowTextClass}`}>
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
          className={`flex w-full items-center justify-center rounded-xl bg-cta font-semibold text-white shadow-[0_4px_16px_rgba(91,45,139,0.28)] transition-colors duration-200 hover:bg-cta-hover ${compact ? "mt-2.5 py-2 text-xs" : "mt-5 px-6 py-3 text-sm"} ${fillHeight ? "text-sm sm:text-[15px]" : ""}`}
        >
          Request Information
        </a>
      )}
    </div>
  );
}
