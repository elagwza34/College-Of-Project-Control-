export type MenuItem = {
  id: number
  label: string
  url: string
  order: number
  openInNewTab: boolean
  children: MenuItem[]
}

export type NavigationMenu = {
  location: 'header' | 'footer_primary' | 'footer_secondary' | 'legal'
  name: string
  items: MenuItem[]
}

export type SiteSettings = {
  siteName: string
  tagline: string
  logoText: string
  logoUrl: string
  primaryCtaLabel: string
  primaryCtaUrl: string
  announcementEnabled: boolean
  announcementText: string
  announcementUrl: string
  footerDescription: string
  footerCtaTitle: string
  footerCtaBody: string
  footerCtaLabel: string
  footerCtaUrl: string
  copyrightName: string
}

export type SiteContent = {
  settings: SiteSettings
  menus: NavigationMenu[]
}

export type SectionType =
  | 'hero'
  | 'rich_text'
  | 'feature_grid'
  | 'card_grid'
  | 'stats'
  | 'media_copy'
  | 'testimonial'
  | 'faq'
  | 'cta'
  | 'logo_marquee'
  | 'funding_calculator'

export type CmsSection = {
  id: number
  type: SectionType
  sectionTypeLabel: string
  anchorId: string
  styleVariant: string
  content: Record<string, unknown>
}

export type CmsPage = {
  id: number
  title: string
  slug: string
  navigationTitle: string
  summary: string
  seoTitle: string
  seoDescription: string
  socialImageUrl: string
  isHomepage: boolean
  updatedAt: string
  sections: CmsSection[]
}
