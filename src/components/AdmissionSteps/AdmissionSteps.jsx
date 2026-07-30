import Reveal from '../Reveal/Reveal';
import './AdmissionSteps.css';

const STEPS = [
  {
    title: 'Application',
    body: 'Submit your online application along with required academic transcripts and credentials.',
  },
  {
    title: 'Assessment',
    body: 'Attend the entrance examination and subsequent personal interview with the faculty board.',
  },
  {
    title: 'Enrollment',
    body: 'Receive your acceptance letter and complete the enrollment procedures to begin your journey.',
  },
];

export default function AdmissionSteps() {
  return (
    <section className="admission-process">
      <div className="container">
        <Reveal className="section-header">
          <h2 className="section-title">Admission Process</h2>
          <p className="section-subtitle">How to join our prestigious programs</p>
        </Reveal>

        <ol className="admission-grid">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} className="admission-step" delay={index}>
              <span className="admission-step-number" aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
