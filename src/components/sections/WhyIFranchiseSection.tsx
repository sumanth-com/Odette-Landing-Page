"use client";

import { ClipboardCheck, FileSearch, MessageCircle, TrendingUp } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

const cards = [
  {
    icon: MessageCircle,
    title: "Franchise Consultation",
  },
  {
    icon: TrendingUp,
    title: "Investment Guidance",
  },
  {
    icon: FileSearch,
    title: "Brand Evaluation",
  },
  {
    icon: ClipboardCheck,
    title: "End-to-End Assistance",
  },
];

export function WhyIFranchiseSection() {
  return (
    <SectionShell className="bg-white">
      <SectionHeading
        compact
        title="Why Choose iFranchise?"
        subtitle="Buying a franchise is an important investment decision. Our team helps you understand the opportunity, answer your questions, and guide you through the complete franchise process."
        centered
      />

      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {cards.map((card) => (
          <StaggerItem key={card.title}>
            <div className="group luxury-shadow h-full rounded-[22px] border border-border bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(43,43,43,0.08)] lg:p-7">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-beige transition-colors duration-300 group-hover:bg-gold/15">
                <card.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base text-charcoal lg:text-lg">{card.title}</h3>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionShell>
  );
}
