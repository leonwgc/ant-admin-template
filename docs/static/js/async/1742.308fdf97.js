/*! For license information please see 1742.308fdf97.js.LICENSE.txt */
"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["1742"],{17047(e,a,n){n.d(a,{A:()=>o});var i=n(58168),s=n(96540);let t={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7zM378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211L378.2 732.5z"}}]},name:"thunderbolt",theme:"outlined"};var r=n(67928);let o=s.forwardRef(function(e,a){return s.createElement(r.A,(0,i.A)({},e,{ref:a,icon:t}))})},15398(e,a,n){n.d(a,{A:()=>x});var i,s=n(71500),t=n(46942),r=n.n(t),o=n(72422),l=n(2445);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var d=["className","alignment","size"];function m(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);a&&(i=i.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,i)}return n}function h(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?m(Object(n),!0).forEach(function(a){var i,s,t;i=e,s=a,t=n[a],(s=function(e){var a=function(e,a){if("object"!=c(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,a||"default");if("object"!=c(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===a?String:Number)(e)}(e,"string");return"symbol"==c(a)?a:String(a)}(s))in i?Object.defineProperty(i,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):i[s]=t}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}let x=function(e){var a=e.className,n=e.alignment,t=e.size,c=function(e,a){if(null==e)return{};var n,i,s=function(e,a){if(null==e)return{};var n,i,s={},t=Object.keys(e);for(i=0;i<t.length;i++)n=t[i],a.indexOf(n)>=0||(s[n]=e[n]);return s}(e,a);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(i=0;i<t.length;i++)n=t[i],!(a.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}(e,d),m=(0,o.Ay)()(function(e){var a,n,s=e.css,t=e.prefixCls,r=e.componentsToken.Divider;return s(i||(a=["\n            &.","-divider {\n                &.","-divider-horizontal {\n                    border-block-start-color: ",";\n                }\n\n                &.","-divider-vertical {\n                    border-inline-start-color: ",";\n                }\n\n                &.","-divider-large {\n                    &.","-divider-horizontal {\n                        border-block-start-width: 2px;\n                    }\n\n                    &.","-divider-vertical {\n                        border-inline-start-width: 2px;\n                    }\n                }\n            }\n        "],n||(n=a.slice(0)),i=Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(n)}}))),t,t,r["divider-color-border"],t,r["divider-color-border"],t,t,t)}),x=m.prefixCls,p=m.styles;return(0,l.Y)(s.A,h(h({},c),{},{className:r()("".concat(x,"-divider-").concat(void 0===t?"medium":t),p,a),plain:!0,type:void 0===n?"horizontal":n}))}},98317(e,a,n){n.r(a)},71500(e,a,n){n.d(a,{A:()=>f});var i=n(96540),s=n(46942),t=n.n(s),r=n(62279),o=n(829),l=n(53716),c=n(25905),d=n(37358),m=n(10224);let h=(0,d.OF)("Divider",e=>{let a=(0,m.mergeToken)(e,{dividerHorizontalWithTextGutterMargin:e.margin,sizePaddingEdgeHorizontal:0});return[(e=>{let{componentCls:a,sizePaddingEdgeHorizontal:n,colorSplit:i,lineWidth:s,textPaddingInline:t,orientationMargin:r,verticalMarginInline:o}=e;return{[a]:Object.assign(Object.assign({},(0,c.dF)(e)),{borderBlockStart:`${(0,l.unit)(s)} solid ${i}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:o,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${(0,l.unit)(s)} solid ${i}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${(0,l.unit)(e.marginLG)} 0`},[`&-horizontal${a}-with-text`]:{display:"flex",alignItems:"center",margin:`${(0,l.unit)(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${i}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${(0,l.unit)(s)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${a}-with-text-start`]:{"&::before":{width:`calc(${r} * 100%)`},"&::after":{width:`calc(100% - ${r} * 100%)`}},[`&-horizontal${a}-with-text-end`]:{"&::before":{width:`calc(100% - ${r} * 100%)`},"&::after":{width:`calc(${r} * 100%)`}},[`${a}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:t},"&-dashed":{background:"none",borderColor:i,borderStyle:"dashed",borderWidth:`${(0,l.unit)(s)} 0 0`},[`&-horizontal${a}-with-text${a}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${a}-dashed`]:{borderInlineStartWidth:s,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:i,borderStyle:"dotted",borderWidth:`${(0,l.unit)(s)} 0 0`},[`&-horizontal${a}-with-text${a}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${a}-dotted`]:{borderInlineStartWidth:s,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${a}-with-text`]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},[`&-horizontal${a}-with-text-start${a}-no-default-orientation-margin-start`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${a}-inner-text`]:{paddingInlineStart:n}},[`&-horizontal${a}-with-text-end${a}-no-default-orientation-margin-end`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${a}-inner-text`]:{paddingInlineEnd:n}}})}})(a),(e=>{let{componentCls:a}=e;return{[a]:{"&-horizontal":{[`&${a}`]:{"&-sm":{marginBlock:e.marginXS},"&-md":{marginBlock:e.margin}}}}}})(a)]},e=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:e.marginXS}),{unitless:{orientationMargin:!0}});var x=function(e,a){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&0>a.indexOf(i)&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var s=0,i=Object.getOwnPropertySymbols(e);s<i.length;s++)0>a.indexOf(i[s])&&Object.prototype.propertyIsEnumerable.call(e,i[s])&&(n[i[s]]=e[i[s]]);return n};let p={small:"sm",middle:"md"},f=e=>{let{getPrefixCls:a,direction:n,className:s,style:l}=(0,r.TP)("divider"),{prefixCls:c,type:d="horizontal",orientation:m="center",orientationMargin:f,className:_,rootClassName:u,children:j,dashed:v,variant:b="solid",plain:g,style:y,size:N}=e,w=x(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style","size"]),k=a("divider",c),[S,A,$]=h(k),C=p[(0,o.A)(N)],P=!!j,O=i.useMemo(()=>"left"===m?"rtl"===n?"end":"start":"right"===m?"rtl"===n?"start":"end":m,[n,m]),z="start"===O&&null!=f,B="end"===O&&null!=f,I=t()(k,s,A,$,`${k}-${d}`,{[`${k}-with-text`]:P,[`${k}-with-text-${O}`]:P,[`${k}-dashed`]:!!v,[`${k}-${b}`]:"solid"!==b,[`${k}-plain`]:!!g,[`${k}-rtl`]:"rtl"===n,[`${k}-no-default-orientation-margin-start`]:z,[`${k}-no-default-orientation-margin-end`]:B,[`${k}-${C}`]:!!C},_,u),T=i.useMemo(()=>"number"==typeof f?f:/^\d+$/.test(f)?Number(f):f,[f]);return S(i.createElement("div",Object.assign({className:I,style:Object.assign(Object.assign({},l),y)},w,{role:"separator"}),j&&"vertical"!==d&&i.createElement("span",{className:`${k}-inner-text`,style:{marginInlineStart:z?T:void 0,marginInlineEnd:B?T:void 0}},j)))}},43885(e,a,n){n.r(a),n.d(a,{default:()=>b});var i=n(74848),s=n(96540),t=n(16772),r=n(16629),o=n(99373),l=n(15398),c=n(36813),d=n(98222),m=n(11275),h=n(2733),x=n(82690),p=n(58607),f=n(17047),_=n(58168);let u={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M719.4 499.1l-296.1-215A15.9 15.9 0 00398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 000-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z"}}]},name:"play-circle",theme:"outlined"};var j=n(67928),v=s.forwardRef(function(e,a){return s.createElement(j.A,(0,_.A)({},e,{ref:a,icon:u}))});n(98317);let b=()=>{let[e,a]=(0,s.useState)("fade"),[n,_]=(0,s.useState)(!1),[u,j]=(0,s.useState)(1e3),[b,g]=(0,s.useState)(0),[y,N]=(0,s.useState)(1),[w,k]=(0,s.useState)(!1),[S,A]=(0,s.useState)("ease"),[$,C]=(0,s.useState)("normal"),[P,O]=(0,s.useState)(0),z={animationDuration:`${u}ms`,animationDelay:`${b}ms`,animationIterationCount:w?"infinite":y,animationTimingFunction:S,animationDirection:$};return(0,i.jsxs)("div",{className:"css-animation-example",children:[(0,i.jsxs)("h2",{className:"css-animation-example__title",children:[(0,i.jsx)(f.A,{})," CSS Animation 动画完全指南"]}),(0,i.jsx)(t.A,{defaultActiveKey:"1",items:[{key:"1",label:"动画基础",children:(0,i.jsx)("div",{className:"css-animation-example__section",children:(0,i.jsxs)(r.A,{title:"CSS Animation 基础概念",children:[(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"blue",children:"强大的动画系统"}),"CSS Animation 允许元素从一种样式逐渐变化为另一种样式，通过 @keyframes 规则定义动画序列"]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 基础动画语法 */
@keyframes animation-name {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 使用百分比定义多个关键帧 */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

/* 应用动画 */
.element {
  animation-name: animation-name;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: both;

  /* 简写形式 */
  animation: animation-name 1s ease 0s 1 normal both;
}`}),(0,i.jsx)(l.A,{children:"交互式演示"}),(0,i.jsxs)(c.A,{direction:"vertical",style:{width:"100%",marginBottom:16},size:"middle",children:[(0,i.jsxs)(c.A,{children:[(0,i.jsx)("span",{children:"动画类型:"}),(0,i.jsxs)(d.A.Group,{value:e,onChange:e=>a(e.target.value),children:[(0,i.jsx)(d.A.Button,{value:"fade",children:"Fade"}),(0,i.jsx)(d.A.Button,{value:"slide",children:"Slide"}),(0,i.jsx)(d.A.Button,{value:"scale",children:"Scale"}),(0,i.jsx)(d.A.Button,{value:"rotate",children:"Rotate"}),(0,i.jsx)(d.A.Button,{value:"bounce",children:"Bounce"}),(0,i.jsx)(d.A.Button,{value:"shake",children:"Shake"}),(0,i.jsx)(d.A.Button,{value:"flip",children:"Flip"}),(0,i.jsx)(d.A.Button,{value:"swing",children:"Swing"})]})]}),(0,i.jsxs)(c.A,{children:[(0,i.jsx)("span",{children:"持续时间 (duration):"}),(0,i.jsx)(m.A,{min:100,max:5e3,step:100,value:u,onChange:e=>j(e),style:{width:200}}),(0,i.jsx)(h.A,{min:100,max:5e3,value:u,onChange:e=>j(e)}),(0,i.jsx)("span",{children:"ms"})]}),(0,i.jsxs)(c.A,{children:[(0,i.jsx)("span",{children:"延迟 (delay):"}),(0,i.jsx)(m.A,{min:0,max:3e3,step:100,value:b,onChange:e=>g(e),style:{width:200}}),(0,i.jsx)(h.A,{min:0,max:3e3,value:b,onChange:e=>g(e)}),(0,i.jsx)("span",{children:"ms"})]}),(0,i.jsxs)(c.A,{children:[(0,i.jsx)("span",{children:"循环次数:"}),(0,i.jsx)(x.A,{checked:w,onChange:k,checkedChildren:"无限",unCheckedChildren:"有限"}),!w&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(m.A,{min:1,max:10,value:y,onChange:e=>N(e),style:{width:200}}),(0,i.jsx)(h.A,{min:1,max:10,value:y,onChange:e=>N(e)})]})]}),(0,i.jsxs)(c.A,{children:[(0,i.jsx)("span",{children:"timing-function:"}),(0,i.jsxs)(d.A.Group,{value:S,onChange:e=>A(e.target.value),children:[(0,i.jsx)(d.A.Button,{value:"linear",children:"linear"}),(0,i.jsx)(d.A.Button,{value:"ease",children:"ease"}),(0,i.jsx)(d.A.Button,{value:"ease-in",children:"ease-in"}),(0,i.jsx)(d.A.Button,{value:"ease-out",children:"ease-out"}),(0,i.jsx)(d.A.Button,{value:"ease-in-out",children:"ease-in-out"})]})]}),(0,i.jsxs)(c.A,{children:[(0,i.jsx)("span",{children:"direction:"}),(0,i.jsxs)(d.A.Group,{value:$,onChange:e=>C(e.target.value),children:[(0,i.jsx)(d.A.Button,{value:"normal",children:"normal"}),(0,i.jsx)(d.A.Button,{value:"reverse",children:"reverse"}),(0,i.jsx)(d.A.Button,{value:"alternate",children:"alternate"}),(0,i.jsx)(d.A.Button,{value:"alternate-reverse",children:"alternate-reverse"})]})]}),(0,i.jsx)(p.Ay,{type:"primary",icon:(0,i.jsx)(v,{}),onClick:()=>{_(!1),O(e=>e+1),setTimeout(()=>_(!0),10)},children:"播放动画"})]}),(0,i.jsx)("div",{className:"animation-demo__preview",children:(0,i.jsx)("div",{className:`animation-demo__box ${n?`animation-demo__box--${e}`:""}`,style:n?z:{},children:"Animated Box"},P)}),(0,i.jsx)("div",{className:"css-animation-example__code",style:{marginTop:16},children:`/* 当前动画配置 */
.element {
  animation-name: ${e};
  animation-duration: ${u}ms;
  animation-timing-function: ${S};
  animation-delay: ${b}ms;
  animation-iteration-count: ${w?"infinite":y};
  animation-direction: ${$};

  /* 简写 */
  animation: ${e} ${u}ms ${S} ${b}ms ${w?"infinite":y} ${$};
}`})]})})},{key:"2",label:"动画属性",children:(0,i.jsx)("div",{className:"css-animation-example__section",children:(0,i.jsxs)(r.A,{title:"Animation 属性详解",children:[(0,i.jsx)("h3",{children:"1. animation-name"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"指定要使用的 @keyframes 动画名称"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`animation-name: fade;
animation-name: slide;
animation-name: none; /* 禁用动画 */`}),(0,i.jsx)("h3",{children:"2. animation-duration"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"指定动画完成一个周期所需的时间"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`animation-duration: 1s;      /* 1秒 */
animation-duration: 500ms;   /* 500毫秒 */
animation-duration: 2.5s;    /* 2.5秒 */`}),(0,i.jsx)("h3",{children:"3. animation-timing-function"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"指定动画的速度曲线"}),(0,i.jsxs)("div",{className:"animation-demo__timing-functions",children:[(0,i.jsxs)("div",{className:"animation-demo__timing-item",children:[(0,i.jsx)("div",{className:"animation-demo__timing-box animation-demo__timing-box--linear",children:"linear"}),(0,i.jsx)("span",{children:"匀速"})]}),(0,i.jsxs)("div",{className:"animation-demo__timing-item",children:[(0,i.jsx)("div",{className:"animation-demo__timing-box animation-demo__timing-box--ease",children:"ease"}),(0,i.jsx)("span",{children:"慢-快-慢"})]}),(0,i.jsxs)("div",{className:"animation-demo__timing-item",children:[(0,i.jsx)("div",{className:"animation-demo__timing-box animation-demo__timing-box--ease-in",children:"ease-in"}),(0,i.jsx)("span",{children:"慢开始"})]}),(0,i.jsxs)("div",{className:"animation-demo__timing-item",children:[(0,i.jsx)("div",{className:"animation-demo__timing-box animation-demo__timing-box--ease-out",children:"ease-out"}),(0,i.jsx)("span",{children:"慢结束"})]}),(0,i.jsxs)("div",{className:"animation-demo__timing-item",children:[(0,i.jsx)("div",{className:"animation-demo__timing-box animation-demo__timing-box--ease-in-out",children:"ease-in-out"}),(0,i.jsx)("span",{children:"慢开始和结束"})]})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`animation-timing-function: linear;
animation-timing-function: ease;
animation-timing-function: ease-in;
animation-timing-function: ease-out;
animation-timing-function: ease-in-out;
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1); /* 自定义 */`}),(0,i.jsx)("h3",{children:"4. animation-delay"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"指定动画开始前的延迟时间"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`animation-delay: 0s;     /* 立即开始 */
animation-delay: 1s;     /* 延迟1秒 */
animation-delay: -1s;    /* 从动画中间开始 */`}),(0,i.jsx)("h3",{children:"5. animation-iteration-count"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"指定动画播放的次数"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`animation-iteration-count: 1;         /* 播放一次 */
animation-iteration-count: 3;         /* 播放三次 */
animation-iteration-count: infinite;  /* 无限循环 */`}),(0,i.jsx)("h3",{children:"6. animation-direction"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"指定动画播放的方向"}),(0,i.jsxs)("div",{className:"animation-demo__direction",children:[(0,i.jsxs)("div",{className:"animation-demo__direction-item",children:[(0,i.jsx)("div",{className:"animation-demo__direction-box animation-demo__direction-box--normal",children:"normal"}),(0,i.jsx)("span",{children:"正向播放"})]}),(0,i.jsxs)("div",{className:"animation-demo__direction-item",children:[(0,i.jsx)("div",{className:"animation-demo__direction-box animation-demo__direction-box--reverse",children:"reverse"}),(0,i.jsx)("span",{children:"反向播放"})]}),(0,i.jsxs)("div",{className:"animation-demo__direction-item",children:[(0,i.jsx)("div",{className:"animation-demo__direction-box animation-demo__direction-box--alternate",children:"alternate"}),(0,i.jsx)("span",{children:"交替播放"})]}),(0,i.jsxs)("div",{className:"animation-demo__direction-item",children:[(0,i.jsx)("div",{className:"animation-demo__direction-box animation-demo__direction-box--alternate-reverse",children:"alternate-reverse"}),(0,i.jsx)("span",{children:"反向交替"})]})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`animation-direction: normal;            /* 正向播放 */
animation-direction: reverse;           /* 反向播放 */
animation-direction: alternate;         /* 正向和反向交替 */
animation-direction: alternate-reverse; /* 反向和正向交替 */`}),(0,i.jsx)("h3",{children:"7. animation-fill-mode"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"指定动画执行前后如何应用样式"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`animation-fill-mode: none;      /* 默认，不应用样式 */
animation-fill-mode: forwards;  /* 保持最后一帧 */
animation-fill-mode: backwards; /* 应用第一帧 */
animation-fill-mode: both;      /* 同时应用 forwards 和 backwards */`}),(0,i.jsx)("h3",{children:"8. animation-play-state"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"指定动画是运行还是暂停"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`animation-play-state: running; /* 运行 */
animation-play-state: paused;  /* 暂停 */

/* 悬停时暂停 */
.element:hover {
  animation-play-state: paused;
}`})]})})},{key:"3",label:"常见动画",children:(0,i.jsx)("div",{className:"css-animation-example__section",children:(0,i.jsxs)(r.A,{title:"常见动画效果",children:[(0,i.jsx)("h3",{children:"1. 淡入淡出 (Fade)"}),(0,i.jsx)("div",{className:"animation-demo__showcase",children:(0,i.jsxs)("div",{className:"animation-demo__showcase-item",children:[(0,i.jsx)("div",{className:"animation-demo__showcase-box animation-demo__showcase-box--fade",children:"Fade In"}),(0,i.jsx)("span",{children:"淡入"})]})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fade 1s ease-in-out;
}`}),(0,i.jsx)("h3",{children:"2. 滑动 (Slide)"}),(0,i.jsx)("div",{className:"animation-demo__showcase",children:(0,i.jsxs)("div",{className:"animation-demo__showcase-item",children:[(0,i.jsx)("div",{className:"animation-demo__showcase-box animation-demo__showcase-box--slide",children:"Slide In"}),(0,i.jsx)("span",{children:"滑入"})]})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`@keyframes slide {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slide 1s ease-out;
}`}),(0,i.jsx)("h3",{children:"3. 缩放 (Scale)"}),(0,i.jsx)("div",{className:"animation-demo__showcase",children:(0,i.jsxs)("div",{className:"animation-demo__showcase-item",children:[(0,i.jsx)("div",{className:"animation-demo__showcase-box animation-demo__showcase-box--scale",children:"Scale In"}),(0,i.jsx)("span",{children:"缩放"})]})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`@keyframes scale {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.element {
  animation: scale 1s ease-out;
}`}),(0,i.jsx)("h3",{children:"4. 旋转 (Rotate)"}),(0,i.jsx)("div",{className:"animation-demo__showcase",children:(0,i.jsxs)("div",{className:"animation-demo__showcase-item",children:[(0,i.jsx)("div",{className:"animation-demo__showcase-box animation-demo__showcase-box--rotate",children:"Rotate"}),(0,i.jsx)("span",{children:"旋转"})]})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`@keyframes rotate {
  from {
    transform: rotate(0deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}

.element {
  animation: rotate 1s ease-in-out;
}`}),(0,i.jsx)("h3",{children:"5. 弹跳 (Bounce)"}),(0,i.jsx)("div",{className:"animation-demo__showcase",children:(0,i.jsxs)("div",{className:"animation-demo__showcase-item",children:[(0,i.jsx)("div",{className:"animation-demo__showcase-box animation-demo__showcase-box--bounce",children:"Bounce"}),(0,i.jsx)("span",{children:"弹跳"})]})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.element {
  animation: bounce 2s ease-in-out;
}`}),(0,i.jsx)("h3",{children:"6. 抖动 (Shake)"}),(0,i.jsx)("div",{className:"animation-demo__showcase",children:(0,i.jsxs)("div",{className:"animation-demo__showcase-item",children:[(0,i.jsx)("div",{className:"animation-demo__showcase-box animation-demo__showcase-box--shake",children:"Shake"}),(0,i.jsx)("span",{children:"抖动"})]})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.element {
  animation: shake 0.5s ease-in-out;
}`}),(0,i.jsx)("h3",{children:"7. 翻转 (Flip)"}),(0,i.jsx)("div",{className:"animation-demo__showcase",children:(0,i.jsxs)("div",{className:"animation-demo__showcase-item",children:[(0,i.jsx)("div",{className:"animation-demo__showcase-box animation-demo__showcase-box--flip",children:"Flip"}),(0,i.jsx)("span",{children:"翻转"})]})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`@keyframes flip {
  from {
    transform: perspective(400px) rotateY(0deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateY(360deg);
    opacity: 1;
  }
}

.element {
  animation: flip 1s ease-in-out;
  transform-style: preserve-3d;
}`}),(0,i.jsx)("h3",{children:"8. 摆动 (Swing)"}),(0,i.jsx)("div",{className:"animation-demo__showcase",children:(0,i.jsxs)("div",{className:"animation-demo__showcase-item",children:[(0,i.jsx)("div",{className:"animation-demo__showcase-box animation-demo__showcase-box--swing",children:"Swing"}),(0,i.jsx)("span",{children:"摆动"})]})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`@keyframes swing {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}

.element {
  animation: swing 1s ease-in-out;
  transform-origin: top center;
}`})]})})},{key:"4",label:"实际用例",children:(0,i.jsx)("div",{className:"css-animation-example__section",children:(0,i.jsxs)(r.A,{title:"常见动画应用场景",children:[(0,i.jsx)("h3",{children:"1. 加载动画 (Loading)"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"blue",children:"最常见的用例"}),"用于显示数据加载或处理过程"]}),(0,i.jsxs)("div",{className:"animation-usecase__demo",children:[(0,i.jsx)("div",{className:"animation-usecase__loading-spinner"}),(0,i.jsxs)("div",{className:"animation-usecase__loading-dots",children:[(0,i.jsx)("span",{}),(0,i.jsx)("span",{}),(0,i.jsx)("span",{})]}),(0,i.jsx)("div",{className:"animation-usecase__loading-pulse"})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 旋转 Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top-color: #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 跳动点 */
@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.dots span {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #1890ff;
  border-radius: 50%;
  animation: dotBounce 1.4s infinite;
}

.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

/* 脉冲 */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}`}),(0,i.jsx)("h3",{children:"2. 按钮悬停效果"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"提升交互体验的微动效"}),(0,i.jsxs)("div",{className:"animation-usecase__demo",children:[(0,i.jsx)("button",{className:"animation-usecase__button animation-usecase__button--bounce",children:"Bounce"}),(0,i.jsx)("button",{className:"animation-usecase__button animation-usecase__button--wobble",children:"Wobble"}),(0,i.jsx)("button",{className:"animation-usecase__button animation-usecase__button--pulse",children:"Pulse"}),(0,i.jsx)("button",{className:"animation-usecase__button animation-usecase__button--glow",children:"Glow"})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* Bounce 按钮 */
@keyframes buttonBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.button:hover {
  animation: buttonBounce 0.5s ease;
}

/* Wobble 按钮 */
@keyframes wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.button:hover {
  animation: wobble 0.5s ease;
}

/* 发光效果 */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px #1890ff; }
  50% { box-shadow: 0 0 20px #1890ff; }
}

.button:hover {
  animation: glow 1s ease-in-out infinite;
}`}),(0,i.jsx)("h3",{children:"3. 卡片入场动画"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"用于列表项或卡片的渐进式显示"}),(0,i.jsxs)("div",{className:"animation-usecase__cards",children:[(0,i.jsx)("div",{className:"animation-usecase__card",style:{animationDelay:"0s"},children:"Card 1"}),(0,i.jsx)("div",{className:"animation-usecase__card",style:{animationDelay:"0.1s"},children:"Card 2"}),(0,i.jsx)("div",{className:"animation-usecase__card",style:{animationDelay:"0.2s"},children:"Card 3"}),(0,i.jsx)("div",{className:"animation-usecase__card",style:{animationDelay:"0.3s"},children:"Card 4"})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 卡片淡入上移 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.6s ease-out both;
}

/* 使用延迟创建级联效果 */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
.card:nth-child(4) { animation-delay: 0.3s; }`}),(0,i.jsx)("h3",{children:"4. 通知提示动画"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"Toast 或 Alert 组件的入场/离场动画"}),(0,i.jsx)("div",{className:"animation-usecase__demo",children:(0,i.jsx)("div",{className:"animation-usecase__notification animation-usecase__notification--slide",children:(0,i.jsx)("span",{children:"✓ 操作成功！"})})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 从右侧滑入 */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 淡出并缩小 */
@keyframes fadeOutScale {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.8);
    opacity: 0;
  }
}

.notification {
  animation: slideInRight 0.3s ease-out;
}

.notification.closing {
  animation: fadeOutScale 0.3s ease-out forwards;
}`}),(0,i.jsx)("h3",{children:"5. 进度条动画"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"显示任务进度或加载状态"}),(0,i.jsxs)("div",{className:"animation-usecase__demo",children:[(0,i.jsx)("div",{className:"animation-usecase__progress-bar",children:(0,i.jsx)("div",{className:"animation-usecase__progress-fill"})}),(0,i.jsx)("div",{className:"animation-usecase__progress-stripe",children:(0,i.jsx)("div",{className:"animation-usecase__progress-fill-stripe"})})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 进度条填充动画 */
@keyframes progressFill {
  from { width: 0%; }
  to { width: 75%; }
}

.progress-fill {
  animation: progressFill 2s ease-out forwards;
}

/* 斑马纹滚动效果 */
@keyframes stripeScroll {
  from { background-position: 0 0; }
  to { background-position: 40px 0; }
}

.progress-stripe {
  background-image: linear-gradient(
    45deg,
    rgba(255,255,255,0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255,255,255,0.2) 50%,
    rgba(255,255,255,0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  animation: stripeScroll 1s linear infinite;
}`}),(0,i.jsx)("h3",{children:"6. 骨架屏动画"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"内容加载时的占位动画"}),(0,i.jsxs)("div",{className:"animation-usecase__skeleton",children:[(0,i.jsx)("div",{className:"animation-usecase__skeleton-line"}),(0,i.jsx)("div",{className:"animation-usecase__skeleton-line"}),(0,i.jsx)("div",{className:"animation-usecase__skeleton-line",style:{width:"60%"}})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 闪烁效果 */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}`}),(0,i.jsx)("h3",{children:"7. 无限滚动提示"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"引导用户向下滚动的动画提示"}),(0,i.jsx)("div",{className:"animation-usecase__demo",children:(0,i.jsx)("div",{className:"animation-usecase__scroll-indicator",children:(0,i.jsx)("div",{className:"animation-usecase__scroll-arrow",children:"↓"})})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 上下跳动箭头 */
@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(10px);
    opacity: 1;
  }
}

.scroll-arrow {
  animation: scrollBounce 2s ease-in-out infinite;
}`}),(0,i.jsx)("h3",{children:"8. 数字滚动动画"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"数字递增的视觉效果"}),(0,i.jsx)("div",{className:"animation-usecase__demo",children:(0,i.jsx)("div",{className:"animation-usecase__counter",children:(0,i.jsx)("span",{className:"animation-usecase__counter-number",children:"1234"})})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 数字缩放脉冲 */
@keyframes counterPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.counter {
  animation: counterPulse 0.5s ease-out;
}

/* JavaScript 配合实现数字递增 */
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);

  function update() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  update();
}`}),(0,i.jsx)("h3",{children:"9. 心跳效果"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"用于点赞、收藏等交互反馈"}),(0,i.jsx)("div",{className:"animation-usecase__demo",children:(0,i.jsx)("div",{className:"animation-usecase__heart",children:"❤️"})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 心跳动画 */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  10%, 30% { transform: scale(0.9); }
  20%, 40% { transform: scale(1.1); }
}

.heart {
  animation: heartbeat 1s ease-in-out infinite;
}

/* 点击时的缩放效果 */
@keyframes heartClick {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.heart.clicked {
  animation: heartClick 0.3s ease-out;
}`}),(0,i.jsx)("h3",{children:"10. 模态框动画"}),(0,i.jsx)("p",{className:"css-animation-example__desc",children:"弹窗的打开和关闭效果"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 模态框淡入缩放 */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 背景遮罩淡入 */
@keyframes backdropIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  animation: modalIn 0.3s ease-out;
}

.backdrop {
  animation: backdropIn 0.3s ease-out;
}

/* 关闭动画 */
@keyframes modalOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.7);
  }
}

.modal.closing {
  animation: modalOut 0.3s ease-out forwards;
}`}),(0,i.jsxs)("div",{className:"css-animation-example__info",style:{marginTop:24},children:[(0,i.jsx)("h3",{children:"\uD83D\uDCA1 实用建议"}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"保持简洁："}),"动画时长通常在 200-500ms 之间"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"有意义："}),"动画应该帮助用户理解交互，而不是分散注意力"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"一致性："}),"在整个应用中使用一致的动画风格"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"可访问性："}),"提供禁用动画的选项（prefers-reduced-motion）"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"性能优先："}),"优先使用 transform 和 opacity"]})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 尊重用户的动画偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`})]})]})})},{key:"5",label:"性能优化",children:(0,i.jsx)("div",{className:"css-animation-example__section",children:(0,i.jsxs)(r.A,{title:"动画性能优化建议",children:[(0,i.jsxs)("div",{className:"css-animation-example__info",children:[(0,i.jsx)("h3",{children:"✅ 推荐的动画属性"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"green",children:"GPU 加速"}),"这些属性可以触发 GPU 硬件加速，性能最佳"]}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"transform"})," - 变换（位移、缩放、旋转）"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"opacity"})," - 透明度"]})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 推荐：使用 transform */
@keyframes slideIn {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}

/* 推荐：使用 opacity */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`})]}),(0,i.jsxs)("div",{className:"css-animation-example__info",style:{marginTop:24,background:"#fff2e8",borderLeftColor:"#fa8c16"},children:[(0,i.jsx)("h3",{children:"❌ 避免的动画属性"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"orange",children:"触发重排/重绘"}),"这些属性会触发布局重排或重绘，性能较差"]}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"width"}),", ",(0,i.jsx)("code",{children:"height"})," - 触发重排"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"left"}),", ",(0,i.jsx)("code",{children:"top"}),", ",(0,i.jsx)("code",{children:"margin"})," - 触发重排"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"padding"}),", ",(0,i.jsx)("code",{children:"border"})," - 触发重排"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"background"}),", ",(0,i.jsx)("code",{children:"color"})," - 触发重绘"]})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 不推荐：使用 left/top */
@keyframes badSlide {
  from { left: -100px; }
  to { left: 0; }
}

