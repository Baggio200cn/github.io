import { create } from 'zustand';

export type ThemePreset = 'classic' | 'elegant' | 'simple';
export type FontFamily = 'sans' | 'serif' | 'mono';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type CodeTheme = 'github-dark' | 'github-light' | 'one-dark' | 'solarized-light';

interface SettingsState {
  theme: ThemePreset;
  fontFamily: FontFamily;
  fontSize: FontSize;
  themeColor: string;
  codeTheme: CodeTheme;
  set: <K extends keyof Omit<SettingsState, 'set'>>(
    key: K,
    value: SettingsState[K]
  ) => void;
}

export const useSettings = create<SettingsState>((set) => ({
  theme: 'classic',
  fontFamily: 'sans',
  fontSize: 'md',
  themeColor: '#0F4C81',
  codeTheme: 'github-light',
  set: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
