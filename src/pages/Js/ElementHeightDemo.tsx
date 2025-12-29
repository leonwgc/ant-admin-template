/**
 * @file src/pages/Js/ElementHeightDemo.tsx
 * @author leon.wang
 */

import React, { useState, useRef, useEffect } from 'react';
import { Card, Slider, InputNumber, Space, Divider, Tag } from '@derbysoft/neat-design';
import './ElementHeightDemo.scss';

/**
 * ElementHeightDemo component - Demonstrates the difference between clientHeight, offsetHeight, and scrollHeight
 */
const ElementHeightDemo: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(5);
  const [contentHeight, setContentHeight] = useState(200);
  const [scrollbarVisible, setScrollbarVisible] = useState(true);

  const [measurements, setMeasurements] = useState({
    clientHeight: 0,
    offsetHeight: 0,
    scrollHeight: 0,
  });

  useEffect(() => {
    if (boxRef.current) {
      setMeasurements({
        clientHeight: boxRef.current.clientHeight,
        offsetHeight: boxRef.current.offsetHeight,
        scrollHeight: boxRef.current.scrollHeight,
      });
    }
  }, [padding, border, contentHeight, scrollbarVisible]);

  return (
    <div className="element-height-demo">
      <h2 className="element-height-demo__title">
        clientHeight vs offsetHeight vs scrollHeight
      </h2>

      <Card title="概念说明">
        <div className="element-height-demo__concept">
          <div className="element-height-demo__concept-item">
            <Tag color="blue">clientHeight</Tag>
            <p>
              元素内部高度 = <strong>content + padding</strong>
              <br />
              不包括：border、scrollbar、margin
            </p>
          </div>
          <div className="element-height-demo__concept-item">
            <Tag color="green">offsetHeight</Tag>
            <p>
              元素可见高度 = <strong>content + padding + border + scrollbar</strong>
              <br />
              不包括：margin
            </p>
          </div>
          <div className="element-height-demo__concept-item">
            <Tag color="purple">scrollHeight</Tag>
            <p>
              元素内容完整高度 = <strong>content（包括溢出部分）+ padding</strong>
              <br />
              不包括：border、margin
            </p>
          </div>
        </div>

        <div className="element-height-demo__code">
          {`// 获取元素的三种高度
const element = document.getElementById('box');

// 1. clientHeight: 内部可见高度（不含border和滚动条）
const clientHeight = element.clientHeight;
// = content height + padding-top + padding-bottom

// 2. offsetHeight: 元素整体高度（含border和滚动条）
const offsetHeight = element.offsetHeight;
// = content height + padding + border + scrollbar

// 3. scrollHeight: 内容完整高度（含溢出部分）
const scrollHeight = element.scrollHeight;
// = actual content height + padding (包括不可见的溢出内容)

// 常见用法：判断是否滚动到底部
if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
  console.log('已滚动到底部');
}`}
        </div>
      </Card>

      <Card title="交互式演示" style={{ marginTop: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <span style={{ width: 120, display: 'inline-block' }}>Padding:</span>
              <Slider
                min={0}
                max={50}
                value={padding}
                onChange={(val) => setPadding(val as number)}
                style={{ width: 200 }}
              />
              <InputNumber
                min={0}
                max={50}
                value={padding}
                onChange={(val) => setPadding(val as number)}
              />
              <span>px</span>
            </Space>
            <Space>
              <span style={{ width: 120, display: 'inline-block' }}>Border:</span>
              <Slider
                min={0}
                max={20}
                value={border}
                onChange={(val) => setBorder(val as number)}
                style={{ width: 200 }}
              />
              <InputNumber
                min={0}
                max={20}
                value={border}
                onChange={(val) => setBorder(val as number)}
              />
              <span>px</span>
            </Space>
            <Space>
              <span style={{ width: 120, display: 'inline-block' }}>Content Height:</span>
              <Slider
                min={100}
                max={500}
                value={contentHeight}
                onChange={(val) => setContentHeight(val as number)}
                style={{ width: 200 }}
              />
              <InputNumber
                min={100}
                max={500}
                value={contentHeight}
                onChange={(val) => setContentHeight(val as number)}
              />
              <span>px</span>
            </Space>
          </Space>

          <Divider />

          <div className="element-height-demo__comparison">
            <div className="element-height-demo__visual">
              <h4>可视化展示</h4>
              <div
                ref={boxRef}
                className="element-height-demo__box"
                style={{
                  padding: `${padding}px`,
                  border: `${border}px solid #1890ff`,
                  height: '300px',
                  overflowY: scrollbarVisible ? 'auto' : 'hidden',
                }}
              >
                <div
                  className="element-height-demo__content"
                  style={{
                    height: `${contentHeight}px`,
                  }}
                >
                  <p>这是内容区域</p>
                  <p>Content Height: {contentHeight}px</p>
                  <p>当内容高度超过容器高度时，会出现滚动条</p>
                  <p>scrollHeight 会包含所有溢出的内容</p>
                  <p>而 clientHeight 只包含可见区域</p>
                  <p>offsetHeight 包含 border 和 scrollbar</p>
                  {contentHeight > 250 && <p>👇 向下滚动查看更多内容</p>}
                </div>
              </div>
              <div className="element-height-demo__legend">
                <div className="element-height-demo__legend-item">
                  <div className="element-height-demo__legend-color element-height-demo__legend-color--content"></div>
                  <span>Content</span>
                </div>
                <div className="element-height-demo__legend-item">
                  <div className="element-height-demo__legend-color element-height-demo__legend-color--padding"></div>
                  <span>Padding</span>
                </div>
                <div className="element-height-demo__legend-item">
                  <div className="element-height-demo__legend-color element-height-demo__legend-color--border"></div>
                  <span>Border</span>
                </div>
              </div>
            </div>

            <div className="element-height-demo__measurements">
              <h4>实时测量值</h4>
              <div className="element-height-demo__measurement-item element-height-demo__measurement-item--client">
                <div className="element-height-demo__measurement-label">
                  <Tag color="blue">clientHeight</Tag>
                </div>
                <div className="element-height-demo__measurement-value">
                  {measurements.clientHeight}px
                </div>
                <div className="element-height-demo__measurement-formula">
                  = 300px (容器高度) - {border * 2}px (border) ≈ {measurements.clientHeight}px
                </div>
              </div>

              <div className="element-height-demo__measurement-item element-height-demo__measurement-item--offset">
                <div className="element-height-demo__measurement-label">
                  <Tag color="green">offsetHeight</Tag>
                </div>
                <div className="element-height-demo__measurement-value">
                  {measurements.offsetHeight}px
                </div>
                <div className="element-height-demo__measurement-formula">
                  = 300px (容器高度) ≈ {measurements.offsetHeight}px
                </div>
              </div>

              <div className="element-height-demo__measurement-item element-height-demo__measurement-item--scroll">
                <div className="element-height-demo__measurement-label">
                  <Tag color="purple">scrollHeight</Tag>
                </div>
                <div className="element-height-demo__measurement-value">
                  {measurements.scrollHeight}px
                </div>
                <div className="element-height-demo__measurement-formula">
                  = {contentHeight}px (content) + {padding * 2}px (padding) = {contentHeight + padding * 2}px
                </div>
              </div>

              <Divider />

              <div className="element-height-demo__info">
                <h5>📊 关系分析：</h5>
                <ul>
                  <li>
                    <strong>offsetHeight</strong> = clientHeight + 上下border
                    <br />
                    ({measurements.offsetHeight} = {measurements.clientHeight} + {border * 2})
                  </li>
                  <li>
                    <strong>scrollHeight</strong> {measurements.scrollHeight > measurements.clientHeight ? '>' : '='}{' '}
                    clientHeight
                    <br />
                    {measurements.scrollHeight > measurements.clientHeight
                      ? '(内容溢出，可以滚动)'
                      : '(内容未溢出，无需滚动)'}
                  </li>
                  <li>
                    滚动条宽度: ≈ {measurements.offsetHeight - measurements.clientHeight - border * 2}px
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="实战案例" style={{ marginTop: 24 }}>
        <h3>1. 判断是否滚动到底部</h3>
        <div className="element-height-demo__code">
          {`// 方法1: 使用 scrollHeight 和 clientHeight
element.addEventListener('scroll', () => {
  const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
  // 减1是为了容错，避免浮点数误差
  if (isAtBottom) {
    console.log('已滚动到底部，加载更多数据...');
  }
});

// 方法2: 计算滚动百分比
const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
console.log(\`已滚动 \${scrollPercentage.toFixed(1)}%\`);`}
        </div>

        <h3 style={{ marginTop: 24 }}>2. 判断元素是否有滚动条</h3>
        <div className="element-height-demo__code">
          {`// 判断是否有垂直滚动条
const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;

// 判断是否有横滚动条
const hasHorizontalScrollbar = element.scrollWidth > element.clientWidth;

if (hasVerticalScrollbar) {
  console.log('元素有垂直滚动条');
}`}
        </div>

        <h3 style={{ marginTop: 24 }}>3. 获取元素完整高度（含margin）</h3>
        <div className="element-height-demo__code">
          {`// offsetHeight 不包括 margin，需要手动计算
const getElementFullHeight = (element) => {
  const styles = window.getComputedStyle(element);
  const marginTop = parseFloat(styles.marginTop);
  const marginBottom = parseFloat(styles.marginBottom);

  return element.offsetHeight + marginTop + marginBottom;
};

// 使用 getBoundingClientRect (推荐)
const rect = element.getBoundingClientRect();
const fullHeight = rect.height; // 含小数，更精确`}
        </div>

        <h3 style={{ marginTop: 24 }}>4. 平滑滚动到底部</h3>
        <div className="element-height-demo__code">
          {`// 方法1: 使用 scrollTo
element.scrollTo({
  top: element.scrollHeight,
  behavior: 'smooth'
});

// 方法2: 设置 scrollTop
element.scrollTop = element.scrollHeight;

// 方法3: 滚动到指定位置（距离顶部的位置）
const scrollToPosition = (position) => {
  element.scrollTo({
    top: position,
    behavior: 'smooth'
  });
};`}
        </div>

        <h3 style={{ marginTop: 24 }}>5. 虚拟滚动优化（大数据列表）</h3>
        <div className="element-height-demo__code">
          {`// 计算可见区域的起始和结束索引
const getVisibleRange = (element, itemHeight) => {
  const scrollTop = element.scrollTop;
  const clientHeight = element.clientHeight;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.ceil((scrollTop + clientHeight) / itemHeight);

  return { startIndex, endIndex };
};

// 监听滚动，只渲染可见区域的元素
element.addEventListener('scroll', () => {
  const { startIndex, endIndex } = getVisibleRange(element, 50);
  renderVisibleItems(startIndex, endIndex);
});`}
        </div>
      </Card>

      <Card title="常见问题 Q&A" style={{ marginTop: 24 }}>
        <div className="element-height-demo__qa">
          <div className="element-height-demo__qa-item">
            <h4>Q1: 为什么 offsetHeight 有时会包含滚动条宽度？</h4>
            <p>
              <strong>A:</strong> 当元素设置了 <code>overflow: auto</code> 或 <code>overflow: scroll</code>{' '}
              并且内容确实溢出时，浏览器会显示滚动条。offsetHeight 会包含滚动条的宽度，而 clientHeight
              不包含。
            </p>
          </div>

          <div className="element-height-demo__qa-item">
            <h4>Q2: scrollHeight 什么时候会大于 clientHeight？</h4>
            <p>
              <strong>A:</strong> 当元素内容超出其可见区域时，scrollHeight 会大于 clientHeight。这表示元素有滚动内容。
            </p>
          </div>

          <div className="element-height-demo__qa-item">
            <h4>Q3: 如何获取精确的元素高度（含小数）？</h4>
            <p>
              <strong>A:</strong> 使用 <code>element.getBoundingClientRect().height</code>，它返回的是精确的浮点数值。
              而 offsetHeight 返回的是四舍五入后的整数。
            </p>
          </div>

          <div className="element-height-demo__qa-item">
            <h4>Q4: box-sizing 会影响这些属性吗？</h4>
            <p>
              <strong>A:</strong> box-sizing 只影响 CSS 盒模型的计算方式，不影响这些 DOM 属性的定义。
              无论 box-sizing 是 content-box 还是 border-box，offsetHeight 始终包含 padding 和 border。
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ElementHeightDemo;
