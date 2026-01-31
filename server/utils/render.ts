import sharp from 'sharp';

export const REPLY_COORDINATES = [
  [153, 195],
  [345, 83],
  [680, 125],
  [646, 291],
  [556, 417],
  [214, 434],
];

const PFP_SIZE = 50;

export const bufferPfp = async (url?: string) => {
  if (!url) {
    return sharp({
      create: {
        width: PFP_SIZE,
        height: PFP_SIZE,
        channels: 4,
        background: { r: 50, g: 50, b: 50, alpha: 1 },
      },
    })
      .png()
      .toBuffer();
  }

  const response = await fetch(url);

  const buffer = Buffer.from(await response.arrayBuffer());

  const circleMask = Buffer.from(
    `<svg><circle cx="${PFP_SIZE / 2}" cy="${PFP_SIZE / 2}" r="${PFP_SIZE / 2}" fill="white"/></svg>`
  );

  return sharp(buffer)
    .resize(PFP_SIZE, PFP_SIZE)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();
};
