import json,sys,glob,os
from german_nouns.lookup import Nouns
N=Nouns()
BL={'numbers':'Цифри й числа','days':'Дні тижня й місяці','family':'Родина','food':'Їжа й напої','clothes':'Одяг','home':'Дім і меблі','city':'Місто й транспорт','jobs':'Професії','tech':'Техніка й телефон','body':'Тіло','hobby':'Хобі й вільний час'}
words={};review=[]
for f in sorted(glob.glob('content/nouns/*.tsv')):
    topic=os.path.basename(f)[:-4]
    for ln in open(f,encoding='utf8'):
        ln=ln.strip()
        if not ln: continue
        p=ln.split('|')
        if len(p)!=6: review.append((ln,'формат')); continue
        g,de,pl,uk,ru,core=p
        key=(de,g)
        if key in words:
            continue
        rec={'de':de,'g':g,'pl':None if pl=='-' else pl,'uk':uk,'ru':ru,'topic':topic,'core':core=='1'}
        if g!='p':
            res=N[de]
            gs={r.get('genus') for r in res}
            if not res: review.append((de,'немає у словнику'))
            else:
                if g not in gs: review.append((de,f'рід: у мене {g}, у словнику {sorted(x for x in gs if x)}'))
                else:
                    pls={r['flexion'].get('nominativ plural') for r in res if r.get('genus')==g}
                    pls.discard(None)
                    if pl!='-' and pls and pl not in pls: review.append((de,f'множина: у мене {pl}, у словнику {sorted(pls)}'))
        words[key]=rec
out=sorted(words.values(),key=lambda r:r['de'].lower())
json.dump({'topics':BL,'words':out},open('src/app/data/nouns.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
open('content/review.txt','w',encoding='utf8').write('\n'.join(f'{a} — {b}' for a,b in review))
print(len(out),'слів;',len(review),'на перевірку')
