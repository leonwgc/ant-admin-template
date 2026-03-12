---
marp: true
theme: default
paginate: true
header: 'AI 核心概念详解 - leonwgc'
footer: 'leon.wang | 2026年3月12日'
style: |
  section {
    font-size: 28px;
    padding-bottom: 50px;
  }
  h1 {
    color: #1890ff;
  }
  h2 {
    color: #52c41a;
  }
  header {
    color: #666;
    font-size: 18px;
  }
  footer {
    color: #666;
    font-size: 16px;
    font-weight: 500;
    display: none;
  }
  section::after {
    color: #666;
    font-size: 18px;
    font-weight: bold;
  }
---

<!-- _class: lead -->
# AI 核心概念详解

## 从 LLM 到 Agent 的完整知识体系

**演讲人**: leon.wang
**日期**: 2026年

---

## 目录 📚

1. **基础概念** - AI 的基石
   - LLM、Prompt、Context、Token

2. **高级概念** - 智能系统的构建
   - Agent、Tool、MCP、Skill、Memory

3. **架构设计** - 系统如何协作

4. **实际应用** - 真实场景演示

---

<!-- _class: lead -->
# 第一部分：基础概念

---

## LLM - 大语言模型 🧠

### 什么是 LLM？
通过海量文本数据训练的深度学习模型，具备：

- ✅ **理解能力** - 理解自然语言语义
- ✅ **生成能力** - 生成连贯文本
- ✅ **泛化能力** - 处理未见过的任务
- ✅ **多模态** - 支持图像、音频等

---

## LLM 代表产品

### 国际主流
| 产品 | 公司 | 特点 |
|------|------|------|
| GPT-4 | OpenAI | 最强大的通用模型 |
| Claude | Anthropic | 长上下文(200K) |
| Gemini | Google | 多模态能力强 |
| Llama | Meta | 开源社区首选 |

### 国内产品
通义千问、文心一言、智谱清言、Kimi 等

---

## LLM 核心参数

```
┌─────────────────────────────────────────┐
│  Temperature (温度): 0.0 - 2.0          │
│  控制输出的随机性                        │
│  • 0.0 = 完全确定                        │
│  • 1.0 = 平衡                            │
│  • 2.0 = 高度创造性                      │
├─────────────────────────────────────────┤
│  Max Tokens: 最大输出长度               │
│  Context Window: 上下文窗口             │
│  • GPT-4: 128K tokens                   │
│  • Claude: 200K tokens                  │
│  • Gemini: 1M tokens                    │
└─────────────────────────────────────────┘
```

---

## Prompt - 提示词 💬

### 定义
向 LLM 输入的指令，决定 AI 的行为和输出质量

### 四种类型

1. **Zero-shot** - 直接提问
2. **Few-shot** - 提供示例
3. **Chain-of-Thought** - 逐步推理
4. **System Prompt** - 定义角色

---

## Prompt Engineering 实例

### ❌ 差的 Prompt
```
"写个函数"
```

### ✅ 好的 Prompt
```
你是一个 TypeScript 专家。
请编写一个函数，功能是：
- 防抖处理用户输入
- 延迟时间 300ms
- 返回类型明确
- 包含单元测试

请使用 ES6+ 语法，添加详细注释。
```

---

## Context - 上下文 📖

### 组成公式
```
Context = System Prompt
        + 历史对话
        + 当前输入
        + 注入的文档/数据
```

### Context Window 大小对比
- GPT-3.5: 4K / 16K tokens
- GPT-4: 8K / 32K / 128K tokens
- Claude 3: **200K tokens**
- Gemini 1.5: **1M tokens** 🚀

---

## Context 管理策略

```
┌─────────────────────────────────────┐
│  当 Context 超出限制时...           │
├─────────────────────────────────────┤
│  1. 截断 - 删除最旧的对话           │
│  2. 摘要 - 压缩历史信息             │
│  3. 滑动窗口 - 保留最近 N 条        │
│  4. RAG - 仅加载相关片段            │
└─────────────────────────────────────┘
```

