/**
 * @file pages/Performance/Performance.tsx
 * @author leon.wang
 */
import React, { FC, useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space, Button } from '@derbysoft/neat-design';
import { ReloadOutlined, TrophyOutlined } from '@ant-design/icons';
import { getWebVitals } from '~/utils/webVitals';
import type { Metric } from 'web-vitals';
import './Performance.scss';

interface MetricData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  formattedValue: string;
  description: string;
  threshold: string;
}

/**
 * Performance monitoring page
 * Displays Web Vitals metrics and performance insights
 */
const Performance: FC = () => {
  const [metrics, setMetrics] = useState<Record<string, Metric>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const data = await getWebVitals();
      setMetrics(data);
      setLastUpdated(new Date());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load web vitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  // Format metric value
  const formatValue = (name: string, value: number): string => {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)} ms`;
  };

  // Get rating class
  const getRatingClass = (rating: string): string => {
    switch (rating) {
      case 'good':
        return 'rating-good';
      case 'needs-improvement':
        return 'rating-warning';
      case 'poor':
        return 'rating-error';
      default:
        return '';
    }
  };

  // Get rating text
  const getRatingText = (rating: string): string => {
    switch (rating) {
      case 'good':
        return '优秀';
      case 'needs-improvement':
        return '需改进';
      case 'poor':
        return '差';
      default:
        return '未知';
    }
  };

  // Metric descriptions and thresholds
  const metricInfo: Record<string, { description: string; threshold: string }> = {
    LCP: {
      description: '最大内容绘制时间 - 衡量页面主要内容的加载速度',
      threshold: '优秀: < 2.5s | 需改进: 2.5s - 4s | 差: > 4s',
    },
    CLS: {
      description: '累积布局偏移 - 衡量页面视觉稳定性',
      threshold: '优秀: < 0.1 | 需改进: 0.1 - 0.25 | 差: > 0.25',
    },
    INP: {
      description: '交互到下一次绘制 - 衡量页面交互响应性',
      threshold: '优秀: < 200ms | 需改进: 200ms - 500ms | 差: > 500ms',
    },
    FCP: {
      description: '首次内容绘制 - 衡量首个内容元素渲染时间',
      threshold: '优秀: < 1.8s | 需改进: 1.8s - 3s | 差: > 3s',
    },
    TTFB: {
      description: '首字节时间 - 衡量服务器响应速度',
      threshold: '优秀: < 800ms | 需改进: 800ms - 1800ms | 差: > 1800ms',
    },
  };

  // Table data
  const tableData: MetricData[] = Object.keys(metricInfo).map((key) => {
    const metric = metrics[key];
    return {
      name: key,
      value: metric?.value || 0,
      rating: metric?.rating || 'good',
      formattedValue: metric ? formatValue(key, metric.value) : '-',
      description: metricInfo[key].description,
      threshold: metricInfo[key].threshold,
    };
  });

  // Calculate overall score
  const calculateScore = (): { score: number; rating: string } => {
    const scores = Object.values(metrics).map((m) => {
      if (m.rating === 'good') return 100;
      if (m.rating === 'needs-improvement') return 50;
      return 0;
    });
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    let rating = 'poor';
    if (avgScore >= 80) rating = 'good';
    else if (avgScore >= 50) rating = 'needs-improvement';
    return { score: Math.round(avgScore), rating };
  };

  const { score, rating } = calculateScore();

  // Table columns
  const columns = [
    {
      title: '指标',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: '数值',
      dataIndex: 'formattedValue',
      key: 'formattedValue',
      width: 120,
    },
    {
      title: '评级',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      render: (rating: string) => (
        <Tag className={getRatingClass(rating)}>{getRatingText(rating)}</Tag>
      ),
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '阈值',
      dataIndex: 'threshold',
      key: 'threshold',
      width: 300,
    },
  ];

  return (
    <div className="performance-page">
      <div className="performance-page__header">
        <h1>性能监控</h1>
        <Space>
          <span className="performance-page__timestamp">
            最后更新: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button icon={<ReloadOutlined />} onClick={loadMetrics} loading={loading}>
            刷新
          </Button>
        </Space>
      </div>

      {/* Overall Score */}
      <Card className="performance-page__score-card">
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <div className="performance-page__score">
              <TrophyOutlined className="performance-page__trophy" />
              <div>
                <h2>综合性能评分</h2>
                <p>基于 5 项核心 Web Vitals 指标计算</p>
              </div>
            </div>
          </Col>
          <Col>
            <Statistic
              value={score}
              suffix="/100"
              valueStyle={{
                fontSize: 48,
                color: rating === 'good' ? '#0cce6b' : rating === 'needs-improvement' ? '#ffa400' : '#ff4e42',
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* Core Metrics */}
      <Row gutter={16} className="performance-page__metrics">
        {['LCP', 'CLS', 'INP'].map((key) => {
          const metric = metrics[key];
          return (
            <Col span={8} key={key}>
              <Card>
                <Statistic
                  title={key}
                  value={metric ? (key === 'CLS' ? metric.value.toFixed(3) : Math.round(metric.value)) : '-'}
                  suffix={key === 'CLS' ? '' : 'ms'}
                  valueStyle={{
                    color: metric
                      ? metric.rating === 'good'
                        ? '#0cce6b'
                        : metric.rating === 'needs-improvement'
                        ? '#ffa400'
                        : '#ff4e42'
                      : '#666',
                  }}
                />
                <div className="performance-page__metric-desc">{metricInfo[key].description}</div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row gutter={16} className="performance-page__metrics">
        {['FCP', 'TTFB'].map((key) => {
          const metric = metrics[key];
          return (
            <Col span={8} key={key}>
              <Card>
                <Statistic
                  title={key}
                  value={metric ? Math.round(metric.value) : '-'}
                  suffix="ms"
                  valueStyle={{
                    color: metric
                      ? metric.rating === 'good'
                        ? '#0cce6b'
                        : metric.rating === 'needs-improvement'
                        ? '#ffa400'
                        : '#ff4e42'
                      : '#666',
                  }}
                />
                <div className="performance-page__metric-desc">{metricInfo[key].description}</div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Detailed Table */}
      <Card title="详细指标" className="performance-page__table">
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey="name"
          loading={loading}
        />
      </Card>

      {/* Tips */}
      <Card title="💡 性能优化建议" className="performance-page__tips">
        <ul>
          <li>
            <strong>LCP 优化:</strong> 使用图片懒加载、CDN 加速、减少关键资源体积
          </li>
          <li>
            <strong>CLS 优化:</strong> 为图片/视频预留空间、避免动态插入内容、使用骨架屏
          </li>
          <li>
            <strong>INP 优化:</strong> 优化事件处理函数、使用防抖/节流、减少主线程阻塞
          </li>
          <li>
            <strong>FCP 优化:</strong> 内联关键 CSS、预加载关键资源、减少渲染阻塞
          </li>
          <li>
            <strong>TTFB 优化:</strong> 使用 CDN、启用缓存、优化服务器响应时间
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Performance;
