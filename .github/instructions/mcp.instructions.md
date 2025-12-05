---
applyTo: '**/*.{tsx,ts}'
---
# MCP Service Usage Instructions

## 强制使用 Ant Design MCP 服务

当生成任何使用 Ant Design 组件的代码时，必须先通过 MCP 服务获取组件信息。

### 1. 生成代码前的准备工作

#### Ant Design 组件
在编写代码前，必须通过以下 MCP 工具获取组件信息：

- `get_all_component_names` - 获取所有可用组件列表
- `get_component_info` - 获取特定组件的详细信息（props, API, 使用说明）
- `get_component_example` - 获取组件使用示例和最佳实践
- `search_components` - 按关键字搜索相关组件
- `get_components_by_category` - 按类别浏览组件（General, Layout, Navigation, Data Entry, Data Display, Feedback, Other）

#### ahooks Hooks
在使用 React Hooks 时，**必须优先使用 ahooks 库**，并通过以下 MCP 工具获取 Hook 信息：

- `get_all_hook_names` - 获取所有可用的 ahooks Hook 列表
- `get_hook_info` - 获取特定 Hook 的详细信息（参数、返回值、使用示例）
- `search_hooks` - 按关键字搜索相关 Hooks
- `get_hooks_by_category` - 按类别浏览 Hooks（State, Effect, DOM, Request, Advanced 等）
- `get_all_categories` - 获取所有 Hook 类别

### 2. 必须调用 MCP 的场景

#### Ant Design 组件场景
- ✅ 创建新页面时
- ✅ 添加新表单时
- ✅ 使用任何 Ant Design 组件时
- ✅ 需要参考最佳实践时
- ✅ 不确定组件 API 或 props 时
- ✅ 需要了解组件使用示例时
### 3. 标准工作流程

#### 场景示例 1：创建登录页面（Ant Design + ahooks）

```typescript
// Step 1: 搜索表单相关组件
mcp_ant-design_search_components({ keyword: "form" })

// Step 2: 获取 Ant Design 组件详细信息
mcp_ant-design_get_component_info({ componentName: "Form" })
mcp_ant-design_get_component_info({ componentName: "Input" })
mcp_ant-design_get_component_info({ componentName: "Button" })

// Step 3: 搜索 ahooks 中的状态管理 Hooks
mcp_ahooks-mcp_search_hooks({ keyword: "state" })

// Step 4: 获取 ahooks Hook 信息
mcp_ahooks-mcp_get_hook_info({ name: "useBoolean" })  // 用于控制 loading 状态
mcp_ahooks-mcp_get_hook_info({ name: "useRequest" })  // 用于登录请求

// Step 5: 基于获取的信息生成代码
```

#### 场景示例 2：创建带倒计时的验证码输入

```typescript
// Step 1: 搜索时间相关的 ahooks
mcp_ahooks-mcp_get_hooks_by_category({ category: "Effect" })

// Step 2: 获取倒计时 Hook 信息
mcp_ahooks-mcp_get_hook_info({ name: "useCountDown" })

// Step 3: 获取 Input 组件信息
mcp_ant-design_get_component_info({ componentName: "Input" })

// Step 4: 基于信息生成代码
```Step 4: 获取 Button 组件信息
mcp_ant-design_get_component_info({ componentName: "Button" })

// Step 5: 获取 Checkbox 组件信息
mcp_ant-design_get_component_info({ componentName: "Checkbox" })

// Step 6: 获取组件使用示例
mcp_ant-design_get_component_example({ componentName: "Form" })

// Step 7: 基于获取的信息生成代码
```

#### 场景示例：创建数据表格页面

```typescript
// Step 1: 按类别查找数据展示组件
mcp_ant-design_get_components_by_category({ category: "Data Display" })

// Step 2: 获取 Table 组件详细信息
mcp_ant-design_get_component_info({ componentName: "Table" })

// Step 3: 获取 Table 使用示例
mcp_ant-design_get_component_example({ componentName: "Table" })

