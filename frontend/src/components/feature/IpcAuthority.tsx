import useCollection from '@/hooks/useCollection';
import { fetchIpcImages, type IpcImage } from '@/services/ipcImagesApi';
import SiteLink from '@/components/base/SiteLink';
import { useEffect, useRef, useState } from 'react';

const IPC_URL = 'https://instituteofprojectcontrols.com';

const features = [
  {
    icon: 'ri-shield-check-line',
    title: 'Trusted Accreditation',
    copy: 'Rigorous standards.\nGlobal recognition.',
  },
  {
    icon: 'ri-award-line',
    title: 'Professional Growth',
    copy: 'Build expertise.\nAdvance your career.',
  },
];

function PortraitSet({ variant, images }: { variant: 'primary' | 'duplicate'; images: IpcImage[] }) {
  return (
    <div className="flex shrink-0 items-center gap-4 md:gap-5" aria-hidden={variant === 'duplicate'}>
      {images.map((person, i) => (
        <div
          key={`${variant}-${i}`}
          className="h-[155px] w-[115px] shrink-0 overflow-hidden rounded-2xl sm:h-[185px] sm:w-[135px] md:h-[215px] md:w-[160px]"
          style={{
            background: 'rgba(255,255,255,0.035)',
            border: '1px solid rgba(205,165,90,0.30)',
            boxShadow: '0 12px 28px -18px rgba(0,0,0,0.6)',
          }}
        >
          <img
            src={person.image_url}
            alt={variant === 'duplicate' ? '' : person.alt_text}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
      <div className="w-4 shrink-0 md:w-5" aria-hidden="true" />
    </div>
  );
}

export default function IpcAuthority() {
  const { items: images, loading, error, retry } = useCollection(fetchIpcImages);
  // Repeat short collections to fill the viewport, then duplicate the full track
  // for a seamless -50% loop even when only one image is published.
  const track = images.length ? Array.from({ length: Math.max(1, Math.ceil(8 / images.length)) }, () => images).flat() : [];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="ipc-authority"
      className="relative overflow-hidden py-20 md:py-28 lg:py-[130px]"
      style={{
        background:
          'radial-gradient(circle at 75% 25%, rgba(178,119,21,0.10), transparent 32%), radial-gradient(circle at 8% 100%, rgba(178,119,21,0.08), transparent 35%), #080D10',
      }}
    >
      <div className="container-site relative z-10 grid gap-14 lg:grid-cols-[0.44fr_0.56fr] lg:items-center lg:gap-10">
        {/* Left: identity + copy */}
        <div
          ref={ref}
          className="min-w-0 text-center lg:text-left"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <p
            className="font-heading font-extrabold leading-[0.9] tracking-tight"
            style={{
              fontSize: 'clamp(96px, 9vw, 170px)',
              backgroundImage: 'linear-gradient(100deg, #F5F1E8, #D6B16D)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            IPC
          </p>
          <p className="mt-1 font-heading text-2xl font-bold md:text-3xl lg:text-[34px]" style={{ color: '#D8B36E' }}>
            Institute of Project Controls
          </p>

          <div className="relative mx-auto mt-5 h-px w-36 lg:mx-0" style={{ background: 'linear-gradient(90deg, #D7B46C, rgba(215,180,108,0))' }}>
            <span
              className="absolute -top-[3px] left-2 h-[7px] w-[7px] rounded-full"
              style={{ background: '#E9C77D', boxShadow: '0 0 8px 2px rgba(233,199,125,0.55)' }}
            />
          </div>

          <p className="mx-auto mt-6 max-w-[500px] text-base leading-relaxed md:text-lg lg:mx-0" style={{ color: 'rgba(245,245,245,0.72)' }}>
            IPC is a trusted accreditation body dedicated to advancing project controls capability and professional development across the global project delivery community.
          </p>

          {/* Feature items */}
          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row lg:items-start lg:justify-start">
            {features.map((feature, i) => (
              <div key={feature.title} className={`flex items-start gap-3 text-left ${i === 1 ? 'sm:border-l sm:pl-6' : ''}`} style={i === 1 ? { borderColor: 'rgba(201,154,73,0.20)' } : undefined}>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ border: '1px solid rgba(201,154,73,0.45)' }}
                >
                  <i className={`${feature.icon} text-lg`} style={{ color: '#C99A49' }} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#D8B36E' }}>{feature.title}</p>
                  <p className="mt-0.5 whitespace-pre-line text-xs leading-relaxed" style={{ color: 'rgba(245,245,245,0.60)' }}>
                    {feature.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <SiteLink
              href={IPC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 whitespace-nowrap"
              style={{
                backgroundImage: 'linear-gradient(135deg, #9C6813, #C6953B)',
                color: '#1A1204',
                boxShadow: '0 14px 30px -16px rgba(178,119,21,0.55)',
              }}
            >
              Explore Accreditation
              <i className="ri-arrow-right-line text-sm" />
            </SiteLink>
            <SiteLink
              href={IPC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              style={{ border: '1px solid rgba(215,180,108,0.35)', color: '#F3EEE4' }}
            >
              Learn About IPC
              <i className="ri-arrow-right-line text-sm" style={{ color: '#D7B46C' }} />
            </SiteLink>
          </div>
        </div>

        {/* Right: logo + animated portraits */}
        <div className="min-w-0">
          <div className="relative mx-auto flex h-[230px] w-[230px] items-center justify-center sm:h-[300px] sm:w-[300px] md:h-[380px] md:w-[380px]">
            <span
              className="absolute inset-0 m-auto h-[130%] w-[130%] rounded-full"
              style={{ border: '1px solid rgba(201,154,73,0.07)' }}
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 m-auto h-[165%] w-[165%] rounded-full"
              style={{ border: '1px solid rgba(201,154,73,0.04)' }}
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 m-auto h-[85%] w-[85%] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(201,154,73,0.14), transparent 70%)' }}
              aria-hidden="true"
            />
            <img
              src="/images/ipc-logo.png"
              alt="Institute of Project Controls logo"
              className="relative z-10 h-auto w-full"
            />
          </div>

          {images.length > 0 && <div className="ipc-portrait-mask relative mt-10 min-w-0 overflow-hidden md:mt-14">
            <div className="flex w-max items-center animate-ipc-portraits">
              <PortraitSet variant="primary" images={track} />
              <PortraitSet variant="duplicate" images={track} />
            </div>
          </div>}
          {loading && <p role="status" className="mt-6 text-center text-sm text-white/70">Loading IPC images?</p>}
          {error && <div role="alert" className="mt-6 text-center text-sm text-white/70"><p>IPC images could not be loaded.</p><button type="button" onClick={retry} className="mt-2 underline">Try again</button></div>}

          <p className="mt-8 px-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.2em] md:text-sm md:tracking-[0.25em]" style={{ color: '#C99A49' }}>
            <span aria-hidden="true">&#9670;</span> Recognised. Respected. Relied Upon. <span aria-hidden="true">&#9670;</span>
          </p>
        </div>
      </div>
    </section>
  );
}
