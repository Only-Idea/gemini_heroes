'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';
import { useIsMobile } from '@/hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

interface TreeIllustrationProps {
  /** Element whose scroll progress grows the tree. */
  triggerRef?: React.RefObject<Element | null>;
  className?: string;
}

interface TreePlacement {
  /** SVG transform applied to the tree group */
  transform: string;
  /** Depth multiplier — back-row trees fade slightly */
  depth: number;
}

// Each tree is the original SVG shape, just translated/scaled. We keep the
// original geometry (trunk path, branch paths, leaf circles) untouched and
// arrange a small forest around the centerpiece.
const TREES: TreePlacement[] = [
  // Hero tree — identity transform, full opacity (the original tree).
  { transform: 'translate(0 0)', depth: 1.0 },
  // Mid-flank trees
  { transform: 'translate(-62 36) scale(0.6)', depth: 0.9 },
  { transform: 'translate(62 36) scale(0.6)', depth: 0.9 },
  // Front small trees
  { transform: 'translate(-30 60) scale(0.4)', depth: 0.8 },
  { transform: 'translate(30 60) scale(0.4)', depth: 0.8 },
  // Back row distant trees
  { transform: 'translate(-82 90) scale(0.32)', depth: 0.65 },
  { transform: 'translate(82 90) scale(0.32)', depth: 0.65 },
];

/**
 * Stylised SVG tree that grows (stroke + branches + canopy) as the trigger
 * element scrolls through the viewport. Teal palette by default so it
 * reads as a "planted tree" next to the trees-planted counter.
 */
export default function TreeIllustration({ triggerRef, className = '' }: TreeIllustrationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const trunksRef = useRef<SVGGElement>(null);
  const branchesRef = useRef<SVGGElement>(null);
  const leavesRef = useRef<SVGGElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);
  const isMobile = useIsMobile();

  useEffect(() => {
    const trunks = trunksRef.current;
    const branches = branchesRef.current;
    const leaves = leavesRef.current;
    if (!trunks || !branches || !leaves) return;

    const trunkPaths = Array.from(trunks.querySelectorAll<SVGPathElement>('path'));
    trunkPaths.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });

    const branchPaths = Array.from(branches.querySelectorAll<SVGPathElement>('path'));
    branchPaths.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    const leafCircles = Array.from(leaves.querySelectorAll<SVGCircleElement>('circle'));
    gsap.set(leafCircles, { scale: 0, transformOrigin: '50% 50%' });

    if (isReducedMotion) {
      trunkPaths.forEach((p) => gsap.set(p, { strokeDashoffset: 0 }));
      branchPaths.forEach((p) => gsap.set(p, { strokeDashoffset: 0 }));
      gsap.set(leafCircles, { scale: 1 });
      return;
    }

    // Mobile: one-shot timeline triggered on enter (no scrub) — same
    // visual result without per-scroll work.
    const tl = gsap.timeline({
      scrollTrigger: isMobile
        ? {
            trigger: triggerRef?.current ?? svgRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        : {
            trigger: triggerRef?.current ?? svgRef.current,
            start: 'top 80%',
            end: 'bottom 30%',
            scrub: 0.6,
          },
    });

    if (isMobile) {
      tl.to(
        trunkPaths,
        { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out', stagger: 0.05 },
        0
      );
      tl.to(
        branchPaths,
        { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: 0.04 },
        0.3
      );
      tl.to(
        leafCircles,
        {
          scale: 1,
          ease: 'back.out(1.6)',
          duration: 0.5,
          stagger: { amount: 0.5, from: 'center' },
        },
        0.6
      );
    } else {
      tl.to(trunkPaths, { strokeDashoffset: 0, ease: 'none', stagger: 0.04 }, 0);
      tl.to(branchPaths, { strokeDashoffset: 0, ease: 'none', stagger: 0.04 }, 0.3);
      tl.to(
        leafCircles,
        {
          scale: 1,
          ease: 'back.out(1.6)',
          duration: 0.6,
          stagger: { amount: 0.8, from: 'center' },
        },
        0.5
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isReducedMotion, triggerRef, isMobile]);

  // Original leaf cluster — kept exactly as before.
  const LEAVES = [
    { cx: 70, cy: 150, r: 9 },
    { cx: 130, cy: 150, r: 9 },
    { cx: 68, cy: 118, r: 10 },
    { cx: 132, cy: 118, r: 10 },
    { cx: 80, cy: 92, r: 8 },
    { cx: 120, cy: 92, r: 8 },
    { cx: 100, cy: 70, r: 14 },
    { cx: 86, cy: 76, r: 9 },
    { cx: 114, cy: 76, r: 9 },
    { cx: 100, cy: 55, r: 10 },
  ];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 260"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Ground line */}
      <line
        x1="6"
        y1="240"
        x2="194"
        y2="240"
        stroke="var(--color-teal)"
        strokeOpacity="0.2"
        strokeWidth="1"
        strokeDasharray="2 4"
      />

      {/* Trunks — one per tree, original path replicated under each transform */}
      <g ref={trunksRef}>
        {TREES.map((tree, i) => (
          <g key={`trunk-${i}`} transform={tree.transform} style={{ transformOrigin: '100px 240px' }}>
            <path
              d="M100 240 C 100 200, 100 160, 100 60"
              stroke="var(--color-teal)"
              strokeOpacity={tree.depth}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ))}
      </g>

      {/* Branches — original 6-path cluster replicated per tree */}
      <g ref={branchesRef}>
        {TREES.map((tree, i) => (
          <g
            key={`branches-${i}`}
            transform={tree.transform}
            style={{ transformOrigin: '100px 240px' }}
            stroke="var(--color-teal)"
            strokeOpacity={0.75 * tree.depth}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          >
            <path d="M100 180 L 70 150" />
            <path d="M100 180 L 130 150" />
            <path d="M100 140 L 68 118" />
            <path d="M100 140 L 132 118" />
            <path d="M100 105 L 80 92" />
            <path d="M100 105 L 120 92" />
          </g>
        ))}
      </g>

      {/* Leaves — original 10-circle canopy replicated per tree */}
      <g ref={leavesRef}>
        {TREES.map((tree, i) => (
          <g key={`leaves-${i}`} transform={tree.transform} style={{ transformOrigin: '100px 240px' }}>
            {LEAVES.map((l, j) => (
              <circle
                key={j}
                cx={l.cx}
                cy={l.cy}
                r={l.r}
                fill="var(--color-teal)"
                fillOpacity={(0.2 + ((j % 3) * 0.08)) * tree.depth}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
