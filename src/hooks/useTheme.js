import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bahir-theme';

/**
 * Reads the theme that the inline bootstrap script in index.html already
 * resolved and applied to <html> before first paint. Reading it back (rather
 * than recomputing) keeps React's state and the DOM in agreement and avoids
 * a second, conflicting decision.
 */
function getInitialTheme() {
  const applied = document.documentElement.getAttribute('data-theme');
  if (applied === 'light' || applied === 'dark') return applied;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
  } catch {
    /* storage unavailable (private mode / blocked cookies) — fall through */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* persisting is best-effort; the session still themes correctly */
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
