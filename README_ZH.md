<div align="center">
  <h1>Ant Admin Template</h1>
  <p>基于 React + TypeScript + Ant Design 的企业级后台管理模板</p>

  **[English](./README.md) | 简体中文**

  <p>
    <a href="#特性">特性</a> •
    <a href="#快速开始">快速开始</a> •
    <a href="#技术栈">技术栈</a> •
    <a href="#项目结构">项目结构</a> •
    <a href="#开发指南">开发指南</a>
  </p>
</div>

---

## 📖 项目简介

Ant Admin Template 是一个开箱即用的企业级后台管理系统模板，采用 React 18 + TypeScript 构建，基于 Ant Design 5.x 提供现代化的 UI 体验。项目内置**自动路由生成系统**、**国际化支持**、**权限管理**等核心功能，遵循最佳实践和代码规范，帮助您快速构建高质量的管理后台。

## ✨ 特性

### 核心特性
- 🚀 **自动路由生成** - 菜单配置驱动路由，无需手动维护，告别重复配置
- 🎨 **Ant Design UI** - 基于 Ant Design 5.x 的企业级组件库，提供更丰富的组件和样式
- 🌍 **国际化支持** - 集成 i18next，支持中英文切换，TypeScript 类型安全
- 🔐 **权限管理** - 完整的路由权限和操作权限控制体系
- 📱 **响应式布局** - 支持桌面端和移动端，自适应各种屏幕尺寸
- 🎯 **TypeScript** - 完整的类型定义，提供出色的开发体验
- ⚡ **性能优化** - 路由懒加载、代码分割、Web Vitals 监控
- 🛠️ **开发体验** - ESLint + Prettier，统一代码风格，提升团队协作效率

### 技术亮点
- **状态管理** - Zustand 5.x + zustand-kit，轻量级且易用
- **路由方案** - React Router 7.x，支持数据预加载
- **表单处理** - React Hook Form + antd-form-builder，高性能表单方案
- **请求封装** - Axios + ahooks，支持请求去重、错误处理
- **样式方案** - SCSS + BEM 命名规范，可维护的样式架构
- **构建工具** - 自定义构建脚本，支持多环境配置

## 🔧 技术栈

```json
{
  "核心框架": "React 18.3.1 + TypeScript",
  "UI组件库": "Ant Design 5.x",
  "状态管理": "Zustand 5.0.9 + zustand-kit",
  "路由方案": "React Router 7.7.1",
  "请求处理": "Axios 1.11.0",
  "Hooks库": "ahooks 3.9.0",
  "表单方案": "React Hook Form 7.71.1",
  "国际化": "i18next 25.3.2 + react-i18next 15.6.1",
  "样式方案": "SCSS + BEM",
  "构建工具": "自定义构建脚本"
}
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.x
- npm >= 8.x

### 安装

#### 方式一：克隆项目

```bash
# 克隆仓库
git clone --depth 1 https://github.com/leonwgc/ant-admin-template.git my-admin-project

# 进入项目目录
cd my-admin-project

# 删除 Git 记录（可选）
rm -rf .git

# 初始化新仓库（可选）
git init

# 安装依赖
npm install
```

#### 方式二：直接使用

```bash
# 克隆到本地
git clone https://github.com/leonwgc/ant-admin-template.git
cd ant-admin-template

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器（默认端口 3002）
npm start

# 访问 http://localhost:3002
```

### 构建

```bash
# 构建 QA 环境
npm run build:qa

# 构建 UAT 环境
npm run build:uat

# 构建生产环境
npm run build:prod
```

### 项目配置

配置文件位于 `build/env/` 目录：

- `config.qa.js` - QA 环境配置
- `config.uat.js` - UAT 环境配置
- `config.production.js` - 生产环境配置

## 📁 项目结构

```
ant-admin-template/
├── build/                      # 构建脚本
│   ├── env/                   # 环境配置
│   │   ├── config.qa.js
│   │   ├── config.uat.js
│   │   └── config.production.js
│   ├── config.js              # 构建配置
│   └── utils.js               # 构建工具
├── src/
│   ├── components/            # 通用组件
│   │   ├── ErrorBoundary/    # 错误边界
│   │   ├── GlobalSearch/     # 全局搜索
│   │   └── ...
│   ├── pages/                 # 页面组件
│   │   ├── User/             # 用户管理
│   │   ├── Form/             # 表单示例
│   │   └── ...
│   ├── layouts/               # 布局组件
│   │   ├── App.tsx           # 主布局
│   │   ├── Header.tsx        # 头部
│   │   ├── Sider.tsx         # 侧边栏
│   │   ├── Menus.tsx         # 菜单
│   │   └── RouteGuard.tsx    # 路由守卫
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useNavTo.tsx      # 路由导航
│   │   ├── useDsRequest.tsx  # 数据请求
│   │   ├── useDsTable.tsx    # 表格数据
│   │   └── ...
│   ├── locales/               # 国际化
│   │   ├── zh.ts             # 中文
│   │   ├── en.ts             # 英文
│   │   └── index.ts          # i18n 配置
│   ├── utils/                 # 工具函数
│   │   ├── routeGenerator.tsx # 路由生成器
│   │   ├── errorMonitor.ts   # 错误监控
│   │   └── ...
│   ├── scss/                  # 全局样式
│   ├── config.menu.tsx        # 菜单配置（路由来源）
│   ├── config.route.ts        # 路由配置（自动生成）
│   ├── config.operations.ts   # 操作权限配置
│   ├── RouteConfig.tsx        # 路由配置（自动生成）
│   ├── store.ts               # 全局状态
│   ├── req.ts                 # 请求封装
│   ├── i18n.ts                # i18n 初始化
│   └── App.tsx                # 应用入口
├── .github/
│   └── instructions/          # 开发规范文档
│       ├── 00-dev.instructions.md
│       ├── 01-mcp.neat.instructions.md
│       └── 02-mcp.ant.instructions.md
├── pack.js                    # 开发服务器
├── build.js                   # 构建脚本
└── package.json
```

## 📝 开发指南

### 添加新页面（3 步完成）

#### 第 1 步：创建页面组件

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
      <h2>产品列表</h2>
      <Table />
    </div>
  );
};

export default ProductList;  // 必须使用 default export
```

