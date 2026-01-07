/**
 * @file src/pages/Hooks/UseGlobalStateExample.tsx
 * @author leon.wang
 */

import React from 'react';
import { Card, Button, Space, Input, Typography, Divider } from '@derbysoft/neat-design';
import { useGlobalState } from '~/hooks/useGlobalState';
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

const UseGlobalStateExample: React.FC = () => {
  return (
    <div className="use-global-state-example">
      <Title level={2}>useGlobalState Hook - 全局状态共享</Title>
      <Paragraph>
        基于 Zustand 实现的轻量级全局状态管理 Hook，支持跨组件状态共享，无需 Context 或 Provider。
      </Paragraph>

      <Title level={3}>1. Simple Value - useGlobalState</Title>
      <Paragraph>
        <Text code>const [count, setCount, resetCount] = useGlobalState('counter', 0)</Text> - 适用于简单值类型
      </Paragraph>
      <div className="use-global-state-example__row">
        <CounterComponentA />
        <CounterComponentB />
      </div>

      <Divider style={{ margin: '32px 0' }} />

      <Title level={3}>2. Object State - useGlobalState</Title>
      <Paragraph>
        <Text code>const [user, setUser, resetUser] = useGlobalState('user', {'{ }'})</Text> - 支持对象类型和部分更新
      </Paragraph>
      <div className="use-global-state-example__row">
        <UserComponentA />
        <UserComponentB />
      </div>

      <Divider style={{ margin: '32px 0' }} />

      <Title level={3}>3. Shopping Cart Example</Title>
      <Paragraph>
        实际场景示例：购物车状态在商品列表和购物车组件间共享
      </Paragraph>
      <div className="use-global-state-example__row">
        <ProductList />
        <ShoppingCart />
      </div>

      <Divider style={{ margin: '32px 0' }} />

      <Card title="Usage Examples" className="use-global-state-example__card">
        <Title level={5}>统一 API - 所有类型使用相同语法:</Title>
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
setUser(prev => ({ ...prev, age: 26 })); // 函数式更新

// 数组类型
const [items, setItems] = useGlobalState('items', [1, 2, 3]);
setItems([...items, 4]);        // 添加元素
setItems(prev => prev.filter(x => x > 1)); // 过滤

// 重置到初始值
resetCount();
resetUser();`}
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
        </ul>
      </Card>
    </div>
  );
};

export default UseGlobalStateExample;
