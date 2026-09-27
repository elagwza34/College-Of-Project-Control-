import SiteLink from '@/components/base/SiteLink';

const employerValues = [
  { title: 'Stronger Governance', text: 'Improve decision rights, escalation, assurance and reporting lines.' },
  { title: 'Better Reporting', text: 'Turn status updates into insight, options and recommendations.' },
  { title: 'Integrated Controls', text: 'Connect planning, cost, risk, quality, issues and change.' },
  { title: 'Delivery Confidence', text: 'Improve visibility and earlier intervention.' },
  { title: 'Stakeholder Alignment', text: 'Strengthen communication with boards, sponsors and delivery teams.' },
  { title: 'Retention and Progression', text: 'Develop future PMO managers and project controls leaders.' },
];

export default function DevelopPMOCapabilityInsideYourOrganisation() {
  return (
<section id="employers" className="py-16 md:py-24 bg-canvas">
            <div className="container-site">
              <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                {/* Illustration */}
                <div>
                  <img loading="lazy" decoding="async"
                    src="https://readdy.ai/api/search-image?query=Hand-drawn%20editorial%20ink%20illustration%20of%20a%20PMO%20control%20hub%20connecting%20several%20project%20landscapes%20with%20elegant%20pathways%20and%20bridges%2C%20governance%20checkpoints%20along%20each%20connection%2C%20reporting%20signals%20flowing%20between%20nodes%2C%20soft%20watercolor%20in%20pale%20lavender%20and%20mint%20green%2C%20black%20fine%20ink%20lines%2C%20premium%20artistic%20editorial%20style%2C%20cream%20paper%20background&width=600&height=500&seq=pmo-employer-network-2026&orientation=squarish"
                    alt="PMO hub connecting multiple projects"
                    className="w-full h-auto rounded-sm"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>

                {/* Value list */}
                <div>
                  <h2 className="heading-editorial text-2xl md:text-3xl lg:text-4xl mb-8">
                    Develop PMO capability inside your organisation.
                  </h2>
                  <div className="space-y-5">
                    {employerValues.map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-secondary-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <i className="ri-check-line text-xs text-secondary-500"></i>
                        </div>
                        <div>
                          <h3 className="font-heading text-base text-ink mb-0.5">{item.title}</h3>
                          <p className="text-sm text-ink/70 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <SiteLink href="/book-a-session" className="btn-editorial-teal inline-flex items-center gap-2 text-sm">
                      <i className="ri-building-2-line"></i>
                      Request an employer PMO consultation
                    </SiteLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