创建样式文件：

```scss
/**
 * @file pages/Product/ProductList.scss
 * @author leon.wang
 */
@import 'scss/common.scss';  // 必须导入

.product-list {
  padding: 20px;

  &__header {
    margin-bottom: 16px;
  }
}
```

#### 第 2 步：配置菜单（路由来源）

在 `src/config.menu.tsx` 中添加菜单项：

```tsx
import { ShopOutlined } from '@ant-design/icons';  // 菜单图标

{
  key: 'product',
  get label() { return t('menu.products'); },  // 使用 getter 支持动态翻译
  icon: <ShopOutlined />,
  permissions: [],
  children: [
    {
      key: 'product-list',
      get label() { return t('menu.productList'); },
      route: '/app/products',        // 定义路由路径
      permissions: [],
    },
    {
      key: 'product-detail',
      get label() { return t('menu.productDetail'); },
      route: '/app/products/:id',
      hidden: true,  // 不在菜单显示，但路由存在
    },
  ],
}
```

#### 第 3 步：注册组件映射

在 `src/utils/routeGenerator.tsx` 中添加：

```tsx
export const routeComponentMap: RouteComponentMap = {
  // ...existing routes
  '/app/products': lazyLoad('pages/Product/ProductList'),
  '/app/products/:id': lazyLoad('pages/Product/ProductDetail'),
};
```

**完成！** 路由自动生成，无需手动配置 `RouteConfig.tsx`。

### 菜单配置说明

```tsx
interface MenuItem {
  key: string;                          // 菜单唯一标识
  label: string | { (): string };       // 菜单文本（使用 getter 支持动态翻译）
  route?: string;                       // 路由路径（必须以 /app/ 开头）
  icon?: ReactNode;                     // 菜单图标（@ant-design/icons）
  permissions?: string[];               // 权限列表
  hidden?: boolean;                     // true: 路由存在但菜单隐藏
  children?: MenuItem[];                // 子菜单
}
```

### 国际化配置

#### 添加新翻译

1. **创建翻译文件**

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

2. **导入翻译**

```typescript
// src/locales/zh.ts
import productZh from './pages/product/zh';

const zh = {
  ...commonZh,
  pages: {
    user: userZh,
    product: productZh,  // ← 添加
  },
};
```

3. **注册命名空间**

```typescript
// src/locales/index.ts
export const resources = {
  zh: {
    common: zh,
    'pages.product': zh.pages.product,  // ← 注册命名空间
  },
} as const;  // ← as const 确保 TypeScript 类型推断
```

4. **在组件中使用**

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

### 状态管理

#### 全局状态（Zustand）

```tsx
import { useAppStore } from '~/store';

// 读取状态
const language = useAppStore((state) => state.language);
const operations = useAppStore((state) => state.operations);

// 更新状态
const { setLanguage, setOperations } = useAppStore();
setLanguage('en');
```

**使用场景**：语言设置、权限信息、主题配置、用户信息等跨页面数据

#### 局部状态

使用 `useState` 或 ahooks 管理：表单输入、表格数据、弹窗状态等页面级数据

### 代码规范

#### 文件头注释（必须）

```typescript
/**
 * @file relative/path/from/src
 * @author leon.wang
 */
```

#### 导入顺序

```typescript
// 1. React 核心
import React, { FC, useState } from 'react';

// 2. 第三方库
import { Button, Table } from '@derbysoft/neat-design';
import { useRequest } from 'ahooks';

// 3. 项目模块
import { useNavTo } from '~/hooks/useNavTo';
import req from '~/req';

// 4. 样式（最后）
import './Component.scss';
```

#### 组件开发

