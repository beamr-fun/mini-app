import sharp from 'sharp';

export const REPLY_AVATAR_COORDINATES = [
  [153, 195],
  [345, 83],
  [680, 125],
  [646, 291],
  [556, 417],
  [214, 434],
];

export const FOLLOW_AVATAR_COORDINATES = {
  SENDER: [123, 357],
  RECEIVER: [707, 357],
};

export const REPLY_TEMPLATE_COORDINATES = {
  RECEIVER: [407, 257],
  TOKEN_LOGO: [465, 315],
};

export const SENDER_PFP_SIZE = 50;
export const RECEIVER_PFP_SIZE = 86;
export const TOKEN_LOGO_SIZE = 28;
export const FOLLOW_AVATAR_SIZE = 70;

export const bufferPfp = async (url: string, pfpSize: number) => {
  if (!url) {
    return sharp({
      create: {
        width: pfpSize,
        height: pfpSize,
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
    `<svg><circle cx="${pfpSize / 2}" cy="${pfpSize / 2}" r="${pfpSize / 2}" fill="white"/></svg>`
  );

  return sharp(buffer)
    .resize(pfpSize, pfpSize)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();
};
