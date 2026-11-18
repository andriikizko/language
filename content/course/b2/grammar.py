# -*- coding: utf-8 -*-
# Граматика B2. explain: (h_uk, p_uk, h_ru, p_ru). gap: "речення з ___|правильно|хибні|uk|ru"
G = []
def gr(**k): G.append(k)

gr(id='g4_konj1', title='Konjunktiv I: непряма мова', title_ru='Konjunktiv I: косвенная речь', sub='er sei, sie habe, es komme',
 explain=[
 ('Для чого', 'Konjunktiv I вживають у письмовій непрямій мові, коли передають чужі слова: Der Minister sagte, er sei zufrieden. Так журналіст дистанціюється від твердження.', 'Для чего', 'Konjunktiv I употребляют в письменной косвенной речи, когда передают чужие слова: Der Minister sagte, er sei zufrieden. Так журналист дистанцируется от утверждения.'),
 ('Утворення', 'Основа інфінітива + закінчення: er komme, sie habe, es gebe, wir seien. Виняток — sein: ich sei, du seiest, er sei, wir seien. Для минулого: er habe gearbeitet, sie sei gekommen.', 'Образование', 'Основа инфинитива + окончание: er komme, sie habe, es gebe, wir seien. Исключение — sein: ich sei, du seiest, er sei, wir seien. Для прошедшего: er habe gearbeitet, sie sei gekommen.'),
 ('Заміна на Konjunktiv II', 'Якщо форма Konjunktiv I збігається з Indikativ (sie haben, wir kommen), беруть Konjunktiv II: Sie sagten, sie hätten keine Zeit. Wir sagten, wir kämen später.', 'Замена на Konjunktiv II', 'Если форма Konjunktiv I совпадает с Indikativ (sie haben, wir kommen), берут Konjunktiv II: Sie sagten, sie hätten keine Zeit. Wir sagten, wir kämen später.'),
 ],
 gaps=[
 'Der Kanzler sagte, er ___ zufrieden.|sei|sein,seist,seid|Канцлер сказав, що він задоволений.|Канцлер сказал, что он доволен.',
 'Die Sprecherin erklärte, sie ___ morgen nach Berlin.|komme|kommen,kommest,kommst|Речниця пояснила, що завтра приїде до Берліна.|Пресс-секретарь объяснила, что завтра приедет в Берлин.',
 'Er sagte, er ___ das Buch schon gelesen.|habe|habt,habest,gehabt|Він сказав, що вже прочитав книжку.|Он сказал, что уже прочитал книгу.',
 'Sie sagte, sie ___ gestern angekommen.|sei|seien,seist,seid|Вона сказала, що прибула вчора.|Она сказала, что прибыла вчера.',
 'Die Politiker sagten, sie ___ keine Zeit.|hätten|haben,habe,hat|Політики сказали, що не мають часу.|Политики сказали, что у них нет времени.',
 'Wir sagten, wir ___ später.|kämen|kämest,kommet,gekommen|Ми сказали, що прийдемо пізніше.|Мы сказали, что придём позже.',
 'Der Arzt sagte, der Patient ___ sich erholt.|habe|habt,habest,gehabt|Лікар сказав, що пацієнт одужав.|Врач сказал, что пациент выздоровел.',
 'Er behauptete, es ___ keinen Grund zur Sorge.|gebe|gebt,geben,gäbt|Він стверджував, що причин для турботи немає.|Он утверждал, что причин для беспокойства нет.',
 'Sie meinte, die Preise ___ zu hoch.|seien|sein,seid,seist|Вона вважала, що ціни занадто високі.|Она считала, что цены слишком высоки.',
 ])

gr(id='g4_konj2_verg', title='Konjunktiv II у минулому', title_ru='Konjunktiv II в прошедшем', sub='hätte gemacht, wäre gekommen',
 explain=[
 ('Для чого', 'Ця форма виражає нереальне минуле: що могло б бути, але не сталося. Wenn ich früher aufgestanden wäre, hätte ich den Zug erreicht. (Але я проспав.) Ich hätte das nicht sagen sollen.', 'Для чего', 'Эта форма выражает нереальное прошлое: что могло бы быть, но не случилось. Wenn ich früher aufgestanden wäre, hätte ich den Zug erreicht. (Но я проспал.) Ich hätte das nicht sagen sollen.'),
 ('Утворення', 'hätte або wäre + Partizip II. Рух і зміна стану — wäre: wäre gekommen, wäre gewesen, wäre geworden. Решта — hätte: hätte gemacht, hätte gewusst. Для модальних: hätte … müssen/können/sollen (інфінітив у кінці).', 'Образование', 'hätte или wäre + Partizip II. Движение и изменение состояния — wäre: wäre gekommen, wäre gewesen, wäre geworden. Остальное — hätte: hätte gemacht, hätte gewusst. Для модальных: hätte … müssen/können/sollen (инфинитив в конце).'),
 ('Без wenn', 'Інверсія замінює wenn: Hätte ich das gewusst, wäre ich geblieben. Wäre er früher gekommen, hätten wir geredet. Допоміжне дієслово стоїть на першому місці.', 'Без wenn', 'Инверсия заменяет wenn: Hätte ich das gewusst, wäre ich geblieben. Wäre er früher gekommen, hätten wir geredet. Вспомогательный глагол стоит на первом месте.'),
 ],
 gaps=[
 'Wenn ich früher aufgestanden ___, hätte ich den Zug erreicht.|wäre|hätte,war,würde|Якби я раніше встав, я б устиг на потяг.|Если бы я встал раньше, я бы успел на поезд.',
 'Wenn er das gewusst ___, wäre er geblieben.|hätte|wäre,hat,hattet|Якби він це знав, він би залишився.|Если бы он это знал, он бы остался.',
 'Ich ___ das nicht sagen sollen.|hätte|wäre,hab,würde|Мені не слід було цього говорити.|Мне не следовало этого говорить.',
 'Wenn wir früher gekommen ___, hätten wir ihn getroffen.|wären|hätten,wärt,würden|Якби ми прийшли раніше, ми б його зустріли.|Если бы мы пришли раньше, мы бы его встретили.',
 '___ ich das gewusst, wäre ich geblieben.|Hätte|Wäre,Wenn,Würde|Якби я це знав, я б залишився.|Если бы я это знал, я бы остался.',
 '___ er früher gekommen, hätten wir geredet.|Wäre|Hätte,Wenn,Würde|Якби він прийшов раніше, ми б поговорили.|Если бы он пришёл раньше, мы бы поговорили.',
 'Das Wetter ___ besser sein können.|hätte|wäre,hätten,würde|Погода могла бути краще.|Погода могла бы быть лучше.',
 'Ohne deine Hilfe ___ ich es nicht geschafft.|hätte|wäre,hättest,hast|Без твоєї допомоги я б не впорався.|Без твоей помощи я бы не справился.',
 'Wenn sie Ärztin geworden ___, hätte sie mehr verdient.|wäre|hätte,würde,wart|Якби вона стала лікаркою, вона б заробляла більше.|Если бы она стала врачом, она бы зарабатывала больше.',
 ])

