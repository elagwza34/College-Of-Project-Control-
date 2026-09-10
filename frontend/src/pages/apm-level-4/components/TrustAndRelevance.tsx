import SectionHeading from '@/components/base/SectionHeading';

export default function TrustAndRelevance() {
  return (
<section className="py-16 md:py-24"><div className="container-site text-center"><SectionHeading tag="Trust and relevance" title="Built for professionals and employers across project-driven sectors" subtitle="The learning model connects live teaching, workplace application, portfolio evidence, coaching and employer-supported progress reviews." className="mb-10" /><div className="flex flex-wrap justify-center gap-3">{['Business services', 'Transformation', 'Technology', 'Engineering', 'Construction', 'Infrastructure', 'Manufacturing', 'Consultancy'].map(sector => <span key={sector} className="rounded-full border border-background-200 bg-white px-4 py-2 text-xs font-semibold text-foreground-700">{sector}</span>)}</div><p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-foreground-600">No verified programme-specific testimonial copy or approved employer-logo assets were available locally, so endorsements have not been invented or implied.</p></div></section>
  );
}
