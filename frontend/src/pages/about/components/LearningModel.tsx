const learningModel = [
  { number: '01', title: 'Understand the role', copy: 'Start with current responsibilities, existing capability and the professional direction required.' },
  { number: '02', title: 'Choose the right route', copy: 'Match the programme, specialist focus and access route to the learner and employer context.' },
  { number: '03', title: 'Apply and evidence', copy: 'Use learning in the workplace, test judgement with tutors and build a credible evidence base.' },
  { number: '04', title: 'Review the change', copy: 'Reflect on practice and evaluate the quality of decisions, reporting and professional confidence.' },
];

export default function LearningModel() {
  return (
<section className="bg-white py-16 md:py-24" aria-labelledby="model-title">
          <div className="container-site">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">How we work</span>
              <h2 id="model-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">A route from responsibility to evidence</h2>
            </div>
            <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {learningModel.map((step) => (
                <li key={step.number} className="relative rounded-xl border border-background-200 bg-background-50 p-6">
                  <span className="text-sm font-bold text-highlight-700">{step.number}</span>
                  <h3 className="mt-4 text-lg font-bold text-foreground-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
  );
}
