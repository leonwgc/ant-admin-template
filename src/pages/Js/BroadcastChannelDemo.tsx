/**
 * @file src/pages/Js/BroadcastChannelDemo.tsx
 * @author leon.wang
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Button,
  Space,
  Tag,
  Alert,
  Input,
  Badge,
  Typography,
  message,
} from '@derbysoft/neat-design';
import { ArrowRightOutlined, SyncOutlined, NotificationOutlined } from '@derbysoft/neat-design-icons';
import './BroadcastChannelDemo.scss';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

/**
 * BroadcastChannelDemo component
 * Demonstrates BroadcastChannel API usage in different scenarios
 */
const BroadcastChannelDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [syncData, setSyncData] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [loginStatus, setLoginStatus] = useState('未登录');
  const [tabId] = useState(() => Math.random().toString(36).substr(2, 9));

  // BroadcastChannel references
  const messagingChannelRef = useRef<BroadcastChannel | null>(null);
  const syncChannelRef = useRef<BroadcastChannel | null>(null);
  const notificationChannelRef = useRef<BroadcastChannel | null>(null);
  const authChannelRef = useRef<BroadcastChannel | null>(null);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Initialize channels on mount
  useEffect(() => {
    // Check browser support
    if (!('BroadcastChannel' in window)) {
      addLog('❌ 浏览器不支持 BroadcastChannel API');
      message.error('您的浏览器不支持 BroadcastChannel API');
      return;
    }

    addLog(`🆔 当前标签页 ID: ${tabId}`);
    addLog('✅ BroadcastChannel API 已就绪');

    // Auto-initialize all channels
    initMessagingChannel();
    initSyncChannel();
    initNotificationChannel();
    initAuthChannel();
    addLog('🚀 所有频道已自动初始化');

    // Cleanup function
    return () => {
      messagingChannelRef.current?.close();
      syncChannelRef.current?.close();
      notificationChannelRef.current?.close();
      authChannelRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabId]);

  // Scenario 1: Basic Cross-Tab Messaging
  const initMessagingChannel = () => {
    if (messagingChannelRef.current) {
      return;
    }

    const channel = new BroadcastChannel('messaging-channel');
    messagingChannelRef.current = channel;

    channel.onmessage = (event) => {
      const { tabId: senderTabId, message: msg } = event.data;
      if (senderTabId !== tabId) {
        setReceivedMessages((prev) => [...prev, `[来自标签 ${senderTabId}]: ${msg}`]);
        addLog(`📨 收到消息: ${msg}`);
      }
    };

    channel.onmessageerror = (event) => {
      addLog(`❌ 消息错误: ${event}`);
    };

    addLog('✅ 消息频道已初始化');
  };

  const sendMessage = () => {
    if (!messagingChannelRef.current) {
      message.warning('请先初始化消息频道');
      return;
    }

    if (!messageInput.trim()) {
      message.warning('请输入消息内容');
      return;
    }

    const data = {
      tabId,
      message: messageInput,
      timestamp: Date.now(),
    };

    messagingChannelRef.current.postMessage(data);
    addLog(`📤 发送消息: ${messageInput}`);
    setMessageInput('');
    message.success('消息已发送到所有标签页');
  };

  // Scenario 2: Data Synchronization
  const initSyncChannel = () => {
    if (syncChannelRef.current) {
      return;
    }

    const channel = new BroadcastChannel('sync-channel');
    syncChannelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, data, tabId: senderTabId } = event.data;

      if (senderTabId !== tabId) {
        if (type === 'sync-request') {
          // Respond to sync request
          addLog(`📥 收到同步请求来自标签 ${senderTabId}`);
          channel.postMessage({
            type: 'sync-response',
            data: syncData,
            tabId,
          });
        } else if (type === 'sync-response') {
          addLog(`📥 收到同步数据: ${data}`);
          setSyncData(data);
          message.success('数据已同步');
        } else if (type === 'data-update') {
          addLog(`📥 收到数据更新: ${data}`);
          setSyncData(data);
          message.info('数据已更新');
        }
      }
    };

    addLog('✅ 同步频道已初始化');
  };

  const requestSync = () => {
    if (!syncChannelRef.current) {
      message.warning('请先初始化同步频道');
      return;
    }

    syncChannelRef.current.postMessage({
      type: 'sync-request',
      tabId,
    });
    addLog('📤 请求数据同步');
  };

  const updateSyncData = (newData: string) => {
    setSyncData(newData);
    if (syncChannelRef.current) {
      syncChannelRef.current.postMessage({
        type: 'data-update',
        data: newData,
        tabId,
      });
      addLog(`📤 广播数据更新: ${newData}`);
    }
  };

  // Scenario 3: Real-time Notifications
  const initNotificationChannel = () => {
    if (notificationChannelRef.current) {
      return;
    }

    const channel = new BroadcastChannel('notification-channel');
    notificationChannelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, title, content, tabId: senderTabId } = event.data;

      if (senderTabId !== tabId && type === 'notification') {
        setNotificationCount((prev) => prev + 1);
        addLog(`🔔 收到通知: ${title}`);
        message.info({
          content: (
            <div>
              <strong>{title}</strong>
              <div>{content}</div>
            </div>
          ),
          duration: 3,
        });
      }
    };

    addLog('✅ 通知频道已初始化');
  };

  const sendNotification = () => {
    if (!notificationChannelRef.current) {
      message.warning('请先初始化通知频道');
      return;
    }

    const notification = {
      type: 'notification',
      title: '新消息',
      content: `来自标签 ${tabId} 的通知 - ${new Date().toLocaleTimeString()}`,
      tabId,
    };

    notificationChannelRef.current.postMessage(notification);
    addLog('📤 发送通知到所有标签页');
  };

  // Scenario 4: Authentication State Sync
  const initAuthChannel = () => {
    if (authChannelRef.current) {
      return;
    }

    const channel = new BroadcastChannel('auth-channel');
    authChannelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, tabId: senderTabId } = event.data;

      if (senderTabId !== tabId) {
        if (type === 'login') {
          setLoginStatus('已登录');
          addLog(`🔐 检测到登录操作来自标签 ${senderTabId}`);
          message.success('已在其他标签页登录');
        } else if (type === 'logout') {
          setLoginStatus('未登录');
          addLog(`🔓 检测到登出操作来自标签 ${senderTabId}`);
          message.warning('已在其他标签页登出');
        } else if (type === 'token-refresh') {
          addLog(`🔄 Token 已刷新来自标签 ${senderTabId}`);
          message.info('认证令牌已更新');
        }
      }
    };

    addLog('✅ 认证频道已初始化');
  };

  const simulateLogin = () => {
    if (!authChannelRef.current) {
      message.warning('请先初始化认证频道');
      return;
    }

    setLoginStatus('已登录');
    authChannelRef.current.postMessage({
      type: 'login',
      status: 'logged-in',
      tabId,
      timestamp: Date.now(),
    });
    addLog('🔐 模拟登录并广播状态');
    message.success('登录成功');
  };

  const simulateLogout = () => {
    if (!authChannelRef.current) {
      message.warning('请先初始化认证频道');
      return;
    }

    setLoginStatus('未登录');
    authChannelRef.current.postMessage({
      type: 'logout',
      status: 'logged-out',
      tabId,
      timestamp: Date.now(),
    });
    addLog('🔓 模拟登出并广播状态');
    message.info('已登出');
  };

  return (
    <div className="broadcast-channel-demo">
      <Title level={2}>BroadcastChannel API 示例</Title>
      <Paragraph>
        <Text type="secondary">
          BroadcastChannel API 允许同源的不同浏览上下文（标签页、窗口、iframe）之间进行通信。
          打开多个标签页来测试跨标签页通信效果。
        </Text>
      </Paragraph>

      <Alert
        message="使用提示"
        description={
          <div>
            <p>• <strong>页面已自动初始化所有频道</strong>，可直接测试跨标签页通信</p>
            <p>• 当前标签页 ID: <Tag color="blue">{tabId}</Tag></p>
            <p>• 在新标签页中打开此页面，两个标签页可以互相通信</p>
            <p>• BroadcastChannel 仅在同源页面间工作（相同协议、域名、端口）</p>
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* Scenario 1: Basic Messaging */}
      <Card title="场景 1: 基础跨标签页消息传递" style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="适用场景"
            description="用于标签页之间发送简单消息，如通知、提醒、实时更新等。频道已自动初始化，可直接发送消息。"
            type="success"
            showIcon
          />

          <div>
            <TextArea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="输入要发送的消息..."
              rows={3}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={sendMessage}
              style={{ marginTop: 8 }}
            >
              发送消息
            </Button>
          </div>

          {receivedMessages.length > 0 && (
            <Card size="small" title="收到的消息">
              {receivedMessages.map((msg, index) => (
                <div key={index} className="received-message">
                  {msg}
                </div>
              ))}
            </Card>
          )}
        </Space>
      </Card>

      {/* Scenario 2: Data Sync */}
      <Card title="场景 2: 数据同步" style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="适用场景"
            description="多标签页之间同步应用状态、用户设置、购物车内容等数据。频道已自动初始化。"
            type="success"
            showIcon
          />

          <Space>
            <Button type="primary" icon={<SyncOutlined />} onClick={requestSync}>
              请求同步数据
            </Button>
          </Space>

          <div>
            <Text strong>当前同步数据：</Text>
            <Input
              value={syncData}
              onChange={(e) => updateSyncData(e.target.value)}
              placeholder="输入数据（将自动同步到其他标签页）"
              style={{ marginTop: 8 }}
            />
          </div>
        </Space>
      </Card>

      {/* Scenario 3: Notifications */}
      <Card title="场景 3: 实时通知系统" style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="适用场景"
            description="跨标签页推送通知、系统消息、实时提醒等。频道已自动初始化。"
            type="success"
            showIcon
          />

          <Space>
            <Button type="primary" icon={<NotificationOutlined />} onClick={sendNotification}>
              发送通知
            </Button>
            <Badge count={notificationCount} showZero>
              <Tag>通知计数</Tag>
            </Badge>
          </Space>
        </Space>
      </Card>

      {/* Scenario 4: Auth Sync */}
      <Card title="场景 4: 认证状态同步" style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="适用场景"
            description="同步登录/登出状态、Token 刷新、会话过期提醒等。频道已自动初始化。"
            type="success"
            showIcon
          />

          <Space>
            <div>
              当前状态: <Tag color={loginStatus === '已登录' ? 'green' : undefined}>{loginStatus}</Tag>
            </div>
          </Space>

          <Space>
            <Button onClick={simulateLogin}>模拟登录</Button>
            <Button onClick={simulateLogout}>模拟登出</Button>
          </Space>
        </Space>
      </Card>

      {/* Best Practices */}
      <Card title="最佳实践与注意事项" style={{ marginBottom: 24 }}>
        <Space direction="vertical">
          <div>
            <Text strong>✅ 优点：</Text>
            <ul>
              <li>简单易用的 API</li>
              <li>支持跨标签页、iframe、Worker 通信</li>
              <li>自动处理序列化/反序列化</li>
              <li>支持传输复杂对象（通过结构化克隆算法）</li>
            </ul>
          </div>

          <div>
            <Text strong>⚠️ 限制：</Text>
            <ul>
              <li>仅限同源页面（相同协议、域名、端口）</li>
              <li>不支持跨域通信</li>
              <li>消息不保证到达顺序</li>
              <li>不支持请求-响应模式（需自行实现）</li>
              <li>IE 浏览器不支持</li>
            </ul>
          </div>

          <div>
            <Text strong>🛡️ 安全建议：</Text>
            <ul>
              <li>验证接收的消息来源和内容</li>
              <li>避免传输敏感信息（如密码）</li>
              <li>使用类型检查确保数据结构正确</li>
              <li>及时关闭不再使用的频道</li>
            </ul>
          </div>

          <div>
            <Text strong>🔧 使用场景：</Text>
            <ul>
              <li>多标签页状态同步（购物车、用户设置）</li>
              <li>实时通知系统（新消息、系统公告）</li>
              <li>认证状态同步（登录/登出、Token 刷新）</li>
              <li>协同编辑预览（一个标签编辑，另一个实时预览）</li>
              <li>数据缓存失效通知</li>
            </ul>
          </div>
        </Space>
      </Card>

      {/* Code Example */}
      <Card title="代码示例" style={{ marginBottom: 24 }}>
        <pre className="code-block">
          {`// 创建频道
const channel = new BroadcastChannel('my-channel');

// 监听消息
channel.onmessage = (event) => {
  console.log('收到消息:', event.data);
};

// 发送消息
channel.postMessage({ type: 'update', data: 'Hello' });

// 关闭频道
channel.close();

// 错误处理
channel.onmessageerror = (event) => {
  console.error('消息错误:', event);
};`}
        </pre>
      </Card>

      {/* Logs */}
      <Card
        title="操作日志"
        extra={
          <Button size="small" onClick={clearLogs}>
            清除日志
          </Button>
        }
      >
        <div className="logs-container">
          {logs.length === 0 ? (
            <Text type="secondary">暂无日志</Text>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="log-item">
                {log}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default BroadcastChannelDemo;
