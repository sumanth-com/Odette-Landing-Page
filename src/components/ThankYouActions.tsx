"use client";

import { trackBookConsultation } from "@/lib/analytics";

interface ThankYouActionsProps {
  meetingUrl: string;
}

export function ThankYouActions({ meetingUrl }: ThankYouActionsProps) {
  return (
    <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
      <a
        href={meetingUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackBookConsultation("thank_you_page")}
        className="inline-flex min-h-[2.85rem] flex-1 items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(91,45,139,0.28)] transition-colors hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
      >
        Book a Meeting Now
      </a>
      <a
        href="https://wa.me/919129130303?text=Hi%2C%20I%20just%20submitted%20an%20Odette%20franchise%20enquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[2.85rem] flex-1 items-center justify-center rounded-full border border-cta/25 bg-white px-6 py-3 text-sm font-semibold text-cta shadow-sm transition-colors hover:bg-cta/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
      >
        Chat on WhatsApp
      </a>
    </div>
  );
}
