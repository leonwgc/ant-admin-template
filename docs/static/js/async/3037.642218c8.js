"use strict";(self.webpackChunkant_admin_template=self.webpackChunkant_admin_template||[]).push([["3037"],{70323(e,s,a){a.r(s)},71036(e,s,a){a.r(s),a.d(s,{default:()=>h});var n=a(74848),t=a(96540),l=a(16629),r=a(40244),i=a(99373),d=a(36813),c=a(58607),o=a(15398);a(70323);let h=()=>{let[e,s]=(0,t.useState)([]),[a,h]=(0,t.useState)({hits:0,misses:0});(0,t.useRef)(new WeakMap);let m=(0,t.useRef)(new WeakMap),j=e=>{s(s=>[...s,`[${new Date().toLocaleTimeString()}] ${e}`])},p=()=>{s([])},x=(0,t.useRef)([]),u=(0,t.useRef)(new WeakMap),k=e=>`Computed-${Math.random().toString(36).substr(2,9)}`;return(0,n.jsxs)("div",{className:"weakmap-demo",children:[(0,n.jsx)("h2",{className:"weakmap-demo__title",children:"JavaScript WeakMap 完全指南"}),(0,n.jsxs)(l.A,{title:"WeakMap 概述",children:[(0,n.jsx)(r.A,{message:"核心特性",description:(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{children:"WeakMap 是一种特殊的 Map，其键必须是对象，且对键的引用是弱引用。"}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"弱引用："}),"不会阻止垃圾回收器回收键对象"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"键类型："}),"只能使用对象作为键（不能用原始类型）"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"不可枚举："}),"没有 keys()、values()、entries() 等方法"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"无 size 属性："}),"无法获取键值对数量"]})]})]}),type:"info",showIcon:!0}),(0,n.jsx)("div",{className:"weakmap-demo__code",children:`// WeakMap 基本语法
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
wm.forEach();  // undefined`})]}),(0,n.jsxs)(l.A,{title:"WeakMap vs Map 对比",style:{marginTop:24},children:[(0,n.jsx)("div",{className:"weakmap-demo__comparison",children:(0,n.jsx)("div",{className:"weakmap-demo__comparison-table",children:(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"特性"}),(0,n.jsx)("th",{children:(0,n.jsx)(i.A,{color:"blue",children:"Map"})}),(0,n.jsx)("th",{children:(0,n.jsx)(i.A,{color:"purple",children:"WeakMap"})})]})}),(0,n.jsxs)("tbody",{children:[(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"键类型"}),(0,n.jsx)("td",{children:"任意类型"}),(0,n.jsx)("td",{children:"只能是对象"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"引用类型"}),(0,n.jsx)("td",{children:"强引用（阻止 GC）"}),(0,n.jsx)("td",{children:"弱引用（不阻止 GC）"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"可枚举"}),(0,n.jsx)("td",{children:"✅ 可以遍历"}),(0,n.jsx)("td",{children:"❌ 不可遍历"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"size 属性"}),(0,n.jsx)("td",{children:"✅ 有"}),(0,n.jsx)("td",{children:"❌ 无"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"keys/values/entries"}),(0,n.jsx)("td",{children:"✅ 有"}),(0,n.jsx)("td",{children:"❌ 无"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"clear 方法"}),(0,n.jsx)("td",{children:"✅ 有"}),(0,n.jsx)("td",{children:"❌ 无"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"内存管理"}),(0,n.jsx)("td",{children:"手动清理"}),(0,n.jsx)("td",{children:"自动清理（GC）"})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:"使用场景"}),(0,n.jsx)("td",{children:"通用键值对存储"}),(0,n.jsx)("td",{children:"对象元数据、私有数据"})]})]})]})})}),(0,n.jsx)("div",{className:"weakmap-demo__code",style:{marginTop:16},children:`// Map vs WeakMap 内存管理对比

// Map: 强引用，需手动清理
const map = new Map();
let obj1 = { name: 'test' };
map.set(obj1, 'data');
obj1 = null;  // ❌ Map 仍然持有对象引用，无法被 GC

// WeakMap: 弱引用，自动清理
const wm = new WeakMap();
let obj2 = { name: 'test' };
wm.set(obj2, 'data');
obj2 = null;  // ✅ 对象可以被 GC，WeakMap 自动清理`})]}),(0,n.jsxs)(l.A,{title:"交互式演示",style:{marginTop:24},children:[(0,n.jsxs)(d.A,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(i.A,{color:"green",children:"Demo 1"})," 基本操作"]}),(0,n.jsx)("p",{className:"weakmap-demo__desc",children:"演示 WeakMap 的基本 API：set、get、has、delete"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{p();let e=new WeakMap,s={id:1,name:"Object 1"},a={id:2,name:"Object 2"};e.set(s,"Data for object 1"),e.set(a,"Data for object 2"),j("✅ Set data for obj1 and obj2"),j(`📖 Get obj1: ${e.get(s)}`),j(`📖 Get obj2: ${e.get(a)}`),j(`🔍 Has obj1: ${e.has(s)}`),e.delete(s),j("\uD83D\uDDD1️ Deleted obj1"),j(`🔍 Has obj1 after delete: ${e.has(s)}`)},children:"运行演示"})]}),(0,n.jsx)(o.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(i.A,{color:"orange",children:"Demo 2"})," 弱引用特性"]}),(0,n.jsx)("p",{className:"weakmap-demo__desc",children:"演示 WeakMap 的弱引用特性：当对象被设置为 null 时，WeakMap 不会阻止垃圾回收"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{p(),j("\uD83E\uDDEA Testing weak reference...");let e=new WeakMap,s={name:"Temporary Object"};e.set(s,"This data will be GC when tempObj is null"),j("✅ Set data for tempObj"),j(`📖 Has tempObj: ${e.has(s)}`),j("⚠️ Setting tempObj to null..."),s=null,j("\uD83D\uDCA1 tempObj is now null, the WeakMap entry will be garbage collected"),j("\uD83D\uDCA1 WeakMap does not prevent garbage collection!")},children:"运行演示"})]}),(0,n.jsx)(o.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(i.A,{color:"purple",children:"Demo 3"})," 私有数据存储"]}),(0,n.jsx)("p",{className:"weakmap-demo__desc",children:"使用 WeakMap 实现真正的私有数据，外部无法访问"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{p(),j("\uD83D\uDD12 Demonstrating private data storage pattern...");let e=new WeakMap,s=new class{getName(){var s;return null==(s=e.get(this))?void 0:s.name}getPassword(){var s;return null==(s=e.get(this))?void 0:s.password}verifyPassword(s){var a;return(null==(a=e.get(this))?void 0:a.password)===s}constructor(s,a){e.set(this,{name:s,password:a}),j(`✅ Created user with private data`)}}("Alice","secret123");j(`📖 User name: ${s.getName()}`),j(`🔐 Password verification (secret123): ${s.verifyPassword("secret123")}`),j(`🔐 Password verification (wrong): ${s.verifyPassword("wrong")}`),j("\uD83D\uDCA1 Password is not accessible as a property!"),j(`💡 user.password = ${s.password}`)},children:"运行演示"})]}),(0,n.jsx)(o.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(i.A,{color:"cyan",children:"Demo 4"})," DOM 节点元数据"]}),(0,n.jsx)("p",{className:"weakmap-demo__desc",children:"为 DOM 元素存储额外数据，不污染 DOM 结构"}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{p(),j("\uD83C\uDF10 Demonstrating DOM node metadata storage...");let e=u.current;x.current.forEach((s,a)=>{s&&(e.set(s,{clicks:0,created:new Date,index:a}),j(`✅ Added metadata for node ${a}`))}),j("\uD83D\uDCA1 Metadata is stored without modifying DOM elements"),j("\uD83D\uDCA1 When DOM elements are removed, metadata is auto-cleaned by GC")},children:"初始化元数据"}),(0,n.jsx)("div",{className:"weakmap-demo__dom-nodes",style:{marginTop:16},children:[0,1,2].map(e=>(0,n.jsxs)("div",{ref:s=>s&&(x.current[e]=s),className:"weakmap-demo__dom-node",onClick:e=>(e=>{if(!e)return;let s=u.current,a=s.get(e);a&&(a.clicks++,s.set(e,a),j(`🖱️ Node clicked ${a.clicks} times`))})(e.currentTarget),children:["Node ",e," - Click me!"]},e))})]}),(0,n.jsx)(o.A,{}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(i.A,{color:"red",children:"Demo 5"})," 缓存计算结果"]}),(0,n.jsx)("p",{className:"weakmap-demo__desc",children:"使用 WeakMap 缓存昂贵的计算结果，自动清理不再使用的缓存"}),(0,n.jsxs)(d.A,{children:[(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{p();let e=m.current,s={id:"test-1"},a={id:"test-2"};if(j("\uD83D\uDE80 Testing cache with WeakMap..."),!e.has(s)){let a=k(s);e.set(s,a),h(e=>({...e,misses:e.misses+1})),j(`❌ Cache miss for obj1, computed: ${a}`)}if(e.has(s)){let a=e.get(s);h(e=>({...e,hits:e.hits+1})),j(`✅ Cache hit for obj1, returned: ${a}`)}if(!e.has(a)){let s=k(a);e.set(a,s),h(e=>({...e,misses:e.misses+1})),j(`❌ Cache miss for obj2, computed: ${s}`)}j("\uD83D\uDCA1 WeakMap ensures cache is cleaned when objects are GC")},children:"运行缓存测试"}),(0,n.jsxs)(i.A,{color:"blue",children:["Cache Hits: ",a.hits]}),(0,n.jsxs)(i.A,{color:"orange",children:["Cache Misses: ",a.misses]})]})]})]}),(0,n.jsx)(o.A,{}),(0,n.jsxs)("div",{className:"weakmap-demo__console",children:[(0,n.jsxs)("div",{className:"weakmap-demo__console-header",children:[(0,n.jsx)("span",{children:"\uD83D\uDCCB 控制台输出"}),(0,n.jsx)(c.Ay,{size:"small",onClick:p,children:"清空"})]}),(0,n.jsx)("div",{className:"weakmap-demo__console-content",children:0===e.length?(0,n.jsx)("div",{className:"weakmap-demo__console-empty",children:"运行上面的演示查看输出..."}):e.map((e,s)=>(0,n.jsx)("div",{className:"weakmap-demo__console-line",children:e},s))})]})]}),(0,n.jsxs)(l.A,{title:"实战使用场景",style:{marginTop:24},children:[(0,n.jsx)("h3",{children:"1. 存储对象的私有数据"}),(0,n.jsx)("div",{className:"weakmap-demo__code",children:`// 使用 WeakMap 实现真正的私有属性
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
console.log(account.balance);  // undefined`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"2. DOM 元素关联数据"}),(0,n.jsx)("div",{className:"weakmap-demo__code",children:`// 为 DOM 元素存储元数据，无需修改 DOM
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

// 当 DOM 元素被移除时，相关的元数据会自动被垃圾回收`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"3. 缓存对象计算结果"}),(0,n.jsx)("div",{className:"weakmap-demo__code",children:`// 使用 WeakMap 缓存昂贵的计算结果
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

// 优点：当对象不再使用时，缓存会自动清理`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"4. 追踪对象的引用关系"}),(0,n.jsx)("div",{className:"weakmap-demo__code",children:`// 追踪对象之间的关系，无需担心内存泄漏
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

// 当 Node 实例被销毁时，关系数据会自动清理`}),(0,n.jsx)("h3",{style:{marginTop:24},children:"5. 防止内存泄漏的事件监听"}),(0,n.jsx)("div",{className:"weakmap-demo__code",children:`// 使用 WeakMap 存储事件处理器，避免内存泄漏
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

// 当 element 被销毁时，所有相关的处理器信息会自动清理`})]}),(0,n.jsx)(l.A,{title:"注意事项",style:{marginTop:24},children:(0,n.jsx)(r.A,{message:"使用 WeakMap 的注意事项",description:(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"键必须是对象："}),"不能使用字符串、数字等原始类型作为键"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"不可遍历："}),"无法获取所有键或值，不适合需要遍历的场景"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"调试困难："}),"无法在开发者工具中直接查看 WeakMap 的内容"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"适用场景："}),"最适合存储对象元数据、私有数据、临时缓存等"]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:"垃圾回收："}),"依赖 GC 机制，清理时机不可预测"]})]}),type:"warning",showIcon:!0})}),(0,n.jsx)(l.A,{title:"性能对比",style:{marginTop:24},children:(0,n.jsxs)("div",{className:"weakmap-demo__performance",children:[(0,n.jsx)("h4",{children:"什么时候选择 WeakMap？"}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:["✅ ",(0,n.jsx)("strong",{children:"需要存储对象元数据"})," - 不想污染对象本身"]}),(0,n.jsxs)("li",{children:["✅ ",(0,n.jsx)("strong",{children:"需要自动内存管理"})," - 对象销毁时自动清理关联数据"]}),(0,n.jsxs)("li",{children:["✅ ",(0,n.jsx)("strong",{children:"需要私有数据存储"})," - 真正的私有属性"]}),(0,n.jsxs)("li",{children:["✅ ",(0,n.jsx)("strong",{children:"缓存对象相关的计算"})," - 自动清理不再使用的缓存"]})]}),(0,n.jsx)("h4",{style:{marginTop:24},children:"什么时候选择 Map？"}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:["✅ ",(0,n.jsx)("strong",{children:"需要遍历所有键值对"})," - 需要 keys(), values(), entries()"]}),(0,n.jsxs)("li",{children:["✅ ",(0,n.jsx)("strong",{children:"需要知道数量"})," - 需要 size 属性"]}),(0,n.jsxs)("li",{children:["✅ ",(0,n.jsx)("strong",{children:"键可以是原始类型"})," - 字符串、数字等"]}),(0,n.jsxs)("li",{children:["✅ ",(0,n.jsx)("strong",{children:"需要手动控制生命周期"})," - 明确清理时机"]})]})]})})]})}}}]);