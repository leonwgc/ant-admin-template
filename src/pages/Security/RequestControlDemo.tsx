/**
 * @file pages/Security/RequestControlDemo.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import {
  Card,
  Button,
  Space,
  Statistic,
  Row,
  Col,
  message,
  Descriptions,
  Tag,
  Alert,
  Divider,
} from '@derbysoft/neat-design';
import {
  ThunderboltOutlined,
  ApiOutlined,
  SafetyCertificateOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  usePreventDuplicate,
  usePreventDuplicateBySign,
  usePreventDuplicateSync,
} from '~/hooks/usePreventDuplicate';
import { globalRequestDeduplicator } from '~/utils/requestDeduplicator';

import './RequestControlDemo.scss';

/**
 * 防重复提交演示页面
 * 展示防重复提交、请求去重等功能
 */
const RequestControlDemo: FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  // 模拟API请求
  const mockApiRequest = async (delay: number = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: 'Mock data' });
      }, delay);
    });
  };

  // 1. 防重复提交示例
  const handlePreventDuplicate = usePreventDuplicate(async () => {
    setRequestCount((prev) => prev + 1);
    await mockApiRequest(2000);
    message.success('请求完成');
  });

  // 2. 基于签名的防重复示例
  const handlePreventDuplicateBySign = usePreventDuplicateBySign(
    async (userId: number) => {
      setRequestCount((prev) => prev + 1);
      await mockApiRequest(1500);
      message.success(`用户${userId}的数据加载完成`);
    }
  );

  // 3. 同步防重复示例
  const handlePreventDuplicateSync = usePreventDuplicateSync(() => {
    setClickCount((prev) => prev + 1);
    message.info('按钮被点击');
  }, 1000);

  // 4. 重置统计
  const handleReset = () => {
    setClickCount(0);
    setRequestCount(0);
    globalRequestDeduplicator.clearAll();
    message.success('统计已重置');
  };

  return (
    <div className="request-control-demo">
      <div className="request-control-demo__header">
        <h2>防重复提交功能演示</h2>
        <p className="request-control-demo__description">
          展示防重复提交、请求去重等安全控制功能
        </p>
      </div>

      {/* 实时统计 */}
      <Card title="实时统计" className="request-control-demo__card">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic
              title="点击次数"
              value={clickCount}
              prefix={<ThunderboltOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="请求次数"
              value={requestCount}
              prefix={<ApiOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Pending请求"
              value={globalRequestDeduplicator.getPendingCount()}
              prefix={<SafetyCertificateOutlined />}
            />
          </Col>
        </Row>

        <Divider />

        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          重置统计
        </Button>
      </Card>

      {/* 功能演示 */}
      <Card
        title="1. 防重复提交（异步操作）"
        className="request-control-demo__card"
      >
        <Alert
          message="功能说明"
          description="在前一个请求未完成前，重复点击按钮将被拦截，防止重复提交。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Space>
          <Button type="primary" onClick={() => handlePreventDuplicate()}>
            提交表单（2秒延迟）
          </Button>
          <span className="request-control-demo__hint">
            快速点击多次，只会执行一次
          </span>
        </Space>
      </Card>

      <Card
        title="2. 基于签名的防重复（不同参数）"
        className="request-control-demo__card"
      >
        <Alert
          message="功能说明"
          description="根据请求参数生成签名，相同参数的请求在处理期间不会重复执行。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Space>
          <Button type="primary" onClick={() => handlePreventDuplicateBySign(1)}>
            加载用户1数据
          </Button>
          <Button type="primary" onClick={() => handlePreventDuplicateBySign(2)}>
            加载用户2数据
          </Button>
          <Button type="primary" onClick={() => handlePreventDuplicateBySign(1)}>
            再次加载用户1
          </Button>
        </Space>
        <p className="request-control-demo__hint">
          点击相同用户的按钮会被拦截，不同用户的请求可以并发
        </p>
      </Card>

      <Card
        title="3. 同步操作防抖"
        className="request-control-demo__card"
      >
        <Alert
          message="功能说明"
          description="防止快速重复点击触发多次同步操作（非异步请求场景）。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Space>
          <Button onClick={handlePreventDuplicateSync}>
            快速点击测试
          </Button>
          <span className="request-control-demo__hint">
            1秒内只会响应一次点击
          </span>
        </Space>
      </Card>

      {/* 技术说明 */}
      <Card title="技术实现" className="request-control-demo__card">
        <Descriptions column={1} bordered>
          <Descriptions.Item label="防重复提交">
            <div>
              <Tag color="blue">usePreventDuplicate Hook</Tag>
              <p style={{ marginTop: 8, marginBottom: 0 }}>
                通过 loading 状态确保异步函数完全执行完成后才允许下次调用
              </p>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="基于签名防重">
            <div>
              <Tag color="blue">usePreventDuplicateBySign Hook</Tag>
              <p style={{ marginTop: 8, marginBottom: 0 }}>               根据请求参数生成唯一签名，确保相同签名的请求完全执行完成后才允许下次调用，不同签名可并发
              </p>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="请求去重">
            <div>
              <Tag color="orange">RequestDeduplicator Class</Tag>
              <p style={{ marginTop: 8, marginBottom: 0 }}>
                缓存相同请求的 Promise，避免重复发送相同的 HTTP 请求
              </p>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="集成方式">
            <div>
              <Tag color="purple">requestWithDedup API</Tag>
              <p style={{ marginTop: 8, marginBottom: 0 }}>
                在 req.ts 中提供带去重功能的请求方法，防止相同请求重复发送
              </p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default RequestControlDemo;
