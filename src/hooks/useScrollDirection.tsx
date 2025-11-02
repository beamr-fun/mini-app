import { useEffect, useState, useRef } from 'react';

export function useScrollDirection(threshold = 50) {
  const [hidden, setHidden] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const rootEl = document.querySelector('#main-scroll');

    if (!rootEl) return;

    const el = rootEl.querySelector('.mantine-ScrollArea-viewport');

    if (!el) return;

    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const diff = scrollTop - lastScrollTop.current;

      if (Math.abs(diff) < threshold) return;

      // scrolling down
      if (diff > 0) setHidden(true);
      else setHidden(false);

      lastScrollTop.current = scrollTop;
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return hidden;
}
