import SiteLink from '@/components/base/SiteLink';
import type { CardItem } from './cardTypes';

export default function CardGrid({ items, columns = 'lg:grid-cols-3' }: { items: CardItem[]; columns?: string }) {
  return <div className={`grid gap-5 sm:grid-cols-2 ${columns}`}>{items.map((item) => <article key={item.title} className="card-premium-hover flex h-full flex-col p-6 md:p-7"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-100 text-accent-700" aria-hidden="true"><i className={`${item.icon} text-xl`} /></span><h3 className="mt-5 text-lg font-bold text-foreground-950">{item.title}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-600">{item.description}</p>{item.href && item.cta && <SiteLink href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900">{item.cta}<i className="ri-arrow-right-line" aria-hidden="true" /></SiteLink>}</article>)}</div>;
}
