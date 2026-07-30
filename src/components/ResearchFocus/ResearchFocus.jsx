import Reveal from '../Reveal/Reveal';
import './ResearchFocus.css';

const PILLARS = [
  {
    title: 'Neuroplasticity in Stroke Rehabilitation',
    body: 'Exploring novel brain stimulation techniques coupled with task-specific training.',
  },
  {
    title: 'Sports Biomechanics',
    body: 'Injury prevention protocols for elite athletes using 3D motion capture analysis.',
  },
  {
    title: 'Geriatric Mobility',
    body: 'Developing accessible home-based exercise programs to prevent falls in the elderly population.',
  },
  {
    title: 'Cardiopulmonary Tele-rehabilitation',
    body: 'Efficacy of remote monitoring and exercise prescription for post-COVID recovery.',
  },
];

export default function ResearchFocus() {
  return (
    <section className="research-focus">
      <div className="container">
        <Reveal className="section-header">
          <h2 className="section-title">Research Excellence</h2>
          <p className="section-subtitle">
            Our faculty members are actively engaged in groundbreaking research
          </p>
        </Reveal>

        <Reveal className="research-panel">
          <h3 className="research-panel-title">Current Research Pillars</h3>
          <ul className="research-list">
            {PILLARS.map((pillar) => (
              <li key={pillar.title}>
                <i className="fas fa-check-circle" aria-hidden="true"></i>
                <div>
                  <strong>{pillar.title}:</strong> {pillar.body}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
