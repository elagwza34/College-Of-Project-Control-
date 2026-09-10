from pathlib import Path
root=Path('frontend')
for p in (root/'src').rglob('*'):
 if p.suffix not in ['.ts','.tsx']:continue
 s=p.read_text(encoding='utf-8').replace('Book an Employer Consultation','Request an employer consultation').replace('Book an information session','Request a consultation').replace('cpcm-logo-light.png','cpcm-logo-light.webp').replace('cpcm-logo-dark.png','cpcm-logo-dark.webp')
 p.write_text(s,encoding='utf-8')
p=root/'src/components/feature/RouteLanding/RouteHero.tsx';s=p.read_text(encoding='utf-8')
s=s.replace('          <p className="text-sm text-white/80 lg:col-start-2">Illustrative controls view — sample data, not measured programme results.</p>\n','')
s=s.replace('<div className="flex-1 w-full lg:max-w-[520px] relative">','<div className="flex-1 w-full lg:max-w-[520px] relative">\n            <p className="mb-3 text-sm text-white/80">Illustrative controls view — sample data, not measured programme results.</p>')
s=s.replace('                    Live\n','                    Example\n');p.write_text(s,encoding='utf-8')
p=root/'src/pages/mentors/detail.tsx';s=p.read_text(encoding='utf-8')
s=s.replace("  const [failed, setFailed] = useState(false);","  const [failed, setFailed] = useState(false);\n  const [attempt, setAttempt] = useState(0);")
s=s.replace('    fetchMentor(id)\n      .then(setMentor)\n      .catch(() => setFailed(true));\n  }, [id]);','''    let active = true;
    setMentor(null); setFailed(false);
    fetchMentor(id).then(item => {
      if (active) setMentor(item);
    }).catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [id, attempt]);''')
s=s.replace('<SiteLink href="/" className="mt-6','<button type="button" className="btn-primary mt-6" onClick={() => setAttempt(value => value + 1)}>Retry profile</button>\n          <SiteLink href="/" className="mt-6')
s=s.replace('return <div className="min-h-screen bg-background-50" aria-label="Loading mentor profile" />;', 'return <div className="page-loader bg-background-50" role="status">Loading mentor profile…</div>;')
p.write_text(s,encoding='utf-8')
print('Polish applied')
