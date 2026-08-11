export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export type UtmParams = Partial<Record<UtmKey, string>>;

export interface LeadAttribution {
  source: string;
  utmParameters: string;
}

const SESSION_KEY = "odette_lead_attribution";
const MAX_VALUE_LENGTH = 120;
const MAX_UTM_STRING_LENGTH = 500;

function sanitizeValue(value: string | null | undefined): string {
  return String(value ?? "")
    .trim()
    .replace(/[\r\n]+/g, " ")
    .slice(0, MAX_VALUE_LENGTH);
}

export function parseUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const utms: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = sanitizeValue(params.get(key));
    if (value) {
      utms[key] = value;
    }
  }

  return utms;
}

export function formatUtmParameters(utms: UtmParams): string {
  const parts: string[] = [];

  for (const key of UTM_KEYS) {
    const value = utms[key];
    if (value) {
      parts.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return parts.join("&").slice(0, MAX_UTM_STRING_LENGTH);
}

export function sourceFromReferrer(
  referrer: string,
  currentHost = ""
): string | null {
  const raw = sanitizeValue(referrer);
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    const siteHost = currentHost.replace(/^www\./i, "").toLowerCase();

    if (!host || (siteHost && (host === siteHost || host.endsWith(`.${siteHost}`)))) {
      return null;
    }

    if (host.includes("google")) return "google";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("facebook") || host === "fb.com" || host.endsWith(".fb.com")) {
      return "facebook";
    }
    if (host.includes("youtube") || host === "youtu.be") return "youtube";
    if (host.includes("linkedin")) return "linkedin";
    if (host === "t.co" || host.includes("twitter") || host === "x.com" || host.endsWith(".x.com")) {
      return "twitter";
    }
    if (host.includes("bing")) return "bing";
    if (host.includes("yahoo")) return "yahoo";
    if (host.includes("whatsapp")) return "whatsapp";

    return host;
  } catch {
    return null;
  }
}

export function resolveTrafficSource(
  utms: UtmParams,
  referrer = "",
  currentHost = ""
): string {
  return utms.utm_source || sourceFromReferrer(referrer, currentHost) || "direct";
}

export function buildAttribution(
  search: string,
  referrer = "",
  currentHost = ""
): LeadAttribution {
  const utms = parseUtmParams(search);

  return {
    source: resolveTrafficSource(utms, referrer, currentHost),
    utmParameters: formatUtmParameters(utms),
  };
}

function readStoredAttribution(): LeadAttribution | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<LeadAttribution>;
    const source = sanitizeValue(parsed.source);
    if (!source) return null;

    return {
      source,
      utmParameters: sanitizeValue(parsed.utmParameters).slice(0, MAX_UTM_STRING_LENGTH),
    };
  } catch {
    return null;
  }
}

function writeStoredAttribution(attribution: LeadAttribution): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(attribution));
  } catch {
    // Ignore quota / private-mode failures; in-memory capture still works for this page.
  }
}

/**
 * First-touch session attribution.
 * Captures UTMs/referrer on first landing and keeps them if the visitor
 * later navigates to URLs that no longer include campaign parameters.
 */
export function captureAndPersistAttribution(): LeadAttribution {
  const fresh = buildAttribution(
    window.location.search,
    document.referrer,
    window.location.hostname
  );
  const stored = readStoredAttribution();

  if (!stored) {
    writeStoredAttribution(fresh);
    return fresh;
  }

  const shouldUpgrade =
    Boolean(fresh.utmParameters) &&
    (!stored.utmParameters || stored.source === "direct");

  if (shouldUpgrade) {
    writeStoredAttribution(fresh);
    return fresh;
  }

  return stored;
}

export function getStoredAttribution(): LeadAttribution {
  if (typeof window === "undefined") {
    return { source: "direct", utmParameters: "" };
  }

  return captureAndPersistAttribution();
}
