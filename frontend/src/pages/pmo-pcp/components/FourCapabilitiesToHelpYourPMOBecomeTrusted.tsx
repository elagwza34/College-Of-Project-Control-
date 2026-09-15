import SiteLink from '@/components/base/SiteLink';
const stages = [
  {
    number: '01',
    heading: 'Project Management Office',
    subheading: 'PMO Governance and Organisational Direction',
    text: 'Develop the purpose, operating model and governance arrangements of an effective PMO.',
    includes: [
      'PMO operating models',
      'Governance structures',
      'Decision rights',
      'Roles and responsibilities',
      'Assurance reviews',
      'Stage gates',
      'Ethics and organisational context',
    ],
    outputs: [
      'Governance map',
      'RACI matrix',
      'Decision log',
      'Escalation framework',
      'Assurance review',
    ],
    image:
      'https://readdy.ai/api/search-image?query=Hand-drawn%20editorial%20ink%20illustration%20of%20a%20winding%20mountain%20pass%20with%20a%20governance%20checkpoint%20station%20at%20the%20summit%2C%20red%20route%20marker%20pin%2C%20governance%20flags%20and%20decision-point%20signage%2C%20roles%20and%20responsibilities%20chart%20sketched%20on%20a%20stone%2C%20soft%20watercolor%20washes%20in%20pale%20yellow%20and%20warm%20cream%2C%20black%20fine%20ink%20lines%2C%20premium%20artistic%20editorial%20style%2C%20white%20background%20with%20generous%20margins&width=600&height=400&seq=pmo-stage1-governance-2026&orientation=landscape',
    imageAlt: 'Mountain pass governance checkpoint illustration',
  },
  {
    number: '02',
    heading: 'Project Planning and Control',
    subheading: 'PMP-Aligned Capability',
    text: 'Connect scope, schedule, cost, resources, performance and change into a credible integrated control environment.',
    includes: [
      'Work breakdown structures',
      'Planning and scheduling',
      'Baseline management',
      'Critical path',
      'Performance reporting',
      'Forecasting',
      'Change control',
    ],
    outputs: [
      'WBS',
      'Integrated baseline',
      'Schedule analysis',
      'Performance report',
      'Change log',
    ],
    image:
      'https://readdy.ai/api/search-image?query=Hand-drawn%20editorial%20ink%20illustration%20of%20elegant%20architectural%20bridges%20connecting%20multiple%20rolling%20project%20landscapes%2C%20integrated%20control%20panels%20and%20baseline%20markers%20along%20the%20pathways%2C%20schedule%20convergence%20points%2C%20soft%20watercolor%20in%20pale%20blue%20and%20cream%20tones%2C%20black%20fine%20ink%20lines%2C%20premium%20artistic%20editorial%20magazine%20style%2C%20generous%20white%20space&width=600&height=400&seq=pmo-stage2-planning-2026&orientation=landscape',
    imageAlt: 'Bridges connecting project landscapes illustration',
  },
  {
    number: '03',
    heading: 'Risk, Quality and Issue Management',
    subheading: 'Assurance and Continuous Improvement',
    text: 'Move from static registers and reactive escalation towards stronger risk ownership, issue discipline, quality assurance and continuous improvement.',
    includes: [
      'Risk identification',
      'Risk response',
      'Issue management',
      'Quality planning',
      'Assurance',
      'Root-cause analysis',
      'Lessons learned',
    ],
    outputs: [
      'Risk and issue register',
      'Risk response plan',
      'Quality plan',
      'Assurance checklist',
      'Lessons learned record',
    ],
    image:
      'https://readdy.ai/api/search-image?query=Hand-drawn%20editorial%20ink%20illustration%20of%20a%20tall%20lighthouse%20standing%20on%20rocky%20cliffs%20overlooking%20uncertain%20misty%20terrain%2C%20risk%20warning%20markers%20and%20quality%20inspection%20flags%20along%20the%20shoreline%2C%20issue%20tracking%20signal%20lights%2C%20soft%20watercolor%20in%20pale%20mint%20green%20and%20cream%2C%20black%20fine%20ink%20lines%2C%20premium%20artistic%20editorial%20style%2C%20atmospheric%20fog%20details&width=600&height=400&seq=pmo-stage3-risk-2026&orientation=landscape',
    imageAlt: 'Lighthouse on rocky cliffs overlooking uncertain terrain',
  },
  {
    number: '04',
    heading: 'Stakeholder Engagement and Communication',
    subheading: 'PMP-Aligned Capability',
    text: 'Translate project information into clear messages, executive reporting, options and recommendations that help stakeholders act with confidence.',
    includes: [
      'Stakeholder analysis',
      'Communication planning',
      'Executive reporting',
      'Dashboard narrative',
      'Benefits visibility',
      'Engagement',
      'Escalation communication',
    ],
    outputs: [
      'Stakeholder map',
      'Engagement plan',
      'Executive dashboard',
      'Exception report',
      'Benefits report',
    ],
    image:
      'https://readdy.ai/api/search-image?query=Hand-drawn%20editorial%20ink%20illustration%20of%20a%20panoramic%20mountain%20summit%20where%20multiple%20winding%20pathways%20converge%20at%20a%20central%20decision%20circle%2C%20stakeholder%20meeting%20gathering%20point%2C%20executive%20reporting%20podium%20with%20communication%20signals%20radiating%20outward%2C%20soft%20watercolor%20in%20pale%20peach%20and%20cream%2C%20black%20fine%20ink%20lines%2C%20premium%20artistic%20editorial%20magazine%20style&width=600&height=400&seq=pmo-stage4-stakeholder-2026&orientation=landscape',
    imageAlt: 'Mountain summit where pathways converge at a decision point',
  },
];

