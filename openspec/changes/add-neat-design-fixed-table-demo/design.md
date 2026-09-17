# Design

## Context

See proposal.md for motivation. The app uses menu-driven routing: `src/config.menu.tsx` defines navigable entries, and `src/utils/routeGenerator.tsx` maps each route to a lazy-loaded page component. Component demos live under `src/pages/Components/`, and localized menu labels live in `src/locales/common/*` while page-specific copy can use the already registered `pages.components` namespace.

A CSS-only sticky table demo already exists under the CSS feature area, so this change should avoid duplicating that implementation and instead demonstrate the table behavior through the project's UI component layer.

## Goals / Non-Goals

**Goals:**

- Add a discoverable Components menu entry for the fixed table demo.
- Build a self-contained demo page that visually exercises fixed header, left fixed columns, right fixed action column, vertical scrolling, and horizontal scrolling.
- Keep routing and localization consistent with the existing menu-driven architecture.
- Use project-standard UI imports from `@derbysoft/neat-design` for page components.

**Non-Goals:**

- Replace or modify the existing CSS sticky table demo.
- Add backend APIs, persistence, or request hooks.
- Introduce a reusable table abstraction beyond the demo page.
- Change global routing architecture or route guard behavior.

## Decisions

### Add a new Components demo route

Use a new route such as `/app/components/table-fixed` mapped to a new page under `src/pages/Components/`. This keeps the behavior discoverable with other component examples and separates it from CSS implementation examples.

Alternative considered: add the demo under the CSS menu. That would blur the distinction between a CSS sticky implementation and the Neat Design Table component behavior.

### Reuse the existing `pages.components` namespace

The Components namespace is already registered in `src/locales/index.ts`, so the implementation should extend `src/locales/pages/components/en.ts` and `src/locales/pages/components/zh.ts` rather than introduce a new namespace.

Alternative considered: create `pages.table` or `pages.componentsTable`. That adds namespace registration work without adding useful domain separation for a single component demo.

### Use local generated data

The page should generate local mock records with enough rows and columns to force both scroll directions. This keeps the demo deterministic and independent from request-layer behavior.

Alternative considered: reuse `useDsTable` data flow. That would make this a hooks/list-flow demo instead of a focused Table component demo.

### Keep table dimensions explicit

Fixed-column table behavior depends on stable column widths and a scroll container. The page should define column widths, table `scroll.x`, and table `scroll.y` explicitly so fixed columns and header behavior are visible and stable.

Alternative considered: let columns auto-size. That can hide horizontal scrolling on wider screens and make the fixed-column demo unreliable.

## Risks / Trade-offs

- Fixed column behavior may be hard to notice if viewport width is wide enough -> Use enough middle columns and an explicit horizontal scroll width.
- Direct table action buttons in the right fixed column could imply real operations -> Keep actions local/demo-only and avoid backend side effects.
- Existing demo pages vary in whether all visible copy is localized -> Prefer i18n for this new page to align with current project guidance.
- Importing from `antd` would match some older examples but violate current project conventions -> Use `@derbysoft/neat-design` unless a required API is unavailable.

## Migration Plan

No migration is required. The change adds a new route and menu entry without modifying existing behavior. Rollback is removing the new menu item, route mapping, page files, styles, and locale entries.
