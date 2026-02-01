/**
 * @file pages/Hotel/LoginPage.tsx
 * @author leon.wang
 * @description Login page with Email/Phone tabs
 *
 * MCP Services Used:
 * Neat Design:
 * - get_component_document: Tabs, Input, Button, Link
 * - get_component_examples_info: Tabs examples
 * - get_component_example: Tabs basic.tsx
 * - get_icons_information: Icon usage guide
 * - get_all_icon_names: Available icons
 *
 * ahooks:
 * - get_hook_info: useBoolean, useRequest
 */

import React, { FC } from 'react';
import {
  Segmented,
  Input,
  Button,
  Space,
  Typography,
} from '@derbysoft/neat-design';
import { MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

import './LoginPage.scss';

/**
 * Login form data interface
 */
interface LoginFormData {
  email?: string;
  phoneNumber?: string;
  password: string;
}

/**
 * Login page component
 * Provides Email and Phone Number login options
 */
const LoginPage: FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('email');
  const [formData, setFormData] = React.useState<LoginFormData>({
    password: '',
  });

  const isEmailTab = activeTab === 'email';

  const { loading, run: runLogin } = useRequest(
    async (data: LoginFormData) => {
      // TODO: Implement login logic (send `data` to API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    },
    {
      manual: true,
    },
  );

  const handleLogin = React.useCallback(() => runLogin(formData), [runLogin, formData]);

  const handleInputChange = React.useCallback(
    (field: keyof LoginFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const segmentedOptions = React.useMemo(
    () => [
      {
        label: (
          <Space size={8}>
            <MailOutlined />
            <span>Email</span>
          </Space>
        ),
        value: 'email',
      },
      {
        label: (
          <Space size={8}>
            <PhoneOutlined />
            <span>Phone Number</span>
          </Space>
        ),
        value: 'phone',
      },
    ],
    [],
  );

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__header">
          <h1 className="login-page__title">Sign In</h1>
        </div>

        <div className="login-page__main">
          <div className="login-page__form">
            <Segmented
              value={activeTab}
              options={segmentedOptions}
              onChange={setActiveTab}
              className="login-page__tabs"
            />

            <div className="login-page__form-content">
              <div className="login-page__form-item">
                <label
                  className="login-page__label"
                  htmlFor={isEmailTab ? 'login-email' : 'login-phone'}
                >
                  {isEmailTab ? 'Work Email' : 'Phone Number'}
                </label>
                <Input
                  id={isEmailTab ? 'login-email' : 'login-phone'}
                  aria-label={isEmailTab ? 'work email' : 'phone number'}
                  placeholder={
                    isEmailTab
                      ? 'Enter your work email'
                      : 'Enter your phone number'
                  }
                  value={isEmailTab ? formData.email : formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(
                      isEmailTab ? 'email' : 'phoneNumber',
                      e.target.value,
                    )
                  }
                  prefix={isEmailTab ? <MailOutlined /> : <PhoneOutlined />}
                  allowClear
                  size="large"
                  className="login-page__input"
                />
              </div>

              <div className="login-page__form-item">
                <label className="login-page__label" htmlFor="login-password">
                  Password
                </label>
                <Input.Password
                  id="login-password"
                  aria-label="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  prefix={<LockOutlined />}
                  size="large"
                  className="login-page__input"
                />
              </div>

              <div className="login-page__form-item login-page__form-item--forgot">
                <Typography.Link href="#" className="login-page__forgot-link">
                  Forgot Password?
                </Typography.Link>
              </div>

              <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={handleLogin}
                className="login-page__submit-btn"
                block
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
