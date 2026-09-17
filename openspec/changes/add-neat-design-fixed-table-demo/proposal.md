# Proposal

## Why

The project currently has a CSS-only sticky table demo, but it does not demonstrate the Neat Design Table component's built-in fixed header and fixed column behavior. Adding a focused component demo gives developers a concrete reference for implementing wide, scrollable data tables with stable fixed columns.

## What Changes

- Add a new component-menu demo page for Neat Design Table fixed header and fixed columns.
- Wire the demo into the existing menu-driven routing system under the Components menu.
- Add localized menu and page copy for Chinese and English.
- Use local mock table data to show vertical scrolling, horizontal scrolling, left fixed columns, and a right fixed action column.

## Capabilities

### New Capabilities

- `component-table-demos`: Covers component-menu table demonstrations, including fixed header and fixed column behavior for the Neat Design Table component.

### Modified Capabilities

- None.

## Impact

- Affected UI areas: component menu configuration, route component mapping, Components page demos, and i18n locale resources.
- No backend API or persistence changes are required.
- No dependency changes are expected because the project already uses `@derbysoft/neat-design`.
