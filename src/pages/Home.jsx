import usePageMeta from '../hooks/usePageMeta';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import ProgramsTeaser from '../components/Programs/ProgramsTeaser';
import CTA from '../components/CTA/CTA';

export default function Home() {
  usePageMeta(
    null,
    'Leading physiotherapy academy in Bangladesh offering expert courses, musculoskeletal training, and neurological rehabilitation programmes.'
  );

  return (
    <>
      <Hero />
      <Stats />
      <ProgramsTeaser />
      <CTA />
    </>
  );
}
