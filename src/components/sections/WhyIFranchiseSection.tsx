"use client";

import { type ElementType } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  FileSearch,
  Headphones,
  LifeBuoy,
  MapPinned,
  MessageCircle,
  Rocket,
  Scale,
  UserCheck,
  Users,
} from "lucide-react";
import { fadeUp, staggerContainer } from "../ui/AnimatedSection";
import { CardTitleHighlight, SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

const processSteps = [
  { title: "Connect with iFranchise", icon: MessageCircle },
  { title: "Business Consultation", icon: Users },
  { title: "Franchise Approval", icon: BadgeCheck },
  { title: "Store Setup & Launch", icon: Rocket },
  { title: "Ongoing Business Support", icon: LifeBuoy },
] as const;

const whyCards = [
  { icon: FileSearch, title: "Franchise Opportunity Assessment" },
  { icon: Headphones, title: "End-to-End Franchise Consulting" },
  { icon: MapPinned, title: "Market Research & Location Analysis" },
  { icon: Scale, title: "Franchise Legal & Documentation Support" },
  { icon: UserCheck, title: "Dedicated Franchise Business Consultant" },
] as const;

function SideCard({ icon: Icon, title }: { icon: ElementType; title: string }) {
  return (
    <div className="group flex h-full items-stretch overflow-hidden rounded-[16px] border border-cta/25 bg-white shadow-[0_8px_32px_rgba(91,45,139,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cta/45 hover:shadow-[0_12px_36px_rgba(91,45,139,0.12)] lg:rounded-[18px]">
      <div className="flex w-full items-center gap-2.5 py-2 pl-3 pr-2.5 lg:gap-3 lg:py-2.5 lg:pl-3.5 lg:pr-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cta/10 transition-colors duration-300 group-hover:bg-cta/15 lg:h-9 lg:w-9">
          <Icon className="h-4 w-4 text-cta lg:h-[18px] lg:w-[18px]" strokeWidth={1.75} />
        </div>
        <h3 className="min-w-0 flex-1 font-display text-[11px] font-semibold leading-snug text-charcoal sm:text-xs lg:text-[14px]">
          {title}
        </h3>
      </div>
    </div>
  );
}

function CardGrid({
  items,
}: {
  items: readonly { title: string; icon: ElementType }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <SideCard key={item.title} icon={item.icon} title={item.title} />
      ))}
    </div>
  );
}

export function WhyIFranchiseSection() {
  return (
    <SectionShell id="why-ifranchise" gradientTone={3}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="section-fit mx-auto flex min-h-0 w-full max-w-5xl flex-col items-center px-1 sm:px-2 lg:px-3"
      >
        <SectionHeading
          compact
          centered
          pill="iFranchise"
          title="India's Trusted Franchise Consulting Partner"
          subtitle="Expert franchise consulting for investors and brands—from opportunity assessment to store launch and growth."
        />

        <motion.div variants={fadeUp} className="flex w-full flex-col">
          {/* Mobile: Why grid, then Process grid */}
          <div className="flex flex-col gap-2 lg:hidden">
            <div className="flex flex-col gap-2">
              <CardTitleHighlight compact>Why iFranchise</CardTitleHighlight>
              <CardGrid items={whyCards} />
            </div>
            <div className="flex flex-col gap-2">
              <CardTitleHighlight compact>Setup Process</CardTitleHighlight>
              <CardGrid items={processSteps} />
            </div>
          </div>

          {/* Desktop: side-by-side paired rows */}
          <div className="hidden lg:flex lg:flex-col">
            <div className="grid shrink-0 grid-cols-2 gap-4">
              <CardTitleHighlight compact>Why iFranchise</CardTitleHighlight>
              <CardTitleHighlight compact>Setup Process</CardTitleHighlight>
            </div>

            <div className="mt-2.5 flex w-full flex-col gap-2">
              {whyCards.map((whyCard, index) => (
                <div key={whyCard.title} className="grid grid-cols-2 gap-4">
                  <SideCard icon={whyCard.icon} title={whyCard.title} />
                  <SideCard
                    icon={processSteps[index].icon}
                    title={processSteps[index].title}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
