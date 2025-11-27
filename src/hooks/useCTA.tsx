import { useContext, useEffect } from 'react';
import { CTAContext, CTAProps } from '../context/CTAContext';

export const useCTA = (props?: CTAProps & { extraDeps?: any[] }) => {
  const ctx = useContext(CTAContext);
  if (!ctx) throw new Error('useCTA must be used within CTAProvider');

  useEffect(() => {
    if (!props) {
      return;
    }

    ctx.setCTA(props);

    return () => {
      ctx.setCTA(null);
    };
  }, [props?.label, props?.disabled, ...(props?.extraDeps || [])]);

  return ctx;
};
