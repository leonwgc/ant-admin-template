/**
 * @file src/hooks/useFormField.md
 * @author leon.wang
 */

# useFormField Hook

一个功能全面的表单字段验证hooks，用于管理表单字段的状态和验证。

## 特性

### 字段状态跟踪

- **value** - 字段的当前值
- **touched** - 字段是否已被触摸（聚焦后失焦）
- **dirty** - 值是否已被修改
- **pristine** - 值是否未被修改（dirty的反义）
- **valid** - 字段是否通过所有验证
- **invalid** - 字段是否验证失败
- **error** - 当前的错误信息
- **validating** - 是否正在进行异步验证
- **visited** - 字段是否至少被聚焦过一次

### 主要功能

- ✅ 支持同步和异步验证规则
- ✅ 可配置的验证时机（onChange、onBlur）
- ✅ 防抖验证支持
- ✅ 手动触发验证
- ✅ 字段重置功能
- ✅ 错误信息管理
- ✅ 完整的 TypeScript 类型支持

## 基础用法

```tsx
import { useFormField } from '~/hooks/useFormField';

const MyForm = () => {
  const emailField = useFormField({
    initialValue: '',
    rules: [
      (value) => !value ? 'Email is required' : null,
      (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : null,
    ],
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <div>
      <Input
        value={emailField.value}
        onChange={(e) => emailField.onChange(e.target.value)}
        onBlur={emailField.onBlur}
        onFocus={emailField.onFocus}
        status={emailField.touched && emailField.invalid ? 'error' : undefined}
      />
      {emailField.touched && emailField.error && (
        <div className="error">{emailField.error}</div>
      )}
    </div>
  );
};
```

## 高级用法

### 异步验证

```tsx
const usernameField = useFormField({
  initialValue: '',
  rules: [
    (value) => !value ? 'Username is required' : null,
    // 异步验证规则
    async (value) => {
      const response = await fetch(`/api/check-username?username=${value}`);
      const { available } = await response.json();
      return available ? null : 'Username is already taken';
    },
  ],
  validateDebounce: 300, // 300ms 防抖
});
```

### 密码匹配验证

```tsx
const passwordField = useFormField({
  initialValue: '',
  rules: [
    (value) => !value ? 'Password is required' : null,
    (value) => value.length < 8 ? 'Minimum 8 characters' : null,
  ],
});

const confirmPasswordField = useFormField({
  initialValue: '',
  rules: [
    (value) => !value ? 'Please confirm password' : null,
    (value) => value !== passwordField.value ? 'Passwords do not match' : null,
  ],
});
```

### 表单提交

```tsx
const handleSubmit = async () => {
  // 手动触发所有字段的验证
  const emailValid = await emailField.validate();
  const passwordValid = await passwordField.validate();

  if (emailValid && passwordValid) {
    // 提交表单
    await submitForm({
      email: emailField.value,
      password: passwordField.value,
    });

    // 重置表单
    emailField.reset();
    passwordField.reset();
  }
};
```

### 自定义验证规则

```tsx
// 验证规则工具函数
const validationRules = {
  required: (message = 'This field is required') =>
    (value: string) => !value || !value.trim() ? message : null,

  minLength: (min: number) =>
    (value: string) => value && value.length < min
      ? `Minimum length is ${min} characters`
      : null,

  maxLength: (max: number) =>
    (value: string) => value && value.length > max
      ? `Maximum length is ${max} characters`
      : null,

  pattern: (regex: RegExp, message: string) =>
    (value: string) => value && !regex.test(value) ? message : null,

  email: (value: string) =>
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? 'Invalid email format'
      : null,
};

// 使用
const field = useFormField({
  initialValue: '',
  rules: [
    validationRules.required(),
    validationRules.minLength(5),
    validationRules.email,
  ],
});
```

## API

### useFormField(options)

