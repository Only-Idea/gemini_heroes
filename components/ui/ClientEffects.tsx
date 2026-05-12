'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

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
  return (
    <SmoothScroll>
      <GlobalCanvas />
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgress />
      {children}
      <FloatingDownloadBar />
      <DevTools />
    </SmoothScroll>
  );
}
