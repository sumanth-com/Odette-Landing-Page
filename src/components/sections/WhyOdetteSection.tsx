"use client";

import { Check } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { ImageGallery } from "../ui/ImageGallery";
import { SectionShell } from "../ui/SectionShell";

const features = [
  "Established Brand Recognition",
  "Proven Business Model",
  "High Demand Category",
  "Premium Product Range",
  "Strong Marketing Support",
  "Faster ROI Potential",
];

export function WhyOdetteSection() {
  return (
    <SectionShell id="why-odette" gradientTone={1}>
      <div className="flex w-full max-w-6xl flex-col items-center">
        <SectionHeading
          compact
          centered
          pill="Why Odette"
          title="Looking to Invest in a Premium Retail Business?"
          subtitle="Partner with an established fashion brand through a structured business model designed for long-term growth."
        />

        <div className="grid w-full items-stretch gap-3 sm:gap-4 md:grid-cols-2 md:gap-6">
          <StaggerGroup className="grid min-w-0 grid-cols-2 grid-rows-3 gap-2 self-stretch md:h-full lg:gap-3">
            {features.map((feature) => (
              <StaggerItem key={feature} className="h-full min-h-0">
                <div className="group flex h-full min-h-[3.5rem] items-center gap-2 rounded-[14px] border border-cta/25 bg-white px-2.5 py-2.5 shadow-[0_8px_32px_rgba(91,45,139,0.08)] transition-all duration-300 hover:border-cta/45 hover:shadow-[0_16px_48px_rgba(91,45,139,0.12)] lg:gap-3 lg:rounded-[20px] lg:px-4 lg:py-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cta/10 transition-colors duration-300 group-hover:bg-cta/15 lg:h-8 lg:w-8">
                    <Check className="h-3.5 w-3.5 text-cta lg:h-4 lg:w-4" strokeWidth={2.5} />
                  </div>
                  <h3 className="min-w-0 flex-1 font-display text-[10px] font-medium leading-tight text-charcoal lg:text-sm lg:leading-snug lg:text-[15px]">
                    {feature}
                  </h3>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="flex min-w-0 flex-col self-stretch">
            <ImageGallery className="w-full" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
