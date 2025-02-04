import { Form, App, Button, Typography } from 'antd';
import { useNavigate } from 'react-router';

// import { login } from './api';
import { useLocalStorageState, useMount } from 'ahooks';
import { useEffect, useState } from 'react';
import { proxyGet } from '~/utils/fetch';

// user = {
//   accountId: 'b1324bfe-b39f-46b7-b14b-51f0177c9958',
//   basePath: 'https://demo.docusign.net/restapi',
//   accountName: 'derbysoft',
// };

export default () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [hasValidToken, setHasValidToken] = useState(false);
  const [token, setToken] = useLocalStorageState<{
    token: string;
    expired: string;
  }>('token', {
    listenStorageChange: true,
  });

  useMount(() => {
    if (
      token &&
      token.token &&
      new Date(token.expired).getTime() > Date.now()
    ) {
      message.info('already login');
      setHasValidToken(true);
    }
  });

  const onFinish = () => {
    proxyGet('/login').then((res) => {
      setToken({
        token: res.data?.accessToken,
        expired: res.data?._tokenExpiration,
      });
      setHasValidToken(true);
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
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={hasValidToken}
        >
          Log in
        </Button>
      </Form.Item>

      <Form.Item>
        <Button
          onClick={() => {
            proxyGet('/user-info').then((res) => {
              setUser(res.data);
            });
          }}
        >
          Get user
        </Button>

        <Typography.Text>{user && JSON.stringify(user)}</Typography.Text>
      </Form.Item>
    </Form>
  );
};
