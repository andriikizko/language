import json
B=[]
def blk(**k): B.append(k)
for p in ('part1','part2','part3'):
    exec(open(f'content/course/{p}.py',encoding='utf8').read())
out=[]
for b in B:
    gaps=[]
    for g in b['gaps']:
        s,a,w,uk,ru=g.split('|')
        assert '___' in s and uk and ru, g
        wr=w.split(',')
        assert a not in wr, g
        gaps.append({'s':s,'a':a,'w':wr,'uk':uk,'ru':ru})
    dl=[]
    for d in b['dialogs']:
        lines=[dict(zip(('who','de','uk','ru'),l.split('|'))) for l in d['lines']]
        qs=[]
        for quk,qru,opts,ci in d['qs']:
            o=[{'uk':x.split('|')[0],'ru':x.split('|')[-1]} for x in opts]
            qs.append({'uk':quk,'ru':qru,'o':o,'c':ci})
        dl.append({'title':d['title'],'lines':lines,'qs':qs})
    out.append({'id':b['id'],'title':b['title'],'sub':b['sub'],'nouns':b['nouns'],'adjs':b.get('adjs') or [],'adjlist':b.get('adjlist') or [],
      'verbs':b['verbs'],'numq':b.get('numq',False),'explain':[{'h':h,'p':p} for h,p in b['explain']],'gaps':gaps,'dialogs':dl})
json.dump(out,open('src/app/data/course.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print(len(out),'блоків',sum(len(b['gaps']) for b in out),'речень')
