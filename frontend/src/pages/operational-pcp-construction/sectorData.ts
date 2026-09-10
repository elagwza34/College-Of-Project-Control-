import type { SectorRouteConfig } from '@/components/feature/RouteLanding/SectorRoutePage';
const navLinks = [
  { label: 'Construction Route', href: '#hero' },
  { label: 'Who It Is For', href: '#who-for' },
  { label: 'Funding', href: '/apprenticeship-eligibility-checker' },
  { label: 'Outcomes', href: '#develop' },
  { label: 'FAQ', href: '#faq' },
];

const heroData = {
  badge: 'Funding Subject to Eligibility',
  headline: 'Stop Letting Schedule Delays and Cost Drift Become Normal on Your Construction Programmes.',
  headlineHighlight: 'Schedule Delays and Cost Drift',
  subheadline: 'A Level 6 pathway where eligible, designed for construction professionals who manage schedules, cost, NEC change control and reporting across build programmes.',
  description: 'Delay and cost drift are not inevitable. They are symptoms of weak project controls capability. Build the discipline to see problems earlier and control them faster — on every construction programme.',
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
  sectorImage: 'https://readdy.ai/api/search-image?query=Abstract%20geometric%20construction%20crane%20and%20steel%20building%20framework%20silhouette%2C%20warm%20burnt%20orange%20and%20concrete%20grey%20tones%2C%20minimalist%20editorial%20illustration%20style%2C%20clean%20lines%2C%20no%20people%2C%20professional%20business%20aesthetic%2C%20soft%20gradient%20background&width=600&height=400&seq=construction-sector-2026&orientation=landscape',
  sectorLabel: 'Construction',
  accentColor: '#D6A85F',
  metrics: {
    governance: '68%',
    pmoMaturity: '2.6',
    risk: 'Med',
    forecast: 'Caution',
    decision: 'Review',
    chartLabel: 'Earned Value Performance',
    chartValue: '+5%',
    chartBars: [25, 35, 32, 42, 40, 48, 45, 55, 52, 60, 58, 65],
  },
};

const capabilityData = {
  sectionLabel: 'Construction Capability',
  heading: 'Develop Construction Project Controls That Reduce Delay and Cost Drift',
  description: 'This route builds construction-specific controls capability — from NEC contract management and scheduling to subcontractor coordination and evidence-based reporting.',
  features: [
    {
      icon: 'ri-ruler-line',
      title: 'Construction Schedule Mastery',
      description: 'Develop structured, logic-linked schedules with realistic baselines and critical path analysis for build programmes.',
    },
    {
      icon: 'ri-money-pound-circle-line',
      title: 'Earned Value & Cost Tracking',
      description: 'Track cost performance against baseline with variance analysis and forecast at completion.',
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'NEC Change Control Discipline',
      description: 'Build rigorous change control processes that protect commercial position and maintain contract compliance.',
    },
  ],
};

const problemsData = {
  sectionLabel: 'Why This Route',
  heading: 'Construction Delivery Challenges That Stronger Controls Solve',
  cards: [
    {
      icon: 'ri-time-line',
      title: 'Schedule Delays on Complex Build Programmes',
      description: 'Critical path issues surface too late to take corrective action before the delay impacts delivery.',
    },
    {
      icon: 'ri-money-pound-circle-line',
      title: 'Cost Overruns Eroding Project Margins',
      description: 'Cost reports arrive after spending decisions have been made — no chance to course-correct.',
    },
    {
      icon: 'ri-link-unlink',
      title: 'Subcontractor Coordination Across Multiple Packages',
      description: 'Multiple packages and interfaces create gaps in visibility that nobody owns or tracks.',
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'NEC Contract Change Control Administration',
      description: 'Change is treated as paperwork rather than a commercial discipline that protects position.',
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Inconsistent Progress Reporting Across Sites',
      description: 'Stakeholders receive status updates that describe what happened, not what is about to happen.',
    },
    {
      icon: 'ri-ruler-line',
      title: 'Weak Baseline Management Leading to Scope Creep',
      description: 'Baselines drift without structured change control, undermining forecast confidence.',
    },
  ],
};

const processData = {
  heading: 'From Construction Chaos to Controlled Delivery',
  subheading: 'A practical pathway for turning construction project controls into reliable delivery performance.',
  steps: [
    {
      number: '01',
      title: 'Plan with Discipline',
      description: 'Build structured, logic-linked schedules with realistic baselines and critical path analysis for every build programme.',
    },
    {
      number: '02',
      title: 'Control Cost and Change',
      description: 'Track earned value, manage NEC change control and maintain baseline integrity throughout the programme lifecycle.',
    },
    {
      number: '03',
      title: 'Report with Evidence',
      description: 'Deliver progress reports based on milestones, deliverables and earned value — not opinion or guesswork.',
    },
  ],
};

