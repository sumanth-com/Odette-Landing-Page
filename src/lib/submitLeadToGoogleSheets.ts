import { submitPayloadToGoogleAppsScript } from "@/lib/googleAppsScript";
import {
  buildGoogleSheetsPayload,
  isGoogleAppsScriptConfigured,
} from "@/lib/googleSheetsConfig";
import type { LeadPayload } from "@/lib/submitLead";

export async function submitLeadToGoogleSheets(payload: LeadPayload): Promise<void> {
  if (!isGoogleAppsScriptConfigured()) {
    throw new Error("GOOGLE_SCRIPT_URL is not configured");
  }

  await submitPayloadToGoogleAppsScript(buildGoogleSheetsPayload(payload));
}
