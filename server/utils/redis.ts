import { User } from '@neynar/nodejs-sdk/build/api';
import { Redis } from '@upstash/redis';

import { config } from 'dotenv';

config();

const NEYNAR_USER_PREFIX = 'beamr:neynaruserV2:';
const TTL_SECONDS = 48 * 60 * 60; // 48 hours

if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
  throw new Error(
    'REDIS_URL and REDIS_TOKEN must be set in environment variables'
  );
}

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export const getNeynarUsers = async (fids: number[]) => {
  if (!redis) throw new Error('Redis client is not initialized');

  if (fids.length === 0) return [];

  const keys = fids.map((fid) => `${NEYNAR_USER_PREFIX}${fid}`);

  const values = await redis.mget(keys);

  return values as (User | null)[];
};

export const setNeynarUsers = async (users: User[]) => {
  if (!redis) throw new Error('Redis client is not initialized');

  if (users.length === 0) return;

  const pipeline = redis.pipeline();

  for (const user of users) {
    const key = `${NEYNAR_USER_PREFIX}${user.fid}`;
    pipeline.set(key, user, { ex: TTL_SECONDS });
  }

  await pipeline.exec();
};
