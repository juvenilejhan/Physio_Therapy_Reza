import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on route change.
 *
 * `behavior: 'instant'` is deliberate: `html { scroll-behavior: smooth }` is
 * set globally for in-page anchors, and without this override every navigation
 * would animate a full-page scroll instead of landing at the top immediately.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
