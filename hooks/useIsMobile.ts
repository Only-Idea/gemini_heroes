'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(max-width: 1023px), (pointer: coarse)';

function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

function getSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns true on small viewports or coarse-pointer (touch) devices. Used to
 * gate expensive scroll-driven animations and the WebGL canvas — keeping
 * mobile scrolling at native frame rate.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
