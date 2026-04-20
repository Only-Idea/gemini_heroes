import { create } from 'zustand';

interface AppState {
  isWebGLReady: boolean;
  setWebGLReady: (ready: boolean) => void;
  perfLevel: number;
  setPerfLevel: (level: number) => void;
  isReducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  medalScrollProgress: number;
  setMedalScrollProgress: (progress: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isWebGLReady: false,
  setWebGLReady: (ready) => set({ isWebGLReady: ready }),
  perfLevel: 2, // 1: Low, 2: Med, 3: High
  setPerfLevel: (level) => set({ perfLevel: level }),
  isReducedMotion: false,
  setReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
  medalScrollProgress: 0,
  setMedalScrollProgress: (progress) => set({ medalScrollProgress: progress }),
}));
