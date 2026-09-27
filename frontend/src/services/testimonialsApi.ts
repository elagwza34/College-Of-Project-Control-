const BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');
export interface Review { id: number; name: string; programme: string; programme_label: string; reviewer_type: 'professional' | 'employer'; review: string; photo_url: string }
export interface ReviewProgramme { slug: string; name: string }
async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE}${path}`, { signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error('Unable to load reviews. Please try again.');
  return response.json();
}
export const fetchReviews = (programme?: string, signal?: AbortSignal) => get<Review[]>(`/testimonials/${programme ? `?programme=${encodeURIComponent(programme)}` : ''}`, signal);
export const fetchReviewProgrammes = (signal?: AbortSignal) => get<ReviewProgramme[]>('/testimonials/programmes/', signal);
export async function submitReview(data: FormData) {
  const response = await fetch(`${BASE}/testimonials/submit/`, { method: 'POST', body: data, signal: AbortSignal.timeout(30000) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = response.status === 429 ? 'Too many submissions. Please try again later.' : Object.entries(result).map(([key, value]) => `${key === 'detail' ? '' : `${key}: `}${Array.isArray(value) ? value.join(' ') : value}`).join(' ');
    throw new Error(message || 'Your review could not be submitted. Please try again.');
  }
}

// Canonical programme routes and their existing aliases share one review classification.
export const programmeReviewRoutes: Record<string, string> = {
  '/associate-project-manager-level-4': 'associate-project-manager-level-4',
  '/project-controls-professional-level-6': 'pcp-level-6',
  '/project-controls-professional/strategic-route': 'strategic-pcp', '/strategic-pcp': 'strategic-pcp',
  '/project-controls-professional/operational-route': 'operational-pcp',
  '/project-controls-professional/strategic-operational-route': 'strategic-operational-pcp', '/strategic-operational-pcp': 'strategic-operational-pcp',
  '/project-controls-professional/pmo-governance-route': 'pmo-pcp', '/pmo-pcp': 'pmo-pcp',
  '/project-controls-professional/chartered-pmo-pathway': 'chartered-pmo-pathway', '/chartered-pmo-pathway': 'chartered-pmo-pathway',
  '/project-controls-professional/engineering-manufacturing-aerospace-route': 'engineering', '/operational-pcp-engineering': 'engineering',
  '/project-controls-professional/public-sector-councils-route': 'public-sector', '/operational-pcp-public-sector': 'public-sector',
  '/project-controls-professional/energy-oil-gas-utilities-route': 'energy', '/operational-pcp-energy': 'energy',
  '/commercial-project-controls-route': 'commercial', '/campaign/commercial-route': 'commercial',
  '/institute-of-project-controls': 'ipc', '/ipc': 'ipc',
};
