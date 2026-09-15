import type * as React from 'react';
import { categories } from "./BrowseByTopicData";

/** Section: Choose a category. */
interface SectionProps {
  activeId: string;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChooseACategory({ activeId, setActiveId }: SectionProps) {
  return (
    <section className="border-b border-background-200 bg-white py-5 md:hidden">
          <div className="container-site">
            <label htmlFor="faq-category" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-foreground-600">Choose a category</label>
            <select id="faq-category" value={activeId} onChange={(event) => setActiveId(event.target.value)} className="w-full rounded-lg border border-background-300 bg-background-50 px-4 py-3 text-sm font-semibold text-foreground-900 focus:border-primary-500 focus:outline-none">
              {categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
            </select>
          </div>
        </section>
  );
}
