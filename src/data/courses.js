import { gradients } from './gradients';

/*
 * Optional image fields
 * ---------------------
 * Add `image` to any entry to show a photograph instead of the gradient+icon
 * fallback. The value is a BASE NAME under assets-src/, with no extension and
 * no size suffix — the component builds the srcset from it:
 *
 *   image: 'courses/example',        // assets-src/courses/example.jpg
 *   imageAlt: '',               // optional; '' (decorative) is the default
 *
 * Then run:  python scripts/optimise-images.py
 *
 * Leaving `image` out is fine and fully supported — the gradient treatment is a
 * finished design, not a placeholder.
 */

export const courses = [
  {
    id: 1,
    title: 'Musculoskeletal Physiotherapy Fundamentals',
    description: 'Master the assessment, diagnosis, and evidence-based treatment of musculoskeletal conditions with practical clinical training.',
    category: 'musculoskeletal',
    categoryLabel: 'Musculoskeletal',
    duration: '12 Weeks',
    instructor: 'Dr. Rahman',
    instructorInitials: 'DR',
    badge: 'Popular',
    badgeType: '',
    icon: 'fas fa-bone',
    image: 'courses/testcourse',
    gradient: gradients.maroon,
  },
  {
    id: 2,
    title: 'Neurological Rehabilitation Techniques',
    description: 'Advanced rehabilitation strategies for stroke, spinal cord injury, traumatic brain injury, and other neurological conditions.',
    category: 'neuro',
    categoryLabel: 'Neurological',
    duration: '16 Weeks',
    instructor: 'Dr. Ahmed Khan',
    instructorInitials: 'AK',
    badge: 'New',
    badgeType: 'new',
    icon: 'fas fa-brain',
    gradient: gradients.laurel,
  },
  {
    id: 3,
    title: 'Sports Injury Management & Recovery',
    description: 'Comprehensive training in sports injury prevention, assessment, treatment, and return-to-play protocols for athletes.',
    category: 'sports',
    categoryLabel: 'Sports Medicine',
    duration: '10 Weeks',
    instructor: 'Dr. Sultana Haque',
    instructorInitials: 'SH',
    badge: null,
    badgeType: '',
    icon: 'fas fa-running',
    gradient: gradients.bronze,
  },
  {
    id: 4,
    title: 'Advanced Manual Therapy Techniques',
    description: 'Expert-level manual therapy skills including joint mobilization, manipulation, and advanced soft tissue techniques.',
    category: 'musculoskeletal',
    categoryLabel: 'Musculoskeletal',
    duration: '14 Weeks',
    instructor: 'Prof. Md. Hassan',
    instructorInitials: 'MH',
    badge: null,
    badgeType: '',
    icon: 'fas fa-hand-holding-medical',
    gradient: gradients.claret,
  },
  {
    id: 5,
    title: 'Cardiopulmonary Physical Therapy',
    description: 'Evidence-based cardiopulmonary rehabilitation including cardiac care, respiratory therapy, and exercise prescription.',
    category: 'cardio',
    categoryLabel: 'Cardiopulmonary',
    duration: '12 Weeks',
    instructor: 'Dr. Nusrat Jahan',
    instructorInitials: 'NJ',
    badge: null,
    badgeType: '',
    icon: 'fas fa-heartbeat',
    gradient: gradients.forest,
  },
  {
    id: 6,
    title: 'Pediatric Physiotherapy Essentials',
    description: 'Specialized training in developmental assessment, early intervention, and therapeutic approaches for pediatric patients.',
    category: 'neuro',
    categoryLabel: 'Pediatric',
    duration: '10 Weeks',
    instructor: 'Dr. Fatema Akter',
    instructorInitials: 'FA',
    badge: 'Coming Soon',
    badgeType: 'coming',
    icon: 'fas fa-child',
    gradient: gradients.ember,
  },
];

export const courseCategories = [
  { key: 'all', label: 'All Courses' },
  { key: 'musculoskeletal', label: 'Musculoskeletal' },
  { key: 'neuro', label: 'Neurological' },
  { key: 'sports', label: 'Sports Medicine' },
  { key: 'cardio', label: 'Cardiopulmonary' },
];
