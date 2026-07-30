import usePageMeta from '../hooks/usePageMeta';
import Courses from '../components/Courses/Courses';
import AdmissionSteps from '../components/AdmissionSteps/AdmissionSteps';

export default function CoursesPage() {
  usePageMeta(
    'Programmes & Courses',
    'Evidence-based physiotherapy courses: musculoskeletal, neurological, sports medicine and cardiopulmonary programmes, plus how to apply.'
  );

  return (
    <div className="page-wrapper">
      <Courses titleAs="h1" />
      <AdmissionSteps />
    </div>
  );
}
