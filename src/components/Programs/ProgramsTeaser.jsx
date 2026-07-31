import { Link } from 'react-router-dom';
import { programTiers, allPrograms } from '../../data/programs';
import Reveal from '../Reveal/Reveal';
import './ProgramsTeaser.css';

/**
 * Condensed Home-page summary: one tile per pathway, not individual
 * programmes. Picking a handful of the 17 real programmes to "feature" would
 * be an editorial call with no factual basis — nothing marks any one of them
 * as more prominent than another. The tier structure itself is real, so that's
 * what's summarised here.
 */
export default function ProgramsTeaser() {
  return (
    <section id="programs-teaser" className="programs-teaser">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Our Programmes</span>
          <h2 className="section-title">Academic Pathways</h2>
          <p className="section-subtitle">
            {allPrograms.length} programmes across four qualification-gated pathways —
            from entry-level certificates to advanced research fellowships.
          </p>
        </Reveal>

        <ul className="pathway-grid">
          {programTiers.map((tier, index) => (
            <Reveal key={tier.key} as="li" className="pathway-tile" delay={index}>
              <Link to={`/courses?tier=${tier.key}`} className="pathway-tile-link">
                <div className="pathway-tile-icon" style={{ background: tier.gradient }} aria-hidden="true">
                  <i className={tier.icon}></i>
                </div>
                <h3 className="pathway-tile-name">{tier.name}</h3>
                <dl className="pathway-tile-meta">
                  <div>
                    <dt><i className="far fa-clock" aria-hidden="true"></i> Duration</dt>
                    <dd>{tier.duration}</dd>
                  </div>
                  <div>
                    <dt><i className="fas fa-graduation-cap" aria-hidden="true"></i> Requires</dt>
                    <dd>{tier.qualification}</dd>
                  </div>
                </dl>
                <span className="pathway-tile-count">{tier.programs.length} Programmes</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="programs-teaser-cta">
          <Link to="/courses" className="btn btn-primary btn-lg">
            <span>View All {allPrograms.length} Programmes</span>
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
