import { Request, Response } from 'express';
import {
  bufferPfp,
  FOLLOW_AVATAR_COORDINATES,
  FOLLOW_AVATAR_SIZE,
  RECEIVER_PFP_SIZE,
  REPLY_AVATAR_COORDINATES,
  REPLY_TEMPLATE_COORDINATES,
  SENDER_PFP_SIZE,
  TOKEN_LOGO_SIZE,
} from '../utils/render';
import sharp from 'sharp';
import { getUsersByFIDs } from '../utils/neynar';
import path from 'path';
import { z } from 'zod';

const numericString = z.string().regex(/^\d+$/, 'Must be a numeric string');

const replyEmbedSchema = z.object({
  senders: z
    .string()
    .min(1)
    .refine(
      (s) => s.split(',').every((id) => /^\d+$/.test(id)),
      'All sender FIDs must be numeric'
    )
    .transform((s) => s.split(',').map(Number).slice(0, 6)),
  receiver: numericString.transform(Number),
  flowrate: numericString.transform(BigInt),
});

const followEmbedSchema = z.object({
  sender: numericString.transform(Number),
  receiver: numericString.transform(Number),
  flowrate: numericString.transform(BigInt),
});

const shareEmbedSchema = z.object({
  receivers: z
    .string()
    .min(1)
    .refine(
      (s) => s.split(',').every((id) => /^\d+$/.test(id)),
      'All sender FIDs must be numeric'
    )
    .transform((s) => s.split(',').map(Number).slice(0, 6)),
  sender: numericString.transform(Number),
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

export const getFollowEmbed = async (req: Request, res: Response) => {
  try {
    const validated = followEmbedSchema.safeParse(req.query);

    if (!validated.success) {
      console.error('Invalid parameters for follow embed:', validated.error);
      return res.status(400).send('Invalid parameters');
    }

    const { sender, receiver, flowrate } = validated.data;

    const baseUrl = `https://${req.get('host')}`;
    const imageUrl = `${baseUrl}/og/follow-embed.png?sender=${sender}&receiver=${receiver}&flowrate=${flowrate.toString()}`;

    const embed = {
      version: '1',
      imageUrl,
      button: {
        title: 'Open Beamr',
        action: {
          type: 'launch_miniapp',
          name: 'Beamr',
          url: baseUrl,
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
    console.error('Error generating OG follow embed:', error);
    return res.status(500).send('Internal Server Error');
  }
};

export const getFollowImg = async (req: Request, res: Response) => {
  try {
    const __dirname = import.meta.dirname;
    const validated = followEmbedSchema.safeParse(req.query);

    if (!validated.success) {
      return res.status(400).send('Missing senders parameter');
    }
    const { sender, receiver } = validated.data;

    const profiles = await getUsersByFIDs([sender, receiver]);

    const pfpUrls = profiles.map((profile) => profile.pfp_url);

    const senderPfpUrl = pfpUrls[0] || '';
    const receiverPfpUrl = pfpUrls[1] || '';

    const templatePath = path.join(__dirname, `../public/img/follow.png`);

    const [senderPfp, receiverPfp] = await Promise.all([
      bufferPfp(senderPfpUrl, FOLLOW_AVATAR_SIZE),
      bufferPfp(receiverPfpUrl, FOLLOW_AVATAR_SIZE),
    ]);

    const composites = [
      {
        input: senderPfp,
        left: FOLLOW_AVATAR_COORDINATES.SENDER[0],
        top: FOLLOW_AVATAR_COORDINATES.SENDER[1],
      },
      {
        input: receiverPfp,
        left: FOLLOW_AVATAR_COORDINATES.RECEIVER[0],
        top: FOLLOW_AVATAR_COORDINATES.RECEIVER[1],
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
    console.error('Error generating OG follow image:', error);
    return res.status(500).send('Internal Server Error');
  }
};

export const getShareEmbed = (req: Request, res: Response) => {
  const validated = shareEmbedSchema.safeParse(req.query);

  if (!validated.success) {
    console.error('Invalid parameters for share embed:', validated.error);
    return res.status(400).send('Invalid parameters');
  }

  const { sender, receivers, flowrate } = validated.data;

  try {
    const baseUrl = `https://${req.get('host')}`;
    const imageUrl = `${baseUrl}/og/share-embed.png?sender=${sender}&receivers=${receivers}&flowrate=${flowrate}`;

    const embed = {
      version: '1',
      imageUrl,
      button: {
        title: 'Open Beamr',
        action: {
          type: 'launch_miniapp',
          name: 'Beamr',
          url: baseUrl,
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
    console.error('Error generating OG share embed:', error);
    return res.status(500).send('Internal Server Error');
  }
};

export const getShareImg = async (req: Request, res: Response) => {
  const __dirname = import.meta.dirname;
  const validated = shareEmbedSchema.safeParse(req.query);

  if (!validated.success) {
    return res.status(400).send('Missing senders parameter');
  }

  const { sender, receivers } = validated.data;

  const profiles = await getUsersByFIDs([sender, ...receivers]);
};
