export const navLinks = [
  { label: 'Combined Route', href: '#hero' },
  { label: 'Who It Is For', href: '#who-for' },
  { label: 'Funding', href: '/apprenticeship-eligibility-checker' },
  { label: 'Outcomes', href: '#develop' },
  { label: 'FAQ', href: '#faq' },
];

export const heroData = {
  badge: 'Funding Subject to Eligibility',
  headline: 'Manage the Detail. Explain the Variance. Influence the Decision.',
  subheadline: 'A premium pathway combining Level 6 project controls capability with strategic development and OTHM Level 7 progression for professionals moving towards senior project, PMO and portfolio leadership.',
  description: 'Most development programmes make you choose between technical and strategic. The combined pathway builds both — giving you the technical depth to manage the controls and the strategic capability to influence the decisions.',
  fundingLine: 'Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility. Commercial routes are available for self-funded and non-eligible learners.',
  primaryCta: 'Request a consultation',
  secondaryCta: 'Check Funding Eligibility',
  commercialLink: '/commercial-project-controls-route',
  trustItems: [
    { icon: 'ri-checkbox-circle-fill', text: 'Funding Subject to Eligibility' },
    { icon: 'ri-funds-fill', text: 'Up to £27,000 Government Funding Band' },
    { icon: 'ri-award-fill', text: 'OTHM Level 7 Diploma Progression' },
    { icon: 'ri-building-2-fill', text: 'Workplace Evidence Support' },
  ],
  dashboardTitle: 'Combined Controls Dashboard',
  routeTitle: 'Strategic + Operational PCP',
  routeSubtitle: 'Technical · Strategic · Leadership · OTHM Level 7',
  accentColor: '#3FA7A3',
  metrics: {
    governance: '85%',
    pmoMaturity: '3.6',
    risk: 'Low',
    forecast: 'Confident',
    decision: 'Supported',
    chartLabel: 'Combined Capability Growth',
    chartValue: '+18%',
    chartBars: [35, 42, 48, 55, 58, 62, 68, 72, 78, 82, 86, 92],
  },
};

export const capabilityData = {
  sectionLabel: 'Combined Capability',
  heading: 'Develop Technical Depth and Strategic Leadership Together',
  description: 'This route is designed for experienced professionals who need both hands-on controls capability and the strategic confidence to influence programme decisions.',
  features: [
    {
      icon: 'ri-settings-line',
      title: 'Technical Mastery',
      description: 'Build deep competence in planning, scheduling, cost engineering, risk management and performance reporting.',
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Strategic Influence',
      description: 'Develop governance, assurance, executive reporting and decision-support capability that shapes programme outcomes.',
    },
    {
      icon: 'ri-award-line',
      title: 'OTHM Level 7 Progression',
      description: 'Progress towards the OTHM Diploma Level 7 in Project Management with Strategy and Leadership focus.',
    },
  ],
};

export const problemsData = {
  sectionLabel: 'Why This Route',
  heading: 'Technical Depth Without Strategic Voice. Or Strategic Awareness Without Technical Credibility.',
  cards: [
    {
      icon: 'ri-close-line',
      title: 'Technical Depth Without Strategic Influence',
      description: 'You can build the schedule, track the cost and manage the risk — but you struggle to turn that data into decisions that shape programme outcomes.',
    },
    {
      icon: 'ri-close-line',
      title: 'Strategic Awareness Without Technical Credibility',
      description: 'You understand governance and executive reporting — but when challenged on the numbers, you lack the technical depth to defend your position.',
    },
    {
      icon: 'ri-close-line',
      title: 'Career Ceiling Without Leadership Pathway',
      description: 'Promoted for technical excellence, but stuck at the ceiling because you have not built the strategic and leadership capability senior roles demand.',
    },
    {
      icon: 'ri-close-line',
      title: 'Employers Need Both, But Training Only Gives One',
      description: 'Most development programmes force you to choose between technical and strategic — leaving you with half the capability your role requires.',
    },
  ],
};

export const processData = {
  heading: 'From Project Controls to Programme Leadership',
  subheading: 'A premium pathway for professionals who need both technical credibility and strategic influence.',
  steps: [
    {
      number: '01',
      title: 'Master the Controls',
      description: 'Build deep technical competence in planning, cost, risk, change and performance reporting across complex programmes.',
    },
    {
      number: '02',
      title: 'Develop Strategic Voice',
      description: 'Learn to interpret controls data, explain variance and translate insight into options senior stakeholders can act on.',
    },
    {
      number: '03',
      title: 'Progress to Leadership',
      description: 'Apply combined capability through OTHM Level 7 progression, building the strategic leadership that opens senior roles.',
    },
  ],
};

