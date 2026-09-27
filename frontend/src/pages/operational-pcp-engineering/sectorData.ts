import type { SectorRouteConfig } from '@/components/feature/RouteLanding/SectorRoutePage';
const navLinks = [
  { label: 'Engineering Route', href: '#hero' },
  { label: 'Who It Is For', href: '#who-for' },
  { label: 'Funding', href: '/apprenticeship-eligibility-checker' },
  { label: 'Outcomes', href: '#develop' },
];

const heroData = {
  badge: 'Funding Subject to Eligibility',
  headline: 'For Regulated Environments Where Quality, Compliance and Delivery All Matter.',
  headlineHighlight: 'Quality, Compliance and Delivery',
  subheadline: 'A Level 6 pathway where eligible, designed for professionals managing complex engineering, manufacturing and regulated delivery programmes.',
  description: 'Integrate schedule, cost, risk and compliance control across engineering and manufacturing programmes. Build audit-ready documentation, supplier milestone tracking and evidence-based forecasting that satisfies regulatory and customer requirements.',
  fundingLine: 'Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility. Commercial routes are available for self-funded and non-eligible learners.',
  primaryCta: 'Request a consultation',
  secondaryCta: 'Check Funding Eligibility',
  commercialLink: '/commercial-project-controls-route',
  trustItems: [
    { icon: 'ri-checkbox-circle-fill', text: 'Funding Subject to Eligibility' },
    { icon: 'ri-funds-fill', text: 'Up to £27,000 Government Funding Band' },
    { icon: 'ri-award-fill', text: 'APM ChPP Readiness Support' },
    { icon: 'ri-building-2-fill', text: 'Workplace Evidence Support' },
  ],
  sectorImage: 'https://readdy.ai/api/search-image?query=Abstract%20precision%20aerospace%20engineering%20geometry%2C%20turbine%20blades%20and%20mechanical%20gears%20silhouette%2C%20metallic%20silver%20and%20cool%20steel%20blue%20tones%2C%20minimalist%20editorial%20illustration%2C%20no%20people%2C%20professional%20manufacturing%20aesthetic%2C%20soft%20gradient%20background&width=600&height=400&seq=engineering-sector-2026&orientation=landscape',
  sectorLabel: 'Engineering & Aerospace',
  accentColor: '#1F5F73',
  metrics: {
    governance: '80%',
    pmoMaturity: '3.2',
    risk: 'Low',
    forecast: 'Stable',
    decision: 'On Track',
    chartLabel: 'Quality Compliance Index',
    chartValue: '+14%',
    chartBars: [30, 40, 38, 50, 48, 58, 55, 65, 62, 72, 70, 82],
  },
};

const capabilityData = {
  sectionLabel: 'Engineering Capability',
  heading: 'Develop Integrated Controls for Engineering and Regulated Delivery',
  description: 'This route builds engineering-specific controls capability — from integrated schedule, cost and risk management to audit-ready documentation and regulatory compliance.',
  features: [
    {
      icon: 'ri-git-merge-line',
      title: 'Integrated Controls',
      description: 'Manage schedule, cost and risk as one discipline across complex engineering and production environments.',
    },
    {
      icon: 'ri-truck-line',
      title: 'Supplier Milestone Tracking',
      description: 'Track supplier deliverables and interface milestones with the same rigour as internal production.',
    },
    {
      icon: 'ri-file-copy-line',
      title: 'Audit-Ready Documentation',
      description: 'Build AS9100, ISO 13485 and GxP compliance evidence into project controls routines.',
    },
  ],
};

const problemsData = {
  sectionLabel: 'Why This Route',
  heading: 'Engineering and Regulated Delivery Challenges That Integrated Controls Solve',
  cards: [
    {
      icon: 'ri-settings-line',
      title: 'Complex Production and Engineering Dependencies',
      description: 'A supplier delay in one area triggers knock-on effects across the entire production and assembly timeline.',
    },
    {
      icon: 'ri-truck-line',
      title: 'Supplier Delays Impacting Programme Milestones',
      description: 'External dependencies create gaps in visibility that undermine programme forecasts.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Quality and Regulatory Compliance Requirements',
      description: 'Audit-ready evidence compiled at the end of the programme, not built into controls from day one.',
    },
    {
      icon: 'ri-money-pound-circle-line',
      title: 'Cost Forecasting Across Long Production Cycles',
      description: 'Cost estimates rely on assumptions rather than earned value, variance analysis and forecast at completion.',
    },
    {
      icon: 'ri-building-line',
      title: 'Manufacturing and Technical Programme Control',
      description: 'Production managed in silos with no integrated view of programme health — leaving gaps nobody owns.',
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'Regulated Delivery and Documentation Requirements',
      description: 'Quality and compliance problems surface during final review — too late to correct without cost and delay.',
    },
  ],
};

const processData = {
  heading: 'From Siloed Production to Integrated Programme Control',
  subheading: 'A pathway for building integrated controls across engineering, manufacturing and regulated delivery programmes.',
  steps: [
    {
      number: '01',
      title: 'Connect the Data',
      description: 'Integrate schedule, cost, risk and supplier milestone data into one consistent programme view.',
    },
    {
      number: '02',
      title: 'Build Compliance In',
      description: 'Embed audit-ready documentation, quality checkpoints and regulatory evidence into project controls routines.',
    },
    {
      number: '03',
      title: 'Forecast with Confidence',
      description: 'Use earned value and variance analysis to give leadership real confidence in cost and schedule delivery.',
    },
  ],
};

