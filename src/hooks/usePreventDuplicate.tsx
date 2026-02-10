/**
 * @file hooks/usePreventDuplicate.tsx
 * @author leon.wang
 */
import { useRef, useCallback } from 'react';

/**
 * 防重复提交Hook
 * 确保异步函数完全执行完成后才允许下次调用
 *
 * @example
 * const handleSubmit = usePreventDuplicate(async () => {
 *   await saveData();
 * });
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePreventDuplicate<T extends (...args: any[]) => Promise<any>>(
  fn: T,
): T {
  const loadingRef = useRef(false);

  const wrappedFn = useCallback(
    async (...args: Parameters<T>) => {
      // 如果正在执行中，阻止重复提交
      if (loadingRef.current) {
        return;
      }

      // 设置loading状态
      loadingRef.current = true;

      try {
        const result = await fn(...args);
        return result;
      } finally {
        // 函数执行完成后立即重置状态
        loadingRef.current = false;
      }
    },
    [fn],
  ) as T;

  return wrappedFn;
}

/**
 * 基于请求签名的防重复Hook
 * 根据参数判断是否重复，确保相同参数的请求完全执行完成后才允许下次调用
 * 不同参数的请求可以并发执行
 *
 * @example
 * const handleRequest = usePreventDuplicateBySign(async (id) => {
 *   return await fetchData(id);
 * });
 */
export function usePreventDuplicateBySign<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => Promise<any>,
>(fn: T): T {
  const pendingRequestsRef = useRef<Set<string>>(new Set());

  const wrappedFn = useCallback(
    async (...args: Parameters<T>) => {
      // 生成请求签名（基于参数）
      const signature = JSON.stringify(args);

      // 如果相同签名的请求正在处理中，阻止重复
      if (pendingRequestsRef.current.has(signature)) {
        return;
      }

      // 添加到待处理集合
      pendingRequestsRef.current.add(signature);

      try {
        const result = await fn(...args);
        return result;
      } finally {
        // 函数执行完成后立即移除签名
        pendingRequestsRef.current.delete(signature);
      }
    },
    [fn],
  ) as T;

  return wrappedFn;
}

/**
 * 防重复执行Hook（同步版本）
 * 适用于非异步场景，使用防抖机制
 *
 * @param fn - 要执行的同步函数
 * @param delay - 防抖延迟时间（毫秒），默认300ms
 *
 * @example
 * const handleClick = usePreventDuplicateSync(() => {
 *   console.log('clicked');
 * }, 1000);
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePreventDuplicateSync<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
): T {
  const delayValue = delay;

  const lastCallRef = useRef<number>(0);

  const wrappedFn = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      // 如果距离上次调用未超过delay，忽略本次调用
      if (now - lastCallRef.current < delayValue) {
        return;
      }

      lastCallRef.current = now;
      return fn(...args);
    },
    [fn, delayValue],
  ) as T;

  return wrappedFn;
}
