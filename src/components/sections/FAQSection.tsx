"use client";

import { FAQ_ITEMS } from "@/lib/faqs";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { StaggerGroup, StaggerItem } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="rounded-xl border border-cta/25 bg-white px-4 py-2.5 shadow-[0_2px_16px_rgba(91,45,139,0.06)] sm:px-5 sm:py-3">
      <button
        id={buttonId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="font-display text-[13px] font-semibold leading-snug text-charcoal sm:text-sm">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cta/10"
        >
          <ChevronDown className="h-3.5 w-3.5 text-cta" strokeWidth={2} aria-hidden />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pt-2 text-xs leading-relaxed text-black sm:text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <SectionShell id="faq" gradientTone={4} ariaLabel="Frequently asked questions about the Odette franchise">
      <div className="section-fit mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
        <SectionHeading
          compact
          centered
          pill="FAQ"
          title="Frequently Asked Questions"
          subtitle="Answers about the Odette premium fashion franchise in India."
        />

        <StaggerGroup className="flex w-full flex-col gap-2 sm:gap-2.5">
          {FAQ_ITEMS.map((faq) => (
            <StaggerItem key={faq.question}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </SectionShell>
  );
}
