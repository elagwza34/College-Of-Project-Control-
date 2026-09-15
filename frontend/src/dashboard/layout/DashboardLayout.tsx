import { EnquiryNotificationPanel } from './EnquiryNotifications';
import { useEnquiryNotifications } from './useEnquiryNotifications';
import { useEffect, useState } from 'react';
import Modal from '@/components/base/Modal';
import RouteScroll from '@/components/feature/RouteScroll';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const navItems = [
  { to: '/dashboard/pages', label: 'Pages & sections', icon: 'ri-layout-line', end: false },
  { to: '/dashboard/chatbot', label: 'Programme assistant', icon: 'ri-robot-2-line', end: false },
  { to: '/dashboard/testimonials', label: 'Testimonials & reviews', icon: 'ri-chat-quote-line', end: false },
  { to: '/dashboard/articles', label: 'Articles', icon: 'ri-article-line', end: false },
  { to: '/dashboard/ipc-images', label: 'IPC images', icon: 'ri-gallery-line', end: false },
  { to: '/dashboard', label: 'Overview', icon: 'ri-dashboard-3-line', end: true },
  { to: '/dashboard/content', label: 'Content ownership', icon: 'ri-file-list-3-line', end: false },
  { to: '/dashboard/mentors', label: 'Mentors', icon: 'ri-team-line', end: false },
  { to: '/dashboard/coaches', label: 'Coaching & Support', icon: 'ri-user-star-line', end: false },
  { to: '/dashboard/partners', label: 'Partner logos', icon: 'ri-award-line', end: false },
  { to: '/dashboard/sectors', label: 'Sectors', icon: 'ri-building-4-line', end: false },
  { to: '/dashboard/professional-credentials', label: 'Professional credentials', icon: 'ri-medal-2-line', end: false },
  { to: '/dashboard/events', label: 'Events', icon: 'ri-calendar-event-line', end: false },
  { to: '/dashboard/media', label: 'Media Library', icon: 'ri-image-2-line', end: false },
  { to: '/dashboard/enquiries', label: 'Enquiries', icon: 'ri-mail-line', end: false },
];

export default function DashboardLayout() {
  const notifications = useEnquiryNotifications();
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestError, setRequestError] = useState('');
  useEffect(() => {
    const report = (event: Event) => setRequestError((event as CustomEvent<string>).detail);
    window.addEventListener('cms-request-error', report);
    return () => window.removeEventListener('cms-request-error', report);
  }, []);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  const navigation = (
      <div className="flex h-full flex-col bg-primary-950 text-white">
        <div className="flex items-center gap-2.5 px-5 py-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-500 text-primary-950">
            <i className="ri-layout-grid-line text-lg" aria-hidden="true" />
          </span>
          <span className="font-heading text-sm font-bold">CPCM Dashboard</span>
        </div>
        <nav aria-label="Dashboard" className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <i className={`${item.icon} text-base`} aria-hidden="true" />
              {item.label}
              {item.to === '/dashboard/enquiries' && !!notifications.data?.unread_count && <span aria-label={`${notifications.data.unread_count} unread enquiries`} className="ml-auto rounded-full bg-signal-500 px-2 py-0.5 text-xs font-bold text-primary-950">{notifications.data.unread_count}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="mx-3 mb-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <i className="ri-external-link-line text-base" aria-hidden="true" />
            View Live Website
          </a>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mx-3 mb-5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <i className="ri-logout-box-line text-base" aria-hidden="true" />
          Log out
        </button>
      </div>
  );

  return (
    <div className="flex min-h-screen bg-background-50">
      <RouteScroll />
      <aside className="hidden w-64 shrink-0 lg:block">{navigation}</aside>
      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Dashboard navigation">{navigation}</Modal>
      <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 overflow-y-auto">
        <div className="w-full px-6 py-8 md:px-8 md:py-10 xl:px-10">
          <button type="button" onClick={() => setMenuOpen(true)} className="btn-secondary mb-6 px-4 py-2 lg:hidden">Dashboard menu</button>
          {requestError && <div role="alert" className="mb-6 rounded-card border border-status-error bg-white p-4 text-foreground-900">
            <p>{requestError} Your unsaved entries are still here. Retry the action, or reload a failed list.</p>
            <div className="mt-3 flex flex-wrap gap-4"><button type="button" className="underline" onClick={() => setRequestError('')}>Dismiss</button>
            <button type="button" className="underline" onClick={() => { if (window.confirm('Reload this page? Unsaved entries will be lost.')) window.location.reload(); }}>Reload list</button></div>
          </div>}
          <EnquiryNotificationPanel {...notifications} />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
