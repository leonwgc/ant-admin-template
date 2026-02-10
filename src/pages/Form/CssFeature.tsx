/**
 * @file pages/Form/CssFeature.tsx
 * @author leon.wang
 */
import React from 'react';
import { Card, Tabs, Space, Input, Typography } from '@derbysoft/neat-design';
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
                <div className="css-feature-demo__accent-group">
                  <label className="css-feature-demo__accent-label">
                    <input
                      type="checkbox"
                      className="css-feature-demo__accent-red"
                      defaultChecked
                    />
                    <span>红色强调</span>
                  </label>
                  <label className="css-feature-demo__accent-label">
                    <input
                      type="checkbox"
                      className="css-feature-demo__accent-blue"
                      defaultChecked
                    />
                    <span>蓝色强调</span>
                  </label>
                  <label className="css-feature-demo__accent-label">
                    <input
                      type="checkbox"
                      className="css-feature-demo__accent-green"
                      defaultChecked
                    />
                    <span>绿色强调</span>
                  </label>
                </div>
              </div>
              <div>
                <Text strong>单选按钮：</Text>
                <div className="css-feature-demo__accent-group">
                  <label className="css-feature-demo__accent-label">
                    <input
                      type="radio"
                      name="color"
                      className="css-feature-demo__accent-red"
                      defaultChecked
                    />
                    <span>红色</span>
                  </label>
                  <label className="css-feature-demo__accent-label">
                    <input
                      type="radio"
                      name="color"
                      className="css-feature-demo__accent-blue"
                    />
                    <span>蓝色</span>
                  </label>
                  <label className="css-feature-demo__accent-label">
                    <input
                      type="radio"
                      name="color"
                      className="css-feature-demo__accent-green"
                    />
                    <span>绿色</span>
                  </label>
                </div>
              </div>
              <div>
                <Text strong>滑块：</Text>
                <div style={{ marginTop: 12 }}>
                  <input
                    type="range"
                    className="css-feature-demo__range-red"
                    defaultValue={50}
                  />
                  <input
                    type="range"
                    className="css-feature-demo__range-blue"
                    defaultValue={70}
                    style={{ marginTop: 12 }}
                  />
                  <input
                    type="range"
                    className="css-feature-demo__range-green"
                    defaultValue={30}
                    style={{ marginTop: 12 }}
                  />
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
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div className="css-feature-demo__floating-label">
                <input
                  type="text"
                  id="floating-input-1"
                  className="css-feature-demo__placeholder-input"
                  placeholder=""
                />
                <label
                  htmlFor="floating-input-1"
                  className="css-feature-demo__floating-label-text"
                >
                  用户名
                </label>
              </div>
              <div className="css-feature-demo__floating-label">
                <input
                  type="email"
                  id="floating-input-2"
                  className="css-feature-demo__placeholder-input"
                  placeholder=""
                />
                <label
                  htmlFor="floating-input-2"
                  className="css-feature-demo__floating-label-text"
                >
                  邮箱地址
                </label>
              </div>
              <div className="css-feature-demo__floating-label">
                <input
                  type="password"
                  id="floating-input-3"
                  className="css-feature-demo__placeholder-input"
                  placeholder=""
                />
                <label
                  htmlFor="floating-input-3"
                  className="css-feature-demo__floating-label-text"
                >
                  密码
                </label>
              </div>
            </Space>
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
                  这是一段很长的文本用于演示 text-wrap: balance
                  的效果当文本超出容器宽度时会自动换行并让每行长度更均匀
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
            <Text strong style={{ display: 'block', marginBottom: 12 }}>
              横向滚动示例（滑动查看）：
            </Text>
            <div className="css-feature-demo__scroll-snap">
              <div
                className="css-feature-demo__scroll-snap-item"
                style={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <div
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  Card 1
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                  滑动查看下一张
                </div>
              </div>
              <div
                className="css-feature-demo__scroll-snap-item"
                style={{
                  background:
                    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                }}
              >
                <div
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  Card 2
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                  继续滑动
                </div>
              </div>
              <div
                className="css-feature-demo__scroll-snap-item"
                style={{
                  background:
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                }}
              >
                <div
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  Card 3
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                  继续滑动
                </div>
              </div>
              <div
                className="css-feature-demo__scroll-snap-item"
                style={{
                  background:
                    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                }}
              >
                <div
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  Card 4
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                  继续滑动
                </div>
              </div>
              <div
                className="css-feature-demo__scroll-snap-item"
                style={{
                  background:
                    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                }}
              >
                <div
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  Card 5
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                  继续滑动
                </div>
              </div>
              <div
                className="css-feature-demo__scroll-snap-item"
                style={{
                  background:
                    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                }}
              >
                <div
                  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                >
                  Card 6
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                  最后一张
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'has-selector',
      label: ':has()',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>:has() 父选择器</Title>
            <Paragraph type="secondary">
              CSS 中的"父选择器"，可以根据子元素的状态来选择父元素，极大提升了
              CSS 的表达能力。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>卡片状态（悬停卡片查看效果）：</Text>
                <div className="css-feature-demo__has-cards">
                  <div className="css-feature-demo__has-card">
                    <div className="css-feature-demo__has-card-icon">📝</div>
                    <div className="css-feature-demo__has-card-title">
                      普通卡片
                    </div>
                    <div className="css-feature-demo__has-card-desc">
                      悬停查看效果
                    </div>
                  </div>
                  <div className="css-feature-demo__has-card css-feature-demo__has-card--featured">
                    <div className="css-feature-demo__has-card-icon">⭐</div>
                    <div className="css-feature-demo__has-card-title">
                      特色卡片
                    </div>
                    <div className="css-feature-demo__has-card-desc">
                      包含特色标记
                    </div>
                  </div>
                  <div className="css-feature-demo__has-card">
                    <div className="css-feature-demo__has-card-icon">💡</div>
                    <div className="css-feature-demo__has-card-title">
                      普通卡片
                    </div>
                    <div className="css-feature-demo__has-card-desc">
                      悬停查看效果
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'selection',
      label: '::selection',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>::selection 文本选择样式</Title>
            <Paragraph type="secondary">
              自定义用户选中文本时的背景色和文字颜色，提升品牌一致性。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div className="css-feature-demo__selection-default">
                <Text strong>默认选择样式（选中文本查看）：</Text>
                <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.8 }}>
                  这段文本使用默认的选择样式。请尝试选中这段文字，查看系统默认的高亮效果。
                </p>
              </div>
              <div className="css-feature-demo__selection-custom">
                <Text strong>自定义选择样式（选中文本查看）：</Text>
                <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.8 }}>
                  这段文本使用了自定义的选择样式。选中这段文字会看到渐变蓝色背景和白色文字。
                </p>
              </div>
              <div className="css-feature-demo__selection-gradient">
                <Text strong>渐变选择样式（选中文本查看）：</Text>
                <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.8 }}>
                  这段文本使用了更炫酷的自定义样式。选中这段文字会看到紫红色背景和金色文字。
                </p>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'focus-visible',
      label: ':focus-visible',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>:focus-visible 键盘焦点</Title>
            <Paragraph type="secondary">
              只在键盘导航时显示焦点样式，鼠标点击时不显示，提升用户体验。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>按 Tab 键切换焦点查看效果：</Text>
                <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
                  <button className="css-feature-demo__focus-visible-btn">
                    按钮 1
                  </button>
                  <button className="css-feature-demo__focus-visible-btn">
                    按钮 2
                  </button>
                  <button className="css-feature-demo__focus-visible-btn">
                    按钮 3
                  </button>
                </div>
              </div>
              <div>
                <Text strong>输入框：</Text>
                <input
                  type="text"
                  className="css-feature-demo__focus-visible-input"
                  placeholder="使用 Tab 键聚焦"
                  style={{ width: '100%', marginTop: 12 }}
                />
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'focus-within',
      label: ':focus-within',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>:focus-within 容器焦点</Title>
            <Paragraph type="secondary">
              当容器内任何元素获得焦点时，为容器添加样式，常用于表单高亮。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div className="css-feature-demo__focus-within-form">
                <Text strong style={{ display: 'block', marginBottom: 12 }}>
                  点击输入框查看容器高亮：
                </Text>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <input type="text" placeholder="姓名" />
                  <input type="email" placeholder="邮箱" />
                  <input type="tel" placeholder="电话" />
                </div>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'aspect-ratio',
      label: 'aspect-ratio',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>aspect-ratio 宽高比</Title>
            <Paragraph type="secondary">
              轻松设置元素的宽高比，无需复杂的 padding
              hack，常用于视频、图片容器。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>不同宽高比示例：</Text>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 16,
                    marginTop: 12,
                  }}
                >
                  <div className="css-feature-demo__aspect-ratio-16-9">
                    <div className="css-feature-demo__aspect-ratio-content">
                      16:9
                    </div>
                  </div>
                  <div className="css-feature-demo__aspect-ratio-4-3">
                    <div className="css-feature-demo__aspect-ratio-content">
                      4:3
                    </div>
                  </div>
                  <div className="css-feature-demo__aspect-ratio-1-1">
                    <div className="css-feature-demo__aspect-ratio-content">
                      1:1
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'backdrop-filter',
      label: 'backdrop-filter',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>backdrop-filter 背景滤镜</Title>
            <Paragraph type="secondary">
              对元素背后的区域应用滤镜效果，创建毛玻璃、模糊背景等现代 UI 效果。
            </Paragraph>
          </div>
          <Card
            className="css-feature-demo__preview"
            style={{ padding: 0, overflow: 'hidden' }}
          >
            <Space direction="vertical" size={0} style={{ width: '100%' }}>
              <div className="css-feature-demo__backdrop-container">
                <div className="css-feature-demo__backdrop-card">
                  <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>
                    毛玻璃卡片
                  </h3>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)' }}>
                    背景模糊效果
                  </p>
                </div>
              </div>

              <div className="css-feature-demo__backdrop-blur-demo">
                <div className="css-feature-demo__backdrop-image">
                  <div className="css-feature-demo__backdrop-overlay">
                    <div className="css-feature-demo__backdrop-content">
                      <h3 style={{ margin: '0 0 12px 0', fontSize: 24 }}>
                        模糊背景面板
                      </h3>
                      <p
                        style={{
                          margin: '0 0 16px 0',
                          fontSize: 14,
                          opacity: 0.9,
                        }}
                      >
                        鼠标悬停查看更强的模糊效果
                      </p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="css-feature-demo__backdrop-btn">
                          了解更多
                        </button>
                        <button className="css-feature-demo__backdrop-btn css-feature-demo__backdrop-btn--outline">
                          关闭
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'clip-path',
      label: 'clip-path',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>clip-path 形状裁剪</Title>
            <Paragraph type="secondary">
              创建各种形状的元素裁剪效果，打破传统矩形限制。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>不同形状裁剪：</Text>
                <div
                  style={{
                    display: 'flex',
                    gap: 24,
                    marginTop: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <div className="css-feature-demo__clip-circle">
                    <span>圆形</span>
                  </div>
                  <div className="css-feature-demo__clip-triangle">
                    <span>三角形</span>
                  </div>
                  <div className="css-feature-demo__clip-polygon">
                    <span>多边形</span>
                  </div>
                  <div className="css-feature-demo__clip-star">
                    <span>星形</span>
                  </div>
                </div>
              </div>
            </Space>
          </Card>
        </div>
      ),
    },
    {
      key: 'box-shadow',
      label: 'box-shadow',
      children: (
        <div className="css-feature-demo__content">
          <div className="css-feature-demo__description">
            <Title level={5}>box-shadow 盒阴影</Title>
            <Paragraph type="secondary">
              为元素添加阴影效果，创建深度感和层次感，提升视觉立体效果。支持多层阴影叠加。
            </Paragraph>
          </div>
          <Card className="css-feature-demo__preview">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>基础阴影：</Text>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 24,
                    marginTop: 12,
                  }}
                >
                  <div className="css-feature-demo__shadow-small">
                    <div className="css-feature-demo__shadow-content">
                      小阴影
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-medium">
                    <div className="css-feature-demo__shadow-content">
                      中阴影
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-large">
                    <div className="css-feature-demo__shadow-content">
                      大阴影
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Text strong>彩色阴影：</Text>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 24,
                    marginTop: 12,
                  }}
                >
                  <div className="css-feature-demo__shadow-colored-blue">
                    <div className="css-feature-demo__shadow-content">
                      蓝色阴影
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-colored-red">
                    <div className="css-feature-demo__shadow-content">
                      红色阴影
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-colored-green">
                    <div className="css-feature-demo__shadow-content">
                      绿色阴影
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Text strong>内阴影：</Text>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 24,
                    marginTop: 12,
                  }}
                >
                  <div className="css-feature-demo__shadow-inset-light">
                    <div className="css-feature-demo__shadow-content">
                      浅内阴影
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-inset-deep">
                    <div className="css-feature-demo__shadow-content">
                      深内阴影
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-inset-border">
                    <div className="css-feature-demo__shadow-content">
                      边框效果
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Text strong>多层阴影与特殊效果：</Text>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 24,
                    marginTop: 12,
                  }}
                >
                  <div className="css-feature-demo__shadow-layered">
                    <div className="css-feature-demo__shadow-content">
                      多层阴影
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-neon">
                    <div className="css-feature-demo__shadow-content">
                      霓虹效果
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-3d">
                    <div className="css-feature-demo__shadow-content">
                      3D 效果
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Text strong>悬停交互效果：</Text>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 24,
                    marginTop: 12,
                  }}
                >
                  <div className="css-feature-demo__shadow-hover-lift">
                    <div className="css-feature-demo__shadow-content">
                      悬浮上升
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-hover-glow">
                    <div className="css-feature-demo__shadow-content">
                      光晕效果
                    </div>
                  </div>
                  <div className="css-feature-demo__shadow-hover-press">
                    <div className="css-feature-demo__shadow-content">
                      按压效果
                    </div>
                  </div>
                </div>
              </div>
            </Space>
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
