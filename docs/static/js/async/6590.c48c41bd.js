"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["6590"],{36584(i,e,n){n.r(e)},98269(i,e,n){n.r(e),n.d(e,{default:()=>m});var s=n(74848),t=n(96540),c=n(36813),l=n(85196),r=n(77075),d=n(16629),a=n(4787),o=n(71500),h=n(90697),x=n(58573),j=n(17047);n(36584);let m=()=>{let[i,e]=(0,t.useState)(!0),[n,m]=(0,t.useState)(!0),[p,_]=(0,t.useState)(!0),[z,v]=(0,t.useState)(!1);return(0,s.jsxs)("div",{className:"css-render-optimization",children:[(0,s.jsxs)("h2",{className:"css-render-optimization__title",children:[(0,s.jsx)(x.A,{})," CSS 渲染性能优化"]}),(0,s.jsx)(r.A,{defaultActiveKey:"1",items:[{key:"1",label:"content-visibility",children:(0,s.jsx)("div",{className:"css-render-optimization__section",children:(0,s.jsxs)(d.A,{title:(0,s.jsxs)(c.A,{children:[(0,s.jsx)(j.A,{}),"content-visibility - 最强大的渲染优化"]}),extra:(0,s.jsxs)(c.A,{children:[(0,s.jsx)("span",{children:"启用优化:"}),(0,s.jsx)(a.A,{checked:i,onChange:e})]}),children:[(0,s.jsxs)("p",{className:"css-render-optimization__desc",children:[(0,s.jsx)(l.A,{color:"red",children:"性能提升: ⭐⭐⭐⭐⭐"}),"跳过屏幕外元素的渲染，大幅提升长列表性能"]}),(0,s.jsx)("div",{className:"css-render-optimization__code",children:`.element {
  /* 跳过屏幕外元素的渲染 */
  content-visibility: auto;

  /* 为未渲染元素预留空间，避免布局偏移 */
  contain-intrinsic-size: 0 500px;
}

/* 语法说明 */
contain-intrinsic-size: <width> <height>;

/* 不同值的含义 */
contain-intrinsic-size: 0 500px;      /* 宽度自适应父容器，高度500px */
contain-intrinsic-size: auto 500px;   /* 记住上次渲染的宽度，高度500px */
contain-intrinsic-size: 300px 500px;  /* 固定宽300px，高500px */
contain-intrinsic-size: auto auto;    /* 记住上次渲染的完整尺寸 */

/* 为什么用 0 而不是 auto？
 * 0 = 宽度由父容器决定（100%），适用于响应式布局
 * auto = 记住元素最后一次渲染的实际尺寸，首次渲染前无效
 */`}),(0,s.jsxs)(d.A,{title:"contain-intrinsic-size 参数说明",size:"small",style:{marginBottom:16},children:[(0,s.jsxs)("table",{className:"css-render-optimization__table",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"值"}),(0,s.jsx)("th",{children:"含义"}),(0,s.jsx)("th",{children:"使用场景"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"0"})}),(0,s.jsx)("td",{children:"宽度自适应父容器（100%）"}),(0,s.jsx)("td",{children:"列表项、响应式布局"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"auto"})}),(0,s.jsx)("td",{children:"记住上次渲染的实际尺寸"}),(0,s.jsx)("td",{children:"动态内容、避免重复计算"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"具体数值"})}),(0,s.jsx)("td",{children:"固定尺寸占位"}),(0,s.jsx)("td",{children:"固定尺寸元素、卡片"})]})]})]}),(0,s.jsx)(o.A,{}),(0,s.jsx)("div",{className:"css-render-optimization__code",children:`/* 实际应用示例 */

/* ✅ 列表项 - 宽度自适应 */
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 100px;
}

/* ✅ 固定尺寸卡片 */
.card {
  content-visibility: auto;
  contain-intrinsic-size: 300px 200px;
}

