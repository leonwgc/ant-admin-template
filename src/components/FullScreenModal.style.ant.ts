import { createStyles } from 'antd-style';

const useModalStyle = () => {
  return createStyles(({ css }) => ({
    body: css`
      max-height: 100vh !important;
      overflow-y: auto;
      padding: 0 !important;
    `,
    content: css`
      height: 100vh;
      border-radius: 0 !important;
    `,
  }))();
};

export default useModalStyle;
