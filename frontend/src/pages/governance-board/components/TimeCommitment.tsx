const commitment = [
  { value: '4', title: 'Board Meetings', description: 'Four formal Board meetings per year.' },
  { value: '1+', title: 'Committee Participation', description: 'Members contribute to at least one standing committee where appropriate.' },
  { value: 'Periodic', title: 'Strategic Sessions', description: 'Participation in occasional strategic planning activities.' },
  { value: '3 Years', title: 'Term Length', description: 'Initial three-year appointment with possible renewal subject to review.' },
];

export default function TimeCommitment() {
  return (
<section id="commitment" className="bg-secondary-600 py-16 text-white md:py-24" aria-labelledby="commitment-title">
          <div className="container-site">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight-300">Time commitment</span>
              <h2 id="commitment-title" className="mt-3 text-3xl font-bold text-white md:text-4xl">A meaningful commitment with strategic impact</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {commitment.map((item, index) => (
                <div key={item.title} className={`px-2 text-center sm:text-left ${index > 0 ? 'sm:border-l sm:border-white/15 sm:pl-6' : ''}`}>
                  <p className="text-3xl font-bold text-highlight-300 md:text-4xl">{item.value}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-xs text-white/50">Renewal beyond the initial term is not guaranteed and remains subject to periodic Board review.</p>
          </div>
        </section>
  );
}
