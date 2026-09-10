import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';
import { faqs } from '../programmeData';

export default function FrequentlyAskedQuestions() {
  return (
<section id="faq" className="bg-white py-16 md:py-24"><div className="container-site max-w-4xl"><SectionHeading tag="Frequently asked questions" title="Associate Project Manager Level 4, clearly explained" className="mb-10" /><div className="space-y-3">{faqs.map((faq, index) => <details key={faq.q} className="group rounded-lg border border-background-200 bg-background-50"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"><h3 className="text-sm font-semibold md:text-base">{faq.q}</h3><i className="ri-add-line shrink-0 text-xl text-primary-600 transition-transform group-open:rotate-45" aria-hidden="true" /></summary><div className="border-t border-background-200 px-5 py-4"><p className="text-sm leading-relaxed text-foreground-600">{faq.a}</p>{index === 10 && <SiteLink href="#funding" className="mt-3 inline-flex text-sm font-bold text-primary-700">Review funding indicators <i className="ri-arrow-right-line ml-2" aria-hidden="true" /></SiteLink>}</div></details>)}</div></div></section>
  );
}
