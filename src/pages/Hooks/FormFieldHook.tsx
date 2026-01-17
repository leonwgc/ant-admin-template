/**
 * @file src/pages/Hooks/FormFieldHook.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Input, Button, Space, Card, Typography, Row, Col, Tag } from '@derbysoft/neat-design';
import { useFormField } from '../../hooks/useFormField';
import './FormFieldHook.scss';

const { Title, Paragraph, Text } = Typography;

/**
 * Common validation rules
 */
const validationRules = {
  required: (value: string) => (!value || !value.trim() ? 'This field is required' : null),
  email: (value: string) =>
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : null,
  minLength: (min: number) => (value: string) =>
    value && value.length < min ? `Minimum length is ${min} characters` : null,
  maxLength: (max: number) => (value: string) =>
    value && value.length > max ? `Maximum length is ${max} characters` : null,
  pattern: (regex: RegExp, message: string) => (value: string) =>
    value && !regex.test(value) ? message : null,
  // Async validation example - simulates API call
  asyncUnique: (value: string) =>
    new Promise<string | null>((resolve) => {
      setTimeout(() => {
        const taken = ['admin', 'test', 'user'].includes(value.toLowerCase());
        resolve(taken ? 'This username is already taken' : null);
      }, 500);
    }),
};

/**
 * Basic usage example
 */
