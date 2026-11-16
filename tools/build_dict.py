import json
D='content/dict/'
def rows(f):
    return [l.split('|') for l in open(D+f,encoding='utf8').read().split('\n') if l.strip()]

# ---- verbs ----
def reg(inf, over=None):
    if inf.endswith('eln'):
        f=[inf[:-3]+'le',inf[:-1]+'st',inf[:-1]+'t',inf,inf[:-1]+'t',inf]
        return f
    if inf.endswith('ern'):
        f=[inf[:-1]+'',inf[:-1]+'st',inf[:-1]+'t',inf,inf[:-1]+'t',inf]
        f[0]=inf[:-1]+'e'; return f
    st=inf[:-2]
    last=st[-1]; prev=st[-2] if len(st)>1 else ''
    vow='aeiouäöüy'
    est = last in 'dt' or (last in 'nm' and prev not in vow+'lrh'+last) or (last=='n' and st.endswith('chn'))
    if last in 'sßxz': du=st+'t'
    elif est: du=st+'est'
    else: du=st+'st'
    er=st+('et' if est else 't')
    return [st+'e',du,er,inf,er,inf]
verbs=[]
for inf,kind,uk,ru,extra,core in rows('verbs.tsv'):
    irr=[False]*6; sep=None
    if kind=='m' or (kind=='i' and extra.count(',')==5):
        f=extra.split(','); irr=[True]*6
        if inf in('möchten',): irr=[False]*6
    elif kind=='r':
        f=reg(inf)
    elif kind=='i':
        f=reg(inf); du,er=extra.split(','); f[1]=du; f[2]=er; f[4]=reg(inf)[4]; irr[1]=irr[2]=True
    elif kind=='s':
        parts=extra.split(';'); sep=parts[0]; base=inf[len(sep):]
        f=reg(base)
        if len(parts)>1:
            du,er=parts[1].split(','); f[1]=du; f[2]=er; irr[1]=irr[2]=True
        f=[x+' '+sep for x in f]
    forms=[p+' '+x for p,x in zip(['ich','du','er/sie/es','wir','ihr','sie/Sie'],f)]
    typ={'m':'modal','r':'regular','i':'regular','s':'sep'}[kind]
    if kind=='m' and inf in('sein','haben','werden'): typ='aux'
    if kind=='i' and extra.count(',')==5: typ='modal'
    verbs.append({'de':inf,'type':typ,'uk':uk,'ru':ru,'f':forms,'irr':irr,'core':core=='1','sep':sep})
verbs.sort(key=lambda v:v['de'].lower())
json.dump(verbs,open('src/app/data/verbs.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))

# ---- adjectives ----
adj=[{'de':a,'uk':u,'ru':r,'topic':t,'core':c=='1','opp':o} for a,u,r,t,c,o in rows('adjectives.tsv')]
adj.sort(key=lambda x:x['de'].lower())
# ---- pronouns ----
pron=[{'cat':c,'de':d,'uk':u,'ru':r,'note':n} for c,d,u,r,n in rows('pronouns.tsv')]
# ---- numerals ----
U=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn']
T={2:'zwanzig',3:'dreißig',4:'vierzig',5:'fünfzig',6:'sechzig',7:'siebzig',8:'achtzig',9:'neunzig'}
def card(n):
    if n<20: return U[n]
    if n==100: return 'hundert'
    t,u=divmod(n,10)
    if u==0: return T[t]
    return ('ein' if u==1 else U[u])+'und'+T[t]
def ordn(n):
    sp={1:'erste',3:'dritte',7:'siebte',8:'achte'}
    if n in sp: return sp[n]
    return card(n)+('te' if n<20 else 'ste')
nums={'cardinal':[{'n':n,'de':card(n)} for n in list(range(0,101))],
      'extra':[{'n':1000,'de':'tausend'},{'n':1000000,'de':'eine Million'}],
      'ordinal':[{'n':n,'de':'der '+ordn(n)} for n in range(1,32)]}
# ---- prepositions ----
pre=[{'case':c,'de':d,'uk':u,'ru':r,'ex':e,'ex_uk':eu,'ex_ru':er} for c,d,u,r,e,eu,er in rows('preps.tsv')]
json.dump({'adj':adj,'pron':pron,'nums':nums,'preps':pre},open('src/app/data/dict.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print(len(verbs),len(adj),len(pron),len(pre))
if __name__=='__main__':
    import sys
    for v in verbs:
        if v['de'] in sys.argv[1:] or not sys.argv[1:] and False: print(v['de'],v['f'])
