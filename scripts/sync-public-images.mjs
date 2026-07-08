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

copyFileSync(join(assetsDir, "ifran.ico"), join(imagesRoot, "brand", "ifranchise-logo.ico"));
console.log("Synced images/brand/ifranchise-logo.ico");

const dimensions = {};

for (const { to } of imageMap) {
  const destination = join(imagesRoot, to);
  const meta = await sharp(destination).metadata();
  const key = to.replace(/\.webp$/, "").replace(/\//g, ".");
  dimensions[key] = { width: meta.width ?? 1, height: meta.height ?? 1 };
}

dimensions["brand.ifranchise-logo"] = {
  width: 48,
  height: 48,
};

const outputPath = join(root, "src", "lib", "image-dimensions.json");
writeFileSync(outputPath, `${JSON.stringify(dimensions, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
