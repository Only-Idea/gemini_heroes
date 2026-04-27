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
      const children = Array.from(row.children) as HTMLElement[];
      const firstCard = children[0];
      const lastCard = children[children.length - 1];
      
      if (!firstCard || !lastCard) return;

      // Calculate initial position to center the FIRST card
      const initialX = window.innerWidth / 2 - (firstCard.offsetLeft + firstCard.offsetWidth / 2);
      
      // Calculate final position to center the LAST card
      const finalX = window.innerWidth / 2 - (lastCard.offsetLeft + lastCard.offsetWidth / 2);
      
      const totalAmount = initialX - finalX;
      if (totalAmount <= 0) return;

      // Set initial state
      gsap.set(row, { x: initialX });

      // Generate snapping points (one for each card center)
      const snapPoints = children.map((child) => {
        const cardCenterX = child.offsetLeft + child.offsetWidth / 2;
        const targetX = window.innerWidth / 2 - cardCenterX;
        // Map targetX to a 0-1 progress value based on the total animation range
        return (initialX - targetX) / totalAmount;
      });

      gsap.to(row, {
        x: finalX,
        ease: 'none',
        scrollTrigger: {
          trigger: row,
          start: 'center center',
          endTrigger: section,
          end: `+=${totalAmount * 2.0}`,
          pin: section,
          scrub: 1,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: 'power2.inOut',
          },
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // If the consumer hasn't forced flex-col (vertical stack), 
      // we just run the vertical stagger entry. 
      // The consumer (Challenges.tsx) will now provide horizontal classes for mobile.
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
