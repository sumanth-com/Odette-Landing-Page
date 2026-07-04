"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

const steps = [
  {
    number: "01",
    title: "You invest in setting up the store.",
  },
  {
    number: "02",
    title: "The outlet is prepared for launch.",
  },
  {
    number: "03",
    title: "The company manages the daily operations.",
  },
  {
    number: "04",
    title: "You receive ongoing support under the agreed business model.",
  },
];

export function HowItWorksSection() {
  return (
    <SectionShell className="bg-beige">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left — Timeline */}
        <div>
          <SectionHeading compact title="How the Franchise Model Works" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="relative"
          >
            <div
              className="absolute bottom-2 left-[23px] top-2 w-px bg-border lg:left-[27px]"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="relative flex gap-5 pb-6 last:pb-0 lg:pb-5"
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-white luxury-shadow lg:h-14 lg:w-14">
                    <span className="font-display text-sm text-gold">{step.number}</span>
                  </div>
                  <div className="flex flex-col justify-center pt-1">
                    <p className="text-sm leading-relaxed text-charcoal lg:text-base">{step.title}</p>
                    {index < steps.length - 1 && (
                      <span className="mt-2 text-gold/60" aria-hidden="true">
                        ↓
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] w-full max-h-[min(58vh,480px)] overflow-hidden rounded-[24px] luxury-shadow-lg lg:mx-auto lg:max-w-md"
        >
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
            alt="Elegant premium fashion retail environment"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal/20 to-transparent" />
        </motion.div>
      </div>
    </SectionShell>
  );
}
