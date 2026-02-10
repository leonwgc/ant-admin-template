/**
 * @file hooks/usePreventDuplicate.tsx
 * @author leon.wang
 */
import { useRef, useCallback } from 'react';

interface PreventDuplicateOptions {
  /** 防抖时间（毫秒），默认300ms */
  delay?: number;
}

/**
 * 防重复提交Hook
 * 用于防止按钮或表单快速重复提交
 *
 * @example
 * const handleSubmit = usePreventDuplicate(async () => {
 *   await saveData();
 * }, { delay: 500 });
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePreventDuplicate<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: PreventDuplicateOptions = {},
): T {
  const { delay = 300 } = options;

  const loadingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
        // 延迟重置loading状态，防止快速点击
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          loadingRef.current = false;
        }, delay);
      }
    },
    [fn, delay],
  ) as T;

  return wrappedFn;
}

/**
 * 基于请求签名的防重复Hook
 * 适用于需要根据参数判断是否重复的场景
 *
 * @example
 * const handleRequest = usePreventDuplicateBySign(async (id) => {
 *   return await fetchData(id);
 * });
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePreventDuplicateBySign<
  T extends (...args: any[]) => Promise<any>,
>(fn: T, options: PreventDuplicateOptions = {}): T {
  const { delay = 300 } = options;

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
        // 延迟移除签名，防止快速重复
        setTimeout(() => {
          pendingRequestsRef.current.delete(signature);
        }, delay);
      }
    },
    [fn, delay],
  ) as T;

  return wrappedFn;
}

/**
 * 防重复执行Hook（同步版本）
 * 适用于非异步场景
 *
 * @example
 * const handleClick = usePreventDuplicateSync(() => {
 *   console.log('clicked');
 * }, { delay: 1000 });
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePreventDuplicateSync<T extends (...args: any[]) => any>(
  fn: T,
  options: Omit<PreventDuplicateOptions, 'message'> = {},
): T {
  const { delay = 300 } = options;

  const lastCallRef = useRef<number>(0);

  const wrappedFn = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      // 如果距离上次调用未超过delay，忽略本次调用
      if (now - lastCallRef.current < delay) {
        return;
      }

      lastCallRef.current = now;
      return fn(...args);
    },
    [fn, delay],
  ) as T;

  return wrappedFn;
}
