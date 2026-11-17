import json,sys
LV=sys.argv[1] if len(sys.argv)>1 else 'a1'
CD='content/course/'+('' if LV=='a1' else LV+'/')
SUF='' if LV=='a1' else '_'+LV
exec(open(CD+'exam.py',encoding='utf8').read())
out=[]
for t,q,o,c in LESEN: out.append({'sec':'lesen','text':t,'q':q,'o':o,'c':c})
for t,q,o,c in SCHREIBEN: out.append({'sec':'schreiben','text':t,'q':q,'o':o,'c':c})
for lines,qs in HOEREN:
    for q,o,c in qs: out.append({'sec':'hoeren','audio':lines,'q':q,'o':o,'c':c})
_W={}
for _l in open('content/why/exam.txt',encoding='utf8'):
    if _l.strip():
        _k,_i,_u,_r=_l.rstrip('\n').split('|'); _W[(_k,int(_i))]=(_u,_r)
_K='x' if LV=='a1' else 'y'
assert len(out)==sum(1 for k in _W if k[0]==_K),'exam why count'
for i,x in enumerate(out): x['y']=list(_W[(_K,i)])
for x in out: assert len(set(x['o']))==len(x['o']) and 0<=x['c']<len(x['o'])
json.dump(out,open(f'src/app/data/exam{SUF}.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print({s:sum(1 for x in out if x['sec']==s) for s in ('lesen','schreiben','hoeren')})
