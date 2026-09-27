
import { checkerFaqs } from '../../apprenticeship-eligibility-checker/checkerData';
import { faqs as apmLevel4Faqs } from '../../apm-level-4/programmeData';
import { faqs as commercialCampaignFaqs } from '../../campaign/commercial-route/campaignData';
import { faqs as constructionCampaignFaqs } from '../../campaign/construction/campaignData';
import { faqs as energyCampaignFaqs } from '../../campaign/energy/campaignData';
import { faqs as headOfPmoCampaignFaqs } from '../../campaign/head-of-pmo/campaignData';
import { faqs as hrEmployerCampaignFaqs } from '../../campaign/hr-employer/campaignData';
import { faqs as publicSectorCampaignFaqs } from '../../campaign/public-sector/campaignData';
import { articleFaqs as apmChppArticleFaqs } from '../../knowledge-hub/apm-chpp-readiness/sectionData';
import { articleFaqs as commercialRoutesArticleFaqs } from '../../knowledge-hub/commercial-routes-explained/sectionData';
import { articleFaqs as constructionTrainingArticleFaqs } from '../../knowledge-hub/construction-training/sectionData';
import { articleFaqs as employerFundingArticleFaqs } from '../../knowledge-hub/employer-apprenticeship-funding/sectionData';
import { articleFaqs as energyTrainingArticleFaqs } from '../../knowledge-hub/energy-training/sectionData';
import { articleFaqs as fundedPcpEmployerArticleFaqs } from '../../knowledge-hub/funded-pcp-employer-guide/sectionData';
import { articleFaqs as pcpVsPmpArticleFaqs } from '../../knowledge-hub/pcp-vs-pmp/sectionData';
import { articleFaqs as pmoGovernanceArticleFaqs } from '../../knowledge-hub/pmo-governance-training/sectionData';
import { articleFaqs as strategicVsOperationalArticleFaqs } from '../../knowledge-hub/strategic-vs-operational/sectionData';
import { articleFaqs as whatIsPcpArticleFaqs } from '../../knowledge-hub/what-is-pcp-apprenticeship/sectionData';
import { sectorConfig as constructionSectorConfig } from '../../operational-pcp-construction/sectorData';
import { sectorConfig as energySectorConfig } from '../../operational-pcp-energy/sectorData';
import { sectorConfig as engineeringSectorConfig } from '../../operational-pcp-engineering/sectorData';
import { sectorConfig as publicSectorConfig } from '../../operational-pcp-public-sector/sectorData';
import { faqs as pmoRouteFaqs } from '../../pmo-pcp/sectionData';
import { chartered, operational, strategic } from '../../programme-template/pathwayData';
import { faqs as pcpLevel6Faqs } from '../../project-controls-professional-level-6/programmeData';
import { faqData as strategicOperationalFaqData } from '../../strategic-operational-pcp/routeData';

export interface FaqCategory {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  introduction: string;
  items: { question: string; answer: string }[];
}

const fromObjects = (items: readonly { q: string; a: string }[]) => items.map(({ q, a }) => ({ question: q, answer: a }));
const fromPairs = (items: readonly (readonly [string, string])[]) => items.map(([question, answer]) => ({ question, answer }));

