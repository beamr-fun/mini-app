import React, { ReactNode } from 'react';

type OnboardContextType = {
  budget: number;
};

export const OnboardContext = React.createContext<OnboardContextType>({
  budget: 0,
});

export const OnboardDataProvider = ({ children }: { children: ReactNode }) => {
  const [budget, setBudget] = React.useState(0);
  return (
    <OnboardContext.Provider
      value={{
        budget,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};
