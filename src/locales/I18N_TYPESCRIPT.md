# i18next TypeScript 智能提示配置说明

## 概述

项目已配置 i18next 的 TypeScript 类型支持，现在 `t` 函数支持：
- ✅ 键名智能提示（自动补全）
- ✅ 类型检查（错误的键名会报错）
- ✅ 命名空间支持
- ✅ 嵌套路径提示

## 使用示例

### 1. 默认命名空间（translation）

```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();

  // ✅ 智能提示所有 common 中的键
  return (
    <div>
      <h1>{t('appName')}</h1>
      <p>{t('welcome')}</p>
    </div>
  );
};
```

### 2. 使用命名空间

```tsx
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
  // 指定命名空间
  const { t } = useTranslation('pages.user');

  // ✅ 智能提示 pages.user 命名空间下的所有键
  return (
    <div>
      <h1>{t('usersTitle')}</h1>          {/* ✅ 自动提示 */}
      <span>{t('usersColName')}</span>     {/* ✅ 自动提示 */}
      <span>{t('usersColAge')}</span>      {/* ✅ 自动提示 */}
      <Button>{t('usersBtnSubmit')}</Button> {/* ✅ 自动提示 */}
    </div>
  );
};
```

### 3. 多个命名空间

```tsx
const Component = () => {
  // 使用多个命名空间
  const { t } = useTranslation(['translation', 'pages.user']);

  return (
    <div>
      {/* 默认命名空间 */}
      <p>{t('appName')}</p>

      {/* 指定命名空间 */}
      <p>{t('usersTitle', { ns: 'pages.user' })}</p>
    </div>
  );
};
```

### 4. 带参数的翻译

```tsx
// 翻译文件定义：
// welcomeUser: '欢迎, {{name}}!'

const Component = () => {
  const { t } = useTranslation();

  return <p>{t('welcomeUser', { name: '张三' })}</p>;
  // 输出: 欢迎, 张三!
};
```

## 关键配置文件

### 1. src/i18next.d.ts
TypeScript 类型声明文件，扩展 i18next 模块：

```typescript
import 'i18next';
import { defaultNS, resources } from './locales';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['zh'];
    returnObjects: false;
    keySeparator: '.';
    nsSeparator: ':';
  }
}
```

### 2. src/locales/index.ts
导出 resources 和 defaultNS，并使用 `as const` 确保类型推断：

```typescript
export const defaultNS = 'translation';

export const resources = {
  en: {
    translation: en,
    'pages.user': en.pages.user,
  },
  zh: {
    translation: zh,
    'pages.user': zh.pages.user,
  },
} as const;  // ← 重要：as const 确保类型推断
```

## 添加新的翻译

### 1. 添加到现有命名空间

编辑 [src/locales/pages/user/zh.ts](src/locales/pages/user/zh.ts):

```typescript
export default {
  usersTitle: '用户列表',
  usersColName: '姓名',
  // 添加新键
  usersColStatus: '状态',  // ← 新增后自动支持智能提示
};
```

### 2. 创建新的命名空间

**步骤 1**: 创建翻译文件
```bash
mkdir -p src/locales/pages/product
```

**步骤 2**: 创建 [src/locales/pages/product/zh.ts](src/locales/pages/product/zh.ts)
```typescript
export default {
  productTitle: '产品列表',
  productColName: '产品名称',
  productColPrice: '价格',
};
```

**步骤 3**: 创建 [src/locales/pages/product/en.ts](src/locales/pages/product/en.ts)
```typescript
export default {
  productTitle: 'Product List',
  productColName: 'Product Name',
  productColPrice: 'Price',
};
```

**步骤 4**: 在 [src/locales/zh.ts](src/locales/zh.ts) 中导入
```typescript
import productZh from './pages/product/zh';

const zh = {
  ...commonZh,
  pages: {
    user: userZh,
    product: productZh,  // ← 添加
  },
};
```