// Step 4: 获取相关的反馈组件（如 Modal, Message）
mcp_ant-design_search_components({ keyword: "feedback" })

// Step 5: 基于信息生成代码
```

### 4. 代码注释要求

生成的代码中必须包含 MCP 调用说明：

```typescript
/**
 * @file src/pages/Login/Login.tsx
 * @author leon.wang
 * @description Login page using Ant Design components and ahooks
 *
 * MCP Services Used:
 * Ant Design:
 * - search_components: keyword "form"
 * - get_component_info: Form, Input, Button, Checkbox
 * - get_component_example: Form
 *
 * ahooks:
 * - search_hooks: keyword "state"
 * - get_hook_info: useBoolean, useRequest
 */
```

### 5. 使用优先级

#### Ant Design 组件优先级

**表单场景**
首先调用 MCP 获取以下组件信息：
- Form, Input, Input.Password, Input.TextArea
- Select, Checkbox, Radio, Switch
- DatePicker, TimePicker, Upload
- Button

#### ahooks Hooks 优先级（必须优先使用）

**状态管理**
优先使用 ahooks，避免直接使用 useState：
- `useBoolean` - 布尔值状态管理
- `useToggle` - 切换状态
- `useSet` - Set 数据结构
- `useMap` - Map 数据结构
- `useLocalStorageState` / `useSessionStorageState` - 持久化状态

**副作用管理**
- `useMount` - 组件挂载时执行
- `useUnmount` - 组件卸载时执行
- `useUpdateEffect` - 忽略首次渲染的 useEffect
- `useDebounceEffect` - 防抖 Effect
- `useThrottleEffect` - 节流 Effect

**请求管理**
- `useRequest` - **必须使用**，替代手动 fetch/axios
- 支持自动 loading、错误处理、重试、轮询等

**DOM 操作**
- `useEventListener` - 事件监听
- `useClickAway` - 点击外部区域
- `useScroll` - 滚动监听
- `useSize` - 元素尺寸监听
- `useFocusWithin` - 焦点状态

**定时器**
- `useInterval` - setInterval 替代
- `useTimeout` - setTimeout 替代
- `useCountDown` - 倒计时
- `useRafInterval` - requestAnimationFrame 定时器

**性能优化**
- `useDebounceFn` / `useDebounce` - 防抖
- `useThrottleFn` / `useThrottle` - 节流
- `useMemoizedFn` - 持久化函数引用

#### 数据展示场景
首先调用 MCP 获取以下组件信息：
- Table, List, Card
- Descriptions, Statistic
- Tree, Timeline

#### 反馈场景
首先调用 MCP 获取以下组件信息：
- Message, Notification
- Modal, Drawer
- Progress, Spin, Skeleton

#### 布局场景
首先调用 MCP 获取以下组件信息：
- Layout (Header, Sider, Content, Footer)
- Grid (Row, Col)
- Space, Divider

#### 导航场景
首先调用 MCP 获取以下组件信息：
- Menu, Tabs
- Breadcrumb, Pagination
- Steps

### 6. 验证清单

生成代码后，确保：
- [ ] 已调用相关 MCP 服务获取所有使用组件的信息
- [ ] 组件使用符合 MCP 返回的 API 文档
- [ ] 组件 props 类型与 MCP 文档一致
- [ ] 参考了 MCP 返回的示例代码
- [ ] 代码注释中说明了使用的 MCP 服务
- [ ] import 语句正确（从 'antd' 和 'ahooks' 导入）
- [ ] **优先使用 ahooks 替代原生 Hooks**
- [ ] 如使用了 useRequest，确保已调用 ahooks MCP 获取其 API
- [ ] 状态管理优先使用 useBoolean/useToggle 而非 useState(boolean)

### 7. 错误处理

如果 MCP 服务返回组件不存在：
1. 调用 `get_all_component_names` 查看所有可用组件
2. 使用 `search_components` 搜索相似组件
3. 选择最接近需求的组件

### 8. 示例：完整的 MCP 驱动开发流程（Ant Design + ahooks）

```typescript
// 任务：创建带表单验证和请求的用户注册页面

