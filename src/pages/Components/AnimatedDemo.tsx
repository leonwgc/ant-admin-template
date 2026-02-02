/**
 * @file pages/Components/AnimatedDemo.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Space, Row, Col, Typography, Divider } from '@derbysoft/neat-design';
import { Animated, AnimationType } from 'components/Animated';

import './AnimatedDemo.scss';

const { Title, Paragraph, Text } = Typography;

/**
 * AnimatedDemo page
 * Demonstrates various animation effects and trigger timings of the Animated component
 */
const AnimatedDemo: FC = () => {
  const { t } = useTranslation();
  const [manualPlay, setManualPlay] = useState(false);

  const animationTypes: AnimationType[] = [
    'fade',
    'fadeUp',
    'fadeDown',
    'fadeLeft',
    'fadeRight',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'scale',
    'scaleUp',
    'scaleDown',
    'rotate',
    'bounce',
    'flip',
    'zoom',
  ];

  const triggerManualAnimation = () => {
    setManualPlay(false);
    setTimeout(() => {
      setManualPlay(true);
    }, 50);
  };

  return (
    <div className="animated-demo">
      <Title level={2}>{t('pages.components:animatedTitle')}</Title>
      <Paragraph>{t('pages.components:animatedDesc')}</Paragraph>

      {/* onLoad trigger demo */}
      <Card title={t('pages.components:animatedSectionOnLoad')} className="animated-demo__section">
        <Space size="large" wrap>
          {animationTypes.slice(0, 8).map((type) => (
            <Animated key={type} type={type} duration={800} delay={200}>
              <div className="animated-demo__box">
                <Text>{type}</Text>
              </div>
            </Animated>
          ))}
        </Space>
      </Card>

      {/* onHover trigger demo */}
      <Card
        title={t('pages.components:animatedSectionOnHover')}
        className="animated-demo__section"
      >
        <Space size="large" wrap>
          {['scale', 'scaleUp', 'bounce', 'rotate'].map((type) => (
            <Animated key={type} type={type as AnimationType} trigger="onHover" duration={500}>
              <div className="animated-demo__box animated-demo__box--hover">
                <Text>{type}</Text>
              </div>
            </Animated>
          ))}
        </Space>
      </Card>

      {/* onClick trigger demo */}
      <Card
        title={t('pages.components:animatedSectionOnClick')}
        className="animated-demo__section"
      >
        <Space size="large" wrap>
          {['bounce', 'flip', 'zoom', 'rotate'].map((type) => (
            <Animated key={type} type={type as AnimationType} trigger="onClick" duration={600}>
              <div className="animated-demo__box animated-demo__box--clickable">
                <Text>{type}</Text>
              </div>
            </Animated>
          ))}
        </Space>
      </Card>

      {/* onVisible trigger demo */}
      <Card
        title={t('pages.components:animatedSectionOnVisible')}
        className="animated-demo__section"
      >
        <Paragraph>{t('pages.components:animatedOnVisibleDesc')}</Paragraph>
        <Row gutter={[16, 16]}>
          {animationTypes.map((type, index) => (
            <Col key={type} xs={24} sm={12} md={8} lg={6}>
              <Animated
                type={type}
                trigger="onVisible"
                duration={800}
                delay={index * 50}
              >
                <Card size="small" className="animated-demo__card">
                  <Text>{type}</Text>
                </Card>
              </Animated>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Manual trigger demo */}
      <Card
        title={t('pages.components:animatedSectionManual')}
        className="animated-demo__section"
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Button type="primary" onClick={triggerManualAnimation}>
            {t('pages.components:animatedBtnTrigger')}
          </Button>
          <Space size="large" wrap>
            {['fadeUp', 'scale', 'bounce', 'flip'].map((type) => (
              <Animated
                key={type}
                type={type as AnimationType}
                trigger="manual"
                play={manualPlay}
                duration={800}
              >
                <div className="animated-demo__box">
                  <Text>{type}</Text>
                </div>
              </Animated>
            ))}
          </Space>
        </Space>
      </Card>

      {/* Repeat animation demo */}
      <Card
        title={t('pages.components:animatedSectionRepeat')}
        className="animated-demo__section"
      >
        <Space size="large" wrap>
          <Animated type="bounce" repeat duration={1000}>
            <div className="animated-demo__box">
              <Text>Infinite Bounce</Text>
            </div>
          </Animated>
          <Animated type="rotate" repeat repeatCount={3} duration={1000}>
            <div className="animated-demo__box">
              <Text>Rotate 3x</Text>
            </div>
          </Animated>
          <Animated type="scale" trigger="onHover" repeat duration={600}>
            <div className="animated-demo__box animated-demo__box--hover">
              <Text>Hover Repeat</Text>
            </div>
          </Animated>
        </Space>
      </Card>

      {/* Configuration examples */}
      <Card
        title={t('pages.components:animatedSectionConfig')}
        className="animated-demo__section"
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>{t('pages.components:animatedConfigDuration')}: </Text>
            <Space>
              <Animated type="fadeUp" duration={300}>
                <div className="animated-demo__box animated-demo__box--small">300ms</div>
              </Animated>
              <Animated type="fadeUp" duration={600}>
                <div className="animated-demo__box animated-demo__box--small">600ms</div>
              </Animated>
              <Animated type="fadeUp" duration={1200}>
                <div className="animated-demo__box animated-demo__box--small">1200ms</div>
              </Animated>
            </Space>
          </div>

          <div>
            <Text strong>{t('pages.components:animatedConfigDelay')}: </Text>
            <Space>
              <Animated type="scale" delay={0}>
                <div className="animated-demo__box animated-demo__box--small">0ms</div>
              </Animated>
              <Animated type="scale" delay={200}>
                <div className="animated-demo__box animated-demo__box--small">200ms</div>
              </Animated>
              <Animated type="scale" delay={400}>
                <div className="animated-demo__box animated-demo__box--small">400ms</div>
              </Animated>
            </Space>
          </div>

          <div>
            <Text strong>{t('pages.components:animatedConfigEasing')}: </Text>
            <Space>
              <Animated type="fadeUp" easing="linear">
                <div className="animated-demo__box animated-demo__box--small">linear</div>
              </Animated>
              <Animated type="fadeUp" easing="ease-in">
                <div className="animated-demo__box animated-demo__box--small">ease-in</div>
              </Animated>
              <Animated type="fadeUp" easing="ease-out">
                <div className="animated-demo__box animated-demo__box--small">ease-out</div>
              </Animated>
            </Space>
          </div>
        </Space>
      </Card>

      <Divider />

      {/* Usage example code */}
      <Card title={t('pages.components:animatedSectionUsage')}>
        <Typography>
          <Paragraph>
            <pre className="animated-demo__code">
              {`import { Animated } from 'components/Animated';

// Basic usage - fade animation on load
<Animated type="fade" duration={600}>
  <div>Your content</div>
</Animated>

// Hover animation
<Animated type="scale" trigger="onHover">
  <Button>Hover me</Button>
</Animated>

// Click animation
<Animated type="bounce" trigger="onClick">
  <div>Click me</div>
</Animated>

// Viewport visibility animation
<Animated type="fadeUp" trigger="onVisible" delay={200}>
  <Card>This animates when scrolled into view</Card>
</Animated>

// Manual control
const [play, setPlay] = useState(false);
<Animated type="zoom" trigger="manual" play={play}>
  <div>Controlled animation</div>
</Animated>

// Repeat animation
<Animated type="rotate" repeat repeatCount={3}>
  <div>Repeats 3 times</div>
</Animated>`}
            </pre>
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default AnimatedDemo;
