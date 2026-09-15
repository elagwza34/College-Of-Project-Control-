import { LegalSection } from "../LegalPageData";

/** Section: Page introduction. */
interface PageIntroductionProps {
  content: { eyebrow: string; title: string; intro: string; sections: LegalSection[]; };
}

export default function PageIntroduction({ content }: PageIntroductionProps) {
  return (
    <header className="hero-image-documents relative flex min-h-[90vh] items-center overflow-hidden bg-secondary-950 px-4 pb-16 pt-32 text-white md:pb-20 md:pt-40">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_top_right,oklch(var(--primary-500)),transparent_45%)]" />
          <div className="container-site relative z-10 max-w-4xl">
            <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-signal-400">{content.eyebrow}</p>
            <h1 className="mt-4 text-display font-bold leading-tight text-white">{content.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">{content.intro}</p>
          </div>
        </header>
  );
}
