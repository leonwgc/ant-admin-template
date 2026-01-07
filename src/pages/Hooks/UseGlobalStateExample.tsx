/**
 * @file src/pages/Hooks/UseGlobalStateExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Button, Space, Input, Typography, Divider, Badge } from '@derbysoft/neat-design';
import { useGlobalState, useGlobalSelector, useGlobalSetter } from '~/hooks/useGlobalState';
import './UseGlobalStateExample.scss';

const { Title, Paragraph, Text } = Typography;

// Example 1: Simple counter shared between components
const CounterComponentA: React.FC = () => {
  const [count, setCount] = useGlobalState('counter', 0);

  return (
    <Card title="Component A - Simple Value" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text>Current Count: <Text strong style={{ fontSize: 20, color: '#1890ff' }}>{count}</Text></Text>
        <Space>
          <Button type="primary" onClick={() => setCount(count + 1)}>
            Increment
          </Button>
          <Button onClick={() => setCount(count - 1)}>
            Decrement
          </Button>
          <Button onClick={() => setCount(0)}>
            Reset to 0
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

const CounterComponentB: React.FC = () => {
  const [count, setCount] = useGlobalState('counter', 0);

  return (
    <Card title="Component B - Shared State" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text>Same Count: <Text strong style={{ fontSize: 20, color: '#52c41a' }}>{count}</Text></Text>
        <Space>
          <Button type="primary" onClick={() => setCount(prev => prev + 5)}>
            +5
          </Button>
          <Button onClick={() => setCount(prev => prev * 2)}>
            ×2
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

// Example 2: Object state shared between components
const UserComponentA: React.FC = () => {
  const [user, setUser] = useGlobalState('user', {
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
  });

  return (
    <Card title="Component A - User Profile" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text strong>Name:</Text> {user.name}
        </div>
        <div>
          <Text strong>Email:</Text> {user.email}
        </div>
        <div>
          <Text strong>Age:</Text> {user.age}
        </div>
        <Divider />
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ email: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Age"
            value={user.age}
            onChange={(e) => setUser({ age: Number(e.target.value) })}
          />
        </Space>
      </Space>
    </Card>
  );
};

const UserComponentB: React.FC = () => {
  const [user, setUser, resetUser] = useGlobalState('user', {
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
  });

  return (
    <Card title="Component B - Display & Actions" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="use-global-state-example__profile">
          <div className="use-global-state-example__avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div><Text strong style={{ fontSize: 18 }}>{user.name}</Text></div>
            <div><Text type="secondary">{user.email}</Text></div>
            <div><Text>Age: {user.age}</Text></div>
          </div>
        </div>
        <Divider />
        <Space>
          <Button type="primary" onClick={() => setUser({ age: user.age + 1 })}>
            Birthday 🎂
          </Button>
          <Button onClick={resetUser}>
            Reset Profile
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

// Example 3: Shopping cart
const ProductList: React.FC = () => {
  const [cart, setCart] = useGlobalState('cart', {
    items: [] as Array<{ id: number; name: string; price: number }>,
    total: 0,
  });

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 },
    { id: 4, name: 'Monitor', price: 299 },
  ];

  const addToCart = (product: typeof products[0]) => {
    setCart({
      items: [...cart.items, product],
      total: cart.total + product.price,
    });
  };

  return (
    <Card title="Product List" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        {products.map((product) => (
          <div key={product.id} className="use-global-state-example__product">
            <div>
              <Text strong>{product.name}</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>${product.price}</Text>
            </div>
            <Button size="small" type="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </div>
        ))}
      </Space>
    </Card>
  );
};

const ShoppingCart: React.FC = () => {
  const [cart, setCart, resetCart] = useGlobalState('cart', {
    items: [] as Array<{ id: number; name: string; price: number }>,
    total: 0,
  });

  const removeItem = (index: number) => {
    const newItems = [...cart.items];
    const removedItem = newItems.splice(index, 1)[0];
    setCart({
      items: newItems,
      total: cart.total - removedItem.price,
    });
  };

  return (
    <Card title="Shopping Cart" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        {cart.items.length === 0 ? (
          <Text type="secondary">Cart is empty</Text>
        ) : (
          <>
            {cart.items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="use-global-state-example__cart-item">
                <div>
                  <Text>{item.name}</Text>
                  <Text type="secondary" style={{ marginLeft: 8 }}>${item.price}</Text>
                </div>
                <Button size="small" danger onClick={() => removeItem(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Divider />
            <div className="use-global-state-example__total">
              <Text strong>Total:</Text>
              <Text strong style={{ fontSize: 20, color: '#f5222d' }}>${cart.total}</Text>
            </div>
            <Button block onClick={resetCart}>
              Clear Cart
            </Button>
          </>
        )}
      </Space>
    </Card>
  );
};

// Example 4: Performance optimization with useGlobalSelector
let renderCountSelector = 0;
const UserNameDisplay: React.FC = () => {
  renderCountSelector++;
  // Only subscribes to name field, won't re-render when email or age changes
  const userName = useGlobalSelector<{ name: string; email: string; age: number }, string>(
    'user',
    (state) => state.name
  );

  return (
    <Card title="Component C - Optimized Selector" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Badge count={renderCountSelector} style={{ backgroundColor: '#52c41a' }}>
          <Text strong>Render Count</Text>
        </Badge>
        <div style={{ marginTop: 12 }}>
          <Text>User Name (selector): </Text>
          <Text strong style={{ fontSize: 18, color: '#1890ff' }}>{userName}</Text>
        </div>
        <Divider />
        <Text type="secondary" style={{ fontSize: 12 }}>
          💡 This component only subscribes to the "name" field.
          <br />
          Try changing email or age in Component A - this won't re-render!
        </Text>
      </Space>
    </Card>
  );
};

// Example 5: Performance optimization with useGlobalSetter
let renderCountSetter = 0;
const CounterButtons: React.FC = () => {
  renderCountSetter++;
  // Only gets setter, doesn't subscribe to count changes - won't re-render
  const setCount = useGlobalSetter<number>('counter');

  return (
    <Card title="Component C - Setter Only" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Badge count={renderCountSetter} style={{ backgroundColor: '#52c41a' }}>
          <Text strong>Render Count</Text>
        </Badge>
        <Space style={{ marginTop: 12 }}>
          <Button type="primary" onClick={() => setCount(prev => (prev as number) + 10)}>
            +10
          </Button>
          <Button onClick={() => setCount(prev => (prev as number) * 3)}>
            ×3
          </Button>
          <Button danger onClick={() => setCount(0)}>
            Reset
          </Button>
        </Space>
        <Divider />
        <Text type="secondary" style={{ fontSize: 12 }}>
          💡 This component only updates state, doesn't read it.
          <br />
          Check Component A/B - it won't re-render when count changes!
        </Text>
      </Space>
    </Card>
  );
};

// Example 6: Persistent state with localStorage
const PersistentSettings: React.FC = () => {
  const [settings, setSettings] = useGlobalState(
    'app-settings',
    {
      theme: 'light' as 'light' | 'dark',
      language: 'en' as 'en' | 'zh',
      notifications: true,
    },
    { storage: 'localStorage', storageKey: 'demo-app' }
  );

  return (
    <Card title="Persistent Settings (localStorage)" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          🔄 These settings persist across page refreshes
        </Text>
        <Divider />
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>Theme: </Text>
            <Space>
              <Button
                type={settings.theme === 'light' ? 'primary' : undefined}
                onClick={() => setSettings({ theme: 'light' })}
              >
                Light
              </Button>
              <Button
                type={settings.theme === 'dark' ? 'primary' : undefined}
                onClick={() => setSettings({ theme: 'dark' })}
              >
                Dark
              </Button>
            </Space>
          </div>
          <div>
            <Text strong>Language: </Text>
            <Space>
              <Button
                type={settings.language === 'en' ? 'primary' : undefined}
                onClick={() => setSettings({ language: 'en' })}
              >
                English
              </Button>
              <Button
                type={settings.language === 'zh' ? 'primary' : undefined}
                onClick={() => setSettings({ language: 'zh' })}
              >
                中文
              </Button>
            </Space>
          </div>
          <div>
            <Text strong>Notifications: </Text>
            <Button
              type={settings.notifications ? 'primary' : undefined}
              onClick={() => setSettings({ notifications: !settings.notifications })}
            >
              {settings.notifications ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </Space>
        <Divider />
        <Text strong>Current Settings:</Text>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          {JSON.stringify(settings, null, 2)}
        </pre>
      </Space>
    </Card>
  );
};

// Example 7: Session-only state with sessionStorage
const SessionData: React.FC = () => {
  const [sessionInfo, setSessionInfo] = useGlobalState(
    'session-info',
    {
      visitCount: 0,
      lastVisit: new Date().toISOString(),
      tabId: Math.random().toString(36).substring(7),
    },
    { storage: 'sessionStorage' }
  );

  return (
    <Card title="Session Data (sessionStorage)" className="use-global-state-example__card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          🕐 This data persists only during the browser session
        </Text>
        <Divider />
        <div>
          <Text strong>Visit Count: </Text>
          <Text style={{ fontSize: 18, color: '#1890ff' }}>{sessionInfo.visitCount}</Text>
        </div>
        <div>
          <Text strong>Tab ID: </Text>
          <Text code>{sessionInfo.tabId}</Text>
        </div>
        <div>
          <Text strong>Last Visit: </Text>
          <Text type="secondary">{new Date(sessionInfo.lastVisit).toLocaleString()}</Text>
        </div>
        <Space style={{ marginTop: 12 }}>
          <Button
            type="primary"
            onClick={() =>
              setSessionInfo({
                visitCount: sessionInfo.visitCount + 1,
                lastVisit: new Date().toISOString(),
              })
            }
          >
            Record Visit
          </Button>
          <Button
            onClick={() =>
              setSessionInfo({
                visitCount: 0,
                lastVisit: new Date().toISOString(),
                tabId: Math.random().toString(36).substring(7),
              })
            }
          >
            Reset Session
          </Button>
        </Space>
        <Divider />
        <Text type="secondary" style={{ fontSize: 12 }}>
          💡 Try refreshing the page - data persists!
          <br />
          Close the tab and reopen - data will be reset.
        </Text>
      </Space>
    </Card>
  );
};

const UseGlobalStateExample: React.FC = () => {
  const [showOptimized, setShowOptimized] = useState(false);

  return (
    <div className="use-global-state-example">
      <Title level={2}>useGlobalState Hook - 全局状态共享</Title>
      <Paragraph>
        基于 Zustand 实现的轻量级全局状态管理 Hook，支持跨组件状态共享，无需 Context 或 Provider。
        <br />
        <Text strong style={{ color: '#1890ff' }}>✨ 新增性能优化 Hooks：useGlobalSelector 和 useGlobalSetter</Text>
      </Paragraph>

      <Title level={3}>1. Simple Value - useGlobalState</Title>
      <Paragraph>
        <Text code>const [count, setCount, resetCount] = useGlobalState('counter', 0)</Text> - 适用于简单值类型
      </Paragraph>
      <div className="use-global-state-example__row">
        <CounterComponentA />
        <CounterComponentB />
        {showOptimized && <CounterButtons />}
      </div>

      <Divider style={{ margin: '32px 0' }} />

      <Title level={3}>2. Object State - useGlobalState</Title>
      <Paragraph>
        <Text code>const [user, setUser, resetUser] = useGlobalState('user', {'{ }'})</Text> - 支持对象类型和部分更新
      </Paragraph>
      <div className="use-global-state-example__row">
        <UserComponentA />
        <UserComponentB />
        {showOptimized && <UserNameDisplay />}
      </div>

      <Divider style={{ margin: '32px 0' }} />

      <Title level={3}>3. Performance Optimization</Title>
      <Paragraph>
        <Text strong>优化重渲染：</Text>使用 <Text code>useGlobalSelector</Text> 和 <Text code>useGlobalSetter</Text> 减少不必要的组件重渲染
      </Paragraph>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            renderCountSelector = 0;
            renderCountSetter = 0;
            setShowOptimized(!showOptimized);
          }}
        >
          {showOptimized ? 'Hide' : 'Show'} Optimized Components
        </Button>
        {showOptimized && (
          <Text type="secondary">
            观察 Render Count - 优化组件不会因为无关状态变化而重渲染
          </Text>
        )}
      </Space>

      <Divider style={{ margin: '32px 0' }} />

      <Title level={3}>4. Persistent State - localStorage & sessionStorage</Title>
      <Paragraph>
        <Text strong>数据持久化：</Text>使用 <Text code>storage</Text> 选项实现跨页面刷新的状态保存
      </Paragraph>
      <div className="use-global-state-example__row">
        <PersistentSettings />
        <SessionData />
      </div>

      <Divider style={{ margin: '32px 0' }} />

      <Title level={3}>5. Shopping Cart Example</Title>
      <Paragraph>
        实际场景示例：购物车状态在商品列表和购物车组件间共享
      </Paragraph>
      <div className="use-global-state-example__row">
        <ProductList />
        <ShoppingCart />
      </div>

      <Divider style={{ margin: '32px 0' }} />

      <Card title="API Reference" className="use-global-state-example__card">
        <Title level={5}>1. useGlobalState - 基础 Hook</Title>
        <Paragraph>
          <pre className="use-global-state-example__code">
{`import { useGlobalState } from '~/hooks/useGlobalState';

// 简单值类型 (number, string, boolean)
const [count, setCount, resetCount] = useGlobalState('counter', 0);
setCount(5);                    // 直接赋值
setCount(prev => prev + 1);     // 函数式更新

// 对象类型 - 支持部分更新
const [user, setUser, resetUser] = useGlobalState('user', {
  name: 'John',
  email: 'john@example.com',
  age: 25,
});
setUser({ name: 'Jane' });      // 部分更新（自动合并）
setUser(prev => ({ ...prev, age: 26 })); // 函数式更新`}
          </pre>
        </Paragraph>

        <Title level={5}>2. useGlobalSelector - 细粒度订阅（性能优化）</Title>
        <Paragraph>
          <pre className="use-global-state-example__code">
{`import { useGlobalSelector } from '~/hooks/useGlobalState';

// 只订阅特定字段，其他字段变化不会触发重渲染
const userName = useGlobalSelector('user', state => state.name);

// 订阅多个字段
const userInfo = useGlobalSelector('user', state => ({
  name: state.name,
  email: state.email
}));

// ⚡ 性能优势：只有 name 变化时才重渲染
// 修改 age 或 email 字段不会影响此组件`}
          </pre>
        </Paragraph>

        <Title level={5}>3. useGlobalSetter - 只写模式（性能优化）</Title>
        <Paragraph>
          <pre className="use-global-state-example__code">
{`import { useGlobalSetter } from '~/hooks/useGlobalState';

// 只获取 setter，不订阅状态变化
const setCount = useGlobalSetter<number>('counter');
const setUser = useGlobalSetter<UserType>('user');

setCount(5);
setCount(prev => prev + 1);
setUser({ name: 'Jane' });

// ⚡ 性能优势：状态变化不会导致此组件重渲染
// 适用于只需要更新状态的场景（如工具栏按钮）`}
          </pre>
        </Paragraph>
        <Title level={5}>4. Persistence - localStorage / sessionStorage</Title>
        <Paragraph>
          <pre className="use-global-state-example__code">
            {`import { useGlobalState } from '~/hooks/useGlobalState';

// localStorage - 持久化存储，跨浏览器会话
const [settings, setSettings] = useGlobalState(
  'settings',
  { theme: 'dark', lang: 'en' },
  { storage: 'localStorage', storageKey: 'my-app' }
);

// sessionStorage - 会话存储，仅在当前标签页有效
const [tempData, setTempData] = useGlobalState(
  'temp',
  { count: 0 },
  { storage: 'sessionStorage' }
);

// 无持久化（默认）
const [volatileData] = useGlobalState('volatile', { data: [] });

// 💾 localStorage: 关闭浏览器后数据仍存在
// 🕐 sessionStorage: 关闭标签页后数据清除
// ⚡ none: 页面刷新后数据重置`}
          </pre>
        </Paragraph>
        <Title level={5}>性能对比:</Title>
        <Paragraph>
          <pre className="use-global-state-example__code">
{`// ❌ 传统方式 - 每次状态变化都会重渲染
const [user, setUser] = useGlobalState('user', initialUser);
// 修改任何字段（name/email/age）都会触发重渲染

// ✅ 优化方式 1 - 只订阅需要的字段
const userName = useGlobalSelector('user', s => s.name);
// 只有 name 变化才重渲染，email/age 变化不影响

// ✅ 优化方式 2 - 只需要修改，不需要读取
const setUser = useGlobalSetter('user');
// 永远不会因为状态变化而重渲染`}
          </pre>
        </Paragraph>

        <Title level={5}>特性:</Title>
        <ul>
          <li>✅ 统一 API，不区分类型</li>
          <li>✅ 对象类型自动支持部分更新</li>
          <li>✅ 支持函数式更新</li>
          <li>✅ 基于 Zustand，性能优秀</li>
          <li>✅ TypeScript 类型安全</li>
          <li>✅ 无需 Provider 包裹</li>
          <li>✅ 按 key 隔离状态</li>
          <li>✅ 自动跨组件同步</li>
          <li>✨ 细粒度订阅（useGlobalSelector）</li>
          <li>✨ 只写模式优化（useGlobalSetter）</li>
          <li>💾 数据持久化（localStorage / sessionStorage）</li>
        </ul>
      </Card>
    </div>
  );
};

export default UseGlobalStateExample;
