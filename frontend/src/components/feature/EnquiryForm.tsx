import SiteLink from '@/components/base/SiteLink';
import { useLocation } from 'react-router-dom';
import FormField from '@/components/base/FormField';
import useEnquirySubmission from '@/hooks/useEnquirySubmission';
import RequestStatus from './RequestStatus';
export default function EnquiryForm({ enquiryType = 'Programme enquiry', context = '' }: { enquiryType?: string; context?: string }) {
  const location = useLocation();
  const { receipt, pending, error, handleSubmit } = useEnquirySubmission(enquiryType);
  if (receipt) return <RequestStatus mode="received" receipt={receipt} />;
  return <form onSubmit={handleSubmit} aria-label={enquiryType} aria-busy={pending} className="card-premium p-6 text-foreground-800 md:p-8">
    <p className="mb-6 text-sm text-foreground-600">Tell us about your role and development needs. Sending an enquiry does not book an appointment or reserve a programme place.</p>
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField name="name" label="Full name" required autoComplete="name" />
      <FormField name="email" label="Email address" type="email" required autoComplete="email" />
      <FormField name="phone" label="Phone number" type="tel" autoComplete="tel" />
      <FormField name="organisation" label="Organisation" autoComplete="organization" />
      <FormField name="role_title" label="Role title" autoComplete="organization-title" />
      <FormField name="programme" label="Programme or development" options={['Project Controls Professional Level 6', 'Associate Project Manager Level 4', 'PMO and governance', 'Specialist module', 'Team development', 'Not sure']} />
    </div>
    <div className="mt-5"><FormField name="message" label="How can we help?" multiline help="Please do not include sensitive personal information." /></div>
    <input type="hidden" name="context" value={context || new URLSearchParams(location.search).get('context') || location.pathname} />
    <input type="hidden" name="enquiry_type" value={enquiryType} />
    <input name="phone_alt" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot-field" />
    <p className="mt-5 text-sm text-foreground-600">We use these details to respond to your enquiry. Read our <SiteLink className="underline" href="/privacy">privacy notice</SiteLink>.</p>
    <button type="submit" disabled={pending} className="btn-primary mt-5 w-full">{pending ? 'Sending request…' : 'Send enquiry'}</button>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
  </form>;
}
