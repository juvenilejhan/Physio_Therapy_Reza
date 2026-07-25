import { stats } from '../../data/stats';
import useScrollReveal from '../../hooks/useScrollReveal';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import './Stats.css';

function StatItem({ stat }) {
  const { ref, count } = useAnimatedCounter(stat.count, 2000);
  const revealRef = useScrollReveal();
  
  return (
    <div 
      className="stat-item reveal" 
      ref={(el) => {
        revealRef.current = el;
      }}
    >
      <div className="stat-icon"><i className={stat.icon}></i></div>
      <div className="stat-number" ref={ref}>
        {count}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
