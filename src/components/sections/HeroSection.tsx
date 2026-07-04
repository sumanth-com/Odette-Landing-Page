"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Building2, IndianRupee, MapPin, Shield, Store } from "lucide-react";
import { fadeUp, staggerContainer } from "../ui/AnimatedSection";
import { EnquiryForm } from "../ui/EnquiryForm";
import { GoldButton } from "../ui/GoldButton";

const topCards = [
  {
    icon: IndianRupee,
    label: "Investment",
    value: "₹45 Lakhs+",
  },
  {
    icon: Building2,
    label: "Business Model",
    value: "FICO",
  },
  {
    icon: Store,
    label: "Store Operations",
    value: "Company Operated",
  },
];

const bottomCards = [
  {
    icon: Shield,
    label: "Minimum Guarantee",
    value: "1.25 Lakhs or 12% Revenue Share* (whichever is higher)",
  },
  {
    icon: MapPin,
    label: "Expansion",
    value: "Selected Cities Across India",
  },
];

function HighlightCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof IndianRupee;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="luxury-shadow group h-full rounded-[20px] border border-border bg-white/95 p-4 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(43,43,43,0.08)] lg:p-5"
    >
      <div className="mb-2.5 flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-beige transition-colors duration-300 group-hover:bg-gold/15">
          <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-taupe">{label}</p>
      </div>
      <p className="text-sm font-medium leading-snug text-charcoal">{value}</p>
    </motion.div>
  );
}

export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="viewport-section relative !justify-start">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b495597652?auto=format&fit=crop&w=2400&q=80"
          alt="Premium Odette fashion showroom interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ivory/95 via-ivory/88 to-ivory/75" />
        <div className="absolute inset-0 bg-linear-to-b from-ivory/30 via-transparent to-ivory/50" />
      </div>

      <div className="page-container section-offset relative w-full pb-8 pt-0 lg:pb-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_minmax(320px,400px)] lg:gap-10 xl:gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex min-w-0 flex-col"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 lg:gap-4">
              <span className="inline-flex items-center rounded-full border border-gold/30 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold backdrop-blur-sm">
                Premium Fashion Franchise Opportunity
              </span>
              <span className="text-sm font-medium text-charcoal lg:text-base">
                Investment starts from ₹45 Lakhs.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 font-display text-[2rem] leading-[1.22] tracking-tight text-charcoal sm:text-[2.35rem] lg:text-[2.5rem] xl:text-[2.65rem]"
            >
              Own a Premium Fashion Business
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-sm leading-relaxed text-taupe lg:text-base"
            >
              Partner with Odette through a company-operated franchise model designed for investors
              looking to own a premium fashion business.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {topCards.map((card) => (
                  <HighlightCard key={card.label} {...card} />
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {bottomCards.map((card) => (
                  <HighlightCard key={card.label} {...card} />
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-6 space-y-4 border-t border-border/60 pt-5"
            >
              <GoldButton onClick={scrollToForm}>
                Get Franchise Details
                <ArrowRight className="h-4 w-4" />
              </GoldButton>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-1.5 text-xs text-taupe">
                  <Shield className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span>Company Operated Model</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-taupe">
                  <Store className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span>Premium Fashion Retail</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-taupe">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span>Selected Cities Across India</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="hero-form-scroll min-w-0 lg:max-h-[calc(100dvh-var(--header-height)-2rem)] lg:overflow-y-auto lg:overscroll-contain">
            <EnquiryForm variant="hero" id="enquiry-form" />
          </div>
        </div>
      </div>
    </section>
  );
}
