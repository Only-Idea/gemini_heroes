'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ChallengeCardProps {
  title: string;
  subtitle: string;
  imageAlt: string;
  accentColor: 'teal' | 'amber' | 'coral';
  className?: string;
}

export default function ChallengeCard({
  title,
  subtitle,
  accentColor,
  className = '',
}: ChallengeCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const xTo = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    const glowXTo = gsap.quickTo(glowRef.current, 'xPercent', { duration: 0.5, ease: 'power2.out' });
    const glowYTo = gsap.quickTo(glowRef.current, 'yPercent', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      xTo(x * 15);
      yTo(-y * 15);
      glowXTo(x * 100);
      glowYTo(y * 100);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      glowXTo(0);
      glowYTo(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const colorClasses = {
    teal: 'from-teal/20 to-teal/5 border-teal/20',
    amber: 'from-amber/20 to-amber/5 border-amber/20',
    coral: 'from-coral/20 to-coral/5 border-coral/20',
  };

  return (
    <button
      ref={cardRef}
      className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br ${colorClasses[accentColor]} p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-2xl perspective-1000 text-left focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-background outline-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Dynamic Glow Effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, var(--color-${accentColor}) 0%, transparent 70%)`,
          mixBlendMode: 'soft-light',
          filter: 'blur(40px)',
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%',
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: 'translateZ(50px)' }}>
        <div>
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-${accentColor}`}>
            Challenge / 01
          </span>
          <h3 className="mt-4 font-display text-subhead font-bold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm font-medium text-muted">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 aspect-[4/3] rounded-2xl bg-foreground/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-foreground/[0.05] transition-colors overflow-hidden">
           {/* Visual placeholder */}
           <div className={`h-1 w-0 bg-${accentColor} transition-all duration-700 group-hover:w-full absolute bottom-0 left-0 shadow-[0_0_20px_var(--color-${accentColor})]`} />
           <div className="text-foreground/10 font-display text-4xl font-bold opacity-20 group-hover:scale-110 transition-transform duration-700">
             {title[0]}
           </div>
        </div>
      </div>
    </button>
  );
}
