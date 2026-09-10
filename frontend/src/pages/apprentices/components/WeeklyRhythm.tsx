import { useReveal } from '@/hooks/useReveal';

const weeklyRhythm = [
  { day: 'Monday', icon: 'ri-live-line', title: 'Live Online Session', desc: '90-minute interactive class with your cohort and practitioner tutor.' },
  { day: 'Tuesday', icon: 'ri-task-line', title: 'Self-Directed Study', desc: 'Apply the Monday concepts to your workplace project and portfolio.' },
  { day: 'Wednesday', icon: 'ri-chat-3-line', title: 'Mentor Check-In', desc: 'One-to-one 30-minute call with your dedicated industry mentor.' },
  { day: 'Thursday', icon: 'ri-group-line', title: 'Peer Workshop', desc: 'Small group session — share progress, solve problems together.' },
  { day: 'Friday', icon: 'ri-file-chart-line', title: 'Portfolio & Reflection', desc: 'Document your evidence and prepare for the next module.' },
];

function RhythmCard({ day, i }: { day: typeof weeklyRhythm[0]; i: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-highlight-50/50 transition-colors duration-300"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-16px)', transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${i * 60}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${i * 60}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-highlight-100 flex items-center justify-center flex-shrink-0">
        <i className={`${day.icon} text-lg text-highlight-600`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-semibold text-foreground-800">{day.title}</span>
          <span className="text-sm font-semibold text-highlight-600 bg-highlight-100 px-2 py-0.5 rounded-full">{day.day}</span>
        </div>
        <p className="text-xs text-foreground-600 leading-relaxed">{day.desc}</p>
      </div>
    </div>
  );
}


export default function WeeklyRhythm() {
  const rhythmRef = useReveal(0.05);
  return (
<div id="rhythm" className="bg-white py-16 md:py-24 border-t border-background-200/40">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Image */}
              <div className="relative" ref={rhythmRef.ref}>
                <div
                  className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                  style={{ opacity: rhythmRef.visible ? 1 : 0, transform: rhythmRef.visible ? 'translateX(0)' : 'translateX(-24px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                  <img loading="lazy" decoding="async"
                    src="https://readdy.ai/api/search-image?query=Young%20diverse%20professionals%20collaborating%20around%20laptop%20and%20documents%20in%20bright%20modern%20coworking%20space%20with%20warm%20natural%20light%20from%20large%20arched%20windows%2C%20exposed%20brick%20and%20modern%20minimalist%20interior%20design%2C%20green%20plants%2C%20focused%20engaged%20expressions%2C%20warm%20neutral%20earth%20tones%2C%20editorial%20lifestyle%20photography%2C%20authentic%20candid%20moment%2C%20soft%20bokeh%20background%2C%20high%20end%20corporate%20training%20atmosphere&width=1200&height=900&seq=apprentices-weekly-v2&orientation=landscape"
                    alt="Learners collaborating in modern workspace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/15 via-transparent to-transparent" />
                </div>

                {/* Floating testimonial card */}
                <div
                  className="absolute -bottom-5 -right-3 md:-right-6 max-w-[300px] bg-white rounded-2xl p-5 border border-background-200/60 shadow-lg"
                  style={{ opacity: rhythmRef.visible ? 1 : 0, transform: rhythmRef.visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1) 400ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 400ms' }}
                >
                  <p className="text-xs font-semibold text-primary-700">Example learning scenario</p>
                  <p className="mt-2 text-sm text-foreground-700">A learner reviews a workplace task with their mentor, then applies the feedback to their next project output.</p>
                </div>
              </div>

              {/* Right: Rhythm Cards */}
              <div>
                <div style={{ opacity: rhythmRef.visible ? 1 : 0, transform: rhythmRef.visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1) 100ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 100ms' }}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-700 mb-5">
                    <i className="ri-calendar-check-line text-sm" />
                    Weekly Rhythm
                  </span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 leading-tight mb-2">
                    What Your Week Looks Like
                  </h2>
                  <p className="text-sm text-foreground-600 mb-8 max-w-md">
                    A structured weekly cadence — learn, apply, get feedback, and build your evidence. Designed to fit around your full-time role.
                  </p>
                </div>
                <div className="space-y-1">
                  {weeklyRhythm.map((day, i) => (
                    <RhythmCard key={day.day} day={day} i={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
