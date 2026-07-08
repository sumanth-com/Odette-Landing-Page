import decodeIco from "decode-ico";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
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

copyFileSync(icoSource, join(publicDir, "favicon.ico"));
copyFileSync(icoSource, join(appDir, "favicon.ico"));
console.log("Created public/favicon.ico and src/app/favicon.ico from ifran.ico");

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