const pageLocalFaqs = [
  {
    question: 'Which programme is right for me?',
    answer: 'Start with your current responsibilities and the capability you want to strengthen. Project Controls Professional Level 6 suits professionals across planning, scheduling, cost, risk, controls and PMO. Associate Project Manager Level 4 suits professionals developing broader project-management and delivery responsibility. Certified PMO Professional Level 6 suits experienced professionals developing strategic PMO governance.',
  },
  {
    question: 'What is the difference between Project Controls Professional Level 6 and Associate Project Manager Level 4?',
    answer: 'Project Controls Professional Level 6 focuses on advanced Project Controls capability, while Associate Project Manager Level 4 builds broader project-management and delivery responsibility at Level 4. The right programme depends on your role and the level of responsibility you hold.',
  },
  {
    question: 'Who is Certified PMO Professional Level 6 designed for?',
    answer: 'Experienced PMO, Project Controls and project professionals developing strategic governance, integrated controls, assurance and PMO leadership capability.',
  },
  {
    question: 'What is the difference between a programme and a specialist module?',
    answer: 'A complete programme provides structured development across a broader professional capability. A specialist module focuses on one specific Project Controls subject, which can be taken individually or combined with others.',
  },
  {
    question: 'Can I take individual Project Controls modules?',
    answer: 'Yes. Specialist Project Controls modules can be taken individually, allowing you to target one specific capability rather than a complete programme.',
  },
  {
    question: 'Can my employer support my development?',
    answer: 'Yes. Employers can support development for an individual, a team or a wider Project Controls function, either directly or through structured employer development.',
  },
  {
    question: 'Can organisations enrol multiple employees?',
    answer: 'Yes. Organisations can build capability across roles, teams, PMOs or functions through structured employer development.',
  },
  {
    question: 'How does workplace application work?',
    answer: 'Development is designed to connect specialist learning directly to live projects, systems and responsibilities, so you can apply what you learn in real work.',
  },
  {
    question: 'What professional pathways are connected to the programmes?',
    answer: 'Selected programmes connect with relevant professional qualifications, assessments, memberships and progression pathways. These remain subject to the requirements of the relevant professional body.',
  },
  {
    question: 'Does completing a programme automatically award ChPP?',
    answer: 'No. Development can support Chartered progression towards ChPP, but Chartered status is awarded by APM based on its own requirements and is not automatically awarded on completion of a programme.',
  },
  {
    question: 'Can we use an apprenticeship to develop an existing employee?',
    answer: 'Yes, apprenticeships can support eligible existing employees where the programme provides substantial new learning and is appropriate for their role and development needs. Final suitability and funding are confirmed during the pre-enrolment review.',
  },
  {
    question: 'How involved does the employer need to be?',
    answer: 'Employer involvement is an important part of work-based training. This includes supporting workplace learning, attending progress reviews, providing feedback and helping the employee access suitable development opportunities.',
  },
  {
    question: 'How often will we review progress?',
    answer: 'KBC normally uses structured tripartite progress reviews involving the learner, employer and coach approximately every 10 weeks.',
  },
  {
    question: 'Can training be aligned with our business priorities?',
    answer: "Yes. Where the programme allows it, KBC works with the employer and learner to connect learning, workplace evidence and development activities with the employee's real responsibilities and organisational context.",
  },
  {
    question: 'How much will the programme cost us?',
    answer: 'The funding position varies by programme, employee and employer. KBC confirms the applicable route before enrolment.',
  },
  {
    question: 'Do employees need to leave work to study?',
    answer: 'Programmes are designed around employed learners and combine structured learning with workplace application. The employer must support the learning commitment required by the relevant programme.',
  },
  {
    question: 'Can you help us decide which employee or programme is the right fit?',
    answer: 'Yes. The discussion can start with the role, current capability and development objective before a programme is selected.',
  },
  {
    question: 'Do I need prior project controls experience?',
    answer: 'No. We have entry points from Level 3 through to Level 6. Your eligibility depends on your current role and qualifications, not prior controls knowledge.',
  },
  {
    question: 'How much does it cost me personally?',
    answer: 'Apprentices must not be asked to contribute to eligible apprenticeship training costs. Whether a place is funded depends on employer support, learner eligibility and the funding rules that apply on the start date. We confirm this before enrolment.',
  },
  {
    question: 'How long does the programme take?',
    answer: 'Typically 18-24 months depending on your level and pace. You will be learning while working, so the programme fits around your job.',
  },
  {
    question: 'What certification will I achieve?',
    answer: 'Depending on your pathway, you can achieve APM PMQ, PMI CAPM, or progress towards chartered status. Certification is integrated into the programme.',
  },
  {
    question: 'Can I study while working full-time?',
    answer: 'Yes. The programme is designed for working professionals. Live sessions are in the evenings, and workplace assignments count as your evidence.',
  },
  {
    question: 'What is the Institute of Project Controls?',
    answer: 'IPC is a professional body focused on advancing project controls capability, standards, professional development and recognition.',
  },
  {
    question: 'How does IPC connect with College programmes?',
    answer: 'Relevant College programmes combine structured learning and workplace application with IPC-aligned professional development. The exact support and recognition route is confirmed for each programme and learner.',
  },
  {
    question: 'Does completing a programme guarantee professional status?',
    answer: 'No. Membership, awards and professional recognition remain subject to the Institute criteria, assessment and approval requirements.',
  },
  {
    question: 'Which disciplines sit within project controls?',
    answer: 'Project controls commonly connects planning, scheduling, cost, risk, change, earned value, reporting, governance, PMO and data-informed decision support.',
  },
  {
    question: 'How quickly will I hear back?',
    answer: 'Our team reviews enquiries within 24 hours on working days and will follow up by email or phone with your next step.',
  },
  {
    question: 'Is there any obligation to enrol?',
    answer: 'None. Getting in touch is simply the start of a conversation to understand your role, goals and the most relevant option.',
  },
  {
    question: 'What if I am enquiring on behalf of my employer?',
    answer: 'Tell us your organisation and role, then describe your team development needs in the message field.',
  },
  {
    question: 'Can I speak to someone instead of emailing?',
    answer: 'Yes. Request an adviser call using the consultation form. Our team will contact you to agree the next step.',
  },
  {
    question: 'How long does the application take?',
    answer: 'The first enquiry takes a few minutes. The full timeline depends on funding checks, employer engagement and cohort availability.',
  },
  {
    question: 'Do I need my employer to be involved?',
    answer: 'For apprenticeship-funded routes, yes. Other professional routes can be discussed without the same employer process.',
  },
  {
    question: 'Can I apply if I am not sure which pathway fits?',
    answer: 'Yes. The admissions conversation can help you compare Operational, Strategic, PMO, Chartered and sector-specific routes.',
  },
  {
    question: 'When is funding confirmed?',
    answer: 'Funding is reviewed before enrolment and confirmed with the learner and, where relevant, the employer.',
  },
  {
    question: 'What is a short course?',
    answer: 'A short course develops one focused area of project controls through live teaching, structured learning and workplace application.',
  },
  {
    question: 'Can short courses be combined into a pathway?',
    answer: 'Yes. Individual courses can support a wider professional route when the combination fits your role, goals and evidence base.',
  },
  {
    question: 'Do all courses lead to an external certification?',
    answer: 'Some prepare you for professional body certifications. Final awards remain subject to the relevant body, exam and eligibility requirements.',
  },
  {
    question: 'How do I choose the right course?',
    answer: 'Start with the capability you need at work. The College team can help match the right course to your responsibilities and development plan.',
  },
];

