#!/usr/bin/env node
/**
 * @file scripts/init-sprint.mjs
 * @author leon.wang
 *
 * 用法：
 *   npm run sprint:init <feature-name> [--title "中文标题"] [--force]
 *
 * 示例：
 *   npm run sprint:init user-login
 *   npm run sprint:init order-refund --title "订单退款"
 *   npm run sprint:init user-login --force   # 已存在时覆盖
 *
 * 会在 sprints/feature-<feature-name>/ 下生成完整的迭代文档骨架：
 *   ├── README.md
 *   ├── 01_需求文档_PRD/
 *   ├── 02_验收标准_AC/
 *   ├── 03_测试用例_检测清单/
 *   ├── 04_后端开发/
 *   ├── 05_前端开发/
 *   ├── 06_运维部署/
 *   └── 99_迭代复盘归档/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ---------- 参数解析 ----------
function parseArgs(argv) {
  const args = { _: [], force: false, title: '' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force' || a === '-f') args.force = true;
    else if (a === '--title' || a === '-t') args.title = argv[++i] || '';
    else if (a === '--help' || a === '-h') args.help = true;
    else if (!a.startsWith('-')) args._.push(a);
  }
  return args;
}

function printHelp() {
  console.log(`
用法: npm run sprint:init <feature-name> [--title "中文标题"] [--force]

参数:
  <feature-name>     迭代英文名（kebab-case），例如 user-login、order-refund
  --title, -t <str>  可选，中文标题；未提供则由 feature-name 推导
  --force,  -f       如果目标目录已存在则覆盖
  --help,   -h       显示帮助
`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help || args._.length === 0) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

const featureName = args._[0].replace(/^feature-/, '').trim();
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(featureName)) {
  console.error(`✖ feature-name 必须是 kebab-case（小写字母、数字、中划线），实际收到: "${featureName}"`);
  process.exit(1);
}

const featureTitle =
  args.title ||
  featureName
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const featureDir = path.join(ROOT, 'sprints', `feature-${featureName}`);

if (fs.existsSync(featureDir) && !args.force) {
  console.error(`✖ 目录已存在: ${path.relative(ROOT, featureDir)}`);
  console.error('  使用 --force 覆盖，或换一个 feature-name。');
  process.exit(1);
}

// ---------- 模板 ----------
const NAME = featureName;
const TITLE = featureTitle;
const SNAKE = featureName.replace(/-/g, '_');

const files = {
  'README.md': `# feature-${NAME}

> 迭代名：**${TITLE} (${NAME})**
> 迭代目标：<在此一句话描述业务/技术目标>

---

## 🔹 业务目的
<描述业务价值：解决什么问题、给什么角色带来什么收益>

## 🔹 技术目的
<描述技术沉淀：新建/复用的能力、后续可复用的方案>

## 🔹 本次不做（Out-of-Scope）
- <明确排除项 1>
- <明确排除项 2>

明确排除，防止范围蔓延。

---

## 目录结构

\`\`\`
feature-${NAME}/
├── 01_需求文档_PRD/
├── 02_验收标准_AC/
├── 03_测试用例_检测清单/
├── 04_后端开发/
├── 05_前端开发/
├── 06_运维部署/
└── 99_迭代复盘归档/
\`\`\`

## 文档说明

| 目录 | 说明 |
| --- | --- |
| 01_需求文档_PRD | 产品需求文档（official 为正式版，draft_ai 为 AI 初稿） |
| 02_验收标准_AC | 验收标准 checklist |
| 03_测试用例_检测清单 | QA 测试用例 / 自测清单 |
| 04_后端开发 | 接口文档、数据库变更、技术方案 |
| 05_前端开发 | 组件设计、页面交互逻辑 |
| 06_运维部署 | 部署步骤、nginx 配置、上线检查项 |
| 99_迭代复盘归档 | 迭代总结与问题记录 |
`,

  [`01_需求文档_PRD/${SNAKE}_prd_official.md`]: `# ${TITLE} PRD（Official）

> 状态：正式版
> 迭代：feature-${NAME}

---

## 一、功能概述
<简要描述本次要做的功能>

## 二、业务规则
1. <规则 1>
2. <规则 2>

## 三、权限规则
- <未登录/已登录/角色差异>

## 四、交互流程
1. <步骤 1>
2. <步骤 2>

## 五、不做（Out-of-Scope）
- <排除项>
`,

  [`01_需求文档_PRD/${SNAKE}_prd_draft_ai.md`]: `# ${TITLE} PRD（AI 初稿）

> 状态：AI 生成初稿，待人工审阅、删减、修正后另存为 \`${SNAKE}_prd_official.md\`

---

## 一、功能概述（AI 建议）
<AI 生成>

## 二、业务规则（AI 建议，需人工确认）
1. <规则 1>（**待确认**）
2. <规则 2>（**待确认**）

## 三、AI 提醒事项
- 🚨 <安全/性能/合规提醒 1>
- 🚨 <安全/性能/合规提醒 2>

## 四、待人工决策项
- [ ] <决策项 1>
- [ ] <决策项 2>
`,

  [`02_验收标准_AC/${SNAKE}_ac_standard.md`]: `# ${TITLE} 验收标准 (AC)

> 迭代：feature-${NAME}
> 用途：PM / QA / 开发共同确认「做到什么程度算完成」

---

| 编号 | 验收项 |
| --- | --- |
| AC1 | <验收项 1> |
| AC2 | <验收项 2> |
| AC3 | <验收项 3> |

---

## 补充验收
- <补充项 1>
- <补充项 2>
`,

  [`03_测试用例_检测清单/${SNAKE}_test_checklist.md`]: `# ${TITLE} 测试用例 / 自测清单

> 迭代：feature-${NAME}
> 用途：QA 测试执行清单，开发提测前自测清单

---

## 一、功能
- [ ] <正常流程 1>
- [ ] <正常流程 2>

## 二、边界 & 异常输入
- [ ] <边界 1>
- [ ] <边界 2>

## 三、安全
- [ ] <安全项 1>
- [ ] <安全项 2>

## 四、兼容
- [ ] PC 端（Chrome / Safari / Edge / Firefox）
- [ ] 移动端（iOS Safari / Android Chrome）

## 五、异常场景
- [ ] 网络断开 → 友好提示
- [ ] 服务端 500 → 不卡死
`,

  '04_后端开发/接口文档.md': `# 后端接口文档 — ${TITLE}

> 迭代：feature-${NAME}

---

## 1. <接口 1 名称>

**接口**：\`POST /api/xxx\`

**请求体**：
\`\`\`json
{
  "field1": "string"
}
\`\`\`

**返回**：
\`\`\`json
{
  "code": 0,
  "msg": "success",
  "data": {}
}
\`\`\`

**错误码**：
| code | msg | 说明 |
| --- | --- | --- |
| 40001 | <错误 1> | <说明> |
| 50000 | 服务器异常 | 未知异常 |
`,

  '04_后端开发/数据库变更SQL.md': `# 数据库变更 SQL — ${TITLE}

> 迭代：feature-${NAME}

---

## 1. 新建/变更表

\`\`\`sql
-- TODO: 补充 DDL
\`\`\`

## 2. 回滚脚本

\`\`\`sql
-- TODO: 补充回滚 SQL
\`\`\`
`,

  '04_后端开发/开发技术方案.md': `# 后端技术方案 — ${TITLE}

> 迭代：feature-${NAME}

---

## 一、总体架构
<可用 ASCII 图>

## 二、核心流程
<主要业务时序>

## 三、依赖与选型
- <依赖 / 中间件 / 第三方>

## 四、安全清单
- [ ] <安全项 1>
- [ ] <安全项 2>

## 五、埋点 / 审计日志
<需要记录的事件与字段>
`,

  '05_前端开发/组件设计文档.md': `# 前端组件设计 — ${TITLE}

> 迭代：feature-${NAME}
> 技术栈：React 18 + TypeScript + @derbysoft/neat-design + zustand + react-router 7 (HashRouter)

---

## 一、涉及组件与文件

| 位置 | 说明 |
| --- | --- |
| \`src/pages/Xxx/Xxx.tsx\` | 页面组件（新建/修改） |
| \`src/pages/Xxx/Xxx.scss\` | 页面样式 |
| \`src/components/XxxCard/\` | 复用组件 |
| \`src/services/xxx.ts\` | API 封装 |
| \`src/config.menu.tsx\` | 菜单/路由配置 |
| \`src/utils/routeGenerator.tsx\` | 组件映射 |
| \`src/locales/pages/xxx/{en,zh}.ts\` | i18n 文案 |
| \`src/locales/index.ts\` | 命名空间注册（\`as const\`） |

## 二、组件说明
<关键组件 props / 交互 / 依赖 Neat Design 组件>

## 三、Store 扩展（如需要）
\`\`\`ts
interface AppState {
  // TODO
}
\`\`\`

## 四、i18n 文案
\`\`\`ts
// src/locales/pages/${NAME.replace(/-/g, '')}/zh.ts
export default {
  ${NAME.replace(/-/g, '')}Title: '<标题>',
};
\`\`\`

## 五、开发价值
<可复用产物 / 沉淀方案>
`,

  '05_前端开发/页面交互逻辑.md': `# 前端页面交互逻辑 — ${TITLE}

> 迭代：feature-${NAME}

---

## 一、主流程时序
\`\`\`
用户进入页面
  │
  ▼
<关键步骤>
  │
  ▼
成功 / 失败分支
\`\`\`

## 二、异常分支
- <网络异常>
- <权限异常>
- <参数异常>

## 三、边界与状态
| 场景 | 期望行为 |
| --- | --- |
| <场景 1> | <行为> |
`,

  '06_运维部署/部署步骤.md': `# 部署步骤 — ${TITLE}

> 迭代：feature-${NAME}

---

## 一、前置准备
- [ ] 确认目标环境（QA / UAT / PROD）
- [ ] 数据库备份完成
- [ ] 依赖中间件（Redis / MQ / ...）就绪

## 二、后端部署
1. 执行数据库变更
2. 配置环境变量
3. 发布服务（滚动发布）
4. 验证接口

## 三、前端部署
\`\`\`bash
npm ci
npm run build:qa   # 或 build:uat / build:prod
\`\`\`
上传 \`dist/\` 到静态服务器 / CDN。

## 四、灰度 & 回滚
- 灰度策略：<5% → 30% → 100%>
- 回滚触发指标：<成功率 / 5xx / 关键业务指标>
- 回滚步骤：<前端回滚 → 后端回滚 → 表保留>

## 五、上线通知
- 提前通知客服 / 运营 / QA
- 值班同学在岗
`,

  '06_运维部署/nginx配置变更.md': `# Nginx 配置变更 — ${TITLE}

> 迭代：feature-${NAME}

---

## 一、变更点
<新增 location / 限流 / 反向代理 / header 等>

\`\`\`nginx
# TODO: 补充配置片段
\`\`\`

## 二、上线校验
- [ ] \`nginx -t\` 通过
- [ ] reload 后接口可访问
- [ ] 相关安全响应头生效
`,

  '06_运维部署/上线检查项.md': `# 上线检查项 — ${TITLE}

> 迭代：feature-${NAME}
> 用途：发布前最后一道 checklist，逐项打勾方可上线。

---

## 一、代码与构建
- [ ] 代码已合并到发布分支
- [ ] CI 全绿（lint / build / 测试）
- [ ] 版本号 / changelog 已更新

## 二、配置与密钥
- [ ] 生产环境变量已配置
- [ ] 密钥通过安全渠道注入（**不入代码库**）
- [ ] 生产 DEBUG 关闭

## 三、安全
- [ ] HTTPS 证书有效
- [ ] 敏感字段不落日志
- [ ] 限流 / 鉴权已开启

## 四、数据库
- [ ] 变更已执行
- [ ] 备份完成，可回滚

## 五、监控与告警
- [ ] 关键指标监控大盘就绪
- [ ] 告警阈值配置
- [ ] 埋点正常写入

## 六、功能验证
- [ ] <关键场景 1>
- [ ] <关键场景 2>

## 七、发布通知
- [ ] 通知客服 / 运营 / QA 上线时间
- [ ] 值班同学在岗
- [ ] 回滚方案已同步团队

---

**签字（可选）**：
- 前端负责人：
- 后端负责人：
- QA 负责人：
- 运维负责人：
- 发布时间：
`,

  '99_迭代复盘归档/迭代总结&问题记录.md': `# 迭代总结 & 问题记录 — ${TITLE}

> 迭代：feature-${NAME}
> 完成日期：YYYY-MM-DD

---

## 一、迭代目标回顾
- **业务目的**：<回顾>
- **技术目的**：<回顾>
- **是否达成**：☐ 是 / ☐ 部分 / ☐ 否

## 二、范围核对（Scope）
| 项目 | 计划 | 实际 | 备注 |
| --- | --- | --- | --- |
| <项目 1> | ✅ | | |

## 三、指标
| 指标 | 期望 | 实际 |
| --- | --- | --- |
| <指标 1> | | |

## 四、遇到的问题 & 解决
| 编号 | 现象 | 根因 | 解决方案 | 是否已沉淀文档 |
| --- | --- | --- | --- | --- |
| P1 | | | | |

## 五、经验沉淀
- 可复用产物：
- 踩坑记录：
- 改进建议（下一迭代）：

## 六、参与人员
| 角色 | 姓名 |
| --- | --- |
| PM | |
| 前端 | |
| 后端 | |
| QA | |
| 运维 | |

## 七、附件 / 链接
- 需求：\`01_需求文档_PRD/${SNAKE}_prd_official.md\`
- 验收：\`02_验收标准_AC/${SNAKE}_ac_standard.md\`
- 上线检查：\`06_运维部署/上线检查项.md\`
- 相关 PR：#xxx
- 相关工单：JIRA-xxx
`,
};

// ---------- 写入 ----------
let created = 0;
let skipped = 0;

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(featureDir, relPath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(fullPath) && !args.force) {
    console.log(`- 跳过（已存在）: ${path.relative(ROOT, fullPath)}`);
    skipped++;
    continue;
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✔ 生成: ${path.relative(ROOT, fullPath)}`);
  created++;
}

console.log(`\n✅ 完成: 生成 ${created} 个文件，跳过 ${skipped} 个`);
console.log(`📂 目录: ${path.relative(ROOT, featureDir)}`);
console.log(`\n下一步：`);
console.log(`  1. cd ${path.relative(ROOT, featureDir)}`);
console.log(`  2. 从 01_需求文档_PRD/${SNAKE}_prd_draft_ai.md 开始编写`);
console.log(`  3. 与 PM/QA 对齐后另存为 ${SNAKE}_prd_official.md`);
