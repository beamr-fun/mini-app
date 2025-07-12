import { useMemo } from 'react';
import { Abi, Address, erc20Abi } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';
import { publicClient } from '../utils/connect';
import { useQuery } from '@tanstack/react-query';

type Calls = {
  balanceOf?: boolean;
  totalSupply?: boolean;
  name?: boolean;
  symbol?: boolean;
  decimals?: boolean;
  allowance?: boolean;
};

type TokenHookProps = {
  abi?: Abi;
  address: Address;
  calls?: Calls;
  spender?: Address;
};

const getReads = async (args: TokenHookProps & { userAddress?: Address }) => {
  const { abi, address: tokenAddress, calls, spender, userAddress } = args;

  if (!calls || !abi || !tokenAddress) {
    return {
      balanceOf: undefined,
      totalSupply: undefined,
      name: undefined,
      symbol: undefined,
      decimals: undefined,
      allowance: undefined,
    };
  }

  let reads = [];

  if (calls.balanceOf) {
    if (!tokenAddress) {
      console.warn('Token address is required for balanceOf call');
    } else {
      reads.push({
        address: tokenAddress,
        abi,
        functionName: 'balanceOf',
        args: [userAddress],
      });
    }
  }

  if (calls.totalSupply) {
    reads.push({
      address: tokenAddress,
      abi,
      functionName: 'totalSupply',
    });
  }

  if (calls.name) {
    reads.push({
      address: tokenAddress,
      abi,
      functionName: 'name',
    });
  }

  if (calls.symbol) {
    reads.push({
      address: tokenAddress,
      abi,
      functionName: 'symbol',
    });
  }

  if (calls.decimals) {
    reads.push({
      address: tokenAddress,
      abi,
      functionName: 'decimals',
    });
  }

  if (calls.allowance) {
    if (!spender) {
      console.warn('Spender address is required for allowance call');
    } else if (!userAddress) {
      console.warn('User address is required for allowance call');
    } else {
      reads.push({
        address: tokenAddress,
        abi,
        functionName: 'allowance',
        args: [spender],
      });
    }
  }

  const result = await publicClient.multicall({
    contracts: reads,
  });

  return reads.reduce(
    (acc, ops, index) => {
      const { functionName } = ops;
      const response = result[index];
      if (response) {
        acc[functionName as keyof Calls] = response.result;
      }
      return acc;
    },
    {} as Record<keyof Calls, any>
  );
};

export const useToken = ({
  abi = erc20Abi,
  spender,
  address,
  calls = {
    balanceOf: false,
    totalSupply: true,
    name: true,
    symbol: true,
    decimals: true,
    allowance: false,
  },
}: TokenHookProps) => {
  const { address: userAddress } = useAccount();
  const { data, error, isLoading } = useQuery({
    queryKey: ['token', address, Object.keys(calls), spender, userAddress],
    queryFn: () => getReads({ abi, address, calls, spender, userAddress }),
  });

  return {
    data,
    error,
    isLoading,
  };
};
