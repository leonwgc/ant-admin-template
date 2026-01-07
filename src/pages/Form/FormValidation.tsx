/**
 * @file src/pages/Form/FormValidation.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Space,
  message,
  Typography,
  Divider,
} from '@derbysoft/neat-design';
import type { FormInstance } from '@derbysoft/neat-design';
import './FormValidation.scss';

const { Title, Paragraph, Text } = Typography;

// Simulated occupied emails
const OCCUPIED_EMAILS = [
  'test@example.com',
  'admin@example.com',
  'user@derbysoft.com',
];

const FormValidation: React.FC = () => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  // Basic email validation
  const handleSubmit1 = async (values: { email: string }) => {
    setLoading1(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Email is valid!');
      console.log('Form 1 values:', values);
    } finally {
      setLoading1(false);
    }
  };

  // Email format validation with custom error messages
  const handleSubmit2 = async (values: { workEmail: string }) => {
    setLoading2(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Work email is valid!');
      console.log('Form 2 values:', values);
    } finally {
      setLoading2(false);
    }
  };

  // Async validation - check if email is occupied
  const checkEmailOccupied = async (_: unknown, value: string) => {
    if (!value) {
      return Promise.resolve();
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (OCCUPIED_EMAILS.includes(value.toLowerCase())) {
      return Promise.reject(new Error('This email address is already taken.'));
    }

    return Promise.resolve();
  };

  const handleSubmit3 = async (values: { email: string }) => {
    setLoading3(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Email registered successfully!');
      form3.resetFields();
      console.log('Form 3 values:', values);
    } finally {
      setLoading3(false);
    }
  };

  // Complex validation with multiple rules
  const validatePassword = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please enter your password'));
    }
    if (value.length < 8) {
      return Promise.reject(
        new Error('Password must be at least 8 characters')
      );
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        new Error('Password must contain at least one uppercase letter')
      );
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject(
        new Error('Password must contain at least one lowercase letter')
      );
    }
    if (!/[0-9]/.test(value)) {
      return Promise.reject(
        new Error('Password must contain at least one number')
      );
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = ({ getFieldValue }: FormInstance) => ({
    validator(_: unknown, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords do not match'));
    },
  });

  const handleSubmit4 = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading4(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Account created successfully!');
      form4.resetFields();
      console.log('Form 4 values:', values);
    } finally {
      setLoading4(false);
    }
  };

  return (
    <div className="form-validation">
      <Title level={2}>Form Validation Examples</Title>
      <Paragraph>
        Comprehensive examples of form validation in Ant Design, including
        required fields, format validation, async validation, and custom rules.
      </Paragraph>

      {/* Example 1: Basic Required & Format Validation */}
      <Card title="1. Basic Email Validation" className="form-validation__card">
        <Paragraph>
          <Text strong>Features:</Text> Required field validation and email
          format check
        </Paragraph>
        <Form
          form={form1}
          layout="vertical"
          onFinish={handleSubmit1}
          className="form-validation__form"
        >
          <Form.Item
            label="validateFirst Example"
            name="nb"
            validateFirst
            rules={[
              {
                max: 2,
                message: 'Maximum length is 2',
              },
              {
                max: 3,
                message: 'Maximum length is 3',
              },
              {
                max: 4,
                message: 'Maximum length is 4',
              },
            ]}
          >
            <Input placeholder="please input" size="large" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading1}>
                Validate
              </Button>
              <Button onClick={() => form1.resetFields()}>Reset</Button>
            </Space>
          </Form.Item>
        </Form>

        <Divider />
        <Paragraph>
          <Text strong>Try:</Text>
          <ul>
            <li>
              Leave empty and submit (shows "Please enter your email address")
            </li>
            <li>
              Enter invalid format like "test" (shows "Please enter a valid
              email address")
            </li>
            <li>Enter valid email like "test@example.com" (success)</li>
          </ul>
        </Paragraph>
      </Card>

      {/* Example 2: Custom Error Messages (Like the Screenshot) */}
      <Card
        title="2. Work Email Validation (UI Design Example)"
        className="form-validation__card"
      >
        <Paragraph>
          <Text strong>Features:</Text> Custom styled validation matching the
          provided screenshot
        </Paragraph>
        <Form
          form={form2}
          layout="vertical"
          onFinish={handleSubmit2}
          className="form-validation__form form-validation__form--styled"
        >
          <Form.Item
            label="Work Email"
            name="workEmail"
            rules={[
              {
                required: true,
                message: 'Please enter your work email address.',
              },
              { type: 'email', message: 'Please enter a valid email address.' },
            ]}
          >
            <Input placeholder="" size="large" />
          </Form.Item>

          <Form.Item className="form-validation__actions">
            <Space size="large">
              <Button size="large" onClick={() => form2.resetFields()}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading2}
              >
                Next
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <Divider />
        <Paragraph>
          <Text strong>Screenshot Simulation:</Text> This example matches the UI
          design in your screenshot with custom error styling.
        </Paragraph>
      </Card>

      {/* Example 3: Async Validation - Check Email Occupied */}
      <Card
        title="3. Async Validation - Email Availability Check"
        className="form-validation__card"
      >
        <Paragraph>
          <Text strong>Features:</Text> Asynchronous validation to check if
          email is already taken
        </Paragraph>
        <Form
          form={form3}
          layout="vertical"
          onFinish={handleSubmit3}
          className="form-validation__form"
        >
          <Form.Item
            label="Email Address"
            name="email"
            hasFeedback
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
              { validator: checkEmailOccupied },
            ]}
            validateTrigger="onBlur"
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading3}>
                Register
              </Button>
              <Button onClick={() => form3.resetFields()}>Reset</Button>
            </Space>
          </Form.Item>
        </Form>

        <Divider />
        <Paragraph>
          <Text strong>Try these emails:</Text>
          <ul>
            <li>
              <Text code>test@example.com</Text> - Already taken
            </li>
            <li>
              <Text code>admin@example.com</Text> - Already taken
            </li>
            <li>
              <Text code>user@derbysoft.com</Text> - Already taken
            </li>
            <li>
              <Text code>myemail@example.com</Text> - Available (success)
            </li>
          </ul>
          <Text type="secondary">
            Note: Validation is triggered on blur (when you leave the input
            field)
          </Text>
        </Paragraph>
      </Card>

      {/* Example 4: Complex Validation with Multiple Rules */}
      <Card
        title="4. Complex Validation - Registration Form"
        className="form-validation__card"
      >
        <Paragraph>
          <Text strong>Features:</Text> Multiple validation rules including
          password strength and confirmation
        </Paragraph>
        <Form
          form={form4}
          layout="vertical"
          onFinish={handleSubmit4}
          className="form-validation__form"
        >
          <Form.Item
            label="Email Address"
            name="email"
            hasFeedback
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
              { validator: checkEmailOccupied },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password' },
              validateConfirmPassword,
            ]}
          >
            <Input.Password placeholder="Confirm your password" size="large" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading4}>
                Create Account
              </Button>
              <Button onClick={() => form4.resetFields()}>Reset</Button>
            </Space>
          </Form.Item>
        </Form>

        <Divider />
        <Paragraph>
          <Text strong>Password Requirements:</Text>
          <ul>
            <li>At least 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
          </ul>
        </Paragraph>
      </Card>

      {/* Validation Rules Reference */}
      <Card
        title="Validation Rules Reference"
        className="form-validation__card"
      >
        <Title level={5}>Common Rule Types:</Title>
        <Paragraph>
          <Text code>
            {`// Required field
{ required: true, message: 'Error message' }

// Email format
{ type: 'email', message: 'Invalid email' }

// Pattern matching
{ pattern: /^[A-Z]/, message: 'Must start with uppercase' }

// Min/Max length
{ min: 6, message: 'At least 6 characters' }
{ max: 20, message: 'At most 20 characters' }

// Custom validator
{ validator: (_, value) => {
    if (condition) return Promise.resolve();
    return Promise.reject(new Error('Error'));
  }
}

// Async validator (API check)
{ validator: async (_, value) => {
    const result = await checkAPI(value);
    if (result.available) return Promise.resolve();
    return Promise.reject(new Error('Already taken'));
  }
}`}
          </Text>
        </Paragraph>

        <Title level={5} style={{ marginTop: 24 }}>
          Form.Item Props:
        </Title>
        <ul>
          <li>
            <Text code>rules</Text> - Array of validation rules
          </li>
          <li>
            <Text code>validateTrigger</Text> - When to trigger validation
            (onChange, onBlur, etc.)
          </li>
          <li>
            <Text code>hasFeedback</Text> - Show validation status icon
          </li>
          <li>
            <Text code>dependencies</Text> - Re-validate when dependent fields
            change
          </li>
          <li>
            <Text code>validateStatus</Text> - Manual control: 'success' |
            'warning' | 'error' | 'validating'
          </li>
        </ul>

        <Title level={5} style={{ marginTop: 24 }}>
          Form Methods:
        </Title>
        <Paragraph>
          <Text code>
            {`const [form] = Form.useForm();

// Validate all fields
form.validateFields()

// Validate specific fields
form.validateFields(['email', 'password'])

// Get field value
form.getFieldValue('email')

// Set field value
form.setFieldsValue({ email: 'test@example.com' })

// Reset fields
form.resetFields()

// Set custom errors
form.setFields([
  { name: 'email', errors: ['Custom error message'] }
])`}
          </Text>
        </Paragraph>
      </Card>
    </div>
  );
};

export default FormValidation;
