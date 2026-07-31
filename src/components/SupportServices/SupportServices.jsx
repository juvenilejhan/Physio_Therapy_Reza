import { Link } from 'react-router-dom';
import Reveal from '../Reveal/Reveal';
import { SUPPORT_SERVICES } from '../../data/support';
import { gradientCycle } from '../../data/gradients';
import './SupportServices.css';

export default function SupportServices() {
  return (
    <section id="support-services" className="support-services">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">Comprehensive Academic Support</h2>
          <p className="section-subtitle">
            Empowering researchers and professionals with expert guidance at every stage of their academic journey.
          </p>
        </Reveal>

        <div className="support-grid">
          {SUPPORT_SERVICES.map((service, index) => (
            <Reveal as="article" key={service.id} className="support-card" delay={index % 4}>
              <div
                className="support-icon"
                style={{ background: gradientCycle[index % gradientCycle.length] }}
                aria-hidden="true"
              >
                <i className={service.icon}></i>
              </div>
              <h3 className="support-title">{service.title}</h3>
              <p className="support-body">{service.body}</p>
              <Link
                to={`/contact?subject=support&service=${service.id}`}
                className="support-cta"
                aria-label={`Enquire about ${service.title}`}
              >
                Enquire Now <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