**关键**: Context 越大，成本越高，速度越慢

---

## Token - 计量单位 🔢

### 什么是 Token？
LLM 处理文本的基本单位

### 计算规则
- **英文**: ~1 token = 4 个字符
- **中文**: ~1 token = 1-2 个汉字
- **代码**: 根据语法结构分词

### 为什么重要？
- 💰 **成本** - API 按 token 计费
- ⚡ **速度** - Token 越多越慢
- 📏 **限制** - 超出会被截断

---

<!-- _class: lead -->
# 第二部分：高级概念

---

## Agent - 智能体 🤖

### 核心公式
```
Agent = LLM + Tools + Memory + Planning
```

### 四大能力
1. **推理 (Reasoning)** - 理解任务
2. **规划 (Planning)** - 制定步骤
3. **执行 (Acting)** - 调用工具
4. **反思 (Reflection)** - 评估调整

---

## Agent 类型对比

### 1️⃣ ReAct Agent (推理-行动)
```
Thought → Action → Observation → Thought → ...
```

### 2️⃣ Tool-Using Agent (工具使用型)
调用 API、数据库、文件系统等

### 3️⃣ Multi-Agent System (多智能体)
多个 Agent 协作解决复杂任务

---

## Agent 典型架构

```
        用户输入
           ↓
    [Agent Controller]
           ↓
      [LLM 推理层]
           ↓
    [Tool Registry] ← 工具注册表
           ↓
       [工具执行]
           ↓
   [结果反馈到 LLM]
           ↓
      继续 or 结束
```

---

## Agent 应用场景

| 应用类型 | 代表产品 | 能力 |
|---------|---------|------|
| 代码助手 | GitHub Copilot, Cursor | 代码生成、重构 |
| 自动化 | AutoGPT, BabyAGI | 自主完成任务 |
| 客服 | ChatBot | 处理用户问题 |
| 研究 | Research Agent | 信息搜索总结 |

---

## Tool - 工具 🔧

### 为什么需要 Tool？

LLM 的局限：
- ❌ 无法访问实时数据
- ❌ 无法执行代码
- ❌ 无法操作文件系统
- ❌ 无法调用外部 API

**Tool = LLM 的"手脚"**

---

## Tool 的结构

```typescript
interface Tool {
  name: string;          // 工具名称
  description: string;   // 描述（给 LLM 看）
  parameters: {          // 参数定义
    type: "object",
    properties: {
      param1: {
        type: "string",
        description: "参数说明"
      }
    },
    required: ["param1"]
  };
  execute: Function;     // 执行函数
}
```

---

## Tool 调用流程

```
1️⃣ LLM 决定使用工具
   ↓
   输出: tool_call {
     name: "search_file",
     args: { query: "*.tsx" }
   }

2️⃣ Agent 拦截并执行
   ↓
   查找工具并运行

3️⃣ 工具返回结果
   ↓
   { files: ["App.tsx", "index.tsx"] }

4️⃣ 结果注入回 Context
   ↓
   LLM 基于结果继续推理
```

---

## 常见 Tool 分类

### 文件操作
`read_file`, `write_file`, `search_files`

### 代码执行
`run_terminal`, `execute_python`, `compile`

### 网络请求
`fetch_url`, `api_call`, `web_search`

### 数据库
`query_database`, `update_record`

### 系统集成
`send_email`, `create_calendar_event`

---

## MCP - 模型上下文协议 🌐

### 什么是 MCP？
**Model Context Protocol**
统一 AI 与外部系统连接的开放标准

### 发布背景
- **发布者**: Anthropic (Claude 开发商)
- **时间**: 2024年11月
- **目标**: 标准化工具集成

---

## MCP 核心理念

```
❌ 传统方式
每个 AI 应用重复开发集成代码
   → 成本高、复用差、难维护

✅ MCP 方式
开发一次 MCP Server
   → 所有支持 MCP 的 AI 应用都能用
   → 一次开发，多处使用
```

---

## MCP 架构

