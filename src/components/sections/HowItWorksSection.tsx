"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer } from "../ui/AnimatedSection";
import { SectionHeading, CardTitleHighlight } from "../ui/GoldButton";
import { InvestmentOverviewCard } from "../ui/InvestmentOverviewCard";
import { SectionShell } from "../ui/SectionShell";

const processSteps = [
  "Connect with iFranchise",
  "Business Consultation",
  "Franchise Approval",
  "Store Setup & Launch",
  "Ongoing Business Support",
];

function ProcessStep({ title }: { title: string }) {
  return (
    <div className="flex w-full min-h-[2.75rem] items-center justify-center rounded-lg border border-border/70 bg-beige/60 px-4 py-2.5 sm:min-h-[3rem]">
      <p className="text-center font-display text-sm font-medium leading-snug text-charcoal sm:text-[15px]">
        {title}
      </p>
    </div>
  );
}

function VerticalConnector({ index }: { index: number }) {
  return (
    <div className="flex shrink-0 justify-center py-1 sm:py-1.5" aria-hidden>
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.25,
        }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.25)]"
      >
        <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
      </motion.div>
    </div>
  );
}

function SetupProcessCard() {
  return (
    <div className="luxury-shadow flex h-full w-full flex-col rounded-[20px] border border-border bg-white p-3 sm:p-3.5">
      <CardTitleHighlight>Setup Process</CardTitleHighlight>

      <div className="mt-2 flex flex-1 flex-col justify-between sm:mt-3">
        {processSteps.map((title, index) => (
          <Fragment key={title}>
            <ProcessStep title={title} />
            {index < processSteps.length - 1 && <VerticalConnector index={index} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <SectionShell id="invest-process">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="flex w-full min-h-0 max-w-6xl flex-col items-center"
      >
        <SectionHeading
          dense
          centered
          pill="Franchise Investment"
          title="Franchise Investment & Setup Process in India"
          subtitle="₹45 Lakhs investment to store launch — your Odette franchise journey across India."
        />

        <div className="grid w-full items-stretch gap-4 md:grid-cols-2 md:gap-5">
          <motion.div variants={fadeUp} className="flex min-h-0 min-w-0">
            <InvestmentOverviewCard compact extended fillHeight />
          </motion.div>

          <motion.div variants={fadeUp} className="flex min-h-0 min-w-0">
            <SetupProcessCard />
          </motion.div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
