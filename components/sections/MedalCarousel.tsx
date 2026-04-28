'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useStore } from '@/store/useStore';
import { useIsMobile } from '@/hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

/**
 * 2D MedalCarousel — replaces the R3F medal scene with a stunning
 * front/back flip using PNGs. Expects images at:
 *
 *   /public/images/medals/fuji-front.png
 *   /public/images/medals/fuji-back.png
 *   /public/images/medals/ronin-front.png
 *   /public/images/medals/ronin-back.png
 *   /public/images/medals/rail-front.png
 *   /public/images/medals/rail-back.png
 *
 * If a file is missing next/image renders nothing — the accent disc
 * underneath keeps the pedestal readable until the asset ships.
 */

type MedalId = 'fuji' | 'ronin' | 'rail';

const medals: { id: MedalId; color: string; glow: string }[] = [
  { id: 'fuji', color: '#375E65', glow: 'rgba(55, 94, 101, 0.35)' },
  { id: 'ronin', color: '#F2BE5E', glow: 'rgba(242, 190, 94, 0.4)' },
  { id: 'rail', color: '#EC7A5C', glow: 'rgba(236, 122, 92, 0.38)' },
];

const DUST = [
  { x: 18, y: 30, size: 3, dur: 9, delay: 0.0, o: 0.45 },
  { x: 74, y: 22, size: 2, dur: 13, delay: 2.0, o: 0.35 },
  { x: 28, y: 70, size: 4, dur: 10, delay: 1.0, o: 0.4 },
  { x: 82, y: 62, size: 3, dur: 11, delay: 3.0, o: 0.4 },
  { x: 50, y: 12, size: 2, dur: 12, delay: 0.5, o: 0.3 },
  { x: 60, y: 82, size: 3, dur: 14, delay: 4.0, o: 0.35 },
  { x: 12, y: 50, size: 2, dur: 8, delay: 2.5, o: 0.35 },
  { x: 90, y: 45, size: 3, dur: 13, delay: 1.5, o: 0.4 },
];

