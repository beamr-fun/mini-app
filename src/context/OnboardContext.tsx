import React, { ReactNode } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { Follower } from '@neynar/nodejs-sdk/build/api';
import { ADDR } from '../const/addresses';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';
import { erc20Abi } from 'viem';
import { useUser } from '../hooks/useUser';

type OnboardContextType = {
  budget: number;
  preferredAddress: string;
  form?: UseFormReturnType<OnboardContextType>;
  balance?: bigint;
};

export const OnboardContext = React.createContext<OnboardContextType>({
  budget: 0,
  preferredAddress: '',
  form: undefined,
  balance: undefined,
});

const fetchUserFollowing = async (fid: number) => {
  console.log('fetched');
  const res = await fetch(`http://localhost:3000/v1/user/following/${fid}/all`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Failed to fetch user following');
  }

  return data.following.flat() as Follower[];
};

export const OnboardDataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const {
    data: userFollowing,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['userFollowing', user?.fid],
    queryFn: () => fetchUserFollowing(user!.fid),
    enabled: !!user?.fid,
  });

  const { address } = useAccount();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      preferredAddress: '',
      budget: 0,
    },
  });

  console.log('form.values.preferredAddress', form.values.preferredAddress);
  const { data: userBalance } = useReadContract({
    address: ADDR.SUPER_TOKEN,
    abi: erc20Abi,
    functionName: 'balanceOf',
    query: {
      enabled: !!form.values.preferredAddress,
    },
    args: [form.values.preferredAddress as `0x${string}`],
  });

  console.log('userBalance', userBalance);

  return (
    <OnboardContext.Provider
      value={{
        budget: form.values.budget,
        preferredAddress: form.values.preferredAddress,
        form: form,
        balance: userBalance,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};
