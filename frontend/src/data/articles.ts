export interface ArticleCategory {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface Article {
  category: string;
  title: string;
  description: string;
  href: string;
  readTime: string;
  tracking: string;
  featured?: boolean;
}

export const articleCategories: ArticleCategory[] = [
  {
    icon: 'ri-funds-line',
    title: 'Funding Guides',
    description: 'Everything employers and learners need to know about apprenticeship funding options, apprenticeship funding, levy and non-levy rules, and commercial alternatives.',
    href: '#funding-guides',
  },
  {
    icon: 'ri-arrow-left-right-line',
    title: 'Route Comparisons',
    description: 'Compare Project Controls Professional Level 6 against PMP, APM PMQ, PMO training, strategic routes, operational routes and commercial pathways.',
    href: '#route-comparisons',
  },
  {
    icon: 'ri-building-2-line',
    title: 'Sector Guides',
    description: 'Sector-specific project controls training for construction, energy, oil and gas, utilities, public sector, councils, engineering, manufacturing and aerospace.',
    href: '#sector-guides',
  },
  {
    icon: 'ri-award-line',
    title: 'APM ChPP Readiness',
    description: 'Understand how APM Chartered Project Professional pathway support works, including professional evidence, reflective practice and CPD readiness.',
    href: '#chpp-readiness',
  },
  {
    icon: 'ri-briefcase-line',
    title: 'Employer Decision Guides',
    description: 'For HR, L&D, Heads of PMO and senior leaders who need to understand employer value, capability building, ROI and governance maturity.',
    href: '#employer-guides',
  },
];

export const articles: Article[] = [
  {
    category: 'Funding Guides',
    title: 'What Is a Project Controls Professional Apprenticeship?',
    description: 'Everything you need to know about the Level 6 Project Controls Professional apprenticeship, including structure, eligibility and career outcomes.',
    href: '/knowledge-hub/what-is-pcp-apprenticeship',
    readTime: '8 min read',
    tracking: 'article_click_what_is_pcp',
    featured: true,
  },
  {
    category: 'Funding Guides',
    title: 'Project Controls Apprenticeship Funding: Employer Guide',
    description: 'A practical guide for employers who want to understand funding eligibility, levy rules, non-levy contributions and the employer value proposition.',
    href: '/knowledge-hub/funded-pcp-employer-guide',
    readTime: '10 min read',
    tracking: 'article_click_funded_employer_guide',
    featured: true,
  },
  {
    category: 'Employer Decision Guides',
    title: 'How Employers Can Use Apprenticeship Funding to Build Project Controls Capability',
    description: 'Practical steps for HR, L&D and senior leaders to leverage apprenticeship funding for measurable project controls capability development.',
    href: '/knowledge-hub/employer-apprenticeship-funding',
    readTime: '9 min read',
    tracking: 'article_click_employer_funding',
    featured: true,
  },
  {
    category: 'Route Comparisons',
    title: 'Project Controls Professional Level 6 vs PMP: Which Route Fits Your Career?',
    description: 'An honest comparison of the Level 6 PCP apprenticeship and the PMP certification, including cost, structure, recognition and employer value.',
    href: '/knowledge-hub/pcp-vs-pmp',
    readTime: '9 min read',
    tracking: 'article_click_pcp_vs_pmp',
  },
  {
    category: 'APM ChPP Readiness',
    title: 'APM ChPP Readiness Support: What It Means and What It Does Not Guarantee',
    description: 'Clear explanation of how APM Chartered Project Professional pathway support works within the PCP programme and what learners should expect.',
    href: '/knowledge-hub/apm-chpp-readiness',
    readTime: '7 min read',
    tracking: 'article_click_chpp_readiness',
  },
  {
    category: 'Route Comparisons',
    title: 'Strategic vs Operational Project Controls: Which Pathway Is Right for You?',
    description: 'Understand the difference between strategic and operational project controls routes and how to choose the right professional pathway.',
    href: '/knowledge-hub/strategic-vs-operational',
    readTime: '8 min read',
    tracking: 'article_click_strategic_vs_operational',
  },
  {
    category: 'Sector Guides',
    title: 'Project Controls Training for Construction Teams in the UK',
    description: 'Sector-specific guidance for construction employers, planners, schedulers and NEC project teams who need stronger project controls capability.',
    href: '/knowledge-hub/construction-training',
    readTime: '8 min read',
    tracking: 'article_click_construction_training',
  },
  {
    category: 'Sector Guides',
    title: 'Project Controls Training for Energy, Oil, Gas and Utilities Teams',
    description: 'How energy, oil and gas, utilities and capital programme teams can build project controls capability for complex delivery environments.',
    href: '/knowledge-hub/energy-training',
    readTime: '8 min read',
    tracking: 'article_click_energy_training',
  },
  {
    category: 'Employer Decision Guides',
    title: 'PMO Governance Training UK: Building Decision-Ready Reporting',
    description: 'How PMO teams can move from reporting what happened to providing the decision confidence senior leaders need.',
    href: '/knowledge-hub/pmo-governance-training',
    readTime: '8 min read',
    tracking: 'article_click_pmo_governance',
  },
  {
    category: 'Funding Guides',
    title: 'Not Eligible for Apprenticeship Funding? Commercial Project Controls Routes Explained',
    description: 'Clear guidance for self-employed professionals, career changers and learners outside funding eligibility who want to build project controls capability.',
    href: '/knowledge-hub/commercial-routes-explained',
    readTime: '7 min read',
    tracking: 'article_click_commercial_routes',
  },
];
