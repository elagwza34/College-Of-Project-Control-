const faqs = [
  { q: 'How quickly will I hear back?', a: 'Our team reviews enquiries within 24 hours on working days and will follow up by email or phone with your next step.' },
  { q: 'Is there any obligation to enrol?', a: 'None. Getting in touch is simply the start of a conversation to understand your role, goals and the most relevant option.' },
  { q: 'What if I am enquiring on behalf of my employer?', a: 'Select "Employer" or "HR / L&D" in the form. We regularly work with organisations building capability across a team.' },
  { q: 'Can I speak to someone instead of emailing?', a: 'Yes. Request an adviser call above, or book a consultation directly from the events page at a time that suits you.' },
];

export default function Faq() {
  return (
<section className="bg-white py-16 md:py-24">
          <div className="container-site max-w-3xl">
            <div className="text-center">
              <span className="mb-4 inline-block rounded-full border border-primary-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600">
                Before you reach out
              </span>
              <h2 className="text-2xl font-bold leading-tight text-foreground-950 md:text-3xl">
                A few quick answers
              </h2>
            </div>
            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-background-200 bg-background-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">
                    <h3 className="text-sm font-semibold text-foreground-900 md:text-base">{faq.q}</h3>
                    <i className="ri-add-line shrink-0 text-xl text-primary-700 transition-transform group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="border-t border-background-200 px-5 py-4 text-sm leading-relaxed text-foreground-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
  );
}
