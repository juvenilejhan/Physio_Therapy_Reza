import usePageMeta from '../hooks/usePageMeta';
import Programs from '../components/Programs/Programs';
import AdmissionSteps from '../components/AdmissionSteps/AdmissionSteps';

export default function CoursesPage() {
  usePageMeta(
    'Academic Programmes',
    'BAHIR academic programmes: Certificate, Postgraduate, Fellowship and Research pathways in physiotherapy and allied health sciences.'
  );

  return (
    <div className="page-wrapper">
      <Programs />
      <AdmissionSteps />
    </div>
  );
}
