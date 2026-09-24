import sharp from 'sharp';
import fs from 'fs';

async function makeTransparentLogo() {
  const image = sharp('public/images/logo.jpeg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  const width = info.width;
  const height = info.height;
  
  // Find bounding box of non-white pixels (threshold < 240)
  let minX = width, maxX = 0, minY = height, maxY = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      
      // If not almost white
      if (r < 245 || g < 245 || b < 245) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Logo bounding box: X=${minX}..${maxX} (${maxX - minX}px), Y=${minY}..${maxY} (${maxY - minY}px)`);
  
  // Crop to bounding box with 20px padding
  const pad = 20;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(width - cropX, (maxX - minX) + pad * 2);
  const cropH = Math.min(height - cropY, (maxY - minY) + pad * 2);
  
  // Create RGBA image with white removed (transparent)
  const cropped = await sharp('public/images/logo.jpeg')
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const rgbaData = Buffer.alloc(cropW * cropH * 4);
  const rgbaWhiteData = Buffer.alloc(cropW * cropH * 4);
  
  for (let i = 0; i < cropW * cropH; i++) {
    const srcIdx = i * 3;
    const destIdx = i * 4;
    
    const r = cropped.data[srcIdx];
    const g = cropped.data[srcIdx + 1];
    const b = cropped.data[srcIdx + 2];
    
    // Check whiteness
    // High whiteness -> alpha = 0
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    let alpha = 255;
    if (r > 240 && g > 240 && b > 240) {
      alpha = 0;
    } else if (r > 220 && g > 220 && b > 220) {
      alpha = Math.round(255 * (1 - (luminance - 220) / 35));
      if (alpha < 0) alpha = 0;
      if (alpha > 255) alpha = 255;
    }
    
    // Original dark logo
    rgbaData[destIdx] = r;
    rgbaData[destIdx + 1] = g;
    rgbaData[destIdx + 2] = b;
    rgbaData[destIdx + 3] = alpha;
    
    // Luminous white version: if pixel was dark/black, make it pure white; keep gold tones!
    // Check if pixel is goldish (R > B + 30)
    const isGold = (r > b + 25) && (g > b + 15);
    if (isGold) {
      // Keep warm gold / brighten slightly
      rgbaWhiteData[destIdx] = Math.min(255, Math.round(r * 1.15));
      rgbaWhiteData[destIdx + 1] = Math.min(255, Math.round(g * 1.15));
      rgbaWhiteData[destIdx + 2] = Math.min(255, Math.round(b * 1.15));
    } else {
      // Black/charcoal elements turn into crisp white
      rgbaWhiteData[destIdx] = 255;
      rgbaWhiteData[destIdx + 1] = 255;
      rgbaWhiteData[destIdx + 2] = 255;
    }
    rgbaWhiteData[destIdx + 3] = alpha;
  }
  
  await sharp(rgbaData, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile('public/images/logo_dark.png');
    
  await sharp(rgbaWhiteData, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile('public/images/logo_light.png');

  fs.copyFileSync('public/images/logo_dark.png', 'dist/images/logo_dark.png');
  fs.copyFileSync('public/images/logo_light.png', 'dist/images/logo_light.png');
  
  console.log('Successfully created public/images/logo_dark.png and logo_light.png with transparency!');
}

makeTransparentLogo().catch(console.error);
