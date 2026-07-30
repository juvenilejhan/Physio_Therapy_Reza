import usePageMeta from '../hooks/usePageMeta';
import Faculty from '../components/Faculty/Faculty';
import ResearchFocus from '../components/ResearchFocus/ResearchFocus';

export default function FacultyPage() {
  // Reworded: the previous copy described "internationally recognised
  // clinicians, researchers and educators" — a claim about a roster that is
  // currently the founder plus open positions.
  usePageMeta(
    'Faculty & Leadership',
    'Meet Dr. A. K. M. Rezwan, founder and director of BAHIR, and see the academic posts we are currently recruiting for.'
  );

  return (
    <div className="page-wrapper">
      <Faculty />
      <ResearchFocus />
    </div>
  );
}
