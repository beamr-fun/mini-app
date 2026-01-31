import { Router } from 'express';
import { getUsersByFIDs } from '../utils/neynar';
import sharp from 'sharp';
import path from 'path';

const __dirname = import.meta.dirname;

export const ogRoute = Router();

const COORDINATES = [
  [153, 195],
  [345, 83],
  [680, 125],
  [646, 291],
  [556, 417],
  [214, 434],
];

const PFP_SIZE = 50;

const bufferPfp = async (url?: string) => {
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

ogRoute.get('/reply', (req, res) => {
  console.log('fired');

  try {
    const senders = req.query.senders as string;

    if (!senders) {
      return res.status(400).send('Missing senders parameter');
    }

    const baseUrl = `https://${req.get('host')}`;
    const imageUrl = `${baseUrl}/og/reply.png?senders=${senders}`;

    const embed = {
      version: '1',
      imageUrl,
      button: {
        title: 'Open Beamr',
        action: {
          type: 'launch_miniapp',
          name: 'Beamr',
          url: `${baseUrl}?senders=${senders}`,
          splashImageUrl: `${baseUrl}/images/splash.png`,
          splashBackgroundColor: '#0F0E0E',
        },
      },
    };

    return res.type('text/html').send(`<!DOCTYPE html>
    <html>
    <head>
      <meta name="fc:miniapp" content='${JSON.stringify(embed)}' />
      <meta name="fc:frame" content='${JSON.stringify(embed)}' />
    </head>
    <body></body>
    </html>`);
  } catch (error) {
    console.error('Error generating OG reply:', error);
  }
});

ogRoute.get('/reply.png', async (req, res) => {
  console.log('fired png');
  try {
    const senders = req.query.senders as string;

    if (!senders) {
      return res.status(400).send('Missing senders parameter');
    }

    const sendersFid = senders
      .split(',')
      .map((s) => Number(s.trim()))
      .slice(0, 6);

    const count = sendersFid.length;

    const profiles = await getUsersByFIDs(sendersFid);
    const pfpUrls = profiles.map((profile) => profile.pfp_url);

    const templatePath = path.join(__dirname, `../public/img/reply-${6}.png`);

    const pfpBuffers = await Promise.all(pfpUrls.map((url) => bufferPfp(url)));

    const composites = pfpBuffers.map((buffer, i) => ({
      input: buffer,
      left: COORDINATES[i][0],
      top: COORDINATES[i][1],
    }));

    const result = await sharp(templatePath)
      .composite(composites)
      .png()
      .toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.send(result);
  } catch (error) {
    console.error('Error generating OG reply image:', error);
  }
});
