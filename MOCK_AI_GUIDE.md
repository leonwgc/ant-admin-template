# Mock AI Service 使用指南

## 🎯 什么是 Mock 模式？

Mock 模式是一个**无需 OpenAI API 密钥**的本地模拟 AI 助手，它使用预设的回答库智能匹配用户问题，提供相关的建议和答案。

## ✨ 特点

- ✅ **完全免费** - 无需 API 密钥，不消耗任何费用
- ✅ **即开即用** - 无需配置，开箱即用
- ✅ **智能匹配** - 根据关键词智能匹配回答
- ✅ **流式响应** - 模拟真实的打字效果
- ✅ **适合演示** - 完美用于测试、演示和学习

## 🚀 快速开始

### 1. 启用 Mock 模式（默认已启用）

1. 点击左侧菜单 **"AI 助手" > "AI 配置"**
2. 确认 **"使用 Mock 模式"** 开关已打开（默认开启）
3. 点击 **"保存配置"**

### 2. 使用 AI 助手

1. 点击右下角的机器人图标 🤖
2. 输入您的问题（支持中英文）
3. AI 助手会根据关键词智能匹配回答

## 📝 支持的问题类型

Mock AI 助手能够识别以下类型的问题并提供相关回答：

### 1. 问候语
- "你好"、"Hi"、"Hello"
- **回答示例**: "你好！我是 AI 助手，很高兴为您服务！"

### 2. 代码相关
- 包含关键词: 代码、code、函数、function、bug、错误
- **回答示例**:
  ```
  这段代码看起来不错！建议您可以考虑：
  1. 添加更多的错误处理逻辑
  2. 使用 TypeScript 增强类型安全
  3. 添加单元测试
  ```

### 3. React 相关
- 包含关键词: react、组件、component、hook、state
- **回答示例**:
  ```
  React 最佳实践：
  • 使用 Hooks 替代 Class 组件
  • 合理使用 useMemo 和 useCallback
  • 遵循单一职责原则
  ```

### 4. TypeScript 相关
- 包含关键词: typescript、ts、类型、type、interface
- **回答示例**:
  ```
  TypeScript 能大大提升代码质量！建议：
  • 充分利用类型推断
  • 使用接口定义数据结构
  • 避免使用 any
  ```

### 5. 性能优化
- 包含关键词: 性能、优化、performance、慢、卡顿
- **回答示例**:
  ```
  性能优化建议：
  1. 使用 React.lazy 进行代码分割
  2. 实现虚拟滚动处理大列表
  3. 使用 Web Workers 处理密集计算
  ```

### 6. 调试相关
- 包含关键词: 调试、debug、排查、问题、报错
- **回答示例**:
  ```
  调试建议：
  • 使用 console.log 打印关键变量
  • 利用浏览器 DevTools 断点功能
  • 检查网络请求是否正常
  ```

### 7. CSS 相关
- 包含关键词: css、样式、style、布局、响应式
- **回答示例**:
  ```
  CSS 最佳实践：
  • 使用 Flexbox 和 Grid 布局
  • 采用 BEM 命名规范
  • 使用 CSS 变量管理主题
  ```

### 8. API 相关
- 包含关键词: api、接口、请求、axios、fetch
- **回答示例**:
  ```
  API 设计建议：
  • 使用 RESTful 风格
  • 统一的错误处理
  • 添加请求限流
  ```

### 9. 感谢
- 包含关键词: 谢谢、感谢、thanks
- **回答示例**: "不客气！很高兴能帮到您！😊"

### 10. 其他问题
- 所有其他问题会得到通用的建议和引导

## 💡 使用技巧

### 1. 使用关键词
在问题中包含相关关键词可以获得更精准的回答：

```
❌ 不好的问题: "这个怎么办？"
✅ 好的问题: "React 组件如何优化性能？"

❌ 不好的问题: "有问题"
✅ 好的问题: "代码报错如何调试？"
```

### 2. 组合关键词
可以组合多个关键词获得更全面的回答：

```
"React TypeScript 类型定义"
"CSS Grid 布局响应式"
"API 接口错误处理"
```

