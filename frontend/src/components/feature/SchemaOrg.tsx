/* eslint-disable react-refresh/only-export-components */
interface SchemaOrgProps {
  type: 'Organization' | 'Course' | 'EducationalOccupationalProgram' | 'Article' | 'Event' | 'WebPage' | 'FAQPage';
  data: Record<string, unknown>;
}

export default function SchemaOrg({ type, data }: SchemaOrgProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type,
          ...data,
        }),
      }}
    />
  );
}

export function organizationSchema() {
  return {
    '@type': 'Organization' as const,
    name: 'College of Project Controls',
    alternateName: 'College of Project Controls and Management',
    url: 'https://collegeofprojectcontrols.com',
    description: 'Professional project controls and project management pathways delivered by Kent Business College, with apprenticeship and commercial routes subject to eligibility.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Kent Business College',
      url: 'https://kentbusinesscollege.com',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'enquiries',
      availableLanguage: ['English'],
    },
  };
}

export function breadcrumbListSchema(items: { name: string; item?: string }[]) {
  return {
    '@type': 'BreadcrumbList' as const,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem' as const,
      position: idx + 1,
      item: item.item
        ? { '@id': `https://collegeofprojectcontrols.com${item.item}`, name: item.name }
        : { name: item.name },
    })),
  };
}

export function courseSchema(data: {
  name: string;
  description: string;
  provider?: string;
  educationalLevel?: string;
  occupationalCategory?: string;
  timeToComplete?: string;
}) {
  return {
    '@type': 'EducationalOccupationalProgram' as const,
    name: data.name,
    description: data.description,
    provider: data.provider
      ? { '@type': 'Organization', name: data.provider }
      : { '@type': 'Organization', name: 'Kent Business College' },
    educationalLevel: data.educationalLevel || 'Level 6',
    occupationalCategory: data.occupationalCategory || 'Project Controls Professional',
    timeToComplete: data.timeToComplete || 'P24M',
    educationalProgramMode: 'apprenticeship',
    financialAidEligible: 'Apprenticeship funding may be available subject to current learner and employer eligibility rules',
  };
}

export function articleSchema(data: {
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
}) {
  return {
    '@type': 'Article' as const,
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished || '2025-01-01',
    dateModified: data.dateModified || new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: data.authorName || 'College of Project Controls',
      url: data.authorUrl || 'https://collegeofprojectcontrols.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'College of Project Controls',
      url: 'https://collegeofprojectcontrols.com',
    },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage' as const,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.a,
      },
    })),
  };
}

export function eventSchema(data: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
}) {
  return {
    '@type': 'Event' as const,
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate || data.startDate,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: data.location
      ? { '@type': 'VirtualLocation', url: data.location }
      : { '@type': 'VirtualLocation', name: 'Online' },
    organizer: {
      '@type': 'Organization',
      name: 'College of Project Controls',
      url: 'https://collegeofprojectcontrols.com',
    },
  };
}
