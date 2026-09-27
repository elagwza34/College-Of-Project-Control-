import { useMemo, useState } from 'react';

type PathwayKey = 'operational' | 'strategic' | 'chartered' | 'pmo';

const pathways: Record<PathwayKey, {
  title: string;
  target: number;
  hint: string;
  core: [string, number, string][];
  electives: [string, number][];
  maxElectives: number;
}> = {
  operational: {
    title: 'Operational Pathway',
    target: 6,
    hint: 'Core credits are fixed. Choose three specialist options.',
    core: [
      ['PMP preparation and professional development', 2, 'Project management foundation and applied practice'],
      ['AI in Project Controls Certificate', 1, 'Responsible AI-enabled controls practice'],
    ],
    electives: [
      ['PMI Scheduling Professional (PMI-SP)', 1],
      ['Earned Value Management (EVM)', 1],
      ['Risk Management', 1],
      ['Project Planning & Control (PPC)', 1],
    ],
    maxElectives: 3,
  },
  strategic: {
    title: 'Strategic Pathway',
    target: 6,
    hint: 'Core credits are fixed. Choose three specialist options.',
    core: [
      ['PMP preparation and professional development', 2, 'Strategic project leadership foundation'],
      ['AI in Project Controls Certificate', 1, 'Decision support and controls intelligence'],
    ],
    electives: [
      ['Managing Successful Programmes (MSP)', 1],
      ['Managing Portfolios', 1],
      ['Risk Management', 1],
      ['Project Management Office (PMO)', 1],
    ],
    maxElectives: 3,
  },
  chartered: {
    title: 'Chartered Pathway',
    target: 6,
    hint: 'Core credits are fixed. Choose one specialist option.',
    core: [
      ['Certified PMO Professional Level 6', 4, 'PMO governance and professional evidence'],
      ['AI in Project Controls Certificate', 1, 'Responsible AI-enabled controls practice'],
    ],
    electives: [
      ['Portfolio Management', 1],
      ['Earned Value Management', 1],
    ],
    maxElectives: 1,
  },
  pmo: {
    title: 'PMO Certified',
    target: 4,
    hint: 'A fixed four-credit route with no elective selection.',
    core: [['Certified PMO Professional Level 6', 4, 'PMO governance and operating-model capability']],
    electives: [],
    maxElectives: 0,
  },
};

