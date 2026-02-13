"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["9541"],{99540(e,l,s){s.r(l)},52297(e,l,s){s.r(l),s.d(l,{default:()=>h});var a=s(74848),i=s(96540),n=s(16772),d=s(16629),x=s(99373),c=s(15398),r=s(36813),t=s(98222),o=s(11275),m=s(2733);s(99540);let h=()=>{let[e,l]=(0,i.useState)("row"),[s,h]=(0,i.useState)("flex-start"),[f,p]=(0,i.useState)("stretch"),[_,j]=(0,i.useState)("nowrap"),[v,g]=(0,i.useState)(16),[y,N]=(0,i.useState)(6),u=e=>Array.from({length:e},(e,l)=>(0,a.jsxs)("div",{className:"flex-demo__item",children:["Item ",l+1]},l)),b=e=>e.map((e,l)=>(0,a.jsxs)("div",{className:"flex-demo__item",style:{flex:e},children:["flex: ",e]},l));return(0,a.jsxs)("div",{className:"css-flex-example",children:[(0,a.jsx)("h2",{className:"css-flex-example__title",children:"CSS Flexbox 布局完全指南"}),(0,a.jsx)(n.A,{defaultActiveKey:"1",items:[{key:"1",label:"Flex 基础",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"Flexbox 基础概念",children:[(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"blue",children:"一维布局系统"}),"Flexbox 是一维布局方式，主要用于在一个方向上（行或列）分配和对齐空间"]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* 基础 Flex 容器 */
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
}`}),(0,a.jsx)(c.A,{children:"交互式演示"}),(0,a.jsxs)(r.A,{direction:"vertical",style:{width:"100%",marginBottom:16},size:"middle",children:[(0,a.jsxs)(r.A,{children:[(0,a.jsx)("span",{children:"flex-direction:"}),(0,a.jsxs)(t.A.Group,{value:e,onChange:e=>l(e.target.value),children:[(0,a.jsx)(t.A.Button,{value:"row",children:"row"}),(0,a.jsx)(t.A.Button,{value:"row-reverse",children:"row-reverse"}),(0,a.jsx)(t.A.Button,{value:"column",children:"column"}),(0,a.jsx)(t.A.Button,{value:"column-reverse",children:"column-reverse"})]})]}),(0,a.jsxs)(r.A,{children:[(0,a.jsx)("span",{children:"justify-content:"}),(0,a.jsxs)(t.A.Group,{value:s,onChange:e=>h(e.target.value),children:[(0,a.jsx)(t.A.Button,{value:"flex-start",children:"flex-start"}),(0,a.jsx)(t.A.Button,{value:"flex-end",children:"flex-end"}),(0,a.jsx)(t.A.Button,{value:"center",children:"center"}),(0,a.jsx)(t.A.Button,{value:"space-between",children:"space-between"}),(0,a.jsx)(t.A.Button,{value:"space-around",children:"space-around"}),(0,a.jsx)(t.A.Button,{value:"space-evenly",children:"space-evenly"})]})]}),(0,a.jsxs)(r.A,{children:[(0,a.jsx)("span",{children:"align-items:"}),(0,a.jsxs)(t.A.Group,{value:f,onChange:e=>p(e.target.value),children:[(0,a.jsx)(t.A.Button,{value:"flex-start",children:"flex-start"}),(0,a.jsx)(t.A.Button,{value:"flex-end",children:"flex-end"}),(0,a.jsx)(t.A.Button,{value:"center",children:"center"}),(0,a.jsx)(t.A.Button,{value:"stretch",children:"stretch"}),(0,a.jsx)(t.A.Button,{value:"baseline",children:"baseline"})]})]}),(0,a.jsxs)(r.A,{children:[(0,a.jsx)("span",{children:"flex-wrap:"}),(0,a.jsxs)(t.A.Group,{value:_,onChange:e=>j(e.target.value),children:[(0,a.jsx)(t.A.Button,{value:"nowrap",children:"nowrap"}),(0,a.jsx)(t.A.Button,{value:"wrap",children:"wrap"}),(0,a.jsx)(t.A.Button,{value:"wrap-reverse",children:"wrap-reverse"})]})]}),(0,a.jsxs)(r.A,{children:[(0,a.jsx)("span",{children:"gap:"}),(0,a.jsx)(o.A,{min:0,max:48,value:v,onChange:e=>g(e),style:{width:200}}),(0,a.jsx)(m.A,{min:0,max:48,value:v,onChange:e=>g(e)}),(0,a.jsx)("span",{children:"px"})]}),(0,a.jsxs)(r.A,{children:[(0,a.jsx)("span",{children:"元素数量:"}),(0,a.jsx)(m.A,{min:1,max:12,value:y,onChange:e=>N(e)})]})]}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",flexDirection:e,justifyContent:s,alignItems:f,flexWrap:_,gap:`${v}px`,minHeight:e.includes("column")?"500px":"200px"},children:u(y)}),(0,a.jsx)("div",{className:"css-flex-example__code",style:{marginTop:16},children:`/* 当前配置 */
.container {
  display: flex;
  flex-direction: ${e};
  justify-content: ${s};
  align-items: ${f};
  flex-wrap: ${_};
  gap: ${v}px;
}`})]})})},{key:"2",label:"flex 属性",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"flex-grow, flex-shrink, flex-basis",children:[(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"green",children:"flex 简写"}),"flex 属性是 flex-grow、flex-shrink 和 flex-basis 的简写"]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* flex 简写语法 */
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
.item { flex-basis: auto; }   /* 根据内容自动 */`}),(0,a.jsx)(c.A,{children:"flex 比例演示"}),(0,a.jsx)("h4",{children:"flex: 1, 2, 3 的效果"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:b([1,2,3])}),(0,a.jsx)("h4",{style:{marginTop:24},children:"flex: 1, 1, 1 (平均分配)"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:b([1,1,1])}),(0,a.jsx)("h4",{style:{marginTop:24},children:"flex: 2, 1, 1 (第一个占两份)"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:b([2,1,1])}),(0,a.jsx)("h4",{style:{marginTop:24},children:"flex: 3, 2, 1 (递减比例)"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:b([3,2,1])})]})})},{key:"3",label:"常见布局",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"Flex 常见布局模式",children:[(0,a.jsx)("h3",{children:"1. 水平居中"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",justifyContent:"center"},children:(0,a.jsx)("div",{className:"flex-demo__item",children:"Centered"})}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.container {
  display: flex;
  justify-content: center;
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"2. 垂直居中"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",alignItems:"center",minHeight:"150px"},children:(0,a.jsx)("div",{className:"flex-demo__item",children:"Centered"})}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.container {
  display: flex;
  align-items: center;
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"3. 水平垂直居中"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"150px"},children:(0,a.jsx)("div",{className:"flex-demo__item",children:"Perfect Center"})}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"4. 两端对齐"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)("div",{className:"flex-demo__item",children:"Left"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Right"})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.container {
  display: flex;
  justify-content: space-between;
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"5. 左固定，右自适应"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:[(0,a.jsx)("div",{className:"flex-demo__item",style:{flexBasis:"200px",flexShrink:0},children:"Fixed 200px"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{flex:1},children:"Flexible"})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.container {
  display: flex;
  gap: 16px;
}
.left {
  flex-basis: 200px;
  flex-shrink: 0;
}
.right {
  flex: 1;
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"6. 圣杯布局（三栏）"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:[(0,a.jsx)("div",{className:"flex-demo__item",style:{flexBasis:"200px",flexShrink:0},children:"Left Sidebar"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{flex:1},children:"Main Content"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{flexBasis:"200px",flexShrink:0},children:"Right Sidebar"})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.container {
  display: flex;
  gap: 16px;
}
.sidebar {
  flex-basis: 200px;
  flex-shrink: 0;
}
.main {
  flex: 1;
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"7. 均匀分布"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",justifyContent:"space-evenly"},children:u(4)}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.container {
  display: flex;
  justify-content: space-evenly;
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"8. 响应式网格（自动换行）"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",flexWrap:"wrap",gap:"16px"},children:Array.from({length:8},(e,l)=>(0,a.jsxs)("div",{className:"flex-demo__item",style:{flex:"1 1 calc(25% - 16px)",minWidth:"150px"},children:["Item ",l+1]},l))}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.item {
  flex: 1 1 calc(25% - 16px);
  min-width: 150px;
}`})]})})},{key:"4",label:"align-self",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"align-self - 单独控制子项对齐",children:[(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"purple",children:"单独对齐"}),"align-self 允许单个子项有不同的对齐方式，覆盖 align-items"]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* 容器统一对齐 */
.container {
  display: flex;
  align-items: center;
}

/* 单独控制某个子项 */
.item-1 { align-self: flex-start; }
.item-2 { align-self: center; }
.item-3 { align-self: flex-end; }
.item-4 { align-self: stretch; }
.item-5 { align-self: baseline; }`}),(0,a.jsx)(c.A,{children:"演示"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px",minHeight:"200px",alignItems:"center"},children:[(0,a.jsx)("div",{className:"flex-demo__item",style:{alignSelf:"flex-start"},children:"flex-start"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{alignSelf:"center"},children:"center"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{alignSelf:"flex-end"},children:"flex-end"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{alignSelf:"stretch"},children:"stretch"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{alignSelf:"baseline",fontSize:"24px"},children:"baseline"})]})]})})},{key:"5",label:"实战案例",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"实战布局案例",children:[(0,a.jsx)("h3",{children:"1. 导航栏布局"}),(0,a.jsxs)("div",{className:"flex-demo__navbar",children:[(0,a.jsx)("div",{className:"flex-demo__navbar-logo",children:"Logo"}),(0,a.jsxs)("div",{className:"flex-demo__navbar-menu",children:[(0,a.jsx)("span",{children:"Home"}),(0,a.jsx)("span",{children:"About"}),(0,a.jsx)("span",{children:"Services"}),(0,a.jsx)("span",{children:"Contact"})]}),(0,a.jsx)("div",{className:"flex-demo__navbar-actions",children:(0,a.jsx)("button",{children:"Login"})})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.navbar {
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
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"2. 卡片布局"}),(0,a.jsx)("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:Array.from({length:3},(e,l)=>(0,a.jsxs)("div",{className:"flex-demo__card",children:[(0,a.jsx)("div",{className:"flex-demo__card-image",children:"Image"}),(0,a.jsxs)("div",{className:"flex-demo__card-content",children:[(0,a.jsxs)("h4",{children:["Card Title ",l+1]}),(0,a.jsx)("p",{children:"Card description goes here with some sample text."})]}),(0,a.jsx)("div",{className:"flex-demo__card-footer",children:(0,a.jsx)("button",{children:"Read More"})})]},l))}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 calc(33.333% - 16px);
}
.card-content {
  flex: 1; /* 内容区域填充剩余空间 */
}
.card-footer {
  margin-top: auto; /* 固定在底部 */
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"3. 表单布局"}),(0,a.jsxs)("div",{className:"flex-demo__form",children:[(0,a.jsxs)("div",{className:"flex-demo__form-row",children:[(0,a.jsx)("label",{children:"Name:"}),(0,a.jsx)("input",{type:"text",placeholder:"Enter your name"})]}),(0,a.jsxs)("div",{className:"flex-demo__form-row",children:[(0,a.jsx)("label",{children:"Email:"}),(0,a.jsx)("input",{type:"email",placeholder:"Enter your email"})]}),(0,a.jsxs)("div",{className:"flex-demo__form-row",children:[(0,a.jsx)("label",{children:"Message:"}),(0,a.jsx)("textarea",{placeholder:"Enter your message",rows:3})]}),(0,a.jsxs)("div",{className:"flex-demo__form-actions",children:[(0,a.jsx)("button",{children:"Cancel"}),(0,a.jsx)("button",{children:"Submit"})]})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.form-row {
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
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"4. Footer 布局"}),(0,a.jsxs)("div",{className:"flex-demo__footer",children:[(0,a.jsxs)("div",{className:"flex-demo__footer-section",children:[(0,a.jsx)("h4",{children:"About Us"}),(0,a.jsx)("p",{children:"Company information"})]}),(0,a.jsxs)("div",{className:"flex-demo__footer-section",children:[(0,a.jsx)("h4",{children:"Quick Links"}),(0,a.jsx)("p",{children:"Link 1, Link 2, Link 3"})]}),(0,a.jsxs)("div",{className:"flex-demo__footer-section",children:[(0,a.jsx)("h4",{children:"Contact"}),(0,a.jsx)("p",{children:"Email: info@example.com"})]}),(0,a.jsxs)("div",{className:"flex-demo__footer-section",children:[(0,a.jsx)("h4",{children:"Follow Us"}),(0,a.jsx)("p",{children:"Social Media Links"})]})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`.footer {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.footer-section {
  flex: 1 1 200px;
}`})]})})},{key:"6",label:"align-content",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"align-content - 多行内容对齐",children:[(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"cyan",children:"多行对齐"}),"align-content 控制多行之间的对齐方式，只在 flex-wrap: wrap 时生效"]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* align-content 属性 */
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;    /* 多行顶部对齐 */
  align-content: flex-end;      /* 多行底部对齐 */
  align-content: center;        /* 多行居中对齐 */
  align-content: space-between; /* 多行两端对齐 */
  align-content: space-around;  /* 多行环绕对齐 */
  align-content: stretch;       /* 多行拉伸填充 */
}`}),(0,a.jsx)(c.A,{children:"演示"}),(0,a.jsx)("h4",{children:"align-content: flex-start"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",flexWrap:"wrap",alignContent:"flex-start",minHeight:"300px",gap:"16px"},children:u(8)}),(0,a.jsx)("h4",{style:{marginTop:24},children:"align-content: center"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",flexWrap:"wrap",alignContent:"center",minHeight:"300px",gap:"16px"},children:u(8)}),(0,a.jsx)("h4",{style:{marginTop:24},children:"align-content: space-between"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",flexWrap:"wrap",alignContent:"space-between",minHeight:"300px",gap:"16px"},children:u(8)}),(0,a.jsx)("h4",{style:{marginTop:24},children:"align-content: space-around"}),(0,a.jsx)("div",{className:"flex-demo__container",style:{display:"flex",flexWrap:"wrap",alignContent:"space-around",minHeight:"300px",gap:"16px"},children:u(8)})]})})},{key:"7",label:"order 属性",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"order - 改变元素顺序",children:[(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"purple",children:"顺序控制"}),"order 属性定义项目的排列顺序，数值越小越靠前，默认为 0"]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* order 属性 */
.item-1 { order: 3; }  /* 显示在最后 */
.item-2 { order: 1; }  /* 显示在第一个 */
.item-3 { order: 2; }  /* 显示在中间 */

/* 常见用法：调整元素位置 */
.sidebar { order: -1; }  /* 移到最前面 */
.main { order: 0; }      /* 保持默认 */
.footer { order: 1; }    /* 移到最后 */`}),(0,a.jsx)(c.A,{children:"演示"}),(0,a.jsx)("h4",{children:"默认顺序 (order: 0)"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:[(0,a.jsx)("div",{className:"flex-demo__item",children:"Item 1"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Item 2"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Item 3"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Item 4"})]}),(0,a.jsx)("h4",{style:{marginTop:24},children:"使用 order 调整顺序"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:[(0,a.jsxs)("div",{className:"flex-demo__item",style:{order:3},children:["Item 1",(0,a.jsx)("br",{}),(0,a.jsx)("small",{children:"(order: 3)"})]}),(0,a.jsxs)("div",{className:"flex-demo__item",style:{order:1},children:["Item 2",(0,a.jsx)("br",{}),(0,a.jsx)("small",{children:"(order: 1)"})]}),(0,a.jsxs)("div",{className:"flex-demo__item",style:{order:4},children:["Item 3",(0,a.jsx)("br",{}),(0,a.jsx)("small",{children:"(order: 4)"})]}),(0,a.jsxs)("div",{className:"flex-demo__item",style:{order:2},children:["Item 4",(0,a.jsx)("br",{}),(0,a.jsx)("small",{children:"(order: 2)"})]})]}),(0,a.jsx)("h4",{style:{marginTop:24},children:"实战：移动端布局调整"}),(0,a.jsxs)("div",{className:"flex-demo__mobile-layout",children:[(0,a.jsx)("div",{className:"flex-demo__mobile-header",style:{order:1},children:"Header (order: 1)"}),(0,a.jsx)("div",{className:"flex-demo__mobile-sidebar",style:{order:3},children:"Sidebar (order: 3)"}),(0,a.jsx)("div",{className:"flex-demo__mobile-main",style:{order:2},children:"Main Content (order: 2)"}),(0,a.jsx)("div",{className:"flex-demo__mobile-footer",style:{order:4},children:"Footer (order: 4)"})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* 移动端布局：调整显示顺序 */
.container {
  display: flex;
  flex-direction: column;
}
.header { order: 1; }    /* 首先显示 */
.main { order: 2; }      /* 主内容第二 */
.sidebar { order: 3; }   /* 侧边栏第三 */
.footer { order: 4; }    /* 页脚最后 */`})]})})},{key:"8",label:"margin: auto",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"margin: auto 的妙用",children:[(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"orange",children:"自动边距"}),"在 Flex 容器中，margin: auto 可以吸收剩余空间，实现特殊的对齐效果"]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* margin: auto 在 Flex 中的妙用 */
.container {
  display: flex;
}
.item {
  margin-left: auto;   /* 推到最右边 */
  margin-right: auto;  /* 水平居中 */
  margin-top: auto;    /* 推到底部 */
  margin: auto;        /* 完全居中 */
}`}),(0,a.jsx)(c.A,{children:"演示"}),(0,a.jsx)("h4",{children:"margin-left: auto (推到右边)"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:[(0,a.jsx)("div",{className:"flex-demo__item",children:"Item 1"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Item 2"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{marginLeft:"auto"},children:"margin-left: auto"})]}),(0,a.jsx)("h4",{style:{marginTop:24},children:"margin-right: auto (推到左边)"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:[(0,a.jsx)("div",{className:"flex-demo__item",style:{marginRight:"auto"},children:"margin-right: auto"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Item 2"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Item 3"})]}),(0,a.jsx)("h4",{style:{marginTop:24},children:"左右 auto (水平居中单个元素)"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",gap:"16px"},children:[(0,a.jsx)("div",{className:"flex-demo__item",children:"Left"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{marginLeft:"auto",marginRight:"auto"},children:"Center (margin: 0 auto)"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Right"})]}),(0,a.jsx)("h4",{style:{marginTop:24},children:"实战：导航栏分组"}),(0,a.jsxs)("div",{className:"flex-demo__auto-navbar",children:[(0,a.jsx)("div",{className:"flex-demo__item",children:"Logo"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Home"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"About"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{marginLeft:"auto"},children:"Login"}),(0,a.jsx)("div",{className:"flex-demo__item",children:"Signup"})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* 导航栏：左侧菜单，右侧登录按钮 */
.navbar {
  display: flex;
  gap: 16px;
}
.login-btn {
  margin-left: auto; /* 推到右边 */
}`}),(0,a.jsx)("h4",{style:{marginTop:24},children:"垂直方向的 auto"}),(0,a.jsxs)("div",{className:"flex-demo__container",style:{display:"flex",flexDirection:"column",gap:"16px",minHeight:"300px"},children:[(0,a.jsx)("div",{className:"flex-demo__item",children:"Top Item"}),(0,a.jsx)("div",{className:"flex-demo__item",style:{marginTop:"auto"},children:"Bottom Item (margin-top: auto)"})]})]})})},{key:"9",label:"高级技巧",children:(0,a.jsx)("div",{className:"css-flex-example__section",children:(0,a.jsxs)(d.A,{title:"Flex 高级技巧",children:[(0,a.jsx)("h3",{children:"1. Flex 嵌套布局"}),(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"red",children:"嵌套容器"}),"Flex 容器可以嵌套，实现复杂的二维布局"]}),(0,a.jsxs)("div",{className:"flex-demo__nested-container",children:[(0,a.jsxs)("div",{className:"flex-demo__nested-row",children:[(0,a.jsx)("div",{className:"flex-demo__nested-item",children:"1-1"}),(0,a.jsx)("div",{className:"flex-demo__nested-item",children:"1-2"}),(0,a.jsx)("div",{className:"flex-demo__nested-item",children:"1-3"})]}),(0,a.jsxs)("div",{className:"flex-demo__nested-row",children:[(0,a.jsx)("div",{className:"flex-demo__nested-item",style:{flex:2},children:"2-1 (flex: 2)"}),(0,a.jsx)("div",{className:"flex-demo__nested-item",style:{flex:1},children:"2-2 (flex: 1)"})]}),(0,a.jsxs)("div",{className:"flex-demo__nested-row",children:[(0,a.jsx)("div",{className:"flex-demo__nested-item",children:"3-1"}),(0,a.jsx)("div",{className:"flex-demo__nested-item",children:"3-2"}),(0,a.jsx)("div",{className:"flex-demo__nested-item",children:"3-3"}),(0,a.jsx)("div",{className:"flex-demo__nested-item",children:"3-4"})]})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* Flex 嵌套布局 */
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
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"2. 等高列布局"}),(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"green",children:"自动等高"}),"Flex 子项默认 align-items: stretch，自动实现等高效果"]}),(0,a.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,a.jsxs)("div",{className:"flex-demo__equal-height-card",children:[(0,a.jsx)("h4",{children:"Card 1"}),(0,a.jsx)("p",{children:"Short content"})]}),(0,a.jsxs)("div",{className:"flex-demo__equal-height-card",children:[(0,a.jsx)("h4",{children:"Card 2"}),(0,a.jsx)("p",{children:"Much longer content that spans multiple lines. This card has more text than the others. Notice how all cards have the same height automatically."})]}),(0,a.jsxs)("div",{className:"flex-demo__equal-height-card",children:[(0,a.jsx)("h4",{children:"Card 3"}),(0,a.jsx)("p",{children:"Medium length content here."})]})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* 等高列布局 */
.container {
  display: flex;
  gap: 16px;
  align-items: stretch; /* 默认值，可省略 */
}
.card {
  flex: 1;
  /* 所有卡片自动等高 */
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"3. Sticky Footer (粘性页脚)"}),(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"blue",children:"粘性布局"}),"使用 flex: 1 让主内容区域填充剩余空间，页脚始终在底部"]}),(0,a.jsxs)("div",{className:"flex-demo__sticky-footer-example",children:[(0,a.jsx)("div",{className:"flex-demo__sticky-header",children:"Header"}),(0,a.jsxs)("div",{className:"flex-demo__sticky-main",children:["Main Content (flex: 1)",(0,a.jsx)("br",{}),"This area fills all remaining space"]}),(0,a.jsx)("div",{className:"flex-demo__sticky-footer",children:"Footer (Always at bottom)"})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* Sticky Footer 布局 */
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
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"4. 流式标签布局"}),(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"purple",children:"自动换行"}),"flex-wrap 实现标签云等流式布局"]}),(0,a.jsx)("div",{className:"flex-demo__tag-container",children:["React","Vue","Angular","TypeScript","JavaScript","CSS","HTML","Node.js","Express","MongoDB","PostgreSQL","Docker","Kubernetes","AWS","Azure"].map(e=>(0,a.jsx)("div",{className:"flex-demo__tag",children:e},e))}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* 流式标签布局 */
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.tag {
  padding: 6px 16px;
  border-radius: 16px;
  /* 标签大小根据内容自适应 */
}`}),(0,a.jsx)("h3",{style:{marginTop:24},children:"5. 圣杯布局 + Sticky Header"}),(0,a.jsxs)("p",{className:"css-flex-example__desc",children:[(0,a.jsx)(x.A,{color:"cyan",children:"复合布局"}),"结合多种 Flex 技巧实现完整的应用布局"]}),(0,a.jsxs)("div",{className:"flex-demo__app-layout",children:[(0,a.jsx)("div",{className:"flex-demo__app-header",children:"App Header (Sticky)"}),(0,a.jsxs)("div",{className:"flex-demo__app-body",children:[(0,a.jsx)("div",{className:"flex-demo__app-sidebar",children:"Sidebar"}),(0,a.jsx)("div",{className:"flex-demo__app-main",children:"Main Content Area"}),(0,a.jsx)("div",{className:"flex-demo__app-aside",children:"Right Aside"})]}),(0,a.jsx)("div",{className:"flex-demo__app-footer",children:"App Footer"})]}),(0,a.jsx)("div",{className:"css-flex-example__code",children:`/* 完整应用布局 */
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
}`})]})})}]})]})}}}]);