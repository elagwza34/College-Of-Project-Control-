import { formatGBP } from '@/data/apprenticeshipFundingPolicy';
import { apprenticeshipFundingPolicy } from '@/data/apprenticeshipFundingPolicy';
import { PCP_L6 } from '@/data/programmeFacts';

/** Maximum apprenticeship funding band for the ST0845 standard. */
const pcpFundingBand = formatGBP(PCP_L6?.fundingBandMaximum ?? 0);
import type { SectorRouteConfig } from '@/components/feature/RouteLanding/SectorRoutePage';
const navLinks = [
  { label: 'Energy Route', href: '#hero' },
  { label: 'Who It Is For', href: '#who-for' },
  { label: 'Funding', href: '/apprenticeship-eligibility-checker' },
  { label: 'Outcomes', href: '#develop' },
];

const heroData = {
  badge: 'Funding Subject to Eligibility',
  headline: 'For Capital Programmes Where Weak Controls Are Too Expensive to Ignore.',
  headlineHighlight: 'Weak Controls Are Too Expensive to Ignore',
  subheadline: 'A Level 6 pathway where eligible, designed for professionals managing project controls across energy, utilities and capital programmes.',
  description: 'In capital programmes, the cost of weak controls compounds over years — not months. Build the capability to protect programme outcomes from day one with integrated cost, schedule, risk and governance control.',
  fundingLine: 'Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility. Commercial routes are available for self-funded and non-eligible learners.',
  primaryCta: 'Request a consultation',
  secondaryCta: 'Check Funding Eligibility',
  commercialLink: '/commercial-project-controls-route',
  trustItems: [
    { icon: 'ri-checkbox-circle-fill', text: 'Funding Subject to Eligibility' },
    { icon: 'ri-funds-fill', text: `Up to ${pcpFundingBand} Government Funding Band` },
    { icon: 'ri-award-fill', text: 'APM ChPP Readiness Support' },
    { icon: 'ri-building-2-fill', text: 'Workplace Evidence Support' },
  ],
  sectorImage: 'https://readdy.ai/api/search-image?query=Abstract%20offshore%20oil%20platform%20and%20wind%20turbine%20silhouettes%2C%20deep%20teal%20and%20navy%20blue%20tones%2C%20geometric%20minimalist%20style%2C%20clean%20editorial%20illustration%2C%20no%20people%2C%20professional%20energy%20sector%20aesthetic%2C%20soft%20gradient%20background&width=600&height=400&seq=energy-sector-2026&orientation=landscape',
  sectorLabel: 'Energy & Net Zero',
  accentColor: '#3FA7A3',
  metrics: {
    governance: '76%',
    pmoMaturity: '3.0',
    risk: 'Med',
    forecast: 'Stable',
    decision: 'Review',
    chartLabel: 'Integrated Forecast Confidence',
    chartValue: '+10%',
    chartBars: [32, 40, 38, 48, 46, 55, 52, 62, 60, 70, 68, 78],
  },
};

const capabilityData = {
  sectionLabel: 'Capital Capability',
  heading: 'Develop Integrated Project Controls for Energy and Capital Programmes',
  description: 'This route builds capital programme controls capability — from baseline management and integrated forecasting to contractor governance and regulatory assurance.',
  features: [
    {
      icon: 'ri-ruler-line',
      title: 'Baseline Control',
      description: 'Rigorous baseline management and change control protecting programme integrity from initiation to close.',
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Integrated Forecasting',
      description: 'Earned value, variance analysis and integrated forecasting that gives leadership real programme confidence.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Assurance Governance',
      description: 'Reporting frameworks that satisfy internal governance, regulatory requirements and stakeholder expectations.',
    },
  ],
};

const problemsData = {
  sectionLabel: 'Why This Route',
  heading: 'Energy and Capital Programme Challenges That Integrated Controls Solve',
  cards: [
    {
      icon: 'ri-building-line',
      title: 'Capital Programme Complexity and Scale',
      description: 'Multi-billion pound programmes with long lifecycles where small control gaps compound into major overruns.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Safety and Regulatory Requirements',
      description: 'Regulatory oversight demands audit-ready evidence and transparent reporting that weak controls cannot provide.',
    },
    {
      icon: 'ri-time-line',
      title: 'Long Lead Times and Supply Chain Constraints',
      description: 'Supplier delays and interface issues create knock-on effects across the entire programme timeline.',
    },
    {
      icon: 'ri-link-unlink',
      title: 'Multi-Contractor Delivery Coordination',
      description: 'Multiple contractors and interfaces create gaps in visibility and accountability that nobody owns.',
    },
    {
      icon: 'ri-alert-line',
      title: 'Risk Exposure Across Asset Lifecycles',
      description: 'Risk and issues surfaced too late to influence key programme decisions — after the damage is already done.',
    },
    {
      icon: 'ri-money-pound-circle-line',
      title: 'Cost Assurance Across Capital Spend',
      description: 'Cost forecasts based on hope rather than earned value, variance analysis and evidence-based tracking.',
    },
  ],
};

const processData = {
  heading: 'From Fragmented Controls to Integrated Programme Confidence',
  subheading: 'A pathway for building integrated cost, schedule and risk control across capital programmes.',
  steps: [
    {
      number: '01',
      title: 'Integrate the Controls',
      description: 'Manage cost, schedule and risk as one discipline with consistent frameworks and shared accountability.',
    },
    {
      number: '02',
      title: 'Forecast with Evidence',
      description: 'Use earned value, variance analysis and forecast at completion to give leadership real programme confidence.',
    },
    {
      number: '03',
      title: 'Assure the Outcomes',
      description: 'Build project controls designed for assurance from day one — satisfying regulatory and stakeholder requirements.',
    },
  ],
};

