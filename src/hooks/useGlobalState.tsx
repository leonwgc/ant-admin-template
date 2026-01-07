/**
 * @file src/hooks/useGlobalState.tsx
 * @author leon.wang
 */

import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useMemo } from 'react';

/**
 * Global state storage
 */
const globalStates = new Map<string, UseBoundStore<StoreApi<unknown>>>();

/**
 * Storage type for persistence
 */
export type StorageType = 'localStorage' | 'sessionStorage' | 'none';

/**
 * Options for useGlobalState
 */
export interface UseGlobalStateOptions {
  /**
   * Enable persistence and specify storage type
   * @default 'none'
   */
  storage?: StorageType;
  /**
   * Custom storage key prefix
   * @default 'global-state'
   */
  storageKey?: string;
}

/**
 * Universal global state hook - supports both simple values and objects
 * Performance optimized with selector pattern
 *
 * @param key - Unique key for the state
 * @param initialState - Initial state (any type)
 * @param options - Configuration options including persistence
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
 *
 * // With localStorage persistence
 * const [settings, setSettings] = useGlobalState('settings', { theme: 'dark' }, {
 *   storage: 'localStorage'
 * });
 *
 * // With sessionStorage persistence
 * const [tempData, setTempData] = useGlobalState('temp', { foo: 'bar' }, {
 *   storage: 'sessionStorage',
 *   storageKey: 'my-app'
 * });
 */
export function useGlobalState<T>(
  key: string,
  initialState: T,
  options?: UseGlobalStateOptions
): [
  T,
  (value: T extends Record<string, unknown> ? Partial<T> | ((prev: T) => T) : T | ((prev: T) => T)) => void,
  () => void
] {
  const { storage = 'none', storageKey = 'global-state' } = options || {};

  if (!globalStates.has(key)) {
    const isObject = typeof initialState === 'object' && initialState !== null && !Array.isArray(initialState);

    type StoreState = { value: T; setValue: (value: unknown) => void; reset: () => void };

    const stateCreator = (set: (partial: Partial<StoreState> | ((state: StoreState) => Partial<StoreState>)) => void): StoreState => ({
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
    });

    let store: UseBoundStore<StoreApi<StoreState>>;

    if (storage !== 'none') {
      // Create store with persistence
      const storageImpl = storage === 'localStorage' ? localStorage : sessionStorage;

      store = create<StoreState>()(
        persist(stateCreator, {
          name: `${storageKey}-${key}`,
          storage: createJSONStorage(() => storageImpl),
        })
      );
    } else {
      // Create store without persistence
      store = create<StoreState>(stateCreator);
    }

    globalStates.set(key, store as UseBoundStore<StoreApi<unknown>>);
  }

  const store = globalStates.get(key) as UseBoundStore<
    StoreApi<{ value: T; setValue: (value: unknown) => void; reset: () => void }>
  >;

  // Performance optimization: use selector to only subscribe to value
  const value = store((state) => state.value);

  // Memoize actions to prevent unnecessary re-renders
  const setValue = useMemo(() => store.getState().setValue, [store]);
  const reset = useMemo(() => store.getState().reset, [store]);

  return [value, setValue, reset] as [
    T,
    (value: T extends Record<string, unknown> ? Partial<T> | ((prev: T) => T) : T | ((prev: T) => T)) => void,
    () => void
  ];
}

/**
 * Advanced hook with custom selector for fine-grained subscriptions
 * Only re-renders when selected value changes
 *
 * @example
 * // Only subscribe to user name, not the whole user object
 * const userName = useGlobalSelector('user', (state) => state.name);
 *
 * // Multiple values
 * const { name, email } = useGlobalSelector(
 *   'user',
 *   (state) => ({ name: state.name, email: state.email })
 * );
 */
export function useGlobalSelector<T, R>(
  key: string,
  selector: (state: T) => R
): R {
  const store = globalStates.get(key) as UseBoundStore<StoreApi<{ value: T }>>;

  if (!store) {
    throw new Error(`Global state with key "${key}" not found. Initialize it with useGlobalState first.`);
  }

  return store((state) => selector(state.value));
}

/**
 * Hook to get setter function only (doesn't subscribe to state changes)
 * Useful when you only need to update state without reading it
 *
 * @example
 * const setCount = useGlobalSetter<number>('counter');
 * setCount(5);
 * setCount(prev => prev + 1);
 */
export function useGlobalSetter<T>(
  key: string
): (value: T extends Record<string, unknown> ? Partial<T> | ((prev: T) => T) : T | ((prev: T) => T)) => void {
  const store = globalStates.get(key) as UseBoundStore<StoreApi<{ value: T; setValue: (value: unknown) => void }>>;

  if (!store) {
    throw new Error(`Global state with key "${key}" not found. Initialize it with useGlobalState first.`);
  }

  // Return memoized setter function to prevent re-renders
  return useMemo(() => store.getState().setValue, [store]);
}

export default useGlobalState;