/* ✅ 记忆尺寸 - 动态内容 */
.dynamic-content {
  content-visibility: auto;
  contain-intrinsic-size: auto auto;
}

/* 浏览器兼容性写法 */
.element {
  /* 标准语法 */
  contain-intrinsic-size: 0 500px;

  /* 旧版 Chrome */
  contain-intrinsic-width: 0;
  contain-intrinsic-height: 500px;
}`})]}),(0,s.jsx)(o.A,{children:"长列表演示 (100 items)"}),(0,s.jsx)("div",{className:"optimization-demo__list-container",children:Array.from({length:100},(e,n)=>(0,s.jsx)("div",{className:`optimization-demo__list-item ${i?"optimization-demo__list-item--optimized":""}`,children:(0,s.jsxs)("div",{className:"optimization-demo__list-content",children:[(0,s.jsxs)("h4",{children:["Item ",n+1]}),(0,s.jsx)("p",{children:"This is a demo item with some content. Content visibility can skip rendering for off-screen items."}),(0,s.jsxs)(c.A,{children:[(0,s.jsx)(l.A,{color:"blue",children:"Tag 1"}),(0,s.jsx)(l.A,{color:"green",children:"Tag 2"}),(0,s.jsx)(l.A,{color:"purple",children:"Tag 3"})]})]})},n))})]})})},{key:"2",label:"will-change",children:(0,s.jsx)("div",{className:"css-render-optimization__section",children:(0,s.jsxs)(d.A,{title:"will-change - 动画性能优化",extra:(0,s.jsxs)(c.A,{children:[(0,s.jsx)(h.Ay,{type:"primary",onClick:()=>v(!z),children:z?"停止动画":"开始动画"}),(0,s.jsx)(a.A,{checked:n,onChange:m})]}),children:[(0,s.jsxs)("p",{className:"css-render-optimization__desc",children:[(0,s.jsx)(l.A,{color:"orange",children:"性能提升: ⭐⭐⭐⭐"}),"提示浏览器元素将要发生的变化，提前优化"]}),(0,s.jsx)("div",{className:"css-render-optimization__code",children:`.element {
  /* 优化 transform 和 opacity 动画 */
  will-change: transform, opacity;
}

/* ⚠️ 动画结束后应移除 */
.element:hover {
  will-change: transform;
}
.element.animating {
  will-change: transform;
}`}),(0,s.jsx)(o.A,{children:"动画演示"}),(0,s.jsx)("div",{className:"optimization-demo__animation-container",children:(0,s.jsx)("div",{className:`optimization-demo__animated-box ${z?"optimization-demo__animated-box--active":""} ${n?"optimization-demo__animated-box--optimized":""}`,children:(0,s.jsxs)(c.A,{direction:"vertical",align:"center",children:[(0,s.jsx)(j.A,{style:{fontSize:48}}),(0,s.jsx)("span",{children:n?"will-change: ON":"will-change: OFF"})]})})}),(0,s.jsxs)("div",{className:"css-render-optimization__warning",children:[(0,s.jsx)(l.A,{color:"red",children:"⚠️ 注意"}),"不要过度使用 will-change，会消耗额外内存。只在必要时使用，动画结束后应移除。"]})]})})},{key:"3",label:"contain",children:(0,s.jsx)("div",{className:"css-render-optimization__section",children:(0,s.jsxs)(d.A,{title:"contain - 布局隔离优化",extra:(0,s.jsxs)(c.A,{children:[(0,s.jsx)("span",{children:"启用隔离:"}),(0,s.jsx)(a.A,{checked:p,onChange:_})]}),children:[(0,s.jsxs)("p",{className:"css-render-optimization__desc",children:[(0,s.jsx)(l.A,{color:"purple",children:"性能提升: ⭐⭐⭐⭐"}),"限制元素对页面其他部分的影响，减少重排重绘范围"]}),(0,s.jsx)("div",{className:"css-render-optimization__code",children:`.element {
  /* 布局隔离 - 内部布局不影响外部 */
  contain: layout;

  /* 样式隔离 - CSS 计数器等不影响外部 */
  contain: style;

  /* 绘制隔离 - 内容不会绘制到边界外 */
  contain: paint;

  /* 组合使用 */
  contain: layout style paint;

  /* 或使用简写（等同于 layout paint style） */
  contain: strict;

  /* 最常用：layout + paint */
  contain: content;
}`}),(0,s.jsx)(o.A,{children:"独立组件演示"}),(0,s.jsx)("div",{className:"optimization-demo__contain-grid",children:Array.from({length:9},(i,e)=>(0,s.jsxs)("div",{className:`optimization-demo__contain-card ${p?"optimization-demo__contain-card--optimized":""}`,children:[(0,s.jsxs)("h4",{children:["Card ",e+1]}),(0,s.jsx)("p",{children:"独立组件，内部变化不影响其他卡片"}),(0,s.jsx)(h.Ay,{size:"small",children:"Action"})]},e))})]})})},{key:"4",label:"硬件加速",children:(0,s.jsx)("div",{className:"css-render-optimization__section",children:(0,s.jsxs)(d.A,{title:"硬件加速 - GPU 渲染",children:[(0,s.jsxs)("p",{className:"css-render-optimization__desc",children:[(0,s.jsx)(l.A,{color:"cyan",children:"性能提升: ⭐⭐⭐"}),"强制开启 GPU 加速，适用于频繁动画的元素"]}),(0,s.jsx)("div",{className:"css-render-optimization__code",children:`.element {
  /* 方法 1: 3D transform */
  transform: translateZ(0);

  /* 方法 2: translate3d */
  transform: translate3d(0, 0, 0);

  /* 配合使用 */
  backface-visibility: hidden;
  perspective: 1000px;
}

