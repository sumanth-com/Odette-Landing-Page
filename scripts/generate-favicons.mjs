import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const appDir = join(root, "src", "app");
const logoSource = join(root, "src", "assets", "iF-Logo.png");

mkdirSync(publicDir, { recursive: true });
mkdirSync(appDir, { recursive: true });

// Pad the (slightly non-square) logo with its own background colour so icons stay square
const { data: cornerPixel } = await sharp(logoSource)
  .ensureAlpha()
  .extract({ left: 0, top: 0, width: 1, height: 1 })
  .raw()
  .toBuffer({ resolveWithObject: true });

const background = {
  r: cornerPixel[0],
  g: cornerPixel[1],
  b: cornerPixel[2],
  alpha: 1,
};

function renderSquare(size) {
  return sharp(logoSource)
    .resize(size, size, { fit: "contain", background })
    .png()
    .toBuffer();
}

/** ICO container with embedded PNG frames (supported by all modern browsers) */
function buildIco(frames) {
  const headerSize = 6;
  const entrySize = 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  let offset = headerSize + entrySize * frames.length;
  const entries = frames.map(({ size, png }) => {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...frames.map(({ png }) => png)]);
}

// Next.js serves /favicon.ico from src/app/favicon.ico only.
// Do NOT also place favicon.ico in public/ — that causes a route conflict (500).
const icoFrames = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, png: await renderSquare(size) }))
);
writeFileSync(join(appDir, "favicon.ico"), buildIco(icoFrames));
rmSync(join(publicDir, "favicon.ico"), { force: true });
console.log("Created src/app/favicon.ico (16/32/48) from src/assets/iF-Logo.png");

const sizes = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

for (const { name, size } of sizes) {
  writeFileSync(join(publicDir, name), await renderSquare(size));
  console.log(`Created public/${name} from iF-Logo.png`);
}
