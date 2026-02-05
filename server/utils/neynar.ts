import { Configuration, NeynarAPIClient } from '@neynar/nodejs-sdk';
import { User } from '@neynar/nodejs-sdk/build/api';
import { getNeynarUsers, setNeynarUsers } from './redis';
import { withTimeout } from './render';

if (!process.env.NEYNAR_API_KEY) {
  throw new Error('NEYNAR_API_KEY must be set in environment variables');
}

export const getNeynarClient = () => {
  const config = new Configuration({
    apiKey: process.env.NEYNAR_API_KEY as string,
  });
  const client = new NeynarAPIClient(config);

  return client;
};

const handleGetUsersByFID = async (fids: number[]): Promise<User[]> => {
  return withTimeout(
    (async () => {
      const client = getNeynarClient();

      const cached = await getNeynarUsers(fids);

      const cachedUsers = new Map<number, User>();
      const missingFids: number[] = [];

      cached.forEach((value, i) => {
        if (value) {
          cachedUsers.set(fids[i], value as User);
        } else {
          missingFids.push(fids[i]);
        }
      });

      if (missingFids.length) {
        const data = await client.fetchBulkUsers({
          fids: missingFids,
        });

        if (!data || !data.users) {
          throw new Error('Failed to fetch users from Neynar');
        }

        await setNeynarUsers(data.users);
        for (const user of data.users) {
          cachedUsers.set(user.fid, user);
        }
      }

      return fids
        .map((fid) => cachedUsers.get(fid))
        .filter((user): user is User => user !== undefined);
    })(),
    3000,
    'Neynar getUsersByFIDs'
  );
};

export const getUsersByFIDs = async (fids: number[]): Promise<User[]> => {
  if (fids.length === 0) return [];

  const CHUNK_SIZE = 100;
  const chunks: number[][] = [];

  for (let i = 0; i < fids.length; i += CHUNK_SIZE) {
    chunks.push(fids.slice(i, i + CHUNK_SIZE));
  }

  const results = await Promise.all(
    chunks.map((chunk) => handleGetUsersByFID(chunk))
  );

  return results.flat();
};