#### Options

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialValue | T | '' | 字段的初始值 |
| rules | ValidationRule<T>[] | [] | 验证规则数组 |
| validateOnChange | boolean | true | 是否在值变化时验证 |
| validateOnBlur | boolean | true | 是否在失焦时验证 |
| validateDebounce | number | 0 | 验证防抖延迟（毫秒）|
| onValueChange | (value: T) => void | - | 值变化时的回调 |
| onValidationChange | (valid: boolean, error: string \| null) => void | - | 验证状态变化时的回调 |

#### 返回值

返回一个对象，包含所有字段状态和操作方法：

**状态属性：**
- `value: T` - 当前值
- `touched: boolean` - 是否已触摸
- `dirty: boolean` - 是否已修改
- `pristine: boolean` - 是否未修改
- `valid: boolean` - 是否有效
- `invalid: boolean` - 是否无效
- `error: string | null` - 错误信息
- `validating: boolean` - 是否正在验证
- `visited: boolean` - 是否已访问

**操作方法：**
- `onChange: (value: T) => void` - 处理值变化
- `onBlur: () => void` - 处理失焦事件
- `onFocus: () => void` - 处理聚焦事件
- `setValue: (value: T) => void` - 手动设置值
- `reset: () => void` - 重置到初始状态
- `validate: () => Promise<boolean>` - 手动触发验证
- `setError: (error: string | null) => void` - 手动设置错误
- `setTouched: (touched: boolean) => void` - 手动设置触摸状态

## ValidationRule 类型

```typescript
type ValidationRule<T = string> = (
  value: T
) => string | null | undefined | Promise<string | null | undefined>;
```

验证规则是一个函数，接收字段值作为参数：
- 返回 `null` 或 `undefined` 表示验证通过
- 返回 `string` 表示验证失败，string 为错误信息
- 支持返回 `Promise` 用于异步验证

## 最佳实践

### 1. 显示错误的时机

只在用户触摸过字段后才显示错误：

```tsx
{field.touched && field.error && (
  <div className="error">{field.error}</div>
)}
```

### 2. 设置输入框状态

```tsx
<Input
  status={field.touched && field.invalid ? 'error' : undefined}
  value={field.value}
  onChange={(e) => field.onChange(e.target.value)}
  onBlur={field.onBlur}
/>
```

### 3. 防抖异步验证

对于需要调用 API 的验证（如检查用户名是否存在），使用防抖：

```tsx
const field = useFormField({
  validateDebounce: 300,
  rules: [asyncValidationRule],
});
```

### 4. 仅在失焦时验证

对于某些场景，可能只想在用户完成输入后验证：

```tsx
const field = useFormField({
  validateOnChange: false,
  validateOnBlur: true,
});
```

### 5. 表单级验证

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const fields = [emailField, passwordField, nameField];
  const validations = await Promise.all(fields.map(f => f.validate()));

  if (validations.every(v => v)) {
    // 所有字段都有效，提交表单
    await submitForm();
  }
};
```

## 与 Ant Design Form 的对比

| 特性 | useFormField | Ant Design Form |
|------|-------------|-----------------|
| 学习曲线 | 简单，直观的 API | 需要学习 Form.Item、rules 等概念 |
| 灵活性 | 高，完全自定义 | 中，受限于 Form 组件 |
| 文件大小 | 小，单文件实现 | 大，完整的表单解决方案 |
| 适用场景 | 简单表单、自定义验证 | 复杂表单、标准化表单 |
| 性能 | 优秀，按需渲染 | 良好，但可能有额外开销 |

## 常见问题

### Q: 如何实现跨字段验证？

A: 在验证规则中引用其他字段的值：

```tsx
const field2 = useFormField({
  rules: [
    (value) => value !== field1.value ? 'Fields must match' : null,
  ],
});
```

### Q: 如何清空错误信息？

A: 使用 `setError(null)` 方法：

```tsx
field.setError(null);
```

### Q: 如何在不触发验证的情况下更新值？

A: 使用 `setValue` 方法：

```tsx
field.setValue('new value'); // 不会触发验证
```

### Q: 如何禁用某个字段的验证？

A: 在创建 field 时不传入 rules 或传入空数组：

```tsx
const field = useFormField({
  initialValue: '',
  rules: [], // 无验证
});
```
