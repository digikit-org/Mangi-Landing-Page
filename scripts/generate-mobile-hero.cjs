const sharp = require('sharp');
const fs = require('fs');

async function generateMobileHero() {
  const inputPath = 'public/images/Hero.png';
  const outputPath = 'public/images/hero_mobile.png';
  const distOutputPath = 'dist/images/hero_mobile.png';

  const img = sharp(inputPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const copy = Buffer.from(data);

  // Region 1: Main text (PEOPLE, SPACES, POSSIBILITIES)
  // X: 1315 to 1660, Y: 296 to 462
  const x1 = 1315, x2 = 1660;
  const y1 = 296, y2 = 462;
  const feather = 12;

  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) {
      const dstIdx = (y * width + x) * channels;

      // Clean texture from right wall (X: 1660 to 1770)
      const srcX = 1660 + ((x * 17 + y * 7) % 105);
      const srcY = 320 + ((y * 13) % 130);
      const srcIdx = (srcY * width + srcX) * channels;

      // Calculate 2D feather weight [0, 1]
      const distLeft = x - x1;
      const distRight = x2 - x;
      const distTop = y - y1;
      const distBottom = y2 - y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);
      const weight = Math.min(1, Math.max(0, minDist / feather));

      // Lighting compensation matching the pendant light glow
      const distFromLight = Math.abs(x - 1380);
      const lightBoost = Math.max(0, 15 - distFromLight * 0.05);

      for (let c = 0; c < 3; c++) {
        const replacement = Math.min(255, Math.round(data[srcIdx + c] + lightBoost));
        copy[dstIdx + c] = Math.round(data[dstIdx + c] * (1 - weight) + replacement * weight);
      }
    }
  }

  // Region 2: The small underline at X: 1320 to 1430, Y: 478 to 496
  const ux1 = 1320, ux2 = 1430, uy1 = 478, uy2 = 496;
  for (let y = uy1; y <= uy2; y++) {
    for (let x = ux1; x <= ux2; x++) {
      const dstIdx = (y * width + x) * channels;
      const srcIdx = ((y - 14) * width + x) * channels;
      const weight = Math.min(1, Math.max(0, Math.min(x - ux1, ux2 - x, y - uy1, uy2 - y) / 3));
      for (let c = 0; c < 3; c++) {
        copy[dstIdx + c] = Math.round(data[dstIdx + c] * (1 - weight) + data[srcIdx + c] * weight);
      }
    }
  }

  const cleanHeroBuffer = await sharp(copy, { raw: { width, height, channels } })
    .png()
    .toBuffer();

  // 2. Compose the mobile background image (780 x 1688 px)
  // This is optimized specifically for mobile screens so that:
  // - The top 52% is pure, clean #faf8f5 cream (where headline, subhead, pills, button sit)
  // - The bottom 48% shows the illuminated wall, MANGI INTERIORS 3D metallic logo, pendant lamp, plant, and marble reception desk
  // - ZERO text overlap!
  // - ZERO white shade / haze over the image!
  const canvasWidth = 780;
  const canvasHeight = 1688;

  // We want the reception photo to sit in the bottom area:
  // photoHeight = 880px
  const photoWidth = 780;
  const photoHeight = 880;

  // Extract reception zone: from X: 970 to 1783 (width 813, height 882)
  const receptionCrop = await sharp(cleanHeroBuffer)
    .extract({ left: 970, top: 0, width: 813, height: 882 })
    .resize(photoWidth, photoHeight, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  // Top fade: smooth linear fade from #faf8f5 into the photo so the ceiling wood slats fade naturally
  const topFadeMask = Buffer.from(`
    <svg width="${photoWidth}" height="${photoHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="black" stop-opacity="0" />
          <stop offset="6%" stop-color="black" stop-opacity="0.2" />
          <stop offset="14%" stop-color="black" stop-opacity="0.75" />
          <stop offset="22%" stop-color="black" stop-opacity="1" />
          <stop offset="100%" stop-color="black" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#fade)" />
    </svg>
  `);

  const featheredPhoto = await sharp(receptionCrop)
    .composite([{ input: topFadeMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Create full canvas with luxury cream #faf8f5
  const creamCanvas = await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 250, g: 248, b: 245, alpha: 1 }
    }
  })
  .png()
  .toBuffer();

  // Place featheredPhoto anchored at the bottom:
  const finalImage = await sharp(creamCanvas)
    .composite([
      { input: featheredPhoto, left: 0, top: canvasHeight - photoHeight }
    ])
    .png({ quality: 95 })
    .toBuffer();

  await sharp(finalImage).toFile(outputPath);
  if (fs.existsSync('dist/images')) {
    await sharp(finalImage).toFile(distOutputPath);
  }

  console.log('Successfully generated clean hero_mobile.png!');
}

generateMobileHero().catch(err => {
  console.error('Error generating mobile hero:', err);
  process.exit(1);
});
