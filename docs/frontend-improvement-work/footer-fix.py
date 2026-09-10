from pathlib import Path
p=Path('frontend/src/components/feature/Footer.tsx')
s=p.read_text(encoding='utf-8')
s=s.replace("import { useState } from 'react';", "import useEnquirySubmission from '@/hooks/useEnquirySubmission';")
s=s.replace("import { submitEnquiryPayload } from '@/services/enquiryApi';",'')
start=s.index('const socialLinks = [');end=s.index('export default function Footer()',start)
s=s[:start]+s[end:]
start=s.index('  const [email');end=s.index('  return (',start)
s=s[:start]+"  const { receipt, pending, error, handleSubmit } = useEnquirySubmission('Programme update request');\n\n"+s[end:]
s=s.replace('Subscribe to get the latest insights, events and programme updates delivered directly to your inbox.','Request information about programme updates and upcoming events. The College will review your request; this does not activate an automated mailing-list subscription.')
start=s.index('            <form id="newsletter-form"');end=s.index('            </form>',start)+len('            </form>')
s=s[:start]+'''            {receipt ? <p role="status" className="text-sm font-semibold text-primary-700">Your update request has been received. Reference {receipt.id}. This records your interest; it does not confirm a mailing-list subscription.</p> : <form id="newsletter-form" onSubmit={handleSubmit} aria-busy={pending} className="flex w-full flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">Email address (required)</label>
              <input id="newsletter-email" type="email" name="email" autoComplete="email" placeholder="Enter your email address" className="form-control min-w-0 flex-1" required aria-describedby="newsletter-notice" />
              <input type="hidden" name="name" value="Programme updates enquiry" />
              <button type="submit" disabled={pending} className="btn-primary shrink-0">{pending ? 'Sending request…' : 'Request updates'}</button>
              <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot-field" />
            </form>}
'''+s[end:]
start=s.index('            <div className="mt-3 min-h-6">');end=s.index('            </div>',start)+len('            </div>')
s=s[:start]+'''            <div className="mt-3 min-h-6">
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <p id="newsletter-notice" className="text-sm text-foreground-600">We use your email to respond to this request. <SiteLink href="/privacy" className="underline">Privacy notice</SiteLink></p>
            </div>'''+s[end:]
start=s.index('              <div className="mt-5 flex items-center gap-2.5" aria-label="Social media">');end=s.index('              </div>',start)+len('              </div>')
s=s[:start]+s[end:]
p.write_text(s,encoding='utf-8')
print('Footer request and link states corrected')
