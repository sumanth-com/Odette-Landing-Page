import { leadSchema, normalizeLeadInput } from "@/lib/leadSchema";
import { isGoogleAppsScriptConfigured } from "@/lib/googleSheetsConfig";
import { sendLeadEmails } from "@/lib/sendLeadEmails";
import { submitLeadToGoogleSheets } from "@/lib/submitLeadToGoogleSheets";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

function validationErrorResponse(error: ZodError) {
  const firstIssue = error.issues[0];

  return NextResponse.json(
    {
      success: false,
      error: firstIssue?.message || "Invalid form submission",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    },
    { status: 400 }
  );
}

const GENERIC_FAILURE_MESSAGE =
  "We couldn't submit your inquiry right now. Please try again in a moment or call us directly.";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid form submission" },
        { status: 400 }
      );
    }

    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return validationErrorResponse(parsed.error);
    }

    const lead = normalizeLeadInput(parsed.data);
    const sheetsPayload = {
      fullName: lead.fullName,
      mobileNumber: lead.mobileNumber,
      email: lead.email,
      state: lead.state,
      city: lead.city,
      investmentBudget: lead.investmentBudget,
      source: lead.source,
      utmParameters: lead.utmParameters,
    };

    // Sheets first — lead capture must not depend on email succeeding
    let sheetsSynced = false;
    let sheetsError: string | undefined;

    if (isGoogleAppsScriptConfigured()) {
      try {
        await submitLeadToGoogleSheets(sheetsPayload);
        sheetsSynced = true;
      } catch (error) {
        sheetsError = errorMessage(error, "Google Sheets sync failed");
        console.error("Google Sheets sync failed:", sheetsError);
      }
    } else {
      sheetsError =
        "GOOGLE_SCRIPT_URL is not configured (set it in Vercel → Settings → Environment Variables for Production, then Redeploy)";
      console.error("Google Sheets sync skipped:", sheetsError);
    }

    // Emails second — a Resend issue never blocks Sheets
    let notificationSent = false;
    let confirmationSent = false;
    try {
      const emails = await sendLeadEmails(lead);
      notificationSent = true;
      confirmationSent = emails.confirmationSent;
    } catch (error) {
      console.error(
        "Lead notification email failed:",
        errorMessage(error, "Unknown Resend error")
      );
    }

    // Only report success if the lead reached the sheet or the team inbox
    if (!sheetsSynced && !notificationSent) {
      console.error("Lead was not captured by any channel", { sheetsError });

      return NextResponse.json(
        { success: false, error: GENERIC_FAILURE_MESSAGE },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      confirmationSent,
      sheetsSynced,
    });
  } catch (error) {
    console.error(
      "Contact form submission failed:",
      errorMessage(error, "Unknown error")
    );

    return NextResponse.json(
      { success: false, error: GENERIC_FAILURE_MESSAGE },
      { status: 500 }
    );
  }
}
