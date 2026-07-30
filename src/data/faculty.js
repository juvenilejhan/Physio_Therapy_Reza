import { gradients } from './gradients';

/*
 * Optional portrait
 * -----------------
 * Add `image: 'faculty/surname'` (base name, no extension) to show a
 * photograph; drop the original into assets-src/faculty/ and run
 * `python scripts/optimise-images.py`.
 *
 * These entries name real people. Use a genuine photograph of that individual,
 * with their permission — never stock photography. With no `image` the card
 * shows their initials on a brand gradient, which is a finished design and a
 * perfectly valid final state.
 */

export const faculty = [
  {
    id: 1,
    name: 'Prof. Dr. Mohammad Rahman',
    role: 'Dean, Musculoskeletal Sciences',
    bio: '25+ years of clinical and academic experience in orthopedic physiotherapy. PhD from University of Sydney.',
    initials: 'MR',
    gradient: gradients.maroon,
    expertise: ['Orthopaedic PT', 'Manual Therapy', 'Clinical Education'],
  },
  {
    id: 2,
    name: 'Dr. Ayesha Khan',
    role: 'Head, Neurological Rehabilitation',
    bio: 'Specialist in neurological physiotherapy with research focus on stroke rehabilitation. Published 50+ peer-reviewed papers.',
    initials: 'AK',
    gradient: gradients.laurel,
    expertise: ['Stroke Rehab', 'Neuroplasticity', 'Clinical Research'],
  },
  {
    id: 3,
    name: 'Dr. Tanvir Islam',
    role: 'Director, Sports Medicine',
    bio: 'Former national team physiotherapist. Expert in sports injury prevention and performance optimization.',
    initials: 'TI',
    gradient: gradients.bronze,
    expertise: ['Sports Injury', 'Biomechanics', 'Return-to-Play'],
  },
  {
    id: 4,
    name: 'Prof. Sabrina Begum',
    role: 'Lead, Research & Innovation',
    bio: 'Pioneering researcher in digital health interventions and AI-assisted physiotherapy assessment methods.',
    initials: 'SB',
    gradient: gradients.claret,
    expertise: ['Digital Health', 'AI Assessment', 'Research Design'],
  },
];
