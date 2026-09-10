export type PathwayKind = 'operational' | 'strategic' | 'chartered';
export type Credit = { number: string; title: string; owner: string; duration: string; capability: string; output: string; note: string };
export type PathwayConfig = {
  kind: PathwayKind; name: string; eyebrow: string; headline: string; intro: string; value: string;
  trust?: string; processEyebrow: string; processTitle: string; process: [string, string][];
  rolesTitle: string; roleGroups: { title: string; roles: string[] }[]; roleNote: string;
  journeyTitle: string; journeyIntro: string; credits: Credit[]; creditNote: string;
  capabilityTitle: string; capabilities: [string, string][];
  systemTitle: string; systemCentre: string; systemItems: string[]; systemExample: string[]; systemCopy: string;
  outputsTitle: string; outputGroups: { title: string; items: string[] }[];
  decisionTitle: string; decisionCopy: string; decision: string[]; decisionPillars: [string, string][];
  employerTitle: string; employerBenefits: [string, string][];
  recognitionTitle: string; recognitionCopy: string; recognitionItems: [string, string][];
  finalTitle: string; finalCopy: string; seoDescription: string; faqs: { q: string; a: string }[];
};

const shared = {
  eyebrow: 'Project Controls Professional Level 6',
  learning: [['Learn', 'Live online teaching and guided professional study.'], ['Apply', 'Use concepts within appropriate workplace activity.'], ['Evidence', 'Capture authentic project-controls evidence and reflection.'], ['Review', 'Use coaching and employer reviews to test progress.'], ['Improve', 'Strengthen outputs, judgement and professional practice.']] as [string, string][],
  evidenceQualityNote: 'Strong evidence shows authenticity, complexity, personal contribution, professional judgement, measurable outcomes and reflection, while protecting confidential and commercially sensitive information.',
};

