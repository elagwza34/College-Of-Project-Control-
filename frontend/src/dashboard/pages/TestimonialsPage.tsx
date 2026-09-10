import { useEffect, useRef, useState, type FormEvent } from 'react';
import { cmsApi, getToken } from '../api/client';
import type { Review, ReviewProgramme } from '@/services/testimonialsApi';
import { fetchReviewProgrammes } from '@/services/testimonialsApi';

interface Submission extends Review { status: 'pending' | 'approved' | 'rejected'; consent: boolean; is_featured: boolean; order: number; moderation_notes: string; reviewed_at: string | null; created_at: string }
interface Results { count: number; next: string | null; previous: string | null; results: Submission[] }

const isPrivatePhotoUrl = (url: string) => /\/testimonials\/\d+\/photo\/?(\?.*)?$/.test(url);

function PrivatePhoto({ url, name }: { url: string; name: string }) {
  const [source, setSource] = useState(''); const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController(); let objectUrl = ''; setSource(''); setError(false);
    fetch(url, { headers: { Authorization: `Token ${getToken() || ''}` }, signal: controller.signal }).then(async response => { if (!response.ok) throw new Error(); return response.blob(); }).then(blob => { if (!controller.signal.aborted) { objectUrl = URL.createObjectURL(blob); setSource(objectUrl); } }).catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => { controller.abort(); if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [url]);
  return source ? <img src={source} alt={name} className="aspect-square w-full rounded-xl object-cover" /> : <p role="status" className="rounded-xl bg-background-100 p-4 text-sm">{error ? 'Photo could not be loaded. Refresh to retry.' : 'Loading photo…'}</p>;
}

function ReviewPhoto({ url, name }: { url: string; name: string }) {
  if (!url) return <div className="flex aspect-square items-center justify-center rounded-xl bg-background-100 text-xs text-foreground-500">No photo</div>;
  return isPrivatePhotoUrl(url) ? <PrivatePhoto url={url} name={name} /> : <img src={url} alt={name} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />;
}

