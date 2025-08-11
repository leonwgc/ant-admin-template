/**
 * @file src/hooks/useScrollToTop.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */
import { useMount } from 'ahooks';

export const useScrollToTop = () => {
  useMount(() => {
    window.scroll(0, 0);
  });
};
