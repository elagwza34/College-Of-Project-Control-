import type { CheckerAnswers,CheckerStep } from './checkerData';

export type EligibilityStatus = 'likely' | 'review' | 'not_suitable';

export interface EligibilityResult {
  status: EligibilityStatus;
  label: string;
  message: string;
  factors: string[];
  nextStep: string;
}

export function validateStep(step: CheckerStep, answers: CheckerAnswers) {
  return step.questions.filter(question => question.required && !answers[question.id]?.trim()).map(question => question.id);
}

export function calculateEligibility(answers: CheckerAnswers): EligibilityResult {
  const blockers: string[] = [];
  if (answers.age_16 === 'no') blockers.push('The minimum age condition may not be met.');
  if (answers.full_time_education === 'yes') blockers.push('Full-time education may conflict with the apprenticeship route.');
  if (answers.workplace_england === 'no') blockers.push('The main workplace is not expected to be in England.');
  if (['need_employer', 'self_employed'].includes(answers.employment_situation)) blockers.push('A supported employed role is not currently in place.');
  if (answers.employer_support === 'no' || answers.employer_support === 'not_applicable') blockers.push('Employer support is not currently confirmed.');
  if (answers.employment_contract === 'no') blockers.push('An appropriate employment contract is not currently expected.');
  if (answers.right_to_work === 'no') blockers.push('The stated right-to-work position requires a different route or further advice.');

  if (blockers.length) return {
    status: 'not_suitable', label: 'Not currently suitable',
    message: 'Based on your answers, this apprenticeship route may not currently be suitable.',
    factors: blockers, nextStep: 'Speak with our team about what would need to change or whether a commercial professional-development route may be more appropriate.',
  };

  const reviews: string[] = [];
  if (answers.workplace_england === 'not_sure') reviews.push('Main workplace location needs confirmation.');
  if (answers.employer_support === 'not_sure') reviews.push('Employer support needs confirmation.');
  if (answers.employment_contract === 'not_sure') reviews.push('Employment-contract arrangements need confirmation.');
  if (['not_sure', 'other', 'visa'].includes(answers.residency_status)) reviews.push('Residency information needs an individual review.');
  if (answers.right_to_work === 'not_sure') reviews.push('Right-to-work information needs confirmation.');
  if (answers.previous_learning !== 'no') reviews.push('Previous learning needs to be compared with the programme.');
  if (answers.interest_area === 'not_sure') reviews.push('The most suitable programme still needs to be identified.');

  if (reviews.length) return {
    status: 'review', label: 'Needs further review',
    message: 'We need more information before confirming whether this route is suitable.',
    factors: reviews, nextStep: 'Request a consultation so admissions can review the points above with you.',
  };

  return {
    status: 'likely', label: 'Likely suitable for review',
    message: 'Your answers suggest you may be suitable for an apprenticeship route. The next step is to discuss your circumstances with our team.',
    factors: ['Core age and education indicators appear suitable.', 'An employed role and employer support appear to be in place.', 'Your workplace and right-to-work answers support an admissions review.', 'You have provided role and programme information for the next conversation.'],
    nextStep: 'Request a consultation to confirm programme fit, funding conditions and formal eligibility.',
  };
}
