import { useEffect } from 'react';

const SITE_NAME = 'BAHIR';
const BASE_TITLE = 'BAHIR - Bangladesh Academy of Health Innovation & Research';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Sets the document title and description for a route.
 *
 * Every route previously shared the single <title> from index.html, which made
 * browser history, bookmarks and search results indistinguishable between
 * pages. Done imperatively rather than with React 19's hoisted <title>, because
 * the meta tags in index.html need *updating* — rendering new ones would leave
 * the originals in place and produce duplicates.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = title ? `${title} | ${SITE_NAME}` : BASE_TITLE;

    document.title = fullTitle;
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, description]);
}
