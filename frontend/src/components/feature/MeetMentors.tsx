import useCollection from '@/hooks/useCollection';
import CollectionState from '@/components/base/CollectionState';
import SiteLink from '@/components/base/SiteLink';
import { useState, useEffect } from 'react';
import { fetchMentors, type Mentor } from '@/services/mentorsApi';

function MentorCard({ mentor }: { mentor: Mentor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative w-full min-w-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-white rounded-2xl border border-background-200/70 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary-300/40 hover:-translate-y-1">
        {/* Image / Avatar */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-background-100">
          {mentor.imageUrl ? (
            <img loading="lazy" decoding="async" src={mentor.imageUrl} alt={mentor.name} className="h-full w-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
              <span className="text-5xl md:text-6xl font-heading font-bold text-white/90 tracking-wide">
                {mentor.initials}
              </span>
            </div>
          )}
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/40 via-transparent to-transparent pointer-events-none" />

          {/* Stat badge floating on image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="px-3 py-1.5 rounded-full bg-background-50/90 backdrop-blur-sm border border-background-200/50">
              <span className="text-sm font-semibold text-foreground-700 tracking-wide">
                {mentor.affiliation}
              </span>
            </div>
          </div>

          {/* Corner accent on hover */}
          <div className={`pointer-events-none absolute top-0 right-0 w-16 h-16 transition-all duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-500/20 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Name */}
          <h3 className="text-base md:text-lg font-heading font-bold text-foreground-950 mb-1 leading-tight">
            {mentor.name}
          </h3>

          <p className="mb-3 text-xs font-label font-semibold tracking-wide text-highlight-700">
            {mentor.role}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-background-200 pt-4">
            <SiteLink href={`/mentors/${mentor.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 transition-colors hover:text-primary-900">
              View profile
              <i className="ri-arrow-right-line" />
            </SiteLink>
            {mentor.linkedinUrl && (
              <SiteLink href={mentor.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${mentor.name} on LinkedIn`} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform hover:-translate-y-0.5">
                <i className="ri-linkedin-fill" />
              </SiteLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function MeetMentors() {
  const { items: mentors, loading, error, retry } = useCollection(fetchMentors);



  if (loading || error || mentors.length === 0) return <CollectionState id="mentors" label="Mentors" loading={loading} error={error} retry={retry} />;

  return (
    <section id="mentors" className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#F5F8F9' }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, oklch(var(--primary-200) / 0.15), transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, oklch(var(--highlight-200) / 0.12), transparent 70%)' }} />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-700 mb-5">
            <i className="ri-team-line text-sm" />
            Learn from Practitioners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground-950 leading-tight">
            Learn from people who understand the work
          </h2>
          <p className="mt-4 text-base md:text-lg text-foreground-600 leading-relaxed max-w-2xl mx-auto">
            Our mentors bring professional experience from project, programme, PMO and Project Controls environments.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{mentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}</div>
        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 md:px-8 md:py-5 bg-white rounded-2xl border border-background-200/70 shadow-sm w-full">
            <div className="flex items-center gap-4 text-left">
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600 flex-shrink-0">
                <i className="ri-shield-user-line text-xl" />
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-foreground-900">
                  Learn from practitioners with real project and controls experience
                </p>
                <p className="text-xs md:text-sm text-foreground-600 mt-0.5">
                  Mentors bring experience from project, programme, PMO and Project Controls environments.
                </p>
              </div>
            </div>
            <SiteLink
              href="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover shrink-0 w-full sm:w-auto"
            >
              <i className="ri-user-star-line" />
              Talk to Our Team
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
