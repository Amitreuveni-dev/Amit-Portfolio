import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UIState, FontSize } from '../../types';

const getInitialFontSize = (): FontSize => {
  const stored = localStorage.getItem('fontSize') as FontSize | null;
  if (stored && ['small', 'medium', 'large'].includes(stored)) {
    return stored;
  }
  return 'medium';
};

const initialState: UIState = {
  fontSize: getInitialFontSize(),
  isAccessibilityPanelOpen: false,
};

const fontSizeMap: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<FontSize>) => {
      state.fontSize = action.payload;
      localStorage.setItem('fontSize', action.payload);
      document.documentElement.style.setProperty('--base-font-size', fontSizeMap[action.payload]);
    },
    increaseFontSize: (state) => {
      const sizes: FontSize[] = ['small', 'medium', 'large'];
      const currentIndex = sizes.indexOf(state.fontSize);
      if (currentIndex < sizes.length - 1) {
        state.fontSize = sizes[currentIndex + 1];
        localStorage.setItem('fontSize', state.fontSize);
        document.documentElement.style.setProperty('--base-font-size', fontSizeMap[state.fontSize]);
      }
    },
    decreaseFontSize: (state) => {
      const sizes: FontSize[] = ['small', 'medium', 'large'];
      const currentIndex = sizes.indexOf(state.fontSize);
      if (currentIndex > 0) {
        state.fontSize = sizes[currentIndex - 1];
        localStorage.setItem('fontSize', state.fontSize);
        document.documentElement.style.setProperty('--base-font-size', fontSizeMap[state.fontSize]);
      }
    },
    toggleAccessibilityPanel: (state) => {
      state.isAccessibilityPanelOpen = !state.isAccessibilityPanelOpen;
    },
    setAccessibilityPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isAccessibilityPanelOpen = action.payload;
    },
  },
});

export const {
  setFontSize,
  increaseFontSize,
  decreaseFontSize,
  toggleAccessibilityPanel,
  setAccessibilityPanelOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
