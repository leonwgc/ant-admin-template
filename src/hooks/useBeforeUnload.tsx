/**
 * @file src/hooks/useBeforeUnload.tsx
 * @author leon.wang
 */

import { useEffect, useCallback } from 'react';

export interface UseBeforeUnloadOptions {
  message?: string;
  enabled?: boolean;
}

const useBeforeUnload: React.FC<UseBeforeUnloadOptions> = ({
  message = '确定要离开当前页面吗？',
  enabled = true,
}) => {
  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (enabled) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
      return undefined;
    },
    [enabled, message]
  );

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, handleBeforeUnload]);

  return null;
};

export default useBeforeUnload;