gr(id='g4_passiv_perf', title='Passiv Perfekt і Zustandspassiv', title_ru='Passiv Perfekt и Zustandspassiv', sub='ist gemacht worden / ist geöffnet',
 explain=[
 ('Passiv Perfekt', 'sein + Partizip II + worden: Das Experiment ist durchgeführt worden. Die Studie ist veröffentlicht worden. Це дія, що відбулася й завершилась. Worden — особлива форма werden у пасиві.', 'Passiv Perfekt', 'sein + Partizip II + worden: Das Experiment ist durchgeführt worden. Die Studie ist veröffentlicht worden. Это действие, которое произошло и завершилось. Worden — особая форма werden в пассиве.'),
 ('Zustandspassiv', 'sein + Partizip II (без worden): Das Geschäft ist geöffnet. Die Tür ist geschlossen. Це не дія, а стан, що настав після дії. Порівняйте: Die Tür wird geschlossen (дія) / Die Tür ist geschlossen (стан).', 'Zustandspassiv', 'sein + Partizip II (без worden): Das Geschäft ist geöffnet. Die Tür ist geschlossen. Это не действие, а состояние, наступившее после действия. Сравните: Die Tür wird geschlossen (действие) / Die Tür ist geschlossen (состояние).'),
 ('Passiv із модальними', 'Модальне + Partizip II + werden: Der Antrag muss geprüft werden. Die Fehler konnten behoben werden. Перфект майже не вживають: замість нього Präteritum модального.', 'Пассив с модальными', 'Модальный + Partizip II + werden: Der Antrag muss geprüft werden. Die Fehler konnten behoben werden. Перфект почти не употребляют: вместо него Präteritum модального.'),
 ],
 gaps=[
 'Das Experiment ist gestern durchgeführt ___.|worden|geworden,werden,wurde|Експеримент було проведено вчора.|Эксперимент был проведён вчера.',
 'Die Studie ist schon veröffentlicht ___.|worden|werden,wurde,geworden|Дослідження вже опубліковано.|Исследование уже опубликовано.',
 'Das Geschäft ___ geöffnet.|ist|hat,hatte,haben|Магазин відкритий (стан).|Магазин открыт (состояние).',
 'Die Tür ___ geschlossen (jetzt, Zustand).|ist|hat,hatte,haben|Двері зачинені (зараз, стан).|Дверь закрыта (сейчас, состояние).',
 'Der Antrag muss geprüft ___.|werden|worden,sein,wird|Заяву треба перевірити.|Заявление нужно проверить.',
 'Die Fehler konnten schnell behoben ___.|werden|worden,wurden,geworden|Помилки можна було швидко усунути.|Ошибки удалось быстро устранить.',
 'Die Daten sind sorgfältig ___ worden.|ausgewertet|auswertet,auswerten,ausgewertet worden|Дані ретельно опрацьовано.|Данные тщательно обработаны.',
 'Der Brief ist gestern ___ worden.|geschickt|schicken,schickt,geschickten|Лист було надіслано вчора.|Письмо было отправлено вчера.',
 'Das Fenster ___ schon geschlossen.|ist|hat,hatte,haben|Вікно вже зачинене (стан).|Окно уже закрыто (состояние).',
 ])

