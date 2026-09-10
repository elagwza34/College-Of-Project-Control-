import SiteLink from '@/components/base/SiteLink';

export default function Stories() {
  return (
<section id="stories" className="bg-secondary-500 py-16 text-white"><div className="container-site grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><span className="text-xs font-semibold uppercase tracking-[.18em] text-highlight-300">Example scenarios</span><h2 className="mt-3 text-3xl text-white md:text-4xl">See how learning translates into workplace development.</h2><p className="mt-4 max-w-3xl text-white/75">Explore illustrative workplace tasks and the capabilities programmes aim to develop. These examples are not measured employer results.</p></div><SiteLink href="/testimonials" className="btn-primary inline-flex min-h-12 items-center px-6 text-sm font-bold">Explore workplace examples</SiteLink></div></section>
  );
}
