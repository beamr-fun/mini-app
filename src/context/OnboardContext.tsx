import React, { ReactNode } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';

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

export const OnboardDataProvider = ({ children }: { children: ReactNode }) => {
  const form = useForm({
    mode: 'uncontrolled',
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
