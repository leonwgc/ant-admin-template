import dayjs from 'dayjs';
import { create } from 'zustand';
import i18n, { language } from './i18n';

export interface Guest {
  firstName: string;
  lastName: string;
}

type RoomType = {
  roomId: string;
  roomName: string;
  description: string;
  imageUrls: string[];
};

type RatePlan = {
  rateId: string;
  rateName: string;
  mealPlan: 'BB' | 'RO';
};

export interface HotelInfo {
  hotelId: string;
  hotelName: string;
  address: string;
  telephone: string;
  icpMessage: string;
  imageUrls: string[];
  roomTypes: RoomType[];
  ratePlans: RatePlan[];
  occupancy: {
    maxAdult: number;
  };
}

const today = dayjs();
const defaultDates: [Date, Date] = [today.toDate(), today.add(1, 'd').toDate()];

type State = {
  language: string;
};

type Action = {
  setLanguage: (language: State['language']) => void;
};

export const useBookEngineStore = create<State & Action>((set, get, store) => ({
  // Initial state
  language: language,

  // Actions to update state
  setLanguage: (language) => set(() => ({ language })),

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
  useBookEngineStore.setState(initialState);
  i18n.changeLanguage(initialState.language);
}

useBookEngineStore.subscribe((state, prevState) => {
  // Sync to localStorage whenever the state changes
  localStorage.setItem('hotelStore', JSON.stringify(state));

  if (state.language !== prevState.language) {
    i18n.changeLanguage(state.language);
  }
});
