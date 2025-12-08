import { useState, useRef, useCallback } from "react";

interface UseThrottleOptions {
  /** Minimum time between submissions in milliseconds */
  limitMs: number;
  /** Maximum submissions allowed in the time window */
  maxAttempts?: number;
  /** Time window for max attempts in milliseconds */
  windowMs?: number;
}

interface UseThrottleReturn {
  /** Whether submission is currently allowed */
  canSubmit: boolean;
  /** Time remaining until next submission allowed (in seconds) */
  cooldownSeconds: number;
  /** Number of attempts remaining in current window */
  attemptsRemaining: number;
  /** Call this when a submission is made */
  recordSubmission: () => boolean;
  /** Reset the throttle state */
  reset: () => void;
}

export function useThrottle({
  limitMs = 3000,
  maxAttempts = 3,
  windowMs = 60000,
}: UseThrottleOptions): UseThrottleReturn {
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState(maxAttempts);
  
  const lastSubmissionRef = useRef<number>(0);
  const submissionTimesRef = useRef<number[]>([]);
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearCooldownInterval = () => {
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
      cooldownIntervalRef.current = null;
    }
  };

  const startCooldown = (seconds: number) => {
    setCooldownSeconds(seconds);
    clearCooldownInterval();
    
    cooldownIntervalRef.current = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearCooldownInterval();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const recordSubmission = useCallback((): boolean => {
    const now = Date.now();
    
    // Check minimum time between submissions
    const timeSinceLastSubmission = now - lastSubmissionRef.current;
    if (timeSinceLastSubmission < limitMs) {
      const remainingMs = limitMs - timeSinceLastSubmission;
      startCooldown(Math.ceil(remainingMs / 1000));
      return false;
    }

    // Clean up old submissions outside the window
    submissionTimesRef.current = submissionTimesRef.current.filter(
      (time) => now - time < windowMs
    );

    // Check max attempts in window
    if (submissionTimesRef.current.length >= maxAttempts) {
      const oldestInWindow = submissionTimesRef.current[0];
      const waitTime = windowMs - (now - oldestInWindow);
      startCooldown(Math.ceil(waitTime / 1000));
      setAttemptsRemaining(0);
      return false;
    }

    // Record this submission
    lastSubmissionRef.current = now;
    submissionTimesRef.current.push(now);
    setAttemptsRemaining(maxAttempts - submissionTimesRef.current.length);
    
    return true;
  }, [limitMs, maxAttempts, windowMs]);

  const reset = useCallback(() => {
    lastSubmissionRef.current = 0;
    submissionTimesRef.current = [];
    setCooldownSeconds(0);
    setAttemptsRemaining(maxAttempts);
    clearCooldownInterval();
  }, [maxAttempts]);

  const canSubmit = cooldownSeconds === 0 && attemptsRemaining > 0;

  return {
    canSubmit,
    cooldownSeconds,
    attemptsRemaining,
    recordSubmission,
    reset,
  };
}
