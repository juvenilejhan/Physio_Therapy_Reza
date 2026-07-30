import usePageMeta from '../hooks/usePageMeta';
import About from '../components/About/About';
import Features from '../components/Features/Features';
import VisionMission from '../components/VisionMission/VisionMission';
import Testimonials from '../components/Testimonials/Testimonials';

export default function AboutPage() {
  usePageMeta(
    'About Us',
    'BAHIR advances physiotherapy education and research in Bangladesh — our mission, vision, values and the advantages of studying with us.'
  );

  return (
    <div className="page-wrapper">
      <About />
      <Features />
      <VisionMission />
      <Testimonials />
    </div>
  );
}
