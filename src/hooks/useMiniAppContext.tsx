import { useContext } from 'react';
import { MiniAppContext } from '../context/MiniAppContext';

export const useMiniAppContext = () => {
  const miniAppContext = useContext(MiniAppContext);
  if (!miniAppContext) {
    throw new Error('useMiniAppContext must be used within a MiniAppProvider');
  }
  return miniAppContext;
};
