'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hook to initialize the IntersectionObserver for elements with the .reveal class.
 * It adds the .visible class when 15% of the element is in the viewport.
 * 
 * This follows the "Heroes Scroll Reveal Pattern" defined in specs/09-animations.md.
 */
export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if the browser supports IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, we unobserve to keep performance high
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it hits 15% for smoother feel
      }
    );

    // Function to observe all current .reveal elements
    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal:not(.visible)');
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observation
    observeElements();

    // Setup a MutationObserver to catch elements added later via dynamic rendering
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);
}
