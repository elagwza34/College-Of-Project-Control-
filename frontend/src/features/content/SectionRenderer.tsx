import type { CmsSection } from '@/types/cms'

type UnknownRecord = Record<string, unknown>

function text(data: UnknownRecord, key: string): string {
  return typeof data[key] === 'string' ? data[key] : ''
}

function records(data: UnknownRecord, key: string): UnknownRecord[] {
  return Array.isArray(data[key])
    ? data[key].filter((item): item is UnknownRecord => typeof item === 'object' && item !== null)
    : []
}

function CtaLink({ data, className = 'button button-accent' }: { data: unknown; className?: string }) {
  if (!data || typeof data !== 'object') return null
  const cta = data as UnknownRecord
  const label = text(cta, 'label')
  const url = text(cta, 'url')
  if (!label || !url) return null
  return <a className={className} href={url}>{label}</a>
}

function HeroSection({ section }: { section: CmsSection }) {
  const { content } = section
  return (
    <section className={`cms-hero cms-hero--${section.styleVariant}`} id={section.anchorId || undefined}>
      <div className="container cms-hero__inner">
        {text(content, 'eyebrow') && <p className="eyebrow"><span />{text(content, 'eyebrow')}</p>}
        <h1>{text(content, 'title')}</h1>
        {text(content, 'body') && <p className="cms-lead">{text(content, 'body')}</p>}
        <div className="cms-actions">
          <CtaLink data={content.primaryCta} />
          <CtaLink data={content.secondaryCta} className="button button-ghost" />
        </div>
      </div>
    </section>
  )
}

function RichTextSection({ section }: { section: CmsSection }) {
  return (
    <section className="section cms-copy" id={section.anchorId || undefined}>
      <div className="container cms-copy__inner">
        <h2>{text(section.content, 'heading')}</h2>
        <p>{text(section.content, 'body')}</p>
      </div>
    </section>
  )
}

function GridSection({ section }: { section: CmsSection }) {
  const items = records(section.content, 'items')
  return (
    <section className="section cms-grid-section" id={section.anchorId || undefined}>
      <div className="container">
        <div className="section-heading compact">
          <h2>{text(section.content, 'heading')}</h2>
          {text(section.content, 'body') && <p>{text(section.content, 'body')}</p>}
        </div>
        <div className="cms-card-grid">
          {items.map((item, index) => (
            <article key={text(item, 'id') || `${section.id}-${index}`}>
              {text(item, 'eyebrow') && <small>{text(item, 'eyebrow')}</small>}
              <h3>{text(item, 'title')}</h3>
              <p>{text(item, 'body')}</p>
              <CtaLink data={item.cta} className="cms-text-link" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection({ section }: { section: CmsSection }) {
  return (
    <section className="section cms-stats" id={section.anchorId || undefined}>
      <div className="container cms-stats__grid">
        {records(section.content, 'items').map((item, index) => (
          <article key={text(item, 'id') || `${section.id}-${index}`}>
            <strong>{text(item, 'value')}</strong><span>{text(item, 'label')}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function MediaCopySection({ section }: { section: CmsSection }) {
  const imageUrl = text(section.content, 'imageUrl')
  return (
    <section className="section cms-media-copy" id={section.anchorId || undefined}>
      <div className="container cms-media-copy__grid">
        {imageUrl && <img src={imageUrl} alt={text(section.content, 'imageAlt')} />}
        <div><h2>{text(section.content, 'heading')}</h2><p>{text(section.content, 'body')}</p><CtaLink data={section.content.cta} /></div>
      </div>
    </section>
  )
}

function TestimonialSection({ section }: { section: CmsSection }) {
  return (
    <section className="section cms-testimonial" id={section.anchorId || undefined}>
      <div className="container"><blockquote>“{text(section.content, 'quote')}”</blockquote><p>{text(section.content, 'name')}{text(section.content, 'role') && ` — ${text(section.content, 'role')}`}</p></div>
    </section>
  )
}

function FaqSection({ section }: { section: CmsSection }) {
  return (
    <section className="section cms-faq" id={section.anchorId || undefined}>
      <div className="container cms-faq__inner"><h2>{text(section.content, 'heading')}</h2><div>{records(section.content, 'items').map((item, index) => <details key={text(item, 'id') || `${section.id}-${index}`}><summary>{text(item, 'question')}</summary><p>{text(item, 'answer')}</p></details>)}</div></div>
    </section>
  )
}

function CtaSection({ section }: { section: CmsSection }) {
  return (
    <section className="section cms-cta" id={section.anchorId || undefined}>
      <div className="container cms-cta__panel"><h2>{text(section.content, 'heading')}</h2><p>{text(section.content, 'body')}</p><CtaLink data={section.content.cta} /></div>
    </section>
  )
}

export function SectionRenderer({ sections }: { sections: CmsSection[] }) {
  return sections.map((section) => {
    switch (section.type) {
      case 'hero': return <HeroSection key={section.id} section={section} />
      case 'rich_text': return <RichTextSection key={section.id} section={section} />
      case 'feature_grid':
      case 'card_grid': return <GridSection key={section.id} section={section} />
      case 'stats': return <StatsSection key={section.id} section={section} />
      case 'media_copy': return <MediaCopySection key={section.id} section={section} />
      case 'testimonial': return <TestimonialSection key={section.id} section={section} />
      case 'faq': return <FaqSection key={section.id} section={section} />
      case 'cta': return <CtaSection key={section.id} section={section} />
      default: return null
    }
  })
}

