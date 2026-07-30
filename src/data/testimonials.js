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

export const testimonials = [
  {
    id: 1,
    name: 'Dr. Rashid Karim',
    role: 'Senior Physiotherapist, Dhaka Medical College',
    quote: "BAHIR's musculoskeletal course completely transformed my clinical practice. The evidence-based approach and hands-on training gave me confidence to handle complex cases I never thought possible.",
    rating: 5,
    initials: 'RK',
    gradient: gradients.claret,
  },
  {
    id: 2,
    name: 'Farzana Nahar, MPT',
    role: 'Rehabilitation Specialist, Apollo Hospital',
    quote: "The neurological rehabilitation program at BAHIR is world-class. I've been able to implement new techniques that have significantly improved patient outcomes at my hospital.",
    rating: 5,
    initials: 'FN',
    gradient: gradients.laurel,
  },
  {
    id: 3,
    name: 'Prakash Shrestha',
    role: 'Sports Physiotherapist, Kathmandu',
    quote: "As an international student from Nepal, I found BAHIR's online platform incredibly accessible. The faculty support and global networking opportunities are exceptional.",
    rating: 4.5,
    initials: 'PS',
    gradient: gradients.maroon,
  },
  {
    id: 4,
    name: 'Maria Ahmed, PhD',
    role: 'Clinical Researcher, London',
    quote: "BAHIR's certificate opened doors for me internationally. The curriculum is on par with programs I've seen in the UK and Australia. Highly recommend for any aspiring physiotherapist.",
    rating: 5,
    initials: 'MA',
    gradient: gradients.bronze,
  },
];
