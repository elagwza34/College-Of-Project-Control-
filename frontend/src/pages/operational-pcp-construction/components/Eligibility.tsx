import SiteLink from '@/components/base/SiteLink';

export default function Eligibility() {
  return (
<section id="eligibility" className="scroll-mt-44 bg-background-100 py-16 md:py-20"><div className="container-site space-y-6"><h2 className="text-3xl md:text-4xl">Check the right access route for you.</h2><p className="max-w-3xl text-foreground-600">Use our apprenticeship eligibility checker for an initial indication. Our team then reviews role fit, prior learning, employer support and funding. IPC bursary support can be discussed where an apprenticeship route is unsuitable.</p><div className="flex flex-wrap gap-3"><SiteLink href="/apprenticeship-eligibility-checker" className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Check your eligibility</SiteLink><SiteLink href="/book-a-session" className="inline-flex min-h-12 items-center rounded-md border border-primary-700 px-6 font-bold">Discuss your circumstances</SiteLink></div></div></section>
  );
}
