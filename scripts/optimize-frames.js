import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve('public/extracted_frames_30fps_jpg');
const outputDir = path.resolve('public/extracted_frames_webp');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));

console.log(`Optimizing ${files.length} frames from ${inputDir}...`);

let processed = 0;
let initialTotalBytes = 0;
let finalTotalBytes = 0;

async function processFrames() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const fileNameWithoutExt = path.parse(file).name;
    const outputPath = path.join(outputDir, `${fileNameWithoutExt}.webp`);

    const stats = fs.statSync(inputPath);
    initialTotalBytes += stats.size;

    await sharp(inputPath)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 65, effort: 4 })
      .toFile(outputPath);

    const outStats = fs.statSync(outputPath);
    finalTotalBytes += outStats.size;

    processed++;
    if (processed % 50 === 0 || processed === files.length) {
      console.log(`Processed ${processed}/${files.length} frames...`);
    }
  }

  const initialMB = (initialTotalBytes / 1024 / 1024).toFixed(2);
  const finalMB = (finalTotalBytes / 1024 / 1024).toFixed(2);
  const reduction = (((initialTotalBytes - finalTotalBytes) / initialTotalBytes) * 100).toFixed(1);

  console.log(`Optimization Complete!`);
  console.log(`Initial Size: ${initialMB} MB`);
  console.log(`Optimized Size: ${finalMB} MB`);
  console.log(`Total Size Reduction: ${reduction}%`);
}

processFrames().catch(err => {
  console.error('Error optimizing frames:', err);
});
