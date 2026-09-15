import EventsSection from '@/components/feature/EventsSection';
import { type EventItem } from '@/services/eventsApi';

/** Section: More events to explore. */
interface MoreEventsToExploreProps {
  event: EventItem;
}

export default function MoreEventsToExplore({ event }: MoreEventsToExploreProps) {
  return (
    <EventsSection title="More events to explore" excludeSlug={event.slug} />
  );
}
