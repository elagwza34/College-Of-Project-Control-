import type { ArticleLayoutProps } from '../ArticleLayout';

type Props = Required<Pick<ArticleLayoutProps, 'quickSummary'>>;

export default function QuickSummary({ quickSummary }: Props) {
  return (<section className="py-8 md:py-10 bg-background-50">
          <div className="container-site max-w-3xl">
            <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6">
              <p className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-600 mb-3">Quick Summary</p>
              <ul className="space-y-2">
                {quickSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground-700">
                    <i className="ri-checkbox-circle-fill text-primary-500 mt-0.5 flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>);
}