gr(id='g4_partizip', title='Partizip I і II як означення', title_ru='Partizip I и II как определение', sub='die steigenden / die gestiegenen Preise',
 explain=[
 ('Partizip I', 'Інфінітив + d: steigend, lachend, überzeugend. Означає дію, що триває зараз: die steigenden Preise (які зростають), das schlafende Kind (яка спить). Закінчення — як у прикметника.', 'Partizip I', 'Инфинитив + d: steigend, lachend, überzeugend. Означает действие, которое идёт сейчас: die steigenden Preise (которые растут), das schlafende Kind (которое спит). Окончание — как у прилагательного.'),
 ('Partizip II', 'Результат або пасив: die gestiegenen Preise (що зросли), das gelöste Problem (яке розв\'язали), die veröffentlichte Studie. Для дієслів руху й зміни стану — результат дії; для перехідних — пасивне значення.', 'Partizip II', 'Результат или пассив: die gestiegenen Preise (которые выросли), das gelöste Problem (которое решили), die veröffentlichte Studie. Для глаголов движения и смены состояния — результат действия; для переходных — пассивное значение.'),
 ('Розширене означення', 'Усе означення стоїть між артиклем і іменником: Die seit zwei Jahren in Deutschland lebende Frau arbeitet hier. Der von Kritikern gelobte Roman wurde verfilmt. Це типово для письмових текстів.', 'Распространённое определение', 'Всё определение стоит между артиклем и существительным: Die seit zwei Jahren in Deutschland lebende Frau arbeitet hier. Der von Kritikern gelobte Roman wurde verfilmt. Это типично для письменных текстов.'),
 ],
 gaps=[
 'Das sind die ___ Preise (sie steigen gerade).|steigenden|gestiegenen,steigende,steigendes|Це ціни, що зараз зростають.|Это цены, которые сейчас растут.',
 'Das ___ Kind liegt im Bett.|schlafende|geschlafene,schlafendes,schlafenden|Дитина, що спить, лежить у ліжку.|Спящий ребёнок лежит в кровати.',
 'Die ___ Studie wurde im März veröffentlicht.|untersuchte|untersuchende,untersuchtes,untersuchter|Досліджувана студія була опублікована в березні.|Исследуемая студия была опубликована в марте.',
 'Das ___ Problem muss nicht mehr besprochen werden.|gelöste|lösende,gelöstes,gelösten|Розв\'язану проблему вже не треба обговорювати.|Решённую проблему больше не нужно обсуждать.',
 'Die ___ Preise machen vielen Sorgen (sie sind schon gestiegen).|gestiegenen|gestiegener,gestiegenes,gestiegen|Зросли ціни непокоять багатьох.|Выросшие цены беспокоят многих.',
 'Eine ___ Theorie hat mich begeistert (sie überzeugt).|überzeugende|überzeugte,überzeugend,überzeugendes|Мене захопила переконлива теорія.|Меня вдохновила убедительная теория.',
 'Der von Kritikern ___ Roman wurde verfilmt.|gelobte|lobende,gelobt,lobte|Роман, який хвалили критики, екранізували.|Роман, который хвалили критики, экранизировали.',
 'Die seit zwei Jahren hier ___ Frau arbeitet als Ärztin.|lebende|lebte,gelebte,lebendes|Жінка, яка два роки живе тут, працює лікаркою.|Женщина, которая два года живёт здесь, работает врачом.',
 'Das ___ Buch ist jetzt im Kino (man hat viel darüber diskutiert).|diskutierte|diskutierende,diskutiertes,diskutierten|Книжка, яку багато обговорювали, тепер у кіно.|Книга, которую много обсуждали, теперь в кино.',
 ])

gr(id='g4_nominal', title='Номінальний стиль і прийменники з Genitiv', title_ru='Номинальный стиль и предлоги с Genitiv', sub='aufgrund, angesichts, infolge, mithilfe',
 explain=[
 ('Номінальний стиль', 'У діловій мові замість підрядного вживають іменник: Wenn der Vertrag gekündigt wird → Bei Kündigung des Vertrags. Nachdem er das Gerät prüfte → Nach Prüfung des Geräts. Текст стає коротшим і офіційнішим.', 'Номинальный стиль', 'В деловой речи вместо придаточного употребляют существительное: Wenn der Vertrag gekündigt wird → Bei Kündigung des Vertrags. Nachdem er das Gerät prüfte → Nach Prüfung des Geräts. Текст становится короче и официальнее.'),
 ('Прийменники з Genitiv', 'aufgrund, angesichts, infolge, anhand, mithilfe, innerhalb, außerhalb, trotz, wegen: Aufgrund der Krise sparen Firmen. Angesichts der Lage ist Vorsicht nötig. Mithilfe moderner Technik sinkt der Verbrauch.', 'Предлоги с Genitiv', 'aufgrund, angesichts, infolge, anhand, mithilfe, innerhalb, außerhalb, trotz, wegen: Aufgrund der Krise sparen Firmen. Angesichts der Lage ist Vorsicht nötig. Mithilfe moderner Technik sinkt der Verbrauch.'),
 ('Іменники з -ung', 'Багато дієслів дають іменники: prüfen → die Prüfung, entwickeln → die Entwicklung, erhöhen → die Erhöhung. Тут стоїть Genitiv: die Erhöhung der Preise, die Entwicklung des Marktes.', 'Существительные на -ung', 'Многие глаголы дают существительные: prüfen → die Prüfung, entwickeln → die Entwicklung, erhöhen → die Erhöhung. Тут стоит Genitiv: die Erhöhung der Preise, die Entwicklung des Marktes.'),
 ],
 gaps=[
 'Aufgrund ___ Krise sparen viele Firmen.|der|die,den,dem|Через кризу багато фірм економлять.|Из-за кризиса многие фирмы экономят.',
 'Angesichts ___ Lage ist Vorsicht nötig.|der|die,den,dem|З огляду на ситуацію потрібна обережність.|Ввиду ситуации необходима осторожность.',
 'Mithilfe ___ Technik sinkt der Verbrauch.|moderner|moderne,modernen,modernem|За допомогою сучасної техніки споживання знижується.|С помощью современной техники потребление снижается.',
 'Infolge ___ Streiks fielen viele Züge aus.|des|der,dem,den|Унаслідок страйку багато потягів скасували.|Вследствие забастовки многие поезда отменили.',
 'Bei ___ des Vertrags gilt eine Frist.|Kündigung|Kündigen,Kündigungen,Gekündigt|У разі розірвання договору діє термін.|При расторжении договора действует срок.',
 'Die ___ der Preise belastet die Haushalte.|Erhöhung|Erhöhen,Erhöht,Erhöhungen|Підвищення цін навантажує домогосподарства.|Повышение цен нагружает домохозяйства.',
 'Nach ___ des Geräts wurde es freigegeben.|Prüfung|Prüfen,Geprüft,Prüfungen|Після перевірки пристрій допустили.|После проверки устройство допустили.',
 '___ der Schwierigkeiten hat sie es geschafft.|Trotz|Ohne,Bei,Zu|Попри труднощі, їй це вдалося.|Несмотря на трудности, ей это удалось.',
 'Innerhalb ___ Woche müssen Sie antworten.|einer|eine,einem,einen|Протягом тижня ви мусите відповісти.|В течение недели вы должны ответить.',
 ])

