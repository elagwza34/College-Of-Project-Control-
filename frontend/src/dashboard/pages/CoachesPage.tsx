import { reportCmsError } from '../api/reportError';
import { useEffect, useRef, useState } from 'react';
import { cmsApi } from '../api/client';

interface Coach {
  id: number;
  name: string;
  qualification: string;
  focus: string;
  image: string | null;
  order: number;
  is_active: boolean;
}

const emptyCoach = {
  name: 'New Coach',
  qualification: '',
  focus: 'Describe what this coach helps learners with.',
  order: 0,
  is_active: true,
};

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[] | null>(null);
  const [adding, setAdding] = useState(false);

  const load = () => cmsApi.get<Coach[]>('/coaches/').then(setCoaches).catch(reportCmsError);

  useEffect(() => {
    load();
  }, []);

  const createCoach = async () => {
    try {
    setAdding(true);
    try {
      await cmsApi.post('/coaches/', emptyCoach);
      load();
    } finally {
      setAdding(false);
    }
  
    } catch (error) { reportCmsError(error); }
};

  const deleteCoach = async (id: number) => {
    try {
    if (!window.confirm('Delete this coach?')) return;
    await cmsApi.del(`/coaches/${id}/`);
    load();
  
    } catch (error) { reportCmsError(error); }
};

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground-900">Coaching &amp; Support</h1>
          <p className="mt-1 text-sm text-foreground-600">Managed here, shown on the &quot;Coaching and support&quot; section on the site.</p>
        </div>
        <button
          type="button"
          onClick={createCoach}
          disabled={adding}
          className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          + Add Coach
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {coaches === null ? (
          <p className="text-sm text-foreground-400">Loading…</p>
        ) : coaches.length === 0 ? (
          <p className="text-sm text-foreground-400">No coaches yet.</p>
        ) : (
          coaches.map((coach) => (
            <CoachEditor key={coach.id} coach={coach} onDelete={() => deleteCoach(coach.id)} onSaved={load} />
          ))
        )}
      </div>
    </div>
  );
}

function CoachEditor({ coach, onDelete, onSaved }: { coach: Coach; onDelete: () => void; onSaved: () => void }) {
  const [form, setForm] = useState(coach);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Coach>(key: K, value: Coach[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const onFileChange = (file: File | null) => {
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const save = async () => {
    try {
    setSaving(true);
    try {
      if (imageFile) {
        const data = new FormData();
        data.append('name', form.name);
        data.append('qualification', form.qualification);
        data.append('focus', form.focus);
        data.append('order', String(form.order));
        data.append('is_active', String(form.is_active));
        data.append('image', imageFile);
        await cmsApi.patch(`/coaches/${coach.id}/`, data);
      } else {
        const { image: _image, ...rest } = form;
        await cmsApi.patch(`/coaches/${coach.id}/`, rest);
      }
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
      onSaved();
    } finally {
      setSaving(false);
    }
  
    } catch (error) { reportCmsError(error); }
};

  const imageSrc = preview || form.image;

  return (
    <div className="rounded-xl border border-background-200/70 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-background-200/60 pb-3">
        <span className="font-heading text-sm font-bold text-foreground-900">{form.name || 'Untitled coach'}</span>
        <button type="button" onClick={onDelete} className="text-xs font-semibold text-red-600 hover:text-red-700">
          Delete coach
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-background-100">
          {imageSrc ? (
            <img loading="lazy" decoding="async" src={imageSrc} alt={form.name} className="h-full w-full object-cover" />
          ) : (
            <i className="ri-user-3-line text-xl text-foreground-300" />
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs font-semibold text-primary-600 hover:text-primary-700"
        >
          Upload photo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        />
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor={`coach-name-${coach.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Name</label>
          <input
            id={`coach-name-${coach.id}`}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <div>
          <label htmlFor={`coach-qual-${coach.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Qualification / background</label>
          <input
            id={`coach-qual-${coach.id}`}
            value={form.qualification}
            onChange={(e) => set('qualification', e.target.value)}
            className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <div>
          <label htmlFor={`coach-focus-${coach.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Focus</label>
          <textarea
            id={`coach-focus-${coach.id}`}
            value={form.focus}
            onChange={(e) => set('focus', e.target.value)}
            rows={3}
            className="w-full resize-y rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label htmlFor={`coach-order-${coach.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Order</label>
            <input
              id={`coach-order-${coach.id}`}
              type="number"
              value={form.order}
              onChange={(e) => set('order', Number(e.target.value))}
              className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
            />
          </div>
          <label className="flex items-center gap-2 py-2 text-sm text-foreground-700">
            <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} />
            Published
          </label>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Coach'}
        </button>
        {!form.is_active && <span className="text-xs font-semibold text-background-600">Draft — hidden from the live site</span>}
        {savedMsg && <span className="text-xs font-medium text-highlight-700">Saved successfully!</span>}
      </div>
    </div>
  );
}
