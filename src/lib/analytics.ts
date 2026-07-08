"use client";

import { isAnalyticsEnabled } from "@/lib/analytics-config";
import { sendGAEvent } from "@next/third-parties/google";

const FORM_NAME = "Odette Landing Page";

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

function trackEvent(eventName: string, params: AnalyticsEventParams = {}): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined") {
    return;
  }

  const eventParams = {
    page_location: window.location.href,
    page_title: document.title,
    page_path: `${window.location.pathname}${window.location.search}`,
    ...params,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
    return;
  }

  sendGAEvent("event", eventName, eventParams);
}

export function trackPageView(pagePath?: string): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined") {
    return;
  }

  const path =
    pagePath ?? `${window.location.pathname}${window.location.search}${window.location.hash}`;

  trackEvent("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackGenerateLead(): void {
  trackEvent("generate_lead", { form_name: FORM_NAME });
  trackFormSubmission();
}

export function trackFormSubmission(): void {
  trackEvent("form_submission", { form_name: FORM_NAME });
}

export function trackBookConsultation(source: string): void {
  trackEvent("book_consultation", { source });
}

export function trackDownloadBrochure(source: string): void {
  trackEvent("download_brochure", { source });
}

export function trackPhoneClick(source: string): void {
  trackEvent("phone_click", { source });
}

export function trackWhatsAppClick(source: string): void {
  trackEvent("whatsapp_click", { source });
}
