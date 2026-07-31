import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { programTiers, programFilters, qualifications } from '../../data/programs';
import Reveal from '../Reveal/Reveal';
import './Programs.css';

function ProgramCard({ program, tier, delay }) {
  return (
    <Reveal as="article" className="program-card" delay={delay}>
      <div className="program-icon" style={{ background: tier.gradient }} aria-hidden="true">
        <i className={program.icon}></i>
      </div>
      <h4 className="program-name">{program.name}</h4>
      <Link
        to={`/contact?program=${program.id}&subject=admissions`}
        className="program-apply"
        aria-label={`Apply for ${program.name}`}
      >
        Apply Now <i className="fas fa-arrow-right" aria-hidden="true"></i>
      </Link>
    </Reveal>
  );
}

function TierSection({ tier, isEligible }) {
  return (
    <div className="program-tier">
      <Reveal className="program-tier-header" style={{ '--tier-accent': tier.gradient }}>
        {isEligible && (
          <span className="tier-eligible-badge">
            <i className="fas fa-check" aria-hidden="true"></i> Eligible
          </span>
        )}
        <div className="program-tier-icon" style={{ background: tier.gradient }} aria-hidden="true">
          <i className={tier.icon}></i>
        </div>
        <div>
          <h3 className="program-tier-name">{tier.name}</h3>
          <div className="program-tier-meta">
            <span><i className="far fa-clock" aria-hidden="true"></i> {tier.duration}</span>
            <span><i className="fas fa-graduation-cap" aria-hidden="true"></i> Requires {tier.qualification}</span>
            <span className="program-tier-count">{tier.programs.length} Programmes</span>
          </div>
        </div>
      </Reveal>

      <div className="programs-grid">
        {tier.programs.map((program, index) => (
          <ProgramCard key={program.id} program={program} tier={tier} delay={index % 4} />
        ))}
      </div>
    </div>
  );
}

export default function Programs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeQualification, setActiveQualification] = useState(null);
  // selectQualification below changes searchParams itself (to clear ?tier=),
  // which would otherwise re-trigger the effect and immediately null out the
  // qualification it just set. This flag tells that one run to skip the reset.
  const skipQualificationReset = useRef(false);

  // Footer links deep-link here as /courses?tier=<key>.
  useEffect(() => {
    const fromUrl = searchParams.get('tier');
    const isValid = programFilters.some((f) => f.key === fromUrl);
    setActiveFilter(isValid ? fromUrl : 'all');
    if (skipQualificationReset.current) {
      skipQualificationReset.current = false;
    } else {
      setActiveQualification(null);
    }
  }, [searchParams]);

  const selectFilter = (key) => {
    setActiveFilter(key);
    setActiveQualification(null);
    const next = new URLSearchParams(searchParams);
    if (key === 'all') next.delete('tier');
    else next.set('tier', key);
    setSearchParams(next, { replace: true });
  };

  const selectQualification = (qualification) => {
    skipQualificationReset.current = true;
    setActiveQualification(qualification);
    // A qualification can unlock more than one tier (BPT/BSPT unlocks both
    // Postgraduate and Fellowship), so this bypasses the single-tier filter
    // rather than trying to force it through the same state.
    setActiveFilter('all');
    setSearchParams({}, { replace: true });
  };

  const resetQualification = () => setActiveQualification(null);

  const visibleTiers = programTiers.filter((tier) => {
    if (activeQualification) return activeQualification.tiers.includes(tier.key);
    return activeFilter === 'all' || activeFilter === tier.key;
  });

  return (
    <section id="programs" className="programs">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Our Programmes</span>
          <h1 className="section-title">Academic Programmes</h1>
          <p className="section-subtitle">
            17 programmes across 4 academic pathways — from entry-level certificates to
            advanced research fellowships. Find the right one for your qualification and career stage.
          </p>
        </Reveal>

        <Reveal className="eligibility-panel">
          <span className="eligibility-tag">Eligibility Check</span>
          <p className="eligibility-lead">Not sure where to begin? Select your qualification.</p>
          <div className="qualification-chips" role="group" aria-label="Filter by your qualification">
            {qualifications.map((q) => (
              <button
                key={q.label}
                type="button"
                className={`qualification-chip ${activeQualification === q ? 'active' : ''}`}
                onClick={() => selectQualification(q)}
                aria-pressed={activeQualification === q}
              >
                <i className={q.icon} aria-hidden="true"></i> {q.label}
              </button>
            ))}
            {activeQualification && (
              <button type="button" className="qualification-reset" onClick={resetQualification}>
                <i className="fas fa-rotate-left" aria-hidden="true"></i> Show all
              </button>
            )}
          </div>
        </Reveal>

        <div className="programs-filter" role="group" aria-label="Filter programmes by pathway">
          {programFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`filter-btn ${!activeQualification && activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => selectFilter(filter.key)}
              aria-pressed={!activeQualification && activeFilter === filter.key}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="programs-tiers">
          {visibleTiers.map((tier) => (
            <TierSection
              key={tier.key}
              tier={tier}
              isEligible={Boolean(activeQualification?.tiers.includes(tier.key))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
