"use client";

import { trackBookConsultation } from "@/lib/analytics";
import {
  CONTACT_EMAIL,
  CONTACT_PATH,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  HOME_PATH,
  MEETING_URL,
} from "@/lib/site";
import { motion } from "framer-motion";
import Link from "next/link";

const STEPS = [
  { step: "01", label: "Review", detail: "We check your city & budget fit" },
  { step: "02", label: "Call", detail: "A consultant connects with you" },
  { step: "03", label: "Plan", detail: "Discuss model & store launch" },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ThankYouContent() {
  return (
    <main className="relative h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#f3ebf9]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 15% 10%, rgba(91,45,139,0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 85%, rgba(91,45,139,0.14), transparent 50%), linear-gradient(160deg, #f8f3fc 0%, #efe4f7 45%, #f3ebf9 100%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-cta/15 blur-3xl"
        aria-hidden
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-cta/20 blur-3xl"
        aria-hidden
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <div className="relative z-[1] mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center px-5 py-4 text-center sm:px-6 sm:py-6">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="inline-flex items-center rounded-full border border-cta/20 bg-white/90 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cta shadow-sm sm:text-[11px]"
        >
          Enquiry received
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08, ease: easeOut, type: "spring", stiffness: 220, damping: 16 }}
          className="relative mt-3 flex h-14 w-14 items-center justify-center rounded-full border border-cta/20 bg-white shadow-[0_12px_40px_rgba(91,45,139,0.18)] sm:mt-4 sm:h-16 sm:w-16"
        >
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-cta/30"
            initial={{ scale: 0.85, opacity: 0.8 }}
            animate={{ scale: 1.45, opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
            aria-hidden
          />
          <motion.svg
            className="h-7 w-7 text-cta sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.28, ease: easeOut }}
            />
          </motion.svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: easeOut }}
          className="mt-3 max-w-xl font-display text-[1.55rem] font-bold leading-tight text-charcoal sm:mt-4 sm:text-3xl md:text-[2.15rem]"
        >
          Thank you for your interest in Odette
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28, ease: easeOut }}
          className="mt-2 max-w-lg text-xs leading-relaxed text-black/70 sm:mt-2.5 sm:text-sm"
        >
          Your franchise eligibility enquiry is with our team. A consultant from iFranchise will
          reach out within one business day to discuss investment, locations, and next steps.
        </motion.p>

        <div className="mt-4 grid w-full max-w-lg grid-cols-3 gap-2 text-left sm:mt-5 sm:gap-3">
          {STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34 + index * 0.08, ease: easeOut }}
              className="rounded-xl border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-[0_8px_28px_rgba(43,43,43,0.08)] backdrop-blur-sm sm:rounded-2xl sm:px-3.5 sm:py-3.5"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cta sm:text-[11px]">
                {item.step}
              </p>
              <p className="mt-0.5 font-display text-xs font-semibold text-charcoal sm:text-sm">
                {item.label}
              </p>
              <p className="mt-0.5 text-[10px] leading-snug text-black/60 sm:text-xs sm:leading-relaxed">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.58, ease: easeOut }}
          className="mt-4 flex w-full max-w-md flex-col gap-2 sm:mt-5 sm:flex-row sm:justify-center sm:gap-3"
        >
          <a
            href={MEETING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackBookConsultation("thank_you_page")}
            className="inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(46,12,162,0.28)] transition-transform hover:bg-brand-hover hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Book a Meeting Now
          </a>
          <a
            href="https://wa.me/919129130303?text=Hi%2C%20I%20just%20submitted%20an%20Odette%20franchise%20enquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-full border border-cta/25 bg-white px-5 py-2.5 text-sm font-semibold text-cta shadow-sm transition-transform hover:bg-cta/5 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Chat on WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-black/60 sm:mt-4 sm:text-xs"
        >
          <a href={CONTACT_PHONE} className="transition-colors hover:text-cta">
            {CONTACT_PHONE_DISPLAY}
          </a>
          <span className="text-black/25" aria-hidden>
            ·
          </span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-cta">
            {CONTACT_EMAIL}
          </a>
          <span className="text-black/25" aria-hidden>
            ·
          </span>
          <Link href={HOME_PATH} className="font-medium text-cta underline-offset-2 hover:underline">
            Home
          </Link>
          <span className="text-black/25" aria-hidden>
            ·
          </span>
          <Link
            href={CONTACT_PATH}
            className="font-medium text-charcoal/65 underline-offset-2 hover:underline"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
