import { reportCmsError } from '../api/reportError';
import { useEffect, useRef, useState } from 'react';
import { cmsApi } from '../api/client';
import Modal from '@/components/base/Modal';

interface Mentor {
  id: number;
  name: string;
  initials: string;
  role_title: string;
  affiliation: string;
  specialties: string;
  biography: string;
  image: string | null;
  image_url: string;
  linkedin_url: string;
  order: number;
  is_active: boolean;
}

const emptyMentor = {
  name: '',
  initials: '',
  role_title: '',
  affiliation: '',
  specialties: '',
  biography: '',
  image_url: '',
  linkedin_url: '',
  order: 0,
  is_active: true,
};

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = () => cmsApi.get<Mentor[]>('/mentors/').then(setMentors).catch(reportCmsError);

  useEffect(() => {
    load();
  }, []);

  const createMentor = async () => {
    try {
      setAdding(true);
      try {
        const created = await cmsApi.post<Mentor>('/mentors/', { ...emptyMentor, name: 'New Mentor', biography: 'Add a short biography.' });
        await load();
        setEditingId(created.id);
      } finally {
        setAdding(false);
      }
    } catch (error) { reportCmsError(error); }
  };

  const deleteMentor = async (id: number) => {
    try {
      if (!window.confirm('Delete this mentor?')) return;
      await cmsApi.del(`/mentors/${id}/`);
      setEditingId(null);
      load();
    } catch (error) { reportCmsError(error); }
  };

  const editingMentor = mentors?.find((mentor) => mentor.id === editingId) ?? null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground-900">Mentors</h1>
          <p className="mt-1 text-sm text-foreground-600">Managed here, shown on every &quot;Meet the Mentors&quot; section across the site.</p>
        </div>
        <button
          type="button"
          onClick={createMentor}
          disabled={adding}
          className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          + Add Mentor
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {mentors === null ? (
          <p className="col-span-full text-sm text-foreground-400">Loading…</p>
        ) : mentors.length === 0 ? (
          <p className="col-span-full text-sm text-foreground-400">No mentors yet.</p>
        ) : (
          mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} onEdit={() => setEditingId(mentor.id)} />
          ))
        )}
      </div>

      <Modal open={!!editingMentor} onClose={() => setEditingId(null)} title={editingMentor?.name || 'Edit mentor'}>
        {editingMentor && (
          <MentorEditor
            mentor={editingMentor}
            onDelete={() => deleteMentor(editingMentor.id)}
            onSaved={() => { load(); setEditingId(null); }}
          />
        )}
      </Modal>
    </div>
  );
}

function MentorCard({ mentor, onEdit }: { mentor: Mentor; onEdit: () => void }) {
  const imageSrc = mentor.image || mentor.image_url;
  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex flex-col items-center gap-2 rounded-xl border border-background-200/70 bg-white p-4 text-center shadow-sm transition-colors hover:border-primary-300"
    >
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-background-100">
        {imageSrc ? (
          <img loading="lazy" decoding="async" src={imageSrc} alt={mentor.name} className="h-full w-full object-cover" />
        ) : (
          <i className="ri-user-3-line text-2xl text-foreground-300" />
        )}
      </div>
      <div className="min-w-0 w-full">
        <p className="truncate text-sm font-bold text-foreground-900">{mentor.name || 'Untitled mentor'}</p>
        <p className="truncate text-xs text-foreground-500">{mentor.role_title}</p>
      </div>
      {!mentor.is_active && <span className="text-[10px] font-semibold uppercase tracking-wide text-background-600">Draft</span>}
      <span className="text-xs font-semibold text-primary-600">Edit</span>
    </button>
  );
}

function MentorEditor({ mentor, onDelete, onSaved }: { mentor: Mentor; onDelete: () => void; onSaved: () => void }) {
  const [form, setForm] = useState(mentor);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Mentor>(key: K, value: Mentor[K]) => setForm((prev) => ({ ...prev, [key]: value }));

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
          data.append('initials', form.initials);
          data.append('role_title', form.role_title);
          data.append('affiliation', form.affiliation);
          data.append('specialties', form.specialties);
          data.append('biography', form.biography);
          data.append('image_url', form.image_url);
          data.append('linkedin_url', form.linkedin_url);
          data.append('order', String(form.order));
          data.append('is_active', String(form.is_active));
          data.append('image', imageFile);
          await cmsApi.patch(`/mentors/${mentor.id}/`, data);
        } else {
          const { image: _image, ...rest } = form;
          await cmsApi.patch(`/mentors/${mentor.id}/`, rest);
        }
        onSaved();
      } finally {
        setSaving(false);
      }
    } catch (error) { reportCmsError(error); }
  };

  const imageSrc = preview || form.image || form.image_url;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:w-40">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-background-100">
            {imageSrc ? (
              <img loading="lazy" decoding="async" src={imageSrc} alt={form.name} className="h-full w-full object-cover" />
            ) : (
              <i className="ri-user-3-line text-3xl text-foreground-300" />
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

        <div className="grid flex-1 grid-cols-1 gap-3">
          <TextField id={`name-${mentor.id}`} label="Name" value={form.name} onChange={(v) => set('name', v)} />
          <TextField
            id={`image-url-${mentor.id}`}
            label="External image link"
            value={form.image_url}
            onChange={(v) => { set('image_url', v); if (v) onFileChange(null); }}
            placeholder="https://example.com/photo.jpg"
          />
          <TextField id={`initials-${mentor.id}`} label="Initials (optional)" value={form.initials} onChange={(v) => set('initials', v)} />
          <TextField id={`role-${mentor.id}`} label="Role" value={form.role_title} onChange={(v) => set('role_title', v)} />
          <TextField id={`affiliation-${mentor.id}`} label="Affiliation" value={form.affiliation} onChange={(v) => set('affiliation', v)} />
          <TextField id={`specialties-${mentor.id}`} label="Specialties (comma-separated)" value={form.specialties} onChange={(v) => set('specialties', v)} />
          <TextField id={`linkedin-${mentor.id}`} label="LinkedIn URL" value={form.linkedin_url} onChange={(v) => set('linkedin_url', v)} />
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label htmlFor={`order-${mentor.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Order</label>
              <input
                id={`order-${mentor.id}`}
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
          <div>
            <label htmlFor={`bio-${mentor.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Biography</label>
            <textarea
              id={`bio-${mentor.id}`}
              value={form.biography}
              onChange={(e) => set('biography', e.target.value)}
              rows={3}
              className="w-full resize-y rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-background-200/60 pt-4">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Mentor'}
        </button>
        {!form.is_active && <span className="text-xs font-semibold text-background-600">Draft — hidden from the live site</span>}
        <button type="button" onClick={onDelete} className="ml-auto text-xs font-semibold text-red-600 hover:text-red-700">
          Delete mentor
        </button>
      </div>
    </div>
  );
}

function TextField({ id, label, value, onChange, className = '', placeholder }: { id: string; label: string; value: string; onChange: (v: string) => void; className?: string; placeholder?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-foreground-600">{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
      />
    </div>
  );
}
