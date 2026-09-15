import { useCallback, useEffect, useRef, useState } from 'react';
import { cmsApi } from '../api/client';
export interface Notice { unread_count: number; latest: { id: number; name: string; enquiry_type: string; created_at: string }[] }
export function useEnquiryNotifications() {
  const [data, setData] = useState<Notice | null>(null);
  const [error, setError] = useState(false);
  const [arrival, setArrival] = useState(0);
  const previous = useRef<number | null>(null);
  const busy = useRef(false);
  const refresh = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      const next = await cmsApi.get<Notice>('/enquiries/notifications/');
      const latest = next.latest[0]?.id ?? 0;
      if (previous.current !== null && latest > previous.current) setArrival(latest);
      previous.current = Math.max(previous.current ?? 0, latest);
      setData(next); setError(false);
    } catch { setError(true); } finally { busy.current = false; }
  }, []);
  useEffect(() => {
    let active = true;
    const update = () => { if (active && document.visibilityState !== 'hidden') void refresh(); };
    update(); const timer = window.setInterval(update, 30000);
    window.addEventListener('enquiries-updated', update);
    window.addEventListener('focus', update); document.addEventListener('visibilitychange', update);
    return () => { active = false; clearInterval(timer); window.removeEventListener('enquiries-updated', update); window.removeEventListener('focus', update); document.removeEventListener('visibilitychange', update); };
  }, [refresh]);
  return { data, error, arrival, refresh };
}
