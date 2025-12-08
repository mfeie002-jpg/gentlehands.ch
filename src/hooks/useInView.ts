import { useEffect, useRef, useState, RefObject, useCallback } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

interface UseInViewReturn {
  ref: RefObject<HTMLElement>;
  isInView: boolean;
  hasBeenInView: boolean;
}

/**
 * Enhanced Intersection Observer hook for triggering animations
 * and lazy loading when elements enter the viewport
 */
export function useInView({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  enabled = true,
}: UseInViewOptions = {}): UseInViewReturn {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const inView = entry?.isIntersecting ?? false;
      
      setIsInView(inView);
      
      if (inView && !hasBeenInView) {
        setHasBeenInView(true);
      }
    },
    [hasBeenInView]
  );

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already seen, skip observation
    if (triggerOnce && hasBeenInView) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenInView, handleIntersection, enabled]);

  return { ref: ref as RefObject<HTMLElement>, isInView, hasBeenInView };
}

/**
 * Hook to batch multiple elements for intersection observation
 * More performant than individual observers
 */
export function useBatchInView(
  elementCount: number,
  options: UseInViewOptions = {}
): { refs: RefObject<HTMLElement>[]; inViewStates: boolean[] } {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  
  const refs = useRef<RefObject<HTMLElement>[]>(
    Array.from({ length: elementCount }, () => ({ current: null }))
  ).current;
  
  const [inViewStates, setInViewStates] = useState<boolean[]>(
    new Array(elementCount).fill(false)
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) {
            setInViewStates((prev) => {
              const next = [...prev];
              if (triggerOnce && next[index]) return prev; // Already seen
              next[index] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [refs, threshold, rootMargin, triggerOnce]);

  return { refs, inViewStates };
}

export default useInView;
