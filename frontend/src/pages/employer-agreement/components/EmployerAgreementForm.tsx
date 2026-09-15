import { useEffect,useRef } from 'react';

const ZOHO_FORM_SRC = 'https://forms.zohopublic.com/ibisconsultancy1/form/EmployerAgreementForm1/formperma/wwtOnK14Wvkci7feFFR8fUrRITaPnGwAFLNdQP83hjg';

export default function EmployerAgreementForm() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      let src = iframe.src;
      if (!/[?&]referrername=/.test(src)) {
        let rfr = window.location.href;
        try {
          rfr = window.self !== window.top
            ? (window.top as Window).location.href
            : (/^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(rfr) ? rfr : '');
        } catch {
          rfr = '';
        }
        if (rfr) {
          if (rfr.length > 1800) {
            const queryIndex = rfr.indexOf('?');
            if (queryIndex > -1) rfr = rfr.substring(0, queryIndex);
            if (rfr.length > 1800) rfr = rfr.substring(0, 1800);
          }
          src += (src.indexOf('?') > 0 ? '&' : '?') + 'referrername=' + encodeURIComponent(rfr);
        }
      }
      if (iframe.src !== src) iframe.src = src;
    } catch {
      /* Zoho referrer tagging is best-effort only */
    }
  }, []);

  return (
    <section className="bg-background-50 py-10 md:py-14">
      <div className="container-site">
        <iframe
          ref={iframeRef}
          id="ziframe_272239"
          aria-label="Employer Agreement Form"
          frameBorder={0}
          style={{ height: '100vh', width: '99%', border: 'none' }}
          src={ZOHO_FORM_SRC}
        />
      </div>
    </section>
  );
}
