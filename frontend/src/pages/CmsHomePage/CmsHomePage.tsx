import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { SectionRenderer } from '@/features/content/SectionRenderer'
import UiFoundationPage from '@/pages/UiFoundationPage/UiFoundationPage'
import { contentApi } from '@/services/api/contentApi'

export default function CmsHomePage() {
  const homeQuery = useQuery({
    queryKey: ['cms-page', 'home'],
    queryFn: ({ signal }) => contentApi.home(signal),
    retry: false,
  })

  if (!homeQuery.data) {
    return <UiFoundationPage />
  }

  const page = homeQuery.data
  return (
    <>
      <Helmet>
        <title>{page.seoTitle || page.title} | College of Project Control</title>
        {page.seoDescription && <meta name="description" content={page.seoDescription} />}
      </Helmet>
      <SectionRenderer sections={page.sections} />
    </>
  )
}

