import type { SectorRouteConfig } from '@/components/feature/RouteLanding/SectorRoutePage';
const navLinks = [
  { label: 'Public Sector Route', href: '#hero' },
  { label: 'Who It Is For', href: '#who-for' },
  { label: 'Funding', href: '/apprenticeship-eligibility-checker' },
  { label: 'Outcomes', href: '#develop' },
  { label: 'FAQ', href: '#faq' },
];

const heroData = {
  badge: 'Funding Subject to Eligibility',
  headline: 'Build Project Controls Capability for Public Money, Public Scrutiny and Better Delivery Confidence.',
  headlineHighlight: 'Public Money, Public Scrutiny',
  subheadline: 'A Level 6 pathway where eligible, designed for public sector professionals managing project controls across government, council and public service programmes.',
  description: 'Public sector programme delivery faces unique pressures: value-for-money, public accountability, audit requirements and political scrutiny. Build the controls capability that turns these pressures into delivery confidence.',
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
  sectorImage: 'https://readdy.ai/api/search-image?query=Abstract%20classical%20government%20building%20with%20column%20architecture%20and%20modern%20geometric%20overlay%2C%20sage%20green%20and%20warm%20stone%20tones%2C%20minimalist%20editorial%20illustration%2C%20no%20people%2C%20professional%20institutional%20aesthetic%2C%20soft%20gradient%20background&width=600&height=400&seq=public-sector-2026&orientation=landscape',
  sectorLabel: 'Public Sector',
  accentColor: '#123B4A',
  metrics: {
    governance: '74%',
    pmoMaturity: '2.9',
    risk: 'Med',
    forecast: 'Stable',
    decision: 'Review',
    chartLabel: 'Benefits Realisation Tracking',
    chartValue: '+11%',
    chartBars: [28, 36, 35, 45, 42, 52, 50, 58, 56, 66, 64, 74],
  },
};

const capabilityData = {
  sectionLabel: 'Public Sector Capability',
  heading: 'Develop Project Controls for Public Accountability and Better Delivery',
  description: 'This route builds public sector-specific controls capability — from value-for-money governance and audit-ready evidence to benefits realisation and transparent reporting.',
  features: [
    {
      icon: 'ri-dashboard-line',
      title: 'Decision-Ready Reporting',
      description: 'Programme reports that satisfy elected members, scrutiny committees and external audit while driving better decisions.',
    },
    {
      icon: 'ri-government-line',
      title: 'Better Governance',
      description: 'Structured governance frameworks with clear accountability and decision-making authority across complex structures.',
    },
    {
      icon: 'ri-alert-line',
      title: 'Risk & Issue Management',
      description: 'Risk frameworks that surface issues early and track mitigations to closure with public accountability.',
    },
  ],
};

const problemsData = {
  sectionLabel: 'Why This Route',
  heading: 'Public Sector Delivery Challenges That Stronger Controls Address',
  cards: [
    {
      icon: 'ri-money-pound-circle-line',
      title: 'Value-for-Money Pressure on Public Programmes',
      description: 'Every pound of public money must demonstrate return — weak controls make this impossible to prove.',
    },
    {
      icon: 'ri-eye-line',
      title: 'Public Accountability and Scrutiny',
      description: 'Programme reports produced to satisfy audit rather than drive better delivery — creating a defensive culture.',
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'Governance and Audit Requirements',
      description: 'Teams worry about audit findings because controls are not designed for assurance from the start.',
    },
    {
      icon: 'ri-link-unlink',
      title: 'Complex Supplier Ecosystems and Frameworks',
      description: 'Multiple suppliers and framework agreements create gaps in visibility and accountability.',
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Programme Reporting to Multiple Stakeholders',
      description: 'Reports that explain the past but do not inform the next decision — too late to act.',
    },
    {
      icon: 'ri-arrow-up-circle-line',
      title: 'Benefits Realisation and Outcomes Tracking',
      description: 'Benefits tracking lost in the gap between delivery and handover — outcomes never materialise.',
    },
  ],
};

const processData = {
  heading: 'From Reactive Scrutiny to Proactive Delivery Confidence',
  subheading: 'A pathway for turning public sector pressures into delivery confidence and public trust.',
  steps: [
    {
      number: '01',
      title: 'Govern with Structure',
      description: 'Establish clear accountability, defined ownership and structured governance that satisfies scrutiny and drives decisions.',
    },
    {
      number: '02',
      title: 'Report with Evidence',
      description: 'Build audit-ready evidence and transparent reporting into project controls from day one — not as an afterthought.',
    },
    {
      number: '03',
      title: 'Track the Benefits',
      description: 'Integrate benefits realisation with programme controls from business case through to operational handover.',
    },
  ],
};

