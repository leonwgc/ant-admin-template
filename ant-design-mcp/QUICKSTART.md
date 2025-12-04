/**
 * @file ant-design-mcp/QUICKSTART.md
 * @author leon.wang(leon.wang@derbysoft.net)
 * @description Quick start guide for Ant Design MCP Server
 */

# Quick Start Guide

Get started with Ant Design MCP Server in 5 minutes!

## Installation

```bash
# Navigate to the project directory
cd ant-admin-template/ant-design-mcp

# Install dependencies
npm install
```

## Configuration

### For Claude Desktop (macOS)

1. Open Claude Desktop configuration:
```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

2. Add the server configuration:
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

3. **Restart Claude Desktop**

### For Claude Desktop (Windows)

1. Open: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the server configuration:
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

3. **Restart Claude Desktop**

## Verification

### Check Server Status

In Claude Desktop, you should see "ant-design" in the MCP servers list.

### Try Your First Query

Ask Claude:
```
Show me all Ant Design components
```

You should see a list of 90+ components.

## Basic Usage Examples

### 1. Get Component List
```
Question: "What components does Ant Design have?"
```

### 2. Get Component Information
```
Question: "Tell me about the Button component from Ant Design"
```

### 3. Search Components
```
Question: "Find Ant Design components for forms"
```

### 4. Get Usage Example
```
Question: "Show me how to use the Table component"
```

### 5. Browse by Category
```
Question: "What Ant Design components are available for data entry?"
```

## Code Generation Example

Try this with Claude:

```
Create a user registration form using Ant Design with the following fields:
- Username (required)
- Email (required, email validation)
- Password (required, minimum 8 characters)
- Confirm Password (required, must match password)
- Submit button

Use TypeScript and follow React best practices.
```

Claude will:
1. Query the MCP server for Form, Input, and Button components
2. Get their props and usage patterns
3. Generate code following Ant Design conventions

## Project Integration

### Generate Components for Your Project

```
Question: "Create a data table component for displaying user information
with columns: Name, Email, Role, Status, and Actions. Use Ant Design
Table component and follow the project coding standards in
.github/instructions/dev.instructions.md"
```

Claude will generate:
1. TypeScript React component
2. SCSS file with BEM naming
3. Proper imports and types
4. Comments with file path and author

## Common Commands

### Get All Components
```
"List all Ant Design components"
"Show me all available components"
```

### Get Component Details
```
"What props does the Modal component have?"
"How do I use the DatePicker component?"
"Show me the API for the Select component"
```

### Search and Discovery
```
"Find components for displaying data"
"What components can I use for navigation?"
"Search for feedback components"
```

### Code Examples
```
"Give me an example of using the Form component"
"Show me how to create a modal dialog"
"How do I implement a dropdown menu?"
```

## Testing the Server Directly

### Start the Server
```bash
npm start
```

The server will run and listen for MCP protocol messages on stdio.

### Development Mode
```bash
npm run dev
```

This will auto-reload on file changes.

## Troubleshooting

### Issue: Server not showing in Claude Desktop

**Solution**:
1. Check Node.js is installed: `node --version`
2. Verify file path in config is correct
3. Check dependencies are installed: `npm install`
4. Restart Claude Desktop

### Issue: Component not found

**Solution**:
1. Check component name spelling (case-sensitive)
2. Use `get_all_component_names` to see available components
3. Component might have basic info only

### Issue: Syntax errors

**Solution**:
```bash
# Check syntax
cd ant-design-mcp
node -c index.js
```

## Next Steps

### Learn More
- Read [README.md](./README.md) for detailed documentation
- Review [examples.md](./examples.md) for usage patterns
- Check [INTEGRATION.md](./INTEGRATION.md) for advanced configuration
- See [SUMMARY.md](./SUMMARY.md) for project overview

### Extend the Server
1. Add more component details in `index.js`
2. Add new tools for additional functionality
3. Integrate with GitHub API for real-time updates

### Use with Your Project
1. Generate components following project standards
2. Create consistent UI using Ant Design
3. Speed up development with AI assistance

## Tips for Best Results

### 1. Be Specific
❌ "Create a form"
✅ "Create a login form with username and password fields using Ant Design Form component"

### 2. Reference Component Names
❌ "Add a button"
✅ "Add an Ant Design Button with type='primary'"

### 3. Mention Requirements
✅ "Create a table with pagination and sorting"
✅ "Add form validation for email field"

### 4. Follow Project Standards
✅ "Follow the coding standards in .github/instructions/dev.instructions.md"
✅ "Use BEM naming for CSS classes"

### 5. Request Complete Solutions
✅ "Create the component with TypeScript types and SCSS styles"
✅ "Include the component file and its style file"

## Additional Resources

- [Ant Design Documentation](https://ant.design/)
- [Ant Design Components](https://ant.design/components/overview)
- [React TypeScript Guide](https://react-typescript-cheatsheet.netlify.app/)

## Support

Questions or issues? Check:
1. This quick start guide
2. README.md for detailed info
3. examples.md for usage patterns
4. INTEGRATION.md for setup help

Contact: leon.wang@derbysoft.net

---

**Ready to Go!** 🚀

Start asking Claude about Ant Design components and watch it generate code using the MCP server!
