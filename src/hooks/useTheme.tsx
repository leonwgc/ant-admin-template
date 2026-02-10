/**
 * @file hooks/useTheme.tsx
 * @author leon.wang
 * @description Theme state management using zustand-kit
 */
import { useEffect } from 'react';
import { useGlobalState } from './useGlobalState';

export type Theme = 'light' | 'dark';

/**
 * Global theme state management hook
 * Uses zustand-kit for state persistence and reactivity
 */
export const useTheme = () => {
  const [theme, setThemeState] = useGlobalState<Theme>('theme', 'light', {
    storage: 'localStorage',
  });

  // Apply theme to document when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
