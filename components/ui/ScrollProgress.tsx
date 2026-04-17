'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[60] h-[3px] w-full" aria-hidden="true">
      <div
        className="h-full bg-gradient-heroes transition-[width] duration-300 ease-out shadow-[0_0_10px_rgba(236,122,92,0.3)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
