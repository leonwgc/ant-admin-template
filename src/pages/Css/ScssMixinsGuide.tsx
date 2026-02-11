/**
 * @file pages/Css/ScssMixinsGuide.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Tabs, Space, Typography, Divider, Button } from '@derbysoft/neat-design';
import { CopyOutlined } from '@derbysoft/neat-design-icons';
import './ScssMixinsGuide.scss';

const { Paragraph, Title, Text } = Typography;

/**
 * SCSS Mixins usage guide component
 * Demonstrates all available mixins in common.scss
 */
const ScssMixinsGuide: React.FC = () => {
  const [copiedMixin, setCopiedMixin] = useState<string | null>(null);

  const copyToClipboard = (text: string, mixinName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMixin(mixinName);
    setTimeout(() => setCopiedMixin(null), 2000);
  };

  const MixinCard = ({
    title,
    description,
    usage,
    example
  }: {
    title: string;
    description: string;
    usage: string;
    example?: React.ReactNode
  }) => (
    <Card className="mixin-card" size="small">
      <div className="mixin-card__header">
        <Title level={5}>{title}</Title>
        <Button
          size="small"
          icon={<CopyOutlined />}
          onClick={() => copyToClipboard(usage, title)}
        >
          {copiedMixin === title ? '已复制' : '复制代码'}
        </Button>
      </div>
      <Paragraph className="mixin-card__description">{description}</Paragraph>
      <div className="mixin-card__code">
        <pre>{usage}</pre>
      </div>
      {example && (
        <>
          <Divider style={{ margin: '12px 0' }} />
          <div className="mixin-card__example">{example}</div>
        </>
      )}
    </Card>
  );

  return (
    <div className="scss-mixins-guide">
      <div className="scss-mixins-guide__header">
        <Title level={2}>SCSS Mixins 使用指南</Title>
        <Paragraph>
          项目中提供的所有可复用 SCSS Mixins，位于 <Text code>src/scss/common.scss</Text>
        </Paragraph>
      </div>

      <Tabs
        defaultActiveKey="layout"
        items={[
          {
            key: 'layout',
            label: '📐 布局 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="flex-center"
                  description="水平和垂直居中对齐"
                  usage={`@include flex-center;\n\n// 生成代码:\ndisplay: flex;\nalign-items: center;\njustify-content: center;`}
                  example={
                    <div className="demo-flex-center">
                      <div className="demo-box">居中内容</div>
                    </div>
                  }
                />

                <MixinCard
                  title="flex-v-center"
                  description="仅垂直居中对齐"
                  usage={`@include flex-v-center;\n\n// 生成代码:\ndisplay: flex;\nalign-items: center;`}
                  example={
                    <div className="demo-flex-v-center">
                      <div className="demo-box">左侧</div>
                      <div className="demo-box">中间</div>
                      <div className="demo-box">右侧</div>
                    </div>
                  }
                />

                <MixinCard
                  title="flex-h-center"
                  description="仅水平居中对齐"
                  usage={`@include flex-h-center;\n\n// 生成代码:\ndisplay: flex;\njustify-content: center;`}
                />

                <MixinCard
                  title="flex-between"
                  description="两端对齐，垂直居中"
                  usage={`@include flex-between;\n\n// 生成代码:\ndisplay: flex;\nalign-items: center;\njustify-content: space-between;`}
                  example={
                    <div className="demo-flex-between">
                      <div className="demo-box">左侧</div>
                      <div className="demo-box">右侧</div>
                    </div>
                  }
                />

                <MixinCard
                  title="flex-column"
                  description="纵向 Flex 布局"
                  usage={`@include flex-column;\n\n// 生成代码:\ndisplay: flex;\nflex-direction: column;`}
                />

                <MixinCard
                  title="absolute-center"
                  description="绝对定位水平垂直居中"
                  usage={`@include absolute-center;\n\n// 生成代码:\nposition: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);`}
                  example={
                    <div className="demo-absolute-center-wrapper">
                      <div className="demo-absolute-center">
                        <div className="demo-box">绝对居中</div>
                      </div>
                    </div>
                  }
                />

                <MixinCard
                  title="absolute-v-center"
                  description="绝对定位垂直居中"
                  usage={`@include absolute-v-center;\n\n// 生成代码:\nposition: absolute;\ntop: 50%;\ntransform: translateY(-50%);`}
                />

                <MixinCard
                  title="absolute-h-center"
                  description="绝对定位水平居中"
                  usage={`@include absolute-h-center;\n\n// 生成代码:\nposition: absolute;\nleft: 50%;\ntransform: translateX(-50%);`}
                />

                <MixinCard
                  title="full-cover"
                  description="绝对定位全尺寸覆盖"
                  usage={`@include full-cover;\n\n// 生成代码:\nposition: absolute;\ntop: 0;\nleft: 0;\nwidth: 100%;\nheight: 100%;`}
                />
              </Space>
            ),
          },
          {
            key: 'text',
            label: '✍️ 文本 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="text-nowrap"
                  description="单行文本省略"
                  usage={`@include text-nowrap;\n\n// 生成代码:\noverflow: hidden;\nwhite-space: nowrap;\ntext-overflow: ellipsis;`}
                  example={
                    <div className="demo-text-nowrap">
                      这是一段非常长的文本，将会被截断并显示省略号，不会换行显示完整内容
                    </div>
                  }
                />

                <MixinCard
                  title="text-ellipsis"
                  description="多行文本省略（支持指定行数）"
                  usage={`@include text-ellipsis(3);\n\n// 生成代码:\ndisplay: -webkit-box;\n-webkit-box-orient: vertical;\n-webkit-line-clamp: 3;\noverflow: hidden;\ntext-overflow: ellipsis;\nword-break: break-all;`}
                  example={
                    <div className="demo-text-ellipsis">
                      这是一段很长的多行文本内容，超过指定的行数后将会显示省略号。
                      这个功能在卡片列表、新闻摘要等场景非常实用。
                      可以根据实际需求设置不同的行数限制。
                    </div>
                  }
                />

                <MixinCard
                  title="text-gradient"
                  description="文字渐变色效果"
                  usage={`@include text-gradient(linear-gradient(90deg, #667eea, #764ba2));\n\n// 生成代码:\nbackground: linear-gradient(...);\n-webkit-background-clip: text;\nbackground-clip: text;\n-webkit-text-fill-color: transparent;`}
                  example={
                    <div className="demo-text-gradient">
                      渐变色文字效果
                    </div>
                  }
                />

                <MixinCard
                  title="placeholder"
                  description="自定义 input placeholder 样式"
                  usage={`input {\n  @include placeholder {\n    color: #999;\n    font-style: italic;\n  }\n}`}
                />
              </Space>
            ),
          },
          {
            key: 'shadow',
            label: '🎨 阴影 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="shadow"
                  description="外阴影（5个层级）"
                  usage={`@include shadow(1); // depth: 1-5\n\n// 每个层级有不同的阴影强度`}
                  example={
                    <div className="demo-shadows">
                      {[1, 2, 3, 4, 5].map((depth) => (
                        <div key={depth} className={`demo-shadow-${depth}`}>
                          shadow({depth})
                        </div>
                      ))}
                    </div>
                  }
                />

                <MixinCard
                  title="shadow-inset"
                  description="内阴影（7个层级）"
                  usage={`@include shadow-inset(2); // depth: 1-7\n\n// 创建内凹效果`}
                  example={
                    <div className="demo-shadows-inset">
                      {[1, 2, 3, 4].map((depth) => (
                        <div key={depth} className={`demo-shadow-inset-${depth}`}>
                          shadow-inset({depth})
                        </div>
                      ))}
                    </div>
                  }
                />
              </Space>
            ),
          },
          {
            key: 'animation',
            label: '🎬 动画 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="transition"
                  description="平滑过渡动画"
                  usage={`// 所有属性过渡\n@include transition;\n\n// 指定属性过渡\n@include transition(transform, opacity);\n\n// 生成代码:\ntransition: transform 250ms ease, opacity 250ms ease;`}
                />

                <MixinCard
                  title="hover-lift"
                  description="悬停抬起效果"
                  usage={`@include hover-lift(6px);\n\n// 鼠标悬停时向上移动并添加阴影`}
                  example={
                    <div className="demo-hover-lift">
                      <div className="demo-box">悬停查看效果</div>
                    </div>
                  }
                />

                <MixinCard
                  title="fade-in"
                  description="淡入动画"
                  usage={`@include fade-in(0.5s);\n\n// 元素从透明渐变到不透明`}
                  example={
                    <div className="demo-fade-in">
                      <div className="demo-box">淡入效果</div>
                    </div>
                  }
                />

                <MixinCard
                  title="slide-in"
                  description="滑入动画（支持 4 个方向）"
                  usage={`@include slide-in('up', 20px, 0.3s);\n// 方向: 'up', 'down', 'left', 'right'\n\n// 元素从指定方向滑入`}
                  example={
                    <div className="demo-slide-in">
                      <div className="demo-box demo-slide-up">从下滑入</div>
                    </div>
                  }
                />

                <MixinCard
                  title="skeleton-loading"
                  description="骨架屏加载动画"
                  usage={`@include skeleton-loading;\n\n// 或自定义颜色:\n@include skeleton-loading(#e0e0e0, #f5f5f5);`}
                  example={
                    <div className="demo-skeleton">
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line short"></div>
                    </div>
                  }
                />
              </Space>
            ),
          },
          {
            key: 'responsive',
            label: '📱 响应式 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="mobile"
                  description="移动端样式（≤767px）"
                  usage={`.element {\n  padding: 24px;\n  \n  @include mobile {\n    padding: 12px;\n  }\n}`}
                />

                <MixinCard
                  title="tablet"
                  description="平板样式（768-1023px）"
                  usage={`.element {\n  font-size: 16px;\n  \n  @include tablet {\n    font-size: 14px;\n  }\n}`}
                />

                <MixinCard
                  title="desktop"
                  description="桌面样式（≥1024px）"
                  usage={`.element {\n  @include desktop {\n    max-width: 1200px;\n  }\n}`}
                />

                <MixinCard
                  title="large-desktop"
                  description="大屏样式（≥1440px）"
                  usage={`.element {\n  @include large-desktop {\n    max-width: 1400px;\n  }\n}`}
                />
              </Space>
            ),
          },
          {
            key: 'utils',
            label: '🔧 工具 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="aspect-ratio"
                  description="固定宽高比容器"
                  usage={`.video-container {\n  @include aspect-ratio(16, 9);\n}\n\n// 常用比例:\n// 16:9 (视频)\n// 4:3 (传统屏幕)\n// 1:1 (正方形)\n// 3:2 (照片)`}
                  example={
                    <div className="demo-aspect-ratio">
                      <div className="aspect-box">16:9</div>
                    </div>
                  }
                />

                <MixinCard
                  title="scrollbar"
                  description="自定义滚动条样式"
                  usage={`.scrollable {\n  @include scrollbar(8px, #999, #f0f0f0, 4px);\n  // 参数: 宽度, 滑块颜色, 轨道颜色, 圆角\n}`}
                  example={
                    <div className="demo-scrollbar">
                      <div className="scrollable-content">
                        滚动查看自定义滚动条效果。
                        这是一个很长的内容区域，用于演示滚动条的样式。
                        你可以自定义滚动条的宽度、颜色和圆角等属性。
                        这是一个很长的内容区域，用于演示滚动条的样式。
                        你可以自定义滚动条的宽度、颜色和圆角等属性。
                      </div>
                    </div>
                  }
                />

                <MixinCard
                  title="hide-scrollbar"
                  description="隐藏滚动条（保持可滚动）"
                  usage={`.element {\n  @include hide-scrollbar;\n  overflow-y: auto;\n}`}
                />

                <MixinCard
                  title="reset-button"
                  description="重置按钮默认样式"
                  usage={`.custom-button {\n  @include reset-button;\n  // 移除边框、背景、内外边距\n}`}
                />

                <MixinCard
                  title="reset-list"
                  description="重置列表默认样式"
                  usage={`ul {\n  @include reset-list;\n  // 移除列表样式和内外边距\n}`}
                />

                <MixinCard
                  title="user-select"
                  description="控制文本选择"
                  usage={`.no-select {\n  @include user-select(none);\n}\n\n// 参数: none, text, all, auto`}
                  example={
                    <div className="demo-user-select">
                      尝试选择此文本（不可选）
                    </div>
                  }
                />

                <MixinCard
                  title="float-fix"
                  description="清除浮动（Clearfix）"
                  usage={`.container {\n  @include float-fix;\n}`}
                />

                <MixinCard
                  title="invisible"
                  description="完全隐藏元素（用于辅助功能）"
                  usage={`.sr-only {\n  @include invisible;\n}`}
                />
              </Space>
            ),
          },
          {
            key: 'effects',
            label: '✨ 效果 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="glass-morphism"
                  description="玻璃拟态效果"
                  usage={`.glass-card {\n  @include glass-morphism(10px, 0.1);\n  // 参数: 模糊度, 透明度\n}`}
                  example={
                    <div className="demo-glass-wrapper">
                      <div className="demo-glass">
                        玻璃拟态效果
                      </div>
                    </div>
                  }
                />

                <MixinCard
                  title="linear-gradient"
                  description="线性渐变背景"
                  usage={`.gradient-bg {\n  @include linear-gradient(90deg, #667eea, #764ba2);\n}`}
                  example={
                    <div className="demo-gradient">
                      渐变背景
                    </div>
                  }
                />
              </Space>
            ),
          },
          {
            key: 'advanced',
            label: '⚡ 进阶 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="size"
                  description="快速设置宽高"
                  usage={`// 设置相同宽高\n@include size(100px);\n\n// 设置不同宽高\n@include size(200px, 100px);`}
                />

                <MixinCard
                  title="circle"
                  description="创建圆形元素"
                  usage={`@include circle(50px);\n\n// 生成代码:\nwidth: 50px;\nheight: 50px;\nborder-radius: 50%;`}
                  example={
                    <div className="demo-circle">
                      <div className="circle-item"></div>
                    </div>
                  }
                />

                <MixinCard
                  title="triangle"
                  description="创建三角形（用于箭头、提示框等）"
                  usage={`@include triangle('up', 10px, #333);\n// 方向: 'up', 'down', 'left', 'right'\n// 参数: 方向, 大小, 颜色`}
                  example={
                    <div className="demo-triangles">
                      <div className="triangle-up"></div>
                      <div className="triangle-down"></div>
                      <div className="triangle-left"></div>
                      <div className="triangle-right"></div>
                    </div>
                  }
                />

                <MixinCard
                  title="center-block"
                  description="块级元素水平居中"
                  usage={`@include center-block;\n\n// 生成代码:\ndisplay: block;\nmargin-left: auto;\nmargin-right: auto;`}
                />

                <MixinCard
                  title="hardware-acceleration"
                  description="启用硬件加速（提升动画性能）"
                  usage={`@include hardware-acceleration;\n\n// 用于需要高性能动画的元素`}
                />

                <MixinCard
                  title="backdrop-blur"
                  description="背景模糊效果（毛玻璃）"
                  usage={`@include backdrop-blur(10px);\n\n// 配合半透明背景使用`}
                />

                <MixinCard
                  title="overlay"
                  description="创建全屏遮罩层"
                  usage={`@include overlay(rgba(0, 0, 0, 0.5), 100);\n// 参数: 背景色, z-index`}
                />

                <MixinCard
                  title="visually-hidden"
                  description="视觉隐藏（保持屏幕阅读器可访问）"
                  usage={`@include visually-hidden;\n\n// 用于无障碍优化，元素视觉隐藏但可被读屏软件识别`}
                />

                <MixinCard
                  title="gradient-border"
                  description="渐变色边框"
                  usage={`.card {\n  @include gradient-border(\n    2px,\n    linear-gradient(90deg, #667eea, #764ba2),\n    8px\n  );\n}`}
                  example={
                    <div className="demo-gradient-border">
                      渐变边框卡片
                    </div>
                  }
                />

                <MixinCard
                  title="selection"
                  description="自定义文本选中颜色"
                  usage={`.content {\n  @include selection(#667eea, white);\n}`}
                  example={
                    <div className="demo-selection">
                      选中此文本查看自定义高亮效果
                    </div>
                  }
                />
              </Space>
            ),
          },
          {
            key: 'grid',
            label: '🎯 Grid 布局 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="grid-layout"
                  description="快速创建网格布局"
                  usage={`.container {\n  @include grid-layout(3, 16px);\n  // 参数: 列数, 间距\n}`}
                  example={
                    <div className="demo-grid-layout">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="grid-item">Item {i}</div>
                      ))}
                    </div>
                  }
                />

                <MixinCard
                  title="auto-grid"
                  description="自适应网格（auto-fit）"
                  usage={`.container {\n  @include auto-grid(200px, 16px);\n  // 自动填充，尽可能占满空间\n}`}
                  example={
                    <div className="demo-auto-grid">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="grid-item">Auto {i}</div>
                      ))}
                    </div>
                  }
                />

                <MixinCard
                  title="auto-grid-fill"
                  description="自适应网格（auto-fill）"
                  usage={`.container {\n  @include auto-grid-fill(180px, 16px);\n  // 保持轨道数量，可能产生空轨道\n}`}
                />

                <MixinCard
                  title="sticky"
                  description="粘性定位"
                  usage={`.header {\n  @include sticky(0, 100);\n  // 参数: top位置, z-index\n}`}
                />
              </Space>
            ),
          },
          {
            key: 'images',
            label: '🖼️ 图片 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="cover-background"
                  description="背景图片覆盖（铺满容器）"
                  usage={`.hero {\n  @include cover-background('path/to/image.jpg');\n}\n\n// 或不指定图片\n@include cover-background;`}
                />

                <MixinCard
                  title="contain-background"
                  description="背景图片包含（完整显示）"
                  usage={`.logo {\n  @include contain-background('logo.png');\n}`}
                />

                <MixinCard
                  title="crisp-image"
                  description="图片清晰渲染优化"
                  usage={`img {\n  @include crisp-image;\n  // 适用于像素图、图标等\n}`}
                />
              </Space>
            ),
          },
          {
            key: 'more-animations',
            label: '🎪 更多动画',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="spinner"
                  description="加载旋转动画"
                  usage={`.loading {\n  @include spinner(40px, 4px, #0ea5e9);\n  // 参数: 大小, 边框宽度, 颜色\n}`}
                  example={
                    <div className="demo-spinner-wrapper">
                      <div className="demo-spinner"></div>
                    </div>
                  }
                />

                <MixinCard
                  title="pulse"
                  description="脉冲动画"
                  usage={`.notification {\n  @include pulse(1.5s);\n}`}
                  example={
                    <div className="demo-pulse-wrapper">
                      <div className="demo-pulse"></div>
                    </div>
                  }
                />

                <MixinCard
                  title="shake"
                  description="抖动动画（错误提示）"
                  usage={`.error-input {\n  @include shake(0.5s);\n}`}
                  example={
                    <div className="demo-shake-wrapper">
                      <div className="demo-shake">抖动元素</div>
                    </div>
                  }
                />

                <MixinCard
                  title="bounce"
                  description="弹跳动画"
                  usage={`.icon {\n  @include bounce(1s);\n}`}
                  example={
                    <div className="demo-bounce-wrapper">
                      <div className="demo-bounce">↓</div>
                    </div>
                  }
                />

                <MixinCard
                  title="rotate"
                  description="持续旋转动画"
                  usage={`.loading-icon {\n  @include rotate(2s);\n}`}
                  example={
                    <div className="demo-rotate-wrapper">
                      <div className="demo-rotate">⟳</div>
                    </div>
                  }
                />

                <MixinCard
                  title="scale"
                  description="缩放动画"
                  usage={`.modal {\n  @include scale(0.95, 1, 0.3s);\n  // 参数: 起始缩放, 结束缩放, 动画时长\n}`}
                />

                <MixinCard
                  title="card-hover"
                  description="卡片悬停效果（整合版）"
                  usage={`.card {\n  @include card-hover(3);\n  // 参数: 阴影深度\n}`}
                  example={
                    <div className="demo-card-hover">
                      悬停查看效果
                    </div>
                  }
                />
              </Space>
            ),
          },
          {
            key: 'helpers',
            label: '🛠️ 辅助 Mixins',
            children: (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <MixinCard
                  title="truncate"
                  description="文本截断（text-nowrap 的别名）"
                  usage={`@include truncate;\n\n// 单行文本省略的简写方式`}
                />

                <MixinCard
                  title="break-word"
                  description="强制长单词换行"
                  usage={`@include break-word;\n\n// 防止长URL或长单词溢出`}
                  example={
                    <div className="demo-break-word">
                      这是一个超长的URL：https://example.com/very-very-very-long-url-path/example
                    </div>
                  }
                />

                <MixinCard
                  title="smooth-font"
                  description="字体平滑渲染"
                  usage={`body {\n  @include smooth-font;\n  // 使字体在 Mac 上渲染更平滑\n}`}
                />

                <MixinCard
                  title="reset-input"
                  description="重置输入框样式"
                  usage={`input {\n  @include reset-input;\n  // 移除所有默认样式\n}`}
                />

                <MixinCard
                  title="focus-outline"
                  description="自定义焦点轮廓"
                  usage={`button:focus {\n  @include focus-outline(#0ea5e9, 2px, 2px);\n  // 参数: 颜色, 宽度, 偏移\n}`}
                />

                <MixinCard
                  title="no-tap-highlight"
                  description="移除移动端点击高亮"
                  usage={`button {\n  @include no-tap-highlight;\n  // 移除 iOS Safari 默认的点击高亮\n}`}
                />

                <MixinCard
                  title="diagonal-gradient"
                  description="对角线渐变"
                  usage={`.banner {\n  @include diagonal-gradient(#667eea, #764ba2, 45deg);\n}`}
                  example={
                    <div className="demo-diagonal-gradient">
                      对角线渐变
                    </div>
                  }
                />

                <MixinCard
                  title="flex-gap"
                  description="Flex 间距兼容方案（旧浏览器）"
                  usage={`.container {\n  @include flex-gap(16px, row);\n  // 为不支持 gap 属性的浏览器提供兼容\n}`}
                />
              </Space>
            ),
          },
        ]}
      />

      <Card className="scss-mixins-guide__footer" style={{ marginTop: 24 }}>
        <Title level={4}>使用提示</Title>
        <Space direction="vertical">
          <Text>
            💡 所有 Mixins 都位于 <Text code>src/scss/common.scss</Text> 文件中
          </Text>
          <Text>
            💡 在组件的 SCSS 文件顶部添加 <Text code>@import 'scss/common.scss';</Text> 即可使用
          </Text>
          <Text>
            💡 点击每个示例右上角的 "复制代码" 按钮可快速复制使用代码
          </Text>
          <Text>
            💡 建议根据实际需求调整 Mixin 的参数，以达到最佳效果
          </Text>
          <Text>
            💡 本次更新新增 <Text strong>30+ 个实用 Mixins</Text>，涵盖布局、动画、图片、Grid 等多个场景
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default ScssMixinsGuide;
