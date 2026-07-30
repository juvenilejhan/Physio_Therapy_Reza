import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import './NotFoundPage.css';

const SUGGESTIONS = [
  { to: '/courses', icon: 'fas fa-book-open', label: 'Programmes', desc: 'Browse our courses' },
  { to: '/faculty', icon: 'fas fa-user-graduate', label: 'Faculty', desc: 'Meet our experts' },
  { to: '/media', icon: 'fas fa-newspaper', label: 'Media & Events', desc: 'News and workshops' },
  { to: '/contact', icon: 'fas fa-envelope', label: 'Contact', desc: 'Ask us anything' },
];

export default function NotFoundPage() {
  usePageMeta('Page not found', 'The page you were looking for could not be found.');

  return (
    <div className="page-wrapper">
      <section className="not-found">
        <div className="container">
          <p className="not-found-code" aria-hidden="true">404</p>
          <h1 className="not-found-title">We couldn&apos;t find that page</h1>
          <p className="not-found-text">
            The link may be out of date, or the address might have a typo. Here&apos;s where
            most people are heading:
          </p>

          <nav className="not-found-links" aria-label="Suggested pages">
            {SUGGESTIONS.map((item) => (
              <Link key={item.to} to={item.to} className="not-found-link">
                <span className="not-found-link-icon" aria-hidden="true">
                  <i className={item.icon}></i>
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </span>
              </Link>
            ))}
          </nav>

          <Link to="/" className="btn btn-primary btn-lg">
            <i className="fas fa-arrow-left" aria-hidden="true"></i> Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
