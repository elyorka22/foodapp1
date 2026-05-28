'use client';

import { useEffect, useRef } from 'react';

export function useIntersection(onIntersect: () => void, enabled: boolean) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: '120px' },
    );

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [enabled, onIntersect]);

  return targetRef;
}
