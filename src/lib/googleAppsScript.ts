import { getGoogleScriptUrl, isGoogleAppsScriptConfigured } from "@/lib/googleSheetsConfig";

// Whole Sheets sync must finish well inside the route's 30s maxDuration so emails can still send
const GAS_REQUEST_TIMEOUT_MS = 12_000;
const GAS_TOTAL_BUDGET_MS = 20_000;
const GAS_STRATEGIES: Array<"json" | "form"> = ["form", "json", "form"];

/** Script answered with success:false and an error — retrying would give the same result */
class GoogleAppsScriptRejectedError extends Error {}

/** Request may have reached the script; retrying risks a duplicate row */
class GoogleAppsScriptTimeoutError extends Error {}

export type GoogleAppsScriptResult = {
  success?: boolean;
  error?: string;
  message?: string;
  status?: string;
};

function buildFormBody(payload: Record<string, string>): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(payload)) {
    if (value) {
      params.append(key, value);
    }
  }

  return params.toString();
}

async function parseGoogleAppsScriptResponse(
  response: Response
): Promise<GoogleAppsScriptResult> {
  const raw = (await response.text()).trim();

  if (!raw) {
    throw new Error("Google Sheets sync returned an empty response");
  }

  try {
    return JSON.parse(raw) as GoogleAppsScriptResult;
  } catch {
    throw new Error(
      `Google Sheets sync returned invalid JSON (status ${response.status})`
    );
  }
}

function isSuccessfulResult(result: GoogleAppsScriptResult): boolean {
  return result.success === true;
}

async function postToGoogleAppsScript(
  payload: Record<string, string>,
  contentType: "json" | "form",
  timeoutMs: number
): Promise<GoogleAppsScriptResult> {
  const scriptUrl = getGoogleScriptUrl();

  if (!scriptUrl) {
    throw new Error("GOOGLE_SCRIPT_URL is not configured");
  }

  const headers =
    contentType === "json"
      ? { "Content-Type": "application/json" }
      : { "Content-Type": "application/x-www-form-urlencoded" };

  const body =
    contentType === "json"
      ? JSON.stringify(payload)
      : buildFormBody(payload);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // First attempt with redirect follow
    let response = await fetch(scriptUrl, {
      method: "POST",
      headers,
      body,
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
    });

    let result = await parseGoogleAppsScriptResponse(response);

    // GAS sometimes turns redirected POSTs into GET (health-check). Retry as form POST once.
    if (
      result.status === "running" &&
      result.success !== true &&
      contentType === "form"
    ) {
      response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
        cache: "no-store",
        signal: controller.signal,
      });
      result = await parseGoogleAppsScriptResponse(response);
    }

    if (!response.ok) {
      throw new Error(
        result.error || `Google Sheets sync failed with status ${response.status}`
      );
    }

    if (!isSuccessfulResult(result)) {
      if (result.status === "running") {
        throw new Error(
          "Google Sheets sync hit the script health-check endpoint instead of saving the lead"
        );
      }

      throw new GoogleAppsScriptRejectedError(
        result.error || "Google Sheets sync failed"
      );
    }

    return result;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new GoogleAppsScriptTimeoutError("Google Sheets sync timed out");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitPayloadToGoogleAppsScript(
  payload: Record<string, string>
): Promise<GoogleAppsScriptResult> {
  // Same ID on every retry so the script can ignore repeats of this submission
  const requestPayload = { ...payload, submissionId: crypto.randomUUID() };
  const deadline = Date.now() + GAS_TOTAL_BUDGET_MS;
  let lastError: Error | null = null;

  for (const strategy of GAS_STRATEGIES) {
    const remainingMs = deadline - Date.now();

    if (remainingMs < 2_000) {
      break;
    }

    try {
      return await postToGoogleAppsScript(
        requestPayload,
        strategy,
        Math.min(GAS_REQUEST_TIMEOUT_MS, remainingMs)
      );
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error("Google Sheets sync failed");

      if (
        lastError instanceof GoogleAppsScriptRejectedError ||
        lastError instanceof GoogleAppsScriptTimeoutError
      ) {
        break;
      }
    }
  }

  throw lastError ?? new Error("Google Sheets sync failed");
}

export { isGoogleAppsScriptConfigured };
