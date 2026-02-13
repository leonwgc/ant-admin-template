"use strict";(self.webpackChunkneat_admin_template=self.webpackChunkneat_admin_template||[]).push([["2502"],{15398(e,t,n){n.d(t,{A:()=>m});var r,i=n(71500),l=n(46942),a=n.n(l),s=n(72422),o=n(2445);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var c=["className","alignment","size"];function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach(function(t){var r,i,l;r=e,i=t,l=n[t],(i=function(e){var t=function(e,t){if("object"!=d(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=d(r))return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==d(t)?t:String(t)}(i))in r?Object.defineProperty(r,i,{value:l,enumerable:!0,configurable:!0,writable:!0}):r[i]=l}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}let m=function(e){var t=e.className,n=e.alignment,l=e.size,d=function(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}(e,c),p=(0,s.Ay)()(function(e){var t,n,i=e.css,l=e.prefixCls,a=e.componentsToken.Divider;return i(r||(t=["\n            &.","-divider {\n                &.","-divider-horizontal {\n                    border-block-start-color: ",";\n                }\n\n                &.","-divider-vertical {\n                    border-inline-start-color: ",";\n                }\n\n                &.","-divider-large {\n                    &.","-divider-horizontal {\n                        border-block-start-width: 2px;\n                    }\n\n                    &.","-divider-vertical {\n                        border-inline-start-width: 2px;\n                    }\n                }\n            }\n        "],n||(n=t.slice(0)),r=Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(n)}}))),l,l,a["divider-color-border"],l,a["divider-color-border"],l,l,l)}),m=p.prefixCls,u=p.styles;return(0,o.Y)(i.A,g(g({},d),{},{className:a()("".concat(m,"-divider-").concat(void 0===l?"medium":l),u,t),plain:!0,type:void 0===n?"horizontal":n}))}},73720(e,t,n){n.r(t)},71500(e,t,n){n.d(t,{A:()=>y});var r=n(96540),i=n(46942),l=n.n(i),a=n(62279),s=n(829),o=n(53716),d=n(25905),c=n(37358),p=n(10224);let g=(0,c.OF)("Divider",e=>{let t=(0,p.mergeToken)(e,{dividerHorizontalWithTextGutterMargin:e.margin,sizePaddingEdgeHorizontal:0});return[(e=>{let{componentCls:t,sizePaddingEdgeHorizontal:n,colorSplit:r,lineWidth:i,textPaddingInline:l,orientationMargin:a,verticalMarginInline:s}=e;return{[t]:Object.assign(Object.assign({},(0,d.dF)(e)),{borderBlockStart:`${(0,o.unit)(i)} solid ${r}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:s,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${(0,o.unit)(i)} solid ${r}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${(0,o.unit)(e.marginLG)} 0`},[`&-horizontal${t}-with-text`]:{display:"flex",alignItems:"center",margin:`${(0,o.unit)(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${r}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${(0,o.unit)(i)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${t}-with-text-start`]:{"&::before":{width:`calc(${a} * 100%)`},"&::after":{width:`calc(100% - ${a} * 100%)`}},[`&-horizontal${t}-with-text-end`]:{"&::before":{width:`calc(100% - ${a} * 100%)`},"&::after":{width:`calc(${a} * 100%)`}},[`${t}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:l},"&-dashed":{background:"none",borderColor:r,borderStyle:"dashed",borderWidth:`${(0,o.unit)(i)} 0 0`},[`&-horizontal${t}-with-text${t}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${t}-dashed`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:r,borderStyle:"dotted",borderWidth:`${(0,o.unit)(i)} 0 0`},[`&-horizontal${t}-with-text${t}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${t}-dotted`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${t}-with-text`]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},[`&-horizontal${t}-with-text-start${t}-no-default-orientation-margin-start`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${t}-inner-text`]:{paddingInlineStart:n}},[`&-horizontal${t}-with-text-end${t}-no-default-orientation-margin-end`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${t}-inner-text`]:{paddingInlineEnd:n}}})}})(t),(e=>{let{componentCls:t}=e;return{[t]:{"&-horizontal":{[`&${t}`]:{"&-sm":{marginBlock:e.marginXS},"&-md":{marginBlock:e.margin}}}}}})(t)]},e=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:e.marginXS}),{unitless:{orientationMargin:!0}});var m=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)0>t.indexOf(r[i])&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};let u={small:"sm",middle:"md"},y=e=>{let{getPrefixCls:t,direction:n,className:i,style:o}=(0,a.TP)("divider"),{prefixCls:d,type:c="horizontal",orientation:p="center",orientationMargin:y,className:h,rootClassName:f,children:b,dashed:x,variant:v="solid",plain:j,style:T,size:P}=e,w=m(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style","size"]),A=t("divider",d),[k,S,E]=g(A),$=u[(0,s.A)(P)],C=!!b,O=r.useMemo(()=>"left"===p?"rtl"===n?"end":"start":"right"===p?"rtl"===n?"start":"end":p,[n,p]),z="start"===O&&null!=y,U="end"===O&&null!=y,N=l()(A,i,S,E,`${A}-${c}`,{[`${A}-with-text`]:C,[`${A}-with-text-${O}`]:C,[`${A}-dashed`]:!!x,[`${A}-${v}`]:"solid"!==v,[`${A}-plain`]:!!j,[`${A}-rtl`]:"rtl"===n,[`${A}-no-default-orientation-margin-start`]:z,[`${A}-no-default-orientation-margin-end`]:U,[`${A}-${$}`]:!!$},h,f),L=r.useMemo(()=>"number"==typeof y?y:/^\d+$/.test(y)?Number(y):y,[y]);return k(r.createElement("div",Object.assign({className:N,style:Object.assign(Object.assign({},o),T)},w,{role:"separator"}),b&&"vertical"!==c&&r.createElement("span",{className:`${A}-inner-text`,style:{marginInlineStart:z?L:void 0,marginInlineEnd:U?L:void 0}},b)))}},29029(e,t,n){n.r(t),n.d(t,{default:()=>m});var r=n(74848);n(96540);var i=n(12229),l=n(15398),a=n(40244),s=n(16629),o=n(99373),d=n(16772);n(73720);let{Title:c,Paragraph:p}=i.A,g=e=>{let{code:t,title:n}=e;return(0,r.jsxs)("div",{className:"ts-types__code-block",children:[n&&(0,r.jsx)("div",{className:"ts-types__code-title",children:n}),(0,r.jsx)("pre",{className:"ts-types__code",children:(0,r.jsx)("code",{children:t})})]})},m=()=>{let e=[{key:"generics",label:"泛型 Generics",children:(0,r.jsxs)("div",{className:"ts-types__section",children:[(0,r.jsx)(c,{level:4,children:"泛型基础"}),(0,r.jsx)(p,{children:"泛型允许我们创建可重用的组件，使组件可以支持多种类型而不是单一类型。"}),(0,r.jsx)(g,{title:"基础泛型函数",code:`// 泛型函数 - 保持类型信息
function identity<T>(arg: T): T {
  return arg;
}

// 使用方式
const num = identity<number>(42);      // 显式指定类型
const str = identity('hello');         // 类型推断

// 泛型接口
interface GenericResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 使用泛型接口
const userResponse: GenericResponse<User> = {
  data: { id: 1, name: 'Alice' },
  status: 200,
  message: 'success'
};`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"泛型约束"}),(0,r.jsx)(g,{title:"使用 extends 约束泛型",code:`// 约束泛型必须包含 length 属性
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // 现在可以安全访问 length
  return arg;
}

logLength('hello');        // ✅ 字符串有 length
logLength([1, 2, 3]);      // ✅ 数组有 length
logLength({ length: 10 }); // ✅ 对象有 length 属性
// logLength(123);         // ❌ 数字没有 length`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"泛型工具类型"}),(0,r.jsx)(g,{title:"常用泛型工具",code:`// keyof - 获取对象所有键的联合类型
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'Alice', age: 25 };
const name = getProperty(person, 'name');  // string
const age = getProperty(person, 'age');    // number

