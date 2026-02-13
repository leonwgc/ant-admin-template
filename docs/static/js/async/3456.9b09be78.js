/*! For license information please see 3456.9b09be78.js.LICENSE.txt */
"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["3456"],{68866(e,l,s){s.d(l,{A:()=>a});var d=s(58168),c=s(96540);let n={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"}}]},name:"info-circle",theme:"outlined"};var i=s(67928);let a=c.forwardRef(function(e,l){return c.createElement(i.A,(0,d.A)({},e,{ref:l,icon:n}))})},73622(e,l,s){s.r(l)},95123(e,l,s){s.r(l),s.d(l,{default:()=>v});var d=s(74848),c=s(96540),n=s(40244),i=s(16772),a=s(16629),r=s(99373),o=s(36813),m=s(98222),t=s(58168);let x={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M766.4 744.3c43.7 0 79.4-36.2 79.4-80.5 0-53.5-79.4-140.8-79.4-140.8S687 610.3 687 663.8c0 44.3 35.7 80.5 79.4 80.5zm-377.1-44.1c7.1 7.1 18.6 7.1 25.6 0l256.1-256c7.1-7.1 7.1-18.6 0-25.6l-256-256c-.6-.6-1.3-1.2-2-1.7l-78.2-78.2a9.11 9.11 0 00-12.8 0l-48 48a9.11 9.11 0 000 12.8l67.2 67.2-207.8 207.9c-7.1 7.1-7.1 18.6 0 25.6l255.9 256zm12.9-448.6l178.9 178.9H223.4l178.8-178.9zM904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8z"}}]},name:"bg-colors",theme:"outlined"};var h=s(67928),b=c.forwardRef(function(e,l){return c.createElement(h.A,(0,t.A)({},e,{ref:l,icon:x}))}),j=s(68866);s(73622);let v=()=>{let[e,l]=(0,c.useState)("normal"),[s,t]=(0,c.useState)("normal"),x=["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],h={normal:"默认模式，不混合",multiply:"正片叠底，颜色变暗",screen:"滤色，颜色变亮",overlay:"叠加，增强对比度",darken:"变暗，保留较暗的颜色",lighten:"变亮，保留较亮的颜色","color-dodge":"颜色减淡","color-burn":"颜色加深","hard-light":"强光，类似 overlay 但更强烈","soft-light":"柔光，效果比 overlay 柔和",difference:"差值，反转颜色",exclusion:"排除，类似 difference 但对比度更低",hue:"色相，使用源的色相",saturation:"饱和度，使用源的饱和度",color:"颜色，使用源的色相和饱和度",luminosity:"明度，使用源的明度"};return(0,d.jsxs)("div",{className:"css-blend-modes-example",children:[(0,d.jsxs)("h2",{className:"css-blend-modes-example__title",children:[(0,d.jsx)(b,{})," CSS Blend Modes 混合模式完全指南"]}),(0,d.jsx)(n.A,{message:"浏览器支持",description:"CSS Blend Modes 在所有现代浏览器中都得到了良好支持（IE 不支持）",type:"info",icon:(0,d.jsx)(j.A,{}),showIcon:!0,style:{marginBottom:24}}),(0,d.jsx)(i.A,{defaultActiveKey:"1",items:[{key:"1",label:"基础概念",children:(0,d.jsx)("div",{className:"css-blend-modes-example__section",children:(0,d.jsxs)(a.A,{title:"什么是 CSS Blend Modes？",children:[(0,d.jsxs)("p",{className:"css-blend-modes-example__desc",children:[(0,d.jsx)(r.A,{color:"blue",children:"混合模式"}),"CSS Blend Modes 允许你定义元素与其背景或其他元素如何混合显示， 类似于 Photoshop 中的图层混合模式。"]}),(0,d.jsx)("div",{className:"css-blend-modes-example__code",children:`/* mix-blend-mode: 元素与背景的混合 */
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
}`}),(0,d.jsx)(o.A,{direction:"vertical",style:{width:"100%",marginTop:24},size:"large",children:(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"两种混合模式属性："}),(0,d.jsxs)("ul",{children:[(0,d.jsxs)("li",{children:[(0,d.jsx)(r.A,{color:"green",children:"mix-blend-mode"})," - 定义元素内容如何与其背后的内容混合（包括背景和其他元素）"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(r.A,{color:"green",children:"background-blend-mode"})," - 定义元素的背景图片与背景颜色如何混合"]})]})]})})]})})},{key:"2",label:"mix-blend-mode",children:(0,d.jsx)("div",{className:"css-blend-modes-example__section",children:(0,d.jsxs)(a.A,{title:"mix-blend-mode 交互式演示",children:[(0,d.jsx)("p",{className:"css-blend-modes-example__desc",children:"选择不同的混合模式，查看前景元素如何与背景混合"}),(0,d.jsxs)(o.A,{direction:"vertical",style:{width:"100%",marginBottom:24},size:"middle",children:[(0,d.jsxs)(o.A,{wrap:!0,children:[(0,d.jsx)("span",{children:"混合模式:"}),(0,d.jsx)(m.A.Group,{value:e,onChange:e=>l(e.target.value),children:x.map(e=>(0,d.jsx)(m.A.Button,{value:e,children:e},e))})]}),(0,d.jsx)(n.A,{message:`${e}: ${h[e]}`,type:"info",showIcon:!1})]}),(0,d.jsxs)("div",{className:"blend-demo",children:[(0,d.jsxs)("div",{className:"blend-demo__background",children:[(0,d.jsx)("div",{className:"blend-demo__gradient1"}),(0,d.jsx)("div",{className:"blend-demo__gradient2"})]}),(0,d.jsxs)("div",{className:"blend-demo__foreground",style:{mixBlendMode:e},children:[(0,d.jsx)("div",{className:"blend-demo__circle blend-demo__circle--red",children:(0,d.jsx)("span",{children:"Red Circle"})}),(0,d.jsx)("div",{className:"blend-demo__circle blend-demo__circle--blue",children:(0,d.jsx)("span",{children:"Blue Circle"})}),(0,d.jsx)("div",{className:"blend-demo__circle blend-demo__circle--green",children:(0,d.jsx)("span",{children:"Green Circle"})})]})]}),(0,d.jsx)("div",{className:"css-blend-modes-example__code",style:{marginTop:24},children:`/* 应用 mix-blend-mode */
.foreground {
  mix-blend-mode: ${e};
}

.circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 圆形会与背景渐变色混合 */`})]})})},{key:"3",label:"background-blend-mode",children:(0,d.jsx)("div",{className:"css-blend-modes-example__section",children:(0,d.jsxs)(a.A,{title:"background-blend-mode 演示",children:[(0,d.jsx)("p",{className:"css-blend-modes-example__desc",children:"背景图片与背景颜色的混合效果"}),(0,d.jsxs)(o.A,{direction:"vertical",style:{width:"100%",marginBottom:24},size:"middle",children:[(0,d.jsxs)(o.A,{wrap:!0,children:[(0,d.jsx)("span",{children:"混合模式:"}),(0,d.jsx)(m.A.Group,{value:s,onChange:e=>t(e.target.value),children:x.map(e=>(0,d.jsx)(m.A.Button,{value:e,children:e},e))})]}),(0,d.jsx)(n.A,{message:`${s}: ${h[s]}`,type:"info",showIcon:!1})]}),(0,d.jsxs)("div",{className:"bg-blend-grid",children:[(0,d.jsx)("div",{className:"bg-blend-box",style:{backgroundBlendMode:s},children:(0,d.jsx)("div",{className:"bg-blend-box__label",children:"图片 + 红色"})}),(0,d.jsx)("div",{className:"bg-blend-box bg-blend-box--blue",style:{backgroundBlendMode:s},children:(0,d.jsx)("div",{className:"bg-blend-box__label",children:"图片 + 蓝色"})}),(0,d.jsx)("div",{className:"bg-blend-box bg-blend-box--green",style:{backgroundBlendMode:s},children:(0,d.jsx)("div",{className:"bg-blend-box__label",children:"图片 + 绿色"})}),(0,d.jsx)("div",{className:"bg-blend-box bg-blend-box--purple",style:{backgroundBlendMode:s},children:(0,d.jsx)("div",{className:"bg-blend-box__label",children:"图片 + 紫色"})})]}),(0,d.jsx)("div",{className:"css-blend-modes-example__code",style:{marginTop:24},children:`/* background-blend-mode 用法 */
.box {
  background-image: url('pattern.jpg');
  background-color: #ff6b6b;  /* 红色 */
  background-blend-mode: ${s};
  background-size: cover;
  background-position: center;
}`})]})})},{key:"4",label:"所有模式对比",children:(0,d.jsx)("div",{className:"css-blend-modes-example__section",children:(0,d.jsxs)(a.A,{title:"16 种混合模式对比",children:[(0,d.jsx)("p",{className:"css-blend-modes-example__desc",children:"一次性查看所有混合模式的效果"}),(0,d.jsx)("div",{className:"blend-comparison",children:x.map(e=>(0,d.jsxs)("div",{className:"blend-comparison__item",children:[(0,d.jsxs)("div",{className:"blend-comparison__demo",children:[(0,d.jsx)("div",{className:"blend-comparison__bg"}),(0,d.jsx)("div",{className:"blend-comparison__overlay",style:{mixBlendMode:e}})]}),(0,d.jsxs)("div",{className:"blend-comparison__info",children:[(0,d.jsx)("strong",{children:e}),(0,d.jsx)("p",{children:h[e]})]})]},e))})]})})},{key:"5",label:"实际应用",children:(0,d.jsx)("div",{className:"css-blend-modes-example__section",children:(0,d.jsx)(a.A,{title:"实际应用场景",children:(0,d.jsxs)(o.A,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"1. 图片滤镜效果"}),(0,d.jsxs)("div",{className:"practical-example",children:[(0,d.jsx)("div",{className:"image-filter image-filter--duotone",children:(0,d.jsx)("div",{className:"image-filter__label",children:"双色调效果"})}),(0,d.jsx)("div",{className:"css-blend-modes-example__code",children:`/* 双色调效果 */
.duotone {
  background-image: url('photo.jpg');
  background-color: #4158D0;
  background-blend-mode: screen;
}

.duotone::after {
  content: '';
  background: #C850C0;
  mix-blend-mode: multiply;
}`})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"2. 文字混合效果"}),(0,d.jsxs)("div",{className:"practical-example",children:[(0,d.jsx)("div",{className:"text-blend",children:(0,d.jsx)("h1",{className:"text-blend__title",children:"CREATIVE TEXT"})}),(0,d.jsx)("div",{className:"css-blend-modes-example__code",children:`/* 文字混合背景 */
.text {
  font-size: 80px;
  font-weight: bold;
  color: white;
  mix-blend-mode: difference;
}`})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"3. 悬停效果"}),(0,d.jsxs)("div",{className:"practical-example",children:[(0,d.jsxs)("div",{className:"hover-cards",children:[(0,d.jsx)("div",{className:"hover-card",children:(0,d.jsx)("div",{className:"hover-card__overlay",children:(0,d.jsx)("span",{children:"Hover Me"})})}),(0,d.jsx)("div",{className:"hover-card hover-card--multiply",children:(0,d.jsx)("div",{className:"hover-card__overlay",children:(0,d.jsx)("span",{children:"Multiply"})})}),(0,d.jsx)("div",{className:"hover-card hover-card--screen",children:(0,d.jsx)("div",{className:"hover-card__overlay",children:(0,d.jsx)("span",{children:"Screen"})})})]}),(0,d.jsx)("div",{className:"css-blend-modes-example__code",children:`/* 悬停混合效果 */
.card::before {
  content: '';
  opacity: 0;
  background: #ff6b6b;
  mix-blend-mode: multiply;
  transition: opacity 0.3s;
}

.card:hover::before {
  opacity: 1;
}`})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"使用场景："}),(0,d.jsxs)("ul",{children:[(0,d.jsx)("li",{children:"创意图片效果（双色调、滤镜）"}),(0,d.jsx)("li",{children:"文字与背景的融合效果"}),(0,d.jsx)("li",{children:"动态悬停效果"}),(0,d.jsx)("li",{children:"叠加纹理和图案"}),(0,d.jsx)("li",{children:"品牌色彩应用"})]})]})]})})})}]})]})}}}]);