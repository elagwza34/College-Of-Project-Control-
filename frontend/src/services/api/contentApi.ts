import { apiGet } from '@/services/api/apiClient'
import type { CmsPage, SiteContent } from '@/types/cms'

export const contentApi = {
  site: (signal?: AbortSignal) => apiGet<SiteContent>('site/', signal),
  home: (signal?: AbortSignal) => apiGet<CmsPage>('pages/home/', signal),
  page: (slug: string, signal?: AbortSignal) =>
    apiGet<CmsPage>(`pages/${encodeURIComponent(slug)}/`, signal),
}
