'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollContainerProps {
  children: ReactNode;
  /** Where the pin should release: 'center' aligns the last child's center to the viewport center; 'edge' aligns its right edge to the viewport right edge. */
  stopMode?: 'center' | 'edge';
  /** Selector used to find the last meaningful child if direct child layout differs. Defaults to direct `.lastElementChild`. */
  lastChildSelector?: string;
  /** Class applied to the row of content. Consumers own the flex layout. */
  className?: string;
  /** Media query that gates the horizontal-scroll behavior; defaults to desktop + non-reduced motion. */
  mediaQuery?: string;
  /** Fallback for mobile / reduced motion: vertical stagger entry on the same children. */
  mobileEntrySelector?: string;
}

/**
 * Pins the nearest section and horizontally translates a child row as the
 * user scrolls. Below the media query (or under reduced-motion) it becomes
 * a regular vertical stack and runs a subtle stagger entry instead.
 *
 * The pin target is the nearest section element that contains this
 * component — this matches the existing Challenges layout.
 */
export default function HorizontalScrollContainer({
  children,
  stopMode = 'center',
  className = '',
  mediaQuery = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobileEntrySelector,
}: HorizontalScrollContainerProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const section = row.closest('section');
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(mediaQuery, () => {
      const lastCard = row.lastElementChild as HTMLElement | null;
      if (!lastCard) return;
      let amount: number;
      if (stopMode === 'center') {
        amount = lastCard.offsetLeft + lastCard.offsetWidth / 2 - window.innerWidth / 2;
      } else {
        amount = lastCard.offsetLeft + lastCard.offsetWidth - window.innerWidth;
      }
      if (amount <= 0) return;

      gsap.to(row, {
        x: -amount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${amount}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const sel = mobileEntrySelector ?? ':scope > *';
      const elements = row.querySelectorAll(sel);
      
      if (elements.length > 0) {
        gsap.fromTo(elements, 
          {
            opacity: 0,
            y: reduced ? 0 : 40,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { 
              trigger: section, 
              start: 'top 95%',
              onEnter: () => ScrollTrigger.refresh(),
            },
          }
        );
      }

      // Force a refresh after a small delay to handle hydration layout shifts
      const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => clearTimeout(timer);
    });

    return () => mm.revert();
  }, [mediaQuery, mobileEntrySelector, stopMode]);

  return (
    <div ref={rowRef} className={className}>
      {children}
    </div>
  );
}
