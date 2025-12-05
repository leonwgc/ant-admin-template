/**
 * @file src/hooks/useCountdown.tsx
 * @author leon.wang
 */

import { useCountDown, useUnmount } from 'ahooks';
import { useCallback, useMemo, useState } from 'react';

/**
 * Countdown hook props
 */
export interface UseCountdownProps {
  seconds: number;
  onFinish?: () => void;
}

/**
 * Countdown hook return type
 */
export interface UseCountdownResult {
  sec: number;
  start: () => void;
  reset: () => void;
  isRunning: boolean;
  round: number;
}

/**
 * useCountdown - a simple countdown hook
 */
const useCountdown = ({
  seconds = 60,
  onFinish,
}: UseCountdownProps): UseCountdownResult => {
  const [leftSec, setLeftSec] = useState(0);
  const [round, setRound] = useState(0);

  const [countdown] = useCountDown({
    leftTime: leftSec * 1000,
    interval: 1000,
    onEnd: () => {
      setLeftSec(0);
      setRound((p) => p + 1);
      onFinish?.();
    },
  });

  const sec = useMemo(() => Math.round(countdown / 1000), [countdown]);

  const isRunning = useMemo(() => sec > 0, [sec]);

  const start = useCallback(() => {
    setLeftSec(seconds);
  }, [seconds]);

  const reset = useCallback(() => {
    setLeftSec(0);
    setRound(0);
  }, []);

  useUnmount(reset);

  return {
    sec,
    start,
    reset,
    isRunning,
    round,
  };
};

export default useCountdown;
