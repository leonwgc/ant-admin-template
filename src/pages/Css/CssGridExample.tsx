/**
 * @file src/pages/Css/CssGridExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  Card,
  Tag,
  Space,
  Tabs,
  Radio,
  Slider,
  InputNumber,
  Switch,
  Divider,
} from 'antd';
import { LayoutOutlined, AppstoreOutlined } from '@ant-design/icons';
import './CssGridExample.scss';

/**
 * CssGridExample component - Demonstrates CSS Grid layout techniques
 */
const CssGridExample: React.FC = () => {
  const [gridColumns, setGridColumns] = useState(3);
  const [gridGap, setGridGap] = useState(16);
  const [autoFit, setAutoFit] = useState(false);
  const [itemCount, setItemCount] = useState(12);

  const renderGridItems = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <div key={i} className="grid-demo__item">
        <div className="grid-demo__item-content">
          <AppstoreOutlined style={{ fontSize: 24, marginBottom: 8 }} />
          <span>Item {i + 1}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="css-grid-example">
      <h2 className="css-grid-example__title">
        <LayoutOutlined /> CSS Grid 布局完全指南
      </h2>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: '基础网格',
            children: (
              <div className="css-grid-example__section">
                <Card title="Grid 基础语法">
                  <p className="css-grid-example__desc">
                    <Tag color="blue">最强大的布局系统</Tag>
                    CSS Grid 是二维布局系统，可以同时控制行和列
                  </p>

                  <div className="css-grid-example__code">
                    {`/* 基础网格 */
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* 固定宽度 */
  grid-template-rows: 100px 100px;          /* 固定高度 */
  gap: 16px;                                /* 间距 */
}

/* 使用 fr 单位 - 自适应分配空间 */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 平均分配 */
  grid-template-columns: 1fr 2fr 1fr;  /* 比例分配 */
  gap: 16px;
}

/* repeat() 函数 - 简化重复值 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);     /* 3列等宽 */
  grid-template-columns: repeat(4, 100px);   /* 4列固定宽 */
  grid-template-columns: repeat(3, 1fr 2fr); /* 重复模式 */
}`}
                  </div>

                  <Divider>交互式演示</Divider>

                  <Space
                    direction="vertical"
                    style={{ width: '100%', marginBottom: 16 }}
                  >
                    <Space>
                      <span>列数:</span>
                      <Slider
                        min={1}
                        max={6}
                        value={gridColumns}
                        onChange={setGridColumns}
                        style={{ width: 200 }}
                      />
                      <InputNumber
                        min={1}
                        max={6}
                        value={gridColumns}
                        onChange={(val) => setGridColumns(val || 3)}
                      />
                    </Space>
                    <Space>
                      <span>间距 (gap):</span>
                      <Slider
                        min={0}
                        max={48}
                        value={gridGap}
                        onChange={setGridGap}
                        style={{ width: 200 }}
                      />
                      <InputNumber
                        min={0}
                        max={48}
                        value={gridGap}
                        onChange={(val) => setGridGap(val || 16)}
                      />
                      <span>px</span>
                    </Space>
                    <Space>
                      <span>元素数量:</span>
                      <InputNumber
                        min={1}
                        max={24}
                        value={itemCount}
                        onChange={(val) => setItemCount(val || 12)}
                      />
                    </Space>
                  </Space>

                  <div
                    className="grid-demo__container"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                      gap: `${gridGap}px`,
                    }}
                  >
                    {renderGridItems(itemCount)}
                  </div>

                  <div
                    className="css-grid-example__code"
                    style={{ marginTop: 16 }}
                  >
                    {`/* 当前配置 */
.container {
  display: grid;
  grid-template-columns: repeat(${gridColumns}, 1fr);
  gap: ${gridGap}px;
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '2',
            label: '响应式网格',
            children: (
              <div className="css-grid-example__section">
                <Card title="auto-fit & auto-fill - 自适应网格">
                  <p className="css-grid-example__desc">
                    <Tag color="green">响应式布局</Tag>
                    使用 auto-fit 或 auto-fill 创建自适应网格，无需媒体查询
                  </p>

                  <div className="css-grid-example__code">
                    {`/* auto-fit - 自动填充并拉伸 */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* auto-fill - 自动填充保持尺寸 */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

/* 区别：
 * auto-fit: 空余空间由现有列平分（拉伸）
 * auto-fill: 保持列宽，空余空间留白
 */

/* 响应式卡片布局 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* 组合使用 minmax */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
  gap: 20px;
  justify-content: center; /* 居中对齐 */
}`}
                  </div>

                  <Divider>auto-fit vs auto-fill</Divider>

                  <Space
                    direction="vertical"
                    style={{ width: '100%', marginBottom: 16 }}
                  >
                    <Space>
                      <span>模式:</span>
                      <Radio.Group
                        value={autoFit}
                        onChange={(e) => setAutoFit(e.target.value)}
                      >
                        <Radio.Button value={false}>auto-fill</Radio.Button>
                        <Radio.Button value={true}>auto-fit</Radio.Button>
                      </Radio.Group>
                    </Space>
                  </Space>

                  <div
                    className="grid-demo__container grid-demo__container--auto"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${
                        autoFit ? 'auto-fit' : 'auto-fill'
                      }, minmax(200px, 1fr))`,
                      gap: '16px',
                    }}
                  >
                    {renderGridItems(3)}
                  </div>

                  <div
                    className="css-grid-example__info"
                    style={{ marginTop: 16 }}
                  >
                    <Tag color={autoFit ? 'green' : 'blue'}>
                      {autoFit
                        ? 'auto-fit: 元素拉伸填充整个容器宽度'
                        : 'auto-fill: 元素保持 minmax 定义的宽度，右侧留白'}
                    </Tag>
                    <Tag color="orange" style={{ marginLeft: 8 }}>
                      提示: 容器宽度 3列时才能看出差异，请调整浏览器窗口宽度观察
                    </Tag>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '3',
            label: '网格区域',
            children: (
              <div className="css-grid-example__section">
                <Card title="grid-template-areas - 命名网格区域">
                  <p className="css-grid-example__desc">
                    <Tag color="purple">语义化布局</Tag>
                    使用命名区域创建直观的布局结构
                  </p>

                  <div className="css-grid-example__code">
                    {`/* 经典布局 - 头部、侧边栏、内容、底部 */
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  height: 100vh;
  gap: 16px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }

/* 圣杯布局 */
.holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  min-height: 100vh;
}

/* 卡片布局 */
.card {
  display: grid;
  grid-template-areas:
    "image  image"
    "title  title"
    "desc   desc"
    "author date";
  grid-template-columns: 1fr auto;
  gap: 12px;
}

.card-image  { grid-area: image; }
.card-title  { grid-area: title; }
.card-desc   { grid-area: desc; }
.card-author { grid-area: author; }
.card-date   { grid-area: date; }`}
                  </div>

                  <Divider>布局示例</Divider>

                  <div className="grid-demo__layout">
                    <div className="grid-demo__layout-header">Header</div>
                    <div className="grid-demo__layout-sidebar">Sidebar</div>
                    <div className="grid-demo__layout-content">
                      <h3>Main Content</h3>
                      <p>使用 grid-template-areas 创建的布局</p>
                    </div>
                    <div className="grid-demo__layout-footer">Footer</div>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '4',
            label: '网格对齐',
            children: (
              <div className="css-grid-example__section">
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: '100%' }}
                >
                  <Card title="对齐属性 - 控制网格和项目的对齐">
                    <div className="css-grid-example__code">
                      {`/* 容器对齐 - 控制整个网格 */
.container {
  display: grid;

  /* 水平对齐 */
  justify-content: start;    /* 左对齐 */
  justify-content: end;      /* 右对齐 */
  justify-content: center;   /* 居中 */
  justify-content: space-between;  /* 两端对齐 */
  justify-content: space-around;   /* 周围间距 */
  justify-content: space-evenly;   /* 均匀间距 */

  /* 垂直对齐 */
  align-content: start;      /* 顶部对齐 */
  align-content: end;        /* 底部对齐 */
  align-content: center;     /* 居中 */
  align-content: stretch;    /* 拉伸 */

  /* 简写 */
  place-content: center;     /* 水平垂直居中 */
}

/* 项目对齐 - 控制网格内的项目 */
.container {
  /* 所有项目水平对齐 */
  justify-items: start;      /* 左对齐 */
  justify-items: end;        /* 右对齐 */
  justify-items: center;     /* 居中 */
  justify-items: stretch;    /* 拉伸（默认）*/

  /* 所有项目垂直对齐 */
  align-items: start;        /* 顶部对齐 */
  align-items: end;          /* 底部对齐 */
  align-items: center;       /* 居中 */
  align-items: stretch;      /* 拉伸（默认）*/

  /* 简写 */
  place-items: center;       /* 所有项目居中 */
}

/* 单个项目对齐 */
.item {
  justify-self: center;      /* 水平居中 */
  align-self: center;        /* 垂直居中 */
  place-self: center;        /* 水平垂直居中 */
}`}
                    </div>
                  </Card>

                  <Card title="对齐演示" size="small">
                    <div className="grid-demo__align-container">
                      <div className="grid-demo__align-item grid-demo__align-item--1">
                        justify-self: start
                      </div>
                      <div className="grid-demo__align-item grid-demo__align-item--2">
                        justify-self: center
                      </div>
                      <div className="grid-demo__align-item grid-demo__align-item--3">
                        justify-self: end
                      </div>
                      <div className="grid-demo__align-item grid-demo__align-item--4">
                        align-self: start
                      </div>
                      <div className="grid-demo__align-item grid-demo__align-item--5">
                        place-self: center
                      </div>
                      <div className="grid-demo__align-item grid-demo__align-item--6">
                        align-self: end
                      </div>
                    </div>
                  </Card>
                </Space>
              </div>
            ),
          },
          {
            key: '5',
            label: '高级技巧',
            children: (
              <div className="css-grid-example__section">
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: '100%' }}
                >
                  <Card title="grid-auto-flow - 自动放置算法">
                    <div className="css-grid-example__code">
                      {`/* 自动放置方向 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  grid-auto-flow: row;        /* 行优先（默认）*/
  grid-auto-flow: column;     /* 列优先 */
  grid-auto-flow: dense;      /* 紧密填充，填补空隙 */
  grid-auto-flow: row dense;  /* 行优先 + 紧密填充 */
}`}
                    </div>
                  </Card>

                  <Card title="隐式网格 - grid-auto-rows/columns">
                    <div className="css-grid-example__code">
                      {`/* 控制自动创建的行/列尺寸 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* 自动创建的行高度为 150px */
  grid-auto-rows: 150px;

  /* 使用 minmax 设置范围 */
  grid-auto-rows: minmax(100px, auto);

  /* 多个值循环使用 */
  grid-auto-rows: 100px 200px;
}`}
                    </div>
                  </Card>

                  <Card title="项目跨越 - span 关键字">
                    <div className="css-grid-example__code">
                      {`/* 跨越多列/行 */
.item {
  /* 跨越 2 列 */
  grid-column: span 2;

  /* 跨越 3 行 */
  grid-row: span 3;

  /* 指定起止位置 */
  grid-column: 1 / 3;        /* 从第1列到第3列 */
  grid-row: 1 / 4;           /* 从第1行到第4行 */

  /* 从开始跨越到结束 */
  grid-column: 1 / -1;       /* 占满整行 */

  /* 简写 */
  grid-area: 1 / 1 / 3 / 3;  /* row-start / col-start / row-end / col-end */
}`}
                    </div>

                    <Divider>跨列演示</Divider>

                    <div className="grid-demo__span-container">
                      <div className="grid-demo__span-item grid-demo__span-item--1">
                        span 1
                      </div>
                      <div className="grid-demo__span-item grid-demo__span-item--2">
                        span 2 (跨2列)
                      </div>
                      <div className="grid-demo__span-item grid-demo__span-item--3">
                        span 1
                      </div>
                      <div className="grid-demo__span-item grid-demo__span-item--4">
                        span 3 (跨3列)
                      </div>
                      <div className="grid-demo__span-item grid-demo__span-item--5">
                        span 1
                      </div>
                      <div className="grid-demo__span-item grid-demo__span-item--6">
                        span 2 (跨2列)
                      </div>
                    </div>
                  </Card>

                  <Card title="瀑布流布局 - grid-auto-rows + span">
                    <div className="css-grid-example__code">
                      {`/* 瀑布流/砌体布局 */
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 20px;      /* 小单元格 */
  gap: 16px;
}

.masonry-item {
  /* 根据内容高度动态跨越行 */
  grid-row: span 5;  /* 小卡片 */
  grid-row: span 8;  /* 中卡片 */
  grid-row: span 12; /* 大卡片 */
}`}
                    </div>

                    <Divider>瀑布流演示</Divider>

                    <div className="grid-demo__masonry">
                      {[5, 8, 6, 10, 7, 9, 5, 11, 6, 8, 7, 9].map((span, i) => (
                        <div
                          key={i}
                          className="grid-demo__masonry-item"
                          style={{ gridRow: `span ${span}` }}
                        >
                          <div className="grid-demo__masonry-content">
                            <h4>Card {i + 1}</h4>
                            <p>高度: {span * 20}px</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Space>
              </div>
            ),
          },
          {
            key: '6',
            label: '实战案例',
            children: (
              <div className="css-grid-example__section">
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: '100%' }}
                >
                  <Card title="1. 响应式图片画廊">
                    <div className="css-grid-example__code">
                      {`/* 响应式图片网格 */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}

.gallery-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-item:hover img {
  transform: scale(1.1);
}`}
                    </div>

                    <div className="grid-demo__gallery">
                      {Array.from({ length: 9 }, (_, i) => (
                        <div key={i} className="grid-demo__gallery-item">
                          <div className="grid-demo__gallery-placeholder">
                            Image {i + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card title="2. 仪表板布局">
                    <div className="css-grid-example__code">
                      {`/* 复杂仪表板布局 */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 16px;
}

.widget-large {
  grid-column: span 2;
  grid-row: span 2;
}

.widget-wide {
  grid-column: span 2;
}

.widget-tall {
  grid-row: span 2;
}`}
                    </div>

                    <div className="grid-demo__dashboard">
                      <div className="grid-demo__widget grid-demo__widget--large">
                        Large Widget
                        <br />
                        2x2
                      </div>
                      <div className="grid-demo__widget">Widget 1x1</div>
                      <div className="grid-demo__widget">Widget 1x1</div>
                      <div className="grid-demo__widget grid-demo__widget--wide">
                        Wide Widget 2x1
                      </div>
                      <div className="grid-demo__widget grid-demo__widget--tall">
                        Tall
                        <br />
                        1x2
                      </div>
                      <div className="grid-demo__widget">Widget</div>
                      <div className="grid-demo__widget">Widget</div>
                      <div className="grid-demo__widget">Widget</div>
                    </div>
                  </Card>

                  <Card title="3. 表单布局">
                    <div className="css-grid-example__code">
                      {`/* 智能表单布局 */
.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px 16px;
}

.form-field {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  align-items: center;
}

.form-field-full {
  grid-column: 1 / -1;  /* 占满整行 */
}`}
                    </div>
                  </Card>
                </Space>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CssGridExample;
