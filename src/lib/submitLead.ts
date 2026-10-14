export interface LeadPayload {
  fullName: string;
  mobileNumber: string;
  email: string;
  state: string;
  city: string;
  investmentBudget: string;
  source: string;
  utmParameters: string;
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

const DEFAULT_ERROR_MESSAGE = "Unable to submit your inquiry. Please try again.";

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  let response: Response;

  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    throw new LeadSubmissionError(
      "Network error — please check your connection and try again."
    );
  }

  let result: {
    success?: boolean;
    error?: string;
    confirmationSent?: boolean;
    sheetsSynced?: boolean;
  } = {};

  try {
    result = await response.json();
  } catch {
    // Non-JSON body (e.g. a platform timeout page) — fall through to the generic error
  }

  if (!response.ok || !result.success) {
    throw new LeadSubmissionError(result.error || DEFAULT_ERROR_MESSAGE);
  }

  return {
    confirmationSent: Boolean(result.confirmationSent),
    sheetsSynced: Boolean(result.sheetsSynced),
  };
}
