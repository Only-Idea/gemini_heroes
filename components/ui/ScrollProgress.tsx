'use client';

import { useRef } from 'react';
import { useLenis } from 'lenis/react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  // Lenis emits on every smoothed frame (and on native touch scroll), so the
  // bar tracks the page exactly — no CSS transition, no React re-render.
  useLenis(({ progress }) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div className="fixed top-0 left-0 z-[60] h-[3px] w-full" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-heroes origin-left shadow-[0_0_10px_rgba(236,122,92,0.3)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
