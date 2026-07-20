import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const jobs = [
  { src: 'legacy-site/HB1.png', out: 'src/assets/henk-berends.webp', width: 700 },
  { src: 'legacy-site/duiven.png', out: 'src/assets/duiven-pattern.webp', width: 400 },
];

await mkdir('src/assets', { recursive: true });

for (const job of jobs) {
  const info = await sharp(job.src)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(job.out);
  console.log(`${job.src} -> ${job.out}: ${(info.size / 1024).toFixed(0)}KB (${info.width}x${info.height})`);
}
