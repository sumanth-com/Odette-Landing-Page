import { readdir, unlink } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

const assetsDir = join(process.cwd(), "src", "assets");

/** Keep PNG for email client compatibility */
const KEEP_PNG = new Set(["Logo.png"]);

const qualityByFile = {
  Hero: 82,
  MobHero: 82,
  Logo: 90,
  SectionGradientBg: 85,
};

async function convertFile(filename) {
  if (!filename.endsWith(".png") || KEEP_PNG.has(filename)) {
    return null;
  }

  const inputPath = join(assetsDir, filename);
  const outputName = filename.replace(/\.png$/i, ".webp");
  const outputPath = join(assetsDir, outputName);
  const baseName = filename.replace(/\.png$/i, "");
  const quality = qualityByFile[baseName] ?? 80;

  const info = await sharp(inputPath)
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(outputPath);

  await unlink(inputPath);

  return { filename, outputName, bytes: info.size };
}

const files = await readdir(assetsDir);
const results = [];

for (const file of files) {
  const result = await convertFile(file);
  if (result) results.push(result);
}

for (const { filename, outputName, bytes } of results) {
  console.log(`Converted ${filename} -> ${outputName} (${(bytes / 1024).toFixed(1)} KB)`);
}

console.log(`Done. ${results.length} file(s) converted. Logo.png kept for email.`);
