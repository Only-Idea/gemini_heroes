'use client';

import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';

type AnimationFn = () => void;

export function useReducedMotionAnimation(
  scope: RefObject<HTMLElement | null>,
  animations: AnimationFn,
  reducedAnimations: AnimationFn,
) {
  const animsRef = useRef(animations);
  const reducedRef = useRef(reducedAnimations);

  useEffect(() => {
    animsRef.current = animations;
    reducedRef.current = reducedAnimations;
  }, [animations, reducedAnimations]);

  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => animsRef.current());
      mm.add('(prefers-reduced-motion: reduce)', () => reducedRef.current());
    }, scope);
    return () => ctx.revert();
  }, [scope]);
}
