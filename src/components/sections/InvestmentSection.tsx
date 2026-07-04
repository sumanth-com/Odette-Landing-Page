"use client";

import { Calendar, Handshake, IndianRupee, Layers, Store } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

const investmentDetails = [
  {
    icon: IndianRupee,
    label: "Investment",
    value: "₹45 Lakhs+",
  },
  {
    icon: Layers,
    label: "Business Model",
    value: "Franchise Invested Company Operated (FICO)",
  },
  {
    icon: Store,
    label: "Store Format",
    value: "Premium Fashion Retail",
  },
  {
    icon: Calendar,
    label: "Agreement",
    value: "5 Years",
  },
  {
    icon: Handshake,
    label: "Support",
    value: "End-to-End Business Support",
  },
];

export function InvestmentSection() {
  return (
    <SectionShell className="bg-white">
      <SectionHeading compact title="Investment Overview" centered />

      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {investmentDetails.map((item) => (
          <StaggerItem key={item.label}>
            <div className="group luxury-shadow h-full rounded-[22px] border border-border bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(43,43,43,0.08)]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-beige transition-colors duration-300 group-hover:bg-gold/15">
                <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-taupe">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-charcoal">{item.value}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionShell>
  );
}
