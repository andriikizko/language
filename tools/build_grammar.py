import json,sys
LV=sys.argv[1] if len(sys.argv)>1 else 'a1'
CD='content/course/'+('' if LV=='a1' else LV+'/')
SUF='' if LV=='a1' else '_'+LV
G=[]
def gr(**k): G.append(k)
src=open(CD+'grammar.py',encoding='utf8').read().replace('G = []\ndef gr(**k): G.append(k)\n','')
exec(src)
import os
XG={}
if os.path.exists(CD+'grammar_extra.py'): exec(open(CD+'grammar_extra.py',encoding='utf8').read(),{'X':XG}) if False else None
if os.path.exists(CD+'grammar_extra.py'):
    ns={}; exec(open(CD+'grammar_extra.py',encoding='utf8').read(),ns); XG=ns['X']
for g in G: g['gaps']=list(g['gaps'])+XG.get(g['id'],[])
WHY={}
_wp='content/why/'+LV+'.txt'
if os.path.exists(_wp):
    for ln in open(_wp,encoding='utf8'):
        ln=ln.rstrip('\n')
        if not ln.strip(): continue
        gid,idx,a,uk,ru=ln.split('|'); WHY[(gid,int(idx))]=(a,uk.split(';'),ru.split(';'))
out=[]
for g in G:
    gaps=[]
    for x in g['gaps']:
        s,a,w,uk,ru=x.split('|'); wr=w.split(',')
        assert '___' in s and a not in wr and uk and ru, x
        gaps.append({'s':s,'a':a,'w':wr,'uk':uk,'ru':ru})
    _seen=set(); gaps=[x for x in gaps if not (x['s'] in _seen or _seen.add(x['s']))]
    for i,x in enumerate(gaps):
        k=(g['id'],i)
        if k in WHY:
            a,uk,ru=WHY.pop(k)
            assert a==x['a'] and len(uk)==len(ru)==len(x['w']),(k,a,x['a'],len(uk),len(ru))
            for w_,u_,r_ in zip(x['w'],uk,ru): assert u_.startswith('«'+w_+'»') and r_.startswith('«'+w_+'»'),(k,w_,u_[:40])
            x['y']=[[u,r] for u,r in zip(uk,ru)]
    assert len(gaps)>=6 and len(g['explain'])==3
    out.append({'id':g['id'],'title':g['title'],'title_ru':g['title_ru'],'sub':g['sub'],'kind':'grammar',
      'explain':[{'h':h,'p':p} for h,p,_,_ in g['explain']],'explain_ru':[{'h':h,'p':p} for _,_,h,p in g['explain']],'gaps':gaps})
assert not WHY,('why без речення',list(WHY)[:3])
print('why:',sum(1 for g in out for x in g['gaps'] if 'y' in x),'з',sum(len(g['gaps']) for g in out))
json.dump(out,open(f'src/app/data/grammar{SUF}.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print(len(out),'тем',sum(len(g['gaps']) for g in out),'речень')
