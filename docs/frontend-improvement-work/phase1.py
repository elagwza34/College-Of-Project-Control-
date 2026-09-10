from pathlib import Path
ROOT = Path(__file__).resolve().parents[2] / 'frontend'
def write(name, text):
    path = ROOT/name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.strip()+'\n', encoding='utf-8')

write('src/components/base/FormField.tsx', '''
import { useId } from 'react';
interface Props { name: string; label: string; type?: string; required?: boolean; autoComplete?: string; options?: string[]; multiline?: boolean; error?: string; help?: string; }
export default function FormField({ name, label, type = 'text', required, autoComplete, options, multiline, error, help }: Props) {
  const id = useId();
  const props = { id, name, required, 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : help ? `${id}-help` : undefined, className: 'form-control' };
  return <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}{required ? ' (required)' : ' (optional)'}</label>
    {options ? <select {...props}><option value="">Select an option</option>{options.map(option => <option key={option}>{option}</option>)}</select>
      : multiline ? <textarea {...props} rows={4} maxLength={2000} /> : <input {...props} type={type} autoComplete={autoComplete} />}
    {help && <p id={`${id}-help`} className="mt-2 text-sm text-foreground-600">{help}</p>}
    {error && <p id={`${id}-error`} className="mt-2 text-sm text-red-700">{error}</p>}
  </div>;
}
''')
write('src/hooks/useEnquirySubmission.ts', '''
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
''')
write('src/components/feature/RequestStatus.tsx', '''
import type { EnquiryReceipt } from '@/hooks/useEnquirySubmission';
type Props = { mode: 'received'; receipt: EnquiryReceipt } | { mode: 'pending' } | { mode: 'download'; downloadHref: string };
export default function RequestStatus(props: Props) {
  return <div role="status" aria-live="polite" className="card-premium p-6 md:p-8">
    <h2 className="text-2xl">{props.mode === 'received' ? 'Your request has been received' : props.mode === 'download' ? 'Your download is ready' : 'No completed request to display'}</h2>
    <p className="mt-4 text-foreground-600">{props.mode === 'received' ? `Reference ${props.receipt.id}. The College will review your enquiry and contact you about the next steps. This does not reserve a place or confirm an appointment.` : props.mode === 'download' ? 'Use the link below to open the resource.' : 'A visit to this page does not submit an enquiry, register for an event or book an appointment. Send a request to discuss your next step.'}</p>
    {props.mode === 'download' && <a className="btn-primary mt-5" href={props.downloadHref}>Open resource</a>}
  </div>;
}
''')
write('src/components/feature/EnquiryForm.tsx', '''
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
    <p className="mt-5 text-sm text-foreground-600">We use these details to respond to your enquiry. Read our <a className="underline" href="/privacy">privacy notice</a>.</p>
    <button type="submit" disabled={pending} className="btn-primary mt-5 w-full">{pending ? 'Sending request…' : 'Send enquiry'}</button>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
  </form>;
}
''')
write('src/components/feature/ContactForm.tsx', '''
import EnquiryForm from './EnquiryForm';
export default function ContactForm() { return <EnquiryForm enquiryType="Contact enquiry" />; }
''')
write('src/pages/book-a-session/page.tsx', '''
import Footer from '@/components/feature/Footer';
import EnquiryForm from '@/components/feature/EnquiryForm';
export default function ConsultationPage() {
  return <><main>
    <header className="bg-primary-700 pb-12 pt-36 text-white"><div className="container-site"><h1 className="text-4xl text-white">Request a programme consultation</h1><p className="mt-4 max-w-2xl">Discuss programme fit, employer support and funding options with the College. We will contact you to agree the next step.</p></div></header>
    <section id="consultation" className="container-site max-w-2xl py-12"><EnquiryForm enquiryType="Consultation request" /></section>
  </main><Footer /></>;
}
''')
write('src/components/feature/ConfirmationPage.tsx', '''
import Footer from './Footer';
import RequestStatus from './RequestStatus';
export default function ConfirmationPage({ title }: { title: string }) {
  return <><main><header className="bg-primary-700 pb-12 pt-36 text-white"><div className="container-site"><h1 className="text-4xl text-white">{title}</h1></div></header>
    <section className="container-site max-w-2xl py-12"><RequestStatus mode="pending" /><a href="/book-a-session" className="btn-primary mt-6">Send an enquiry</a><a href="/events" className="ml-5 inline-block underline">Explore events</a></section>
  </main><Footer /></>;
}
''')
for name,title in {'eligibility':'Eligibility enquiry','consultation':'Consultation request','commercial':'Commercial route enquiry','eventbrite':'Event registration information','guide':'Programme guide request'}.items():
    write(f'src/pages/thank-you/{name}.tsx', f"import ConfirmationPage from '@/components/feature/ConfirmationPage';\nexport default function Page() {{ return <ConfirmationPage title=\"{title}\" />; }}")
