import SectionHeading from '@/components/base/SectionHeading';

interface PainPoint {
  icon: string;
  text: string;
}

interface PcpPainPointsGridProps {
  title: string;
  subtitle?: string;
  painPoints: PainPoint[];
}

export default function PcpPainPointsGrid({ title, subtitle, painPoints }: PcpPainPointsGridProps) {
  return (
    <section className="py-16 md:py-20 bg-background-100">
      <div className="container-site">
        <SectionHeading tag="Sector Challenges" title={title} subtitle={subtitle} />

        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {painPoints.map((p) => (
            <div key={p.text} className="flex items-start gap-3 bg-background-50 border border-background-200/70 rounded-lg p-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 flex-shrink-0">
                <i className={`${p.icon} text-sm text-primary-500`}></i>
              </div>
              <p className="text-sm text-foreground-700 leading-relaxed pt-0.5">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}