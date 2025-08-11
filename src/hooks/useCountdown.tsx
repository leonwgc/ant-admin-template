/**
 * @file src/hooks/useCountdown.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import { useUnmount } from 'ahooks';
import { useEffect, useState, useCallback, useRef } from 'react';

type CountdownHooksReturn = {
  countdown: number;
  isRunning: boolean;
  isReStarted: boolean;
  start: () => void;
  reset: () => void;
};

/**
 * Custom React hook for managing a countdown timer.
 *
 * @param defaultCountdown - The initial countdown value in seconds. Defaults to 60.
 * @param defaultStarted - Whether the countdown should start immediately. Defaults to false.
 * @returns An object containing:
 *   - `countdown`: The current countdown value.
 *   - `isRunning`: Boolean indicating if the countdown is active.
 *   - `start`: Function to start the countdown.
 *   - `reset`: Function to reset and stop the countdown.
 *   - `isReStarted`: Boolean indicating if the countdown has completed and restarted.
 *
 * The countdown decreases every second when started. When it reaches zero, it resets to the default value.
 * Automatically cleans up on component unmount.
 */
const useCountdown = (
  defaultCountdown = 60,
  defaultStarted = false
): CountdownHooksReturn => {
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [started, setStarted] = useState(defaultStarted);
  const [isReStarted, setIsReStarted] = useState(false);
  const unmountRef = useRef(false);

  const start = useCallback(() => {
    setStarted(true);
  }, []);

  const reset = useCallback(() => {
    setStarted(false);
  }, []);

  useUnmount(() => {
    unmountRef.current = true;
  });

  useEffect(() => {
    if (countdown > 0 && started) {
      setTimeout(() => {
        if (!unmountRef.current) {
          setCountdown((cd) => --cd);
        }
      }, 1000);
      if (countdown === 1) {
        setIsReStarted(true);
      }
    } else {
      setStarted(false);
      setCountdown(defaultCountdown);
    }
  }, [countdown, started, defaultCountdown]);

  return { countdown, isRunning: started, start, reset, isReStarted };
};

export default useCountdown;
