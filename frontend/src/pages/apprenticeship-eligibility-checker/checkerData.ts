export type AnswerValue = string;
export type CheckerAnswers = Record<string, AnswerValue>;

export interface CheckerOption {
  label: string;
  value: string;
}

export interface CheckerQuestion {
  id: string;
  type: 'radio' | 'select' | 'text' | 'textarea';
  label: string;
  helpText?: string;
  placeholder?: string;
  options?: CheckerOption[];
  required?: boolean;
}

export interface CheckerStep {
  id: string;
  title: string;
  description: string;
  questions: CheckerQuestion[];
}

const yesNo: CheckerOption[] = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }];
const yesNoUnsure: CheckerOption[] = [...yesNo, { label: 'Not sure', value: 'not_sure' }];

export const checkerSteps: CheckerStep[] = [
  {
    id: 'basic',
    title: 'Basic eligibility',
    description: 'Start with the core conditions that normally apply to an apprenticeship.',
    questions: [
      { id: 'age_16', type: 'radio', label: 'Will you be aged 16 or over when the apprenticeship starts?', options: yesNo, required: true },
      { id: 'full_time_education', type: 'radio', label: 'Are you currently in full-time education?', helpText: 'For example, attending school, college or university full time.', options: yesNo, required: true },
      { id: 'workplace_england', type: 'radio', label: 'Will your main workplace for the apprenticeship be in England?', options: yesNoUnsure, required: true },
    ],
  },
  {
    id: 'employment',
    title: 'Employment and employer',
    description: 'An apprenticeship is a paid job with structured training, so an employer is required.',
    questions: [
      { id: 'employment_situation', type: 'select', label: 'What is your current employment situation?', options: [
        { label: 'Currently employed', value: 'employed' }, { label: 'Have a job offer', value: 'job_offer' },
        { label: 'Need to find an employer', value: 'need_employer' }, { label: 'Self-employed', value: 'self_employed' },
      ], required: true },
      { id: 'employer_support', type: 'radio', label: 'Will your employer support the apprenticeship?', options: [...yesNoUnsure, { label: 'Not applicable', value: 'not_applicable' }], required: true },
      { id: 'employment_contract', type: 'radio', label: 'Will you have an employment contract for the apprenticeship period?', options: yesNoUnsure, required: true },
    ],
  },
  {
    id: 'residency',
    title: 'Residency and eligibility information',
    description: 'These answers are collected for review. The checker does not make an automatic legal or funding decision.',
    questions: [
      { id: 'residency_status', type: 'select', label: 'Which option best describes your current residency status?', options: [
        { label: 'UK or Irish citizen', value: 'citizen' }, { label: 'Settled or pre-settled status', value: 'settled' },
        { label: 'Visa or other permission', value: 'visa' }, { label: 'Another status', value: 'other' }, { label: 'Not sure', value: 'not_sure' },
      ], required: true },
      { id: 'right_to_work', type: 'radio', label: 'Do you currently have the right to work in England?', helpText: 'Your answer will still need to be confirmed during the formal review.', options: yesNoUnsure, required: true },
      { id: 'location', type: 'text', label: 'Where do you currently live and work?', placeholder: 'Town/city and country', required: true },
      { id: 'previous_learning', type: 'radio', label: 'Have you previously studied substantially similar content?', options: yesNoUnsure, required: true },
      { id: 'prior_qualifications', type: 'text', label: 'What relevant qualifications do you already hold?', placeholder: 'Enter none if not applicable', required: true },
    ],
  },
  {
    id: 'programme',
    title: 'Programme suitability',
    description: 'Tell us about your work so the result can point you towards the right admissions conversation.',
    questions: [
      { id: 'job_role', type: 'text', label: 'What is your current or proposed job role?', placeholder: 'Your job title', required: true },
      { id: 'industry', type: 'select', label: 'Which industry best describes your work?', options: [
        'Construction and infrastructure', 'Engineering and manufacturing', 'Energy and utilities', 'Public sector',
        'Technology and digital', 'Consulting and business services', 'Education', 'Other',
      ].map(label => ({ label, value: label.toLowerCase().replaceAll(' ', '_') })), required: true },
      { id: 'responsibilities', type: 'textarea', label: 'Briefly describe your project-related responsibilities.', placeholder: 'For example: planning, reporting, risk, stakeholder coordination or PMO support', required: true },
      { id: 'experience', type: 'select', label: 'How much relevant professional experience do you have?', options: [
        { label: 'Less than 1 year', value: 'under_1' }, { label: '1–3 years', value: '1_3' },
        { label: '4–7 years', value: '4_7' }, { label: '8+ years', value: '8_plus' }, { label: 'Not sure how to classify it', value: 'not_sure' },
      ], required: true },
      { id: 'interest_area', type: 'select', label: 'Which area are you most interested in?', options: [
        { label: 'Associate Project Manager Level 4', value: 'apm_level_4' }, { label: 'Project Controls Professional Level 6', value: 'pcp_level_6' },
        { label: 'Certified PMO Professional Level 6', value: 'pmo_level_6' }, { label: 'Not sure yet', value: 'not_sure' },
      ], required: true },
    ],
  },
];

export const checkerFaqs = [
  ['What is the eligibility checker?', 'It is a short guided assessment that provides an initial indication of whether an apprenticeship discussion may be suitable.'],
  ['Is this a final decision?', 'No. Final eligibility is confirmed by Kent Business College after reviewing your circumstances and the rules that apply at enrolment.'],
  ['How long does it take?', 'Most people can complete the checker in less than five minutes.'],
  ['Do I need an employer?', 'Yes. An apprenticeship is a paid job with structured training, so you need an employer and suitable employment arrangements.'],
  ['What happens after completing the checker?', 'You will see an initial indication and recommended next steps. You can then request a consultation or contact admissions.'],
  ['Can I complete it if I am unsure about funding?', 'Yes. The checker is designed to identify questions that may need further review; it does not require you to know your funding position.'],
] as const;
