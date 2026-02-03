import { Request, Response } from 'express';
import {
  bufferPfp,
  RECEIVER_PFP_SIZE,
  REPLY_AVATAR_COORDINATES,
  REPLY_TEMPLATE_COORDINATES,
  SENDER_PFP_SIZE,
  TOKEN_LOGO_SIZE,
} from '../utils/render';
import sharp from 'sharp';
import { getUsersByFIDs } from '../utils/neynar';
import path from 'path';
import { size, z } from 'zod';

export const getShareEmbed = (req: Request, res: Response) => {
  try {
    const receivers = req.query.receivers as string;

    if (!receivers) {
      return res.status(400).send('Missing receivers parameter');
    }

    const baseUrl = `https://${req.get('host')}`;

    const imageUrl = `${baseUrl}/og/share.png?receivers=${receivers}`;

    const embed = {
      version: '1',
      imageUrl,
      button: {
        title: 'Open Beamr',
        action: {
          type: 'launch_miniapp',
          name: 'Beamr',
          url: `${baseUrl}?receivers=${receivers}`,
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
    console.error('Error generating OG share:', error);
    return res.status(500).send('Internal Server Error');
  }
};

const numericString = z.string().regex(/^\d+$/, 'Must be a numeric string');

const replyEmbedSchema = z.object({
  senders: z
    .string()
    .min(1)
    .refine(
      (s) => s.split(',').every((id) => /^\d+$/.test(id)),
      'All sender FIDs must be numeric'
    )
    .transform((s) => s.split(',').map(Number)),
  receiver: numericString.transform(Number),
  flowrate: numericString.transform(BigInt),
});

export const getReplyEmbed = (req: Request, res: Response) => {
  try {
    const validated = replyEmbedSchema.safeParse(req.query);

    if (!validated.success) {
      return res.status(400).send('Missing senders parameter');
    }

    const { senders, receiver, flowrate } = validated.data;

    const baseUrl = `https://${req.get('host')}`;
    const imageUrl = `${baseUrl}/og/reply-embed.png?senders=${senders}&receiver=${receiver}&flowrate=${flowrate.toString()}`;

    const embed = {
      version: '1',
      imageUrl,
      button: {
        title: 'Open Beamr',
        action: {
          type: 'launch_miniapp',
          name: 'Beamr',
          url: `${baseUrl}?senders=${senders}&receiver=${receiver}&flowrate=${flowrate.toString()}`,
          splashImageUrl: `${baseUrl}/images/splash.png`,
          splashBackgroundColor: '#0F0E0E',
        },
      },
    };

    console.log('embed', embed);

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
    const validated = replyEmbedSchema.safeParse(req.query);

    if (!validated.success) {
      return res.status(400).send('Missing senders parameter');
    }
    const { senders, receiver } = validated.data;

    const count = senders.length;

    const profiles = await getUsersByFIDs([...senders, receiver]);

    const pfpUrls = profiles.map((profile) => profile.pfp_url);
    const senderPfpUrls = pfpUrls.slice(0, -1);
    const receiverPfpUrl = pfpUrls[pfpUrls.length - 1];

    const templatePath = path.join(
      __dirname,
      `../public/img/reply-${count}.png`
    );

    const tokenLogoPath = path.join(
      __dirname,
      '../public/img/beamrTokenLogo.png'
    );

    const senderPfps = await Promise.all(
      senderPfpUrls.map((url) => bufferPfp(url || '', SENDER_PFP_SIZE))
    );

    const receiverPfp = await bufferPfp(
      receiverPfpUrl || '',
      RECEIVER_PFP_SIZE
    );

    const composites = [
      ...senderPfps.map((buffer, i) => ({
        input: buffer,
        left: REPLY_AVATAR_COORDINATES[i][0],
        top: REPLY_AVATAR_COORDINATES[i][1],
      })),
      {
        input: receiverPfp,
        left: REPLY_TEMPLATE_COORDINATES.RECEIVER[0],
        top: REPLY_TEMPLATE_COORDINATES.RECEIVER[1],
      },
      {
        input: tokenLogoPath,
        left: REPLY_TEMPLATE_COORDINATES.TOKEN_LOGO[0],
        top: REPLY_TEMPLATE_COORDINATES.TOKEN_LOGO[1],
        size: TOKEN_LOGO_SIZE,
      },
    ];

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
