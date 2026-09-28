'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// easeInOutExpo — slow start, fast middle, soft landing for anchor jumps.
const easeInOutExpo = (t: number) =>
  t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  // Drive Lenis from GSAP's ticker so ScrollTrigger and Lenis share one frame.
  useEffect(() => {
    const onTick = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(onTick);
  }, []);

  useLenis(ScrollTrigger.update);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.09,
        // Wheel only: touch keeps native OS momentum (syncTouch lerping is laggy on iOS/Android).
        smoothWheel: !prefersReducedMotion(),
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

/**
 * Click handler for in-page anchors ("#id" or "#" for top). Scrolls via Lenis
 * and keeps the URL hash in sync; falls back to the native jump before Lenis mounts.
 */
export function useAnchorScroll() {
  const lenis = useLenis();
  return (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(href === '#' ? 0 : href, {
      duration: 1.4,
      easing: easeInOutExpo,
      immediate: prefersReducedMotion(),
    });
    history.replaceState(null, '', href === '#' ? location.pathname : href);
  };
}