export const operational: PathwayConfig = {
  kind: 'operational', name: 'Operational Pathway', eyebrow: shared.eyebrow,
  headline: 'Build the planning, scheduling and performance control capability to keep complex projects on track.',
  intro: 'Develop practical project controls expertise across planning, scheduling, earned value, risk, forecasting, reporting and AI-enabled workflows through a work-based Level 6 pathway.',
  value: 'Turn project data into reliable plans, early warnings and better delivery decisions.',
  processEyebrow: 'Control project performance', processTitle: 'See what is happening, understand what it means and act early',
  process: [['Baseline', 'Establish credible scope, schedule, cost and performance expectations.'], ['Measure', 'Capture reliable progress and performance information.'], ['Analyse', 'Understand variance, trends, risks and emerging delivery issues.'], ['Forecast', 'Estimate likely completion dates, costs and outcomes.'], ['Act', 'Translate controls evidence into clear corrective actions.'], ['Control', 'Maintain baselines, change records and decision traceability.']],
  rolesTitle: 'For professionals close to project planning, performance and delivery control',
  roleGroups: [
    { title: 'Planning and Scheduling', roles: ['Planners', 'Project Planners', 'Schedulers', 'Planning Engineers', 'Planning Leads', 'Integrated Planning Professionals'] },
    { title: 'Project Controls', roles: ['Project Controllers', 'Project Controls Engineers', 'Project Controls Analysts', 'Project Controls Managers', 'Performance Analysts'] },
    { title: 'Cost, Risk and Delivery', roles: ['Cost Engineers', 'Cost Controllers', 'Risk Practitioners', 'Estimators', 'Reporting Analysts', 'Project Engineers', 'Project Managers', 'PMO Professionals'] },
  ],
  roleNote: 'You do not need “Project Controls” in your job title. Fit depends on responsibilities such as building plans, maintaining schedules, monitoring progress, forecasting outcomes, analysing variance, managing risk or producing performance information.',
  journeyTitle: 'Build operational project controls capability through a structured credit pathway',
  journeyIntro: 'PMP is a two-credit, eight-month professional context. Choose four further one-credit options after role review and employer engagement to complete six pathway credits.',
  credits: [
    { number: '1–2', title: 'Project Management Professional', owner: 'Project Management Institute', duration: '2 credits · 8 months', capability: 'Project leadership, governance and integrated delivery foundations.', output: 'Applied project plan and leadership evidence.', note: 'PMP is independently awarded by PMI and remains subject to its eligibility, application, examination and maintenance requirements.' },
    { number: 'Option', title: 'Artificial Intelligence in Project Controls Certificate', owner: 'Institute of Project Controls', duration: '1 credit · 4 months', capability: 'Governed workflows, data validation, dashboards and human approval.', output: 'Auditable AI-assisted controls workflow.', note: 'Certificate position and any external recognition are confirmed in the learner’s written offer.' },
    { number: 'Option', title: 'Risk Management', owner: 'Association for Project Management', duration: '1 credit · 4 months', capability: 'Risk identification, analysis, response and escalation.', output: 'Risk analysis and response recommendation.', note: 'Any external assessment is independent and subject to the professional body’s current rules.' },
    { number: 'Option', title: 'Scheduling Professional', owner: 'Project Management Institute', duration: '1 credit · 4 months', capability: 'Logic, critical path, float, constraints and recovery.', output: 'Schedule health and recovery analysis.', note: 'Any PMI award is independently assessed and is not automatically conferred by KBC.' },
    { number: 'Option', title: 'Earned Value Management', owner: 'APMG International', duration: '1 credit · 4 months', capability: 'Integrated cost and schedule performance measurement.', output: 'Earned value report and forecast narrative.', note: 'Any APMG qualification is subject to its independent assessment requirements.' },
    { number: 'Option', title: 'Project Planning and Controls', owner: 'APMG International', duration: '1 credit · 4 months', capability: 'Integrated planning, baselines, monitoring and control.', output: 'Integrated baseline and controls plan.', note: 'Final credit selection and external assessment arrangements are confirmed in writing.' },
  ],
  creditNote: 'The options shown are a pathway menu, not seven mandatory credits. The final six-credit combination must fit current duties, evidence opportunities, employer requirements and approval.',
  capabilityTitle: 'The disciplines behind reliable project delivery',
  capabilities: [['Integrated Planning', 'Connect scope, milestones, dependencies, resources and delivery logic.'], ['Scheduling', 'Analyse critical paths, float, constraints and recovery scenarios.'], ['Performance Measurement', 'Measure progress against the approved baseline.'], ['Earned Value', 'Understand cost and schedule performance and support forecasting.'], ['Risk and Forecasting', 'Connect current performance and uncertainty to future outcomes.'], ['Reporting and Control', 'Create decision-ready reporting and maintain change discipline.']],
  systemTitle: 'Project controls work as one connected system', systemCentre: 'Project performance',
  systemItems: ['Scope', 'Schedule', 'Cost', 'Resources', 'Risk', 'Change', 'Progress', 'Forecast', 'Quality', 'Benefits', 'Reporting'],
  systemExample: ['Scope change', 'Schedule impact', 'Cost impact', 'Risk exposure', 'Forecast change', 'Management decision'],
  systemCopy: 'A change in one control area can alter several others. Integrated controls make those relationships visible before decisions are fixed.',
  outputsTitle: 'Create project controls outputs that support real delivery decisions',
  outputGroups: [{ title: 'Plan', items: ['Work breakdown structure', 'Integrated baseline', 'Project schedule', 'Critical path analysis'] }, { title: 'Measure', items: ['Schedule health review', 'Earned value report', 'Variance analysis', 'Performance dashboard'] }, { title: 'Forecast and act', items: ['Cost forecast', 'Risk analysis', 'Change record', 'Recovery plan', 'Forecast narrative', 'Professional evidence portfolio'] }],
  decisionTitle: 'Good project controls should reveal problems before they become surprises',
  decisionCopy: 'The value is not producing more reports. It is creating enough confidence in the evidence to understand what is changing, why it matters and what should happen next.',
  decision: ['Project data', 'Controlled baseline', 'Variance', 'Trend', 'Forecast', 'Early warning', 'Corrective action'],
  decisionPillars: [['Reliable evidence', 'Traceable project information.'], ['Early warning', 'Identify emerging pressure before outcomes are fixed.'], ['Credible forecast', 'Estimate future performance using evidence and uncertainty.'], ['Actionable insight', 'Translate analysis into practical recommendations.']],
  employerTitle: 'Build stronger controls and more reliable delivery information',
  employerBenefits: [['Better Baselines', 'Improve planning assumptions and delivery baselines.'], ['Earlier Warning', 'Identify variance before problems escalate.'], ['Credible Forecasts', 'Strengthen schedule, cost and completion forecasting.'], ['Stronger Governance', 'Improve traceability around change, risk and decisions.'], ['Decision-Ready Reporting', 'Explain implications and required action.'], ['Workplace Capability', 'Develop skills around relevant employer systems.']],
  recognitionTitle: 'Professional development within a wider Level 6 journey',
  recognitionCopy: 'The apprenticeship, KBC learning components, exam preparation, external certification and professional recognition are related but separate.',
  recognitionItems: [['Apprenticeship', 'Develops the full Project Controls Professional occupational capability.'], ['KBC pathway', 'Organises six credits around operational responsibilities.'], ['External qualifications', 'Awarded independently and subject to each body’s current requirements.'], ['Professional progression', 'Evidence and coaching can support future recognition; no status is guaranteed.']],
  finalTitle: 'Build stronger control over project performance', finalCopy: 'Review your role, project responsibilities, employer requirements, credit options and funding eligibility with Kent Business College.',
  seoDescription: 'Develop practical project controls capability across planning, scheduling, earned value, risk, forecasting and reporting through the Operational Pathway at Kent Business College.',
  faqs: [
    { q: 'What is the Operational Pathway?', a: 'It is the practical Project Controls Professional Level 6 route for professionals working close to planning, scheduling, performance, risk, forecasting and delivery control.' },
    { q: 'Who is it designed for?', a: 'It is designed for professionals whose work includes planning, schedules, progress, cost, risk, variance, forecasting or performance reporting. Job title alone does not determine suitability.' },
    { q: 'How is it different from the Strategic Pathway?', a: 'Operational focuses on controlling delivery and understanding project performance. Strategic focuses on using controls evidence across programmes, portfolios, PMOs and organisational decisions.' },
    { q: 'How is it different from the Chartered Pathway?', a: 'The Chartered Pathway focuses on technical knowledge, professional evidence and the APM recognised assessment route supporting eligible professionals towards ChPP.' },
    { q: 'How does the six-credit system work?', a: 'PMP counts as two credits over eight months. Four further one-credit options are agreed to make six credits. A standard one-credit course is typically four months.' },
    { q: 'Can the pathway be tailored?', a: 'Potentially. The final mix is agreed after reviewing duties, prior learning, evidence opportunities, employer needs and programme approval.' },
    { q: 'Will I use my own workplace projects?', a: 'Workplace application and authentic evidence are central where organisational permission and confidentiality controls allow.' },
    { q: 'How long does the pathway take?', a: 'The parent programme is structured over 27 months: a one-month soft start, six credits over 24 months and two months of closing workshops.' },
    { q: 'Are professional qualifications guaranteed?', a: 'No. External examinations, certifications, memberships and professional status are independently controlled and subject to each organisation’s requirements.' },
    { q: 'Is apprenticeship funding available?', a: 'A funded route may be available, subject to current rules, learner eligibility, employer agreement, residency, work location, prior learning, suitability and written confirmation.' },
  ],
};

