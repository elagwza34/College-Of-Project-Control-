import { reportCmsError } from '../api/reportError';
import { useEffect, useState } from 'react';
import { cmsApi } from '../api/client';
import { DashboardEmptyState, DashboardPageHeader, DashboardSkeletonList, StatusBadge } from '../components/DashboardPrimitives';

interface ProfessionalCredential {
  id: number;
  image: string | null;
  image_url: string;
  order: number;
}

export default function ProfessionalCredentialsPage() {
  const [credentials, setCredentials] = useState<ProfessionalCredential[] | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [adding, setAdding] = useState(false);

  const load = () => cmsApi.get<ProfessionalCredential[]>('/professional-credentials/').then(setCredentials).catch(reportCmsError);

  useEffect(() => {
    load();
  }, []);

  const addLogo = async () => {
    if (!imageUrl.trim()) return;
    setAdding(true);
    try {
      const order = (credentials?.length ?? 0) * 10 + 10;
      await cmsApi.post('/professional-credentials/', { image_url: imageUrl.trim(), order, is_active: true });
      setImageUrl('');
      load();
    } catch (error) {
      reportCmsError(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteLogo = async (id: number) => {
    if (!window.confirm('Delete this professional credential logo? It will be removed from the recognition section. This action cannot be undone.')) return;
    try {
      await cmsApi.del(`/professional-credentials/${id}/`);
      load();
    } catch (error) {
      reportCmsError(error);
    }
  };

  return (
    <div>
      <DashboardPageHeader
        eyebrow="People & recognition"
        title="Professional credentials and recognition"
        description="Manage the logos shown in the shared professional recognition section across the website."
        meta={credentials && <StatusBadge tone="info">{credentials.length} logos</StatusBadge>}
      />

      <section className="rounded-xl border border-background-200/70 bg-white p-5">
        <div className="flex items-center gap-2">
          <i className="ri-add-circle-line text-lg text-primary-600" aria-hidden="true" />
          <h2 className="font-heading text-base font-bold text-foreground-900">Add credential logo</h2>
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="min-w-[280px] flex-1 text-xs font-semibold text-foreground-600">
            External image link
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://example.com/logo.png"
              className="mt-1 w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={addLogo}
            disabled={adding || !imageUrl.trim()}
            className="btn-primary px-5 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {adding ? 'Adding logo...' : 'Add logo'}
          </button>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {credentials === null ? (
          <div className="col-span-full"><DashboardSkeletonList rows={3} /></div>
        ) : credentials.length === 0 ? (
          <div className="col-span-full">
            <DashboardEmptyState icon="ri-medal-2-line" title="No credential logos yet" description="Add a logo link to show a professional body or recognition mark on the website." />
          </div>
        ) : (
          credentials.map((credential) => (
            <LogoEditor key={credential.id} credential={credential} onDelete={() => deleteLogo(credential.id)} onSaved={load} />
          ))
        )}
      </div>
    </div>
  );
}

function LogoEditor({
  credential,
  onDelete,
  onSaved,
}: {
  credential: ProfessionalCredential;
  onDelete: () => void;
  onSaved: () => void;
}) {
  const [order, setOrder] = useState(credential.order);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const imageSrc = credential.image || credential.image_url;

  const save = async () => {
    setSaving(true);
    try {
      await cmsApi.patch(`/professional-credentials/${credential.id}/`, { order });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onSaved();
    } catch (error) {
      reportCmsError(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="rounded-xl border border-background-200/70 bg-white p-3 shadow-sm">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-background-200 bg-background-50 p-2">
        {imageSrc ? (
          <img loading="lazy" decoding="async" src={imageSrc} alt="" className="h-full w-full object-contain" />
        ) : (
          <i className="ri-award-line text-3xl text-foreground-300" aria-hidden="true" />
        )}
      </div>
      <div className="mt-3 flex items-end gap-2">
        <label className="flex-1 text-xs font-semibold text-foreground-600">
          Display order
          <input
            type="number"
            value={order}
            onChange={(event) => setOrder(Number(event.target.value))}
            className="mt-1 w-full rounded-md border border-background-200 px-2 py-1.5 text-sm focus:border-primary-400 focus:outline-none"
          />
        </label>
        <button type="button" onClick={save} disabled={saving} className="btn-primary px-3 py-1.5 text-xs font-semibold disabled:opacity-50">
          {saving ? 'Saving...' : 'Save order'}
        </button>
      </div>
      <button type="button" onClick={onDelete} className="mt-2 text-xs font-semibold text-red-700 hover:text-red-800">
        Delete logo
      </button>
      {saved && <p role="status" className="mt-1 text-xs font-medium text-highlight-700">Order saved.</p>}
    </article>
  );
}
