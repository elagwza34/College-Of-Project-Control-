import { reportCmsError } from '../api/reportError';
import { useEffect, useState } from 'react';
import { cmsApi } from '../api/client';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  roleTitle: string;
  enquiryType: string;
  message: string;
  sourcePath: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at: string;
}

const statusOptions = ['new', 'contacted', 'qualified', 'closed'] as const;

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState('');

  const load = () => {
    cmsApi
      .get<Enquiry[]>('/enquiries/')
      .then(setEnquiries)
      .catch(() => setError('Could not load enquiries.'));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, nextStatus: string) => {
    try {
    setEnquiries((prev) =>
      prev ? prev.map((e) => (e.id === id ? { ...e, status: nextStatus as Enquiry['status'] } : e)) : prev,
    );
    try {
      await cmsApi.patch(`/enquiries/${id}/`, { status: nextStatus });
    } catch (error) {
      reportCmsError(error);
      load();
    }
  
    } catch (error) { reportCmsError(error); }
};

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground-900">Enquiries</h1>
      <p className="mt-1 text-sm text-foreground-600">Every enquiry submitted through the site&apos;s forms.</p>

      {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-xl border border-background-200/70 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-background-200/70 bg-background-50 text-xs uppercase tracking-wider text-foreground-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries === null ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-foreground-400">Loading…</td>
              </tr>
            ) : enquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-foreground-400">No enquiries yet.</td>
              </tr>
            ) : (
              enquiries.map((e) => (
                <tr key={e.id} className="border-b border-background-200/50 last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground-900">{e.name}</td>
                  <td className="px-4 py-3 text-foreground-600">{e.email}</td>
                  <td className="px-4 py-3 text-foreground-600">{e.enquiryType || '—'}</td>
                  <td className="px-4 py-3 text-foreground-400">{e.sourcePath || '—'}</td>
                  <td className="px-4 py-3 text-foreground-400">{new Date(e.created_at).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3">
                    <select
                      value={e.status}
                      onChange={(ev) => updateStatus(e.id, ev.target.value)}
                      className="rounded-md border border-background-200 bg-background-50 px-2 py-1 text-xs capitalize focus:outline-none focus:border-primary-400"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
