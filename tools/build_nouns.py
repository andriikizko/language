import json,sys,glob,os
from german_nouns.lookup import Nouns
N=Nouns()
BL={'numbers':'Цифри й числа','days':'Дні тижня й місяці','family':'Родина','food':'Їжа й напої','clothes':'Одяг','home':'Дім і меблі','city':'Місто й транспорт','jobs':'Професії','tech':'Техніка й телефон','body':'Тіло','hobby':'Хобі й вільний час',
 'a2_health':'A2 · Здоров\'я й лікар','a2_travel':'A2 · Подорожі','a2_shopping':'A2 · Покупки','a2_feste':'A2 · Свята','a2_arbeit':'A2 · Робота й резюме','a2_wohnen':'A2 · Пошук житла','a2_schule':'A2 · Школа й навчання','a2_medien':'A2 · Медіа й звʼязок','a2_natur':'A2 · Погода й природа','a2_amt':'A2 · Установи, пошта, банк','a2_restaurant':'A2 · Ресторан і кухня','a2_freizeit':'A2 · Дозвілля й спорт','b1_beruf':'B1 · Робота й кар\'єра','b1_bildung':'B1 · Освіта й навчання','b1_gesundheit':'B1 · Здоров\'я й страхування','b1_wohnen':'B1 · Житло й оренда','b1_reisen':'B1 · Подорожі й транспорт','b1_medien':'B1 · Медіа й інтернет','b1_umwelt':'B1 · Довкілля','b1_gesellschaft':'B1 · Суспільство','b1_behoerden':'B1 · Установи й документи','b1_beziehungen':'B1 · Стосунки й почуття','b1_konsum':'B1 · Покупки й фінанси','b1_kultur':'B1 · Культура й дозвілля'}
ALT={'Cola':'також das Cola','Joghurt':'також das Joghurt','Gehalt':'в Австрії також der Gehalt'}
words={};review=[]
for f in sorted(glob.glob('content/nouns/*.tsv'))+sorted(glob.glob('content/nouns/a2/*.tsv'))+(sorted(glob.glob('content/nouns/b1/*.tsv')) if os.environ.get('B1') else []):
    topic=('a2_' if '/a2/' in f else 'b1_' if '/b1/' in f else '')+os.path.basename(f)[:-4]
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
        if de in ALT: rec['alt']=ALT[de]
        words[key]=rec
out=sorted(words.values(),key=lambda r:r['de'].lower())
_used={r['topic'] for r in out}
json.dump({'topics':{k:v for k,v in BL.items() if k in _used},'words':out},open('src/app/data/nouns.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
open('content/review_auto.txt','w',encoding='utf8').write('\n'.join(f'{a} — {b}' for a,b in review))
print(len(out),'слів;',len(review),'на перевірку')
