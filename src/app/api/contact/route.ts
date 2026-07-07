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

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    };

    await sendLeadEmails(lead);

    let sheetsSynced = false;
    let sheetsError: string | undefined;

    if (isGoogleAppsScriptConfigured()) {
      try {
        await submitLeadToGoogleSheets(sheetsPayload);
        sheetsSynced = true;
      } catch (error) {
        sheetsError =
          error instanceof Error
            ? error.message
            : "Google Sheets sync failed";

        console.error("Google Sheets sync failed after email delivery:", sheetsError);
      }
    } else {
      sheetsError = "GOOGLE_SCRIPT_URL is not configured";
      console.error("Google Sheets sync skipped:", sheetsError);
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      confirmationSent: Boolean(lead.email),
      sheetsSynced,
      sheetsError: sheetsSynced ? undefined : sheetsError,
    });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to submit your inquiry right now. Please try again.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
