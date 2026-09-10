import EventsSection from './EventsSection';
export default function EventsTeaser({ programme }: { ctaHref?: string; programme?: string }) {
  return <EventsSection programme={programme} />;
}
