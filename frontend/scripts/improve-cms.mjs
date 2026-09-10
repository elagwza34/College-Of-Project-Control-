import ts from 'typescript';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
// Wrap asynchronous editor actions at the outer boundary so failed writes never
// continue to success state. Existing finally blocks still release busy controls.
for (const file of readdirSync('src/dashboard/pages').filter(n => n.endsWith('.tsx') && !['LoginPage.tsx', 'OverviewPage.tsx', 'ContentOwnershipPage.tsx'].includes(n))) {
  const path = `src/dashboard/pages/${file}`;
  let source = readFileSync(path, 'utf8');
  const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits = [];
  function visit(node) {
    if (ts.isArrowFunction(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword) && ts.isBlock(node.body)) {
      edits.push({ at: node.body.getStart(ast) + 1, text: '\n    try {' });
      edits.push({ at: node.body.end - 1, text: '\n    } catch (error) { reportCmsError(error); }\n' });
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  for (const e of edits.sort((a, b) => b.at - a.at)) source = source.slice(0, e.at) + e.text + source.slice(e.at);
  source = source.replace(/\.then\((set\w+)\);/g, '.then($1).catch(reportCmsError);');
  if (source.includes('reportCmsError(')) source = "import { reportCmsError } from '../api/reportError';\n" + source;
  writeFileSync(path, source);
}