/* 优化滚动 */
.scroll-container {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
}`}),(0,s.jsx)(o.A,{children:"硬件加速演示"}),(0,s.jsxs)("div",{className:"optimization-demo__gpu-container",children:[(0,s.jsxs)("div",{className:"optimization-demo__gpu-box optimization-demo__gpu-box--normal",children:[(0,s.jsx)("p",{children:"普通渲染"}),(0,s.jsx)("small",{children:"CPU 渲染"})]}),(0,s.jsxs)("div",{className:"optimization-demo__gpu-box optimization-demo__gpu-box--gpu",children:[(0,s.jsx)("p",{children:"GPU 加速"}),(0,s.jsx)("small",{children:"transform: translateZ(0)"})]})]})]})})},{key:"5",label:"其他优化",children:(0,s.jsx)("div",{className:"css-render-optimization__section",children:(0,s.jsxs)(c.A,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,s.jsxs)(d.A,{title:"aspect-ratio - 避免布局偏移",children:[(0,s.jsx)("div",{className:"css-render-optimization__code",children:`.image {
  aspect-ratio: 16 / 9;
  width: 100%;
  /* 图片加载前保持容器尺寸，避免布局偏移 */
}`}),(0,s.jsx)("div",{className:"optimization-demo__aspect-container",children:(0,s.jsx)("div",{className:"optimization-demo__aspect-box",children:"16:9 预留空间"})})]}),(0,s.jsx)(d.A,{title:"font-display - 字体加载优化",children:(0,s.jsx)("div",{className:"css-render-optimization__code",children:`@font-face {
  font-family: 'MyFont';
  src: url('font.woff2');
  /* 立即使用备用字体，加载完后替换 */
  font-display: swap;

  /* 其他选项：
     auto: 浏览器默认
     block: 最多阻塞 3s
     swap: 立即显示备用字体
     fallback: 100ms 阻塞 + 3s 替换
     optional: 100ms 后放弃加载
  */
}`})}),(0,s.jsx)(d.A,{title:"isolation - 层叠上下文隔离",children:(0,s.jsx)("div",{className:"css-render-optimization__code",children:`.element {
  /* 创建新的层叠上下文，隔离 z-index */
  isolation: isolate;
}`})}),(0,s.jsx)(d.A,{title:"pointer-events - 减少事件处理",children:(0,s.jsx)("div",{className:"css-render-optimization__code",children:`.decorative-element {
  /* 禁用鼠标事件，减少事件监听器 */
  pointer-events: none;
}

