/**
 * @file src/pages/Css/CssAnimationExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Tag, Space, Tabs, Radio, Slider, InputNumber, Switch, Divider, Button } from '@derbysoft/neat-design';
import { PlayCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import './CssAnimationExample.scss';

type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce' | 'shake' | 'flip' | 'swing';

/**
 * CssAnimationExample component - Demonstrates CSS Animation techniques
 */
const CssAnimationExample: React.FC = () => {
  const [activeAnimation, setActiveAnimation] = useState<AnimationType>('fade');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(1000);
  const [delay, setDelay] = useState(0);
  const [iterationCount, setIterationCount] = useState(1);
  const [infinite, setInfinite] = useState(false);
  const [timingFunction, setTimingFunction] = useState('ease');
  const [direction, setDirection] = useState('normal');
  const [playKey, setPlayKey] = useState(0);

  const handlePlay = () => {
    setIsPlaying(false);
    setPlayKey(prev => prev + 1);
    setTimeout(() => setIsPlaying(true), 10);
  };

  const animationStyle: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationIterationCount: infinite ? 'infinite' : iterationCount,
    animationTimingFunction: timingFunction,
    animationDirection: direction as any,
  };

  return (
    <div className="css-animation-example">
      <h2 className="css-animation-example__title">
        <ThunderboltOutlined /> CSS Animation 动画完全指南
      </h2>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: '动画基础',
            children: (
              <div className="css-animation-example__section">
                <Card title="CSS Animation 基础概念">
                  <p className="css-animation-example__desc">
                    <Tag color="blue">强大的动画系统</Tag>
                    CSS Animation 允许元素从一种样式逐渐变化为另一种样式，通过 @keyframes 规则定义动画序列
                  </p>

                  <div className="css-animation-example__code">
                    {`/* 基础动画语法 */
@keyframes animation-name {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 使用百分比定义多个关键帧 */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

/* 应用动画 */
.element {
  animation-name: animation-name;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: both;

  /* 简写形式 */
  animation: animation-name 1s ease 0s 1 normal both;
}`}
                  </div>

                  <Divider>交互式演示</Divider>

                  <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }} size="middle">
                    <Space>
                      <span>动画类型:</span>
                      <Radio.Group value={activeAnimation} onChange={(e) => setActiveAnimation(e.target.value)}>
                        <Radio.Button value="fade">Fade</Radio.Button>
                        <Radio.Button value="slide">Slide</Radio.Button>
                        <Radio.Button value="scale">Scale</Radio.Button>
                        <Radio.Button value="rotate">Rotate</Radio.Button>
                        <Radio.Button value="bounce">Bounce</Radio.Button>
                        <Radio.Button value="shake">Shake</Radio.Button>
                        <Radio.Button value="flip">Flip</Radio.Button>
                        <Radio.Button value="swing">Swing</Radio.Button>
                      </Radio.Group>
                    </Space>
                    <Space>
                      <span>持续时间 (duration):</span>
                      <Slider
                        min={100}
                        max={5000}
                        step={100}
                        value={duration}
                        onChange={(val) => setDuration(val as number)}
                        style={{ width: 200 }}
                      />
                      <InputNumber min={100} max={5000} value={duration} onChange={(val) => setDuration(val as number)} />
                      <span>ms</span>
                    </Space>
                    <Space>
                      <span>延迟 (delay):</span>
                      <Slider
                        min={0}
                        max={3000}
                        step={100}
                        value={delay}
                        onChange={(val) => setDelay(val as number)}
                        style={{ width: 200 }}
                      />
                      <InputNumber min={0} max={3000} value={delay} onChange={(val) => setDelay(val as number)} />
                      <span>ms</span>
                    </Space>
                    <Space>
                      <span>循环次数:</span>
                      <Switch
                        checked={infinite}
                        onChange={setInfinite}
                        checkedChildren="无限"
                        unCheckedChildren="有限"
                      />
                      {!infinite && (
                        <>
                          <Slider
                            min={1}
                            max={10}
                            value={iterationCount}
                            onChange={(val) => setIterationCount(val as number)}
                            style={{ width: 200 }}
                          />
                          <InputNumber
                            min={1}
                            max={10}
                            value={iterationCount}
                            onChange={(val) => setIterationCount(val as number)}
                          />
                        </>
                      )}
                    </Space>
                    <Space>
                      <span>timing-function:</span>
                      <Radio.Group value={timingFunction} onChange={(e) => setTimingFunction(e.target.value)}>
                        <Radio.Button value="linear">linear</Radio.Button>
                        <Radio.Button value="ease">ease</Radio.Button>
                        <Radio.Button value="ease-in">ease-in</Radio.Button>
                        <Radio.Button value="ease-out">ease-out</Radio.Button>
                        <Radio.Button value="ease-in-out">ease-in-out</Radio.Button>
                      </Radio.Group>
                    </Space>
                    <Space>
                      <span>direction:</span>
                      <Radio.Group value={direction} onChange={(e) => setDirection(e.target.value)}>
                        <Radio.Button value="normal">normal</Radio.Button>
                        <Radio.Button value="reverse">reverse</Radio.Button>
                        <Radio.Button value="alternate">alternate</Radio.Button>
                        <Radio.Button value="alternate-reverse">alternate-reverse</Radio.Button>
                      </Radio.Group>
                    </Space>
                    <Button type="primary" icon={<PlayCircleOutlined />} onClick={handlePlay}>
                      播放动画
                    </Button>
                  </Space>

                  <div className="animation-demo__preview">
                    <div
                      key={playKey}
                      className={`animation-demo__box ${isPlaying ? `animation-demo__box--${activeAnimation}` : ''}`}
                      style={isPlaying ? animationStyle : {}}
                    >
                      Animated Box
                    </div>
                  </div>

                  <div className="css-animation-example__code" style={{ marginTop: 16 }}>
                    {`/* 当前动画配置 */
.element {
  animation-name: ${activeAnimation};
  animation-duration: ${duration}ms;
  animation-timing-function: ${timingFunction};
  animation-delay: ${delay}ms;
  animation-iteration-count: ${infinite ? 'infinite' : iterationCount};
  animation-direction: ${direction};

  /* 简写 */
  animation: ${activeAnimation} ${duration}ms ${timingFunction} ${delay}ms ${infinite ? 'infinite' : iterationCount} ${direction};
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '2',
            label: '动画属性',
            children: (
              <div className="css-animation-example__section">
                <Card title="Animation 属性详解">
                  <h3>1. animation-name</h3>
                  <p className="css-animation-example__desc">
                    指定要使用的 @keyframes 动画名称
                  </p>
                  <div className="css-animation-example__code">
                    {`animation-name: fade;
animation-name: slide;
animation-name: none; /* 禁用动画 */`}
                  </div>

                  <h3>2. animation-duration</h3>
                  <p className="css-animation-example__desc">
                    指定动画完成一个周期所需的时间
                  </p>
                  <div className="css-animation-example__code">
                    {`animation-duration: 1s;      /* 1秒 */
animation-duration: 500ms;   /* 500毫秒 */
animation-duration: 2.5s;    /* 2.5秒 */`}
                  </div>

                  <h3>3. animation-timing-function</h3>
                  <p className="css-animation-example__desc">
                    指定动画的速度曲线
                  </p>
                  <div className="animation-demo__timing-functions">
                    <div className="animation-demo__timing-item">
                      <div className="animation-demo__timing-box animation-demo__timing-box--linear">linear</div>
                      <span>匀速</span>
                    </div>
                    <div className="animation-demo__timing-item">
                      <div className="animation-demo__timing-box animation-demo__timing-box--ease">ease</div>
                      <span>慢-快-慢</span>
                    </div>
                    <div className="animation-demo__timing-item">
                      <div className="animation-demo__timing-box animation-demo__timing-box--ease-in">ease-in</div>
                      <span>慢开始</span>
                    </div>
                    <div className="animation-demo__timing-item">
                      <div className="animation-demo__timing-box animation-demo__timing-box--ease-out">ease-out</div>
                      <span>慢结束</span>
                    </div>
                    <div className="animation-demo__timing-item">
                      <div className="animation-demo__timing-box animation-demo__timing-box--ease-in-out">ease-in-out</div>
                      <span>慢开始和结束</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`animation-timing-function: linear;
animation-timing-function: ease;
animation-timing-function: ease-in;
animation-timing-function: ease-out;
animation-timing-function: ease-in-out;
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1); /* 自定义 */`}
                  </div>

                  <h3>4. animation-delay</h3>
                  <p className="css-animation-example__desc">
                    指定动画开始前的延迟时间
                  </p>
                  <div className="css-animation-example__code">
                    {`animation-delay: 0s;     /* 立即开始 */
