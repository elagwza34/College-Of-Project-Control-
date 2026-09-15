import SiteLink from '@/components/base/SiteLink';
import type * as React from 'react';

/** Section: Article status (loading, unavailable, or not found). */
interface ArticleStatusProps {
  status: "loading" | "ready" | "missing" | "error";
  setRevision: React.Dispatch<React.SetStateAction<number>>;
}

export default function ArticleStatus({ status, setRevision }: ArticleStatusProps) {
  return (
    <section className="bg-primary-950 pb-20 pt-36 text-white"><div className="container-site"><h1 className="text-3xl font-bold text-white">{status === 'loading' ? 'Loading article…' : status === 'missing' ? 'Article not found' : 'Unable to load this article'}</h1><p className="mt-4" role={status === 'error' ? 'alert' : 'status'}>{status === 'missing' ? 'This article may be unpublished or the link may have changed.' : status === 'error' ? 'Please try again in a moment.' : 'Fetching the latest content.'}</p>{status === 'error' && <button onClick={() => setRevision(v => v + 1)} className="btn-primary mt-6 px-5 py-3">Try again</button>}<SiteLink href="/articles" className="mt-6 inline-flex text-signal-300 underline">Browse all articles</SiteLink></div></section>
  );
}
