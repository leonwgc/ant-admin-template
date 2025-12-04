---
applyTo: '**/*.{tsx,ts}'
---
# MCP Service Usage Instructions

## 强制使用 Ant Design MCP 服务

当生成任何使用 Ant Design 组件的代码时，必须先通过 MCP 服务获取组件信息。

### 1. 生成代码前的准备工作

在编写代码前，必须通过以下 MCP 工具获取组件信息：

- `get_all_component_names` - 获取所有可用组件列表
- `get_component_info` - 获取特定组件的详细信息（props, API, 使用说明）
- `get_component_example` - 获取组件使用示例和最佳实践
- `search_components` - 按关键字搜索相关组件
- `get_components_by_category` - 按类别浏览组件（General, Layout, Navigation, Data Entry, Data Display, Feedback, Other）

### 2. 必须调用 MCP 的场景

- ✅ 创建新页面时
- ✅ 添加新表单时
- ✅ 使用任何 Ant Design 组件时
- ✅ 需要参考最佳实践时
- ✅ 不确定组件 API 或 props 时
- ✅ 需要了解组件使用示例时

### 3. 标准工作流程

#### 场景示例：创建登录页面

```typescript
// Step 1: 搜索表单相关组件
mcp_ant-design_search_components({ keyword: "form" })

// Step 2: 获取 Form 组件详细信息（props, 使用方法）
mcp_ant-design_get_component_info({ componentName: "Form" })

// Step 3: 获取 Input 组件信息
mcp_ant-design_get_component_info({ componentName: "Input" })

// Step 4: 获取 Button 组件信息
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
 * @author leon.wang(leon.wang@derbysoft.net)
 * @description Login page using Ant Design components
 *
 * MCP Services Used:
 * - search_components: keyword "form"
 * - get_component_info: Form, Input, Button, Checkbox
 * - get_component_example: Form
 */
```

### 5. 组件使用优先级

#### 表单场景
首先调用 MCP 获取以下组件信息：
- Form, Input, Input.Password, Input.TextArea
- Select, Checkbox, Radio, Switch
- DatePicker, TimePicker, Upload
- Button

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
- [ ] import 语句正确（从 'antd' 导入）

### 7. 错误处理

如果 MCP 服务返回组件不存在：
1. 调用 `get_all_component_names` 查看所有可用组件
2. 使用 `search_components` 搜索相似组件
3. 选择最接近需求的组件

### 8. 示例：完整的 MCP 驱动开发流程

```typescript
// 任务：创建用户注册表单

// Step 1: 搜索相关组件
const formComponents = await search_components({ keyword: "form" });
// 返回: Form, Input, Select, Checkbox...

// Step 2: 获取核心组件详细信息
const formInfo = await get_component_info({ componentName: "Form" });
const inputInfo = await get_component_info({ componentName: "Input" });
const selectInfo = await get_component_info({ componentName: "Select" });

// Step 3: 查看示例
const formExample = await get_component_example({ componentName: "Form" });

// Step 4: 基于获取的信息生成代码
// - 使用 Form 的 onFinish, initialValues 等 props
// - 使用 Form.Item 的 name, rules 等 props
// - 使用 Input 的 placeholder, size 等 props
// - 遵循示例代码的最佳实践

// Step 5: 在代码注释中记录
/**
 * MCP Services Used:
 * - search_components: "form"
 * - get_component_info: Form, Input, Select, Button
 * - get_component_example: Form
 */
```

### 9. 性能优化

- 对于常用组件，优先使用缓存的 MCP 信息
- 批量调用 MCP 服务获取多个组件信息
- 在项目初始化时调用 `get_all_component_names` 建立组件索引

### 10. 特殊说明

- 本项目使用 Ant Design 5.x 版本
- 所有组件从 'antd' 包导入
- 图标从 '@ant-design/icons' 导入
- 类型定义从 'antd' 导入（如 FormInstance, TableColumnsType）

---

## 示例模板

每次生成使用 Ant Design 组件的文件时，请遵循以下模板：

```typescript
/**
 * @file src/pages/YourPage/YourPage.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 * @description [页面描述]
 *
 * MCP Services Used:
 * - [列出所有调用的 MCP 服务]
 */

import React from 'react';
import { [从 MCP 获取的组件列表] } from 'antd';
import { [图标] } from '@ant-design/icons';
import './YourPage.scss';

// [基于 MCP 返回的信息定义接口]

// [参考 MCP 示例代码实现组件]

export default YourPage;
```

---
