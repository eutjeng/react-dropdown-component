import { useEffect, useMemo } from 'react';

interface UseInfiniteScrollProps {
  rootRef: React.RefObject<HTMLElement>;
  onScrollToEnd: () => void;
  threshold?: number;
  hasMore: boolean;
}

export const useInfiniteScroll = ({
  rootRef,
  onScrollToEnd,
  threshold = 500,
  hasMore,
}: UseInfiniteScrollProps): void => {
  const observerOptions = useMemo(
    () => ({
      rootMargin: `${threshold}px`,
      threshold: 1.0,
    }),
    [threshold],
  );

  useEffect(() => {
    const currentRoot = rootRef.current;
    if (!currentRoot || !hasMore) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
      const [entry] = entries;

      if (entry.isIntersecting) onScrollToEnd();
    };

    const observer = new IntersectionObserver(handleIntersection, {
      ...observerOptions,
      root: currentRoot,
    });

    const sentinel = document.createElement('div');
    currentRoot.appendChild(sentinel);
    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
      currentRoot.removeChild(sentinel);
    };
  }, [rootRef, onScrollToEnd, observerOptions, hasMore]);

  // Note: No change in dependencies array, as `observerOptions` change will be stable thanks to `useMemo`.
};
