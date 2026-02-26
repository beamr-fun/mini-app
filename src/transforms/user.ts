import { User } from '@neynar/nodejs-sdk/build/api';
import { LoggedInUserSubscription } from '../generated/graphql';
import { APIHeaders, fetchProfiles } from '../utils/api';

type BasicProfile = {
  id: string;
  pfp_url: string | null;
  username: string | null;
  display_name: string | null;
};

export type UserTransformed = {
  __typename?: 'User';
  id: string;
  pools: {
    __typename?: 'BeamPool';
    flowRate: string;
    totalUnits: string;
    active: boolean;
    hasDistributed: boolean;
    id: string;
    metadata: {
      name: string;
    };
    creatorAccount: {
      address: string;
    };
  }[];

  incoming: {
    __typename?: 'Beam';
    id: string;
    units: any;
    isReceiverConnected: boolean;
    lastUpdated: number;
    beamPool?: {
      __typename?: 'BeamPool';
      flowRate: any;
      totalUnits: any;
      id: string;
    };
    from: {
      id: string;
      fid: number;
      profile: BasicProfile;
    };
  }[];

  outgoing: {
    __typename?: 'Beam';
    id: string;
    units: any;
    beamPool?: {
      __typename?: 'BeamPool';
      flowRate: any;
      creatorFlowRate: any;
      totalUnits: any;
      id: string;
    } | null;
    to: {
      id: string;
      fid: number;
      profile: BasicProfile;
    };
  }[];
};
export const userProfileTransform = async (
  data: LoggedInUserSubscription,
  getHeaders: () => Promise<APIHeaders | false>,
  extraFids: string[] = []
) => {
  return transformUserByPk(data, getHeaders, extraFids);
};

export const transformUserByPk = async (
  data: { User_by_pk?: LoggedInUserSubscription['User_by_pk'] | null },
  getHeaders: () => Promise<APIHeaders | false>,
  extraFids: string[] = []
) => {
  if (
    !data.User_by_pk ||
    (!data.User_by_pk.incoming && !data.User_by_pk.outgoing) ||
    (data.User_by_pk.incoming.length === 0 &&
      data.User_by_pk.outgoing.length === 0)
  ) {
    return null;
  }

  const fromFids =
    data.User_by_pk?.incoming.map((b) => b.from?.fid?.toString()) || [];
  const toFids =
    data.User_by_pk?.outgoing.map((b) => b.to?.fid?.toString()) || [];

  const uniqueFids = [...new Set([...fromFids, ...toFids, ...extraFids])].filter(
    Boolean
  ) as string[];

  const headers = await getHeaders();

  if (!headers) {
    console.error('Headers not found');
    return null;
  }

  const profiles = await fetchProfiles(uniqueFids, headers);

  const profileLookup: Record<number, User> = {};

  profiles.forEach((user) => {
    profileLookup[user.fid] = user;
  });

  const user = data?.User_by_pk;
  const filteredPools = user.pools.filter((pool) => pool.hasDistributed);

  return {
    ...data?.User_by_pk,
    pools: filteredPools,
    incoming: user.incoming.map((beam) => {
      const profile = profileLookup[beam.from?.fid || 0];

      if (!profile) {
        throw new Error(`Profile not found for fid: ${beam.from?.fid}`);
      }
      return {
        ...beam,
        from: {
          ...beam.from,
          profile: {
            id: beam.from?.fid?.toString(),
            pfp_url: profile.pfp_url,
            username: profile.username,
            display_name: profile.display_name,
          },
        },
      };
    }),
    outgoing: user.outgoing.map((beam) => {
      const profile = profileLookup[beam.to?.fid || 0];

      if (!profile) {
        throw new Error(`Profile not found for fid: ${beam.to?.fid}`);
      }
      return {
        ...beam,
        to: {
          ...beam.to,
          profile: {
            id: beam.to?.fid?.toString(),
            pfp_url: profile.pfp_url,
            username: profile.username,
            display_name: profile.display_name,
          },
        },
      };
    }),
  } as UserTransformed;
};
