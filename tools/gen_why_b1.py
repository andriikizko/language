# Генерує content/why/b1.txt (граматика) і course_b1.txt (курс) для B1.
# Пояснення: «хибне» — чому не підходить + правило правильної відповіді.
import re,sys
G={};C={}
ns={}; exec(open('content/course/b1/grammar.py',encoding='utf8').read(),ns)
def blk(**k): C[k['id']]=k
cns={'blk':blk}; exec(open('content/course/b1/part1.py',encoding='utf8').read().split('\n',1)[1] if False else open('content/course/b1/part1.py',encoding='utf8').read(),cns)
KONJ={'hätte','wäre','würde','würden','könnten','könnte','hätten','wären','wärst','wärt','könntest','solltest','dürfte','kämst','Könnten','Könntest','Hätten','Würden','Dürfte'}
PREP={'auf','über','für','an','in','mit','von','zu','bei','um','per','aus','nach','vor','seit','bis'}
KEY={ # відповідь -> (uk,ru) правило
'als':('als — одноразова подія в минулому','als — однократное событие в прошлом'),
'Als':('als — одноразова подія в минулому','als — однократное событие в прошлом'),
'wenn':('wenn — повторювана дія або теперішній/майбутній час','wenn — повторяющееся действие или настоящее/будущее'),
'Wenn':('wenn — повторювана дія або теперішній/майбутній час','wenn — повторяющееся действие или настоящее/будущее'),
'bevor':('bevor — «до того, як», дія в підрядному пізніша','bevor — «прежде чем», действие в придаточном позже'),
'Bevor':('bevor — «до того, як», дія в підрядному пізніша','bevor — «прежде чем», действие в придаточном позже'),
'nachdem':('nachdem — «після того, як», дія в підрядному раніша (Plusquamperfekt)','nachdem — «после того как», действие в придаточном раньше (Plusquamperfekt)'),
'Nachdem':('nachdem — «після того, як», дія в підрядному раніша (Plusquamperfekt)','nachdem — «после того как», действие в придаточном раньше (Plusquamperfekt)'),
'weil':('weil — причина, підрядне речення (дієслово в кінці)','weil — причина, придаточное (глагол в конце)'),
'obwohl':('obwohl — «хоча», підрядне речення протиставлення','obwohl — «хотя», придаточное противопоставления'),
'Obwohl':('obwohl — «хоча», підрядне речення протиставлення','obwohl — «хотя», придаточное противопоставления'),
'deshalb':('deshalb — «тому», наслідок, дієслово одразу після нього','deshalb — «поэтому», следствие, глагол сразу после него'),
'trotzdem':('trotzdem — «проте», протиставлення, дієслово одразу після нього','trotzdem — «тем не менее», противопоставление, глагол сразу после него'),
'Trotzdem':('trotzdem — «проте», протиставлення, дієслово одразу після нього','trotzdem — «тем не менее», противопоставление, глагол сразу после него'),
'ob':('ob — «чи», непряме питання без питального слова','ob — «ли», косвенный вопрос без вопросительного слова'),
'dass':('dass — вводить зміст, дієслово в кінці','dass — вводит содержание, глагол в конце'),
'damit':('damit — мета з іншим підметом','damit — цель с другим подлежащим'),
'um':('um … zu — мета з тим самим підметом','um … zu — цель с тем же подлежащим'),
'zu':('zu стоїть перед інфінітивом','zu стоит перед инфинитивом'),
'sondern':('nicht nur … sondern auch','nicht nur … sondern auch'),
'zwar':('zwar … aber — «хоч … але»','zwar … aber — «хоть … но»'),
'desto':('je … desto + порівняльний ступінь','je … desto + сравнительная степень'),
'sowohl … als auch':('sowohl … als auch — «і … і»','sowohl … als auch — «и … и»'),
'entweder … oder':('entweder … oder — «або … або»','entweder … oder — «или … или»'),
'weder … noch':('weder … noch — «ні … ні»','weder … noch — «ни … ни»'),
'nicht nur … sondern auch':('nicht nur … sondern auch — «не лише … а й»','nicht nur … sondern auch — «не только … но и»'),
'dessen':('dessen — Genitiv чоловічого/середнього роду: «чий»','dessen — Genitiv мужского/среднего рода: «чей»'),
'deren':('deren — Genitiv жіночого роду й множини: «чий»','deren — Genitiv женского рода и множественного числа: «чей»'),
'wird':('wird — Präsens пасиву: werden + Partizip II','wird — Präsens пассива: werden + Partizip II'),
'werden':('werden — інфінітив в кінці пасиву з модальним (або форма для множини)','werden — инфинитив в конце пассива с модальным (или форма для множественного числа)'),
'wurde':('wurde — Präteritum пасиву: wurde + Partizip II','wurde — Präteritum пассива: wurde + Partizip II'),
'wurden':('wurden — Präteritum пасиву в множині','wurden — Präteritum пассива во множественном числе'),
'worden':('worden — Partizip II від werden в Perfekt пасиву','worden — Partizip II от werden в Perfekt пассива'),
'von':('von + Dativ називає виконавця в пасиві','von + Dativ называет исполнителя в пассиве'),
'durch':('durch + Akkusativ називає причину чи засіб','durch + Akkusativ называет причину или средство'),
'hatte':('hatte + Partizip II — Plusquamperfekt з haben','hatte + Partizip II — Plusquamperfekt с haben'),
'hatten':('hatten + Partizip II — Plusquamperfekt з haben (множина)','hatten + Partizip II — Plusquamperfekt с haben (множественное число)'),
'war':('war + Partizip II — Plusquamperfekt з sein','war + Partizip II — Plusquamperfekt с sein'),
'waren':('waren + Partizip II — Plusquamperfekt з sein (множина)','waren + Partizip II — Plusquamperfekt с sein (множественное число)'),
'des':('des — Genitiv чоловічого/середнього роду','des — Genitiv мужского/среднего рода'),
'der':('der — артикль у Genitiv жіночого роду та множини (або відносний займенник)','der — артикль в Genitiv женского рода и множественного числа (или относительное местоимение)'),
}
PT={ # тема граматики -> загальне правило
'g3_konj2':('у нереальній умові чи бажанні потрібен Konjunktiv II','в нереальном условии или желании нужен Konjunktiv II'),
'g3_hoeflich':('у ввічливому проханні чи пораді потрібен Konjunktiv II','в вежливой просьбе или совете нужен Konjunktiv II'),
'g3_passiv':('пасив: werden/wurde + Partizip II','пассив: werden/wurde + Partizip II'),
'g3_passiv_modal':('пасив з модальним: модальне дієслово + Partizip II + werden','пассив с модальным: модальный глагол + Partizip II + werden'),
'g3_praeteritum':('потрібна правильна форма Präteritum цього дієслова','нужна правильная форма Präteritum этого глагола'),
'g3_plusquam':('дія раніше минулої: hatte/war + Partizip II','действие раньше прошедшего: hatte/war + Partizip II'),
'g3_temporal':('часове підрядне: у підрядному дієслово в кінці','временное придаточное: в придаточном глагол в конце'),
'g3_konzessiv':('причина чи протиставлення: weil/deshalb або obwohl/trotzdem','причина или противопоставление: weil/deshalb или obwohl/trotzdem'),
'g3_relativ':('відносний займенник: рід і число за іменником, відмінок за роллю в підрядному','относительное местоимение: род и число по существительному, падеж по роли в придаточном'),
'g3_genitiv':('Genitiv для приналежності та після wegen/trotz/während/statt','Genitiv для принадлежности и после wegen/trotz/während/statt'),
'g3_verben_praep':('дієслово вимагає постійного прийменника, питання — wo(r)-, відповідь — da(r)-','глагол требует постоянного предлога, вопрос — wo(r)-, ответ — da(r)-'),
'g3_indirekt':('непряме питання: питальне слово або ob, дієслово в кінці','косвенный вопрос: вопросительное слово или ob, глагол в конце'),
'g3_zweck':('мета й зміст: um … zu, damit, dass','цель и содержание: um … zu, damit, dass'),
'g3_doppelkonj':('подвійні сполучники виступають парами','двойные союзы выступают парами'),
}
VP={ # g3_verben_praep: індекс -> (дієслово uk, ru)
0:'warten auf + Akk',1:'denken an + Akk',2:'sich verlieben in + Akk',3:'sich freuen über + Akk',4:'sich interessieren für + Akk',5:'sich ärgern über + Akk',6:'träumen von + Dat',7:'teilnehmen an + Dat',8:'sich beschweren über + Akk',9:'Worauf — питання про річ (warten auf)',10:'Auf wen — питання про особу (warten auf)',11:'warten darauf, dass …',12:'sich freuen darauf, … zu',13:'sich interessieren für → Wofür'}
AMBIG={'war','waren','hatte','hatten','werden','wird','wurde','wurden','worden','der','des','von','durch','zu','um','als','Als'}
KT={'g3_temporal':{'als','Als','wenn','Wenn','bevor','Bevor','nachdem','Nachdem'},
 'g3_konzessiv':{'weil','obwohl','Obwohl','deshalb','trotzdem','Trotzdem'},
 'g3_indirekt':{'ob'},'g3_zweck':{'um','damit','dass','zu'},
 'g3_doppelkonj':{'sowohl … als auch','entweder … oder','weder … noch','nicht nur … sondern auch','sondern','zwar','desto'},
 'g3_passiv':{'wurde','wurden','worden','wird','von','durch'},'g3_passiv_modal':{'werden'},
 'g3_plusquam':{'hatte','hatten','war','waren'},'g3_relativ':{'dessen','deren'},'g3_genitiv':{'des','der'}}
