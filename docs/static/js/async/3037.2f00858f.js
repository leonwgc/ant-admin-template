"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["3037"],{15398(e,t,n){n.d(t,{A:()=>p});var r,s=n(71500),a=n(46942),i=n.n(a),l=n(72422),o=n(2445);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var c=["className","alignment","size"];function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach(function(t){var r,s,a;r=e,s=t,a=n[t],(s=function(e){var t=function(e,t){if("object"!=d(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=d(r))return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==d(t)?t:String(t)}(s))in r?Object.defineProperty(r,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[s]=a}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}let p=function(e){var t=e.className,n=e.alignment,a=e.size,d=function(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}(e,c),h=(0,l.Ay)()(function(e){var t,n,s=e.css,a=e.prefixCls,i=e.componentsToken.Divider;return s(r||(t=["\n            &.","-divider {\n                &.","-divider-horizontal {\n                    border-block-start-color: ",";\n                }\n\n                &.","-divider-vertical {\n                    border-inline-start-color: ",";\n                }\n\n                &.","-divider-large {\n                    &.","-divider-horizontal {\n                        border-block-start-width: 2px;\n                    }\n\n                    &.","-divider-vertical {\n                        border-inline-start-width: 2px;\n                    }\n                }\n            }\n        "],n||(n=t.slice(0)),r=Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(n)}}))),a,a,i["divider-color-border"],a,i["divider-color-border"],a,a,a)}),p=h.prefixCls,j=h.styles;return(0,o.Y)(s.A,m(m({},d),{},{className:i()("".concat(p,"-divider-").concat(void 0===a?"medium":a),j,t),plain:!0,type:void 0===n?"horizontal":n}))}},70323(e,t,n){n.r(t)},71500(e,t,n){n.d(t,{A:()=>x});var r=n(96540),s=n(46942),a=n.n(s),i=n(62279),l=n(829),o=n(53716),d=n(25905),c=n(37358),h=n(10224);let m=(0,c.OF)("Divider",e=>{let t=(0,h.mergeToken)(e,{dividerHorizontalWithTextGutterMargin:e.margin,sizePaddingEdgeHorizontal:0});return[(e=>{let{componentCls:t,sizePaddingEdgeHorizontal:n,colorSplit:r,lineWidth:s,textPaddingInline:a,orientationMargin:i,verticalMarginInline:l}=e;return{[t]:Object.assign(Object.assign({},(0,d.dF)(e)),{borderBlockStart:`${(0,o.unit)(s)} solid ${r}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:l,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${(0,o.unit)(s)} solid ${r}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${(0,o.unit)(e.marginLG)} 0`},[`&-horizontal${t}-with-text`]:{display:"flex",alignItems:"center",margin:`${(0,o.unit)(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${r}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${(0,o.unit)(s)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${t}-with-text-start`]:{"&::before":{width:`calc(${i} * 100%)`},"&::after":{width:`calc(100% - ${i} * 100%)`}},[`&-horizontal${t}-with-text-end`]:{"&::before":{width:`calc(100% - ${i} * 100%)`},"&::after":{width:`calc(${i} * 100%)`}},[`${t}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:a},"&-dashed":{background:"none",borderColor:r,borderStyle:"dashed",borderWidth:`${(0,o.unit)(s)} 0 0`},[`&-horizontal${t}-with-text${t}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${t}-dashed`]:{borderInlineStartWidth:s,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:r,borderStyle:"dotted",borderWidth:`${(0,o.unit)(s)} 0 0`},[`&-horizontal${t}-with-text${t}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${t}-dotted`]:{borderInlineStartWidth:s,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${t}-with-text`]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},[`&-horizontal${t}-with-text-start${t}-no-default-orientation-margin-start`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${t}-inner-text`]:{paddingInlineStart:n}},[`&-horizontal${t}-with-text-end${t}-no-default-orientation-margin-end`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${t}-inner-text`]:{paddingInlineEnd:n}}})}})(t),(e=>{let{componentCls:t}=e;return{[t]:{"&-horizontal":{[`&${t}`]:{"&-sm":{marginBlock:e.marginXS},"&-md":{marginBlock:e.margin}}}}}})(t)]},e=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:e.marginXS}),{unitless:{orientationMargin:!0}});var p=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var s=0,r=Object.getOwnPropertySymbols(e);s<r.length;s++)0>t.indexOf(r[s])&&Object.prototype.propertyIsEnumerable.call(e,r[s])&&(n[r[s]]=e[r[s]]);return n};let j={small:"sm",middle:"md"},x=e=>{let{getPrefixCls:t,direction:n,className:s,style:o}=(0,i.TP)("divider"),{prefixCls:d,type:c="horizontal",orientation:h="center",orientationMargin:x,className:u,rootClassName:g,children:b,dashed:v,variant:f="solid",plain:w,style:k,size:y}=e,M=p(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style","size"]),$=t("divider",d),[O,_,W]=m($),S=j[(0,l.A)(y)],A=!!b,C=r.useMemo(()=>"left"===h?"rtl"===n?"end":"start":"right"===h?"rtl"===n?"start":"end":h,[n,h]),N="start"===C&&null!=x,D="end"===C&&null!=x,z=a()($,s,_,W,`${$}-${c}`,{[`${$}-with-text`]:A,[`${$}-with-text-${C}`]:A,[`${$}-dashed`]:!!v,[`${$}-${f}`]:"solid"!==f,[`${$}-plain`]:!!w,[`${$}-rtl`]:"rtl"===n,[`${$}-no-default-orientation-margin-start`]:N,[`${$}-no-default-orientation-margin-end`]:D,[`${$}-${S}`]:!!S},u,g),T=r.useMemo(()=>"number"==typeof x?x:/^\d+$/.test(x)?Number(x):x,[x]);return O(r.createElement("div",Object.assign({className:z,style:Object.assign(Object.assign({},o),k)},M,{role:"separator"}),b&&"vertical"!==c&&r.createElement("span",{className:`${$}-inner-text`,style:{marginInlineStart:N?T:void 0,marginInlineEnd:D?T:void 0}},b)))}},71036(e,t,n){n.r(t),n.d(t,{default:()=>h});var r=n(74848),s=n(96540),a=n(16629),i=n(40244),l=n(99373),o=n(36813),d=n(58607),c=n(15398);n(70323);let h=()=>{let[e,t]=(0,s.useState)([]),[n,h]=(0,s.useState)({hits:0,misses:0});(0,s.useRef)(new WeakMap);let m=(0,s.useRef)(new WeakMap),p=e=>{t(t=>[...t,`[${new Date().toLocaleTimeString()}] ${e}`])},j=()=>{t([])},x=(0,s.useRef)([]),u=(0,s.useRef)(new WeakMap),g=e=>`Computed-${Math.random().toString(36).substr(2,9)}`;return(0,r.jsxs)("div",{className:"weakmap-demo",children:[(0,r.jsx)("h2",{className:"weakmap-demo__title",children:"JavaScript WeakMap 完全指南"}),(0,r.jsxs)(a.A,{title:"WeakMap 概述",children:[(0,r.jsx)(i.A,{message:"核心特性",description:(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{children:"WeakMap 是一种特殊的 Map，其键必须是对象，且对键的引用是弱引用。"}),(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"弱引用："}),"不会阻止垃圾回收器回收键对象"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"键类型："}),"只能使用对象作为键（不能用原始类型）"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"不可枚举："}),"没有 keys()、values()、entries() 等方法"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"无 size 属性："}),"无法获取键值对数量"]})]})]}),type:"info",showIcon:!0}),(0,r.jsx)("div",{className:"weakmap-demo__code",children:`// WeakMap 基本语法
const wm = new WeakMap();

// 只能使用对象作为键
const obj = { id: 1 };
wm.set(obj, 'some value');

// 基本操作
wm.get(obj);        // 'some value'
wm.has(obj);        // true
wm.delete(obj);     // true

// ❌ 不能使用原始类型作为键
wm.set('string', 'value');  // TypeError
wm.set(123, 'value');       // TypeError

// ❌ 不可枚举
wm.keys();     // undefined
wm.values();   // undefined
wm.entries();  // undefined
wm.forEach();  // undefined`})]}),(0,r.jsxs)(a.A,{title:"WeakMap vs Map 对比",style:{marginTop:24},children:[(0,r.jsx)("div",{className:"weakmap-demo__comparison",children:(0,r.jsx)("div",{className:"weakmap-demo__comparison-table",children:(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"特性"}),(0,r.jsx)("th",{children:(0,r.jsx)(l.A,{color:"blue",children:"Map"})}),(0,r.jsx)("th",{children:(0,r.jsx)(l.A,{color:"purple",children:"WeakMap"})})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"键类型"}),(0,r.jsx)("td",{children:"任意类型"}),(0,r.jsx)("td",{children:"只能是对象"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"引用类型"}),(0,r.jsx)("td",{children:"强引用（阻止 GC）"}),(0,r.jsx)("td",{children:"弱引用（不阻止 GC）"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"可枚举"}),(0,r.jsx)("td",{children:"✅ 可以遍历"}),(0,r.jsx)("td",{children:"❌ 不可遍历"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"size 属性"}),(0,r.jsx)("td",{children:"✅ 有"}),(0,r.jsx)("td",{children:"❌ 无"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"keys/values/entries"}),(0,r.jsx)("td",{children:"✅ 有"}),(0,r.jsx)("td",{children:"❌ 无"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"clear 方法"}),(0,r.jsx)("td",{children:"✅ 有"}),(0,r.jsx)("td",{children:"❌ 无"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"内存管理"}),(0,r.jsx)("td",{children:"手动清理"}),(0,r.jsx)("td",{children:"自动清理（GC）"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"使用场景"}),(0,r.jsx)("td",{children:"通用键值对存储"}),(0,r.jsx)("td",{children:"对象元数据、私有数据"})]})]})]})})}),(0,r.jsx)("div",{className:"weakmap-demo__code",style:{marginTop:16},children:`// Map vs WeakMap 内存管理对比

// Map: 强引用，需手动清理
const map = new Map();
let obj1 = { name: 'test' };
map.set(obj1, 'data');
obj1 = null;  // ❌ Map 仍然持有对象引用，无法被 GC

// WeakMap: 弱引用，自动清理
const wm = new WeakMap();
let obj2 = { name: 'test' };
wm.set(obj2, 'data');
obj2 = null;  // ✅ 对象可以被 GC，WeakMap 自动清理`})]}),(0,r.jsxs)(a.A,{title:"交互式演示",style:{marginTop:24},children:[(0,r.jsxs)(o.A,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("h3",{children:[(0,r.jsx)(l.A,{color:"green",children:"Demo 1"})," 基本操作"]}),(0,r.jsx)("p",{className:"weakmap-demo__desc",children:"演示 WeakMap 的基本 API：set、get、has、delete"}),(0,r.jsx)(d.Ay,{type:"primary",onClick:()=>{j();let e=new WeakMap,t={id:1,name:"Object 1"},n={id:2,name:"Object 2"};e.set(t,"Data for object 1"),e.set(n,"Data for object 2"),p("✅ Set data for obj1 and obj2"),p(`📖 Get obj1: ${e.get(t)}`),p(`📖 Get obj2: ${e.get(n)}`),p(`🔍 Has obj1: ${e.has(t)}`),e.delete(t),p("\uD83D\uDDD1️ Deleted obj1"),p(`🔍 Has obj1 after delete: ${e.has(t)}`)},children:"运行演示"})]}),(0,r.jsx)(c.A,{}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("h3",{children:[(0,r.jsx)(l.A,{color:"orange",children:"Demo 2"})," 弱引用特性"]}),(0,r.jsx)("p",{className:"weakmap-demo__desc",children:"演示 WeakMap 的弱引用特性：当对象被设置为 null 时，WeakMap 不会阻止垃圾回收"}),(0,r.jsx)(d.Ay,{type:"primary",onClick:()=>{j(),p("\uD83E\uDDEA Testing weak reference...");let e=new WeakMap,t={name:"Temporary Object"};e.set(t,"This data will be GC when tempObj is null"),p("✅ Set data for tempObj"),p(`📖 Has tempObj: ${e.has(t)}`),p("⚠️ Setting tempObj to null..."),t=null,p("\uD83D\uDCA1 tempObj is now null, the WeakMap entry will be garbage collected"),p("\uD83D\uDCA1 WeakMap does not prevent garbage collection!")},children:"运行演示"})]}),(0,r.jsx)(c.A,{}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("h3",{children:[(0,r.jsx)(l.A,{color:"purple",children:"Demo 3"})," 私有数据存储"]}),(0,r.jsx)("p",{className:"weakmap-demo__desc",children:"使用 WeakMap 实现真正的私有数据，外部无法访问"}),(0,r.jsx)(d.Ay,{type:"primary",onClick:()=>{j(),p("\uD83D\uDD12 Demonstrating private data storage pattern...");let e=new WeakMap,t=new class{getName(){var t;return null==(t=e.get(this))?void 0:t.name}getPassword(){var t;return null==(t=e.get(this))?void 0:t.password}verifyPassword(t){var n;return(null==(n=e.get(this))?void 0:n.password)===t}constructor(t,n){e.set(this,{name:t,password:n}),p(`✅ Created user with private data`)}}("Alice","secret123");p(`📖 User name: ${t.getName()}`),p(`🔐 Password verification (secret123): ${t.verifyPassword("secret123")}`),p(`🔐 Password verification (wrong): ${t.verifyPassword("wrong")}`),p("\uD83D\uDCA1 Password is not accessible as a property!"),p(`💡 user.password = ${t.password}`)},children:"运行演示"})]}),(0,r.jsx)(c.A,{}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("h3",{children:[(0,r.jsx)(l.A,{color:"cyan",children:"Demo 4"})," DOM 节点元数据"]}),(0,r.jsx)("p",{className:"weakmap-demo__desc",children:"为 DOM 元素存储额外数据，不污染 DOM 结构"}),(0,r.jsx)(d.Ay,{type:"primary",onClick:()=>{j(),p("\uD83C\uDF10 Demonstrating DOM node metadata storage...");let e=u.current;x.current.forEach((t,n)=>{t&&(e.set(t,{clicks:0,created:new Date,index:n}),p(`✅ Added metadata for node ${n}`))}),p("\uD83D\uDCA1 Metadata is stored without modifying DOM elements"),p("\uD83D\uDCA1 When DOM elements are removed, metadata is auto-cleaned by GC")},children:"初始化元数据"}),(0,r.jsx)("div",{className:"weakmap-demo__dom-nodes",style:{marginTop:16},children:[0,1,2].map(e=>(0,r.jsxs)("div",{ref:t=>t&&(x.current[e]=t),className:"weakmap-demo__dom-node",onClick:e=>(e=>{if(!e)return;let t=u.current,n=t.get(e);n&&(n.clicks++,t.set(e,n),p(`🖱️ Node clicked ${n.clicks} times`))})(e.currentTarget),children:["Node ",e," - Click me!"]},e))})]}),(0,r.jsx)(c.A,{}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("h3",{children:[(0,r.jsx)(l.A,{color:"red",children:"Demo 5"})," 缓存计算结果"]}),(0,r.jsx)("p",{className:"weakmap-demo__desc",children:"使用 WeakMap 缓存昂贵的计算结果，自动清理不再使用的缓存"}),(0,r.jsxs)(o.A,{children:[(0,r.jsx)(d.Ay,{type:"primary",onClick:()=>{j();let e=m.current,t={id:"test-1"},n={id:"test-2"};if(p("\uD83D\uDE80 Testing cache with WeakMap..."),!e.has(t)){let n=g(t);e.set(t,n),h(e=>({...e,misses:e.misses+1})),p(`❌ Cache miss for obj1, computed: ${n}`)}if(e.has(t)){let n=e.get(t);h(e=>({...e,hits:e.hits+1})),p(`✅ Cache hit for obj1, returned: ${n}`)}if(!e.has(n)){let t=g(n);e.set(n,t),h(e=>({...e,misses:e.misses+1})),p(`❌ Cache miss for obj2, computed: ${t}`)}p("\uD83D\uDCA1 WeakMap ensures cache is cleaned when objects are GC")},children:"运行缓存测试"}),(0,r.jsxs)(l.A,{color:"blue",children:["Cache Hits: ",n.hits]}),(0,r.jsxs)(l.A,{color:"orange",children:["Cache Misses: ",n.misses]})]})]})]}),(0,r.jsx)(c.A,{}),(0,r.jsxs)("div",{className:"weakmap-demo__console",children:[(0,r.jsxs)("div",{className:"weakmap-demo__console-header",children:[(0,r.jsx)("span",{children:"\uD83D\uDCCB 控制台输出"}),(0,r.jsx)(d.Ay,{size:"small",onClick:j,children:"清空"})]}),(0,r.jsx)("div",{className:"weakmap-demo__console-content",children:0===e.length?(0,r.jsx)("div",{className:"weakmap-demo__console-empty",children:"运行上面的演示查看输出..."}):e.map((e,t)=>(0,r.jsx)("div",{className:"weakmap-demo__console-line",children:e},t))})]})]}),(0,r.jsxs)(a.A,{title:"实战使用场景",style:{marginTop:24},children:[(0,r.jsx)("h3",{children:"1. 存储对象的私有数据"}),(0,r.jsx)("div",{className:"weakmap-demo__code",children:`// 使用 WeakMap 实现真正的私有属性
const privateData = new WeakMap();

class BankAccount {
  constructor(balance) {
    // 私有数据存储在 WeakMap 中
    privateData.set(this, { balance });
  }

  deposit(amount) {
    const data = privateData.get(this);
    data.balance += amount;
  }

  getBalance() {
    return privateData.get(this).balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance());  // 1500

// ✅ 无法通过实例访问私有数据
console.log(account.balance);  // undefined`}),(0,r.jsx)("h3",{style:{marginTop:24},children:"2. DOM 元素关联数据"}),(0,r.jsx)("div",{className:"weakmap-demo__code",children:`// 为 DOM 元素存储元数据，无需修改 DOM
const elementMetadata = new WeakMap();

function attachEventHandlers(elements) {
  elements.forEach((el, index) => {
    // 存储元数据
    elementMetadata.set(el, {
      index,
      clicks: 0,
      createdAt: Date.now(),
    });

    el.addEventListener('click', () => {
      const data = elementMetadata.get(el);
      data.clicks++;
      console.log(\`Element \${data.index} clicked \${data.clicks} times\`);
    });
  });
}

// 当 DOM 元素被移除时，相关的元数据会自动被垃圾回收`}),(0,r.jsx)("h3",{style:{marginTop:24},children:"3. 缓存对象计算结果"}),(0,r.jsx)("div",{className:"weakmap-demo__code",children:`// 使用 WeakMap 缓存昂贵的计算结果
const computeCache = new WeakMap();

function expensiveComputation(obj) {
  // 检查缓存
  if (computeCache.has(obj)) {
    console.log('Cache hit!');
    return computeCache.get(obj);
  }

  // 执行昂贵的计算
  console.log('Cache miss, computing...');
  const result = /* complex computation */ obj;

  // 缓存结果
  computeCache.set(obj, result);
  return result;
}

// 优点：当对象不再使用时，缓存会自动清理`}),(0,r.jsx)("h3",{style:{marginTop:24},children:"4. 追踪对象的引用关系"}),(0,r.jsx)("div",{className:"weakmap-demo__code",children:`// 追踪对象之间的关系，无需担心内存泄漏
const relationships = new WeakMap();

class Node {
  addChild(child) {
    if (!relationships.has(this)) {
      relationships.set(this, new Set());
    }
    relationships.get(this).add(child);
  }

  getChildren() {
    return relationships.get(this) || new Set();
  }
}

// 当 Node 实例被销毁时，关系数据会自动清理`}),(0,r.jsx)("h3",{style:{marginTop:24},children:"5. 防止内存泄漏的事件监听"}),(0,r.jsx)("div",{className:"weakmap-demo__code",children:`// 使用 WeakMap 存储事件处理器，避免内存泄漏
const eventHandlers = new WeakMap();

class EventManager {
  addEventListener(element, event, handler) {
    if (!eventHandlers.has(element)) {
      eventHandlers.set(element, new Map());
    }

    const handlers = eventHandlers.get(element);
    if (!handlers.has(event)) {
      handlers.set(event, new Set());
    }

    handlers.get(event).add(handler);
    element.addEventListener(event, handler);
  }

  removeEventListener(element, event, handler) {
    const handlers = eventHandlers.get(element);
    if (handlers && handlers.has(event)) {
      handlers.get(event).delete(handler);
      element.removeEventListener(event, handler);
    }
  }
}

// 当 element 被销毁时，所有相关的处理器信息会自动清理`})]}),(0,r.jsx)(a.A,{title:"注意事项",style:{marginTop:24},children:(0,r.jsx)(i.A,{message:"使用 WeakMap 的注意事项",description:(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"键必须是对象："}),"不能使用字符串、数字等原始类型作为键"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"不可遍历："}),"无法获取所有键或值，不适合需要遍历的场景"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"调试困难："}),"无法在开发者工具中直接查看 WeakMap 的内容"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"适用场景："}),"最适合存储对象元数据、私有数据、临时缓存等"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"垃圾回收："}),"依赖 GC 机制，清理时机不可预测"]})]}),type:"warning",showIcon:!0})}),(0,r.jsx)(a.A,{title:"性能对比",style:{marginTop:24},children:(0,r.jsxs)("div",{className:"weakmap-demo__performance",children:[(0,r.jsx)("h4",{children:"什么时候选择 WeakMap？"}),(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{children:["✅ ",(0,r.jsx)("strong",{children:"需要存储对象元数据"})," - 不想污染对象本身"]}),(0,r.jsxs)("li",{children:["✅ ",(0,r.jsx)("strong",{children:"需要自动内存管理"})," - 对象销毁时自动清理关联数据"]}),(0,r.jsxs)("li",{children:["✅ ",(0,r.jsx)("strong",{children:"需要私有数据存储"})," - 真正的私有属性"]}),(0,r.jsxs)("li",{children:["✅ ",(0,r.jsx)("strong",{children:"缓存对象相关的计算"})," - 自动清理不再使用的缓存"]})]}),(0,r.jsx)("h4",{style:{marginTop:24},children:"什么时候选择 Map？"}),(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{children:["✅ ",(0,r.jsx)("strong",{children:"需要遍历所有键值对"})," - 需要 keys(), values(), entries()"]}),(0,r.jsxs)("li",{children:["✅ ",(0,r.jsx)("strong",{children:"需要知道数量"})," - 需要 size 属性"]}),(0,r.jsxs)("li",{children:["✅ ",(0,r.jsx)("strong",{children:"键可以是原始类型"})," - 字符串、数字等"]}),(0,r.jsxs)("li",{children:["✅ ",(0,r.jsx)("strong",{children:"需要手动控制生命周期"})," - 明确清理时机"]})]})]})})]})}}}]);