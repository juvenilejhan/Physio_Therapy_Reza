import { gradients } from './gradients';

/*
 * BAHIR's real academic structure: four qualification-gated pathways, each
 * containing named programmes. Replaces the fictional six-course catalogue
 * that shipped in earlier sessions.
 *
 * No `description` field on individual programmes. The generated draft this
 * was ported from ("ProgramsSection.jsx") shipped with placeholder curriculum
 * copy and said so in its own comments — inventing descriptions here would be
 * the same mistake. Add one per programme once real copy exists; the card
 * layout already has room for it.
 *
 * No `badge` field either — "Popular" / "New" asserted a signal (demand,
 * recency) nobody supplied.
 *
 * `id` is stable per programme (1-17) and is what /contact?program=<id> reads
 * to prefill the enquiry form — do not renumber existing entries.
 */

export const programTiers = [
  {
    key: 'certificate',
    name: 'Certificate Programme',
    duration: '3 Months',
    qualification: 'SSC / Dakhil',
    icon: 'fas fa-graduation-cap',
    gradient: gradients.maroon,
    programs: [
      { id: 1, name: 'Certificate in Physiotherapy Assistant', icon: 'fas fa-hands-helping' },
      { id: 2, name: 'Certificate in Dental Assistant', icon: 'fas fa-tooth' },
      { id: 3, name: 'Certificate in Elderly Care & Caregiving', icon: 'fas fa-hand-holding-heart' },
      { id: 4, name: 'Certificate in Diagnostic Laboratory Assistance', icon: 'fas fa-flask' },
      { id: 5, name: 'Certificate in X-Ray Technology', icon: 'fas fa-x-ray' },
      { id: 6, name: 'Certificate in ECG Technology', icon: 'fas fa-heart-pulse' },
    ],
  },
  {
    key: 'postgraduate',
    name: 'Postgraduate Programme',
    duration: '3 Months',
    qualification: 'MBBS / BPT',
    icon: 'fas fa-user-doctor',
    gradient: gradients.laurel,
    programs: [
      { id: 7, name: 'Postgraduate Certificate in Musculoskeletal Physiotherapy', icon: 'fas fa-bone' },
      { id: 8, name: 'Postgraduate Certificate in Geriatric Physiotherapy', icon: 'fas fa-person-cane' },
      { id: 9, name: 'Postgraduate Certificate in Diagnostic Imaging', icon: 'fas fa-radiation' },
      { id: 10, name: 'Postgraduate Certificate in Kinesio Tapping', icon: 'fas fa-bandage' },
      { id: 11, name: 'Postgraduate Certificate in Dry Needling', icon: 'fas fa-syringe' },
      { id: 12, name: 'Postgraduate Certificate in Musculoskeletal Ultrasound', icon: 'fas fa-wave-square' },
    ],
  },
  {
    key: 'fellowship',
    name: 'Fellowship Programme',
    duration: '6 Months',
    qualification: 'BPT / BSPT',
    icon: 'fas fa-award',
    gradient: gradients.bronze,
    programs: [
      { id: 13, name: 'Fellowship in Orthopedic Physiotherapy & Rehabilitation', icon: 'fas fa-bone' },
      { id: 14, name: 'Fellowship in Neurological Physiotherapy & Rehabilitation', icon: 'fas fa-brain' },
      { id: 15, name: 'Fellowship in Sports Physiotherapy & Rehabilitation', icon: 'fas fa-running' },
    ],
  },
  {
    key: 'research',
    name: 'Research Programme',
    duration: '6 Months',
    qualification: 'Graduate from Health Science',
    icon: 'fas fa-microscope',
    gradient: gradients.claret,
    programs: [
      { id: 16, name: 'Postgraduate Certificate in Health Research Methodology', icon: 'fas fa-magnifying-glass-chart' },
      { id: 17, name: 'Postgraduate Certificate in Research Manuscript Writing and Publication', icon: 'fas fa-file-lines' },
    ],
  },
];

/** Flat list with each programme's tier attached — used for lookups (contact prefill, counts). */
export const allPrograms = programTiers.flatMap((tier) =>
  tier.programs.map((program) => ({ ...program, tier: tier.key, tierName: tier.name }))
);

export const programFilters = [
  { key: 'all', label: 'All Programmes' },
  ...programTiers.map((tier) => ({ key: tier.key, label: tier.name })),
];

/** Entry qualifications for the eligibility panel. `tiers` lists which pathways that qualification unlocks. */
export const qualifications = [
  { label: 'SSC / Dakhil', icon: 'fas fa-graduation-cap', tiers: ['certificate'] },
  { label: 'MBBS', icon: 'fas fa-user-doctor', tiers: ['postgraduate'] },
  { label: 'BPT / BSPT', icon: 'fas fa-award', tiers: ['postgraduate', 'fellowship'] },
  { label: 'Health Science Graduate', icon: 'fas fa-microscope', tiers: ['research'] },
];
