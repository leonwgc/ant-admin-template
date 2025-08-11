/**
 * @file src/hooks/useRootRect.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import { useEventListener, useMount } from 'ahooks';
import { useState } from 'react';
import { isMobile } from '~/utils';

type RootRect =
  | {
      width: number;
      left: number;
    }
  | undefined;

const getRootRect = (): RootRect => {
  const root = document.querySelector('#root');
  const rect = root.getBoundingClientRect();
  return {
    width: rect.width,
    left: rect.left,
  };
};

export const useRootRect: () => RootRect = () => {
  const [rect, setRect] = useState<RootRect>();

  useMount(() => {
    if (!isMobile()) {
      setRect(getRootRect());
    }
  });

  useEventListener(
    'resize',
    () => {
      if (!isMobile()) {
        setRect(getRootRect());
      } else {
        setRect(undefined);
      }
    },
    { target: window }
  );

  return rect;
};
