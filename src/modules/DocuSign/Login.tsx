import { Form, App, Button } from 'antd';
import { useNavigate } from 'react-router';

import { login } from './api';
import { useLocalStorageState } from 'ahooks';
import { useEffect } from 'react';

export default () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorageState<{
    token: string;
    expired: string;
  }>('token', {
    listenStorageChange: true,
  });

  useEffect(() => {
    if (
      token &&
      token.token &&
      new Date(token.expired).getTime() > Date.now()
    ) {
      message.info('already login');
      // navigate('/app/users');
    }
  }, [token]);

  const onFinish = () => {
    login().then((res) => {
      setToken({
        token: res.data?.accessToken,
        expired: res.data?._tokenExpiration,
      });
      message.success('Login successfully');
    });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {/* <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
