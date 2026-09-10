import SiteLink from '@/components/base/SiteLink';
import Footer from './Footer';
import RequestStatus from './RequestStatus';
import type { ComponentProps } from 'react';
export default function ConfirmationPage({ title, status = { mode: 'pending' } }: { title: string; status?: ComponentProps<typeof RequestStatus> }) {
  return <><main><header className="bg-primary-700 pb-12 pt-36 text-white"><div className="container-site"><h1 className="text-4xl text-white">{title}</h1></div></header>
    <section className="container-site max-w-2xl py-12"><RequestStatus {...status} /><SiteLink href="/book-a-session" className="btn-primary mt-6">Send an enquiry</SiteLink><SiteLink href="/events" className="ml-5 inline-block underline">Explore events</SiteLink></section>
  </main><Footer /></>;
}