const statsData = {
  sectionLabel: 'Public Sector Value',
  heading: 'Built for Public Sector Employers Who Need Better Delivery Confidence',
  stats: [
    { value: '£27,000', label: 'Government funding band where eligible', icon: 'ri-funds-line' },
    { value: '3', label: 'Core areas: Governance, Reporting and Benefits', icon: 'ri-stack-line' },
    { value: '1', label: 'Route-fit consultation to confirm the best pathway', icon: 'ri-compass-3-line' },
  ],
  description: 'The Public Sector PCP Route helps employers build project controls capability that strengthens public trust, political confidence and delivery performance.',
};

const chooseData = {
  heading: 'Choose the Right Access Route',
  routes: [
    {
      title: 'Apprenticeship Route',
      badge: 'Funding Subject to Eligibility',
      description: 'For eligible employers and learners in England. Suitable for council project controllers, government PMO analysts, public sector planners and NHS programme staff.',
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
  heading: 'Who Should Choose the Public Sector Route?',
  professionals: {
    title: 'For Professionals',
    subtitle: 'Best suited to',
    items: [
      'Council Project Controllers',
      'Government PMO Analysts',
      'Public Sector Planners',
      'NHS Programme Staff',
      'Transport Authority Staff',
      'Benefits Realisation Leads',
      'Local Authority Officers',
      'Public Service Delivery Teams',
    ],
  },
  employers: {
    title: 'For Employers',
    subtitle: 'Best suited to organisations that need',
    items: [
      'Better governance and public accountability',
      'Audit-ready evidence and transparent reporting',
      'Value-for-money assurance',
      'Benefits realisation tracking',
      'Internal public sector controls capability',
      'Structured progression for programme teams',
    ],
  },
};

const developData = {
  heading: 'Public Sector Capabilities Learners Develop',
  description: 'Each capability area builds directly on workplace practice and is assessed through real evidence.',
  capabilities: [
    { icon: 'ri-dashboard-line', title: 'Decision-Ready Reporting', description: 'Reports that satisfy scrutiny while driving better delivery decisions.' },
    { icon: 'ri-government-line', title: 'Better Governance', description: 'Structured frameworks with clear accountability and authority.' },
    { icon: 'ri-alert-line', title: 'Risk & Issue Management', description: 'Risk frameworks surfacing issues early with public accountability.' },
    { icon: 'ri-eye-line', title: 'Clearer Accountability', description: 'Defined ownership of programme outcomes across complex structures.' },
    { icon: 'ri-file-list-3-line', title: 'Audit-Ready Evidence', description: 'Controls designed for assurance, reducing audit burden.' },
    { icon: 'ri-shield-check-line', title: 'Delivery Confidence', description: 'Evidence-based forecasting strengthening public trust in delivery.' },
  ],
};


const finalCtaData = {
  heading: 'Ready to Build Stronger Public Sector Project Controls?',
  description: 'Request a consultation and we will help you understand the route, funding position, eligibility and next steps.',
  primaryCta: 'Request a consultation',
  primaryHref: '/book-a-session',
  secondaryCta: 'Check Funding Eligibility',
  secondaryHref: '/apprenticeship-eligibility-checker',
};

const faqData = {
  heading: 'Public Sector PCP Route FAQs',
  faqs: [
    { q: 'Is this route tailored for public sector project controls?', a: 'Yes. This Operational PCP route is specifically designed for public sector, council and government delivery contexts. It addresses value-for-money requirements, public accountability, governance frameworks and benefits realisation.' },
    { q: 'Who is this route for?', a: 'Project controllers, PMO analysts, planners, schedulers and cost engineers working in local authorities, central government, NHS trusts, education, transport authorities, and other public sector bodies.' },
    { q: 'How does the apprenticeship levy affect public sector employers?', a: 'Public sector organisations that pay the apprenticeship levy can use their levy funds to cover the cost of this programme. Many public sector bodies have significant levy pots that can be used to support project controls capability development.' },
    { q: 'How does this support public accountability?', a: 'The programme emphasises audit-ready evidence, transparent reporting, governance frameworks and benefits realisation tracking — all essential for demonstrating value-for-money and public accountability.' },
    { q: 'Can apprenticeship funding support this route?', a: 'The Level 6 standard has a maximum funding band of £27,000. The amount available depends on the current rules, learner age, employer status and available levy funds. Funding is confirmed only after an individual eligibility review.' },
    { q: 'What determines the employer contribution?', a: 'For starts from 1 August 2026, contribution rates vary by learner age, whether the employer pays the levy and whether sufficient levy funds are available. Workplace location, role relevance, prior learning and the applicable start-date rules must also be checked.' },
    { q: 'How is the programme delivered?', a: 'Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks.' },
    { q: 'Can employers enrol multiple learners?', a: 'Yes. Many employers enrol cohorts across programme controls, planning and governance functions. Group delivery can be arranged for organisations building capability at scale.' },
  ],
};

export const sectorConfig = { slug: 'public-sector', label: 'Public Sector', navLinks, hero: heroData, capability: capabilityData, problems: problemsData, process: processData, stats: statsData, choose: chooseData, whoFor: whoForData, develop: developData,  finalCta: finalCtaData, faq: faqData } satisfies SectorRouteConfig;
