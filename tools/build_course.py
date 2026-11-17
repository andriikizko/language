import json,sys
LV=sys.argv[1] if len(sys.argv)>1 else 'a1'
CD='content/course/'+('' if LV=='a1' else LV+'/')
SUF='' if LV=='a1' else '_'+LV
B=[]
def blk(**k): B.append(k)
import os
for p in ('part1','part2','part3','part4'):
    if os.path.exists(f'{CD}{p}.py'): exec(open(f'{CD}{p}.py',encoding='utf8').read())
exec(open(CD+'topics.py',encoding='utf8').read())
exec(open(CD+'explain_ru.py',encoding='utf8').read())
EXTRA={}
import os
if os.path.exists(CD+'gaps_extra.py'): exec(open(CD+'gaps_extra.py',encoding='utf8').read())
WHY={}
_wp='content/why/course_'+LV+'.txt'
if os.path.exists(_wp):
    for ln in open(_wp,encoding='utf8'):
        ln=ln.rstrip('\n')
        if not ln.strip(): continue
        bid,idx,a,uk,ru=ln.split('|'); WHY[(bid,int(idx))]=(a,uk.split(';'),ru.split(';'))
out=[]
def a2words(tid):
    return [l.split('|')[1] for l in open(f'content/nouns/a2/{tid[3:]}.tsv',encoding='utf8') if l.strip()]
def a2adjs(tid):
    return [l.split('|')[0] for l in open('content/dict/adjectives_a2.tsv',encoding='utf8') if l.strip() and l.split('|')[3]==tid]
for b in B:
    if LV=='a2':
        b['nouns']=a2words(b['id']); b['adjlist']=a2adjs(b['id']); b['adjs']=[]
    gaps=[]
    for g in b['gaps']+EXTRA.get(b['id'],[]):
        f=g.split('|')
        if len(f)==6: f=[f[0],f[1],f[2]+','+f[3],f[4],f[5]]
        s,a,w,uk,ru=f
        assert '___' in s and uk and ru, g
        wr=w.split(',')
        assert a not in wr, g
        gaps.append({'s':s,'a':a,'w':wr,'uk':uk,'ru':ru})
    _seen=set(); gaps=[x for x in gaps if not (x['s'] in _seen or _seen.add(x['s']))]
    for i,x in enumerate(gaps):
        k=(b['id'],i)
        if k in WHY:
            a,uk_,ru_=WHY.pop(k)
            assert a==x['a'] and len(uk_)==len(ru_)==len(x['w']),(k,a,x['a'],len(uk_),len(ru_))
            for w_,u_,r_ in zip(x['w'],uk_,ru_): assert u_.startswith('«'+w_+'»') and r_.startswith('«'+w_+'»'),(k,w_,u_[:40])
            x['y']=[[u,r] for u,r in zip(uk_,ru_)]
    dl=[]
    for d in b['dialogs']:
        lines=[dict(zip(('who','de','uk','ru'),l.split('|'))) for l in d['lines']]
        qs=[]
        for quk,qru,opts,ci in d['qs']:
            o=[{'uk':x.split('|')[0],'ru':x.split('|')[-1]} for x in opts]
            qs.append({'uk':quk,'ru':qru,'o':o,'c':ci})
        dl.append({'title':d['title'],'lines':lines,'qs':qs})
    assert len(RU[b['id']])==len(b['explain']),b['id']
    out.append({'id':b['id'],'title':b['title'],'sub':b['sub'],'nouns':b['nouns'],'adjs':b.get('adjs') or [],'adjlist':b.get('adjlist') or [],
      'verbs':b['verbs'],'topic':{'title':T[b['id']]['title'],'note':T[b['id']]['note'],'s':[dict(zip(('de','uk','ru'),x.split('|'))) for x in T[b['id']]['s']]},'numq':b.get('numq',False),'explain':[{'h':h,'p':p} for h,p in b['explain']],'explain_ru':[{'h':h,'p':p} for h,p in RU[b['id']]],'gaps':gaps,'dialogs':dl})
assert not WHY,('why без речення',list(WHY)[:3])
print('why:',sum(1 for b in out for x in b['gaps'] if 'y' in x),'з',sum(len(b['gaps']) for b in out))
json.dump(out,open(f'src/app/data/course{SUF}.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print(len(out),'блоків',sum(len(b['gaps']) for b in out),'речень')