const sectorPageFaqs = [
  {
    question: 'What is the difference between the Funded Route and IPC Bursary Route?',
    answer: 'The Funded Route is supported through the Department for Education and is subject to employment, residency, employer, prior-learning and funding requirements. The IPC Bursary Route is an alternative contribution towards selected pathway fees where DfE funding is unavailable or unsuitable.',
  },
  {
    question: 'Is the DfE Funded Route guaranteed?',
    answer: 'No. It is potentially fully funded for eligible six-credit pathways, but funding is subject to the applicable rules, employer participation, available funding, prior-learning assessment and written confirmation.',
  },
  {
    question: 'Does six credits always mean six separate modules?',
    answer: 'No. Credits describe pathway weight, not always the number of courses. PMP is shown as two credits and Certified PMO Professional Level 6 as four credits.',
  },
  {
    question: 'Can I tailor my Operational or Strategic pathway?',
    answer: 'The final combination must be approved against role responsibilities, employer context and route eligibility.',
  },
  {
    question: 'Is the AI in Project Controls mandatory?',
    answer: 'It is a core component of the six-credit Operational, Strategic and Chartered pathways because data, reporting, dashboards and assurance increasingly require responsible AI-enabled practice.',
  },
  {
    question: 'Does the Chartered Pathway guarantee ChPP status?',
    answer: 'No. Chartered status and professional recognition are controlled by the relevant professional body. The pathway can support evidence and readiness but does not guarantee an external award.',
  },
  {
    question: 'How does the PMO Certified route differ?',
    answer: 'PMO Certified is a focused four-credit route centred on PMO governance, operating models, services and standards rather than the wider six-credit funded pathways.',
  },
  {
    question: 'What does first-come, first-served mean?',
    answer: 'Funded and bursary places are limited. Enquiries are reviewed in order, but no place is confirmed until suitability, eligibility and written agreement are completed.',
  },
  {
    question: 'What if my employer cannot support the required paid learning time?',
    answer: 'Employer participation is required for funded apprenticeship routes. If support is not available, a bursary or commercial route may be discussed where suitable.',
  },
  {
    question: 'Who is this engineering sector page for?',
    answer: 'It is for engineering and advanced-manufacturing employers and professionals working across project controls, planning, scheduling, cost, risk, PMO, systems integration, product development, production readiness, quality, assurance and complex programme delivery.',
  },
  {
    question: 'Are the apprenticeship pathways fully funded?',
    answer: 'They may be fully funded through the Department for Education route where all eligibility, employer, prior-learning and funding conditions are met. Funding is not guaranteed until confirmed in writing.',
  },
  {
    question: 'What is included in the Operational Pathway?',
    answer: 'The Operational Pathway combines PMP, AI, Planning and Control and a specialist elective in risk, EVM or scheduling.',
  },
  {
    question: 'How is the Strategic Pathway different?',
    answer: 'The Strategic Pathway combines PMP strategic leadership with AI, Programme Management, Portfolio Management and PMO Leadership.',
  },
  {
    question: 'What engineering evidence can be developed?',
    answer: 'Evidence may include integrated baselines, requirements and design-maturity registers, engineering schedules, EVM and cost forecasts, risk and change controls, production-readiness plans and executive assurance packs, depending on the learner role.',
  },
  {
    question: 'What does the IPC Bursary Route cover?',
    answer: 'Subject to approval and availability, IPC bursary support is presented as 50% for Operational, 50% for Strategic and 75% for Chartered, with flexible instalments for up to 36 months.',
  },
  {
    question: 'Can an existing public-sector employee complete an apprenticeship?',
    answer: 'Yes, where the apprenticeship provides substantial new learning, the employee role supports application and all current eligibility requirements are met.',
  },
  {
    question: 'Which route is right for project support or coordination roles?',
    answer: 'Associate Project Manager Level 4 is typically the more relevant route for employees coordinating delivery, supporting governance, managing workstreams and developing broad project-management capability. A formal review is still required.',
  },
  {
    question: 'Who is the Project Controls Professional Level 6 route designed for?',
    answer: 'It is intended for employees whose role requires integrated control across schedule, cost, risk, change, performance reporting and governance, such as planners, cost professionals, risk specialists, controls engineers and PMO controls teams.',
  },
  {
    question: 'What does the employer need to provide?',
    answer: 'The employer supports agreed learning activity, workplace application, relevant evidence opportunities, progress reviews and the learner development throughout the programme.',
  },
  {
    question: 'How is workplace impact reviewed?',
    answer: 'Learners build evidence through applied activity, assignments, reflection, coaching and progress reviews. Employers help confirm how learning is improving professional practice and organisational outcomes.',
  },
];

