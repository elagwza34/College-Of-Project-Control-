import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Copy existing editorial content into an idempotent database import fixture.
// Page components are inspected as React trees; no external resources are fetched.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
function findLayout(node) {
  if (!node || typeof node !== 'object') return null;
  if (Array.isArray(node)) return node.map(findLayout).find(Boolean);
  if (node.props?.heroHeadline) return node.props;
  return findLayout(node.props?.children);
}
function inline(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (Array.isArray(node)) return node.map(inline).join('');
  if (typeof node !== 'object') return String(node);
  const text = inline(node.props?.children);
  if (node.props?.href && text) return `[${text}](${node.props.href})`;
  return text;
}
function blocks(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (Array.isArray(node)) return node.map(blocks).join('');
  if (typeof node !== 'object') return String(node);
  const text = inline(node.props?.children).trim();
  if (['h1', 'h2', 'h3', 'h4'].includes(node.type)) return `\n\n${node.type === 'h2' || node.type === 'h1' ? '##' : '###'} ${text}\n\n`;
  if (node.type === 'p') return `${text}\n\n`;
  if (node.type === 'li') return `- ${text}\n`;
  if (node.type === 'ul' || node.type === 'ol') return `\n${blocks(node.props.children)}\n`;
  if (node.type === 'table') {
    const rows = [];
    function walk(n) { if (Array.isArray(n)) n.forEach(walk); else if (n?.type === 'tr') rows.push(n); else if (n?.props) walk(n.props.children); }
    walk(node);
    return '\n\n' + rows.map((row, i) => {
      const cells = [row.props.children].flat().filter(n => n?.props).map(n => inline(n.props.children).replaceAll('|', '/').trim());
      return '| ' + cells.join(' | ') + ' |\n' + (i === 0 ? '| ' + cells.map(() => '---').join(' | ') + ' |\n' : '');
    }).join('') + '\n';
  }
  return blocks(node.props?.children);
}
try {
  const { articles } = await server.ssrLoadModule('/src/data/articles.ts');
  const exported = [];
  for (const [order, article] of articles.entries()) {
    const slug = article.href.split('/').pop();
    const module = await server.ssrLoadModule(`/src/pages/knowledge-hub/${slug}.tsx`);
    const layout = findLayout(module.default());
    if (!layout) throw new Error(`Article layout not found: ${slug}`);
    const content = ['## Quick summary', layout.quickSummary.map(text => `- ${text}`).join('\n'), blocks(layout.children).trim()].join('\n\n').replace(/\n{3,}/g, '\n\n');
    if (content.length < 500) throw new Error(`Incomplete content: ${slug}`);
    exported.push({ title: article.title, slug, excerpt: article.description, category: article.category, content, image_url: layout.heroImageUrl, read_minutes: Number.parseInt(article.readTime), order });
  }
  const output = resolve('../backend/apps/content/seed_data/articles.json');
  await mkdir(resolve(output, '..'), { recursive: true });
  await writeFile(output, JSON.stringify(exported, null, 2) + '\n');
  console.log(`Exported ${exported.length} complete articles.`);
} finally { await server.close(); }
