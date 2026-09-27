import { PageContentProvider } from '@/components/feature/PageContent';
import RouteScroll from '@/components/feature/RouteScroll';
/* eslint-disable react-refresh/only-export-components */
import { Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import SeoManager from '@/components/feature/SeoManager';
import Navbar from '@/components/feature/Navbar';
import FundingTicker from '@/components/feature/FundingTicker';
import MaintenanceGate from '@/components/feature/MaintenanceGate';
import ProgrammeAssistant from '@/components/feature/chatbot/ProgrammeAssistant';
import routes from './config';

declare global {
  interface Window {
    REACT_APP_NAVIGATE?: ReturnType<typeof useNavigate>;
  }
}

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

export const navigatePromise = new Promise<ReturnType<typeof useNavigate>>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(navigate);
  });



  return (
    <PageContentProvider>
      <MaintenanceGate>
        <SeoManager /><RouteScroll />
        <div data-public-site className="fixed inset-x-0 top-0 z-50">
          <FundingTicker />
          <Navbar />
        </div>
        <div data-public-site id="main-content" tabIndex={-1} key={location.pathname}>
            <Suspense fallback={<div className="page-loader" role="status" aria-live="polite"><span>Loading page</span></div>}>
              {element}
            </Suspense>
        </div>
        <ProgrammeAssistant />
      </MaintenanceGate>
    </PageContentProvider>
  );
}
