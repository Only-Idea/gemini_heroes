'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';

type Phase = 'visible' | 'exiting' | 'hidden';

export default function PageTransition() {
  const isWebGLReady = useStore((s) => s.isWebGLReady);
  const setIntroComplete = useStore((s) => s.setIntroComplete);
  const [phase, setPhase] = useState<Phase>('visible');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase === 'hidden') {
      setIntroComplete(true);
      return;
    }

    if (isWebGLReady) {
      const finish = window.setTimeout(() => setProgress(100), 0);
      const toExit = window.setTimeout(() => setPhase('exiting'), 280);
      const toHide = window.setTimeout(() => setPhase('hidden'), 1080);
      return () => {
        clearTimeout(finish);
        clearTimeout(toExit);
        clearTimeout(toHide);
      };
    }

    const interval = window.setInterval(() => {
      setProgress((p) => (p < 90 ? p + (90 - p) * 0.05 : p));
    }, 80);

    // Safety fallback if the scene never signals ready.
    const safetyExit = window.setTimeout(() => setPhase('exiting'), 4000);
    const safetyHide = window.setTimeout(() => setPhase('hidden'), 4800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyExit);
      clearTimeout(safetyHide);
    };
  }, [isWebGLReady, phase, setIntroComplete]);

  if (phase === 'hidden') return null;

  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none fixed inset-0 z-[300] flex flex-col items-center justify-center',
        'bg-gradient-heroes bg-[length:200%_200%]',
        'transition-[transform,opacity] duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)]',
        phase === 'exiting' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
      ].join(' ')}
    >
      <div className="flex flex-col items-center gap-5 text-white">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.45em] text-white/85">
          Heroes · Virtual Odyssey
        </span>
        <div className="h-[2px] w-60 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/60">
          {progress < 100 ? 'Calibrating 3D Environment' : 'Ready'}
        </span>
      </div>
    </div>
  );
}
