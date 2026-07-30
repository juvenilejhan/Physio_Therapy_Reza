import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for animated number counter.
 * Animates from 0 to target using requestAnimationFrame when element is in viewport.
 * @param {number} target - The target number to count to
 * @param {number} duration - Animation duration in ms (default 2000)
 * @returns {{ ref: React.RefObject, count: number }}
 */
export default function useAnimatedCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const increment = Math.min((progress / duration) * target, target);
      setCount(Math.floor(increment));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Reduced motion: show the final value immediately rather than tweening.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animate, target]);

  return { ref, count };
}
