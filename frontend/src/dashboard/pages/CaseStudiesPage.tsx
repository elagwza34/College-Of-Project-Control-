import { useEffect, useState, type FormEvent } from 'react';
import { cmsApi } from '../api/client';
import { DashboardEmptyState, DashboardPageHeader, DashboardSkeletonList, StatusBadge } from '../components/DashboardPrimitives';

interface Metric {
  label: string;
  value: string;
}

interface CaseStudyRecord {
  id: number;
  title: string;
  slug: string;
  sector: string;
  client_name: string;
  headline: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: Metric[];
  image: string | null;
  image_url: string;
  image_alt: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  order: number;
}

const empty: Omit<CaseStudyRecord, 'id'> = {
  title: '',
  slug: '',
  sector: '',
  client_name: '',
  headline: '',
  summary: '',
  challenge: '',
  approach: '',
  outcome: '',
  metrics: [],
  image: null,
  image_url: '',
  image_alt: '',
  is_featured: false,
  is_published: false,
  published_at: null,
  order: 0,
};

const field = 'mt-2 w-full rounded-lg border border-background-300 bg-white px-3 py-2.5 text-sm text-foreground-950';

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function metricsToText(metrics: Metric[]) {
  return metrics.map((metric) => `${metric.value} | ${metric.label}`).join('\n');
}

function textToMetrics(value: string): Metric[] {
  return value.split('\n').map((line) => {
    const [metricValue, ...labelParts] = line.split('|');
    return { value: metricValue.trim(), label: labelParts.join('|').trim() };
  }).filter((metric) => metric.value && metric.label);
}

