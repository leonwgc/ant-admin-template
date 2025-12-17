/**
 * @file src/pages/Css/CssRenderOptimization.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Tag, Space, Tabs, Button, Switch, Divider } from 'antd';
import { ThunderboltOutlined, RocketOutlined } from '@ant-design/icons';
import './CssRenderOptimization.scss';

/**
 * CssRenderOptimization component - Demonstrates CSS rendering optimization techniques
 */
const CssRenderOptimization: React.FC = () => {
  const [enableContentVisibility, setEnableContentVisibility] = useState(true);
  const [enableWillChange, setEnableWillChange] = useState(true);
  const [enableContain, setEnableContain] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const renderLargeList = () => {
    return Array.from({ length: 100 }, (_, i) => (
      <div
        key={i}
        className={`optimization-demo__list-item ${
          enableContentVisibility ? 'optimization-demo__list-item--optimized' : ''
        }`}
      >
        <div className="optimization-demo__list-content">
          <h4>Item {i + 1}</h4>
          <p>
            This is a demo item with some content. Content visibility can skip rendering
            for off-screen items.
          </p>
          <Space>
            <Tag color="blue">Tag 1</Tag>
            <Tag color="green">Tag 2</Tag>
            <Tag color="purple">Tag 3</Tag>
          </Space>
        </div>
      </div>
    ));
  };

  return (
    <div className="css-render-optimization">
      <h2 className="css-render-optimization__title">
        <RocketOutlined /> CSS 渲染性能优化
      </h2>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: 'content-visibility',
            children: (
              <div className="css-render-optimization__section">
                <Card
                  title={
                    <Space>
                      <ThunderboltOutlined />
                      content-visibility - 最强大的渲染优化
                    </Space>
                  }
                  extra={
                    <Space>
                      <span>启用优化:</span>
                      <Switch
                        checked={enableContentVisibility}
                        onChange={setEnableContentVisibility}
                      />
                    </Space>
                  }
                >
                  <p className="css-render-optimization__desc">
                    <Tag color="red">性能提升: ⭐⭐⭐⭐⭐</Tag>
                    跳过屏幕外元素的渲染，大幅提升长列表性能
                  </p>

                  <div className="css-render-optimization__code">
                    {`.element {
  /* 跳过屏幕外元素的渲染 */
  content-visibility: auto;

  /* 为未渲染元素预留空间，避免布局偏移 */
  contain-intrinsic-size: 0 500px;
}

/* 语法说明 */
contain-intrinsic-size: <width> <height>;

/* 不同值的含义 */
contain-intrinsic-size: 0 500px;      /* 宽度自适应父容器，高度500px */
contain-intrinsic-size: auto 500px;   /* 记住上次渲染的宽度，高度500px */
contain-intrinsic-size: 300px 500px;  /* 固定宽300px，高500px */
contain-intrinsic-size: auto auto;    /* 记住上次渲染的完整尺寸 */

/* 为什么用 0 而不是 auto？
 * 0 = 宽度由父容器决定（100%），适用于响应式布局
 * auto = 记住元素最后一次渲染的实际尺寸，首次渲染前无效
 */`}
                  </div>

                  <Card
                    title="contain-intrinsic-size 参数说明"
                    size="small"
                    style={{ marginBottom: 16 }}
                  >
                    <table className="css-render-optimization__table">
                      <thead>
                        <tr>
                          <th>值</th>
                          <th>含义</th>
                          <th>使用场景</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <code>0</code>
                          </td>
                          <td>宽度自适应父容器（100%）</td>
                          <td>列表项、响应式布局</td>
                        </tr>
                        <tr>
                          <td>
                            <code>auto</code>
                          </td>
                          <td>记住上次渲染的实际尺寸</td>
                          <td>动态内容、避免重复计算</td>
                        </tr>
                        <tr>
                          <td>
                            <code>具体数值</code>
                          </td>
                          <td>固定尺寸占位</td>
                          <td>固定尺寸元素、卡片</td>
                        </tr>
                      </tbody>
                    </table>

                    <Divider />

                    <div className="css-render-optimization__code">
                      {`/* 实际应用示例 */

/* ✅ 列表项 - 宽度自适应 */
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 100px;
}

/* ✅ 固定尺寸卡片 */
.card {
  content-visibility: auto;
  contain-intrinsic-size: 300px 200px;
}

/* ✅ 记忆尺寸 - 动态内容 */
.dynamic-content {
  content-visibility: auto;
  contain-intrinsic-size: auto auto;
}

/* 浏览器兼容性写法 */
.element {
  /* 标准语法 */
  contain-intrinsic-size: 0 500px;

  /* 旧版 Chrome */
  contain-intrinsic-width: 0;
  contain-intrinsic-height: 500px;
}`}
                    </div>
                  </Card>

                  <Divider>长列表演示 (100 items)</Divider>

                  <div className="optimization-demo__list-container">
                    {renderLargeList()}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '2',
            label: 'will-change',
            children: (
              <div className="css-render-optimization__section">
                <Card
                  title="will-change - 动画性能优化"
                  extra={
                    <Space>
                      <Button
                        type="primary"
                        onClick={() => setIsAnimating(!isAnimating)}
                      >
                        {isAnimating ? '停止动画' : '开始动画'}
                      </Button>
                      <Switch
                        checked={enableWillChange}
                        onChange={setEnableWillChange}
                      />
                    </Space>
                  }
                >
                  <p className="css-render-optimization__desc">
                    <Tag color="orange">性能提升: ⭐⭐⭐⭐</Tag>
                    提示浏览器元素将要发生的变化，提前优化
                  </p>

                  <div className="css-render-optimization__code">
                    {`.element {
  /* 优化 transform 和 opacity 动画 */
  will-change: transform, opacity;
}

/* ⚠️ 动画结束后应移除 */
.element:hover {
  will-change: transform;
}
.element.animating {
  will-change: transform;
}`}
                  </div>

                  <Divider>动画演示</Divider>

                  <div className="optimization-demo__animation-container">
                    <div
                      className={`optimization-demo__animated-box ${
                        isAnimating ? 'optimization-demo__animated-box--active' : ''
                      } ${enableWillChange ? 'optimization-demo__animated-box--optimized' : ''}`}
                    >
                      <Space direction="vertical" align="center">
                        <ThunderboltOutlined style={{ fontSize: 48 }} />
                        <span>
                          {enableWillChange ? 'will-change: ON' : 'will-change: OFF'}
                        </span>
                      </Space>
                    </div>
                  </div>

                  <div className="css-render-optimization__warning">
                    <Tag color="red">⚠️ 注意</Tag>
                    不要过度使用 will-change，会消耗额外内存。只在必要时使用，动画结束后应移除。
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '3',
            label: 'contain',
            children: (
              <div className="css-render-optimization__section">
                <Card
                  title="contain - 布局隔离优化"
                  extra={
                    <Space>
                      <span>启用隔离:</span>
                      <Switch checked={enableContain} onChange={setEnableContain} />
                    </Space>
                  }
                >
                  <p className="css-render-optimization__desc">
                    <Tag color="purple">性能提升: ⭐⭐⭐⭐</Tag>
                    限制元素对页面其他部分的影响，减少重排重绘范围
                  </p>

                  <div className="css-render-optimization__code">
                    {`.element {
  /* 布局隔离 - 内部布局不影响外部 */
  contain: layout;

  /* 样式隔离 - CSS 计数器等不影响外部 */
  contain: style;

  /* 绘制隔离 - 内容不会绘制到边界外 */
  contain: paint;

  /* 组合使用 */
  contain: layout style paint;

  /* 或使用简写（等同于 layout paint style） */
  contain: strict;

  /* 最常用：layout + paint */
  contain: content;
}`}
                  </div>

                  <Divider>独立组件演示</Divider>

                  <div className="optimization-demo__contain-grid">
                    {Array.from({ length: 9 }, (_, i) => (
                      <div
                        key={i}
                        className={`optimization-demo__contain-card ${
                          enableContain ? 'optimization-demo__contain-card--optimized' : ''
                        }`}
                      >
                        <h4>Card {i + 1}</h4>
                        <p>独立组件，内部变化不影响其他卡片</p>
                        <Button size="small">Action</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '4',
            label: '硬件加速',
            children: (
              <div className="css-render-optimization__section">
                <Card title="硬件加速 - GPU 渲染">
                  <p className="css-render-optimization__desc">
                    <Tag color="cyan">性能提升: ⭐⭐⭐</Tag>
                    强制开启 GPU 加速，适用于频繁动画的元素
                  </p>

                  <div className="css-render-optimization__code">
                    {`.element {
  /* 方法 1: 3D transform */
  transform: translateZ(0);

  /* 方法 2: translate3d */
  transform: translate3d(0, 0, 0);

  /* 配合使用 */
  backface-visibility: hidden;
  perspective: 1000px;
}

/* 优化滚动 */
.scroll-container {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
}`}
                  </div>

                  <Divider>硬件加速演示</Divider>

                  <div className="optimization-demo__gpu-container">
                    <div className="optimization-demo__gpu-box optimization-demo__gpu-box--normal">
                      <p>普通渲染</p>
                      <small>CPU 渲染</small>
                    </div>
                    <div className="optimization-demo__gpu-box optimization-demo__gpu-box--gpu">
                      <p>GPU 加速</p>
                      <small>transform: translateZ(0)</small>
                    </div>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '5',
            label: '其他优化',
            children: (
              <div className="css-render-optimization__section">
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <Card title="aspect-ratio - 避免布局偏移">
                    <div className="css-render-optimization__code">
                      {`.image {
  aspect-ratio: 16 / 9;
  width: 100%;
  /* 图片加载前保持容器尺寸，避免布局偏移 */
}`}
                    </div>
                    <div className="optimization-demo__aspect-container">
                      <div className="optimization-demo__aspect-box">
                        16:9 预留空间
                      </div>
                    </div>
                  </Card>

                  <Card title="font-display - 字体加载优化">
                    <div className="css-render-optimization__code">
                      {`@font-face {
  font-family: 'MyFont';
  src: url('font.woff2');
  /* 立即使用备用字体，加载完后替换 */
  font-display: swap;

  /* 其他选项：
     auto: 浏览器默认
     block: 最多阻塞 3s
     swap: 立即显示备用字体
     fallback: 100ms 阻塞 + 3s 替换
     optional: 100ms 后放弃加载
  */
}`}
                    </div>
                  </Card>

                  <Card title="isolation - 层叠上下文隔离">
                    <div className="css-render-optimization__code">
                      {`.element {
  /* 创建新的层叠上下文，隔离 z-index */
  isolation: isolate;
}`}
                    </div>
                  </Card>

                  <Card title="pointer-events - 减少事件处理">
                    <div className="css-render-optimization__code">
                      {`.decorative-element {
  /* 禁用鼠标事件，减少事件监听器 */
  pointer-events: none;
}

.interactive-child {
  /* 子元素恢复事件 */
  pointer-events: auto;
}`}
                    </div>
                  </Card>
                </Space>
              </div>
            ),
          },
          {
            key: '6',
            label: '性能对比',
            children: (
              <div className="css-render-optimization__section">
                <Card title="CSS 渲染优化属性对比">
                  <table className="css-render-optimization__table">
                    <thead>
                      <tr>
                        <th>属性</th>
                        <th>性能提升</th>
                        <th>适用场景</th>
                        <th>注意事项</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <code>content-visibility</code>
                        </td>
                        <td>
                          <Tag color="red">⭐⭐⭐⭐⭐</Tag>
                        </td>
                        <td>长列表、虚拟滚动</td>
                        <td>需配合 contain-intrinsic-size</td>
                      </tr>
                      <tr>
                        <td>
                          <code>will-change</code>
                        </td>
                        <td>
                          <Tag color="orange">⭐⭐⭐⭐</Tag>
                        </td>
                        <td>动画元素</td>
                        <td>不要过度使用，消耗内存</td>
                      </tr>
                      <tr>
                        <td>
                          <code>contain</code>
                        </td>
                        <td>
                          <Tag color="purple">⭐⭐⭐⭐</Tag>
                        </td>
                        <td>独立组件、卡片</td>
                        <td>可能影响布局</td>
                      </tr>
                      <tr>
                        <td>
                          <code>transform: translateZ(0)</code>
                        </td>
                        <td>
                          <Tag color="cyan">⭐⭐⭐</Tag>
                        </td>
                        <td>频繁动画</td>
                        <td>启用 GPU，增加内存</td>
                      </tr>
                      <tr>
                        <td>
                          <code>aspect-ratio</code>
                        </td>
                        <td>
                          <Tag color="blue">⭐⭐⭐</Tag>
                        </td>
                        <td>响应式图片/视频</td>
                        <td>避免布局偏移</td>
                      </tr>
                      <tr>
                        <td>
                          <code>font-display</code>
                        </td>
                        <td>
                          <Tag color="green">⭐⭐⭐</Tag>
                        </td>
                        <td>自定义字体</td>
                        <td>推荐使用 swap</td>
                      </tr>
                      <tr>
                        <td>
                          <code>isolation</code>
                        </td>
                        <td>
                          <Tag color="geekblue">⭐⭐</Tag>
                        </td>
                        <td>复杂层叠上下文</td>
                        <td>隔离 z-index</td>
                      </tr>
                      <tr>
                        <td>
                          <code>pointer-events</code>
                        </td>
                        <td>
                          <Tag color="lime">⭐⭐</Tag>
                        </td>
                        <td>装饰性元素</td>
                        <td>减少事件处理</td>
                      </tr>
                    </tbody>
                  </table>

                  <Divider />

                  <Card title="最佳实践组合" size="small">
                    <div className="css-render-optimization__code">
                      {`/* 长列表项优化 */
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 100px;
  contain: layout style paint;
}

/* 动画元素优化 */
.animated-element {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 固定定位元素优化 */
.fixed-header {
  position: fixed;
  contain: layout style;
  transform: translateZ(0);
}

/* 图片容器优化 */
.image-container {
  aspect-ratio: 16 / 9;
  content-visibility: auto;
}

/* 独立组件优化 */
.card-component {
  contain: content;
  content-visibility: auto;
}`}
                    </div>
                  </Card>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CssRenderOptimization;
