import type { ReactNode } from 'react';

interface DashboardPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  meta?: ReactNode;
}

export function DashboardPageHeader({ eyebrow, title, description, actions, meta }: DashboardPageHeaderProps) {
  return (
    <header className="mb-6 border-b border-background-200/80 pb-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[.16em] text-primary-700">{eyebrow}</p>}
          <h1 className="mt-2 font-heading text-2xl font-bold leading-tight text-foreground-950 md:text-3xl">{title}</h1>
          {description && <p className="mt-2 text-sm leading-relaxed text-foreground-600">{description}</p>}
          {meta && <div className="mt-4">{meta}</div>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
      </div>
    </header>
  );
}

interface DashboardAlertProps {
  tone?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
}

const alertStyles = {
  info: 'border-primary-200 bg-primary-50 text-primary-900',
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-950',
  error: 'border-red-200 bg-red-50 text-red-900',
};

const alertIcons = {
  info: 'ri-information-line',
  success: 'ri-checkbox-circle-line',
  warning: 'ri-alert-line',
  error: 'ri-error-warning-line',
};

export function DashboardAlert({ tone = 'info', title, children, onDismiss }: DashboardAlertProps) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded-xl border p-4 shadow-sm ${alertStyles[tone]}`}>
      <div className="flex items-start gap-3">
        <i className={`${alertIcons[tone]} mt-0.5 text-lg`} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          {title && <p className="font-semibold">{title}</p>}
          <div className={`${title ? 'mt-1' : ''} text-sm leading-relaxed`}>{children}</div>
        </div>
        {onDismiss && (
          <button type="button" onClick={onDismiss} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-white/60" aria-label="Dismiss message">
            <i className="ri-close-line text-lg" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

interface DashboardEmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function DashboardEmptyState({ icon = 'ri-inbox-line', title, description, action }: DashboardEmptyStateProps) {
  return (
    <section className="rounded-xl border border-dashed border-background-300 bg-white p-8 text-center shadow-sm">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
        <i className={`${icon} text-2xl`} aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-xl font-bold text-foreground-950">{title}</h2>
      {description && <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-foreground-600">{description}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </section>
  );
}

export function DashboardSkeletonList({ rows = 4 }: { rows?: number }) {
  return (
    <div role="status" aria-label="Loading content" className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border border-background-200 bg-white p-5">
          <div className="relative h-4 w-2/5 overflow-hidden rounded bg-background-200">
            <span className="skeleton-shimmer" />
          </div>
          <div className="relative mt-4 h-3 w-4/5 overflow-hidden rounded bg-background-100">
            <span className="skeleton-shimmer" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}

interface StatusBadgeProps {
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
}

const badgeStyles = {
  neutral: 'bg-background-100 text-foreground-700 ring-background-200',
  success: 'bg-green-50 text-green-800 ring-green-200',
  warning: 'bg-amber-50 text-amber-900 ring-amber-200',
  error: 'bg-red-50 text-red-800 ring-red-200',
  info: 'bg-primary-50 text-primary-800 ring-primary-200',
};

export function StatusBadge({ tone = 'neutral', children }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${badgeStyles[tone]}`}>
      {children}
    </span>
  );
}
