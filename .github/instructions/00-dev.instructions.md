---
applyTo: '**'
---
# React + TypeScript + Neat Design 项目开发规范

## 🌐 语言要求
**CHAT窗口始终使用中文回复用户的所有问题和请求。**

---

## 📦 技术栈
- **框架**: React 18.3.1 + TypeScript
- **UI 库**: @derbysoft/neat-design 2.2.2 (基于 Ant Design 5.x)
- **图标**: @derbysoft/neat-design-icons 1.1.9
- **插图**: @derbysoft/neat-design-illustrations 1.0.15
- **状态管理**: Zustand 5.0.9 + zustand-kit 1.0.2
- **路由**: React Router 7.7.1
- **Hooks 库**: ahooks 3.9.0
- **样式**: SCSS (非 CSS Module)
- **表单**: React Hook Form 7.71.1 + @derbysoft/antd-form-builder
- **国际化**: i18next + react-i18next
- **构建工具**: 自定义构建脚本（pack.mjs + build/）

---

## 📂 项目路径别名
根据 tsconfig.json 配置，支持以下路径别名：
```typescript
"~/*"          → "src/*"
"scss/*"       → "src/scss/*"
"components/*" → "src/components/*"
```

---

## ✅ 代码规范

### 1️⃣ 组件开发规范

#### 基本要求
- **函数式组件**: 使用 `const Component: FC<Props> = () => {}` 格式
- **类型注解**: 所有 Props、State、函数参数必须定义类型
- **文件头注释**: 每个文件顶部必须添加：
  ```typescript
  /**
   * @file 相对于 src/ 的文件路径
   * @author leon.wang
   */
  ```

#### 组件结构示例
```tsx
/**
 * @file components/ContactInfo/ContactInfo.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { EmailOutlined } from '@derbysoft/neat-design-icons';
import './ContactInfo.scss';

export interface ContactInfoProps {
  /** Email address */
  email?: string;
  /** Phone number */
  phone?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Contact information component
 * Used to display email and phone contact information
 */
export const ContactInfo: FC<ContactInfoProps> = ({
  email,
  phone,
  className = '',
}) => {
  return (
    <div className={`contact-info ${className}`}>
      {/* Component content */}
    </div>
  );
};
```

### 2️⃣ 样式规范

#### SCSS 文件要求
- **位置**: 与组件文件同目录
- **命名**: 与组件同名（如 `ContactInfo.tsx` → `ContactInfo.scss`）
- **导入**: 文件头必须添加 `@import 'scss/common.scss';`
- **BEM 命名**: 使用 BEM 规范（Block__Element--Modifier）
- **className**: 使用双引号

#### SCSS 示例
```scss
/**
 * @file components/ContactInfo/ContactInfo.scss
 * @author leon.wang
 */
@import 'scss/common.scss';

.contact-info {
  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__icon {
    color: #647075;
    flex-shrink: 0;
  }
}
```

### 3️⃣ 导入顺序
严格遵循以下顺序（用空行分隔）：
```typescript
// 1. React 核心
import React, { FC, useState } from 'react';

// 2. 第三方库
import { Button, Form } from '@derbysoft/neat-design';
import { useRequest } from 'ahooks';

// 3. 项目内模块
import { useNavTo } from '~/hooks/useNavTo';
import { ContactInfo } from 'components/ContactInfo';

// 4. 样式文件
import './Component.scss';
```

### 4️⃣ UI 组件使用

#### 强制使用 Neat Design
- **禁止**: 直接从 `antd` 导入组件
- **必须**: 从 `@derbysoft/neat-design` 导入
- **图标**: 从 `@derbysoft/neat-design-icons` 导入
- **插图**: 从 `@derbysoft/neat-design-illustrations` 导入

```typescript
// ✅ 正确
import { Button, Form, Input } from '@derbysoft/neat-design';
import { EmailOutlined } from '@derbysoft/neat-design-icons';

// ❌ 错误
import { Button } from 'antd';
import { EmailOutlined } from '@ant-design/icons';
```

### 5️⃣ Hooks 使用优先级

1. **ahooks 优先**: 优先使用 ahooks 提供的 Hooks
2. **项目自定义 Hooks**: 位于 `~/hooks/` 目录
   - `useNavTo` - 路由导航
   - `useDsRequest` - 数据请求
   - `useDsTable` - 表格数据管理
   - `useFormField` - 表单字段
   - `useGlobalState` - 全局状态
   - `useCountdown` - 倒计时
   - 等

### 6️⃣ ESLint & Prettier 规则
- **引号**: 单引号
- **分号**: 必须添加
- **缩进**: 2 空格
- **换行符**: LF (Unix)
- **尾随逗号**: ES5 标准
- **括号间距**: 对象字面量需要空格 `{ foo: bar }`

---

## 🚀 快速开发工作流

### 创建新组件时
1. 确定组件位置：`src/components/` 或 `src/pages/`
2. 创建组件文件：`ComponentName.tsx`
3. 自动创建样式文件：`ComponentName.scss`（添加 `@import 'scss/common.scss';`）
4. 创建索引文件：`index.ts`（导出组件）
5. 添加文件头注释（`@file` 和 `@author`）

### 使用 Neat Design 组件时
1. **必须先查询 MCP 服务**（详见 01-mcp.neat.instructions.md）
2. 获取组件文档和示例
3. 参考示例代码进行开发

### 使用 ahooks 时
1. **必须先查询 MCP 服务**（详见 01-mcp.neat.instructions.md）
2. 了解 Hook 参数和返回值
3. 参考使用示例

---

## 📋 注释规范

### JSDoc 注释
- **组件**: 添加组件用途描述
- **Props**: 使用 `/** 描述 */` 格式
- **复杂函数**: 添加功能说明和参数描述
- **语言**: 所有注释使用英文

### 示例
```typescript
/**
 * User contact card component
 * Displays user avatar, name, email and other contact information
 */
export const UserContactCard: FC<UserContactCardProps> = ({ user }) => {
  // ...
};
```

---

## ⚠️ 重要注意事项

1. **MCP 服务强制使用**: 使用 Neat Design 组件前必须调用 MCP 服务获取文档
2. **不使用 CSS Module**: SCSS 文件不需要 `.module.scss` 后缀
3. **路由配置**: 参考 `config.route.ts` 和 `RouteConfig.tsx`
4. **菜单配置**: 参考 `config.menu.tsx`
5. **全局状态**: 使用 Zustand，参考 `store.ts`
6. **请求封装**: 使用 `req.ts` 封装的 axios 实例
7. **国际化**: 使用 i18next，配置文件在 `locales/`

---
