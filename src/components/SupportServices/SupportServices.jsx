import Reveal from '../Reveal/Reveal';
import { SUPPORT_SERVICES } from '../../data/support';
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
            <Reveal key={service.title} className="support-card" delay={index}>
              <div className="support-icon" aria-hidden="true">
                <i className={service.icon}></i>
              </div>
              <h3 className="support-title">{service.title}</h3>
              <p>{service.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
