'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * A client-side component that initializes the global scroll reveal system.
 * It observes all elements with the .reveal class and adds .visible when in viewport.
 */
export default function ScrollRevealMount() {
  useScrollReveal();
  return null;
}
