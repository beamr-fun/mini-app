import { useMemo } from 'react';
import { Abi, Address, erc20Abi } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';

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
  calls: Calls;
  spender?: Address;
};

export const useToken = ({
  abi = erc20Abi,
  spender,
  address,
  calls,
}: TokenHookProps) => {
  const { address: userAddress } = useAccount();
  const reads = useMemo(() => {
    let readCalls = [];

    if (calls.balanceOf) {
      if (!userAddress) {
        console.warn('User address is required for balanceOf call');
      } else {
        readCalls.push({
          address,
          abi,
          functionName: 'balanceOf',
          args: [calls.balanceOf],
        });
      }
    }

    if (calls.totalSupply) {
      readCalls.push({
        address,
        abi,
        functionName: 'totalSupply',
      });
    }

    if (calls.name) {
      readCalls.push({
        address,
        abi,
        functionName: 'name',
      });
    }

    if (calls.symbol) {
      readCalls.push({
        address,
        abi,
        functionName: 'symbol',
      });
    }

    if (calls.decimals) {
      readCalls.push({
        address,
        abi,
        functionName: 'decimals',
      });
    }

    if (calls.allowance) {
      if (!userAddress) {
        console.warn('User address is required for allowance call');
      } else if (!spender) {
        console.warn('Spender address is required for allowance call');
      } else {
        readCalls.push({
          address,
          abi,
          functionName: 'allowance',
          args: [userAddress],
        });
      }
    }

    return readCalls;
  }, [calls, userAddress, spender]);

  const { data, error, isLoading } = useReadContracts({ contracts: reads });

  return {
    data,
    error,
    isLoading,
  };
};
