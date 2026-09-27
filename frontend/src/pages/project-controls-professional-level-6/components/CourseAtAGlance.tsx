import SiteLink from '@/components/base/SiteLink';
import { cohorts, programmeStats } from '../programmeData';

export default function CourseAtAGlance() {
  return (
    <section className="bg-white py-14" aria-labelledby="glance-title">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Course at a glance</span>
            <h2 id="glance-title" className="mt-2 text-3xl">Choose your preferred cohort</h2>
          </div>
          <p className="text-sm text-foreground-600">January · April · September intake windows</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programmeStats.map(stat => (
            <article key={stat.value} className="card-premium p-5">
              <i className={`${stat.icon} text-xl text-accent-700`} aria-hidden="true" />
              <p className="mt-4 text-2xl font-bold text-primary-800">{stat.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground-600">{stat.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {cohorts.map(cohort => (
            <SiteLink
              key={cohort.month}
              href="#register"
              className={`flex items-center justify-between rounded-xl border p-4 ${cohort.featured ? 'border-signal-400 bg-signal-50' : 'border-background-200 bg-background-50'}`}
            >
              <span>
                <strong className="block text-base">{cohort.month}</strong>
                <span className="text-xs text-foreground-600">{cohort.status}</span>
              </span>
              <i className="ri-arrow-right-line text-primary-600" />
            </SiteLink>
          ))}
        </div>

        
      </div>
    </section>
  );
}
