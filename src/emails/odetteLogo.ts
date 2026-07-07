import { readFileSync } from "fs";
import { join } from "path";

let cachedLogoDataUri: string | null = null;

/**
 * Returns an inline data URI for the Odette logo so emails render reliably
 * without depending on a publicly hosted image URL.
 */
export function getOdetteLogoDataUri(): string {
  if (cachedLogoDataUri) {
    return cachedLogoDataUri;
  }

  const logoPath = join(process.cwd(), "src", "assets", "Logo.webp");
  const buffer = readFileSync(logoPath);
  cachedLogoDataUri = `data:image/webp;base64,${buffer.toString("base64")}`;

  return cachedLogoDataUri;
}