.interactive-child {
  /* 子元素恢复事件 */
  pointer-events: auto;
}`})})]})})},{key:"6",label:"性能对比",children:(0,s.jsx)("div",{className:"css-render-optimization__section",children:(0,s.jsxs)(d.A,{title:"CSS 渲染优化属性对比",children:[(0,s.jsxs)("table",{className:"css-render-optimization__table",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"属性"}),(0,s.jsx)("th",{children:"性能提升"}),(0,s.jsx)("th",{children:"适用场景"}),(0,s.jsx)("th",{children:"注意事项"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"content-visibility"})}),(0,s.jsx)("td",{children:(0,s.jsx)(l.A,{color:"red",children:"⭐⭐⭐⭐⭐"})}),(0,s.jsx)("td",{children:"长列表、虚拟滚动"}),(0,s.jsx)("td",{children:"需配合 contain-intrinsic-size"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"will-change"})}),(0,s.jsx)("td",{children:(0,s.jsx)(l.A,{color:"orange",children:"⭐⭐⭐⭐"})}),(0,s.jsx)("td",{children:"动画元素"}),(0,s.jsx)("td",{children:"不要过度使用，消耗内存"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"contain"})}),(0,s.jsx)("td",{children:(0,s.jsx)(l.A,{color:"purple",children:"⭐⭐⭐⭐"})}),(0,s.jsx)("td",{children:"独立组件、卡片"}),(0,s.jsx)("td",{children:"可能影响布局"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"transform: translateZ(0)"})}),(0,s.jsx)("td",{children:(0,s.jsx)(l.A,{color:"cyan",children:"⭐⭐⭐"})}),(0,s.jsx)("td",{children:"频繁动画"}),(0,s.jsx)("td",{children:"启用 GPU，增加内存"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"aspect-ratio"})}),(0,s.jsx)("td",{children:(0,s.jsx)(l.A,{color:"blue",children:"⭐⭐⭐"})}),(0,s.jsx)("td",{children:"响应式图片/视频"}),(0,s.jsx)("td",{children:"避免布局偏移"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"font-display"})}),(0,s.jsx)("td",{children:(0,s.jsx)(l.A,{color:"green",children:"⭐⭐⭐"})}),(0,s.jsx)("td",{children:"自定义字体"}),(0,s.jsx)("td",{children:"推荐使用 swap"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"isolation"})}),(0,s.jsx)("td",{children:(0,s.jsx)(l.A,{color:"geekblue",children:"⭐⭐"})}),(0,s.jsx)("td",{children:"复杂层叠上下文"}),(0,s.jsx)("td",{children:"隔离 z-index"})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("code",{children:"pointer-events"})}),(0,s.jsx)("td",{children:(0,s.jsx)(l.A,{color:"lime",children:"⭐⭐"})}),(0,s.jsx)("td",{children:"装饰性元素"}),(0,s.jsx)("td",{children:"减少事件处理"})]})]})]}),(0,s.jsx)(o.A,{}),(0,s.jsx)(d.A,{title:"最佳实践组合",size:"small",children:(0,s.jsx)("div",{className:"css-render-optimization__code",children:`/* 长列表项优化 */
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 100px;
  contain: layout style paint;
}

/* 动画元素优化 */
.animated-element {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 固定定位元素优化 */
.fixed-header {
  position: fixed;
  contain: layout style;
  transform: translateZ(0);
}

/* 图片容器优化 */
.image-container {
  aspect-ratio: 16 / 9;
  content-visibility: auto;
}

/* 独立组件优化 */
.card-component {
  contain: content;
  content-visibility: auto;
}`})})]})})}]})]})}}}]);