# AGENTS.md

## Project Overview

`ant-admin-template` — enterprise-level admin console template. React 18 + TypeScript, UI built on Neat Design (`@derbysoft/neat-design`, which wraps Ant Design 5.x). **Not file-system routing** — routes are menu-driven and auto-generated from `src/config.menu.tsx`.

## Key Commands

```bash
npm start          # Dev server on http://localhost:3002 (pack.js + packrs)
npm run lint       # ESLint 9 over src/
npm run build:qa   # QA build
npm run build:uat  # UAT build
npm run build:prod # Production build
```

## Tech Stack (from package.json)

- React 18.3.1 + TypeScript, router: `react-router` 7 in **HashRouter** mode (see [src/index.tsx](src/index.tsx))
- UI: `@derbysoft/neat-design` 2.2.2 + `@derbysoft/neat-design-icons` + `@derbysoft/neat-design-illustrations`
- Menu icons: `@ant-design/icons` (menu only — page bodies use `@derbysoft/neat-design-icons`)
- State: `zustand` 5 + `zustand-kit`
- Requests: `axios` 1 via [src/req.ts](src/req.ts)
- Data hooks: `ahooks` 3 (wrapped in project hooks)
- Forms: `react-hook-form` + `@derbysoft/antd-form-builder`
- i18n: `i18next` + `react-i18next`
- Charts: `echarts` + `echarts-for-react`; flow: `reactflow`
- Build: `pack.js` (uses `packrs`) — port 3002, dev proxy `/neat-api-dev` → `localhost:3001`

## Routing System (Critical)

Routes are **menu-driven**, not file-system auto-routing:

1. [src/config.menu.tsx](src/config.menu.tsx) — defines the menu tree with `key`, `label`, `route`, `permissions`, `hidden`, `children`. Menu `label` uses a getter (`get label() { return t('menu.key'); }`) so language switches update text.
2. [src/utils/routeGenerator.tsx](src/utils/routeGenerator.tsx) — `extractRoutesFromMenus()` walks the menu tree; `routeComponentMap` maps `route` path → lazy-loaded component; `lazyLoad('pages/<Module>/<File>')` builds the dynamic import.
3. [src/RouteConfig.tsx](src/RouteConfig.tsx) — renders routes automatically from those two sources. **Do not hand-edit.**
4. [src/config.route.ts](src/config.route.ts) — flattens the menu tree to `{ route, permissions }` pairs (used only for permission lookup, not for defining routes).
5. [src/layouts/RouteGuard.tsx](src/layouts/RouteGuard.tsx) — route-level permission gate. Reads `operations` from `useAppStore()`, compares against the menu node's `permissions` via `hasPermission()` in [src/layouts/Menus.helper.tsx](src/layouts/Menus.helper.tsx). Redirects to `/no-permission` on mismatch.
6. Default entry route: `defaultRoute` in [src/config.ts](src/config.ts) → `/app/dashboard`.

**Adding a new page requires ALL of:**

1. Create page component under `src/pages/<Module>/<File>.tsx` with `export default`.
2. Add menu entry in `src/config.menu.tsx` — include `route` (must start with `/app/`), optional `permissions`, and `hidden: true` for detail routes that should not appear in the sidebar.
3. Map the route path → lazy component in `routeComponentMap` inside `src/utils/routeGenerator.tsx`.
4. Add localized copy (menu label under `menu.*` in [src/locales/common/](src/locales/common/); page copy under [src/locales/pages/&lt;feature&gt;/](src/locales/pages/)).
5. Register any new namespace in [src/locales/index.ts](src/locales/index.ts) (see i18n section).

Without step 3 the URL 404s; without step 2 there is no menu entry; without step 5 translations render raw keys.

## i18n — Manual Namespace Registration (not auto-discovery)

Configured in [src/i18n.ts](src/i18n.ts) with resources from [src/locales/index.ts](src/locales/index.ts). Defaults:

