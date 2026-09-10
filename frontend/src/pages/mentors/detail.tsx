import SiteLink from '@/components/base/SiteLink';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/feature/Footer';
import { fetchMentor, type Mentor } from '@/services/mentorsApi';

export default function MentorDetailPage() {
  const { id } = useParams();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!id) {
      setFailed(true);
      return;
    }
    let active = true;
    setMentor(null); setFailed(false);
    fetchMentor(id).then(item => {
      if (active) setMentor(item);
    }).catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [id, attempt]);

  if (failed) {
    return (
      <div className="min-h-screen bg-background-50">
        <main className="container-site flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-highlight-700">Mentor profile</p>
          <h1 className="mt-3 text-3xl font-bold text-foreground-950">This mentor profile is not available</h1>
          <button type="button" className="btn-primary mt-6" onClick={() => setAttempt(value => value + 1)}>Retry profile</button>
          <SiteLink href="/" className="mt-6 text-sm font-bold text-primary-700 hover:text-primary-900">Return to the homepage</SiteLink>
        </main>
        <Footer />
      </div>
    );
  }

  if (!mentor) {
    return <div className="page-loader bg-background-50" role="status">Loading mentor profile…</div>;
  }

  return (
    <>
      
      

      <div className="min-h-screen bg-background-50">
        <main className="pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="container-site">
            <SiteLink href="/#mentors" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">
              <i className="ri-arrow-left-line" />
              Back to mentors
            </SiteLink>

            <article className="mt-7 overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[.72fr_1.28fr]">
                <div className="relative min-h-[420px] bg-primary-700">
                  {mentor.imageUrl ? (
                    <img loading="lazy" decoding="async" src={mentor.imageUrl} alt={mentor.name} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full min-h-[420px] items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900">
                      <span className="text-7xl font-bold text-white/90">{mentor.initials}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center p-7 md:p-10 lg:p-14">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-highlight-700">Meet the mentor</p>
                  <h1 className="mt-3 text-4xl font-bold text-foreground-950 md:text-5xl">{mentor.name}</h1>
                  <p className="mt-3 text-base font-semibold text-primary-700">{mentor.role}</p>
                  {mentor.affiliation && <p className="mt-1 text-sm text-foreground-600">{mentor.affiliation}</p>}

                  {mentor.specialties.length > 0 && (
                    <div className="mt-7 flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty) => (
                        <span key={specialty} className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}

                  {mentor.body && <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground-600">{mentor.body}</p>}

                  {mentor.linkedinUrl && (
                    <SiteLink href={mentor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-fit min-h-11 items-center gap-2 rounded-md bg-[#0A66C2] px-5 text-sm font-bold text-white transition-colors hover:bg-[#084f96]">
                      <i className="ri-linkedin-fill text-lg" />
                      View LinkedIn profile
                    </SiteLink>
                  )}
                </div>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