function Editor({ item, onSaved, onCancel }: { item: Partial<CaseStudyRecord>; onSaved: () => void; onCancel: () => void }) {
  const [values, setValues] = useState({ ...empty, ...item });
  const [metricsText, setMetricsText] = useState(metricsToText(item.metrics || []));
  const [file, setFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const data = new FormData();
    const { id: _id, image: _image, metrics: _metrics, ...editable } = values;
    Object.entries(editable).forEach(([key, value]) => {
      if (value !== undefined) data.set(key, value === null ? '' : String(value));
    });
    data.set('metrics', JSON.stringify(textToMetrics(metricsText)));
    data.set('remove_image', String(removeImage));
    if (file) data.set('image', file);
    try {
      if (item.id) await cmsApi.patch(`/case-studies/${item.id}/`, data);
      else await cmsApi.post('/case-studies/', data);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save the case study.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="rounded-2xl border border-background-200 bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-label text-xs font-bold uppercase tracking-[.16em] text-primary-700">Case studies</p>
          <h2 className="mt-1 text-2xl font-bold">{item.id ? 'Edit case study' : 'New case study'}</h2>
        </div>
        {values.slug && <a href={`/case-studies/${values.slug}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary-700 underline">View page</a>}
      </div>
      {error && <p role="alert" className="mt-5 whitespace-pre-wrap text-sm text-red-700">{error}</p>}

      <fieldset disabled={busy} className="mt-6 space-y-6 disabled:opacity-60">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold">
            Title
            <input
              required
              maxLength={240}
              value={values.title}
              onChange={(event) => setValues((current) => ({
                ...current,
                title: event.target.value,
                ...(!item.id && (!current.slug || current.slug === slugify(current.title)) ? { slug: slugify(event.target.value) } : {}),
              }))}
              className={field}
            />
          </label>
          <label className="text-sm font-semibold">URL slug<input required pattern="[a-zA-Z0-9_-]+" maxLength={240} value={values.slug} onChange={(event) => setValues((current) => ({ ...current, slug: event.target.value }))} className={field} /><span className="mt-1 block text-xs font-normal text-foreground-600">/case-studies/{values.slug || 'your-case-study'}</span></label>
          <label className="text-sm font-semibold">Sector<input maxLength={120} value={values.sector} onChange={(event) => setValues((current) => ({ ...current, sector: event.target.value }))} className={field} /></label>
          <label className="text-sm font-semibold">Organisation / client<input maxLength={160} value={values.client_name} onChange={(event) => setValues((current) => ({ ...current, client_name: event.target.value }))} className={field} /></label>
        </div>

        <label className="block text-sm font-semibold">Headline<input maxLength={260} value={values.headline} onChange={(event) => setValues((current) => ({ ...current, headline: event.target.value }))} className={field} /></label>
        <label className="block text-sm font-semibold">Summary<textarea required rows={3} maxLength={800} value={values.summary} onChange={(event) => setValues((current) => ({ ...current, summary: event.target.value }))} className={field} /></label>

        <div className="grid gap-5 lg:grid-cols-3">
          <label className="text-sm font-semibold">Challenge<textarea rows={7} value={values.challenge} onChange={(event) => setValues((current) => ({ ...current, challenge: event.target.value }))} className={field} /></label>
          <label className="text-sm font-semibold">Approach<textarea rows={7} value={values.approach} onChange={(event) => setValues((current) => ({ ...current, approach: event.target.value }))} className={field} /></label>
          <label className="text-sm font-semibold">Outcome<textarea rows={7} value={values.outcome} onChange={(event) => setValues((current) => ({ ...current, outcome: event.target.value }))} className={field} /></label>
        </div>

        <label className="block text-sm font-semibold">
          Metrics
          <textarea value={metricsText} rows={4} onChange={(event) => setMetricsText(event.target.value)} placeholder="18% | Better forecast confidence&#10;4 weeks | Faster reporting cycle" className={`${field} font-mono`} />
          <span className="mt-1 block text-xs font-normal text-foreground-600">One per line: value | label</span>
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold">Cover image<input type="file" accept="image/*" onChange={(event) => { setFile(event.target.files?.[0] || null); setRemoveImage(false); }} className={field} /></label>
          <label className="text-sm font-semibold">Image URL (if no upload)<input value={values.image_url} onChange={(event) => setValues((current) => ({ ...current, image_url: event.target.value }))} className={field} /></label>
          <label className="text-sm font-semibold">Image description<input maxLength={240} value={values.image_alt} onChange={(event) => setValues((current) => ({ ...current, image_alt: event.target.value }))} className={field} /></label>
          <label className="text-sm font-semibold">Display order<input type="number" min={0} max={32767} required value={values.order} onChange={(event) => setValues((current) => ({ ...current, order: Number(event.target.value) }))} className={field} /></label>
          <label className="text-sm font-semibold">Publish date<input type="datetime-local" value={values.published_at ? new Date(new Date(values.published_at).getTime() - new Date(values.published_at).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''} onChange={(event) => setValues((current) => ({ ...current, published_at: event.target.value ? new Date(event.target.value).toISOString() : null }))} className={field} /></label>
        </div>

        {values.image && <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={removeImage} onChange={(event) => setRemoveImage(event.target.checked)} /> Remove uploaded image</label>}
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={values.is_published} onChange={(event) => setValues((current) => ({ ...current, is_published: event.target.checked }))} /> Published</label>
          <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={values.is_featured} onChange={(event) => setValues((current) => ({ ...current, is_featured: event.target.checked }))} /> Featured</label>
        </div>
        <div className="flex gap-4"><button type="submit" className="btn-primary min-h-11 px-6 font-semibold">{busy ? 'Saving...' : 'Save case study'}</button><button type="button" onClick={onCancel} className="min-h-11 px-4 underline">Cancel</button></div>
      </fieldset>
    </form>
  );
}

export default function CaseStudiesDashboardPage() {
  const [items, setItems] = useState<CaseStudyRecord[] | null>(null);
  const [editing, setEditing] = useState<Partial<CaseStudyRecord> | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [revision, setRevision] = useState(0);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    setError('');
    cmsApi.get<CaseStudyRecord[]>('/case-studies/')
      .then((data) => { if (active) setItems(data); })
      .catch(() => { if (active) setError('Unable to load case studies.'); });
    return () => { active = false; };
  }, [revision]);

  const remove = async (item: CaseStudyRecord) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setDeleting(item.id);
    setError('');
    try {
      await cmsApi.del(`/case-studies/${item.id}/`);
      setRevision((value) => value + 1);
      setMessage('Case study deleted.');
    } catch {
      setError('Unable to delete this case study.');
    } finally {
      setDeleting(null);
    }
  };

  if (editing) return <Editor key={editing.id ?? 'new'} item={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); setRevision((value) => value + 1); setMessage('Case study saved.'); }} />;

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Website content"
        title="Case studies"
        description="Manage published project evidence, outcomes, sector stories and reusable case-study cards."
        meta={items && <StatusBadge tone="info">{items.length} case studies</StatusBadge>}
        actions={<button onClick={() => { setEditing({}); setMessage(''); }} className="btn-primary min-h-11 px-6 font-semibold">Add case study</button>}
      />
      {message && <p role="status" className="mb-5 text-primary-700">{message}</p>}
      {error && <div role="alert" className="mb-5 text-red-700">{error} <button onClick={() => setRevision((value) => value + 1)} className="underline">Try again</button></div>}
      {items === null ? (
        <DashboardSkeletonList rows={6} />
      ) : items.length === 0 ? (
        <DashboardEmptyState icon="ri-briefcase-4-line" title="No case studies yet" description="Add the first case study, then publish it to show it on the public case studies page." action={<button onClick={() => setEditing({})} className="btn-primary px-5 py-3">Add case study</button>} />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="flex flex-col gap-4 rounded-xl border border-background-200 bg-white p-5 shadow-sm md:flex-row">
              <img src={item.image || item.image_url || '/images/employer-capability-team.webp'} alt="" className="aspect-[16/10] w-full rounded-lg object-cover md:w-56" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={item.is_published ? 'success' : 'neutral'}>{item.is_published ? 'Published' : 'Draft'}</StatusBadge>
                  {item.is_featured && <StatusBadge tone="warning">Featured</StatusBadge>}
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-[.14em] text-primary-700">{item.sector || 'Uncategorised'}</p>
                <h2 className="mt-1 text-lg font-bold text-foreground-950">{item.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-foreground-600">{item.headline || item.summary}</p>
                <p className="mt-2 break-all text-xs text-foreground-500">/case-studies/{item.slug}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <button onClick={() => setEditing(item)} className="min-h-10 font-semibold text-primary-700">Edit</button>
                  {item.is_published && <a href={`/case-studies/${item.slug}`} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center text-primary-700 underline">View</a>}
                  <button disabled={deleting !== null} onClick={() => remove(item)} className="min-h-10 text-red-700 disabled:opacity-40">{deleting === item.id ? 'Deleting...' : 'Delete'}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
