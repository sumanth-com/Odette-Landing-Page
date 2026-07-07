import type { LeadPayload } from "@/lib/submitLead";

export async function submitLeadToGoogleSheets(payload: LeadPayload): Promise<void> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.warn("Google Script URL is not set. Lead was not sent to Google Sheets.");
    return;
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google Sheets sync failed with status ${response.status}`);
  }

  const result = (await response.json()) as { success?: boolean; error?: string };

  if (!result.success) {
    throw new Error(result.error || "Google Sheets sync failed");
  }
}
