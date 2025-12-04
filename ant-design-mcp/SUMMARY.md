/**
 * @file ant-design-mcp/SUMMARY.md
 * @author leon.wang(leon.wang@derbysoft.net)
 * @description Project summary and overview
 */

# Ant Design MCP Server - Project Summary

## Overview

This is a Model Context Protocol (MCP) server that provides programmatic access to Ant Design component library documentation and information. It enables AI assistants to automatically generate React code using Ant Design components based on design specifications.

## Project Structure

```
ant-design-mcp/
├── index.js              # Main MCP server implementation
├── package.json          # Node.js project configuration
├── package-lock.json     # Dependency lock file
├── .gitignore           # Git ignore rules
├── README.md            # Main documentation
├── INTEGRATION.md       # Integration guide for Claude Desktop and other clients
├── examples.md          # Usage examples and patterns
├── SUMMARY.md           # This file
└── node_modules/        # Dependencies (not in git)
```

## Key Features

### 1. Component Discovery
- **get_all_component_names**: Returns all 90+ Ant Design component names
- **search_components**: Search components by keyword, feature, or category
- **get_components_by_category**: Browse components by category (General, Layout, Navigation, Data Entry, Data Display, Feedback, Other)

### 2. Component Documentation
- **get_component_info**: Detailed component information including:
  - Category and description
  - Import statement
  - Props with types and descriptions
  - Usage examples
  - API documentation URL

### 3. Code Examples
- **get_component_example**: Get ready-to-use TypeScript/React code examples
- Pre-configured examples for common components (Button, Form, Table, Modal, Input)

## Supported Components (90+)

### Categories

1. **General** (3): Button, Icon, Typography
2. **Layout** (5): Divider, Grid, Layout, Space, Splitter
3. **Navigation** (6): Affix, Breadcrumb, Dropdown, Menu, Pagination, Steps
4. **Data Entry** (18): AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload
5. **Data Display** (21): Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Popover, QRCode, Segmented, Statistic, Table, Tabs, Tag, Timeline, Tooltip, Tour, Tree
6. **Feedback** (13): Alert, Drawer, Message, Modal, Notification, Popconfirm, Progress, Result, Skeleton, Spin, Watermark
7. **Other** (5): Anchor, App, ConfigProvider, FloatButton, Flex

### Detailed Information Available

Currently, detailed prop information and examples are available for:
- **Button**: All button types, sizes, states
- **Form**: Form creation, validation, submission
- **Table**: Data display, sorting, filtering, pagination
- **Modal**: Dialog creation and interaction
- **Input**: Text input with various configurations

Additional components have basic information and can be easily extended.

## Technical Details

### Dependencies
- `@modelcontextprotocol/sdk`: ^1.0.4 - MCP protocol implementation
- `node-fetch`: ^3.3.2 - HTTP client (for future GitHub API integration)

### Requirements
- Node.js >= 18.0.0
- npm >= 9.0.0

### Architecture

```
┌─────────────────┐
│  Claude Desktop │
│   or AI Client  │
└────────┬────────┘
         │ MCP Protocol
         │ (stdio)
┌────────▼────────┐
│  MCP Server     │
│  (index.js)     │
├─────────────────┤
│ • Tool Registry │
│ • Component DB  │
│ • Code Examples │
└─────────────────┘
```

### Tool Handlers

1. **get_all_component_names**
   - Returns: Comma-separated string of component names
   - Use case: Component discovery

2. **get_component_info**
   - Input: componentName (string)
   - Returns: Markdown document with full component details
   - Use case: Understanding component API and usage

3. **search_components**
   - Input: keyword (string)
   - Returns: List of matching components
   - Use case: Finding relevant components

4. **get_component_example**
   - Input: componentName (string)
   - Returns: TSX code example
   - Use case: Implementation reference

5. **get_components_by_category**
   - Input: category (string)
   - Returns: List of components in category
   - Use case: Browsing by functionality

## Use Cases

### 1. Design-to-Code Generation
When given a design specification or mockup, the AI can:
1. Identify required UI components
2. Retrieve component information
3. Generate appropriate React code with correct props
4. Follow Ant Design best practices

