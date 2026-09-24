import sharp from 'sharp';

async function checkLogo() {
  const { data, info } = await sharp('public/images/logo.jpeg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Channels:', info.channels);
  // Sample top-left corner pixel
  console.log('Top-left pixel RGB:', data[0], data[1], data[2]);
  // Sample pixel at 10,10
  const idx = (10 * info.width + 10) * info.channels;
  console.log('Pixel (10,10) RGB:', data[idx], data[idx+1], data[idx+2]);
}

checkLogo();