```
┌─────────────────┐
│   AI 应用       │  Claude, GitHub Copilot...
│  (MCP Client)   │
└────────┬────────┘
         │ MCP Protocol (JSON-RPC)
         ↓
┌─────────────────┐
│   MCP Server    │  中间层
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
[数据源]   [工具集]
数据库     API
文件系统   服务
```

---

## MCP Server 三大能力

### 1️⃣ Resources (资源)
暴露可读的数据源
```typescript
{ uri: "file:///README.md", text: "..." }
```

### 2️⃣ Tools (工具)
可执行的功能
```typescript
{ name: "query_db", inputSchema: {...} }
```

### 3️⃣ Prompts (提示词模板)
预定义的提示词
```typescript
{ name: "code_review", arguments: [...] }
```

---

## MCP vs 传统 Tool

| 对比项 | 传统 Tool | MCP Server |
|--------|-----------|------------|
| 标准化 | ❌ 各自定义 | ✅ 统一协议 |
| 复用性 | ❌ 低 | ✅ 高 |
| 维护成本 | ❌ 高 | ✅ 低 |
| 发现机制 | 静态注册 | 动态查询 |

**结论**: MCP 是 Tool 的升级版

---

## 本项目的 MCP 实践

### Neat Design 组件库集成

```typescript
// 查询所有组件
mcp_neat-design-m_get_components_information()

// 获取组件文档
mcp_neat-design-m_get_component_document({
  componentName: "Table"
})

// 获取示例代码
mcp_neat-design-m_get_component_example({
  componentName: "Table",
  exampleFileName: "basic.tsx"
})
```

---

## Skill - 技能 🎯

### 定义
封装特定领域知识和工具集合的能力模块

### Skill vs Tool

| 对比项 | Tool | Skill |
|--------|------|-------|
| 粒度 | 单一功能 | 组合能力 |
| 范围 | 一个操作 | 一类问题 |
| 包含 | 函数+参数 | Prompts+Tools+知识 |

---

## Skill 组成公式

```
Skill = Domain Knowledge
      + Tools
      + Workflows
      + Examples
```

### 示例：React 性能优化 Skill
- **知识**: React 最佳实践
- **工具**: 代码分析、重构
- **流程**: 检测 → 分析 → 优化
- **示例**: useMemo、useCallback 使用场景

---

## Skill 触发机制

```
用户输入: "优化 React 组件性能"
    ↓
Agent 分析关键词: "React", "性能"
    ↓
匹配 Skill: "vercel-react-best-practices"
    ↓
加载 Skill 文档 (SKILL.md)
    ↓
基于 Skill 知识执行任务
```

**自动匹配 + 应用专家经验**

---

## 本项目的 Skills

```
.copilot/skills/
├── find-skills/
│   # 发现和安装技能
├── vercel-composition-patterns/
│   # React 组件设计模式
├── web-design-guidelines/
│   # UI/UX 最佳实践
└── vercel-react-best-practices/
    # React 性能优化
```

---

## Skill 的价值 💎

### 四大优势

1. ✅ **复用领域知识**
   一次编写，多次使用

2. ✅ **统一最佳实践**
   团队规范一致

3. ✅ **降低学习成本**
   新成员快速上手

4. ✅ **提升输出质量**
   自动应用专家经验

---

## Memory - 记忆系统 🧠

### 问题
LLM 本身是**无状态**的
```
每次对话 = 独立请求
不记得之前说过什么
```

### 解决方案
```
短期记忆 + 长期记忆 = 持续学习能力
```

---

## Memory 三种类型

### 1️⃣ Session Memory (会话记忆)
- **范围**: 当前对话
- **存储**: 对话历史
- **用途**: 上下文连贯

### 2️⃣ User Memory (用户记忆)
- **范围**: 跨会话
- **存储**: 用户偏好、习惯
- **用途**: 个性化服务

### 3️⃣ Repository Memory (代码库记忆)
- **范围**: 特定项目
- **存储**: 项目规范、架构
- **用途**: 一致性保证

---