PT['g3_temporal']=('часове підрядне речення: сполучник за змістом, у підрядному дієслово в кінці, а головне речення після нього починається з дієслова','временное придаточное: союз по смыслу, в придаточном глагол в конце, а главное предложение после него начинается с глагола')
def gen(w,a,uk,ru):
    return (f'«{w}» — тут не підходить: у реченні «{uk.replace("___",a)}» потрібно «{a}»', f'«{w}» — здесь не подходит: в предложении «{ru.replace("___",a)}» нужно «{a}»')
def reason(topic,i,a,w,uk,ru,grammar):
    if grammar:
        if topic=='g3_verben_praep' and i in VP:
            v=VP[i]; return (f'«{w}» — не підходить: тут {v}, правильно «{a}»', f'«{w}» — не подходит: здесь {v}, правильно «{a}»')
        if a in KT.get(topic,()) and a in KEY:
            k=KEY[a]; return (f'«{w}» — не підходить: {k[0]}, правильно «{a}»', f'«{w}» — не подходит: {k[1]}, правильно «{a}»')
        p=PT[topic]; return (f'«{w}» — не підходить: {p[0]}, правильно «{a}»', f'«{w}» — не подходит: {p[1]}, правильно «{a}»')
    if a in AMBIG: return gen(w,a,uk,ru)
    if a in KONJ: return (f'«{w}» — не підходить: нереальна умова чи ввічливе прохання вимагає Konjunktiv II, правильно «{a}»', f'«{w}» — не подходит: нереальное условие или вежливая просьба требует Konjunktiv II, правильно «{a}»')
    if a in PREP: return (f'«{w}» — не той прийменник: за керуванням дієслова чи вислову правильно «{a}»', f'«{w}» — не тот предлог: по управлению глагола или выражения правильно «{a}»')
    if a in KEY:
        k=KEY[a]; return (f'«{w}» — не підходить: {k[0]}, правильно «{a}»', f'«{w}» — не подходит: {k[1]}, правильно «{a}»')
    return gen(w,a,uk,ru)
