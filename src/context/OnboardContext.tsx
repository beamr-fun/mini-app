import React, { ReactNode } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';

type OnboardContextType = {
  budget: number;
  preferredAddress: string;
  form?: UseFormReturnType<OnboardContextType>;
};

export const OnboardContext = React.createContext<OnboardContextType>({
  budget: 0,
  preferredAddress: '',
  form: undefined,
});

const fetchUserFollowing = async (fid: number) => {
  const res = await fetch(`http://localhost:3000/v1/user/following/${fid}/al`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Failed to fetch user following');
  }

  return data.flatmap();
};

export const OnboardDataProvider = ({ children }: { children: ReactNode }) => {
  const fid = 11650;

  const {
    data: userFollowing,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['userFollowing', fid],
    queryFn: () => fetchUserFollowing(fid),
    enabled: !!fid,
  });

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      preferredAddress: '',
      budget: 0,
    },
  });

  return (
    <OnboardContext.Provider
      value={{
        budget: form.values.budget,
        preferredAddress: form.values.preferredAddress,
        form: form,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};
