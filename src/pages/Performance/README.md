/**
 * @file pages/Performance/README.md
 * @author leon.wang
 */

# 性能监控页面

## 📊 功能特性

- ✅ 实时显示 6 项核心 Web Vitals 指标
- ✅ 综合性能评分（0-100）
- ✅ 颜色编码（绿色=优秀、橙色=需改进、红色=差）
- ✅ 详细指标说明和优化建议
- ✅ 手动刷新功能

## 🚀 如何添加到菜单

### 1. 添加菜单项到 `config.menu.tsx`

```tsx
import { DashboardOutlined } from '@ant-design/icons';

export const menus: MenuItem[] = [
  // ... 其他菜单项
  {
    key: 'performance',
    get label() { return '性能监控'; },  // 或使用 i18n: t('menu.performance')
    icon: <DashboardOutlined />,
    route: '/app/performance',
    permissions: [],  // 设置访问权限
  },
];
```

### 2. 注册组件到 `utils/routeGenerator.tsx`

```tsx
export const routeComponentMap: RouteComponentMap = {
  // ... 其他路由
  '/app/performance': lazyLoad('pages/Performance'),
};
```

### 3. 添加国际化翻译（可选）

**中文** (`locales/common/zh.ts`)：
```typescript
export default {
  // ... 其他翻译
  menuPerformance: '性能监控',
};
```

**英文** (`locales/common/en.ts`)：
```typescript
export default {
  // ... 其他翻译
  menuPerformance: 'Performance',
};
```

然后在菜单中使用：
```tsx
get label() { return t('common:menuPerformance'); },
```

## 💡 使用场景

### 开发环境
- 实时监控页面性能
- 对比优化前后的数据
- 识别性能瓶颈

### 生产环境
- 监控真实用户体验
- 性能趋势分析
- A/B 测试性能对比

## 🎯 性能指标说明

### 核心指标（影响 SEO 和用户体验）

1. **LCP (Largest Contentful Paint)**
   - 最大内容绘制时间
   - 衡量加载性能
   - 目标: < 2.5 秒

2. **FID (First Input Delay)**
   - 首次输入延迟
   - 衡量交互性
   - 目标: < 100 毫秒

3. **CLS (Cumulative Layout Shift)**
   - 累积布局偏移
   - 衡量视觉稳定性
   - 目标: < 0.1

### 辅助指标

4. **INP (Interaction to Next Paint)**
   - 交互到下一次绘制
   - FID 的继任者
   - 目标: < 200 毫秒

5. **FCP (First Contentful Paint)**
   - 首次内容绘制
   - 衡量感知加载速度
   - 目标: < 1.8 秒

6. **TTFB (Time to First Byte)**
   - 首字节时间
   - 衡量服务器响应
   - 目标: < 800 毫秒

## 🔧 自定义扩展

### 添加自定义指标

```tsx
// 在 Performance.tsx 中添加
const customMetrics = {
  TTI: {
    description: '可交互时间',
    threshold: '优秀: < 3.8s',
  },
};
```

### 集成性能历史记录

```tsx
// 保存历史数据到 localStorage
const saveMetrics = (metrics: Record<string, Metric>) => {
  const history = JSON.parse(localStorage.getItem('performance-history') || '[]');
  history.push({
    timestamp: Date.now(),
    metrics,
  });
  // 只保留最近 50 条
  if (history.length > 50) history.shift();
  localStorage.setItem('performance-history', JSON.stringify(history));
};

// 显示性能趋势图
import { Line } from '@ant-design/charts';

const PerformanceChart: FC = () => {
  const history = JSON.parse(localStorage.getItem('performance-history') || '[]');

  const data = history.flatMap((h: any) =>
    Object.entries(h.metrics).map(([name, metric]: [string, any]) => ({
      time: new Date(h.timestamp).toLocaleTimeString(),
      name,
      value: metric.value,
    }))
  );

  return <Line data={data} xField="time" yField="value" seriesField="name" />;
};
```

## 📈 数据上报

如果需要将性能数据发送到后端进行分析：

```tsx
// 在 Performance.tsx 中添加
const reportToBackend = async (metrics: Record<string, Metric>) => {
  try {
    await fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: window.location.href,
        metrics,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      }),
    });
  } catch (error) {
    console.error('Failed to report performance:', error);
  }
};

// 在 loadMetrics 中调用
const loadMetrics = async () => {
  const data = await getWebVitals();
  setMetrics(data);
  reportToBackend(data); // 发送到后端
};
```

## 🎨 样式定制

修改 `Performance.scss` 来自定义页面样式：

```scss
.performance-page {
  // 修改评分卡背景渐变
  &__score-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  // 自定义指标卡片
  &__metrics {
    .ant-card {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
}
```

## ⚠️ 注意事项

1. **开发环境限制**
   - 首次加载可能较慢（未优化）
   - 热更新会影响真实数据

2. **真实用户监控**
   - 建议在生产环境收集数据
   - 使用采样策略（避免过多请求）

3. **性能影响**
   - Web Vitals 库本身很轻量（~4KB gzipped）
   - 监控不会明显影响页面性能

## 📚 相关文档

- [Web Vitals 使用指南](../utils/webVitals.md)
- [性能优化最佳实践](https://web.dev/vitals/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

---

**立即体验！** 启动项目后访问 `/app/performance` 查看性能监控页面 🚀
