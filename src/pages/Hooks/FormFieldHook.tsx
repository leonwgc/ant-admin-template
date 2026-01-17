/**
 * @file src/pages/Hooks/FormFieldHook.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  Input,
  Button,
  Space,
  Card,
  Typography,
  Row,
  Col,
  Tag,
} from '@derbysoft/neat-design';
import { useFormField, validators } from '../../hooks/useFormField';
import './FormFieldHook.scss';

const { Title, Paragraph, Text } = Typography;

/**
 * Async validation helper - simulates API call
 */
const asyncUnique = (value: string) =>
  new Promise<string | null>((resolve) => {
    setTimeout(() => {
      const taken = ['admin', 'test', 'user'].includes(value.toLowerCase());
      resolve(taken ? 'This username is already taken' : null);
    }, 500);
  });

/**
 * Basic usage example
 */
const BasicExample: React.FC = () => {
  const emailField = useFormField({
    initialValue: '',
    rules: [validators.required(), validators.email()],
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <Card title="Basic Usage" className="form-field-hook__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Input
            placeholder="Enter your email"
            {...emailField.getAntdInputProps()}
          />

          {emailField.renderError('form-field-hook__error')}
        </div>
        <div className="form-field-hook__states">
          <Space wrap>
            <Tag color={emailField.touched ? 'blue' : undefined}>
              Touched: {String(emailField.touched)}
            </Tag>
            <Tag color={emailField.dirty ? 'orange' : undefined}>
              Dirty: {String(emailField.dirty)}
            </Tag>
            <Tag color={emailField.pristine ? 'green' : undefined}>
              Pristine: {String(emailField.pristine)}
            </Tag>
            <Tag color={emailField.valid ? 'green' : undefined}>
              Valid: {String(emailField.valid)}
            </Tag>
            <Tag color={emailField.invalid ? 'red' : undefined}>
              Invalid: {String(emailField.invalid)}
            </Tag>
            <Tag color={emailField.visited ? 'purple' : undefined}>
              Visited: {String(emailField.visited)}
            </Tag>
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
    rules: [validators.required(), validators.minLength(3), asyncUnique],
    validateOnChange: true,
    validateDebounce: 300,
  });

  return (
    <Card
      title="Async Validation (with Debounce)"
      className="form-field-hook__card"
    >
      <Paragraph>
        Try entering: <Text code>admin</Text>, <Text code>test</Text>, or{' '}
        <Text code>user</Text> to see async validation
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Input
            placeholder="Enter username"
            {...usernameField.getAntdInputProps()}
            suffix={usernameField.validating ? 'Validating...' : undefined}
          />
          {usernameField.renderError('form-field-hook__error')}
        </div>
        <div className="form-field-hook__states">
          <Space wrap>
            <Tag color={usernameField.validating ? 'blue' : undefined}>
              Validating: {String(usernameField.validating)}
            </Tag>
            <Tag color={usernameField.valid ? 'green' : undefined}>
              Valid: {String(usernameField.valid)}
            </Tag>
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
      validators.required(),
      validators.minLength(8),
      validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number',
      ),
    ],
    validateOnChange: true,
  });

  const confirmPasswordField = useFormField({
    initialValue: '',
    rules: [
      validators.required(),
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
            {...passwordField.getAntdInputProps()}
          />
          {passwordField.renderError('form-field-hook__error')}
        </div>
        <div>
          <Text>Confirm Password:</Text>
          <Input.Password
            placeholder="Confirm password"
            {...confirmPasswordField.getAntdInputProps()}
          />
          {confirmPasswordField.renderError('form-field-hook__error')}
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
    initialValue: 'leon',
    rules: [validators.required(), validators.minLength(2)],
  });

  const ageField = useFormField({
    initialValue: '18',
    rules: [
      validators.required(),
      validators.number(),
      validators.min(0),
      validators.max(150),
    ],
  });

  const [submitData, setSubmitData] = useState<{
    name: string;
    age: string;
  } | null>(null);

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
          <Input placeholder="Enter name" {...nameField.getAntdInputProps()} />
          {nameField.renderError('form-field-hook__error')}
        </div>
        <div>
          <Text>Age:</Text>
          <Input placeholder="Enter age" {...ageField.getAntdInputProps()} />
          {ageField.renderError('form-field-hook__error')}
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
    rules: [validators.required(), validators.minLength(5)],
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <Card title="Validate On Blur Only" className="form-field-hook__card">
      <Paragraph type="secondary">
        This field only validates when you leave the input (onBlur), not while
        typing.
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Input
            placeholder="Type and blur to validate"
            {...field.getAntdInputProps()}
          />
          {field.renderError('form-field-hook__error')}
        </div>
        <div className="form-field-hook__states">
          <Space wrap>
            <Tag color={field.touched ? 'blue' : undefined}>
              Touched: {String(field.touched)}
            </Tag>
            <Tag color={field.valid ? 'green' : undefined}>
              Valid: {String(field.valid)}
            </Tag>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

/**
 * Built-in validators example
 */
const BuiltInValidatorsExample: React.FC = () => {
  const emailField = useFormField({
    initialValue: '',
    rules: [validators.required(), validators.email()],
  });

  const ageField = useFormField({
    initialValue: '',
    rules: [
      validators.required(),
      validators.number(),
      validators.min(0),
      validators.max(150),
    ],
  });

  const urlField = useFormField({
    initialValue: '',
    rules: [validators.url()],
  });

  return (
    <Card
      title="Built-in Validators (Simplified)"
      className="form-field-hook__card"
    >
      <Paragraph type="secondary">
        Use built-in validators for common scenarios - cleaner and more
        maintainable
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Text>Email:</Text>
          <Input
            placeholder="user@example.com"
            {...emailField.getAntdInputProps()}
          />
          {emailField.renderError('form-field-hook__error')}
        </div>
        <div>
          <Text>Age (0-150):</Text>
          <Input placeholder="25" {...ageField.getAntdInputProps()} />
          {ageField.renderError('form-field-hook__error')}
        </div>
        <div>
          <Text>Website URL:</Text>
          <Input
            placeholder="https://example.com"
            {...urlField.getAntdInputProps()}
          />
          {urlField.renderError('form-field-hook__error')}
        </div>
      </Space>
    </Card>
  );
};

/**
 * Transform example
 */
const TransformExample: React.FC = () => {
  const usernameField = useFormField({
    initialValue: '',
    rules: [validators.required(), validators.minLength(3)],
    transform: (value: string) => value.toLowerCase().trim(), // Auto lowercase and trim
  });

  const phoneField = useFormField({
    initialValue: '',
    rules: [
      validators.required(),
      validators.pattern(/^\d{3}-\d{3}-\d{4}$/, 'Format: 123-456-7890'),
    ],
    transform: (value: string) => {
      // Auto format phone number
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    },
  });

  return (
    <Card title="Value Transform" className="form-field-hook__card">
      <Paragraph type="secondary">
        Auto-transform input values (trim, lowercase, format, etc.)
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Text>Username (auto lowercase & trim):</Text>
          <Input
            placeholder="JohnDoe"
            value={usernameField.value}
            onChange={(e) => usernameField.onChange(e.target.value)}
            onBlur={usernameField.onBlur}
            onFocus={usernameField.onFocus}
            status={
              usernameField.touched && usernameField.invalid
                ? 'error'
                : undefined
            }
          />
          {usernameField.touched && usernameField.error && (
            <div className="form-field-hook__error">{usernameField.error}</div>
          )}
          <Text type="secondary">Stored value: {usernameField.value}</Text>
        </div>
        <div>
          <Text>Phone (auto format):</Text>
          <Input
            placeholder="1234567890"
            value={phoneField.value}
            onChange={(e) => phoneField.onChange(e.target.value)}
            onBlur={phoneField.onBlur}
            onFocus={phoneField.onFocus}
            status={
              phoneField.touched && phoneField.invalid ? 'error' : undefined
            }
          />
          {phoneField.touched && phoneField.error && (
            <div className="form-field-hook__error">{phoneField.error}</div>
          )}
        </div>
      </Space>
    </Card>
  );
};

/**
 * Custom compare example
 */
const CustomCompareExample: React.FC = () => {
  const tagsField = useFormField<string>({
    initialValue: 'react,vue,angular',
    rules: [validators.required()],
    // Custom comparison - compare sorted arrays
    compareWith: (a, b) => {
      const arrA = a
        .split(',')
        .map((s) => s.trim())
        .sort();
      const arrB = b
        .split(',')
        .map((s) => s.trim())
        .sort();
      return JSON.stringify(arrA) === JSON.stringify(arrB);
    },
  });

  return (
    <Card
      title="Custom Comparison (compareWith)"
      className="form-field-hook__card"
    >
      <Paragraph type="secondary">
        Custom logic for determining dirty state. Here, tag order doesn't
        matter.
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text>Tags (comma-separated):</Text>
          <Input
            placeholder="react,vue,angular"
            value={tagsField.value}
            onChange={(e) => tagsField.onChange(e.target.value)}
            onBlur={tagsField.onBlur}
            onFocus={tagsField.onFocus}
          />
          <Paragraph type="secondary" style={{ marginTop: 8 }}>
            Try: "vue,react,angular" - still pristine because order doesn't
            matter
          </Paragraph>
        </div>
        <div className="form-field-hook__states">
          <Space wrap>
            <Tag color={tagsField.dirty ? 'orange' : undefined}>
              Dirty: {String(tagsField.dirty)}
            </Tag>
            <Tag color={tagsField.pristine ? 'green' : undefined}>
              Pristine: {String(tagsField.pristine)}
            </Tag>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

/**
 * Ultra simplified example - showing the most concise usage
 */
const UltraSimplifiedExample: React.FC = () => {
  const nameField = useFormField({
    initialValue: '',
    rules: [validators.required(), validators.minLength(2)],
  });

  const emailField = useFormField({
    initialValue: '',
    rules: [validators.required(), validators.email()],
  });

  const phoneField = useFormField({
    initialValue: '',
    rules: [
      validators.required(),
      validators.pattern(/^\d{3}-\d{3}-\d{4}$/, 'Format: 123-456-7890'),
    ],
  });

  return (
    <Card title="Ultra Simplified Usage 🚀" className="form-field-hook__card">
      <Paragraph type="secondary">
        Maximum simplification with <Text code>getAntdInputProps()</Text> and{' '}
        <Text code>renderError()</Text>
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Text>Name:</Text>
          <Input placeholder="John Doe" {...nameField.getAntdInputProps()} />
          {nameField.renderError('form-field-hook__error')}
        </div>
        <div>
          <Text>Email:</Text>
          <Input
            placeholder="john@example.com"
            {...emailField.getAntdInputProps()}
          />
          {emailField.renderError('form-field-hook__error')}
        </div>
        <div>
          <Text>Phone:</Text>
          <Input
            placeholder="123-456-7890"
            {...phoneField.getAntdInputProps()}
          />
          {phoneField.renderError('form-field-hook__error')}
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
          A comprehensive form field validation hook that manages field state
          and validation. Supports synchronous and asynchronous validation,
          debouncing, and various field states.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <BasicExample />
        </Col>
        <Col xs={24} lg={12}>
          <UltraSimplifiedExample />
        </Col>
        <Col xs={24} lg={12}>
          <BuiltInValidatorsExample />
        </Col>
        <Col xs={24} lg={12}>
          <AsyncValidationExample />
        </Col>
        <Col xs={24} lg={12}>
          <TransformExample />
        </Col>
        <Col xs={24} lg={12}>
          <PasswordStrengthExample />
        </Col>
        <Col xs={24} lg={12}>
          <CustomCompareExample />
        </Col>
        <Col xs={24} lg={12}>
          <ValidateOnBlurExample />
        </Col>
        <Col xs={24}>
          <FormActionsExample />
        </Col>
      </Row>

      <Card
        title="Features"
        className="form-field-hook__card"
        style={{ marginTop: 16 }}
      >
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Title level={5}>Field States:</Title>
            <ul>
              <li>
                <Text code>value</Text> - Current field value
              </li>
              <li>
                <Text code>touched</Text> - Field has been focused and blurred
              </li>
              <li>
                <Text code>dirty</Text> - Value has been modified
              </li>
              <li>
                <Text code>pristine</Text> - Value has not been modified
              </li>
              <li>
                <Text code>valid</Text> - Field passes all validations
              </li>
              <li>
                <Text code>invalid</Text> - Field fails validation
              </li>
              <li>
                <Text code>error</Text> - Current error message
              </li>
              <li>
                <Text code>validating</Text> - Async validation in progress
              </li>
              <li>
                <Text code>visited</Text> - Field has been focused at least once
              </li>
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5}>Actions:</Title>
            <ul>
              <li>
                <Text code>onChange</Text> - Handle value changes
              </li>
              <li>
                <Text code>onBlur</Text> - Handle blur events
              </li>
              <li>
                <Text code>onFocus</Text> - Handle focus events
              </li>
              <li>
                <Text code>setValue</Text> - Manually set value
              </li>
              <li>
                <Text code>reset</Text> - Reset to initial state
              </li>
              <li>
                <Text code>validate</Text> - Manually trigger validation
              </li>
              <li>
                <Text code>setError</Text> - Manually set error
              </li>
              <li>
                <Text code>setTouched</Text> - Manually set touched state
              </li>
            </ul>
            <Title level={5} style={{ marginTop: 8 }}>
              Helper Methods:
            </Title>
            <ul>
              <li>
                <Text code>getInputProps()</Text> - Basic input props
              </li>
              <li>
                <Text code>getHTMLInputProps()</Text> - 🆕 HTML input props
              </li>
              <li>
                <Text code>getAntdInputProps()</Text> - 🆕 Ant Design props
              </li>
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5}>New Features:</Title>
            <ul>
              <li>
                <Text code>validators</Text> - 🆕 Built-in validation rules
              </li>
              <li>
                <Text code>transform</Text> - 🆕 Auto-transform values
              </li>
              <li>
                <Text code>compareWith</Text> - 🆕 Custom dirty comparison
              </li>
              <li>
                <Text code>getInputProps()</Text> - 🆕 Simplified props binding
              </li>
            </ul>
            <Title level={5} style={{ marginTop: 16 }}>
              Built-in Validators:
            </Title>
            <ul style={{ fontSize: '12px' }}>
              <li>
                <Text code>required()</Text>
              </li>
              <li>
                <Text code>email()</Text>
              </li>
              <li>
                <Text code>minLength(n)</Text>
              </li>
              <li>
                <Text code>maxLength(n)</Text>
              </li>
              <li>
                <Text code>pattern(regex, msg)</Text>
              </li>
              <li>
                <Text code>min(n)</Text> / <Text code>max(n)</Text>
              </li>
              <li>
                <Text code>url()</Text>
              </li>
              <li>
                <Text code>number()</Text> / <Text code>integer()</Text>
              </li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormFieldHook;
