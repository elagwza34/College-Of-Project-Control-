import SiteLink from '@/components/base/SiteLink';
import type * as React from 'react';

/** Section: Mentor profile. */
interface MentorProfileProps {
  setAttempt: React.Dispatch<React.SetStateAction<number>>;
}

export default function MentorProfile({ setAttempt }: MentorProfileProps) {
  return (
    <main className="container-site flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-highlight-700">Mentor profile</p>
          <h1 className="mt-3 text-3xl font-bold text-foreground-950">This mentor profile is not available</h1>
          <button type="button" className="btn-primary mt-6" onClick={() => setAttempt(value => value + 1)}>Retry profile</button>
          <SiteLink href="/" className="mt-6 text-sm font-bold text-primary-700 hover:text-primary-900">Return to the homepage</SiteLink>
        </main>
  );
}
