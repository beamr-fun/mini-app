import { createContext, ReactNode, useState } from 'react';

export type CTAProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

type CTAContextType = {
  cta: CTAProps | null;
  setCTA: (cta: CTAProps | null) => void;
};

export const CTAContext = createContext<CTAContextType | undefined>(undefined);

export const CTAProvider = ({ children }: { children: ReactNode }) => {
  const [cta, setCTA] = useState<CTAProps | null>(null);
  return (
    <CTAContext.Provider value={{ cta, setCTA }}>
      {children}
    </CTAContext.Provider>
  );
};
