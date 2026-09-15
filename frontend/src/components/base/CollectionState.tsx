export default function CollectionState({ label, id, loading, error, retry }: { label: string; id?: string; loading: boolean; error: string; retry: () => void }) {
 if (!loading && !error) return (
  <div id={id} className="container-site py-7 md:py-10" aria-hidden="true">
   <div className="mx-auto flex max-w-3xl items-center gap-5 sm:gap-8">
    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-200 to-signal-300/70" />
    <img src="/images/cpcm-logo-dark.webp" alt="" width={112} height={56} className="h-12 w-24 shrink-0 object-contain opacity-75 sm:h-14 sm:w-28" loading="lazy" />
    <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary-200 to-signal-300/70" />
   </div>
  </div>
 );
 return <section id={id} className="container-site py-10" aria-label={label}>
 <p role={error ? 'alert' : 'status'}>{loading ? `Loading ${label.toLowerCase()}…` : error}</p>
 {error && <button type="button" onClick={retry} className="btn-primary mt-4">Try again</button>}</section>;
}
