import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcFlyer = 'C:\\Users\\chaud\\.gemini\\antigravity\\brain\\5ccc7e1b-5a3a-4e9c-a55b-27bc5b27d796\\.user_uploaded\\media_1790057744288.jpg';
const outDir = path.resolve('public/images');
const distDir = path.resolve('dist/images');

async function processAll() {
  console.log('Processing original images with high-fidelity Lanczos3 upscaling and sharpening...');

  // 1. Process 4 original cards from the flyer
  const cards = [
    { name: 'card_corporate_enhanced.jpg', left: 25, top: 725, width: 185, height: 116 },
    { name: 'card_meeting_enhanced.jpg', left: 220, top: 725, width: 185, height: 116 },
    { name: 'card_collaboration_enhanced.jpg', left: 413, top: 725, width: 185, height: 116 },
    { name: 'card_reception_enhanced.jpg', left: 609, top: 725, width: 185, height: 116 },
  ];

  for (const c of cards) {
    const cardBuffer = await sharp(srcFlyer)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .resize(925, 580, {
        kernel: sharp.kernel.lanczos3,
        fit: 'cover',
        fastShrinkOnLoad: false,
      })
      .sharpen({ sigma: 1.6, m1: 1.4, m2: 2.5 })
      .modulate({ brightness: 1.03, saturation: 1.08 })
      .jpeg({ quality: 95 })
      .toBuffer();

    fs.writeFileSync(path.join(outDir, c.name), cardBuffer);
    fs.writeFileSync(path.join(distDir, c.name), cardBuffer);
    console.log(`✓ Generated enhanced ${c.name} (925x580 px)`);
  }

  // 2. Process Hero Image from the original flyer:
  // Extract upper portion (Y: 0 to 560, full width 819)
  // Clean off the top-right printed text "DESIGN . BUILD . INSPIRE" (Y: 0 to 45, X: 480 to 819)
  // Blend the left side into clean luxury cream (#faf8f5) so headline text on left is crisp
  // KEEP the right side (glass meeting room, reception desk, and MANGI INTERIORS wall text) perfectly intact & enhanced!
  
  // First extract clean hero base:
  const heroCrop = await sharp(srcFlyer)
    .extract({ left: 0, top: 0, width: 819, height: 560 })
    .toBuffer();

  // Create an SVG mask / overlay to cleanly cover the top-right printed text "DESIGN . BUILD . INSPIRE"
  // and smoothly fade the left side (0 to 340) into #faf8f5
  const svgOverlay = Buffer.from(`
    <svg width="819" height="560">
      <defs>
        <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#faf8f5" stop-opacity="1"/>
          <stop offset="36%" stop-color="#faf8f5" stop-opacity="0.96"/>
          <stop offset="48%" stop-color="#faf8f5" stop-opacity="0.6"/>
          <stop offset="58%" stop-color="#faf8f5" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- Clean patch over the top-right text (DESIGN . BUILD . INSPIRE) with ceiling color -->
      <rect x="470" y="0" width="349" height="48" fill="#faf8f5"/>
      <!-- Smooth left fade over the left side flyer text -->
      <rect x="0" y="0" width="819" height="560" fill="url(#fadeLeft)"/>
    </svg>
  `);

  const compositedHero = await sharp(heroCrop)
    .composite([{ input: svgOverlay, blend: 'over' }])
    .toBuffer();

  // Now upscale to wide 2400 x 1200 with Lanczos3 and unsharp mask
  const finalHero = await sharp(compositedHero)
    .resize(2400, 1200, {
      kernel: sharp.kernel.lanczos3,
      fit: 'cover',
      position: 'right top',
      fastShrinkOnLoad: false,
    })
    .sharpen({ sigma: 1.5, m1: 1.2, m2: 2.0 })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .jpeg({ quality: 95 })
    .toBuffer();

  fs.writeFileSync(path.join(outDir, 'hero_original_enhanced.jpg'), finalHero);
  fs.writeFileSync(path.join(distDir, 'hero_original_enhanced.jpg'), finalHero);
  console.log('✓ Generated hero_original_enhanced.jpg (2400x1200 px)');

  console.log('All original images enhanced with ultra-high quality successfully!');
}

processAll().catch(console.error);
