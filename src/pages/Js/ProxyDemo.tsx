/**
 * @file src/pages/Js/ProxyDemo.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Divider,
  Tag,
  Alert,
  Input,
  InputNumber,
} from '@derbysoft/neat-design';
import './ProxyDemo.scss';

/**
 * ProxyDemo component - Demonstrates JavaScript Proxy usage and scenarios
 */
const ProxyDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [validationValue, setValidationValue] = useState('');
  const [ageValue, setAgeValue] = useState<number>(0);
  const [arrayIndex, setArrayIndex] = useState(-1);

  const addLog = (message: string) => {
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
    console.log(message);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Demo 1: Basic Proxy operations
  const demoBasicProxy = () => {
    clearLogs();
    const target = {
      name: 'Alice',
      age: 25,
    };

    const handler = {
      get(target: any, prop: string) {
        addLog(`📖 Getting property "${prop}"`);
        return target[prop];
      },
      set(target: any, prop: string, value: any) {
        addLog(`✏️ Setting property "${prop}" = ${value}`);
        target[prop] = value;
        return true;
      },
      has(target: any, prop: string) {
        addLog(`🔍 Checking if property "${prop}" exists`);
        return prop in target;
      },
      deleteProperty(target: any, prop: string) {
        addLog(`🗑️ Deleting property "${prop}"`);
        delete target[prop];
        return true;
      },
    };

    const proxy = new Proxy(target, handler);

    // Test operations
    addLog('--- Starting basic operations ---');
    const name = proxy.name;
    proxy.age = 26;
    const hasName = 'name' in proxy;
    delete proxy.age;
    addLog('--- Operations completed ---');
  };

  // Demo 2: Data validation
  const demoValidation = () => {
    clearLogs();

    const userHandler = {
      set(target: any, prop: string, value: any) {
        if (prop === 'age') {
          if (!Number.isInteger(value)) {
            addLog(`❌ Age must be an integer, got: ${value}`);
            throw new TypeError('Age must be an integer');
          }
          if (value < 0 || value > 150) {
            addLog(`❌ Age must be between 0 and 150, got: ${value}`);
            throw new RangeError('Age must be between 0 and 150');
          }
        }
        if (prop === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            addLog(`❌ Invalid email format: ${value}`);
            throw new TypeError('Invalid email format');
          }
        }
        addLog(`✅ Valid ${prop}: ${value}`);
        target[prop] = value;
        return true;
      },
    };

    const user = new Proxy({}, userHandler);

    try {
      addLog('--- Testing validation ---');
      user.age = ageValue;
      user.email = validationValue;
    } catch (error: any) {
      addLog(`⚠️ Caught error: ${error.message}`);
    }
  };

  // Demo 3: Negative array indices
  const demoNegativeIndices = () => {
    clearLogs();

    const arrayHandler = {
      get(target: any[], prop: string) {
        const index = Number(prop);
        if (index < 0) {
          const actualIndex = target.length + index;
          addLog(
            `📍 Negative index [${index}] → actual index [${actualIndex}]`
          );
          return target[actualIndex];
        }
        return target[prop];
      },
    };

    const arr = new Proxy(['a', 'b', 'c', 'd', 'e'], arrayHandler);

    addLog('--- Array: ["a", "b", "c", "d", "e"] ---');
    addLog(`arr[${arrayIndex}] = ${arr[arrayIndex]}`);
    addLog(`arr[-1] = ${arr[-1]} (last element)`);
    addLog(`arr[-2] = ${arr[-2]} (second to last)`);
  };

  // Demo 4: Observable pattern
  const demoObservable = () => {
    clearLogs();

    function createObservable(target: any, callback: Function) {
      return new Proxy(target, {
        set(target, prop, value) {
          const oldValue = target[prop];
          target[prop] = value;
          callback(prop, oldValue, value);
          return true;
        },
      });
    }

    const state = createObservable(
      { count: 0, name: 'Test' },
      (prop: string, oldValue: any, newValue: any) => {
        addLog(`🔔 Property "${prop}" changed: ${oldValue} → ${newValue}`);
      }
    );

    addLog('--- Testing observable pattern ---');
    state.count = 1;
    state.count = 2;
    state.name = 'Updated';
  };

  // Demo 5: Read-only object
  const demoReadOnly = () => {
    clearLogs();

    function createReadOnly<T extends object>(target: T): T {
      return new Proxy(target, {
        set() {
          addLog('❌ Cannot modify read-only object!');
          throw new Error('Cannot modify read-only object');
        },
        deleteProperty() {
          addLog('❌ Cannot delete from read-only object!');
          throw new Error('Cannot delete from read-only object');
        },
      });
    }

    const config = createReadOnly({
      apiUrl: 'https://api.example.com',
      timeout: 5000,
    });

    try {
      addLog('--- Testing read-only object ---');
      addLog(`✅ Reading config.apiUrl: ${config.apiUrl}`);
      addLog('❌ Attempting to modify config.timeout...');
      (config as any).timeout = 10000;
    } catch (error: any) {
      addLog(`⚠️ Caught error: ${error.message}`);
    }
  };

  // Demo 6: Function call tracking
  const demoFunctionTracking = () => {
    clearLogs();

    function createTrackedFunction(fn: Function, name: string) {
      return new Proxy(fn, {
        apply(target, thisArg, args) {
          addLog(
            `🎯 Calling function "${name}" with args: ${JSON.stringify(args)}`
          );
          const startTime = performance.now();
          const result = Reflect.apply(target, thisArg, args);
          const endTime = performance.now();
          addLog(
            `✅ Function "${name}" returned: ${result} (${(
              endTime - startTime
            ).toFixed(2)}ms)`
          );
          return result;
        },
      });
    }

    const add = createTrackedFunction((a: number, b: number) => a + b, 'add');
    const multiply = createTrackedFunction(
      (a: number, b: number) => a * b,
      'multiply'
    );

    addLog('--- Testing function tracking ---');
    add(5, 3);
    multiply(4, 7);
  };

  // Demo 7: Property access caching
  const demoCaching = () => {
    clearLogs();

    function createCachedObject(target: any) {
      const cache = new Map();
      return new Proxy(target, {
        get(target, prop) {
          if (cache.has(prop)) {
            addLog(`💾 Cache hit for "${String(prop)}"`);
            return cache.get(prop);
          }
          addLog(`❌ Cache miss for "${String(prop)}", computing...`);
          const value = target[prop];
          cache.set(prop, value);
          return value;
        },
      });
    }

    const expensiveObject = {
      get data() {
        // Simulate expensive computation
        return Math.random();
      },
    };

    const cached = createCachedObject(expensiveObject);

    addLog('--- Testing property caching ---');
    addLog(`First access: ${cached.data}`);
    addLog(`Second access: ${cached.data}`);
    addLog(`Third access: ${cached.data}`);
  };

  return (
    <div className="proxy-demo">
      <h2 className="proxy-demo__title">JavaScript Proxy 完全指南</h2>

      <Card title="Proxy 概述">
        <Alert
          message="核心概念"
          description={
            <div>
              <p>
                Proxy
                对象用于创建一个对象的代理，从而实现对基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
              </p>
              <ul>
                <li>
                  <strong>target：</strong>被代理的目标对象
                </li>
                <li>
                  <strong>handler：</strong>包含拦截器（traps）的对象
                </li>
                <li>
                  <strong>13 种拦截器：</strong>
                  get、set、has、deleteProperty、apply、construct 等
                </li>
                <li>
                  <strong>与 Reflect 配合：</strong>Reflect 提供默认行为的方法
                </li>
              </ul>
            </div>
          }
          type="info"
          showIcon
        />

        <div className="proxy-demo__code">
          {`// Proxy 基本语法
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
proxy.age = 31;   // Logs: Setting age = 31`}
        </div>
      </Card>

      <Card title="13 种 Proxy 拦截器" style={{ marginTop: 24 }}>
        <div className="proxy-demo__traps">
          <div className="proxy-demo__trap-item">
            <Tag color="blue">get(target, prop, receiver)</Tag>
            <p>拦截属性读取操作</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="green">set(target, prop, value, receiver)</Tag>
            <p>拦截属性设置操作</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="purple">has(target, prop)</Tag>
            <p>拦截 in 操作符</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="orange">deleteProperty(target, prop)</Tag>
            <p>拦截 delete 操作</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="cyan">apply(target, thisArg, args)</Tag>
            <p>拦截函数调用</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="red">construct(target, args, newTarget)</Tag>
            <p>拦截 new 操作符</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="magenta">getPrototypeOf(target)</Tag>
            <p>拦截 Object.getPrototypeOf()</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="gold">setPrototypeOf(target, proto)</Tag>
            <p>拦截 Object.setPrototypeOf()</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="lime">isExtensible(target)</Tag>
            <p>拦截 Object.isExtensible()</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="geekblue">preventExtensions(target)</Tag>
            <p>拦截 Object.preventExtensions()</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="volcano">getOwnPropertyDescriptor(target, prop)</Tag>
            <p>拦截 Object.getOwnPropertyDescriptor()</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="blue">defineProperty(target, prop, descriptor)</Tag>
            <p>拦截 Object.defineProperty()</p>
          </div>
          <div className="proxy-demo__trap-item">
            <Tag color="green">ownKeys(target)</Tag>
            <p>拦截 Object.keys() 等</p>
          </div>
        </div>
      </Card>

      <Card title="交互式演示" style={{ marginTop: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <h3>
              <Tag color="blue">Demo 1</Tag> 基本拦截操作
            </h3>
            <p className="proxy-demo__desc">
              演示 get、set、has、deleteProperty 拦截器
            </p>
            <Button type="primary" onClick={demoBasicProxy}>
              运行演示
            </Button>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="green">Demo 2</Tag> 数据验证
            </h3>
            <p className="proxy-demo__desc">使用 Proxy 实现自动数据验证</p>
            <Space>
              <span>Age:</span>
              <InputNumber
                min={-10}
                max={200}
                value={ageValue}
                onChange={(val) => setAgeValue(val as number)}
                style={{ width: 100 }}
              />
              <span>Email:</span>
              <Input
                value={validationValue}
                onChange={(e) => setValidationValue(e.target.value)}
                placeholder="test@example.com"
                style={{ width: 200 }}
              />
              <Button type="primary" onClick={demoValidation}>
                验证数据
              </Button>
            </Space>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="purple">Demo 3</Tag> 负索引数组
            </h3>
            <p className="proxy-demo__desc">实现 Python 风格的负索引访问数组</p>
            <Space>
              <span>Index:</span>
              <InputNumber
                min={-5}
                max={4}
                value={arrayIndex}
                onChange={(val) => setArrayIndex(val as number)}
                style={{ width: 100 }}
              />
              <Button type="primary" onClick={demoNegativeIndices}>
                访问数组元素
              </Button>
            </Space>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="orange">Demo 4</Tag> 观察者模式
            </h3>
            <p className="proxy-demo__desc">自动追踪对象属性变化</p>
            <Button type="primary" onClick={demoObservable}>
              运行演示
            </Button>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="cyan">Demo 5</Tag> 只读对象
            </h3>
            <p className="proxy-demo__desc">创建不可修改的对象</p>
            <Button type="primary" onClick={demoReadOnly}>
              运行演示
            </Button>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="red">Demo 6</Tag> 函数调用追踪
            </h3>
            <p className="proxy-demo__desc">追踪函数调用和执行时间</p>
            <Button type="primary" onClick={demoFunctionTracking}>
              运行演示
            </Button>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="magenta">Demo 7</Tag> 属性访问缓存
            </h3>
            <p className="proxy-demo__desc">缓存昂贵的属性计算结果</p>
            <Button type="primary" onClick={demoCaching}>
              运行演示
            </Button>
          </div>
        </Space>

        <Divider />

        <div className="proxy-demo__console">
          <div className="proxy-demo__console-header">
            <span>📋 控制台输出</span>
            <Button size="small" onClick={clearLogs}>
              清空
            </Button>
          </div>
          <div className="proxy-demo__console-content">
            {logs.length === 0 ? (
              <div className="proxy-demo__console-empty">
                运行上面的演示查看输出...
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="proxy-demo__console-line">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </Card>

      <Card title="实战使用场景" style={{ marginTop: 24 }}>
        <h3>1. 数据验证和约束</h3>
        <div className="proxy-demo__code">
          {`// 使用 Proxy 自动验证对象属性
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
user.age = -1;           // ❌ TypeError: Invalid value for "age"`}
        </div>

        <h3 style={{ marginTop: 24 }}>2. Vue 3 响应式系统</h3>
        <div className="proxy-demo__code">
          {`// Vue 3 使用 Proxy 实现响应式
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
// 当 state.count 改变时，自动更新依赖的组件`}
        </div>

        <h3 style={{ marginTop: 24 }}>3. 负索引数组访问</h3>
        <div className="proxy-demo__code">
          {`// Python 风格的负索引
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
console.log(arr[-2]);  // 4 (倒数第二个元素)`}
        </div>

        <h3 style={{ marginTop: 24 }}>4. 属性访问日志记录</h3>
        <div className="proxy-demo__code">
          {`// 记录对象的所有操作
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
// 所有操作都会被记录`}
        </div>

        <h3 style={{ marginTop: 24 }}>5. 默认值处理</h3>
        <div className="proxy-demo__code">
          {`// 为不存在的属性提供默认值
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
console.log(config.timeout);  // 5000 (from defaults)`}
        </div>

        <h3 style={{ marginTop: 24 }}>6. API Mock 和测试</h3>
        <div className="proxy-demo__code">
          {`// 模拟 API 对象
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
api.createPost(data);  // Calling API: createPost([object Object])`}
        </div>

        <h3 style={{ marginTop: 24 }}>7. 私有属性保护</h3>
        <div className="proxy-demo__code">
          {`// 隐藏以 _ 开头的私有属性
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
console.log(obj._private); // ❌ Error: Cannot access private property`}
        </div>

        <h3 style={{ marginTop: 24 }}>8. 单例模式</h3>
        <div className="proxy-demo__code">
          {`// 使用 Proxy 实现单例
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
console.log(db1 === db2);  // true`}
        </div>
      </Card>

      <Card title="Proxy vs Object.defineProperty" style={{ marginTop: 24 }}>
        <div className="proxy-demo__comparison">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>
                  <Tag color="blue">Object.defineProperty</Tag>
                </th>
                <th>
                  <Tag color="purple">Proxy</Tag>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>监听范围</td>
                <td>单个属性</td>
                <td>整个对象</td>
              </tr>
              <tr>
                <td>新增属性</td>
                <td>❌ 无法监听</td>
                <td>✅ 可以监听</td>
              </tr>
              <tr>
                <td>删除属性</td>
                <td>❌ 无法监听</td>
                <td>✅ 可以监听</td>
              </tr>
              <tr>
                <td>数组操作</td>
                <td>需要特殊处理</td>
                <td>原生支持</td>
              </tr>
              <tr>
                <td>性能</td>
                <td>较好</td>
                <td>稍慢</td>
              </tr>
              <tr>
                <td>浏览器支持</td>
                <td>IE9+</td>
                <td>现代浏览器</td>
              </tr>
              <tr>
                <td>拦截操作</td>
                <td>仅 get/set</td>
                <td>13 种拦截器</td>
              </tr>
              <tr>
                <td>使用场景</td>
                <td>Vue 2.x</td>
                <td>Vue 3.x</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="注意事项" style={{ marginTop: 24 }}>
        <Alert
          message="使用 Proxy 的注意事项"
          description={
            <ul>
              <li>
                <strong>性能考虑：</strong>Proxy 会增加额外开销，不适合高频操作
              </li>
              <li>
                <strong>浏览器兼容性：</strong>不支持 IE，无法完全 polyfill
              </li>
              <li>
                <strong>this 指向：</strong>注意拦截器中的 this
                指向问题，建议使用 Reflect
              </li>
              <li>
                <strong>内置对象：</strong>某些内置对象（如 Date）无法被代理
              </li>
              <li>
                <strong>相等性：</strong>proxy !==
                target，需要保持代理对象的引用
              </li>
              <li>
                <strong>递归代理：</strong>嵌套对象需要递归创建代理
              </li>
            </ul>
          }
          type="warning"
          showIcon
        />
      </Card>
    </div>
  );
};

export default ProxyDemo;