gr(id='g4_futur2', title='Futur I і II як припущення', title_ru='Futur I и II как предположение', sub='er wird schon da sein / gelesen haben',
 explain=[
 ('Futur I', 'werden + інфінітив: Die KI wird viele Berufe verändern. Виражає прогноз, намір або припущення про теперішнє: Er wird jetzt zu Hause sein.', 'Futur I', 'werden + инфинитив: Die KI wird viele Berufe verändern. Выражает прогноз, намерение или предположение о настоящем: Er wird jetzt zu Hause sein.'),
 ('Futur II', 'werden + Partizip II + haben/sein: Er wird den Brief schon gelesen haben. Sie wird gestern angekommen sein. Це припущення про минуле або дію, яка завершиться до певного моменту: Bis morgen werde ich es geschafft haben.', 'Futur II', 'werden + Partizip II + haben/sein: Er wird den Brief schon gelesen haben. Sie wird gestern angekommen sein. Это предположение о прошлом или действие, которое завершится к определённому моменту: Bis morgen werde ich es geschafft haben.'),
 ('Слова-підсилювачі', 'Припущення часто супроводжують слова: wohl, schon, vermutlich, wahrscheinlich: Er wird wohl krank sein. Він, імовірно, хворий.', 'Слова-усилители', 'Предположение часто сопровождают слова: wohl, schon, vermutlich, wahrscheinlich: Er wird wohl krank sein. Он, вероятно, болен.'),
 ],
 gaps=[
 'Er ___ jetzt wohl zu Hause sein.|wird|werde,wurde,ist|Він, імовірно, зараз удома.|Он, вероятно, сейчас дома.',
 'Die Technik ___ unser Leben verändern.|wird|wurde,werden,ward|Техніка змінить наше життя.|Техника изменит нашу жизнь.',
 'Er wird den Brief schon gelesen ___.|haben|sein,werden,hat|Він, мабуть, уже прочитав листа.|Он, наверное, уже прочитал письмо.',
 'Sie wird gestern angekommen ___.|sein|haben,werden,ist|Вона, мабуть, прибула вчора.|Она, вероятно, приехала вчера.',
 'Bis morgen ___ ich es geschafft haben.|werde|werden,wurde,bin|До завтра я це вже зроблю.|К завтрашнему дню я это уже сделаю.',
 'Die Regierung wird die Folgen unterschätzt ___.|haben|sein,werden,hatte|Уряд, імовірно, недооцінив наслідки.|Правительство, вероятно, недооценило последствия.',
 'Er wird wohl krank ___.|sein|haben,werden,ist|Він, мабуть, хворий.|Он, вероятно, болен.',
 'Wir ___ mehr Daten speichern müssen.|werden|wurden,wird,wären|Нам доведеться зберігати більше даних.|Нам придётся хранить больше данных.',
 'In zehn Jahren wird es viele neue Berufe ___.|geben|gibt,gegeben,gab|Через десять років буде багато нових професій.|Через десять лет будет много новых профессий.',
 ])

