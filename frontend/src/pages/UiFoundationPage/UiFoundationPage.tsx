import { ArrowRight, Check, Database, Layers3, Palette } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const palette = [
  { name: 'Primary', value: '#002F2C', className: 'swatch-primary' },
  { name: 'Deep', value: '#001714', className: 'swatch-deep' },
  { name: 'Sage', value: '#7DA89F', className: 'swatch-sage' },
  { name: 'Sand', value: '#D9B36C', className: 'swatch-sand' },
  { name: 'Mist', value: '#F1F7F5', className: 'swatch-mist' },
]

export default function UiFoundationPage() {
  return (
    <>
      <Helmet>
        <title>UI Foundation | College of Project Control</title>
        <meta name="description" content="The visual foundation for College of Project Control" />
      </Helmet>

      <section className="hero" id="identity" aria-labelledby="hero-title">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> UI FOUNDATION · 01</p>
            <h1 id="hero-title">A clear visual foundation for every page ahead.</h1>
            <p className="hero-lead">
              Deep green <bdi>#002F2C</bdi> leads the identity, supported by near-black green and warm sand for a confident project controls character.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href="#tokens">Explore the identity <ArrowRight aria-hidden="true" /></a>
              <a className="button button-ghost" href="#next">Add the first page</a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Project readiness summary">
            <div className="panel-topline"><span>Project status</span><strong>UI Ready</strong></div>
            <div className="panel-number">003</div>
            <h2>An interface system built to grow</h2>
            <ul>
              <li><Check aria-hidden="true" /> React + TypeScript + Vite</li>
              <li><Check aria-hidden="true" /> Responsive & accessible</li>
              <li><Check aria-hidden="true" /> API-ready architecture</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section palette-section" id="tokens" aria-labelledby="palette-title">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow dark"><span /> DESIGN TOKENS</p>
            <h2 id="palette-title">A balanced palette, not a single colour.</h2>
            <p>Green leads the identity, sand draws attention, and sage and mist create calm, readable surfaces.</p>
          </div>
          <div className="palette-grid">
            {palette.map((color) => (
              <article className="color-card" key={color.value}>
                <div className={`color-swatch ${color.className}`} />
                <div><strong>{color.name}</strong><code>{color.value}</code></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section architecture" aria-labelledby="architecture-title">
        <div className="container">
          <div className="section-heading compact">
            <p className="eyebrow dark"><span /> FOUNDATION</p>
            <h2 id="architecture-title">Designed as a complete product from day one.</h2>
          </div>
          <div className="feature-grid">
            <article><Palette aria-hidden="true" /><span>01</span><h3>Design system</h3><p>Consistent tokens for colour, spacing, radius and motion.</p></article>
            <article><Layers3 aria-hidden="true" /><span>02</span><h3>Component architecture</h3><p>Shared components and focused pages without needless repetition.</p></article>
            <article><Database aria-hidden="true" /><span>03</span><h3>Neon ready</h3><p>Clear boundaries make it straightforward to add the Django API and Neon next.</p></article>
          </div>
        </div>
      </section>

      <section className="section next-step" id="next" aria-labelledby="next-title">
        <div className="container next-panel">
          <p className="eyebrow"><span /> NEXT STEP</p>
          <h2 id="next-title">Send the first page and we will build from here.</h2>
          <p>Provide a reference image or describe its sections and content. We will add it as a proper route with production-ready components.</p>
        </div>
      </section>
    </>
  )
}
