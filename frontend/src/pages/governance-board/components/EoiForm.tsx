export default function EoiForm() {
  return (
<section id="eoi-form" className="bg-background-50 py-16 md:py-24" aria-labelledby="eoi-title">
          <div className="container-site max-w-4xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">Expression of interest</span>
              <h2 id="eoi-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">Submit Your Expression of Interest</h2>
              <p className="mt-4 text-base leading-relaxed text-foreground-600">
                Complete the form below to express your interest in contributing to the Kent Business College Governance Board.
              </p>
            </div>
            <div className="card-premium overflow-hidden p-2 md:p-3">
              <iframe
                className="governance-eoi-form"
                aria-label="Governance Board EOI"
                frameBorder={0}
                src="https://forms.zohopublic.com/ibisconsultancy1/form/GovernanceBoardEOI/formperma/65YUCGdJQ48FCsLf6iW1sBNw6syR5mLU2EWbZ99sS8E"
              />
            </div>
          </div>
        <style>{`
        .governance-eoi-form {
          display: block;
          width: 100%;
          height: 1700px;
          border: none;
        }
        @media (max-width: 640px) {
          .governance-eoi-form {
            height: 2500px;
          }
        }
      `}</style>
</section>
  );
}
