import SiteLink from '@/components/base/SiteLink';
const examples = [
 ['Planning and forecasting', 'Compare the current schedule with its baseline, explain the causes of variance and propose a recovery action.'],
 ['Cost and risk visibility', 'Connect changes in cost forecasts with risk ownership, assumptions and the evidence behind an escalation.'],
 ['Decision support', 'Prepare a short governance brief that describes the issue, available options and the decision required.'],
];
export default function OutcomeExamples({ title = 'What you could apply at work' }: { title?: string }) {
 return <section id="outcome-examples" className="section-space bg-background-100"><div className="container-site"><p className="text-sm font-semibold text-primary-700">Example scenarios</p><h2 className="mt-3 text-3xl">{title}</h2><p className="mt-4 max-w-3xl text-foreground-600">These illustrative workplace tasks explain the capability programmes aim to develop. They are not learner testimonials, measured results or guaranteed outcomes.</p><div className="mt-8 grid gap-6 md:grid-cols-3">{examples.map(([heading, copy]) => <article key={heading} className="card-premium p-6"><h3 className="text-xl">{heading}</h3><p className="mt-4 text-foreground-600">{copy}</p></article>)}</div><SiteLink href="/book-a-session" className="btn-primary mt-8">Discuss your development goals</SiteLink></div></section>;
}
