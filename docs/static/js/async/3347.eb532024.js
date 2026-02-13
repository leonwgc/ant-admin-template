"use strict";(self.webpackChunkneat_admin_template=self.webpackChunkneat_admin_template||[]).push([["3347"],{15398(e,r,t){t.d(r,{A:()=>x});var n,o=t(71500),i=t(46942),s=t.n(i),l=t(72422),a=t(2445);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var d=["className","alignment","size"];function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function h(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach(function(r){var n,o,i;n=e,o=r,i=t[r],(o=function(e){var r=function(e,r){if("object"!=c(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,r||"default");if("object"!=c(n))return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string");return"symbol"==c(r)?r:String(r)}(o))in n?Object.defineProperty(n,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[o]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}let x=function(e){var r=e.className,t=e.alignment,i=e.size,c=function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,d),p=(0,l.Ay)()(function(e){var r,t,o=e.css,i=e.prefixCls,s=e.componentsToken.Divider;return o(n||(r=["\n            &.","-divider {\n                &.","-divider-horizontal {\n                    border-block-start-color: ",";\n                }\n\n                &.","-divider-vertical {\n                    border-inline-start-color: ",";\n                }\n\n                &.","-divider-large {\n                    &.","-divider-horizontal {\n                        border-block-start-width: 2px;\n                    }\n\n                    &.","-divider-vertical {\n                        border-inline-start-width: 2px;\n                    }\n                }\n            }\n        "],t||(t=r.slice(0)),n=Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(t)}}))),i,i,s["divider-color-border"],i,s["divider-color-border"],i,i,i)}),x=p.prefixCls,g=p.styles;return(0,a.Y)(o.A,h(h({},c),{},{className:s()("".concat(x,"-divider-").concat(void 0===i?"medium":i),g,r),plain:!0,type:void 0===t?"horizontal":t}))}},39581(e,r,t){t.r(r)},71500(e,r,t){t.d(r,{A:()=>m});var n=t(96540),o=t(46942),i=t.n(o),s=t(62279),l=t(829),a=t(53716),c=t(25905),d=t(37358),p=t(10224);let h=(0,d.OF)("Divider",e=>{let r=(0,p.mergeToken)(e,{dividerHorizontalWithTextGutterMargin:e.margin,sizePaddingEdgeHorizontal:0});return[(e=>{let{componentCls:r,sizePaddingEdgeHorizontal:t,colorSplit:n,lineWidth:o,textPaddingInline:i,orientationMargin:s,verticalMarginInline:l}=e;return{[r]:Object.assign(Object.assign({},(0,c.dF)(e)),{borderBlockStart:`${(0,a.unit)(o)} solid ${n}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:l,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${(0,a.unit)(o)} solid ${n}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${(0,a.unit)(e.marginLG)} 0`},[`&-horizontal${r}-with-text`]:{display:"flex",alignItems:"center",margin:`${(0,a.unit)(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${n}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${(0,a.unit)(o)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${r}-with-text-start`]:{"&::before":{width:`calc(${s} * 100%)`},"&::after":{width:`calc(100% - ${s} * 100%)`}},[`&-horizontal${r}-with-text-end`]:{"&::before":{width:`calc(100% - ${s} * 100%)`},"&::after":{width:`calc(${s} * 100%)`}},[`${r}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:i},"&-dashed":{background:"none",borderColor:n,borderStyle:"dashed",borderWidth:`${(0,a.unit)(o)} 0 0`},[`&-horizontal${r}-with-text${r}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${r}-dashed`]:{borderInlineStartWidth:o,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:n,borderStyle:"dotted",borderWidth:`${(0,a.unit)(o)} 0 0`},[`&-horizontal${r}-with-text${r}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${r}-dotted`]:{borderInlineStartWidth:o,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${r}-with-text`]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},[`&-horizontal${r}-with-text-start${r}-no-default-orientation-margin-start`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${r}-inner-text`]:{paddingInlineStart:t}},[`&-horizontal${r}-with-text-end${r}-no-default-orientation-margin-end`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${r}-inner-text`]:{paddingInlineEnd:t}}})}})(r),(e=>{let{componentCls:r}=e;return{[r]:{"&-horizontal":{[`&${r}`]:{"&-sm":{marginBlock:e.marginXS},"&-md":{marginBlock:e.margin}}}}}})(r)]},e=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:e.marginXS}),{unitless:{orientationMargin:!0}});var x=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>r.indexOf(n)&&(t[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)0>r.indexOf(n[o])&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(t[n[o]]=e[n[o]]);return t};let g={small:"sm",middle:"md"},m=e=>{let{getPrefixCls:r,direction:t,className:o,style:a}=(0,s.TP)("divider"),{prefixCls:c,type:d="horizontal",orientation:p="center",orientationMargin:m,className:y,rootClassName:j,children:u,dashed:f,variant:v="solid",plain:b,style:$,size:w}=e,_=x(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style","size"]),P=r("divider",c),[A,O,N]=h(P),S=g[(0,l.A)(w)],k=!!u,C=n.useMemo(()=>"left"===p?"rtl"===t?"end":"start":"right"===p?"rtl"===t?"start":"end":p,[t,p]),I="start"===C&&null!=m,T="end"===C&&null!=m,E=i()(P,o,O,N,`${P}-${d}`,{[`${P}-with-text`]:k,[`${P}-with-text-${C}`]:k,[`${P}-dashed`]:!!f,[`${P}-${v}`]:"solid"!==v,[`${P}-plain`]:!!b,[`${P}-rtl`]:"rtl"===t,[`${P}-no-default-orientation-margin-start`]:I,[`${P}-no-default-orientation-margin-end`]:T,[`${P}-${S}`]:!!S},y,j),z=n.useMemo(()=>"number"==typeof m?m:/^\d+$/.test(m)?Number(m):m,[m]);return A(n.createElement("div",Object.assign({className:E,style:Object.assign(Object.assign({},a),$)},_,{role:"separator"}),u&&"vertical"!==d&&n.createElement("span",{className:`${P}-inner-text`,style:{marginInlineStart:I?z:void 0,marginInlineEnd:T?z:void 0}},u)))}},58926(e,r,t){t.r(r),t.d(r,{default:()=>x});var n=t(74848),o=t(96540),i=t(16629),s=t(40244),l=t(99373),a=t(36813),c=t(58607),d=t(15398),p=t(2733),h=t(26149);t(39581);let x=()=>{let[e,r]=(0,o.useState)([]),[t,x]=(0,o.useState)(""),[g,m]=(0,o.useState)(0),[y,j]=(0,o.useState)(-1),u=e=>{r(r=>[...r,`[${new Date().toLocaleTimeString()}] ${e}`]),console.log(e)},f=()=>{r([])};return(0,n.jsxs)("div",{className:"proxy-demo",children:[(0,n.jsx)("h2",{className:"proxy-demo__title",children:"JavaScript Proxy 完全指南"}),(0,n.jsxs)(i.A,{title:"Proxy 概述",children:[(0,n.jsx)(s.A,{message:"核心概念",description:(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{children:"Proxy 对象用于创建一个对象的代理，从而实现对基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。"}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"target："}),"被代理的目标对象"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"handler："}),"包含拦截器（traps）的对象"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"13 种拦截器："}),"get、set、has、deleteProperty、apply、construct 等"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"与 Reflect 配合："}),"Reflect 提供默认行为的方法"]})]})]}),type:"info",showIcon:!0}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// Proxy 基本语法
const proxy = new Proxy(target, handler);

