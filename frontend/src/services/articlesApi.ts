const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface ArticleSummary {
  id: number; title: string; slug: string; excerpt: string; category: string; author: string;
  image_url: string; image_alt: string; read_minutes: number; published_at: string;
}
export interface ArticleDetail extends ArticleSummary { content: string; updated_at: string }
export interface ArticlePage { count: number; next: string | null; previous: string | null; results: ArticleSummary[] }
export class ArticleRequestError extends Error {
  status: number;
  constructor(status: number) { super(`Unable to load articles (${status})`); this.status = status; }
}
export async function fetchArticles(options: { search?: string; page?: number; pageSize?: number; exclude?: string } = {}, signal?: AbortSignal): Promise<ArticlePage> {
  const params = new URLSearchParams({ page: String(options.page ?? 1), page_size: String(options.pageSize ?? 12) });
  if (options.search) params.set('search', options.search);
  if (options.exclude) params.set('exclude', options.exclude);
  const response = await fetch(`${API_BASE}/articles/?${params}`, { signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000) });
  if (!response.ok) throw new ArticleRequestError(response.status);
  const data = await response.json() as ArticlePage;
  if (!Array.isArray(data.results)) throw new Error('Invalid article response');
  return data;
}
export async function fetchArticle(slug: string, signal?: AbortSignal): Promise<ArticleDetail> {
  const response = await fetch(`${API_BASE}/articles/${encodeURIComponent(slug)}/`, { signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000) });
  if (!response.ok) throw new ArticleRequestError(response.status);
  return response.json();
}