const statsData = {
  sectionLabel: 'Capital Value',
  heading: 'Built for Employers Who Need Integrated Capital Programme Control',
  stats: [
    { value: pcpFundingBand, label: 'Government funding band where eligible', icon: 'ri-funds-line' },
    { value: '3', label: 'Core areas: Baseline, Forecast and Governance', icon: 'ri-stack-line' },
    { value: '1', label: 'Route-fit consultation to confirm the best pathway', icon: 'ri-compass-3-line' },
  ],
  description: 'The Energy PCP Route helps employers build integrated project controls capability in the people responsible for capital programme delivery, forecasting and governance.',
};

const chooseData = {
  heading: 'Choose the Right Access Route',
  routes: [
    {
      title: 'Apprenticeship Route',
      badge: 'Funding Subject to Eligibility',
      description: 'For eligible employers and learners in England. Suitable for energy project controllers, utilities planners, cost engineers and capital programme staff.',
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
  heading: 'Who Should Choose the Energy & Net Zero Route?',
  professionals: {
    title: 'For Professionals',
    subtitle: 'Best suited to',
    items: [
      'Energy Project Controllers',
      'Utilities Planners',
      'Cost Engineers',
      'Risk Managers',
      'Commissioning Planners',
      'Capital Programme Staff',
      'Net Zero Programme Analysts',
      'Regulatory Reporting Leads',
    ],
  },
  employers: {
    title: 'For Employers',
    subtitle: 'Best suited to organisations that need',
    items: [
      'Stronger capital programme baseline control',
      'Integrated cost and schedule forecasting',
      'Regulatory assurance-ready reporting',
      'Contractor programme governance',
      'Internal energy controls capability',
      'Structured progression for capital teams',
    ],
  },
};

const developData = {
  heading: 'Energy Capabilities Learners Develop',
  description: 'Each capability area builds directly on workplace practice and is assessed through real evidence.',
  capabilities: [
    { icon: 'ri-ruler-line', title: 'Baseline Control', description: 'Rigorous baseline management protecting programme integrity across long lifecycles.' },
    { icon: 'ri-line-chart-line', title: 'Integrated Forecasting', description: 'Earned value and variance analysis for real programme confidence.' },
    { icon: 'ri-shield-check-line', title: 'Risk & Change Management', description: 'Structured risk frameworks for complex capital environments.' },
    { icon: 'ri-file-list-3-line', title: 'Assurance Reporting', description: 'Reporting frameworks satisfying regulatory and stakeholder expectations.' },
    { icon: 'ri-building-2-line', title: 'Delivery Confidence', description: 'Evidence-based forecasting reducing uncertainty in capital delivery.' },
    { icon: 'ri-government-line', title: 'Capital Governance', description: 'Governance structures giving senior leaders decision confidence.' },
  ],
};


const finalCtaData = {
  heading: 'Ready to Build Stronger Capital Programme Controls?',
  description: 'Request a consultation and we will help you understand the route, funding position, eligibility and next steps.',
  primaryCta: 'Request a consultation',
  primaryHref: '/book-a-session',
  secondaryCta: 'Check Funding Eligibility',
  secondaryHref: '/apprenticeship-eligibility-checker',
};

const faqData = {
  heading: 'Energy & Net Zero PCP Route FAQs',
  faqs: [
    { q: 'Is this route tailored for energy and utilities?', a: 'Yes. This Operational PCP route addresses the specific demands of energy, oil, gas, utilities and net zero programmes — capital programme complexity, safety requirements, multi-contractor delivery and regulatory oversight.' },
    { q: 'What energy-specific project controls skills will I develop?', a: 'Capital programme baseline management, integrated cost and schedule forecasting across long lifecycles, contractor programme control, outage and commissioning milestone management, and regulatory assurance reporting.' },
    { q: 'Which energy sectors does this cover?', a: 'Oil and gas, renewable energy, nuclear, utilities (water, electricity, gas), net zero transition programmes, and energy infrastructure. Any capital-intensive energy programme where project controls maturity is critical.' },
    { q: 'How does this support net zero programmes?', a: 'Net zero programmes combine capital complexity with regulatory oversight and public accountability. This route builds the project controls capability needed to manage these programmes with confidence.' },
    { q: 'Can apprenticeship funding support this route?', a: `The Level 6 standard has a maximum funding band of ${pcpFundingBand}. The amount available depends on the current rules, learner age, employer status and available levy funds. Funding is confirmed only after an individual eligibility review.` },
    { q: 'What determines the employer contribution?', a: `For starts from ${apprenticeshipFundingPolicy.appliesFromLabel}, contribution rates vary by learner age, whether the employer pays the levy and whether sufficient levy funds are available. Workplace location, role relevance, prior learning and the applicable start-date rules must also be checked.` },
    { q: 'How is the programme delivered?', a: 'Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks.' },
    { q: 'Can employers enrol multiple learners?', a: 'Yes. Many employers enrol cohorts across project controls, planning and risk functions. Group delivery can be arranged for organisations building controls capability at scale.' },
  ],
};

export const sectorConfig = { slug: 'energy', label: 'Energy', navLinks, hero: heroData, capability: capabilityData, problems: problemsData, process: processData, stats: statsData, choose: chooseData, whoFor: whoForData, develop: developData,  finalCta: finalCtaData, faq: faqData } satisfies SectorRouteConfig;