p=ROOT/'src/services/enquiryApi.ts'
s=p.read_text(encoding='utf-8').replace('  window.dataLayer?.push({', "  const data: unknown = await response.json();\n  if (!data || typeof data !== 'object' || !('id' in data) || typeof data.id !== 'number') throw new Error('Missing stored enquiry reference');\n  window.dataLayer?.push({").replace('return response.json();','return { id: data.id };')
p.write_text(s,encoding='utf-8')
# Accurate visible action copy. Preserve URLs/analytics event names for compatibility.
import re
for p in (ROOT/'src').rglob('*.tsx'):
    s=p.read_text(encoding='utf-8')
    s=re.sub(r'Book (?:a |an |A |An )?(?:One-to-One |one-to-one |Route-Fit |Chartered Pathway |Information |information )?(?:Session|session|Consultation|consultation)', 'Request a consultation',s)
    s=s.replace('Save your place','Register your interest').replace('Secure Your Funded Place','Check eligibility').replace('Save Your Place','Register your interest')
    p.write_text(s,encoding='utf-8')
# Mount a genuine enquiry on every campaign, retaining its audience context.
for p in (ROOT/'src/pages/campaign').glob('*/page.tsx'):
    s=p.read_text(encoding='utf-8')
    start=s.index('<section id="lead-form"')
    end=s.index('</section>',start)+len('</section>')
    s=s[:start]+f'''<section id="lead-form" className="py-16 md:py-20 bg-primary-700"><div className="container-site max-w-2xl"><h2 className="mb-6 text-3xl text-white">Discuss your development needs</h2><EnquiryForm enquiryType="Campaign enquiry" context="{p.parent.name}" /></div></section>'''+s[end:]
    s="import EnquiryForm from '@/components/feature/EnquiryForm';\n"+s
    p.write_text(s,encoding='utf-8')
# Available programme catalogue is not a downloadable file: make the action honest.
p=ROOT/'src/pages/home/components/CompactHero.tsx';s=p.read_text(encoding='utf-8').replace('/College_of_Project_Controls_and_Management_Catalogue.pdf','/programmes').replace('Download Catalogue','Compare programmes');p.write_text(s,encoding='utf-8')
css=ROOT/'src/index.css'
with css.open('a',encoding='utf-8') as f:
    f.write('''\n@layer components {
  .btn-primary { @apply inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-signal-500 px-6 py-3 text-sm font-bold text-primary-950 transition-colors hover:bg-signal-400 disabled:cursor-wait disabled:opacity-60; }
  .form-control { @apply w-full min-h-12 rounded-md border border-foreground-500 bg-white px-3 py-2 text-base text-foreground-900; }
  .form-control:focus-visible { outline: 3px solid #1F5F73; outline-offset: 2px; }
}\n''')
print('Phase 1: enquiry forms, truthful status pages, campaign integration and action copy implemented.')
