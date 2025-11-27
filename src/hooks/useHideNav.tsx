import { useContext, useEffect } from 'react';
import { CTAContext, CTAProps } from '../context/CTAContext';

export const useHideNav = () => {
  const ctx = useContext(CTAContext);
  if (!ctx) throw new Error('useCTA must be used within CTAProvider');

  useEffect(() => {
    ctx.setHideNav(true);

    return () => {
      ctx.setHideNav(false);
    };
  }, []);

  return ctx;
};
