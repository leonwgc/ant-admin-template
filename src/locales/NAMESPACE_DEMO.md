/**
 * @file src/locales/NAMESPACE_DEMO.md
 * @author leon.wang
 * @description i18next 命名空间工作原理演示
 */

# i18next 命名空间工作原理

## 配置对比

### 配置 A：不注册独立命名空间
```typescript
// src/locales/index.ts
export const resources = {
  zh: {
    translation: zh,  // zh = { ...commonZh, pages: { user: userZh } }
  },
};
```

### 配置 B：注册独立命名空间（✅ 当前配置）
```typescript
// src/locales/index.ts
export const resources = {
  zh: {
    translation: zh,           // 默认命名空间
    'pages.user': zh.pages.user,  // 独立命名空间
  },
};
```

## 使用对比

### 配置 A 的使用方式
```tsx
// ❌ 这样写不工作
const { t } = useTranslation('pages.user');
t('usersTitle')  // 报错：找不到键 'usersTitle'

// ✅ 必须这样写
const { t } = useTranslation();  // 默认 translation
t('pages.user.usersTitle')  // 通过完整路径访问
```

### 配置 B 的使用方式（✅ 推荐）
```tsx
// ✅ 方式 1：指定命名空间（推荐）
const { t } = useTranslation('pages.user');
t('usersTitle')  // ✅ 直接访问

// ✅ 方式 2：默认命名空间 + 完整路径
const { t } = useTranslation();
t('pages.user.usersTitle')  // ✅ 也能工作

// ✅ 方式 3：指定命名空间 + ns 参数
const { t } = useTranslation();
t('usersTitle', { ns: 'pages.user' })  // ✅ 也能工作
```

## 为什么要注册独立命名空间？

### 优势 ✅

1. **键名更简洁**
   ```tsx
   // 注册命名空间
   t('usersTitle')  // ✅ 简洁

   // 不注册
   t('pages.user.usersTitle')  // ❌ 冗长
   ```

2. **代码分割更清晰**
   ```tsx
   // 组件只关心自己的命名空间
   const { t } = useTranslation('pages.user');
   ```

3. **TypeScript 智能提示更好**
   ```tsx
   // 指定命名空间后，只提示该命名空间下的键
   const { t } = useTranslation('pages.user');
   t('users')  // 智能提示：usersTitle, usersColName, usersFormName...
   ```

4. **按需加载**
   ```tsx
   // i18next 可以实现命名空间的懒加载
   const { t, ready } = useTranslation('pages.user', {
     useSuspense: false
   });
   ```

### 劣势 ❌

1. **配置稍微复杂**
   - 需要在 resources 中手动注册每个命名空间

2. **需要维护两份**
   - zh.ts 中定义结构
   - index.ts 中注册命名空间

## 实际验证

### 测试代码
```tsx
import { useTranslation } from 'react-i18next';

// 测试组件
const TestComponent = () => {
  // 测试 1：使用命名空间
  const { t: t1 } = useTranslation('pages.user');
  console.log('方式1:', t1('usersTitle'));  // ✅ 用户列表

  // 测试 2：使用完整路径
  const { t: t2 } = useTranslation();
  console.log('方式2:', t2('pages.user.usersTitle'));  // ✅ 用户列表

  // 测试 3：指定 ns 参数
  const { t: t3 } = useTranslation();
  console.log('方式3:', t3('usersTitle', { ns: 'pages.user' }));  // ✅ 用户列表

  return null;
};
```

## 如果移除命名空间注册会怎样？

### 修改 src/locales/index.ts
```typescript
// ❌ 移除命名空间注册
export const resources = {
  zh: {
    translation: zh,
    // 'pages.user': zh.pages.user,  // ← 注释掉
  },
};
```

### 影响
```tsx
// ❌ 这个写法会报错
const { t } = useTranslation('pages.user');
t('usersTitle')
// 错误：i18next::translator: missingKey zh pages.user usersTitle

// ✅ 必须改成这样
const { t } = useTranslation();
t('pages.user.usersTitle')
```

## 最佳实践建议

### ✅ 推荐：为每个页面注册独立命名空间

```typescript
// src/locales/index.ts
export const resources = {
  zh: {
    translation: zh,
    'pages.user': zh.pages.user,
    'pages.product': zh.pages.product,
    'pages.order': zh.pages.order,
    // ... 其他页面命名空间
  },
};
```

**使用**:
```tsx
// pages/User/Users.tsx
const { t } = useTranslation('pages.user');
t('usersTitle')

// pages/Product/Products.tsx
const { t } = useTranslation('pages.product');
t('productTitle')
```

### 命名规范
```typescript
// 命名空间命名：模块.子模块
'pages.user'        // 用户页面
'pages.product'     // 产品页面
'components.table'  // 表格组件
'common'            // 通用翻译（默认在 translation 中）
```

## 性能考虑

### 命名空间注册不影响性能
```typescript
// 所有翻译在初始化时就加载完成
// 命名空间只是提供不同的访问路径
// 不会增加额外的内存或加载开销
```

### 如需按需加载（高级）
```typescript
// i18next backend 插件支持懒加载
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });
```

## 总结

| 项目 | 说明 |
|-----|------|
| **当前配置** | ✅ 已注册 `'pages.user'` 命名空间 |
| **推荐用法** | `useTranslation('pages.user')` + `t('usersTitle')` |
| **为什么注册** | 1. 键名简洁<br/>2. 代码清晰<br/>3. 智能提示更好<br/>4. 支持按需加载 |
| **注意事项** | 添加新页面时记得在 `locales/index.ts` 中注册命名空间 |

---

**维护者**: leon.wang
**更新日期**: 2026-01-27
