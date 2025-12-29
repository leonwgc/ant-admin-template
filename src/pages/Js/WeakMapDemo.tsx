/**
 * @file src/pages/Js/WeakMapDemo.tsx
 * @author leon.wang
 */

import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Space, Divider, Tag, Alert } from '@derbysoft/neat-design';
import './WeakMapDemo.scss';

/**
 * WeakMapDemo component - Demonstrates WeakMap usage and scenarios
 */
const WeakMapDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0 });
  const weakMapRef = useRef<WeakMap<object, string>>(new WeakMap());
  const cacheRef = useRef<WeakMap<object, any>>(new WeakMap());

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Demo 1: Basic WeakMap operations
  const demoBasicOperations = () => {
    clearLogs();
    const wm = new WeakMap();
    const obj1 = { id: 1, name: 'Object 1' };
    const obj2 = { id: 2, name: 'Object 2' };

    // Set values
    wm.set(obj1, 'Data for object 1');
    wm.set(obj2, 'Data for object 2');
    addLog('✅ Set data for obj1 and obj2');

    // Get values
    addLog(`📖 Get obj1: ${wm.get(obj1)}`);
    addLog(`📖 Get obj2: ${wm.get(obj2)}`);

    // Has check
    addLog(`🔍 Has obj1: ${wm.has(obj1)}`);

    // Delete
    wm.delete(obj1);
    addLog('🗑️ Deleted obj1');
    addLog(`🔍 Has obj1 after delete: ${wm.has(obj1)}`);
  };

  // Demo 2: Weak reference - memory management
  const demoWeakReference = () => {
    clearLogs();
    addLog('🧪 Testing weak reference...');

    const wm = new WeakMap();
    let tempObj: any = { name: 'Temporary Object' };

    wm.set(tempObj, 'This data will be GC when tempObj is null');
    addLog('✅ Set data for tempObj');
    addLog(`📖 Has tempObj: ${wm.has(tempObj)}`);

    // Simulate object going out of scope
    addLog('⚠️ Setting tempObj to null...');
    tempObj = null;
    addLog('💡 tempObj is now null, the WeakMap entry will be garbage collected');
    addLog('💡 WeakMap does not prevent garbage collection!');
  };

  // Demo 3: Private data storage
  const demoPrivateData = () => {
    clearLogs();
    addLog('🔒 Demonstrating private data storage pattern...');

    const privateData = new WeakMap();

    class User {
      constructor(name: string, password: string) {
        privateData.set(this, { name, password });
        addLog(`✅ Created user with private data`);
      }

      getName() {
        return privateData.get(this)?.name;
      }

      getPassword() {
        return privateData.get(this)?.password;
      }

      verifyPassword(input: string) {
        return privateData.get(this)?.password === input;
      }
    }

    const user = new User('Alice', 'secret123');
    addLog(`📖 User name: ${user.getName()}`);
    addLog(`🔐 Password verification (secret123): ${user.verifyPassword('secret123')}`);
    addLog(`🔐 Password verification (wrong): ${user.verifyPassword('wrong')}`);
    addLog('💡 Password is not accessible as a property!');
    addLog(`💡 user.password = ${(user as any).password}`);
  };

  // Demo 4: DOM node metadata
  const domNodesRef = useRef<HTMLDivElement[]>([]);
  const domMetadataRef = useRef<WeakMap<HTMLElement, any>>(new WeakMap());

  const demoDOM = () => {
    clearLogs();
    addLog('🌐 Demonstrating DOM node metadata storage...');

    const metadata = domMetadataRef.current;

    domNodesRef.current.forEach((node, index) => {
      if (node) {
        metadata.set(node, {
          clicks: 0,
          created: new Date(),
          index,
        });
        addLog(`✅ Added metadata for node ${index}`);
      }
    });

    addLog('💡 Metadata is stored without modifying DOM elements');
    addLog('💡 When DOM elements are removed, metadata is auto-cleaned by GC');
  };

  const handleNodeClick = (node: HTMLDivElement | null) => {
    if (!node) return;
    const metadata = domMetadataRef.current;
    const data = metadata.get(node);
    if (data) {
      data.clicks++;
      metadata.set(node, data);
      addLog(`🖱️ Node clicked ${data.clicks} times`);
    }
  };

  // Demo 5: Caching computed results
  const expensiveComputation = (obj: object): string => {
    // Simulate expensive operation
    const result = `Computed-${Math.random().toString(36).substr(2, 9)}`;
    return result;
  };

  const demoCache = () => {
    clearLogs();
    const cache = cacheRef.current;
    const obj1 = { id: 'test-1' };
    const obj2 = { id: 'test-2' };

    addLog('🚀 Testing cache with WeakMap...');

    // First call - cache miss
    if (!cache.has(obj1)) {
      const result = expensiveComputation(obj1);
      cache.set(obj1, result);
      setCacheStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
      addLog(`❌ Cache miss for obj1, computed: ${result}`);
    }

    // Second call - cache hit
    if (cache.has(obj1)) {
      const cached = cache.get(obj1);
      setCacheStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
      addLog(`✅ Cache hit for obj1, returned: ${cached}`);
    }

    // Different object - cache miss
    if (!cache.has(obj2)) {
      const result = expensiveComputation(obj2);
      cache.set(obj2, result);
      setCacheStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
      addLog(`❌ Cache miss for obj2, computed: ${result}`);
    }

    addLog('💡 WeakMap ensures cache is cleaned when objects are GC');
  };

  return (
    <div className="weakmap-demo">
      <h2 className="weakmap-demo__title">JavaScript WeakMap 完全指南</h2>

      <Card title="WeakMap 概述">
        <Alert
          message="核心特性"
          description={
            <div>
              <p>WeakMap 是一种特殊的 Map，其键必须是对象，且对键的引用是弱引用。</p>
              <ul>
                <li>
                  <strong>弱引用：</strong>不会阻止垃圾回收器回收键对象
                </li>
                <li>
                  <strong>键类型：</strong>只能使用对象作为键（不能用原始类型）
                </li>
                <li>
                  <strong>不可枚举：</strong>没有 keys()、values()、entries() 等方法
                </li>
                <li>
                  <strong>无 size 属性：</strong>无法获取键值对数量
                </li>
              </ul>
            </div>
          }
          type="info"
          showIcon
        />

        <div className="weakmap-demo__code">
          {`// WeakMap 基本语法
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
wm.forEach();  // undefined`}
        </div>
      </Card>

      <Card title="WeakMap vs Map 对比" style={{ marginTop: 24 }}>
        <div className="weakmap-demo__comparison">
          <div className="weakmap-demo__comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>
                    <Tag color="blue">Map</Tag>
                  </th>
                  <th>
                    <Tag color="purple">WeakMap</Tag>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>键类型</td>
                  <td>任意类型</td>
                  <td>只能是对象</td>
                </tr>
                <tr>
                  <td>引用类型</td>
                  <td>强引用（阻止 GC）</td>
                  <td>弱引用（不阻止 GC）</td>
                </tr>
                <tr>
                  <td>可枚举</td>
                  <td>✅ 可以遍历</td>
                  <td>❌ 不可遍历</td>
                </tr>
                <tr>
                  <td>size 属性</td>
                  <td>✅ 有</td>
                  <td>❌ 无</td>
                </tr>
                <tr>
                  <td>keys/values/entries</td>
                  <td>✅ 有</td>
                  <td>❌ 无</td>
                </tr>
                <tr>
                  <td>clear 方法</td>
                  <td>✅ 有</td>
                  <td>❌ 无</td>
                </tr>
                <tr>
                  <td>内存管理</td>
                  <td>手动清理</td>
                  <td>自动清理（GC）</td>
                </tr>
                <tr>
                  <td>使用场景</td>
                  <td>通用键值对存储</td>
                  <td>对象元数据、私有数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="weakmap-demo__code" style={{ marginTop: 16 }}>
          {`// Map vs WeakMap 内存管理对比

// Map: 强引用，需手动清理
const map = new Map();
let obj1 = { name: 'test' };
map.set(obj1, 'data');
obj1 = null;  // ❌ Map 仍然持有对象引用，无法被 GC

// WeakMap: 弱引用，自动清理
const wm = new WeakMap();
let obj2 = { name: 'test' };
wm.set(obj2, 'data');
obj2 = null;  // ✅ 对象可以被 GC，WeakMap 自动清理`}
        </div>
      </Card>

      <Card title="交互式演示" style={{ marginTop: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <h3>
              <Tag color="green">Demo 1</Tag> 基本操作
            </h3>
            <p className="weakmap-demo__desc">演示 WeakMap 的基本 API：set、get、has、delete</p>
            <Button type="primary" onClick={demoBasicOperations}>
              运行演示
            </Button>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="orange">Demo 2</Tag> 弱引用特性
            </h3>
            <p className="weakmap-demo__desc">
              演示 WeakMap 的弱引用特性：当对象被设置为 null 时，WeakMap 不会阻止垃圾回收
            </p>
            <Button type="primary" onClick={demoWeakReference}>
              运行演示
            </Button>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="purple">Demo 3</Tag> 私有数据存储
            </h3>
            <p className="weakmap-demo__desc">使用 WeakMap 实现真正的私有数据，外部无法访问</p>
            <Button type="primary" onClick={demoPrivateData}>
              运行演示
            </Button>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="cyan">Demo 4</Tag> DOM 节点元数据
            </h3>
            <p className="weakmap-demo__desc">为 DOM 元素存储额外数据，不污染 DOM 结构</p>
            <Button type="primary" onClick={demoDOM}>
              初始化元数据
            </Button>
            <div className="weakmap-demo__dom-nodes" style={{ marginTop: 16 }}>
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  ref={(el) => el && (domNodesRef.current[index] = el)}
                  className="weakmap-demo__dom-node"
                  onClick={(e) => handleNodeClick(e.currentTarget)}
                >
                  Node {index} - Click me!
                </div>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <h3>
              <Tag color="red">Demo 5</Tag> 缓存计算结果
            </h3>
            <p className="weakmap-demo__desc">使用 WeakMap 缓存昂贵的计算结果，自动清理不再使用的缓存</p>
            <Space>
              <Button type="primary" onClick={demoCache}>
                运行缓存测试
              </Button>
              <Tag color="blue">Cache Hits: {cacheStats.hits}</Tag>
              <Tag color="orange">Cache Misses: {cacheStats.misses}</Tag>
            </Space>
          </div>
        </Space>

        <Divider />

        <div className="weakmap-demo__console">
          <div className="weakmap-demo__console-header">
            <span>📋 控制台输出</span>
            <Button size="small" onClick={clearLogs}>
              清空
            </Button>
          </div>
          <div className="weakmap-demo__console-content">
            {logs.length === 0 ? (
              <div className="weakmap-demo__console-empty">运行上面的演示查看输出...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="weakmap-demo__console-line">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </Card>

      <Card title="实战使用场景" style={{ marginTop: 24 }}>
        <h3>1. 存储对象的私有数据</h3>
        <div className="weakmap-demo__code">
          {`// 使用 WeakMap 实现真正的私有属性
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
console.log(account.balance);  // undefined`}
        </div>

        <h3 style={{ marginTop: 24 }}>2. DOM 元素关联数据</h3>
        <div className="weakmap-demo__code">
          {`// 为 DOM 元素存储元数据，无需修改 DOM
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

// 当 DOM 元素被移除时，相关的元数据会自动被垃圾回收`}
        </div>

        <h3 style={{ marginTop: 24 }}>3. 缓存对象计算结果</h3>
        <div className="weakmap-demo__code">
          {`// 使用 WeakMap 缓存昂贵的计算结果
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

// 优点：当对象不再使用时，缓存会自动清理`}
        </div>

        <h3 style={{ marginTop: 24 }}>4. 追踪对象的引用关系</h3>
        <div className="weakmap-demo__code">
          {`// 追踪对象之间的关系，无需担心内存泄漏
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

// 当 Node 实例被销毁时，关系数据会自动清理`}
        </div>

        <h3 style={{ marginTop: 24 }}>5. 防止内存泄漏的事件监听</h3>
        <div className="weakmap-demo__code">
          {`// 使用 WeakMap 存储事件处理器，避免内存泄漏
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

// 当 element 被销毁时，所有相关的处理器信息会自动清理`}
        </div>
      </Card>

      <Card title="注意事项" style={{ marginTop: 24 }}>
        <Alert
          message="使用 WeakMap 的注意事项"
          description={
            <ul>
              <li>
                <strong>键必须是对象：</strong>不能使用字符串、数字等原始类型作为键
              </li>
              <li>
                <strong>不可遍历：</strong>无法获取所有键或值，不适合需要遍历的场景
              </li>
              <li>
                <strong>调试困难：</strong>无法在开发者工具中直接查看 WeakMap 的内容
              </li>
              <li>
                <strong>适用场景：</strong>最适合存储对象元数据、私有数据、临时缓存等
              </li>
              <li>
                <strong>垃圾回收：</strong>依赖 GC 机制，清理时机不可预测
              </li>
            </ul>
          }
          type="warning"
          showIcon
        />
      </Card>

      <Card title="性能对比" style={{ marginTop: 24 }}>
        <div className="weakmap-demo__performance">
          <h4>什么时候选择 WeakMap？</h4>
          <ul>
            <li>
              ✅ <strong>需要存储对象元数据</strong> - 不想污染对象本身
            </li>
            <li>
              ✅ <strong>需要自动内存管理</strong> - 对象销毁时自动清理关联数据
            </li>
            <li>
              ✅ <strong>需要私有数据存储</strong> - 真正的私有属性
            </li>
            <li>
              ✅ <strong>缓存对象相关的计算</strong> - 自动清理不再使用的缓存
            </li>
          </ul>

          <h4 style={{ marginTop: 24 }}>什么时候选择 Map？</h4>
          <ul>
            <li>
              ✅ <strong>需要遍历所有键值对</strong> - 需要 keys(), values(), entries()
            </li>
            <li>
              ✅ <strong>需要知道数量</strong> - 需要 size 属性
            </li>
            <li>
              ✅ <strong>键可以是原始类型</strong> - 字符串、数字等
            </li>
            <li>
              ✅ <strong>需要手动控制生命周期</strong> - 明确清理时机
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default WeakMapDemo;
