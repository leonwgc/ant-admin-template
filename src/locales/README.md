# 多语言（i18n）使用指南

## 📖 概述

本项目采用模块化的多语言组织方式，每个页面/模块可以定义自己的翻译文件，最终汇总到统一的语言资源中。通过命名空间机制避免翻译键的冲突。

## 📁 目录结构

```
src/
├── locales/
│   ├── index.ts          # 导出所有语言资源
│   ├── en.ts             # 英文翻译汇总
│   ├── zh.ts             # 中文翻译汇总
│   └── common/           # 公共翻译（全局使用）
│       ├── en.ts         # 公共英文翻译
│       └── zh.ts         # 公共中文翻译
└── pages/
    └── User/
        ├── Users.tsx
        └── locales/      # User 页面专属翻译
            ├── en.ts
            └── zh.ts
```

## 🎯 命名空间规则

### 1. 公共模块（Common Module）

**位置**: `src/locales/common/`
**命名空间**: 无（直接在根层级）
**用途**: 存放全局通用的翻译，如菜单、通用操作按钮等

**访问方式**:
```typescript
t('switchLanguage')       // 切换语言
t('menu.users')           // 菜单：用户
t('hotel.checkIn')        // 酒店：入住
```

### 2. 页面模块（Page Module）

**位置**: `src/pages/[PageName]/locales/`
**命名空间**: `pages.[pageName].[subModule]`
**用途**: 存放页面专属的翻译

**访问方式**:
```typescript
t('pages.user.users.pageTitle')              // 页面标题
t('pages.user.users.columns.name')           // 表格列名
t('pages.user.users.actions.submit')         // 操作按钮
```

## 📝 创建新页面的翻译

### Step 1: 创建页面翻译文件

在页面目录下创建 `locales/` 文件夹，添加 `en.ts` 和 `zh.ts`：

```typescript
// src/pages/User/locales/en.ts
/**
 * @file pages/User/locales/en.ts
 * @author leon.wang
 */

export default {
  users: {
    pageTitle: 'Users',
    columns: {
      name: 'Name',
      age: 'Age',
    },
    actions: {
      submit: 'Submit',
      reset: 'Reset',
    },
  },
  addUser: {
    pageTitle: 'Add User',
  },
};
```

```typescript
// src/pages/User/locales/zh.ts
/**
 * @file pages/User/locales/zh.ts
 * @author leon.wang
 */

export default {
  users: {
    pageTitle: '用户列表',
    columns: {
      name: '姓名',
      age: '年龄',
    },
    actions: {
      submit: '提交',
      reset: '重置',
    },
  },
  addUser: {
    pageTitle: '添加用户',
  },
};
```

### Step 2: 导入到主翻译文件

在 `src/locales/en.ts` 和 `src/locales/zh.ts` 中导入并注册：

```typescript
// src/locales/en.ts
import commonEn from './common/en';
import userEn from '../pages/User/locales/en';

const en = {
  ...commonEn,
  pages: {
    user: userEn,
  },
};

export default en;
```

```typescript
// src/locales/zh.ts
import commonZh from './common/zh';
import userZh from '../pages/User/locales/zh';

const zh = {
  ...commonZh,
  pages: {
    user: userZh,
  },
};

export default zh;
```

### Step 3: 在组件中使用

```typescript
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pages.user.users.pageTitle')}</h1>
      <Button>{t('pages.user.users.actions.submit')}</Button>
    </div>
  );
};
```

## 🔑 命名空间设计规则

### 全局公共翻译

放在 `locales/common/`，无命名空间前缀：

```typescript
// ✅ 推荐
t('switchLanguage')
t('menu.users')
t('hotel.checkIn')
t('guestInfo.nameLabel')

// ❌ 不推荐
t('common.switchLanguage')  // 不需要 common 前缀
```

### 页面专属翻译

使用 `pages.[模块名].[子模块]` 格式：

```typescript
// ✅ 推荐
t('pages.user.users.pageTitle')          // User/Users 页面
t('pages.user.addUser.submitButton')     // User/Add 页面
t('pages.order.list.columns.orderId')    // Order/List 页面

// ❌ 不推荐
t('users.pageTitle')                     // 缺少命名空间，易冲突
t('page.user.users.title')               // page 应为 pages（复数）
```

### 组件专属翻译

如果组件在多个页面使用，可以放在组件目录下：

```typescript
// src/components/ContactInfo/locales/en.ts
export default {
  emailLabel: 'Email',
  phoneLabel: 'Phone',
};

// 在主翻译文件中注册
const en = {
  ...commonEn,
  components: {
    contactInfo: contactInfoEn,
  },
};

// 使用
t('components.contactInfo.emailLabel')
```

## 🌐 命名空间层级建议

### 标准结构