animation-delay: 1s;     /* 延迟1秒 */
animation-delay: -1s;    /* 从动画中间开始 */`}
                  </div>

                  <h3>5. animation-iteration-count</h3>
                  <p className="css-animation-example__desc">
                    指定动画播放的次数
                  </p>
                  <div className="css-animation-example__code">
                    {`animation-iteration-count: 1;         /* 播放一次 */
animation-iteration-count: 3;         /* 播放三次 */
animation-iteration-count: infinite;  /* 无限循环 */`}
                  </div>

                  <h3>6. animation-direction</h3>
                  <p className="css-animation-example__desc">
                    指定动画播放的方向
                  </p>
                  <div className="animation-demo__direction">
                    <div className="animation-demo__direction-item">
                      <div className="animation-demo__direction-box animation-demo__direction-box--normal">normal</div>
                      <span>正向播放</span>
                    </div>
                    <div className="animation-demo__direction-item">
                      <div className="animation-demo__direction-box animation-demo__direction-box--reverse">reverse</div>
                      <span>反向播放</span>
                    </div>
                    <div className="animation-demo__direction-item">
                      <div className="animation-demo__direction-box animation-demo__direction-box--alternate">alternate</div>
                      <span>交替播放</span>
                    </div>
                    <div className="animation-demo__direction-item">
                      <div className="animation-demo__direction-box animation-demo__direction-box--alternate-reverse">alternate-reverse</div>
                      <span>反向交替</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`animation-direction: normal;            /* 正向播放 */
