---
name: react-component-best-practices
description: React component and hooks best practices for react project — component splitting, custom hook extraction, state colocation, props typing, and composition. Use when writing, reviewing, or refactoring React components/pages in this repository.
metadata:
  author: leon.wang
  version: "1.0"
---

# React Component & Hooks Best Practices — React Project

Project-specific conventions for structuring components and hooks. For micro-level performance rules (waterfalls, memoization, bundle size), apply the `vercel-react-best-practices` skill alongside this one.

## Component splitting

- **Split by responsibility, not by size alone.** Extract a sub-component when a block has its own data-fetching, its own local state, or is reused in more than one place.
- **Page vs. component**: `src/pages/<Module>/` holds route-level orchestration (data fetching, layout, wiring hooks together). Reusable, presentation-focused pieces belong in `src/components/<ComponentName>/` (see file organization below) so they can be imported via `~/components/<ComponentName>`.
- **Container/presentational split**: keep components that call `useDsTable` / `useDsRequest` or read `useAppStore` separate from pure rendering components that only take props. This keeps presentational pieces easy to reuse and test.
- **Extract when a component**:
  - exceeds ~200 lines or mixes more than one concern (e.g. form logic + table logic + modal logic in one file),
  - has JSX repeated in multiple places (loops, tabs, conditional branches),
  - needs independent state that does not affect the parent's render.
- **Prop count as a signal**: if a component needs 8+ props to configure, consider composition (children/render props) instead of a flatter but wider prop surface.
- **Co-locate small helpers**: one-off formatting/mapping functions used by a single component can live in the same file below the component; promote to `src/utils/` only once reused by 2+ files.

## File organization

- New components use the **folder + index** pattern: `components/ComponentName/index.tsx` + `components/ComponentName/index.scss` (see [src/components/FixedTable](../../../src/components/FixedTable)). Do not create `ComponentName.tsx` / `ComponentName.scss` siblings.
- Export the component as a default export.
- If a component's logic needs splitting into hooks/utils, keep them in the same folder (`components/ComponentName/useX.ts`) with the folder's `index.tsx` as the single entry point.

## Hooks

### Priority order

1. **ahooks** first (`useRequest`, `useAntdTable`, `useDebounceFn`, `useMemoizedFn`, etc.) — check before writing custom logic.
2. **Project hooks** in `~/hooks/` — `useDsRequest`, `useDsTable`, `useNavTo`, `useFormField`, `useGlobalState`, `useCountdown`, `useTheme`, `usePreventDuplicate`, `useLockAsyncFunc`, etc. Reuse before adding a near-duplicate.
3. React built-ins (`useState`, `useEffect`, `useMemo`, `useCallback`) only when neither of the above fits.

### Extracting custom hooks

- Extract a custom hook (`useXxx`) when a component has **stateful logic that is reused across components**, or when a single component's effect/state logic grows large enough to obscure the render output.
- Name with the `use` prefix; only call hooks at the top level (no conditionals/loops around hook calls).
- A custom hook should return a small, well-typed object/tuple — avoid returning ad-hoc large objects that leak internal implementation details.
- Data-fetching hooks must follow the [src/hooks/useDsRequest.tsx](../../../src/hooks/useDsRequest.tsx) / [src/hooks/useDsTable.tsx](../../../src/hooks/useDsTable.tsx) envelope contracts — do not hand-roll axios calls inside a component.

### Effects

- Prefer deriving values during render (or `useMemo`) over syncing state with `useEffect`. Only use `useEffect` for real side effects (subscriptions, DOM measurement, imperative APIs).
- Always clean up subscriptions/timers/listeners in the effect's return function.
- Async effects: guard `setState` after unmount/abort — check an `alive` flag or `signal.aborted` in the `finally` block before updating state (do not update state unconditionally after an awaited call).
- Keep dependency arrays exhaustive; do not suppress the lint rule to silence a stale-closure bug — fix the closure instead.

### Memoization

- Do not wrap every function in `useCallback` or every value in `useMemo` by default — only do so when passing to a memoized child (`React.memo`) or when the computation is measurably expensive.
- Prefer `ahooks`' `useMemoizedFn` when a stable callback identity is needed without manual dependency arrays.

## Props & typing

- Every component's props are an exported `interface ComponentNameProps` with JSDoc comments per prop (see [00-dev.instructions.md](../../../.github/instructions/00-dev.instructions.md)).
- Provide defaults via destructuring (`{ pagination = {}, minBodyHeight = 120 }`), not `defaultProps`.
- Use `import type` for type-only imports.

## State colocation

- Local, page-specific state (form inputs, modal open/close, table filters): `useState` or a local custom hook — do not lift to the global store.
- Cross-page/global concerns only (language, permissions/operations, theme): `useAppStore` in [src/store.ts](../../../src/store.ts).
- There is no `usePageState` hook in this repo — do not add a duplicate persistence layer for filter state without discussing first.

## Composition over configuration

- Prefer `children` / render props / compound components over a component that takes many boolean flags to toggle internal behavior.
- When a Neat Design component covers most of a use case, wrap it minimally rather than reimplementing its behavior.
