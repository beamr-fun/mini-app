import { createContext, ReactNode } from 'react';
import sdk from '@farcaster/miniapp-sdk';
import { Context } from '@farcaster/miniapp-core';
import { useQuery } from '@tanstack/react-query';

const getMiniAppContext = async () => {
  const isMiniApp = await sdk.isInMiniApp();

  if (!isMiniApp) {
    return { user: null, isMiniApp: false };
  }

  const context = await sdk.context;

  return { user: context.user || null, isMiniApp };
};

type MiniAppContextType = {
  user: Context.UserContext | null;
  isMiniApp: boolean;
  isLoading: boolean;
  error: Error | null;
};

export const MiniAppContext = createContext<MiniAppContextType>({
  user: null,
  isMiniApp: false,
  isLoading: false,
  error: null,
});

export const MiniAppProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const {
    data: context,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['miniAppContext'],
    queryFn: getMiniAppContext,
  });

  console.log('isLoading', isLoading);

  return (
    <MiniAppContext.Provider
      value={{
        user: context?.user || null,
        isMiniApp: context?.isMiniApp || false,
        isLoading,
        error,
      }}
    >
      {children}
    </MiniAppContext.Provider>
  );
};
