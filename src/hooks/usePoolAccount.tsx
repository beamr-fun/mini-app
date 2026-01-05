import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useUser } from './useUser';

export const usePoolAccount = () => {
  const { userSubscription, incomingOnly } = useUser();
  const { address } = useAccount();

  const data = useMemo((): {
    userPoolAddress: string | null;
    hasConflict: boolean;
    isConnectedToPoolAddress: boolean;
  } => {
    if (!userSubscription)
      return {
        userPoolAddress: null,
        hasConflict: false,
        isConnectedToPoolAddress: false,
      };

    if (incomingOnly)
      return {
        userPoolAddress: null,
        hasConflict: false,
        isConnectedToPoolAddress: false,
      };

    if (!userSubscription.pools || userSubscription.pools.length === 0)
      return {
        userPoolAddress: null,
        hasConflict: false,
        isConnectedToPoolAddress: false,
      };

    const recentPoolAddress =
      userSubscription.pools[0]?.creatorAccount?.address || null;

    const uniquePoolIds = new Set(
      userSubscription.pools.map((pool) => pool.creatorAccount.address)
    );

    const hasConflict = uniquePoolIds.size > 1;

    const isConnectedToPoolAddress =
      address?.toLowerCase() === recentPoolAddress?.toLowerCase();

    return {
      userPoolAddress: recentPoolAddress,
      hasConflict,
      isConnectedToPoolAddress,
    };
  }, [userSubscription, address, incomingOnly]);
  return data;
};
