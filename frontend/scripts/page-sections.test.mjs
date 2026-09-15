import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const root = path.resolve('.');
const config = ts.readConfigFile('tsconfig.app.json', ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const router = path.join(root, 'src/router/config.tsx');
const parse = file => ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const all = node => { const result = []; const visit = n => { result.push(n); ts.forEachChild(n, visit); }; visit(node); return result; };
const resolveImport = (file, spec) => ts.resolveModuleName(spec, file, parsed.options, ts.sys).resolvedModule?.resolvedFileName;
const routeModules = [...new Set(all(parse(router)).filter(n => ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword).map(n => resolveImport(router, n.arguments[0].text)))];

test('every public route resolves to a page with a discoverable components folder', () => {
  for (const file of routeModules) {
    assert.ok(file, 'Unresolved lazy page import');
    assert.ok(fs.existsSync(path.join(path.dirname(file), 'components')), `Missing components folder for ${file}`);
    assert.ok(fs.existsSync(path.join(path.dirname(file), 'README.md')), `Missing section guide for ${file}`);
  }
});

test('public page entry points compose sections instead of embedding section markup', () => {
  for (const file of routeModules) {
    const sf = parse(file);
    const page = sf.statements.find(n => ts.isFunctionDeclaration(n) && n.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword));
    if (!page) continue; // A small re-export entry may delegate to its page composition.
    const inline = all(page.body).filter(n => (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) && ['section', 'header', 'article', 'aside'].includes(n.tagName.getText()));
    assert.equal(inline.length, 0, `Extract inline sections from ${file}`);
  }
});

test('page component filenames and exported component names stay aligned', () => {
  for (const file of parsed.fileNames.filter(file => /\/pages\/.*\/components\/.*\.tsx$/.test(file.replaceAll('\\', '/')) && !/Data\.tsx$/.test(file))) {
    const sf = parse(file);
    const component = sf.statements.find(n => ts.isFunctionDeclaration(n) && n.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword));
    if (component?.name) assert.equal(component.name.text, path.basename(file, '.tsx'), `Component filename mismatch: ${file}`);
  }
});
