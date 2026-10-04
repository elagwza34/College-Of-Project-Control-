import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../../router/config';

const knownPaths = new Set(
  routes.map((route) => route.path).filter((path): path is string => typeof path === 'string' && path !== '*'),
);

const SITE_NAME = 'College of Project Controls & Management';
const SITE_URL = 'https://collegeofprojectcontrols.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-professional.webp`;

interface SeoEntry {
  title: string;
  description: string;
  canonical?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
}

const seoEntries: Record<string, SeoEntry> = {
  '/articles': {
    title: 'Articles & Insights | CPCM',
    description: 'Explore articles on project controls, professional development, career routes and sector insights. Search the College article library.',
  },
  '/': {
    title: 'Project Controls & Management Programmes | CPCM',
    description: 'Build practical capability in project controls, project management and PMO through professional programmes, specialist modules and employer development pathways.',
  },
  '/programmes': {
    title: 'Professional Project Controls Programmes | CPCM',
    description: 'Compare professional programmes in project controls, project management and PMO, designed around real workplace responsibility and career progression.',
  },
  '/about': {
    title: 'About the College of Project Controls & Management',
    description: 'Learn how CPCM develops applied capability across project controls, project management and PMO for professionals and project-driven employers.',
  },
  '/institute-of-project-controls': {
    title: 'Institute of Project Controls | Standards & Recognition',
    description: 'Explore the Institute of Project Controls, its professional capability framework, standards, recognition routes and connection with applied College programmes.',
  },
  '/sectors': {
    title: 'Project Controls Sectors | CPCM',
    description: 'Explore project controls sector routes for construction, engineering and manufacturing, public sector, and energy and utilities — delivered against the same Level 6 occupational standard.',
  },
  '/associate-project-manager-level-4': {
    title: 'Associate Project Manager Level 4 Apprenticeship | KBC',
    description: 'Develop practical project management expertise through the Associate Project Manager Level 4 apprenticeship, combining professional project management preparation, workplace learning and applied AI capability.',
  },
  '/employers': {
    title: 'Project Controls Development for Employers | CPCM',
    description: 'Develop project controls, project management and PMO capability through workplace-based programmes, employer progress reviews and funding guidance from CPCM.',
  },
  '/apprentices': {
    title: 'Project Controls Apprenticeships for Professionals | CPCM',
    description: 'Explore workplace-based project controls and project management development, eligibility, professional support and career progression pathways.',
  },
  '/employer-agreement': {
    title: 'Employer Agreement | College of Project Controls & Management',
    description: 'Complete the Employer Agreement form to confirm your organisation’s participation and next steps with Kent Business College.',
  },
  '/governance-board': {
    title: 'Governance Board | Kent Business College',
    description: 'Join the Kent Business College Governance Board and contribute strategic expertise, leadership and professional insight to support institutional excellence.',
  },
  '/events': {
    title: 'Events & Masterclasses | CPCM',
    description: 'Join specialist Project Controls Masterclasses, professional webinars and online information sessions from the College of Project Controls & Management.',
  },
  '/apprenticeship-eligibility-checker': {
    title: 'Apprenticeship Eligibility Checker | CPCM',
    description: 'Answer a few short questions to receive an initial indication of whether an apprenticeship route may be suitable for you, before speaking with our admissions team.',
  },
  '/project-controls-professional-level-6': {
    title: 'Project Controls Professional Level 6',
    description: 'A 27-month, six-credit work-based Project Controls Professional Level 6 programme with Operational, Strategic, Chartered and tailored pathway options.',
  },
  '/project-controls-professional/strategic-route': {
    title: 'Strategic Pathway | Project Controls Professional Level 6 | College of Project Controls',
    description: 'Develop strategic project controls capability across leadership, AI, programme management, portfolio decision-making and PMO leadership through the six-credit Strategic Pathway at the College of Project Controls.',
  },
  '/project-controls-professional/operational-route': {
    title: 'Operational Pathway | Project Controls Professional Level 6 | College of Project Controls',
    description: 'Explore the six-credit Operational Pathway for Project Controls Professional Level 6: integrated planning and control, responsible AI, specialist electives and workplace evidence.',
  },
  '/project-controls-professional/strategic-operational-route': {
    title: 'Strategic & Operational Project Controls Route | CPCM',
    description: 'Combine strategic governance with operational controls capability across planning, cost, risk, assurance and performance reporting.',
  },
  '/project-controls-professional/pmo-governance-route': {
    title: 'PMO Governance Professional Route | CPCM',
    description: 'Develop PMO governance, integrated controls, assurance, reporting and stakeholder leadership capability for complex organisations.',
  },
  '/project-controls-professional/chartered-pmo-pathway': {
    title: 'Chartered Pathway | Project Controls Professional Level 6 | College of Project Controls',
    description: 'Develop technical project controls knowledge, professional evidence and strategic judgement through the College of Project Controls Chartered Pathway, supporting eligible professionals progressing towards Chartered Project Professional.',
  },
  '/project-controls-professional/construction-route': {
    title: 'Construction Project Controls Professional Route | CPCM',
    description: 'Develop construction-focused scheduling, cost, NEC change, contractor coordination and progress reporting capability.',
  },
  '/project-controls-professional/engineering-manufacturing-aerospace-route': {
    title: 'Engineering Project Controls Professional Route | CPCM',
    description: 'Build integrated project controls capability for engineering, manufacturing, aerospace and regulated production environments.',
  },
  '/project-controls-professional/public-sector-councils-route': {
    title: 'Public Sector Project Controls Professional Route | CPCM',
    description: 'Strengthen governance, audit-ready evidence, value assurance and programme reporting across public-sector and council delivery.',
  },
  '/project-controls-professional/energy-oil-gas-utilities-route': {
    title: 'Energy & Utilities Project Controls Route | CPCM',
    description: 'Develop cost, schedule, risk, contractor governance and regulatory assurance capability for energy and utilities programmes.',
  },
  '/commercial-project-controls-route': {
    title: 'Commercial Project Controls Development Route | CPCM',
    description: 'Explore a flexible commercial route for professionals and employers seeking project controls development outside apprenticeship funding.',
  },
  '/knowledge-hub': {
    title: 'Project Controls Knowledge Hub | CPCM',
    description: 'Practical guidance on project controls careers, professional routes, PMO governance, sector capability and apprenticeship funding.',
  },
  '/knowledge-hub/what-is-pcp-apprenticeship': {
    title: 'What Is a Project Controls Professional Apprenticeship?',
    description: 'Understand the Level 6 Project Controls Professional apprenticeship, who it is for, what it develops and how employer funding may apply.',
    type: 'article',
  },
  '/knowledge-hub/funded-pcp-employer-guide': {
    title: 'Employer Guide to Project Controls Apprenticeship Funding',
    description: 'A practical guide for employers considering project controls apprenticeships, including levy funding, co-investment and eligibility.',
    type: 'article',
  },
  '/knowledge-hub/pcp-vs-pmp': {
    title: 'Project Controls Professional Level 6 vs PMP',
    description: 'Compare the Project Controls Professional Level 6 pathway with PMP across focus, workplace application, funding and progression.',
    type: 'article',
  },
  '/knowledge-hub/apm-chpp-readiness': {
    title: 'APM ChPP Readiness Support Explained | CPCM',
    description: 'Understand how structured professional development can help you build evidence, reflection and capability toward APM ChPP readiness.',
    type: 'article',
  },
  '/knowledge-hub/strategic-vs-operational': {
    title: 'Strategic vs Operational Project Controls Routes',
    description: 'Compare strategic and operational project controls routes by responsibility, capability focus, workplace evidence and career direction.',
    type: 'article',
  },
  '/knowledge-hub/construction-training': {
    title: 'Construction Project Controls Training Guide | CPCM',
    description: 'Explore the planning, cost, NEC change, risk and reporting capability needed across construction and infrastructure programmes.',
    type: 'article',
  },
  '/knowledge-hub/energy-training': {
    title: 'Energy Project Controls Training Guide | CPCM',
    description: 'Explore project controls development for energy and utilities, from integrated baselines and forecasting to governance and assurance.',
    type: 'article',
  },
  '/knowledge-hub/pmo-governance-training': {
    title: 'PMO Governance Training Guide | CPCM',
    description: 'Learn how PMO governance development strengthens assurance, integrated reporting, escalation and executive decision support.',
    type: 'article',
  },
  '/knowledge-hub/employer-apprenticeship-funding': {
    title: 'Employer Apprenticeship Funding Guide | CPCM',
    description: 'Understand apprenticeship levy funding, government co-investment and employer eligibility for professional project controls development.',
    type: 'article',
  },
  '/knowledge-hub/commercial-routes-explained': {
    title: 'Commercial Project Controls Routes Explained | CPCM',
    description: 'Understand commercial development options for self-funded professionals, international learners and employers outside apprenticeship routes.',
    type: 'article',
  },
  '/testimonials': {
    title: 'Professional & Employer Reviews | CPCM',
    description: 'Read programme experiences shared by professionals and employers, or submit your own review for approval.',
  },
  '/contact': {
    title: 'Contact the College of Project Controls & Management',
    description: 'Discuss programme fit, employer capability, specialist modules, professional progression or funding eligibility with our team.',
  },
  '/faq': {
    title: 'Frequently Asked Questions | CPCM',
    description: 'Answers about CPCM programmes, specialist modules, bursary support, employer development and professional progression.',
  },
  '/book-a-session': {
    title: 'Request a consultation | College of Project Controls & Management',
    description: 'Request a consultation with our team to discuss programme fit, funding eligibility and the right project controls pathway for you.',
  },
  '/privacy': {
    title: 'Privacy Notice | CPCM',
    description: 'How the College of Project Controls & Management collects, uses and protects information submitted through this website.',
  },
  '/terms': {
    title: 'Website Terms of Use | CPCM',
    description: 'Terms governing programme information, funding statements, intellectual property and external services on the CPCM website.',
  },
  '/accessibility': {
    title: 'Accessibility Statement | CPCM',
    description: 'Our approach to accessible website content, keyboard navigation, assistive technology and alternative information formats.',
  },
  '/cookies': {
    title: 'Cookies and Local Storage | CPCM',
    description: 'How essential browser storage, measurement technologies and third-party services may be used on the CPCM website.',
  },
};