gr(id='g4_infinitiv', title='Infinitiv з zu: um, ohne, statt', title_ru='Infinitiv с zu: um, ohne, statt', sub='um … zu, ohne … zu, (an)statt … zu',
 explain=[
 ('um … zu', 'Мета: Er trainiert, um gesund zu bleiben. Підмет в обох частинах той самий. Якщо підмети різні — damit: Er erklärt es, damit wir es verstehen.', 'um … zu', 'Цель: Er trainiert, um gesund zu bleiben. Подлежащее в обеих частях одно и то же. Если подлежащие разные — damit: Er erklärt es, damit wir es verstehen.'),
 ('ohne … zu, (an)statt … zu', 'Ohne … zu — без того, щоб: Er ging, ohne sich zu verabschieden. (An)statt … zu — замість того, щоб: Statt zu lernen, sah er fern. При різних підметах: ohne dass, statt dass.', 'ohne … zu, (an)statt … zu', 'Ohne … zu — не делая: Er ging, ohne sich zu verabschieden. (An)statt … zu — вместо того чтобы: Statt zu lernen, sah er fern. При разных подлежащих: ohne dass, statt dass.'),
 ('zu з відокремлюваними префіксами', 'zu стоїть між префіксом і коренем: aufzustehen, anzufangen, mitzumachen, einzukaufen. Без zu — після модальних і lassen.', 'zu с отделяемыми приставками', 'zu стоит между приставкой и корнем: aufzustehen, anzufangen, mitzumachen, einzukaufen. Без zu — после модальных и lassen.'),
 ],
 gaps=[
 'Er trainiert, ___ gesund zu bleiben.|um|weil,dass,obwohl|Він тренується, щоб лишатися здоровим.|Он тренируется, чтобы оставаться здоровым.',
 'Er erklärt es, ___ wir es verstehen.|damit|um,ohne,statt|Він пояснює це, щоб ми зрозуміли.|Он объясняет это, чтобы мы поняли.',
 'Er ging, ___ sich zu verabschieden.|ohne|weil,statt dass,damit|Він пішов, не попрощавшись.|Он ушёл, не попрощавшись.',
 '___ zu lernen, sah er fern.|Statt|Damit,Weil,Obwohl|Замість того щоб вчитися, він дивився телевізор.|Вместо того чтобы учиться, он смотрел телевизор.',
 'Es ist wichtig, früh ___.|aufzustehen|aufstehen,zu aufstehen,aufgestanden|Важливо рано вставати.|Важно рано вставать.',
 'Ich habe vor, morgen ___.|einzukaufen|einkaufen,zu einkaufen,eingekauft|Я збираюся завтра піти по покупки.|Я собираюсь завтра пойти за покупками.',
 'Sie arbeitet viel, ___ Geld zu sparen.|um|damit,ohne dass,statt dass|Вона багато працює, щоб заощаджувати гроші.|Она много работает, чтобы копить деньги.',
 'Er hilft uns, ___ dass wir ihn darum bitten.|ohne|um,damit,statt zu|Він допомагає нам, хоч ми його й не просимо.|Он помогает нам, хотя мы его не просим.',
 'Man kann viel sparen, ___ man das Licht ausschaltet.|indem|um zu,ohne zu,statt zu|Можна багато заощадити, вимикаючи світло.|Можно много сэкономить, выключая свет.',
 ])

gr(id='g4_konnektoren', title='Спосіб, наслідок, умова: indem, sodass, je … desto', title_ru='Способ, следствие, условие: indem, sodass, je … desto', sub='indem, sodass, dadurch dass, je … desto',
 explain=[
 ('indem, dadurch dass', 'Indem — спосіб: Man spart Energie, indem man das Licht ausschaltet. Dadurch dass — завдяки тому, що: Dadurch dass er viel übte, wurde er besser. Дієслово в підрядному — в кінці.', 'indem, dadurch dass', 'Indem — способ: Man spart Energie, indem man das Licht ausschaltet. Dadurch dass — благодаря тому, что. Глагол в придаточном — в конце.'),
 ('sodass, so … dass', 'Наслідок: Es regnete lange, sodass das Wasser stieg. Es war so heiß, dass die Ernte vertrocknete. So … dass підсилює прикметник або прислівник.', 'sodass, so … dass', 'Следствие: Es regnete lange, sodass das Wasser stieg. Es war so heiß, dass die Ernte vertrocknete. So … dass усиливает прилагательное или наречие.'),
 ('je … desto/umso', 'Порівняльна залежність: Je mehr man übt, desto besser wird man. Після je — дієслово в кінці, після desto — одразу дієслово. Обидві частини в порівняльному ступені.', 'je … desto/umso', 'Сравнительная зависимость: Je mehr man übt, desto besser wird man. После je — глагол в конце, после desto — сразу глагол. Обе части в сравнительной степени.'),
 ],
 gaps=[
 'Man spart Energie, ___ man das Licht ausschaltet.|indem|sodass,damit,obwohl|Енергію заощаджують, вимикаючи світло.|Энергию экономят, выключая свет.',
 'Es regnete lange, ___ das Wasser stieg.|sodass|indem,damit,obwohl|Дощ ішов довго, так що вода піднялася.|Дождь шёл долго, так что вода поднялась.',
 'Es war so heiß, ___ die Ernte vertrocknete.|dass|damit,indem,ob|Було так спекотно, що врожай засох.|Было так жарко, что урожай засох.',
 'Je mehr man übt, ___ besser wird man.|desto|je,so,wie|Чим більше вправляєшся, тим кращим стаєш.|Чем больше упражняешься, тем лучше становишься.',
 'Je früher du anfängst, ___ besser.|desto|als,wie,so|Чим раніше почнеш, тим краще.|Чем раньше начнёшь, тем лучше.',
 'Je höher die Nachfrage ___, desto höher werden die Preise.|ist|sind,wird,sein|Що вищий попит, то вищі ціни.|Чем выше спрос, тем выше цены.',
 'Er hat viel gelernt, ___ er die Prüfung bestanden hat.|sodass|indem,obwohl,weil dass|Він багато вчив, так що склав іспит.|Он много учил, так что сдал экзамен.',
 'Man lernt eine Sprache, ___ man sie spricht.|indem|sodass,damit,obwohl|Мову вивчають, говорячи нею.|Язык учат, разговаривая на нём.',
 'Es ist so laut, ___ ich nichts verstehe.|dass|damit,obwohl,indem|Так гучно, що я нічого не розумію.|Так шумно, что я ничего не понимаю.',
 ])

