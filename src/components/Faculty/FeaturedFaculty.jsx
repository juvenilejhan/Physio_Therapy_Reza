import { Link } from 'react-router-dom';
import { responsive } from '../../utils/imageSrc';
import Reveal from '../Reveal/Reveal';
import './FeaturedFaculty.css';

/**
 * Lead profile for the institution's principal.
 *
 * Renders only what the data supplies. Every field below is conditional — an
 * absent `appointment`, `formerAppointment` or `credentials` list is omitted
 * rather than substituted, because this component describes a real, named
 * individual and inventing detail about them is not a styling decision.
 *
 * Square portrait rather than the circular Avatar: at this size a circle clips
 * a formal headshot awkwardly, and a principal warrants a larger treatment than
 * the grid cards below.
 */
export default function FeaturedFaculty({ member }) {
  if (!member) return null;

  const portrait = responsive(member.image);

  return (
    <Reveal className="featured-faculty">
      <div className="featured-faculty-media">
        {portrait ? (
          <img
            className="featured-faculty-photo"
            src={portrait.src}
            srcSet={portrait.srcSet}
            sizes="(max-width: 768px) 180px, 220px"
            width={portrait.width}
            height={portrait.height}
            /* Empty alt: his name is the adjacent heading, so describing the
               portrait would just repeat it. */
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="featured-faculty-fallback"
            style={{ background: member.gradient }}
            aria-hidden="true"
          >
            {member.initials}
          </div>
        )}
      </div>

      <div className="featured-faculty-body">
        <span className="featured-faculty-tag">{member.role}</span>
        <h3 className="featured-faculty-name">{member.name}</h3>

        {member.appointment && (
          <p className="featured-faculty-appointment">{member.appointment}</p>
        )}
        {member.formerAppointment && (
          <p className="featured-faculty-former">{member.formerAppointment}</p>
        )}

        {member.credentials?.length > 0 && (
          <>
            <h4 className="featured-faculty-subhead" id="lead-credentials">
              Qualifications
            </h4>
            <ul className="featured-faculty-credentials" aria-labelledby="lead-credentials">
              {member.credentials.map((c) => (
                <li key={c}>
                  <i className="fas fa-certificate" aria-hidden="true"></i>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {member.bio && <p className="featured-faculty-bio">{member.bio}</p>}

        <Link to="/contact?subject=programs" className="btn btn-outline btn-sm">
          Enquire about programmes <i className="fas fa-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
    </Reveal>
  );
}
