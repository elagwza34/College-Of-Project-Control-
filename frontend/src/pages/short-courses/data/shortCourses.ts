export interface ShortCourse {
  slug: string;
  title: string;
  category: string;
  duration: string;
  format: string;
  owner: string;
  audience: string;
  summary: string;
  focus: string[];
  detail?: {
    positioning?: string;
    bestFor?: string[];
    learningBlocks?: Array<{ title: string; body: string }>;
    workplaceOutputs?: string[];
    professionalContext?: string;
  };
  icon: string;
  imageUrl: string;
}

export const shortCourses: ShortCourse[] = [
  {
    slug: 'ai-in-project-controls',
    title: 'AI in Project Controls & Management',
    category: 'AI & Digital Delivery',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'Institute of Project Controls',
    audience: 'Project managers, planners and PMO teams seeking practical, supervised uses of AI.',
    summary: 'Use AI-enabled tools to support project information, reporting, dashboards and decisions while keeping professional judgement in control.',
    focus: ['Responsible AI use', 'Project data and dashboards', 'Decision support', 'Assurance and judgement'],
    icon: 'ri-robot-2-line',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'project-planning-control',
    title: 'Project Planning & Control',
    category: 'Planning & Controls',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'APMG International',
    audience: 'Planners, project managers and controls professionals building integrated planning skills.',
    summary: 'Connect scope, schedule, cost and performance into one practical control picture.',
    focus: ['Integrated planning', 'Schedule and cost links', 'Performance measurement', 'Control decisions'],
    icon: 'ri-calendar-check-line',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'earned-value-management',
    title: 'Earned Value Management',
    category: 'Cost & Performance',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'APMG International',
    audience: 'Cost engineers, project controllers and managers who need a reliable view of performance.',
    summary: 'Develop earned value practice that combines scope, schedule and cost to support forecasting and control.',
    focus: ['EVM foundations', 'Variance analysis', 'Forecasting', 'Performance reporting'],
    icon: 'ri-line-chart-line',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'pmi-scheduling-professional',
    title: 'PMI Scheduling Professional Preparation',
    category: 'Scheduling',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'Project Management Institute',
    audience: 'Planners, schedulers and project controls professionals developing specialist scheduling capability.',
    summary: 'Build specialist scheduling capability and prepare for the PMI-SP route through applied practice.',
    focus: ['Schedule development', 'Critical path analysis', 'Schedule control', 'Exam preparation'],
    icon: 'ri-calendar-2-line',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'apm-risk-management',
    title: 'APM Risk Management Level 1 & Applied Practice',
    category: 'Risk',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'Association for Project Management',
    audience: 'Professionals who need a structured approach to project uncertainty.',
    summary: 'Build an applied approach to identifying, analysing and responding to uncertainty across the project lifecycle.',
    focus: ['Risk identification', 'Risk analysis', 'Response planning', 'Workplace application'],
    icon: 'ri-alert-line',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'managing-portfolios',
    title: 'Managing Portfolios',
    category: 'Portfolio & Governance',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'APMG International',
    audience: 'Portfolio, PMO and change leaders prioritising investment and delivery capacity.',
    summary: 'Develop the judgement to prioritise investment, balance delivery capacity and govern a portfolio against strategy.',
    focus: ['Strategic alignment', 'Prioritisation', 'Capacity decisions', 'Portfolio governance'],
    icon: 'ri-briefcase-4-line',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'managing-successful-programmes',
    title: 'Managing Successful Programmes',
    category: 'Programme Management',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'PeopleCert / AXELOS',
    audience: 'Programme managers and change professionals coordinating multiple projects.',
    summary: 'Explore how programmes coordinate projects and change activity towards agreed organisational outcomes.',
    focus: ['Programme governance', 'Benefits management', 'Stakeholder leadership', 'Change coordination'],
    icon: 'ri-node-tree',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'pmp',
    title: 'Project Management Professional Preparation',
    category: 'Professional Certification',
    duration: '8 months',
    format: 'Professional learning',
    owner: 'Project Management Institute',
    audience: 'Project managers and delivery professionals seeking the PMP credential.',
    summary: 'Build structured project management knowledge through practical discussion, applied examples and focused revision.',
    focus: ['PMP knowledge areas', 'Applied examples', 'Revision discipline', 'Professional discussion'],
    icon: 'ri-award-line',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'chartered-project-professional',
    title: 'APM Chartered Project Professional Development',
    category: 'Professional Certification',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'Association for Project Management',
    audience: 'Experienced project professionals preparing evidence of technical knowledge and professional practice.',
    summary: 'Prepare evidence for the APM Chartered Project Professional route, subject to APM requirements.',
    focus: ['Technical knowledge evidence', 'Professional practice', 'Submission structure', 'Reflective judgement'],
    icon: 'ri-shield-star-line',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'pmi-pmo-certified-professional',
    title: 'PMI PMO Certified Professional Preparation',
    category: 'PMO & Governance',
    duration: '4 months',
    format: 'Professional learning',
    owner: 'Project Management Institute',
    audience: 'PMO practitioners and leaders developing a value-focused PMO.',
    summary: 'Develop a value-focused PMO approach through practical and applied learning.',
    focus: ['PMO value', 'Operating models', 'Governance services', 'Exam preparation'],
    icon: 'ri-building-4-line',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=80',
  },
  {
    slug: 'pmo-level-6',
    title: 'Certified PMO Professional Level 6',
    category: 'PMO & Governance',
    duration: '16 months',
    format: 'Professional learning',
    owner: 'Institute of Project Controls',
    audience: 'PMO professionals, project leaders and managers developing strategic PMO capability.',
    summary: 'Develop strategic PMO capability across planning, risk, quality, stakeholder engagement and reporting systems.',
    focus: ['Project planning and control', 'Risk and quality', 'Stakeholder engagement', 'PMO reporting systems'],
    icon: 'ri-stack-line',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=80',
  },
];

export function getShortCourse(slug: string | undefined): ShortCourse | undefined {
  return shortCourses.find((course) => course.slug === slug);
}