def clean(t): return t.replace(';',',').replace('|','/')
gl=[];cl=[]
for g in ns['G']:
    seen=set()
    idx=0
    for x in g['gaps']:
        s,a,w,uk,ru=x.split('|')
        if s in seen: continue
        seen.add(s); ws=w.split(',')
        rs=[reason(g["id"],idx,a,v,s,s,True) for v in ws]
        gl.append(f"{g['id']}|{idx}|{a}|{';'.join(clean(r[0]) for r in rs)}|{';'.join(clean(r[1]) for r in rs)}")
        idx+=1
for bid,b in C.items():
    seen=set(); idx=0
    for x in b['gaps']:
        f=x.split('|'); s,a=f[0],f[1]
        if len(f)==6: w=f[2]+','+f[3]; uk,ru=f[4],f[5]
        else: w,uk,ru=f[2],f[3],f[4]
        if s in seen: continue
        seen.add(s); ws=w.split(',')
        rs=[reason(bid,idx,a,v,s,s,False) for v in ws]
        cl.append(f"{bid}|{idx}|{a}|{';'.join(clean(r[0]) for r in rs)}|{';'.join(clean(r[1]) for r in rs)}")
        idx+=1
open('content/why/b1.txt','w',encoding='utf8').write('\n'.join(gl)+'\n')
open('content/why/course_b1.txt','w',encoding='utf8').write('\n'.join(cl)+'\n')
print(len(gl),len(cl))
