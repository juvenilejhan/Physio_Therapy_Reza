import usePageMeta from '../hooks/usePageMeta';
import News from '../components/News/News';
import Events from '../components/Events/Events';
import Newsletter from '../components/Newsletter/Newsletter';

export default function MediaPage() {
  usePageMeta(
    'Media & Events',
    'News, research announcements and upcoming BAHIR workshops, conferences and webinars.'
  );

  return (
    <div className="page-wrapper">
      <News />
      <Events />
      <Newsletter />
    </div>
  );
}