## Memory 检索策略

### 1. 向量检索 (Vector Search)
```
用户问题 → Embedding → 向量
    ↓
在向量库中搜索相似内容
    ↓
返回最相关记忆
```

### 2. 关键词检索
提取关键词 → 匹配索引

### 3. 时间衰减
最近的记忆权重更高

---

<!-- _class: lead -->
# 第三部分：架构设计

---

## 整体架构 - 分层视图

```
┌──────────────────────────────────┐
│        用户交互层                 │
├──────────────────────────────────┤
│        Agent 层                   │
│  Planning | Reasoning | Learning │
├──────────────────────────────────┤
│        能力层                     │
│  Skills | Tools | Memory         │
├──────────────────────────────────┤
│        MCP 协议层                 │
│  Resources | Tools | Prompts     │
├──────────────────────────────────┤
│        LLM 基础层                 │
│  GPT-4 / Claude / Gemini         │
├──────────────────────────────────┤
│        外部系统                   │
│  数据库 | API | 文件系统          │
└──────────────────────────────────┘
```

---

## 数据流向图

```
1. 用户输入
   ↓
2. Agent 接收 + Context 构建
   ↓
3. LLM 推理（基于 Prompt + Context）
   ↓
4. 决策：需要调用 Tool/Skill？
   ├─ 是 → 5. 通过 MCP 查询工具
   │        ↓ 执行工具
   │        ↓ 结果返回
   │        ↓ 继续推理
   │
   └─ 否 → 6. 生成最终回复
           ↓ 保存到 Memory
           ↓ 返回给用户
```

---

## 概念依赖关系

```
        LLM (基础)
           ↓
   Prompt + Context (输入层)
           ↓
       Agent (智能体)
           ↓
    ┌──────┼──────┐
    ↓      ↓      ↓
  Tools  Skills Memory
    ↓
   MCP (标准化协议)
```

**自下而上，层层构建**

---

<!-- _class: lead -->
# 第四部分：实际应用

---

## 案例 1: GitHub Copilot 工作流

### 场景
用户："帮我创建一个 React 用户列表页面"

---

## Copilot 执行步骤 (1/3)

### Step 1-3: 信息收集
```
1. 用户输入
   "创建 React 用户列表页面"

2. Agent 分析
   - 需要了解项目结构
   - 需要知道 UI 库
   - 需要了解路由方式

3. 调用 Tool 收集信息
   → read_file("config.menu.tsx")
   → read_file("instructions.md")
   → Memory: 查询项目规范
```

---

## Copilot 执行步骤 (2/3)

### Step 4-6: 知识应用
```
4. 触发 Skill
   → "vercel-react-best-practices"
   → 应用 React 最佳实践

5. 调用 MCP 获取组件文档
   → mcp_neat-design-m_get_component_document("Table")
   → mcp_neat-design-m_get_component_example("Table")

6. LLM 生成代码
   基于：项目规范 + 组件文档 + 最佳实践
```

---

## Copilot 执行步骤 (3/3)

### Step 7-10: 执行与保存
```
7. 执行文件操作
   → create_file("UserList.tsx")
   → create_file("UserList.scss")

8. 更新配置
   → 更新菜单配置
   → 更新路由映射

9. 保存到 Memory
   "创建了用户列表，路由 /app/users"

10. 返回结果
    "已创建页面，文件位于..."
```

---

## 案例 2: 本项目 MCP 实践

### Neat Design Table 组件使用

```typescript
// 1. 用户请求
"创建用户表格"

// 2. AI 检查规则
// 发现：使用 Neat Design 必须先调用 MCP

// 3. 调用 MCP 获取文档
const doc = await mcp_neat-design-m_get_component_document({
  componentName: "Table"
});

// 4. 获取示例
const example = await mcp_neat-design-m_get_component_example({
  componentName: "Table",
  exampleFileName: "basic.tsx"
});
```

---

## 生成符合规范的代码

