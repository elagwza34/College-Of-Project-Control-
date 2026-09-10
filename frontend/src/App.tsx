import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './router';
import SiteLink from './components/base/SiteLink';
import ErrorBoundary from './components/base/ErrorBoundary';
const DashboardApp = lazy(() => import('./dashboard/DashboardApp'));
export default function App() {
  return <BrowserRouter basename={__BASE_PATH__}>
    <SiteLink className="skip-link" href="#main-content">Skip to main content</SiteLink>
    <ErrorBoundary><Suspense fallback={<main id="main-content" className="page-loader" role="status">Loading page</main>}>
      <Routes><Route path="/dashboard/*" element={<DashboardApp />} /><Route path="*" element={<AppRoutes />} /></Routes>
    </Suspense></ErrorBoundary>
  </BrowserRouter>;
}
