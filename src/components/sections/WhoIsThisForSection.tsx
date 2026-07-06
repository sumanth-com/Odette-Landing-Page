"use client";

import { Check, X } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

const suitableFor = [
  "Business Owners",
  "Working Professionals",
  "Investors",
  "NRIs",
  "People looking to invest in a premium retail business",
];

const notSuitableFor = [
  "Job Seekers",
  "Low-investment business opportunities",
  "Wholesale enquiries",
  "Dealership enquiries",
];

export function WhoIsThisForSection() {
  return (
    <SectionShell id="who-is-this-for">
      <SectionHeading compact title="Who Is This Opportunity For?" centered />

      <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:gap-6">
        <StaggerItem>
          <div className="luxury-shadow h-full rounded-[22px] border border-border bg-white p-6 md:p-8">
            <h3 className="font-display text-xl text-charcoal">This Opportunity is Suitable For</h3>
            <div className="divider-line my-5" aria-hidden="true" />
            <ul className="space-y-3">
              {suitableFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cta/10">
                    <Check className="h-3.5 w-3.5 text-cta" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-charcoal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="h-full rounded-[22px] border border-border bg-white p-6 md:p-8">
            <h3 className="font-display text-xl text-charcoal">
              This Opportunity May Not Be Suitable For
            </h3>
            <div className="divider-line my-5" aria-hidden="true" />
            <ul className="space-y-3">
              {notSuitableFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-taupe/10">
                    <X className="h-3.5 w-3.5 text-taupe" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-taupe">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </SectionShell>
  );
}
