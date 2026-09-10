import { reportCmsError } from '../api/reportError';
import { useEffect, useRef, useState } from 'react';
import { cmsApi } from '../api/client';

interface Partner {
  id: number;
  name: string;
  logo: string | null;
  logo_url: string;
  link_url: string;
  order: number;
  is_active: boolean;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[] | null>(null);
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const [adding, setAdding] = useState(false);

  const load = () => cmsApi.get<Partner[]>('/partners/').then(setPartners).catch(reportCmsError);

  useEffect(() => {
    load();
  }, []);

  const addByUrl = async () => {
    try {
    if (!newLogoUrl.trim()) return;
    setAdding(true);
    try {
      await cmsApi.post('/partners/', {
        name: '',
        logo_url: newLogoUrl.trim(),
        link_url: '',
        order: (partners?.length ?? 0) * 10 + 10,
        is_active: true,
      });
      setNewLogoUrl('');
      load();
    } finally {
      setAdding(false);
    }
  
    } catch (error) { reportCmsError(error); }
};

  const deletePartner = async (id: number) => {
    try {
    if (!window.confirm('Delete this partner logo?')) return;
    await cmsApi.del(`/partners/${id}/`);
    load();
  
    } catch (error) { reportCmsError(error); }
};

  return (
    <div>
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground-900">Partner logos</h1>
        <p className="mt-1 text-sm text-foreground-600">Logos shown in the partner logo grid on the homepage.</p>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-background-200/70 bg-white p-4">
        <div className="min-w-0 flex-1">
          <label htmlFor="new-partner-url" className="mb-1 block text-xs font-semibold text-foreground-600">Add a logo by link</label>
          <input
            id="new-partner-url"
            value={newLogoUrl}
            onChange={(e) => setNewLogoUrl(e.target.value)}
            placeholder="https://example.com/logo.png"
            className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <button
          type="button"
          onClick={addByUrl}
          disabled={adding || !newLogoUrl.trim()}
          className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          + Add Logo
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners === null ? (
          <p className="text-sm text-foreground-400">Loading…</p>
        ) : partners.length === 0 ? (
          <p className="text-sm text-foreground-400">No partner logos yet.</p>
        ) : (
          partners.map((partner) => (
            <PartnerEditor key={partner.id} partner={partner} onDelete={() => deletePartner(partner.id)} onSaved={load} />
          ))
        )}
      </div>
    </div>
  );
}

function PartnerEditor({ partner, onDelete, onSaved }: { partner: Partner; onDelete: () => void; onSaved: () => void }) {
  const [form, setForm] = useState(partner);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Partner>(key: K, value: Partner[K]) => setForm((prev) => ({ ...prev, [key]: value }));

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
        data.append('logo_url', form.logo_url);
        data.append('link_url', form.link_url);
        data.append('order', String(form.order));
        data.append('is_active', String(form.is_active));
        data.append('logo', imageFile);
        await cmsApi.patch(`/partners/${partner.id}/`, data);
      } else {
        const { logo: _logo, ...rest } = form;
        await cmsApi.patch(`/partners/${partner.id}/`, rest);
      }
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
      onSaved();
    } finally {
      setSaving(false);
    }
  
    } catch (error) { reportCmsError(error); }
};

  const imageSrc = preview || form.logo || form.logo_url;

  return (
    <div className="rounded-xl border border-background-200/70 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex h-16 flex-1 items-center justify-center overflow-hidden rounded-lg bg-background-50">
          {imageSrc ? (
            <img loading="lazy" decoding="async" src={imageSrc} alt={form.name || 'Partner logo'} className="max-h-14 max-w-full object-contain" />
          ) : (
            <i className="ri-image-line text-2xl text-foreground-300" />
          )}
        </div>
        <button type="button" onClick={onDelete} className="text-xs font-semibold text-red-600 hover:text-red-700">
          Delete
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
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

      <div className="mt-3 space-y-2">
        <div>
          <label htmlFor={`partner-name-${partner.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Label (optional)</label>
          <input
            id={`partner-name-${partner.id}`}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. APM"
            className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <div>
          <label htmlFor={`partner-logo-url-${partner.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Logo link</label>
          <input
            id={`partner-logo-url-${partner.id}`}
            value={form.logo_url}
            onChange={(e) => set('logo_url', e.target.value)}
            placeholder="https://…"
            className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <div>
          <label htmlFor={`partner-link-${partner.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Click-through link (optional)</label>
          <input
            id={`partner-link-${partner.id}`}
            value={form.link_url}
            onChange={(e) => set('link_url', e.target.value)}
            placeholder="https://…"
            className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label htmlFor={`partner-order-${partner.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Order</label>
            <input
              id={`partner-order-${partner.id}`}
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

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {!form.is_active && <span className="text-xs font-semibold text-background-600">Draft</span>}
        {savedMsg && <span className="text-xs font-medium text-highlight-700">Saved!</span>}
      </div>
    </div>
  );
}
