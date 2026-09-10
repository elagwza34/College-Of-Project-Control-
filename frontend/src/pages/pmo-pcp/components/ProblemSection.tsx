const problemCards = [
  {
    title: 'Governance Confidence',
    text: 'Clarify who decides, who escalates and how assurance should work.',
  },
  {
    title: 'Reporting With Meaning',
    text: 'Explain what the information means and what decision is required.',
  },
  {
    title: 'Integrated Controls',
    text: 'Connect schedule, cost, risk, quality, issues and change.',
  },
  {
    title: 'Assurance Before Failure',
    text: 'Identify warning signs before they become delivery surprises.',
  },
  {
    title: 'Professional PMO Influence',
    text: 'Help PMO professionals contribute confidently in senior forums.',
  },
];

export default function ProblemSection() {
  return (
<section className="py-16 md:py-24 bg-canvas">
            <div className="container-site">
              <div className="text-center mb-4">
                <span className="label-editorial">Why This Route Exists</span>
              </div>
              <h2 className="heading-editorial text-2xl md:text-3xl lg:text-4xl text-center mb-4">
                It is time to stop asking PMOs only for reports.
              </h2>
              <p className="text-center text-sm text-ink/70 leading-relaxed max-w-xl mx-auto mb-12">
                A PMO should not simply chase updates, maintain templates and distribute dashboards. It should help leaders understand confidence, risk, priorities, options and action.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {problemCards.map((card) => (
                  <div key={card.title} className="card-editorial p-5 md:p-6">
                    <h3 className="font-heading text-lg text-ink mb-2">{card.title}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
  );
}
