"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["9375"],{98938(e,t,l){l.r(t)},93447(e,t,l){l.r(t),l.d(t,{default:()=>m});var s=l(74848),i=l(96540),n=l(16629),h=l(99373),o=l(36813),c=l(11275),r=l(2733),d=l(15398);l(98938);let m=()=>{let e=(0,i.useRef)(null),[t,l]=(0,i.useState)(20),[m,a]=(0,i.useState)(5),[g,x]=(0,i.useState)(200),[j,p]=(0,i.useState)(!0),[_,H]=(0,i.useState)({clientHeight:0,offsetHeight:0,scrollHeight:0});return(0,i.useEffect)(()=>{e.current&&H({clientHeight:e.current.clientHeight,offsetHeight:e.current.offsetHeight,scrollHeight:e.current.scrollHeight})},[t,m,g,j]),(0,s.jsxs)("div",{className:"element-height-demo",children:[(0,s.jsx)("h2",{className:"element-height-demo__title",children:"clientHeight vs offsetHeight vs scrollHeight"}),(0,s.jsxs)(n.A,{title:"概念说明",children:[(0,s.jsxs)("div",{className:"element-height-demo__concept",children:[(0,s.jsxs)("div",{className:"element-height-demo__concept-item",children:[(0,s.jsx)(h.A,{color:"blue",children:"clientHeight"}),(0,s.jsxs)("p",{children:["元素内部高度 = ",(0,s.jsx)("strong",{children:"content + padding"}),(0,s.jsx)("br",{}),"不包括：border、scrollbar、margin"]})]}),(0,s.jsxs)("div",{className:"element-height-demo__concept-item",children:[(0,s.jsx)(h.A,{color:"green",children:"offsetHeight"}),(0,s.jsxs)("p",{children:["元素可见高度 = ",(0,s.jsx)("strong",{children:"content + padding + border + scrollbar"}),(0,s.jsx)("br",{}),"不包括：margin"]})]}),(0,s.jsxs)("div",{className:"element-height-demo__concept-item",children:[(0,s.jsx)(h.A,{color:"purple",children:"scrollHeight"}),(0,s.jsxs)("p",{children:["元素内容完整高度 = ",(0,s.jsx)("strong",{children:"content（包括溢出部分）+ padding"}),(0,s.jsx)("br",{}),"不包括：border、margin"]})]})]}),(0,s.jsx)("div",{className:"element-height-demo__code",children:`// 获取元素的三种高度
const element = document.getElementById('box');

// 1. clientHeight: 内部可见高度（不含border和滚动条）
const clientHeight = element.clientHeight;
// = content height + padding-top + padding-bottom

// 2. offsetHeight: 元素整体高度（含border和滚动条）
const offsetHeight = element.offsetHeight;
// = content height + padding + border + scrollbar

// 3. scrollHeight: 内容完整高度（含溢出部分）
const scrollHeight = element.scrollHeight;
// = actual content height + padding (包括不可见的溢出内容)