const statsData = {
  sectionLabel: 'Construction Value',
  heading: 'Built for Employers Who Need Reliable Construction Delivery Control',
  stats: [
    { value: '£27,000', label: 'Government funding band where eligible', icon: 'ri-funds-line' },
    { value: '3', label: 'Core areas: Schedule, Cost and NEC Control', icon: 'ri-stack-line' },
    { value: '1', label: 'Route-fit consultation to confirm the best pathway', icon: 'ri-compass-3-line' },
  ],
  description: 'The Construction PCP Route helps employers build internal project controls capability in the people responsible for planning, cost, NEC change control and delivery reporting on construction programmes.',
};

const chooseData = {
  heading: 'Choose the Right Access Route',
  routes: [
    {
      title: 'Apprenticeship Route',
      badge: 'Funding Subject to Eligibility',
      description: 'For eligible employers and learners in England. Suitable for construction planners, schedulers, cost engineers and project controllers on build programmes.',
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
  heading: 'Who Should Choose the Construction PCP Route?',
  professionals: {
    title: 'For Professionals',
    subtitle: 'Best suited to',
    items: [
      'Construction Planners',
      'Site-Based Schedulers',
      'Cost Engineers',
      'Project Controllers',
      'Assistant Project Managers',
      'Delivery Team Members',
      'NEC Contract Administrators',
      'Progress Report Writers',
    ],
  },
  employers: {
    title: 'For Employers',
    subtitle: 'Best suited to organisations that need',
    items: [
      'Stronger construction schedule discipline',
      'Better cost and earned value visibility',
      'Rigorous NEC change control',
      'Evidence-based progress reporting',
      'Internal construction controls capability',
      'Structured progression for build teams',
    ],
  },
};

const developData = {
  heading: 'Construction Capabilities Learners Develop',
  description: 'Each capability area builds directly on workplace practice and is assessed through real evidence.',
  capabilities: [
    { icon: 'ri-ruler-line', title: 'Construction Scheduling', description: 'Structured, logic-linked schedules with critical path analysis for build programmes.' },
    { icon: 'ri-money-pound-circle-line', title: 'Earned Value & Cost', description: 'Track cost performance with variance analysis and forecast at completion.' },
    { icon: 'ri-file-list-3-line', title: 'NEC Change Control', description: 'Rigorous change control processes protecting commercial position and compliance.' },
    { icon: 'ri-dashboard-line', title: 'Site-Level Reporting', description: 'Evidence-based progress tracking across multiple sites and subcontractors.' },
    { icon: 'ri-shield-check-line', title: 'Subcontractor Coordination', description: 'Structured interface management reducing gaps between packages.' },
    { icon: 'ri-user-star-line', title: 'APM ChPP Readiness', description: 'Professional evidence towards Chartered status with construction portfolio.' },
  ],
};


const finalCtaData = {
  heading: 'Ready to Build Stronger Construction Project Controls?',
  description: 'Request a consultation and we will help you understand the route, funding position, eligibility and next steps.',
  primaryCta: 'Request a consultation',
  primaryHref: '/book-a-session',
  secondaryCta: 'Check Funding Eligibility',
  secondaryHref: '/apprenticeship-eligibility-checker',
};

const faqData = {
  heading: 'Construction PCP Route FAQs',
  faqs: [
    { q: 'Is this route specific to construction project controls?', a: 'Yes. This Operational PCP route is tailored for construction, building and urban development programmes. It focuses on NEC contract management, scheduling for build programmes, subcontractor coordination and construction-specific progress reporting.' },
    { q: 'What construction-specific skills will I develop?', a: 'NEC change control, construction programme scheduling, critical path analysis for build sequences, subcontractor progress tracking, earned value on construction projects, and construction-specific risk and cost management.' },
    { q: 'Who is this route for?', a: 'Planners, schedulers, cost engineers, project controllers and PMO analysts working in construction, building, urban development and civil engineering. Also suitable for assistant project managers and site-based project support staff moving into project controls.' },
    { q: 'How does this support my construction career?', a: 'The programme builds directly applicable skills for construction project controls. Workplace evidence is gathered from your actual construction projects. This makes the qualification immediately relevant to your employer and your career progression.' },
    { q: 'Can apprenticeship funding support this route?', a: 'The Level 6 standard has a maximum funding band of £27,000. The amount available depends on the current rules, learner age, employer status and available levy funds. Funding is confirmed only after an individual eligibility review.' },
    { q: 'What determines the employer contribution?', a: 'For starts from 1 August 2026, contribution rates vary by learner age, whether the employer pays the levy and whether sufficient levy funds are available. Workplace location, role relevance, prior learning and the applicable start-date rules must also be checked.' },
    { q: 'How is the programme delivered?', a: 'Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks.' },
    { q: 'Can employers enrol multiple learners?', a: 'Yes. Many employers enrol cohorts across planning, cost, risk and PMO functions. Group delivery can be arranged for organisations building controls capability at scale.' },
  ],
};

export const sectorConfig = { slug: 'construction', label: 'Construction', navLinks, hero: heroData, capability: capabilityData, problems: problemsData, process: processData, stats: statsData, choose: chooseData, whoFor: whoForData, develop: developData,  finalCta: finalCtaData, faq: faqData } satisfies SectorRouteConfig;
