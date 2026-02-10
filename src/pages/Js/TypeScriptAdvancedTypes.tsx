/**
 * @file src/pages/Js/TypeScriptAdvancedTypes.tsx
 * @author leon.wang
 */

import React from 'react';
import {
  Card,
  Tabs,
  Typography,
  Alert,
  Divider,
  Tag,
} from '@derbysoft/neat-design';
import './TypeScriptAdvancedTypes.scss';

const { Title, Paragraph } = Typography;

/**
 * Code block component for displaying TypeScript code examples
 */
const CodeBlock: React.FC<{ code: string; title?: string }> = ({
  code,
  title,
}) => (
  <div className="ts-types__code-block">
    {title && <div className="ts-types__code-title">{title}</div>}
    <pre className="ts-types__code">
      <code>{code}</code>
    </pre>
  </div>
);

/**
 * TypeScript Advanced Types Documentation Page
 * Demonstrates various advanced TypeScript type features with examples
 */
const TypeScriptAdvancedTypes: React.FC = () => {
  const tabItems = [
    {
      key: 'generics',
      label: '泛型 Generics',
      children: (
        <div className="ts-types__section">
          <Title level={4}>泛型基础</Title>
          <Paragraph>
            泛型允许我们创建可重用的组件，使组件可以支持多种类型而不是单一类型。
          </Paragraph>

          <CodeBlock
            title="基础泛型函数"
            code={`// 泛型函数 - 保持类型信息
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
};`}
          />

          <Divider />

          <Title level={4}>泛型约束</Title>
          <CodeBlock
            title="使用 extends 约束泛型"
            code={`// 约束泛型必须包含 length 属性
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
// logLength(123);         // ❌ 数字没有 length`}
          />

          <Divider />

          <Title level={4}>泛型工具类型</Title>
          <CodeBlock
            title="常用泛型工具"
            code={`// keyof - 获取对象所有键的联合类型
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
const strContainer = new Container<string>('hello');`}
          />
        </div>
      ),
    },
    {
      key: 'conditional',
      label: '条件类型',
      children: (
        <div className="ts-types__section">
          <Title level={4}>条件类型基础</Title>
          <Paragraph>
            条件类型根据条件表达式选择两种可能类型中的一种，语法类似三元运算符。
          </Paragraph>

          <CodeBlock
            title="基础条件类型"
            code={`// 基础语法: T extends U ? X : Y
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;   // 'yes'
type B = IsString<number>;   // 'no'

// 实用示例：提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function fetchUser() {
  return { id: 1, name: 'Alice' };
}

type UserType = ReturnType<typeof fetchUser>;
// { id: number; name: string; }`}
          />

          <Divider />

          <Title level={4}>分布式条件类型</Title>
          <Alert
            type="info"
            message="当条件类型作用于联合类型时，会自动分布到联合类型的每个成员"
            style={{ marginBottom: 16 }}
          />

          <CodeBlock
            title="分布式条件类型示例"
            code={`// 分布式行为
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
// 'a' | 'b'`}
          />

          <Divider />

          <Title level={4}>infer 关键字</Title>
          <CodeBlock
            title="使用 infer 推断类型"
            code={`// infer 用于在条件类型中推断类型变量
type GetArrayElement<T> = T extends (infer U)[] ? U : never;

type Elem = GetArrayElement<string[]>;  // string
type Elem2 = GetArrayElement<[1, 2, 3]>; // 1 | 2 | 3

// 提取函数参数类型
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function greet(name: string, age: number) {}
type GreetParams = Parameters<typeof greet>;  // [string, number]

// 提取 Promise 内部类型
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type ResolvedType = Awaited<Promise<Promise<string>>>;  // string`}
          />
        </div>
      ),
    },
    {
      key: 'mapped',
      label: '映射类型',
      children: (
        <div className="ts-types__section">
          <Title level={4}>映射类型基础</Title>
          <Paragraph>
            映射类型允许基于旧类型创建新类型，通过遍历键来转换属性。
          </Paragraph>

          <CodeBlock
            title="基础映射类型"
            code={`// 基础语法
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
// { id?: number; name?: string; email?: string; }`}
          />

          <Divider />

          <Title level={4}>映射修饰符</Title>
          <CodeBlock
            title="添加和移除修饰符"
            code={`// 使用 + 和 - 修饰符
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
// { host?: string; port?: number; }`}
          />

          <Divider />

          <Title level={4}>键重映射 (as 子句)</Title>
          <CodeBlock
            title="使用 as 重映射键"
            code={`// TypeScript 4.1+ 支持键重映射
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
// { radius: number; }`}
          />
        </div>
      ),
    },
    {
      key: 'utility',
      label: '内置工具类型',
      children: (
        <div className="ts-types__section">
          <Title level={4}>常用内置类型</Title>

          <div className="ts-types__utility-grid">
            <Card size="small" title={<Tag color="blue">Partial&lt;T&gt;</Tag>}>
              <CodeBlock
                code={`// 将所有属性变为可选
interface User { id: number; name: string; }
type PartialUser = Partial<User>;
// { id?: number; name?: string; }`}
              />
            </Card>

            <Card
              size="small"
              title={<Tag color="blue">Required&lt;T&gt;</Tag>}
            >
              <CodeBlock
                code={`// 将所有属性变为必需
interface Config { host?: string; port?: number; }
type RequiredConfig = Required<Config>;
// { host: string; port: number; }`}
              />
            </Card>

            <Card size="small" title={<Tag color="blue">Pick&lt;T, K&gt;</Tag>}>
              <CodeBlock
                code={`// 从 T 中选取指定属性
interface User { id: number; name: string; email: string; }
type UserBasic = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }`}
              />
            </Card>

            <Card size="small" title={<Tag color="blue">Omit&lt;T, K&gt;</Tag>}>
              <CodeBlock
                code={`// 从 T 中排除指定属性
interface User { id: number; name: string; password: string; }
type SafeUser = Omit<User, 'password'>;
// { id: number; name: string; }`}
              />
            </Card>

            <Card
              size="small"
              title={<Tag color="blue">Record&lt;K, T&gt;</Tag>}
            >
              <CodeBlock
                code={`// 创建键值对类型
type PageInfo = { title: string; };
type Page = 'home' | 'about' | 'contact';
type Pages = Record<Page, PageInfo>;
// { home: PageInfo; about: PageInfo; contact: PageInfo; }`}
              />
            </Card>

            <Card
              size="small"
              title={<Tag color="blue">Exclude&lt;T, U&gt;</Tag>}
            >
              <CodeBlock
                code={`// 从联合类型 T 中排除可赋值给 U 的类型
type T = 'a' | 'b' | 'c';
type Result = Exclude<T, 'a'>;
// 'b' | 'c'`}
              />
            </Card>

            <Card
              size="small"
              title={<Tag color="blue">Extract&lt;T, U&gt;</Tag>}
            >
              <CodeBlock
                code={`// 从联合类型 T 中提取可赋值给 U 的类型
type T = 'a' | 'b' | 'c';
type Result = Extract<T, 'a' | 'b'>;
// 'a' | 'b'`}
              />
            </Card>

            <Card
              size="small"
              title={<Tag color="blue">ReturnType&lt;T&gt;</Tag>}
            >
              <CodeBlock
                code={`// 获取函数返回类型
function getUser() { return { id: 1, name: 'Alice' }; }
type User = ReturnType<typeof getUser>;
// { id: number; name: string; }`}
              />
            </Card>
          </div>
        </div>
      ),
    },
    {
      key: 'template-literal',
      label: '模板字面量类型',
      children: (
        <div className="ts-types__section">
          <Title level={4}>模板字面量类型</Title>
          <Paragraph>
            TypeScript 4.1
            引入了模板字面量类型，允许在类型系统中使用字符串模板。
          </Paragraph>

          <CodeBlock
            title="基础用法"
            code={`// 基础模板字面量
type World = 'world';
type Greeting = \`hello \${World}\`;  // 'hello world'

// 联合类型的分布
type Color = 'red' | 'blue';
type Size = 'small' | 'large';
type Style = \`\${Size}-\${Color}\`;
// 'small-red' | 'small-blue' | 'large-red' | 'large-blue'`}
          />

          <Divider />

          <Title level={4}>内置字符串操作类型</Title>
          <CodeBlock
            title="字符串操作类型"
            code={`// Uppercase - 转大写
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
type HoverEvent = EventName<'hover'>;  // 'onHover'`}
          />

          <Divider />

          <Title level={4}>实际应用场景</Title>
          <CodeBlock
            title="类型安全的事件系统"
            code={`// 基于属性名生成事件处理器类型
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

// person.on('emailChanged', () => {}); // ❌ 错误`}
          />
        </div>
      ),
    },
    {
      key: 'type-guards',
      label: '类型守卫',
      children: (
        <div className="ts-types__section">
          <Title level={4}>类型守卫</Title>
          <Paragraph>
            类型守卫是运行时检查，用于缩窄类型范围，使 TypeScript
            能够推断更具体的类型。
          </Paragraph>

          <CodeBlock
            title="typeof 类型守卫"
            code={`function padLeft(value: string, padding: string | number) {
  // typeof 类型守卫
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value;  // padding: number
  }
  return padding + value;  // padding: string
}`}
          />

          <Divider />

          <Title level={4}>instanceof 类型守卫</Title>
          <CodeBlock
            title="instanceof 示例"
            code={`class Dog {
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
}`}
          />

          <Divider />

          <Title level={4}>自定义类型守卫</Title>
          <CodeBlock
            title="使用 is 关键字"
            code={`interface Fish {
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
}`}
          />

          <Divider />

          <Title level={4}>可辨识联合类型</Title>
          <CodeBlock
            title="使用 kind 字段辨识"
            code={`interface Circle {
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
}`}
          />
        </div>
      ),
    },
    {
      key: 'advanced-patterns',
      label: '高级模式',
      children: (
        <div className="ts-types__section">
          <Title level={4}>类型递归</Title>
          <CodeBlock
            title="递归类型定义"
            code={`// 深度 Partial
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
  : T;`}
          />

          <Divider />

          <Title level={4}>类型体操：元组操作</Title>
          <CodeBlock
            title="元组类型操作"
            code={`// 获取元组第一个元素
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

type D = Unshift<[2, 3], 1>;  // [1, 2, 3]`}
          />

          <Divider />

          <Title level={4}>函数重载与类型推断</Title>
          <CodeBlock
            title="函数重载"
            code={`// 函数重载
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
}`}
          />

          <Divider />

          <Title level={4}>声明合并</Title>
          <CodeBlock
            title="接口合并与模块扩展"
            code={`// 接口合并
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
}`}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="ts-types">
      <Typography>
        <Title level={3}>TypeScript 高级类型完全指南</Title>
        <Paragraph>
          本文档详细介绍 TypeScript
          中的高级类型系统，帮助你掌握类型体操的核心技能。
          通过这些高级类型特性，你可以编写更加类型安全、可维护的代码。
        </Paragraph>
        <div className="ts-types__tags">
          <Tag color="blue">泛型</Tag>
          <Tag color="green">条件类型</Tag>
          <Tag color="orange">映射类型</Tag>
          <Tag color="purple">模板字面量</Tag>
          <Tag color="cyan">类型守卫</Tag>
          <Tag color="red">高级模式</Tag>
        </div>
      </Typography>

      <Divider />

      <Tabs items={tabItems} className="ts-types__tabs" />
    </div>
  );
};

export default TypeScriptAdvancedTypes;