gr(id='g4_relativ', title='Відносні речення: прийменник, was, wo', title_ru='Относительные предложения: предлог, was, wo', sub='über das, mit dem, alles was, wo',
 explain=[
 ('З прийменником', 'Прийменник стоїть перед відносним займенником: Das Buch, über das alle sprechen, ist neu. Der Mann, mit dem ich arbeite, ist nett. Die Stadt, in der ich wohne, ist klein. Рід і число — від іменника, відмінок — від прийменника.', 'С предлогом', 'Предлог стоит перед относительным местоимением: Das Buch, über das alle sprechen, ist neu. Der Mann, mit dem ich arbeite, ist nett. Die Stadt, in der ich wohne, ist klein. Род и число — от существительного, падеж — от предлога.'),
 ('was', 'Після alles, nichts, etwas, das, dasselbe, viel, einiges, а також коли відноситься до цілого речення: Alles, was ich weiß, ist wenig. Er kam zu spät, was mich ärgerte.', 'was', 'После alles, nichts, etwas, das, dasselbe, viel, einiges, а также когда относится ко всему предложению: Alles, was ich weiß, ist wenig. Er kam zu spät, was mich ärgerte.'),
 ('wo і wo(r)- + прийменник', 'Wo — для місця: Das Labor, wo die Versuche stattfinden. Wo(r)- + прийменник замінює відносний займенник при неживому: Das ist das Gerät, womit man misst. Wofür, worüber, woran.', 'wo и wo(r)- + предлог', 'Wo — для места: Das Labor, wo die Versuche stattfinden. Wo(r)- + предлог заменяет относительное местоимение при неодушевлённом: Das ist das Gerät, womit man misst. Wofür, worüber, woran.'),
 ],
 gaps=[
 'Das Buch, ___ alle sprechen, ist neu.|über das|über dem,über den,über der|Книжка, про яку всі говорять, нова.|Книга, о которой все говорят, новая.',
 'Der Mann, mit ___ ich arbeite, ist nett.|dem|den,der,das|Чоловік, з яким я працюю, милий.|Мужчина, с которым я работаю, милый.',
 'Die Stadt, in ___ ich wohne, ist klein.|der|die,den,dem|Місто, у якому я живу, невелике.|Город, в котором я живу, небольшой.',
 'Alles, ___ ich weiß, ist wenig.|was|wen,wo,wer|Усе, що я знаю, — небагато.|Всё, что я знаю, — немного.',
 'Er kam zu spät, ___ mich ärgerte.|was|wen,wo,wer|Він запізнився, що мене розсердило.|Он опоздал, что меня рассердило.',
 'Das Labor, ___ die Versuche stattfinden, ist neu.|wo|was,wer,wie|Лабораторія, де проходять досліди, нова.|Лаборатория, где проходят опыты, новая.',
 'Das ist das Gerät, ___ man die Temperatur misst.|womit|wofür,wovon,wohin|Це прилад, яким вимірюють температуру.|Это прибор, которым измеряют температуру.',
 'Die Frau, ___ ich geholfen habe, ist Ärztin.|der|die,den,dem|Жінка, якій я допоміг, лікарка.|Женщина, которой я помог, врач.',
 'Das ist etwas, ___ ich nie vergessen werde.|was|wen,wo,wer|Це те, що я ніколи не забуду.|Это то, что я никогда не забуду.',
 ])

gr(id='g4_verben_praep', title='Дієслова з прийменниками (B2)', title_ru='Глаголы с предлогами (B2)', sub='sich verlassen auf, haften für, beruhen auf',
 explain=[
 ('Akkusativ', 'sich verlassen auf, achten auf, verzichten auf, sich berufen auf, haften für, sich beschweren über, sich konzentrieren auf, Anspruch haben auf. Приклад: Ich verlasse mich auf das System. Er haftet für alle Schäden.', 'Akkusativ', 'sich verlassen auf, achten auf, verzichten auf, sich berufen auf, haften für, sich beschweren über, sich konzentrieren auf, Anspruch haben auf. Пример: Ich verlasse mich auf das System. Er haftet für alle Schäden.'),
 ('Dativ', 'abhängen von, beruhen auf (Dat!), sich beschäftigen mit, teilnehmen an, sich schützen vor, sich unterscheiden von, leiden unter. Приклад: Es hängt vom Wetter ab. Man schützt sich vor Hackern.', 'Dativ', 'abhängen von, beruhen auf (Dat!), sich beschäftigen mit, teilnehmen an, sich schützen vor, sich unterscheiden von, leiden unter. Пример: Es hängt vom Wetter ab. Man schützt sich vor Hackern.'),
 ('da(r)- і wo(r)-', 'Замість прийменник + займенник для неживого: Ich warte darauf. Worauf wartest du? Перед голосною додається r: darauf, worüber, woran.', 'da(r)- и wo(r)-', 'Вместо предлог + местоимение для неодушевлённого: Ich warte darauf. Worauf wartest du? Перед гласной добавляется r: darauf, worüber, woran.'),
 ],
 gaps=[
 'Ich verlasse mich ___ das System.|auf|an,für,über|Я покладаюся на систему.|Я полагаюсь на систему.',
 'Der Hersteller haftet ___ alle Schäden.|für|auf,an,über|Виробник відповідає за всі збитки.|Производитель отвечает за весь ущерб.',
 'Es hängt ___ Wetter ab.|vom|auf dem,im,am|Це залежить від погоди.|Это зависит от погоды.',
 'Man schützt sich ___ Hackern.|vor|gegen,für,an|Захищаються від хакерів.|Защищаются от хакеров.',
 'Sie beschäftigt sich ___ künstlicher Intelligenz.|mit|an,für,auf|Вона займається штучним інтелектом.|Она занимается искусственным интеллектом.',
 'Wir nehmen ___ einem Kurs teil.|an|auf,für,zu|Ми беруть участь у курсі.|Мы участвуем в курсе.',
 'Er klagt ___ die Firma.|gegen|auf,über,für|Він подає позов проти фірми.|Он подаёт иск против фирмы.',
 'Ich warte ___ deine Antwort.|auf|an,für,über|Я чекаю на твою відповідь.|Я жду твоего ответа.',
 '___ wartest du? — Auf den Bus.|Worauf|Wofür,Womit,Wovon|На що ти чекаєш? — На автобус.|Чего ты ждёшь? — Автобус.',
 'Sie beschwert sich ___ den Lärm.|über|auf,für,mit|Вона скаржиться на шум.|Она жалуется на шум.',
 ])

