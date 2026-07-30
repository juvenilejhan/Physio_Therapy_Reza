import Reveal from '../Reveal/Reveal';
import './VisionMission.css';

const PILLARS = [
  {
    icon: 'fas fa-eye',
    title: 'Vision',
    body: 'To be the premier institution for physiotherapy and rehabilitation sciences in South Asia, driving innovation in research, excellence in clinical practice, and leadership in healthcare education.',
  },
  {
    icon: 'fas fa-bullseye',
    title: 'Mission',
    body: 'To produce competent, compassionate, and ethical physiotherapy professionals equipped with evidence-based knowledge and skills to enhance the quality of life of individuals and communities.',
  },
];

export default function VisionMission() {
  return (
    <section className="vision-mission">
      <div className="container">
        <Reveal className="section-header">
          <h2 className="section-title">Our Vision &amp; Mission</h2>
          <p className="section-subtitle">Dedicated to transforming healthcare across Bangladesh</p>
        </Reveal>

        <div className="vision-mission-grid">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} className="vision-mission-card" delay={index}>
              <h3>
                <i className={pillar.icon} aria-hidden="true"></i> {pillar.title}
              </h3>
              <p>{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