const statsData = {
  sectionLabel: 'Engineering Value',
  heading: 'Built for Employers Who Need Integrated Controls in Regulated Environments',
  stats: [
    { value: '£27,000', label: 'Government funding band where eligible', icon: 'ri-funds-line' },
    { value: '3', label: 'Core areas: Schedule, Cost and Compliance', icon: 'ri-stack-line' },
    { value: '1', label: 'Route-fit consultation to confirm the best pathway', icon: 'ri-compass-3-line' },
  ],
  description: 'The Engineering PCP Route helps employers build integrated project controls capability in the people responsible for engineering, manufacturing and regulated delivery programmes.',
};

const chooseData = {
  heading: 'Choose the Right Access Route',
  routes: [
    {
      title: 'Apprenticeship Route',
      badge: 'Funding Subject to Eligibility',
      description: 'For eligible employers and learners in England. Suitable for engineering planners, manufacturing controllers, quality assurance professionals and production planners.',
      cta: 'Check Apprenticeship Eligibility',
      ctaHref: '/apprenticeship-eligibility-checker',
      highlighted: true,
    },
    {
      title: 'Commercial Route',
      badge: 'For Non-Eligible Learners',
      description: 'For self-funded professionals, self-employed learners or applicants who are not eligible for apprenticeship funding.',
      cta: 'Explore Commercial Route',
      ctaHref: '/commercial-project-controls-route',
      highlighted: false,
    },
  ],
};

const whoForData = {
  heading: 'Who Should Choose the Engineering & Aerospace Route?',
  professionals: {
    title: 'For Professionals',
    subtitle: 'Best suited to',
    items: [
      'Engineering Planners',
      'Manufacturing Controllers',
      'Quality Assurance Professionals',
      'Production Planners',
      'Cost Engineers',
      'PMO Analysts',
      'Regulatory Compliance Leads',
      'Supplier Programme Managers',
    ],
  },
  employers: {
    title: 'For Employers',
    subtitle: 'Best suited to organisations that need',
    items: [
      'Integrated schedule, cost and risk control',
      'Supplier milestone tracking and interface management',
      'Audit-ready documentation and compliance',
      'Evidence-based cost and schedule forecasting',
      'Internal engineering controls capability',
      'Structured progression for production teams',
    ],
  },
};

const developData = {
  heading: 'Engineering Capabilities Learners Develop',
  description: 'Each capability area builds directly on workplace practice and is assessed through real evidence.',
  capabilities: [
    { icon: 'ri-git-merge-line', title: 'Integrated Controls', description: 'Manage schedule, cost and risk as one discipline across complex environments.' },
    { icon: 'ri-truck-line', title: 'Supplier Tracking', description: 'Track supplier deliverables with the same rigour as internal production.' },
    { icon: 'ri-file-copy-line', title: 'Audit-Ready Docs', description: 'Build AS9100, ISO 13485 and GxP compliance into controls routines.' },
    { icon: 'ri-shield-check-line', title: 'Regulatory Compliance', description: 'Strengthen governance satisfying regulatory and customer requirements.' },
    { icon: 'ri-bar-chart-grouped-line', title: 'Reliable Forecasting', description: 'Earned value and variance analysis for leadership confidence.' },
    { icon: 'ri-award-line', title: 'APM ChPP Readiness', description: 'Professional evidence towards Chartered status with engineering portfolio.' },
  ],
};


const finalCtaData = {
  heading: 'Ready to Build Stronger Engineering Project Controls?',
  description: 'Request a consultation and we will help you understand the route, funding position, eligibility and next steps.',
  primaryCta: 'Request a consultation',
  primaryHref: '/book-a-session',
  secondaryCta: 'Check Funding Eligibility',
  secondaryHref: '/apprenticeship-eligibility-checker',
};

const faqData = {
  heading: 'Engineering & Aerospace PCP Route FAQs',
  faqs: [
    { q: 'Is this route suitable for engineering and manufacturing?', a: 'Yes. This Operational PCP route is tailored for engineering, manufacturing, aerospace, medicals and pharmaceutical sectors. It addresses regulated delivery, complex production dependencies and quality compliance.' },
    { q: 'What makes this different from the construction route?', a: 'While core project controls skills are the same, this route focuses on manufacturing and engineering-specific challenges: supplier milestone tracking, regulated documentation, quality compliance and technical programme control.' },
    { q: 'Which roles benefit most?', a: 'Planners, cost engineers, project controllers, quality assurance professionals, production planners and PMO analysts in engineering, manufacturing, aerospace, medical devices and pharmaceuticals.' },
    { q: 'How does this support regulated industries?', a: 'The programme emphasises audit-ready documentation, governance frameworks and compliance-aware project controls. Relevant for aerospace (AS9100), medical devices (ISO 13485) and pharmaceuticals (GxP) environments.' },
    { q: 'Can apprenticeship funding support this route?', a: 'The Level 6 standard has a maximum funding band of £27,000. The amount available depends on the current rules, learner age, employer status and available levy funds. Funding is confirmed only after an individual eligibility review.' },
    { q: 'What determines the employer contribution?', a: 'For starts from 1 August 2026, contribution rates vary by learner age, whether the employer pays the levy and whether sufficient levy funds are available. Workplace location, role relevance, prior learning and the applicable start-date rules must also be checked.' },
    { q: 'How is the programme delivered?', a: 'Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks.' },
    { q: 'Can employers enrol multiple learners?', a: 'Yes. Many employers enrol cohorts across planning, cost, risk and quality functions. Group delivery can be arranged for organisations building controls capability at scale.' },
  ],
};

export const sectorConfig = { slug: 'engineering', label: 'Engineering', navLinks, hero: heroData, capability: capabilityData, problems: problemsData, process: processData, stats: statsData, choose: chooseData, whoFor: whoForData, develop: developData,  finalCta: finalCtaData, faq: faqData } satisfies SectorRouteConfig;