gr(id='g4_lassen', title='lassen і sich lassen', title_ru='lassen и sich lassen', sub='ich lasse machen / es lässt sich machen',
 explain=[
 ('lassen: дозволити, залишити, замовити', 'Lassen як повне дієслово: Er lässt das Buch hier. Як модальне з інфінітивом: Ich lasse mein Auto reparieren. Sie lässt sich die Haare schneiden. Дію виконує інша особа.', 'lassen: позволить, оставить, заказать', 'Lassen как полный глагол: Er lässt das Buch hier. Как модальный с инфинитивом: Ich lasse mein Auto reparieren. Sie lässt sich die Haare schneiden. Действие выполняет другое лицо.'),
 ('Perfekt з lassen', 'З інфінітивом — подвійний інфінітив: Ich habe mich impfen lassen. Er hat das Auto reparieren lassen. Без інфінітива — gelassen: Er hat das Buch hier gelassen.', 'Perfekt с lassen', 'С инфинитивом — двойной инфинитив: Ich habe mich impfen lassen. Er hat das Auto reparieren lassen. Без инфинитива — gelassen: Er hat das Buch hier gelassen.'),
 ('sich lassen + Infinitiv', 'Альтернатива пасиву з can: Das lässt sich ändern = Das kann geändert werden. Das Problem lässt sich lösen. Die Frage lässt sich nicht beantworten.', 'sich lassen + Infinitiv', 'Альтернатива пассиву с can: Das lässt sich ändern = Das kann geändert werden. Das Problem lässt sich lösen. Die Frage lässt sich nicht beantworten.'),
 ],
 gaps=[
 'Er ___ das Buch zu Hause.|lässt|lasst,lasse,lassen|Він залишає книжку вдома.|Он оставляет книгу дома.',
 'Ich ___ mein Auto reparieren.|lasse|lässt,lasst,lasse mich|Я віддаю авто в ремонт.|Я отдаю машину в ремонт.',
 'Sie lässt sich die Haare ___.|schneiden|geschnitten,schneidet,schnitten|Їй стрижуть волосся.|Ей стригут волосы.',
 'Ich habe mich impfen ___.|lassen|gelassen,lässt,ließ|Я зробив щеплення.|Я сделал прививку.',
 'Er hat das Buch hier ___.|gelassen|lassen,lässt,ließen|Він залишив книжку тут.|Он оставил книгу здесь.',
 'Das Problem lässt sich leicht ___.|lösen|gelöst,löst,löste|Цю проблему легко розв\'язати.|Эту проблему легко решить.',
 'Die Frage lässt ___ nicht beantworten.|sich|mich,dich,ihn|На це питання не можна відповісти.|На этот вопрос нельзя ответить.',
 'Wir ___ uns beraten.|lassen|lasst,lässt,ließ|Ми консультуємося (нас консультують).|Мы консультируемся (нас консультируют).',
 'Er hat sich einen Anzug ___ lassen.|machen|gemacht,macht,machte|Він пошив собі костюм.|Он заказал себе костюм.',
 ])

