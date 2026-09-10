/**
 * @file store.ts
 * @author leon.wang
 */
import { create } from 'zustand';
import i18n, { language } from './i18n';

export interface UserInfo {
  id: string | number;
  name: string;
  avatar?: string;
  email?: string;
  roles?: string[];
}

type State = {
  language: string;
  operations?: string[];
  user: UserInfo | null;
  authInitialized: boolean;
};

type Action = {
  setLanguage: (language: State['language']) => void;
  setOperations: (operations: State['operations']) => void;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
  setAuthInitialized: (initialized: boolean) => void;
};

export const useAppStore = create<State & Action>((set, get, store) => ({
  // Initial state
  language: language,
  operations: ['js'],
  user: null,
  authInitialized: false,

  // Actions to update state
  setLanguage: (language) => set(() => ({ language })),
  setOperations: (operations) => set(() => ({ operations })),
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null, operations: [] })),
  setAuthInitialized: (authInitialized) => set(() => ({ authInitialized })),

  reset: () => {
    const initialState = store.getInitialState();
    return set((state) => ({
      ...initialState,
      language: state.language,
    }));
  },
}));

// Load initial state from localStorage if available
const savedState = localStorage.getItem('hotelStore');
if (savedState) {
  const initialState = JSON.parse(savedState);
  useAppStore.setState({
    language: initialState.language ?? language,
    operations: initialState.operations ?? ['js'],
  });
  i18n.changeLanguage(initialState.language);
}

useAppStore.subscribe((state, prevState) => {
  // Sync to localStorage whenever the state changes
  // localStorage.setItem('hotelStore', JSON.stringify(state));

  if (state.language !== prevState.language) {
    i18n.changeLanguage(state.language);
  }
});
