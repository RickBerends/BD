import sharp from 'sharp';

// Genereert de gerasterde merk-assets (apple-touch-icon, og-image) uit SVG.
// Eenmalig draaien bij wijziging van het merk: node scripts/generate-brand-assets.mjs

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#3b271c"/>
  <circle cx="50" cy="50" r="38" fill="none" stroke="#cba85c" stroke-width="2.5"/>
  <text x="50" y="63" font-size="36" font-family="Georgia, serif" font-weight="bold" fill="#cba85c" text-anchor="middle">BD</text>
</svg>`;

const ogCard = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#3b271c"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#a9822f" stroke-width="2"/>
  <rect x="52" y="52" width="1096" height="526" fill="none" stroke="#cba85c" stroke-width="1" opacity="0.5"/>
  <circle cx="600" cy="240" r="90" fill="none" stroke="#cba85c" stroke-width="4"/>
  <text x="600" y="272" font-size="86" font-family="Georgia, serif" font-weight="bold" fill="#cba85c" text-anchor="middle">BD</text>
  <text x="600" y="420" font-size="64" font-family="Georgia, serif" font-weight="bold" fill="#f6f0e4" text-anchor="middle">Berends Duiven</text>
  <text x="600" y="480" font-size="30" font-family="Georgia, serif" font-style="italic" fill="#cbbca7" text-anchor="middle">Een digitaal erfgoedplatform voor een marathon-duivenfamilie</text>
</svg>`;

await sharp(Buffer.from(icon)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(ogCard)).png().toFile('public/og-default.png');
console.log('Generated public/apple-touch-icon.png and public/og-default.png');
