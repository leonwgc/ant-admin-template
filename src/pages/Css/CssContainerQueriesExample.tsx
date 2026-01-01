/**
 * @file src/pages/Css/CssContainerQueriesExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Tag, Space, Tabs, Slider, InputNumber, Alert,Divider } from '@derbysoft/neat-design';
import { LayoutOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './CssContainerQueriesExample.scss';

/**
 * CssContainerQueriesExample component - Demonstrates CSS Container Queries
 */
const CssContainerQueriesExample: React.FC = () => {
  const [containerWidth, setContainerWidth] = useState(600);
  const [cardCount, setCardCount] = useState(3);

  return (
    <div className="css-container-queries-example">
      <h2 className="css-container-queries-example__title">
        <LayoutOutlined /> CSS Container Queries 完全指南
      </h2>

      <Alert
        message="浏览器支持"
        description="Container Queries 需要现代浏览器支持（Chrome 105+, Safari 16+, Firefox 110+）"
        type="info"
        icon={<InfoCircleOutlined />}
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: '基础概念',
            children: (
              <div className="css-container-queries-example__section">
                <Card title="什么是 Container Queries？">
                  <p className="css-container-queries-example__desc">
                    <Tag color="blue">容器查询</Tag>
                    Container Queries 允许你根据父容器的尺寸而不是视口尺寸来应用样式，
                    这使得组件真正独立且可复用。
                  </p>

                  <div className="css-container-queries-example__code">
                    {`/* 定义容器 */
.container {
  container-name: card-container;   /* 容器名称 */
  container-type: inline-size;      /* 查询类型: inline-size | size | style */
}

/* 简写形式 */
.container {
  container: card-container / inline-size;
}

/* 容器查询 */
@container card-container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container (min-width: 600px) {
  .card__title {
    font-size: 24px;
  }
}`}
                  </div>

                  <Space direction="vertical" style={{ width: '100%', marginTop: 24 }} size="large">
                    <div>
                      <h4>容器类型说明：</h4>
                      <ul>
                        <li><Tag color="green">inline-size</Tag> - 查询内联方向尺寸（水平方向的宽度）</li>
                        <li><Tag color="green">size</Tag> - 查询两个方向的尺寸</li>
                        <li><Tag color="green">normal</Tag> - 默认值，不是查询容器</li>
                      </ul>
                    </div>
                  </Space>
                </Card>
              </div>
            ),
          },
          {
            key: '2',
            label: '交互式演示',
            children: (
              <div className="css-container-queries-example__section">
                <Card title="响应式卡片 - 基于容器宽度">
                  <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }} size="middle">
                    <Space>
                      <span>容器宽度:</span>
                      <Slider
                        min={300}
                        max={1200}
                        value={containerWidth}
                        onChange={(val) => setContainerWidth(val as number)}
                        style={{ width: 300 }}
                      />
                      <InputNumber
                        min={300}
                        max={1200}
                        value={containerWidth}
                        onChange={(val) => setContainerWidth(val as number)}
                      />
                      <span>px</span>
                    </Space>
                  </Space>

                  <div
                    className="demo-container"
                    style={{ width: `${containerWidth}px`, margin: '0 auto' }}
                  >
                    <div className="responsive-card">
                      <img
                        src="https://via.placeholder.com/400x300"
                        alt="Demo"
                        className="responsive-card__image"
                      />
                      <div className="responsive-card__content">
                        <h3 className="responsive-card__title">响应式卡片标题</h3>
                        <p className="responsive-card__description">
                          这个卡片会根据容器宽度自动调整布局。当容器小于 500px 时为垂直布局，
                          大于 500px 时为水平布局，大于 700px 时显示更多内容。
                        </p>
                        <div className="responsive-card__meta">
                          <span>作者: Leon Wang</span>
                          <span className="responsive-card__date">2025-12-27</span>
                        </div>
                        <div className="responsive-card__actions">
                          <button className="responsive-card__button">查看详情</button>
                          <button className="responsive-card__button responsive-card__button--secondary">
                            分享
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="css-container-queries-example__code" style={{ marginTop: 24 }}>
                    {`/* CSS Container Query 实现 */
.demo-container {
  container-type: inline-size;
}

.responsive-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 容器宽度 >= 500px: 水平布局 */
@container (min-width: 500px) {
  .responsive-card {
    flex-direction: row;
  }

  .responsive-card__image {
    width: 200px;
    height: 150px;
  }
}

/* 容器宽度 >= 700px: 显示更多内容 */
@container (min-width: 700px) {
  .responsive-card__title {
    font-size: 24px;
  }

  .responsive-card__date {
    display: inline;  /* 显示日期 */
  }

  .responsive-card__actions {
    flex-direction: row;
  }
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '3',
            label: '网格布局示例',
            children: (
              <div className="css-container-queries-example__section">
                <Card title="响应式网格 - 自适应列数">
                  <p className="css-container-queries-example__desc">
                    网格会根据容器宽度自动调整列数，无需媒体查询
                  </p>

                  <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }} size="middle">
                    <Space>
                      <span>容器宽度:</span>
                      <Slider
                        min={300}
                        max={1200}
                        value={containerWidth}
                        onChange={(val) => setContainerWidth(val as number)}
                        style={{ width: 300 }}
                      />
                      <InputNumber
                        min={300}
                        max={1200}
                        value={containerWidth}
                        onChange={(val) => setContainerWidth(val as number)}
                      />
                      <span>px</span>
                    </Space>
                    <Space>
                      <span>卡片数量:</span>
                      <InputNumber
                        min={1}
                        max={12}
                        value={cardCount}
                        onChange={(val) => setCardCount(val as number)}
                      />
                    </Space>
                  </Space>

                  <div
                    className="grid-demo-wrapper"
                    style={{ width: `${containerWidth}px`, margin: '0 auto' }}
                  >
                    <div className="grid-container">
                      {Array.from({ length: cardCount }, (_, i) => (
                        <div key={i} className="grid-card">
                          <div className="grid-card__icon">📊</div>
                          <h4 className="grid-card__title">卡片 {i + 1}</h4>
                          <p className="grid-card__text">这是卡片内容</p>
                          <div className="grid-card__footer">
                            <button className="grid-card__button">操作</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="css-container-queries-example__code" style={{ marginTop: 24 }}>
                    {`/* 响应式网格 - 使用 Container Query */
.grid-demo-wrapper {
  container-type: inline-size;  /* 在外层容器设置查询类型 */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

/* 容器宽度 >= 400px: 2 列 */
@container (min-width: 400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 容器宽度 >= 600px: 3 列 */
@container (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 容器宽度 >= 900px: 4 列 */
@container (min-width: 900px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '4',
            label: 'vs Media Queries',
            children: (
              <div className="css-container-queries-example__section">
                <Card title="Container Queries vs Media Queries">
                  <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <div>
                      <h4><CheckCircleOutlined style={{ color: '#52c41a' }} /> Container Queries 优势：</h4>
                      <ul>
                        <li>基于容器尺寸，而非视口尺寸</li>
                        <li>组件真正独立和可复用</li>
                        <li>在不同位置使用同一组件时自动适应</li>
                        <li>更适合组件化开发</li>
                        <li>减少媒体查询的复杂性</li>
                      </ul>
                    </div>

                    <div>
                      <h4>对比示例：</h4>
                      <div className="comparison">
                        <div className="comparison__item">
                          <h5>Media Query 方式</h5>
                          <div className="css-container-queries-example__code">
                            {`/* 基于视口宽度 */
@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }
}

/* 问题：卡片在侧边栏中可能太小 */`}
                          </div>
                        </div>

                        <div className="comparison__item">
                          <h5>Container Query 方式</h5>
                          <div className="css-container-queries-example__code">
                            {`/* 基于容器宽度 */
@container (min-width: 500px) {
  .card {
    flex-direction: row;
  }
}

/* 优势：无论在哪里使用都能正确响应 */`}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4>使用场景：</h4>
                      <ul>
                        <li><strong>Container Queries:</strong> 组件内部样式、可复用组件、卡片布局</li>
                        <li><strong>Media Queries:</strong> 页面级布局、导航栏、全局样式</li>
                      </ul>
                    </div>
                  </Space>
                </Card>
              </div>
            ),
          },
          {
            key: '5',
            label: '高级用法',
            children: (
              <div className="css-container-queries-example__section">
                <Card title="Container Query Units">
                  <p className="css-container-queries-example__desc">
                    容器查询提供了新的单位，用于基于容器尺寸的动态样式
                  </p>

                  <div className="css-container-queries-example__code">
                    {`/* Container Query Units */
.container {
  container-type: inline-size;
}

.title {
  /* cqw: 容器宽度的 1% */
  font-size: clamp(16px, 5cqw, 48px);

  /* cqh: 容器高度的 1% */
  padding: 2cqh;

  /* cqi: 容器内联尺寸的 1% */
  margin: 1cqi;

  /* cqb: 容器块尺寸的 1% */
  height: 50cqb;

  /* cqmin: cqi 和 cqb 中的较小值 */
  gap: 2cqmin;

  /* cqmax: cqi 和 cqb 中的较大值 */
  border-radius: 1cqmax;
}`}
                  </div>

                  <Divider>容器单位演示</Divider>

                  <div className="unit-demo-container">
                    <div className="unit-demo-card">
                      <h3 className="unit-demo-card__title">动态字体大小</h3>
                      <p className="unit-demo-card__text">
                        标题使用 5cqw 单位，会根据容器宽度自动缩放
                      </p>
                    </div>
                  </div>
                </Card>

                <Card title="嵌套容器查询" style={{ marginTop: 24 }}>
                  <p className="css-container-queries-example__desc">
                    容器查询可以嵌套使用，实现更复杂的响应式设计
                  </p>

                  <div className="css-container-queries-example__code">
                    {`/* 嵌套容器 */
.page {
  container-name: page;
  container-type: inline-size;
}

.sidebar {
  container-name: sidebar;
  container-type: inline-size;
}

/* 基于页面容器 */
@container page (min-width: 1200px) {
  .sidebar {
    width: 300px;
  }
}

/* 基于侧边栏容器 */
@container sidebar (min-width: 250px) {
  .widget {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}`}
                  </div>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CssContainerQueriesExample;
