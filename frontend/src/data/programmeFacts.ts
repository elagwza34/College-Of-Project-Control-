/**
 * Single source of truth for programme facts.
 *
 * Audit P0 gate "Programme facts" (KBC audit v2.0, REVIEW 13) requires one
 * approved master record per programme. Child pages (pathways, sector pages,
 * comparison tables) import from here instead of retyping facts, so a change
 * to duration or status propagates everywhere.
 *
 * Every claim carries an evidence source and a last-verified date. Anything
 * without a verified source is deliberately not stated on the site.
 *
 * Evidence keys refer to the audit source register:
 *   [O01] Skills England: Associate Project Manager ST0310 v1.5
 *   [O02] Skills England: Project Controls Professional ST0845 v1.1
 *   [O03] GOV.UK: Apprenticeship funding rules 2026/27 (v3)
 *   [O07] APM: ChPP recognised assessments
 *   [O08] PMI: PMP certification requirements
 *   [K03] KBC: Project Controls Professional Level 6
 *   [K04] KBC: Associate Project Manager Level 4
 *   [K05] KBC: Certified PMO Professional Level 6
 */

export const OFFER_TYPE = {
  apprenticeship: 'apprenticeship',
  professional: 'professional-programme',
} as const;

export type OfferType = (typeof OFFER_TYPE)[keyof typeof OFFER_TYPE];

export interface ProgrammeFacts {
  /** Stable internal identifier — do not change without a content review. */
  id: string;
  /** Official offer title, exactly as published. */
  officialTitle: string;
  /** URL slug. */
  slug: string;
  /** Single taxonomy label used by navigation, cards and selectors alike. */
  offerType: OfferType;
  offerTypeLabel: string;
  /** Occupational standard reference, where one exists. */
  standard?: {
    code: string;
    version: string;
    issuingBody: string;
  };
  level: number;
  /** Human-readable summary of who the offer is for. */
  purpose: string;
  /** Facts shown on cards and comparison tables. */
  facts: {
    /** Planned duration, or an explicit statement that it varies. */
    duration: string;
    /** Minimum off-job training commitment, where verified. */
    offJobHours?: string;
    delivery: string;
    assessment: string;
    /** Entry requirements as published — do not embellish. */
    entry: string;
  };
  /** Funding wording. Conditional by design: never a bare "fully funded". */
  fundingNote: string;
  /** Recognition wording. Kept precise about issuer and what it covers. */
  recognition?: {
    body: string;
    statement: string;
    source: string;
  };
  /**
   * Routes internal to this programme. These are emphases within one
   * occupational standard — NOT separate qualification levels.
   */
  internalPathways?: {
    name: string;
    href: string;
    emphasis: string;
  }[];
  /** Date this record was last checked against its evidence sources. */
  lastVerified: string;
  /** Keys into the audit source register that support these facts. */
  evidence: string[];
}

