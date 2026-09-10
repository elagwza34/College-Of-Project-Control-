from html.parser import HTMLParser
from pathlib import Path
import json,collections
class Parser(HTMLParser):
 def __init__(self):
  super().__init__();self.root={'tag':'root','attrs':{},'children':[]};self.stack=[self.root]
 def handle_starttag(self,t,a):
  n={'tag':t,'attrs':dict(a),'children':[]};self.stack[-1]['children'].append(n)
  if t not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.stack.append(n)
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i]['tag']==t:self.stack=self.stack[:i];break
 def handle_data(self,s):
  if s.strip():self.stack[-1]['children'].append(s)
def walk(n):
 if isinstance(n,dict):
  yield n
  for c in n['children']:yield from walk(c)
def txt(n):
 if isinstance(n,str):return n
 if n['tag'] in ['style','script','svg']:return ''
 return ' '.join(txt(c) for c in n['children'])
for name in ['construction','energy','engineering','public-sector']:
 p=Parser();p.feed(Path('docs/'+name+'-source.html').read_text(encoding='utf-8'));ns=list(walk(p.root))
 Path('docs/'+name+'-source-tree.json').write_text(json.dumps(p.root,ensure_ascii=False),encoding='utf-8')
 out='\n\n'.join(n['tag']+' '+str(n['attrs'])+'\n'+' '.join(txt(n).split()) for n in ns if n['tag'] in ['header','section'])
 Path('docs/'+name+'-source-content.txt').write_text(out,encoding='utf-8');print(name,out)
