const trustItems = [
  'Project Controls Professional Level 6',
  'Funded Where Eligible',
  'Employer-Supported Learning',
  'Workplace Evidence',
  'Progress Reviews',
  'APM Recognised Assessment Route',
  'ChPP Readiness Support',
  'Live Online Delivery',
];

export default function TrustStrip() {
  return (
<section className="py-8 md:py-10 bg-canvas">
            <div className="container-site">
              <div className="divider-ink mb-6"></div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {trustItems.map((item) => (
                  <span key={item} className="text-sm font-label text-ink/70 tracking-wide whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>
              <div className="divider-ink mt-6"></div>
            </div>
          </section>
  );
}