export const categories: FaqCategory[] = [
  {
    id: 'college', label: 'About the College', shortLabel: 'The College', icon: 'ri-building-4-line',
    introduction: 'How the College approaches professional education, delivery and learner support.',
    items: [
      { question: 'What is the College of Project Controls & Management?', answer: 'The College is a specialist professional education provider focused on project controls, project management, PMO, governance and related workplace capability.' },
      { question: 'Who are the programmes designed for?', answer: 'Programmes are designed for working professionals, employers and people developing responsibility across planning, cost, risk, reporting, governance, PMO and project delivery.' },
      { question: 'Is learning practical or mainly academic?', answer: 'The learning model connects taught concepts with workplace application, professional reflection and evidence. The exact balance depends on the selected programme and route.' },
      { question: 'Can I speak to someone before choosing?', answer: 'Yes. Request a consultation to discuss your role, experience, objectives, eligibility and the route that may fit you best.' },
    ],
  },
  {
    id: 'programmes', label: 'Programmes & Levels', shortLabel: 'Programmes', icon: 'ri-graduation-cap-line',
    introduction: 'Choosing between the College’s main professional programmes and levels.',
    items: [
      { question: 'Which main programmes are available?', answer: 'The main routes include Project Controls Professional Level 6, Associate Project Manager Level 4 and Certified PMO Professional Level 6, alongside specialist and commercial development options.' },
      { question: 'How do I choose the right level?', answer: 'Start with your current responsibilities, experience and the capability you need to build. Level 4 supports developing project-management practice, while Level 6 routes address more advanced controls and PMO responsibilities.' },
      { question: 'Do I need “Project Manager” in my job title?', answer: 'No. Suitability is based more on what you do than your job title. Planning, reporting, coordination, cost, risk, controls, governance and stakeholder responsibilities may all be relevant.' },
      { question: 'Can a programme reflect my sector?', answer: 'Where appropriate, examples, discussion and workplace application can reflect your sector and professional context while maintaining the programme’s required outcomes.' },
    ],
  },
  {
    id: 'pcp-level-6', label: 'PCP Level 6', shortLabel: 'PCP Level 6', icon: 'ri-line-chart-line',
    introduction: 'The structure, pathways and intended outcomes of Project Controls Professional Level 6.',
    items: [
      { question: 'Who is PCP Level 6 for?', answer: 'It is designed for professionals involved in planning, scheduling, cost, risk, change, reporting, governance, PMO and the control of complex projects or programmes.' },
      { question: 'What pathways are available?', answer: 'The College presents Operational, Strategic and Chartered pathways. A tailored combination may also be discussed where duties, evidence opportunities and programme rules allow.' },
      { question: 'How is the programme applied at work?', answer: 'Learners connect learning with relevant responsibilities and build evidence through practical outputs, reflection, coaching and employer-supported progress reviews.' },
      { question: 'Does completion guarantee professional recognition?', answer: 'No. The programme can support readiness and evidence development, but membership, examinations and professional status remain subject to each awarding organisation’s requirements.' },
    ],
  },
  {
    id: 'apm-level-4', label: 'APM Level 4', shortLabel: 'APM Level 4', icon: 'ri-briefcase-4-line',
    introduction: 'What the Associate Project Manager Level 4 route develops and who it may suit.',
    items: [
      { question: 'Who is the Level 4 programme suitable for?', answer: 'It may suit professionals who coordinate projects, support delivery, manage stakeholders, report progress or are developing broader project-management responsibility.' },
      { question: 'What capabilities does Level 4 develop?', answer: 'It develops structured practice across planning, governance, communication, risk, stakeholder engagement and delivery coordination.' },
      { question: 'Can Level 4 support progression into project controls?', answer: 'It can provide a strong project-management foundation. A later step may include deeper project controls, PMO or specialist development depending on your role and goals.' },
      { question: 'Is previous project-management experience required?', answer: 'Relevant workplace exposure is helpful, but admissions considers your role, responsibilities, prior learning and ability to apply the programme in practice.' },
    ],
  },
  {
    id: 'funding', label: 'Apprenticeships & Funding', shortLabel: 'Funding', icon: 'ri-money-pound-circle-line',
    introduction: 'Eligibility, employer involvement and alternatives when apprenticeship funding is unavailable.',
    items: [
      { question: 'Is apprenticeship funding automatic?', answer: 'No. Funding depends on the learner, employer, location, prior learning and the rules applying at enrolment. Eligibility must be checked before a funded place is confirmed.' },
      { question: 'Does my employer need to support the apprenticeship?', answer: 'Yes. Work-based delivery normally requires employer agreement, appropriate responsibilities, evidence opportunities and participation in progress reviews.' },
      { question: 'What if I am not eligible for funding?', answer: 'Commercial routes may be available for self-employed professionals, international learners and others unable to access apprenticeship funding. Payment options can be discussed where available.' },
      { question: 'Can prior learning affect my programme?', answer: 'Yes. Admissions reviews relevant prior learning and experience, which can affect eligibility, content, duration or funding in line with applicable rules.' },
    ],
  },
  {
    id: 'recognition', label: 'Professional Recognition', shortLabel: 'Recognition', icon: 'ri-award-line',
    introduction: 'How programmes connect with professional bodies, qualifications and longer-term progression.',
    items: [
      { question: 'What does recognition support mean?', answer: 'It means helping learners understand relevant standards, develop evidence and prepare for applicable assessments or progression routes. Recognition is not awarded automatically.' },
      { question: 'Is Chartered status guaranteed?', answer: 'No. Chartered status is awarded only by the relevant professional body after its own eligibility and assessment requirements have been met.' },
      { question: 'Are professional examinations included?', answer: 'Some routes may include preparation, memberships or related support where specified. Confirm the exact arrangement for your selected programme before enrolling.' },
      { question: 'Can the College help plan my longer-term pathway?', answer: 'Yes. An information session can connect your current role and intended direction with a suitable programme or professional-development route.' },
    ],
  },
  {
    id: 'employers', label: 'Employers & Teams', shortLabel: 'Employers', icon: 'ri-team-line',
    introduction: 'Developing individuals, cohorts and organisational project capability.',
    items: [
      { question: 'Can an employer enrol a group of employees?', answer: 'Yes. Cohort discussions can consider roles, organisational priorities, eligibility and how learning will be applied across the workplace.' },
      { question: 'How are employers involved?', answer: 'Depending on the route, employers may support role alignment, workplace application, evidence opportunities and structured progress reviews.' },
      { question: 'Can learning reflect our project environment?', answer: 'Examples and workplace application can reflect the organisation’s sector, terminology and delivery priorities while preserving required standards.' },
      { question: 'How do we decide which employees fit each route?', answer: 'Map each employee’s actual responsibilities, experience and development needs against programme outcomes. The College can support this through an employer consultation.' },
    ],
  },
  {
    id: 'applications', label: 'Applications & Support', shortLabel: 'Applying', icon: 'ri-customer-service-2-line',
    introduction: 'The first conversation, admissions review and support available during study.',
    items: [
      { question: 'What happens after I request a consultation?', answer: 'The team will contact you to discuss your role, goals, experience, employer support and possible funding route, then agree the next step.' },
      { question: 'What information should I prepare?', answer: 'Be ready to describe your responsibilities, recent project experience, employer situation, previous qualifications and what you want to achieve.' },
      { question: 'What learner support is available?', answer: 'Support may include live teaching, coaching, progress reviews, workplace-evidence guidance and professional-development support according to the programme.' },
      { question: 'When are start dates confirmed?', answer: 'Cohort availability can change. Admissions confirms current intake options and any conditions that must be completed before enrolment.' },
    ],
  },
  {
    id: 'page-local-faqs',
    label: 'General Page FAQs',
    shortLabel: 'General',
    icon: 'ri-pages-line',
    introduction: 'Questions that were previously placed on individual website pages, now held in the central FAQ page.',
    items: pageLocalFaqs,
  },
  {
    id: 'programme-route-faqs',
    label: 'Programme Route FAQs',
    shortLabel: 'Routes',
    icon: 'ri-route-line',
    introduction: 'Questions previously shown on individual programme and pathway pages, now collected in one place.',
    items: [
      ...fromObjects(pcpLevel6Faqs),
      ...fromObjects(apmLevel4Faqs),
      ...fromObjects(pmoRouteFaqs),
      ...fromObjects(strategicOperationalFaqData.faqs),
      ...fromObjects(operational.faqs),
      ...fromObjects(strategic.faqs),
      ...fromObjects(chartered.faqs),
    ],
  },
  {
    id: 'sector-route-faqs',
    label: 'Sector Route FAQs',
    shortLabel: 'Sectors',
    icon: 'ri-building-2-line',
    introduction: 'Sector-specific project-controls questions covering construction, engineering, energy and public-sector routes.',
    items: [
      ...fromObjects(constructionSectorConfig.faq.faqs),
      ...fromObjects(engineeringSectorConfig.faq.faqs),
      ...fromObjects(energySectorConfig.faq.faqs),
      ...fromObjects(publicSectorConfig.faq.faqs),
      ...sectorPageFaqs,
    ],
  },
  {
    id: 'article-guide-faqs',
    label: 'Knowledge Hub FAQs',
    shortLabel: 'Guides',
    icon: 'ri-article-line',
    introduction: 'Questions from the Knowledge Hub guides, consolidated into the central FAQ page.',
    items: [
      ...fromObjects(whatIsPcpArticleFaqs),
      ...fromObjects(strategicVsOperationalArticleFaqs),
      ...fromObjects(pmoGovernanceArticleFaqs),
      ...fromObjects(pcpVsPmpArticleFaqs),
      ...fromObjects(fundedPcpEmployerArticleFaqs),
      ...fromObjects(energyTrainingArticleFaqs),
      ...fromObjects(employerFundingArticleFaqs),
      ...fromObjects(constructionTrainingArticleFaqs),
      ...fromObjects(commercialRoutesArticleFaqs),
      ...fromObjects(apmChppArticleFaqs),
    ],
  },
  {
    id: 'campaign-and-eligibility-faqs',
    label: 'Campaign & Eligibility FAQs',
    shortLabel: 'Eligibility',
    icon: 'ri-question-answer-line',
    introduction: 'Questions from campaign pages and the apprenticeship eligibility checker.',
    items: [
      ...fromPairs(checkerFaqs),
      ...fromObjects(constructionCampaignFaqs),
      ...fromObjects(energyCampaignFaqs),
      ...fromObjects(publicSectorCampaignFaqs),
      ...fromObjects(commercialCampaignFaqs),
      ...fromObjects(hrEmployerCampaignFaqs),
      ...fromObjects(headOfPmoCampaignFaqs),
    ],
  },
];