- Default namespace: `common`
- Namespace separator: `:` (e.g. `pages.user:usersTitle`)
- Key separator: `.`
- Fallback language: `en`

Locale files live in [src/locales/](src/locales/):

- `common/{en,zh}.ts` — menu labels (`menu.*`) and cross-page copy
- `pages/<feature>/{en,zh}.ts` — per-feature copy, imported into `src/locales/{en,zh}.ts` under `pages.<feature>`
- `index.ts` — exports `resources` with each `pages.<feature>` namespace explicitly listed and typed with `as const`

**Adding a new page namespace requires:**

1. Create `src/locales/pages/<feature>/{en,zh}.ts`.
2. Import into `src/locales/en.ts` and `src/locales/zh.ts` under `pages.<feature>`.
3. Register the namespace in `resources` inside `src/locales/index.ts` for both `en` and `zh`, and keep the `as const` assertion (this drives TypeScript intellisense wired in [src/i18next.d.ts](src/i18next.d.ts)).

**Use in components:**

```tsx
const { t } = useTranslation();          // default 'common' namespace
t('menu.dashboard');                     // common
t('pages.user:usersTitle');              // namespaced page copy
```

Key naming convention: `xxxTitle`, `xxxCol`, `xxxForm`, `xxxFormPh`, `xxxBtn`, `xxxMsg`.

## Path Aliases

- `~/*` → `src/*`
- `scss/*` → `src/scss/*`
- `components/*` → `src/components/*`

## Styling

- SCSS + BEM. SCSS files live next to the component (no `.module.scss`).
- Each SCSS file starts with `@import 'scss/common.scss';`.
- Use `classnames` for conditional classes; use double quotes for `className`.
- Shared tokens/mixins in [src/scss/](src/scss/).

## State Management

- Global state: zustand + zustand-kit. Primary store [src/store.ts](src/store.ts) (`useAppStore`) holds `language` and `operations`. Syncs with i18n language switching.
- Feature/page state: local `useState` or dedicated hooks in [src/hooks/](src/hooks/) (`useGlobalState`, `useTheme`, `useCountdown`, etc.).

## List Pages — `useDsTable`

Use [src/hooks/useDsTable.tsx](src/hooks/useDsTable.tsx) (wraps ahooks `useAntdTable`) for all paginated tables. Companion docs in [src/hooks/useDsTable.md](src/hooks/useDsTable.md).

Contract:

- Request params: `pageNum` is **0-indexed** (`current - 1`) + `pageSize`. antd's `Pagination` remains 1-indexed; the hook bridges — do not double-subtract.
- Debounced form-driven filters (400ms), auto-strips empty strings.
- Sort: antd `sorter.order` → `params.sorts = [{ direction: 'ASC' | 'DESC', property: columnKey }]`.
- Response envelope: business layer returns `{ result: 'success' | 'fail', data: { records, totals, ... } }`. Default reshape: `{ list: records, total: totals }`. Override via the `responseDataTransform` argument.
- Form-value transform via the `formValuesTransform` argument.
- Built-in error handling: 401 redirects via `location` header, 5xx / offline shows notification, generic errors show a message toast.

There is currently **no `usePageState`** hook — page filter state is local. Do not introduce a duplicate persistence layer without discussing first.

## Request Layer — `useDsRequest`

[src/req.ts](src/req.ts) is the shared axios instance. `baseURL` is environment-driven (`/book-engine-dev|-qa|-uat` or `/book-engine`). Request dedup uses [src/utils/requestDeduplicator.ts](src/utils/requestDeduplicator.ts).

For non-list business calls use [src/hooks/useDsRequest.tsx](src/hooks/useDsRequest.tsx) (wraps ahooks `useRequest`). It:

- Treats `data.data.result === 'success'` as success and calls `onSuccess(data.data.data, params)`.
- Otherwise calls the caller's failure handler with `data.data.error`.

Do not instantiate a new axios client inside a component.

## Permission Model

Operation constants in [src/config.operations.ts](src/config.operations.ts) (currently `VIEW_USER`, `CREATE_USER`, `UPDATE_USER`, `DELETE_USER` — extend as needed).

