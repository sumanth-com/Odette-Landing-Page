import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const logoPath = join(root, "src", "assets", "Logo.png");
const icoSource = join(root, "src", "assets", "ifran.ico");

mkdirSync(publicDir, { recursive: true });

copyFileSync(icoSource, join(publicDir, "favicon.ico"));

const sizes = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(logoPath)
    .resize(size, size, {
      fit: "contain",
      background: { r: 243, g: 235, b: 249, alpha: 1 },
    })
    .png()
    .toFile(join(publicDir, name));
  console.log(`Created public/${name}`);
}

console.log("Created public/favicon.ico");