const aliases: Record<string, string> = {
  '/ipc': '/institute-of-project-controls',
  '/strategic-pcp': '/project-controls-professional/strategic-route',
  '/strategic-operational-pcp': '/project-controls-professional/strategic-operational-route',
  '/pmo-pcp': '/project-controls-professional/pmo-governance-route',
  '/chartered-pmo-pathway': '/project-controls-professional/chartered-pmo-pathway',
  '/operational-pcp-construction': '/project-controls-professional/construction-route',
  '/operational-pcp-engineering': '/project-controls-professional/engineering-manufacturing-aerospace-route',
  '/operational-pcp-public-sector': '/project-controls-professional/public-sector-councils-route',
  '/operational-pcp-energy': '/project-controls-professional/energy-oil-gas-utilities-route',
  '/knowledge-hub/fully-funded-project-controls-apprenticeship': '/knowledge-hub/funded-pcp-employer-guide',
  '/knowledge-hub/project-controls-level-6-vs-pmp': '/knowledge-hub/pcp-vs-pmp',
  '/knowledge-hub/apm-chpp-readiness-support': '/knowledge-hub/apm-chpp-readiness',
};

function setMeta(selector: string, attributes: Record<string, string>) {
  const nodes = Array.from(document.head.querySelectorAll<HTMLMetaElement>(selector));
  const targets = nodes.length > 0 ? nodes : [document.createElement('meta')];
  targets.forEach((node) => {
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    if (!node.parentNode) document.head.appendChild(node);
  });
}

