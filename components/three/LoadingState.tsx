'use client';

import { useProgress, Html } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function LoadingState() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100 && !active) {
      const timer = setTimeout(() => {
        setShow(false);
        // We don't set setWebGLReady(true) here because SceneMountNotifier handles it
        // but we could use it for more granular control if needed.
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, active]);

  if (!show) return null;

  return (
    <Html center fullscreen zIndexRange={[100, 0]}>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-void px-6 transition-opacity duration-500">
        <div className="relative flex flex-col items-center">
          {/* Progress Circle or Bar */}
          <div className="relative mb-8 h-24 w-24">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="stroke-carbon"
                strokeWidth="2"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="stroke-amber transition-all duration-300 ease-out"
                strokeWidth="2"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                strokeLinecap="round"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-ivory">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-ivory">
              Initializing Odyssey
            </h2>
            <div className="h-[1px] w-32 bg-gradient-heroes opacity-50" />
            <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-stone">
              Calibrating 3D Environment
            </p>
          </div>
        </div>
      </div>
    </Html>
  );
}
