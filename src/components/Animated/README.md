/**
 * @file components/Animated/README.md
 * @author leon.wang
 */

# Animated Component

一个通用的动画组件，为子组件提供丰富的动画效果和灵活的触发时机。

## 功能特性

- 🎨 **16 种动画效果**：fade、slide、scale、rotate、bounce、flip、zoom 等
- ⚡ **5 种触发方式**：onLoad（加载时）、onHover（悬停时）、onClick（点击时）、onVisible（进入视口时）、manual（手动控制）
- ⚙️ **灵活配置**：可自定义动画时长、延迟、缓动函数
- 🔁 **重复动画**：支持无限循环或指定重复次数
- 🎯 **回调支持**：提供动画开始和结束的回调函数

## 安装依赖

组件依赖 `ahooks` 的 `useInViewport` hook 来实现视口检测功能。

```bash
npm install ahooks
```

## 基础用法

### 1. 加载时触发动画

```tsx
import { Animated } from 'components/Animated';

<Animated type="fadeUp" duration={600}>
  <div>页面加载时淡入向上移动</div>
</Animated>
```

### 2. 悬停触发动画

```tsx
<Animated type="scale" trigger="onHover">
  <Button>悬停时放大</Button>
</Animated>
```

### 3. 点击触发动画

```tsx
<Animated type="bounce" trigger="onClick">
  <div>点击时弹跳</div>
</Animated>
```

### 4. 进入视口时触发

```tsx
<Animated type="fadeUp" trigger="onVisible" delay={200}>
  <Card>滚动到视口内时触发动画</Card>
</Animated>
```

### 5. 手动控制动画

```tsx
const [play, setPlay] = useState(false);

<Button onClick={() => setPlay(true)}>触发动画</Button>

<Animated type="zoom" trigger="manual" play={play}>
  <div>手动控制的动画</div>
</Animated>
```

## API 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 要添加动画的子元素 |
| `type` | `AnimationType` | `'fade'` | 动画类型 |
| `trigger` | `TriggerType` | `'onLoad'` | 触发时机 |
| `duration` | `number` | `600` | 动画时长（毫秒）|
| `delay` | `number` | `0` | 延迟时间（毫秒）|
| `easing` | `string` | `'ease-out'` | 缓动函数 |
| `repeat` | `boolean` | `false` | 是否重复播放 |
| `repeatCount` | `number` | - | 重复次数（设置时优先于 repeat）|
| `className` | `string` | `''` | 自定义类名 |
| `play` | `boolean` | `false` | 手动控制播放（仅 manual 模式）|
| `onAnimationEnd` | `() => void` | - | 动画结束回调 |
| `onAnimationStart` | `() => void` | - | 动画开始回调 |

## 动画类型 (AnimationType)

| 类型 | 说明 |
|------|------|
| `fade` | 淡入 |
| `fadeUp` | 淡入向上 |
| `fadeDown` | 淡入向下 |
| `fadeLeft` | 淡入向左 |
| `fadeRight` | 淡入向右 |
| `slideUp` | 滑入向上 |
| `slideDown` | 滑入向下 |
| `slideLeft` | 滑入向左 |
| `slideRight` | 滑入向右 |
| `scale` | 缩放 |
| `scaleUp` | 从小放大 |
| `scaleDown` | 从大缩小 |
| `rotate` | 旋转 |
| `bounce` | 弹跳 |
| `flip` | 翻转 |
| `zoom` | 缩放（带淡入）|

## 触发方式 (TriggerType)

| 类型 | 说明 |
|------|------|
| `onLoad` | 组件加载时自动播放 |
| `onHover` | 鼠标悬停时播放 |
| `onClick` | 点击时播放 |
| `onVisible` | 元素进入视口时播放 |
| `manual` | 通过 `play` 属性手动控制 |

## 高级示例

### 重复动画

```tsx
// 无限循环
<Animated type="bounce" repeat duration={1000}>
  <div>持续弹跳</div>
</Animated>

// 重复 3 次
<Animated type="rotate" repeat repeatCount={3} duration={1000}>
  <div>旋转 3 次</div>
</Animated>
```

### 级联动画

```tsx
{items.map((item, index) => (
  <Animated
    key={item.id}
    type="fadeUp"
    trigger="onVisible"
    delay={index * 100}
  >
    <Card>{item.content}</Card>
  </Animated>
))}
```

### 自定义配置

```tsx
<Animated
  type="fadeUp"
  duration={800}
  delay={200}
  easing="ease-in-out"
  onAnimationStart={() => console.log('开始')}
  onAnimationEnd={() => console.log('结束')}
>
  <div>自定义配置的动画</div>
</Animated>
```

## 注意事项

1. **性能优化**：避免在大量元素上同时使用复杂动画，建议使用 `delay` 属性创建级联效果
2. **视口检测**：`onVisible` 触发依赖 `useInViewport`，确保已安装 `ahooks`
3. **样式继承**：组件会将 `className` 添加到容器上，可以自定义样式
4. **重复播放**：使用 `repeat` 时注意可能影响用户体验，建议谨慎使用
5. **手动控制**：使用 `manual` 模式时，需要通过改变 `play` 属性来触发动画

## 示例页面

访问 `/app/components/animated` 查看完整的交互示例和使用场景。

## 文件结构

```
components/Animated/
├── Animated.tsx       # 组件实现
├── Animated.scss      # 动画样式
├── index.ts          # 导出文件
└── README.md         # 文档
```
