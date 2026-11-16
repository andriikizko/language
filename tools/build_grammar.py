import json,sys
LV=sys.argv[1] if len(sys.argv)>1 else 'a1'
CD='content/course/'+('' if LV=='a1' else LV+'/')
SUF='' if LV=='a1' else '_'+LV
G=[]
def gr(**k): G.append(k)
src=open(CD+'grammar.py',encoding='utf8').read().replace('G = []\ndef gr(**k): G.append(k)\n','')
exec(src)
out=[]
for g in G:
    gaps=[]
    for x in g['gaps']:
        s,a,w,uk,ru=x.split('|'); wr=w.split(',')
        assert '___' in s and a not in wr and uk and ru, x
        gaps.append({'s':s,'a':a,'w':wr,'uk':uk,'ru':ru})
    assert len(gaps)==6 and len(g['explain'])==3
    out.append({'id':g['id'],'title':g['title'],'title_ru':g['title_ru'],'sub':g['sub'],'kind':'grammar',
      'explain':[{'h':h,'p':p} for h,p,_,_ in g['explain']],'explain_ru':[{'h':h,'p':p} for _,_,h,p in g['explain']],'gaps':gaps})
json.dump(out,open(f'src/app/data/grammar{SUF}.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print(len(out),'тем',sum(len(g['gaps']) for g in out),'речень')
