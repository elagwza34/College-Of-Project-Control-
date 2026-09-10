import SectionHeading from '@/components/base/SectionHeading';
import { curriculum } from '../programmeData';

export default function WhatYouWillLearn() {
  return (
<section id="curriculum" className="py-16 md:py-24"><div className="container-site">
        <SectionHeading tag="What you will learn" title="A curriculum built around real project responsibilities" subtitle="Explore the capability groups without losing sight of how they connect across the full project lifecycle." className="mb-12" />
        <div className="mx-auto max-w-4xl space-y-3">{curriculum.map((group, index) => <details key={group.title} className="group rounded-xl border border-background-200 bg-white open:border-primary-200 open:shadow-sm" open={index === 0}><summary className="flex cursor-pointer list-none items-center gap-4 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700"><i className={group.icon} aria-hidden="true" /></span><h3 className="flex-1 text-base md:text-lg">{group.title}</h3><i className="ri-add-line text-xl text-primary-600 transition-transform group-open:rotate-45" aria-hidden="true" /></summary><div className="border-t border-background-200 px-5 py-5 md:pl-[5.25rem]"><div className="grid gap-2 sm:grid-cols-2">{group.items.map(item => <p key={item} className="flex gap-2 text-sm text-foreground-600"><i className="ri-arrow-right-s-line text-accent-700" aria-hidden="true" />{item}</p>)}</div></div></details>)}</div>
      </div></section>
  );
}
