import json,re,sys
nouns=json.load(open('src/app/data/nouns.json',encoding='utf8'))['words']
verbs=json.load(open('src/app/data/verbs.json',encoding='utf8'))
dd=json.load(open('src/app/data/dict.json',encoding='utf8'))
course=json.load(open('src/app/data/course.json',encoding='utf8'))
lex={}
def put(k,uk,ru,force=False):
    k=k.lower()
    if force or k not in lex: lex[k]={'uk':uk,'ru':ru}
for a in dd['adj']: put(a['de'],a['uk'],a['ru'])
for p in dd['pron']: put(p['de'],p['uk'],p['ru'])
for p in dd['preps']: put(p['de'],p['uk'],p['ru'])
for n in dd['nums']['cardinal']: put(n['de'],str(n['n']),str(n['n']))
for v in verbs:
    for f in v['f']:
        for w in f.split(' ')[1:]: 
            if '/' in w: continue
            put(w,v['uk'],v['ru'])
    put(v['de'],v['uk'],v['ru'],True)
for n in nouns:
    put(n['de'],n['uk'],n['ru'],True)
    if n['pl']: put(n['pl'],n['uk']+' (мн.)',n['ru']+' (мн.)')
for l in open('content/dict/extra.tsv',encoding='utf8'):
    p=l.strip().split('|')
    if len(p)==3: put(p[0],p[1],p[2])
json.dump(lex,open('src/app/data/lexicon.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
# coverage
miss={}
def toks(s):
    s=re.sub(r'\d+[\d,\. ]*\s*€?\s*\(([^)]+)\)',r'\1',s)
    return re.findall(r"[A-Za-zÄÖÜäöüß\-]+",s)
for b in course:
    texts=[x['de'] for x in b['topic']['s']]+[l['de'] for d in b['dialogs'] for l in d['lines']]
    for t in texts:
        for w in toks(t):
            if w.lower() not in lex: miss.setdefault(w,set()).add(b['id'])
print(len(lex),'слів;','без перекладу:',len(miss))
print(sorted(miss))
