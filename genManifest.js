import fs from 'fs';
import path from 'path';

import { config } from 'dotenv';

config();

const STAGING = {
  baseUrl: 'https://staging.beamr.fun',
  accountAssociation: {
    header:
      'eyJmaWQiOjExNDk0MzcsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg5OTRBZDc4MzY5NjY2ODllMjdFNjUyQjA1NDA3ZWFBOGE0NTk0ZEY0In0',
    payload: 'eyJkb21haW4iOiJzdGFnaW5nLmJlYW1yLmZ1biJ9',
    signature:
      'KsTjzqlxuNDYptDN87LSe86RhjgELFZTn8HiI5kF/64IroKG/Ac3zjr1z8BXGgjcToPJO1po6K3I9Bl+iWjbVhs=',
  },
  name: 'Beamr (Cabal Access)',
  noindex: true,
  iconImg: 'cabalIcon.png',
};

const PROD = {
  baseUrl: 'https://app.beamr.fun',
  accountAssociation: {
    header:
      'eyJmaWQiOjExNDk0MzcsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg5OTRBZDc4MzY5NjY2ODllMjdFNjUyQjA1NDA3ZWFBOGE0NTk0ZEY0In0',
    payload: 'eyJkb21haW4iOiJhcHAuYmVhbXIuZnVuIn0',
    signature:
      'n5QY+uHR+nSifzvpfklFiKbEvJGxTUc2FmEydxTuTYhXHeL5nNOnYk7K6MvOCVfSDMcFi+ZFKoFlt2hC0ix42Bw=',
  },
  name: 'Beamr',
  noindex: false,
  iconImg: 'icon.png',
};

const dynamicValues = {
  prod: PROD,
  staging: STAGING,
};

function generateManifest(env) {
  const envConfig = dynamicValues[env];

  if (!envConfig) {
    console.error(`Unknown environment: ${env}`);
    console.error(
      `Available environments: ${Object.keys(environments).join(', ')}`,
    );
    process.exit(1);
  }

  const { baseUrl, name, noindex, accountAssociation, iconImg } = envConfig;

  const prodAPIUrl = 'https://mini-app-api-production-9c89.up.railway.app';

  const webhookUrl = `${env === 'prod' ? prodAPIUrl : baseUrl}/v1/webhook/sub`;

  const manifest = {
    accountAssociation,
    frame: {
      version: '1',
      name,
      iconUrl: `${baseUrl}/images/${iconImg}`,
      homeUrl: baseUrl,
      imageUrl: `${baseUrl}/images/feed.png`,
      buttonTitle: 'Start Beamr',
      splashImageUrl: `${baseUrl}/images/splash.png`,
      splashBackgroundColor: '#0F0E0E',
      webhookUrl: webhookUrl,
      subtitle: 'Dynamic micro-subscriptions',
      description:
        'The easiest way to sustainably reward people who make your feed worth scrolling.',
      primaryCategory: 'social',
      tags: ['mini-app', 'base', 'creator', 'utility', 'streaming'],
      tagline: 'Dynamic micro-subscriptions',
      ogTitle: 'Beamr',
      ogDescription:
        'The easiest way to sustainably reward people who make your feed worth scrolling.',
      screenshotUrls: [`${baseUrl}/images/feed.png`],
      heroImageUrl: `${baseUrl}/images/feed.png`,
      ogImageUrl: `${baseUrl}/images/feed.png`,
      noindex,
    },
    baseBuilder: {
      ownerAddress: '0x375567484B27648C7CE609425043119b3c0A7285',
    },
  };

  return manifest;
}

function main() {
  let env = process.env.VITE_ENV;

  if (!env) {
    console.error("'env' is not set.");
    process.exit(1);
  }

  if (env !== 'staging' && env !== 'prod' && env !== 'dev') {
    console.error(`'env' is set to invalid value: ${env}`);
    process.exit(1);
  }

  if (env === 'dev') {
    env = 'staging';
  }

  const manifest = generateManifest(env);

  const outputDir = path.join(process.cwd(), 'public');
  const outputPath = path.join(outputDir, '.well-known', 'farcaster.json');

  const wellKnownDir = path.dirname(outputPath);
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

  console.log(`✅ Manifest generated successfully!`);
  console.log(`   Output: ${outputPath}`);
}

main();
