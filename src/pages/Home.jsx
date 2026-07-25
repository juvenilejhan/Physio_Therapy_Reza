import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Courses from '../components/Courses/Courses';
import CTA from '../components/CTA/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      {/* For home page, we might want to pass a prop to Courses to only show featured ones, but since we didn't build it that way, we'll just display it. To keep it simple and highlight-based, we'll let Courses display its default. */}
      <Courses />
      <CTA />
    </>
  );
}
