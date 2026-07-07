import type { LeadPayload } from "@/lib/submitLead";

export function getGoogleScriptUrl(): string | undefined {
  return (
    process.env.GOOGLE_SCRIPT_URL?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL?.trim() ||
    undefined
  );
}

export function isGoogleAppsScriptConfigured(): boolean {
  return Boolean(getGoogleScriptUrl());
}

export function buildGoogleSheetsPayload(
  payload: LeadPayload
): Record<string, string> {
  return {
    fullName: payload.fullName,
    mobileNumber: payload.mobileNumber,
    email: payload.email,
    state: payload.state,
    city: payload.city,
    investmentBudget: payload.investmentBudget,
  };
}
