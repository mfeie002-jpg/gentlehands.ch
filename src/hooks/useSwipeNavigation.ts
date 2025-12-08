import { useState, useCallback, useRef } from 'react';
import { triggerHaptic } from './useHapticFeedback';

interface UseSwipeNavigationOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  disabled?: boolean;
}

export const useSwipeNavigation = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  disabled = false,
}: UseSwipeNavigationOptions) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontalSwipe = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = false;
    setIsSwiping(true);
  }, [disabled]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping || disabled) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX.current;
    const diffY = currentY - startY.current;

    // Determine if this is a horizontal swipe on first significant movement
    if (!isHorizontalSwipe.current && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
      isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
    }

    // Only track horizontal swipes
    if (isHorizontalSwipe.current) {
      // Limit the offset with resistance at edges
      const maxOffset = 100;
      const resistance = 0.4;
      const limitedOffset = diffX > maxOffset 
        ? maxOffset + (diffX - maxOffset) * resistance
        : diffX < -maxOffset
        ? -maxOffset + (diffX + maxOffset) * resistance
        : diffX;
      
      setSwipeOffset(limitedOffset);
    }
  }, [isSwiping, disabled]);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping || disabled) return;

    if (Math.abs(swipeOffset) > threshold) {
      if (swipeOffset > 0 && onSwipeRight) {
        triggerHaptic('light');
        onSwipeRight();
      } else if (swipeOffset < 0 && onSwipeLeft) {
        triggerHaptic('light');
        onSwipeLeft();
      }
    }

    setSwipeOffset(0);
    setIsSwiping(false);
    isHorizontalSwipe.current = false;
  }, [isSwiping, swipeOffset, threshold, onSwipeLeft, onSwipeRight, disabled]);

  return {
    swipeOffset,
    isSwiping,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
