import { create } from 'zustand';
import i18n, { language } from './i18n';

type State = {
  language: string;
  operations?: string[];
};

type Action = {
  setLanguage: (language: State['language']) => void;
  setOperations: (operations: State['operations']) => void;
};

export const useAppStore = create<State & Action>((set, get, store) => ({
  // Initial state
  language: language,
  operations: ['js'],

  // Actions to update state
  setLanguage: (language) => set(() => ({ language })),
  setOperations: (operations) => set(() => ({ operations })),

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
  useAppStore.setState(initialState);
  i18n.changeLanguage(initialState.language);
}

useAppStore.subscribe((state, prevState) => {
  // Sync to localStorage whenever the state changes
  // localStorage.setItem('hotelStore', JSON.stringify(state));

  if (state.language !== prevState.language) {
    i18n.changeLanguage(state.language);
  }
});
