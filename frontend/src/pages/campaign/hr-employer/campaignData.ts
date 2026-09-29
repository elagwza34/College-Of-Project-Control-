import { formatGBP } from '@/data/apprenticeshipFundingPolicy';
import { PCP_L6 } from '@/data/programmeFacts';

/**
 * Maximum government apprenticeship funding for the ST0845 standard.
 *
 * Stated as a funding-band maximum rather than a cash figure: it is the ceiling
 * for eligible training and assessment costs, not money paid to the learner or a
 * guaranteed saving for the employer.
 */
const fundingBandMaximum = formatGBP(PCP_L6?.fundingBandMaximum ?? 0);

export const heroBadges = [
  { icon: 'ri-shield-check-line', text: 'Funding subject to eligibility' },
  { icon: 'ri-funds-line', text: `Government apprenticeship funding band up to ${fundingBandMaximum}` },
  { icon: 'ri-star-line', text: 'KBC added support value included' },
  { icon: 'ri-building-line', text: 'London Master Class Events' },
  { icon: 'ri-calendar-line', text: 'Intake availability confirmed on enquiry' },
];

export const painPoints = [
  { icon: 'ri-money-pound-circle-line', text: 'Training budgets stretched by programme demands' },
  { icon: 'ri-bar-chart-line', text: 'Hard-to-measure capability development ROI' },
  { icon: 'ri-user-search-line', text: 'Difficulty recruiting experienced project controls professionals' },
  { icon: 'ri-file-list-3-line', text: 'Generic training that does not produce workplace evidence' },
  { icon: 'ri-team-line', text: 'Skills gaps in planning, cost, risk and reporting across project teams' },
  { icon: 'ri-emotion-line', text: 'Retention risk when career progression is unclear' },
];

export const beforeItems = [
  { icon: 'ri-close-line', title: 'Generic training with no workplace evidence', description: 'Courses that do not produce measurable project controls outputs.' },
  { icon: 'ri-close-line', title: 'Training budget consumed with limited ROI', description: 'Commercial courses that drain L&amp;D budgets without lasting capability.' },
  { icon: 'ri-close-line', title: 'No professional recognition pathway', description: 'Employees complete training but lack professional body membership or ChPP readiness.' },
  { icon: 'ri-close-line', title: 'One-size-fits-all delivery', description: 'Training that ignores sector, role and organisational context.' },
];

export const afterItems = [
  { icon: 'ri-check-line', title: 'Funded capability development where eligible', description: 'Department for Education apprenticeship funding covers most or all costs for eligible employers in England.' },
  { icon: 'ri-check-line', title: 'Workplace evidence and measurable outcomes', description: 'Every learner produces real project controls outputs used by your organisation.' },
  { icon: 'ri-check-line', title: 'APM ChPP readiness support included', description: 'Learners prepare professional evidence and build confidence for future Chartered progression.' },
  { icon: 'ri-check-line', title: 'Sector-specific routes for real project environments', description: 'Routes designed for construction, energy, public sector, engineering and PMO teams.' },
];

export const routeFitCards = [
  { icon: 'ri-bar-chart-grouped-line', title: 'Strategic PCP', description: 'For PMO leads, governance leads and senior project controls professionals building decision-support capability.', href: '/strategic-pcp', tracking: 'route_selected_strategic' },
  { icon: 'ri-dashboard-line', title: 'Operational PCP', description: 'For planners, schedulers, cost engineers and project controllers on the front line of project delivery.', href: '/project-controls-professional/operational-route', tracking: 'route_selected_operational' },
  { icon: 'ri-stack-line', title: 'Strategic + Operational', description: 'For high-potential professionals needing both technical depth and leadership capability, with OTHM Level 7 progression.', href: '/strategic-operational-pcp', tracking: 'route_selected_hybrid', recommended: true },
  { icon: 'ri-government-line', title: 'PMO & Governance PCP', description: 'For PMO professionals building governance, assurance and decision-ready reporting capability.', href: '/pmo-pcp', tracking: 'route_selected_pmo' },
  { icon: 'ri-building-line', title: 'Construction PCP', description: 'For construction teams addressing schedule, cost, NEC change control and progress reporting.', href: '/operational-pcp-construction', tracking: 'sector_selected_construction' },
  { icon: 'ri-flashlight-line', title: 'Energy & Net Zero PCP', description: 'For energy, utilities and capital programme teams managing complex delivery risk.', href: '/operational-pcp-energy', tracking: 'sector_selected_energy' },
];

export const employerBenefits = [
  { icon: 'ri-funds-line', title: 'Use Apprenticeship Funding', description: `Access government apprenticeship funding up to a funding-band maximum of ${fundingBandMaximum} for eligible employers in England, reducing pressure on L&amp;D budgets.` },
  { icon: 'ri-line-chart-line', title: 'Measurable Capability Growth', description: 'Every learner produces workplace evidence demonstrating real project controls competence.' },
  { icon: 'ri-user-star-line', title: 'Improve Retention', description: 'Clear professional progression pathways with APM ChPP readiness support and professional memberships.' },
  { icon: 'ri-building-2-line', title: 'Sector-Specific Routes', description: 'Construction, energy, public sector, engineering and PMO routes built for real delivery environments.' },
  { icon: 'ri-shield-check-line', title: 'KBC Added Support Value', description: 'One-to-one tutoring, London Master Class Events, private healthcare and workplace evidence support included.' },
  { icon: 'ri-calendar-check-line', title: 'Flexible Start Dates', description: 'September, January and May intakes to align with your organisational planning cycle.' },
];

export const faqs = [
  { q: 'Is apprenticeship funding really available for project controls training?', a: `Yes. The Level 6 Project Controls Professional apprenticeship is supported by government apprenticeship funding, with a funding-band maximum of up to ${fundingBandMaximum} for eligible employers in England. Levy-paying employers can use their apprenticeship levy. Non-levy-paying employers may access co-funded options.` },
  { q: 'What makes this different from buying commercial training courses?', a: 'This is a structured professional development pathway, not a short course. Learners produce real workplace evidence, receive one-to-one tutoring, access professional membership support, attend Master Class Events, and build APM ChPP readiness. Commercial training typically does not include any of these.' },
  { q: 'How much time do learners need to commit each week?', a: 'The programme is designed alongside full-time employment. Learners typically spend around 20% of their working week on apprenticeship activities, including live online sessions, self-directed study, and workplace evidence development.' },
  { q: 'Can we put multiple employees through the programme?', a: 'Yes. Many employers develop cohorts of project controls professionals across different routes and sectors. This builds consistent capability, shared language and stronger internal project controls culture.' },
  { q: 'What happens if we are not a levy-paying employer?', a: 'Non-levy-paying employers in England may access government support. The contribution rate depends on learner age, employer circumstances and the funding rules in force on the start date. Our team will confirm your position before enrolment.' },
];
