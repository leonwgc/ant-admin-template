/**
 * @file pages/Css/CssBoxModelDemo.tsx
 * @author leon.wang
 */

import React, { FC, useState } from 'react';
import { Card, Slider, Switch, Space, Tabs } from '@derbysoft/neat-design';
import './CssBoxModelDemo.scss';

interface CssBoxModelDemoProps {}

/**
 * CSS Box Model interactive demo
 * Demonstrates content, padding, border, margin and box-sizing
 */
const CssBoxModelDemo: FC<CssBoxModelDemoProps> = () => {
  const items = [
    {
      key: '1',
      label: 'Interactive Demo',
      children: <InteractiveBoxModel />,
    },
    {
      key: '2',
      label: 'box-sizing Comparison',
      children: <BoxSizingComparison />,
    },
    {
      key: '3',
      label: 'Practical Examples',
      children: <PracticalExamples />,
    },
  ];

  return (
    <div className="css-box-model-demo">
      <Card title="CSS Box Model">
        <div className="box-model-intro">
          <p>
            The CSS box model is a fundamental concept that describes how elements
            are rendered on a web page. Every element is represented as a
            rectangular box with four areas:
          </p>
          <ul>
            <li>
              <strong>Content:</strong> The actual content (text, images, etc.)
            </li>
            <li>
              <strong>Padding:</strong> Space between content and border
            </li>
            <li>
              <strong>Border:</strong> The border around the padding
            </li>
            <li>
              <strong>Margin:</strong> Space outside the border
            </li>
          </ul>
        </div>
        <Tabs items={items} />
      </Card>
    </div>
  );
};

/**
 * Interactive box model demo with sliders
 */
