import React from 'react';
import { UserContext } from '../context/UserContext';

export const useUser = () => {
  const userContext = React.useContext(UserContext);

  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return userContext;
};