function setCanonical(url: string) {
  const links = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
  const targets = links.length > 0 ? links : [document.createElement('link')];
  targets.forEach((link) => {
    link.rel = 'canonical';
    link.href = url;
    if (!link.parentNode) document.head.appendChild(link);
  });
}

function titleFromPath(pathname: string) {
  if (/^\/mentors\/\d+$/.test(pathname)) return `Mentor profile | ${SITE_NAME}`;
  const label = pathname.split('/').filter(Boolean).pop()?.replaceAll('-', ' ') ?? 'Page';
  return `${label.replace(/\b\w/g, (letter) => letter.toUpperCase())} | ${SITE_NAME}`;
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const update = (notification: Event) => {
      if (!pathname.startsWith('/events/')) return;
      const { event } = (notification as CustomEvent<{ event: import('@/services/eventsApi').EventItem | null }>).detail;
      const title = event ? `${event.title} | CPCM Events` : 'Event unavailable | CPCM';
      const description = event?.display_summary || 'Browse professional events and masterclasses.';
      document.title = title;
      setMeta('meta[name="description"]', { name: 'description', content: description });
      setMeta('meta[name="robots"]', { name: 'robots', content: event ? 'index, follow' : 'noindex, follow' });
      for (const [key, value] of Object.entries({ title, description, image: event?.image_url ? new URL(event.image_url, SITE_URL).href : DEFAULT_IMAGE })) {
        setMeta(`meta[property="og:${key}"]`, { property: `og:${key}`, content: value });
        setMeta(`meta[name="twitter:${key}"]`, { name: `twitter:${key}`, content: value });
      }
      const script = document.getElementById('site-route-schema');
      if (script) script.textContent = JSON.stringify(event && event.starts_at ? {
        '@context': 'https://schema.org', '@type': 'Event', name: event.title, description,
        url: `${SITE_URL}${pathname}`, startDate: event.starts_at, endDate: event.ends_at || undefined,
        image: event.image_url ? new URL(event.image_url, SITE_URL).href : undefined,
        eventStatus: `https://schema.org/${event.state === 'cancelled' ? 'EventCancelled' : 'EventScheduled'}`,
        eventAttendanceMode: `https://schema.org/${event.format === 'online' ? 'OnlineEventAttendanceMode' : 'OfflineEventAttendanceMode'}`,
        location: event.format === 'online' ? { '@type': 'VirtualLocation', url: event.booking_url || `${SITE_URL}${pathname}` } : { '@type': 'Place', name: event.location },
        organizer: event.organizer ? { '@type': 'Organization', name: event.organizer } : undefined,
      } : {});
    };
    window.addEventListener('event-seo', update);
    return () => window.removeEventListener('event-seo', update);
  }, [pathname]);

  useEffect(() => {
    const update = (event: Event) => {
      if (!pathname.startsWith('/articles/')) return;
      const detail = (event as CustomEvent<{ title: string; description?: string; image?: string; author?: string; published?: string; updated?: string; noIndex?: boolean }>).detail;
      document.title = detail.title;
      const description = detail.description || 'Browse articles from the College of Project Controls.';
      setMeta('meta[name="description"]', { name: 'description', content: description });
      setMeta('meta[name="robots"]', { name: 'robots', content: detail.noIndex ? 'noindex, follow' : 'index, follow' });
      for (const [key, value] of Object.entries({ title: detail.title, description, type: 'article', image: detail.image ? new URL(detail.image, SITE_URL).href : DEFAULT_IMAGE })) {
        setMeta(`meta[property="og:${key}"]`, { property: `og:${key}`, content: value });
        if (key !== 'type') setMeta(`meta[name="twitter:${key}"]`, { name: `twitter:${key}`, content: value });
      }
      const script = document.getElementById('site-route-schema');
      if (script) script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: detail.title, description, author: { '@type': 'Organization', name: detail.author || SITE_NAME }, datePublished: detail.published, dateModified: detail.updated, image: detail.image ? new URL(detail.image, SITE_URL).href : DEFAULT_IMAGE, mainEntityOfPage: `${SITE_URL}${pathname}` });
    };
    window.addEventListener('article-seo', update);
    return () => window.removeEventListener('article-seo', update);
  }, [pathname]);

  useEffect(() => {
    const isCampaign = pathname.startsWith('/campaign/');
    const isThankYou = pathname.startsWith('/thank-you/');
    const canonicalPath = aliases[pathname] ?? pathname;
    const entry = seoEntries[canonicalPath] ?? {
      title: titleFromPath(canonicalPath),
      description: 'Professional project controls, project management and PMO development from the College of Project Controls & Management.',
      noIndex: (!knownPaths.has(pathname) && !/^\/mentors\/\d+$/.test(pathname)) || isCampaign || isThankYou,
    };
    const title = entry.title;
    const canonical = `${SITE_URL}${entry.canonical ?? canonicalPath}`;
    const noIndex = Boolean(entry.noIndex || aliases[pathname] || isCampaign || isThankYou);

    document.title = title;
    document.documentElement.lang = 'en-GB';
    document.querySelectorAll('title').forEach((node) => { node.textContent = title; });

    setMeta('meta[name="description"]', { name: 'description', content: entry.description });
    setMeta('meta[name="robots"]', { name: 'robots', content: noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: entry.description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: entry.type ?? 'website' });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: entry.description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_IMAGE });
    setCanonical(canonical);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'EducationalOrganization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          alternateName: 'CPCM',
          url: SITE_URL,
          email: 'info@collegeofprojectcontrols.com',
        },
        {
          '@type': entry.type === 'article' ? 'Article' : 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: title,
          description: entry.description,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          publisher: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en-GB',
        },
      ],
    };

    let script = document.getElementById('site-route-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'site-route-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(jsonLd);

    window.dataLayer?.push({ event: 'virtual_page_view', page_path: pathname, page_title: title });
  }, [pathname]);

  return null;
}
