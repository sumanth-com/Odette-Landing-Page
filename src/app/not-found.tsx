import Link from "next/link";
import type { Metadata } from "next";
import { HOME_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3ebf9] px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cta">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-charcoal">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-black/70">
        The page you are looking for does not exist or may have moved. Return to the Odette
        franchise landing page to explore the opportunity.
      </p>
      <Link
        href={HOME_PATH}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(91,45,139,0.22)] transition-colors hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
      >
        Back to home
      </Link>
    </main>
  );
}
