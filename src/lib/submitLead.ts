export interface LeadPayload {
  fullName: string;
  mobileNumber: string;
  email: string;
  state: string;
  city: string;
  investmentBudget: string;
}

export interface SubmitLeadResult {
  confirmationSent: boolean;
  sheetsSynced: boolean;
}

export class LeadSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LeadSubmissionError";
  }
}

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as {
    success?: boolean;
    error?: string;
    confirmationSent?: boolean;
    sheetsSynced?: boolean;
  };

  if (!response.ok || !result.success) {
    throw new LeadSubmissionError(
      result.error || "Unable to submit your inquiry. Please try again."
    );
  }

  return {
    confirmationSent: Boolean(result.confirmationSent),
    sheetsSynced: Boolean(result.sheetsSynced),
  };
}
