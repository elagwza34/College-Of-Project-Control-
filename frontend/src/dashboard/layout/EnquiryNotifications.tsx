import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEnquiryNotifications } from './useEnquiryNotifications';
export function EnquiryNotificationPanel({ data, error, arrival, refresh }: ReturnType<typeof useEnquiryNotifications>) {
  const [open, setOpen] = useState(false);
  return <div className="mb-6 flex flex-wrap items-start justify-end gap-3">
    <div role="status" aria-live="polite" className="text-sm text-primary-700">{arrival > 0 && <Link to={`/dashboard/enquiries?enquiry=${arrival}`} className="underline">A new enquiry has arrived. Open enquiry</Link>}</div>
    <details open={open} onToggle={e => setOpen(e.currentTarget.open)} className="relative w-full max-w-sm rounded-xl border border-background-200 bg-white">
      <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">Enquiry notifications {data && <span className="ml-2 rounded-full bg-primary-950 px-2 py-0.5 text-white">{data.unread_count}</span>}</summary>
      <div className="border-t p-4 text-sm">
        {error ? <p role="alert">Notifications could not be refreshed. <button onClick={() => void refresh()} className="underline">Retry</button></p> : !data ? <p>Loading notifications…</p> : data.unread_count === 0 ? <p>No unread enquiries.</p> : <ul className="space-y-3">{data.latest.map(n => <li key={n.id}><Link onClick={() => setOpen(false)} to={`/dashboard/enquiries?enquiry=${n.id}`} className="block rounded-lg p-2 hover:bg-background-50"><strong className="block">{n.name}</strong><span>{n.enquiry_type || 'General enquiry'}</span></Link></li>)}</ul>}
        <Link to="/dashboard/enquiries?unread=true" onClick={() => setOpen(false)} className="mt-4 inline-block font-semibold underline">View unread enquiries</Link>
      </div>
    </details>
  </div>;
}
