import SiteLink from '@/components/base/SiteLink';
import { type Mentor } from '@/services/mentorsApi';

/** Section: Meet the mentor. */
interface MeetTheMentorProps {
  mentor: Mentor;
}

export default function MeetTheMentor({ mentor }: MeetTheMentorProps) {
  return (
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
                    <SiteLink href={mentor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="cta-button mt-8 inline-flex w-fit min-h-11 items-center gap-2 rounded-md bg-[#0A66C2] px-5 text-sm font-bold text-white transition-colors hover:bg-[#084f96]">
                      <i className="ri-linkedin-fill text-lg" />
                      View LinkedIn profile
                    </SiteLink>
                  )}
                </div>
              </div>
            </article>
  );
}
