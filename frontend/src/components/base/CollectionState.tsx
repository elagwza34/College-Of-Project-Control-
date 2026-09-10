export default function CollectionState({ label, id, loading, error, retry }: { label: string; id?: string; loading: boolean; error: string; retry: () => void }) {
 return <section id={id} className="container-site py-10" aria-label={label}>
 <p role={error ? 'alert' : 'status'}>{loading ? `Loading ${label.toLowerCase()}…` : error || `No ${label.toLowerCase()} are currently listed.`}</p>
 {error && <button type="button" onClick={retry} className="btn-primary mt-4">Try again</button>}</section>;
}
