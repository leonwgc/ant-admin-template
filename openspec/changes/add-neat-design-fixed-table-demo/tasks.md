# Tasks

## 1. Menu, Routing, and Localization

- [x] 1.1 Add localized `menu.tableFixed` labels to `src/locales/common/en.ts` and `src/locales/common/zh.ts`, and verify the key is referenced through the existing menu translation pattern.
- [x] 1.2 Add a Components menu child for `/app/components/table-fixed` in `src/config.menu.tsx`, and verify the menu item uses a getter label, empty permissions, and an `/app/` route.
- [x] 1.3 Register `/app/components/table-fixed` in `src/utils/routeGenerator.tsx`, and verify the route maps to the new Components page through `lazyLoad`.
- [x] 1.4 Add fixed-table page copy to `src/locales/pages/components/en.ts` and `src/locales/pages/components/zh.ts`, and verify no new namespace registration is required because `pages.components` already exists.

## 2. Demo Page Implementation

- [x] 2.1 Create `src/pages/Components/TableFixedDemo.tsx` with the required file header and default export, and verify it imports UI components from `@derbysoft/neat-design` rather than `antd`.
- [x] 2.2 Define local mock table data with enough rows and columns to require vertical and horizontal scrolling, and verify the page renders without backend API data.
- [x] 2.3 Configure the table columns with explicit widths, left fixed columns, and a right fixed action column, and verify horizontal scrolling keeps the fixed columns visible.
- [x] 2.4 Configure table scrolling so the table body scrolls vertically while the header remains visible, and verify the fixed header behavior is observable on the page.

## 3. Styling and Validation

- [x] 3.1 Create `src/pages/Components/TableFixedDemo.scss` with the required file header, `@import 'scss/common.scss';`, and BEM class names, and verify the demo layout remains readable on desktop and narrow viewports.
- [x] 3.2 Run a focused validation for the touched frontend files, such as `npm run lint`, and verify no new lint errors are introduced by the change.
- [ ] 3.3 Manually open the new Components menu item in the dev app, and verify the page is reachable, localized, and demonstrates fixed header plus fixed left/right columns.
