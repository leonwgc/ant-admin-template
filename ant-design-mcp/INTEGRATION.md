/**
 * @file ant-design-mcp/INTEGRATION.md
 * @author leon.wang(leon.wang@derbysoft.net)
 * @description Integration guide for Ant Design MCP Server
 */

# Integration Guide

## Claude Desktop Integration

### macOS/Linux Configuration

Add the following to your Claude Desktop configuration file:

**Location**: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

```json
{
  "mcpServers": {
    "ant-design": {
      "command": "node",
      "args": [
        "/Users/leonwgc/ant-admin-template/ant-design-mcp/index.js"
      ]
    }
  }
}
```

### Windows Configuration

**Location**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ant-design": {
      "command": "node",
      "args": [
        "C:\\path\\to\\ant-admin-template\\ant-design-mcp\\index.js"
      ]
    }
  }
}
```

### Restart Claude Desktop

After adding the configuration, restart Claude Desktop for the changes to take effect.

## VS Code Integration

If you're using an MCP extension in VS Code:

1. Install the MCP extension
2. Add the server configuration to your workspace settings:

```json
{
  "mcp.servers": [
    {
      "name": "ant-design",
      "command": "node",
      "args": [
        "${workspaceFolder}/ant-design-mcp/index.js"
      ]
    }
  ]
}
```

## Verification

### Check Server Status

After integration, you should see the following tools available:

1. `get_all_component_names`
2. `get_component_info`
3. `search_components`
4. `get_component_example`
5. `get_components_by_category`

### Test Commands

Try these commands in Claude Desktop:

```
1. "Show me all Ant Design components"
   → Should call get_all_component_names

2. "What are the props for the Button component?"
   → Should call get_component_info with componentName: "Button"

3. "Find components for data entry"
   → Should call search_components with keyword: "data entry"

4. "Show me an example of using the Form component"
   → Should call get_component_example with componentName: "Form"

5. "What components are in the Feedback category?"
   → Should call get_components_by_category with category: "Feedback"
```

## Usage with AI Code Generation

### Workflow Example

When asked to create a component using Ant Design:

1. **Identify Required Components**
   - User: "Create a user profile form"
   - AI calls: `search_components` with keyword "form"

2. **Get Component Details**
   - AI calls: `get_component_info` for Form, Input, Button, etc.

3. **Get Usage Examples**
   - AI calls: `get_component_example` for reference implementations

4. **Generate Code**
   - AI generates code following the patterns and props from the retrieved information

### Best Practices

1. **Component Discovery**
   - Use `search_components` to find relevant components
   - Use `get_components_by_category` to browse by functionality

2. **Implementation**
   - Always call `get_component_info` before using a component
   - Reference the provided examples for implementation patterns
   - Follow the import statements exactly as shown

3. **Validation**
   - Check props against the component info
   - Use TypeScript types from the documentation
   - Follow project coding standards

## Troubleshooting

### Server Not Starting

**Issue**: MCP server doesn't appear in Claude Desktop

**Solution**:
1. Check that Node.js is installed: `node --version`
2. Verify the path to `index.js` is correct
3. Check Claude Desktop logs
4. Ensure `node_modules` are installed: `cd ant-design-mcp && npm install`

### Tool Calls Failing

**Issue**: Tool calls return errors

**Solution**:
1. Verify component name spelling (case-sensitive)
2. Check that required parameters are provided
3. Review error messages in Claude Desktop

### Component Not Found

**Issue**: Component info not available

**Solution**:
1. Call `get_all_component_names` to see available components
2. Some components may have basic info only
3. Refer to official Ant Design docs: https://ant.design/

## Advanced Configuration

### Multiple MCP Servers

You can run both the Ant Admin Template MCP and Ant Design MCP simultaneously:

```json
{
  "mcpServers": {
    "ant-admin-template": {
      "command": "node",
      "args": [
        "/Users/leonwgc/ant-admin-template/mcp/index.js"
      ]
    },
    "ant-design": {
      "command": "node",
      "args": [
        "/Users/leonwgc/ant-admin-template/ant-design-mcp/index.js"
      ]
    }
  }
}
```

### Environment Variables

You can configure the server with environment variables:

```json
{
  "mcpServers": {
    "ant-design": {
      "command": "node",
      "args": [
        "/Users/leonwgc/ant-admin-template/ant-design-mcp/index.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## Development

### Testing Changes

1. Make changes to `index.js`
2. Restart Claude Desktop or reconnect MCP client
3. Test with sample queries

### Adding New Components

To add detailed information for more components:

1. Edit `index.js`
2. Add entries to the `COMPONENT_INFO` object
3. Include: category, description, props, example, importStatement, apiUrl
4. Test with `get_component_info`

### Debugging

Enable detailed logging:

```bash
# Set NODE_ENV to development
NODE_ENV=development node index.js
```

Check stderr output for debug messages.

## Support

For issues or questions:
- Check the [README.md](./README.md) for basic usage
- Review [examples.md](./examples.md) for usage patterns
- Refer to [Ant Design Documentation](https://ant.design/)

## Version Compatibility

- Node.js: >= 18.0.0
- Ant Design: 5.x (latest)
- MCP SDK: >= 1.0.4
