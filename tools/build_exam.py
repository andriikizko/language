import json
exec(open('content/course/exam.py',encoding='utf8').read())
out=[]
for t,q,o,c in LESEN: out.append({'sec':'lesen','text':t,'q':q,'o':o,'c':c})
for t,q,o,c in SCHREIBEN: out.append({'sec':'schreiben','text':t,'q':q,'o':o,'c':c})
for lines,qs in HOEREN:
    for q,o,c in qs: out.append({'sec':'hoeren','audio':lines,'q':q,'o':o,'c':c})
for x in out: assert len(set(x['o']))==len(x['o']) and 0<=x['c']<len(x['o'])
json.dump(out,open('src/app/data/exam.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print({s:sum(1 for x in out if x['sec']==s) for s in ('lesen','schreiben','hoeren')})