gr(id='g4_konzessiv', title='Уступка: obwohl, trotz, zwar … aber', title_ru='Уступка: obwohl, trotz, zwar … aber', sub='obwohl, trotzdem, trotz, zwar … aber, wenn auch',
 explain=[
 ('obwohl і trotz', 'Obwohl + підрядне (дієслово в кінці): Obwohl er müde ist, arbeitet er. Trotz + Genitiv: Trotz seiner Müdigkeit arbeitet er. Обидва виражають «хоч».', 'obwohl и trotz', 'Obwohl + придаточное (глагол в конце): Obwohl er müde ist, arbeitet er. Trotz + Genitiv: Trotz seiner Müdigkeit arbeitet er. Оба выражают «хотя».'),
 ('trotzdem, dennoch', 'Прислівники: після них дієслово на другому місці: Er ist müde, trotzdem arbeitet er. Er ist müde, dennoch arbeitet er weiter.', 'trotzdem, dennoch', 'Наречия: после них глагол на втором месте: Er ist müde, trotzdem arbeitet er. Er ist müde, dennoch arbeitet er weiter.'),
 ('zwar … aber, wenn auch', 'Zwar … aber: Er ist zwar jung, aber sehr erfahren. Wenn auch: Das Ergebnis ist gut, wenn auch nicht perfekt. Часто ставлять перед виправленням.', 'zwar … aber, wenn auch', 'Zwar … aber: Er ist zwar jung, aber sehr erfahren. Wenn auch: Das Ergebnis ist gut, wenn auch nicht perfekt. Часто ставят перед поправкой.'),
 ],
 gaps=[
 '___ er müde ist, arbeitet er weiter.|Obwohl|Trotz,Trotzdem,Damit|Хоч він утомлений, він працює далі.|Хотя он устал, он продолжает работать.',
 '___ seiner Müdigkeit arbeitet er weiter.|Trotz|Obwohl,Trotzdem,Wegen|Попри втому він працює далі.|Несмотря на усталость, он продолжает работать.',
 'Er ist müde, ___ arbeitet er weiter.|trotzdem|obwohl,trotz,weil|Він утомлений, проте працює далі.|Он устал, тем не менее продолжает работать.',
 'Er ist müde, ___ arbeitet er weiter.|dennoch|obwohl,trotz,ob|Він утомлений, проте працює далі.|Он устал, однако продолжает работать.',
 'Er ist ___ jung, aber sehr erfahren.|zwar|zwei,wahr,wer|Він хоч і молодий, але дуже досвідчений.|Он хоть и молод, но очень опытен.',
 'Das Ergebnis ist gut, ___ auch nicht perfekt.|wenn|obwohl,trotz,weil|Результат хороший, хоч і не ідеальний.|Результат хороший, хотя и не идеальный.',
 '___ des Regens fand das Fest statt.|Trotz|Obwohl,Trotzdem,Weil|Попри дощ свято відбулося.|Несмотря на дождь, праздник состоялся.',
 '___ es regnete, fand das Fest statt.|Obwohl|Trotz,Trotzdem,Wegen|Хоч ішов дощ, свято відбулося.|Хотя шёл дождь, праздник состоялся.',
 'Es regnete, ___ fand das Fest statt.|trotzdem|obwohl,trotz,wegen|Ішов дощ, проте свято відбулося.|Шёл дождь, тем не менее праздник состоялся.',
 ])

gr(id='g4_modalpart', title='sollte, dürfte, müsste: припущення', title_ru='sollte, dürfte, müsste: предположение', sub='er dürfte da sein, das müsste reichen',
 explain=[
 ('Конъюнктив модальних', 'Konjunktiv II модальних пом\'якшує твердження: Das könnte stimmen. Er müsste inzwischen angekommen sein. Das dürfte reichen. Es sollte gehen. Це обережні припущення про те, що ймовірно.', 'Конъюнктив модальных', 'Konjunktiv II модальных смягчает утверждение: Das könnte stimmen. Er müsste inzwischen angekommen sein. Das dürfte reichen. Es sollte gehen. Это осторожные предположения о вероятном.'),
 ('Ввічливе прохання', 'Könnten Sie mir helfen? Dürfte ich Sie bitten, die Tür zu schließen? Würden Sie bitte kurz warten? Це ввічливіше, ніж Können Sie? / Dürfen Sie?', 'Вежливая просьба', 'Könnten Sie mir helfen? Dürfte ich Sie bitten, die Tür zu schließen? Würden Sie bitte kurz warten? Это вежливее, чем Können Sie? / Dürfen Sie?'),
 ('Порада', 'Du solltest mehr schlafen. Er müsste mehr Sport treiben. Ihr könntet früher anfangen. Рада без категоричності.', 'Совет', 'Du solltest mehr schlafen. Er müsste mehr Sport treiben. Ihr könntet früher anfangen. Совет без категоричности.'),
 ],
 gaps=[
 'Das ___ stimmen (wahrscheinlich).|könnte|gekonnt,können,könnten|Це, можливо, правда.|Это, возможно, правда.',
 'Er ___ inzwischen angekommen sein.|müsste|gemusst,müssen,müsstest|Він, мабуть, уже прибув.|Он, наверное, уже приехал.',
 'Das ___ reichen.|dürfte|dürften,dürfen,gedurft|Цього, імовірно, вистачить.|Этого, вероятно, хватит.',
 'Es ___ gehen.|sollte|sollen,solltest,gesollt|Це, мабуть, вийде.|Это, вероятно, получится.',
 '___ Sie mir bitte helfen?|Könnten|Konnten,Gekonnt,Kannten|Чи не могли б ви мені допомогти?|Не могли бы вы мне помочь?',
 '___ ich Sie bitten, die Tür zu schließen?|Dürfte|Dürften,Dürfst,Gedurft|Чи міг би я вас попросити зачинити двері?|Мог бы я вас попросить закрыть дверь?',
 'Du ___ mehr schlafen.|solltest|gesollt,sollt,solltet|Тобі слід би спати більше.|Тебе следовало бы спать больше.',
 'Ihr ___ früher anfangen.|könntet|gekonnt,könnten,könntest|Ви могли б розпочати раніше.|Вы могли бы начать раньше.',
 'Er ___ mehr Sport treiben.|müsste|gemusst,müssen,müsstest|Йому слід би більше займатися спортом.|Ему следовало бы больше заниматься спортом.',
 ])
