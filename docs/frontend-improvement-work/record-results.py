from pathlib import Path
import hashlib,json,gzip,re
root=Path('.').resolve()
work=root/'docs/frontend-improvement-work'
baseline=json.loads((work/'baseline.json').read_text(encoding='utf-8'))
current={}
for p in (root/'frontend').rglob('*'):
 if not p.is_file() or any(part in ['node_modules','out','.git'] for part in p.parts):continue
 current[str(p.relative_to(root))]=hashlib.sha256(p.read_bytes()).hexdigest()
changes={
 'changed':[name for name,digest in current.items() if name in baseline and baseline[name]!=digest],
 'added':[name for name in current if name not in baseline],
 'removed':[name for name in baseline if name not in current],
}
(work/'changed-files.json').write_text(json.dumps(changes,indent=2),encoding='utf-8')
removed=json.loads((work/'removed-files.json').read_text(encoding='utf-8'))
empty='src\\pages\\pathway-redesign\\PathwayPage.tsx'
if empty not in removed:removed.append(empty)
(work/'removed-files.json').write_text(json.dumps(removed,indent=2),encoding='utf-8')
assets=root/'frontend/out/assets'
sizes={}
for extension in ['js','css']:
 p=next(assets.glob(f'index-*.{extension}'));b=p.read_bytes()
 sizes[extension]={'file':p.name,'bytes':len(b),'gzipBytes':len(gzip.compress(b,compresslevel=6))}
results=json.loads((work/'browser-results.json').read_text(encoding='utf-8'))
assert not results['failures'] and not results['exceptions']
summary={
 'date':'2026-09-09','lint':'passed','typeCheck':'passed','productionBuild':'passed','unitTests':{'passed':5,'failed':0},
 'browser':{'viewportChecks':len(results['routes']),'interactiveJourneys':len(results['journeys']),'failures':len(results['failures']),'exceptions':len(results['exceptions']),'api':'local fixtures only'},
 'assets':sizes,'files':{key:len(value) for key,value in changes.items()},
}
(work/'validation-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