export default function FourCapabilitiesToHelpYourPMOBecomeTrusted() {
  return (
    <section id="journey" className="py-16 md:py-24 bg-canvas">
      <div className="container-site">
        <div className="text-center mb-6">
          <span className="label-editorial">The PMO Route</span>
        </div>
        <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-center mb-4 max-w-3xl mx-auto">
          Four capabilities to help your PMO become trusted.
        </h2>
        <p className="text-center text-sm text-ink/70 leading-relaxed max-w-2xl mx-auto mb-16 md:mb-20">
          Each capability strengthens a different area of PMO performance. Together, they create a clearer route
          from project information to governance confidence and better decisions.
        </p>

        {/* Journey stages */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical dotted route line - desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full route-line-vertical"></div>
          </div>

          <div className="flex flex-col gap-16 md:gap-20">
            {stages.map((stage, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={stage.number} className="relative">
                  {/* Red route marker - desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <div className="route-marker"></div>
                  </div>

                  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                      <div className="relative overflow-hidden rounded-sm">
                        <img loading="lazy" decoding="async"
                          src={stage.image}
                          alt={stage.imageAlt}
                          className="w-full h-auto object-cover"
                          style={{ maxHeight: '320px' }}
                        />
                        {/* Red pin overlay */}
                        <div className="absolute top-4 left-4 md:hidden">
                          <div className="route-marker"></div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-label font-bold text-ipc-gold tracking-wider">
                          STAGE {stage.number}
                        </span>
                        {stage.subheading === 'PMP-Aligned Capability' && (
                          <span className="text-sm font-label font-semibold text-secondary-500 bg-secondary-500/8 px-2 py-0.5 rounded">
                            PMP-Aligned
                          </span>
                        )}
                      </div>
                      <h3 className="heading-editorial text-2xl md:text-3xl mb-3">
                        {stage.heading}
                      </h3>
                      <p className="text-xs text-ink/65 leading-relaxed mb-5">
                        {stage.text}
                      </p>

                      {/* Includes */}
                      <div className="mb-4">
                        <p className="text-sm font-label font-semibold text-ink/70 uppercase tracking-wider mb-2">
                          Includes
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {stage.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-ink/70">
                              <span className="text-secondary-500 mt-0.5"><i className="ri-check-line text-xs"></i></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Workplace outputs */}
                      <div className="mb-5">
                        <p className="text-sm font-label font-semibold text-ink/70 uppercase tracking-wider mb-2">
                          Workplace outputs
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {stage.outputs.map((item) => (
                            <span
                              key={item}
                              className="text-sm font-label font-medium text-ink/70 bg-ink/5 px-2.5 py-1 rounded-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <SiteLink
                        href="/book-a-session"
                        className="inline-flex items-center gap-2 text-sm font-label font-semibold text-secondary-500 hover:text-primary-500 transition-colors"
                      >
                        Explore {stage.heading.split(' ')[0]}
                        <i className="ri-arrow-right-line"></i>
                      </SiteLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PMP note */}
        <p className="text-center text-sm text-ink/70 mt-16 max-w-xl mx-auto">
          PMP-aligned capability means learning relevant to professional planning and stakeholder practice.
          It does not imply PMI endorsement or automatic PMP certification.
        </p>
      </div>
    </section>
  );
}