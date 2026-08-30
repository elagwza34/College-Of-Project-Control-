import { Menu, X } from 'lucide-react'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { uiActions, type AppDispatch, type RootState } from '@/app/store'
import { contentApi } from '@/services/api/contentApi'
import type { MenuItem } from '@/types/cms'

const fallbackMenu: MenuItem[] = [
  { id: -1, label: 'Identity', url: '/#identity', order: 1, openInNewTab: false, children: [] },
  { id: -2, label: 'Colours', url: '/#tokens', order: 2, openInNewTab: false, children: [] },
  { id: -3, label: 'Next step', url: '/#next', order: 3, openInNewTab: false, children: [] },
]

function ManagedLink({ item, onClick }: { item: MenuItem; onClick?: () => void }) {
  const external = /^https?:\/\//.test(item.url)
  if (external || item.openInNewTab) {
    return <a href={item.url} onClick={onClick} target={item.openInNewTab ? '_blank' : undefined} rel={item.openInNewTab ? 'noreferrer' : undefined}>{item.label}</a>
  }
  return <Link to={item.url} onClick={onClick}>{item.label}</Link>
}

export function MainLayout() {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.ui.isMobileMenuOpen)
  const siteQuery = useQuery({
    queryKey: ['site-content'],
    queryFn: ({ signal }) => contentApi.site(signal),
    retry: false,
  })
  const settings = siteQuery.data?.settings
  const headerItems = siteQuery.data?.menus.find((menu) => menu.location === 'header')?.items ?? fallbackMenu
  const footerItems = siteQuery.data?.menus
    .filter((menu) => menu.location.startsWith('footer') || menu.location === 'legal')
    .flatMap((menu) => menu.items) ?? []

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {settings?.announcementEnabled && settings.announcementText && (
        <a className="announcement" href={settings.announcementUrl || '#main-content'}>{settings.announcementText}</a>
      )}
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="College of Project Control — Home">
            {settings?.logoUrl ? <img className="brand-logo" src={settings.logoUrl} alt="" /> : <span className="brand-mark" aria-hidden="true">C</span>}
            <span className="brand-copy"><strong>{settings?.logoText || 'College of'}</strong><small>{settings?.tagline || 'Project Control'}</small></span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {headerItems.map((item) => <ManagedLink item={item} key={item.id} />)}
          </nav>

          {settings?.primaryCtaLabel && settings.primaryCtaUrl && (
            <a className="header-cta" href={settings.primaryCtaUrl}>{settings.primaryCtaLabel}</a>
          )}

          <button
            className="menu-button"
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => dispatch(uiActions.toggleMobileMenu())}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {headerItems.map((item) => (
              <ManagedLink item={item} key={item.id} onClick={() => dispatch(uiActions.closeMobileMenu())} />
            ))}
            {settings?.primaryCtaLabel && settings.primaryCtaUrl && (
              <a className="mobile-cta" href={settings.primaryCtaUrl} onClick={() => dispatch(uiActions.closeMobileMenu())}>{settings.primaryCtaLabel}</a>
            )}
          </nav>
        )}
      </header>
      <main id="main-content"><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <p className="footer-brand">{settings?.siteName || 'College of Project Control'}</p>
            <p>{settings?.footerDescription || 'A scalable React interface, ready for Neon integration.'}</p>
          </div>
          {footerItems.length > 0 && <nav className="footer-nav" aria-label="Footer navigation">{footerItems.map((item) => <ManagedLink item={item} key={item.id} />)}</nav>}
          <p>© {new Date().getFullYear()} {settings?.copyrightName || 'College of Project Control'}</p>
        </div>
      </footer>
    </>
  )
}