animation-direction: reverse;           /* 反向播放 */
animation-direction: alternate;         /* 正向和反向交替 */
animation-direction: alternate-reverse; /* 反向和正向交替 */`}
                  </div>

                  <h3>7. animation-fill-mode</h3>
                  <p className="css-animation-example__desc">
                    指定动画执行前后如何应用样式
                  </p>
                  <div className="css-animation-example__code">
                    {`animation-fill-mode: none;      /* 默认，不应用样式 */
animation-fill-mode: forwards;  /* 保持最后一帧 */
animation-fill-mode: backwards; /* 应用第一帧 */
animation-fill-mode: both;      /* 同时应用 forwards 和 backwards */`}
                  </div>

                  <h3>8. animation-play-state</h3>
                  <p className="css-animation-example__desc">
                    指定动画是运行还是暂停
                  </p>
                  <div className="css-animation-example__code">
                    {`animation-play-state: running; /* 运行 */
animation-play-state: paused;  /* 暂停 */

/* 悬停时暂停 */
.element:hover {
  animation-play-state: paused;
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '3',
            label: '常见动画',
            children: (
              <div className="css-animation-example__section">
                <Card title="常见动画效果">
                  <h3>1. 淡入淡出 (Fade)</h3>
                  <div className="animation-demo__showcase">
                    <div className="animation-demo__showcase-item">
                      <div className="animation-demo__showcase-box animation-demo__showcase-box--fade">Fade In</div>
                      <span>淡入</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fade 1s ease-in-out;
}`}
                  </div>

                  <h3>2. 滑动 (Slide)</h3>
                  <div className="animation-demo__showcase">
                    <div className="animation-demo__showcase-item">
                      <div className="animation-demo__showcase-box animation-demo__showcase-box--slide">Slide In</div>
                      <span>滑入</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`@keyframes slide {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slide 1s ease-out;
}`}
                  </div>

                  <h3>3. 缩放 (Scale)</h3>
                  <div className="animation-demo__showcase">
                    <div className="animation-demo__showcase-item">
                      <div className="animation-demo__showcase-box animation-demo__showcase-box--scale">Scale In</div>
                      <span>缩放</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`@keyframes scale {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.element {
  animation: scale 1s ease-out;
}`}
                  </div>

                  <h3>4. 旋转 (Rotate)</h3>
                  <div className="animation-demo__showcase">
                    <div className="animation-demo__showcase-item">
                      <div className="animation-demo__showcase-box animation-demo__showcase-box--rotate">Rotate</div>
                      <span>旋转</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`@keyframes rotate {
  from {
    transform: rotate(0deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}

.element {
  animation: rotate 1s ease-in-out;
}`}
                  </div>

                  <h3>5. 弹跳 (Bounce)</h3>
                  <div className="animation-demo__showcase">
                    <div className="animation-demo__showcase-item">
                      <div className="animation-demo__showcase-box animation-demo__showcase-box--bounce">Bounce</div>
                      <span>弹跳</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.element {
  animation: bounce 2s ease-in-out;
}`}
                  </div>

                  <h3>6. 抖动 (Shake)</h3>
                  <div className="animation-demo__showcase">
                    <div className="animation-demo__showcase-item">
                      <div className="animation-demo__showcase-box animation-demo__showcase-box--shake">Shake</div>
                      <span>抖动</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.element {
  animation: shake 0.5s ease-in-out;
}`}
                  </div>

                  <h3>7. 翻转 (Flip)</h3>
                  <div className="animation-demo__showcase">
                    <div className="animation-demo__showcase-item">
                      <div className="animation-demo__showcase-box animation-demo__showcase-box--flip">Flip</div>
                      <span>翻转</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`@keyframes flip {
  from {
    transform: perspective(400px) rotateY(0deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateY(360deg);
    opacity: 1;
  }
}

.element {
  animation: flip 1s ease-in-out;
  transform-style: preserve-3d;
}`}
                  </div>

                  <h3>8. 摆动 (Swing)</h3>
                  <div className="animation-demo__showcase">
                    <div className="animation-demo__showcase-item">
                      <div className="animation-demo__showcase-box animation-demo__showcase-box--swing">Swing</div>
                      <span>摆动</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`@keyframes swing {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}

.element {
  animation: swing 1s ease-in-out;
  transform-origin: top center;
}`}
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '4',
            label: '实际用例',
            children: (
              <div className="css-animation-example__section">
                <Card title="常见动画应用场景">
                  <h3>1. 加载动画 (Loading)</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="blue">最常见的用例</Tag>
                    用于显示数据加载或处理过程
                  </p>
                  <div className="animation-usecase__demo">
                    <div className="animation-usecase__loading-spinner"></div>
                    <div className="animation-usecase__loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="animation-usecase__loading-pulse"></div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 旋转 Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top-color: #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 跳动点 */
@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.dots span {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #1890ff;
  border-radius: 50%;
  animation: dotBounce 1.4s infinite;
}

.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

/* 脉冲 */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}`}
                  </div>

                  <h3>2. 按钮悬停效果</h3>
                  <p className="css-animation-example__desc">
                    提升交互体验的微动效
                  </p>
                  <div className="animation-usecase__demo">
                    <button className="animation-usecase__button animation-usecase__button--bounce">Bounce</button>
                    <button className="animation-usecase__button animation-usecase__button--wobble">Wobble</button>
                    <button className="animation-usecase__button animation-usecase__button--pulse">Pulse</button>
                    <button className="animation-usecase__button animation-usecase__button--glow">Glow</button>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* Bounce 按钮 */
@keyframes buttonBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.button:hover {
  animation: buttonBounce 0.5s ease;
}

/* Wobble 按钮 */
@keyframes wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.button:hover {
  animation: wobble 0.5s ease;
}

/* 发光效果 */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px #1890ff; }
  50% { box-shadow: 0 0 20px #1890ff; }
}

.button:hover {
  animation: glow 1s ease-in-out infinite;
}`}
                  </div>

                  <h3>3. 卡片入场动画</h3>
                  <p className="css-animation-example__desc">
                    用于列表项或卡片的渐进式显示
                  </p>
                  <div className="animation-usecase__cards">
                    <div className="animation-usecase__card" style={{ animationDelay: '0s' }}>Card 1</div>
                    <div className="animation-usecase__card" style={{ animationDelay: '0.1s' }}>Card 2</div>
                    <div className="animation-usecase__card" style={{ animationDelay: '0.2s' }}>Card 3</div>
                    <div className="animation-usecase__card" style={{ animationDelay: '0.3s' }}>Card 4</div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 卡片淡入上移 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.6s ease-out both;
}

/* 使用延迟创建级联效果 */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
.card:nth-child(4) { animation-delay: 0.3s; }`}
                  </div>

                  <h3>4. 通知提示动画</h3>
                  <p className="css-animation-example__desc">
                    Toast 或 Alert 组件的入场/离场动画
                  </p>
                  <div className="animation-usecase__demo">
                    <div className="animation-usecase__notification animation-usecase__notification--slide">
                      <span>✓ 操作成功！</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 从右侧滑入 */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 淡出并缩小 */
@keyframes fadeOutScale {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.8);
    opacity: 0;
  }
}

