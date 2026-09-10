"""Read-only source inventory supporting the September 2026 frontend audit."""
from pathlib import Path
import collections
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'frontend/src'
files = sorted(p for p in SRC.rglob('*') if p.suffix in {'.tsx', '.ts', '.css'})
texts = {p: p.read_text(encoding='utf-8-sig') for p in files}
records = []
for p, text in texts.items():
    imports = []
    for spec in re.findall(r'(?:from\s*|import\s*\(?\s*)[\'\"]([^\'\"]+)[\'\"]', text):
        base = SRC / spec[2:] if spec.startswith('@/') else p.parent / spec
        if not spec.startswith(('@/', '.')):
            continue
        for candidate in [base, Path(str(base)+'.tsx'), Path(str(base)+'.ts'), base/'index.ts', base/'index.tsx']:
            if candidate.is_file():
                imports.append(candidate.resolve().relative_to(SRC.resolve()).as_posix())
                break
    headings = []
    for match in re.finditer(r'<h[1-3]\b[^>]*>(.*?)</h[1-3]>', text, re.S):
        value = re.sub(r'<[^>]*>', ' ', match[1])
        value = re.sub(r'\s+', ' ', value).strip()
        headings.append({'line': text.count('\n', 0, match.start())+1, 'text': value})
    records.append({
        'file': p.relative_to(SRC).as_posix(), 'lines': len(text.splitlines()),
        'imports': imports, 'headings': headings,
        'sections': re.findall(r'<section\b[^>]*', text),
        'components': list(dict.fromkeys(re.findall(r'<([A-Z][A-Za-z0-9]+)\b', text))),
        'section_titles': re.findall(r'(?:title|heading|headline)=[\"\']([^\"\']+)', text),
        'ids': re.findall(r'\bid=[\"\']([^\"\']+)', text),
        'links': re.findall(r'\b(?:href|ctaHref|primaryHref|secondaryHref)\s*(?:=|:)\s*[\"\']([^\"\']+)', text),
    })
all_text = '\n'.join(texts.values())
summary = {
    'source_files': len(files),
    'tsx_files': sum(p.suffix=='.tsx' for p in files),
    'route_path_declarations': len(re.findall(r'path:\s*[\"\']', texts[SRC/'router/config.tsx'])),
    'hex_color_like_literals_including_comments': collections.Counter(re.findall(r'#[0-9a-fA-F]{3,8}\b', all_text)).most_common(),
    'arbitrary_font_sizes': collections.Counter(re.findall(r'text-\[(?:[0-9.]+(?:px|rem|em)|clamp\([^\]]+)\]', all_text)).most_common(),
    'radius_classes': collections.Counter(re.findall(r'\brounded(?:-[\w]+|\-\[[^\]]+\])?', all_text)).most_common(),
    'external_image_queries': all_text.count('https://readdy.ai/api/search-image'),
    'img_elements': len(re.findall(r'<img\b', all_text)),
    'lazy_image_attributes': all_text.count('loading="lazy"'),
}
by_file = {record['file']: record for record in records}
anchor_candidates = []
for target in ['pages/pcp-master/page.tsx', 'pages/operational-pcp-construction/page.tsx', 'pages/campaign/construction/page.tsx', 'pages/pmo-pcp/page.tsx', 'pages/knowledge-hub/page.tsx']:
    seen, todo = set(), [target]
    while todo:
        name = todo.pop()
        if name in seen or name not in by_file:
            continue
        seen.add(name)
        todo.extend(by_file[name]['imports'])
    ids = {i for name in seen for i in by_file[name]['ids']}
    links = {i for name in seen for i in by_file[name]['links'] if i.startswith('#')}
    anchor_candidates.append({'file': target, 'ids_in_import_closure': sorted(ids), 'unresolved_literal_hash_candidates': sorted(links - {'#'+i for i in ids})})
output = {'summary': summary, 'files': records, 'anchor_candidates': anchor_candidates,
          'limitations': 'Regex source inventory, not a JSX parser or rendered DOM audit. Includes unused code and comments; import closure may overcount rendered sections; dynamic IDs/links require manual review. Color-like literals can include HTML entities.'}
(ROOT/'docs/frontend-audit-inventory.json').write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding='utf-8')
print(json.dumps(summary, ensure_ascii=True, indent=2))
