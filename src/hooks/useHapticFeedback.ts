import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const hapticPatterns: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 10],
  warning: [30, 50, 30],
  error: [50, 30, 50, 30, 50],
};

export const useHapticFeedback = () => {
  const vibrate = useCallback((type: HapticType = 'light') => {
    // Check if vibration API is supported
    if (!navigator.vibrate) return false;
    
    try {
      const pattern = hapticPatterns[type];
      navigator.vibrate(pattern);
      return true;
    } catch {
      return false;
    }
  }, []);

  const lightTap = useCallback(() => vibrate('light'), [vibrate]);
  const mediumTap = useCallback(() => vibrate('medium'), [vibrate]);
  const heavyTap = useCallback(() => vibrate('heavy'), [vibrate]);
  const success = useCallback(() => vibrate('success'), [vibrate]);
  const warning = useCallback(() => vibrate('warning'), [vibrate]);
  const error = useCallback(() => vibrate('error'), [vibrate]);

  return {
    vibrate,
    lightTap,
    mediumTap,
    heavyTap,
    success,
    warning,
    error,
  };
};

// Standalone function for use outside React components
export const triggerHaptic = (type: HapticType = 'light') => {
  if (!navigator.vibrate) return false;
  try {
    navigator.vibrate(hapticPatterns[type]);
    return true;
  } catch {
    return false;
  }
};