export const PROGRAMMES: ProgrammeFacts[] = [
  {
    id: 'apm-l4',
    officialTitle: 'Associate Project Manager Level 4 Apprenticeship',
    slug: '/associate-project-manager-level-4',
    offerType: OFFER_TYPE.apprenticeship,
    offerTypeLabel: 'Apprenticeship',
    standard: {
      code: 'ST0310',
      version: 'v1.5',
      issuingBody: 'Skills England',
    },
    level: 4,
    purpose:
      'Build practical capability to plan activities, work with stakeholders and support successful project delivery, through teaching, guided application and feedback connected to your role.',
    facts: {
      duration: 'Planned over the apprenticeship period agreed in your written offer',
      offJobHours:
        'A minimum off-job training commitment applies — confirmed in your offer',
      delivery: 'Work-based, with taught learning and applied evidence from your role',
      assessment:
        'Work-based assessment against the occupational standard. The assessment version for starts on or after 28 January 2027 must be checked before your EPA is agreed.',
      entry:
        'Suitable employment and development needs are assessed individually. Ask about the work available to develop, not only current competence.',
    },
    fundingNote:
      'Apprenticeship funding depends on your age, whether your employer is levy-paying, and the funding rules in force when you start. We confirm what applies to you before you commit.',
    lastVerified: '2026-09-27',
    evidence: ['[K04]', '[O01]', '[O03]', '[O08]'],
  },

  {
    id: 'pcp-l6',
    officialTitle: 'Project Controls Professional Level 6 Apprenticeship',
    slug: '/project-controls-professional-level-6',
    offerType: OFFER_TYPE.apprenticeship,
    offerTypeLabel: 'Apprenticeship',
    standard: {
      code: 'ST0845',
      version: 'v1.1',
      issuingBody: 'Skills England',
    },
    level: 6,
    purpose:
      'Develop the technical and leadership capability to integrate schedules, cost, risk and performance information so a project team can make and defend control decisions.',
    facts: {
      duration: 'Planned over the apprenticeship period agreed in your written offer',
      offJobHours:
        'A minimum off-job training commitment applies — confirmed in your offer',
      delivery: 'Work-based, with taught learning and applied evidence from your role',
      assessment: 'Work-based assessment against the occupational standard',
      entry:
        'Suitable employment, prior learning and development needs are assessed individually.',
    },
    fundingNote:
      'Apprenticeship funding depends on your age, whether your employer is levy-paying, and the funding rules in force when you start. We confirm what applies to you before you commit.',
    internalPathways: [
      {
        name: 'Operational',
        href: '/project-controls-professional/operational-route',
        emphasis:
          'Delivery-side control: schedule, cost and progress evidence on live projects.',
      },
      {
        name: 'Strategic',
        href: '/project-controls-professional/strategic-route',
        emphasis:
          'Programme and portfolio-level control: cross-project assurance and strategy.',
      },
      {
        name: 'Chartered',
        href: '/project-controls-professional/chartered-pmo-pathway',
        emphasis:
          'The chartered route, which involves a separate professional-body application.',
      },
    ],
    lastVerified: '2026-09-27',
    evidence: ['[K03]', '[O02]', '[O03]', '[O07]'],
  },
];

export const PROFESSIONAL_PROGRAMMES: ProgrammeFacts[] = [
  {
    id: 'pmo-l6',
    officialTitle: 'Certified PMO Professional — Level 6 professional programme',
    slug: '/pmo-pcp',
    offerType: OFFER_TYPE.professional,
    offerTypeLabel: 'Professional programme',
    level: 6,
    purpose:
      'Develop the knowledge and practical evidence to strengthen a project management office, and understand how this professional programme relates to the Chartered development pathway within Project Controls Professional Level 6.',
    facts: {
      duration: 'Published as 16 months across four modules',
      delivery:
        'Standalone professional study, or a component within the full apprenticeship — your written offer states which',
      assessment: 'Assessed separately from the full apprenticeship',
      entry:
        'Professional study entry conditions apply. This is not a separate apprenticeship and does not carry its own funding entitlement.',
    },
    fundingNote:
      'This is professional study, not an apprenticeship. Fees, bursary options and any professional-body application support are set out separately and in full in your written offer.',
    recognition: {
      body: 'Association for Project Management (APM)',
      statement:
        'APM lists KBC’s Certified PMO Professional (Level 6) as a recognised assessment for the technical-knowledge element of ChPP Pathway 2. Chartered status requires a separate application and satisfaction of APM’s remaining requirements.',
      source: '[O07]',
    },
    lastVerified: '2026-09-27',
    evidence: ['[K05]', '[O07]'],
  },
];

/** The two apprenticeships. Never mixed with professional study. */
export const APPRENTICESHIPS = PROGRAMMES.filter(
  (programme) => programme.offerType === OFFER_TYPE.apprenticeship,
);

/** Professional study. Published separately, outside the apprenticeship comparison. */
export const PROFESSIONAL_STUDY = PROFESSIONAL_PROGRAMMES.filter(
  (programme) => programme.offerType === OFFER_TYPE.professional,
);

export function programmeById(id: string): ProgrammeFacts | undefined {
  return [...PROGRAMMES, ...PROFESSIONAL_PROGRAMMES].find(
    (programme) => programme.id === id,
  );
}

export function programmesByLevel(level: number): ProgrammeFacts[] {
  return PROGRAMMES.filter((programme) => programme.level === level);
}

export const APM_L4 = programmeById('apm-l4');
export const PCP_L6 = programmeById('pcp-l6');
export const PMO_L6 = programmeById('pmo-l6');