/* 推荐：使用 transform */
@keyframes goodSlide {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}`})]}),(0,i.jsx)("h3",{style:{marginTop:24},children:"优化技巧"}),(0,i.jsx)("h4",{children:"1. 使用 will-change 提示浏览器"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 提前告知浏览器将要变化的属性 */
.element {
  will-change: transform, opacity;
}

/* 动画结束后移除 */
.element.animation-ended {
  will-change: auto;
}

/* 注意：不要过度使用，会消耗资源 */`}),(0,i.jsx)("h4",{children:"2. 使用 transform3d 强制开启硬件加速"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 使用 3D transform 开启 GPU 加速 */
.element {
  transform: translate3d(0, 0, 0);
}

/* 或使用 translateZ */
.element {
  transform: translateZ(0);
}`}),(0,i.jsx)("h4",{children:"3. 减少动画元素数量"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 不好：同时动画多个属性 */
@keyframes bad {
  from {
    width: 100px;
    height: 100px;
    margin-left: 0;
    background: red;
  }
  to {
    width: 200px;
    height: 200px;
    margin-left: 100px;
    background: blue;
  }
}

/* 好：只动画 transform 和 opacity */
@keyframes good {
  from {
    transform: scale(1) translateX(0);
    opacity: 0;
  }
  to {
    transform: scale(2) translateX(100px);
    opacity: 1;
  }
}`}),(0,i.jsx)("h4",{children:"4. 使用 animation-fill-mode 避免闪烁"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 保持动画结束状态 */
.element {
  animation: fadeIn 1s ease-out forwards;
}

/* 应用动画开始前的样式 */
.element {
  animation: fadeIn 1s ease-out backwards;
}

/* 两者都应用 */
.element {
  animation: fadeIn 1s ease-out both;
}`}),(0,i.jsx)("h4",{children:"5. 控制动画复杂度"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 不好：过多的关键帧 */
@keyframes complex {
  0% { transform: translateX(0); }
  10% { transform: translateX(10px); }
  20% { transform: translateX(20px); }
  /* ...100 个关键帧... */
  100% { transform: translateX(1000px); }
}

/* 好：简化关键帧，让浏览器插值 */
@keyframes simple {
  from { transform: translateX(0); }
  to { transform: translateX(1000px); }
}`}),(0,i.jsx)("h4",{children:"6. 使用 requestAnimationFrame"}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* JavaScript 动画优化 */
function animate() {
  // 动画逻辑
  element.style.transform = \`translateX(\${x}px)\`;

  // 使用 rAF 而不是 setTimeout
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);`}),(0,i.jsxs)("div",{className:"css-animation-example__info",style:{marginTop:24,background:"#f0f5ff",borderLeftColor:"#1890ff"},children:[(0,i.jsx)("h3",{children:"\uD83D\uDCA1 性能检测"}),(0,i.jsx)("p",{children:"使用 Chrome DevTools 的 Performance 面板来分析动画性能："}),(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:"打开 DevTools → Performance"}),(0,i.jsx)("li",{children:"录制动画执行过程"}),(0,i.jsx)("li",{children:"查看 FPS、CPU 使用率"}),(0,i.jsx)("li",{children:"检查是否有掉帧（Frames 低于 60fps）"}),(0,i.jsx)("li",{children:"查看是否触发了 Layout 和 Paint"})]})]})]})})},{key:"6",label:"高级技巧",children:(0,i.jsx)("div",{className:"css-animation-example__section",children:(0,i.jsxs)(r.A,{title:"CSS Animation 高级技巧",children:[(0,i.jsx)("h3",{children:"1. 使用 CSS Variables 动态控制动画"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"purple",children:"动态控制"}),"通过 CSS 自定义属性实现运行时动画参数调整"]}),(0,i.jsx)("div",{className:"animation-advanced__demo",children:(0,i.jsx)("div",{className:"animation-advanced__variable-box"})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* CSS: 使用变量定义动画参数 */
:root {
  --animation-duration: 2s;
  --animation-delay: 0s;
  --animation-scale: 1.2;
}

@keyframes dynamicScale {
  from { transform: scale(1); }
  to { transform: scale(var(--animation-scale)); }
}

.element {
  animation: dynamicScale var(--animation-duration) ease-in-out infinite alternate;
  animation-delay: var(--animation-delay);
}

/* JavaScript: 动态修改变量 */
element.style.setProperty('--animation-duration', '1s');
element.style.setProperty('--animation-scale', '1.5');`}),(0,i.jsx)("h3",{children:"2. 帧动画 - steps() 函数"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"cyan",children:"逐帧播放"}),"实现雪碧图动画或打字机效果"]}),(0,i.jsxs)("div",{className:"animation-advanced__demo",children:[(0,i.jsx)("div",{className:"animation-advanced__sprite-animation"}),(0,i.jsx)("div",{className:"animation-advanced__typing",children:"Hello, World!"})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 雪碧图动画 - 8帧 */
.sprite {
  width: 100px;
  height: 100px;
  background: url('sprite.png') 0 0;
  animation: sprite-walk 0.8s steps(8) infinite;
}

@keyframes sprite-walk {
  to { background-position: -800px 0; }
}

/* 打字机效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

.typewriter {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  animation:
    typing 3s steps(13) forwards,
    blink 0.5s step-end infinite;
}`}),(0,i.jsx)("h3",{children:"3. 3D 变换动画"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"orange",children:"立体效果"}),"创建翻转、旋转立方体等3D动画"]}),(0,i.jsxs)("div",{className:"animation-advanced__demo",children:[(0,i.jsx)("div",{className:"animation-advanced__flip-card",children:(0,i.jsxs)("div",{className:"animation-advanced__flip-card-inner",children:[(0,i.jsx)("div",{className:"animation-advanced__flip-card-front",children:"前面"}),(0,i.jsx)("div",{className:"animation-advanced__flip-card-back",children:"背面"})]})}),(0,i.jsxs)("div",{className:"animation-advanced__cube",children:[(0,i.jsx)("div",{className:"animation-advanced__cube-face animation-advanced__cube-face--front",children:"1"}),(0,i.jsx)("div",{className:"animation-advanced__cube-face animation-advanced__cube-face--back",children:"2"}),(0,i.jsx)("div",{className:"animation-advanced__cube-face animation-advanced__cube-face--right",children:"3"}),(0,i.jsx)("div",{className:"animation-advanced__cube-face animation-advanced__cube-face--left",children:"4"}),(0,i.jsx)("div",{className:"animation-advanced__cube-face animation-advanced__cube-face--top",children:"5"}),(0,i.jsx)("div",{className:"animation-advanced__cube-face animation-advanced__cube-face--bottom",children:"6"})]})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 3D 翻转卡片 */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 200px;
  height: 200px;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

/* 旋转立方体 */
@keyframes rotateCube {
  0% { transform: rotateX(0) rotateY(0); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

.cube {
  width: 100px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 10s linear infinite;
}

.cube-face {
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0.9;
}

.cube-face--front  { transform: translateZ(50px); }
.cube-face--back   { transform: rotateY(180deg) translateZ(50px); }
.cube-face--right  { transform: rotateY(90deg) translateZ(50px); }
.cube-face--left   { transform: rotateY(-90deg) translateZ(50px); }
.cube-face--top    { transform: rotateX(90deg) translateZ(50px); }
.cube-face--bottom { transform: rotateX(-90deg) translateZ(50px); }`}),(0,i.jsx)("h3",{children:"4. 动画组合与链式动画"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"blue",children:"复杂序列"}),"多个动画同时或依次执行"]}),(0,i.jsx)("div",{className:"animation-advanced__demo",children:(0,i.jsx)("div",{className:"animation-advanced__chain-box"})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 同时执行多个动画 */
.element {
  animation:
    fadeIn 1s ease-out,
    slideUp 1s ease-out,
    rotate 1s ease-out;
}

/* 链式动画 - 使用延迟 */
.element {
  animation:
    fadeIn 0.5s ease-out 0s,
    scaleUp 0.5s ease-out 0.5s,
    rotate 0.5s ease-out 1s;
}

/* 复杂序列动画 */
@keyframes complexSequence {
  0% {
    transform: translateX(0) scale(1);
    opacity: 0;
  }
  25% {
    transform: translateX(100px) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(100px) scale(1.5);
    opacity: 1;
  }
  75% {
    transform: translateX(0) scale(1.5);
    opacity: 1;
  }
  100% {
    transform: translateX(0) scale(1) rotate(360deg);
    opacity: 1;
  }
}

.element {
  animation: complexSequence 4s ease-in-out infinite;
}`}),(0,i.jsx)("h3",{children:"5. 自定义 cubic-bezier 缓动函数"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"green",children:"精确控制"}),"创建独特的动画速度曲线"]}),(0,i.jsxs)("div",{className:"animation-advanced__bezier-demo",children:[(0,i.jsx)("div",{className:"animation-advanced__bezier-box animation-advanced__bezier-box--1",children:"弹性"}),(0,i.jsx)("div",{className:"animation-advanced__bezier-box animation-advanced__bezier-box--2",children:"回弹"}),(0,i.jsx)("div",{className:"animation-advanced__bezier-box animation-advanced__bezier-box--3",children:"加速"})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 弹性效果 */
.elastic {
  animation: moveRight 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 回弹效果 */
.bounce-back {
  animation: moveRight 2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 快速加速 */
.fast-start {
  animation: moveRight 2s cubic-bezier(0.95, 0.05, 0.795, 0.035);
}

/* 自定义缓动函数生成器 */
/* 可访问 https://cubic-bezier.com 调试 */`}),(0,i.jsx)("h3",{children:"6. SVG 路径动画"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"red",children:"矢量动画"}),"实现描边动画和变形效果"]}),(0,i.jsx)("div",{className:"animation-advanced__demo",children:(0,i.jsx)("svg",{className:"animation-advanced__svg",viewBox:"0 0 100 100",width:"150",height:"150",children:(0,i.jsx)("circle",{className:"animation-advanced__svg-circle",cx:"50",cy:"50",r:"45",fill:"none",stroke:"#1890ff",strokeWidth:"3"})})}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* SVG 描边动画 */
.svg-circle {
  stroke-dasharray: 283; /* 周长: 2πr */
  stroke-dashoffset: 283;
  animation: drawCircle 2s ease-out forwards;
}

@keyframes drawCircle {
  to {
    stroke-dashoffset: 0;
  }
}

/* SVG 路径变形 */
@keyframes morphPath {
  0% {
    d: path("M10,10 L90,10 L90,90 L10,90 Z");
  }
  50% {
    d: path("M50,10 L90,50 L50,90 L10,50 Z");
  }
  100% {
    d: path("M10,10 L90,10 L90,90 L10,90 Z");
  }
}`}),(0,i.jsx)("h3",{children:"7. 视差滚动动画"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"purple",children:"滚动触发"}),"基于滚动位置的动画效果"]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 使用 Intersection Observer API */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

/* CSS */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s, transform 0.6s;
}

.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* CSS Scroll-driven Animations (实验性) */
@scroll-timeline section-timeline {
  source: selector(#section);
}

.parallax-element {
  animation: parallax linear;
  animation-timeline: section-timeline;
}

@keyframes parallax {
  to { transform: translateY(-100px); }
}`}),(0,i.jsx)("h3",{children:"8. 动画暂停和恢复"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"orange",children:"交互控制"}),"通过 JavaScript 控制动画状态"]}),(0,i.jsxs)("div",{className:"animation-advanced__demo",children:[(0,i.jsx)("div",{className:"animation-advanced__pause-box"}),(0,i.jsx)(p.Ay,{size:"small",onClick:()=>{let e=document.querySelector(".animation-advanced__pause-box");if(e){let a=e.style.animationPlayState;e.style.animationPlayState="paused"===a?"running":"paused"}},children:"暂停/继续"})]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* CSS */
.animated {
  animation: rotate 3s linear infinite;
  animation-play-state: running;
}

.animated.paused {
  animation-play-state: paused;
}

/* JavaScript 控制 */
const element = document.querySelector('.animated');

// 暂停
element.style.animationPlayState = 'paused';

// 继续
element.style.animationPlayState = 'running';

// 切换
element.style.animationPlayState =
  element.style.animationPlayState === 'paused'
    ? 'running'
    : 'paused';

// 监听动画事件
element.addEventListener('animationstart', () => {
  console.log('动画开始');
});

element.addEventListener('animationiteration', () => {
  console.log('动画重复');
});

element.addEventListener('animationend', () => {
  console.log('动画结束');
});`}),(0,i.jsx)("h3",{children:"9. 性能监控与调试"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"red",children:"性能分析"}),"使用开发工具监控动画性能"]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 方法1: Performance API */
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'measure') {
      console.log(\`\${entry.name}: \${entry.duration}ms\`);
    }
  }
});

perfObserver.observe({ entryTypes: ['measure'] });

// 测量动画性能
performance.mark('animation-start');
element.addEventListener('animationend', () => {
  performance.mark('animation-end');
  performance.measure(
    'animation-duration',
    'animation-start',
    'animation-end'
  );
});

/* 方法2: FPS 监控 */
let lastTime = performance.now();
let frames = 0;

function measureFPS() {
  frames++;
  const currentTime = performance.now();

  if (currentTime >= lastTime + 1000) {
    const fps = Math.round((frames * 1000) / (currentTime - lastTime));
    console.log(\`FPS: \${fps}\`);
    frames = 0;
    lastTime = currentTime;
  }

  requestAnimationFrame(measureFPS);
}

measureFPS();

/* Chrome DevTools 技巧 */
// 1. Performance > 勾选 "Screenshots"
// 2. Rendering > Paint flashing (显示重绘区域)
// 3. Rendering > Frame Rendering Stats (显示 FPS)
// 4. Layers 面板查看合成层`}),(0,i.jsx)("h3",{children:"10. 响应式动画"}),(0,i.jsxs)("p",{className:"css-animation-example__desc",children:[(0,i.jsx)(o.A,{color:"blue",children:"自适应"}),"根据设备和用户偏好调整动画"]}),(0,i.jsx)("div",{className:"css-animation-example__code",children:`/* 根据屏幕尺寸调整动画 */
@media (max-width: 768px) {
  .element {
    animation-duration: 0.3s; /* 移动端动画更快 */
  }
}

@media (min-width: 1920px) {
  .element {
    animation-duration: 1s; /* 大屏动画更慢 */
  }
}

/* 尊重用户的动画偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 根据性能调整 */
@media (prefers-reduced-motion: no-preference) and (min-resolution: 2dppx) {
  /* 高分辨率设备可以使用更复杂的动画 */
  .element {
    animation: complexAnimation 2s;
  }
}

/* 暗黑模式下的动画调整 */
@media (prefers-color-scheme: dark) {
  .glow-animation {
    --glow-color: #40a9ff;
  }
}

/* JavaScript 检测性能 */
const isHighPerformance =
  navigator.hardwareConcurrency > 4 &&
  window.devicePixelRatio <= 2;

if (isHighPerformance) {
  document.body.classList.add('high-performance');
}`}),(0,i.jsxs)("div",{className:"css-animation-example__info",style:{marginTop:24},children:[(0,i.jsx)("h3",{children:"\uD83D\uDE80 高级技巧总结"}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"CSS Variables:"})," 实现动态可控的动画参数"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"steps():"})," 创建逐帧动画和雪碧图效果"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"3D Transform:"})," 利用透视和立体变换创造空间感"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"动画组合:"})," 多个动画协同工作创造复杂效果"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"自定义缓动:"})," 使用 cubic-bezier 精确控制速度曲线"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"SVG 动画:"})," 矢量图形的描边和变形动画"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"滚动动画:"})," 基于视口位置触发动画"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"性能监控:"})," 实时追踪动画性能指标"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"响应式设计:"})," 适配不同设备和用户偏好"]})]})]})]})})}]})]})}}}]);