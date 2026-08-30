/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'

const CmsHomePage = lazy(() => import('@/pages/CmsHomePage/CmsHomePage'))
const CmsPage = lazy(() => import('@/pages/CmsPage/CmsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'))

const fallback = <div className="route-loader" role="status">Loading interface…</div>

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={fallback}><CmsHomePage /></Suspense> },
      { path: ':slug', element: <Suspense fallback={fallback}><CmsPage /></Suspense> },
      { path: '*', element: <Suspense fallback={fallback}><NotFoundPage /></Suspense> },
    ],
  },
])
