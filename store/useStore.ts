import { create } from 'zustand';

interface AppState {
  isWebGLReady: boolean;
  setWebGLReady: (ready: boolean) => void;
  perfLevel: number;
  setPerfLevel: (level: number) => void;
  isReducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  heroScrollProgress: number;
  setHeroScrollProgress: (progress: number) => void;
  isIntroComplete: boolean;
  setIntroComplete: (complete: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isWebGLReady: false,
  setWebGLReady: (ready) => set({ isWebGLReady: ready }),
  perfLevel: 2, // 1: Low, 2: Med, 3: High
  setPerfLevel: (level) => set({ perfLevel: level }),
  isReducedMotion: false,
  setReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
  heroScrollProgress: 0,
  setHeroScrollProgress: (progress) => set({ heroScrollProgress: progress }),
  isIntroComplete: false,
  setIntroComplete: (complete) => set({ isIntroComplete: complete }),
}));
