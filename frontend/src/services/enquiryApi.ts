const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  roleTitle?: string;
  enquiryType?: string;
  message?: string;
  sourcePath?: string;
}

export async function submitEnquiryPayload(payload: EnquiryPayload) {
  const response = await fetch(`${API_BASE_URL}/enquiries/`, {
    method: 'POST',
    signal: AbortSignal.timeout(20000),
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Enquiry submission failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || !('id' in data) || typeof data.id !== 'number' || !Number.isInteger(data.id) || data.id <= 0) throw new Error('Missing stored enquiry reference');
  window.dataLayer?.push({
    event: 'generate_lead',
    enquiry_type: payload.enquiryType || 'General enquiry',
    page_path: payload.sourcePath || window.location.pathname,
  });

  return { id: data.id };
}

function value(formData: FormData, ...keys: string[]) {
  for (const key of keys) {
    const candidate = formData.get(key);
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim();
  }
  return '';
}

export async function submitEnquiry(form: HTMLFormElement, fallbackType = 'Website enquiry') {
  const formData = new FormData(form);
  const knownFields = new Set([
    'name', 'email', 'phone', 'employer', 'organisation', 'organization', 'company',
    'job_title', 'role_title', 'enquiry_type', 'enquiryType', 'message',
    'phone_alt', 'company_alt', 'website_alt', 'mobile_alt',
  ]);
  const context = Array.from(formData.entries())
    .filter(([key, entryValue]) => !knownFields.has(key) && String(entryValue).trim())
    .map(([key, entryValue]) => `${key.replaceAll('_', ' ')}: ${String(entryValue).trim()}`)
    .join('\n');
  const message = [value(formData, 'message'), context].filter(Boolean).join('\n\n');

  return submitEnquiryPayload({
    name: value(formData, 'name') || 'Website enquiry',
    email: value(formData, 'email'),
    phone: value(formData, 'phone'),
    organisation: value(formData, 'employer', 'organisation', 'organization', 'company'),
    roleTitle: value(formData, 'job_title', 'role_title'),
    enquiryType: value(formData, 'enquiry_type', 'enquiryType') || fallbackType,
    message,
    sourcePath: window.location.pathname,
  });
}
