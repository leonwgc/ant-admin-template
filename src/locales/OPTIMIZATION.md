# 多语言优化建议

## ✅ 已实施的优化

### 1. 使用 i18next 命名空间特性

**优化前**：
```typescript
// 键名过长，每次都要写完整路径
const { t } = useTranslation();
t('pages.user.users.pageTitle')           // ❌ 太长
t('pages.user.users.columns.name')
t('pages.user.users.actions.submit')
```

**优化后**：
```typescript
// 指定命名空间，省略前缀
const { t } = useTranslation('pages.user');
t('users.pageTitle')                      // ✅ 简洁
t('users.columns.name')
t('users.actions.submit')
```

**实现方式**：

1. 在 `src/locales/index.ts` 中注册命名空间：
```typescript
const resources = {
  en: {
    translation: en,
    'pages.user': en.pages.user,  // 注册命名空间
  },
  zh: {
    translation: zh,
    'pages.user': zh.pages.user,
  },
};
```

2. 在组件中使用命名空间：
```typescript
// src/pages/User/Users.tsx
const { t } = useTranslation('pages.user');
```

---

## 💡 其他推荐优化

### 2. 使用翻译键常量（可选）

**适用场景**：翻译键在多处使用时

```typescript
// src/locales/pages/user/keys.ts
export const USER_KEYS = {
  USERS: {
    PAGE_TITLE: 'users.pageTitle',
    COLUMNS: {
      NAME: 'users.columns.name',
      AGE: 'users.columns.age',
    },
    ACTIONS: {
      SUBMIT: 'users.actions.submit',
      RESET: 'users.actions.reset',
    },
  },
} as const;

// 使用
import { USER_KEYS } from '~/locales/pages/user/keys';
t(USER_KEYS.USERS.PAGE_TITLE);
```

**优点**：
- ✅ TypeScript 类型安全
- ✅ IDE 自动补全
- ✅ 重构时易于追踪

**缺点**：
- ❌ 增加文件数量
- ❌ 需要额外维护

### 3. 简化翻译对象结构（针对简单页面）

**优化前**：
```typescript
// 层级过深
export default {
  users: {
    pageTitle: 'Users',
    columns: {
      name: 'Name',
      age: 'Age',
    },
    actions: {
      submit: 'Submit',
    },
  },
};
```

**优化后（如果键名不冲突）**：
```typescript
// 扁平化结构
export default {
  users: {
    title: 'Users',               // 简化 pageTitle -> title
    colName: 'Name',               // 简化 columns.name -> colName
    colAge: 'Age',
    btnSubmit: 'Submit',           // 简化 actions.submit -> btnSubmit
    btnReset: 'Reset',
  },
};

// 使用
t('users.title')
t('users.colName')
t('users.btnSubmit')
```

**注意**：仅适用于简单页面，复杂页面建议保持层级结构

### 4. 使用上下文翻译（Trans 组件）

**适用场景**：包含 HTML 标签或组件的翻译

```typescript
import { Trans } from 'react-i18next';

// 翻译文件
{
  welcome: 'Welcome <strong>{{name}}</strong> to our app'
}

// 使用
<Trans
  i18nKey="welcome"
  values={{ name: 'John' }}
  components={{ strong: <strong /> }}
/>
```

### 5. 批量翻译优化

**适用场景**：大量翻译键在同一作用域

```typescript
// 使用对象解构
const { t } = useTranslation('pages.user');

// 批量获取翻译
const texts = {
  title: t('users.title'),
  submit: t('users.btnSubmit'),
  reset: t('users.btnReset'),
};

// 使用
<h1>{texts.title}</h1>
<Button>{texts.submit}</Button>
```

### 6. 默认值优化

**避免翻译缺失时显示空白**

```typescript
// 设置默认值
t('users.unknownKey', 'Default Text')

// 或在 i18n 配置中设置全局默认值
i18n.init({
  returnEmptyString: false,
  returnNull: false,
  returnObjects: false,
});
```

---

## 📊 优化对比

### 键名长度对比

| 场景 | 优化前 | 优化后 | 节省 |
|------|--------|--------|------|
| 页面标题 | `t('pages.user.users.pageTitle')` | `t('users.pageTitle')` | 11字符 |
| 表格列 | `t('pages.user.users.columns.name')` | `t('users.columns.name')` | 11字符 |
| 操作按钮 | `t('pages.user.users.actions.submit')` | `t('users.actions.submit')` | 11字符 |

### 代码可读性提升

**优化前**：
```typescript
const { t } = useTranslation();
<h1>{t('pages.user.users.pageTitle')}</h1>
<Button>{t('pages.user.users.actions.submit')}</Button>
```

**优化后**：
```typescript
const { t } = useTranslation('pages.user');
<h1>{t('users.pageTitle')}</h1>
<Button>{t('users.actions.submit')}</Button>
```

---

## 🎯 命名空间规范

### 推荐的命名空间结构

```typescript
// 页面级命名空间
useTranslation('pages.user')      // User 页面
useTranslation('pages.order')     // Order 页面
useTranslation('pages.dashboard') // Dashboard 页面

// 组件级命名空间
useTranslation('components.modal')     // Modal 组件
useTranslation('components.table')     // Table 组件

// 全局翻译使用默认命名空间
useTranslation()                  // 访问 common 翻译
```

### 命名空间使用建议

| 命名空间 | 使用场景 | 示例 |
|---------|---------|------|
| 无（默认） | 全局通用翻译 | `t('menu.users')`, `t('switchLanguage')` |
| `pages.xxx` | 页面专属翻译 | `t('users.title')` in `useTranslation('pages.user')` |
| `components.xxx` | 复用组件翻译 | `t('confirmText')` in `useTranslation('components.modal')` |

---

## 🔧 实施建议

### 何时使用命名空间？

✅ **推荐使用**：
- 页面组件（Users.tsx, Orders.tsx）
- 独立功能模块
- 翻译键超过 5 个的组件

❌ **不推荐使用**：
- 只有 1-2 个翻译键的小组件
- 仅使用全局翻译的组件
- 布局组件（通常使用全局翻译）

### 渐进式迁移

1. **第一步**：新页面使用命名空间
2. **第二步**：逐步迁移现有复杂页面
3. **第三步**：保持简单组件使用全局翻译

---

## 📝 最佳实践总结

1. ✅ **使用命名空间**简化翻译键（已实施）
2. ✅ **保持翻译文件集中管理**在 `src/locales/`
3. ✅ **使用层级结构**组织翻译内容
4. ⚠️ **避免过深嵌套**（最多 3-4 层）
5. ⚠️ **统一命名规范**（如 `pageTitle`, `btnSubmit`, `colName`）
6. ⚠️ **添加注释**说明翻译的上下文
7. ⚠️ **定期审查**未使用的翻译键

---

## 🚀 下一步

如果需要进一步优化，可以考虑：

1. **TypeScript 类型支持**：生成翻译键的类型定义
2. **翻译键检查**：使用 eslint-plugin-i18next 检查缺失的翻译
3. **自动化工具**：使用 i18next-parser 提取翻译键
4. **翻译管理平台**：如 Localazy, Crowdin 管理大量翻译

选择合适的优化方式取决于项目规模和团队需求。