### 3. 中英文均可
Mock AI 支持中英文问题：

```
✅ "如何优化 React 性能？"
✅ "How to optimize React performance?"
```

## 🔄 切换到真实 API 模式

如果您有 OpenAI API 密钥，可以切换到真实 API 模式获得更智能的回答：

1. 进入 **AI 配置**页面
2. 关闭 **"使用 Mock 模式"** 开关
3. 输入您的 **OpenAI API 密钥**
4. 选择模型（推荐 GPT-3.5 Turbo）
5. 点击 **"测试连接"** 验证
6. 保存配置

## 🎨 回答示例

### 示例 1: 询问 React Hooks

**问题**: "React Hooks 有哪些最佳实践？"

**回答**:
```
在 React 开发中，推荐使用函数组件 + Hooks。关键要点：
• useState 管理状态
• useEffect 处理副作用
• useContext 共享全局状态
• 自定义 Hooks 实现逻辑复用
```

### 示例 2: 询问性能优化

**问题**: "网站加载很慢，如何优化性能？"

**回答**:
```
提升应用性能的关键点：
• 减少首屏加载时间
• 使用缓存策略
• 优化网络请求（合并、压缩）
• 避免内存泄漏
```

### 示例 3: 询问代码调试

**问题**: "代码有 bug，怎么调试？"

**回答**:
```
遇到 Bug 时的排查步骤：
• 复现问题
• 隔离问题代码
• 逐步注释代码定位
• 使用断点调试
• 查看控制台错误信息
```

## 📊 Mock 模式 vs 真实 API

| 特性 | Mock 模式 | 真实 API 模式 |
|------|----------|--------------|
| 费用 | 完全免费 | 按使用付费 |
| API 密钥 | 不需要 | 需要 |
| 智能程度 | 关键词匹配 | GPT 模型 |
| 回答质量 | 预设回答 | 动态生成 |
| 响应速度 | 极快 | 稍慢（取决于网络）|
| 适用场景 | 测试、演示、学习 | 生产环境 |
| 定制化 | 有限 | 高度定制 |

## 🛠️ 技术实现

Mock AI Service 的核心实现：

```typescript
// src/services/mockAIService.ts

// 1. 关键词检测
private detectCategory(message: string): string {
  const lowerMessage = message.toLowerCase();

  // 检测 React 相关
  if (/(react|组件|component|hook)/i.test(lowerMessage)) {
    return 'react';
  }

  // 检测性能相关
  if (/(性能|优化|performance)/i.test(lowerMessage)) {
    return 'performance';
  }

  // ... 更多类别
}

// 2. 随机选择回答
private getRandomResponse(category: string): string {
  const responses = MOCK_RESPONSES[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

// 3. 模拟打字效果
async sendMessage(messages, onProgress) {
  const response = this.getRandomResponse(category);

  // 逐字符输出
  for (let i = 0; i < response.length; i++) {
    currentText += response[i];
    onProgress(currentText);
    await delay(20-50ms); // 随机延迟
  }
}
```

## 🎯 扩展 Mock 回答

如果您想添加更多预设回答，可以编辑 `src/services/mockAIService.ts`：

```typescript
const MOCK_RESPONSES = {
  // 添加新的类别
  myCategory: [
    '回答 1',
    '回答 2',
    '回答 3',
  ],

  // 在 detectCategory 方法中添加检测逻辑
  // if (/关键词/i.test(lowerMessage)) {
  //   return 'myCategory';
  // }
};
```

## 🔒 隐私和安全

- ✅ 所有对话历史仅保存在浏览器本地
- ✅ 不会上传到任何服务器
- ✅ 清空浏览器数据即可删除所有记录
- ✅ Mock 模式不涉及任何网络请求

## 💬 反馈与建议

如果您对 Mock AI 助手有任何建议或想添加新的回答类型，欢迎：

1. 在项目中提交 Issue
2. 提交 Pull Request
3. 联系项目维护者

---

**享受使用 Mock AI 助手的乐趣吧！** 🎉
