"use client";

import HeroImage from "@/assets/Hero.png";
import MobHeroImage from "@/assets/MobHero.png";
import { CONTACT_PATH } from "@/lib/site";
import { useSectionNavigation } from "@/lib/useSectionNavigation";
import { type ElementType } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2, Calendar, IndianRupee, Tag } from "lucide-react";
import Image from "next/image";
import { fadeUp, staggerContainer } from "../ui/AnimatedSection";
import { ctaButtonClass } from "../ui/GoldButton";
import { EnquiryForm } from "../ui/EnquiryForm";

function HighlightCard({
  label,
  icon: Icon,
  fullWidth = false,
}: {
  label: string;
  icon: ElementType;
  fullWidth?: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-1.5 rounded-[12px] border border-cta/20 bg-white px-2 py-2 shadow-[0_4px_14px_rgba(91,45,139,0.07)] sm:gap-2 sm:px-2.5 sm:py-2.5 lg:px-3 lg:py-3 ${
        fullWidth ? "col-span-2" : "min-h-[2.75rem] lg:min-h-0"
      }`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta/10 sm:h-6 sm:w-6">
        <Icon className="h-2.5 w-2.5 text-cta sm:h-3 sm:w-3" strokeWidth={2.25} />
      </span>
      <span
        className={`min-w-0 flex-1 text-left font-semibold leading-snug text-charcoal ${
          fullWidth
            ? "text-[9px] leading-tight sm:text-[11px] sm:leading-snug md:text-xs lg:text-sm"
            : "text-[10px] sm:text-xs md:text-sm lg:text-sm"
        }`}
      >
        {label}
      </span>
    </li>
  );
}

function HeroHighlightCards() {
  return (
    <ul
      className="hero-highlight-grid grid grid-cols-2 gap-2 sm:gap-2.5"
      role="list"
    >
      <HighlightCard label="Investment: ₹45 Lakhs+" icon={IndianRupee} />
      <HighlightCard label="Model: FICO" icon={Tag} />
      <HighlightCard label="Agreement Term: 5 years" icon={Calendar} />
      <HighlightCard label="45+ Outlets" icon={Building2} />
      <HighlightCard
        label="Franchise Types: Master Franchise · Unit Franchise"
        icon={Briefcase}
        fullWidth
      />
    </ul>
  );
}

export function HeroSection() {
  const { navigate } = useSectionNavigation();

  return (
    <section
      id="hero"
      className="viewport-section relative snap-section overflow-x-clip max-lg:min-h-[100dvh] max-lg:overflow-visible lg:overflow-hidden"
    >
      <div className="hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src={MobHeroImage}
          alt=""
          fill
          priority
          quality={100}
          className="object-cover object-center lg:hidden"
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
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-white/55 from-0% via-white/25 via-[24%] to-transparent to-[46%] lg:block"
        aria-hidden
      />

      <div className="page-container relative z-10 box-border flex w-full flex-col pb-8 pt-[var(--header-height)] max-lg:overflow-visible max-lg:pb-6 max-lg:pt-[calc(var(--header-height)+0.75rem)] lg:h-full lg:justify-center lg:overflow-hidden">
        <motion.div
          initial={false}
          animate="visible"
          variants={staggerContainer}
          className="hero-stack w-full min-h-0 flex-1 max-lg:flex max-lg:flex-col max-lg:gap-2.5 max-lg:overflow-visible lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-12"
        >
          <div className="hero-left flex w-full max-w-2xl flex-col items-center overflow-visible max-lg:mx-auto max-lg:w-full max-lg:min-w-0 max-lg:max-w-[min(100%,19.5rem)] max-lg:shrink-0 max-lg:pt-0 max-lg:text-center md:max-w-[min(100%,34rem)] lg:w-[580px] lg:max-w-[580px] lg:items-start lg:shrink-0 lg:pt-0 lg:text-left xl:w-[640px] xl:max-w-[640px]">
            <motion.div variants={fadeUp} className="max-lg:flex max-lg:w-full max-lg:justify-center">
              <span className="inline-flex max-w-full items-center justify-center rounded-full border border-cta/20 bg-white/95 px-4 py-1.5 text-center font-semibold text-charcoal backdrop-blur-sm max-lg:px-2.5 max-lg:py-1 max-lg:leading-tight max-lg:tracking-[0.02em] text-[8px] sm:whitespace-nowrap sm:text-[9px] md:text-[10px] lg:text-[11px] lg:leading-snug lg:tracking-normal xl:text-xs">
                Premium Women&apos;s Fashion Franchise Opportunity
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-3 w-full max-w-full font-display text-[0.95rem] font-bold uppercase leading-[1.2] tracking-[0.03em] text-charcoal max-lg:mt-1.5 max-lg:leading-[1.12] md:text-[1.15rem] lg:mt-4 lg:text-[1.85rem] xl:text-[2.05rem]"
            >
              <span className="block">You Invest.</span>
              <span className="block">WE RUN THE BUSINESS.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 w-full max-w-full text-[10px] leading-snug text-black max-lg:mx-auto max-lg:mt-1.5 max-lg:max-w-[17.5rem] md:max-w-md md:text-xs md:leading-relaxed lg:mt-4 lg:max-w-xl lg:text-[15px] lg:leading-relaxed xl:text-base"
            >
              Own a premium women&apos;s fashion store with a professionally{" "}
              <span className="block">managed FICO business model.</span>
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-4 w-full max-w-full max-lg:mx-auto max-lg:mt-2 max-lg:max-w-[min(100%,19.5rem)] md:max-w-[min(100%,34rem)] lg:mt-5 lg:max-w-md"
            >
              <HeroHighlightCards />

              <a
                href="#hero-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("hero-form")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className={`hero-scroll-cta mt-2 lg:hidden ${ctaButtonClass({ fullWidth: true })} uppercase tracking-[0.06em]`}
              >
                Enquire Now
                <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-4 max-lg:hidden lg:mt-5">
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
            className="hero-form-wrap flex min-h-0 w-full max-lg:mx-auto max-lg:mt-0 max-lg:max-w-[min(100%,19.5rem)] max-lg:min-w-0 max-lg:flex-none md:max-w-[min(100%,28rem)] lg:ml-auto lg:mr-[-0.75rem] lg:mt-0 lg:w-[380px] lg:max-w-[380px] lg:shrink-0 lg:self-center lg:translate-x-2 xl:mr-[-1rem] xl:w-[400px] xl:max-w-[400px] xl:translate-x-3"
          >
            <EnquiryForm
              variant="hero"
              id="hero-form"
              heading="Check Your Franchise Eligibility"
              buttonText="CHECK FRANCHISE AVAILABILITY"
              showHeading
              showEmail={true}
              showBudget
              stackStateCityOnMobile
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
