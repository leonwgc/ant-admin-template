import { Form, App, Button, Typography, Flex } from '@derbysoft/neat-design';
import { useNavigate } from 'react-router';

// import { login } from './api';
import { useLocalStorageState, useMount } from 'ahooks';
import { useEffect, useState } from 'react';
import { dsGet, proxyGet } from '~/utils/fetch';

const userInfo = {
  accountId: 'b1324bfe-b39f-46b7-b14b-51f0177c9958',
  basePath: 'https://demo.docusign.net/restapi',
  accountName: 'derbysoft',
};

export type Token = {
  accountId: string;
  token: string;
  expired: string;
};

export default () => {
  const { toast } = App.useApp();
  // const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [data, setData] = useState('');
  const [hasValidToken, setHasValidToken] = useState(false);
  const [token, setToken] = useLocalStorageState<Token>('token');

  useMount(() => {
    if (
      token &&
      token.token &&
      new Date(token.expired).getTime() > Date.now()
    ) {
      setHasValidToken(true);
    }
  });

  const onLogin = () => {
    proxyGet('/login').then((res) => {
      setToken({
        accountId: res.data?.accountId,
        token: res.data?.accessToken,
        expired: res.data?._tokenExpiration,
      });
      setHasValidToken(true);
      toast.success('Login successfully');
    });
  };

  return (
    <Flex vertical gap={40} style={{ width: 300 }}>
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        disabled={hasValidToken}
        onClick={onLogin}
      >
        Log in
      </Button>
      <Button
        type="primary"
        className="login-form-button"
        disabled={!hasValidToken}
        onClick={() => {
          setToken(undefined);
          setHasValidToken(false);
        }}
      >
        clear token
      </Button>

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

      <Button
        onClick={() => {
          dsGet(`/v2.1/accounts/${userInfo.accountId}`, {
            headers: { Authorization: `Bearer ${token?.token}` },
          }).then((res) => {
            setData(res.data);
          });
        }}
      >
        Get account info via api
      </Button>
      <p>
        <Typography.Text>{data && JSON.stringify(data)}</Typography.Text>
      </p>
    </Flex>
  );
};
