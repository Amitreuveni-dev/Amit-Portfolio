import { useSyncExternalStore } from 'react';
import type { FontSize, ThemeMode } from './types';

// Display preferences (theme and font size), saved in localStorage and applied to <html>.
// A tiny external store read with useSyncExternalStore, so no state library is needed.

export interface Preferences {
  theme: ThemeMode;
  fontSize: FontSize;
}

const THEMES: ThemeMode[] = ['light', 'dark', 'high-contrast'];
const FONT_SIZES: FontSize[] = ['small', 'medium', 'large'];

const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

const readStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked (private mode); the preference still applies for this visit
  }
};

const getInitialTheme = (): ThemeMode => {
  const stored = readStorage('theme') as ThemeMode | null;
  if (stored && THEMES.includes(stored)) {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialFontSize = (): FontSize => {
  const stored = readStorage('fontSize') as FontSize | null;
  return stored && FONT_SIZES.includes(stored) ? stored : 'medium';
};

let preferences: Preferences = {
  theme: getInitialTheme(),
  fontSize: getInitialFontSize(),
};

const listeners = new Set<() => void>();

const applyToDocument = (): void => {
  const root = document.documentElement;
  root.setAttribute('data-theme', preferences.theme);
  root.style.setProperty('--base-font-size', FONT_SIZE_MAP[preferences.fontSize]);
};

const update = (next: Partial<Preferences>): void => {
  preferences = { ...preferences, ...next };
  applyToDocument();
  listeners.forEach((listener) => listener());
};

applyToDocument();

export const setTheme = (theme: ThemeMode): void => {
  writeStorage('theme', theme);
  update({ theme });
};

export const stepFontSize = (direction: 1 | -1): void => {
  const index = FONT_SIZES.indexOf(preferences.fontSize) + direction;
  if (index < 0 || index >= FONT_SIZES.length) return;
  writeStorage('fontSize', FONT_SIZES[index]);
  update({ fontSize: FONT_SIZES[index] });
};

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = (): Preferences => preferences;

export const usePreferences = (): Preferences => useSyncExternalStore(subscribe, getSnapshot);
