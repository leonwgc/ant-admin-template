/**
 * @file src/pages/Css/CssBlendModesExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Tag, Space, Tabs, Radio, Alert } from '@derbysoft/neat-design';
import { BgColorsOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './CssBlendModesExample.scss';

type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

/**
 * CssBlendModesExample component - Demonstrates CSS Blend Modes
 */
const CssBlendModesExample: React.FC = () => {
  const [mixBlendMode, setMixBlendMode] = useState<BlendMode>('normal');
  const [backgroundBlendMode, setBackgroundBlendMode] = useState<BlendMode>('normal');

  const blendModes: BlendMode[] = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ];

  const blendModeDescriptions: Record<BlendMode, string> = {
    normal: '默认模式，不混合',
    multiply: '正片叠底，颜色变暗',
    screen: '滤色，颜色变亮',
    overlay: '叠加，增强对比度',
    darken: '变暗，保留较暗的颜色',
    lighten: '变亮，保留较亮的颜色',
    'color-dodge': '颜色减淡',
    'color-burn': '颜色加深',
    'hard-light': '强光，类似 overlay 但更强烈',
    'soft-light': '柔光，效果比 overlay 柔和',
    difference: '差值，反转颜色',
    exclusion: '排除，类似 difference 但对比度更低',
    hue: '色相，使用源的色相',
    saturation: '饱和度，使用源的饱和度',
    color: '颜色，使用源的色相和饱和度',
    luminosity: '明度，使用源的明度',
  };

  return (
    <div className="css-blend-modes-example">
      <h2 className="css-blend-modes-example__title">
        <BgColorsOutlined /> CSS Blend Modes 混合模式完全指南
      </h2>

      <Alert
        message="浏览器支持"
        description="CSS Blend Modes 在所有现代浏览器中都得到了良好支持（IE 不支持）"
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
              <div className="css-blend-modes-example__section">
                <Card title="什么是 CSS Blend Modes？">
                  <p className="css-blend-modes-example__desc">
                    <Tag color="blue">混合模式</Tag>
                    CSS Blend Modes 允许你定义元素与其背景或其他元素如何混合显示，
                    类似于 Photoshop 中的图层混合模式。
                  </p>

                  <div className="css-blend-modes-example__code">
                    {`/* mix-blend-mode: 元素与背景的混合 */
.element {
  mix-blend-mode: multiply;  /* 正片叠底 */
}

/* background-blend-mode: 背景图片与背景颜色的混合 */
.container {
  background-image: url('image.jpg');
  background-color: #ff6b6b;
  background-blend-mode: overlay;  /* 叠加 */
}

/* 多个背景图片混合 */
.multi-bg {
  background-image:
    url('texture.png'),
    url('photo.jpg');
  background-blend-mode: multiply, normal;
}`}
                  </div>

                  <Space direction="vertical" style={{ width: '100%', marginTop: 24 }} size="large">
                    <div>
                      <h4>两种混合模式属性：</h4>
                      <ul>
                        <li>
                          <Tag color="green">mix-blend-mode</Tag> -
                          定义元素内容如何与其背后的内容混合（包括背景和其他元素）
                        </li>
                        <li>
                          <Tag color="green">background-blend-mode</Tag> -
                          定义元素的背景图片与背景颜色如何混合
                        </li>
                      </ul>
                    </div>
                  </Space>
                </Card>
              </div>
            ),
          },
          {
            key: '2',
            label: 'mix-blend-mode',
            children: (
              <div className="css-blend-modes-example__section">
                <Card title="mix-blend-mode 交互式演示">
                  <p className="css-blend-modes-example__desc">
                    选择不同的混合模式，查看前景元素如何与背景混合
                  </p>

                  <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }} size="middle">
                    <Space wrap>
                      <span>混合模式:</span>
                      <Radio.Group
                        value={mixBlendMode}
                        onChange={(e) => setMixBlendMode(e.target.value)}
                      >
                        {blendModes.map((mode) => (
                          <Radio.Button key={mode} value={mode}>
                            {mode}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Space>
                    <Alert
                      message={`${mixBlendMode}: ${blendModeDescriptions[mixBlendMode]}`}
                      type="info"
                      showIcon={false}
                    />
                  </Space>

                  <div className="blend-demo">
                    <div className="blend-demo__background">
                      <div className="blend-demo__gradient1"></div>
                      <div className="blend-demo__gradient2"></div>
                    </div>
                    <div className="blend-demo__foreground" style={{ mixBlendMode }}>
                      <div className="blend-demo__circle blend-demo__circle--red">
                        <span>Red Circle</span>
                      </div>
                      <div className="blend-demo__circle blend-demo__circle--blue">
                        <span>Blue Circle</span>
                      </div>
                      <div className="blend-demo__circle blend-demo__circle--green">
                        <span>Green Circle</span>
                      </div>
                    </div>
                  </div>

                  <div className="css-blend-modes-example__code" style={{ marginTop: 24 }}>
                    {`/* 应用 mix-blend-mode */
.foreground {
  mix-blend-mode: ${mixBlendMode};
}

.circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 圆形会与背景渐变色混合 */`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '3',
            label: 'background-blend-mode',
            children: (
              <div className="css-blend-modes-example__section">
                <Card title="background-blend-mode 演示">
                  <p className="css-blend-modes-example__desc">
                    背景图片与背景颜色的混合效果
                  </p>

                  <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }} size="middle">
                    <Space wrap>
                      <span>混合模式:</span>
                      <Radio.Group
                        value={backgroundBlendMode}
                        onChange={(e) => setBackgroundBlendMode(e.target.value)}
                      >
                        {blendModes.map((mode) => (
                          <Radio.Button key={mode} value={mode}>
                            {mode}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Space>
                    <Alert
                      message={`${backgroundBlendMode}: ${blendModeDescriptions[backgroundBlendMode]}`}
                      type="info"
                      showIcon={false}
                    />
                  </Space>

                  <div className="bg-blend-grid">
                    <div
                      className="bg-blend-box"
                      style={{
                        backgroundBlendMode,
                      }}
                    >
                      <div className="bg-blend-box__label">图片 + 红色</div>
                    </div>
                    <div
                      className="bg-blend-box bg-blend-box--blue"
                      style={{
                        backgroundBlendMode,
                      }}
                    >
                      <div className="bg-blend-box__label">图片 + 蓝色</div>
                    </div>
                    <div
                      className="bg-blend-box bg-blend-box--green"
                      style={{
                        backgroundBlendMode,
                      }}
                    >
                      <div className="bg-blend-box__label">图片 + 绿色</div>
                    </div>
                    <div
                      className="bg-blend-box bg-blend-box--purple"
                      style={{
                        backgroundBlendMode,
                      }}
                    >
                      <div className="bg-blend-box__label">图片 + 紫色</div>
                    </div>
                  </div>

                  <div className="css-blend-modes-example__code" style={{ marginTop: 24 }}>
                    {`/* background-blend-mode 用法 */
.box {
  background-image: url('pattern.jpg');
  background-color: #ff6b6b;  /* 红色 */
  background-blend-mode: ${backgroundBlendMode};
  background-size: cover;
  background-position: center;
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '4',
            label: '所有模式对比',
            children: (
              <div className="css-blend-modes-example__section">
                <Card title="16 种混合模式对比">
                  <p className="css-blend-modes-example__desc">
                    一次性查看所有混合模式的效果
                  </p>

                  <div className="blend-comparison">
                    {blendModes.map((mode) => (
                      <div key={mode} className="blend-comparison__item">
                        <div className="blend-comparison__demo">
                          <div className="blend-comparison__bg"></div>
                          <div
                            className="blend-comparison__overlay"
                            style={{ mixBlendMode: mode }}
                          ></div>
                        </div>
                        <div className="blend-comparison__info">
                          <strong>{mode}</strong>
                          <p>{blendModeDescriptions[mode]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '5',
            label: '实际应用',
            children: (
              <div className="css-blend-modes-example__section">
                <Card title="实际应用场景">
                  <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <div>
                      <h4>1. 图片滤镜效果</h4>
                      <div className="practical-example">
                        <div className="image-filter image-filter--duotone">
                          <div className="image-filter__label">双色调效果</div>
                        </div>
                        <div className="css-blend-modes-example__code">
                          {`/* 双色调效果 */
.duotone {
  background-image: url('photo.jpg');
  background-color: #4158D0;
  background-blend-mode: screen;
}

.duotone::after {
  content: '';
  background: #C850C0;
  mix-blend-mode: multiply;
}`}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4>2. 文字混合效果</h4>
                      <div className="practical-example">
                        <div className="text-blend">
                          <h1 className="text-blend__title">CREATIVE TEXT</h1>
                        </div>
                        <div className="css-blend-modes-example__code">
                          {`/* 文字混合背景 */
.text {
  font-size: 80px;
  font-weight: bold;
  color: white;
  mix-blend-mode: difference;
}`}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4>3. 悬停效果</h4>
                      <div className="practical-example">
                        <div className="hover-cards">
                          <div className="hover-card">
                            <div className="hover-card__overlay">
                              <span>Hover Me</span>
                            </div>
                          </div>
                          <div className="hover-card hover-card--multiply">
                            <div className="hover-card__overlay">
                              <span>Multiply</span>
                            </div>
                          </div>
                          <div className="hover-card hover-card--screen">
                            <div className="hover-card__overlay">
                              <span>Screen</span>
                            </div>
                          </div>
                        </div>
                        <div className="css-blend-modes-example__code">
                          {`/* 悬停混合效果 */
.card::before {
  content: '';
  opacity: 0;
  background: #ff6b6b;
  mix-blend-mode: multiply;
  transition: opacity 0.3s;
}

.card:hover::before {
  opacity: 1;
}`}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4>使用场景：</h4>
                      <ul>
                        <li>创意图片效果（双色调、滤镜）</li>
                        <li>文字与背景的融合效果</li>
                        <li>动态悬停效果</li>
                        <li>叠加纹理和图案</li>
                        <li>品牌色彩应用</li>
                      </ul>
                    </div>
                  </Space>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CssBlendModesExample;