```tsx
/**
 * @file pages/User/UserTable.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { Table } from '@derbysoft/neat-design';

const UserTable: FC = () => {
  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '邮箱', dataIndex: 'email' }
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default UserTable;
```

---

## 案例 3: Skill + Tool + Memory 协作

### 代码审查场景

```typescript
async function codeReview(code: string) {
  // 1. 触发 Skill
  const skill = loadSkill("vercel-react-best-practices");

  // 2. 从 Memory 读取项目规范
  const conventions = await memory.read("/repo/conventions.md");

  // 3. 使用 Tool 分析代码
  const issues = await tool.analyzeCode(code, {
    rules: skill.rules,
    conventions: conventions
  });

  // 4. LLM 生成审查报告
  // 5. 保存结果到 Memory
}
```

---

<!-- _class: lead -->
# 总结与展望

---

## 8 个关键理解 🎯

1. **LLM 是基础** - 所有智能的源泉
2. **Agent 是大脑** - 规划与决策
3. **Tool 是手脚** - 与世界交互
4. **MCP 是标准接口** - 统一连接
5. **Skill 是专业知识** - 领域专家
6. **Memory 是经验** - 持续学习
7. **Prompt 是语言** - 有效沟通
8. **Context 是视野** - 能力边界

---

## AI 发展趋势 📈

```
2023 前
  单纯的 LLM 对话
     ↓
2023
  Tool-using Agents (工具使用)
     ↓
2024
  MCP 协议标准化
     ↓
2025
  Multi-Agent 系统普及
     ↓
2026+
  自主 Agent + 持续学习 ← 我们在这里
```

---

## 学习路径建议 🛤️

### 循序渐进
```
1️⃣ LLM 基础
   理解模型能力和限制
      ↓
2️⃣ Prompt Engineering
   学会与 AI 有效沟通
      ↓
3️⃣ Tool Calling
   掌握工具调用机制
      ↓
4️⃣ Agent 开发
   构建智能系统
      ↓
5️⃣ MCP 集成
   标准化集成
```

---

## 开发 Agent 的关键 🔑

### 四个要素

✅ **清晰的 System Prompt**
   定义 Agent 角色和行为规则

✅ **精心设计的 Tool 接口**
   简洁、明确、易于 LLM 理解

✅ **合理的 Memory 管理**
   平衡存储成本和检索效率

✅ **有效的 Context 控制**
   最大化信息价值，最小化 token 成本

---

## 使用 MCP 的好处 💡

### 三大优势

1. **减少重复开发**
   一次开发，多处使用

2. **提高集成质量**
   标准化保证质量

3. **降低维护成本**
   集中维护，统一更新

**建议**: 新项目优先考虑 MCP

---

## 构建 Skill 的价值 ⭐

### 四个维度

1. **知识沉淀**
   将团队经验固化为代码

2. **效率提升**
   自动应用最佳实践

3. **质量保证**
   减少人为错误

4. **快速迭代**
   新成员快速上手

---

## 实践建议 📝

### 从小做起

1️⃣ **先用好 Prompt**
   80% 的问题可以通过优化 Prompt 解决

2️⃣ **熟悉常用 Tool**
   了解有哪些工具可用

3️⃣ **学习 MCP 协议**
   未来的标准

4️⃣ **逐步构建 Agent**
   从简单场景开始

5️⃣ **沉淀为 Skill**
   将经验复用

---

## 参考资源 📚

