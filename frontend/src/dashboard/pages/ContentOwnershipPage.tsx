import { Link } from 'react-router-dom';
const resources = [
 ['Articles', 'articles', 'Searchable /articles library, individual article pages and the reusable article carousel'],
 ['IPC images', 'ipc-images', 'Moving image strip below the IPC logo on all programme-access sections'],
 ['Mentors', 'mentors', 'Mentor cards and individual public profiles'],
 ['Coaching and support', 'coaches', 'Coach profiles in the shared support section'],
 ['Partners', 'partners', 'Approved partner logos on the home page'],
 ['Sectors', 'sectors', 'Home/PCP sector cards and sector-page photography'],
 ['Professional credentials', 'professional-credentials', 'Shared professional recognition section'],
 ['Events', 'events', 'Public event listing'],
 ['Media', 'media', 'Assets referenced by the CMS-managed records above'],
];
export default function ContentOwnershipPage() {
 return <div><h1 className="text-3xl">Content ownership</h1><p className="mt-4 max-w-3xl">The public site combines code-managed programme information with the CMS-managed collections listed below. Each has a single editing source.</p>
 <h2 className="mt-8 text-2xl">Managed in this dashboard</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{resources.map(([name, path, scope]) => <Link key={path} to={`/dashboard/${path}`} className="card-premium p-5"><h3 className="text-lg">{name}</h3><p className="mt-2 text-sm text-foreground-600">{scope}</p></Link>)}</div>
 <h2 className="mt-8 text-2xl">Managed in application code</h2><p className="mt-4 max-w-3xl">All other blocks: page layouts, programme facts, pathway and campaign copy, navigation, general page SEO, FAQs, funding explanations, legacy Knowledge Hub content, example scenarios, and legal notices. Ask the website maintainer to update these. Publishing legacy page or navigation records does not update this application, so those editing controls are no longer exposed here.</p>
 <p className="mt-5 max-w-3xl">Before activating partner or credential records, confirm the description, permission to display the image, and the relationship or recognition being described. A displayed logo must not imply an unapproved endorsement or guaranteed award.</p></div>;
}
