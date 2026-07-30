import { Link } from 'react-router-dom';
import { legalPages } from '../data/legal';
import usePageMeta from '../hooks/usePageMeta';
import './LegalPage.css';

/**
 * Shared layout for the three legal routes. Content comes from data/legal.js,
 * so adding a page is a data change rather than a new component.
 *
 * @param {'privacy'|'terms'|'cookies'} slug
 */
export default function LegalPage({ slug }) {
  const page = legalPages[slug];
  usePageMeta(page.title, page.description);

  return (
    <div className="page-wrapper">
      <article className="legal">
        <div className="container legal-inner">
          <header className="legal-header">
            <h1 className="legal-title">{page.title}</h1>
            <p className="legal-updated">Last updated {page.lastUpdated}</p>
          </header>

          <aside className="legal-notice" role="note">
            <i className="fas fa-circle-info" aria-hidden="true"></i>
            <p>
              This is placeholder copy for a demonstration build. It has not been reviewed by a
              lawyer and must be replaced with text prepared for BAHIR&apos;s actual data
              practices before the site handles real personal data.
            </p>
          </aside>

          {page.sections.map((section) => (
            <section className="legal-section" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          <footer className="legal-footer">
            <p>Questions about this policy?</p>
            <Link to="/contact" className="btn btn-outline">Contact us</Link>
          </footer>
        </div>
      </article>
    </div>
  );
}
