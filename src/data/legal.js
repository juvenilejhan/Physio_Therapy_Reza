/**
 * Placeholder legal copy.
 *
 * This is generic, good-faith boilerplate written for a demonstration build. It
 * is NOT legal advice and has not been reviewed by a lawyer — replace it with
 * text prepared for BAHIR's actual data practices and jurisdiction before this
 * site handles real personal data.
 */

const LAST_UPDATED = '30 July 2026';

export const legalPages = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'How BAHIR collects, uses and protects your personal information.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'Information we collect',
        body: 'When you submit an enquiry or subscribe to updates we collect the details you provide — typically your name, email address, phone number and the content of your message. We also collect basic technical information such as browser type and pages visited, in aggregate.',
      },
      {
        heading: 'How we use it',
        body: 'We use your information to respond to enquiries, process applications, send updates you have asked for, and improve our programmes. We do not sell your personal information, and we do not share it with third parties for their own marketing.',
      },
      {
        heading: 'Legal basis',
        body: 'We process enquiry data on the basis of your request, and marketing communications on the basis of your consent. You can withdraw consent at any time using the unsubscribe link in any email.',
      },
      {
        heading: 'Retention',
        body: 'Enquiry records are kept for two years from your last contact with us. Student records are retained for the period required by academic accreditation bodies.',
      },
      {
        heading: 'Your rights',
        body: 'You may request a copy of the information we hold about you, ask us to correct it, or ask us to delete it. Write to info@bahir.edu.bd and we will respond within 30 days.',
      },
      {
        heading: 'Contact',
        body: 'Questions about this policy can be directed to info@bahir.edu.bd, or by post to BAHIR Academy Building, Dhanmondi, Dhaka 1205, Bangladesh.',
      },
    ],
  },

  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    description: 'The terms governing use of the BAHIR website and services.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'Acceptance',
        body: 'By using this website you agree to these terms. If you do not agree, please do not use the site.',
      },
      {
        heading: 'Use of the site',
        body: 'You may browse and share our content for personal, non-commercial purposes. You may not scrape, republish or resell it, attempt to gain unauthorised access, or use the site in any way that disrupts it for others.',
      },
      {
        heading: 'Course information',
        body: 'Programme details, schedules and fees are published in good faith but may change. Nothing on this site constitutes an offer of admission; admission is confirmed only in writing by the admissions office.',
      },
      {
        heading: 'Intellectual property',
        body: 'All content, branding and course material on this site belongs to BAHIR or its licensors and is protected by copyright.',
      },
      {
        heading: 'Limitation of liability',
        body: 'The site is provided on an "as is" basis. To the extent permitted by law, BAHIR is not liable for indirect or consequential loss arising from your use of it.',
      },
      {
        heading: 'Governing law',
        body: 'These terms are governed by the laws of Bangladesh, and disputes fall under the exclusive jurisdiction of the courts of Dhaka.',
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    description: 'How this site uses cookies and browser storage.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'What we store',
        body: 'This site stores a single item in your browser: a theme preference under the key "bahir-theme", which remembers whether you chose light or dark mode. It is strictly functional, contains no identifier, and is never transmitted anywhere.',
      },
      {
        heading: 'Analytics',
        body: 'We do not currently run analytics or advertising cookies on this site. If that changes, this policy will be updated and you will be asked for consent first.',
      },
      {
        heading: 'Third-party resources',
        body: 'Fonts and icons load from Google Fonts and Cloudflare CDN. These providers may see your IP address as part of serving the request. No cookies are set by us through them.',
      },
      {
        heading: 'Managing storage',
        body: 'You can clear the theme preference at any time through your browser settings. The site will fall back to your operating system’s light or dark preference.',
      },
    ],
  },
};

export const legalSlugs = Object.keys(legalPages);
