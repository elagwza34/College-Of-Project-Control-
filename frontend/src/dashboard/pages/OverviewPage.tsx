import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cmsApi } from '../api/client';
import { DashboardPageHeader, StatusBadge } from '../components/DashboardPrimitives';

interface OverviewItem {
  label: string;
  icon: string;
  href: string;
  countUrl?: string;
  extractCount?: (data: unknown) => number;
}

interface OverviewGroup {
  label: string;
  items: OverviewItem[];
}

interface BusinessSignal extends OverviewItem {
  summary: string;
  signal: string;
  tone: 'info' | 'success' | 'warning' | 'neutral';
}

const countFromList = (data: unknown) => (Array.isArray(data) ? data.length : 0);
const countFromPage = (data: unknown) => (typeof (data as { count?: unknown }).count === 'number' ? (data as { count: number }).count : 0);

const businessSignals: BusinessSignal[] = [
  {
    label: 'New enquiries',
    icon: 'ri-user-received-line',
    href: '/dashboard/enquiries?status=new',
    countUrl: '/enquiries/?status=new',
    extractCount: countFromList,
    summary: 'Leads that still need first contact.',
    signal: 'Acquisition',
    tone: 'warning',
  },
  {
    label: 'Follow-up due',
    icon: 'ri-timer-flash-line',
    href: '/dashboard/enquiries?due=true',
    countUrl: '/enquiries/?due=true',
    extractCount: countFromList,
    summary: 'Open relationship actions that can affect conversion or retention.',
    signal: 'Pipeline hygiene',
    tone: 'warning',
  },
  {
    label: 'Qualified enquiries',
    icon: 'ri-shield-check-line',
    href: '/dashboard/enquiries?status=qualified',
    countUrl: '/enquiries/?status=qualified',
    extractCount: countFromList,
    summary: 'Prospects that are closer to a programme or employer conversation.',
    signal: 'Sales readiness',
    tone: 'success',
  },
  {
    label: 'Short courses',
    icon: 'ri-book-open-line',
    href: '/dashboard/short-courses',
    countUrl: '/short-courses/',
    extractCount: countFromList,
    summary: 'Focused offers that can support individual learners, employers and repeat demand.',
    signal: 'Offer catalogue',
    tone: 'info',
  },
  {
    label: 'Events',
    icon: 'ri-calendar-event-line',
    href: '/dashboard/events',
    countUrl: '/events/',
    extractCount: countFromList,
    summary: 'Conversion and engagement opportunities connected to Eventbrite or manual listings.',
    signal: 'Engagement',
    tone: 'info',
  },
  {
    label: 'Reviews pending',
    icon: 'ri-chat-check-line',
    href: '/dashboard/testimonials?status=pending',
    countUrl: '/testimonials/?status=pending&page=1',
    extractCount: countFromPage,
    summary: 'Social proof waiting for moderation before it can support trust and conversion.',
    signal: 'Trust assets',
    tone: 'neutral',
  },
];

const overviewGroups: OverviewGroup[] = [
  {
    label: 'Workspace',
    items: [
      { label: 'Enquiries', icon: 'ri-mail-line', href: '/dashboard/enquiries', countUrl: '/enquiries/' },
    ],
  },
  {
    label: 'Website content',
    items: [
      { label: 'Pages & sections', icon: 'ri-layout-line', href: '/dashboard/pages', countUrl: '/page-content/' },
      { label: 'Articles', icon: 'ri-article-line', href: '/dashboard/articles', countUrl: '/articles/' },
      { label: 'Case studies', icon: 'ri-briefcase-4-line', href: '/dashboard/case-studies', countUrl: '/case-studies/' },
      { label: 'Events', icon: 'ri-calendar-event-line', href: '/dashboard/events', countUrl: '/events/' },
      { label: 'Short courses', icon: 'ri-book-open-line', href: '/dashboard/short-courses', countUrl: '/short-courses/' },
      { label: 'Sectors', icon: 'ri-building-4-line', href: '/dashboard/sectors', countUrl: '/sectors/' },
      { label: 'Media library', icon: 'ri-image-2-line', href: '/dashboard/media', countUrl: '/media/' },
      { label: 'IPC images', icon: 'ri-gallery-line', href: '/dashboard/ipc-images', countUrl: '/ipc-images/' },
    ],
  },
  {
    label: 'People & recognition',
    items: [
      { label: 'Mentors', icon: 'ri-team-line', href: '/dashboard/mentors', countUrl: '/mentors/' },
      { label: 'Coaching & support', icon: 'ri-user-star-line', href: '/dashboard/coaches', countUrl: '/coaches/' },
      {
        label: 'Testimonials & reviews',
        icon: 'ri-chat-quote-line',
        href: '/dashboard/testimonials',
        countUrl: '/testimonials/?status=&page=1',
        extractCount: countFromPage,
      },
      { label: 'Partner logos', icon: 'ri-award-line', href: '/dashboard/partners', countUrl: '/partners/' },
      { label: 'Professional credentials', icon: 'ri-medal-2-line', href: '/dashboard/professional-credentials', countUrl: '/professional-credentials/' },
    ],
  },
  {
    label: 'Tools & guidance',
    items: [
      { label: 'Programme assistant', icon: 'ri-robot-2-line', href: '/dashboard/chatbot', countUrl: '/chatbot/sources/' },
    ],
  },
];

