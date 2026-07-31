import { allPrograms } from './programs';

export const stats = [
  { id: 1, count: 1200, label: 'Students Enrolled', icon: 'fas fa-user-graduate', suffix: '+' },
  // Derived rather than hardcoded — this used to say "25+ Expert Courses" for
  // a six-course fictional catalogue; deriving it from the real data means it
  // can't drift out of sync again.
  { id: 2, count: allPrograms.length, label: 'Academic Programmes', icon: 'fas fa-book', suffix: '+' },
  { id: 3, count: 40, label: 'Expert Faculty', icon: 'fas fa-chalkboard-teacher', suffix: '+' },
  { id: 4, count: 15, label: 'Countries Reached', icon: 'fas fa-globe', suffix: '+' },
];
