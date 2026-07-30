import { Link } from 'react-router-dom';
import { leadFaculty, otherFaculty } from '../../data/faculty';
import Avatar from '../Avatar/Avatar';
import FeaturedFaculty from './FeaturedFaculty';
import useScrollReveal from '../../hooks/useScrollReveal';
import Reveal from '../Reveal/Reveal';
import './Faculty.css';

function FacultyCard({ member, delayClass }) {
  const revealRef = useScrollReveal();

  // An open position is not a person: no name, no biography, no initials.
  if (member.isOpenPosition) {
    return (
      <article
        className={`faculty-card is-vacancy reveal ${delayClass}`}
        ref={revealRef}
      >
        <Avatar
          className="faculty-avatar is-vacant"
          icon={member.icon}
          gradient={member.gradient}
          size={128}
        />
        <h3 className="faculty-role-heading">{member.role}</h3>
        <p className="faculty-status">{member.status}</p>
        <Link to="/contact?subject=other" className="faculty-vacancy-link">
          Enquire about this role <i className="fas fa-arrow-right" aria-hidden="true"></i>
        </Link>
      </article>
    );
  }

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
      {member.bio && <p className="faculty-bio">{member.bio}</p>}
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
  const vacancies = otherFaculty.filter((m) => m.isOpenPosition).length;

  return (
    <section id="faculty" className="faculty">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Our Experts</span>
          <h1 className="section-title">Faculty &amp; Leadership</h1>
          <p className="section-subtitle">
            BAHIR is led by its founder, with further academic appointments in progress
            as the academy grows.
          </p>
        </Reveal>

        <FeaturedFaculty member={leadFaculty} />

        {otherFaculty.length > 0 && (
          <>
            <Reveal className="faculty-subhead">
              <h2>{vacancies === otherFaculty.length ? 'Open Positions' : 'Faculty'}</h2>
              {vacancies > 0 && (
                <p>
                  We are currently recruiting for the following posts. Qualified
                  clinicians and researchers are encouraged to get in touch.
                </p>
              )}
            </Reveal>

            <div className="faculty-grid">
              {otherFaculty.map((member, index) => (
                <FacultyCard
                  key={member.id}
                  member={member}
                  delayClass={index > 0 && index < 4 ? `delay-${index}` : ''}
                />
              ))}
            </div>
          </>
        )}

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
