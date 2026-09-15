import type * as React from 'react';
import { FaqCategory,categories } from "./BrowseByTopicData";

/** Section: Browse by topic. */
interface FAQCategoriesProps {
  activeId: string;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: FaqCategory;
}

export default function BrowseByTopicSection({ activeId, setActiveId, activeCategory }: FAQCategoriesProps) {
  return (
    <section className="py-14 md:py-20">
          <div className="container-site flex items-start gap-10 lg:gap-16">
            <aside className="sticky top-32 hidden max-h-[calc(100vh-10rem)] w-64 shrink-0 self-start overflow-y-auto rounded-xl border border-background-200 bg-white p-4 shadow-sm md:block" aria-label="FAQ categories">
              <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.16em] text-foreground-400">Browse by topic</p>
              <nav className="border-l border-background-300">
                {categories.map((category) => {
                  const active = category.id === activeId;
                  return <button key={category.id} type="button" onClick={() => setActiveId(category.id)} aria-current={active ? 'page' : undefined} className={`-ml-px flex w-full items-center gap-3 border-l-2 px-4 py-3 text-left text-sm transition-colors ${active ? 'border-signal-500 bg-white font-bold text-primary-800' : 'border-transparent text-foreground-600 hover:border-primary-300 hover:text-primary-700'}`}>
                    <i className={`${category.icon} text-base ${active ? 'text-signal-600' : 'text-foreground-400'}`} aria-hidden="true" />
                    {category.shortLabel}
                  </button>;
                })}
              </nav>
            </aside>

            <div key={activeCategory.id} className="min-w-0 w-full max-w-3xl flex-1">
              <div className="border-b border-background-200 pb-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className={`${activeCategory.icon} text-xl`} aria-hidden="true" /></span>
                <h2 className="mt-5 text-3xl font-bold text-foreground-950 md:text-4xl">{activeCategory.label}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-600 md:text-base">{activeCategory.introduction}</p>
              </div>
              <div className="mt-7 space-y-3">
                {activeCategory.items.map((item, index) => <details key={item.question} className="group rounded-xl border border-background-200 bg-white open:border-primary-300 open:shadow-sm" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 md:px-6">
                    <h3 className="text-base font-bold text-foreground-900 md:text-lg">{item.question}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-100 text-primary-700 transition-transform group-open:rotate-45" aria-hidden="true"><i className="ri-add-line text-lg" /></span>
                  </summary>
                  <div className="border-t border-background-200 px-5 py-5 md:px-6"><p className="text-sm leading-relaxed text-foreground-600 md:text-base">{item.answer}</p></div>
                </details>)}
              </div>
            </div>
          </div>
        </section>
  );
}