// Step 1: 搜索 Ant Design 表单组件
mcp_ant-design_search_components({ keyword: "form" });

// Step 2: 获取 Ant Design 组件信息
mcp_ant-design_get_component_info({ componentName: "Form" });
mcp_ant-design_get_component_info({ componentName: "Input" });
mcp_ant-design_get_component_info({ componentName: "Button" });

// Step 3: 搜索 ahooks 请求相关 Hooks
mcp_ahooks-mcp_search_hooks({ keyword: "request" });

// Step 4: 获取 useRequest Hook 详细信息
mcp_ahooks-mcp_get_hook_info({ name: "useRequest" });

// Step 5: 获取状态管理 Hook
mcp_ahooks-mcp_get_hook_info({ name: "useBoolean" });

// Step 6: 基于获取的信息生成代码
// - 使用 Form 组件创建表单
// - 使用 useRequest 处理注册请求（自动 loading、错误处理）
// - 使用 useBoolean 管理模态框显示状态
// - 遵循 MCP 返回的最佳实践

// Step 7: 在代码注释中记录
/**
 * MCP Services Used:
 * Ant Design:
 * - search_components: "form"
 * - get_component_info: Form, Input, Button
 * ahooks:
 * - search_hooks: "request"
 * - get_hook_info: useRequest, useBoolean
 */
```

### 9. ahooks 强制使用规则

#### 必须使用 ahooks 的场景

1. **布尔状态** - 必须使用 `useBoolean` 而非 `useState(false)`
   ```typescript
   // ❌ 错误
   const [visible, setVisible] = useState(false);

   // ✅ 正确
   const [visible, { setTrue, setFalse, toggle }] = useBoolean(false);
   ```

2. **请求处理** - 必须使用 `useRequest` 而非手动 fetch
   ```typescript
   // ❌ 错误
   const [loading, setLoading] = useState(false);
   const fetchData = async () => { ... };

   // ✅ 正确
   const { data, loading, error, run } = useRequest(fetchData);
   ```

3. **组件生命周期** - 必须使用 `useMount`/`useUnmount`
   ```typescript
   // ❌ 错误
   useEffect(() => { init(); }, []);

   // ✅ 正确
   useMount(() => { init(); });
   ```

4. **防抖节流** - 必须使用 `useDebounceFn`/`useThrottleFn`
   ```typescript
   // ❌ 错误
   const debounced = debounce(handleSearch, 500);

   // ✅ 正确
   const { run: handleSearch } = useDebounceFn(search, { wait: 500 });
   ```

### 10. 性能优化

- 对于常用组件，优先使用缓存的 MCP 信息
- 批量调用 MCP 服务获取多个组件信息
- 在项目初始化时调用 `get_all_component_names` 和 `get_all_hook_names` 建立索引

### 11. 特殊说明

- 本项目使用 Ant Design 5.x 版本
- 本项目使用 ahooks 3.x 版本
- 所有 UI 组件从 'antd' 包导入
- 所有 Hooks 从 'ahooks' 包导入
- 图标从 '@ant-design/icons' 导入
- 类型定义从 'antd' 和 'ahooks' 导入

---

## 示例模板

每次生成使用 Ant Design 组件和 ahooks 的文件时，请遵循以下模板：

```typescript
/**
 * @file src/pages/YourPage/YourPage.tsx
 * @author leon.wang
 * @description [页面描述]
 *
 * MCP Services Used:
 * Ant Design:
 * - [列出所有调用的 Ant Design MCP 服务]
 * ahooks:
 * - [列出所有调用的 ahooks MCP 服务]
 */

import React from 'react';
import { [从 MCP 获取的 Ant Design 组件列表] } from 'antd';
import { [从 MCP 获取的 ahooks Hooks 列表] } from 'ahooks';
import { [图标] } from '@ant-design/icons';
import './YourPage.scss';

// [基于 MCP 返回的信息定义接口]

// [参考 MCP 示例代码实现组件]

export default YourPage;
```

---
