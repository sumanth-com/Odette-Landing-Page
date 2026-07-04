"use client";

import { ArrowRight } from "lucide-react";
import { GoldButton } from "../ui/GoldButton";

export function FinalCTASection() {
  const scrollToForm = () => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="viewport-section relative bg-charcoal">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-charcoal via-[#333] to-[#1f1f1f]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="page-container section-offset relative z-10 w-full py-10 text-center lg:py-12">
        <h2 className="mx-auto max-w-3xl font-display text-2xl leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
          Interested in Exploring the Odette Franchise Opportunity?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          If you&apos;re looking to invest in a premium fashion business, our team is here to help you
          understand the opportunity and answer your questions.
        </p>
        <div className="mt-8">
          <GoldButton size="large" onClick={scrollToForm}>
            Get Franchise Details
            <ArrowRight className="h-4 w-4" />
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
