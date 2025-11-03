import { useContext, useEffect } from 'react';
import { CTAContext, CTAProps } from '../context/CTAContext';

export const useCTA = (props: CTAProps) => {
  const ctx = useContext(CTAContext);
  if (!ctx) throw new Error('useCTA must be used within CTAProvider');

  useEffect(() => {
    ctx.setCTA(props);

    return () => {
      ctx.setCTA(null);
    };
  }, [props.disabled, props.label, props.onClick]);

  return ctx;
};