// target: 要代理的目标对象
const target = {
  name: 'John',
  age: 30
};

// handler: 包含拦截器的对象
const handler = {
  get(target, prop, receiver) {
    console.log(\`Getting \${prop}\`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(\`Setting \${prop} = \${value}\`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxy = new Proxy(target, handler);
proxy.name;       // Logs: Getting name
proxy.age = 31;   // Logs: Setting age = 31`})]}),(0,n.jsx)(i.A,{title:"13 种 Proxy 拦截器",style:{marginTop:24},children:(0,n.jsxs)("div",{className:"proxy-demo__traps",children:[(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"blue",children:"get(target, prop, receiver)"}),(0,n.jsx)("p",{children:"拦截属性读取操作"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"green",children:"set(target, prop, value, receiver)"}),(0,n.jsx)("p",{children:"拦截属性设置操作"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"purple",children:"has(target, prop)"}),(0,n.jsx)("p",{children:"拦截 in 操作符"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"orange",children:"deleteProperty(target, prop)"}),(0,n.jsx)("p",{children:"拦截 delete 操作"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"cyan",children:"apply(target, thisArg, args)"}),(0,n.jsx)("p",{children:"拦截函数调用"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"red",children:"construct(target, args, newTarget)"}),(0,n.jsx)("p",{children:"拦截 new 操作符"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"magenta",children:"getPrototypeOf(target)"}),(0,n.jsx)("p",{children:"拦截 Object.getPrototypeOf()"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"gold",children:"setPrototypeOf(target, proto)"}),(0,n.jsx)("p",{children:"拦截 Object.setPrototypeOf()"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"lime",children:"isExtensible(target)"}),(0,n.jsx)("p",{children:"拦截 Object.isExtensible()"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"geekblue",children:"preventExtensions(target)"}),(0,n.jsx)("p",{children:"拦截 Object.preventExtensions()"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"volcano",children:"getOwnPropertyDescriptor(target, prop)"}),(0,n.jsx)("p",{children:"拦截 Object.getOwnPropertyDescriptor()"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"blue",children:"defineProperty(target, prop, descriptor)"}),(0,n.jsx)("p",{children:"拦截 Object.defineProperty()"})]}),(0,n.jsxs)("div",{className:"proxy-demo__trap-item",children:[(0,n.jsx)(l.A,{color:"green",children:"ownKeys(target)"}),(0,n.jsx)("p",{children:"拦截 Object.keys() 等"})]})]})}),(0,n.jsxs)(i.A,{title:"交互式演示",style:{marginTop:24},children:[(0,n.jsxs)(a.A,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(l.A,{color:"blue",children:"Demo 1"})," 基本拦截操作"]}),(0,n.jsx)("p",{className:"proxy-demo__desc",children:"演示 get、set、has、deleteProperty 拦截器"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{f();let e=new Proxy({name:"Alice",age:25},{get:(e,r)=>(u(`📖 Getting property "${r}"`),e[r]),set:(e,r,t)=>(u(`✏️ Setting property "${r}" = ${t}`),e[r]=t,!0),has:(e,r)=>(u(`🔍 Checking if property "${r}" exists`),r in e),deleteProperty:(e,r)=>(u(`🗑️ Deleting property "${r}"`),delete e[r],!0)});u("--- Starting basic operations ---"),e.name,e.age=26,delete e.age,u("--- Operations completed ---")},children:"运行演示"})]}),(0,n.jsx)(d.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(l.A,{color:"green",children:"Demo 2"})," 数据验证"]}),(0,n.jsx)("p",{className:"proxy-demo__desc",children:"使用 Proxy 实现自动数据验证"}),(0,n.jsxs)(a.A,{children:[(0,n.jsx)("span",{children:"Age:"}),(0,n.jsx)(p.A,{min:-10,max:200,value:g,onChange:e=>m(e),style:{width:100}}),(0,n.jsx)("span",{children:"Email:"}),(0,n.jsx)(h.A,{value:t,onChange:e=>x(e.target.value),placeholder:"test@example.com",style:{width:200}}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{f();let e=new Proxy({},{set(e,r,t){if("age"===r){if(!Number.isInteger(t))throw u(`❌ Age must be an integer, got: ${t}`),TypeError("Age must be an integer");if(t<0||t>150)throw u(`❌ Age must be between 0 and 150, got: ${t}`),RangeError("Age must be between 0 and 150")}if("email"===r&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))throw u(`❌ Invalid email format: ${t}`),TypeError("Invalid email format");return u(`✅ Valid ${r}: ${t}`),e[r]=t,!0}});try{u("--- Testing validation ---"),e.age=g,e.email=t}catch(e){u(`⚠️ Caught error: ${e.message}`)}},children:"验证数据"})]})]}),(0,n.jsx)(d.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(l.A,{color:"purple",children:"Demo 3"})," 负索引数组"]}),(0,n.jsx)("p",{className:"proxy-demo__desc",children:"实现 Python 风格的负索引访问数组"}),(0,n.jsxs)(a.A,{children:[(0,n.jsx)("span",{children:"Index:"}),(0,n.jsx)(p.A,{min:-5,max:4,value:y,onChange:e=>j(e),style:{width:100}}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{f();let e=new Proxy(["a","b","c","d","e"],{get(e,r){let t=Number(r);if(t<0){let r=e.length+t;return u(`📍 Negative index [${t}] → actual index [${r}]`),e[r]}return e[r]}});u('--- Array: ["a", "b", "c", "d", "e"] ---'),u(`arr[${y}] = ${e[y]}`),u(`arr[-1] = ${e[-1]} (last element)`),u(`arr[-2] = ${e[-2]} (second to last)`)},children:"访问数组元素"})]})]}),(0,n.jsx)(d.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(l.A,{color:"orange",children:"Demo 4"})," 观察者模式"]}),(0,n.jsx)("p",{className:"proxy-demo__desc",children:"自动追踪对象属性变化"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{var e,r;f();let t=(e={count:0,name:"Test"},r=(e,r,t)=>{u(`🔔 Property "${e}" changed: ${r} → ${t}`)},new Proxy(e,{set(e,t,n){let o=e[t];return e[t]=n,r(t,o,n),!0}}));u("--- Testing observable pattern ---"),t.count=1,t.count=2,t.name="Updated"},children:"运行演示"})]}),(0,n.jsx)(d.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(l.A,{color:"cyan",children:"Demo 5"})," 只读对象"]}),(0,n.jsx)("p",{className:"proxy-demo__desc",children:"创建不可修改的对象"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{f();let e=new Proxy({apiUrl:"https://api.example.com",timeout:5e3},{set(){throw u("❌ Cannot modify read-only object!"),Error("Cannot modify read-only object")},deleteProperty(){throw u("❌ Cannot delete from read-only object!"),Error("Cannot delete from read-only object")}});try{u("--- Testing read-only object ---"),u(`✅ Reading config.apiUrl: ${e.apiUrl}`),u("❌ Attempting to modify config.timeout..."),e.timeout=1e4}catch(e){u(`⚠️ Caught error: ${e.message}`)}},children:"运行演示"})]}),(0,n.jsx)(d.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(l.A,{color:"red",children:"Demo 6"})," 函数调用追踪"]}),(0,n.jsx)("p",{className:"proxy-demo__desc",children:"追踪函数调用和执行时间"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{function e(e,r){return new Proxy(e,{apply(e,t,n){u(`🎯 Calling function "${r}" with args: ${JSON.stringify(n)}`);let o=performance.now(),i=Reflect.apply(e,t,n),s=performance.now();return u(`✅ Function "${r}" returned: ${i} (${(s-o).toFixed(2)}ms)`),i}})}f();let r=e((e,r)=>e+r,"add"),t=e((e,r)=>e*r,"multiply");u("--- Testing function tracking ---"),r(5,3),t(4,7)},children:"运行演示"})]}),(0,n.jsx)(d.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(l.A,{color:"magenta",children:"Demo 7"})," 属性访问缓存"]}),(0,n.jsx)("p",{className:"proxy-demo__desc",children:"缓存昂贵的属性计算结果"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{var e;let r;f();let t=(e={get data(){return Math.random()}},r=new Map,new Proxy(e,{get(e,t){if(r.has(t))return u(`💾 Cache hit for "${String(t)}"`),r.get(t);u(`❌ Cache miss for "${String(t)}", computing...`);let n=e[t];return r.set(t,n),n}}));u("--- Testing property caching ---"),u(`First access: ${t.data}`),u(`Second access: ${t.data}`),u(`Third access: ${t.data}`)},children:"运行演示"})]})]}),(0,n.jsx)(d.A,{}),(0,n.jsxs)("div",{className:"proxy-demo__console",children:[(0,n.jsxs)("div",{className:"proxy-demo__console-header",children:[(0,n.jsx)("span",{children:"\uD83D\uDCCB 控制台输出"}),(0,n.jsx)(c.Ay,{size:"small",onClick:f,children:"清空"})]}),(0,n.jsx)("div",{className:"proxy-demo__console-content",children:0===e.length?(0,n.jsx)("div",{className:"proxy-demo__console-empty",children:"运行上面的演示查看输出..."}):e.map((e,r)=>(0,n.jsx)("div",{className:"proxy-demo__console-line",children:e},r))})]})]}),(0,n.jsxs)(i.A,{title:"实战使用场景",style:{marginTop:24},children:[(0,n.jsx)("h3",{children:"1. 数据验证和约束"}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// 使用 Proxy 自动验证对象属性
function createValidator(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      const validator = schema[prop];
      if (!validator) {
        throw new Error(\`No validator for property "\${prop}"\`);
      }
      if (!validator(value)) {
        throw new TypeError(\`Invalid value for "\${prop}"\`);
      }
      target[prop] = value;
      return true;
    }
  });
}

const userSchema = {
  name: (val) => typeof val === 'string' && val.length > 0,
  age: (val) => Number.isInteger(val) && val >= 0 && val <= 150,
  email: (val) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val)
};

const user = createValidator(userSchema);
user.name = 'Alice';     // ✅ OK
user.age = 25;           // ✅ OK
user.age = -1;           // ❌ TypeError: Invalid value for "age"`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"2. Vue 3 响应式系统"}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// Vue 3 使用 Proxy 实现响应式
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      // 触发更新
      trigger(target, key);
      return result;
    }
  });
}

const state = reactive({ count: 0 });
// 当 state.count 改变时，自动更新依赖的组件`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"3. 负索引数组访问"}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// Python 风格的负索引
function createArray(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      const index = Number(prop);
      if (index < 0) {
        return target[target.length + index];
      }
      return Reflect.get(target, prop);
    }
  });
}

