import { getGoogleScriptUrl, isGoogleAppsScriptConfigured } from "@/lib/googleSheetsConfig";

const GAS_REQUEST_TIMEOUT_MS = 25_000;
const GAS_MAX_ATTEMPTS = 3;

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
  contentType: "json" | "form"
): Promise<GoogleAppsScriptResult> {
  const scriptUrl = getGoogleScriptUrl();

  if (!scriptUrl) {
    throw new Error("GOOGLE_SCRIPT_URL is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GAS_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers:
        contentType === "json"
          ? { "Content-Type": "application/json" }
          : { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        contentType === "json"
          ? JSON.stringify(payload)
          : buildFormBody(payload),
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
    });

    const result = await parseGoogleAppsScriptResponse(response);

    if (!response.ok) {
      throw new Error(
        result.error || `Google Sheets sync failed with status ${response.status}`
      );
    }

    if (!isSuccessfulResult(result)) {
      throw new Error(
        result.error ||
          (result.status === "running"
            ? "Google Sheets sync hit the script health-check endpoint instead of saving the lead"
            : "Google Sheets sync failed")
      );
    }

    return result;
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitPayloadToGoogleAppsScript(
  payload: Record<string, string>
): Promise<GoogleAppsScriptResult> {
  let lastError: Error | null = null;
  const strategies: Array<"json" | "form"> = ["form", "json"];

  for (let attempt = 1; attempt <= GAS_MAX_ATTEMPTS; attempt += 1) {
    for (const strategy of strategies) {
      try {
        return await postToGoogleAppsScript(payload, strategy);
      } catch (error) {
        lastError =
          error instanceof Error
            ? error
            : new Error("Google Sheets sync failed");

        if (lastError.name === "AbortError") {
          lastError = new Error("Google Sheets sync timed out");
        }
      }
    }
  }

  throw lastError ?? new Error("Google Sheets sync failed");
}

export { isGoogleAppsScriptConfigured };