const InteractiveBoxModel: FC = () => {
  const [content, setContent] = useState({ width: 200, height: 100 });
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(5);
  const [margin, setMargin] = useState(20);

  const totalWidth = content.width + padding * 2 + border * 2;
  const totalHeight = content.height + padding * 2 + border * 2;

  return (
    <div className="interactive-box-model">
      <div className="controls">
        <div className="control-group">
          <label>Content Width: {content.width}px</label>
          <Slider
            min={100}
            max={300}
            value={content.width}
            onChange={(value) =>
              setContent({ ...content, width: value as number })
            }
          />
        </div>

        <div className="control-group">
          <label>Content Height: {content.height}px</label>
          <Slider
            min={50}
            max={200}
            value={content.height}
            onChange={(value) =>
              setContent({ ...content, height: value as number })
            }
          />
        </div>

        <div className="control-group">
          <label>Padding: {padding}px</label>
          <Slider
            min={0}
            max={50}
            value={padding}
            onChange={(value) => setPadding(value as number)}
          />
        </div>

        <div className="control-group">
          <label>Border: {border}px</label>
          <Slider
            min={0}
            max={20}
            value={border}
            onChange={(value) => setBorder(value as number)}
          />
        </div>

        <div className="control-group">
          <label>Margin: {margin}px</label>
          <Slider
            min={0}
            max={50}
            value={margin}
            onChange={(value) => setMargin(value as number)}
          />
        </div>
      </div>

      <div className="visualization">
        <div className="box-info">
          <p>
            <strong>Total Box Dimensions:</strong>
          </p>
          <p>Width: {totalWidth}px</p>
          <p>Height: {totalHeight}px</p>
        </div>

        <div
          className="box-margin"
          style={{
            padding: `${margin}px`,
          }}
        >
          <div className="margin-label">margin: {margin}px</div>
          <div
            className="box-border"
            style={{
              borderWidth: `${border}px`,
            }}
          >
            <div className="border-label">border: {border}px</div>
            <div
              className="box-padding"
              style={{
                padding: `${padding}px`,
              }}
            >
              <div className="padding-label">padding: {padding}px</div>
              <div
                className="box-content"
                style={{
                  width: `${content.width}px`,
                  height: `${content.height}px`,
                }}
              >
                <div className="content-label">
                  content
                  <br />
                  {content.width}×{content.height}px
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * box-sizing property comparison
 */
const BoxSizingComparison: FC = () => {
  const [width, setWidth] = useState(200);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(5);

  const contentBoxWidth = width;
  const borderBoxWidth = width;
  const contentBoxActualWidth = contentBoxWidth + padding * 2 + border * 2;

  return (
    <div className="box-sizing-comparison">
      <div className="comparison-intro">
        <h3>box-sizing Property</h3>
        <p>
          The <code>box-sizing</code> property controls how the total width and
          height of an element are calculated:
        </p>
        <ul>
          <li>
            <code>content-box</code> (default): width/height only includes content
          </li>
          <li>
            <code>border-box</code>: width/height includes content, padding, and
            border
          </li>
        </ul>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>Width: {width}px</label>
          <Slider
            min={100}
            max={300}
            value={width}
            onChange={(value) => setWidth(value as number)}
          />
        </div>

        <div className="control-group">
          <label>Padding: {padding}px</label>
          <Slider
            min={0}
            max={40}
            value={padding}
            onChange={(value) => setPadding(value as number)}
          />
        </div>

        <div className="control-group">
          <label>Border: {border}px</label>
          <Slider
            min={0}
            max={15}
            value={border}
            onChange={(value) => setBorder(value as number)}
          />
        </div>
      </div>

      <div className="comparison-boxes">
        <div className="comparison-item">
          <h4>content-box (default)</h4>
          <div className="comparison-wrapper">
            <div
              className="comparison-box comparison-box--content"
              style={{
                width: `${contentBoxWidth}px`,
                padding: `${padding}px`,
                borderWidth: `${border}px`,
              }}
            >
              Content
            </div>
          </div>
          <div className="box-calculations">
            <p>CSS: width: {width}px</p>
            <p>Content width: {contentBoxWidth}px</p>
            <p>
              Actual width: {contentBoxActualWidth}px
              <br />
              <small>
                ({contentBoxWidth} + {padding * 2} padding + {border * 2} border)
              </small>
            </p>
          </div>
        </div>

        <div className="comparison-item">
          <h4>border-box</h4>
          <div className="comparison-wrapper">
            <div
              className="comparison-box comparison-box--border"
              style={{
                width: `${borderBoxWidth}px`,
                padding: `${padding}px`,
                borderWidth: `${border}px`,
              }}
            >
              Content
            </div>
          </div>
          <div className="box-calculations">
            <p>CSS: width: {width}px</p>
            <p>
              Content width: {width - padding * 2 - border * 2}px
              <br />
              <small>
                ({width} - {padding * 2} padding - {border * 2} border)
              </small>
            </p>
            <p>Actual width: {borderBoxWidth}px (same as CSS width)</p>
          </div>
        </div>
      </div>

      <div className="best-practice">
        <h4>💡 Best Practice</h4>
        <p>Most developers prefer using <code>border-box</code> globally:</p>
        <pre>{`*, *::before, *::after {
  box-sizing: border-box;
}`}</pre>
        <p>
          This makes layout calculations more intuitive because width/height
          represents the actual space the element takes up.
        </p>
      </div>
    </div>
  );
};

/**
 * Practical examples of box model usage
 */
const PracticalExamples: FC = () => {
  return (
    <div className="practical-examples">
      <div className="example-section">
        <h3>Example 1: Card with Consistent Spacing</h3>
        <div className="example-demo">
          <div className="card-example">
            <h4>Card Title</h4>
            <p>
              Using padding creates consistent internal spacing. The card has 24px
              padding on all sides.
            </p>
            <button>Action</button>
          </div>
        </div>
        <pre>{`.card {
  padding: 24px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
}`}</pre>
      </div>

      <div className="example-section">
        <h3>Example 2: Buttons with Margin Spacing</h3>
        <div className="example-demo">
          <div className="button-group">
            <button className="btn">Button 1</button>
            <button className="btn">Button 2</button>
            <button className="btn">Button 3</button>
          </div>
        </div>
        <pre>{`.btn {
  padding: 8px 16px;
  margin-right: 12px;
  border: 1px solid #1890ff;
}`}</pre>
      </div>

      <div className="example-section">
        <h3>Example 3: Collapsing Margins</h3>
        <p>
          When vertical margins meet, they collapse to the larger value instead of
          adding:
        </p>
        <div className="example-demo">
          <div className="collapse-demo">
            <div className="collapse-box">Box 1 (margin-bottom: 30px)</div>
            <div className="collapse-box">Box 2 (margin-top: 20px)</div>
          </div>
          <p className="collapse-note">
            The space between boxes is 30px (not 50px) because margins collapse.
          </p>
        </div>
        <pre>{`.box-1 { margin-bottom: 30px; }
.box-2 { margin-top: 20px; }
/* Actual space: 30px (max of 30px and 20px) */`}</pre>
      </div>

      <div className="example-section">
        <h3>Example 4: Negative Margin</h3>
        <p>Negative margins can pull elements closer or create overlapping:</p>
        <div className="example-demo">
          <div className="negative-margin-demo">
            <div className="negative-box negative-box--1">Box 1</div>
            <div className="negative-box negative-box--2">
              Box 2 (margin-top: -20px)
            </div>
          </div>
        </div>
        <pre>{`.box-2 {
  margin-top: -20px; /* Overlaps with box above */
}`}</pre>
      </div>
    </div>
  );
};

export default CssBoxModelDemo;
