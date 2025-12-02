#!/usr/bin/env node

/**
 * @file mcp/index.js
 * @author leon.wang(leon.wang@derbysoft.net)
 * @description MCP server for Ant Admin Template components and hooks
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Component and Hook metadata
const COMPONENTS = {
  ContactInfo: {
    path: 'src/components/ContactInfo/ContactInfo.tsx',
    description: 'Display contact information (email and phone) with icons',
    props: ['email', 'phone'],
    example: `<ContactInfo
  email="contact@example.com"
  phone="+1 (555) 123-4567"
/>`,
  },
  DotStatus: {
    path: 'src/components/DotStatus/DotStatus.tsx',
    description: 'Display status with colored dot indicator',
    props: ['status', 'text', 'color'],
    example: `<DotStatus
  status="success"
  text="Active"
/>`,
  },
  EmailSuccessModal: {
    path: 'src/components/EmailSuccessModal/EmailSuccessModal.tsx',
    description: 'Success modal shown after email binding',
    props: ['open', 'onClose', 'onSetPassword'],
    example: `<EmailSuccessModal
  open={open}
  onClose={handleClose}
  onSetPassword={handleSetPassword}
/>`,
  },
  Masonry: {
    path: 'src/components/Masonry/Masonry.tsx',
    description: 'Waterfall layout component for displaying items in columns',
    props: ['items', 'columns', 'gap', 'renderItem', 'responsive'],
    example: `<Masonry
  items={items}
  columns={3}
  gap={16}
  renderItem={(item) => <Card>{item.title}</Card>}
/>`,
  },
  PasswordMethodSelector: {
    path: 'src/components/PasswordMethodSelector/PasswordMethodSelector.tsx',
    description:
      'Select verification method (email or phone) for password operations',
    props: ['email', 'phone', 'defaultMethod', 'onSendCode', 'disabled'],
    example: `<PasswordMethodSelector
  email="fe****@derbysoft.net"
  phone="+86 139****6789"
  onSendCode={handleSendCode}
/>`,
  },
  UserContactCard: {
    path: 'src/components/UserContactCard/UserContactCard.tsx',
    description: 'Display user contact card with avatar and information',
    props: ['name', 'email', 'phone', 'avatar'],
    example: `<UserContactCard
  name="John Doe"
  email="john@example.com"
  phone="+1 555-1234"
/>`,
  },
  VerificationCodeInput: {
    path: 'src/components/VerificationCodeInput/VerificationCodeInput.tsx',
    description: 'Input component for entering verification codes',
    props: ['length', 'onComplete', 'onChange', 'disabled', 'autoFocus'],
    example: `<VerificationCodeInput
  length={6}
  onComplete={handleComplete}
  autoFocus
/>`,
  },
  VerificationCodePage: {
    path: 'src/components/VerificationCodePage/VerificationCodePage.tsx',
    description: 'Complete page for verification code input with countdown',
    props: [
      'contact',
      'codeLength',
      'countdownSeconds',
      'onComplete',
      'onResend',
      'onGoBack',
    ],
    example: `<VerificationCodePage
  contact="fe****@derbysoft.net"
  codeLength={8}
  countdownSeconds={60}
  onComplete={handleComplete}
  onResend={handleResend}
  onGoBack={handleGoBack}
/>`,
  },
};

const HOOKS = {
  useCountdown: {
    path: 'src/hooks/useCountdown.tsx',
    description: 'Countdown timer hook with start, reset functionality',
    params: ['defaultCountdown', 'defaultStarted'],
    returns: ['countdown', 'isRunning', 'isReStarted', 'start', 'reset'],
    example: `const { countdown, isRunning, start, reset } = useCountdown(60, true);

// Start countdown
start();

// Reset countdown
reset();

// Display countdown
<div>{countdown}s remaining</div>`,
  },
  useAHooksCountdown: {
    path: 'src/hooks/useAHooksCountdown.tsx',
    description: 'Countdown hook based on ahooks with round tracking',
    params: ['seconds', 'onFinish'],
    returns: ['sec', 'start', 'reset', 'isRunning', 'round'],
    example: `const { sec, start, reset, isRunning, round } = useAHooksCountdown({
  seconds: 60,
  onFinish: () => console.log('Finished!'),
});

// Usage
<Button onClick={start} disabled={isRunning}>
  {isRunning ? \`Resend (\${sec}s)\` : 'Send Code'}
</Button>`,
  },
  useBeforeUnload: {
    path: 'src/hooks/useBeforeUnload.tsx',
    description: 'Hook to warn user before leaving page with unsaved changes',
    params: ['enabled', 'message'],
    returns: null,
    example: `useBeforeUnload(hasUnsavedChanges, 'You have unsaved changes. Are you sure you want to leave?');`,
  },
  useDsRequest: {
    path: 'src/hooks/useDsRequest.tsx',
    description: 'Hook for making HTTP requests with Derbysoft API integration',
    params: ['config'],
    returns: ['data', 'loading', 'error', 'refetch'],
    example: `const { data, loading, error } = useDsRequest({
  url: '/api/users',
  method: 'GET',
});`,
  },
  useNavTo: {
    path: 'src/hooks/useNavTo.tsx',
    description: 'Navigation hook with type-safe routing',
    params: [],
    returns: ['navTo'],
    example: `const navTo = useNavTo();

// Navigate to route
navTo('/app/users');`,
  },
  useWindowSize: {
    path: 'src/hooks/useWindowSize.tsx',
    description: 'Hook to track window size changes',
    params: [],
    returns: ['width', 'height'],
    example: `const { width, height } = useWindowSize();

// Responsive logic
const isMobile = width < 768;`,
  },
};

// Read file content
async function readFileContent(filePath) {
  try {
    const fullPath = path.join(projectRoot, filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return content;
  } catch (error) {
    return null;
  }
}

// Create MCP server
const server = new Server(
  {
    name: 'ant-admin-template-mcp',
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
        name: 'list_components',
        description: 'List all available React components',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'list_hooks',
        description: 'List all available React hooks',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_component_info',
        description: 'Get detailed information about a specific component',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_hook_info',
        description: 'Get detailed information about a specific hook',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Hook name',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_component_source',
        description: 'Get the source code of a component',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_hook_source',
        description: 'Get the source code of a hook',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Hook name',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'search_components',
        description: 'Search components by keyword',
        inputSchema: {
          type: 'object',
          properties: {
            keyword: {
              type: 'string',
              description: 'Search keyword',
            },
          },
          required: ['keyword'],
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
      case 'list_components': {
        const list = Object.entries(COMPONENTS).map(([name, info]) => ({
          name,
          description: info.description,
          props: info.props,
        }));
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(list, null, 2),
            },
          ],
        };
      }

      case 'list_hooks': {
        const list = Object.entries(HOOKS).map(([name, info]) => ({
          name,
          description: info.description,
          params: info.params,
          returns: info.returns,
        }));
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(list, null, 2),
            },
          ],
        };
      }

      case 'get_component_info': {
        const componentName = args.name;
        const component = COMPONENTS[componentName];

        if (!component) {
          return {
            content: [
              {
                type: 'text',
                text: `Component "${componentName}" not found. Available components: ${Object.keys(
                  COMPONENTS
                ).join(', ')}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `# ${componentName}

**Description:** ${component.description}

**Props:**
${component.props.map((prop) => `- ${prop}`).join('\n')}

**Example:**
\`\`\`tsx
${component.example}
\`\`\`

**File Path:** ${component.path}`,
            },
          ],
        };
      }

      case 'get_hook_info': {
        const hookName = args.name;
        const hook = HOOKS[hookName];

        if (!hook) {
          return {
            content: [
              {
                type: 'text',
                text: `Hook "${hookName}" not found. Available hooks: ${Object.keys(
                  HOOKS
                ).join(', ')}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `# ${hookName}

**Description:** ${hook.description}

**Parameters:**
${hook.params ? hook.params.map((param) => `- ${param}`).join('\n') : 'None'}

**Returns:**
${hook.returns ? hook.returns.map((ret) => `- ${ret}`).join('\n') : 'void'}

**Example:**
\`\`\`tsx
${hook.example}
\`\`\`

**File Path:** ${hook.path}`,
            },
          ],
        };
      }

      case 'get_component_source': {
        const componentName = args.name;
        const component = COMPONENTS[componentName];

        if (!component) {
          return {
            content: [
              {
                type: 'text',
                text: `Component "${componentName}" not found.`,
              },
            ],
          };
        }

        const source = await readFileContent(component.path);

        if (!source) {
          return {
            content: [
              {
                type: 'text',
                text: `Could not read source file: ${component.path}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `# ${componentName} Source Code\n\nFile: ${component.path}\n\n\`\`\`tsx\n${source}\n\`\`\``,
            },
          ],
        };
      }

      case 'get_hook_source': {
        const hookName = args.name;
        const hook = HOOKS[hookName];

        if (!hook) {
          return {
            content: [
              {
                type: 'text',
                text: `Hook "${hookName}" not found.`,
              },
            ],
          };
        }

        const source = await readFileContent(hook.path);

        if (!source) {
          return {
            content: [
              {
                type: 'text',
                text: `Could not read source file: ${hook.path}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `# ${hookName} Source Code\n\nFile: ${hook.path}\n\n\`\`\`tsx\n${source}\n\`\`\``,
            },
          ],
        };
      }

      case 'search_components': {
        const keyword = args.keyword.toLowerCase();
        const results = Object.entries(COMPONENTS).filter(
          ([name, info]) =>
            name.toLowerCase().includes(keyword) ||
            info.description.toLowerCase().includes(keyword) ||
            info.props.some((prop) => prop.toLowerCase().includes(keyword))
        );

        if (results.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `No components found matching "${keyword}"`,
              },
            ],
          };
        }

        const resultText = results
          .map(
            ([name, info]) => `
**${name}**
${info.description}
Props: ${info.props.join(', ')}
`
          )
          .join('\n---\n');

        return {
          content: [
            {
              type: 'text',
              text: `Found ${results.length} component(s):\n${resultText}`,
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
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Ant Admin Template MCP Server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
