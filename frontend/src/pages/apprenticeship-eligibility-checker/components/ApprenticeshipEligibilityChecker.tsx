import SiteLink from '@/components/base/SiteLink';
import { useEffect,useId,useState } from 'react';
import { checkerSteps,type CheckerAnswers,type CheckerQuestion } from '../checkerData';
import { calculateEligibility,validateStep,type EligibilityResult,type EligibilityStatus } from '../eligibilityEngine';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer) window.dataLayer.push(payload);
}

const stepIcons: Record<string, string> = {
  basic: 'ri-user-line',
  employment: 'ri-briefcase-line',
  residency: 'ri-map-pin-line',
  programme: 'ri-graduation-cap-line',
};

const resultPresentation: Record<EligibilityStatus, {
  icon: string;
  border: string;
  bg: string;
  iconBg: string;
  iconColor: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}> = {
  likely: {
    icon: 'ri-checkbox-circle-line',
    border: 'border-highlight-300',
    bg: 'bg-highlight-50',
    iconBg: 'bg-highlight-500',
    iconColor: 'text-white',
    primaryCta: { label: 'Request a consultation', href: '/book-a-session' },
    secondaryCta: { label: 'Contact Admissions', href: '/contact' },
  },
  review: {
    icon: 'ri-search-eye-line',
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-500',
    iconColor: 'text-white',
    primaryCta: { label: 'Request a consultation', href: '/book-a-session' },
    secondaryCta: { label: 'Contact Admissions', href: '/contact' },
  },
  not_suitable: {
    icon: 'ri-information-line',
    border: 'border-background-300',
    bg: 'bg-background-100',
    iconBg: 'bg-foreground-500',
    iconColor: 'text-white',
    primaryCta: { label: 'Speak With Our Team', href: '/contact' },
    secondaryCta: { label: 'Explore the Commercial Route', href: '/commercial-project-controls-route' },
  },
};

