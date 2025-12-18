# useDsTable Hook 分析文档

## 📚 概述

`useDsTable` 是一个基于 `ahooks` 的 `useAntdTable` 封装的高级表格管理 Hook，专门用于处理带有分页、搜索、排序功能的数据表格。

## 🎯 核心功能

### 1. **自动分页管理**
- 自动处理分页参数（pageNum, pageSize）
- 内置分页器配置（显示总数、快速跳转、页面大小选择器）
- 支持自定义页面大小选项：[10, 20, 30, 40, 50]

### 2. **表单集成搜索**
- 自动绑定 Ant Design Form
- 防抖搜索（400ms）避免频繁请求
- 过滤空值（空字符串不会被发送到后端）
- 支持表单值转换函数

### 3. **排序支持**
- 自动处理表格列排序
- 转换为后端需要的排序格式：
  ```typescript
  {
    sorts: [{
      direction: 'ASC' | 'DESC',
      property: 'columnKey'
    }]
  }
  ```

### 4. **加载状态管理**
- 自动显示加载状态
- 请求开始时设置 loading = true
- 请求完成后设置 loading = false

### 5. **错误处理**
- 401 未授权：自动重定向到登录页
- 500+ 服务器错误：显示通知提示
- 网络错误：显示错误提示
- 业务错误：显示 message 提示

### 6. **数据转换**
- 请求前转换：formValuesTransform
- 响应后转换：responseDataTransform

## 📝 类型定义

```typescript
// 后端响应格式
type ResponseDataType = {
  result: 'success' | 'fail';
  timestamp: number;
  data: ObjectType | ObjectType[] | ListObjectType;
};

// 列表数据格式
type ListObjectType = {
  pageSize?: number;
  pageNum?: number;
  totals: number;        // 总记录数
  totalPages?: number;
  records: ObjectType[]; // 数据列表
};

// Hook 返回的列表格式
type ListResult<T> = {
  list: T[];   // 数据列表
  total: number; // 总记录数
};
```

## 🔧 使用方法

### 基础用法

```typescript
import useDsTable from '~/hooks/useDsTable';

const MyComponent = () => {
  // 1. 使用 hook
  const { tableProps, form, submit, reset } = useDsTable(
    fetchDataAPI  // API 请求函数
  );

  // 2. 渲染表单和表格
  return (
    <>
      <Form form={form}>
        <Form.Item name="keyword">
          <Input placeholder="搜索..." />
        </Form.Item>
        <Button onClick={submit}>搜索</Button>
        <Button onClick={reset}>重置</Button>
      </Form>

      <Table {...tableProps} columns={columns} rowKey="id" />
    </>
  );
};
```

### 高级用法（带数据转换）

```typescript
const { tableProps, form, submit, reset } = useDsTable(
  fetchDataAPI,

  // 转换表单值
  (formValues) => ({
    ...formValues,
    keyword: formValues.keyword?.trim(),
    startDate: formValues.dateRange?.[0],
    endDate: formValues.dateRange?.[1],
  }),

  // 转换响应数据
  (responseData: any) => ({
    total: responseData.totalCount,  // 自定义总数字段
    list: responseData.items,        // 自定义列表字段
  })
);
```

## 🎨 返回值说明

```typescript
{
  tableProps: {
    loading: boolean;           // 加载状态
    dataSource: any[];          // 表格数据
    pagination: {               // 分页配置
      current: number;          // 当前页
      pageSize: number;         // 每页大小
      total: number;            // 总记录数
      showTotal: (total, range) => string;
      showQuickJumper: boolean;
      showSizeChanger: boolean;
      pageSizeOptions: number[];
    };
    onChange: Function;         // 表格变化回调
    scroll: { x: 'max-content' }; // 横向滚动
  };
  form: FormInstance;           // Form 实例
  submit: () => void;           // 提交搜索
  reset: () => void;            // 重置表单和表格
}
```

## 🌟 最佳实践

### 1. API 请求函数格式

```typescript
const fetchUserList = (params: ObjectType): Promise<{ data: ResponseDataType }> => {
  return axios.get('/api/users', { params });
};
```

### 2. 表格列配置

```typescript
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,  // 启用排序
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <Tag>{status}</Tag>,
  },
];
```

### 3. 搜索表单

```typescript
<Form form={form}>
  <Form.Item name="keyword">
    <Input placeholder="搜索关键词" allowClear />
  </Form.Item>
  <Form.Item name="status">
    <Select placeholder="选择状态" allowClear />
  </Form.Item>
  <Space>
    <Button type="primary" onClick={submit}>搜索</Button>
    <Button onClick={reset}>重置</Button>
  </Space>
</Form>
```

## 🔄 请求流程

```
1. 用户操作（搜索/分页/排序）
   ↓
2. 收集表单数据和表格参数
   ↓
3. formValuesTransform（可选）
   ↓
4. 构建请求参数：
   {
     pageNum: current - 1,
     pageSize: 10,
     ...formData,
     sorts: [{ direction: 'ASC', property: 'name' }]
   }
   ↓
5. 发送 API 请求
   ↓
6. 接收响应数据
   ↓
7. responseDataTransform（可选）
   ↓
8. 返回格式化数据：{ list: [], total: 0 }
   ↓
9. 更新表格显示
```

## ⚠️ 注意事项

1. **pageNum 从 0 开始**
   - Hook 内部会自动转换：`pageNum: current - 1`
   - 后端应该接收 0-based 的页码

2. **空值过滤**
   - 表单中的空字符串不会被发送到后端
   - 只有非空值才会添加到请求参数中

3. **防抖延迟**
   - 搜索操作有 400ms 的防抖延迟
   - 避免用户输入时频繁请求

4. **错误处理**
   - 401 错误会自动跳转登录页
   - 500+ 错误显示通知
   - 其他错误显示 message

5. **响应格式要求**
   - 必须包含 `result: 'success' | 'fail'`
   - 数据结构必须符合 `ListObjectType` 或使用自定义转换

## 📊 与 useAntdTable 的区别

| 特性 | useDsTable | useAntdTable |
|------|------------|--------------|
| 分页器配置 | ✅ 预配置 | ❌ 需手动配置 |
| 错误处理 | ✅ 内置完整处理 | ❌ 需自行处理 |
| 响应格式 | ✅ 统一格式 | ❌ 需适配 |
| 空值过滤 | ✅ 自动过滤 | ❌ 需手动处理 |
| 加载状态 | ✅ 独立管理 | ✅ 内置 |
| 排序转换 | ✅ 自动转换 | ❌ 需手动处理 |
| 数据转换 | ✅ 支持双向转换 | ⚠️ 部分支持 |

## 🎯 适用场景

✅ **适合使用的场景：**
- 标准的 CRUD 列表页面
- 需要分页、搜索、排序的表格
- 后端使用统一的响应格式
- 需要完善的错误处理

❌ **不适合使用的场景：**
- 简单的静态表格
- 完全自定义的分页逻辑
- 非标准的后端接口格式（除非使用转换函数）
- 需要完全控制请求时机的场景

## 🔗 相关资源

- [ahooks useAntdTable 文档](https://ahooks.js.org/hooks/use-antd-table)
- [Ant Design Table 组件](https://ant.design/components/table-cn)
- [Ant Design Form 组件](https://ant.design/components/form-cn)

## 📝 示例页面

完整的示例代码请查看：
- 组件：`src/pages/Hooks/UseDsTableExample.tsx`
- 样式：`src/pages/Hooks/UseDsTableExample.scss`
- 路由：在菜单"React Hooks > useDsTable"中访问
