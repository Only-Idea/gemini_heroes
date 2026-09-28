'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';

interface AnimatedHeadlineProps {
  children: string;
  delay?: number;
  stagger?: number;
  start?: boolean;
  className?: string;
  /** Fill with the brand gradient (+ shimmer), continuous across all chars. */
  gradient?: boolean;
}

export default function AnimatedHeadline({
  children,
  delay = 0,
  stagger = 0.04,
  start = true,
  className = '',
  gradient = false,
}: AnimatedHeadlineProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);

  // Chrome can't clip a parent's `background-clip: text` through split
  // inline-block chars (duplicated/misplaced glyphs), so each char clips its
  // own background. Feed it its offset in the headline so all chars sample
  // one shared gradient box (see `.ah-gradient` in globals.css).
  useEffect(() => {
    const root = rootRef.current;
    if (!gradient || !root) return;
    const measure = () => {
      root.style.setProperty('--ah-w', `${root.offsetWidth}px`);
      root.style.setProperty('--ah-h', `${root.offsetHeight}px`);
      root.querySelectorAll<HTMLElement>('.ah-char').forEach((c) => {
        c.style.setProperty('--ah-x', `${c.offsetLeft}px`);
        c.style.setProperty('--ah-y', `${c.offsetTop}px`);
      });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [gradient, children]);

  useEffect(() => {
    if (!rootRef.current) return;
    const chars = rootRef.current.querySelectorAll<HTMLElement>('.ah-char');
    if (chars.length === 0) return;

    if (isReducedMotion) {
      gsap.set(chars, { yPercent: 0, opacity: 1 });
      return;
    }

    if (!start) {
      gsap.set(chars, { yPercent: 120, opacity: 0 });
      return;
    }

    const tween = gsap.fromTo(
      chars,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        // 2D only: GPU-layered chars escape the parent's gradient
        // `background-clip: text` in Chrome (ghost/missing glyphs).
        force3D: false,
        stagger,
        delay: delay / 1000,
      }
    );

    return () => {
      tween.kill();
    };
  }, [children, delay, stagger, isReducedMotion, start]);

  return (
    <span ref={rootRef} className={`relative inline-block ${gradient ? 'ah-gradient' : ''} ${className}`}>
      <span className="sr-only">{children}</span>
      {/* Break lines only between phrases (after spaces or 、。), and glue
          punctuation to its preceding char — so no mid-word breaks and no line
          starting with 、. A phrase wider than the line still wraps internally. */}
      <span aria-hidden="true" className="flex flex-wrap justify-center">
        {children.split(/(?<=[\s、。])/).map((phrase, p) => (
          <span key={p} className="inline-flex flex-wrap justify-center">
            {(phrase.match(/.[、。，！？」』）]*/gu) ?? []).map((ch, i) => (
              <span
                key={i}
                className="ah-mask inline-block overflow-hidden align-bottom leading-[1.05]"
                style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
              >
                <span className="ah-char inline-block">{ch}</span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
