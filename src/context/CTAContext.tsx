import { createContext, ReactNode, useState } from 'react';

export type CTAProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  enabled?: boolean;
};

type CTAContextType = {
  cta: CTAProps | null;
  setCTA: (cta: CTAProps | null) => void;
  hideNav: boolean;
  setHideNav: (hide: boolean) => void;
};

export const CTAContext = createContext<CTAContextType | undefined>(undefined);

export const CTAProvider = ({ children }: { children: ReactNode }) => {
  const [cta, setCTA] = useState<CTAProps | null>(null);
  const [hideNav, setHideNav] = useState<boolean>(false);
  return (
    <CTAContext.Provider value={{ cta, setCTA, hideNav, setHideNav }}>
      {children}
    </CTAContext.Provider>
  );
};
