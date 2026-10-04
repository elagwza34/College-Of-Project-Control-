/**
 * Data for the header mega menus that are not plain route lists.
 *
 * The header opens a different panel depending on which item is hovered:
 * the programme menu keeps the existing route columns, the pathway menu
 * explains the three Level 6 pathways, and the sector menu shows each sector
 * with its own image.
 *
 * Kept beside the navigation rather than inside a component so the header stays
 * a layout concern and this content can be edited in one place.
 */

export interface MegaMenuCard {
  label: string;
  href: string;
  description: string;
  /** Icon used when the card has no photograph. */
  icon?: string;
  image?: string;
  /** Alternative text for the card image. */
  imageAlt?: string;
}

/** The three Level 6 pathways, described in the language used across the site. */
export const pathwayCards: MegaMenuCard[] = [
  {
    label: 'Operational Pathway',
    href: '/project-controls-professional/operational-route',
    description:
      'Delivery-side control: schedule, cost and progress evidence on live projects.',
    icon: 'ri-calendar-check-line',
  },
  {
    label: 'Strategic Pathway',
    href: '/project-controls-professional/strategic-route',
    description:
      'Programme and portfolio-level control: cross-project assurance and strategy.',
    icon: 'ri-compass-3-line',
  },
  {
    label: 'Chartered Pathway',
    href: '/project-controls-professional/chartered-pmo-pathway',
    description:
      'The chartered route, which involves a separate professional-body application.',
    icon: 'ri-shield-star-line',
  },
];

/** The four CPCM sectors, each linking to its own sector route. */
export const sectorCards: MegaMenuCard[] = [
  {
    label: 'Construction & Infrastructure',
    href: '/project-controls-professional/construction-route',
    description:
      'Planning, controls, cost, contracts and risk across complex capital and infrastructure delivery.',
    image: '/images/construction-sector-hero.webp',
    imageAlt: 'Construction and infrastructure project environment',
  },
  {
    label: 'Engineering & Manufacturing',
    href: '/project-controls-professional/engineering-manufacturing-aerospace-route',
    description:
      'Integration, scheduling, cost and performance control across engineering and manufacturing environments.',
    image: '/images/engineering-sector-hero.webp',
    imageAlt: 'Engineering and manufacturing project environment',
  },
  {
    label: 'Public Sector',
    href: '/project-controls-professional/public-sector-councils-route',
    description:
      'Governance, assurance, planning and accountable delivery across public programmes and projects.',
    image: '/images/public-sector-sector-hero.webp',
    imageAlt: 'Public sector project delivery environment',
  },
  {
    label: 'Energy & Utilities',
    href: '/project-controls-professional/energy-oil-gas-utilities-route',
    description:
      'Planning, cost, risk and integrated controls across complex assets, programmes and operational environments.',
    image: '/images/energy-sector-hero.jpg',
    imageAlt: 'Energy and utilities project environment',
  },
];
