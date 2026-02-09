# 🚀 Web Vitals 性能监控 - 快速开始

## ✅ 已完成的集成

### 1. 自动监控（已启动）
项目已自动集成 Web Vitals 性能监控，启动项目即可使用。

```bash
npm start
```

**效果**：
- ✅ 右下角显示性能监控面板（开发环境）
- ✅ 自动收集 5 项核心指标：LCP、CLS、INP、FCP、TTFB
- ✅ 控制台打印彩色性能日志
- ✅ 绿色=优秀、橙色=需改进、红色=差

### 2. 可选的性能监控页面

如需在管理后台查看详细性能数据，按以下步骤添加到菜单：

#### 步骤 1：添加菜单项（`src/config.menu.tsx`）

```tsx
import { DashboardOutlined } from '@ant-design/icons';

export const menus: MenuItem[] = [
  // 在合适的位置添加
  {
    key: 'performance',
    get label() { return '性能监控'; },
    icon: <DashboardOutlined />,
    route: '/app/performance',
    permissions: [],
  },
  // ...其他菜单项
];
```

#### 步骤 2：注册路由（`src/utils/routeGenerator.tsx`）

```tsx
export const routeComponentMap: RouteComponentMap = {
  // ...其他路由
  '/app/performance': lazyLoad('pages/Performance'),
};
```

#### 步骤 3：重启项目

```bash
# 按 Ctrl+C 停止开发服务器，然后重新启动
npm start
```

访问 `http://localhost:3002/app/performance` 查看性能监控页面。

---

## 📊 功能特性

### 开发环境
- ✅ **实时性能面板**：右下角悬浮窗显示所有指标
- ✅ **性能监控页面**：详细的性能数据展示和优化建议
- ✅ **彩色日志**：控制台打印性能数据
- ✅ **可最小化**：点击面板右上角 `−` 按钮最小化

### 生产环境
- ✅ **自动上报**：性能数据自动发送到后端 API（需配置）
- ✅ **无性能影响**：web-vitals 库仅 ~4KB gzipped
- ✅ **真实用户数据**：收集真实用户的性能体验

---

## 🎯 核心指标说明

| 指标 | 说明 | 目标值 |
|------|------|--------|
| **LCP** | 最大内容绘制时间 - 页面主要内容加载速度 | < 2.5s |
| **CLS** | 累积布局偏移 - 页面视觉稳定性 | < 0.1 |
| **INP** | 交互到下一次绘制 - 交互响应速度 | < 200ms |
| **FCP** | 首次内容绘制 - 首个内容渲染时间 | < 1.8s |
| **TTFB** | 首字节时间 - 服务器响应速度 | < 800ms |

---

## 🔧 配置选项

### 关闭开发环境性能面板

编辑 `src/index.tsx`：

```tsx
initWebVitals({
  displayOverlay: false, // 设为 false 关闭悬浮面板
});
```

### 配置生产环境数据上报

编辑 `src/utils/webVitals.ts` 的 `sendToAnalytics` 函数：

```typescript
// 1. 修改上报 API 地址
navigator.sendBeacon('/api/analytics/web-vitals', body);

// 2. 或使用第三方服务（Google Analytics）
if (window.gtag) {
  window.gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
  });
}
```

---

## 📈 使用示例

### 在组件中手动获取性能数据

```tsx
import { getWebVitals } from '~/utils/webVitals';

const MyComponent: FC = () => {
  const checkPerformance = async () => {
    const metrics = await getWebVitals();
    console.log('LCP:', metrics.LCP?.value, 'ms');
    console.log('CLS:', metrics.CLS?.value);
  };

  return <Button onClick={checkPerformance}>检查性能</Button>;
};
```

---

## 🎨 自定义样式

修改性能面板样式（`src/utils/webVitals.ts`）：

```typescript
// 在 displayMetricsOnPage 函数中修改
container.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* 自定义你的样式 */
`;
```

---

## 📚 详细文档

- [Web Vitals 使用指南](src/utils/webVitals.md) - 完整功能说明
- [性能监控页面说明](src/pages/Performance/README.md) - 页面使用指南
- [Web Vitals 官方文档](https://web.dev/vitals/) - Google 官方指南

---

## ⚠️ 注意事项

1. **开发环境限制**：热更新可能影响性能数据准确性
2. **真实数据**：建议在生产环境收集真实用户数据
3. **采样策略**：高流量网站建议采样收集（如 10%）
4. **隐私合规**：确保数据收集符合 GDPR/CCPA 等法规

---

## 🚀 立即体验

```bash
npm start
```

打开浏览器，右下角会自动显示性能监控面板！

**颜色含义**：
- 🟢 绿色 = 优秀性能
- 🟠 橙色 = 需要改进
- 🔴 红色 = 性能较差

---

**问题反馈**：如有问题，请检查浏览器控制台的 Web Vitals 日志。
