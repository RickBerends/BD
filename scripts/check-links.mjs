import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

// Controleert alle interne links/assets in dist/ zonder netwerk:
// elk href/src dat met de site-base begint moet naar een bestaand bestand
// in dist/ wijzen. Draait in CI vóór deploy (zie .github/workflows/deploy.yml).

const DIST = 'dist';

// Base wordt uit astro.config.mjs gelezen in plaats van hardcoded, zodat
// deze check niet stilzwijgend 0 links controleert wanneer het base-pad
// wijzigt (zoals gebeurde bij de overstap naar het eigen domein: '/BD' -> '').
const astroConfig = await readFile('astro.config.mjs', 'utf8');
const baseMatch = astroConfig.match(/const BASE = '([^']*)'/);
const BASE = baseMatch ? `${baseMatch[1]}/` : '/';

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function targetsFor(url) {
  const clean = url.split('#')[0].split('?')[0];
  const rel = clean.slice(BASE.length);
  const onDisk = path.join(DIST, decodeURIComponent(rel));
  if (clean.endsWith('/') || rel === '') return [path.join(onDisk, 'index.html')];
  // Zowel bestand-als-bestand als map-met-index accepteren
  return [onDisk, path.join(onDisk, 'index.html'), `${onDisk}.html`];
}

const files = await htmlFiles(DIST);
const broken = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url.startsWith(BASE) || url.startsWith('//')) continue; // extern, mailto, anchors, data:
    checked++;
    if (!targetsFor(url).some((t) => existsSync(t))) {
      broken.push(`${file} -> ${url}`);
    }
  }
}

console.log(`Checked ${checked} internal links across ${files.length} pages.`);
if (broken.length > 0) {
  console.error(`BROKEN LINKS (${broken.length}):`);
  for (const b of [...new Set(broken)]) console.error(`  ${b}`);
  process.exit(1);
}
console.log('All internal links OK.');