function OverviewCard({ item, value, failed }: { item: OverviewItem; value: number | undefined; failed: boolean }) {
  return (
    <Link to={item.href} className="group flex min-h-32 items-start gap-4 rounded-xl border border-background-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition group-hover:bg-primary-700 group-hover:text-white">
        <i className={`${item.icon} text-xl`} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground-950">{item.label}</span>
        {item.countUrl && (
          <span className="mt-3 block text-3xl font-bold leading-none text-foreground-950">{failed ? '-' : value ?? '...'}</span>
        )}
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-700">
          Open area <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

function BusinessSignalCard({ item, value, failed }: { item: BusinessSignal; value: number | undefined; failed: boolean }) {
  return (
    <Link to={item.href} className="group rounded-xl border border-background-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition group-hover:bg-primary-700 group-hover:text-white">
          <i className={`${item.icon} text-lg`} aria-hidden="true" />
        </span>
        <StatusBadge tone={item.tone}>{item.signal}</StatusBadge>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground-700">{item.label}</p>
        <p className="mt-2 text-4xl font-bold leading-none text-foreground-950">{failed ? '-' : value ?? '...'}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground-600">{item.summary}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
        Review now <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function OverviewPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const trackedItems = [...businessSignals, ...overviewGroups.flatMap((group) => group.items)].filter((item) => item.countUrl);
    trackedItems.forEach((item) => {
      cmsApi
        .get<unknown>(item.countUrl!)
        .then((data) => {
          const value = item.extractCount ? item.extractCount(data) : countFromList(data);
          setCounts((prev) => ({ ...prev, [item.label]: value }));
        })
        .catch(() => setFailed((prev) => ({ ...prev, [item.label]: true })));
    });
  }, []);

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Business workspace"
        title="Dashboard overview"
        description="A practical view of enquiries, content offers and relationship assets that support acquisition, conversion and delivery operations."
      />
      <div className="space-y-8">
        <section>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.16em] text-foreground-500">Business development snapshot</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-600">
                Use this first to identify leads that need action, offers that support revenue and trust assets that can improve conversion.
              </p>
            </div>
            <Link to="/dashboard/enquiries" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-background-300 bg-white px-4 text-sm font-semibold text-primary-800 hover:border-primary-300 hover:bg-primary-50">
              Open enquiry pipeline <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {businessSignals.map((item) => (
              <BusinessSignalCard key={item.label} item={item} value={counts[item.label]} failed={!!failed[item.label]} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: 'Sales enablement',
              body: 'Keep programme pages, short courses, events and articles current so advisers can explain the offer without rebuilding information manually.',
              href: '/dashboard/pages',
              label: 'Review website content',
            },
            {
              title: 'Employer relationships',
              body: 'Use enquiries, sector pages, testimonials and partner logos to support employer conversations with clearer evidence and next steps.',
              href: '/dashboard/enquiries',
              label: 'Review active enquiries',
            },
            {
              title: 'Operational efficiency',
              body: 'Use Eventbrite sync, media uploads and structured course records to reduce repeated content handling across the website.',
              href: '/dashboard/events',
              label: 'Review events workflow',
            },
          ].map((item) => (
            <article key={item.title} className="rounded-xl border border-background-200 bg-primary-950 p-5 text-white shadow-sm">
              <h2 className="font-heading text-lg font-bold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{item.body}</p>
              <Link to={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal-300">
                {item.label} <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </section>

        {overviewGroups.map((group) => (
          <section key={group.label}>
            <h2 className="text-xs font-bold uppercase tracking-[.16em] text-foreground-500">{group.label}</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <OverviewCard key={item.label} item={item} value={counts[item.label]} failed={!!failed[item.label]} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
