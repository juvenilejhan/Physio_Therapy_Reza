import { faculty } from '../../data/faculty';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Faculty.css';

function FacultyCard({ member, delayClass }) {
  const revealRef = useScrollReveal();
  
  return (
    <div className={`faculty-card reveal ${delayClass}`} ref={revealRef}>
      <div className="faculty-avatar" style={{ background: member.gradient }}>
        {member.initials}
      </div>
      <h3 className="faculty-name">{member.name}</h3>
      <div className="faculty-role">{member.role}</div>
      <p className="faculty-bio">{member.bio}</p>
      <div className="faculty-social">
        {member.socials.map((social, index) => (
          <a key={index} href={social.href} title={social.label}>
            <i className={social.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Faculty() {
  const headerRef = useScrollReveal();

  return (
    <section id="faculty" className="faculty">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Our Experts</span>
          <h2 className="section-title">Learn from the Best</h2>
          <p className="section-subtitle">Our faculty comprises internationally recognized clinicians, researchers, and educators dedicated to your professional growth.</p>
        </div>
        
        <div className="faculty-grid">
          {faculty.map((member, index) => {
            const delayClass = index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : index === 3 ? 'delay-3' : '';
            return <FacultyCard key={member.id} member={member} delayClass={delayClass} />;
          })}
        </div>
      </div>
    </section>
  );
}
