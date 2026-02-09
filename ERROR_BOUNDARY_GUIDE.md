# 🛡️ ErrorBoundary 错误边界组件 - 使用指南

## ✅ 已完成的集成

### 1. 组件文件
- ✅ [组件主体](src/components/ErrorBoundary/ErrorBoundary.tsx) - 核心错误边界组件
- ✅ [样式文件](src/components/ErrorBoundary/ErrorBoundary.scss) - 错误页面样式
- ✅ [索引文件](src/components/ErrorBoundary/index.ts) - 导出配置
- ✅ [文档](src/components/ErrorBoundary/README.md) - 完整使用文档

### 2. 演示页面
- ✅ [演示页面](src/pages/Components/ErrorBoundaryDemo.tsx) - 交互式示例
- ✅ 已添加到"组件"菜单下
- ✅ 路由：`/app/components/error-boundary`

### 3. 全局集成
- ✅ 已在 [App.tsx](src/App.tsx) 中集成
- ✅ 自动捕获整个应用的渲染错误
- ✅ 开发环境显示详细错误信息
- ✅ 生产环境可对接错误监控服务

---

## 🚀 快速开始

### 1. 查看演示页面

```bash
npm start
```

访问：`http://localhost:3002/app/components/error-boundary`

在演示页面可以：
- 测试基础错误捕获
- 查看自定义备用 UI
- 体验错误回调功能
- 了解嵌套错误边界
- 查看最佳实践和代码示例

### 2. 基础用法

```tsx
import { ErrorBoundary } from '~/components/ErrorBoundary';

// 包裹可能出错的组件
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### 3. 自定义配置

```tsx
<ErrorBoundary
  errorTitle="自定义错误标题"
  errorSubtitle="自定义错误描述"
  showDetails={true}
  onError={(error, errorInfo) => {
    console.log('错误:', error.message);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

---

## 📊 功能特性

### ✅ 已实现功能

1. **错误捕获**
   - 捕获子组件渲染错误
   - 防止整个应用崩溃
   - 显示友好的错误页面

2. **开发体验**
   - 开发环境显示详细错误堆栈
   - 显示组件堆栈信息
   - 控制台彩色日志

3. **用户体验**
   - 用户友好的错误页面
   - 重新加载按钮
   - 返回首页按钮
   - 重试按钮

4. **自定义能力**
   - 自定义备用 UI
   - 自定义错误标题/副标题
   - 错误回调函数
   - 可控制按钮显示

5. **生产环境**
   - 隐藏敏感错误信息
   - 错误日志上报接口
   - 与监控服务集成

---

## 🎯 使用场景

### 场景 1: 全局错误捕获（已实现）

```tsx
// src/App.tsx - 已集成
<ErrorBoundary
  onError={(error, errorInfo) => {
    // 发送到错误监控服务
    if (process.env.NODE_ENV === 'production') {
      sendToSentry(error, errorInfo);
    }
  }}
>
  <ConfigProvider locale={zhCN}>
    <AntdApp>
      <RouteConfig />
    </AntdApp>
  </ConfigProvider>
</ErrorBoundary>
```

### 场景 2: 页面级错误隔离

```tsx
// 在路由配置中使用
<Route
  path="/dashboard"
  element={
    <ErrorBoundary errorTitle="仪表盘加载失败">
      <Dashboard />
    </ErrorBoundary>
  }
/>
```

### 场景 3: 组件级错误隔离

```tsx
// 包裹关键组件
<ErrorBoundary
  errorTitle="图表渲染失败"
  fallback={<div>图表加载失败，请刷新页面</div>}
>
  <ComplexChart data={data} />
</ErrorBoundary>
```

### 场景 4: 第三方组件包裹

```tsx
// 包裹不稳定的第三方组件
<ErrorBoundary
  errorTitle="第三方组件错误"
  showHome={false}
>
  <ThirdPartyWidget />
</ErrorBoundary>
```

---

## 📝 配置选项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 子组件 |
| `fallback` | `ReactNode \| Function` | - | 自定义备用 UI |
| `onError` | `Function` | - | 错误回调函数 |
| `showDetails` | `boolean` | `dev: true, prod: false` | 显示错误详情 |
| `errorTitle` | `string` | `'页面出错了'` | 错误标题 |
| `errorSubtitle` | `string` | `'抱歉，页面遇到了一些问题'` | 错误副标题 |
| `showReload` | `boolean` | `true` | 显示重新加载按钮 |
| `showHome` | `boolean` | `true` | 显示返回首页按钮 |
| `homePath` | `string` | `'/'` | 首页路径 |

---

## ⚠️ 注意事项

### ErrorBoundary **无法**捕获以下错误：

1. ❌ **事件处理器中的错误**
   ```tsx
   // 需要使用 try-catch
   <Button onClick={() => {
     try {
       dangerousOperation();
     } catch (error) {
       handleError(error);
     }
   }}>
     点击
   </Button>
   ```

2. ❌ **异步代码错误**
   ```tsx
   // 需要使用 Promise.catch 或 try-catch
   useEffect(() => {
     fetchData()
       .catch(error => handleError(error));
   }, []);
   ```

3. ❌ **服务端渲染错误**

4. ❌ **错误边界自身的错误**

---

## 🔧 进阶用法

### 1. 集成 Sentry 错误监控

```tsx
import * as Sentry from '@sentry/react';

<ErrorBoundary
  onError={(error, errorInfo) => {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }}
>
  <App />
</ErrorBoundary>
```

### 2. 自定义动态备用 UI

```tsx
<ErrorBoundary
  fallback={(error, errorInfo) => {
    // 根据错误类型显示不同 UI
    if (error.message.includes('网络')) {
      return <NetworkErrorPage />;
    }
    if (error.message.includes('权限')) {
      return <PermissionDeniedPage />;
    }
    return <GenericErrorPage error={error} />;
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### 3. 嵌套错误边界

```tsx
<ErrorBoundary errorTitle="应用级错误">
  <Header />
  <ErrorBoundary errorTitle="侧边栏错误">
    <Sidebar />
  </ErrorBoundary>
  <ErrorBoundary errorTitle="内容区错误">
    <MainContent />
  </ErrorBoundary>
</ErrorBoundary>
```

---

## 📈 错误监控最佳实践

### 1. 粒度控制

```tsx
// ✅ 推荐：多层级错误边界
<ErrorBoundary>              {/* 应用级 */}
  <Layout>
    <ErrorBoundary>          {/* 页面级 */}
      <Dashboard />
    </ErrorBoundary>
    <ErrorBoundary>          {/* 模块级 */}
      <CriticalFeature />
    </ErrorBoundary>
  </Layout>
</ErrorBoundary>
```

### 2. 错误上报

```tsx
const logError = (error: Error, errorInfo: ErrorInfo) => {
  // 记录到监控服务
  fetch('/api/log-error', {
    method: 'POST',
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    }),
  });
};

