export default function Bullets({ items, light = false }: { items: string[]; light?: boolean }) {
  return <ul className="space-y-2">{items.map(item => <li key={item} className={`flex gap-2 text-sm leading-relaxed ${light ? 'text-white/80' : 'text-foreground-600'}`}><i className={`ri-check-line mt-0.5 shrink-0 ${light ? 'text-signal-300' : 'text-accent-700'}`} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}
