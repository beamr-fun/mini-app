import { createContext, ReactNode } from 'react';
import sdk from '@farcaster/miniapp-sdk';
import { Context } from '@farcaster/miniapp-core';
import { useQuery } from '@tanstack/react-query';

const getMiniAppContext = async () => {
  const isMiniApp = await sdk.isInMiniApp();

  const context = await sdk.context;

  return { user: context.user || null, isMiniApp };
};

type MiniAppContextType = {
  user: Context.UserContext | null;
  isMiniApp: boolean;
};

export const MiniAppContext = createContext<MiniAppContextType>({
  user: null,
  isMiniApp: false,
});

export const MiniAppProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const { data: context } = useQuery({
    queryKey: ['miniAppContext'],
    queryFn: getMiniAppContext,
  });

  return (
    <MiniAppContext.Provider
      value={{
        user: context?.user || null,
        isMiniApp: context?.isMiniApp || false,
      }}
    >
      {children}
    </MiniAppContext.Provider>
  );
};