.notification {
  animation: slideInRight 0.3s ease-out;
}

.notification.closing {
  animation: fadeOutScale 0.3s ease-out forwards;
}`}
                  </div>

                  <h3>5. 进度条动画</h3>
                  <p className="css-animation-example__desc">
                    显示任务进度或加载状态
                  </p>
                  <div className="animation-usecase__demo">
                    <div className="animation-usecase__progress-bar">
                      <div className="animation-usecase__progress-fill"></div>
                    </div>
                    <div className="animation-usecase__progress-stripe">
                      <div className="animation-usecase__progress-fill-stripe"></div>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 进度条填充动画 */
@keyframes progressFill {
  from { width: 0%; }
  to { width: 75%; }
}

.progress-fill {
  animation: progressFill 2s ease-out forwards;
}

/* 斑马纹滚动效果 */
@keyframes stripeScroll {
  from { background-position: 0 0; }
  to { background-position: 40px 0; }
}

.progress-stripe {
  background-image: linear-gradient(
    45deg,
    rgba(255,255,255,0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255,255,255,0.2) 50%,
    rgba(255,255,255,0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  animation: stripeScroll 1s linear infinite;
}`}
                  </div>

                  <h3>6. 骨架屏动画</h3>
                  <p className="css-animation-example__desc">
                    内容加载时的占位动画
                  </p>
                  <div className="animation-usecase__skeleton">
                    <div className="animation-usecase__skeleton-line"></div>
                    <div className="animation-usecase__skeleton-line"></div>
                    <div className="animation-usecase__skeleton-line" style={{ width: '60%' }}></div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 闪烁效果 */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}`}
                  </div>

                  <h3>7. 无限滚动提示</h3>
                  <p className="css-animation-example__desc">
                    引导用户向下滚动的动画提示
                  </p>
                  <div className="animation-usecase__demo">
                    <div className="animation-usecase__scroll-indicator">
                      <div className="animation-usecase__scroll-arrow">↓</div>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 上下跳动箭头 */
@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(10px);
    opacity: 1;
  }
}

.scroll-arrow {
  animation: scrollBounce 2s ease-in-out infinite;
}`}
                  </div>

                  <h3>8. 数字滚动动画</h3>
                  <p className="css-animation-example__desc">
                    数字递增的视觉效果
                  </p>
                  <div className="animation-usecase__demo">
                    <div className="animation-usecase__counter">
                      <span className="animation-usecase__counter-number">1234</span>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 数字缩放脉冲 */
