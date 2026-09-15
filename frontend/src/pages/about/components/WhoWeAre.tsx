export default function WhoWeAre() {
  return (
<section className="bg-white py-16 md:py-24" aria-labelledby="identity-title">
          <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">Who we are</span>
              <h2 id="identity-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">A focused home for project capability</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground-600">
                CPCM is a specialist division of Kent Business College. Its purpose is to help professionals and organisations make project information more useful: better plans, clearer forecasts, earlier escalation, stronger governance and more confident decisions.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground-600">
                Our portfolio brings together complete programmes, specialist development and employer capability routes. Apprenticeship funding may apply where eligibility and current rules are met; commercial access provides an alternative where it does not.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['Level 3–6', 'Progressive development routes'],
                ['Applied', 'Workplace-focused learning'],
                ['Two routes', 'Apprenticeship and commercial access'],
              ].map(([value, label]) => (
                <div key={value} className="rounded-xl border border-background-200 bg-background-50 p-5">
                  <p className="text-2xl font-bold text-primary-700">{value}</p>
                  <p className="mt-1 text-sm text-foreground-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  );
}
