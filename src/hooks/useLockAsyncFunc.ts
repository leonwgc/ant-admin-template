/**
 * A React hook that wraps an asynchronous function and ensures it cannot be executed concurrently.
 * If the function is already running, subsequent calls are ignored until the current execution completes.
 *
 * @template P - The argument types of the wrapped function.
 * @template V - The return type of the wrapped function.
 * @param fn - The asynchronous function to be wrapped with a lock.
 * @returns A memoized callback that executes the function with locking behavior.
 *
 * @example
 * const lockedAsyncFunc = useLockFn(async (id: number) => {
 *   // async logic here
 * });
 *
 * // Only one execution at a time:
 * lockedAsyncFunc(1);
 * lockedAsyncFunc(2); // Ignored if previous call is still running
 */
/* eslint-disable no-useless-catch */
import { useRef, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useLockAsyncFunc<P extends any[] = any[], V = any>(
  fn: (...args: P) => Promise<V>,
) {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) {
        return;
      }
      lockRef.current = true;
      try {
        const ret = await fn(...args);
        return ret;
      } catch (e) {
        throw e;
      } finally {
        lockRef.current = false;
      }
    },
    [fn],
  );
}

export default useLockAsyncFunc;
