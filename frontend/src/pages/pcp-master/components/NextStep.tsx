import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';

export default function NextStep() {
  return (
<section id="next-step" className="bg-secondary-500 py-16 text-white md:py-20"><div className="container-site"><SectionHeading tag="Next step" title="Ready to choose the right Project Controls Professional Level 6 pathway?" subtitle="Start with a one-to-one conversation about your current role, employer position, evidence opportunities, funding and pathway fit." light className="mb-10" /><div className="flex flex-col justify-center gap-3 sm:flex-row"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold">Request a consultation</SiteLink><SiteLink href="#events" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-semibold text-white">Explore events</SiteLink><SiteLink href="mailto:office@kentbusinesscollege.org?subject=Project%20Controls%20Professional%20Level%206" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-semibold text-white">Email Alice Saunders</SiteLink></div></div></section>
  );
}
