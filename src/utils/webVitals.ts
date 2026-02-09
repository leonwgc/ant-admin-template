/**
 * @file utils/webVitals.ts
 * @author leon.wang
 */
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

/**
 * Web Vitals 性能指标说明
 *
 * CLS (Cumulative Layout Shift) - 累积布局偏移
 *   - 优秀: < 0.1
 *   - 需改进: 0.1 - 0.25
 *   - 差: > 0.25
 *
 * FCP (First Contentful Paint) - 首次内容绘制
 *   - 优秀: < 1.8s
 *   - 需改进: 1.8s - 3s
 *   - 差: > 3s
 *
 * INP (Interaction to Next Paint) - 交互到下一次绘制
 *   - 优秀: < 200ms
 *   - 需改进: 200ms - 500ms
 *   - 差: > 500ms
 *
 * LCP (Largest Contentful Paint) - 最大内容绘制
 *   - 优秀: < 2.5s
 *   - 需改进: 2.5s - 4s
 *   - 差: > 4s
 *
 * TTFB (Time to First Byte) - 首字节时间
 *   - 优秀: < 800ms
 *   - 需改进: 800ms - 1800ms
 *   - 差: > 1800ms
 */

interface VitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * 性能指标阈值配置
 */
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

/**
 * 获取性能评级
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * 格式化性能指标值
 */
function formatValue(name: string, value: number): string {
  if (name === 'CLS') {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

/**
 * 获取评级对应的颜色
 */
function getRatingColor(rating: string): string {
  switch (rating) {
    case 'good':
      return '#0cce6b';
    case 'needs-improvement':
      return '#ffa400';
    case 'poor':
      return '#ff4e42';
    default:
      return '#666';
  }
}

/**
 * 性能数据上报函数
 * 在生产环境中，将数据发送到分析服务
 */
function sendToAnalytics(metric: Metric) {
  const vitalsData: VitalsData = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };

  // 开发环境：控制台打印
  if (process.env.NODE_ENV === 'development') {
    const rating = getRating(metric.name, metric.value);
    const color = getRatingColor(rating);
    const value = formatValue(metric.name, metric.value);

    // eslint-disable-next-line no-console
    console.log(
      `%c📊 Web Vitals: ${metric.name}`,
      `color: ${color}; font-weight: bold; font-size: 12px;`,
      `\n  Value: ${value}`,
      `\n  Rating: ${rating}`,
      `\n  ID: ${metric.id}`,
      `\n  Navigation: ${metric.navigationType}`
    );
  }

  // 生产环境：发送到分析服务
  if (process.env.NODE_ENV === 'production') {
    // 方式 1: 使用 sendBeacon（推荐）
    if (navigator.sendBeacon) {
      const body = JSON.stringify(vitalsData);
      navigator.sendBeacon('/api/analytics/web-vitals', body);
    }
    // 方式 2: 使用 fetch
    else {
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vitalsData),
        keepalive: true, // 页面关闭时也能发送
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to send web vitals:', error);
      });
    }

    // 方式 3: 发送到第三方分析服务
    // Google Analytics 4 示例
    // if (window.gtag) {
    //   window.gtag('event', metric.name, {
    //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //     metric_id: metric.id,
    //     metric_value: metric.value,
    //     metric_delta: metric.delta,
    //   });
    // }
  }
}

/**
 * 在页面上显示性能指标（仅开发环境）
 */
function displayMetricsOnPage() {
  if (process.env.NODE_ENV !== 'development') return;

  const container = document.createElement('div');
  container.id = 'web-vitals-overlay';
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 11px;
    z-index: 99999;
    min-width: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  `;

  const title = document.createElement('div');
  title.textContent = '📊 Web Vitals';
  title.style.cssText = `
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 6px;
  `;
  container.appendChild(title);

  document.body.appendChild(container);

  // 创建指标显示行
  const metrics: Record<string, HTMLSpanElement> = {};
  ['LCP', 'CLS', 'FCP', 'INP', 'TTFB'].forEach((name) => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
      padding: 4px 0;
    `;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = `${name}:`;
    nameSpan.style.cssText = 'opacity: 0.7; margin-right: 8px;';

    const valueSpan = document.createElement('span');
    valueSpan.textContent = '...';
    valueSpan.style.cssText = 'font-weight: bold;';

    row.appendChild(nameSpan);
    row.appendChild(valueSpan);
    container.appendChild(row);

    metrics[name] = valueSpan;
  });

  // 更新指标显示
  const updateMetric = (metric: Metric) => {
    const element = metrics[metric.name];
    if (element) {
      const rating = getRating(metric.name, metric.value);
      const color = getRatingColor(rating);
      const value = formatValue(metric.name, metric.value);

      element.textContent = value;
      element.style.color = color;
    }
  };

  // 监听所有指标
  onLCP(updateMetric);
  onCLS(updateMetric);
  onFCP(updateMetric);
  onINP(updateMetric);
  onTTFB(updateMetric);

  // 添加最小化按钮
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '−';
  toggleBtn.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    width: 20px;
    height: 20px;
    line-height: 16px;
    opacity: 0.6;
  `;
  toggleBtn.onmouseover = () => (toggleBtn.style.opacity = '1');
  toggleBtn.onmouseout = () => (toggleBtn.style.opacity = '0.6');

  let minimized = false;
  toggleBtn.onclick = () => {
    minimized = !minimized;
    if (minimized) {
      Object.values(metrics).forEach((el) => {
        (el.parentElement as HTMLElement).style.display = 'none';
      });
      container.style.minWidth = '160px';
      toggleBtn.textContent = '+';
    } else {
      Object.values(metrics).forEach((el) => {
        (el.parentElement as HTMLElement).style.display = 'flex';
      });
      container.style.minWidth = '200px';
      toggleBtn.textContent = '−';
    }
  };

  container.appendChild(toggleBtn);
}

/**
 * 初始化 Web Vitals 监控
 *
 * @param options 配置选项
 * @param options.displayOverlay 是否在页面显示性能指标覆盖层（仅开发环境）
 */
export function initWebVitals(options: { displayOverlay?: boolean } = {}) {
  const { displayOverlay = true } = options;

  // 监听所有核心指标
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);

  // 开发环境显示性能面板
  if (displayOverlay && process.env.NODE_ENV === 'development') {
    if (document.readyState === 'complete') {
      displayMetricsOnPage();
    } else {
      window.addEventListener('load', displayMetricsOnPage);
    }
  }

  // 打印初始化信息
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(
      '%c🚀 Web Vitals 监控已启动',
      'color: #0cce6b; font-weight: bold; font-size: 14px;'
    );
  }
}

/**
 * 手动获取当前性能指标
 */
export function getWebVitals(): Promise<Record<string, Metric>> {
  return new Promise((resolve) => {
    const metrics: Record<string, Metric> = {};
    let count = 0;
    const total = 5;

    const checkComplete = () => {
      count++;
      if (count === total) {
        resolve(metrics);
      }
    };

    onCLS((metric) => {
      metrics.CLS = metric;
      checkComplete();
    });
    onFCP((metric) => {
      metrics.FCP = metric;
      checkComplete();
    });
    onINP((metric) => {
      metrics.INP = metric;
      checkComplete();
    });
    onLCP((metric) => {
      metrics.LCP = metric;
      checkComplete();
    });
    onTTFB((metric) => {
      metrics.TTFB = metric;
      checkComplete();
    });

    // 超时处理（3 秒后仍未收集完的指标视为不可用）
    setTimeout(() => {
      resolve(metrics);
    }, 3000);
  });
}
