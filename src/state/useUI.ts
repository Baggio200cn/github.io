import { create } from 'zustand';

interface UIState {
  isStylePanelVisible: boolean;
  toggleStylePanel: () => void;
  setStylePanelVisible: (visible: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  isStylePanelVisible: true,
  toggleStylePanel: () =>
    set((state) => ({ isStylePanelVisible: !state.isStylePanelVisible })),
  setStylePanelVisible: (visible: boolean) =>
    set({ isStylePanelVisible: visible }),
}));