function AddTestimonialForm({ onCreated }: { onCreated: () => void }) {
  const [programmes, setProgrammes] = useState<ReviewProgramme[]>([]);
  const [name, setName] = useState('');
  const [programme, setProgramme] = useState('');
  const [reviewerType, setReviewerType] = useState<'professional' | 'employer'>('professional');
  const [review, setReview] = useState('');
  const [status, setStatus] = useState<'approved' | 'pending' | 'rejected'>('approved');
  const [featured, setFeatured] = useState(false);
  const [consent, setConsent] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchReviewProgrammes().then(list => { setProgrammes(list); setProgramme(current => current || list[0]?.slug || ''); }).catch(() => {}); }, []);

  const canSubmit = name.trim() && programme && review.trim().length >= 20 && (photoFile || imageUrl.trim()) && consent && !adding;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    setAdding(true); setError('');
    try {
      const data = new FormData();
      data.append('name', name.trim());
      data.append('programme', programme);
      data.append('reviewer_type', reviewerType);
      data.append('review', review.trim());
      data.append('consent', String(consent));
      data.append('status', status);
      data.append('is_featured', String(featured));
      if (photoFile) data.append('photo', photoFile);
      else data.append('image_url', imageUrl.trim());
      await cmsApi.post('/testimonials/', data);
      setName(''); setReview(''); setFeatured(false); setConsent(false); setPhotoFile(null); setImageUrl(''); setStatus('approved');
      if (fileInputRef.current) fileInputRef.current.value = '';
      onCreated();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'This testimonial could not be saved. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <form onSubmit={submit} aria-busy={adding} className="mb-8 rounded-xl border border-background-200 bg-white p-5 md:p-6">
      <h2 className="text-lg font-bold">Add a testimonial manually</h2>
      <p className="mt-1 text-sm text-foreground-600">Use this when you already have someone's words and consent — for example a quote gathered by email or at an event.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold">Name
          <input value={name} onChange={e => setName(e.target.value)} required className="mt-1.5 w-full rounded-lg border border-background-200 px-3 py-2.5 text-sm font-normal focus:border-primary-400 focus:outline-none" />
        </label>
        <label className="text-sm font-semibold">Programme
          <select value={programme} onChange={e => setProgramme(e.target.value)} required className="mt-1.5 w-full rounded-lg border border-background-200 px-3 py-2.5 text-sm font-normal focus:border-primary-400 focus:outline-none">
            {!programmes.length && <option value="">Loading…</option>}
            {programmes.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Reviewer type
          <select value={reviewerType} onChange={e => setReviewerType(e.target.value as typeof reviewerType)} className="mt-1.5 w-full rounded-lg border border-background-200 px-3 py-2.5 text-sm font-normal focus:border-primary-400 focus:outline-none">
            <option value="professional">Professional / learner</option>
            <option value="employer">Employer</option>
          </select>
        </label>
        <label className="text-sm font-semibold">Publish as
          <select value={status} onChange={e => setStatus(e.target.value as typeof status)} className="mt-1.5 w-full rounded-lg border border-background-200 px-3 py-2.5 text-sm font-normal focus:border-primary-400 focus:outline-none">
            <option value="approved">Approved — live on the website</option>
            <option value="pending">Pending review</option>
            <option value="rejected">Rejected — hidden</option>
          </select>
        </label>
        <label className="text-sm font-semibold md:col-span-2">Review
          <textarea value={review} onChange={e => setReview(e.target.value)} required minLength={20} rows={3} maxLength={4000} className="mt-1.5 w-full rounded-lg border border-background-200 px-3 py-2.5 text-sm font-normal focus:border-primary-400 focus:outline-none" />
        </label>
        <label className="text-sm font-semibold md:col-span-2">External image link
          <input
            value={imageUrl}
            onChange={e => { setImageUrl(e.target.value); if (e.target.value && fileInputRef.current) { fileInputRef.current.value = ''; setPhotoFile(null); } }}
            placeholder="https://example.com/photo.jpg"
            className="mt-1.5 w-full rounded-lg border border-background-200 px-3 py-2.5 text-sm font-normal focus:border-primary-400 focus:outline-none"
          />
        </label>
        <div className="text-sm font-semibold md:col-span-2">
          <span className="mr-2 text-xs font-medium text-foreground-400">or upload a photo</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={e => { const file = e.target.files?.[0] ?? null; setPhotoFile(file); if (file) setImageUrl(''); }}
            className="mt-1.5 block w-full text-sm font-normal"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} />Featured</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required />I have this person's consent to publish their name, photo, programme and review</label>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={!canSubmit} className="btn-primary mt-4 px-6 py-3 text-sm font-bold disabled:opacity-40">{adding ? 'Saving…' : 'Add testimonial'}</button>
    </form>
  );
}

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('pending'); const [page, setPage] = useState(1); const [data, setData] = useState<Results | null>(null); const [error, setError] = useState(''); const [revision, setRevision] = useState(0); const [notice, setNotice] = useState('');
  useEffect(() => {
    let active = true; setData(null); setError('');
    cmsApi.get<Results>(`/testimonials/?status=${filter}&page=${page}`).then(result => { if (active) setData(result); }).catch(e => { if (active) setError(e.message); });
    return () => { active = false; };
  }, [filter, page, revision]);
  const saved = (status: string) => { setNotice(status === 'approved' ? 'Review approved and published on the website.' : status === 'rejected' ? 'Review rejected and hidden from the website.' : 'Review is pending and hidden from the website.'); setPage(1); setRevision(v => v + 1); };
  const created = () => { setNotice('Testimonial added.'); setFilter(''); setPage(1); setRevision(v => v + 1); };
  const deleted = () => { setNotice('Testimonial deleted.'); setPage(1); setRevision(v => v + 1); };
  return <div><div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold">Testimonials & reviews</h1><p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-600">Review each submission before publishing, or add one yourself below. Approved reviews appear on the home page and the matching programme page. Returning a review to pending or rejecting it removes it from public display.</p></div><button onClick={() => setRevision(v => v + 1)} className="rounded-lg border bg-white px-5 py-3 text-sm font-semibold">Refresh</button></div>
    <AddTestimonialForm onCreated={created} />
    <div className="my-6 flex flex-wrap gap-2" aria-label="Filter reviews">{[['pending', 'Pending review'], ['approved', 'Approved'], ['rejected', 'Rejected'], ['', 'All reviews']].map(([value, label]) => <button key={value} aria-pressed={filter === value} onClick={() => { setFilter(value); setPage(1); setNotice(''); }} className={`rounded-lg px-4 py-3 text-sm font-semibold ${filter === value ? 'bg-primary-800 text-white' : 'border bg-white text-primary-800'}`}>{label}</button>)}</div>
    {notice && <p role="status" className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-800">{notice}</p>}{error ? <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p> : !data ? <p role="status">Loading submissions…</p> : <><p className="mb-5 text-sm text-foreground-600">{data.count} {data.count === 1 ? 'submission' : 'submissions'}</p><div className="space-y-5">{data.results.map(item => <ReviewEditor key={item.id} item={item} onSaved={saved} onDeleted={deleted} />)}{!data.results.length && <div className="rounded-xl border bg-white p-8 text-center"><p>No reviews in this category.</p><a href="/contact?review=1" target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary-700 underline">Open the public submission form</a></div>}</div>{data.count > 20 && <div className="mt-6 flex items-center gap-4"><button disabled={!data.previous} onClick={() => setPage(p => p - 1)} className="rounded border px-4 py-2 disabled:opacity-40">Previous</button><span>Page {page}</span><button disabled={!data.next} onClick={() => setPage(p => p + 1)} className="rounded border px-4 py-2 disabled:opacity-40">Next</button></div>}</>}
  </div>;
}

