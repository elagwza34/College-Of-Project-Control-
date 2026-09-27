import SectionHeading from "@/components/base/SectionHeading";
import SiteLink from "@/components/base/SiteLink";
import { outcomes } from "../programmeData";

export default function BuildCapabilityThatTransfersDirectlyToYourRole() {
  return (
    <section id="overview" className="py-16 md:py-24">
      <div className="container-site">
        <SectionHeading
          tag="Build capability that transfers directly to your role"
          title="Become a more confident, structured and commercially aware project professional"
          subtitle="Strengthen the capabilities professionals use every day to plan, coordinate, communicate and deliver successful projects."
          className="mb-12"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.map(([title, copy], index) => (
            <article key={title} className="card-premium-hover p-6">
              <span className="text-sm font-bold text-accent-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600">
                {copy}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-primary-700 p-6 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-signal-300">
              Upcoming cohorts
            </p>
            <h2 className="mt-2 text-2xl text-white">
              January · April · September
            </h2>
            <p className="mt-2 text-sm text-white/65">
              Availability and the most suitable start date are confirmed by
              admissions.
            </p>
          </div>
          <SiteLink
            href="/book-a-session"
            className="cta-button mt-5 inline-flex min-h-12 items-center rounded-md bg-white px-5 text-sm font-bold text-primary-800 md:mt-0"
          >
            View Next Available Cohort{" "}
            <i className="ri-arrow-right-line ml-2" aria-hidden="true" />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