- Menu nodes: `permissions: [operations.XXX]` (empty array = anyone signed in).
- Route level: `RouteGuard` compares against `useAppStore().operations`.
- Component level: import `hasPermission` from [src/layouts/Menus.helper.tsx](src/layouts/Menus.helper.tsx). The array semantics are OR / superset — read the helper before assuming.

## Pages Layout

Under [src/pages/](src/pages/): `AI/`, `Components/`, `Css/`, `Dashboard/`, `FlowDesigner/`, `Form/`, `Games/`, `Hooks/`, `Hotel/`, `Js/`, `NoPermission/`, `NotFound/`, `PdfViewer/`, `Performance/`, `Security/`, `System/`, `User/`, `ahooks/`. Mirror an existing sibling when scaffolding.

## Code Style

- ESLint 9 + Prettier. Single quotes, semicolons required, 2-space indent, LF.
- Function components only. `import type` for type-only imports.
- File header: `/** @file <path relative to src/> */` + `@author leon.wang`.
- Import order (blank-line separated): React core → third-party → project (`~/`, `components/`) → styles.
- UI components must come from `@derbysoft/neat-design`; do not import from `antd` directly unless Neat Design has no equivalent.
- Menu icons: `@ant-design/icons`. Page icons: `@derbysoft/neat-design-icons`. Illustrations: `@derbysoft/neat-design-illustrations`.
- All user-visible copy through `t()`. Do not concatenate strings — use i18n interpolation.

## Reference Files

- [src/config.menu.tsx](src/config.menu.tsx) — menu / route / permission source of truth
- [src/utils/routeGenerator.tsx](src/utils/routeGenerator.tsx) — route extraction + `routeComponentMap` + `lazyLoad`
- [src/RouteConfig.tsx](src/RouteConfig.tsx) — auto-generated route rendering (do not hand-edit)
- [src/layouts/RouteGuard.tsx](src/layouts/RouteGuard.tsx) — route-level permission gate
- [src/layouts/Menus.helper.tsx](src/layouts/Menus.helper.tsx) — `hasPermission`, menu path resolution
- [src/hooks/useDsTable.tsx](src/hooks/useDsTable.tsx) + [src/hooks/useDsTable.md](src/hooks/useDsTable.md) — paginated list hook
- [src/hooks/useDsRequest.tsx](src/hooks/useDsRequest.tsx) — generic business-request hook
- [src/store.ts](src/store.ts) — global zustand store (`language`, `operations`)
- [src/req.ts](src/req.ts) — axios instance + env-based baseURL
- [src/locales/index.ts](src/locales/index.ts) — namespace registry (`as const`)
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — detailed conventions
- [.github/instructions/00-dev.instructions.md](.github/instructions/00-dev.instructions.md) — full coding standards
- [.github/instructions/01-mcp.neat.instructions.md](.github/instructions/01-mcp.neat.instructions.md) — Neat Design MCP workflow
- [.github/instructions/02-mcp.ant.instructions.md](.github/instructions/02-mcp.ant.instructions.md) — Ant Design MCP reference

## Specialized Agent Roles

The frontend-expert role is defined per tool with equivalent content:

- **Claude Code** — [.claude/agents/ai-frontend-expert.md](.claude/agents/ai-frontend-expert.md) (subagent, YAML frontmatter)
- **GitHub Copilot (VS Code)** — [.github/agents/ai-frontend-expert.agent.md](.github/agents/ai-frontend-expert.agent.md) (custom agent)
- **Codex** — [.codex/agents/ai-frontend-expert.md](.codex/agents/ai-frontend-expert.md) (referenced from this file)

Use the frontend-expert role for self-contained React/TypeScript tasks in this repo:
new pages, menu/route wiring, i18n locales + namespace registration, permission gating,
list flows via `useDsTable` / `useDsRequest`, Neat Design + antd composition,
SCSS/BEM styling, and ESLint/build validation.
