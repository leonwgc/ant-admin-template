# 错误监控与上报系统

完整的前端错误监控和上报解决方案，自动捕获和记录应用中的各类错误。

## 📋 功能特性

### 自动错误捕获
- ✅ **React 渲染错误** - 通过 ErrorBoundary 捕获组件错误
- ✅ **JavaScript 运行时错误** - window.onerror 全局监听
- ✅ **Promise Rejection** - unhandledrejection 事件监听
- ✅ **资源加载失败** - 图片、脚本等资源加载错误
- ✅ **网络请求错误** - API 请求失败（需手动调用）

### 错误管理
- 📊 **错误统计** - 按类型、级别统计错误数量
- 💾 **本地存储** - 错误日志存储在 localStorage
- 📤 **服务器上报** - 自动上报到错误收集服务器
- 🔍 **错误详情** - 完整的错误堆栈和上下文信息
- 🗑️ **日志清理** - 支持清除错误日志

### 开发体验
- 🎨 **可视化界面** - 直观的错误监控仪表板
- 🧪 **测试工具** - 内置错误触发器，方便测试
- 📝 **详细日志** - 开发环境输出详细错误信息
- ⚙️ **灵活配置** - 可配置采样率、存储限制等

## 🚀 快速开始

### 1. 启动错误上报服务器（开发环境）

```bash
cd api-server
npm install
npm start
```

服务器将在 `http://localhost:3003` 启动。

### 2. 访问错误监控页面

启动主应用后，访问：**组件 → 错误监控系统** (`/app/components/error-monitor`)

### 3. 测试错误捕获

页面提供了多种错误触发按钮：
- 触发 React 错误
- 触发 Promise 错误
- 触发异步错误
- 触发网络错误

## 📁 文件结构

```
src/
├── utils/
│   └── errorMonitor.ts          # 错误监控核心模块
├── components/
│   └── ErrorBoundary/           # ErrorBoundary 组件（已集成）
└── pages/
    └── Components/
        ├── ErrorMonitorDemo.tsx  # 错误监控演示页面
        └── ErrorTest.tsx         # 错误测试页面

api-server/
├── index.js                     # 错误上报服务器
├── package.json                 # 服务器依赖
└── error-logs/                  # 错误日志存储目录（自动创建）
```

## 🔧 核心模块

### errorMonitor (错误监控器)

```typescript
import errorMonitor from '~/utils/errorMonitor';

// 自动捕获的错误（无需手动调用）
// - React 渲染错误
// - JavaScript 运行时错误
// - Promise rejection
// - 资源加载失败

// 手动上报网络错误
errorMonitor.reportNetworkError('API 请求失败', {
  url: '/api/users',
  method: 'GET',
  status: 500,
});

// 获取错误日志
const errors = errorMonitor.getErrors();

// 获取统计信息
const stats = errorMonitor.getStatistics();

// 清除所有错误
errorMonitor.clearErrors();
```

### 错误类型

```typescript
enum ErrorType {
  REACT_ERROR = 'react_error',        // React 错误
  JS_ERROR = 'js_error',              // JS 错误
  PROMISE_ERROR = 'promise_error',    // Promise 错误
  RESOURCE_ERROR = 'resource_error',  // 资源错误
  NETWORK_ERROR = 'network_error',    // 网络错误
}
```

### 错误级别

```typescript
enum ErrorLevel {
  INFO = 'info',        // 信息
  WARNING = 'warning',  // 警告
  ERROR = 'error',      // 错误
  FATAL = 'fatal',      // 严重
}
```

## 🎯 ErrorBoundary 集成

ErrorBoundary 已自动集成错误监控，所有捕获的 React 错误都会自动上报：

```tsx
// App.tsx - 全局 ErrorBoundary
<ErrorBoundary>
  {/* 自动集成错误监控 */}
  <YourApp />
</ErrorBoundary>

// RouteConfig.tsx - 页面级 ErrorBoundary
<ErrorBoundary
  errorTitle="页面加载失败"
  onGoHome={() => navigate('/app/users/table')}
>
  {pageComponent}
</ErrorBoundary>
```

## 📊 错误上报接口

### POST /api/errors/report

