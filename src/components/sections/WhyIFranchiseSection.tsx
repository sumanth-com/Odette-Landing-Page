"use client";

import {
  FileSearch,
  Headphones,
  MapPinned,
  Rocket,
  Scale,
  UserCheck,
} from "lucide-react";
import { StaggerGroup, StaggerItem } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

const cards = [
  {
    icon: FileSearch,
    title: "Franchise Opportunity Assessment",
  },
  {
    icon: Headphones,
    title: "End-to-End Franchise Consulting",
  },
  {
    icon: MapPinned,
    title: "Market Research & Location Analysis",
  },
  {
    icon: Scale,
    title: "Franchise Legal & Documentation Support",
  },
  {
    icon: Rocket,
    title: "Franchise Setup & Store Launch",
  },
  {
    icon: UserCheck,
    title: "Dedicated Franchise Business Consultant",
  },
];

export function WhyIFranchiseSection() {
  return (
    <SectionShell id="why-ifranchise">
      <div className="flex w-full max-w-6xl flex-col items-center">
        <SectionHeading
          compact
          centered
          pill="iFranchise"
          title="Why Choose iFranchise?"
          tagline="India's Trusted Franchise Consulting Partner"
          subtitle="Expert franchise consulting for investors and brands—from opportunity assessment to store launch and growth."
        />

        <StaggerGroup className="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4">
          {cards.map((card) => (
            <StaggerItem key={card.title} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[14px] border border-cta/15 bg-white p-2.5 shadow-[0_8px_32px_rgba(91,45,139,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-cta/30 hover:shadow-[0_16px_48px_rgba(91,45,139,0.14)] lg:rounded-[20px] lg:p-5">
                <div
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cta to-cta/40"
                  aria-hidden
                />
                <div className="flex flex-col gap-1.5 pl-1 lg:flex-row lg:items-start lg:gap-3.5 lg:pl-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cta/10 transition-colors duration-300 group-hover:bg-cta/15 lg:h-12 lg:w-12 lg:rounded-xl">
                    <card.icon className="h-4 w-4 text-cta lg:h-[22px] lg:w-[22px]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[10px] font-semibold leading-tight text-charcoal lg:pt-2 lg:text-[15px] lg:leading-snug lg:text-base">
                    {card.title}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </SectionShell>
  );
}