@keyframes counterPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.counter {
  animation: counterPulse 0.5s ease-out;
}

/* JavaScript 配合实现数字递增 */
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);

  function update() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  update();
}`}
                  </div>

                  <h3>9. 心跳效果</h3>
                  <p className="css-animation-example__desc">
                    用于点赞、收藏等交互反馈
                  </p>
                  <div className="animation-usecase__demo">
                    <div className="animation-usecase__heart">❤️</div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 心跳动画 */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  10%, 30% { transform: scale(0.9); }
  20%, 40% { transform: scale(1.1); }
}

.heart {
  animation: heartbeat 1s ease-in-out infinite;
}

/* 点击时的缩放效果 */
@keyframes heartClick {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.heart.clicked {
  animation: heartClick 0.3s ease-out;
}`}
                  </div>

                  <h3>10. 模态框动画</h3>
                  <p className="css-animation-example__desc">
                    弹窗的打开和关闭效果
                  </p>
                  <div className="css-animation-example__code">
                    {`/* 模态框淡入缩放 */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 背景遮罩淡入 */
@keyframes backdropIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  animation: modalIn 0.3s ease-out;
}

.backdrop {
  animation: backdropIn 0.3s ease-out;
}

/* 关闭动画 */
@keyframes modalOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.7);
  }
}

.modal.closing {
  animation: modalOut 0.3s ease-out forwards;
}`}
                  </div>

                  <div className="css-animation-example__info" style={{ marginTop: 24 }}>
                    <h3>💡 实用建议</h3>
                    <ul>
                      <li><strong>保持简洁：</strong>动画时长通常在 200-500ms 之间</li>
                      <li><strong>有意义：</strong>动画应该帮助用户理解交互，而不是分散注意力</li>
                      <li><strong>一致性：</strong>在整个应用中使用一致的动画风格</li>
                      <li><strong>可访问性：</strong>提供禁用动画的选项（prefers-reduced-motion）</li>
                      <li><strong>性能优先：</strong>优先使用 transform 和 opacity</li>
                    </ul>
                    <div className="css-animation-example__code">
                      {`/* 尊重用户的动画偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}
                    </div>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '5',
            label: '性能优化',
            children: (
              <div className="css-animation-example__section">
                <Card title="动画性能优化建议">
                  <div className="css-animation-example__info">
                    <h3>✅ 推荐的动画属性</h3>
                    <p className="css-animation-example__desc">
                      <Tag color="green">GPU 加速</Tag>
                      这些属性可以触发 GPU 硬件加速，性能最佳
                    </p>
                    <ul>
                      <li><code>transform</code> - 变换（位移、缩放、旋转）</li>
                      <li><code>opacity</code> - 透明度</li>
                    </ul>
                    <div className="css-animation-example__code">
                      {`/* 推荐：使用 transform */
@keyframes slideIn {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}

/* 推荐：使用 opacity */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`}
                    </div>
                  </div>

                  <div className="css-animation-example__info" style={{ marginTop: 24, background: '#fff2e8', borderLeftColor: '#fa8c16' }}>
                    <h3>❌ 避免的动画属性</h3>
                    <p className="css-animation-example__desc">
                      <Tag color="orange">触发重排/重绘</Tag>
                      这些属性会触发布局重排或重绘，性能较差
                    </p>
                    <ul>
                      <li><code>width</code>, <code>height</code> - 触发重排</li>
                      <li><code>left</code>, <code>top</code>, <code>margin</code> - 触发重排</li>
                      <li><code>padding</code>, <code>border</code> - 触发重排</li>
                      <li><code>background</code>, <code>color</code> - 触发重绘</li>
                    </ul>
                    <div className="css-animation-example__code">
                      {`/* 不推荐：使用 left/top */
@keyframes badSlide {
  from { left: -100px; }
  to { left: 0; }
}

/* 推荐：使用 transform */
@keyframes goodSlide {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}`}
                    </div>
                  </div>

                  <h3 style={{ marginTop: 24 }}>优化技巧</h3>

                  <h4>1. 使用 will-change 提示浏览器</h4>
                  <div className="css-animation-example__code">
                    {`/* 提前告知浏览器将要变化的属性 */
.element {
  will-change: transform, opacity;
}

/* 动画结束后移除 */
.element.animation-ended {
  will-change: auto;
}

/* 注意：不要过度使用，会消耗资源 */`}
                  </div>

                  <h4>2. 使用 transform3d 强制开启硬件加速</h4>
                  <div className="css-animation-example__code">
                    {`/* 使用 3D transform 开启 GPU 加速 */
.element {
  transform: translate3d(0, 0, 0);
}

/* 或使用 translateZ */
.element {
  transform: translateZ(0);
}`}
                  </div>

                  <h4>3. 减少动画元素数量</h4>
                  <div className="css-animation-example__code">
                    {`/* 不好：同时动画多个属性 */
@keyframes bad {
  from {
    width: 100px;
    height: 100px;
    margin-left: 0;
    background: red;
  }
  to {
    width: 200px;
    height: 200px;
    margin-left: 100px;
    background: blue;
  }
}

/* 好：只动画 transform 和 opacity */
@keyframes good {
  from {
    transform: scale(1) translateX(0);
    opacity: 0;
  }
  to {
    transform: scale(2) translateX(100px);
    opacity: 1;
  }
}`}
                  </div>

                  <h4>4. 使用 animation-fill-mode 避免闪烁</h4>
                  <div className="css-animation-example__code">
                    {`/* 保持动画结束状态 */
.element {
  animation: fadeIn 1s ease-out forwards;
}

/* 应用动画开始前的样式 */
.element {
  animation: fadeIn 1s ease-out backwards;
}

/* 两者都应用 */
.element {
  animation: fadeIn 1s ease-out both;
}`}
                  </div>

                  <h4>5. 控制动画复杂度</h4>
                  <div className="css-animation-example__code">
                    {`/* 不好：过多的关键帧 */
@keyframes complex {
  0% { transform: translateX(0); }
  10% { transform: translateX(10px); }
  20% { transform: translateX(20px); }
  /* ...100 个关键帧... */
  100% { transform: translateX(1000px); }
}

/* 好：简化关键帧，让浏览器插值 */
@keyframes simple {
  from { transform: translateX(0); }
  to { transform: translateX(1000px); }
}`}
                  </div>

                  <h4>6. 使用 requestAnimationFrame</h4>
                  <div className="css-animation-example__code">
                    {`/* JavaScript 动画优化 */
function animate() {
  // 动画逻辑
  element.style.transform = \`translateX(\${x}px)\`;

  // 使用 rAF 而不是 setTimeout
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);`}
                  </div>

                  <div className="css-animation-example__info" style={{ marginTop: 24, background: '#f0f5ff', borderLeftColor: '#1890ff' }}>
                    <h3>💡 性能检测</h3>
                    <p>使用 Chrome DevTools 的 Performance 面板来分析动画性能：</p>
                    <ul>
                      <li>打开 DevTools → Performance</li>
                      <li>录制动画执行过程</li>
                      <li>查看 FPS、CPU 使用率</li>
                      <li>检查是否有掉帧（Frames 低于 60fps）</li>
                      <li>查看是否触发了 Layout 和 Paint</li>
                    </ul>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: '6',
            label: '高级技巧',
            children: (
              <div className="css-animation-example__section">
                <Card title="CSS Animation 高级技巧">
                  <h3>1. 使用 CSS Variables 动态控制动画</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="purple">动态控制</Tag>
                    通过 CSS 自定义属性实现运行时动画参数调整
                  </p>
                  <div className="animation-advanced__demo">
                    <div className="animation-advanced__variable-box"></div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* CSS: 使用变量定义动画参数 */
:root {
  --animation-duration: 2s;
  --animation-delay: 0s;
  --animation-scale: 1.2;
}

@keyframes dynamicScale {
  from { transform: scale(1); }
  to { transform: scale(var(--animation-scale)); }
}

.element {
  animation: dynamicScale var(--animation-duration) ease-in-out infinite alternate;
  animation-delay: var(--animation-delay);
}

/* JavaScript: 动态修改变量 */
element.style.setProperty('--animation-duration', '1s');
element.style.setProperty('--animation-scale', '1.5');`}
                  </div>

                  <h3>2. 帧动画 - steps() 函数</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="cyan">逐帧播放</Tag>
                    实现雪碧图动画或打字机效果
                  </p>
                  <div className="animation-advanced__demo">
                    <div className="animation-advanced__sprite-animation"></div>
                    <div className="animation-advanced__typing">
                      Hello, World!
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 雪碧图动画 - 8帧 */
.sprite {
  width: 100px;
  height: 100px;
  background: url('sprite.png') 0 0;
  animation: sprite-walk 0.8s steps(8) infinite;
}

@keyframes sprite-walk {
  to { background-position: -800px 0; }
}

/* 打字机效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

.typewriter {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  animation:
    typing 3s steps(13) forwards,
    blink 0.5s step-end infinite;
}`}
                  </div>

                  <h3>3. 3D 变换动画</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="orange">立体效果</Tag>
                    创建翻转、旋转立方体等3D动画
                  </p>
                  <div className="animation-advanced__demo">
                    <div className="animation-advanced__flip-card">
                      <div className="animation-advanced__flip-card-inner">
                        <div className="animation-advanced__flip-card-front">前面</div>
                        <div className="animation-advanced__flip-card-back">背面</div>
                      </div>
                    </div>
                    <div className="animation-advanced__cube">
                      <div className="animation-advanced__cube-face animation-advanced__cube-face--front">1</div>
                      <div className="animation-advanced__cube-face animation-advanced__cube-face--back">2</div>
                      <div className="animation-advanced__cube-face animation-advanced__cube-face--right">3</div>
                      <div className="animation-advanced__cube-face animation-advanced__cube-face--left">4</div>
                      <div className="animation-advanced__cube-face animation-advanced__cube-face--top">5</div>
                      <div className="animation-advanced__cube-face animation-advanced__cube-face--bottom">6</div>
                    </div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 3D 翻转卡片 */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 200px;
  height: 200px;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

/* 旋转立方体 */
@keyframes rotateCube {
  0% { transform: rotateX(0) rotateY(0); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

.cube {
  width: 100px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 10s linear infinite;
}

.cube-face {
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0.9;
}

.cube-face--front  { transform: translateZ(50px); }
.cube-face--back   { transform: rotateY(180deg) translateZ(50px); }
.cube-face--right  { transform: rotateY(90deg) translateZ(50px); }
.cube-face--left   { transform: rotateY(-90deg) translateZ(50px); }
.cube-face--top    { transform: rotateX(90deg) translateZ(50px); }
.cube-face--bottom { transform: rotateX(-90deg) translateZ(50px); }`}
                  </div>

                  <h3>4. 动画组合与链式动画</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="blue">复杂序列</Tag>
                    多个动画同时或依次执行
                  </p>
                  <div className="animation-advanced__demo">
                    <div className="animation-advanced__chain-box"></div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 同时执行多个动画 */
.element {
  animation:
    fadeIn 1s ease-out,
    slideUp 1s ease-out,
    rotate 1s ease-out;
}

/* 链式动画 - 使用延迟 */
.element {
  animation:
    fadeIn 0.5s ease-out 0s,
    scaleUp 0.5s ease-out 0.5s,
    rotate 0.5s ease-out 1s;
}

/* 复杂序列动画 */
@keyframes complexSequence {
  0% {
    transform: translateX(0) scale(1);
    opacity: 0;
  }
  25% {
    transform: translateX(100px) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(100px) scale(1.5);
    opacity: 1;
  }
  75% {
    transform: translateX(0) scale(1.5);
    opacity: 1;
  }
  100% {
    transform: translateX(0) scale(1) rotate(360deg);
    opacity: 1;
  }
}

.element {
  animation: complexSequence 4s ease-in-out infinite;
}`}
                  </div>

                  <h3>5. 自定义 cubic-bezier 缓动函数</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="green">精确控制</Tag>
                    创建独特的动画速度曲线
                  </p>
                  <div className="animation-advanced__bezier-demo">
                    <div className="animation-advanced__bezier-box animation-advanced__bezier-box--1">弹性</div>
                    <div className="animation-advanced__bezier-box animation-advanced__bezier-box--2">回弹</div>
                    <div className="animation-advanced__bezier-box animation-advanced__bezier-box--3">加速</div>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* 弹性效果 */
.elastic {
  animation: moveRight 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 回弹效果 */
.bounce-back {
  animation: moveRight 2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 快速加速 */
.fast-start {
  animation: moveRight 2s cubic-bezier(0.95, 0.05, 0.795, 0.035);
}

/* 自定义缓动函数生成器 */
/* 可访问 https://cubic-bezier.com 调试 */`}
                  </div>

                  <h3>6. SVG 路径动画</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="red">矢量动画</Tag>
                    实现描边动画和变形效果
                  </p>
                  <div className="animation-advanced__demo">
                    <svg className="animation-advanced__svg" viewBox="0 0 100 100" width="150" height="150">
                      <circle
                        className="animation-advanced__svg-circle"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#1890ff"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* SVG 描边动画 */
.svg-circle {
  stroke-dasharray: 283; /* 周长: 2πr */
  stroke-dashoffset: 283;
  animation: drawCircle 2s ease-out forwards;
}

@keyframes drawCircle {
  to {
    stroke-dashoffset: 0;
  }
}

/* SVG 路径变形 */
@keyframes morphPath {
  0% {
    d: path("M10,10 L90,10 L90,90 L10,90 Z");
  }
  50% {
    d: path("M50,10 L90,50 L50,90 L10,50 Z");
  }
  100% {
    d: path("M10,10 L90,10 L90,90 L10,90 Z");
  }
}`}
                  </div>

                  <h3>7. 视差滚动动画</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="purple">滚动触发</Tag>
                    基于滚动位置的动画效果
                  </p>
                  <div className="css-animation-example__code">
                    {`/* 使用 Intersection Observer API */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

/* CSS */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s, transform 0.6s;
}

.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* CSS Scroll-driven Animations (实验性) */
@scroll-timeline section-timeline {
  source: selector(#section);
}

.parallax-element {
  animation: parallax linear;
  animation-timeline: section-timeline;
}

@keyframes parallax {
  to { transform: translateY(-100px); }
}`}
                  </div>

                  <h3>8. 动画暂停和恢复</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="orange">交互控制</Tag>
                    通过 JavaScript 控制动画状态
                  </p>
                  <div className="animation-advanced__demo">
                    <div className="animation-advanced__pause-box"></div>
                    <Button
                      size="small"
                      onClick={() => {
                        const box = document.querySelector('.animation-advanced__pause-box') as HTMLElement;
                        if (box) {
                          const current = box.style.animationPlayState;
                          box.style.animationPlayState = current === 'paused' ? 'running' : 'paused';
                        }
                      }}
                    >
                      暂停/继续
                    </Button>
                  </div>
                  <div className="css-animation-example__code">
                    {`/* CSS */
.animated {
  animation: rotate 3s linear infinite;
  animation-play-state: running;
}

.animated.paused {
  animation-play-state: paused;
}

/* JavaScript 控制 */
const element = document.querySelector('.animated');

// 暂停
element.style.animationPlayState = 'paused';

// 继续
element.style.animationPlayState = 'running';

// 切换
element.style.animationPlayState =
  element.style.animationPlayState === 'paused'
    ? 'running'
    : 'paused';

// 监听动画事件
element.addEventListener('animationstart', () => {
  console.log('动画开始');
});

element.addEventListener('animationiteration', () => {
  console.log('动画重复');
});

element.addEventListener('animationend', () => {
  console.log('动画结束');
});`}
                  </div>

                  <h3>9. 性能监控与调试</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="red">性能分析</Tag>
                    使用开发工具监控动画性能
                  </p>
                  <div className="css-animation-example__code">
                    {`/* 方法1: Performance API */
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'measure') {
      console.log(\`\${entry.name}: \${entry.duration}ms\`);
    }
  }
});

perfObserver.observe({ entryTypes: ['measure'] });

// 测量动画性能
performance.mark('animation-start');
element.addEventListener('animationend', () => {
  performance.mark('animation-end');
  performance.measure(
    'animation-duration',
    'animation-start',
    'animation-end'
  );
});

/* 方法2: FPS 监控 */
let lastTime = performance.now();
let frames = 0;

function measureFPS() {
  frames++;
  const currentTime = performance.now();

  if (currentTime >= lastTime + 1000) {
    const fps = Math.round((frames * 1000) / (currentTime - lastTime));
    console.log(\`FPS: \${fps}\`);
    frames = 0;
    lastTime = currentTime;
  }

  requestAnimationFrame(measureFPS);
}

measureFPS();

/* Chrome DevTools 技巧 */
// 1. Performance > 勾选 "Screenshots"
// 2. Rendering > Paint flashing (显示重绘区域)
// 3. Rendering > Frame Rendering Stats (显示 FPS)
// 4. Layers 面板查看合成层`}
                  </div>

                  <h3>10. 响应式动画</h3>
                  <p className="css-animation-example__desc">
                    <Tag color="blue">自适应</Tag>
                    根据设备和用户偏好调整动画
                  </p>
                  <div className="css-animation-example__code">
                    {`/* 根据屏幕尺寸调整动画 */
@media (max-width: 768px) {
  .element {
    animation-duration: 0.3s; /* 移动端动画更快 */
  }
}

@media (min-width: 1920px) {
  .element {
    animation-duration: 1s; /* 大屏动画更慢 */
  }
}

/* 尊重用户的动画偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 根据性能调整 */
@media (prefers-reduced-motion: no-preference) and (min-resolution: 2dppx) {
  /* 高分辨率设备可以使用更复杂的动画 */
  .element {
    animation: complexAnimation 2s;
  }
}

/* 暗黑模式下的动画调整 */
@media (prefers-color-scheme: dark) {
  .glow-animation {
    --glow-color: #40a9ff;
  }
}

/* JavaScript 检测性能 */
const isHighPerformance =
  navigator.hardwareConcurrency > 4 &&
  window.devicePixelRatio <= 2;

if (isHighPerformance) {
  document.body.classList.add('high-performance');
}`}
                  </div>

                  <div className="css-animation-example__info" style={{ marginTop: 24 }}>
                    <h3>🚀 高级技巧总结</h3>
                    <ul>
                      <li><strong>CSS Variables:</strong> 实现动态可控的动画参数</li>
                      <li><strong>steps():</strong> 创建逐帧动画和雪碧图效果</li>
                      <li><strong>3D Transform:</strong> 利用透视和立体变换创造空间感</li>
                      <li><strong>动画组合:</strong> 多个动画协同工作创造复杂效果</li>
                      <li><strong>自定义缓动:</strong> 使用 cubic-bezier 精确控制速度曲线</li>
                      <li><strong>SVG 动画:</strong> 矢量图形的描边和变形动画</li>
                      <li><strong>滚动动画:</strong> 基于视口位置触发动画</li>
                      <li><strong>性能监控:</strong> 实时追踪动画性能指标</li>
                      <li><strong>响应式设计:</strong> 适配不同设备和用户偏好</li>
                    </ul>
                  </div>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CssAnimationExample;
