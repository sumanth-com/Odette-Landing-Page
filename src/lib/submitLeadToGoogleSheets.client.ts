"use client";

import type { LeadPayload } from "@/lib/submitLead";

function getPublicScriptUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL?.trim() || undefined;
}

/**
 * Browser fallback for live environments where server-side GAS sync fails
 * (missing server env var, serverless timeout, etc.).
 * Uses a simple no-cors POST so the lead still reaches Google Sheets.
 */
export function syncLeadToGoogleSheetsClient(payload: LeadPayload): void {
  const scriptUrl = getPublicScriptUrl();

  if (!scriptUrl || typeof window === "undefined") {
    return;
  }

  const body = new URLSearchParams({
    fullName: payload.fullName,
    mobileNumber: payload.mobileNumber,
    email: payload.email,
    state: payload.state,
    city: payload.city,
    investmentBudget: payload.investmentBudget,
  });

  void fetch(scriptUrl, {
    method: "POST",
    mode: "no-cors",
    body,
    keepalive: true,
  }).catch(() => {
    // Backup path only; the API route remains the primary integration.
  });
}
