import { useContext, useEffect, useRef } from 'react';
import { CTAContext, CTAProps } from '../context/CTAContext';
import { useLocation } from 'react-router-dom';

export const useCTA = (props?: CTAProps) => {
  const ctx = useContext(CTAContext);
  if (!ctx) throw new Error('useCTA must be used within CTAProvider');

  const location = useLocation();

  const pathname = location.pathname;

  const lastPathRef = useRef<string>(pathname);

  useEffect(() => {
    if (!props) {
      return;
    }

    console.log({
      pathname,
      label: props.label,
      lastPathRef: lastPathRef.current,
    });

    if (lastPathRef.current !== pathname) {
      ctx.setCTA(null);
      return;
    }

    ctx.setCTA(props);
    lastPathRef.current = pathname;

    return () => {
      ctx.setCTA(null);
    };
  }, [pathname, props?.label, props?.disabled, ...(props?.extraDeps || [])]);

  return ctx;
};