const BasicExample: React.FC = () => {
  const emailField = useFormField({
    initialValue: '',
    rules: [validationRules.required, validationRules.email],
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <Card title="Basic Usage" className="form-field-hook__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Input
            placeholder="Enter your email"
            value={emailField.value}
            onChange={(e) => emailField.onChange(e.target.value)}
            onBlur={emailField.onBlur}
            onFocus={emailField.onFocus}
            status={emailField.touched && emailField.invalid ? 'error' : undefined}
          />
          {emailField.touched && emailField.error && (
            <div className="form-field-hook__error">{emailField.error}</div>
          )}
        </div>
        <div className="form-field-hook__states">
          <Space wrap>
            <Tag color={emailField.touched ? 'blue' : undefined}>Touched: {String(emailField.touched)}</Tag>
            <Tag color={emailField.dirty ? 'orange' : undefined}>Dirty: {String(emailField.dirty)}</Tag>
            <Tag color={emailField.pristine ? 'green' : undefined}>Pristine: {String(emailField.pristine)}</Tag>
            <Tag color={emailField.valid ? 'green' : undefined}>Valid: {String(emailField.valid)}</Tag>
            <Tag color={emailField.invalid ? 'red' : undefined}>Invalid: {String(emailField.invalid)}</Tag>
            <Tag color={emailField.visited ? 'purple' : undefined}>Visited: {String(emailField.visited)}</Tag>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

/**
 * Async validation example
 */
const AsyncValidationExample: React.FC = () => {
  const usernameField = useFormField({
    initialValue: '',
    rules: [
      validationRules.required,
      validationRules.minLength(3),
      validationRules.asyncUnique,
    ],
    validateOnChange: true,
    validateDebounce: 300,
  });

  return (
    <Card title="Async Validation (with Debounce)" className="form-field-hook__card">
      <Paragraph>
        Try entering: <Text code>admin</Text>, <Text code>test</Text>, or <Text code>user</Text> to see async validation
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Input
            placeholder="Enter username"
            value={usernameField.value}
            onChange={(e) => usernameField.onChange(e.target.value)}
            onBlur={usernameField.onBlur}
            onFocus={usernameField.onFocus}
            status={usernameField.touched && usernameField.invalid ? 'error' : undefined}
            suffix={usernameField.validating ? 'Validating...' : undefined}
          />
          {usernameField.touched && usernameField.error && (
            <div className="form-field-hook__error">{usernameField.error}</div>
          )}
        </div>
        <div className="form-field-hook__states">
          <Space wrap>
            <Tag color={usernameField.validating ? 'blue' : undefined}>
              Validating: {String(usernameField.validating)}
            </Tag>
            <Tag color={usernameField.valid ? 'green' : undefined}>Valid: {String(usernameField.valid)}</Tag>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

/**
 * Password strength example
 */
const PasswordStrengthExample: React.FC = () => {
  const passwordField = useFormField({
    initialValue: '',
    rules: [
      validationRules.required,
      validationRules.minLength(8),
      validationRules.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number'
      ),
    ],
    validateOnChange: true,
  });

  const confirmPasswordField = useFormField({
    initialValue: '',
    rules: [
      validationRules.required,
      (value: string) =>
        value !== passwordField.value ? 'Passwords do not match' : null,
    ],
    validateOnChange: true,
  });

  return (
    <Card title="Password Validation" className="form-field-hook__card">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Text>Password:</Text>
          <Input.Password
            placeholder="Enter password"
            value={passwordField.value}
            onChange={(e) => passwordField.onChange(e.target.value)}
            onBlur={passwordField.onBlur}
            onFocus={passwordField.onFocus}
            status={passwordField.touched && passwordField.invalid ? 'error' : undefined}
          />
          {passwordField.touched && passwordField.error && (
            <div className="form-field-hook__error">{passwordField.error}</div>
          )}
        </div>
        <div>
          <Text>Confirm Password:</Text>
          <Input.Password
            placeholder="Confirm password"
            value={confirmPasswordField.value}
            onChange={(e) => confirmPasswordField.onChange(e.target.value)}
            onBlur={confirmPasswordField.onBlur}
            onFocus={confirmPasswordField.onFocus}
            status={confirmPasswordField.touched && confirmPasswordField.invalid ? 'error' : undefined}
          />
          {confirmPasswordField.touched && confirmPasswordField.error && (
            <div className="form-field-hook__error">{confirmPasswordField.error}</div>
          )}
        </div>
      </Space>
    </Card>
  );
};

/**
 * Form actions example
 */
const FormActionsExample: React.FC = () => {
  const nameField = useFormField({
    initialValue: '',
    rules: [validationRules.required, validationRules.minLength(2)],
  });

  const ageField = useFormField({
    initialValue: '',
    rules: [
      validationRules.required,
      (value: string) => {
        const num = parseInt(value, 10);
        if (isNaN(num)) return 'Must be a number';
        if (num < 0 || num > 150) return 'Age must be between 0 and 150';
        return null;
      },
    ],
  });

  const [submitData, setSubmitData] = useState<{ name: string; age: string } | null>(null);

  const handleSubmit = async () => {
    const nameValid = await nameField.validate();
    const ageValid = await ageField.validate();

    if (nameValid && ageValid) {
      setSubmitData({
        name: nameField.value,
        age: ageField.value,
      });
    }
  };

  const handleReset = () => {
    nameField.reset();
    ageField.reset();
    setSubmitData(null);
  };

  const handleFillSample = () => {
    nameField.setValue('John Doe');
    ageField.setValue('25');
  };

  return (
    <Card title="Form Actions" className="form-field-hook__card">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Text>Name:</Text>
          <Input
            placeholder="Enter name"
            value={nameField.value}
            onChange={(e) => nameField.onChange(e.target.value)}
            onBlur={nameField.onBlur}
            onFocus={nameField.onFocus}
            status={nameField.touched && nameField.invalid ? 'error' : undefined}
          />
          {nameField.touched && nameField.error && (
            <div className="form-field-hook__error">{nameField.error}</div>
          )}
        </div>
        <div>
          <Text>Age:</Text>
          <Input
            placeholder="Enter age"
            value={ageField.value}
            onChange={(e) => ageField.onChange(e.target.value)}
            onBlur={ageField.onBlur}
            onFocus={ageField.onFocus}
            status={ageField.touched && ageField.invalid ? 'error' : undefined}
          />
          {ageField.touched && ageField.error && (
            <div className="form-field-hook__error">{ageField.error}</div>
          )}
        </div>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleFillSample}>Fill Sample Data</Button>
        </Space>
        {submitData && (
          <Card size="small" style={{ backgroundColor: '#f6ffed' }}>
            <Text strong>Submitted Data:</Text>
            <pre>{JSON.stringify(submitData, null, 2)}</pre>
          </Card>
        )}
      </Space>
    </Card>
  );
};

/**
 * Validate on blur only example
 */
const ValidateOnBlurExample: React.FC = () => {
  const field = useFormField({
    initialValue: '',
    rules: [
      validationRules.required,
      validationRules.minLength(5),
    ],
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <Card title="Validate On Blur Only" className="form-field-hook__card">
      <Paragraph type="secondary">
        This field only validates when you leave the input (onBlur), not while typing.
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Input
            placeholder="Type and blur to validate"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            onFocus={field.onFocus}
            status={field.touched && field.invalid ? 'error' : undefined}
          />
          {field.touched && field.error && (
            <div className="form-field-hook__error">{field.error}</div>
          )}
        </div>
        <div className="form-field-hook__states">
          <Space wrap>
            <Tag color={field.touched ? 'blue' : undefined}>Touched: {String(field.touched)}</Tag>
            <Tag color={field.valid ? 'green' : undefined}>Valid: {String(field.valid)}</Tag>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

/**
 * Main component
 */
const FormFieldHook: React.FC = () => {
  return (
    <div className="form-field-hook">
      <div className="form-field-hook__header">
        <Title level={2}>useFormField Hook</Title>
        <Paragraph>
          A comprehensive form field validation hook that manages field state and validation.
          Supports synchronous and asynchronous validation, debouncing, and various field states.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <BasicExample />
        </Col>
        <Col xs={24} lg={12}>
          <AsyncValidationExample />
        </Col>
        <Col xs={24} lg={12}>
          <PasswordStrengthExample />
        </Col>
        <Col xs={24} lg={12}>
          <ValidateOnBlurExample />
        </Col>
        <Col xs={24}>
          <FormActionsExample />
        </Col>
      </Row>

      <Card title="Features" className="form-field-hook__card" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Title level={5}>Field States:</Title>
            <ul>
              <li><Text code>value</Text> - Current field value</li>
              <li><Text code>touched</Text> - Field has been focused and blurred</li>
              <li><Text code>dirty</Text> - Value has been modified</li>
              <li><Text code>pristine</Text> - Value has not been modified</li>
              <li><Text code>valid</Text> - Field passes all validations</li>
              <li><Text code>invalid</Text> - Field fails validation</li>
              <li><Text code>error</Text> - Current error message</li>
              <li><Text code>validating</Text> - Async validation in progress</li>
              <li><Text code>visited</Text> - Field has been focused at least once</li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>Actions:</Title>
            <ul>
              <li><Text code>onChange</Text> - Handle value changes</li>
              <li><Text code>onBlur</Text> - Handle blur events</li>
              <li><Text code>onFocus</Text> - Handle focus events</li>
              <li><Text code>setValue</Text> - Manually set value</li>
              <li><Text code>reset</Text> - Reset to initial state</li>
              <li><Text code>validate</Text> - Manually trigger validation</li>
              <li><Text code>setError</Text> - Manually set error</li>
              <li><Text code>setTouched</Text> - Manually set touched state</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormFieldHook;
