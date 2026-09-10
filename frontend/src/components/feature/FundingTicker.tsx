import SiteLink from '@/components/base/SiteLink';
export default function FundingTicker() {
  return <div className="flex h-10 items-center justify-center bg-signal-500 px-4 text-center text-xs font-semibold text-primary-950">
    <SiteLink href="/apprenticeship-eligibility-checker" className="underline underline-offset-2">Apprenticeship funding is subject to eligibility</SiteLink>
  </div>;
}
