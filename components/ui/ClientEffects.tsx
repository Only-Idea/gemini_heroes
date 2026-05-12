'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

// Defer heavy UI and 3D components to avoid blocking the main thread during initial paint.
// This reduces the 'Render Blocking Resources' and 'Main Thread Activity' metrics.

const GlobalCanvas = dynamic(() => import('@/components/three/GlobalCanvas'), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), {
  ssr: false,
});

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), {
  ssr: false,
});

const GrainOverlay = dynamic(() => import('@/components/ui/GrainOverlay'), {
  ssr: false,
});

const FloatingDownloadBar = dynamic(() => import('@/components/ui/FloatingDownloadBar'), {
  ssr: false,
});

const DevTools = dynamic(() => import('@/components/three/DevTools'), {
  ssr: false,
});

export default function ClientEffects({ children }: { children: React.ReactNode }) {
  const [isDeferredReady, setIsDeferredReady] = useState(false);

  useEffect(() => {
    // Phase 2: Defer heaviest elements until window is fully loaded or a short idle period.
    // This protects the TBT metric during the critical hydration phase.
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setIsDeferredReady(true));
      } else {
        setIsDeferredReady(true);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      {isDeferredReady && (
        <>
          <GlobalCanvas />
          <GrainOverlay />
          <CustomCursor />
          <ScrollProgress />
          <FloatingDownloadBar />
          <DevTools />
        </>
      )}
      {children}
    </SmoothScroll>
  );
}