export const statsData = {
  sectionLabel: 'Combined Value',
  heading: 'Built for Employers Who Need Both Technical and Strategic Capability',
  stats: [
    { value: '£27,000', label: 'Government funding band where eligible', icon: 'ri-funds-line' },
    { value: '2', label: 'Combined capability tracks: Operational + Strategic', icon: 'ri-stack-line' },
    { value: '7', label: 'OTHM Level 7 Diploma progression included', icon: 'ri-award-line' },
  ],
  description: 'The Strategic + Operational PCP Route builds the complete professional — combining technical mastery with strategic leadership for employers investing in future project controls capability.',
};

export const chooseData = {
  heading: 'Choose the Right Access Route',
  routes: [
    {
      title: 'Apprenticeship Route',
      badge: 'Funding Subject to Eligibility',
      description: 'For eligible employers and learners in England. Suitable for experienced professionals in roles connected to PMO, governance, project controls, reporting, risk, planning, cost or programme delivery.',
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

export const whoForData = {
  heading: 'Who Should Choose the Strategic + Operational Route?',
  professionals: {
    title: 'For Professionals',
    subtitle: 'Best suited to',
    items: [
      'Experienced Project Controls Professionals',
      'Senior PMO Professionals',
      'Project Managers Moving Into Controls Leadership',
      'Programme Controllers Seeking Career Progression',
      'Future Heads of Project Controls',
      'Portfolio Analysts',
      'Risk and Planning Leads',
      'Strategic Planners',
    ],
  },
  employers: {
    title: 'For Employers',
    subtitle: 'Best suited to organisations that need',
    items: [
      'Technical depth and strategic leadership combined',
      'Internal project controls leaders with board confidence',
      'OTHM Level 7 progression for high-potential staff',
      'Stronger PMO maturity and governance',
      'Improved cost, schedule and risk challenge',
      'Structured progression for future programme leaders',
    ],
  },
};

export const developData = {
  heading: 'Combined Capabilities Learners Develop',
  description: 'Each capability area builds directly on workplace practice and is assessed through real evidence.',
  capabilities: [
    { icon: 'ri-settings-line', title: 'Technical Mastery', description: 'Deep competence in planning, scheduling, cost engineering, risk and performance reporting.' },
    { icon: 'ri-lightbulb-line', title: 'Strategic Leadership', description: 'Governance, assurance, executive reporting and decision-support capability.' },
    { icon: 'ri-award-line', title: 'OTHM Level 7 Progression', description: 'Strategy and leadership development towards OTHM Diploma Level 7.' },
    { icon: 'ri-user-voice-line', title: 'One-to-One Coaching', description: 'Personalised support from experienced practitioners throughout your journey.' },
    { icon: 'ri-building-line', title: 'London Master Class Events', description: 'In-person professional development with industry peers and expert practitioners.' },
    { icon: 'ri-shield-check-line', title: 'APM ChPP Readiness', description: 'Structured evidence preparation and professional support towards Chartered status.' },
  ],
};

export const finalCtaData = {
  heading: 'Ready to Build Complete Project Controls Capability?',
  description: 'Request a consultation and we will help you understand the combined pathway, funding position, eligibility and next steps.',
  primaryCta: 'Request a consultation',
  primaryHref: '/book-a-session',
  secondaryCta: 'Check Funding Eligibility',
  secondaryHref: '/apprenticeship-eligibility-checker',
};

export const faqData = {
  heading: 'Strategic + Operational PCP Route FAQs',
  faqs: [
    { q: 'What is the Strategic + Operational combined route?', a: 'This premium pathway combines the hands-on project controls skills of the Operational route with the governance, assurance and leadership capability of the Strategic route. It also includes OTHM Level 7 Diploma progression for professionals moving towards senior project, PMO and portfolio leadership.' },
    { q: 'Who is this route designed for?', a: 'Experienced project controls professionals, senior PMO professionals, project managers moving into controls leadership, and employers building future project controls leaders who need both technical and strategic capability.' },
    { q: 'How long does the combined route take?', a: 'Typically 2 years, with the Strategic and Operational modules running in parallel. The OTHM Level 7 Diploma progression continues beyond the apprenticeship, supported by Saturday workshops focused on Strategy and Leadership.' },
    { q: 'What professional recognition does it lead to?', a: 'APM ChPP readiness support, PMO leadership development, OTHM Level 7 Diploma in Project Management, and professional membership support. This is the most comprehensive professional development pathway we offer.' },
    { q: 'Can my employer support this route?', a: 'Yes. The combined route can connect immediate controls capability with longer-term leadership development. Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.' },
    { q: 'Can apprenticeship funding support this route?', a: 'The Level 6 standard has a maximum funding band of £27,000. The amount available depends on the current rules, learner age, employer status and available levy funds. Funding is confirmed only after an individual eligibility review.' },
    { q: 'What determines the employer contribution?', a: 'For starts from 1 August 2026, contribution rates vary by learner age, whether the employer pays the levy and whether sufficient levy funds are available. Workplace location, role relevance, prior learning and the applicable start-date rules must also be checked.' },
    { q: 'How do I book a consultation?', a: 'Complete the consultation form on this page or email us directly. A member of our team will arrange a one-to-one discussion to understand your role, organisation and funding position.' },
  ],
};
