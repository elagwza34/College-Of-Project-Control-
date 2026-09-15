import Footer from '@/components/feature/Footer';
import { EventRequestError, fetchEvent, type EventItem } from '@/services/eventsApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AboutThisEvent from "./components/AboutThisEvent";
import EventDetails from "./components/EventDetails";
import EventDetailsSection from "./components/EventDetailsSection";
import MoreEventsToExplore from "./components/MoreEventsToExplore";
import EventStatus from "./components/EventStatus";
export default function EventDetailPage() {
  const { slug = '' } = useParams();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [status, setStatus] = useState('loading');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setEvent(null);
    fetchEvent(slug, controller.signal).then(data => {
      if(!controller.signal.aborted) {
        setEvent(data);
        setStatus('ready');
      }
    }).catch(error => {
      if(!controller.signal.aborted)
        setStatus(error instanceof EventRequestError && error.status === 404 ? 'missing' : 'error');
    });
    return () => controller.abort();
  }, [slug, revision]);
  useEffect(() => {
    if(status !== 'loading')
      window.dispatchEvent(new CustomEvent('event-seo', { detail: { event, noIndex: !event } }));
  }, [event, status]);
  return <div className="min-h-screen bg-background-50"><main>
    {!event ? <EventStatus status={status} setRevision={setRevision} /> : <>
      <EventDetails event={event} />
      <div className="container-site grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"><AboutThisEvent event={event} />
        <EventDetailsSection event={event} /></div><MoreEventsToExplore event={event} />
    </>}
  </main><Footer /></div>;
}
