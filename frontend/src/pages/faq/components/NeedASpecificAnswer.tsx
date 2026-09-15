import SiteLink from '@/components/base/SiteLink';

export default function NeedASpecificAnswer() {
  return (
    <section className="border-t border-background-200 bg-white py-12 md:py-16">
          <div className="container-site">
            <div className="max-w-3xl rounded-2xl bg-primary-950 p-7 text-white md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-signal-300">Need a specific answer?</p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Talk through your role, programme or funding position.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">Our team can help identify the right next step without asking you to choose a route alone.</p>
              <SiteLink href="/book-a-session" className="btn-primary mt-6 inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-bold transition-colors">Request a consultation<i className="ri-arrow-right-line" aria-hidden="true" /></SiteLink>
            </div>
          </div>
        </section>
  );
}
