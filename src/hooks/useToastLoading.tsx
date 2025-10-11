import { message } from 'antd';
import { useCallback } from 'react';
import { useBookEngineStore } from '~/store';

type Props = {
  content?: React.ReactNode;
  duration?: number;
};

const useToastLoading = () => {
  const { language } = useBookEngineStore();

  const showToast = useCallback(
    (props: Props) => {
      message.info({
        content: language === 'zh' ? '加载中...' : 'Loading...',
        duration: 0, // 0 means it will not close automatically
        icon: 'loading',
        ...props,
      });
    },
    [language]
  );

  return { showToast };
};

export default useToastLoading;