// 常见用法：判断是否滚动到底部
if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
  console.log('已滚动到底部');
}`})]}),(0,s.jsx)(n.A,{title:"交互式演示",style:{marginTop:24},children:(0,s.jsxs)(o.A,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,s.jsxs)(o.A,{direction:"vertical",style:{width:"100%"},children:[(0,s.jsxs)(o.A,{children:[(0,s.jsx)("span",{style:{width:120,display:"inline-block"},children:"Padding:"}),(0,s.jsx)(c.A,{min:0,max:50,value:t,onChange:e=>l(e),style:{width:200}}),(0,s.jsx)(r.A,{min:0,max:50,value:t,onChange:e=>l(e)}),(0,s.jsx)("span",{children:"px"})]}),(0,s.jsxs)(o.A,{children:[(0,s.jsx)("span",{style:{width:120,display:"inline-block"},children:"Border:"}),(0,s.jsx)(c.A,{min:0,max:20,value:m,onChange:e=>a(e),style:{width:200}}),(0,s.jsx)(r.A,{min:0,max:20,value:m,onChange:e=>a(e)}),(0,s.jsx)("span",{children:"px"})]}),(0,s.jsxs)(o.A,{children:[(0,s.jsx)("span",{style:{width:120,display:"inline-block"},children:"Content Height:"}),(0,s.jsx)(c.A,{min:100,max:500,value:g,onChange:e=>x(e),style:{width:200}}),(0,s.jsx)(r.A,{min:100,max:500,value:g,onChange:e=>x(e)}),(0,s.jsx)("span",{children:"px"})]})]}),(0,s.jsx)(d.A,{}),(0,s.jsxs)("div",{className:"element-height-demo__comparison",children:[(0,s.jsxs)("div",{className:"element-height-demo__visual",children:[(0,s.jsx)("h4",{children:"可视化展示"}),(0,s.jsx)("div",{ref:e,className:"element-height-demo__box",style:{padding:`${t}px`,border:`${m}px solid #1890ff`,height:"300px",overflowY:j?"auto":"hidden"},children:(0,s.jsxs)("div",{className:"element-height-demo__content",style:{height:`${g}px`},children:[(0,s.jsx)("p",{children:"这是内容区域"}),(0,s.jsxs)("p",{children:["Content Height: ",g,"px"]}),(0,s.jsx)("p",{children:"当内容高度超过容器高度时，会出现滚动条"}),(0,s.jsx)("p",{children:"scrollHeight 会包含所有溢出的内容"}),(0,s.jsx)("p",{children:"而 clientHeight 只包含可见区域"}),(0,s.jsx)("p",{children:"offsetHeight 包含 border 和 scrollbar"}),g>250&&(0,s.jsx)("p",{children:"\uD83D\uDC47 向下滚动查看更多内容"})]})}),(0,s.jsxs)("div",{className:"element-height-demo__legend",children:[(0,s.jsxs)("div",{className:"element-height-demo__legend-item",children:[(0,s.jsx)("div",{className:"element-height-demo__legend-color element-height-demo__legend-color--content"}),(0,s.jsx)("span",{children:"Content"})]}),(0,s.jsxs)("div",{className:"element-height-demo__legend-item",children:[(0,s.jsx)("div",{className:"element-height-demo__legend-color element-height-demo__legend-color--padding"}),(0,s.jsx)("span",{children:"Padding"})]}),(0,s.jsxs)("div",{className:"element-height-demo__legend-item",children:[(0,s.jsx)("div",{className:"element-height-demo__legend-color element-height-demo__legend-color--border"}),(0,s.jsx)("span",{children:"Border"})]})]})]}),(0,s.jsxs)("div",{className:"element-height-demo__measurements",children:[(0,s.jsx)("h4",{children:"实时测量值"}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-item element-height-demo__measurement-item--client",children:[(0,s.jsx)("div",{className:"element-height-demo__measurement-label",children:(0,s.jsx)(h.A,{color:"blue",children:"clientHeight"})}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-value",children:[_.clientHeight,"px"]}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-formula",children:["= 300px (容器高度) - ",2*m,"px (border) ≈ ",_.clientHeight,"px"]})]}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-item element-height-demo__measurement-item--offset",children:[(0,s.jsx)("div",{className:"element-height-demo__measurement-label",children:(0,s.jsx)(h.A,{color:"green",children:"offsetHeight"})}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-value",children:[_.offsetHeight,"px"]}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-formula",children:["= 300px (容器高度) ≈ ",_.offsetHeight,"px"]})]}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-item element-height-demo__measurement-item--scroll",children:[(0,s.jsx)("div",{className:"element-height-demo__measurement-label",children:(0,s.jsx)(h.A,{color:"purple",children:"scrollHeight"})}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-value",children:[_.scrollHeight,"px"]}),(0,s.jsxs)("div",{className:"element-height-demo__measurement-formula",children:["= ",g,"px (content) + ",2*t,"px (padding) = ",g+2*t,"px"]})]}),(0,s.jsx)(d.A,{}),(0,s.jsxs)("div",{className:"element-height-demo__info",children:[(0,s.jsx)("h5",{children:"\uD83D\uDCCA 关系分析："}),(0,s.jsxs)("ul",{children:[(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:"offsetHeight"})," = clientHeight + 上下border",(0,s.jsx)("br",{}),"(",_.offsetHeight," = ",_.clientHeight," + ",2*m,")"]}),(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:"scrollHeight"})," ",_.scrollHeight>_.clientHeight?">":"="," ","clientHeight",(0,s.jsx)("br",{}),_.scrollHeight>_.clientHeight?"(内容溢出，可以滚动)":"(内容未溢出，无需滚动)"]}),(0,s.jsxs)("li",{children:["滚动条宽度: ≈ ",_.offsetHeight-_.clientHeight-2*m,"px"]})]})]})]})]})]})}),(0,s.jsxs)(n.A,{title:"实战案例",style:{marginTop:24},children:[(0,s.jsx)("h3",{children:"1. 判断是否滚动到底部"}),(0,s.jsx)("div",{className:"element-height-demo__code",children:`// 方法1: 使用 scrollHeight 和 clientHeight
element.addEventListener('scroll', () => {
  const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
  // 减1是为了容错，避免浮点数误差
  if (isAtBottom) {
    console.log('已滚动到底部，加载更多数据...');
  }
});