### 官方文档
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic Claude Docs](https://docs.anthropic.com)
- [Model Context Protocol](https://modelcontextprotocol.io)

### 开源项目
- [LangChain](https://github.com/langchain-ai/langchain) - Agent 框架
- [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) - 自主 Agent
- [MCP Servers](https://github.com/modelcontextprotocol/servers)

### 学习资源
- [Prompt Engineering Guide](https://www.promptingguide.ai)
- [DeepLearning.AI](https://www.deeplearning.ai)

---

<!-- _class: lead -->
# Q & A

## 感谢聆听！

**联系方式**: leon.wang
**项目地址**: ant-admin-template
**文档**: ai.md

---

<!-- _class: lead -->
# 附录：快速参考

---

## LLM 参数速查表

| 参数 | 范围 | 说明 | 推荐值 |
|------|------|------|--------|
| Temperature | 0.0-2.0 | 随机性 | 0.7 |
| Top-P | 0.0-1.0 | 核采样 | 0.9 |
| Max Tokens | 1-∞ | 最大长度 | 2000 |
| Presence Penalty | -2.0-2.0 | 话题多样性 | 0.0 |
| Frequency Penalty | -2.0-2.0 | 重复惩罚 | 0.0 |

---

## Token 计算器

### 估算公式

**英文**:
```
tokens ≈ words × 1.3
```

**中文**:
```
tokens ≈ characters × 0.6
```

**代码**:
```
tokens ≈ characters × 0.3
```

### 在线工具
[OpenAI Tokenizer](https://platform.openai.com/tokenizer)

---

## Prompt 模板库

### 代码生成
```
你是一个 {language} 专家。
请编写 {description}：
- 功能：{features}
- 要求：{requirements}
- 风格：{style}
```

### 代码审查
```
请审查以下代码：
```{language}
{code}
```
关注：性能、安全性、可维护性
```

### 文档生成
```
为以下代码编写文档：
- API 说明
- 参数描述
- 使用示例
- 注意事项
```

---

## Agent 调试清单 ✓

### 推理阶段
- [ ] System Prompt 是否清晰？
- [ ] Context 是否包含必要信息？
- [ ] 任务分解是否合理？

### 工具调用
- [ ] Tool 描述是否准确？
- [ ] 参数定义是否完整？
- [ ] 错误处理是否到位？

### 结果输出
- [ ] 输出格式是否符合预期？
- [ ] 是否保存到 Memory？
- [ ] 用户体验是否流畅？

---

## MCP Server 开发清单 ✓

### 设计阶段
- [ ] 定义 Resources
- [ ] 定义 Tools
- [ ] 定义 Prompts
- [ ] 设计接口规范

### 实现阶段
- [ ] 实现 JSON-RPC 协议
- [ ] 实现资源提供
- [ ] 实现工具执行
- [ ] 添加错误处理

### 测试阶段
- [ ] 单元测试
- [ ] 集成测试
- [ ] 性能测试
- [ ] 文档完善

---

## Skill 开发模板

```markdown
# Skill: {skill-name}

## Description
{简短描述}

## Triggers
- "{触发关键词1}"
- "{触发关键词2}"

## Domain Knowledge
- {知识点1}
- {知识点2}

## Tools Required
- {tool_name_1}
- {tool_name_2}

## Workflow
1. {步骤1}
2. {步骤2}
3. {步骤3}

## Examples
### Example 1: {场景名称}
{示例代码}
```

---

## 常见问题 FAQ

### Q1: 如何选择合适的 LLM？
**A**: 根据场景选择
- 复杂推理 → GPT-4, Claude Opus
- 日常对话 → GPT-3.5, Claude Haiku
- 长文本 → Claude, Gemini
- 成本敏感 → Llama, 国产模型

### Q2: Context 太大怎么办？
**A**: 使用 RAG (检索增强生成)
- 将文档存入向量数据库
- 根据问题检索相关片段
- 仅将相关内容加入 Context

---

## 术语表

| 术语 | 英文 | 含义 |
|------|------|------|
| 大语言模型 | LLM | Large Language Model |
| 智能体 | Agent | 自主规划执行的 AI 系统 |
| 提示词 | Prompt | 给 LLM 的指令 |
| 上下文 | Context | LLM 能看到的信息 |
| 标记 | Token | LLM 处理的基本单位 |
| 工具 | Tool | Agent 调用的功能模块 |
| 技能 | Skill | 领域知识的封装 |
| 记忆 | Memory | 信息存储和检索系统 |

---

<!-- _class: lead -->
# 再次感谢！

## 让 AI 成为你的超级助手 🚀

**文档**: ai.md
**演示**: ai-presentation.md
**日期**: 2026年
