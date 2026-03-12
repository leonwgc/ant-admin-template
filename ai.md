# AI 核心概念详解

> 本文档整理了现代 AI 开发中的核心概念及其相互关系

---

## 目录
- [基础概念](#基础概念)
  - [LLM (大语言模型)](#llm-大语言模型)
  - [Prompt (提示词)](#prompt-提示词)
  - [Context (上下文)](#context-上下文)
  - [Token](#token)
- [高级概念](#高级概念)
  - [Agent (智能体)](#agent-智能体)
  - [Tool (工具)](#tool-工具)
  - [MCP (模型上下文协议)](#mcp-模型上下文协议)
  - [Skill (技能)](#skill-技能)
  - [Memory (记忆系统)](#memory-记忆系统)
- [概念关系图](#概念关系图)
- [实际应用示例](#实际应用示例)

---

## 基础概念

### LLM (大语言模型)
**Large Language Model**

#### 定义
LLM 是通过海量文本数据训练的深度学习模型，能够理解和生成自然语言。

#### 特点
- **理解能力**: 理解自然语言的语义
- **生成能力**: 生成连贯、上下文相关的文本
- **泛化能力**: 处理训练时未见过的任务
- **多模态**: 部分模型支持图像、音频等

#### 代表产品
- OpenAI GPT-4, GPT-3.5
- Anthropic Claude (Sonnet, Opus, Haiku)
- Google Gemini
- Meta Llama
- 国内：通义千问、文心一言、智谱清言等

#### 核心参数
```
- 温度 (Temperature): 0.0-2.0，控制输出随机性
- Top-P: 0.0-1.0，核采样概率阈值
- Max Tokens: 最大输出长度
- Context Window: 上下文窗口大小（如 128K tokens）
```

---

### Prompt (提示词)

#### 定义
Prompt 是用户向 LLM 输入的指令或问题，决定了 AI 的行为和输出质量。

#### 类型
1. **Zero-shot Prompt**: 直接提问，无示例
   ```
   "翻译这段话为英语：今天天气很好"
   ```

2. **Few-shot Prompt**: 提供示例
   ```
   示例1：input -> output
   示例2：input -> output
   现在处理：新的input
   ```

3. **Chain-of-Thought (CoT)**: 要求逐步推理
   ```
   "让我们一步步思考..."
   ```

4. **System Prompt**: 定义 AI 角色和规则
   ```
   "你是一个专业的前端开发工程师..."
   ```

#### Prompt Engineering (提示工程)
优化 Prompt 以获得更好结果的技术：
- 明确性：清晰具体的指令
- 上下文：提供必要的背景信息
- 约束：限定输出格式和范围
- 示例：提供期望的示例输出

---

### Context (上下文)

#### 定义
Context 是 LLM 在处理请求时能够"看到"的所有信息。

#### 组成部分
```
Context = System Prompt + 历史对话 + 当前输入 + 注入的文档/数据
```

#### Context Window (上下文窗口)
- **定义**: LLM 一次能处理的最大 token 数量
- **典型大小**:
  - GPT-3.5: 4K / 16K tokens
  - GPT-4: 8K / 32K / 128K tokens
  - Claude 3: 200K tokens
  - Gemini 1.5: 1M tokens

#### Context 管理策略
- **截断**: 超出时删除旧对话
- **摘要**: 压缩历史信息
- **滑动窗口**: 保留最近的 N 条消息
- **RAG**: 仅加载相关片段

---

### Token

#### 定义
Token 是 LLM 处理文本的基本单位，通常是一个单词、子词或字符。

#### Token 计算
- 英文: ~1 token = 4 字符
- 中文: ~1 token = 1-2 个汉字
- 代码: 根据语法结构分词

#### 为什么重要
- **成本计算**: API 按 token 数量计费
- **速度影响**: Token 越多，处理越慢
- **上下文限制**: 超过限制会被截断

---

## 高级概念

### Agent (智能体)

#### 定义
Agent 是基于 LLM 构建的、能够**自主规划**、**使用工具**、**执行任务**的智能系统。

#### 核心能力
```
Agent = LLM + Tools + Memory + Planning
```

1. **推理 (Reasoning)**: 理解任务需求
2. **规划 (Planning)**: 制定执行步骤
3. **执行 (Acting)**: 调用工具完成任务
4. **反思 (Reflection)**: 评估结果并调整策略

#### Agent 类型

**1. ReAct Agent (推理-行动)**
```
Thought: 我需要查找用户信息
Action: search_user(id="123")
Observation: 找到用户 "张三"
Thought: 现在更新用户邮箱
Action: update_user(id="123", email="new@example.com")
Final Answer: 用户邮箱已更新
```

**2. Tool-Using Agent (工具使用型)**
- 可以调用外部 API、数据库、文件系统等
- 例如：GitHub Copilot Agent

**3. Multi-Agent System (多智能体系统)**
- 多个 Agent 协作完成复杂任务
- 例如：一个 Agent 负责研究，另一个负责编写代码

#### 典型架构
```
用户输入
   ↓
[Agent Controller]
   ↓
[LLM 推理层]
   ↓
[Tool Registry] ← 注册的工具列表
   ↓
[工具执行]
   ↓
[结果反馈给 LLM]
   ↓
继续或结束
```

#### 实际应用
- **代码助手**: GitHub Copilot, Cursor, Cline
- **自动化任务**: AutoGPT, BabyAGI
- **客服机器人**: 自动处理用户问题
- **研究助理**: 自动搜索和总结信息

---

### Tool (工具)

#### 定义
Tool 是 Agent 可以调用的**外部功能模块**，扩展 LLM 的能力边界。

#### 为什么需要 Tool
LLM 本身的局限：
- ❌ 无法访问实时数据
- ❌ 无法执行代码
- ❌ 无法操作文件系统
- ❌ 无法调用外部 API

**Tool 解决方案：通过工具调用实现以上能力**

#### Tool 的结构
```typescript
interface Tool {
  name: string;              // 工具名称
  description: string;       // 工具描述（给 LLM 看）
  parameters: {              // 参数定义（JSON Schema）
    type: "object",
    properties: {
      param1: { type: "string", description: "参数说明" }
    },
    required: ["param1"]
  };
  execute: Function;         // 实际执行函数
}
```

#### Tool 调用流程
```
1. LLM 决定需要使用某个工具
   → 输出: tool_call { name: "search_file", args: { query: "*.tsx" } }

2. Agent 框架拦截 tool_call
   → 查找并执行对应工具

3. 工具返回结果
   → 结果: { files: ["App.tsx", "index.tsx"] }

4. 结果注入回 LLM context
   → LLM 基于结果继续推理
```

#### 常见 Tool 类型
- **文件操作**: `read_file`, `write_file`, `search_files`
- **代码执行**: `run_terminal`, `execute_python`
- **网络请求**: `fetch_url`, `api_call`
- **数据库**: `query_database`, `update_record`
- **系统集成**: `send_email`, `create_calendar_event`

---

### MCP (模型上下文协议)
**Model Context Protocol**

#### 定义
MCP 是一个**开放标准协议**，用于 AI 应用与外部数据源、工具之间的集成。

#### 由来
- **发布者**: Anthropic (Claude 的开发公司)
- **发布时间**: 2024年11月
- **目标**: 统一 AI 与外部系统的连接方式

#### 核心理念
```
不再为每个 AI 应用重复开发集成代码
     ↓
通过 MCP Server 提供标准化接口
     ↓
任何支持 MCP 的 AI 应用都可使用
```

#### 架构模式
```
┌─────────────────┐
│   AI 应用      │ (Claude, GitHub Copilot, etc.)
│  (MCP Client)  │
└────────┬────────┘
         │ MCP Protocol (JSON-RPC)
         ↓
┌─────────────────┐
│   MCP Server   │ (中间层)
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
[数据源]   [工具集]
(数据库)   (API)
(文件系统) (服务)
```

#### MCP Server 提供的能力

**1. Resources (资源)**
```typescript
// 暴露可读的数据源
{
  uri: "file:///project/README.md",
  mimeType: "text/markdown",
  text: "# Project Documentation..."
}
```

**2. Tools (工具)**
```typescript
// 可执行的功能
{
  name: "query_database",
  description: "查询数据库",
  inputSchema: { /* JSON Schema */ }
}
```

**3. Prompts (提示词模板)**
```typescript
// 预定义的提示词
{
  name: "code_review",
  description: "代码审查模板",
  arguments: [{ name: "code", required: true }]
}
```

#### MCP vs 传统 Tool
| 对比项 | 传统 Tool | MCP Server |
|--------|----------|-----------|
| 标准化 | 每个应用自定义 | 统一协议 |
| 复用性 | 低 | 高（一次开发，多处使用） |
| 维护成本 | 高 | 低 |
| 发现机制 | 静态注册 | 动态查询 |

#### 实际应用示例

**本项目中的 MCP 集成**:
```typescript
// .github/instructions/01-mcp.neat.instructions.md
// Neat Design 组件库通过 MCP 暴露

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

#### MCP 生态
- **MCP Servers**: [官方列表](https://github.com/modelcontextprotocol/servers)
- **支持的 AI 应用**:
  - Claude Desktop
  - GitHub Copilot (VS Code)
  - Cursor
  - Windsurf
  - 其他支持 MCP 的工具

---

### Skill (技能)

#### 定义
Skill 是**封装了特定领域知识和工具集合**的 Agent 能力模块。

#### Skill vs Tool
| 对比项 | Tool | Skill |
|--------|------|-------|
| 粒度 | 单一功能 | 组合能力 |
| 范围 | 执行一个操作 | 解决一类问题 |
| 包含 | 函数 + 参数 | Prompts + Tools + 知识 |

#### Skill 的组成
```
Skill = Domain Knowledge + Tools + Workflows + Examples
```

**示例: Java Spring Boot Skill**
```markdown
# Skill: java-spring-boot

## Description
Build production Spring Boot applications

## Triggers
- "create a REST API"
- "add Spring Security"
- "setup database connection"

## Knowledge
- Spring Boot 最佳实践
- Security 配置模式
- JPA/Hibernate 使用规范

## Tools
- create_file
- replace_string_in_file
- run_in_terminal

## Workflows
1. 创建 Controller → Service → Repository
2. 配置 application.yml
3. 添加依赖到 pom.xml
```

#### Skill 的触发机制
```
用户输入: "帮我优化 React 组件性能"
    ↓
Agent 分析关键词: "React", "性能"
    ↓
匹配到 Skill: "vercel-react-best-practices"
    ↓
加载 Skill 文档 (SKILL.md)
    ↓
基于 Skill 知识执行任务
```

#### 本项目的 Skills
```
.copilot/skills/
├── find-skills/              # 发现和安装技能
├── vercel-composition-patterns/  # React 组件模式
├── web-design-guidelines/    # UI/UX 最佳实践
└── vercel-react-best-practices/  # React 性能优化
```

#### Skill 的价值
- ✅ **复用领域知识**: 一次编写，多次使用
- ✅ **统一最佳实践**: 团队统一规范
- ✅ **降低学习成本**: 新成员快速上手
- ✅ **提升质量**: 自动应用专家经验

---

### Memory (记忆系统)

#### 定义
Memory 是 Agent 存储和检索历史信息的机制，使其具有"记忆"能力。

#### Memory 的重要性
LLM 本身是**无状态**的：
```
每次对话 = 独立的请求
不记得之前说过什么（除非在当前 Context 中）
```

Memory 解决方案：
```
[短期记忆] + [长期记忆] = 持续学习能力
```

#### Memory 的类型

**1. Session Memory (会话记忆)**
- **范围**: 当前对话
- **存储**: 对话历史
- **示例**:
  ```
  用户: "我叫张三"
  AI: "你好张三"
  用户: "我的名字是什么？"
  AI: "张三" ← 从 Session Memory 获取
  ```

**2. User Memory (用户记忆)**
- **范围**: 跨会话，针对特定用户
- **存储**: 用户偏好、习惯
- **示例**:
  ```markdown
  /memories/preferences.md
  - 用户喜欢使用 TypeScript
  - 代码风格偏好单引号
  - 常用库：React, Zustand
  ```

**3. Repository Memory (代码库记忆)**
- **范围**: 特定项目
- **存储**: 项目规范、架构决策
- **示例**:
  ```markdown
  /memories/repo/conventions.md
  - 路由系统：config.menu.tsx → 自动生成
  - 国际化：使用 i18next
  - 状态管理：Zustand
  ```

#### 本项目的 Memory 系统
```typescript
// 定义在 instructions 中
<memoryScopes>
- User memory (/memories/):        持久化，跨项目
- Session memory (/memories/session/):  当前对话
- Repository memory (/memories/repo/):  项目级别
</memoryScopes>
```

#### Memory 检索策略

**1. 向量检索 (Vector Search)**
```
用户问题 → Embedding → 向量
    ↓
在 Memory 向量库中搜索相似内容
    ↓
返回最相关的记忆
```

**2. 关键词检索**
```
提取问题中的关键词 → 匹配 Memory 索引
```

**3. 时间衰减**
```
最近的记忆权重更高
```

---

## 概念关系图

### 整体架构
```
┌─────────────────────────────────────────────────────────────┐
│                        用户交互层                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         Agent 层                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Planning │  │ Reasoning│  │ Learning │  │ Reflection│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        能力层                                │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │ Skills │  │ Tools  │  │ Memory │  │ Context│           │
│  └────────┘  └────────┘  └────────┘  └────────┘           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       MCP 协议层                             │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐              │
│  │ Resources │  │   Tools   │  │  Prompts  │              │
│  └───────────┘  └───────────┘  └───────────┘              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       LLM 基础层                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │    GPT-4 / Claude / Gemini / Llama / ...           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       外部系统                               │
│  [数据库]  [API]  [文件系统]  [搜索引擎]  [其他服务]        │
└─────────────────────────────────────────────────────────────┘
```

### 数据流向
```
1. 用户输入
   ↓
2. Agent 接收 + Context 构建
   ↓
3. LLM 推理（基于 Prompt + Context）
   ↓
4. 决策：需要调用 Tool/Skill？
   │
   ├─ 是 → 5a. 通过 MCP 查询可用工具
   │        ↓
   │        5b. 执行 Tool
   │        ↓
   │        5c. 结果返回给 LLM
   │        ↓
   │        继续推理（回到步骤3）
   │
   └─ 否 → 6. 生成最终回复
           ↓
           7. 保存到 Memory（可选）
           ↓
           8. 返回给用户
```

### 概念依赖关系
```
LLM (基础)
 ↓
Prompt + Context (输入层)
 ↓
Agent (智能体)
 ├─ Tools (工具调用)
 │   └─ MCP (工具标准化协议)
 ├─ Skills (领域能力)
 └─ Memory (记忆系统)
```

---

## 实际应用示例

### 示例 1: GitHub Copilot Agent 工作流

**场景**: 用户请求 "帮我创建一个 React 用户列表页面"

```
Step 1: 用户输入
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input: "帮我创建一个 React 用户列表页面"

Step 2: Agent 分析任务
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Agent Planning:
1. 需要了解项目结构
2. 需要知道使用的 UI 库
3. 需要了解路由配置方式
4. 需要创建组件文件

Step 3: 调用 Tool 收集信息
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Tool: read_file("src/config.menu.tsx")
→ Tool: read_file(".github/instructions/00-dev.instructions.md")
→ Memory: 查询项目规范

Step 4: 触发 Skill
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Triggered Skill: "vercel-react-best-practices"
→ 应用 React 最佳实践

Step 5: 调用 MCP 查询组件文档
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ MCP Call: mcp_neat-design-m_get_component_document("Table")
→ MCP Call: mcp_neat-design-m_get_component_example("Table", "basic.tsx")

Step 6: LLM 生成代码
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
基于：
- 项目规范（从 Memory）
- UI 库文档（从 MCP）
- 最佳实践（从 Skill）

生成：
- pages/User/UserList.tsx
- pages/User/UserList.scss

Step 7: 执行文件操作
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Tool: create_file("pages/User/UserList.tsx", content)
→ Tool: create_file("pages/User/UserList.scss", content)

Step 8: 更新配置
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Tool: replace_string_in_file("config.menu.tsx", ...)
→ Tool: replace_string_in_file("utils/routeGenerator.tsx", ...)

Step 9: 保存到 Memory
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Memory Update:
"创建了用户列表页面，路由为 /app/users"

Step 10: 返回结果
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"已创建用户列表页面，文件位于：
- pages/User/UserList.tsx
- pages/User/UserList.scss
路由已配置为 /app/users"
```

---

### 示例 2: 本项目中的 MCP 使用

**场景**: AI 需要使用 Neat Design 的 Table 组件

```typescript
// 1. 用户请求
"帮我创建一个用户表格"

// 2. AI 检查 instructions
// 发现规则：使用 Neat Design 前必须调用 MCP
if (useNeatDesignComponent) {
  // 3. 调用 MCP 获取组件信息
  const doc = await mcp_neat-design-m_get_component_document({
    componentName: "Table"
  });

  // 4. 获取示例代码
  const example = await mcp_neat-design-m_get_component_example({
    componentName: "Table",
    exampleFileName: "basic.tsx"
  });

  // 5. 基于文档和示例生成代码
  generateTableComponent(doc, example);
}

// 6. 生成符合项目规范的代码
/**
 * @file pages/User/UserTable.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { Table } from '@derbysoft/neat-design';  // ✅ 从 Neat Design 导入

const UserTable: FC = () => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '邮箱', dataIndex: 'email', key: 'email' }
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default UserTable;
```

---

### 示例 3: Skill + Tool + Memory 协作

**场景**: 代码审查

```typescript
// 用户请求
"审查这段 React 组件代码"

// Agent 执行流程
async function codeReview(code: string) {
  // 1. 触发 Skill
  const skill = loadSkill("vercel-react-best-practices");

  // 2. 从 Memory 读取项目规范
  const conventions = await memory.read("/memories/repo/conventions.md");

  // 3. 使用 Tool 分析代码
  const issues = await tool.analyzeCode(code, {
    rules: skill.rules,
    conventions: conventions
  });

  // 4. LLM 生成审查报告
  const report = await llm.generateReport({
    context: `
      代码: ${code}
      问题: ${issues}
      规范: ${conventions}
      最佳实践: ${skill.guidelines}
    `
  });

  // 5. 保存审查结果到 Memory
  await memory.write("/memories/session/code-review.md", report);

  return report;
}
```

---

## 总结

### 关键理解

1. **LLM 是基础**
   - 所有智能都源于 LLM 的语言理解和生成能力

2. **Agent 是大脑**
   - 基于 LLM，但增加了规划、工具使用、记忆等能力

3. **Tool 是手脚**
   - 让 Agent 能够与外部世界交互

4. **MCP 是标准接口**
   - 统一了 Agent 与工具/数据源的连接方式

5. **Skill 是专业知识**
   - 封装领域经验，让 Agent 成为某领域专家

6. **Memory 是经验**
   - 使 Agent 能够学习和改进

7. **Prompt 是沟通语言**
   - 人类如何与 AI 有效交流

8. **Context 是视野范围**
   - AI 能"看到"的信息决定了其能力边界

### 发展趋势

```
2023 前：单纯的 LLM 对话
   ↓
2023：Tool-using Agents (工具使用)
   ↓
2024：MCP 协议标准化
   ↓
2025：Multi-Agent 系统普及
   ↓
2026+：自主 Agent + 持续学习
```

### 实践建议

1. **学习路径**:
   ```
   LLM 基础 → Prompt Engineering → Tool Calling → Agent 开发 → MCP 集成
   ```

2. **开发 Agent 的关键**:
   - ✅ 清晰的 System Prompt
   - ✅ 精心设计的 Tool 接口
   - ✅ 合理的 Memory 管理
   - ✅ 有效的 Context 控制

3. **使用 MCP 的好处**:
   - 减少重复开发
   - 提高集成质量
   - 降低维护成本

4. **构建 Skill 的价值**:
   - 沉淀团队知识
   - 提升工作效率
   - 保证输出质量

---

## 参考资源

### 官方文档
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude Documentation](https://docs.anthropic.com)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io)

### 开源项目
- [LangChain](https://github.com/langchain-ai/langchain) - Agent 框架
- [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) - 自主 Agent
- [MCP Servers](https://github.com/modelcontextprotocol/servers) - MCP 实现

### 学习资源
- [Prompt Engineering Guide](https://www.promptingguide.ai)
- [LLM Bootcamp](https://fullstackdeeplearning.com/llm-bootcamp/)
- [Building LLM Applications](https://www.deeplearning.ai)

---

**文档版本**: v1.0
**最后更新**: 2026年3月12日
**维护者**: leon.wang
