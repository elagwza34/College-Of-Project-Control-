import { useState } from 'react';

import SectionHeading from '@/components/base/SectionHeading';

const faqs = [
  ['Can we use an apprenticeship to develop an existing employee?', 'Yes, apprenticeships can support eligible existing employees where the programme provides substantial new learning and is appropriate for their role and development needs. Final suitability and funding are confirmed during the pre-enrolment review.'],
  ['How involved does the employer need to be?', 'Employer involvement is an important part of work-based training. This includes supporting workplace learning, attending progress reviews, providing feedback and helping the employee access suitable development opportunities.'],
  ['How often will we review progress?', 'KBC normally uses structured tripartite progress reviews involving the learner, employer and coach approximately every 10 weeks.'],
  ['Can training be aligned with our business priorities?', "Yes. Where the programme allows it, KBC works with the employer and learner to connect learning, workplace evidence and development activities with the employee's real responsibilities and organisational context."],
  ['How much will the programme cost us?', 'The funding position varies by programme, employee and employer. KBC confirms the applicable route before enrolment.'],
  ['Do employees need to leave work to study?', 'Programmes are designed around employed learners and combine structured learning with workplace application. The employer must support the learning commitment required by the relevant programme.'],
  ['Can you help us decide which employee or programme is the right fit?', 'Yes. The discussion can start with the role, current capability and development objective before a programme is selected.'],
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
<section id="faq" className="bg-white py-16 md:py-24"><div className="container-site max-w-4xl"><SectionHeading title="Questions employers usually ask before starting" className="mb-10" /><div className="space-y-3">{faqs.map(([q, a], i) => <article key={q} className="overflow-hidden rounded-xl border border-background-200"><h3><button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left text-sm font-bold hover:bg-background-50 md:text-base"><span>{q}</span><i className={`ri-${openFaq === i ? 'subtract' : 'add'}-line text-xl text-primary-600`} /></button></h3>{openFaq === i && <div id={`faq-${i}`} className="border-t border-background-200 bg-background-50 px-5 py-4"><p className="text-sm text-foreground-600">{a}</p></div>}</article>)}</div></div></section>
  );
}
