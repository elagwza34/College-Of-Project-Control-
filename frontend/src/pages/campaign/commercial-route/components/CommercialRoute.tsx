import SectionHeading from '@/components/base/SectionHeading';

export default function CommercialRoute() {
  return (
<section id="commercial-route" className="py-12 md:py-16 bg-background-100">
          <div className="container-site max-w-4xl mx-auto">
            <SectionHeading
              tag="Commercial Route"
              title="The Same Professional Development. A Different Funding Route."
              subtitle="The commercial pathway gives you access to the same structured professional development, tutoring, Master Class Events and APM ChPP readiness support as the apprenticeship-funded route."
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <h4 className="text-sm font-heading font-bold text-foreground-900 mb-3">What is included</h4>
                <ul className="space-y-2">
                  {[
                    'Structured Level 6 professional development',
                    'One-to-one tutoring and coaching',
                    'London Master Class Events',
                    'APM ChPP readiness support',
                    'Professional exams and memberships covered where applicable',
                    'Workplace evidence portfolio development',
                    'Live online delivery with flexible scheduling',
                    'Interest-free instalment payment options',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground-700">
                      <i className="ri-check-line text-highlight-600 mt-0.5 flex-shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <h4 className="text-sm font-heading font-bold text-foreground-900 mb-3">Financial support options</h4>
                <ul className="space-y-2">
                  {[
                    'Interest-free monthly instalment plans',
                    'KBC discretionary bursary — means-tested support',
                    'Early payment discounts where applicable',
                    'No hidden fees or additional assessment costs',
                    'Transparent pricing discussed before enrolment',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground-700">
                      <i className="ri-money-pound-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-foreground-400 italic">
                  KBC bursary support is discretionary and subject to availability. Speak to an adviser for current options.
                </p>
              </div>
            </div>
          </div>
        </section>
  );
}
