'use client';

import { useSyncExternalStore } from 'react';

export type Platform = 'ios' | 'android' | 'other';

/**
 * SSR-safe user-agent platform detection. Uses `useSyncExternalStore`
 * so the server snapshot is always `'other'` (stable hydration) and
 * the real value is read on the client without `setState`-in-effect.
 *
 * iPadOS 13+ reports as "Mac" in the UA, so we also treat a Mac with
 * a touch-capable screen as iOS.
 */
function subscribe(): () => void {
  // The platform never changes at runtime, so we don't need a real
  // subscription — but the hook's contract demands one.
  return () => {};
}

function getSnapshot(): Platform {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  const isAppleMobile = /iphone|ipad|ipod/i.test(ua);
  const isPadOS =
    /mac/i.test(ua) &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 1;
  if (isAppleMobile || isPadOS) return 'ios';
  return 'other';
}

function getServerSnapshot(): Platform {
  return 'other';
}

export function usePlatform(): Platform {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
