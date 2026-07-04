"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { StaggerGroup, StaggerItem } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

const faqs = [
  {
    question: "What is the minimum investment?",
    answer: "Investment starts from ₹45 Lakhs.",
  },
  {
    question: "Who manages the store?",
    answer: "The company manages the day-to-day operations under the FICO model.",
  },
  {
    question: "What support will I receive?",
    answer: "Support includes guidance for setup, launch, operations, and ongoing business assistance.",
  },
  {
    question: "Which cities are available?",
    answer: "Franchise opportunities are available in selected cities across India.",
  },
  {
    question: "How do I get started?",
    answer:
      "Submit the enquiry form and our franchise consultant will contact you to discuss the opportunity.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-300 hover:text-gold lg:py-3.5"
        aria-expanded={isOpen}
      >
        <span className="font-display text-sm text-charcoal lg:text-base">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-gold" strokeWidth={1.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-relaxed text-taupe">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <SectionShell className="bg-white">
      <SectionHeading compact title="Frequently Asked Questions" centered />

      <StaggerGroup className="mx-auto w-full max-w-3xl">
        <StaggerItem>
          <div className="luxury-shadow rounded-[22px] border border-border bg-white px-5 md:px-8">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </StaggerItem>
      </StaggerGroup>
    </SectionShell>
  );
}
