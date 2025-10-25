import React from 'react';
import { OnboardContext } from '../context/OnboardContext';

export const useOnboard = () => {
  const onboardContext = React.useContext(OnboardContext);
  if (!onboardContext) {
    throw new Error('useOnboard must be used within a OnboardProvider');
  }

  return onboardContext;
};