const arr = createArray([1, 2, 3, 4, 5]);
console.log(arr[-1]);  // 5 (最后一个元素)
console.log(arr[-2]);  // 4 (倒数第二个元素)`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"4. 属性访问日志记录"}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// 记录对象的所有操作
function createLogger(target, name) {
  return new Proxy(target, {
    get(target, prop) {
      console.log(\`[GET] \${name}.\${prop}\`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      console.log(\`[SET] \${name}.\${prop} = \${value}\`);
      return Reflect.set(target, prop, value);
    }
  });
}

const api = createLogger({ baseURL: 'https://api.example.com' }, 'API');
// 所有操作都会被记录`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"5. 默认值处理"}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// 为不存在的属性提供默认值
function withDefaults(target, defaults) {
  return new Proxy(target, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return defaults[prop];
    }
  });
}

const config = withDefaults(
  { host: 'localhost' },
  { host: '0.0.0.0', port: 3000, timeout: 5000 }
);

console.log(config.host);     // 'localhost' (from target)
console.log(config.port);     // 3000 (from defaults)
console.log(config.timeout);  // 5000 (from defaults)`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"6. API Mock 和测试"}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// 模拟 API 对象
function createMockAPI() {
  return new Proxy({}, {
    get(target, prop) {
      // 动态创建 API 方法
      return function(...args) {
        console.log(\`Calling API: \${String(prop)}(\${args.join(', ')})\`);
        return Promise.resolve({ success: true, data: {} });
      };
    }
  });
}

const api = createMockAPI();
api.getUser(123);      // Calling API: getUser(123)
api.createPost(data);  // Calling API: createPost([object Object])`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"7. 私有属性保护"}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// 隐藏以 _ 开头的私有属性
function createPrivate(target) {
  return new Proxy(target, {
    get(target, prop) {
      if (typeof prop === 'string' && prop.startsWith('_')) {
        throw new Error(\`Cannot access private property "\${prop}"\`);
      }
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (typeof prop === 'string' && prop.startsWith('_')) {
        throw new Error(\`Cannot set private property "\${prop}"\`);
      }
      return Reflect.set(target, prop, value);
    },
    ownKeys(target) {
      // 隐藏私有属性
      return Reflect.ownKeys(target).filter(
        key => typeof key !== 'string' || !key.startsWith('_')
      );
    }
  });
}

const obj = createPrivate({ public: 1, _private: 2 });
console.log(obj.public);   // ✅ 1
console.log(obj._private); // ❌ Error: Cannot access private property`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"8. 单例模式"}),(0,n.jsx)("div",{className:"proxy-demo__code",children:`// 使用 Proxy 实现单例
function singleton(className) {
  let instance;
  return new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance;
    }
  });
}

class Database {
  constructor() {
    console.log('Database instance created');
  }
}

const DB = singleton(Database);
const db1 = new DB();  // Database instance created
const db2 = new DB();  // (不会打印，返回同一个实例)
console.log(db1 === db2);  // true`})]}),(0,n.jsx)(i.A,{title:"Proxy vs Object.defineProperty",style:{marginTop:24},children:(0,n.jsx)("div",{className:"proxy-demo__comparison",children:(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"特性"}),(0,n.jsx)("th",{children:(0,n.jsx)(l.A,{color:"blue",children:"Object.defineProperty"})}),(0,n.jsx)("th",{children:(0,n.jsx)(l.A,{color:"purple",children:"Proxy"})})]})}),(0,n.jsxs)("tbody",{children:[(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"监听范围"}),(0,n.jsx)("td",{children:"单个属性"}),(0,n.jsx)("td",{children:"整个对象"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"新增属性"}),(0,n.jsx)("td",{children:"❌ 无法监听"}),(0,n.jsx)("td",{children:"✅ 可以监听"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"删除属性"}),(0,n.jsx)("td",{children:"❌ 无法监听"}),(0,n.jsx)("td",{children:"✅ 可以监听"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"数组操作"}),(0,n.jsx)("td",{children:"需要特殊处理"}),(0,n.jsx)("td",{children:"原生支持"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"性能"}),(0,n.jsx)("td",{children:"较好"}),(0,n.jsx)("td",{children:"稍慢"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"浏览器支持"}),(0,n.jsx)("td",{children:"IE9+"}),(0,n.jsx)("td",{children:"现代浏览器"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"拦截操作"}),(0,n.jsx)("td",{children:"仅 get/set"}),(0,n.jsx)("td",{children:"13 种拦截器"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"使用场景"}),(0,n.jsx)("td",{children:"Vue 2.x"}),(0,n.jsx)("td",{children:"Vue 3.x"})]})]})]})})}),(0,n.jsx)(i.A,{title:"注意事项",style:{marginTop:24},children:(0,n.jsx)(s.A,{message:"使用 Proxy 的注意事项",description:(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"性能考虑："}),"Proxy 会增加额外开销，不适合高频操作"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"浏览器兼容性："}),"不支持 IE，无法完全 polyfill"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"this 指向："}),"注意拦截器中的 this 指向问题，建议使用 Reflect"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"内置对象："}),"某些内置对象（如 Date）无法被代理"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"相等性："}),"proxy !== target，需要保持代理对象的引用"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"递归代理："}),"嵌套对象需要递归创建代理"]})]}),type:"warning",showIcon:!0})})]})}}}]);