上报错误到服务器。

**请求体：**
```json
{
  "id": "1234567890_abc123",
  "type": "react_error",
  "level": "error",
  "message": "Cannot read property 'foo' of undefined",
  "stack": "Error: ...\n    at Component ...",
  "componentStack": "    in Component ...",
  "url": "http://localhost:3002/app/users",
  "userAgent": "Mozilla/5.0 ...",
  "timestamp": 1234567890000,
  "extra": {
    "screen": { "width": 1920, "height": 1080 },
    "viewport": { "width": 1200, "height": 800 }
  }
}
```

**响应：**
```json
{
  "success": true,
  "message": "Error reported successfully",
  "id": "1234567890_abc123"
}
```

### GET /api/errors/statistics

获取错误统计信息。

**响应：**
```json
{
  "success": true,
  "data": {
    "total": 42,
    "byType": {
      "react_error": 10,
      "js_error": 15,
      "promise_error": 8,
      "resource_error": 5,
      "network_error": 4
    },
    "byLevel": {
      "info": 5,
      "warning": 10,
      "error": 20,
      "fatal": 7
    },
    "fileCount": 3
  }
}
```

### GET /api/errors/logs

获取错误日志列表。

**查询参数：**
- `date`: 可选，指定日期（YYYY-MM-DD）
- `limit`: 可选，限制返回数量（默认100）

**响应：**
```json
{
  "success": true,
  "data": [
    { /* ErrorReport对象 */ },
    ...
  ]
}
```

### DELETE /api/errors/logs

清除所有错误日志。

**响应：**
```json
{
  "success": true,
  "message": "All error logs cleared",
  "count": 5
}
```

## ⚙️ 配置

### 修改上报地址

编辑 `src/utils/errorMonitor.ts`：

```typescript
export const errorMonitor = new ErrorMonitor({
  enabled: true,                              // 启用监控
  logToConsole: true,                        // 控制台输出
  maxErrors: 100,                            // 最大存储数量
  sampleRate: 1,                             // 采样率 (0-1)
  // 生产环境配置
  // endpoint: 'https://your-domain.com/api/errors/report',
  // sampleRate: 0.1,  // 10% 采样
});
```

### 自定义错误处理

```typescript
import errorMonitor from '~/utils/errorMonitor';

// 在请求拦截器中集成
axios.interceptors.response.use(
  response => response,
  error => {
    errorMonitor.reportNetworkError(
      `API Error: ${error.message}`,
      {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      }
    );
    return Promise.reject(error);
  }
);
```

## 生产环境部署

### 1. 配置真实的错误上报服务器

```typescript
// src/utils/errorMonitor.ts
export const errorMonitor = new ErrorMonitor({
  endpoint: 'https://your-domain.com/api/errors/report',
  enabled: process.env.NODE_ENV === 'production',
  logToConsole: process.env.NODE_ENV === 'development',
  sampleRate: 0.1,  // 生产环境使用 10% 采样率
});
```

### 2. 集成第三方错误追踪服务

可以集成 Sentry、LogRocket、Bugsnag 等服务：

```typescript
// 在 componentDidCatch 或 reportError 中
if (process.env.NODE_ENV === 'production') {
  Sentry.captureException(error, {
    contexts: {
      react: {
        componentStack: errorInfo.componentStack,
      },
    },
  });
}
```

### 3. 错误告警

可以配置当严重错误发生时发送通知：

```typescript
reportError(options) {
  // ... 现有逻辑

  if (options.level === ErrorLevel.FATAL) {
    // 发送告警通知（邮件、短信、钉钉等）
    notifyTeam(errorReport);
  }
}
```

## 🔍 调试

### 查看本地错误日志

打开浏览器开发者工具：
```javascript
// 控制台执行
localStorage.getItem('error_monitor_logs')
```

### 查看服务器日志

错误日志按日期存储在 `api-server/error-logs/` 目录：
```bash
cat api-server/error-logs/errors-2024-02-09.json
```

## 📚 相关资源

- [ErrorBoundary 文档](../components/ErrorBoundary/README.md)
- [错误测试页面](../pages/Components/ErrorTest.tsx)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [MDN - Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT
