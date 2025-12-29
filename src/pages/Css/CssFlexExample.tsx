/**
 * @file src/pages/Css/CssFlexExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Tag, Space, Tabs, Radio, Slider, InputNumber, Switch, Divider } from '@derbysoft/neat-design';
import './CssFlexExample.scss';

/**
 * CssFlexExample component - Demonstrates CSS Flexbox layout techniques
 */
const CssFlexExample: React.FC = () => {
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'>('flex-start');
  const [alignItems, setAlignItems] = useState<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'>('stretch');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap');
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(6);

  const renderFlexItems = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <div key={i} className="flex-demo__item">
        Item {i + 1}
      </div>
    ));
  };

  const renderFlexItemsWithSizes = (sizes: number[]) => {
    return sizes.map((size, i) => (
      <div key={i} className="flex-demo__item" style={{ flex: size }}>
        flex: {size}
      </div>
    ));
  };

  return (
    <div className="css-flex-example">
      <h2 className="css-flex-example__title">
        CSS Flexbox 布局完全指南
      </h2>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: 'Flex 基础',
            children: (
              <div className="css-flex-example__section">
                <Card title="Flexbox 基础概念">
                  <p className="css-flex-example__desc">
                    <Tag color="blue">一维布局系统</Tag>
                    Flexbox 是一维布局方式，主要用于在一个方向上（行或列）分配和对齐空间
                  </p>

                  <div className="css-flex-example__code">
                    {`/* 基础 Flex 容器 */
.container {
  display: flex;                    /* 启用 flex 布局 */
  flex-direction: row;              /* 主轴方向: row | column */
  justify-content: flex-start;      /* 主轴对齐 */
  align-items: stretch;             /* 交叉轴对齐 */
  flex-wrap: nowrap;                /* 是否换行 */
  gap: 16px;                        /* 间距 */
}

/* Flex 子项 */
.item {
  flex: 1;                          /* flex-grow, flex-shrink, flex-basis 简写 */
  flex-grow: 1;                     /* 放大比例 */
  flex-shrink: 1;                   /* 缩小比例 */
  flex-basis: auto;                 /* 初始大小 */
  align-self: auto;                 /* 单独设置对齐方式 */
}`}
                  </div>

                  <Divider>交互式演示</Divider>

                  <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }} size="middle">
                    <Space>
                      <span>flex-direction:</span>
                      <Radio.Group value={flexDirection} onChange={(e) => setFlexDirection(e.target.value)}>
                        <Radio.Button value="row">row</Radio.Button>
                        <Radio.Button value="row-reverse">row-reverse</Radio.Button>
                        <Radio.Button value="column">column</Radio.Button>
                        <Radio.Button value="column-reverse">column-reverse</Radio.Button>
                      </Radio.Group>
                    </Space>
                    <Space>
                      <span>justify-content:</span>
                      <Radio.Group value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)}>
                        <Radio.Button value="flex-start">flex-start</Radio.Button>
                        <Radio.Button value="flex-end">flex-end</Radio.Button>
                        <Radio.Button value="center">center</Radio.Button>
                        <Radio.Button value="space-between">space-between</Radio.Button>
                        <Radio.Button value="space-around">space-around</Radio.Button>
                        <Radio.Button value="space-evenly">space-evenly</Radio.Button>
                      </Radio.Group>
                    </Space>
                    <Space>
                      <span>align-items:</span>
                      <Radio.Group value={alignItems} onChange={(e) => setAlignItems(e.target.value)}>
                        <Radio.Button value="flex-start">flex-start</Radio.Button>
                        <Radio.Button value="flex-end">flex-end</Radio.Button>
                        <Radio.Button value="center">center</Radio.Button>
                        <Radio.Button value="stretch">stretch</Radio.Button>
                        <Radio.Button value="baseline">baseline</Radio.Button>
                      </Radio.Group>
                    </Space>
                    <Space>
                      <span>flex-wrap:</span>
                      <Radio.Group value={flexWrap} onChange={(e) => setFlexWrap(e.target.value)}>
                        <Radio.Button value="nowrap">nowrap</Radio.Button>
                        <Radio.Button value="wrap">wrap</Radio.Button>
                        <Radio.Button value="wrap-reverse">wrap-reverse</Radio.Button>
                      </Radio.Group>
                    </Space>
                    <Space>
                      <span>gap:</span>
                      <Slider
                        min={0}
                        max={48}
                        value={gap}
                        onChange={(val) => setGap(val as number)}
                        style={{ width: 200 }}
                      />
                      <InputNumber min={0} max={48} value={gap} onChange={(val) => setGap(val as number)} />
                      <span>px</span>
                    </Space>
                    <Space>
                      <span>元素数量:</span>
                      <InputNumber
                        min={1}
                        max={12}
                        value={itemCount}
                        onChange={(val) => setItemCount(val as number)}
                      />
                    </Space>
                  </Space>

                  <div
                    className="flex-demo__container"
                    style={{
                      display: 'flex',
                      flexDirection,
                      justifyContent,
                      alignItems,
                      flexWrap,
                      gap: `${gap}px`,
                      minHeight: flexDirection.includes('column') ? '500px' : '200px',
                    }}
                  >
                    {renderFlexItems(itemCount)}
                  </div>

                  <div className="css-flex-example__code" style={{ marginTop: 16 }}>
                    {`/* 当前配置 */
.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '2',
            label: 'flex 属性',
            children: (
              <div className="css-flex-example__section">
                <Card title="flex-grow, flex-shrink, flex-basis">
                  <p className="css-flex-example__desc">
                    <Tag color="green">flex 简写</Tag>
                    flex 属性是 flex-grow、flex-shrink 和 flex-basis 的简写
                  </p>

                  <div className="css-flex-example__code">
                    {`/* flex 简写语法 */
.item {
  flex: 1;              /* flex: 1 1 0% */
  flex: auto;           /* flex: 1 1 auto */
  flex: none;           /* flex: 0 0 auto */
  flex: 2;              /* flex: 2 1 0% */
  flex: 0 1 200px;      /* 完整写法 */
}

/* flex-grow: 放大比例 */
.item-1 { flex-grow: 1; }  /* 占 1 份 */
.item-2 { flex-grow: 2; }  /* 占 2 份 */
.item-3 { flex-grow: 3; }  /* 占 3 份 */

/* flex-shrink: 缩小比例 */
.item { flex-shrink: 1; }  /* 默认值，可缩小 */
.item { flex-shrink: 0; }  /* 不缩小 */

/* flex-basis: 初始大小 */
.item { flex-basis: 200px; }  /* 固定初始宽度 */
.item { flex-basis: auto; }   /* 根据内容自动 */`}
                  </div>

                  <Divider>flex 比例演示</Divider>

                  <h4>flex: 1, 2, 3 的效果</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    {renderFlexItemsWithSizes([1, 2, 3])}
                  </div>

                  <h4 style={{ marginTop: 24 }}>flex: 1, 1, 1 (平均分配)</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    {renderFlexItemsWithSizes([1, 1, 1])}
                  </div>

                  <h4 style={{ marginTop: 24 }}>flex: 2, 1, 1 (第一个占两份)</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    {renderFlexItemsWithSizes([2, 1, 1])}
                  </div>

                  <h4 style={{ marginTop: 24 }}>flex: 3, 2, 1 (递减比例)</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    {renderFlexItemsWithSizes([3, 2, 1])}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '3',
            label: '常见布局',
            children: (
              <div className="css-flex-example__section">
                <Card title="Flex 常见布局模式">
                  <h3>1. 水平居中</h3>
                  <div className="flex-demo__container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="flex-demo__item">Centered</div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.container {
  display: flex;
  justify-content: center;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>2. 垂直居中</h3>
                  <div className="flex-demo__container" style={{ display: 'flex', alignItems: 'center', minHeight: '150px' }}>
                    <div className="flex-demo__item">Centered</div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.container {
  display: flex;
  align-items: center;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>3. 水平垂直居中</h3>
                  <div className="flex-demo__container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150px' }}>
                    <div className="flex-demo__item">Perfect Center</div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>4. 两端对齐</h3>
                  <div className="flex-demo__container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="flex-demo__item">Left</div>
                    <div className="flex-demo__item">Right</div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.container {
  display: flex;
  justify-content: space-between;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>5. 左固定，右自适应</h3>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    <div className="flex-demo__item" style={{ flexBasis: '200px', flexShrink: 0 }}>
                      Fixed 200px
                    </div>
                    <div className="flex-demo__item" style={{ flex: 1 }}>
                      Flexible
                    </div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.container {
  display: flex;
  gap: 16px;
}
.left {
  flex-basis: 200px;
  flex-shrink: 0;
}
.right {
  flex: 1;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>6. 圣杯布局（三栏）</h3>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    <div className="flex-demo__item" style={{ flexBasis: '200px', flexShrink: 0 }}>
                      Left Sidebar
                    </div>
                    <div className="flex-demo__item" style={{ flex: 1 }}>
                      Main Content
                    </div>
                    <div className="flex-demo__item" style={{ flexBasis: '200px', flexShrink: 0 }}>
                      Right Sidebar
                    </div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.container {
  display: flex;
  gap: 16px;
}
.sidebar {
  flex-basis: 200px;
  flex-shrink: 0;
}
.main {
  flex: 1;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>7. 均匀分布</h3>
                  <div className="flex-demo__container" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    {renderFlexItems(4)}
                  </div>
                  <div className="css-flex-example__code">
                    {`.container {
  display: flex;
  justify-content: space-evenly;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>8. 响应式网格（自动换行）</h3>
                  <div className="flex-demo__container" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="flex-demo__item" style={{ flex: '1 1 calc(25% - 16px)', minWidth: '150px' }}>
                        Item {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="css-flex-example__code">
                    {`.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.item {
  flex: 1 1 calc(25% - 16px);
  min-width: 150px;
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '4',
            label: 'align-self',
            children: (
              <div className="css-flex-example__section">
                <Card title="align-self - 单独控制子项对齐">
                  <p className="css-flex-example__desc">
                    <Tag color="purple">单独对齐</Tag>
                    align-self 允许单个子项有不同的对齐方式，覆盖 align-items
                  </p>

                  <div className="css-flex-example__code">
                    {`/* 容器统一对齐 */
.container {
  display: flex;
  align-items: center;
}

/* 单独控制某个子项 */
.item-1 { align-self: flex-start; }
.item-2 { align-self: center; }
.item-3 { align-self: flex-end; }
.item-4 { align-self: stretch; }
.item-5 { align-self: baseline; }`}
                  </div>

                  <Divider>演示</Divider>

                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px', minHeight: '200px', alignItems: 'center' }}>
                    <div className="flex-demo__item" style={{ alignSelf: 'flex-start' }}>
                      flex-start
                    </div>
                    <div className="flex-demo__item" style={{ alignSelf: 'center' }}>
                      center
                    </div>
                    <div className="flex-demo__item" style={{ alignSelf: 'flex-end' }}>
                      flex-end
                    </div>
                    <div className="flex-demo__item" style={{ alignSelf: 'stretch' }}>
                      stretch
                    </div>
                    <div className="flex-demo__item" style={{ alignSelf: 'baseline', fontSize: '24px' }}>
                      baseline
                    </div>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '5',
            label: '实战案例',
            children: (
              <div className="css-flex-example__section">
                <Card title="实战布局案例">
                  <h3>1. 导航栏布局</h3>
                  <div className="flex-demo__navbar">
                    <div className="flex-demo__navbar-logo">Logo</div>
                    <div className="flex-demo__navbar-menu">
                      <span>Home</span>
                      <span>About</span>
                      <span>Services</span>
                      <span>Contact</span>
                    </div>
                    <div className="flex-demo__navbar-actions">
                      <button>Login</button>
                    </div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.navbar-menu {
  display: flex;
  gap: 24px;
  flex: 1;
  justify-content: center;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>2. 卡片布局</h3>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {Array.from({ length: 3 }, (_, i) => (
                      <div key={i} className="flex-demo__card">
                        <div className="flex-demo__card-image">Image</div>
                        <div className="flex-demo__card-content">
                          <h4>Card Title {i + 1}</h4>
                          <p>Card description goes here with some sample text.</p>
                        </div>
                        <div className="flex-demo__card-footer">
                          <button>Read More</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="css-flex-example__code">
                    {`.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 calc(33.333% - 16px);
}
.card-content {
  flex: 1; /* 内容区域填充剩余空间 */
}
.card-footer {
  margin-top: auto; /* 固定在底部 */
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>3. 表单布局</h3>
                  <div className="flex-demo__form">
                    <div className="flex-demo__form-row">
                      <label>Name:</label>
                      <input type="text" placeholder="Enter your name" />
                    </div>
                    <div className="flex-demo__form-row">
                      <label>Email:</label>
                      <input type="email" placeholder="Enter your email" />
                    </div>
                    <div className="flex-demo__form-row">
                      <label>Message:</label>
                      <textarea placeholder="Enter your message" rows={3}></textarea>
                    </div>
                    <div className="flex-demo__form-actions">
                      <button>Cancel</button>
                      <button>Submit</button>
                    </div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.form-row {
  display: flex;
  gap: 16px;
  align-items: center;
}
.form-row label {
  flex-basis: 100px;
  flex-shrink: 0;
}
.form-row input,
.form-row textarea {
  flex: 1;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>4. Footer 布局</h3>
                  <div className="flex-demo__footer">
                    <div className="flex-demo__footer-section">
                      <h4>About Us</h4>
                      <p>Company information</p>
                    </div>
                    <div className="flex-demo__footer-section">
                      <h4>Quick Links</h4>
                      <p>Link 1, Link 2, Link 3</p>
                    </div>
                    <div className="flex-demo__footer-section">
                      <h4>Contact</h4>
                      <p>Email: info@example.com</p>
                    </div>
                    <div className="flex-demo__footer-section">
                      <h4>Follow Us</h4>
                      <p>Social Media Links</p>
                    </div>
                  </div>
                  <div className="css-flex-example__code">
                    {`.footer {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.footer-section {
  flex: 1 1 200px;
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '6',
            label: 'align-content',
            children: (
              <div className="css-flex-example__section">
                <Card title="align-content - 多行内容对齐">
                  <p className="css-flex-example__desc">
                    <Tag color="cyan">多行对齐</Tag>
                    align-content 控制多行之间的对齐方式，只在 flex-wrap: wrap 时生效
                  </p>

                  <div className="css-flex-example__code">
                    {`/* align-content 属性 */
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;    /* 多行顶部对齐 */
  align-content: flex-end;      /* 多行底部对齐 */
  align-content: center;        /* 多行居中对齐 */
  align-content: space-between; /* 多行两端对齐 */
  align-content: space-around;  /* 多行环绕对齐 */
  align-content: stretch;       /* 多行拉伸填充 */
}`}
                  </div>

                  <Divider>演示</Divider>

                  <h4>align-content: flex-start</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', minHeight: '300px', gap: '16px' }}>
                    {renderFlexItems(8)}
                  </div>

                  <h4 style={{ marginTop: 24 }}>align-content: center</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center', minHeight: '300px', gap: '16px' }}>
                    {renderFlexItems(8)}
                  </div>

                  <h4 style={{ marginTop: 24 }}>align-content: space-between</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-between', minHeight: '300px', gap: '16px' }}>
                    {renderFlexItems(8)}
                  </div>

                  <h4 style={{ marginTop: 24 }}>align-content: space-around</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-around', minHeight: '300px', gap: '16px' }}>
                    {renderFlexItems(8)}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '7',
            label: 'order 属性',
            children: (
              <div className="css-flex-example__section">
                <Card title="order - 改变元素顺序">
                  <p className="css-flex-example__desc">
                    <Tag color="purple">顺序控制</Tag>
                    order 属性定义项目的排列顺序，数值越小越靠前，默认为 0
                  </p>

                  <div className="css-flex-example__code">
                    {`/* order 属性 */
.item-1 { order: 3; }  /* 显示在最后 */
.item-2 { order: 1; }  /* 显示在第一个 */
.item-3 { order: 2; }  /* 显示在中间 */

/* 常见用法：调整元素位置 */
.sidebar { order: -1; }  /* 移到最前面 */
.main { order: 0; }      /* 保持默认 */
.footer { order: 1; }    /* 移到最后 */`}
                  </div>

                  <Divider>演示</Divider>

                  <h4>默认顺序 (order: 0)</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    <div className="flex-demo__item">Item 1</div>
                    <div className="flex-demo__item">Item 2</div>
                    <div className="flex-demo__item">Item 3</div>
                    <div className="flex-demo__item">Item 4</div>
                  </div>

                  <h4 style={{ marginTop: 24 }}>使用 order 调整顺序</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    <div className="flex-demo__item" style={{ order: 3 }}>
                      Item 1<br /><small>(order: 3)</small>
                    </div>
                    <div className="flex-demo__item" style={{ order: 1 }}>
                      Item 2<br /><small>(order: 1)</small>
                    </div>
                    <div className="flex-demo__item" style={{ order: 4 }}>
                      Item 3<br /><small>(order: 4)</small>
                    </div>
                    <div className="flex-demo__item" style={{ order: 2 }}>
                      Item 4<br /><small>(order: 2)</small>
                    </div>
                  </div>

                  <h4 style={{ marginTop: 24 }}>实战：移动端布局调整</h4>
                  <div className="flex-demo__mobile-layout">
                    <div className="flex-demo__mobile-header" style={{ order: 1 }}>
                      Header (order: 1)
                    </div>
                    <div className="flex-demo__mobile-sidebar" style={{ order: 3 }}>
                      Sidebar (order: 3)
                    </div>
                    <div className="flex-demo__mobile-main" style={{ order: 2 }}>
                      Main Content (order: 2)
                    </div>
                    <div className="flex-demo__mobile-footer" style={{ order: 4 }}>
                      Footer (order: 4)
                    </div>
                  </div>
                  <div className="css-flex-example__code">
                    {`/* 移动端布局：调整显示顺序 */
.container {
  display: flex;
  flex-direction: column;
}
.header { order: 1; }    /* 首先显示 */
.main { order: 2; }      /* 主内容第二 */
.sidebar { order: 3; }   /* 侧边栏第三 */
.footer { order: 4; }    /* 页脚最后 */`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '8',
            label: 'margin: auto',
            children: (
              <div className="css-flex-example__section">
                <Card title="margin: auto 的妙用">
                  <p className="css-flex-example__desc">
                    <Tag color="orange">自动边距</Tag>
                    在 Flex 容器中，margin: auto 可以吸收剩余空间，实现特殊的对齐效果
                  </p>

                  <div className="css-flex-example__code">
                    {`/* margin: auto 在 Flex 中的妙用 */
.container {
  display: flex;
}
.item {
  margin-left: auto;   /* 推到最右边 */
  margin-right: auto;  /* 水平居中 */
  margin-top: auto;    /* 推到底部 */
  margin: auto;        /* 完全居中 */
}`}
                  </div>

                  <Divider>演示</Divider>

                  <h4>margin-left: auto (推到右边)</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    <div className="flex-demo__item">Item 1</div>
                    <div className="flex-demo__item">Item 2</div>
                    <div className="flex-demo__item" style={{ marginLeft: 'auto' }}>
                      margin-left: auto
                    </div>
                  </div>

                  <h4 style={{ marginTop: 24 }}>margin-right: auto (推到左边)</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    <div className="flex-demo__item" style={{ marginRight: 'auto' }}>
                      margin-right: auto
                    </div>
                    <div className="flex-demo__item">Item 2</div>
                    <div className="flex-demo__item">Item 3</div>
                  </div>

                  <h4 style={{ marginTop: 24 }}>左右 auto (水平居中单个元素)</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', gap: '16px' }}>
                    <div className="flex-demo__item">Left</div>
                    <div className="flex-demo__item" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                      Center (margin: 0 auto)
                    </div>
                    <div className="flex-demo__item">Right</div>
                  </div>

                  <h4 style={{ marginTop: 24 }}>实战：导航栏分组</h4>
                  <div className="flex-demo__auto-navbar">
                    <div className="flex-demo__item">Logo</div>
                    <div className="flex-demo__item">Home</div>
                    <div className="flex-demo__item">About</div>
                    <div className="flex-demo__item" style={{ marginLeft: 'auto' }}>Login</div>
                    <div className="flex-demo__item">Signup</div>
                  </div>
                  <div className="css-flex-example__code">
                    {`/* 导航栏：左侧菜单，右侧登录按钮 */
.navbar {
  display: flex;
  gap: 16px;
}
.login-btn {
  margin-left: auto; /* 推到右边 */
}`}
                  </div>

                  <h4 style={{ marginTop: 24 }}>垂直方向的 auto</h4>
                  <div className="flex-demo__container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '300px' }}>
                    <div className="flex-demo__item">Top Item</div>
                    <div className="flex-demo__item" style={{ marginTop: 'auto' }}>
                      Bottom Item (margin-top: auto)
                    </div>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '9',
            label: '高级技巧',
            children: (
              <div className="css-flex-example__section">
                <Card title="Flex 高级技巧">
                  <h3>1. Flex 嵌套布局</h3>
                  <p className="css-flex-example__desc">
                    <Tag color="red">嵌套容器</Tag>
                    Flex 容器可以嵌套，实现复杂的二维布局
                  </p>

                  <div className="flex-demo__nested-container">
                    <div className="flex-demo__nested-row">
                      <div className="flex-demo__nested-item">1-1</div>
                      <div className="flex-demo__nested-item">1-2</div>
                      <div className="flex-demo__nested-item">1-3</div>
                    </div>
                    <div className="flex-demo__nested-row">
                      <div className="flex-demo__nested-item" style={{ flex: 2 }}>2-1 (flex: 2)</div>
                      <div className="flex-demo__nested-item" style={{ flex: 1 }}>2-2 (flex: 1)</div>
                    </div>
                    <div className="flex-demo__nested-row">
                      <div className="flex-demo__nested-item">3-1</div>
                      <div className="flex-demo__nested-item">3-2</div>
                      <div className="flex-demo__nested-item">3-3</div>
                      <div className="flex-demo__nested-item">3-4</div>
                    </div>
                  </div>
                  <div className="css-flex-example__code">
                    {`/* Flex 嵌套布局 */
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.row {
  display: flex;
  gap: 16px;
}
.item {
  flex: 1;
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>2. 等高列布局</h3>
                  <p className="css-flex-example__desc">
                    <Tag color="green">自动等高</Tag>
                    Flex 子项默认 align-items: stretch，自动实现等高效果
                  </p>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div className="flex-demo__equal-height-card">
                      <h4>Card 1</h4>
                      <p>Short content</p>
                    </div>
                    <div className="flex-demo__equal-height-card">
                      <h4>Card 2</h4>
                      <p>
                        Much longer content that spans multiple lines.
                        This card has more text than the others.
                        Notice how all cards have the same height automatically.
                      </p>
                    </div>
                    <div className="flex-demo__equal-height-card">
                      <h4>Card 3</h4>
                      <p>Medium length content here.</p>
                    </div>
                  </div>
                  <div className="css-flex-example__code">
                    {`/* 等高列布局 */
.container {
  display: flex;
  gap: 16px;
  align-items: stretch; /* 默认值，可省略 */
}
.card {
  flex: 1;
  /* 所有卡片自动等高 */
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>3. Sticky Footer (粘性页脚)</h3>
                  <p className="css-flex-example__desc">
                    <Tag color="blue">粘性布局</Tag>
                    使用 flex: 1 让主内容区域填充剩余空间，页脚始终在底部
                  </p>

                  <div className="flex-demo__sticky-footer-example">
                    <div className="flex-demo__sticky-header">Header</div>
                    <div className="flex-demo__sticky-main">
                      Main Content (flex: 1)
                      <br />
                      This area fills all remaining space
                    </div>
                    <div className="flex-demo__sticky-footer">Footer (Always at bottom)</div>
                  </div>
                  <div className="css-flex-example__code">
                    {`/* Sticky Footer 布局 */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1; /* 填充剩余空间 */
}
footer {
  /* 自动固定在底部 */
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>4. 流式标签布局</h3>
                  <p className="css-flex-example__desc">
                    <Tag color="purple">自动换行</Tag>
                    flex-wrap 实现标签云等流式布局
                  </p>

                  <div className="flex-demo__tag-container">
                    {['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure'].map((tag) => (
                      <div key={tag} className="flex-demo__tag">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="css-flex-example__code">
                    {`/* 流式标签布局 */
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.tag {
  padding: 6px 16px;
  border-radius: 16px;
  /* 标签大小根据内容自适应 */
}`}
                  </div>

                  <h3 style={{ marginTop: 24 }}>5. 圣杯布局 + Sticky Header</h3>
                  <p className="css-flex-example__desc">
                    <Tag color="cyan">复合布局</Tag>
                    结合多种 Flex 技巧实现完整的应用布局
                  </p>

                  <div className="flex-demo__app-layout">
                    <div className="flex-demo__app-header">App Header (Sticky)</div>
                    <div className="flex-demo__app-body">
                      <div className="flex-demo__app-sidebar">Sidebar</div>
                      <div className="flex-demo__app-main">Main Content Area</div>
                      <div className="flex-demo__app-aside">Right Aside</div>
                    </div>
                    <div className="flex-demo__app-footer">App Footer</div>
                  </div>
                  <div className="css-flex-example__code">
                    {`/* 完整应用布局 */
.app-layout {
  display: flex;
  flex-direction: column;
  height: 400px;
}
.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.sidebar {
  flex-basis: 200px;
  flex-shrink: 0;
}
.main {
  flex: 1;
  overflow-y: auto;
}
.aside {
  flex-basis: 200px;
  flex-shrink: 0;
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

export default CssFlexExample;
