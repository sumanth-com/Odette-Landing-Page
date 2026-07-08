"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3ebf9] px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cta">500</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-charcoal">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-black/70">
        We could not load this page right now. Please try again or return to the Odette franchise
        homepage.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(91,45,139,0.22)] transition-colors hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </main>
  );
}
