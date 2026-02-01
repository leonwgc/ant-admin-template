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
  Tabs,
  Input,
  Button,
  Space,
  Typography,
} from '@derbysoft/neat-design';
import {
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { useBoolean, useRequest } from 'ahooks';

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
  const [activeTab, { set: setActiveTab }] = useBoolean(true);
  const [showPassword, toggleShowPassword] = useBoolean(false);
  const [formData, setFormData] = React.useState<LoginFormData>({
    password: '',
  });

  const isEmailTab = activeTab;

  const { loading, run: handleLogin } = useRequest(
    async () => {
      // TODO: Implement login logic
      console.log('Login with:', formData);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    {
      manual: true,
    }
  );

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleClearInput = (field: keyof LoginFormData) => {
    setFormData({ ...formData, [field]: '' });
  };

  const tabItems = [
    {
      key: 'email',
      label: (
        <Space size={8}>
          <MailOutlined />
          <span>Email</span>
        </Space>
      ),
    },
    {
      key: 'phone',
      label: (
        <Space size={8}>
          <PhoneOutlined />
          <span>Phone Number</span>
        </Space>
      ),
    },
  ];

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__header">
          <h1 className="login-page__title">Sign In</h1>
        </div>

        <div className="login-page__main">
          <div className="login-page__form">
            <Tabs
              activeKey={isEmailTab ? 'email' : 'phone'}
              items={tabItems}
              onChange={(key) => setActiveTab(key === 'email')}
              className="login-page__tabs"
            />

            <div className="login-page__form-content">
              <div className="login-page__form-item">
                <label className="login-page__label">
                  {isEmailTab ? 'Work Email' : 'Phone Number'}
                </label>
                <Input
                  placeholder={isEmailTab ? 'Enter your work email' : 'Enter your phone number'}
                  value={isEmailTab ? formData.email : formData.phoneNumber}
                  onChange={(e) => handleInputChange(
                    isEmailTab ? 'email' : 'phoneNumber',
                    e.target.value
                  )}
                  prefix={isEmailTab ? <MailOutlined /> : <PhoneOutlined />}
                  suffix={
                    (isEmailTab ? formData.email : formData.phoneNumber) ? (
                      <Button
                        type="text"
                        onClick={() => handleClearInput(isEmailTab ? 'email' : 'phoneNumber')}
                        className="login-page__clear-btn"
                      >
                        ×
                      </Button>
                    ) : null
                  }
                  size="large"
                  className="login-page__input"
                />
              </div>

              <div className="login-page__form-item">
                <label className="login-page__label">Password</label>
                <Input.Password
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  prefix={<LockOutlined />}
                  iconRender={(visible) => (
                    <Button
                      type="text"
                      onClick={toggleShowPassword}
                      className="login-page__password-toggle"
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </Button>
                  )}
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