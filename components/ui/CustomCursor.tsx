'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  useEffect(() => {
    // Only show on fine pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = !!target.closest('a, button, [role="button"], input, textarea, select');
    };

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px)`;
      }

      if (ringRef.current) {
        const size = isHovering.current ? 64 : 36;
        const offset = size / 2;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px)`;
        ringRef.current.style.borderColor = isHovering.current
          ? 'var(--color-coral)'
          : 'var(--color-ivory)';
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden [@media(pointer:fine)]:block" aria-hidden="true">
      {/* Dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-ivory"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-ivory/50 transition-[width,height,border-color] duration-300"
      />
    </div>
  );
}
