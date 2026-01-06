import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useUser } from './useUser';

export const usePoolAccount = () => {
  const { userSubscription, incomingOnly } = useUser();
  const { address } = useAccount();

  const data = useMemo((): {
    userPoolAddress: string | null;
    hasConflict: boolean;
    isConnectedToPoolAddress: boolean;
    notConnectedToPoolAddress: boolean;
  } => {
    if (!userSubscription)
      return {
        userPoolAddress: null,
        hasConflict: false,
        isConnectedToPoolAddress: false,
        notConnectedToPoolAddress: false,
      };

    if (incomingOnly)
      return {
        userPoolAddress: null,
        hasConflict: false,
        isConnectedToPoolAddress: false,
        notConnectedToPoolAddress: false,
      };

    if (!userSubscription.pools || userSubscription.pools.length === 0)
      return {
        userPoolAddress: null,
        hasConflict: false,
        isConnectedToPoolAddress: false,
        notConnectedToPoolAddress: false,
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
      notConnectedToPoolAddress:
        !!recentPoolAddress && !isConnectedToPoolAddress,
    };
  }, [userSubscription, address, incomingOnly]);
  return data;
};