```tsx
export interface ComponentProps {
  /** Prop 描述 */
  title?: string;
  /** 回调函数 */
  onSubmit?: (data: any) => void;
}

/**
 * 组件功能描述（使用英文）
 * Used for displaying product information
 */
export const Component: FC<ComponentProps> = ({ title, onSubmit }) => {
  return <div>{title}</div>;
};

export default Component;  // 同时导出命名和默认导出
```

#### UI 组件使用

```tsx
// ✅ 正确
import { Button, Form, Input } from '@derbysoft/neat-design';
import { EmailOutlined } from '@derbysoft/neat-design-icons';

// ❌ 错误
import { Button } from 'antd';
import { EmailOutlined } from '@ant-design/icons';
```

**规则：**
- 菜单图标：`@ant-design/icons`
- 页面图标：`@derbysoft/neat-design-icons`
- UI 组件：`@derbysoft/neat-design`（禁止直接使用 antd）

#### SCSS 规范

```scss
/**
 * @file components/ContactInfo/ContactInfo.scss
 * @author leon.wang
 */
@import 'scss/common.scss';  // ✅ 必须导入

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

### 路径别名

```typescript
"~/*"          → "src/*"
"scss/*"       → "src/scss/*"
"components/*" → "src/components/*"
```

使用示例：

```tsx
import { useNavTo } from '~/hooks/useNavTo';
import { ContactInfo } from 'components/ContactInfo';
import 'scss/common.scss';
```

## 🎯 核心功能

### 自动路由生成系统

项目采用**菜单驱动路由**的设计理念，路由配置从菜单自动生成：

```
config.menu.tsx → routeGenerator.tsx → RouteConfig.tsx → RouteGuard.tsx
  (菜单配置)         (组件映射)          (自动路由)        (权限守卫)
```

**优势：**
- 📌 单一数据源：菜单配置驱动路由和导航
- 📌 无重复维护：路由只定义一次
- 📌 类型安全：完整的 TypeScript 类型支持
- 📌 权限集成：路由自动继承菜单权限

详细文档：[src/utils/README.md](src/utils/README.md)

### 权限管理

#### 路由权限

```tsx
{
  key: 'admin-panel',
  label: 'Admin Panel',
  route: '/app/admin',
  permissions: ['admin', 'superuser'],  // 只有这些权限的用户能访问
}
```

#### 操作权限

```tsx
import { useAppStore } from '~/store';

const operations = useAppStore((state) => state.operations);
const canDelete = operations.includes('user:delete');

{canDelete && <Button>删除</Button>}
```

### 错误监控

项目集成了完整的错误监控系统：

- **错误边界** - 捕获组件渲染错误
- **全局错误处理** - 捕获未处理的错误和 Promise 拒绝
- **错误上报** - 自动上报到后端
- **性能监控** - Web Vitals 性能指标收集

详细文档：[ERROR_MONITOR.md](ERROR_MONITOR.md)

### 性能优化

- ✅ 路由懒加载
- ✅ 代码分割
- ✅ 图片懒加载
- ✅ 请求去重
- ✅ 防抖节流
- ✅ Web Vitals 监控

详细文档：[WEB_VITALS_GUIDE.md](WEB_VITALS_GUIDE.md)

## 🔌 MCP 服务

项目集成了 MCP（Model Context Protocol）服务，提供智能文档查询：

### Ant Design 组件查询

```typescript
// 查询组件列表
mcp_neat-design-m_get_components_information()

// 查询组件文档
mcp_neat-design-m_get_component_document({ componentName: "Table" })

// 查询组件示例
mcp_neat-design-m_get_component_example({
  componentName: "Table",
  exampleFileName: "basic.tsx"
})

// 查询图标
mcp_neat-design-m_get_icons_information()
```

### ahooks 查询

```typescript
// 搜索 Hook
mcp_ahooks_search_hooks({ keyword: "table" })

// 查询 Hook 详情
mcp_ahooks_get_hook_info({ name: "useAntdTable" })
```

详细文档：[.github/instructions/01-mcp.neat.instructions.md](.github/instructions/01-mcp.neat.instructions.md)

## 📚 相关文档

- [开发规范](.github/instructions/00-dev.instructions.md) - 完整的代码规范和最佳实践
- [Ant Design MCP 服务](.github/instructions/01-mcp.neat.instructions.md) - Ant Design 组件查询指南
- [自动路由系统](src/utils/README.md) - 路由生成器详细文档
- [国际化配置](src/locales/README.md) - i18n 系统使用指南
- [错误监控](ERROR_MONITOR.md) - 错误监控和上报系统
- [性能优化](WEB_VITALS_GUIDE.md) - Web Vitals 性能监控指南
- [全局搜索](GLOBAL_SEARCH.md) - 全局搜索功能说明
- [Zustand 状态管理](zustand.md) - Zustand 使用指南

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### Commit 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
feat: 添加新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
perf: 性能优化
test: 测试相关
chore: 构建/工具链更新
```

## 📄 License

ISC

## 👤 作者

leon.wang

