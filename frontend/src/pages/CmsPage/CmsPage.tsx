import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { SectionRenderer } from '@/features/content/SectionRenderer'
import { contentApi } from '@/services/api/contentApi'

export default function CmsPage() {
  const { slug = '' } = useParams()
  const pageQuery = useQuery({
    queryKey: ['cms-page', slug],
    queryFn: ({ signal }) => contentApi.page(slug, signal),
    enabled: Boolean(slug),
  })

  if (pageQuery.isPending) {
    return <div className="cms-state" role="status">Loading page…</div>
  }

  if (pageQuery.isError || !pageQuery.data) {
    return (
      <section className="cms-state">
        <p>We could not find this published page.</p>
        <Link className="button button-accent" to="/">Return home</Link>
      </section>
    )
  }

  const page = pageQuery.data
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