function ReviewEditor({ item, onSaved, onDeleted }: { item: Submission; onSaved: (status: string) => void; onDeleted: () => void }) {
  const [notes, setNotes] = useState(item.moderation_notes); const [featured, setFeatured] = useState(item.is_featured); const [order, setOrder] = useState(item.order); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const save = async (status: Submission['status']) => { if (busy) return; setBusy(true); setError(''); try { await cmsApi.patch(`/testimonials/${item.id}/`, { status, moderation_notes: notes, is_featured: featured, order }); onSaved(status); } catch (e) { setError(e instanceof Error ? e.message : 'Unable to save.'); } finally { setBusy(false); } };
  const remove = async () => { if (busy || !window.confirm('Delete this testimonial? This cannot be undone.')) return; setBusy(true); setError(''); try { await cmsApi.del(`/testimonials/${item.id}/`); onDeleted(); } catch (e) { setError(e instanceof Error ? e.message : 'Unable to delete.'); setBusy(false); } };
  return <article className="rounded-xl border border-background-200 bg-white p-5 md:p-6"><div className="grid gap-6 md:grid-cols-[160px_minmax(0,1fr)]"><div><ReviewPhoto url={item.photo_url} name={item.name} /><p className="mt-3 text-xs text-foreground-500">Submitted {new Date(item.created_at).toLocaleDateString('en-GB')}</p></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold">{item.name}</h2><span className="rounded-full bg-background-100 px-3 py-1 text-xs font-semibold">{item.status}</span></div><p className="mt-2 text-sm font-semibold text-primary-700">{item.programme_label}</p><p className="mt-1 text-xs text-foreground-500">{item.reviewer_type === 'professional' ? 'Professional / learner' : 'Employer'} · {item.consent ? 'Publication consent given' : 'No publication consent'}</p><blockquote className="mt-5 whitespace-pre-line break-words rounded-lg bg-background-50 p-4 text-sm leading-relaxed">{item.review}</blockquote>{item.reviewed_at && <p className="mt-3 text-xs text-foreground-500">Last reviewed: {new Date(item.reviewed_at).toLocaleString('en-GB')}</p>}
      <fieldset disabled={busy} className="mt-5 space-y-4"><label className="block text-sm font-semibold">Internal moderation notes<textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} maxLength={2000} className="mt-2 w-full rounded-lg border p-3 font-normal" /></label><div className="flex flex-wrap items-center gap-5"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} />Featured</label><label className="flex items-center gap-2 text-sm">Order<input type="number" min={0} max={32767} value={order} onChange={e => setOrder(Number(e.target.value))} className="w-24 rounded border p-2" /></label></div>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<div className="flex flex-wrap gap-3"><button onClick={() => save('approved')} disabled={!item.consent || busy} className="btn-primary px-5 py-3 text-sm font-bold disabled:opacity-40">{item.status === 'approved' ? 'Save approved review' : 'Approve & publish'}</button><button onClick={() => save('rejected')} className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-700">Reject</button><button onClick={() => save('pending')} className="rounded-lg border px-5 py-3 text-sm font-semibold">Return to pending</button><button type="button" onClick={remove} className="ml-auto rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-700">Delete</button></div></fieldset>
    </div></div></article>;
}
