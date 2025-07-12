import { Abi, Address, erc20Abi } from 'viem';
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

type TokenHookValues = {
  balanceOf?: bigint;
  totalSupply?: bigint;
  name?: string;
  symbol?: string;
  decimals?: number;
  allowance?: bigint;
};

type TokenHookProps = {
  abi?: Abi;
  tokenAddress: Address;
  calls?: Calls;
  spender?: Address;
  userAddress?: Address;
};

const getReads = async (args: TokenHookProps) => {
  const { abi, tokenAddress, calls, spender, userAddress } = args;

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

  if (calls.balanceOf || userAddress) {
    if (!userAddress) {
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
        args: [userAddress, spender],
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
  ) as TokenHookValues;
};

export const useToken = ({
  abi = erc20Abi,
  spender,
  tokenAddress,
  userAddress,
  calls = {
    balanceOf: false,
    totalSupply: true,
    name: true,
    symbol: true,
    decimals: true,
    allowance: false,
  },
}: TokenHookProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['token', tokenAddress, Object.keys(calls), spender, userAddress],
    queryFn: () => getReads({ abi, tokenAddress, calls, spender, userAddress }),
    enabled: !!tokenAddress && !!abi,
  });

  return {
    data,
    error,
    isLoading,
  };
};
