<div align="center">
  <h1>Ant Admin Template</h1>
  <p>Enterprise-level Admin Template based on React + TypeScript + Ant Design</p>

  **English | [简体中文](./README.md)**

  <p>
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#development-guide">Development Guide</a>
  </p>
</div>

---

## 📖 Introduction

Ant Admin Template is a production-ready enterprise admin system template built with React 18 + TypeScript, based on Ant Design 5.x for modern UI experience. The project features **automatic route generation**, **i18n support**, **permission management**, and follows best practices to help you build high-quality admin dashboards quickly.

## ✨ Features

### Core Features
- 🚀 **Automatic Route Generation** - Menu-driven routing, no manual maintenance needed
- 🎨 **Ant Design UI** - Enterprise-level component library based on Ant Design 5.x
- 🌍 **Internationalization** - Built-in i18next, supports Chinese/English with TypeScript safety
- 🔐 **Permission Management** - Complete route and operation permission control
- 📱 **Responsive Layout** - Supports desktop and mobile devices
- 🎯 **TypeScript** - Full type definitions for excellent DX
- ⚡ **Performance Optimized** - Route lazy loading, code splitting, Web Vitals monitoring
- 🛠️ **Developer Experience** - ESLint + Prettier for consistent code style

### Technical Highlights
- **State Management** - Zustand 5.x + zustand-kit, lightweight and easy to use
- **Routing** - React Router 7.x with data preloading support
- **Form Handling** - React Hook Form + antd-form-builder, high-performance forms
- **Request Handling** - Axios + ahooks, request deduplication and error handling
- **Styling** - SCSS + BEM naming convention, maintainable style architecture
- **Build Tools** - Custom build scripts with multi-environment support

## 🔧 Tech Stack

```json
{
  "Core Framework": "React 18.3.1 + TypeScript",
  "UI Library": "Ant Design 5.x",
  "State Management": "Zustand 5.0.9 + zustand-kit",
  "Routing": "React Router 7.7.1",
  "HTTP Client": "Axios 1.11.0",
  "Hooks Library": "ahooks 3.9.0",
  "Form Solution": "React Hook Form 7.71.1",
  "i18n": "i18next 25.3.2 + react-i18next 15.6.1",
  "Styling": "SCSS + BEM",
  "Build Tools": "Custom Build Scripts"
}
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Installation

#### Option 1: Clone the Repository

```bash
# Clone repository
git clone --depth 1 https://github.com/leonwgc/ant-admin-template.git my-admin-project

# Enter directory
cd my-admin-project

# Remove Git history (optional)
rm -rf .git

# Initialize new repository (optional)
git init

# Install dependencies
npm install
```

#### Option 2: Direct Use

```bash
# Clone to local
git clone https://github.com/leonwgc/ant-admin-template.git
cd ant-admin-template

# Install dependencies
npm install
```

### Development

```bash
# Start dev server (default port 3002)
npm start

# Visit http://localhost:3002
```

### Build

```bash
# Build for QA environment
npm run build:qa

# Build for UAT environment
npm run build:uat

# Build for production
npm run build:prod
```

### Configuration

Configuration files are located in `build/env/`:

- `config.qa.js` - QA environment config
- `config.uat.js` - UAT environment config
- `config.production.js` - Production environment config

## 📁 Project Structure

```
ant-admin-template/
├── build/                      # Build scripts
│   ├── env/                   # Environment configs
│   │   ├── config.qa.js
│   │   ├── config.uat.js
│   │   └── config.production.js
│   ├── config.js              # Build configuration
│   └── utils.js               # Build utilities
├── src/
│   ├── components/            # Shared components
│   │   ├── ErrorBoundary/    # Error boundary
│   │   ├── GlobalSearch/     # Global search
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── User/             # User management
│   │   ├── Form/             # Form examples
│   │   └── ...
│   ├── layouts/               # Layout components
│   │   ├── App.tsx           # Main layout
│   │   ├── Header.tsx        # Header
│   │   ├── Sider.tsx         # Sidebar
│   │   ├── Menus.tsx         # Menu
│   │   └── RouteGuard.tsx    # Route guard
│   ├── hooks/                 # Custom hooks
│   │   ├── useNavTo.tsx      # Navigation hook
│   │   ├── useDsRequest.tsx  # Data request hook
│   │   ├── useDsTable.tsx    # Table data hook
│   │   └── ...
│   ├── locales/               # Internationalization
│   │   ├── zh.ts             # Chinese
│   │   ├── en.ts             # English
│   │   └── index.ts          # i18n config
│   ├── utils/                 # Utilities
│   │   ├── routeGenerator.tsx # Route generator
│   │   ├── errorMonitor.ts   # Error monitor
│   │   └── ...
│   ├── scss/                  # Global styles
│   ├── config.menu.tsx        # Menu config (route source)
│   ├── config.route.ts        # Route config (auto-generated)
│   ├── config.operations.ts   # Operation permissions
│   ├── RouteConfig.tsx        # Route configuration (auto-generated)
│   ├── store.ts               # Global state
│   ├── req.ts                 # Request wrapper
│   ├── i18n.ts                # i18n initialization
│   └── App.tsx                # App entry
├── .github/
│   └── instructions/          # Development standards
│       ├── 00-dev.instructions.md
│       ├── 01-mcp.neat.instructions.md
│       └── 02-mcp.ant.instructions.md
├── pack.js                    # Dev server
├── build.js                   # Build script
└── package.json
```

## 📝 Development Guide

### Adding New Pages (3 Steps)

#### Step 1: Create Page Component

```tsx
/**
 * @file pages/Product/ProductList.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { Button, Table } from '@derbysoft/neat-design';
import './ProductList.scss';

const ProductList: FC = () => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <Table />
    </div>
  );
};

export default ProductList;  // Must use default export
```

Create style file:

```scss
/**
 * @file pages/Product/ProductList.scss
 * @author leon.wang
 */
