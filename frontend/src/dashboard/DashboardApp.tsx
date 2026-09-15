const PagesPage = lazy(() => import('./pages/PagesPage'));
import { lazy, Suspense, useEffect } from 'react';
const ContentOwnershipPage = lazy(() => import('./pages/ContentOwnershipPage'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));
const ArticlesDashboardPage = lazy(() => import('./pages/ArticlesPage'));
const TestimonialsDashboardPage = lazy(() => import('./pages/TestimonialsPage'));
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import DashboardLayout from './layout/DashboardLayout';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const MediaLibraryPage = lazy(() => import('./pages/MediaLibraryPage'));
const EnquiriesPage = lazy(() => import('./pages/EnquiriesPage'));
const MentorsPage = lazy(() => import('./pages/MentorsPage'));
const CoachesPage = lazy(() => import('./pages/CoachesPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const ProfessionalCredentialsPage = lazy(() => import('./pages/ProfessionalCredentialsPage'));
const EventsPage = lazy(() => import('./pages/EventsManager'));
const IpcImagesPage = lazy(() => import('./pages/IpcImagesPage'));
const SectorsPage = lazy(() => import('./pages/SectorsPage'));

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/dashboard/login" replace />;
  return <DashboardLayout />;
}

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="pages" element={<PagesPage />} />
        <Route path="pages/:id" element={<PagesPage />} />
        <Route path="home" element={<ContentOwnershipPage />} />
        <Route path="content" element={<ContentOwnershipPage />} />
        <Route path="media" element={<MediaLibraryPage />} />
        <Route path="navigation" element={<ContentOwnershipPage />} />
        <Route path="mentors" element={<MentorsPage />} />
        <Route path="coaches" element={<CoachesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="professional-credentials" element={<ProfessionalCredentialsPage />} />
        <Route path="ipc-images" element={<IpcImagesPage />} />
        <Route path="sectors" element={<SectorsPage />} />
        <Route path="articles" element={<ArticlesDashboardPage />} />
        <Route path="testimonials" element={<TestimonialsDashboardPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="enquiries" element={<EnquiriesPage />} />
        <Route path="chatbot" element={<ChatbotPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function DashboardApp() {
  useEffect(() => {
    document.title = 'CPCM Dashboard';
    const robots = document.querySelector('meta[name="robots"]') || document.head.appendChild(document.createElement('meta'));
    robots.setAttribute('name', 'robots'); robots.setAttribute('content', 'noindex, nofollow');
  }, []);
  return (
    <AuthProvider>
      <Suspense fallback={<div className="page-loader" role="status">Loading dashboard</div>}><DashboardRoutes /></Suspense>
    </AuthProvider>
  );
}
