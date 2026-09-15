import Footer from '@/components/feature/Footer';
import { fetchEventLibrary, fetchEventOptions, type EventCategory, type EventResults } from '@/services/eventsApi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConnectLearnProgress from "./components/ConnectLearnProgress";
import FindEvents from "./components/FindEvents";
export default function EventsLibrary() {
  const [params, setParams] = useSearchParams();
  const [options, setOptions] = useState<EventCategory[]>([]);
  const [data, setData] = useState<EventResults | null>(null);
  const [search, setSearch] = useState(params.get('search') || '');
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const query = params.toString();
  useEffect(() => { setSearch(params.get('search') || ''); }, [params]);
  useEffect(() => {
    const controller = new AbortController();
    setData(null);
    setError(false);
    Promise.all([fetchEventLibrary(Object.fromEntries(new URLSearchParams(query)), controller.signal), fetchEventOptions(controller.signal)])
      .then(([result, terms]) => {
        if(!controller.signal.aborted) {
          setData(result);
          setOptions(terms);
        }
      })
      .catch(() => {
        if(!controller.signal.aborted)
          setError(true);
      });
    return () => controller.abort();
  }, [query, revision]);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    next.delete('page');
    if(value)
      next.set(key, value);
    else
      next.delete(key);
    setParams(next);
  };
  const page = Math.max(1, Number(params.get('page')) || 1);
  return <div className="min-h-screen bg-background-50"><main>
    <ConnectLearnProgress />
    <FindEvents update={update} search={search} setSearch={setSearch} params={params} options={options} setParams={setParams} error={error} setRevision={setRevision} data={data} page={page} />
  </main><Footer /></div>;
}