@import 'scss/common.scss';  // Must import

.product-list {
  padding: 20px;

  &__header {
    margin-bottom: 16px;
  }
}
```

#### Step 2: Configure Menu (Route Source)

Add menu item in `src/config.menu.tsx`:

```tsx
import { ShopOutlined } from '@ant-design/icons';  // Menu icons

{
  key: 'product',
  get label() { return t('menu.products'); },  // Use getter for dynamic translation
  icon: <ShopOutlined />,
  permissions: [],
  children: [
    {
      key: 'product-list',
      get label() { return t('menu.productList'); },
      route: '/app/products',        // Define route path
      permissions: [],
    },
    {
      key: 'product-detail',
      get label() { return t('menu.productDetail'); },
      route: '/app/products/:id',
      hidden: true,  // Hidden from menu, but route exists
    },
  ],
}
```

#### Step 3: Register Component Mapping

Add in `src/utils/routeGenerator.tsx`:

```tsx
export const routeComponentMap: RouteComponentMap = {
  // ...existing routes
  '/app/products': lazyLoad('pages/Product/ProductList'),
  '/app/products/:id': lazyLoad('pages/Product/ProductDetail'),
};
```

**Done!** Routes are auto-generated, no need to manually edit `RouteConfig.tsx`.

### Menu Configuration

```tsx
interface MenuItem {
  key: string;                          // Unique identifier
  label: string | { (): string };       // Menu text (use getter for dynamic translation)
  route?: string;                       // Route path (must start with /app/)
  icon?: ReactNode;                     // Menu icon (@ant-design/icons)
  permissions?: string[];               // Permission list
  hidden?: boolean;                     // true: route exists but menu hidden
  children?: MenuItem[];                // Sub-menus
}
```

### Internationalization

#### Adding New Translations

1. **Create translation files**

```typescript
// src/locales/pages/product/zh.ts
export default {
  productTitle: '产品列表',
  productColName: '产品名称',
  productBtnAdd: '添加产品',
};

// src/locales/pages/product/en.ts
export default {
  productTitle: 'Product List',
  productColName: 'Product Name',
  productBtnAdd: 'Add Product',
};
```

2. **Import translations**

```typescript
// src/locales/zh.ts
import productZh from './pages/product/zh';

const zh = {
  ...commonZh,
  pages: {
    user: userZh,
    product: productZh,  // ← Add
  },
};
```

3. **Register namespace**

```typescript
// src/locales/index.ts
export const resources = {
  zh: {
    common: zh,
    'pages.product': zh.pages.product,  // ← Register namespace
  },
} as const;  // ← as const for TypeScript type inference
```

4. **Use in component**

```tsx
import { useTranslation } from 'react-i18next';

const ProductPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pages.product:productTitle')}</h1>
      <Button>{t('pages.product:productBtnAdd')}</Button>
    </div>
  );
};
```

### State Management

#### Global State (Zustand)

```tsx
import { useAppStore } from '~/store';

// Read state
const language = useAppStore((state) => state.language);
const operations = useAppStore((state) => state.operations);

// Update state
const { setLanguage, setOperations } = useAppStore();
setLanguage('en');
```

**Use cases**: Language settings, permissions, theme config, user info (cross-page data)

#### Local State

Use `useState` or ahooks for: form inputs, table data, modals, page-specific data

### Code Standards

#### File Header (Required)

```typescript
/**
 * @file relative/path/from/src
 * @author leon.wang
 */
