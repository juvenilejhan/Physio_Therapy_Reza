import { stats } from '../../data/stats';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import Reveal from '../Reveal/Reveal';
import './Stats.css';

function StatItem({ stat }) {
  const { ref, count } = useAnimatedCounter(stat.count, 2000);

  return (
    <Reveal className="stat-item">
      <div className="stat-icon" aria-hidden="true"><i className={stat.icon}></i></div>
      {/* The counter animates from 0, so the accessible name carries the final
          value — assistive tech shouldn't read a number mid-tween. */}
      <div className="stat-number" ref={ref} aria-label={`${stat.count}${stat.suffix} ${stat.label}`}>
        <span aria-hidden="true">{count}{stat.suffix}</span>
      </div>
      <div className="stat-label" aria-hidden="true">{stat.label}</div>
    </Reveal>
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
