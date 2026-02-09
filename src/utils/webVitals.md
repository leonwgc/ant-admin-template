/**
 * @file utils/webVitals.md
 * @author leon.wang
 */

# Web Vitals 性能监控使用指南

## 📊 什么是 Web Vitals？

Web Vitals 是 Google 提出的一套衡量网页用户体验的核心性能指标，包括：

### 核心指标

| 指标 | 名称 | 说明 | 优秀 | 需改进 | 差 |
|------|------|------|------|--------|-----|
| **LCP** | Largest Contentful Paint | 最大内容绘制时间 | < 2.5s | 2.5s - 4s | > 4s |
| **FID** | First Input Delay | 首次输入延迟 | < 100ms | 100ms - 300ms | > 300ms |
| **CLS** | Cumulative Layout Shift | 累积布局偏移 | < 0.1 | 0.1 - 0.25 | > 0.25 |
| **INP** | Interaction to Next Paint | 交互到下一次绘制 | < 200ms | 200ms - 500ms | > 500ms |
| **FCP** | First Contentful Paint | 首次内容绘制 | < 1.8s | 1.8s - 3s | > 3s |
| **TTFB** | Time to First Byte | 首字节时间 | < 800ms | 800ms - 1800ms | > 1800ms |

## 🚀 快速开始

### 1. 自动监控（已集成）

项目已在 `src/index.tsx` 中自动初始化 Web Vitals 监控：

```typescript
import { initWebVitals } from './utils/webVitals';

initWebVitals({
  displayOverlay: true, // 开发环境显示性能面板
});
```

### 2. 开发环境查看

启动项目后，右下角会显示性能监控面板（仅开发环境）：

```bash
npm start
```

打开浏览器，你会看到：
- 📊 右下角浮动面板显示实时性能数据
- 🎨 颜色编码：绿色（优秀）、橙色（需改进）、红色（差）
- 📝 控制台详细日志

### 3. 手动获取性能数据

```typescript
import { getWebVitals } from '~/utils/webVitals';

// 异步获取所有性能指标
const metrics = await getWebVitals();
console.log(metrics);
// {
//   LCP: { name: 'LCP', value: 2400, rating: 'good', ... },
//   FID: { name: 'FID', value: 80, rating: 'good', ... },
//   ...
// }
```

## 📤 生产环境数据上报

### 方式 1: 发送到自己的后端 API（推荐）

编辑 `src/utils/webVitals.ts` 中的 `sendToAnalytics` 函数：

```typescript
// 生产环境：发送到分析服务
if (process.env.NODE_ENV === 'production') {
  if (navigator.sendBeacon) {
    const body = JSON.stringify(vitalsData);
    navigator.sendBeacon('/api/analytics/web-vitals', body);
  }
}
```

后端 API 示例（Node.js + Express）：

```javascript
app.post('/api/analytics/web-vitals', (req, res) => {
  const { name, value, rating, id, navigationType } = req.body;

  // 存储到数据库
  await db.webVitals.create({
    metric: name,
    value,
    rating,
    metricId: id,
    navigationType,
    userAgent: req.headers['user-agent'],
    timestamp: new Date(),
  });

  res.status(200).send('OK');
});
```

### 方式 2: 发送到 Google Analytics 4

```typescript
// 取消注释 webVitals.ts 中的 GA4 代码
if (window.gtag) {
  window.gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
  });
}
```

### 方式 3: 第三方服务

- **Vercel Analytics**: 自动收集 Web Vitals
- **Sentry Performance**: 集成性能监控
- **DataDog RUM**: 实时用户监控
- **New Relic Browser**: 浏览器性能监控

## 🎯 性能优化建议

### LCP 优化（< 2.5s）

```tsx
// ❌ 差的做法：大块 JS 阻塞渲染
import HeavyComponent from './HeavyComponent';

// ✅ 好的做法：懒加载
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// ✅ 图片优化
<img
  src="image.webp"
  loading="lazy"
  width={800}
  height={600}
  alt="description"
/>
```

### FID/INP 优化（< 100ms / < 200ms）

```typescript
// ❌ 差的做法：主线程阻塞
const result = heavyCalculation(data);

// ✅ 好的做法：使用 Web Worker
const worker = new Worker('calculation.worker.js');
worker.postMessage(data);
worker.onmessage = (e) => setResult(e.data);

// ✅ 使用防抖/节流
import { useDebounceFn } from 'ahooks';
const { run: handleSearch } = useDebounceFn(
  (value) => searchAPI(value),
  { wait: 300 }
);
```

### CLS 优化（< 0.1）

```scss
// ✅ 为图片预留空间
.image-container {
  aspect-ratio: 16 / 9;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

// ✅ 骨架屏占位
.skeleton {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
}
```

### TTFB 优化（< 800ms）

```typescript
// ✅ CDN 加速
// ✅ 服务端缓存
// ✅ Gzip/Brotli 压缩
// ✅ HTTP/2

// ✅ 预连接关键资源
<link rel="preconnect" href="https://api.example.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

## 📈 性能监控仪表盘（可选）

创建一个性能监控页面：

```tsx
import React, { useEffect, useState } from 'react';
import { getWebVitals } from '~/utils/webVitals';
import { Card, Row, Col, Statistic } from '@derbysoft/neat-design';

const PerformancePage: FC = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getWebVitals().then(setMetrics);
  }, []);

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title="LCP"
            value={metrics?.LCP?.value}
            suffix="ms"
            valueStyle={{
              color: metrics?.LCP?.rating === 'good' ? '#0cce6b' : '#ff4e42'
            }}
          />
        </Card>
      </Col>
      {/* 其他指标... */}
    </Row>
  );
};
```

## 🔍 调试技巧

### Chrome DevTools

1. 打开 **Chrome DevTools** → **Lighthouse**
2. 选择 **Performance**
3. 点击 **Analyze page load**

### Performance API

```typescript
// 查看性能条目
const entries = performance.getEntriesByType('navigation');
console.log(entries[0]);

// 自定义性能标记
performance.mark('data-fetch-start');
await fetchData();
performance.mark('data-fetch-end');
performance.measure('data-fetch', 'data-fetch-start', 'data-fetch-end');
```

## 📚 参考资料

- [Web Vitals 官方文档](https://web.dev/vitals/)
- [Chrome Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)
- [web-vitals npm 包](https://github.com/GoogleChrome/web-vitals)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## ⚙️ 配置选项

```typescript
// src/index.tsx
initWebVitals({
  displayOverlay: true,  // 显示性能面板（仅开发环境）
});
```

## 🎨 自定义样式

修改 `webVitals.ts` 中的 `displayMetricsOnPage` 函数来自定义面板样式：

```typescript
container.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  /* 自定义你的样式 */
`;
```

## 🚨 注意事项

1. **开发环境限制**：某些指标（如 LCP）在热更新时可能不准确
2. **真实用户数据**：在生产环境收集真实用户数据更有意义
3. **隐私合规**：确保数据收集符合 GDPR/CCPA 等法规
4. **采样策略**：高流量站点建议采样收集（如 10% 用户）

## 📊 性能目标

建议的性能目标：

- **75% 的用户**访问时，所有核心指标应达到"优秀"级别
- **LCP < 2.5s**
- **FID < 100ms** 或 **INP < 200ms**
- **CLS < 0.1**

---

**已完成集成** ✅
启动项目即可在右下角看到性能监控面板！
