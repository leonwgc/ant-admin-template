"use strict";(self.webpackChunkneat_admin_template=self.webpackChunkneat_admin_template||[]).push([["7548"],{22650(e,i,s){s.r(i)},93895(e,i,s){s.r(i),s.d(i,{default:()=>_});var n=s(74848),r=s(96540),c=s(40244),a=s(16772),l=s(16629),d=s(99373),t=s(36813),o=s(11275),x=s(2733),m=s(15398),h=s(2017),p=s(68866),j=s(87281);s(22650);let _=()=>{let[e,i]=(0,r.useState)(600),[s,_]=(0,r.useState)(3);return(0,n.jsxs)("div",{className:"css-container-queries-example",children:[(0,n.jsxs)("h2",{className:"css-container-queries-example__title",children:[(0,n.jsx)(h.A,{})," CSS Container Queries 完全指南"]}),(0,n.jsx)(c.A,{message:"浏览器支持",description:"Container Queries 需要现代浏览器支持（Chrome 105+, Safari 16+, Firefox 110+）",type:"info",icon:(0,n.jsx)(p.A,{}),showIcon:!0,style:{marginBottom:24}}),(0,n.jsx)(a.A,{defaultActiveKey:"1",items:[{key:"1",label:"基础概念",children:(0,n.jsx)("div",{className:"css-container-queries-example__section",children:(0,n.jsxs)(l.A,{title:"什么是 Container Queries？",children:[(0,n.jsxs)("p",{className:"css-container-queries-example__desc",children:[(0,n.jsx)(d.A,{color:"blue",children:"容器查询"}),"Container Queries 允许你根据父容器的尺寸而不是视口尺寸来应用样式， 这使得组件真正独立且可复用。"]}),(0,n.jsx)("div",{className:"css-container-queries-example__code",children:`/* 定义容器 */
.container {
  container-name: card-container;   /* 容器名称 */
  container-type: inline-size;      /* 查询类型: inline-size | size | style */
}

/* 简写形式 */
.container {
  container: card-container / inline-size;
}

/* 容器查询 */
@container card-container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container (min-width: 600px) {
  .card__title {
    font-size: 24px;
  }
}`}),(0,n.jsx)(t.A,{direction:"vertical",style:{width:"100%",marginTop:24},size:"large",children:(0,n.jsxs)("div",{children:[(0,n.jsx)("h4",{children:"容器类型说明："}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)(d.A,{color:"green",children:"inline-size"})," - 查询内联方向尺寸（水平方向的宽度）"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(d.A,{color:"green",children:"size"})," - 查询两个方向的尺寸"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)(d.A,{color:"green",children:"normal"})," - 默认值，不是查询容器"]})]})]})})]})})},{key:"2",label:"交互式演示",children:(0,n.jsx)("div",{className:"css-container-queries-example__section",children:(0,n.jsxs)(l.A,{title:"响应式卡片 - 基于容器宽度",children:[(0,n.jsx)(t.A,{direction:"vertical",style:{width:"100%",marginBottom:24},size:"middle",children:(0,n.jsxs)(t.A,{children:[(0,n.jsx)("span",{children:"容器宽度:"}),(0,n.jsx)(o.A,{min:300,max:1200,value:e,onChange:e=>i(e),style:{width:300}}),(0,n.jsx)(x.A,{min:300,max:1200,value:e,onChange:e=>i(e)}),(0,n.jsx)("span",{children:"px"})]})}),(0,n.jsx)("div",{className:"demo-container",style:{width:`${e}px`,margin:"0 auto"},children:(0,n.jsxs)("div",{className:"responsive-card",children:[(0,n.jsx)("img",{src:"https://via.placeholder.com/400x300",alt:"Demo",className:"responsive-card__image"}),(0,n.jsxs)("div",{className:"responsive-card__content",children:[(0,n.jsx)("h3",{className:"responsive-card__title",children:"响应式卡片标题"}),(0,n.jsx)("p",{className:"responsive-card__description",children:"这个卡片会根据容器宽度自动调整布局。当容器小于 500px 时为垂直布局， 大于 500px 时为水平布局，大于 700px 时显示更多内容。"}),(0,n.jsxs)("div",{className:"responsive-card__meta",children:[(0,n.jsx)("span",{children:"作者: Leon Wang"}),(0,n.jsx)("span",{className:"responsive-card__date",children:"2025-12-27"})]}),(0,n.jsxs)("div",{className:"responsive-card__actions",children:[(0,n.jsx)("button",{className:"responsive-card__button",children:"查看详情"}),(0,n.jsx)("button",{className:"responsive-card__button responsive-card__button--secondary",children:"分享"})]})]})]})}),(0,n.jsx)("div",{className:"css-container-queries-example__code",style:{marginTop:24},children:`/* CSS Container Query 实现 */
.demo-container {
  container-type: inline-size;
}

.responsive-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 容器宽度 >= 500px: 水平布局 */
@container (min-width: 500px) {
  .responsive-card {
    flex-direction: row;
  }

  .responsive-card__image {
    width: 200px;
    height: 150px;
  }
}

/* 容器宽度 >= 700px: 显示更多内容 */
@container (min-width: 700px) {
  .responsive-card__title {
    font-size: 24px;
  }

  .responsive-card__date {
    display: inline;  /* 显示日期 */
  }

  .responsive-card__actions {
    flex-direction: row;
  }
}`})]})})},{key:"3",label:"网格布局示例",children:(0,n.jsx)("div",{className:"css-container-queries-example__section",children:(0,n.jsxs)(l.A,{title:"响应式网格 - 自适应列数",children:[(0,n.jsx)("p",{className:"css-container-queries-example__desc",children:"网格会根据容器宽度自动调整列数，无需媒体查询"}),(0,n.jsxs)(t.A,{direction:"vertical",style:{width:"100%",marginBottom:24},size:"middle",children:[(0,n.jsxs)(t.A,{children:[(0,n.jsx)("span",{children:"容器宽度:"}),(0,n.jsx)(o.A,{min:300,max:1200,value:e,onChange:e=>i(e),style:{width:300}}),(0,n.jsx)(x.A,{min:300,max:1200,value:e,onChange:e=>i(e)}),(0,n.jsx)("span",{children:"px"})]}),(0,n.jsxs)(t.A,{children:[(0,n.jsx)("span",{children:"卡片数量:"}),(0,n.jsx)(x.A,{min:1,max:12,value:s,onChange:e=>_(e)})]})]}),(0,n.jsx)("div",{className:"grid-demo-wrapper",style:{width:`${e}px`,margin:"0 auto"},children:(0,n.jsx)("div",{className:"grid-container",children:Array.from({length:s},(e,i)=>(0,n.jsxs)("div",{className:"grid-card",children:[(0,n.jsx)("div",{className:"grid-card__icon",children:"\uD83D\uDCCA"}),(0,n.jsxs)("h4",{className:"grid-card__title",children:["卡片 ",i+1]}),(0,n.jsx)("p",{className:"grid-card__text",children:"这是卡片内容"}),(0,n.jsx)("div",{className:"grid-card__footer",children:(0,n.jsx)("button",{className:"grid-card__button",children:"操作"})})]},i))})}),(0,n.jsx)("div",{className:"css-container-queries-example__code",style:{marginTop:24},children:`/* 响应式网格 - 使用 Container Query */
.grid-demo-wrapper {
  container-type: inline-size;  /* 在外层容器设置查询类型 */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

/* 容器宽度 >= 400px: 2 列 */
@container (min-width: 400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 容器宽度 >= 600px: 3 列 */
@container (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 容器宽度 >= 900px: 4 列 */
@container (min-width: 900px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}`})]})})},{key:"4",label:"vs Media Queries",children:(0,n.jsx)("div",{className:"css-container-queries-example__section",children:(0,n.jsx)(l.A,{title:"Container Queries vs Media Queries",children:(0,n.jsxs)(t.A,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,n.jsxs)("div",{children:[(0,n.jsxs)("h4",{children:[(0,n.jsx)(j.A,{style:{color:"#52c41a"}})," Container Queries 优势："]}),(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{children:"基于容器尺寸，而非视口尺寸"}),(0,n.jsx)("li",{children:"组件真正独立和可复用"}),(0,n.jsx)("li",{children:"在不同位置使用同一组件时自动适应"}),(0,n.jsx)("li",{children:"更适合组件化开发"}),(0,n.jsx)("li",{children:"减少媒体查询的复杂性"})]})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h4",{children:"对比示例："}),(0,n.jsxs)("div",{className:"comparison",children:[(0,n.jsxs)("div",{className:"comparison__item",children:[(0,n.jsx)("h5",{children:"Media Query 方式"}),(0,n.jsx)("div",{className:"css-container-queries-example__code",children:`/* 基于视口宽度 */
@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }
}

/* 问题：卡片在侧边栏中可能太小 */`})]}),(0,n.jsxs)("div",{className:"comparison__item",children:[(0,n.jsx)("h5",{children:"Container Query 方式"}),(0,n.jsx)("div",{className:"css-container-queries-example__code",children:`/* 基于容器宽度 */
@container (min-width: 500px) {
  .card {
    flex-direction: row;
  }
}

/* 优势：无论在哪里使用都能正确响应 */`})]})]})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h4",{children:"使用场景："}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"Container Queries:"})," 组件内部样式、可复用组件、卡片布局"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"Media Queries:"})," 页面级布局、导航栏、全局样式"]})]})]})]})})})},{key:"5",label:"高级用法",children:(0,n.jsxs)("div",{className:"css-container-queries-example__section",children:[(0,n.jsxs)(l.A,{title:"Container Query Units",children:[(0,n.jsx)("p",{className:"css-container-queries-example__desc",children:"容器查询提供了新的单位，用于基于容器尺寸的动态样式"}),(0,n.jsx)("div",{className:"css-container-queries-example__code",children:`/* Container Query Units */
.container {
  container-type: inline-size;
}

.title {
  /* cqw: 容器宽度的 1% */
  font-size: clamp(16px, 5cqw, 48px);

  /* cqh: 容器高度的 1% */
  padding: 2cqh;

  /* cqi: 容器内联尺寸的 1% */
  margin: 1cqi;

  /* cqb: 容器块尺寸的 1% */
  height: 50cqb;

  /* cqmin: cqi 和 cqb 中的较小值 */
  gap: 2cqmin;

  /* cqmax: cqi 和 cqb 中的较大值 */
  border-radius: 1cqmax;
}`}),(0,n.jsx)(m.A,{children:"容器单位演示"}),(0,n.jsx)("div",{className:"unit-demo-container",children:(0,n.jsxs)("div",{className:"unit-demo-card",children:[(0,n.jsx)("h3",{className:"unit-demo-card__title",children:"动态字体大小"}),(0,n.jsx)("p",{className:"unit-demo-card__text",children:"标题使用 5cqw 单位，会根据容器宽度自动缩放"})]})})]}),(0,n.jsxs)(l.A,{title:"嵌套容器查询",style:{marginTop:24},children:[(0,n.jsx)("p",{className:"css-container-queries-example__desc",children:"容器查询可以嵌套使用，实现更复杂的响应式设计"}),(0,n.jsx)("div",{className:"css-container-queries-example__code",children:`/* 嵌套容器 */
.page {
  container-name: page;
  container-type: inline-size;
}

.sidebar {
  container-name: sidebar;
  container-type: inline-size;
}

/* 基于页面容器 */
@container page (min-width: 1200px) {
  .sidebar {
    width: 300px;
  }
}

/* 基于侧边栏容器 */
@container sidebar (min-width: 250px) {
  .widget {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}`})]})]})}]})]})}}}]);