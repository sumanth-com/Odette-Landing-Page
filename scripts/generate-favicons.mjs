import decodeIco from "decode-ico";
import { copyFileSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const appDir = join(root, "src", "app");
const icoSource = join(root, "src", "assets", "ifran.ico");

mkdirSync(publicDir, { recursive: true });
mkdirSync(appDir, { recursive: true });

// Next.js serves /favicon.ico from src/app/favicon.ico only.
// Do NOT also place favicon.ico in public/ — that causes a route conflict (500).
const appFavicon = join(appDir, "favicon.ico");
const publicFavicon = join(publicDir, "favicon.ico");

copyFileSync(icoSource, appFavicon);
rmSync(publicFavicon, { force: true });
console.log("Created src/app/favicon.ico from src/assets/ifran.ico");
console.log("Removed public/favicon.ico (prevents Next.js conflict)");

const decoded = decodeIco(readFileSync(icoSource));
const source = decoded.reduce((best, frame) =>
  frame.width * frame.height > best.width * best.height ? frame : best
);

async function frameToSharp(frame) {
  if (frame.type === "png") {
    return sharp(frame.data);
  }

  return sharp(frame.data, {
    raw: {
      width: frame.width,
      height: frame.height,
      channels: 4,
    },
  });
}

const baseImage = await frameToSharp(source);

const sizes = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

for (const { name, size } of sizes) {
  await baseImage
    .clone()
    .resize(size, size, {
      fit: "contain",
      background: { r: 91, g: 45, b: 139, alpha: 1 },
    })
    .png()
    .toFile(join(publicDir, name));
  console.log(`Created public/${name} from ifran.ico`);
}
