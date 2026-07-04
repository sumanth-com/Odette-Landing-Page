"use client";

import { Award, Headphones, Layers, Store } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

const features = [
  {
    icon: Award,
    title: "Premium Brand",
    description: "Partner with an established fashion brand.",
  },
  {
    icon: Store,
    title: "Company Operated",
    description: "The company manages the day-to-day store operations.",
  },
  {
    icon: Layers,
    title: "Structured Business Model",
    description: "Operate through a proven business system.",
  },
  {
    icon: Headphones,
    title: "End-to-End Support",
    description: "Guidance from setup to ongoing business support.",
  },
];

export function WhyConsiderSection() {
  return (
    <SectionShell className="bg-white">
      <SectionHeading
        compact
        title="Looking to Invest in a Premium Retail Business?"
        subtitle="Starting a business from scratch requires time, planning, hiring, operations, and building customer trust. With Odette, you partner with an established premium fashion brand through a structured business model designed for long-term business growth."
      />

      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <div className="group luxury-shadow h-full rounded-[22px] border border-border bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(43,43,43,0.08)] lg:p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-beige transition-colors duration-300 group-hover:bg-gold/15">
                <feature.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg text-charcoal lg:text-xl">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">{feature.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionShell>
  );
}
