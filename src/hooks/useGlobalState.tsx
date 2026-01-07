/**
 * @file src/hooks/useGlobalState.tsx
 * @author leon.wang
 */

import { create, StoreApi, UseBoundStore } from 'zustand';

/**
 * Global state storage
 */
const globalStates = new Map<string, UseBoundStore<StoreApi<unknown>>>();

/**
 * Universal global state hook - supports both simple values and objects
 * @param key - Unique key for the state
 * @param initialState - Initial state (any type)
 * @returns [state, setState, resetState]
 *
 * @example
 * // Simple value (number, string, boolean)
 * const [count, setCount, resetCount] = useGlobalState('counter', 0);
 * setCount(5);
 * setCount(prev => prev + 1);
 *
 * // Object state - supports partial updates
 * const [user, setUser, resetUser] = useGlobalState('user', {
 *   name: 'John',
 *   email: 'john@example.com',
 * });
 * setUser({ name: 'Jane' }); // Partial update
 * setUser(prev => ({ ...prev, email: 'jane@example.com' }));
 *
 * // Array state
 * const [items, setItems] = useGlobalState('items', [1, 2, 3]);
 * setItems([...items, 4]);
 */
export function useGlobalState<T>(
  key: string,
  initialState: T
): [
  T,
  (value: T extends Record<string, unknown> ? Partial<T> | ((prev: T) => T) : T | ((prev: T) => T)) => void,
  () => void
] {
  if (!globalStates.has(key)) {
    const isObject = typeof initialState === 'object' && initialState !== null && !Array.isArray(initialState);

    const store = create<{ value: T; setValue: (value: unknown) => void; reset: () => void }>((set) => ({
      value: initialState,
      setValue: (value) => {
        if (typeof value === 'function') {
          // Functional update
          set((state) => ({ value: (value as (prev: T) => T)(state.value) }));
        } else if (isObject && typeof value === 'object' && value !== null) {
          // Partial update for objects
          set((state) => ({ value: { ...state.value, ...value } as T }));
        } else {
          // Direct value update
          set({ value: value as T });
        }
      },
      reset: () => set({ value: initialState }),
    }));

    globalStates.set(key, store as UseBoundStore<StoreApi<unknown>>);
  }

  const store = globalStates.get(key) as UseBoundStore<
    StoreApi<{ value: T; setValue: (value: unknown) => void; reset: () => void }>
  >;
  const state = store();

  return [state.value, state.setValue, state.reset] as [
    T,
    (value: T extends Record<string, unknown> ? Partial<T> | ((prev: T) => T) : T | ((prev: T) => T)) => void,
    () => void
  ];
}

export default useGlobalState;
