import SectionHeading from "@/components/base/SectionHeading";
import { workloadItems } from "../programmeData";

export default function ExpectedWorkload() {
  return (
    <section id="workload" className="py-16 md:py-24">
      <div className="container-site">
        <SectionHeading
          tag="Expected workload"
          title="A structured weekly rhythm for working professionals"
          subtitle="Apprenticeship learners must complete 840 off-the-job hours across the programme. Weekly live teaching is two hours."
          className="mb-12"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {workloadItems.map((item) => (
            <article key={item.title} className="card-premium p-6">
              <p className="text-3xl font-bold text-primary-700">
                {item.value}
              </p>
              <h3 className="mt-3 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-foreground-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-5 rounded-lg border border-highlight-300 bg-highlight-50 p-4 text-xs text-foreground-700">
          <strong>Confirm your study plan:</strong> Ask the College to confirm
          your weekly learning commitment and total programme hours before
          enrolment.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-xl bg-white p-6">
            <h3 className="text-xl">Monthly submissions</h3>
            <p className="mt-4 text-sm font-semibold">1. LMS activities</p>
            <p className="mt-1 text-sm text-foreground-600">
              Reading, quizzes, podcasts and online learning activities.
            </p>
            <p className="mt-4 text-sm font-semibold">
              2. Portfolio-building activities
            </p>
            <p className="mt-1 text-sm text-foreground-600">
              Applied project controls evidence, reflections and professional
              commentary.
            </p>
          </article>
          <article className="rounded-xl bg-white p-6">
            <h3 className="text-xl">Coaching and reviews</h3>
            <p className="mt-4 text-sm">
              <strong>Monthly · 1 hour:</strong> present Knowledge, Skills and
              Behaviours progression and agree evidence, learning needs and next
              actions.
            </p>
            <p className="mt-4 text-sm">
              <strong>Every 10 weeks · 1 hour:</strong> learner, coach and line
              manager review progression, feedback and development needs.
            </p>
          </article>
        </div>
        <p className="mt-5 text-xs text-foreground-600">
          Portfolio evidence should be authentic, relevant, professionally
          presented and anonymised where employer, client, project or commercial
          information is confidential.
        </p>
      </div>
    </section>
  );
}
