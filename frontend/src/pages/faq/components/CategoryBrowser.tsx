import { useState } from 'react';

interface FaqCategory {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  introduction: string;
  items: { question: string; answer: string }[];
}

const categories: FaqCategory[] = [
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
      { question: 'What happens after I book a session?', answer: 'The team discusses your role, goals, experience, employer position and possible funding route, then explains the most relevant next step.' },
      { question: 'What information should I prepare?', answer: 'Be ready to describe your responsibilities, recent project experience, employer situation, previous qualifications and what you want to achieve.' },
      { question: 'What learner support is available?', answer: 'Support may include live teaching, coaching, progress reviews, workplace-evidence guidance and professional-development support according to the programme.' },
      { question: 'When are start dates confirmed?', answer: 'Cohort availability can change. Admissions confirms current intake options and any conditions that must be completed before enrolment.' },
    ],
  },
];

export default function CategoryBrowser() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const activeCategory = categories.find((category) => category.id === activeId) ?? categories[0];

  return (
    <>
      <section className="border-b border-background-200 bg-white py-5 md:hidden">
          <div className="container-site">
            <label htmlFor="faq-category" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-foreground-600">Choose a category</label>
            <select id="faq-category" value={activeId} onChange={(event) => setActiveId(event.target.value)} className="w-full rounded-lg border border-background-300 bg-background-50 px-4 py-3 text-sm font-semibold text-foreground-900 focus:border-primary-500 focus:outline-none">
              {categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
            </select>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container-site flex items-start gap-10 lg:gap-16">
            <aside className="sticky top-32 hidden max-h-[calc(100vh-10rem)] w-64 shrink-0 self-start overflow-y-auto rounded-xl border border-background-200 bg-white p-4 shadow-sm md:block" aria-label="FAQ categories">
              <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.16em] text-foreground-400">Browse by topic</p>
              <nav className="border-l border-background-300">
                {categories.map((category) => {
                  const active = category.id === activeId;
                  return <button key={category.id} type="button" onClick={() => setActiveId(category.id)} aria-current={active ? 'page' : undefined} className={`-ml-px flex w-full items-center gap-3 border-l-2 px-4 py-3 text-left text-sm transition-colors ${active ? 'border-signal-500 bg-white font-bold text-primary-800' : 'border-transparent text-foreground-600 hover:border-primary-300 hover:text-primary-700'}`}>
                    <i className={`${category.icon} text-base ${active ? 'text-signal-600' : 'text-foreground-400'}`} aria-hidden="true" />
                    {category.shortLabel}
                  </button>;
                })}
              </nav>
            </aside>

            <div key={activeCategory.id} className="min-w-0 w-full max-w-3xl flex-1">
              <div className="border-b border-background-200 pb-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className={`${activeCategory.icon} text-xl`} aria-hidden="true" /></span>
                <h2 className="mt-5 text-3xl font-bold text-foreground-950 md:text-4xl">{activeCategory.label}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-600 md:text-base">{activeCategory.introduction}</p>
              </div>
              <div className="mt-7 space-y-3">
                {activeCategory.items.map((item, index) => <details key={item.question} className="group rounded-xl border border-background-200 bg-white open:border-primary-300 open:shadow-sm" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 md:px-6">
                    <h3 className="text-base font-bold text-foreground-900 md:text-lg">{item.question}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-100 text-primary-700 transition-transform group-open:rotate-45" aria-hidden="true"><i className="ri-add-line text-lg" /></span>
                  </summary>
                  <div className="border-t border-background-200 px-5 py-5 md:px-6"><p className="text-sm leading-relaxed text-foreground-600 md:text-base">{item.answer}</p></div>
                </details>)}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
