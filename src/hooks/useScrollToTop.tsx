/**
 * @file src/hooks/useScrollToTop.tsx
 * @author leon.wang
 */
import { useMount } from 'ahooks';

export const useScrollToTop = () => {
  useMount(() => {
    window.scroll(0, 0);
  });
};
