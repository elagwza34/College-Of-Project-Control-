import SiteLink from '@/components/base/SiteLink';
import { useState } from 'react';

const questions = [
  'Are you currently in paid employment in England?',
  'Is your employer based in England and able to support the funded route?',
  'Does your role include relevant project, programme, PMO or controls responsibilities?',
  'Can your employer support the required paid learning time and workplace evidence?',
  'Do you appear to meet the residency and right-to-work requirements?',
  'Are you free from conflicting government-funded training at the same time?',
];

type Answer = 'yes' | 'no' | 'unsure' | null;

function getResult(answers: Answer[]) {
  const answered = answers.filter(Boolean).length;
  if (answered < questions.length) {
    return {
      title: `${answered} of ${questions.length} answered`,
      copy: 'Complete all questions to receive initial access-route guidance.',
      tone: 'neutral',
    };
  }
  const yes = answers.filter((answer) => answer === 'yes').length;
  const no = answers.filter((answer) => answer === 'no').length;
  if (yes >= 5 && no === 0) {
    return {
      title: 'The DfE Funded Route may be suitable.',
      copy: 'Your answers match several initial indicators. A full assessment is still required before funding can be confirmed.',
      tone: 'good',
    };
  }
  if (yes >= 3) {
    return {
      title: 'An adviser review is recommended.',
      copy: 'Some indicators support the Funded Route, while others may require clarification. The IPC Bursary Route can also be considered.',
      tone: 'review',
    };
  }
  return {
    title: 'The IPC Bursary Route may be more suitable.',
    copy: 'Your answers suggest the DfE route may be difficult to access. IPC bursary support and flexible instalments may provide an alternative, subject to approval.',
    tone: 'bursary',
  };
}

export default function QuickAccessRouteCheck() {
  const [answers, setAnswers] = useState<Answer[]>(questions.map(() => null));
  const result = getResult(answers);
  const progress = (answers.filter(Boolean).length / questions.length) * 100;

  const setAnswer = (index: number, answer: Exclude<Answer, null>) => {
    setAnswers((current) => current.map((value, itemIndex) => itemIndex === index ? answer : value));
  };

  return (
    <section id="eligibility" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">Quick access-route check</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
            Which route may be more suitable for you?
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground-600">
            This tool provides initial guidance only. Formal eligibility, funding, prior-learning, employer and bursary decisions are completed by the College and relevant partners.
          </p>

          <div className="mt-8 grid gap-4">
            {questions.map((question, index) => (
              <fieldset key={question} className="rounded-lg border border-background-200 bg-white p-4 shadow-sm">
                <legend className="text-sm font-bold text-foreground-950">{index + 1}. {question}</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(['yes', 'no', 'unsure'] as const).map((answer) => {
                    const active = answers[index] === answer;
                    return (
                      <button
                        key={answer}
                        type="button"
                        onClick={() => setAnswer(index, answer)}
                        className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                          active
                            ? 'border-primary-950 bg-primary-950 text-white'
                            : 'border-background-300 bg-white text-foreground-700 hover:border-primary-300'
                        }`}
                      >
                        {answer === 'yes' ? 'Yes' : answer === 'no' ? 'No' : 'Not sure'}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-lg border border-background-200 bg-white p-6 shadow-card">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-accent-700">Initial guidance</p>
            <h3 className="mt-4 text-2xl font-bold leading-tight text-foreground-950">{result.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-600">{result.copy}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-background-100">
              <div
                className={`h-full rounded-full transition-all ${result.tone === 'good' ? 'bg-green-500' : result.tone === 'review' ? 'bg-signal-400' : result.tone === 'bursary' ? 'bg-accent-600' : 'bg-primary-700'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-6 grid gap-3 text-sm leading-relaxed text-foreground-600">
              <p><strong className="text-foreground-950">Funded Route:</strong> Department for Education, subject to full assessment.</p>
              <p><strong className="text-foreground-950">IPC Bursary Route:</strong> support where DfE funding is unavailable.</p>
              <p><strong className="text-foreground-950">Places:</strong> limited and reviewed on a first-come, first-served basis.</p>
            </div>
            <div className="mt-6 grid gap-3">
              <SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold">
                Book an eligibility conversation
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
              <SiteLink href="#access" className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary-300 px-5 text-sm font-bold text-primary-950">
                Review both access routes
              </SiteLink>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
