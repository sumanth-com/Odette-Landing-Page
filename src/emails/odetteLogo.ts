import { readFileSync } from "fs";
import { join } from "path";
import type { Attachment } from "resend";

export const ODETTE_LOGO_CID = "odette-logo";

const LOGO_CANDIDATE_PATHS = [
  join(process.cwd(), "src", "assets", "Logo.png"),
  join(process.cwd(), "src", "assets", "Logo.webp"),
];

function readLogoBuffer(): Buffer {
  for (const logoPath of LOGO_CANDIDATE_PATHS) {
    try {
      return readFileSync(logoPath);
    } catch {
      continue;
    }
  }

  throw new Error("Odette logo asset not found at src/assets/Logo.png or Logo.webp");
}

let cachedLogoAttachment: Attachment | null = null;

/**
 * Inline PNG attachment for Resend CID embedding.
 * PNG is used because WebP and data-URI images are blocked in most email clients.
 */
export function getOdetteLogoAttachment(): Attachment {
  if (cachedLogoAttachment) {
    return cachedLogoAttachment;
  }

  const buffer = readLogoBuffer();
  const isPng = buffer[0] === 0x89 && buffer[1] === 0x50;

  cachedLogoAttachment = {
    content: buffer,
    filename: "odette-logo.png",
    contentType: isPng ? "image/png" : "image/webp",
    contentId: ODETTE_LOGO_CID,
  };

  return cachedLogoAttachment;
}

export function getOdetteLogoCidSrc(): string {
  return `cid:${ODETTE_LOGO_CID}`;
}
