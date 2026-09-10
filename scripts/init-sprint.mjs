#!/usr/bin/env node
/**
 * @file scripts/init-sprint.mjs
 * @author leon.wang
 *
 * Usage:
 *   npm run sprint:init <feature-name> [--title "Human Readable Title"] [--force]
 *
 * Examples:
 *   npm run sprint:init user-login
 *   npm run sprint:init order-refund --title "Order Refund"
 *   npm run sprint:init user-login --force   # overwrite existing files
 *
 * Generates the full sprint doc scaffold under sprints/feature-<feature-name>/:
 *   ├── README.md
 *   ├── 01_PRD/
 *   ├── 02_Acceptance/
 *   ├── 03_Testing/
 *   ├── 04_Backend/
 *   ├── 05_Frontend/
 *   └── 06_Retrospective/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ---------- Argument parsing ----------
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
Usage: npm run sprint:init <feature-name> [--title "Human Readable Title"] [--force]

Arguments:
  <feature-name>     Sprint code name in kebab-case, e.g. user-login, order-refund
  --title, -t <str>  Optional human readable title; derived from feature-name if omitted
  --force,  -f       Overwrite files if the target directory already exists
  --help,   -h       Show this help
`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help || args._.length === 0) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

const featureName = args._[0].replace(/^feature-/, '').trim();
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(featureName)) {
  console.error(`✖ feature-name must be kebab-case (lowercase letters, digits, hyphens). Received: "${featureName}"`);
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
  console.error(`✖ Directory already exists: ${path.relative(ROOT, featureDir)}`);
  console.error('  Pass --force to overwrite, or choose a different feature-name.');
  process.exit(1);
}

// ---------- Templates ----------
const NAME = featureName;
const TITLE = featureTitle;
const SNAKE = featureName.replace(/-/g, '_');

const files = {
  'README.md': `# feature-${NAME}

> Sprint: **${TITLE} (${NAME})**
> Goal: <one-sentence description of the business/technical goal>

---

## 🔹 Business goal
<Business value: what problem it solves, who benefits and how>

## 🔹 Technical goal
<Technical outcome: new/reused capabilities, reusable patterns for later>

## 🔹 Out-of-Scope
- <Explicit exclusion 1>
- <Explicit exclusion 2>

Explicitly excluded to prevent scope creep.

---

## Directory layout

\`\`\`
feature-${NAME}/
├── 01_PRD/
├── 02_Acceptance/
├── 03_Testing/
├── 04_Backend/
├── 05_Frontend/
└── 06_Retrospective/
\`\`\`

## What each folder contains

| Folder | Description |
| --- | --- |
| 01_PRD | Product requirements (\`official\` = signed off, \`draft_ai\` = AI-generated draft) |
| 02_Acceptance | Acceptance criteria checklist |
| 03_Testing | QA test cases / dev self-check list |
| 04_Backend | API spec, DB migration, technical design |
| 05_Frontend | Component design, interaction flow |
| 06_Retrospective | Sprint retrospective and issue log |
`,

  [`01_PRD/${SNAKE}_prd_official.md`]: `# ${TITLE} PRD (Official)

> Status: signed off
> Sprint: feature-${NAME}

---

## 1. Overview
<Brief description of the feature being built>

## 2. Business rules
1. <Rule 1>
2. <Rule 2>

## 3. Permission rules
- <Anonymous / logged-in / role differences>

## 4. User flow
1. <Step 1>
2. <Step 2>

## 5. Out-of-Scope
- <Exclusion>
`,

  [`01_PRD/${SNAKE}_prd_draft_ai.md`]: `# ${TITLE} PRD (AI Draft)

> Status: AI-generated draft — review, trim and save as \`${SNAKE}_prd_official.md\`.

---

## 1. Overview (AI suggestion)
<AI-generated>

## 2. Business rules (AI suggestion — human confirmation required)
1. <Rule 1> (**TBD**)
2. <Rule 2> (**TBD**)

## 3. AI reminders
- 🚨 <Security / performance / compliance reminder 1>
- 🚨 <Security / performance / compliance reminder 2>

## 4. Open decisions
- [ ] <Decision 1>
- [ ] <Decision 2>
`,

  [`02_Acceptance/${SNAKE}_ac_standard.md`]: `# ${TITLE} Acceptance Criteria

> Sprint: feature-${NAME}
> Purpose: PM / QA / Dev shared definition of "done"

---

| ID | Criterion |
| --- | --- |
| AC1 | <Criterion 1> |
| AC2 | <Criterion 2> |
| AC3 | <Criterion 3> |

---

## Additional criteria
- <Additional item 1>
- <Additional item 2>
`,

  [`03_Testing/${SNAKE}_test_checklist.md`]: `# ${TITLE} Test Cases / Checklist

> Sprint: feature-${NAME}
> Purpose: QA execution checklist and dev pre-handoff self-check

---

## 1. Functional
- [ ] <Happy path 1>
- [ ] <Happy path 2>

## 2. Boundaries & invalid input
- [ ] <Edge case 1>
- [ ] <Edge case 2>

## 3. Security
- [ ] <Security item 1>
- [ ] <Security item 2>

## 4. Compatibility
- [ ] Desktop (Chrome / Safari / Edge / Firefox)
- [ ] Mobile (iOS Safari / Android Chrome)

## 5. Failure modes
- [ ] Network offline → friendly message
- [ ] Server 500 → UI does not lock up
`,

  '04_Backend/api-spec.md': `# API Spec — ${TITLE}

> Sprint: feature-${NAME}

---

## 1. <Endpoint 1>

**Endpoint**: \`POST /api/xxx\`

**Request body**:
\`\`\`json
{
  "field1": "string"
}
\`\`\`

**Response**:
\`\`\`json
{
  "code": 0,
  "msg": "success",
  "data": {}
}
\`\`\`

**Error codes**:
| code | msg | Description |
| --- | --- | --- |
| 40001 | <Error 1> | <Description> |
| 50000 | Server error | Unhandled exception |
`,

  '04_Backend/db-migration.md': `# Database Migration — ${TITLE}

> Sprint: feature-${NAME}

---

## 1. Schema changes

\`\`\`sql
-- TODO: add DDL
\`\`\`

## 2. Rollback

\`\`\`sql
-- TODO: add rollback SQL
\`\`\`
`,

  '04_Backend/tech-design.md': `# Backend Technical Design — ${TITLE}

> Sprint: feature-${NAME}

---

## 1. Architecture overview
<ASCII diagram is fine>

## 2. Core flow
<Primary business sequence>

## 3. Dependencies & choices
- <Dependency / middleware / third-party>

## 4. Security checklist
- [ ] <Security item 1>
- [ ] <Security item 2>

## 5. Logging / audit events
<Events and fields to log>
`,

  '05_Frontend/component-design.md': `# Frontend Component Design — ${TITLE}

> Sprint: feature-${NAME}
> Stack: React 18 + TypeScript + @derbysoft/neat-design + zustand + react-router 7 (HashRouter)

---

## 1. Files touched

| Path | Purpose |
| --- | --- |
| \`src/pages/Xxx/Xxx.tsx\` | Page component (new / modified) |
| \`src/pages/Xxx/Xxx.scss\` | Page styles |
| \`src/components/XxxCard/\` | Reusable component |
| \`src/services/xxx.ts\` | API wrapper |
| \`src/config.menu.tsx\` | Menu / route config |
| \`src/utils/routeGenerator.tsx\` | Component map |
| \`src/locales/pages/xxx/{en,zh}.ts\` | i18n copy |
| \`src/locales/index.ts\` | Namespace registration (\`as const\`) |

## 2. Component notes
<Key component props / interactions / Neat Design dependencies>

## 3. Store additions (if any)
\`\`\`ts
interface AppState {
  // TODO
}
\`\`\`

## 4. i18n copy
\`\`\`ts
// src/locales/pages/${NAME.replace(/-/g, '')}/en.ts
export default {
  ${NAME.replace(/-/g, '')}Title: '<Title>',
};
\`\`\`

## 5. Reusable outcomes
<Artifacts other features can reuse>
`,

  '05_Frontend/interaction-flow.md': `# Frontend Interaction Flow — ${TITLE}

> Sprint: feature-${NAME}

---

## 1. Main sequence
\`\`\`
User enters the page
  │
  ▼
<Key step>
  │
  ▼
Success / failure branches
\`\`\`

## 2. Failure branches
- <Network error>
- <Permission error>
- <Invalid input>

## 3. Edge cases & states
| Scenario | Expected behavior |
| --- | --- |
| <Scenario 1> | <Behavior> |
`,

  '06_Retrospective/retrospective.md': `# Retrospective & Issue Log — ${TITLE}

> Sprint: feature-${NAME}
> Completion date: YYYY-MM-DD

---

## 1. Goal review
- **Business goal**: <recap>
- **Technical goal**: <recap>
- **Achieved**: ☐ Yes / ☐ Partial / ☐ No

## 2. Scope review
| Item | Planned | Actual | Notes |
| --- | --- | --- | --- |
| <Item 1> | ✅ | | |

## 3. Metrics
| Metric | Target | Actual |
| --- | --- | --- |
| <Metric 1> | | |

## 4. Issues & resolutions
| ID | Symptom | Root cause | Resolution | Documented? |
| --- | --- | --- | --- | --- |
| P1 | | | | |

## 5. Lessons learned
- Reusable outcomes:
- Pitfalls:
- Improvements for next sprint:

## 6. Contributors
| Role | Name |
| --- | --- |
| PM | |
| Frontend | |
| Backend | |
| QA | |
| DevOps | |

## 7. References
- PRD: \`01_PRD/${SNAKE}_prd_official.md\`
- Acceptance: \`02_Acceptance/${SNAKE}_ac_standard.md\`
- Tests: \`03_Testing/${SNAKE}_test_checklist.md\`
- Related PRs: #xxx
- Related tickets: JIRA-xxx
`,
};

// ---------- Write files ----------
let created = 0;
let skipped = 0;

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(featureDir, relPath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(fullPath) && !args.force) {
    console.log(`- skip (exists): ${path.relative(ROOT, fullPath)}`);
    skipped++;
    continue;
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✔ create: ${path.relative(ROOT, fullPath)}`);
  created++;
}

console.log(`\n✅ Done: ${created} created, ${skipped} skipped`);
console.log(`📂 Directory: ${path.relative(ROOT, featureDir)}`);
console.log(`\nNext steps:`);
console.log(`  1. cd ${path.relative(ROOT, featureDir)}`);
console.log(`  2. Start from 01_PRD/${SNAKE}_prd_draft_ai.md`);
console.log(`  3. Once reviewed with PM/QA, save as ${SNAKE}_prd_official.md`);