export default function InteractivePathwayBuilder() {
  const [pathway, setPathway] = useState<PathwayKey>('operational');
  const [selected, setSelected] = useState<number[]>([]);
  const data = pathways[pathway];
  const coreCredits = data.core.reduce((sum, [, credits]) => sum + credits, 0);
  const electiveCredits = selected.reduce((sum, index) => sum + (data.electives[index]?.[1] ?? 0), 0);
  const total = coreCredits + electiveCredits;
  const progress = Math.min(100, (total / data.target) * 100);
  const remaining = Math.max(0, data.maxElectives - selected.length);
  const ready = total === data.target;

  const options = useMemo(() => Object.entries(pathways) as [PathwayKey, typeof data][], []);

  const changePathway = (next: PathwayKey) => {
    setPathway(next);
    setSelected([]);
  };

  const toggleElective = (index: number) => {
    setSelected((current) => {
      if (current.includes(index)) return current.filter((item) => item !== index);
      if (current.length >= data.maxElectives) return current;
      return [...current, index];
    });
  };

  return (
    <section id="builder" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.55fr)] xl:gap-10">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">Interactive pathway builder</span>
          <h2 className="mt-5 max-w-md text-4xl font-extrabold leading-[1.05] text-foreground-950 md:text-5xl">
            Build the credit mix around your responsibilities.
          </h2>
          <span className="mt-7 block h-2 w-2 rounded-full bg-foreground-950" aria-hidden="true" />
          <p className="mt-8 max-w-sm text-base leading-relaxed text-foreground-600">
            Select a pathway and choose the specialist options that best match the work you perform. The tool is illustrative; the final sequence is confirmed after role, employer, prior-learning and funding review.
          </p>
          <label className="mt-7 block">
            <span className="text-sm font-bold text-foreground-800">Pathway</span>
            <select
              value={pathway}
              onChange={(event) => changePathway(event.target.value as PathwayKey)}
              className="mt-2 w-full rounded-lg border border-signal-400 bg-white p-4 text-sm font-bold text-foreground-950 shadow-[0_0_0_4px_rgba(255,169,83,.18)] outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-300"
            >
              {options.map(([key, option]) => <option key={key} value={key}>{option.title}</option>)}
            </select>
          </label>
        </div>

        <div className="rounded-lg border border-background-200 bg-background-50 p-5 shadow-sm md:p-7 lg:p-8">
          <div className="grid gap-5 border-b border-background-200 pb-6 md:grid-cols-[minmax(0,1fr)_180px] md:items-start">
            <div className="relative pl-7">
              <span className="absolute left-0 top-2 h-px w-4 bg-signal-400" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[.14em] text-accent-700">{data.title}</p>
              <h3 className="mt-3 max-w-xl text-2xl font-extrabold leading-tight text-foreground-950 md:text-[1.65rem]">
                {data.hint}
              </h3>
            </div>
            <div className="rounded-lg bg-primary-950 p-5 text-white md:min-h-[122px]">
              <p className="text-4xl font-extrabold leading-none text-signal-300">
                {total} <span className="text-lg text-white">/ {data.target}</span>
              </p>
              <p className="mt-3 text-xs font-bold uppercase leading-relaxed tracking-[.16em] text-white/70">
                Credits selected
              </p>
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-signal-400 transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[.18em] text-foreground-500">Mandatory core</h4>
              <div className="mt-3 grid gap-3">
                {data.core.map(([name, credits, detail]) => (
                  <div key={name} className="rounded-lg border border-background-200 bg-white p-4 shadow-[0_1px_0_rgba(5,27,35,.03)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-foreground-950">{name}</h5>
                        <p className="mt-1 text-sm text-foreground-600">{detail}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-800">{credits} credit{credits > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[.18em] text-foreground-500">Choose specialist options</h4>
              <div className="mt-3 grid gap-3">
                {data.electives.length === 0 ? (
                  <div className="rounded-lg border border-background-200 bg-white p-4 text-sm text-foreground-600">No elective selection is required for this route.</div>
                ) : data.electives.map(([name, credits], index) => {
                  const active = selected.includes(index);
                  const disabled = !active && selected.length >= data.maxElectives;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => toggleElective(index)}
                      disabled={disabled}
                      className={`rounded-lg border p-4 text-left shadow-[0_1px_0_rgba(5,27,35,.03)] transition ${
                        active
                          ? 'border-primary-700 bg-primary-950 text-white'
                          : disabled
                            ? 'border-background-200 bg-background-100 text-foreground-400'
                            : 'border-background-200 bg-white text-foreground-900 hover:border-primary-300'
                      }`}
                    >
                      <span className="flex items-start justify-between gap-4">
                        <span className="font-bold">{name}</span>
                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${active ? 'bg-signal-400 text-primary-950' : 'bg-background-100 text-foreground-700'}`}>
                          {credits} credit
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`mt-6 rounded-lg p-5 ${ready ? 'bg-green-50 text-green-950' : 'bg-white text-foreground-800'}`}>
            <p className="font-bold">
              {ready ? `Your ${data.title} reaches ${data.target} credits.` : `${remaining} specialist selection${remaining === 1 ? '' : 's'} remaining.`}
            </p>
            <p className="mt-2 text-sm leading-relaxed opacity-80">
              {ready
                ? 'Use this selection as the starting point for your role, employer, funding and evidence conversation.'
                : `Choose options until the selected credits reach ${data.target}.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
