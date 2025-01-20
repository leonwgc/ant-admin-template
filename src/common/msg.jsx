import { message } from 'antd';

const d = '服务器开小差了src';

export const showError = (msgOrEx) => {
  let msg = msgOrEx;
  const t = typeof msgOrEx;

  if (t === 'string') {
    msg = msg || d;
  } else if (t === 'object' && msgOrEx) {
    msg = msgOrEx?.message || d;
  }

  message.error(msg);
};

export const showSuccess = (msg) => {
  message.success(msg);
};
