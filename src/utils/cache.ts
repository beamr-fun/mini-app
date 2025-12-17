import { User } from '@neynar/nodejs-sdk/build/api';

const CACHE_PREFIX = 'beamr_profile_';

export const getCachedProfile = async (fid: string): Promise<User | null> => {
  try {
    const cachedItem = sessionStorage.getItem(`${CACHE_PREFIX}${fid}`);
    return cachedItem ? JSON.parse(cachedItem) : null;
  } catch (e) {
    console.warn('Cache read error', e);
    return null;
  }
};

export const setCachedProfile = async (user: User): Promise<void> => {
  if (!user || !user.fid) return;
  try {
    sessionStorage.setItem(`${CACHE_PREFIX}${user.fid}`, JSON.stringify(user));
  } catch (e) {
    console.warn('Cache write error (likely quota exceeded)', e);
  }
};

export const getCachedProfiles = async (fids: string[]) => {
  const found: User[] = [];
  const missing: string[] = [];

  await Promise.all(
    fids.map(async (fid) => {
      const user = await getCachedProfile(fid);
      if (user) {
        found.push(user);
      } else {
        missing.push(fid);
      }
    })
  );

  return { found, missing };
};

export const cacheProfiles = async (users: User[]) => {
  await Promise.all(users.map((user) => setCachedProfile(user)));
};