// 泛型类
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const numContainer = new Container<number>(42);
const strContainer = new Container<string>('hello');`})]})},{key:"conditional",label:"条件类型",children:(0,r.jsxs)("div",{className:"ts-types__section",children:[(0,r.jsx)(c,{level:4,children:"条件类型基础"}),(0,r.jsx)(p,{children:"条件类型根据条件表达式选择两种可能类型中的一种，语法类似三元运算符。"}),(0,r.jsx)(g,{title:"基础条件类型",code:`// 基础语法: T extends U ? X : Y
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;   // 'yes'
type B = IsString<number>;   // 'no'

// 实用示例：提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function fetchUser() {
  return { id: 1, name: 'Alice' };
}

type UserType = ReturnType<typeof fetchUser>;
// { id: number; name: string; }`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"分布式条件类型"}),(0,r.jsx)(a.A,{type:"info",message:"当条件类型作用于联合类型时，会自动分布到联合类型的每个成员",style:{marginBottom:16}}),(0,r.jsx)(g,{title:"分布式条件类型示例",code:`// 分布式行为
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// string[] | number[]  (不是 (string | number)[])

// 利用分布式特性过滤类型
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | null | undefined>;
// string

// 提取联合类型中的特定类型
type ExtractString<T> = T extends string ? T : never;

