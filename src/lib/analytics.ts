"use client";

import { isAnalyticsEnabled } from "@/lib/analytics-config";
import { sendGAEvent } from "@next/third-parties/google";

const FORM_NAME = "Odette Landing Page";

export function trackPageView(pagePath?: string): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined") {
    return;
  }

  const path =
    pagePath ?? `${window.location.pathname}${window.location.search}${window.location.hash}`;

  const eventParams = {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", eventParams);
    return;
  }

  sendGAEvent("event", "page_view", eventParams);
}

export function trackGenerateLead(): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined") {
    return;
  }

  const eventParams = {
    form_name: FORM_NAME,
    page_location: window.location.href,
    page_title: document.title,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", eventParams);
    return;
  }

  sendGAEvent("event", "generate_lead", eventParams);
}
