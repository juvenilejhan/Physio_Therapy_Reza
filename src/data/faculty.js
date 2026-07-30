import { gradients } from './gradients';

/*
 * Faculty
 * =======
 *
 * ACCURACY RULE — this page names a real, identifiable person.
 *
 * Only information the institution has actually supplied appears here. No
 * invented years of experience, publication counts, qualifications or
 * specialisms. Where a value hasn't been supplied the field is omitted rather
 * than filled with something plausible.
 *
 * This matters because an earlier revision left placeholder text attached to a
 * real name — it stated a PhD from the University of Sydney when the actual
 * qualification is a PhD (PT) from India. A false credential on a named
 * professional misrepresents that person; it isn't merely a copy problem.
 *
 * Portraits: `image: 'faculty/<surname>'` (base name, no extension). Drop the
 * original into assets-src/faculty/ and run
 * `python scripts/optimise-images.py`. Use genuine photographs of the actual
 * individual, with their permission — never stock or generated faces.
 */

export const faculty = [
  {
    id: 1,
    isLead: true,
    name: 'Dr. A. K. M. Rezwan',
    // Role at BAHIR. Deliberately separate from `appointment`, which is his
    // substantive academic post at a different institution.
    role: 'Founder & Director',
    appointment:
      'Assistant Professor, Gonoshasthaya Samaj Vittik College of Physiotherapy and Health Science',
    formerAppointment:
      'Formerly Faculty of Health Science, Gono Bishwabidyalay, Savar, Dhaka',
    credentials: [
      'Postdoc Scholar (Health Science)',
      'PhD (PT), India',
      'MPH (Epidemiology)',
      'MPT (Orthopaedic), Bangladesh',
      'Fellowship in Orthopaedic Rehabilitation, UK',
      'PG Certificate in Musculoskeletal Ultrasound, Bangladesh',
    ],
    image: 'faculty/rezwan',
    initials: 'AR',
    gradient: gradients.maroon,
    // No `bio`: credentials were supplied, a biography was not. Writing one
    // would mean inventing it.
  },

  /*
   * Open positions — NOT people.
   *
   * These were previously named individuals with detailed biographies, all of
   * which were placeholder text. Listing invented colleagues beside a real,
   * verifiable professional undermines his credibility, so the names,
   * biographies and initials are gone. What remains describes posts the academy
   * intends to fill, which is true.
   *
   * To appoint someone: add `name` and `initials`, optionally `image` and
   * `bio`, and remove `isOpenPosition`.
   */
  {
    id: 2,
    isOpenPosition: true,
    role: 'Head, Neurological Rehabilitation',
    status: 'Appointment pending',
    icon: 'fas fa-brain',
    gradient: gradients.laurel,
  },
  {
    id: 3,
    isOpenPosition: true,
    role: 'Director, Sports Medicine',
    status: 'Appointment pending',
    icon: 'fas fa-running',
    gradient: gradients.bronze,
  },
  {
    id: 4,
    isOpenPosition: true,
    role: 'Lead, Research & Innovation',
    status: 'Appointment pending',
    icon: 'fas fa-flask',
    gradient: gradients.claret,
  },
];

export const leadFaculty = faculty.find((m) => m.isLead);
export const otherFaculty = faculty.filter((m) => !m.isLead);