function QuestionField({
  question,
  value,
  hasError,
  onChange,
}: {
  question: CheckerQuestion;
  value: string | undefined;
  hasError: boolean;
  onChange: (value: string) => void;
}) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const helpId = question.helpText ? `${fieldId}-help` : undefined;

  const labelNode = (
    <span className="mb-1 block text-sm font-semibold text-foreground-900">
      {question.label}
      {question.required && <span className="ml-0.5 text-primary-500" aria-hidden="true">*</span>}
    </span>
  );
  const helpNode = question.helpText && (
    <p id={helpId} className="mb-2 text-xs text-foreground-600">{question.helpText}</p>
  );
  const errorNode = hasError && (
    <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      This question needs an answer before you continue.
    </p>
  );

  if (question.type === 'radio') {
    return (
      <fieldset className="mb-6">
        <legend className="mb-1 text-sm font-semibold text-foreground-900">
          {question.label}
          {question.required && <span className="ml-0.5 text-primary-500" aria-hidden="true">*</span>}
        </legend>
        {helpNode}
        <div className={`grid gap-3 ${(question.options?.length ?? 0) > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`} aria-describedby={errorNode ? errorId : helpId}>
          {question.options?.map((opt) => {
            const checked = value === opt.value;
            return (
              <label
                key={opt.value}
                className={`relative flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-400 has-[:focus-visible]:ring-offset-1 ${
                  checked
                    ? 'border-primary-500 bg-primary-50 text-primary-800'
                    : 'border-background-200/70 bg-background-50 text-foreground-800 hover:border-primary-200'
                }`}
              >
                <input type="radio" required={question.required} aria-invalid={hasError} aria-describedby={hasError ? errorId : helpId} name={question.id} value={opt.value} checked={checked} onChange={() => onChange(opt.value)} className="sr-only" />
                <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${checked ? 'border-primary-500 bg-primary-500' : 'border-background-300'}`}>
                  {checked && <i className="ri-check-line text-xs text-white" aria-hidden="true" />}
                </span>
                {opt.label}
              </label>
            );
          })}
        </div>
        {errorNode}
      </fieldset>
    );
  }

  const fieldClasses = `w-full rounded-md border px-3 py-2.5 text-sm bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none transition-colors ${
    hasError ? 'border-red-400 focus:border-red-500' : 'border-background-200/70 focus:border-primary-400'
  }`;

  return (
    <div className="mb-6">
      <label htmlFor={fieldId}>{labelNode}</label>
      {helpNode}
      {question.type === 'select' && (
        <select id={fieldId} required={question.required} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={fieldClasses} aria-describedby={errorNode ? errorId : helpId} aria-invalid={hasError}>
          <option value="">Select an option</option>
          {question.options?.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      )}
      {question.type === 'text' && (
        <input id={fieldId} required={question.required} type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={question.placeholder} className={fieldClasses} aria-describedby={errorNode ? errorId : helpId} aria-invalid={hasError} />
      )}
      {question.type === 'textarea' && (
        <textarea id={fieldId} required={question.required} rows={3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={question.placeholder} className={`${fieldClasses} resize-none`} aria-describedby={errorNode ? errorId : helpId} aria-invalid={hasError} />
      )}
      {errorNode}
    </div>
  );
}

export default function ApprenticeshipEligibilityChecker() {
  const [phase, setPhase] = useState<'intro' | 'question' | 'result'>('intro');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<CheckerAnswers>({});
  const [errorFields, setErrorFields] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<EligibilityResult | null>(null);

  useEffect(() => {
    if (phase === 'intro') return;
    const target = document.querySelector<HTMLElement>('#checker h3');
    target?.setAttribute('tabindex', '-1'); target?.focus({ preventScroll: true });
  }, [phase, stepIndex]);
  useEffect(() => {
    if (errorFields.size) document.querySelector<HTMLElement>('#checker [aria-invalid="true"]')?.focus();
  }, [errorFields]);
  const totalSteps = checkerSteps.length;
  const currentStep = checkerSteps[stepIndex];

  const handleStart = () => {
    setPhase('question');
    pushDataLayer({ event: 'eligibility_checker_start' });
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (errorFields.has(questionId)) {
      setErrorFields((prev) => {
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
    }
  };

  const handleNext = () => {
    const missing = validateStep(currentStep, answers);
    if (missing.length) {
      setErrorFields(new Set(missing));
      return;
    }
    pushDataLayer({ event: 'eligibility_checker_step_completed', step: currentStep.id });

    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => i + 1);
      setErrorFields(new Set());
    } else {
      const outcome = calculateEligibility(answers);
      setResult(outcome);
      setPhase('result');
      pushDataLayer({ event: 'eligibility_checker_completed', result_status: outcome.status });
    }
  };

  const handleBack = () => {
    setErrorFields(new Set());
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const handleRestart = () => {
    setPhase('intro');
    setStepIndex(0);
    setAnswers({});
    setErrorFields(new Set());
    setResult(null);
  };

  return (
    <div id="checker" className="min-w-0 scroll-mt-28 rounded-2xl bg-background-50 p-4 shadow-sm md:p-6" role="region" aria-labelledby="checker-heading">
      <div className="mx-auto w-full max-w-2xl">
        <h2 id="checker-heading" className="sr-only">Apprenticeship eligibility checker</h2>

        {phase === 'intro' && (
          <div className="rounded-2xl border border-background-200/70 bg-white p-8 text-center md:p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-highlight-100">
              <i className="ri-clipboard-line text-2xl text-highlight-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground-950 md:text-2xl">Ready to begin?</h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-foreground-600">
              You will answer {totalSteps} short groups of questions about your circumstances, employment and interests. Your answers are kept as you move between steps.
            </p>
            <button
              onClick={handleStart}
              className="btn-primary mt-7 inline-flex min-h-12 items-center justify-center px-8 text-sm font-semibold transition-colors"
            >
              Start Check
              <i className="ri-arrow-right-line ml-2" aria-hidden="true" />
            </button>
          </div>
        )}

        {phase === 'question' && currentStep && (
          <div>
            {/* Progress indicator */}
            <div className="mb-8 flex items-center justify-center gap-1" role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={stepIndex + 1} aria-label="Checker progress">
              {checkerSteps.map((step, i) => (
                <div key={step.id} className="flex items-center gap-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                      i < stepIndex
                        ? 'bg-highlight-500 text-secondary-950'
                        : i === stepIndex
                          ? 'bg-primary-500 text-white ring-2 ring-primary-200'
                          : 'bg-background-200/60 text-foreground-400'
                    }`}
                  >
                    {i < stepIndex ? <i className="ri-check-line text-sm" aria-hidden="true" /> : i + 1}
                  </div>
                  {i < totalSteps - 1 && <div className={`h-px w-6 md:w-10 ${i < stepIndex ? 'bg-highlight-400' : 'bg-background-200/60'}`} />}
                </div>
              ))}
            </div>
            <p className="mb-6 text-center text-xs font-label font-semibold uppercase tracking-wider text-foreground-400">
              Step {stepIndex + 1} of {totalSteps} — {currentStep.title}
            </p>

            <div className="rounded-2xl border border-background-200/70 bg-white p-6 md:p-8">
              <div className="mb-6 flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-highlight-100">
                  <i className={`${stepIcons[currentStep.id] ?? 'ri-question-line'} text-lg text-highlight-600`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground-950">{currentStep.title}</h3>
                  <p className="mt-1 text-sm text-foreground-600">{currentStep.description}</p>
                </div>
              </div>

              {currentStep.questions.map((question) => (
                <QuestionField
                  key={question.id}
                  question={question}
                  value={answers[question.id]}
                  hasError={errorFields.has(question.id)}
                  onChange={(value) => handleAnswer(question.id, value)}
                />
              ))}

              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-foreground-600 transition-colors hover:text-foreground-700 disabled:pointer-events-none disabled:opacity-0"
                >
                  <i className="ri-arrow-left-line" aria-hidden="true" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold transition-colors"
                >
                  {stepIndex === totalSteps - 1 ? 'See My Result' : 'Next'}
                  <i className="ri-arrow-right-line ml-2" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-5 text-center">
              <button onClick={handleRestart} className="inline-flex items-center gap-1 text-xs text-foreground-400 transition-colors hover:text-foreground-600">
                <i className="ri-refresh-line text-xs" aria-hidden="true" />
                Start again
              </button>
            </div>
          </div>
        )}

        {phase === 'result' && result && (
          <div>
            <p className="mb-4 text-center text-xs font-label font-semibold uppercase tracking-wider text-foreground-400">Your Result</p>
            <div className={`rounded-2xl border-2 p-6 md:p-8 ${resultPresentation[result.status].border} ${resultPresentation[result.status].bg}`}>
              <div className="flex items-start gap-4">
                <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${resultPresentation[result.status].iconBg}`}>
                  <i className={`${resultPresentation[result.status].icon} text-2xl ${resultPresentation[result.status].iconColor}`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground-950">{result.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-700">{result.message}</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-background-200/70 bg-white/70 p-4">
                <p className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-600">Factors considered</p>
                <ul className="mt-2 space-y-1.5">
                  {result.factors.map((factor) => (
                    <li key={factor} className="flex items-start gap-2 text-sm text-foreground-700">
                      <i className="ri-corner-down-right-line mt-0.5 flex-shrink-0 text-xs text-foreground-400" aria-hidden="true" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-sm font-medium text-foreground-800">{result.nextStep}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <SiteLink href={resultPresentation[result.status].primaryCta.href} className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold transition-colors">
                  {resultPresentation[result.status].primaryCta.label}
                  <i className="ri-arrow-right-line ml-2" aria-hidden="true" />
                </SiteLink>
                <SiteLink href={resultPresentation[result.status].secondaryCta.href} className="cta-button inline-flex min-h-12 items-center justify-center rounded-md border border-primary-300 px-6 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50">
                  {resultPresentation[result.status].secondaryCta.label}
                </SiteLink>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-lg text-center text-xs leading-relaxed text-foreground-600">
              <strong className="text-foreground-700">Initial indication only:</strong> your result is based on your answers and is subject to final confirmation. Final eligibility is confirmed by Kent Business College after reviewing your circumstances.
            </p>

            <div className="mt-5 text-center">
              <button onClick={handleRestart} className="inline-flex items-center gap-1 text-sm text-foreground-600 transition-colors hover:text-foreground-700">
                <i className="ri-refresh-line text-xs" aria-hidden="true" />
                Not quite right? Start again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
