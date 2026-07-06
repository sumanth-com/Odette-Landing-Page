"use client";

import HeroImage from "@/assets/Hero.png";
import MobHeroImage from "@/assets/MobHero.png";
import { handleSectionNavClick } from "@/lib/scroll";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { fadeUp, staggerContainer } from "../ui/AnimatedSection";

const heroHighlights = [
  "Premium Fashion Brand",
  "End-to-End Franchise Support",
  "High Growth Retail Opportunity",
  "Dedicated Business Consultants",
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="viewport-section relative snap-section overflow-hidden max-lg:overflow-visible"
    >
      <Image
        src={MobHeroImage}
        alt=""
        fill
        priority
        quality={100}
        className="object-cover object-[center_20%] lg:hidden"
        sizes="100vw"
      />
      <Image
        src={HeroImage}
        alt=""
        fill
        priority
        quality={100}
        className="hidden object-cover object-[50%_35%] lg:block"
        sizes="100vw"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-white from-0% via-white via-[22%] via-ivory/85 via-[34%] to-transparent to-[52%] lg:block"
        aria-hidden
      />

      <div className="page-container relative z-10 box-border flex w-full flex-col overflow-hidden pb-8 pt-[var(--header-height)] max-lg:h-auto max-lg:min-h-0 max-lg:justify-start max-lg:overflow-visible max-lg:pb-6 max-lg:pt-[calc(var(--header-height)+2.25rem)] lg:h-full lg:justify-center lg:overflow-hidden">
        <motion.div
          initial={false}
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-2xl min-w-0 max-lg:mx-auto max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center"
        >
          <motion.div variants={fadeUp} className="max-lg:flex max-lg:w-full max-lg:justify-center">
            <span className="inline-flex items-center rounded-full border border-cta/20 bg-white/95 px-4 py-1.5 text-[11px] font-semibold leading-snug text-charcoal backdrop-blur-sm sm:text-xs">
              Premium Women&apos;s Fashion Franchise Opportunity
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display text-[1.65rem] leading-[1.22] tracking-tight text-charcoal max-lg:mt-3 sm:text-[2rem] lg:mt-4 lg:text-[2.35rem]"
          >
            Own an Odette Franchise &amp; Build a Profitable Fashion Business
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl text-sm leading-relaxed text-black max-lg:mx-auto sm:text-base lg:mt-4"
          >
            Launch your Odette franchise with expert guidance from iFranchise—from planning
            and setup to a successful store launch.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5 max-lg:flex max-lg:w-full max-lg:justify-center lg:mt-6">
            <a
              href="#contact"
              onClick={(e) => handleSectionNavClick(e, "#contact")}
              className="inline-flex items-center justify-center rounded-full bg-cta px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(91,45,139,0.28)] transition-colors duration-300 hover:bg-cta-hover"
            >
              Start Your Franchise Journey
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-5 hidden gap-2 lg:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5"
          >
            {heroHighlights.map((item, index) => (
              <li
                key={item}
                className={`flex items-center gap-2 ${index % 2 === 1 ? "sm:-ml-10 sm:gap-1" : ""}`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta/10">
                  <Check className="h-3 w-3 text-cta" strokeWidth={2.5} />
                </span>
                <span className="text-sm font-medium text-charcoal">{item}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
