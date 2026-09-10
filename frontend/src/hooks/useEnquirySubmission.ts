import { useRef, useState, type FormEvent } from 'react';
import { submitEnquiry } from '@/services/enquiryApi';
export interface EnquiryReceipt { id: number; }
export default function useEnquirySubmission(enquiryType: string) {
  const [receipt, setReceipt] = useState<EnquiryReceipt | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const inFlight = useRef(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (new FormData(form).get('phone_alt')) { setError('We could not send this request. Please contact the College for help.'); return; }
    inFlight.current = true;
    setPending(true);
    setError('');
    try { setReceipt(await submitEnquiry(form, enquiryType)); }
    catch { setError('Your request could not be confirmed. Your entries are still here. Please retry, or email info@kentbusinesscollege.com if the problem continues.'); }
    finally { inFlight.current = false; setPending(false); }
  };
  return { receipt, pending, error, handleSubmit };
}
