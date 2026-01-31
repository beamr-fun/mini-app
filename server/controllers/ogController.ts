import { Request, Response } from 'express';
import { bufferPfp, REPLY_COORDINATES } from '../utils/render';
import sharp from 'sharp';
import { getUsersByFIDs } from '../utils/neynar';
import path from 'path';

export const getReplyEmbed = (req: Request, res: Response) => {
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
    return res.status(500).send('Internal Server Error');
  }
};

export const getReplyImg = async (req: Request, res: Response) => {
  try {
    const __dirname = import.meta.dirname;
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

    const templatePath = path.join(
      __dirname,
      `../public/img/reply-${count}.png`
    );

    const pfpBuffers = await Promise.all(pfpUrls.map((url) => bufferPfp(url)));

    const composites = pfpBuffers.map((buffer, i) => ({
      input: buffer,
      left: REPLY_COORDINATES[i][0],
      top: REPLY_COORDINATES[i][1],
    }));

    const result = await sharp(templatePath)
      .composite(composites)
      .png()
      .toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.send(result);
  } catch (error) {
    console.error('Error generating OG reply image:', error);
    return res.status(500).send('Internal Server Error');
  }
};
