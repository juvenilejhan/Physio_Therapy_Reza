import usePageMeta from '../hooks/usePageMeta';
import SupportServices from '../components/SupportServices/SupportServices';
import CTA from '../components/CTA/CTA';

export default function SupportPage() {
  usePageMeta(
    'Others Support',
    'Comprehensive academic and research support services including paper writing, journal publication, and research consultation.'
  );

  return (
    <div className="page-wrapper">
      <SupportServices />
      <CTA />
    </div>
  );
}
