const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudySummary {
  id: number;
  title: string;
  slug: string;
  sector: string;
  client_name: string;
  headline: string;
  summary: string;
  metrics: CaseStudyMetric[];
  image_url: string;
  image_alt: string;
  is_featured: boolean;
  published_at: string;
}

export interface CaseStudyDetail extends CaseStudySummary {
  challenge: string;
  approach: string;
  outcome: string;
  updated_at: string;
}

export interface CaseStudyPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: CaseStudySummary[];
}

export class CaseStudyRequestError extends Error {
  status: number;
  constructor(status: number) {
    super(`Unable to load case studies (${status})`);
    this.status = status;
  }
}

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new CaseStudyRequestError(response.status);
  return response.json();
}

export function fetchCaseStudies(options: { search?: string; sector?: string; page?: number; pageSize?: number } = {}, signal?: AbortSignal) {
  const params = new URLSearchParams({ page: String(options.page ?? 1), page_size: String(options.pageSize ?? 12) });
  if (options.search) params.set('search', options.search);
  if (options.sector) params.set('sector', options.sector);
  return get<CaseStudyPage>(`/case-studies/?${params}`, signal);
}

export function fetchCaseStudy(slug: string, signal?: AbortSignal) {
  return get<CaseStudyDetail>(`/case-studies/${encodeURIComponent(slug)}/`, signal);
}