export default function MedalCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [variantIdx, setVariantIdx] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isReducedMotion = useStore((s) => s.isReducedMotion);
  const isMobile = useIsMobile();
  const t = useTranslations();

  const medal = medals[variantIdx];
  const titleKey = `challenges.${medal.id}.title` as const;

  // Auto-flip front ↔ back (pauses on hover).
  useEffect(() => {
    if (isReducedMotion || hovered) return;
    const id = window.setInterval(() => setShowBack((s) => !s), 4200);
    return () => clearInterval(id);
  }, [isReducedMotion, hovered]);

  // Auto-cycle across the 3 medals every ~10s.
  useEffect(() => {
    if (isReducedMotion) return;
    const id = window.setInterval(() => {
      setShowBack(false);
      setVariantIdx((i) => (i + 1) % medals.length);
    }, 10000);
    return () => clearInterval(id);
  }, [isReducedMotion]);

  // Drive the flip via GSAP so it composes cleanly with the tilt layer.
  useEffect(() => {
    const flip = flipRef.current;
    if (!flip) return;
    if (isReducedMotion) {
      gsap.set(flip, { rotationY: showBack ? 180 : 0 });
      return;
    }
    gsap.to(flip, {
      rotationY: showBack ? 180 : 0,
      duration: 1.1,
      ease: 'power3.inOut',
    });
  }, [showBack, isReducedMotion]);

  // Scroll-driven scale 0.85 → 1.0 through the section. Mobile skips the
  // scrub — too much per-frame work for a tiny visual delta.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || isReducedMotion || isMobile) return;
    const tween = gsap.fromTo(
      stage,
      { scale: 0.85 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top 85%',
          end: 'center center',
          scrub: 0.6,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isReducedMotion, isMobile]);

  // Mouse tilt + specular shine that tracks the cursor.
  useEffect(() => {
    const root = stageRef.current;
    const tilt = tiltRef.current;
    const shine = shineRef.current;
    if (!root || !tilt || isReducedMotion || isMobile) return;

    const xTo = gsap.quickTo(tilt, 'rotationY', { duration: 0.7, ease: 'power2.out' });
    const yTo = gsap.quickTo(tilt, 'rotationX', { duration: 0.7, ease: 'power2.out' });

    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      xTo(dx * 12);
      yTo(-dy * 12);
      if (shine) {
        const sx = ((e.clientX - rect.left) / rect.width) * 100;
        const sy = ((e.clientY - rect.top) / rect.height) * 100;
        shine.style.setProperty('--shine-x', `${sx}%`);
        shine.style.setProperty('--shine-y', `${sy}%`);
        shine.style.opacity = '1';
      }
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      if (shine) shine.style.opacity = '0';
    };

    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [isReducedMotion, isMobile]);

  return (
    <div
      ref={stageRef}
      className="relative flex h-full w-full items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: 1400 }}
    >
      {/* Radial accent glow (colour follows the active medal) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 46%, ${medal.glow} 0%, transparent 58%)`,
          filter: 'blur(24px)',
        }}
      />

      {/* Slow conic light beam behind the medal — desktop only.
          On mobile a permanently-spinning blurred conic gradient keeps
          the compositor busy and chips at scroll perf. */}
      {!isMobile && (
        <div
          aria-hidden="true"
          className="medal-conic pointer-events-none absolute inset-[10%] rounded-full opacity-40 transition-colors duration-1000"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${medal.color}55 32deg, transparent 70deg, transparent 200deg, ${medal.color}33 232deg, transparent 270deg)`,
            animation: 'medal-spin-slow 44s linear infinite',
            filter: 'blur(8px)',
          }}
        />
      )}

      {/* Dust particles drifting around — desktop only. */}
      {!isMobile && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {DUST.map((d, i) => (
            <span
              key={i}
              className="medal-dust absolute rounded-full"
              style={{
                width: d.size,
                height: d.size,
                left: `${d.x}%`,
                top: `${d.y}%`,
                background: medal.color,
                opacity: d.o,
                animation: `medal-drift ${d.dur}s ease-in-out ${d.delay}s infinite alternate`,
              }}
            />
          ))}
        </div>
      )}

      {/* Tilt + flip stack — click or keyboard-enter to flip manually */}
      <div
        ref={tiltRef}
        className="relative z-10 w-[72%] max-w-[480px] cursor-pointer rounded-full will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        role="button"
        tabIndex={0}
        aria-label={`${t(titleKey)} — ${showBack ? 'back' : 'front'}`}
        onClick={() => setShowBack((s) => !s)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowBack((s) => !s);
          }
        }}
      >
        <div
          ref={flipRef}
          className="relative aspect-square w-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Accent disc placeholder behind the medal (keeps pedestal readable if the PNG hasn't shipped yet) */}
          <div
            aria-hidden="true"
            className="absolute inset-[8%] rounded-full opacity-30 transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${medal.color}aa 0%, ${medal.color}22 55%, transparent 80%)`,
            }}
          />

          {/* Front face */}
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <Image
              src={`/images/medals/${medal.id}-front.png`}
              alt={`Heroes ${t(titleKey)} virtual challenge finisher medal — front face`}
              fill
              sizes="(max-width: 1024px) 72vw, 480px"
              className="select-none object-contain drop-shadow-[0_30px_45px_rgba(15,17,20,0.35)]"
              priority={variantIdx === 0}
            />
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <Image
              src={`/images/medals/${medal.id}-back.png`}
              alt={`Heroes ${t(titleKey)} virtual challenge finisher medal — back face`}
              fill
              sizes="(max-width: 1024px) 72vw, 480px"
              className="select-none object-contain drop-shadow-[0_30px_45px_rgba(15,17,20,0.35)]"
            />
          </div>

          {/* Specular shine that tracks the cursor */}
          <div
            ref={shineRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.45) 0%, transparent 32%)',
              mixBlendMode: 'overlay',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 55%, transparent 70%)',
              maskImage: 'radial-gradient(circle at 50% 50%, #000 55%, transparent 70%)',
            }}
          />
        </div>
      </div>

      {/* Ground shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] left-1/2 h-6 w-[58%] -translate-x-1/2 rounded-[50%] bg-foreground/35 blur-2xl"
      />

      {/* Medal title chip — soft swap on variant change */}
      <div
        key={medal.id}
        className="pointer-events-none absolute top-[6%] left-1/2 -translate-x-1/2"
      >
        <span
          className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.4em] animate-[hero-rise_0.7s_var(--ease-heroes)_both]"
          style={{ color: medal.color }}
        >
          {t(titleKey)}
        </span>
      </div>

      {/* Variant pagination dots */}
      <div className="absolute bottom-[5%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {medals.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setShowBack(false);
              setVariantIdx(i);
            }}
            aria-label={`Show ${t(`challenges.${m.id}.title` as const)}`}
            aria-pressed={i === variantIdx}
            className="h-1.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:ring-coral"
            style={{
              width: i === variantIdx ? 28 : 8,
              backgroundColor: i === variantIdx ? m.color : 'rgba(15,17,20,0.18)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