<ErrorBoundary onError={logError}>
  <App />
</ErrorBoundary>
```

### 3. 用户友好提示

```tsx
<ErrorBoundary
  errorTitle="数据加载失败"
  errorSubtitle="可能是网络问题，请检查网络连接后重试"
  fallback={
    <Result
      status="error"
      title="加载失败"
      extra={[
        <Button type="primary" onClick={retry}>重试</Button>,
        <Button onClick={contactSupport}>联系支持</Button>,
      ]}
    />
  }
>
  <DataTable />
</ErrorBoundary>
```

---

## 📚 相关资源

- 📖 [完整文档](src/components/ErrorBoundary/README.md)
- 🎮 [演示页面](http://localhost:3002/app/components/error-boundary)
- 🔗 [React 官方文档](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- 🛠️ [Sentry 集成指南](https://docs.sentry.io/platforms/javascript/guides/react/)

---

## ✨ 下一步

1. **启动项目并访问演示页面**
   ```bash
   npm start
   # 访问 http://localhost:3002/app/components/error-boundary
   ```

2. **在关键模块使用错误边界**
   - 第三方组件
   - 复杂功能模块
   - 数据密集型组件

3. **集成错误监控服务**
   - Sentry
   - LogRocket
   - 自定义日志服务

4. **测试错误场景**
   - 在开发环境测试错误捕获
   - 验证生产环境错误上报
   - 确保用户体验友好

---

**提示**：ErrorBoundary 已在应用顶层自动集成，所有未被捕获的渲染错误都会被处理！🎉