// 方法2: 计算滚动百分比
const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
console.log(\`已滚动 \${scrollPercentage.toFixed(1)}%\`);`}),(0,s.jsx)("h3",{style:{marginTop:24},children:"2. 判断元素是否有滚动条"}),(0,s.jsx)("div",{className:"element-height-demo__code",children:`// 判断是否有垂直滚动条
const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;

// 判断是否有横滚动条
const hasHorizontalScrollbar = element.scrollWidth > element.clientWidth;

if (hasVerticalScrollbar) {
  console.log('元素有垂直滚动条');
}`}),(0,s.jsx)("h3",{style:{marginTop:24},children:"3. 获取元素完整高度（含margin）"}),(0,s.jsx)("div",{className:"element-height-demo__code",children:`// offsetHeight 不包括 margin，需要手动计算
const getElementFullHeight = (element) => {
  const styles = window.getComputedStyle(element);
  const marginTop = parseFloat(styles.marginTop);
  const marginBottom = parseFloat(styles.marginBottom);

  return element.offsetHeight + marginTop + marginBottom;
};

// 使用 getBoundingClientRect (推荐)
const rect = element.getBoundingClientRect();
const fullHeight = rect.height; // 含小数，更精确`}),(0,s.jsx)("h3",{style:{marginTop:24},children:"4. 平滑滚动到底部"}),(0,s.jsx)("div",{className:"element-height-demo__code",children:`// 方法1: 使用 scrollTo
element.scrollTo({
  top: element.scrollHeight,
  behavior: 'smooth'
});

// 方法2: 设置 scrollTop
element.scrollTop = element.scrollHeight;

// 方法3: 滚动到指定位置（距离顶部的位置）
const scrollToPosition = (position) => {
  element.scrollTo({
    top: position,
    behavior: 'smooth'
  });
};`}),(0,s.jsx)("h3",{style:{marginTop:24},children:"5. 虚拟滚动优化（大数据列表）"}),(0,s.jsx)("div",{className:"element-height-demo__code",children:`// 计算可见区域的起始和结束索引
const getVisibleRange = (element, itemHeight) => {
  const scrollTop = element.scrollTop;
  const clientHeight = element.clientHeight;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.ceil((scrollTop + clientHeight) / itemHeight);

  return { startIndex, endIndex };
};

// 监听滚动，只渲染可见区域的元素
element.addEventListener('scroll', () => {
  const { startIndex, endIndex } = getVisibleRange(element, 50);
  renderVisibleItems(startIndex, endIndex);
});`})]}),(0,s.jsx)(n.A,{title:"常见问题 Q&A",style:{marginTop:24},children:(0,s.jsxs)("div",{className:"element-height-demo__qa",children:[(0,s.jsxs)("div",{className:"element-height-demo__qa-item",children:[(0,s.jsx)("h4",{children:"Q1: 为什么 offsetHeight 有时会包含滚动条宽度？"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"A:"})," 当元素设置了 ",(0,s.jsx)("code",{children:"overflow: auto"})," 或 ",(0,s.jsx)("code",{children:"overflow: scroll"})," ","并且内容确实溢出时，浏览器会显示滚动条。offsetHeight 会包含滚动条的宽度，而 clientHeight 不包含。"]})]}),(0,s.jsxs)("div",{className:"element-height-demo__qa-item",children:[(0,s.jsx)("h4",{children:"Q2: scrollHeight 什么时候会大于 clientHeight？"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"A:"})," 当元素内容超出其可见区域时，scrollHeight 会大于 clientHeight。这表示元素有滚动内容。"]})]}),(0,s.jsxs)("div",{className:"element-height-demo__qa-item",children:[(0,s.jsx)("h4",{children:"Q3: 如何获取精确的元素高度（含小数）？"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"A:"})," 使用 ",(0,s.jsx)("code",{children:"element.getBoundingClientRect().height"}),"，它返回的是精确的浮点数值。 而 offsetHeight 返回的是四舍五入后的整数。"]})]}),(0,s.jsxs)("div",{className:"element-height-demo__qa-item",children:[(0,s.jsx)("h4",{children:"Q4: box-sizing 会影响这些属性吗？"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"A:"})," box-sizing 只影响 CSS 盒模型的计算方式，不影响这些 DOM 属性的定义。 无论 box-sizing 是 content-box 还是 border-box，offsetHeight 始终包含 padding 和 border。"]})]})]})})]})}}}]);