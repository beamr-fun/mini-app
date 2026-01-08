import { Address } from 'viem';
import { poolAbi } from '../abi/Pool';
import { nowInSeconds } from './common';
import { publicClient } from './connect';
import { isTestnet } from './setup';
import { ADDR } from '../const/addresses';
import { GDAForwarderAbi } from '../abi/GDAFowarder';

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

    return balance;
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    throw error;
  }
};

type UserFlowRateParams = {
  poolAddress: Address;
  userAddress: Address;
  tokenAddress: Address;
};

export const getFlowDistributionRate = async ({
  poolAddress,
  userAddress,
  tokenAddress,
}: UserFlowRateParams) => {
  try {
    const rate = await publicClient.readContract({
      address: ADDR.GDA_FORWARDER,
      abi: GDAForwarderAbi,
      functionName: 'getFlowDistributionFlowRate',
      args: [tokenAddress, userAddress, poolAddress],
    });

    return rate as bigint;
  } catch (error) {
    console.error('Error fetching flow distribution rate:', error);
    throw error;
  }
};

export const getUserFlowRates = async (userFlowRates: UserFlowRateParams[]) => {
  try {
    const getFlowRatePromises = userFlowRates.map(
      ({ poolAddress, userAddress, tokenAddress }) => ({
        abi: GDAForwarderAbi,
        address: ADDR.GDA_FORWARDER,
        functionName: 'getFlowDistributionFlowRate',
        args: [tokenAddress, userAddress, poolAddress],
      })
    );

    const result = await publicClient.multicall({
      contracts: getFlowRatePromises,
    });
    console.log('result', result);

    return result.map((res) =>
      res.status === 'success' ? (res.result as any as bigint) : 0n
    );
  } catch (error) {
    console.error('Error fetching multiple user flow rates:', error);
    throw error;
  }
};
