"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["1358"],{55384(e,i,s){s.r(i)},40317(e,i,s){s.r(i),s.d(i,{default:()=>h});var l=s(74848),t=s(96540),a=s(12229),d=s(16629),n=s(58607),c=s(15398),r=s(16772),o=s(36813),x=s(39360);s(55384);let{Paragraph:p,Title:u,Text:m}=a.A,h=()=>{let[e,i]=(0,t.useState)(null),s=s=>{let{title:t,description:a,usage:r,example:o}=s;return(0,l.jsxs)(d.A,{className:"mixin-card",size:"small",children:[(0,l.jsxs)("div",{className:"mixin-card__header",children:[(0,l.jsx)(u,{level:5,children:t}),(0,l.jsx)(n.Ay,{size:"small",icon:(0,l.jsx)(x.A,{}),onClick:()=>{navigator.clipboard.writeText(r),i(t),setTimeout(()=>i(null),2e3)},children:e===t?"已复制":"复制代码"})]}),(0,l.jsx)(p,{className:"mixin-card__description",children:a}),(0,l.jsx)("div",{className:"mixin-card__code",children:(0,l.jsx)("pre",{children:r})}),o&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.A,{style:{margin:"12px 0"}}),(0,l.jsx)("div",{className:"mixin-card__example",children:o})]})]})};return(0,l.jsxs)("div",{className:"scss-mixins-guide",children:[(0,l.jsxs)("div",{className:"scss-mixins-guide__header",children:[(0,l.jsx)(u,{level:2,children:"SCSS Mixins 使用指南"}),(0,l.jsxs)(p,{children:["项目中提供的所有可复用 SCSS Mixins，位于 ",(0,l.jsx)(m,{code:!0,children:"src/scss/common.scss"})]})]}),(0,l.jsx)(r.A,{defaultActiveKey:"layout",items:[{key:"layout",label:"\uD83D\uDCD0 布局 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"flex-center",description:"水平和垂直居中对齐",usage:`@include flex-center;

// 生成代码:
display: flex;
align-items: center;
justify-content: center;`,example:(0,l.jsx)("div",{className:"demo-flex-center",children:(0,l.jsx)("div",{className:"demo-box",children:"居中内容"})})}),(0,l.jsx)(s,{title:"flex-v-center",description:"仅垂直居中对齐",usage:`@include flex-v-center;

// 生成代码:
display: flex;
align-items: center;`,example:(0,l.jsxs)("div",{className:"demo-flex-v-center",children:[(0,l.jsx)("div",{className:"demo-box",children:"左侧"}),(0,l.jsx)("div",{className:"demo-box",children:"中间"}),(0,l.jsx)("div",{className:"demo-box",children:"右侧"})]})}),(0,l.jsx)(s,{title:"flex-h-center",description:"仅水平居中对齐",usage:`@include flex-h-center;

// 生成代码:
display: flex;
justify-content: center;`}),(0,l.jsx)(s,{title:"flex-between",description:"两端对齐，垂直居中",usage:`@include flex-between;

// 生成代码:
display: flex;
align-items: center;
justify-content: space-between;`,example:(0,l.jsxs)("div",{className:"demo-flex-between",children:[(0,l.jsx)("div",{className:"demo-box",children:"左侧"}),(0,l.jsx)("div",{className:"demo-box",children:"右侧"})]})}),(0,l.jsx)(s,{title:"flex-column",description:"纵向 Flex 布局",usage:`@include flex-column;

// 生成代码:
display: flex;
flex-direction: column;`}),(0,l.jsx)(s,{title:"absolute-center",description:"绝对定位水平垂直居中",usage:`@include absolute-center;

// 生成代码:
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);`,example:(0,l.jsx)("div",{className:"demo-absolute-center-wrapper",children:(0,l.jsx)("div",{className:"demo-absolute-center",children:(0,l.jsx)("div",{className:"demo-box",children:"绝对居中"})})})}),(0,l.jsx)(s,{title:"absolute-v-center",description:"绝对定位垂直居中",usage:`@include absolute-v-center;

// 生成代码:
position: absolute;
top: 50%;
transform: translateY(-50%);`}),(0,l.jsx)(s,{title:"absolute-h-center",description:"绝对定位水平居中",usage:`@include absolute-h-center;

// 生成代码:
position: absolute;
left: 50%;
transform: translateX(-50%);`}),(0,l.jsx)(s,{title:"full-cover",description:"绝对定位全尺寸覆盖",usage:`@include full-cover;

// 生成代码:
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;`})]})},{key:"text",label:"✍️ 文本 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"text-nowrap",description:"单行文本省略",usage:`@include text-nowrap;

// 生成代码:
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;`,example:(0,l.jsx)("div",{className:"demo-text-nowrap",children:"这是一段非常长的文本，将会被截断并显示省略号，不会换行显示完整内容"})}),(0,l.jsx)(s,{title:"text-ellipsis",description:"多行文本省略（支持指定行数）",usage:`@include text-ellipsis(3);

// 生成代码:
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
text-overflow: ellipsis;
word-break: break-all;`,example:(0,l.jsx)("div",{className:"demo-text-ellipsis",children:"这是一段很长的多行文本内容，超过指定的行数后将会显示省略号。 这个功能在卡片列表、新闻摘要等场景非常实用。 可以根据实际需求设置不同的行数限制。"})}),(0,l.jsx)(s,{title:"text-gradient",description:"文字渐变色效果",usage:`@include text-gradient(linear-gradient(90deg, #667eea, #764ba2));

// 生成代码:
background: linear-gradient(...);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;`,example:(0,l.jsx)("div",{className:"demo-text-gradient",children:"渐变色文字效果"})}),(0,l.jsx)(s,{title:"placeholder",description:"自定义 input placeholder 样式",usage:`input {
  @include placeholder {
    color: #999;
    font-style: italic;
  }
}`})]})},{key:"shadow",label:"\uD83C\uDFA8 阴影 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"shadow",description:"外阴影（5个层级）",usage:`@include shadow(1); // depth: 1-5

// 每个层级有不同的阴影强度`,example:(0,l.jsx)("div",{className:"demo-shadows",children:[1,2,3,4,5].map(e=>(0,l.jsxs)("div",{className:`demo-shadow-${e}`,children:["shadow(",e,")"]},e))})}),(0,l.jsx)(s,{title:"shadow-inset",description:"内阴影（7个层级）",usage:`@include shadow-inset(2); // depth: 1-7

// 创建内凹效果`,example:(0,l.jsx)("div",{className:"demo-shadows-inset",children:[1,2,3,4].map(e=>(0,l.jsxs)("div",{className:`demo-shadow-inset-${e}`,children:["shadow-inset(",e,")"]},e))})})]})},{key:"animation",label:"\uD83C\uDFAC 动画 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"transition",description:"平滑过渡动画",usage:`// 所有属性过渡
@include transition;

// 指定属性过渡
@include transition(transform, opacity);

// 生成代码:
transition: transform 250ms ease, opacity 250ms ease;`}),(0,l.jsx)(s,{title:"hover-lift",description:"悬停抬起效果",usage:`@include hover-lift(6px);

// 鼠标悬停时向上移动并添加阴影`,example:(0,l.jsx)("div",{className:"demo-hover-lift",children:(0,l.jsx)("div",{className:"demo-box",children:"悬停查看效果"})})}),(0,l.jsx)(s,{title:"fade-in",description:"淡入动画",usage:`@include fade-in(0.5s);

// 元素从透明渐变到不透明`,example:(0,l.jsx)("div",{className:"demo-fade-in",children:(0,l.jsx)("div",{className:"demo-box",children:"淡入效果"})})}),(0,l.jsx)(s,{title:"slide-in",description:"滑入动画（支持 4 个方向）",usage:`@include slide-in('up', 20px, 0.3s);
// 方向: 'up', 'down', 'left', 'right'

// 元素从指定方向滑入`,example:(0,l.jsx)("div",{className:"demo-slide-in",children:(0,l.jsx)("div",{className:"demo-box demo-slide-up",children:"从下滑入"})})}),(0,l.jsx)(s,{title:"skeleton-loading",description:"骨架屏加载动画",usage:`@include skeleton-loading;

// 或自定义颜色:
@include skeleton-loading(#e0e0e0, #f5f5f5);`,example:(0,l.jsxs)("div",{className:"demo-skeleton",children:[(0,l.jsx)("div",{className:"skeleton-line"}),(0,l.jsx)("div",{className:"skeleton-line"}),(0,l.jsx)("div",{className:"skeleton-line short"})]})})]})},{key:"responsive",label:"\uD83D\uDCF1 响应式 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"mobile",description:"移动端样式（≤767px）",usage:`.element {
  padding: 24px;
  
  @include mobile {
    padding: 12px;
  }
}`}),(0,l.jsx)(s,{title:"tablet",description:"平板样式（768-1023px）",usage:`.element {
  font-size: 16px;
  
  @include tablet {
    font-size: 14px;
  }
}`}),(0,l.jsx)(s,{title:"desktop",description:"桌面样式（≥1024px）",usage:`.element {
  @include desktop {
    max-width: 1200px;
  }
}`}),(0,l.jsx)(s,{title:"large-desktop",description:"大屏样式（≥1440px）",usage:`.element {
  @include large-desktop {
    max-width: 1400px;
  }
}`})]})},{key:"utils",label:"\uD83D\uDD27 工具 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"aspect-ratio",description:"固定宽高比容器",usage:`.video-container {
  @include aspect-ratio(16, 9);
}

// 常用比例:
// 16:9 (视频)
// 4:3 (传统屏幕)
// 1:1 (正方形)
// 3:2 (照片)`,example:(0,l.jsx)("div",{className:"demo-aspect-ratio",children:(0,l.jsx)("div",{className:"aspect-box",children:"16:9"})})}),(0,l.jsx)(s,{title:"scrollbar",description:"自定义滚动条样式",usage:`.scrollable {
  @include scrollbar(8px, #999, #f0f0f0, 4px);
  // 参数: 宽度, 滑块颜色, 轨道颜色, 圆角
}`,example:(0,l.jsx)("div",{className:"demo-scrollbar",children:(0,l.jsx)("div",{className:"scrollable-content",children:"滚动查看自定义滚动条效果。 这是一个很长的内容区域，用于演示滚动条的样式。 你可以自定义滚动条的宽度、颜色和圆角等属性。 这是一个很长的内容区域，用于演示滚动条的样式。 你可以自定义滚动条的宽度、颜色和圆角等属性。"})})}),(0,l.jsx)(s,{title:"hide-scrollbar",description:"隐藏滚动条（保持可滚动）",usage:`.element {
  @include hide-scrollbar;
  overflow-y: auto;
}`}),(0,l.jsx)(s,{title:"reset-button",description:"重置按钮默认样式",usage:`.custom-button {
  @include reset-button;
  // 移除边框、背景、内外边距
}`}),(0,l.jsx)(s,{title:"reset-list",description:"重置列表默认样式",usage:`ul {
  @include reset-list;
  // 移除列表样式和内外边距
}`}),(0,l.jsx)(s,{title:"user-select",description:"控制文本选择",usage:`.no-select {
  @include user-select(none);
}

// 参数: none, text, all, auto`,example:(0,l.jsx)("div",{className:"demo-user-select",children:"尝试选择此文本（不可选）"})}),(0,l.jsx)(s,{title:"float-fix",description:"清除浮动（Clearfix）",usage:`.container {
  @include float-fix;
}`}),(0,l.jsx)(s,{title:"invisible",description:"完全隐藏元素（用于辅助功能）",usage:`.sr-only {
  @include invisible;
}`})]})},{key:"effects",label:"✨ 效果 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"glass-morphism",description:"玻璃拟态效果",usage:`.glass-card {
  @include glass-morphism(10px, 0.1);
  // 参数: 模糊度, 透明度
}`,example:(0,l.jsx)("div",{className:"demo-glass-wrapper",children:(0,l.jsx)("div",{className:"demo-glass",children:"玻璃拟态效果"})})}),(0,l.jsx)(s,{title:"linear-gradient",description:"线性渐变背景",usage:`.gradient-bg {
  @include linear-gradient(90deg, #667eea, #764ba2);
}`,example:(0,l.jsx)("div",{className:"demo-gradient",children:"渐变背景"})})]})},{key:"advanced",label:"⚡ 进阶 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"size",description:"快速设置宽高",usage:`// 设置相同宽高
@include size(100px);

// 设置不同宽高
@include size(200px, 100px);`}),(0,l.jsx)(s,{title:"circle",description:"创建圆形元素",usage:`@include circle(50px);

// 生成代码:
width: 50px;
height: 50px;
border-radius: 50%;`,example:(0,l.jsx)("div",{className:"demo-circle",children:(0,l.jsx)("div",{className:"circle-item"})})}),(0,l.jsx)(s,{title:"triangle",description:"创建三角形（用于箭头、提示框等）",usage:`@include triangle('up', 10px, #333);
// 方向: 'up', 'down', 'left', 'right'
// 参数: 方向, 大小, 颜色`,example:(0,l.jsxs)("div",{className:"demo-triangles",children:[(0,l.jsx)("div",{className:"triangle-up"}),(0,l.jsx)("div",{className:"triangle-down"}),(0,l.jsx)("div",{className:"triangle-left"}),(0,l.jsx)("div",{className:"triangle-right"})]})}),(0,l.jsx)(s,{title:"center-block",description:"块级元素水平居中",usage:`@include center-block;

// 生成代码:
display: block;
margin-left: auto;
margin-right: auto;`}),(0,l.jsx)(s,{title:"hardware-acceleration",description:"启用硬件加速（提升动画性能）",usage:`@include hardware-acceleration;

// 用于需要高性能动画的元素`}),(0,l.jsx)(s,{title:"backdrop-blur",description:"背景模糊效果（毛玻璃）",usage:`@include backdrop-blur(10px);

// 配合半透明背景使用`}),(0,l.jsx)(s,{title:"overlay",description:"创建全屏遮罩层",usage:`@include overlay(rgba(0, 0, 0, 0.5), 100);
// 参数: 背景色, z-index`}),(0,l.jsx)(s,{title:"visually-hidden",description:"视觉隐藏（保持屏幕阅读器可访问）",usage:`@include visually-hidden;

// 用于无障碍优化，元素视觉隐藏但可被读屏软件识别`}),(0,l.jsx)(s,{title:"gradient-border",description:"渐变色边框",usage:`.card {
  @include gradient-border(
    2px,
    linear-gradient(90deg, #667eea, #764ba2),
    8px
  );
}`,example:(0,l.jsx)("div",{className:"demo-gradient-border",children:"渐变边框卡片"})}),(0,l.jsx)(s,{title:"selection",description:"自定义文本选中颜色",usage:`.content {
  @include selection(#667eea, white);
}`,example:(0,l.jsx)("div",{className:"demo-selection",children:"选中此文本查看自定义高亮效果"})})]})},{key:"grid",label:"\uD83C\uDFAF Grid 布局 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"grid-layout",description:"快速创建网格布局",usage:`.container {
  @include grid-layout(3, 16px);
  // 参数: 列数, 间距
}`,example:(0,l.jsx)("div",{className:"demo-grid-layout",children:[1,2,3,4,5,6].map(e=>(0,l.jsxs)("div",{className:"grid-item",children:["Item ",e]},e))})}),(0,l.jsx)(s,{title:"auto-grid",description:"自适应网格（auto-fit）",usage:`.container {
  @include auto-grid(200px, 16px);
  // 自动填充，尽可能占满空间
}`,example:(0,l.jsx)("div",{className:"demo-auto-grid",children:[1,2,3,4,5].map(e=>(0,l.jsxs)("div",{className:"grid-item",children:["Auto ",e]},e))})}),(0,l.jsx)(s,{title:"auto-grid-fill",description:"自适应网格（auto-fill）",usage:`.container {
  @include auto-grid-fill(180px, 16px);
  // 保持轨道数量，可能产生空轨道
}`}),(0,l.jsx)(s,{title:"sticky",description:"粘性定位",usage:`.header {
  @include sticky(0, 100);
  // 参数: top位置, z-index
}`})]})},{key:"images",label:"\uD83D\uDDBC️ 图片 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"cover-background",description:"背景图片覆盖（铺满容器）",usage:`.hero {
  @include cover-background('path/to/image.jpg');
}

// 或不指定图片
@include cover-background;`}),(0,l.jsx)(s,{title:"contain-background",description:"背景图片包含（完整显示）",usage:`.logo {
  @include contain-background('logo.png');
}`}),(0,l.jsx)(s,{title:"crisp-image",description:"图片清晰渲染优化",usage:`img {
  @include crisp-image;
  // 适用于像素图、图标等
}`})]})},{key:"more-animations",label:"\uD83C\uDFAA 更多动画",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"spinner",description:"加载旋转动画",usage:`.loading {
  @include spinner(40px, 4px, #0ea5e9);
  // 参数: 大小, 边框宽度, 颜色
}`,example:(0,l.jsx)("div",{className:"demo-spinner-wrapper",children:(0,l.jsx)("div",{className:"demo-spinner"})})}),(0,l.jsx)(s,{title:"pulse",description:"脉冲动画",usage:`.notification {
  @include pulse(1.5s);
}`,example:(0,l.jsx)("div",{className:"demo-pulse-wrapper",children:(0,l.jsx)("div",{className:"demo-pulse"})})}),(0,l.jsx)(s,{title:"shake",description:"抖动动画（错误提示）",usage:`.error-input {
  @include shake(0.5s);
}`,example:(0,l.jsx)("div",{className:"demo-shake-wrapper",children:(0,l.jsx)("div",{className:"demo-shake",children:"抖动元素"})})}),(0,l.jsx)(s,{title:"bounce",description:"弹跳动画",usage:`.icon {
  @include bounce(1s);
}`,example:(0,l.jsx)("div",{className:"demo-bounce-wrapper",children:(0,l.jsx)("div",{className:"demo-bounce",children:"↓"})})}),(0,l.jsx)(s,{title:"rotate",description:"持续旋转动画",usage:`.loading-icon {
  @include rotate(2s);
}`,example:(0,l.jsx)("div",{className:"demo-rotate-wrapper",children:(0,l.jsx)("div",{className:"demo-rotate",children:"⟳"})})}),(0,l.jsx)(s,{title:"scale",description:"缩放动画",usage:`.modal {
  @include scale(0.95, 1, 0.3s);
  // 参数: 起始缩放, 结束缩放, 动画时长
}`}),(0,l.jsx)(s,{title:"card-hover",description:"卡片悬停效果（整合版）",usage:`.card {
  @include card-hover(3);
  // 参数: 阴影深度
}`,example:(0,l.jsx)("div",{className:"demo-card-hover",children:"悬停查看效果"})})]})},{key:"helpers",label:"\uD83D\uDEE0️ 辅助 Mixins",children:(0,l.jsxs)(o.A,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,l.jsx)(s,{title:"truncate",description:"文本截断（text-nowrap 的别名）",usage:`@include truncate;

// 单行文本省略的简写方式`}),(0,l.jsx)(s,{title:"break-word",description:"强制长单词换行",usage:`@include break-word;

// 防止长URL或长单词溢出`,example:(0,l.jsx)("div",{className:"demo-break-word",children:"这是一个超长的URL：https://example.com/very-very-very-long-url-path/example"})}),(0,l.jsx)(s,{title:"smooth-font",description:"字体平滑渲染",usage:`body {
  @include smooth-font;
  // 使字体在 Mac 上渲染更平滑
}`}),(0,l.jsx)(s,{title:"reset-input",description:"重置输入框样式",usage:`input {
  @include reset-input;
  // 移除所有默认样式
}`}),(0,l.jsx)(s,{title:"focus-outline",description:"自定义焦点轮廓",usage:`button:focus {
  @include focus-outline(#0ea5e9, 2px, 2px);
  // 参数: 颜色, 宽度, 偏移
}`}),(0,l.jsx)(s,{title:"no-tap-highlight",description:"移除移动端点击高亮",usage:`button {
  @include no-tap-highlight;
  // 移除 iOS Safari 默认的点击高亮
}`}),(0,l.jsx)(s,{title:"diagonal-gradient",description:"对角线渐变",usage:`.banner {
  @include diagonal-gradient(#667eea, #764ba2, 45deg);
}`,example:(0,l.jsx)("div",{className:"demo-diagonal-gradient",children:"对角线渐变"})}),(0,l.jsx)(s,{title:"flex-gap",description:"Flex 间距兼容方案（旧浏览器）",usage:`.container {
  @include flex-gap(16px, row);
  // 为不支持 gap 属性的浏览器提供兼容
}`})]})}]}),(0,l.jsxs)(d.A,{className:"scss-mixins-guide__footer",style:{marginTop:24},children:[(0,l.jsx)(u,{level:4,children:"使用提示"}),(0,l.jsxs)(o.A,{direction:"vertical",children:[(0,l.jsxs)(m,{children:["\uD83D\uDCA1 所有 Mixins 都位于 ",(0,l.jsx)(m,{code:!0,children:"src/scss/common.scss"})," 文件中"]}),(0,l.jsxs)(m,{children:["\uD83D\uDCA1 在组件的 SCSS 文件顶部添加 ",(0,l.jsx)(m,{code:!0,children:"@import 'scss/common.scss';"})," 即可使用"]}),(0,l.jsx)(m,{children:'\uD83D\uDCA1 点击每个示例右上角的 "复制代码" 按钮可快速复制使用代码'}),(0,l.jsx)(m,{children:"\uD83D\uDCA1 建议根据实际需求调整 Mixin 的参数，以达到最佳效果"}),(0,l.jsxs)(m,{children:["\uD83D\uDCA1 本次更新新增 ",(0,l.jsx)(m,{strong:!0,children:"30+ 个实用 Mixins"}),"，涵盖布局、动画、图片、Grid 等多个场景"]})]})]})]})}}}]);