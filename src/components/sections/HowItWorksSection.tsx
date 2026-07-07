"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { InvestmentOverviewCard } from "../ui/InvestmentOverviewCard";
import { SectionShell } from "../ui/SectionShell";

export function HowItWorksSection() {
  return (
    <SectionShell id="invest-process">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="section-fit mx-auto flex min-h-0 w-full max-w-6xl flex-col items-center justify-center"
      >
        <SectionHeading
          dense
          tight
          centered
          pill="Franchise Investment"
          title="Franchise Investment in India"
          subtitle="₹45 Lakhs investment to store launch — your Odette franchise journey across India."
        />

        <motion.div variants={fadeUp} className="flex w-full justify-center px-2 sm:px-3">
          <InvestmentOverviewCard
            compact
            extended
            purpleBorder
            className="w-full max-w-3xl"
          />
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
