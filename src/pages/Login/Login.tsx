import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: '100px auto' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => navigate('/app')}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