**步骤 5**: 在 [src/locales/en.ts](src/locales/en.ts) 中导入
```typescript
import productEn from './pages/product/en';

const en = {
  ...commonEn,
  pages: {
    user: userEn,
    product: productEn,  // ← 添加
  },
};
```

**步骤 6**: 在 [src/locales/index.ts](src/locales/index.ts) 中注册命名空间
```typescript
export const resources = {
  en: {
    translation: en,
    'pages.user': en.pages.user,
    'pages.product': en.pages.product,  // ← 注册新命名空间
  },
  zh: {
    translation: zh,
    'pages.user': zh.pages.user,
    'pages.product': zh.pages.product,  // ← 注册新命名空间
  },
} as const;
```

**步骤 7**: 在组件中使用
```tsx
const ProductPage = () => {
  const { t } = useTranslation('pages.product');

  return (
    <div>
      <h1>{t('productTitle')}</h1>  {/* ✅ 自动智能提示 */}
    </div>
  );
};
```

## 常见问题

### Q1: 智能提示不工作？

**解决方案**:
1. 确保 [src/i18next.d.ts](src/i18next.d.ts) 文件存在
2. 确保 [src/locales/index.ts](src/locales/index.ts) 导出了 `resources` 和 `defaultNS`
3. 确保使用了 `as const`
4. 重启 VS Code TypeScript 服务器（Cmd+Shift+P → "TypeScript: Restart TS Server"）

### Q2: 提示的键不完整？

**解决方案**:
1. 确保翻译文件已正确导入到 [src/locales/zh.ts](src/locales/zh.ts)
2. 确保命名空间已在 [src/locales/index.ts](src/locales/index.ts) 中注册
3. 检查 tsconfig.json 是否包含翻译文件路径

### Q3: 嵌套翻译如何使用？

```typescript
// 翻译文件
export default {
  user: {
    profile: {
      title: '用户资料',
      name: '姓名',
    },
  },
};

// 使用（使用点号分隔）
const { t } = useTranslation('pages.user');
t('user.profile.title');  // ✅ 智能提示支持嵌套路径
```

## 命名规范建议

### 键名命名规范
- 使用 camelCase（驼峰命名）
- 添加前缀表明用途：
  - `xxxTitle` - 标题
  - `xxxCol` - 表格列名
  - `xxxForm` - 表单字段
  - `xxxBtn` - 按钮文本
  - `xxxMsg` - 消息提示
  - `xxxPh` - placeholder

### 示例
```typescript
export default {
  // 页面标题
  usersTitle: '用户列表',

  // 表格列
  usersColName: '姓名',
  usersColAge: '年龄',

  // 表单字段
  usersFormName: '姓名',
  usersFormNamePh: '请输入姓名',

  // 按钮
  usersBtnAdd: '添加',
  usersBtnEdit: '编辑',

  // 消息
  usersMsgAddSuccess: '添加成功',
  usersMsgDeleteConfirm: '确认删除？',
};
```

## 性能优化

### 按需加载命名空间

```tsx
import { useTranslation } from 'react-i18next';

const HeavyComponent = () => {
  // 只在需要时加载特定命名空间
  const { t, ready } = useTranslation('pages.user', {
    useSuspense: false
  });

  if (!ready) return <Spin />;

  return <div>{t('usersTitle')}</div>;
};
```

## 工具函数

### 创建类型安全的翻译 Hook

```typescript
// src/hooks/useTypedTranslation.ts
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTypedTranslation = <NS extends string>(ns?: NS) => {
  return useI18nTranslation(ns);
};

// 使用
const { t } = useTypedTranslation('pages.user');
t('usersTitle');  // ✅ 类型安全 + 智能提示
```

## 参考资源

- [i18next 官方文档](https://www.i18next.com/)
- [react-i18next 官方文档](https://react.i18next.com/)
- [TypeScript 支持文档](https://www.i18next.com/overview/typescript)

---

**维护者**: leon.wang
**更新日期**: 2026-01-27
