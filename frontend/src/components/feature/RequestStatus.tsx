import SiteLink from '@/components/base/SiteLink';
import { useEffect, useRef } from 'react';
import type { EnquiryReceipt } from '@/hooks/useEnquirySubmission';
type Props = { mode: 'received' | 'registration-pending'; receipt: EnquiryReceipt } | { mode: 'pending' } | { mode: 'download'; downloadHref: string };
export default function RequestStatus(props: Props) {
  const status = useRef<HTMLDivElement>(null);
  useEffect(() => { if (props.mode === 'received' || props.mode === 'registration-pending') status.current?.focus(); }, [props.mode]);
  return <div ref={status} tabIndex={-1} role="status" aria-live="polite" className="card-premium p-6 md:p-8">
    <h2 className="text-2xl">{props.mode === 'received' ? 'Your request has been received' : props.mode === 'registration-pending' ? 'Your registration request is pending' : props.mode === 'download' ? 'Your download is ready' : 'No completed request to display'}</h2>
    <p className="mt-4 text-foreground-600">{props.mode === 'received' || props.mode === 'registration-pending' ? `Reference ${props.receipt.id}. The College will review your enquiry and contact you about the next steps. This does not reserve a place or confirm an appointment.` : props.mode === 'download' ? 'Use the link below to open the resource.' : 'A visit to this page does not submit an enquiry, register for an event or book an appointment. Send a request to discuss your next step.'}</p>
    {props.mode === 'download' && <SiteLink className="btn-primary mt-5" href={props.downloadHref}>Open resource</SiteLink>}
  </div>;
}
