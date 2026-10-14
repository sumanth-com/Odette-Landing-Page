import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const assetsDir = join(root, "src", "assets");
const imagesRoot = join(root, "public", "images");

const imageMap = [
  { from: "Hero.webp", to: "hero/desktop.webp" },
  { from: "MobHero.webp", to: "hero/mobile.webp" },
  { from: "1.webp", to: "gallery/store-interior.webp" },
  { from: "2.webp", to: "gallery/retail-showroom.webp" },
  { from: "3.webp", to: "gallery/fashion-boutique.webp" },
  { from: "4.webp", to: "gallery/clothing-collection.webp" },
  { from: "5.webp", to: "gallery/franchise-experience.webp" },
  { from: "6.webp", to: "gallery/brand-showcase.webp" },
];

mkdirSync(join(imagesRoot, "hero"), { recursive: true });
mkdirSync(join(imagesRoot, "brand"), { recursive: true });
mkdirSync(join(imagesRoot, "gallery"), { recursive: true });

for (const { from, to } of imageMap) {
  const source = join(assetsDir, from);
  const destination = join(imagesRoot, to);
  copyFileSync(source, destination);
  console.log(`Synced images/${to}`);
}

// Odette Paris wordmark: source has wide white margins, so trim them
const odetteSource = sharp(join(assetsDir, "Odette Paris.png")).trim({ threshold: 20 });
const odetteMarkPath = join(imagesRoot, "brand", "odette-mark.webp");
const odetteLogoPath = join(imagesRoot, "brand", "odette-logo.webp");

await odetteSource.clone().resize({ width: 600 }).webp({ quality: 90 }).toFile(odetteMarkPath);
copyFileSync(odetteMarkPath, odetteLogoPath);
console.log("Synced images/brand/odette-mark.webp and odette-logo.webp");

// Emails need PNG (WebP is blocked by most clients); 440px = 2x the 220px email width
await odetteSource
  .clone()
  .resize({ width: 440 })
  .png({ compressionLevel: 9, palette: true })
  .toFile(join(assetsDir, "odette-email-logo.png"));
console.log("Synced src/assets/odette-email-logo.png");

// Header renders the logo at 40px — 96px covers 2x displays without shipping the 512px source
const iFranchiseLogoPath = join(imagesRoot, "brand", "ifranchise-logo.webp");
await sharp(join(assetsDir, "iF-Logo.png"))
  .resize({ height: 96 })
  .webp({ quality: 90 })
  .toFile(iFranchiseLogoPath);
console.log("Synced images/brand/ifranchise-logo.webp");

const iFranchiseWordmarkPath = join(imagesRoot, "brand", "ifranchise-wordmark.webp");
await sharp(join(assetsDir, "logoif.png"))
  .trim()
  .resize({ height: 80 })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(iFranchiseWordmarkPath);
console.log("Synced images/brand/ifranchise-wordmark.webp");

const dimensions = {};

for (const { to } of imageMap) {
  const destination = join(imagesRoot, to);
  const meta = await sharp(destination).metadata();
  const key = to.replace(/\.webp$/, "").replace(/\//g, ".");
  dimensions[key] = { width: meta.width ?? 1, height: meta.height ?? 1 };
}

const odetteMarkMeta = await sharp(odetteMarkPath).metadata();
for (const key of ["brand.odette-logo", "brand.odette-mark"]) {
  dimensions[key] = {
    width: odetteMarkMeta.width ?? 1,
    height: odetteMarkMeta.height ?? 1,
  };
}

const iFranchiseLogoMeta = await sharp(iFranchiseLogoPath).metadata();
dimensions["brand.ifranchise-logo"] = {
  width: iFranchiseLogoMeta.width ?? 1,
  height: iFranchiseLogoMeta.height ?? 1,
};

const iFranchiseWordmarkMeta = await sharp(iFranchiseWordmarkPath).metadata();
dimensions["brand.ifranchise-wordmark"] = {
  width: iFranchiseWordmarkMeta.width ?? 1,
  height: iFranchiseWordmarkMeta.height ?? 1,
};

const outputPath = join(root, "src", "lib", "image-dimensions.json");
writeFileSync(outputPath, `${JSON.stringify(dimensions, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
