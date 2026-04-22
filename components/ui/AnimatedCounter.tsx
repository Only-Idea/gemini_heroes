'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  delay?: number;
  locale?: string;
}

export default function AnimatedCounter({ 
  value, 
  duration = 2, 
  delay = 0,
  locale = 'ja-JP' 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // Memoize number formatting for performance
  const formatter = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  // Extract number and suffix (e.g., "32+" -> 32, "+")
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value;
  const suffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : '';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: numericValue,
        duration: duration,
        delay: delay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(obj.val));
        },
      });

      // Entry glow/blur effect
      gsap.from(containerRef.current, {
        filter: 'blur(10px)',
        opacity: 0,
        duration: 1,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });
    });

    return () => ctx.revert();
  }, [numericValue, duration, delay]);

  return (
    <span ref={containerRef} className="inline-block">
      {formatter.format(displayValue)}
      {suffix}
    </span>
  );
}
