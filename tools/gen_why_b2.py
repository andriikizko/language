# Генерує content/why/b2.txt (граматика) і course_b2.txt (курс) для B2.
import sys
G={};C={}
ns={}; exec(open('content/course/b2/grammar.py',encoding='utf8').read(),ns)
def blk(**k): C[k['id']]=k
exec(open('content/course/b2/part1.py',encoding='utf8').read(),{'blk':blk})
PT={
'g4_konj1':('у непрямій мові (письмово) потрібен Konjunktiv I; якщо він збігається з Indikativ — Konjunktiv II','в косвенной речи (письменно) нужен Konjunktiv I; если он совпадает с Indikativ — Konjunktiv II'),
'g4_konj2_verg':('нереальне минуле: hätte/wäre + Partizip II (wäre — для руху й зміни стану)','нереальное прошлое: hätte/wäre + Partizip II (wäre — для движения и смены состояния)'),
'g4_passiv_perf':('Perfekt пасиву: sein + Partizip II + worden; стан: sein + Partizip II; з модальним: Partizip II + werden','Perfekt пассива: sein + Partizip II + worden; состояние: sein + Partizip II; с модальным: Partizip II + werden'),
'g4_partizip':('Partizip I (-d) — дія триває, Partizip II — результат чи пасив; закінчення як у прикметника','Partizip I (-d) — действие длится, Partizip II — результат или пассив; окончание как у прилагательного'),
'g4_nominal':('ділова мова: іменник замість підрядного, прийменники з Genitiv (aufgrund, angesichts, infolge, trotz)','деловая речь: существительное вместо придаточного, предлоги с Genitiv (aufgrund, angesichts, infolge, trotz)'),
'g4_futur2':('припущення: werden + інфінітив (теперішнє) або werden + Partizip II + haben/sein (минуле)','предположение: werden + инфинитив (настоящее) или werden + Partizip II + haben/sein (прошлое)'),
'g4_infinitiv':('той самий підмет: um/ohne/(an)statt … zu; різні підмети: damit/ohne dass/statt dass; zu стоїть перед інфінітивом','то же подлежащее: um/ohne/(an)statt … zu; разные подлежащие: damit/ohne dass/statt dass; zu стоит перед инфинитивом'),
'g4_konnektoren':('спосіб — indem, наслідок — sodass / so … dass, залежність — je … desto','способ — indem, следствие — sodass / so … dass, зависимость — je … desto'),
'g4_relativ':('відносний займенник: рід і число за іменником, відмінок за прийменником чи роллю; після alles/etwas — was; місце — wo','относительное местоимение: род и число по существительному, падеж по предлогу или роли; после alles/etwas — was; место — wo'),
'g4_verben_praep':('дієслово вимагає постійного прийменника (auf/für/über/von/vor/mit/an/gegen); питання wo(r)-','глагол требует постоянного предлога (auf/für/über/von/vor/mit/an/gegen); вопрос wo(r)-'),
'g4_lassen':('lassen + інфінітив без zu; у Perfekt з інфінітивом — подвійний інфінітив, без нього — gelassen; sich lassen = можливість','lassen + инфинитив без zu; в Perfekt с инфинитивом — двойной инфинитив, без него — gelassen; sich lassen = возможность'),
'g4_konzessiv':('obwohl — підрядне, trotz — Genitiv, trotzdem/dennoch — головне з дієсловом на другому місці, zwar … aber','obwohl — придаточное, trotz — Genitiv, trotzdem/dennoch — главное с глаголом на втором месте, zwar … aber'),
'g4_modalpart':('Konjunktiv II модальних для припущення, ввічливого прохання чи поради (könnte, müsste, dürfte, sollte)','Konjunktiv II модальных для предположения, вежливой просьбы или совета (könnte, müsste, dürfte, sollte)'),
}
def clean(t): return t.replace(';',',').replace('|','/')
def gen(w,a,s,topic):
    full=s.replace('___',a)
    if topic: return (f'«{w}» — не підходить: {topic[0]}. Правильно: «{full}»', f'«{w}» — не подходит: {topic[1]}. Правильно: «{full}»')
    return (f'«{w}» — тут не підходить: у реченні «{full}» потрібно «{a}»', f'«{w}» — здесь не подходит: в предложении «{full}» нужно «{a}»')
gl=[];cl=[]
for g in ns['G']:
    seen=set(); idx=0
    for x in g['gaps']:
        s,a,w,uk,ru=x.split('|')
        if s in seen: continue
        seen.add(s)
        rs=[gen(v,a,s,PT[g['id']]) for v in w.split(',')]
        gl.append(f"{g['id']}|{idx}|{a}|{';'.join(clean(r[0]) for r in rs)}|{';'.join(clean(r[1]) for r in rs)}"); idx+=1
for bid,b in C.items():
    seen=set(); idx=0
    for x in b['gaps']:
        f=x.split('|'); s,a=f[0],f[1]
        w=(f[2]+','+f[3]) if len(f)==6 else f[2]
        if s in seen: continue
        seen.add(s)
        rs=[gen(v,a,s,None) for v in w.split(',')]
        cl.append(f"{bid}|{idx}|{a}|{';'.join(clean(r[0]) for r in rs)}|{';'.join(clean(r[1]) for r in rs)}"); idx+=1
open('content/why/b2.txt','w',encoding='utf8').write('\n'.join(gl)+'\n')
open('content/why/course_b2.txt','w',encoding='utf8').write('\n'.join(cl)+'\n')
print(len(gl),len(cl))
