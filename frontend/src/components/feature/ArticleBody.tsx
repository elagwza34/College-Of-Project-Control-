import SiteLink from '@/components/base/SiteLink';

function inline(text: string) {
  return text.split(/(\[[^\]]+\]\([^\s)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    return match ? <SiteLink key={index} href={match[2]} className="font-semibold text-primary-700 underline underline-offset-4">{match[1]}</SiteLink> : part;
  });
}

// Content is rendered as React text, never as executable HTML.
export default function ArticleBody({ content }: { content: string }) {
  return <div className="space-y-6 text-base leading-8 text-foreground-700">{content.split(/\n\s*\n/).filter(Boolean).map((block, index) => {
    const text = block.trim();
    if (text.startsWith('### ')) return <h3 key={index} className="pt-4 text-xl font-bold text-foreground-950">{inline(text.slice(4))}</h3>;
    if (text.startsWith('## ')) return <h2 key={index} className="pt-6 text-2xl font-bold text-foreground-950">{inline(text.slice(3))}</h2>;
    if (text.split('\n').every(line => line.startsWith('- '))) return <ul key={index} className="list-disc space-y-2 pl-6">{text.split('\n').map((line, i) => <li key={i}>{inline(line.slice(2))}</li>)}</ul>;
    const rows = text.split('\n');
    if (rows.length > 1 && rows.every(row => row.startsWith('|')) && /^\|[\s|:-]+\|$/.test(rows[1])) {
      const cells = (row: string) => row.replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
      return <div key={index} className="overflow-x-auto"><table className="w-full border-collapse text-left text-sm"><thead><tr>{cells(rows[0]).map((cell, i) => <th scope="col" key={i} className="border border-background-300 bg-primary-50 p-3">{inline(cell)}</th>)}</tr></thead><tbody>{rows.slice(2).map((row, i) => <tr key={i}>{cells(row).map((cell, j) => <td key={j} className="border border-background-300 p-3">{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
    }
    return <p key={index} className="whitespace-pre-line">{inline(text)}</p>;
  })}</div>;
}
