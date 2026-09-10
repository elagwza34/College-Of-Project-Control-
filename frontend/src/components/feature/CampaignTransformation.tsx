import SectionHeading from '@/components/base/SectionHeading';

interface TransformationItem {
  icon: string;
  title: string;
  description: string;
}

interface CampaignTransformationProps {
  title?: string;
  subtitle?: string;
  beforeTitle?: string;
  afterTitle?: string;
  beforeItems: TransformationItem[];
  afterItems: TransformationItem[];
}

export default function CampaignTransformation({
  title = 'Before and After Project Controls Capability',
  subtitle,
  beforeTitle = 'Without Strong Project Controls',
  afterTitle = 'With Professional Project Controls Capability',
  beforeItems,
  afterItems,
}: CampaignTransformationProps) {
  return (
    <section className="py-16 md:py-20 bg-background-50">
      <div className="container-site">
        <SectionHeading tag="The Transformation" title={title} subtitle={subtitle} />

        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <div className="bg-background-100 border border-background-200/70 rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground-100">
                <i className="ri-close-line text-foreground-600"></i>
              </div>
              <h4 className="text-sm font-heading font-bold text-foreground-600 uppercase tracking-wider">{beforeTitle}</h4>
            </div>
            <div className="space-y-4">
              {beforeItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground-50 flex-shrink-0 mt-0.5">
                    <i className={`${item.icon} text-sm text-foreground-400`}></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground-700">{item.title}</p>
                    <p className="text-xs text-foreground-600 mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="bg-primary-500 border border-primary-400/30 rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-background-50/20">
                <i className="ri-check-line text-background-50"></i>
              </div>
              <h4 className="text-sm font-heading font-bold text-background-50/90 uppercase tracking-wider">{afterTitle}</h4>
            </div>
            <div className="space-y-4">
              {afterItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-background-50/20 flex-shrink-0 mt-0.5">
                    <i className={`${item.icon} text-sm text-background-50`}></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-background-50">{item.title}</p>
                    <p className="text-xs text-background-50/70 mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}