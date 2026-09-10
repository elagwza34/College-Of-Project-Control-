interface RouteDevelopProps {
  heading: string;
  description: string;
  capabilities: { icon: string; title: string; description: string }[];
}

export default function RouteDevelop({ heading, description, capabilities }: RouteDevelopProps) {
  return (
    <section id="develop" className="py-16 md:py-20 bg-background-50">
      <div className="container-site">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 text-center leading-tight mb-3">
          {heading}
        </h2>
        <p className="text-sm text-foreground-600 text-center max-w-xl mx-auto mb-10 md:mb-12">
          {description}
        </p>

        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap) => (
            <div key={cap.title} className="bg-white rounded-lg border border-background-200/80 p-5 card-scale-hover cursor-default flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <i className={`${cap.icon} text-primary-600 text-lg`}></i>
              </div>
              <div>
                <h3 className="text-sm font-label font-semibold text-foreground-900 mb-1">{cap.title}</h3>
                <p className="text-xs text-foreground-600 leading-relaxed">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}