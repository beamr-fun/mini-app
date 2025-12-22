import { Address } from 'viem';
import { poolAbi } from '../abi/Pool';
import { nowInSeconds } from './common';
import { publicClient } from './connect';
import { isTestnet } from './setup';

export const getClaimable = async ({
  poolAddress,
  userAddress,
}: {
  poolAddress: Address;
  userAddress: Address;
}): Promise<bigint> => {
  try {
    if (isTestnet) return 0n;

    const now = nowInSeconds();

    const result = await publicClient.readContract({
      address: poolAddress,
      abi: poolAbi,
      functionName: 'getClaimable',
      args: [userAddress, now],
    });

    return result as bigint;
  } catch (error) {
    console.error('Error fetching claimable amount:', error);
    throw error;
  }
};

export const getEthBalance = async (address: Address): Promise<bigint> => {
  try {
    const balance = await publicClient.getBalance({ address });
    console.log('balance', balance);
    return balance;
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    throw error;
  }
};
