'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const activities = [
  'Walking', 'Running', 'Cycling', 'Swimming', 'Wheelchair', 
  'Hiking', 'Rowing', 'Elliptical', 'Stair Stepper', 'Crossfit',
  'Yoga', 'Pilates'
];

export default function ActivityRibbon() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Scroll animation for seamless loop
      gsap.to(scrollContainer, {
        x: `-50%`,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="relative w-full bg-white py-12 lg:py-20 border-y border-foreground/5 overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex whitespace-nowrap gap-12 lg:gap-24 w-max px-6 lg:px-12"
      >
        {/* Double the items for seamless loop */}
        {[...activities, ...activities].map((activity, index) => (
          <div 
            key={`${activity}-${index}`} 
            className="flex items-center gap-4 group cursor-default"
          >
            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center transition-all duration-300 group-hover:bg-teal/5 group-hover:border-teal/20 group-hover:rotate-12">
               <span className="font-display font-black text-foreground/10 group-hover:text-teal/40 transition-colors">
                 {activity[0]}
               </span>
            </div>
            <span className="font-mono text-label font-bold tracking-[0.2em] text-stone uppercase transition-colors group-hover:text-foreground">
              {activity}
            </span>
          </div>
        ))}
      </div>
      
      {/* Side gradients for soft edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
}
