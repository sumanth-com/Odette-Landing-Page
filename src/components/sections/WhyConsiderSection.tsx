"use client";

import Logo from "@/assets/Logo.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "../ui/AnimatedSection";
import { SectionHeading, sectionBodyTextClass } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

function OdetteBrandCard() {
  return (
    <div className="flex w-full items-center justify-center py-2 md:py-0">
      <div className="premium-rotating-border luxury-shadow w-full max-w-[320px] sm:max-w-[360px]">
        <div className="premium-rotating-border__inner flex w-full flex-col items-center justify-center px-10 py-12 sm:px-12 sm:py-14">
          <Image
            src={Logo}
            alt=""
            aria-hidden
            priority
            className="h-auto w-full max-w-[220px] object-contain sm:max-w-[250px]"
          />
          <p className="mt-8 font-display text-[11px] font-medium uppercase tracking-[0.32em] text-charcoal sm:mt-10 sm:text-xs">
            Odette
          </p>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-black sm:text-[11px]">
            Premium Fashion Retail
          </p>
        </div>
      </div>
    </div>
  );
}

export function WhyConsiderSection() {
  return (
    <SectionShell id="about-odette" gradientTone={0}>
      <div className="flex w-full max-w-6xl flex-col items-center">
        <SectionHeading
          compact
          centered
          pill="About Odette"
          title="A Mass-Premium Fashion Brand Built for India"
          subtitle="Odette blends trend-led design, accessible pricing, and a growing retail footprint — creating a brand customers trust and investors can scale."
        />

        <div className="grid w-full items-center gap-6 md:grid-cols-[0.95fr_1.05fr] md:gap-10 lg:gap-12">
          <OdetteBrandCard />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="min-w-0 text-left"
          >
            <p className={sectionBodyTextClass}>
              Odette is India&apos;s mass-premium fashion brand — high-fashion style at
              pocket-friendly prices for ages 15 to 65.
              <br />
              <br />
              Founded in Bengaluru in 2020, it has grown to 45+ stores with Western and lifestyle
              collections customers trust.
              <br />
              <br />
              Fresh designs, premium quality, and accessible pricing — a brand built to scale for
              customers and franchise partners alike.
            </p>
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
