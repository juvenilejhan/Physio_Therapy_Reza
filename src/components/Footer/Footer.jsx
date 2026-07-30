import { Link } from 'react-router-dom';
import './Footer.css';

const QUICK_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/courses', label: 'Our Programs' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/media', label: 'Media & Events' },
  { to: '/contact', label: 'Contact' },
  { to: '/contact', label: 'Admissions' },
];

/* Deep-linked to the matching course filter rather than six links to the same
   undifferentiated /courses page. */
const PROGRAMS = [
  { label: 'Musculoskeletal PT', to: '/courses?category=musculoskeletal' },
  { label: 'Neurological Rehab', to: '/courses?category=neuro' },
  { label: 'Sports Medicine', to: '/courses?category=sports' },
  { label: 'Cardiopulmonary PT', to: '/courses?category=cardio' },
  { label: 'Pediatric PT', to: '/courses?category=neuro' },
  { label: 'Research Programs', to: '/faculty' },
];

const LEGAL_LINKS = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/cookies', label: 'Cookie Policy' },
];

const CONTACT = [
  { icon: 'fas fa-map-marker-alt', text: 'Dhaka, Bangladesh' },
  { icon: 'fas fa-envelope', text: 'info@bahir.edu.bd' },
  { icon: 'fas fa-phone-alt', text: '+880 1XXX-XXXXXX' },
  { icon: 'fas fa-clock', text: 'Sun - Thu: 9:00 AM - 5:00 PM' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                className="footer-logo-mark"
                src="/assets/logo-72.png"
                srcSet="/assets/logo-72.png 1x, /assets/logo-192.png 2x"
                alt=""
                width="72"
                height="72"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <div>
                <p className="footer-logo-name">BAHIR</p>
                <p className="footer-logo-full">
                  Bangladesh Academy of Health Innovation &amp; Research
                </p>
              </div>
            </div>
            <p className="footer-description">
              Advancing healthcare globally through excellence in physiotherapy education,
              innovative research, and clinical practice.
            </p>
            {/* Social buttons removed: no BAHIR profiles exist to link to, and
                a control that does nothing is worse than no control. Restore as
                <a href> once the accounts are live. */}
            <p className="footer-cta-line">
              <Link to="/contact" className="btn btn-outline btn-sm">
                Get in touch <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </p>
          </div>

          <nav className="footer-links" aria-labelledby="footer-quick-links">
            <h2 className="footer-title" id="footer-quick-links">Quick Links</h2>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="footer-links" aria-labelledby="footer-programs">
            <h2 className="footer-title" id="footer-programs">Programs</h2>
            <ul>
              {PROGRAMS.map((program) => (
                <li key={program.label}><Link to={program.to}>{program.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="footer-contact">
            <h2 className="footer-title">Contact Us</h2>
            <ul>
              {CONTACT.map((item) => (
                <li className="contact-item" key={item.text}>
                  <i className={`${item.icon} contact-icon`} aria-hidden="true"></i>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} BAHIR — Bangladesh Academy of Health Innovation &amp; Research. All rights reserved.</p>
          <ul className="footer-bottom-links">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
