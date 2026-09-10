const candidateProfile = [
  'Senior professional experience.',
  'Strategic thinking.',
  'Ability to provide independent challenge.',
  'Commitment to education and professional development.',
  'Strong communication skills.',
  'Experience working within complex organisations.',
];

export default function Profile() {
  return (
<section id="profile" className="bg-background-50 py-16 md:py-24" aria-labelledby="profile-title">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">Candidate profile</span>
                <h2 id="profile-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">Who we are looking for</h2>
                <p className="mt-4 text-base leading-relaxed text-foreground-600">Ideal candidates should demonstrate the following, informed by senior professional experience across sectors.</p>
              </div>
              <div className="card-premium p-7 md:p-9">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {candidateProfile.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white" aria-hidden="true">
                        <i className="ri-check-line text-sm" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground-700 md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
  );
}