```
pages.
  ├── user.
  │   ├── users.          # Users 列表页
  │   │   ├── pageTitle
  │   │   ├── columns.
  │   │   │   ├── name
  │   │   │   └── age
  │   │   ├── form.
  │   │   │   └── nameLabel
  │   │   ├── actions.
  │   │   │   ├── submit
  │   │   │   └── reset
  │   │   └── messages.
  │   │       └── deleteSuccess
  │   ├── addUser.        # Add User 页
  │   └── editUser.       # Edit User 页
  ├── order.
  │   ├── list.
  │   └── detail.
  └── dashboard.
      └── overview.
```

## 💡 最佳实践

### 1. 文件组织

```
✅ 推荐：每个页面一个 locales 文件夹
pages/User/
  ├── Users.tsx
  ├── Add.tsx
  ├── Edit.tsx
  └── locales/
      ├── en.ts
      └── zh.ts

❌ 不推荐：混在一起
pages/User/
  ├── Users.tsx
  ├── Add.tsx
  ├── Edit.tsx
  ├── users.en.ts
  ├── users.zh.ts
  ├── add.en.ts
  └── add.zh.ts
```

### 2. 键名设计

```typescript
// ✅ 清晰的层级结构
{
  users: {
    pageTitle: '...',
    columns: { ... },
    actions: { ... },
    messages: { ... },
  }
}

// ❌ 扁平化，不易维护
{
  usersPageTitle: '...',
  usersColumnName: '...',
  usersActionSubmit: '...',
}
```

### 3. 翻译键命名

```typescript
// ✅ 语义化命名
pageTitle, submitButton, deleteConfirm

// ❌ 含义不清
title1, btn2, msg3
```

### 4. 添加文件头注释

```typescript
/**
 * @file pages/User/locales/en.ts
 * @author leon.wang
 */

/**
 * User management pages translations (English)
 * Namespace: pages.user
 */
export default {
  // ...
};
```

## 📋 完整示例

### 创建 Order 订单页面的多语言

```typescript
// src/pages/Order/locales/en.ts
/**
 * @file pages/Order/locales/en.ts
 * @author leon.wang
 */

export default {
  list: {
    pageTitle: 'Order List',
    columns: {
      orderId: 'Order ID',
      amount: 'Amount',
      status: 'Status',
    },
    status: {
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
    },
  },
  detail: {
    pageTitle: 'Order Detail',
    basicInfo: 'Basic Information',
    paymentInfo: 'Payment Information',
  },
};
```

```typescript
// src/pages/Order/locales/zh.ts
/**
 * @file pages/Order/locales/zh.ts
 * @author leon.wang
 */

export default {
  list: {
    pageTitle: '订单列表',
    columns: {
      orderId: '订单号',
      amount: '金额',
      status: '状态',
    },
    status: {
      pending: '待处理',
      completed: '已完成',
      cancelled: '已取消',
    },
  },
  detail: {
    pageTitle: '订单详情',
    basicInfo: '基本信息',
    paymentInfo: '支付信息',
  },
};
```

```typescript
// src/locales/en.ts
import orderEn from '../pages/Order/locales/en';

const en = {
  ...commonEn,
  pages: {
    user: userEn,
    order: orderEn,  // 添加 order 模块
  },
};
```

```typescript
// src/pages/Order/List.tsx
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pages.order.list.pageTitle')}</h1>
      <Table
        columns={[
          {
            title: t('pages.order.list.columns.orderId'),
            dataIndex: 'orderId',
          },
          {
            title: t('pages.order.list.columns.status'),
            dataIndex: 'status',
            render: (status) => t(`pages.order.list.status.${status}`),
          },
        ]}
      />
    </div>
  );
};
```

## 🔄 迁移现有页面

如果你要迁移现有页面到新的多语言结构：

1. 在页面目录创建 `locales/en.ts` 和 `locales/zh.ts`
2. 将页面相关的翻译从 `src/locales/en.ts` 移动到页面 locales 文件
3. 在主翻译文件中导入并注册
4. 更新组件中的翻译键，添加命名空间前缀
5. 测试切换语言功能是否正常

## ❓ FAQ

**Q: 什么时候应该放在 common 模块？**
A: 在多个页面/模块都会使用的翻译，如菜单、通用按钮（确定、取消）、全局提示等。

**Q: 命名空间会不会太长？**
A: 虽然键名较长，但能有效避免冲突，且 IDE 会有自动补全，实际使用并不麻烦。

**Q: 可以使用变量拼接翻译键吗？**
A: 可以，例如: `t(\`pages.order.list.status.${status}\`)`

**Q: 如何处理带参数的翻译？**
A: 使用插值语法，例如: `'Found {{count}} items'` → `t('key', { count: 10 })`

---

## 🎉 总结

新的多语言组织方式具有以下优势：

1. ✅ **模块化**: 每个页面管理自己的翻译
2. ✅ **可扩展**: 新增页面只需添加 locales 文件夹
3. ✅ **无冲突**: 通过命名空间避免键名冲突
4. ✅ **易维护**: 翻译与页面代码在同一目录
5. ✅ **类型安全**: 可以为翻译键生成 TypeScript 类型

遵循本指南，可以让项目的多语言管理更加规范和高效！
