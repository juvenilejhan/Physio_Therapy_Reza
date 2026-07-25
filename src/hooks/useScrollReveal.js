import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll reveal animations using IntersectionObserver.
 * Adds 'active' class to the element when it enters the viewport.
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} ref to attach to the element
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return ref;
}
