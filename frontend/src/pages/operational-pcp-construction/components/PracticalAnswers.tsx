const faqs = [
  [
    'What is the difference between the Funded Route and IPC Bursary Route?',
    'The Funded Route is supported through the Department for Education and is subject to employment, residency, employer, prior-learning and funding requirements. The IPC Bursary Route is an alternative contribution towards selected pathway fees where DfE funding is unavailable or unsuitable.',
  ],
  [
    'Is the DfE Funded Route guaranteed?',
    'No. It is potentially fully funded for eligible six-credit pathways, but funding is subject to the applicable rules, employer participation, available funding, prior-learning assessment and written confirmation.',
  ],
  [
    'Does six credits always mean six separate modules?',
    'No. Credits describe pathway weight, not always the number of courses. PMP is shown as two credits and Certified PMO Professional Level 6 as four credits.',
  ],
  [
    'Can I tailor my Operational or Strategic pathway?',
    'The pathway builder shows the intended structure: PMP and AI are core, with specialist choices. The final combination must be approved against role responsibilities, employer context and route eligibility.',
  ],
  [
    'Is the AI in Project Controls mandatory?',
    'It is a core component of the six-credit Operational, Strategic and Chartered pathways because data, reporting, dashboards and assurance increasingly require responsible AI-enabled practice.',
  ],
  [
    'Does the Chartered Pathway guarantee ChPP status?',
    'No. Chartered status and professional recognition are controlled by the relevant professional body. The pathway can support evidence and readiness but does not guarantee an external award.',
  ],
  [
    'How does the PMO Certified route differ?',
    'PMO Certified is a focused four-credit route centred on PMO governance, operating models, services and standards rather than the wider six-credit funded pathways.',
  ],
  [
    'What does first-come, first-served mean?',
    'Funded and bursary places are limited. Enquiries are reviewed in order, but no place is confirmed until suitability, eligibility and written agreement are completed.',
  ],
  [
    'What if my employer cannot support the required paid learning time?',
    'Employer participation is required for funded apprenticeship routes. If support is not available, a bursary or commercial route may be discussed where suitable.',
  ],
  [
    'What is the best next step?',
    'Use the quick access-route check, then book a conversation so the College can review your role, employer support, prior learning and preferred pathway.',
  ],
];

export default function PracticalAnswers() {
  return (
    <section id="faq" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
        <header>
          <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">Practical answers</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
            Questions before you enquire.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-600">
            The final pathway, module mix, access route, fees and professional outcomes are confirmed through a written assessment.
          </p>
        </header>

        <div className="grid gap-3">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-lg border border-background-200 bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-foreground-950 [&::-webkit-details-marker]:hidden">
                {question}
                <i className="ri-add-line shrink-0 text-xl text-primary-700 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="border-t border-background-200 px-5 pb-5 pt-4 text-sm leading-relaxed text-foreground-600">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
