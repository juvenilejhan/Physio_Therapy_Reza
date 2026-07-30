import usePageMeta from '../hooks/usePageMeta';
import Faculty from '../components/Faculty/Faculty';
import ResearchFocus from '../components/ResearchFocus/ResearchFocus';

export default function FacultyPage() {
  usePageMeta(
    'Our Faculty',
    'Meet the internationally recognised clinicians, researchers and educators teaching at BAHIR, and our current research pillars.'
  );

  return (
    <div className="page-wrapper">
      <Faculty />
      <ResearchFocus />
    </div>
  );
}
