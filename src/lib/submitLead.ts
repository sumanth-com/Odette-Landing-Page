export interface LeadPayload {
  fullName: string;
  mobileNumber: string;
  email?: string;
  state: string;
  city: string;
  investmentBudget: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.warn("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set. Lead was not sent to Google Sheets.");
    return;
  }

  await fetch(scriptUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
