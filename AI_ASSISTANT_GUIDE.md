# AI 助手/Copilot 功能说明

## 📖 功能概述

本项目已集成 AI 助手（Copilot）功能，提供基于 OpenAI API 的智能对话能力。您可以在应用的任何页面通过浮动按钮快速访问 AI 助手。

## ✨ 主要特性

### 1. 浮动 AI 助手
- **位置**: 屏幕右下角固定浮动按钮
- **功能**:
  - 实时对话
  - 历史记录自动保存
  - 流式响应（打字机效果）
  - 未读消息提示
  - 清空对话历史

### 2. AI 配置页面
- **路径**: `/app/ai/settings`
- **功能**:
  - API 密钥配置
  - 模型选择（GPT-4 / GPT-3.5 Turbo / GPT-4 Mini）
  - 参数调节（温度、最大令牌数）
  - 自定义系统提示词
  - API 连接测试
  - 启用/禁用 AI 助手

## 🚀 快速开始

### 步骤 1: 获取 OpenAI API 密钥

1. 访问 [OpenAI 官网](https://platform.openai.com)
2. 注册并登录账号
3. 进入 [API Keys](https://platform.openai.com/api-keys) 页面
4. 点击 "Create new secret key" 创建新密钥
5. 复制生成的密钥（只显示一次，请妥善保存）

### 步骤 2: 配置 AI 助手

1. 启动应用后，点击左侧菜单 **AI 助手 > AI 配置**
2. 在 "API 密钥" 字段粘贴您的 OpenAI API 密钥
3. 选择合适的模型（推荐 GPT-3.5 Turbo）
4. 可选：调整温度参数（0.7 为默认值，适合大多数场景）
5. 点击 **"测试连接"** 验证配置是否正确
6. 点击 **"保存配置"** 保存设置

### 步骤 3: 使用 AI 助手

1. 在任意页面，点击右下角的机器人图标 🤖
2. 在聊天面板中输入您的问题
3. 按回车或点击 "发送" 按钮
4. AI 助手将实时回复您的问题

## 🛠️ 技术实现

### 文件结构

```
src/
├── services/
│   └── aiService.ts              # AI 服务封装（API 调用、配置管理）
├── components/
│   └── AICopilot/
│       ├── AICopilot.tsx         # 浮动助手组件
│       ├── AICopilot.scss        # 样式文件
│       └── index.ts              # 导出
├── pages/
│   └── AI/
│       ├── AISettings.tsx        # AI 配置页面
│       └── AISettings.scss       # 样式文件
└── locales/
    └── pages/
        └── ai/
            ├── zh.ts             # 中文翻译
            └── en.ts             # 英文翻译
```

### 核心组件

#### 1. AIService (services/aiService.ts)

负责处理所有 AI 相关的业务逻辑：

```typescript
import { aiService } from '~/services/aiService';

// 获取配置
const config = aiService.getConfig();

// 保存配置
aiService.saveConfig({ apiKey: 'your-api-key' });

// 发送消息（支持流式响应）
await aiService.sendMessage(messages, (text) => {
  console.log('实时响应:', text);
});

// 测试连接
const isConnected = await aiService.testConnection();
```

#### 2. AICopilot 组件

全局浮动助手，集成到 `layouts/App.tsx` 中：

```tsx
import AICopilot from '~/components/AICopilot';

// 在布局组件中使用
<Layout>
  {/* 其他内容 */}
  <AICopilot />
</Layout>
```

#### 3. AISettings 页面

配置页面，通过路由访问：

- **路由**: `/app/ai/settings`
- **菜单**: AI 助手 > AI 配置

## ⚙️ 配置参数说明

### API 密钥 (apiKey)
- **必填项**
- 从 OpenAI 官网获取
- 仅保存在浏览器本地，不会上传到服务器

### AI 模型 (model)
- **GPT-4**: 最强大，适合复杂任务（成本较高，响应较慢）
- **GPT-3.5 Turbo**: 平衡性能与成本（推荐）
- **GPT-4 Mini**: 快速响应，适合简单对话

### 温度参数 (temperature)
- **范围**: 0 - 2
- **默认**: 0.7
- **说明**:
  - 0: 最确定、最保守的回答
  - 0.7: 平衡创造性和准确性（推荐）
  - 2: 最随机、最有创造性

### 最大令牌数 (maxTokens)
- **范围**: 100 - 4000
- **默认**: 2000
- **说明**: 控制单次回复的长度
  - 1 token ≈ 0.75 个英文单词
  - 1 token ≈ 1-2 个中文字符

### 系统提示词 (systemPrompt)
- **可选项**
- 定义 AI 的角色、专业领域和回复风格
- 示例:
  ```
  You are a helpful AI assistant for an admin dashboard.
  You specialize in helping with code explanations, debugging,
  and answering technical questions about React, TypeScript,
  and web development.
  ```

## 💾 数据存储

所有配置和聊天历史记录保存在浏览器的 localStorage 中：

- **配置**: `ai_assistant_config`
- **聊天历史**: `ai_assistant_chat_history`

### 清除数据

如需清除所有数据，可在浏览器控制台执行：

```javascript
localStorage.removeItem('ai_assistant_config');
localStorage.removeItem('ai_assistant_chat_history');
```

或在 AI 配置页面点击 **"重置为默认"** 按钮。

## 🎨 自定义样式

AI 助手的样式定义在 `src/components/AICopilot/AICopilot.scss` 中，您可以根据需要修改：

```scss
.ai-copilot-trigger {
  // 浮动按钮样式
  bottom: 32px;  // 距离底部距离
  right: 32px;   // 距离右侧距离
}

.ai-copilot-panel {
  // 聊天面板样式
  width: 400px;   // 面板宽度
  height: 600px;  // 面板高度
}
```

## 🔐 安全性

- ✅ API 密钥仅保存在浏览器本地存储
- ✅ 不会发送到项目服务器
- ✅ 直接与 OpenAI API 通信
- ⚠️ 请勿在公共电脑上保存 API 密钥
- ⚠️ 定期更换 API 密钥以确保安全

## 📱 移动端适配

AI 助手已适配移动端：

- 响应式布局
- 触摸操作优化
- 屏幕尺寸自适应

## 🐛 故障排除

### 问题 1: "API 连接测试失败"

**可能原因**:
- API 密钥不正确
- 网络连接问题
- OpenAI 服务不可用

**解决方案**:
1. 确认 API 密钥正确
2. 检查网络连接
3. 确认 OpenAI 服务状态

### 问题 2: "请先配置 API 密钥"

**解决方案**:
进入 AI 配置页面，输入有效的 OpenAI API 密钥

### 问题 3: 消息发送后无响应

**可能原因**:
- API 密钥额度用尽
- 网络请求超时
- 模型不可用

**解决方案**:
1. 检查 API 密钥额度
2. 尝试切换其他模型
3. 查看浏览器控制台错误信息

## 🔄 更新日志

### v1.0.0 (2026-02-25)
- ✨ 初始版本发布
- ✅ 支持 OpenAI GPT-4、GPT-3.5 Turbo、GPT-4 Mini
- ✅ 流式响应（打字机效果）
- ✅ 聊天历史记录
- ✅ 完整的配置界面
- ✅ 中英文双语支持
- ✅ 移动端适配

## 📚 相关资源

- [OpenAI API 文档](https://platform.openai.com/docs/api-reference)
- [OpenAI 定价](https://openai.com/pricing)
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

本功能遵循项目整体许可协议。
