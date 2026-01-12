import { User } from '@neynar/nodejs-sdk/build/api';
import {
  GlobalMostRecentSubscription,
  GlobalTopSubscription,
} from '../generated/graphql';
import { APIHeaders, fetchProfiles } from '../utils/api';

type BasicProfile = {
  id: string;
  pfp_url: string | null;
  username: string | null;
  display_name: string | null;
};

export type RecentBeam = GlobalMostRecentSubscription['Beam'][number] & {
  from: {
    id: string;
    fid: number;
    profile: BasicProfile;
  };
  to: {
    id: string;
    fid: number;
    profile: BasicProfile;
  };
};

export type LeaderPoolRaw = GlobalTopSubscription['BeamPool'][number] & {
  creatorAccount: {
    user: {
      fid: number;
      profile: BasicProfile;
    };
  };
};

export const globalRecentTransform = async (
  data: GlobalMostRecentSubscription,
  getAuthHeaders: () => Promise<APIHeaders | false>
) => {
  const fids = data.Beam.map((beam) => [
    beam.from?.fid.toString(),
    beam.to?.fid.toString(),
  ])
    .flat()
    .filter(Boolean) as string[];

  const uniqueFids = Array.from(new Set(fids));

  const apiHeaders = await getAuthHeaders();

  if (!apiHeaders) {
    throw new Error('Headers Not Found');
  }

  const profiles = await fetchProfiles(uniqueFids, apiHeaders);

  const profileLookup: Record<string, User> = {};

  profiles.forEach((profile) => {
    profileLookup[profile.fid.toString()] = profile;
  });

  return data.Beam.map((beam) => {
    const fromProfile = profileLookup[beam.from?.fid || ''] || null;
    const toProfile = profileLookup[beam.to?.fid || ''] || null;

    if (!fromProfile) {
      throw new Error('Profile not found for fid: ' + beam.from?.fid);
    }

    if (!toProfile) {
      throw new Error('Profile not found for fid: ' + beam.to?.fid);
    }

    return {
      ...beam,
      from: {
        ...beam.from,
        profile: {
          id: beam.from?.fid.toString(),
          pfp_url: fromProfile.pfp_url,
          username: fromProfile.username,
          display_name: fromProfile.display_name,
        },
      },
      to: {
        ...beam.to,
        profile: {
          id: beam.to?.fid.toString(),
          pfp_url: toProfile.pfp_url,
          username: toProfile.username,
          display_name: toProfile.display_name,
        },
      },
    } as RecentBeam;
  });
};

export const globalLeaderTransform = async (
  data: GlobalTopSubscription,
  getAuthHeaders: () => Promise<APIHeaders | false>
) => {
  const fids = data.BeamPool.map((pool) =>
    pool.creatorAccount?.user?.fid.toString()
  ).filter(Boolean) as string[];
  const uniqueFids = Array.from(new Set(fids));

  const apiHeaders = await getAuthHeaders();

  if (!apiHeaders) {
    throw new Error('Headers Not Found');
  }

  if (uniqueFids.length === 0) {
    return [];
  }

  const profiles = await fetchProfiles(uniqueFids, apiHeaders);

  const profileLookup: Record<string, User> = {};

  profiles.forEach((profile) => {
    profileLookup[profile.fid.toString()] = profile;
  });

  return data.BeamPool.map((pool) => {
    const fidStr = pool.creatorAccount?.user?.fid.toString() || '';
    const userProfile = profileLookup[fidStr] || null;

    if (!userProfile) {
      throw new Error('Profile not found for fid: ' + fidStr);
    }

    return {
      ...pool,
      creatorAccount: {
        user: {
          ...pool.creatorAccount?.user,
          profile: {
            id: userProfile.fid.toString(),
            pfp_url: userProfile.pfp_url,
            username: userProfile.username,
            display_name: userProfile.display_name,
          },
        },
      },
    } as LeaderPoolRaw;
  });
};
