/**
 * @file ant-design-mcp/examples.md
 * @author leon.wang(leon.wang@derbysoft.net)
 * @description Usage examples for Ant Design MCP Server
 */

# Ant Design MCP Server Usage Examples

## Example 1: Get All Component Names

**Request**: Call the `get_all_component_names` tool

**Response**:
```
Button, Icon, Typography, Divider, Grid, Layout, Space, Splitter, Affix, Breadcrumb, Dropdown, Menu, Pagination, Steps, AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload, Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Popover, QRCode, Segmented, Statistic, Table, Tabs, Tag, Timeline, Tooltip, Tour, Tree, Alert, Drawer, Message, Modal, Notification, Popconfirm, Progress, Result, Skeleton, Spin, Watermark, Anchor, App, ConfigProvider, FloatButton, Flex
```

## Example 2: Get Component Information

**Request**: Call `get_component_info` with `componentName: "Button"`

**Response**:
```markdown
# Button

**Category**: General

Primary UI component for user actions

## Import

```typescript
import { Button } from 'antd';
```

## Props

- **type**: `'primary' | 'default' | 'dashed' | 'text' | 'link'` - Button type
- **size**: `'large' | 'middle' | 'small'` - Button size
- **danger**: `boolean` - Set danger status
- **disabled**: `boolean` - Disabled state
- **loading**: `boolean` - Loading state
- **icon**: `ReactNode` - Icon element
- **shape**: `'default' | 'circle' | 'round'` - Button shape
- **onClick**: `(event) => void` - Click event handler

## Example

```tsx
import { Button } from 'antd';

const App = () => (
  <Space>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
);
```

## API Documentation

https://ant.design/components/button
```

## Example 3: Search Components

**Request**: Call `search_components` with `keyword: "input"`

**Response**:
```
Found 3 component(s):

- **Input** (Data Entry): Basic input component for user text input
- **InputNumber** (Data Entry): Input component for numeric values
- **AutoComplete**: Autocomplete input component
```

## Example 4: Get Component Example

**Request**: Call `get_component_example` with `componentName: "Form"`

**Response**:
```tsx
import { Form, Input, Button } from 'antd';

const App = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

## Example 5: Get Components by Category

**Request**: Call `get_components_by_category` with `category: "Data Entry"`

**Response**:
```
Components in Data Entry category:

AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload
```

## Integration with AI Code Generation

### Scenario: Generate a Login Form

1. **Get Form component info**:
   - Call `get_component_info` with `componentName: "Form"`

2. **Get Input component info**:
   - Call `get_component_info` with `componentName: "Input"`

3. **Get Button component info**:
   - Call `get_component_info` with `componentName: "Button"`

4. **Generate code** based on the retrieved information:

```tsx
/**
 * @file src/pages/Login/Login.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.scss';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: LoginFormValues) => {
    console.log('Login values:', values);
    // Handle login logic here
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Login</h1>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
```

## CLI Testing

You can test the MCP server using the MCP inspector:

```bash
# Start the server
npm start

# Or in development mode
npm run dev
```

Then interact with it through the MCP client or Claude Desktop.

## Best Practices for Code Generation

1. **Always get component info first**: Before generating code, retrieve component information to understand available props and usage patterns

2. **Use search for discovery**: When unsure which component to use, search by keyword or browse by category

3. **Follow import patterns**: Use the import statements provided in component info

4. **Reference examples**: Use the provided examples as templates for code generation

5. **Check API docs**: Link to official documentation for detailed information

6. **Maintain consistency**: Follow project coding standards (as defined in .github/instructions/dev.instructions.md)
