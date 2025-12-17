## 项目简介

ant admin template 是一个基于 React + TypeScript 的后台管理项目，采用 Ant Design v5 作为 UI 组件库，遵循高可维护性和可扩展性设计原则。

## 技术栈

- React 18
- TypeScript
- Ant Design v5
- SCSS
- Zustand
- react-router v7
- i18next

## 快速开始

### 方式一：使用现有项目

1. 安装依赖

    ```bash
    npm install
    ```

2. 启动开发服务器

    ```bash
    npm start
    ```

3. 构建生产包

    ```bash
    npm run build
    ```

### 方式二：使用模板创建新项目

使用提供的脚本快速创建新项目：

```bash
git clone --depth 1 git@github.com:leonwgc/ant-admin-template.git my-new-project
cd my-new-project
rm -rf .git
git init
npm install
```

## 代码规范

- 所有组件均使用 TypeScript 的类型系统，Props 和 State 必须定义接口或类型别名。
- 组件文件和样式文件需添加头部注释，遵循 BEM 命名规范。
- 使用 `useCallback` 和 `useMemo` 优化性能，副作用统一在 `useEffect` 中处理。
- UI 组件统一使用 Ant Design v5。

## 如何添加新菜单和页面

### 1. 创建页面组件

在 `src/pages/` 目录下创建新页面组件：

```tsx
// src/pages/YourFeature/YourPage.tsx
/**
 * @file src/pages/YourFeature/YourPage.tsx
 * @author your.name
 */

import React from 'react';
import { Card } from 'antd';
import './YourPage.scss';

const YourPage: React.FC = () => {
  return (
    <div className="your-page">
      <h2>Your Page Title</h2>
      <Card>
        {/* Your content */}
      </Card>
    </div>
  );
};

export default YourPage;
```

创建对应的样式文件：

```scss
// src/pages/YourFeature/YourPage.scss
/**
 * @file src/pages/YourFeature/YourPage.scss
 * @author your.name
 */

@import 'scss/common.scss';

.your-page {
  padding: 24px;

  // Your styles
}
```

### 2. 配置菜单

在 `src/config.menu.tsx` 中添加菜单项：

```tsx
export const menus: MenuItem[] = [
  // ... 其他菜单
  {
    key: 'your-feature',
    label: 'Your Feature',
    icon: <AppstoreOutlined />,
    permissions: [],
    children: [
      {
        key: 'your-page',
        label: 'Your Page',
        route: '/app/your-feature/your-page',
        permissions: [],
      },
    ],
  },
];
```

### 3. 配置路由

在 `src/utils/routeGenerator.tsx` 的 `routeComponentMap` 中添加路由映射：

```tsx
export const routeComponentMap: RouteComponentMap = {
  // ... 其他路由
  '/app/your-feature/your-page': lazyLoad('pages/YourFeature/YourPage'),
};
```

### 4. 完成

重启开发服务器后，新菜单和页面即可访问。路由会自动根据菜单配置生成。

### 菜单配置说明

```tsx
{
  key: 'unique-key',           // 唯一标识
  label: 'Display Name',       // 显示名称
  icon: <IconComponent />,     // 图标（可选）
  route: '/app/path',          // 路由路径
  permissions: ['admin'],      // 权限要求（可选）
  hidden: true,                // 隐藏菜单但保留路由（可选）
  children: [],                // 子菜单（可选）
}
```

### 示例：添加一个设置页面

```tsx
// 1. 创建组件: src/pages/Settings/Settings.tsx
// 2. 创建样式: src/pages/Settings/Settings.scss

// 3. 配置菜单 (src/config.menu.tsx)
{
  key: 'settings',
  label: 'Settings',
  icon: <SettingOutlined />,
  route: '/app/settings',
  permissions: [],
}

// 4. 配置路由 (src/utils/routeGenerator.tsx)
'/app/settings': lazyLoad('pages/Settings/Settings'),
```

## Commit 规范

- 格式：`feat: 添加新功能`、`fix: 修复问题` 等，保持简洁明了。

## 联系方式

如有问题或建议，请联系
