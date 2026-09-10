interface HeroProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Hero({ input, onInputChange, onSubmit }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-950 pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="container-site max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-200">The CPCM journal</p>
        <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">Articles & insights</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80">Practical knowledge for your next step in project controls. Explore career routes, sector perspectives and professional development.</p>
        <form role="search" onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="article-search">Search articles</label>
          <input id="article-search" type="search" maxLength={200} value={input} onChange={event => onInputChange(event.target.value)} placeholder="Search articles, topics or keywords" className="min-h-12 min-w-0 flex-1 rounded-lg border border-white/20 bg-white px-4 text-foreground-950" />
          <button className="btn-primary min-h-12 px-7 font-bold" type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}
