import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const meta = await sharp('public/images/logo.jpeg').metadata();
  console.log('Logo metadata:', meta.width, 'x', meta.height, 'channels:', meta.channels, 'format:', meta.format);
  
  const files = [
    'Hero.png',
    'Corporate.png',
    'meeting_enhanced.png',
    'Conference.png',
    'Executive.png',
    'Reception1.png',
    'Collaboration.png',
    'Flagship.png'
  ];
  for (const f of files) {
    if (fs.existsSync(`public/images/${f}`)) {
      const m = await sharp(`public/images/${f}`).metadata();
      console.log(`${f}: ${m.width} x ${m.height} (${m.format})`);
    }
  }
}

main().catch(console.error);
