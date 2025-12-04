#!/usr/bin/env node

/**
 * @file ant-design-mcp/index.js
 * @author leon.wang(leon.wang@derbysoft.net)
 * @description MCP server for Ant Design component library
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Ant Design component list
const ANT_DESIGN_COMPONENTS = [
  // General
  'Button',
  'Icon',
  'Typography',

  // Layout
  'Divider',
  'Grid',
  'Layout',
  'Space',
  'Splitter',

  // Navigation
  'Affix',
  'Breadcrumb',
  'Dropdown',
  'Menu',
  'Pagination',
  'Steps',

  // Data Entry
  'AutoComplete',
  'Cascader',
  'Checkbox',
  'ColorPicker',
  'DatePicker',
  'Form',
  'Input',
  'InputNumber',
  'Mentions',
  'Radio',
  'Rate',
  'Select',
  'Slider',
  'Switch',
  'TimePicker',
  'Transfer',
  'TreeSelect',
  'Upload',

  // Data Display
  'Avatar',
  'Badge',
  'Calendar',
  'Card',
  'Carousel',
  'Collapse',
  'Descriptions',
  'Empty',
  'Image',
  'List',
  'Popover',
  'QRCode',
  'Segmented',
  'Statistic',
  'Table',
  'Tabs',
  'Tag',
  'Timeline',
  'Tooltip',
  'Tour',
  'Tree',

  // Feedback
  'Alert',
  'Drawer',
  'Message',
  'Modal',
  'Notification',
  'Popconfirm',
  'Progress',
  'Result',
  'Skeleton',
  'Spin',
  'Watermark',

  // Other
  'Anchor',
  'App',
  'ConfigProvider',
  'FloatButton',
  'Flex',
];

// Component metadata with detailed information
const COMPONENT_INFO = {
  Button: {
    category: 'General',
    description: 'Primary UI component for user actions',
    props: [
      { name: 'type', type: "'primary' | 'default' | 'dashed' | 'text' | 'link'", description: 'Button type' },
      { name: 'size', type: "'large' | 'middle' | 'small'", description: 'Button size' },
      { name: 'danger', type: 'boolean', description: 'Set danger status' },
      { name: 'disabled', type: 'boolean', description: 'Disabled state' },
      { name: 'loading', type: 'boolean', description: 'Loading state' },
      { name: 'icon', type: 'ReactNode', description: 'Icon element' },
      { name: 'shape', type: "'default' | 'circle' | 'round'", description: 'Button shape' },
      { name: 'onClick', type: '(event) => void', description: 'Click event handler' },
    ],
    example: `import { Button } from 'antd';

const App = () => (
  <Space>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
);`,
    importStatement: "import { Button } from 'antd';",
    apiUrl: 'https://ant.design/components/button',
  },

  Form: {
    category: 'Data Entry',
    description: 'High performance form component with data collection, validation, and submission',
    props: [
      { name: 'form', type: 'FormInstance', description: 'Form instance created by Form.useForm()' },
      { name: 'initialValues', type: 'object', description: 'Initial values of form fields' },
      { name: 'onFinish', type: '(values) => void', description: 'Callback when form is submitted' },
      { name: 'onFinishFailed', type: '(errorInfo) => void', description: 'Callback when validation fails' },
      { name: 'layout', type: "'horizontal' | 'vertical' | 'inline'", description: 'Form layout' },
      { name: 'name', type: 'string', description: 'Form name' },
    ],
    example: `import { Form, Input, Button } from 'antd';

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
};`,
    importStatement: "import { Form } from 'antd';",
    apiUrl: 'https://ant.design/components/form',
  },

  Table: {
    category: 'Data Display',
    description: 'Display rows of data with sorting, filtering, and pagination',
    props: [
      { name: 'columns', type: 'ColumnType[]', description: 'Columns configuration' },
      { name: 'dataSource', type: 'object[]', description: 'Data source array' },
      { name: 'rowKey', type: 'string | function', description: 'Row unique key' },
      { name: 'pagination', type: 'object | false', description: 'Pagination config' },
      { name: 'loading', type: 'boolean', description: 'Loading state' },
      { name: 'onChange', type: 'function', description: 'Callback for table change' },
      { name: 'rowSelection', type: 'object', description: 'Row selection config' },
    ],
    example: `import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
];

const App = () => <Table columns={columns} dataSource={dataSource} />;`,
    importStatement: "import { Table } from 'antd';",
    apiUrl: 'https://ant.design/components/table',
  },

  Modal: {
    category: 'Feedback',
    description: 'Modal dialog for user interaction',
    props: [
      { name: 'open', type: 'boolean', description: 'Modal visible state' },
      { name: 'title', type: 'ReactNode', description: 'Modal title' },
      { name: 'onOk', type: '() => void', description: 'OK button callback' },
      { name: 'onCancel', type: '() => void', description: 'Cancel button callback' },
      { name: 'footer', type: 'ReactNode', description: 'Footer content' },
      { name: 'width', type: 'string | number', description: 'Modal width' },
      { name: 'centered', type: 'boolean', description: 'Center modal vertically' },
    ],
    example: `import { Modal, Button } from 'antd';
import { useState } from 'react';

const App = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
      </Modal>
    </>
  );
};`,
    importStatement: "import { Modal } from 'antd';",
    apiUrl: 'https://ant.design/components/modal',
  },

  Input: {
    category: 'Data Entry',
    description: 'Basic input component for user text input',
    props: [
      { name: 'value', type: 'string', description: 'Input value' },
      { name: 'defaultValue', type: 'string', description: 'Default value' },
      { name: 'onChange', type: '(e) => void', description: 'Change event handler' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', description: 'Disabled state' },
      { name: 'size', type: "'large' | 'middle' | 'small'", description: 'Input size' },
      { name: 'prefix', type: 'ReactNode', description: 'Prefix icon or text' },
      { name: 'suffix', type: 'ReactNode', description: 'Suffix icon or text' },
      { name: 'allowClear', type: 'boolean', description: 'Show clear button' },
    ],
    example: `import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const App = () => (
  <>
    <Input placeholder="Basic usage" />
    <Input
      placeholder="Enter your username"
      prefix={<UserOutlined />}
      allowClear
    />
    <Input.Password placeholder="Enter password" />
  </>
);`,
    importStatement: "import { Input } from 'antd';",
    apiUrl: 'https://ant.design/components/input',
  },
};

// Create MCP Server instance
const server = new Server(
  {
    name: 'ant-design-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_all_component_names',
        description:
          'Get a list of all available Ant Design component names. Returns all component names as a comma-separated string.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_component_info',
        description:
          'Get detailed information about a specific Ant Design component including description, props, usage examples, and API documentation URL.',
        inputSchema: {
          type: 'object',
          properties: {
            componentName: {
              type: 'string',
              description:
                'The name of the Ant Design component (e.g., "Button", "Form", "Table")',
            },
          },
          required: ['componentName'],
        },
      },
      {
        name: 'search_components',
        description:
          'Search for Ant Design components by keyword or category. Returns matching component names and brief descriptions.',
        inputSchema: {
          type: 'object',
          properties: {
            keyword: {
              type: 'string',
              description:
                'Search keyword (component name, category, or feature)',
            },
          },
          required: ['keyword'],
        },
      },
      {
        name: 'get_component_example',
        description:
          'Get a complete usage example for a specific Ant Design component with TypeScript and React code.',
        inputSchema: {
          type: 'object',
          properties: {
            componentName: {
              type: 'string',
              description: 'The name of the Ant Design component',
            },
          },
          required: ['componentName'],
        },
      },
      {
        name: 'get_components_by_category',
        description:
          'Get all components in a specific category (General, Layout, Navigation, Data Entry, Data Display, Feedback, Other).',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description:
                'Component category (General, Layout, Navigation, Data Entry, Data Display, Feedback, Other)',
            },
          },
          required: ['category'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_all_component_names': {
        return {
          content: [
            {
              type: 'text',
              text: ANT_DESIGN_COMPONENTS.join(', '),
            },
          ],
        };
      }

      case 'get_component_info': {
        const { componentName } = args;

        if (!ANT_DESIGN_COMPONENTS.includes(componentName)) {
          return {
            content: [
              {
                type: 'text',
                text: `Component "${componentName}" not found. Available components: ${ANT_DESIGN_COMPONENTS.join(', ')}`,
              },
            ],
            isError: true,
          };
        }

        const info = COMPONENT_INFO[componentName] || {
          category: 'Unknown',
          description: `${componentName} component from Ant Design`,
          props: [],
          example: `import { ${componentName} } from 'antd';\n\nconst App = () => <${componentName} />;`,
          importStatement: `import { ${componentName} } from 'antd';`,
          apiUrl: `https://ant.design/components/${componentName.toLowerCase()}`,
        };

        const propsTable = info.props.length > 0
          ? `\n\n## Props\n\n${info.props.map(p => `- **${p.name}**: \`${p.type}\` - ${p.description}`).join('\n')}`
          : '';

        const result = `# ${componentName}

**Category**: ${info.category}

${info.description}

## Import

\`\`\`typescript
${info.importStatement}
\`\`\`
${propsTable}

## Example

\`\`\`tsx
${info.example}
\`\`\`

## API Documentation

${info.apiUrl}
`;

        return {
          content: [
            {
              type: 'text',
              text: result,
            },
          ],
        };
      }

      case 'search_components': {
        const { keyword } = args;
        const searchTerm = keyword.toLowerCase();

        const matches = ANT_DESIGN_COMPONENTS.filter(name =>
          name.toLowerCase().includes(searchTerm) ||
          (COMPONENT_INFO[name]?.category || '').toLowerCase().includes(searchTerm) ||
          (COMPONENT_INFO[name]?.description || '').toLowerCase().includes(searchTerm)
        );

        if (matches.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `No components found matching "${keyword}"`,
              },
            ],
          };
        }

        const results = matches.map(name => {
          const info = COMPONENT_INFO[name];
          return `- **${name}**${info ? ` (${info.category})` : ''}: ${info?.description || 'Ant Design component'}`;
        }).join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Found ${matches.length} component(s):\n\n${results}`,
            },
          ],
        };
      }

      case 'get_component_example': {
        const { componentName } = args;

        if (!ANT_DESIGN_COMPONENTS.includes(componentName)) {
          return {
            content: [
              {
                type: 'text',
                text: `Component "${componentName}" not found.`,
              },
            ],
            isError: true,
          };
        }

        const info = COMPONENT_INFO[componentName] || {
          example: `import { ${componentName} } from 'antd';\n\nconst App = () => <${componentName} />;`,
          importStatement: `import { ${componentName} } from 'antd';`,
        };

        return {
          content: [
            {
              type: 'text',
              text: `\`\`\`tsx\n${info.example}\n\`\`\``,
            },
          ],
        };
      }

      case 'get_components_by_category': {
        const { category } = args;

        const componentsByCategory = ANT_DESIGN_COMPONENTS.filter(name => {
          const info = COMPONENT_INFO[name];
          return info && info.category === category;
        });

        if (componentsByCategory.length === 0) {
          // Try to find category matches even for components without detailed info
          const generalCategories = {
            'General': ['Button', 'Icon', 'Typography'],
            'Layout': ['Divider', 'Grid', 'Layout', 'Space', 'Splitter'],
            'Navigation': ['Affix', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps'],
            'Data Entry': ['AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Form', 'Input', 'InputNumber', 'Mentions', 'Radio', 'Rate', 'Select', 'Slider', 'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload'],
            'Data Display': ['Avatar', 'Badge', 'Calendar', 'Card', 'Carousel', 'Collapse', 'Descriptions', 'Empty', 'Image', 'List', 'Popover', 'QRCode', 'Segmented', 'Statistic', 'Table', 'Tabs', 'Tag', 'Timeline', 'Tooltip', 'Tour', 'Tree'],
            'Feedback': ['Alert', 'Drawer', 'Message', 'Modal', 'Notification', 'Popconfirm', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'],
            'Other': ['Anchor', 'App', 'ConfigProvider', 'FloatButton', 'Flex'],
          };

          const matchedComponents = generalCategories[category] || [];

          if (matchedComponents.length === 0) {
            return {
              content: [
                {
                  type: 'text',
                  text: `No components found in category "${category}". Available categories: ${Object.keys(generalCategories).join(', ')}`,
                },
              ],
            };
          }

          return {
            content: [
              {
                type: 'text',
                text: `Components in ${category} category:\n\n${matchedComponents.join(', ')}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `Components in ${category} category:\n\n${componentsByCategory.join(', ')}`,
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Ant Design MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
