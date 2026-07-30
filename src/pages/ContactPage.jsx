import { useSearchParams } from 'react-router-dom';
import ContactForm from '../components/Contact/ContactForm';
import { contactDetails, departments, faqs } from '../data/contact';
import Reveal from '../components/Reveal/Reveal';
import usePageMeta from '../hooks/usePageMeta';
import '../components/Contact/Contact.css';

export default function ContactPage() {
  const [searchParams] = useSearchParams();

  usePageMeta(
    'Contact BAHIR — Admissions & Enquiries',
    'Get in touch with the Bangladesh Academy of Health Innovation & Research. Admissions, programme information, research collaboration and international applications.'
  );

  return (
    <div className="page-wrapper">
      <section className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Get in touch</span>
            <h1 className="section-title">Contact BAHIR</h1>
            <p className="section-subtitle">
              Questions about a programme, an application, or a research partnership?
              We&apos;d like to hear from you.
            </p>
          </div>

          <div className="contact-grid">
            {/* Remounts when the deep-link params change so the prefilled
                subject and message refresh rather than keeping stale state. */}
            <ContactForm
              key={`${searchParams.get('course') ?? ''}-${searchParams.get('subject') ?? ''}`}
            />

            <aside className="contact-aside">
              <div className="contact-card">
                <h2 className="contact-card-title">Contact details</h2>
                <ul className="contact-detail-list">
                  {contactDetails.map((item) => (
                    <li key={item.label}>
                      <span className="contact-detail-icon" aria-hidden="true">
                        <i className={item.icon}></i>
                      </span>
                      <div>
                        <strong>{item.label}</strong>
                        {item.href ? (
                          <a href={item.href}>{item.lines[0]}</a>
                        ) : (
                          item.lines.map((line) => <span key={line}>{line}</span>)
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-card">
                <h2 className="contact-card-title">Departments</h2>
                <ul className="contact-dept-list">
                  {departments.map((dept) => (
                    <li key={dept.email}>
                      <span>{dept.name}</span>
                      <a href={`mailto:${dept.email}`}>{dept.email}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-map-section">
        <div className="container">
          {/* Placeholder rather than an embedded map: a third-party iframe would
              set cookies and load external scripts, which needs a consent
              decision this project hasn't made. Swap in when that's settled. */}
          <div className="contact-map" role="img" aria-label="Map of the BAHIR campus in Dhanmondi, Dhaka">
            <i className="fas fa-map-location-dot" aria-hidden="true"></i>
            <p><strong>BAHIR Academy Building</strong></p>
            <p>Dhanmondi, Dhaka 1205, Bangladesh</p>
            <a
              className="btn btn-outline btn-sm"
              href="https://www.openstreetmap.org/search?query=Dhanmondi%2C%20Dhaka"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in maps <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="contact-faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently asked questions</h2>
            <p className="section-subtitle">Quick answers to what people ask us most.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              /* Native <details>: keyboard-operable and screen-reader-friendly
                 with no JavaScript and no ARIA of our own. */
              <Reveal as="details" key={faq.q} className="faq-item" delay={index % 4}>
                <summary className="faq-question">
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down" aria-hidden="true"></i>
                </summary>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
