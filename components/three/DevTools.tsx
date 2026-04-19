'use client';

import { Leva } from 'leva';
import { Stats } from '@react-three/drei';

export default function DevTools() {
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev) return null;

  return (
    <>
      <Leva collapsed />
      <div className="fixed bottom-4 left-4 z-[100] opacity-50 hover:opacity-100 transition-opacity">
        <Stats className="!static" />
      </div>
    </>
  );
}
