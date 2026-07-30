import { Link } from 'react-router-dom';
import { faculty } from '../../data/faculty';
import Avatar from '../Avatar/Avatar';
import useScrollReveal from '../../hooks/useScrollReveal';
import Reveal from '../Reveal/Reveal';
import './Faculty.css';

function FacultyCard({ member, delayClass }) {
  const revealRef = useScrollReveal();

  return (
    <article className={`faculty-card reveal ${delayClass}`} ref={revealRef}>
      <Avatar
        className="faculty-avatar"
        image={member.image}
        initials={member.initials}
        gradient={member.gradient}
        size={128}
      />
      <h3 className="faculty-name">{member.name}</h3>
      <div className="faculty-role">{member.role}</div>
      <p className="faculty-bio">{member.bio}</p>
      {member.expertise?.length > 0 && (
        <ul className="faculty-tags">
          {member.expertise.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Faculty() {
  return (
    <section id="faculty" className="faculty">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Our Experts</span>
          <h1 className="section-title">Learn from the Best</h1>
          <p className="section-subtitle">
            Our faculty comprises internationally recognized clinicians, researchers, and educators
            dedicated to your professional growth.
          </p>
        </Reveal>

        <div className="faculty-grid">
          {faculty.map((member, index) => (
            <FacultyCard
              key={member.id}
              member={member}
              delayClass={index > 0 && index < 4 ? `delay-${index}` : ''}
            />
          ))}
        </div>

        {/* The per-member social icons that used to sit on each card linked
            nowhere — no profiles exist. One real route out of the section
            replaces twelve controls that did nothing. */}
        <div className="faculty-cta">
          <p>Interested in working with our faculty, or joining them?</p>
          <Link to="/contact" className="btn btn-outline">
            Contact the academic office <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
