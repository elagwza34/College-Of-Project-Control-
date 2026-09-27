import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from '@/components/base/Modal';
import SiteLink from '@/components/base/SiteLink';
import { fetchReviewProgrammes, submitReview, type ReviewProgramme } from '@/services/testimonialsApi';

export default function TestimonialSubmission() {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(params.get('review') === '1');
  const [programmes, setProgrammes] = useState<ReviewProgramme[]>([]);
  const [busy, setBusy] = useState(false); const [success, setSuccess] = useState(false); const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false); const [revision, setRevision] = useState(0);
  useEffect(() => { if (params.get('review') === '1') setOpen(true); }, [params]);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController(); setError(''); setLoaded(false);
    fetchReviewProgrammes(controller.signal).then(data => { if (!controller.signal.aborted) { setProgrammes(data); setLoaded(true); } }).catch(() => { if (!controller.signal.aborted) setError('The programme list could not be loaded. Please retry.'); });
    return () => controller.abort();
  }, [open, revision]);
  const close = () => { if (busy) return; setOpen(false); const next = new URLSearchParams(params); next.delete('review'); setParams(next, { replace: true }); };
  return <><button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"><i className="ri-chat-quote-line" aria-hidden="true" />Share your experience</button>
    <Modal open={open} onClose={close} title="Share your programme experience">
      {success ? <div role="status" className="py-5"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-2xl text-primary-700"><i className="ri-check-line" aria-hidden="true" /></div><h3 className="text-xl font-bold">Thank you for your review</h3><p className="mt-3 text-sm leading-relaxed">Your review has been sent to our team. It will appear on the website only after approval.</p><button onClick={close} className="btn-primary mt-6 px-5 py-3">Close</button></div> : <form onSubmit={async e => {
        e.preventDefault(); if (busy || !loaded) return;
        const data = new FormData(e.currentTarget); const photo = data.get('photo');
        if (photo instanceof File && photo.size > 5 * 1024 * 1024) { setError('Choose a photo smaller than 5 MB.'); return; }
        setBusy(true); setError('');
        try { await submitReview(data); setSuccess(true); } catch (e) { setError(e instanceof Error ? e.message : 'Unable to send your review. Please check the form and try again.'); } finally { setBusy(false); }
      }} className="space-y-5">
        <p className="text-sm leading-relaxed text-foreground-600">Tell us about the programme you completed. Our team reviews submissions before publishing them.</p>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        {!loaded && <div role="status" className="text-sm">{error ? <button type="button" onClick={() => setRevision(v => v + 1)} className="underline">Retry loading programmes</button> : 'Loading programmes…'}</div>}
        <fieldset disabled={busy} className="space-y-4 disabled:opacity-60">
          <label className="block text-sm font-semibold">Your name<input name="name" autoComplete="name" required minLength={2} maxLength={120} className="mt-2 w-full rounded-lg border border-background-300 px-3 py-2 font-normal" /></label>
          <label className="block text-sm font-semibold">Programme completed<select key={loaded ? 'loaded' : 'loading'} name="programme" required defaultValue={params.get('programme') || ''} className="mt-2 w-full rounded-lg border border-background-300 bg-white px-3 py-2 font-normal"><option value="" disabled>Select your programme</option>{programmes.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}</select></label>
          <label className="block text-sm font-semibold">Sharing as<select name="reviewer_type" defaultValue="professional" className="mt-2 w-full rounded-lg border border-background-300 bg-white px-3 py-2 font-normal"><option value="professional">Professional / learner</option><option value="employer">Employer</option></select></label>
          <label className="block text-sm font-semibold">Your photo<input type="file" name="photo" accept="image/jpeg,image/png,image/webp" required className="mt-2 block w-full min-w-0 text-sm font-normal" /><span className="mt-2 block text-xs font-normal text-foreground-500">JPG, PNG or WebP, up to 5 MB. Upload a photo you have permission to share.</span></label>
          <label className="block text-sm font-semibold">Your review<textarea name="review" required minLength={20} maxLength={4000} rows={5} placeholder="What did you learn, and how has it helped you?" className="mt-2 w-full rounded-lg border border-background-300 px-3 py-2 font-normal" /></label>
          <label className="flex items-start gap-3 text-sm leading-relaxed"><input className="mt-1" type="checkbox" name="consent" value="true" required /><span>I agree that my name, photo, programme and review may be published on this website after approval. <SiteLink href="/privacy" target="_blank" rel="noreferrer" className="text-primary-700 underline">Privacy notice</SiteLink></span></label>
          <button disabled={!loaded || busy} className="btn-primary w-full px-5 py-3 disabled:opacity-50">{busy ? 'Sending review...' : 'Submit for review'}</button>
        </fieldset>
      </form>}
    </Modal>
  </>;
}
