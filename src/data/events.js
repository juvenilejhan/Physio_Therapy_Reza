/*
 * Optional image fields
 * ---------------------
 * Add `image` to any entry to show a photograph instead of the gradient+icon
 * fallback. The value is a BASE NAME under assets-src/, with no extension and
 * no size suffix — the component builds the srcset from it:
 *
 *   image: 'events/example',        // assets-src/events/example.jpg
 *   imageAlt: '',               // optional; '' (decorative) is the default
 *
 * Then run:  python scripts/optimise-images.py
 *
 * Leaving `image` out is fine and fully supported — the gradient treatment is a
 * finished design, not a placeholder.
 */

export const events = [
  {
    id: 1,
    title: 'International Physiotherapy Innovation Summit 2026',
    description: 'Join 500+ physiotherapy professionals for 3 days of cutting-edge research presentations, hands-on workshops, and networking opportunities.',
    image: 'events/summit',
    month: 'AUG',
    day: '15',
    year: '2026',
    tag: 'Conference',
    featured: true,
    details: [
      { icon: 'fas fa-map-marker-alt', text: 'Dhaka International Convention Center' },
      { icon: 'fas fa-users', text: '500+ Attendees' },
    ],
    btnText: 'Register Now',
    btnClass: 'btn btn-primary btn-sm',
  },
  {
    id: 2,
    title: 'Advanced Dry Needling Workshop',
    description: 'Intensive 2-day hands-on workshop on myofascial trigger point dry needling techniques.',
    image: 'events/dry-needling',
    month: 'SEP',
    day: '05',
    year: null,
    tag: 'Workshop',
    featured: false,
    details: [
      { icon: 'fas fa-map-marker-alt', text: 'BAHIR Campus, Dhaka' },
    ],
    btnText: 'Learn More',
    btnClass: 'btn btn-outline btn-sm',
  },
  {
    id: 3,
    title: 'AI in Rehabilitation: Future of Physiotherapy',
    description: 'Free online webinar exploring AI-powered assessment tools and virtual rehabilitation technologies.',
    image: 'events/ai-webinar',
    month: 'OCT',
    day: '20',
    year: null,
    tag: 'Webinar',
    featured: false,
    details: [
      { icon: 'fas fa-video', text: 'Online (Zoom)' },
    ],
    btnText: 'Register Free',
    btnClass: 'btn btn-outline btn-sm',
  },
];