```

#### Import Order

```typescript
// 1. React core
import React, { FC, useState } from 'react';

// 2. Third-party libraries
import { Button, Table } from '@derbysoft/neat-design';
import { useRequest } from 'ahooks';

// 3. Project modules
import { useNavTo } from '~/hooks/useNavTo';
import req from '~/req';

// 4. Styles (last)
import './Component.scss';
```

#### Component Development

```tsx
export interface ComponentProps {
  /** Prop description */
  title?: string;
  /** Callback function */
  onSubmit?: (data: any) => void;
}

/**
 * Component description (use English)
 * Used for displaying product information
 */
export const Component: FC<ComponentProps> = ({ title, onSubmit }) => {
  return <div>{title}</div>;
};

export default Component;  // Export both named and default
```

#### UI Component Usage

```tsx
// ✅ Correct
import { Button, Form, Input } from '@derbysoft/neat-design';
import { EmailOutlined } from '@derbysoft/neat-design-icons';

// ❌ Wrong
import { Button } from 'antd';
import { EmailOutlined } from '@ant-design/icons';
```

**Rules:**
- Menu icons: `@ant-design/icons`
- Page icons: `@derbysoft/neat-design-icons`
- UI components: `@derbysoft/neat-design` (DO NOT use antd directly)

#### SCSS Standards

```scss
/**
 * @file components/ContactInfo/ContactInfo.scss
 * @author leon.wang
 */
@import 'scss/common.scss';  // ✅ Must import

.contact-info {
  padding: 16px;

  &__item {           // BEM Element
    display: flex;
  }

  &--active {         // BEM Modifier
    background: #f0f0f0;
  }
}
```

### Path Aliases

```typescript
"~/*"          → "src/*"
"scss/*"       → "src/scss/*"
"components/*" → "src/components/*"
```

Usage example:

```tsx
import { useNavTo } from '~/hooks/useNavTo';
import { ContactInfo } from 'components/ContactInfo';
import 'scss/common.scss';
```

## 🎯 Core Features

### Automatic Route Generation

The project adopts a **menu-driven routing** design philosophy:

```
config.menu.tsx → routeGenerator.tsx → RouteConfig.tsx → RouteGuard.tsx
  (Menu Config)     (Component Map)      (Auto Routes)     (Guard)
```

**Advantages:**
- 📌 Single source of truth: Menu config drives routes and navigation
- 📌 No duplication: Routes defined only once
- 📌 Type safety: Full TypeScript type support
- 📌 Permission integration: Routes automatically inherit menu permissions

Detailed docs: [src/utils/README.md](src/utils/README.md)

### Permission Management

#### Route Permissions

```tsx
{
  key: 'admin-panel',
  label: 'Admin Panel',
  route: '/app/admin',
  permissions: ['admin', 'superuser'],  // Only these users can access
}
```

#### Operation Permissions

```tsx
import { useAppStore } from '~/store';

const operations = useAppStore((state) => state.operations);
const canDelete = operations.includes('user:delete');

{canDelete && <Button>Delete</Button>}
```

### Error Monitoring

Complete error monitoring system:

- **Error Boundary** - Catch component rendering errors
- **Global Error Handler** - Catch unhandled errors and promise rejections
- **Error Reporting** - Auto report to backend
- **Performance Monitoring** - Web Vitals metrics collection

Detailed docs: [ERROR_MONITOR.md](ERROR_MONITOR.md)

### Performance Optimization

- ✅ Route lazy loading
- ✅ Code splitting
- ✅ Image lazy loading
- ✅ Request deduplication
- ✅ Debounce/throttle
- ✅ Web Vitals monitoring

Detailed docs: [WEB_VITALS_GUIDE.md](WEB_VITALS_GUIDE.md)

## 📚 Documentation

- [Development Standards](.github/instructions/00-dev.instructions.md) - Complete code standards and best practices
- [Ant Design MCP Services](.github/instructions/01-mcp.neat.instructions.md) - Ant Design component query guide
- [Automatic Routing](src/utils/README.md) - Route generator detailed docs
- [Internationalization](src/locales/README.md) - i18n system usage guide
- [Error Monitoring](ERROR_MONITOR.md) - Error monitoring and reporting system
- [Performance Optimization](WEB_VITALS_GUIDE.md) - Web Vitals monitoring guide
- [Global Search](GLOBAL_SEARCH.md) - Global search functionality
- [Zustand State Management](zustand.md) - Zustand usage guide

## 🤝 Contributing

Issues and Pull Requests are welcome!

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code formatting
refactor: Code refactoring
perf: Performance optimization
test: Testing related
chore: Build/toolchain updates
```

## 📄 License

ISC

## 👤 Author

leon.wang
