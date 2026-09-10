import useCollection from '@/hooks/useCollection';
import CollectionState from '@/components/base/CollectionState';
import { useEffect, useState } from 'react';
import SectionHeading from '@/components/base/SectionHeading';
import { fetchCoaches, type Coach } from '@/services/coachesApi';

const supportAreas = [
  ['Portfolio Support', 'Structure strong and relevant workplace evidence.'],
  ['Progress Planning', 'Keep development aligned with programme expectations.'],
  ['Professional Reflection', 'Understand how your capability is developing.'],
  ['Career Development', 'Connect learning with longer-term professional goals.'],
];

function CoachAvatar({ coach }: { coach: Coach }) {
  if (coach.imageUrl) {
    return (
      <img loading="lazy" decoding="async"
        src={coach.imageUrl}
        alt={coach.name}
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 font-heading text-lg font-bold text-white" aria-hidden="true">
      {coach.initials}
    </div>
  );
}

export default function CoachingSupport() {
  const { items: coaches, loading, error, retry } = useCollection(fetchCoaches);



  if (loading || error || coaches.length === 0) return <CollectionState id="coaching-support" label="Coaches" loading={loading} error={error} retry={retry} />;

  return (
    <section id="coaching-support" className="bg-primary-700 py-16 text-white md:py-24">
      <div className="container-site">
        <SectionHeading
          tag="Coaching and support"
          title="Support that connects learning with your professional development"
          subtitle="Coaching connects programme learning, portfolio evidence and career direction. Ask about available academic, wellbeing and professional-community support; inclusions depend on your agreed programme."
          light
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coaches.map(coach => (
            <article key={coach.id} className="rounded-xl border border-white/15 bg-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[.14]">
              <CoachAvatar coach={coach} />
              <h3 className="mt-5 text-xl text-white">{coach.name}</h3>
              <p className="mt-2 text-xs font-semibold text-signal-300">{coach.qualification}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{coach.focus}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {supportAreas.map(([title, copy]) => (
            <div key={title} className="border-t border-white/20 pt-4">
              <h3 className="text-sm text-white">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
