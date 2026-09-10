interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ tag, title, subtitle, light = false, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center mx-auto ${className}`}>
      {tag && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider mb-4 border ${
          light
            ? 'border-highlight-400/50 text-highlight-400'
            : 'border-highlight-500/40 text-highlight-600'
        }`}>
          {tag}
        </span>
      )}
      <h2 className={`mx-auto max-w-4xl text-balance text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-tight ${
        light ? 'text-background-50' : 'text-foreground-950'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-3 max-w-2xl text-sm md:mt-4 md:text-base leading-relaxed ${
          light ? 'text-background-50/70' : 'text-foreground-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}