type Strings = ExtractString<'a' | 1 | 'b' | 2>;
// 'a' | 'b'`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"infer 关键字"}),(0,r.jsx)(g,{title:"使用 infer 推断类型",code:`// infer 用于在条件类型中推断类型变量
type GetArrayElement<T> = T extends (infer U)[] ? U : never;

type Elem = GetArrayElement<string[]>;  // string
type Elem2 = GetArrayElement<[1, 2, 3]>; // 1 | 2 | 3

// 提取函数参数类型
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function greet(name: string, age: number) {}
type GreetParams = Parameters<typeof greet>;  // [string, number]

// 提取 Promise 内部类型
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type ResolvedType = Awaited<Promise<Promise<string>>>;  // string`})]})},{key:"mapped",label:"映射类型",children:(0,r.jsxs)("div",{className:"ts-types__section",children:[(0,r.jsx)(c,{level:4,children:"映射类型基础"}),(0,r.jsx)(p,{children:"映射类型允许基于旧类型创建新类型，通过遍历键来转换属性。"}),(0,r.jsx)(g,{title:"基础映射类型",code:`// 基础语法
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 使用示例
interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"映射修饰符"}),(0,r.jsx)(g,{title:"添加和移除修饰符",code:`// 使用 + 和 - 修饰符
type Required<T> = {
  [P in keyof T]-?: T[P];  // 移除可选性
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];  // 移除 readonly
};

// 组合使用
type Concrete<T> = {
  -readonly [P in keyof T]-?: T[P];  // 移除 readonly 和可选
};

interface Config {
  readonly host?: string;
  readonly port?: number;
}

type MutableConfig = Mutable<Config>;
// { host?: string; port?: number; }`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"键重映射 (as 子句)"}),(0,r.jsx)(g,{title:"使用 as 重映射键",code:`// TypeScript 4.1+ 支持键重映射
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }

// 过滤键
type RemoveKind<T> = {
  [K in keyof T as Exclude<K, 'kind'>]: T[K];
};

interface Circle {
  kind: 'circle';
  radius: number;
}

type CircleWithoutKind = RemoveKind<Circle>;
// { radius: number; }`})]})},{key:"utility",label:"内置工具类型",children:(0,r.jsxs)("div",{className:"ts-types__section",children:[(0,r.jsx)(c,{level:4,children:"常用内置类型"}),(0,r.jsxs)("div",{className:"ts-types__utility-grid",children:[(0,r.jsx)(s.A,{size:"small",title:(0,r.jsx)(o.A,{color:"blue",children:"Partial<T>"}),children:(0,r.jsx)(g,{code:`// 将所有属性变为可选
interface User { id: number; name: string; }
type PartialUser = Partial<User>;
// { id?: number; name?: string; }`})}),(0,r.jsx)(s.A,{size:"small",title:(0,r.jsx)(o.A,{color:"blue",children:"Required<T>"}),children:(0,r.jsx)(g,{code:`// 将所有属性变为必需
interface Config { host?: string; port?: number; }
type RequiredConfig = Required<Config>;
// { host: string; port: number; }`})}),(0,r.jsx)(s.A,{size:"small",title:(0,r.jsx)(o.A,{color:"blue",children:"Pick<T, K>"}),children:(0,r.jsx)(g,{code:`// 从 T 中选取指定属性
interface User { id: number; name: string; email: string; }
type UserBasic = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }`})}),(0,r.jsx)(s.A,{size:"small",title:(0,r.jsx)(o.A,{color:"blue",children:"Omit<T, K>"}),children:(0,r.jsx)(g,{code:`// 从 T 中排除指定属性
interface User { id: number; name: string; password: string; }
type SafeUser = Omit<User, 'password'>;
// { id: number; name: string; }`})}),(0,r.jsx)(s.A,{size:"small",title:(0,r.jsx)(o.A,{color:"blue",children:"Record<K, T>"}),children:(0,r.jsx)(g,{code:`// 创建键值对类型
type PageInfo = { title: string; };
type Page = 'home' | 'about' | 'contact';
type Pages = Record<Page, PageInfo>;
// { home: PageInfo; about: PageInfo; contact: PageInfo; }`})}),(0,r.jsx)(s.A,{size:"small",title:(0,r.jsx)(o.A,{color:"blue",children:"Exclude<T, U>"}),children:(0,r.jsx)(g,{code:`// 从联合类型 T 中排除可赋值给 U 的类型
type T = 'a' | 'b' | 'c';
type Result = Exclude<T, 'a'>;
// 'b' | 'c'`})}),(0,r.jsx)(s.A,{size:"small",title:(0,r.jsx)(o.A,{color:"blue",children:"Extract<T, U>"}),children:(0,r.jsx)(g,{code:`// 从联合类型 T 中提取可赋值给 U 的类型
type T = 'a' | 'b' | 'c';
type Result = Extract<T, 'a' | 'b'>;
// 'a' | 'b'`})}),(0,r.jsx)(s.A,{size:"small",title:(0,r.jsx)(o.A,{color:"blue",children:"ReturnType<T>"}),children:(0,r.jsx)(g,{code:`// 获取函数返回类型
function getUser() { return { id: 1, name: 'Alice' }; }
type User = ReturnType<typeof getUser>;
// { id: number; name: string; }`})})]})]})},{key:"template-literal",label:"模板字面量类型",children:(0,r.jsxs)("div",{className:"ts-types__section",children:[(0,r.jsx)(c,{level:4,children:"模板字面量类型"}),(0,r.jsx)(p,{children:"TypeScript 4.1 引入了模板字面量类型，允许在类型系统中使用字符串模板。"}),(0,r.jsx)(g,{title:"基础用法",code:`// 基础模板字面量
type World = 'world';
type Greeting = \`hello \${World}\`;  // 'hello world'

// 联合类型的分布
type Color = 'red' | 'blue';
type Size = 'small' | 'large';
type Style = \`\${Size}-\${Color}\`;
// 'small-red' | 'small-blue' | 'large-red' | 'large-blue'`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"内置字符串操作类型"}),(0,r.jsx)(g,{title:"字符串操作类型",code:`// Uppercase - 转大写
type Loud = Uppercase<'hello'>;  // 'HELLO'

// Lowercase - 转小写
type Quiet = Lowercase<'HELLO'>;  // 'hello'

// Capitalize - 首字母大写
type Cap = Capitalize<'hello'>;  // 'Hello'

// Uncapitalize - 首字母小写
type Uncap = Uncapitalize<'Hello'>;  // 'hello'

// 组合使用
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>;  // 'onClick'
type HoverEvent = EventName<'hover'>;  // 'onHover'`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"实际应用场景"}),(0,r.jsx)(g,{title:"类型安全的事件系统",code:`// 基于属性名生成事件处理器类型
type PropEventSource<T> = {
  on<K extends string & keyof T>(
    eventName: \`\${K}Changed\`,
    callback: (newValue: T[K]) => void
  ): void;
};

interface Person {
  name: string;
  age: number;
}

declare const person: PropEventSource<Person>;

person.on('nameChanged', (newName) => {
  // newName: string
  console.log(newName.toUpperCase());
});

person.on('ageChanged', (newAge) => {
  // newAge: number
  console.log(newAge.toFixed(2));
});

// person.on('emailChanged', () => {}); // ❌ 错误`})]})},{key:"type-guards",label:"类型守卫",children:(0,r.jsxs)("div",{className:"ts-types__section",children:[(0,r.jsx)(c,{level:4,children:"类型守卫"}),(0,r.jsx)(p,{children:"类型守卫是运行时检查，用于缩窄类型范围，使 TypeScript 能够推断更具体的类型。"}),(0,r.jsx)(g,{title:"typeof 类型守卫",code:`function padLeft(value: string, padding: string | number) {
  // typeof 类型守卫
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value;  // padding: number
  }
  return padding + value;  // padding: string
}`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"instanceof 类型守卫"}),(0,r.jsx)(g,{title:"instanceof 示例",code:`class Dog {
  bark() { console.log('Woof!'); }
}

class Cat {
  meow() { console.log('Meow!'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();  // animal: Dog
  } else {
    animal.meow();  // animal: Cat
  }
}`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"自定义类型守卫"}),(0,r.jsx)(g,{title:"使用 is 关键字",code:`interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

// 自定义类型守卫函数
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();  // pet: Fish
  } else {
    pet.fly();   // pet: Bird
  }
}

// 使用 in 操作符
function move2(pet: Fish | Bird) {
  if ('swim' in pet) {
    pet.swim();  // pet: Fish
  } else {
    pet.fly();   // pet: Bird
  }
}`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"可辨识联合类型"}),(0,r.jsx)(g,{title:"使用 kind 字段辨识",code:`interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

interface Triangle {
  kind: 'triangle';
  base: number;
  height: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      // exhaustive check - 确保处理所有情况
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}`})]})},{key:"advanced-patterns",label:"高级模式",children:(0,r.jsxs)("div",{className:"ts-types__section",children:[(0,r.jsx)(c,{level:4,children:"类型递归"}),(0,r.jsx)(g,{title:"递归类型定义",code:`// 深度 Partial
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

interface NestedConfig {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
}

type PartialConfig = DeepPartial<NestedConfig>;
// 所有嵌套属性都变为可选

// 深度 Readonly
type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"类型体操：元组操作"}),(0,r.jsx)(g,{title:"元组类型操作",code:`// 获取元组第一个元素
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;

type A = First<[1, 2, 3]>;  // 1

// 获取元组最后一个元素
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

type B = Last<[1, 2, 3]>;  // 3

// 移除第一个元素
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;

type C = Tail<[1, 2, 3]>;  // [2, 3]

// 添加元素到开头
type Unshift<T extends any[], E> = [E, ...T];

type D = Unshift<[2, 3], 1>;  // [1, 2, 3]`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"函数重载与类型推断"}),(0,r.jsx)(g,{title:"函数重载",code:`// 函数重载
function createElement(tag: 'div'): HTMLDivElement;
function createElement(tag: 'span'): HTMLSpanElement;
function createElement(tag: 'canvas'): HTMLCanvasElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const div = createElement('div');    // HTMLDivElement
const span = createElement('span');  // HTMLSpanElement

// 使用泛型实现类似效果
type TagMap = {
  div: HTMLDivElement;
  span: HTMLSpanElement;
  canvas: HTMLCanvasElement;
};

function createElement2<K extends keyof TagMap>(tag: K): TagMap[K] {
  return document.createElement(tag) as TagMap[K];
}`}),(0,r.jsx)(l.A,{}),(0,r.jsx)(c,{level:4,children:"声明合并"}),(0,r.jsx)(g,{title:"接口合并与模块扩展",code:`// 接口合并
interface User {
  name: string;
}

interface User {
  age: number;
}

// 合并后: { name: string; age: number; }

// 模块扩展
declare module 'express' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

// 全局扩展
declare global {
  interface Window {
    myApp: {
      version: string;
      init: () => void;
    };
  }
}`})]})}];return(0,r.jsxs)("div",{className:"ts-types",children:[(0,r.jsxs)(i.A,{children:[(0,r.jsx)(c,{level:3,children:"TypeScript 高级类型完全指南"}),(0,r.jsx)(p,{children:"本文档详细介绍 TypeScript 中的高级类型系统，帮助你掌握类型体操的核心技能。 通过这些高级类型特性，你可以编写更加类型安全、可维护的代码。"}),(0,r.jsxs)("div",{className:"ts-types__tags",children:[(0,r.jsx)(o.A,{color:"blue",children:"泛型"}),(0,r.jsx)(o.A,{color:"green",children:"条件类型"}),(0,r.jsx)(o.A,{color:"orange",children:"映射类型"}),(0,r.jsx)(o.A,{color:"purple",children:"模板字面量"}),(0,r.jsx)(o.A,{color:"cyan",children:"类型守卫"}),(0,r.jsx)(o.A,{color:"red",children:"高级模式"})]})]}),(0,r.jsx)(l.A,{}),(0,r.jsx)(d.A,{items:e,className:"ts-types__tabs"})]})}}}]);