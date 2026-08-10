import type { Metadata } from "next";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  CONTACT_PATH,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  HOME_PATH,
  MEETING_URL,
} from "@/lib/site";
import { ThankYouActions } from "@/components/ThankYouActions";

export const metadata: Metadata = {
  title: "Thank You | Odette Franchise Enquiry Received",
  description:
    "Thank you for your Odette franchise enquiry. Our iFranchise consultants will contact you shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#f3ebf9]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 15% 10%, rgba(91,45,139,0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 85%, rgba(91,45,139,0.14), transparent 50%), linear-gradient(160deg, #f8f3fc 0%, #efe4f7 45%, #f3ebf9 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-cta/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-cta/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="inline-flex items-center rounded-full border border-cta/20 bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cta shadow-sm">
          Enquiry received
        </p>

        <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-full border border-cta/20 bg-white shadow-[0_12px_40px_rgba(91,45,139,0.18)]">
          <svg
            className="h-10 w-10 text-cta"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mt-8 font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl md:text-[2.75rem]">
          Thank you for your interest in Odette
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/70 sm:text-base">
          Your franchise eligibility enquiry is with our team. A consultant from iFranchise will
          reach out within one business day to discuss investment, locations, and next steps.
        </p>

        <div className="mt-10 grid w-full max-w-lg gap-3 text-left sm:grid-cols-3">
          {[
            { step: "01", label: "Review", detail: "We check your city & budget fit" },
            { step: "02", label: "Call", detail: "A consultant connects with you" },
            { step: "03", label: "Plan", detail: "Discuss model & store launch" },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-white/80 bg-white/85 px-4 py-4 shadow-[0_8px_28px_rgba(43,43,43,0.08)] backdrop-blur-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cta">
                {item.step}
              </p>
              <p className="mt-1 font-display text-base font-semibold text-charcoal">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-black/60">{item.detail}</p>
            </div>
          ))}
        </div>

        <ThankYouActions meetingUrl={MEETING_URL} />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-black/65">
          <a href={CONTACT_PHONE} className="transition-colors hover:text-cta">
            {CONTACT_PHONE_DISPLAY}
          </a>
          <span className="hidden text-black/25 sm:inline" aria-hidden>
            ·
          </span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-cta">
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href={HOME_PATH} className="font-medium text-cta underline-offset-4 hover:underline">
            Back to home
          </Link>
          <Link
            href={CONTACT_PATH}
            className="font-medium text-charcoal/70 underline-offset-4 hover:underline"
          >
            Return to contact
          </Link>
        </div>
      </div>
    </main>
  );
}
