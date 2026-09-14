/**
 * @file hooks/useLockAsyncFunc.test.ts
 * @author leon.wang
 */
import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useLockAsyncFunc from './useLockAsyncFunc';

describe('useLockAsyncFunc', () => {
  it('runs the wrapped function and returns its result', async () => {
    const fn = vi.fn(async (value: number) => value * 2);
    const { result } = renderHook(() => useLockAsyncFunc(fn));

    let ret: number | undefined;
    await act(async () => {
      ret = await result.current(21);
    });

    expect(ret).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('ignores concurrent calls while the previous one is still running', async () => {
    let resolveFirst: (value: number) => void = () => {};
    const fn = vi.fn(
      () =>
        new Promise<number>((resolve) => {
          resolveFirst = resolve;
        }),
    );
    const { result } = renderHook(() => useLockAsyncFunc(fn));

    let firstRet: number | undefined;
    let secondRet: number | undefined;

    const firstCall = act(async () => {
      firstRet = await result.current();
    });
    const secondCall = act(async () => {
      secondRet = await result.current();
    });

    resolveFirst(1);
    await Promise.all([firstCall, secondCall]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(firstRet).toBe(1);
    expect(secondRet).toBeUndefined();
  });

  it('unlocks after the wrapped function rejects, so it can run again', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce('ok');
    const { result } = renderHook(() => useLockAsyncFunc(fn));

    await act(async () => {
      await expect(result.current()).rejects.toThrow('boom');
    });

    let ret: string | undefined;
    await act(async () => {
      ret = await result.current();
    });

    expect(ret).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
