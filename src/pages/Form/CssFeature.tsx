/**
 * @file pages/Form/CssFeature.tsx
 * @author leon.wang
 */
import React from 'react';
import { Card, Tabs, Space, Input, Checkbox, Slider, Typography } from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';
import './CssFeature.scss';

const { Title, Paragraph, Text } = Typography;

interface CssFeatureProps {}

const CssFeature: React.FC<CssFeatureProps> = () => {
  const { t } = useTranslation();

  const items = [
    {
      key: 'accent-color',
      label: 'accent-color',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>accent-color 属性</Title>
            <Paragraph type="secondary">
              用于设置表单控件（如复选框、单选按钮、进度条等）的强调色，简化了自定义表单元素颜色的过程。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>复选框：</Text>
                <Space style={{ marginTop: 12 }}>
                  <Checkbox className="css-feature-demo__accent-red">红色强调</Checkbox>
                  <Checkbox className="css-feature-demo__accent-blue">蓝色强调</Checkbox>
                  <Checkbox className="css-feature-demo__accent-green">绿色强调</Checkbox>
                </Space>
              </div>
              <div>
                <Text strong>滑块：</Text>
                <div style={{ marginTop: 12 }}>
                  <input type="range" className="css-feature-demo__range-red" />
                  <input type="range" className="css-feature-demo__range-blue" style={{ marginTop: 12 }} />
                  <input type="range" className="css-feature-demo__range-green" style={{ marginTop: 12 }} />
                </div>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'caret-color',
      label: 'caret-color',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>caret-color 属性</Title>
            <Paragraph type="secondary">
              用于设置输入框中光标的颜色，提升用户输入时的视觉体验。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Input
                className="css-feature-demo__caret-green"
                placeholder="绿色光标 - 请输入文本"
                size="large"
              />
              <Input
                className="css-feature-demo__caret-red"
                placeholder="红色光标 - 请输入文本"
                size="large"
              />
              <Input
                className="css-feature-demo__caret-blue"
                placeholder="蓝色光标 - 请输入文本"
                size="large"
              />
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'marker',
      label: '::marker',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>::marker 伪元素</Title>
            <Paragraph type="secondary">
              用于自定义列表项标记的样式，包括颜色、内容、字体等。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>自定义标记样式：</Text>
                <ul className="css-feature-demo__marker-custom">
                  <li>自定义 emoji 标记 ✨</li>
                  <li>彩色圆点标记</li>
                  <li>带数字的标记</li>
                </ul>
              </div>
              <div>
                <Text strong>有序列表：</Text>
                <ol className="css-feature-demo__marker-ordered">
                  <li>第一项内容</li>
                  <li>第二项内容</li>
                  <li>第三项内容</li>
                </ol>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'user-validation',
      label: ':user-valid / :user-invalid',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>用户交互验证伪类</Title>
            <Paragraph type="secondary">
              只在用户与表单元素交互后才触发的验证状态样式，避免页面加载时就显示错误状态。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>邮箱验证：</Text>
                <input
                  type="email"
                  className="css-feature-demo__user-validation"
                  placeholder="请输入有效的邮箱地址"
                  required
                  style={{ width: '100%', padding: '8px 12px', marginTop: 8 }}
                />
              </div>
              <div>
                <Text strong>URL 验证：</Text>
                <input
                  type="url"
                  className="css-feature-demo__user-validation"
                  placeholder="请输入有效的 URL"
                  required
                  style={{ width: '100%', padding: '8px 12px', marginTop: 8 }}
                />
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'placeholder-shown',
      label: ':placeholder-shown',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>:placeholder-shown 伪类</Title>
            <Paragraph type="secondary">
              当输入框显示 placeholder 文本时应用的样式，常用于浮动标签效果。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <div className="css-feature-demo__floating-label">
              <input
                type="text"
                id="floating-input"
                className="css-feature-demo__placeholder-input"
                placeholder="请输入内容"
              />
              <label htmlFor="floating-input" className="css-feature-demo__floating-label-text">
                浮动标签
              </label>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'text-wrap',
      label: 'text-wrap: balance',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>text-wrap: balance</Title>
            <Paragraph type="secondary">
              让多行文本的每行长度更均匀，提升标题和段落的视觉平衡感。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>普通换行：</Text>
                <div className="css-feature-demo__text-normal">
                  这是一段很长的文本用于演示普通的文本换行效果当文本超出容器宽度时会自动换行但可能导致行长度不均匀
                </div>
              </div>
              <div>
                <Text strong>平衡换行 (text-wrap: balance)：</Text>
                <div className="css-feature-demo__text-balance">
                  这是一段很长的文本用于演示 text-wrap: balance 的效果当文本超出容器宽度时会自动换行并让每行长度更均匀
                </div>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'scroll-snap',
      label: 'scroll-snap-type',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>scroll-snap-type 滚动捕捉</Title>
            <Paragraph type="secondary">
              创建平滑的滚动捕捉效果，常用于轮播图、卡片列表等场景。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Text strong style={{ display: 'block', marginBottom: 12 }}>横向滚动示例（滑动查看）：</Text>
            <div className="css-feature-demo__scroll-snap">
              <div className="css-feature-demo__scroll-snap-item" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Card 1</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>滑动查看下一张</div>
              </div>
              <div className="css-feature-demo__scroll-snap-item" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Card 2</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>继续滑动</div>
              </div>
              <div className="css-feature-demo__scroll-snap-item" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Card 3</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>继续滑动</div>
              </div>
              <div className="css-feature-demo__scroll-snap-item" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Card 4</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>继续滑动</div>
              </div>
              <div className="css-feature-demo__scroll-snap-item" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Card 5</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>继续滑动</div>
              </div>
              <div className="css-feature-demo__scroll-snap-item" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
                <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Card 6</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>最后一张</div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="css-feature-demo">
      <div className="css-feature-demo__header">
        <Title level={3}>CSS 新特性演示</Title>
        <Paragraph type="secondary">
          探索现代 CSS 的强大功能，每个 Tab 展示一个实用的 CSS 特性
        </Paragraph>
      </div>
      <Tabs items={items} size="large" />
    </div>
  );
};

export default CssFeature;
