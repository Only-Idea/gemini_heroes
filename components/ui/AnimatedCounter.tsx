'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({ value, duration = 2, delay = 0 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // Extract number and suffix (e.g., "32+" -> 32, "+")
  const numericValue = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: numericValue,
        duration: duration,
        delay: delay,
        ease: 'power2.out',
        snap: { val: 1 },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setDisplayValue(obj.val);
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
      {displayValue}
      {suffix}
    </span>
  );
}
