import { gradients } from './gradients';

/*
 * Optional image fields
 * ---------------------
 * Add `image` to any entry to show a photograph instead of the gradient+icon
 * fallback. The value is a BASE NAME under assets-src/, with no extension and
 * no size suffix — the component builds the srcset from it:
 *
 *   image: 'news/example',        // assets-src/news/example.jpg
 *   imageAlt: '',               // optional; '' (decorative) is the default
 *
 * Then run:  python scripts/optimise-images.py
 *
 * Leaving `image` out is fine and fully supported — the gradient treatment is a
 * finished design, not a placeholder.
 */

export const news = [
  {
    id: 1,
    title: 'BAHIR Researchers Publish Groundbreaking Study on Spinal Rehabilitation',
    excerpt: "Our research team's latest findings on innovative spinal rehabilitation techniques have been published in the International Journal of Physiotherapy...",
    date: 'July 20, 2026',
    datetime: '2026-07-20',
    category: 'Research',
    icon: 'fas fa-newspaper',
    gradient: gradients.laurel,
  },
  {
    id: 2,
    title: 'BAHIR Partners with World Physiotherapy for Global Certification Program',
    excerpt: 'We are thrilled to announce a new partnership that will bring internationally accredited certification programs to our students...',
    date: 'July 12, 2026',
    datetime: '2026-07-12',
    category: 'Partnership',
    icon: 'fas fa-handshake',
    gradient: gradients.maroon,
  },
  {
    id: 3,
    title: 'BAHIR Wins Best Health Education Innovation Award 2026',
    excerpt: 'We are honored to receive the prestigious Best Health Education Innovation Award at the South Asian Medical Education Conference...',
    date: 'June 28, 2026',
    datetime: '2026-06-28',
    category: 'Achievement',
    icon: 'fas fa-trophy',
    gradient: gradients.forest,
  },
];
