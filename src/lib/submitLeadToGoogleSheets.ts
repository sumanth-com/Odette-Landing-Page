import {
  isGoogleAppsScriptConfigured,
  submitPayloadToGoogleAppsScript,
} from "@/lib/googleAppsScript";
import type { LeadPayload } from "@/lib/submitLead";

export async function submitLeadToGoogleSheets(payload: LeadPayload): Promise<void> {
  if (!isGoogleAppsScriptConfigured()) {
    throw new Error("GOOGLE_SCRIPT_URL is not configured");
  }

  await submitPayloadToGoogleAppsScript({
    fullName: payload.fullName,
    mobileNumber: payload.mobileNumber,
    email: payload.email,
    state: payload.state,
    city: payload.city,
    investmentBudget: payload.investmentBudget,
  });
}
