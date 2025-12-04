# Ant Design MCP Server

A Model Context Protocol (MCP) server that provides access to Ant Design component library documentation and information for automated code generation.

## Features

- 📋 Get all available Ant Design component names
- 📖 Get detailed component information (props, examples, API docs)
- 🔍 Search components by keyword or category
- 💡 Get usage examples for specific components
- 🏷️ Browse components by category

## Installation

```bash
cd ant-design-mcp
npm install
```

## Usage

### Starting the Server

```bash
npm start
```

### Development Mode (with auto-reload)

```bash
npm run dev
```

## Available Tools

### 1. get_all_component_names

Get a list of all available Ant Design component names.

**Returns**: Comma-separated string of all component names

**Example**:
```
Button, Form, Table, Modal, Input, Select, ...
```

### 2. get_component_info

Get detailed information about a specific component.

**Parameters**:
- `componentName` (string, required): Name of the component (e.g., "Button", "Form")

**Returns**: Markdown document containing:
- Component category
- Description
- Import statement
- Props documentation
- Usage example
- API documentation URL

### 3. search_components

Search for components by keyword or feature.

**Parameters**:
- `keyword` (string, required): Search term (component name, category, or feature)

**Returns**: List of matching components with descriptions

### 4. get_component_example

Get a complete usage example for a specific component.

**Parameters**:
- `componentName` (string, required): Name of the component

**Returns**: TypeScript/React code example

### 5. get_components_by_category

Get all components in a specific category.

**Parameters**:
- `category` (string, required): Category name
  - General
  - Layout
  - Navigation
  - Data Entry
  - Data Display
  - Feedback
  - Other

**Returns**: List of component names in the specified category

## Component Categories

### General
Button, Icon, Typography

### Layout
Divider, Grid, Layout, Space, Splitter

### Navigation
Affix, Breadcrumb, Dropdown, Menu, Pagination, Steps

### Data Entry
AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload

### Data Display
Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Popover, QRCode, Segmented, Statistic, Table, Tabs, Tag, Timeline, Tooltip, Tour, Tree

### Feedback
Alert, Drawer, Message, Modal, Notification, Popconfirm, Progress, Result, Skeleton, Spin, Watermark

### Other
Anchor, App, ConfigProvider, FloatButton, Flex

## Integration with Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "ant-design": {
      "command": "node",
      "args": ["/path/to/ant-admin-template/ant-design-mcp/index.js"]
    }
  }
}
```

## Use Cases

1. **Automated Code Generation**: Use component information to automatically generate React code from design specifications
2. **Component Discovery**: Quickly find the right component for your needs
3. **Documentation Reference**: Access component props and examples without leaving your development environment
4. **Design System Integration**: Integrate Ant Design components into AI-powered development workflows

## Example Queries

- "Get all Ant Design component names"
- "Show me information about the Form component"
- "Search for components related to data entry"
- "Get an example of how to use the Table component"
- "Show me all components in the Feedback category"

## Contributing

To add more detailed component information:

1. Edit `index.js`
2. Add component details to the `COMPONENT_INFO` object
3. Include props, examples, and descriptions

## License

ISC

## Author

leon.wang@derbysoft.net

## References

- [Ant Design Official Documentation](https://ant.design/)
- [Ant Design GitHub Repository](https://github.com/ant-design/ant-design)
- [Model Context Protocol](https://modelcontextprotocol.io/)