export const strategic: PathwayConfig = {
  kind: 'strategic', name: 'Strategic Pathway', eyebrow: shared.eyebrow,
  headline: 'Turn project controls evidence into better programme, portfolio and PMO decisions.',
  intro: 'Develop strategic project controls capability across leadership, governance, programme management, portfolio decision-making, AI and PMO leadership through a work-based Level 6 pathway.',
  value: 'Move from controlling individual project performance to influencing what the organisation does next.',
  processEyebrow: 'From control to strategic influence', processTitle: 'Move beyond reporting performance to influencing what the organisation does next',
  process: [['Project data', 'Establish reliable and traceable delivery evidence.'], ['Project control', 'Understand scope, schedule, cost, risk and performance.'], ['Programme insight', 'Connect dependencies, benefits and strategic outcomes.'], ['Portfolio decision', 'Compare priorities, capacity, risk and value.'], ['PMO governance', 'Build decision support, assurance and operating models.'], ['Organisational value', 'Support better investment and delivery decisions.']],
  rolesTitle: 'For professionals who use controls evidence to influence decisions',
  roleGroups: [{ title: 'Project Controls Leadership', roles: ['Heads of Project Controls', 'Project Controls Managers', 'Senior Planning Professionals', 'Cost Professionals', 'Risk and Assurance Practitioners'] }, { title: 'Programme and Portfolio', roles: ['Programme Controls Professionals', 'Portfolio Governance Professionals', 'Transformation Professionals', 'Benefits Professionals', 'Investment Roles'] }, { title: 'PMO and Delivery Leadership', roles: ['Heads of PMO', 'PMO Managers', 'Governance Professionals', 'Strategic Delivery Leaders', 'Assurance Professionals'] }],
  roleNote: 'A senior job title alone does not make the pathway suitable. Fit depends on appropriate responsibilities, workplace activity, evidence opportunities, employer support and the occupational standard.',
  journeyTitle: 'Six credits connected through one strategic pathway', journeyIntro: 'Progress from leading projects to governed AI, coordinated programmes, portfolio prioritisation and PMO leadership.',
  credits: [
    { number: '1–2', title: 'Project Management Professional — Strategic Project Leadership', owner: 'Project Management Institute', duration: '2 credits · 8 months', capability: 'Strategic project leadership, governance and stakeholder influence.', output: 'Strategic project charter and recovery recommendation.', note: 'PMP is independently awarded by PMI and subject to its eligibility, application, examination and maintenance requirements.' },
    { number: '3', title: 'Artificial Intelligence in Project Controls Certificate', owner: 'Kent Business College / Institute of Project Controls context', duration: '1 credit · 4 months', capability: 'Governed workflows, dashboards, data validation and human approval.', output: 'Governed controls workflow or bounded AI agent.', note: 'This learning component must not be presented as a PMI, APM, PeopleCert or APMG certification.' },
    { number: '4', title: 'Managing Successful Programmes', owner: 'PeopleCert / AXELOS', duration: '1 credit · 4 months', capability: 'Programme purpose, governance, dependencies, outcomes and benefits.', output: 'Programme governance map and benefits strategy.', note: 'Any PeopleCert examination and certification is independent and confirmed in the learner’s written offer.' },
    { number: '5', title: 'Management of Portfolios', owner: 'APMG International', duration: '1 credit · 4 months', capability: 'Strategic alignment, prioritisation, capacity, balance and value.', output: 'Portfolio prioritisation model and investment decision pack.', note: 'Any APMG assessment is independent and subject to current awarding-body requirements.' },
    { number: '6', title: 'Project Management Office course', owner: 'Project Management Institute', duration: '1 credit · 4 months', capability: 'PMO mandate, services, operating model, maturity and value.', output: 'PMO operating model and maturity roadmap.', note: 'Exact PMI course and certification arrangements are confirmed in writing; no external award is automatic.' },
  ],
  creditNote: 'These pathway credits provide professional-development contexts for the complete occupational standard. External certifications remain independently awarded.',
  capabilityTitle: 'Develop capability where project evidence meets organisational decision-making',
  capabilities: [['Strategic Project Leadership', 'Leadership, influence, governance and decision rights.'], ['Programme Governance', 'Purpose, dependencies, outcomes, benefits and assurance.'], ['Portfolio Decision-Making', 'Alignment, prioritisation, balance, capacity and enterprise risk.'], ['PMO Leadership', 'Mandate, operating model, services, maturity and value.'], ['AI-Enabled Controls', 'Governed workflows, validation, dashboards and human approval.'], ['Executive Communication', 'Options, assumptions, uncertainty and decision narratives.']],
  systemTitle: 'Understand performance at every level of the organisation', systemCentre: 'Strategic decision support',
  systemItems: ['Project', 'Programme', 'Portfolio', 'PMO'], systemExample: ['Project evidence', 'Programme outcomes', 'Portfolio priorities', 'PMO governance', 'Organisational value'],
  systemCopy: 'Projects show whether work is being delivered. Programmes connect outcomes and benefits. Portfolios decide where to invest. PMOs create the governance and decision support for consistent delivery.',
  outputsTitle: 'Build evidence with strategic workplace value',
  outputGroups: [{ title: 'Project', items: ['Strategic charter', 'Governance map', 'Recovery recommendation', 'AI-enabled workflow'] }, { title: 'Programme', items: ['Benefits strategy', 'Dependency roadmap', 'Programme controls dashboard'] }, { title: 'Portfolio and PMO', items: ['Prioritisation model', 'Investment decision pack', 'Capacity view', 'Strategic risk heatmap', 'PMO operating model', 'Maturity roadmap'] }],
  decisionTitle: 'Strategic controls should improve the quality of real decisions',
  decisionCopy: 'Senior controls work helps decision-makers understand what changed, why it matters, what happens without action, which options exist and where uncertainty remains.',
  decision: ['Evidence', 'Context', 'Options', 'Uncertainty', 'Recommendation', 'Decision', 'Value'],
  decisionPillars: [['Reliable Evidence', 'Traceable scope, schedule, cost, risk and benefit information.'], ['Clear Recommendations', 'Make implications, options and assumptions visible.'], ['Practical Value', 'Support projects, programmes, portfolios and PMOs.']],
  employerTitle: 'Develop people who connect delivery evidence with strategic priorities',
  employerBenefits: [['Stronger Governance', 'Clarify decision rights, escalation and assurance.'], ['Programme Visibility', 'Understand dependencies, outcomes and benefits.'], ['Disciplined Investment', 'Improve prioritisation and capacity decisions.'], ['Effective PMOs', 'Strengthen mandate, services and value measurement.'], ['Executive Insight', 'Translate evidence into recommendations.'], ['Responsible AI', 'Retain accountability around automation and decisions.']],
  recognitionTitle: 'Professional development within a wider Level 6 journey', recognitionCopy: 'The route combines apprenticeship competence with distinct professional-development contexts. No external award is automatic.',
  recognitionItems: [['Apprenticeship', 'Covers the complete occupational standard through work-based evidence.'], ['Professional learning', 'Connects PMP, AI, programme, portfolio and PMO contexts.'], ['External assessment', 'Controlled independently by PMI, PeopleCert, APMG or another named body.'], ['Professional recognition', 'Subject to the relevant body’s eligibility, assessment and maintenance rules.']],
  finalTitle: 'Move from project controls expertise to strategic influence', finalCopy: 'Review your role, prior learning, employer requirements, evidence opportunities and Strategic Pathway suitability.',
  seoDescription: 'Develop strategic project controls capability across leadership, AI, programme management, portfolio decision-making and PMO leadership through the Strategic Pathway at Kent Business College.',
  faqs: [
    { q: 'What is the Strategic Pathway?', a: 'It is the Project Controls Professional Level 6 route focused on using delivery evidence to support programme, portfolio, PMO and organisational decisions.' },
    { q: 'Who should choose it?', a: 'Professionals with suitable strategic responsibilities, evidence opportunities and employer support across project controls leadership, programmes, portfolios, governance or PMOs.' },
    { q: 'How is it different from Operational?', a: 'Operational focuses on controlling delivery. Strategic focuses on using that evidence to influence wider priorities and decisions.' },
    { q: 'How is it different from Chartered?', a: 'Chartered focuses on technical knowledge and professional evidence relevant to the APM recognised route supporting ChPP progression.' },
    { q: 'What are the six credits?', a: 'PMP counts as two credits, followed by one credit each in AI in Project Controls, programme management, portfolio management and PMO leadership.' },
    { q: 'How does PMP fit?', a: 'PMP provides the two-credit strategic project leadership context. Any PMP award is independently controlled by PMI.' },
    { q: 'How is AI used?', a: 'AI is used within governed workflows, data validation, dashboards, reporting and bounded decision support with human approval.' },
    { q: 'Will I use workplace projects?', a: 'Yes, where role responsibilities, organisational permission and confidentiality controls permit authentic application and evidence.' },
    { q: 'How long is the programme?', a: 'The parent programme is structured over 27 months, including a soft start, 24 months of credits and closing workshops.' },
    { q: 'Is funding available?', a: 'A funded apprenticeship route may be available subject to current rules, eligibility, employer agreement, prior learning, suitability and written confirmation.' },
    { q: 'Are professional certifications guaranteed?', a: 'No. Every external examination, certification or professional recognition remains independently assessed.' },
  ],
};

