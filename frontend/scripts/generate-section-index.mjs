import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const pages = path.join(root, 'src/pages');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const slash = value => value.replaceAll('\\', '/');
const link = (from, to) => slash(path.relative(path.dirname(from), to));
const config = ts.readConfigFile('tsconfig.app.json', ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const parse = file => ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const all = node => { const nodes = []; const visit = n => { nodes.push(n); ts.forEachChild(n, visit); }; visit(node); return nodes; };
const resolveImport = (file, spec) => ts.resolveModuleName(spec, file, parsed.options, ts.sys).resolvedModule?.resolvedFileName;
const routerFile = path.join(root, 'src/router/config.tsx');
const routerNodes = all(parse(routerFile));
const routeImports = new Map();
const routePaths = new Map();
for (const node of routerNodes.filter(ts.isVariableDeclaration)) {
  const imported = node.initializer && all(node.initializer).find(n => ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword);
  if (imported) routeImports.set(node.name.getText(), resolveImport(routerFile, imported.arguments[0].text));
}
for (const node of routerNodes.filter(ts.isObjectLiteralExpression)) {
  const pathname = node.properties.find(p => p.name?.getText() === 'path')?.initializer;
  const element = node.properties.find(p => p.name?.getText() === 'element')?.initializer;
  const tag = element && (ts.isJsxSelfClosingElement(element) ? element.tagName : ts.isJsxElement(element) ? element.openingElement.tagName : null);
  const target = tag && routeImports.get(tag.getText());
  if (target && pathname && ts.isStringLiteral(pathname)) {
    const key = path.resolve(target); routePaths.set(key, [...(routePaths.get(key) || []), pathname.text]);
  }
}
const prettify = name => name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2').replace(/Section\d*$/, '').trim();
const entries = walk(pages).filter(file => file.endsWith('.tsx') && !slash(file).includes('/components/') && !/Data\.tsx$/.test(file) && (path.basename(file) === 'page.tsx' || /(?:detail|library|LegalPage|NotFound)\.tsx$/.test(file)));
const indexFile = path.join(pages, 'README.md');
const index = ['# Page sections', '', 'Open a page folder, then `components`, then the file named after the visible section label. Names use PascalCase; sections without an eyebrow use their heading or a descriptive name for dynamic content.', '', 'Each page guide lists local entry points and shared implementations. Editing a local component affects that page; editing a shared implementation affects every page that uses it. Content loaded from the dashboard is edited through its existing CMS workflow.', '', '| Page | URL | Section guide |', '| --- | --- | --- |'];
for (const entry of entries) {
  const folder = path.dirname(entry);
  const doc = path.join(folder, path.basename(entry) === 'page.tsx' ? 'README.md' : `${path.basename(entry, '.tsx')}.sections.md`);
  const sf = parse(entry);
  const imports = sf.statements.filter(ts.isImportDeclaration).map(stmt => ({ name: stmt.importClause?.name?.text, target: resolveImport(entry, stmt.moduleSpecifier.text) })).filter(row => row.target && row.target.includes('/pages/'));
  const components = new Map();
  const collect = (file, depth = 0) => {
    file = path.resolve(file);
    if (depth > 4 || components.has(file) || !fs.existsSync(file) || !file.endsWith('.tsx') || !slash(file).includes('/components/')) return;
    const child = parse(file);
    const annotation = child.text.match(/\/\*\*\s*(?:Section:\s*)?([^\n*]+)/)?.[1]?.replace(/\.\s*(?:Shared|Edit).*$/, '').replace(/\.\s*$/, '').trim();
    const shared = child.statements.filter(ts.isImportDeclaration).map(stmt => resolveImport(file, stmt.moduleSpecifier.text)).filter(target => target && (slash(target).includes('/components/feature/') || slash(target).includes('/pages/') && slash(target).includes('/components/') && !path.resolve(target).startsWith(folder + path.sep)));
    components.set(file, { label: annotation || prettify(path.basename(file, '.tsx')), shared: [...new Set(shared)] });
    for (const stmt of child.statements.filter(ts.isImportDeclaration)) {
      const target = resolveImport(file, stmt.moduleSpecifier.text);
      if (target && path.resolve(target).startsWith(folder + path.sep)) collect(target, depth + 1);
    }
  };
  for (const row of imports) collect(row.target);
  // Policy pages use a shared shell but own each header and clause component.
  const ownComponents = path.join(folder, 'components');
  if (fs.existsSync(ownComponents)) for (const file of walk(ownComponents).filter(file => file.endsWith('.tsx') && !/Data\.tsx$/.test(file))) collect(file);
  const urls = (routePaths.get(path.resolve(entry)) || []).map(url => `\`${url}\``).join(', ');
  const lines = [`# ${slash(path.relative(pages, folder)) || 'Page'} sections`, '', `Composition: [${path.basename(entry)}](${link(doc, entry)}).${urls ? ` Routes: ${urls}.` : ''}`, '', 'Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.', '', '| Label / heading | Component | Shared implementation |', '| --- | --- | --- |'];
  for (const [file, row] of components) lines.push(`| ${row.label.replaceAll('|', '\\|')} | [${path.basename(file)}](${link(doc, file)}) | ${row.shared.map(target => `[${path.basename(target)}](${link(doc, target)})`).join(', ') || 'Page-local'} |`);
  const data = fs.readdirSync(folder).filter(name => /Data\.tsx?$|^programmeData\.ts$|^sectorData\.ts$|^checkerData\.ts$/.test(name));
  if (data.length) lines.push('', 'Section copy, repeated items and configuration:', '', ...data.map(name => `- [${name}](${name})`));
  lines.push('', 'Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.', '');
  fs.writeFileSync(doc, lines.join('\n'));
  index.push(`| [${slash(path.relative(pages, entry))}](${link(indexFile, entry)}) | ${urls || 'Shared composition'} | [Sections](${link(indexFile, doc)}) |`);
}
fs.writeFileSync(indexFile, index.join('\n') + '\n');
console.log(`Generated ${entries.length} page section guides and the page index.`);
