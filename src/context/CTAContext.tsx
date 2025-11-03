import { createContext, ReactNode, useState } from 'react';

type CTAProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
} | null;

type CTAContextType = {
  cta: CTAProps;
  setCTA: (cta: CTAProps) => void;
};

const CTAContext = createContext<CTAContextType | undefined>(undefined);

export const CTAProvider = ({ children }: { children: ReactNode }) => {
  const [cta, setCTA] = useState<CTAProps>(null);
  return (
    <CTAContext.Provider value={{ cta, setCTA }}>
      {children}
    </CTAContext.Provider>
  );
};
