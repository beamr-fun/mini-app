import React from 'react';
import { UserContext } from '../context/UserContext';
import { MiniAppContext } from '../context/MiniAppContext';

export const useUser = () => {
  const userContext = React.useContext(UserContext);
  const miniAppContext = React.useContext(MiniAppContext);

  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return {
    ...userContext,
    userFC: miniAppContext.user,
    isMiniApp: miniAppContext.isMiniApp,
  };
};
