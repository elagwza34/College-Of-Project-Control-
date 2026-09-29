import SiteLink from '@/components/base/SiteLink';
import { fetchMentors, type Mentor } from '@/services/mentorsApi';
import { useEffect, useState } from 'react';

function relevanceStatement(mentor: Mentor) {
  const source = mentor.body || mentor.specialties.join(', ') || mentor.affiliation;
  return source.split('. ')[0].replace(/\.$/, '');
}

/** Section: Learn from practitioners. */
export default function LearnFromPractitioners() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetchMentors()
      .then((items) => {
        if (active) setMentors(items.slice(0, 3));
      })
      .catch(() => {
        if (active) setMentors([]);
      })
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loaded || mentors.length === 0) return null;

  return (
    <section id="mentors" className="bg-background-50 py-16 md:py-24" aria-labelledby="practitioners-heading">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-accent-700">Learn from practitioners</p>
          <h2 id="practitioners-heading" className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground-950 md:text-5xl">
            Learn from people who understand the work
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-600 md:text-lg">
            Learn with practitioners who bring experience from project, programme, PMO and project-controls environments.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <article key={mentor.id} className="flex h-full flex-col overflow-hidden rounded-xl border border-background-200 bg-white shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-primary-950">
                {mentor.imageUrl ? (
                  <img
                    src={mentor.imageUrl}
                    alt={mentor.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary-800">
                    <span className="font-heading text-5xl font-bold text-white">{mentor.initials}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-xl font-bold leading-tight text-foreground-950">{mentor.name}</h3>
                <p className="mt-2 text-sm font-bold text-primary-700">{mentor.role}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground-600">{relevanceStatement(mentor)}</p>
                <SiteLink href={`/mentors/${mentor.id}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-700">
                  View profile
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
