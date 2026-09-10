/**
 * @file pages/Login/Login.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';

import { Alert, Button, Checkbox, Form, Input } from '@derbysoft/neat-design';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import type { AxiosError } from 'axios';

import { login, type LoginParams } from '~/services/auth';
import { useAppStore } from '~/store';

import './Login.scss';

type LoginFormValues = LoginParams;

interface ErrorResponse {
  code?: number;
  msg?: string;
}

type LoginErrorKey =
  | 'pages.login:loginMsgLocked'
  | 'pages.login:loginMsgNetwork'
  | 'pages.login:loginMsgInvalid';

const getLoginErrorKey = (error: unknown): LoginErrorKey => {
  const axiosError = error as AxiosError<ErrorResponse>;
  const code = axiosError.response?.data?.code;

  if (code === 40002 || axiosError.response?.status === 423) {
    return 'pages.login:loginMsgLocked';
  }

  if (!axiosError.response || (axiosError.response.status ?? 0) >= 500) {
    return 'pages.login:loginMsgNetwork';
  }

  return 'pages.login:loginMsgInvalid';
};

const Login: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<LoginFormValues>();
  const [errorKey, setErrorKey] = useState<LoginErrorKey>();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);
  const setAuthInitialized = useAppStore((state) => state.setAuthInitialized);

  const handleSubmit = async (values: LoginFormValues) => {
    setErrorKey(undefined);
    setLoading(true);

    try {
      const user = await login(values);
      setUser(user);
      setAuthInitialized(true);

      const redirect = new URLSearchParams(location.search).get('redirect');
      const target = redirect?.startsWith('/') ? redirect : '/app/dashboard';
      navigate(target, { replace: true });
    } catch (error) {
      form.resetFields(['password']);
      setErrorKey(getLoginErrorKey(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-page__panel" aria-labelledby="login-title">
        <div className="login-page__brand">ANT ADMIN</div>
        <h1 id="login-title" className="login-page__title">
          {t('pages.login:loginTitle')}
        </h1>
        <p className="login-page__subtitle">{t('pages.login:loginSubtitle')}</p>

        {errorKey && (
          <Alert
            type="error"
            showIcon
            message={t(errorKey)}
            className="login-page__alert"
          />
        )}

        <Form<LoginFormValues>
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label={t('pages.login:loginFormAccount')}
            name="account"
            rules={[
              {
                required: true,
                message: t('pages.login:loginFormAccountRequired'),
              },
              {
                max: 64,
                message: t('pages.login:loginFormAccountLength'),
              },
            ]}
          >
            <Input
              autoComplete="username"
              prefix={<UserOutlined />}
              placeholder={t('pages.login:loginFormAccountPh')}
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            label={t('pages.login:loginFormPassword')}
            name="password"
            rules={[
              {
                required: true,
                message: t('pages.login:loginFormPasswordRequired'),
              },
            ]}
          >
            <Input.Password
              autoComplete="current-password"
              prefix={<LockOutlined />}
              placeholder={t('pages.login:loginFormPasswordPh')}
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox disabled={loading}>
              {t('pages.login:loginFormRemember')}
            </Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            {t('pages.login:loginBtnSubmit')}
          </Button>
        </Form>
      </section>
    </main>
  );
};

export default Login;
