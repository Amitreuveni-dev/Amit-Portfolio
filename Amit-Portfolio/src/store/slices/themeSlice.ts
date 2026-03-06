import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState, ThemeMode } from '../../types';

const getInitialTheme = (): ThemeMode => {
  const stored = localStorage.getItem('theme') as ThemeMode | null;
  if (stored && ['light', 'dark', 'high-contrast'].includes(stored)) {
    return stored;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    toggleTheme: (state) => {
      const modes: ThemeMode[] = ['light', 'dark', 'high-contrast'];
      const currentIndex = modes.indexOf(state.mode);
      const nextIndex = (currentIndex + 1) % modes.length;
      state.mode = modes[nextIndex];
      localStorage.setItem('theme', state.mode);
      document.documentElement.setAttribute('data-theme', state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
