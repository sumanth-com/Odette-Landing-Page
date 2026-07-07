"use client";

import HeroImage from "@/assets/Hero.png";
import MobHeroImage from "@/assets/MobHero.png";
import { CONTACT_PATH } from "@/lib/site";
import { useSectionNavigation } from "@/lib/useSectionNavigation";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { fadeUp, staggerContainer } from "../ui/AnimatedSection";
import { ctaButtonClass } from "../ui/GoldButton";
import { EnquiryForm } from "../ui/EnquiryForm";

const investmentHighlights = [
  "Company Operated",
  "5-Year Agreement",
  "40+ Outlets",
  "Premium Women's Fashion",
] as const;

export function HeroSection() {
  const { navigate } = useSectionNavigation();

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
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-white/55 from-0% via-white/25 via-[24%] to-transparent to-[46%] lg:block"
        aria-hidden
      />

      <div className="page-container relative z-10 box-border flex w-full flex-col overflow-hidden pb-8 pt-[var(--header-height)] max-lg:h-auto max-lg:min-h-0 max-lg:justify-start max-lg:overflow-visible max-lg:pb-5 max-lg:pt-[calc(var(--header-height)+1.35rem)] lg:h-full lg:justify-center lg:overflow-hidden">
        <motion.div
          initial={false}
          animate="visible"
          variants={staggerContainer}
          className="flex w-full min-h-0 flex-1 flex-col gap-3.5 max-lg:gap-3 max-lg:overflow-hidden lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-12"
        >
          <div className="hero-left flex w-full max-w-2xl flex-col overflow-visible max-lg:mx-auto max-lg:pt-1 max-lg:text-center lg:w-[580px] lg:max-w-[580px] lg:shrink-0 lg:pt-0 xl:w-[640px] xl:max-w-[640px]">
            <motion.div variants={fadeUp} className="max-lg:flex max-lg:w-full max-lg:justify-center">
              <span className="inline-flex items-center justify-center rounded-full border border-cta/20 bg-white/95 px-4 py-1.5 font-semibold text-charcoal backdrop-blur-sm max-lg:whitespace-nowrap max-lg:px-2.5 max-lg:py-1 max-lg:text-[8px] max-lg:tracking-[0.02em] lg:text-[11px] lg:leading-snug lg:tracking-normal xl:text-xs">
                Premium Women&apos;s Fashion Franchise Opportunity
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-3 font-display text-[1.28rem] font-bold uppercase leading-[1.2] tracking-[0.03em] text-charcoal max-lg:mt-2.5 max-lg:text-[1.02rem] max-lg:leading-[1.15] lg:mt-4 lg:text-[1.85rem] xl:text-[2.05rem]"
            >
              <span className="block">You Invest.</span>
              <span className="block">WE RUN THE BUSINESS.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-sm leading-relaxed text-black max-lg:mx-auto max-lg:mt-2.5 max-lg:max-w-[19rem] max-lg:text-[11px] max-lg:leading-snug lg:mt-4 lg:max-w-xl lg:text-[15px] xl:text-base"
            >
              Own a premium women&apos;s fashion store with a professionally{" "}
              <span className="block">managed FICO business model.</span>
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-4 w-full max-lg:mx-auto max-lg:max-w-[20rem] lg:mt-5 lg:max-w-md"
            >
              <div className="rounded-[16px] border border-cta/20 bg-white/95 p-3.5 shadow-[0_8px_32px_rgba(91,45,139,0.08)] backdrop-blur-sm sm:p-4 lg:rounded-[18px] lg:p-4">
                <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-black sm:text-sm">
                    Investment
                  </span>
                  <span className="font-display text-base font-bold text-charcoal sm:text-lg lg:text-xl">
                    ₹45 Lakhs+
                  </span>
                </div>

                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2">
                  {investmentHighlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta/10">
                        <Check className="h-3 w-3 text-cta" strokeWidth={2.5} />
                      </span>
                      <span className="text-[11px] font-medium leading-snug text-charcoal sm:text-xs lg:text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-4 max-lg:mx-auto lg:mt-5">
              <a
                href={CONTACT_PATH}
                onClick={(e) => navigate(e, CONTACT_PATH)}
                className={`${ctaButtonClass()} whitespace-nowrap uppercase tracking-[0.06em]`}
              >
                Enquire Now
                <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="hero-form-wrap flex min-h-0 w-full max-lg:mx-auto max-lg:mt-0.5 max-lg:max-w-[20rem] max-lg:shrink-0 lg:ml-auto lg:mr-[-0.75rem] lg:mt-0 lg:w-[380px] lg:shrink-0 lg:self-center lg:translate-x-2 xl:mr-[-1rem] xl:w-[400px] xl:translate-x-3"
          >
            <EnquiryForm
              variant="hero"
              id="hero-form"
              heading="Check Your Franchise Eligibility"
              buttonText="CHECK FRANCHISE AVAILABILITY"
              showHeading
              showEmail
              showBudget
              stackStateCityOnMobile
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
