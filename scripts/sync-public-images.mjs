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
  { from: "Logo.webp", to: "brand/odette-mark.webp" },
  { from: "Logo.webp", to: "brand/odette-logo.webp" },
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

await sharp(join(assetsDir, "Logo.png"))
  .resize(80, 80, {
    fit: "contain",
    background: { r: 91, g: 45, b: 139, alpha: 0 },
  })
  .webp({ quality: 90 })
  .toFile(join(imagesRoot, "brand", "ifranchise-logo.webp"));
console.log("Synced images/brand/ifranchise-logo.webp");

const dimensions = {};

for (const { to } of imageMap) {
  const destination = join(imagesRoot, to);
  const meta = await sharp(destination).metadata();
  const key = to.replace(/\.webp$/, "").replace(/\//g, ".");
  dimensions[key] = { width: meta.width ?? 1, height: meta.height ?? 1 };
}

const ifranchiseMeta = await sharp(join(imagesRoot, "brand", "ifranchise-logo.webp")).metadata();
dimensions["brand.ifranchise-logo"] = {
  width: ifranchiseMeta.width ?? 80,
  height: ifranchiseMeta.height ?? 80,
};

const outputPath = join(root, "src", "lib", "image-dimensions.json");
writeFileSync(outputPath, `${JSON.stringify(dimensions, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