### 2. Component Recommendation
When asked "what component should I use for X", the AI can:
1. Search for relevant components
2. Compare options
3. Provide recommendations with examples

### 3. Code Assistance
When writing React code, the AI can:
1. Suggest appropriate components
2. Provide prop information
3. Generate boilerplate code
4. Ensure correct imports and usage

### 4. Documentation Quick Reference
Developers can quickly access:
1. Component API without leaving the development environment
2. Usage examples for quick implementation
3. Links to detailed documentation

## Integration Scenarios

### Scenario 1: Claude Desktop Integration
```json
{
  "mcpServers": {
    "ant-design": {
      "command": "node",
      "args": ["path/to/ant-design-mcp/index.js"]
    }
  }
}
```

**Usage**:
- "Show me all Ant Design components"
- "How do I use the Form component?"
- "Create a login form with Ant Design"

### Scenario 2: Automated Code Generation Workflow
1. Parse design specification
2. Query MCP server for relevant components
3. Retrieve component details and examples
4. Generate code following project standards
5. Apply project-specific styling

### Scenario 3: Development Assistant
1. Developer describes UI requirement
2. AI suggests appropriate Ant Design components
3. AI provides implementation code
4. Developer reviews and integrates

## Future Enhancements

### Planned Features
1. **GitHub Integration**: Fetch real-time component information from ant-design repository
2. **Component Preview**: Generate visual previews of components
3. **Version Support**: Handle multiple Ant Design versions
4. **Custom Components**: Support for project-specific component wrappers
5. **Theme Information**: Include theming and customization details
6. **Advanced Examples**: More complex usage patterns and compositions
7. **Migration Assistant**: Help migrate between Ant Design versions

### Extensibility
- Easy to add new components to `COMPONENT_INFO`
- Modular tool handler design
- Can be extended to support other component libraries

## Development Guide

### Adding New Component Information

1. Edit `index.js`
2. Add entry to `COMPONENT_INFO`:

```javascript
ComponentName: {
  category: 'Category',
  description: 'Description',
  props: [
    { name: 'propName', type: 'type', description: 'description' }
  ],
  example: `// TSX code example`,
  importStatement: "import { ComponentName } from 'antd';",
  apiUrl: 'https://ant.design/components/component-name',
}
```

3. Test with `get_component_info` tool

### Testing

```bash
# Syntax check
node -c index.js

# Start server
npm start

# Development mode (auto-reload)
npm run dev
```

### Debugging

Check stderr output when running the server:
```bash
node index.js 2> debug.log
```

## Performance Considerations

- **Memory Usage**: Minimal - component data is stored as static objects
- **Response Time**: Fast - all data is in-memory, no external API calls
- **Scalability**: Can handle thousands of requests efficiently

## Security Notes

- No external network requests in current implementation
- No sensitive data storage
- Runs in isolated Node.js process
- Communication via stdio only

## Maintenance

### Regular Updates
- Review Ant Design changelog for new components
- Update component information for API changes
- Add examples for newly released features

### Monitoring
- Check MCP server logs for errors
- Verify component information accuracy
- Update documentation as needed

## Contributing

To contribute to this project:

1. Add new component information to `COMPONENT_INFO`
2. Ensure examples follow project coding standards
3. Update documentation
4. Test thoroughly before committing

## Resources

- [Ant Design Official Documentation](https://ant.design/)
- [Ant Design GitHub Repository](https://github.com/ant-design/ant-design)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Project Coding Standards](../.github/instructions/dev.instructions.md)

## License

ISC License

## Author

leon.wang@derbysoft.net

## Version History

- **v1.0.0** (2025-12-04): Initial release
  - 90+ components supported
  - 5 core tools implemented
  - Detailed information for 5 key components
  - Complete documentation and examples

## Support

For issues, questions, or contributions:
1. Check documentation files (README.md, INTEGRATION.md, examples.md)
2. Review component information in index.js
3. Refer to Ant Design official documentation
4. Contact: leon.wang@derbysoft.net
