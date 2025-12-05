/**
 * @file src/hooks/usePcBgColor.tsx
 * @author leon.wang
 */

import { useMount } from 'ahooks';
import { isMobile } from '~/utils';

const usePcBgColor = () => {
  useMount(() => {
    if (!isMobile()) {
      document.body.style.backgroundColor = '#eee';
    }
  });
};

export default usePcBgColor;
