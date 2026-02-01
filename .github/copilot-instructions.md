# AI Agent Instructions for ant-admin-template

## 🌐 Language Requirement
**Always respond in Chinese (中文) in the chat window.**

## Architecture Overview

This is a React + TypeScript admin template using **menu-driven automatic routing**. Routes are generated from `config.menu.tsx`, eliminating manual route configuration.

### Data Flow
```
config.menu.tsx → routeGenerator.tsx → RouteConfig.tsx → RouteGuard.tsx (permission check)
```

### Key Architecture Files
- [config.menu.tsx](src/config.menu.tsx) - Single source of truth for menus AND routes
- [utils/routeGenerator.tsx](src/utils/routeGenerator.tsx) - Component mapping for routes
- [RouteConfig.tsx](src/RouteConfig.tsx) - Auto-generated routes (do NOT edit manually)
- [store.ts](src/store.ts) - Global state (Zustand) for language, permissions

## Adding New Pages (3 Steps)

1. **Add menu item** in `config.menu.tsx`:
```tsx
{
  key: 'product-list',
  get label() { return t('menu.products'); },  // Use getter for i18n
  route: '/app/products',
  permissions: [],
  hidden: false,  // Set true for detail/edit pages
}
```

2. **Register component** in `utils/routeGenerator.tsx`:
```tsx
export const routeComponentMap = {
  '/app/products': lazyLoad('pages/Product/ProductList'),
};
```

3. **Create page component** with `default export` in `src/pages/`

## Critical Conventions

### Imports
- **UI Components**: `@derbysoft/neat-design` (NOT `antd`)
- **Icons**: `@ant-design/icons` for menus, `@derbysoft/neat-design-icons` for pages
- **Hooks**: Prefer `ahooks` library, then `~/hooks/*`

### File Structure
```tsx
/**
 * @file relative/path/from/src
 * @author leon.wang
 */
import React, { FC } from 'react';
import { Button } from '@derbysoft/neat-design';  // UI from neat-design
import { useRequest } from 'ahooks';              // Prefer ahooks
import { useNavTo } from '~/hooks/useNavTo';      // Project hooks
import './Component.scss';                         // Styles last
```

### Styles
- Use SCSS (not CSS Modules), import `@import 'scss/common.scss';` at top
- BEM naming: `.block__element--modifier`
- Use double quotes for className: `className="my-class"`

### i18n
- Namespace format: `'pages.feature:keyName'`
- Register new namespaces in `locales/index.ts`
- Key prefixes: `xxxTitle`, `xxxCol`, `xxxBtn`, `xxxMsg`, `xxxFormPh`

## Build Commands
```bash
npm start          # Dev server
npm run build:qa   # QA build
npm run build:uat  # UAT build
npm run build:prod # Production build
```

## MCP Services (Required)
Before using Neat Design or ahooks, **must** query MCP services:
- `mcp_neat-design-m_get_component_document` - Get component API
- `mcp_ahooks_get_hook_info` - Get hook documentation

See `.github/instructions/01-mcp.neat.instructions.md` for detailed MCP workflow.
