# Ant Admin Template MCP Server

Model Context Protocol (MCP) server for accessing Ant Admin Template components and hooks documentation.

## 🚀 Features

- **List Components**: Get all available React components
- **List Hooks**: Get all available React hooks
- **Component Info**: Get detailed documentation for any component
- **Hook Info**: Get detailed documentation for any hook
- **Source Code**: Access component and hook source code
- **Search**: Search components by keyword

## 📦 Installation

```bash
cd mcp
npm install
```

## 🔧 Usage

### Start the MCP Server

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

### Configure in Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "ant-admin-template": {
      "command": "node",
      "args": ["/path/to/ant-admin-template/mcp/index.js"]
    }
  }
}
```

## 🛠️ Available Tools

### 1. `list_components`
List all available React components in the project.

**Example:**
```
Use the list_components tool to see all components
```

### 2. `list_hooks`
List all available React hooks in the project.

**Example:**
```
Use the list_hooks tool to see all hooks
```

### 3. `get_component_info`
Get detailed information about a specific component including props and usage examples.

**Parameters:**
- `name` (string): Component name

**Example:**
```
Use get_component_info with name "Masonry"
```

### 4. `get_hook_info`
Get detailed information about a specific hook including parameters and usage examples.

**Parameters:**
- `name` (string): Hook name

**Example:**
```
Use get_hook_info with name "useCountdown"
```

### 5. `get_component_source`
Get the full source code of a component.

**Parameters:**
- `name` (string): Component name

**Example:**
```
Use get_component_source with name "ContactInfo"
```

### 6. `get_hook_source`
Get the full source code of a hook.

**Parameters:**
- `name` (string): Hook name

**Example:**
```
Use get_hook_source with name "useAHooksCountdown"
```

### 7. `search_components`
Search for components by keyword in name, description, or props.

**Parameters:**
- `keyword` (string): Search term

**Example:**
```
Use search_components with keyword "verification"
```

## 📚 Available Components

- **ContactInfo**: Display contact information (email and phone) with icons
- **DotStatus**: Display status with colored dot indicator
- **EmailSuccessModal**: Success modal shown after email binding
- **Masonry**: Waterfall layout component for displaying items in columns
- **PasswordMethodSelector**: Select verification method for password operations
- **UserContactCard**: Display user contact card with avatar and information
- **VerificationCodeInput**: Input component for entering verification codes
- **VerificationCodePage**: Complete page for verification code input with countdown

## 🎣 Available Hooks

- **useCountdown**: Countdown timer hook with start, reset functionality
- **useAHooksCountdown**: Countdown hook based on ahooks with round tracking
- **useBeforeUnload**: Hook to warn user before leaving page with unsaved changes
- **useDsRequest**: Hook for making HTTP requests with Derbysoft API integration
- **useNavTo**: Navigation hook with type-safe routing
- **useWindowSize**: Hook to track window size changes

## 🔍 Example Queries

1. **"Show me all components"**
   - Uses: `list_components`

2. **"How do I use the Masonry component?"**
   - Uses: `get_component_info` with name "Masonry"

3. **"Show me the source code for useCountdown"**
   - Uses: `get_hook_source` with name "useCountdown"

4. **"Find components related to verification"**
   - Uses: `search_components` with keyword "verification"

## 📝 Notes

- The MCP server reads component and hook metadata to provide quick information
- Source code is read directly from the project files
- All paths are relative to the project root directory

## 🔗 Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## 👨‍💻 Author

leon.wang@derbysoft.net

## Visual testing tool for MCP servers
https://github.com/modelcontextprotocol/inspector

```
npx @modelcontextprotocol/inspector
```