export const chartered: PathwayConfig = {
  kind: 'chartered', name: 'Chartered Pathway', eyebrow: shared.eyebrow,
  headline: 'Build the technical knowledge and professional evidence to support your progression towards Chartered Project Professional.',
  intro: 'Develop integrated project controls, governance, stakeholder, risk, portfolio and professional judgement capability through a Level 6 work-based pathway designed around an APM recognised technical-knowledge route.',
  value: 'A professional development pathway supporting chartered progression — not an automatic chartership award.',
  trust: 'APM recognised technical-knowledge assessment route. ChPP is awarded independently by APM after all applicable requirements are met.',
  processEyebrow: 'Understand the route', processTitle: 'A professional development pathway, not an automatic chartership award',
  process: [['Experience', 'Bring relevant professional activity and workplace responsibility.'], ['Level 6 development', 'Build complete occupational capability through work-based learning.'], ['Technical knowledge', 'Complete the recognised technical-knowledge component.'], ['Professional evidence', 'Develop evidence of context, responsibility, judgement and impact.'], ['APM application', 'Meet APM eligibility, submission, CPD, ethics and assessment requirements.'], ['ChPP decision', 'APM independently assesses and awards Chartered status.']],
  rolesTitle: 'For experienced professionals ready to evidence deeper technical and professional capability',
  roleGroups: [{ title: 'Project Controls', roles: ['Project Controls Managers', 'Senior Project Controllers', 'Planning Leads', 'Cost Engineering Professionals', 'Risk and Assurance Professionals'] }, { title: 'Project and Programme Delivery', roles: ['Project Managers', 'Programme Managers', 'Project Engineers', 'Delivery Leaders', 'Technical Project Professionals'] }, { title: 'Governance and PMO', roles: ['PMO Leaders', 'Governance Professionals', 'Assurance Professionals', 'Portfolio Professionals', 'Senior Delivery Professionals'] }],
  roleNote: 'Job title alone does not establish suitability. Learners need appropriate experience, responsibilities, evidence opportunities and employer support. APM eligibility is assessed independently.',
  journeyTitle: 'Connect technical knowledge with professional practice', journeyIntro: 'Complete four Certified PMO Professional Level 6 components, AI in Project Controls and one specialist choice in earned value or portfolio management.',
  credits: [
    { number: '1', title: 'CPMO Level 6 — Project Planning and Control', owner: 'Institute of Project Controls / KBC recognised route', duration: '1 credit · 4 months', capability: 'Integrated scope, schedule, cost, resource and change control.', output: 'Integrated controls assessment and baseline review.', note: 'Forms part of the recognised technical-knowledge component; it does not itself award ChPP.' },
    { number: '2', title: 'CPMO Level 6 — Risk, Issue and Quality Management', owner: 'Institute of Project Controls / KBC recognised route', duration: '1 credit · 4 months', capability: 'Uncertainty, escalation, assurance and improvement.', output: 'Risk recommendation and quality-assurance review.', note: 'Professional recognition remains subject to APM’s independent requirements.' },
    { number: '3', title: 'CPMO Level 6 — Stakeholder Engagement, Communications and Reporting Systems', owner: 'Institute of Project Controls / KBC recognised route', duration: '1 credit · 4 months', capability: 'Influence, technical communication and decision-ready reporting.', output: 'Stakeholder strategy and executive technical report.', note: 'Evidence must be authentic, attributable and professionally current.' },
    { number: '4', title: 'CPMO Level 6 — Project Management Office', owner: 'Institute of Project Controls / KBC recognised route', duration: '1 credit · 4 months', capability: 'Governance, PMO mandate, assurance, services and value.', output: 'PMO governance map or operating-model proposal.', note: 'Successful completion can support technical-knowledge evidence for an eligible APM application.' },
    { number: '5', title: 'Artificial Intelligence in Project Controls Certificate', owner: 'Institute of Project Controls', duration: '1 credit · 4 months', capability: 'Responsible automation, data assurance and human approval.', output: 'Governed AI controls workflow and assurance note.', note: 'This component is not an APM, PMI, APMG or PeopleCert qualification.' },
    { number: '6', title: 'Earned Value Management or Management of Portfolios', owner: 'APMG International', duration: '1 credit · 4 months', capability: 'Choose deeper performance measurement or strategic portfolio context.', output: 'EVM analysis or portfolio decision pack.', note: 'The final elective and external assessment arrangements are confirmed in writing.' },
  ],
  creditNote: 'The four CPMO components form the recognised technical-knowledge route. Completion does not replace APM professional-practice evidence, CPD, ethics, application or interview requirements.',
  capabilityTitle: 'Develop the technical knowledge behind credible professional judgement',
  capabilities: [['Integrated Controls', 'Connect scope, schedule, cost, risk, change and performance.'], ['Planning and Scheduling', 'Understand baselines, dependencies, constraints, forecasts and recovery.'], ['Cost and Performance', 'Interpret variance, trends and forecast implications.'], ['Risk and Uncertainty', 'Analyse and communicate exposure and response.'], ['Governance and Assurance', 'Apply decision rights, control frameworks and escalation.'], ['Stakeholder Leadership', 'Communicate technical evidence to different decision-makers.'], ['Portfolio Context', 'Connect project performance with broader priorities and value.'], ['Professional Practice', 'Exercise judgement, ethics, evidence and reflection.']],
  systemTitle: 'Chartered-level development requires more than knowing individual tools', systemCentre: 'Professional judgement',
  systemItems: ['Scope', 'Schedule', 'Cost', 'Risk', 'Change', 'Quality', 'Stakeholders', 'Resources', 'Benefits', 'Governance', 'Data', 'Assurance'],
  systemExample: ['Schedule delay', 'Cost exposure', 'Resource constraint', 'Risk change', 'Benefits impact', 'Governance decision'],
  systemCopy: 'Complex decisions rarely belong to one discipline. Strong professionals understand how evidence in one area changes the wider delivery system.',
  outputsTitle: 'Build evidence around real professional responsibilities',
  outputGroups: [{ title: 'Analyse', items: ['Integrated controls assessment', 'Baseline review', 'Earned value analysis', 'Schedule recovery analysis'] }, { title: 'Recommend and implement', items: ['Risk recommendation', 'Governance map', 'Stakeholder strategy', 'Portfolio decision analysis', 'Controls dashboard'] }, { title: 'Evidence and reflect', items: ['Professional report', 'Technical presentation', 'Evidence portfolio', 'Reflective professional statement'] }],
  decisionTitle: 'Demonstrate capability through credible professional evidence', decisionCopy: 'Strong evidence shows the professional situation, your responsibility, the evidence used, the judgement exercised, the action taken, the impact achieved and what you learned.',
  decision: ['Context', 'Evidence', 'Judgement', 'Action', 'Impact', 'Reflection'],
  decisionPillars: [['Responsibility', 'Make your accountability and autonomy clear.'], ['Judgement', 'Show options, assumptions, trade-offs and professional reasoning.'], ['Impact', 'Connect action with outcomes and learning.']],
  employerTitle: 'Develop senior professionals who combine technical evidence with professional judgement',
  employerBenefits: [['Integrated Thinking', 'Connect project-control disciplines.'], ['Better Decision Support', 'Translate technical information into recommendations.'], ['Stronger Governance', 'Improve assurance and decision traceability.'], ['Professional Standards', 'Develop recognised professional expectations.'], ['Knowledge Transfer', 'Apply learning in organisational environments.'], ['Retention and Progression', 'Offer experienced professionals a credible development route.']],
  recognitionTitle: 'Understand the APM recognised route', recognitionCopy: 'KBC provides training, technical development, workplace evidence support, coaching and preparation. APM controls ChPP eligibility, assessment, professional-practice requirements, ethics and the final award.',
  recognitionItems: [['KBC pathway', 'Training, technical development, coaching and a recognised technical-knowledge assessment route.'], ['APM application', 'Eligibility, recognised-assessment evidence, professional-practice submission, CPD and proposers.'], ['APM assessment', 'Independent review and interview covering professional practice, ethics, compliance and professionalism.'], ['APM award', 'ChPP is awarded only by APM after all applicable requirements have been satisfied.']],
  finalTitle: 'Explore whether the Chartered Pathway fits your experience and goals', finalCopy: 'Review your role, prior learning, workplace evidence, apprenticeship eligibility and professional progression goals.',
  seoDescription: 'Develop technical project controls knowledge, professional evidence and strategic judgement through KBC’s Chartered Pathway, supporting eligible professionals progressing towards Chartered Project Professional.',
  faqs: [
    { q: 'What is the Chartered Pathway?', a: 'It is a Project Controls Professional Level 6 route combining work-based occupational development with an APM recognised technical-knowledge assessment component and professional evidence support.' },
    { q: 'What is Chartered Project Professional?', a: 'ChPP is a professional standard awarded by the Association for Project Management to applicants who satisfy its current technical knowledge, professional practice, CPD, ethics and assessment requirements.' },
    { q: 'Does completing this pathway automatically make me ChPP?', a: 'No. Completion does not confer ChPP. APM independently assesses eligibility, evidence and the applicable pathway requirements before making any award.' },
    { q: 'What does APM recognised technical knowledge mean?', a: 'APM currently lists Kent Business College Certified PMO Professional Level 6 as a recognised assessment for technical knowledge. It can evidence that element for an eligible Pathway 2 application; other APM requirements still apply.' },
    { q: 'Who should choose the pathway?', a: 'Experienced professionals with relevant responsibilities, current practice, appropriate evidence opportunities, employer support and a professional progression goal.' },
    { q: 'How is it different from Operational?', a: 'Operational focuses on controlling delivery. Chartered focuses on integrated technical knowledge, professional evidence and judgement relevant to ChPP progression.' },
    { q: 'How is it different from Strategic?', a: 'Strategic focuses on programme, portfolio and PMO decisions. Chartered is organised around recognised technical knowledge and wider professional evidence.' },
    { q: 'Can I use evidence from my job?', a: 'Yes, where it is authentic, relevant, attributable and permitted by your organisation. Confidential information should be anonymised and handled under employer controls.' },
    { q: 'How long is the pathway?', a: 'The parent Level 6 programme is structured over 27 months. Individual sequencing and recognised-assessment arrangements are confirmed in the training plan.' },
    { q: 'Is funding available?', a: 'A funded apprenticeship route may be available, subject to current rules, eligibility, employer support, residency, work location, prior learning, suitability, agreed price and written confirmation.' },
    { q: 'Are external awards guaranteed?', a: 'No. External qualifications, memberships and professional status are independently controlled and never guaranteed by pathway completion.' },
  ],
};

export const learningSteps = shared.learning;
export const evidenceQualityNote = shared.evidenceQualityNote;
