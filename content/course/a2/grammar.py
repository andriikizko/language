# -*- coding: utf-8 -*-
# Граматика A2. explain: (h_uk, p_uk, h_ru, p_ru). gap: "речення з ___|правильно|хибні|uk|ru"
G = []
def gr(**k): G.append(k)

gr(id='g2_perfekt_haben', title='Perfekt з haben', title_ru='Perfekt с haben', sub='ich habe gemacht',
 explain=[
 ('Будова', 'Perfekt = haben у теперішньому часі + Partizip II в кінці: Ich habe Pizza gegessen. Він має ein Buch gelesen. Це основний минулий час у розмові.', 'Строение', 'Perfekt = haben в настоящем времени + Partizip II в конце: Ich habe Pizza gegessen. Er hat ein Buch gelesen. Это основное прошедшее время в разговоре.'),
 ('Partizip II', 'Правильні дієслова: ge + основа + t: machen → gemacht, spielen → gespielt. Неправильні: ge + ...en: sehen → gesehen, lesen → gelesen, essen → gegessen. Їх треба вчити.', 'Partizip II', 'Правильные глаголы: ge + основа + t: machen → gemacht, spielen → gespielt. Неправильные: ge + ...en: sehen → gesehen, lesen → gelesen, essen → gegessen. Их надо учить.'),
 ('Без ge- і відокремлювані', 'Без ge-: дієслова на -ieren і з приставками be-, ver-, er-, ent-: frühstücken → gefrühstückt, aber: studieren → studiert, besuchen → besucht. Відокремлювані: ge між приставкою й основою: ausfüllen → ausgefüllt, einkaufen → eingekauft.', 'Без ge- и отделяемые', 'Без ge-: глаголы на -ieren и с приставками be-, ver-, er-, ent-: studieren → studiert, besuchen → besucht. Отделяемые: ge между приставкой и основой: ausfüllen → ausgefüllt, einkaufen → eingekauft.'),
 ],
 gaps=[
 'Ich ___ gestern Pizza gegessen.|habe|bin,hat,haben|Вчора я їв піцу.|Вчера я ел пиццу.',
 'Er ___ ein Buch gelesen.|hat|habe,ist,haben|Він прочитав книгу.|Он прочитал книгу.',
 'Wir haben Fußball ___.|gespielt|spielt,gespielen,spielte|Ми грали у футбол.|Мы играли в футбол.',
 'Sie hat den Film ___.|gesehen|gesehe,gesieht,sehen|Вона дивилася цей фільм.|Она смотрела этот фильм.',
 'Hast du schon ___?|gefrühstückt|frühstückt,gefrühstücken,gefrühstuckt|Ти вже поснідав?|Ты уже позавтракал?',
 'Ich habe das Formular ___.|ausgefüllt|gefüllt aus,ausfüllt,ausgefüllen|Я заповнив бланк.|Я заполнил бланк.',
 ])

gr(id='g2_perfekt_sein', title='Perfekt з sein', title_ru='Perfekt с sein', sub='ich bin gegangen',
 explain=[
 ('Коли sein', 'З sein утворюють Perfekt дієслова руху (gehen, fahren, kommen, fliegen) і зміни стану (aufstehen, einschlafen, werden), а також sein і bleiben: Ich bin nach Berlin gefahren. Er ist früh aufgestanden. Wir sind zu Hause geblieben.', 'Когда sein', 'С sein образуют Perfekt глаголы движения (gehen, fahren, kommen, fliegen) и смены состояния (aufstehen, einschlafen, werden), а также sein и bleiben: Ich bin nach Berlin gefahren. Er ist früh aufgestanden. Wir sind zu Hause geblieben.'),
 ('Важливі форми', 'gehen → gegangen, fahren → gefahren, kommen → gekommen, bleiben → geblieben, sein → gewesen, werden → geworden, aufstehen → aufgestanden, ankommen → angekommen.', 'Важные формы', 'gehen → gegangen, fahren → gefahren, kommen → gekommen, bleiben → geblieben, sein → gewesen, werden → geworden, aufstehen → aufgestanden, ankommen → angekommen.'),
 ('haben чи sein?', 'Якщо є прямий додаток (Akkusativ), майже завжди haben: Ich habe das Auto gefahren. Без додатка, рух або зміна — sein: Ich bin nach Köln gefahren. Словник підказує форму: у картці дієслова вказано aux.', 'haben или sein?', 'Если есть прямое дополнение (Akkusativ), почти всегда haben: Ich habe das Auto gefahren. Без дополнения, движение или смена состояния — sein: Ich bin nach Köln gefahren. Словарь подсказывает форму: в карточке глагола указано aux.'),
 ],
 gaps=[
 'Ich ___ nach Berlin gefahren.|bin|habe,hat,ist|Я поїхав до Берліна.|Я поехал в Берлин.',
 'Er ___ früh aufgestanden.|ist|hat,bin,habe|Він рано встав.|Он рано встал.',
 'Wir sind gestern ins Kino ___.|gegangen|gegehen,gegeht,gehen|Вчора ми ходили в кіно.|Вчера мы ходили в кино.',
 'Was ___ passiert?|ist|hat,bin,haben|Що трапилося?|Что случилось?',
 'Ich bin zu Hause ___.|geblieben|gebleiben,geblibt,bleiben|Я залишився вдома.|Я остался дома.',
 'Sie sind um acht Uhr ___.|angekommen|angekommt,ankomm,angekomen|Вони приїхали о восьмій.|Они приехали в восемь.',
 ])

gr(id='g2_praeteritum', title='Präteritum: sein, haben, модальні', title_ru='Präteritum: sein, haben, модальные', sub='ich war, ich hatte, ich konnte',
 explain=[
 ('sein і haben', 'У розмові для sein і haben майже завжди Präteritum: ich war, du warst, er war, wir waren, ihr wart, sie waren. ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten. Gestern war ich krank. Er hatte keine Zeit.', 'sein и haben', 'В разговоре для sein и haben почти всегда Präteritum: ich war, du warst, er war, wir waren, ihr wart, sie waren. ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten. Gestern war ich krank. Er hatte keine Zeit.'),
 ('Модальні дієслова', 'Модальні теж у Präteritum без умлаута: ich konnte, musste, wollte, sollte, durfte, wir mussten, du konntest. Als Kind konnte ich nicht schwimmen. Wir mussten gestern arbeiten.', 'Модальные глаголы', 'Модальные тоже в Präteritum без умлаута: ich konnte, musste, wollte, sollte, durfte, wir mussten, du konntest. Als Kind konnte ich nicht schwimmen. Wir mussten gestern arbeiten.'),
 ('Інші дієслова', 'Решту дієслів у розмові ставлять у Perfekt, у тексті й розповіді — Präteritum: spielen → spielte, gehen → ging. Для A2 достатньо впевнено вживати war, hatte й модальні, а решту розпізнавати.', 'Остальные глаголы', 'Остальные глаголы в разговоре ставят в Perfekt, в тексте и рассказе — Präteritum: spielen → spielte, gehen → ging. Для A2 достаточно уверенно употреблять war, hatte и модальные, а остальные узнавать.'),
 ],
 gaps=[
 'Gestern ___ ich krank.|war|bin,wart,hatte|Вчора я був хворий.|Вчера я был болен.',
 'Wir ___ letztes Jahr in Wien.|waren|sind,war,wart|Торік ми були у Відні.|В прошлом году мы были в Вене.',
 'Gestern ___ er keine Zeit.|hatte|war,haben,hatten|Вчора в нього не було часу.|Вчера у него не было времени.',
 'Als Kind ___ ich nicht schwimmen.|konnte|kann,gekonnt,können|У дитинстві я не вмів плавати.|В детстве я не умел плавать.',
 'Wir ___ gestern arbeiten.|mussten|müssen,musste,gemusst|Вчора ми мусили працювати.|Вчера нам пришлось работать.',
 'Du ___ gestern zu spät.|warst|war,bist,waren|Вчора ти запізнився.|Вчера ты опоздал.',
 ])

gr(id='g2_dativ', title='Dativ', title_ru='Dativ', sub='dem, der, dem, den',
 explain=[
 ('Артиклі в Dativ', 'Dativ відповідає на питання «кому?»: der → dem, die → der, das → dem, множина → den (+ -n в іменнику): dem Mann, der Frau, dem Kind, den Kindern. ein → einem, eine → einer.', 'Артикли в Dativ', 'Dativ отвечает на вопрос «кому?»: der → dem, die → der, das → dem, множественное → den (+ -n у существительного): dem Mann, der Frau, dem Kind, den Kindern. ein → einem, eine → einer.'),
 ('Дієслова з Dativ', 'helfen, gehören, gefallen, schmecken, danken, antworten, gratulieren вимагають Dativ: Ich helfe dem Mann. Das Buch gehört der Frau. Es schmeckt mir. Також дієслова з двома додатками: Ich gebe dem Kind einen Apfel.', 'Глаголы с Dativ', 'helfen, gehören, gefallen, schmecken, danken, antworten, gratulieren требуют Dativ: Ich helfe dem Mann. Das Buch gehört der Frau. Es schmeckt mir. Также глаголы с двумя дополнениями: Ich gebe dem Kind einen Apfel.'),
 ('Прийменники з Dativ', 'mit, nach, aus, bei, seit, von, zu — завжди Dativ: mit dem Bus, bei seinen Eltern, seit einem Jahr, von meiner Mutter, zu der Schule (zur Schule). Займенники: mir, dir, ihm, ihr, ihm, uns, euch, ihnen.', 'Предлоги с Dativ', 'mit, nach, aus, bei, seit, von, zu — всегда Dativ: mit dem Bus, bei seinen Eltern, seit einem Jahr, von meiner Mutter, zu der Schule (zur Schule). Местоимения: mir, dir, ihm, ihr, ihm, uns, euch, ihnen.'),
 ],
 gaps=[
 'Ich helfe ___ Mann.|dem|den,der,das|Я допомагаю чоловікові.|Я помогаю мужчине.',
 'Das Buch gehört ___ Frau.|der|die,dem,den|Книга належить жінці.|Книга принадлежит женщине.',
 'Ich gebe ___ Kind einen Apfel.|dem|das,den,der|Я даю дитині яблуко.|Я даю ребёнку яблоко.',
 'Wir fahren mit ___ Bus.|dem|den,der,das|Ми їдемо автобусом.|Мы едем на автобусе.',
 'Er wohnt bei ___ Eltern.|seinen|seine,sein,seinem|Він живе в своїх батьків.|Он живёт у своих родителей.',
 'Es schmeckt ___ gut.|mir|mich,ich,mein|Мені дуже смакує.|Мне очень вкусно.',
 ])

gr(id='g2_wechsel', title='Wechselpräpositionen', title_ru='Wechselpräpositionen', sub='wo? — Dativ, wohin? — Akkusativ',
 explain=[
 ('Правило', 'Дев’ять прийменників: in, an, auf, über, unter, vor, hinter, neben, zwischen. Wo? (де, стан) — Dativ. Wohin? (куди, рух) — Akkusativ. Das Buch liegt auf dem Tisch. Ich lege das Buch auf den Tisch.', 'Правило', 'Девять предлогов: in, an, auf, über, unter, vor, hinter, neben, zwischen. Wo? (где, состояние) — Dativ. Wohin? (куда, движение) — Akkusativ. Das Buch liegt auf dem Tisch. Ich lege das Buch auf den Tisch.'),
 ('Пари дієслів', 'Стан: liegen, stehen, sitzen, hängen (wo?). Дія: legen, stellen, setzen, hängen (wohin?). Das Bild hängt an der Wand. Ich hänge das Bild an die Wand.', 'Пары глаголов', 'Состояние: liegen, stehen, sitzen, hängen (wo?). Действие: legen, stellen, setzen, hängen (wohin?). Das Bild hängt an der Wand. Ich hänge das Bild an die Wand.'),
 ('Скорочення', 'in dem → im, an dem → am, in das → ins, an das → ans, auf das → aufs. Wir gehen ins Kino. Ich bin im Kino. Sie ist am Fenster.', 'Сокращения', 'in dem → im, an dem → am, in das → ins, an das → ans, auf das → aufs. Wir gehen ins Kino. Ich bin im Kino. Sie ist am Fenster.'),
 ],
 gaps=[
 'Ich lege das Buch auf ___ Tisch.|den|dem,der,das|Я кладу книгу на стіл.|Я кладу книгу на стол.',
 'Das Buch liegt auf ___ Tisch.|dem|den,der,das|Книга лежить на столі.|Книга лежит на столе.',
 'Wir gehen in ___ Küche.|die|der,dem,das|Ми йдемо на кухню.|Мы идём на кухню.',
 'Die Katze sitzt unter ___ Bett.|dem|das,den,der|Кішка сидить під ліжком.|Кошка сидит под кроватью.',
 'Er hängt das Bild an ___ Wand.|die|der,dem,den|Він вішає картину на стіну.|Он вешает картину на стену.',
 'Mein Handy liegt neben ___ Lampe.|der|die,dem,den|Мій телефон лежить біля лампи.|Мой телефон лежит рядом с лампой.',
 ])

gr(id='g2_adjektiv', title='Закінчення прикметників', title_ru='Окончания прилагательных', sub='ein neues Auto, der alte Mann',
 explain=[
 ('Після ein-', 'Прикметник стоїть перед іменником і набуває закінчення. Після ein/eine: чол. — ein neuer Mann, жін. — eine neue Frau, сер. — ein neues Auto. Закінчення показують рід, якого немає в артикля: -er, -e, -es.', 'После ein-', 'Прилагательное стоит перед существительным и получает окончание. После ein/eine: муж. — ein neuer Mann, жен. — eine neue Frau, ср. — ein neues Auto. Окончания показывают род, которого нет у артикля: -er, -e, -es.'),
 ('Після der/die/das', 'Після означеного артикля майже скрізь -e або -en: der alte Mann, die neue Frau, das kleine Kind. Akkusativ чол. і всі Dativ та множина: -en: den alten Mann, mit dem neuen Handy, die kleinen Kinder.', 'После der/die/das', 'После определённого артикля почти везде -e или -en: der alte Mann, die neue Frau, das kleine Kind. Akkusativ муж. и весь Dativ и множественное: -en: den alten Mann, mit dem neuen Handy, die kleinen Kinder.'),
 ('Без артикля і Akkusativ', 'Ich kaufe einen roten Pullover (Akk. чол.: -en). Ich habe eine große Wohnung (Akk. жін.: -e). Без артикля закінчення як у артикля: kaltes Wasser, frische Milch.', 'Без артикля и Akkusativ', 'Ich kaufe einen roten Pullover (Akk. муж.: -en). Ich habe eine große Wohnung (Akk. жен.: -e). Без артикля окончание как у артикля: kaltes Wasser, frische Milch.'),
 ],
 gaps=[
 'Das ist ein neu___ Auto.|es|e,er,en|Це нова машина.|Это новая машина.',
 'Ich habe eine groß___ Wohnung.|e|er,es,en|У мене велика квартира.|У меня большая квартира.',
 'Der alt___ Mann sitzt dort.|e|en,er,es|Старий чоловік сидить там.|Старик сидит там.',
 'Ich kaufe einen rot___ Pullover.|en|e,er,es|Я купую червоний светр.|Я покупаю красный свитер.',
 'Die klein___ Kinder spielen.|en|e,er,es|Маленькі діти граються.|Маленькие дети играют.',
 'Mit dem neu___ Handy telefoniere ich.|en|e,er,es|Новим телефоном я телефоную.|По новому телефону я звоню.',
 ])

gr(id='g2_komparativ', title='Компаратив і суперлатив', title_ru='Komparativ und Superlativ', sub='größer, am größten',
 explain=[
 ('Komparativ', 'Вищий ступінь: + -er, порівняння через als: Berlin ist größer als Köln. Коротші прикметники часто з умлаутом: alt → älter, groß → größer, jung → jünger. Неправильні: gut → besser, viel → mehr, gern → lieber.', 'Komparativ', 'Сравнительная степень: + -er, сравнение через als: Berlin ist größer als Köln. Короткие прилагательные часто с умлаутом: alt → älter, groß → größer, jung → jünger. Неправильные: gut → besser, viel → mehr, gern → lieber.'),
 ('Superlativ', 'Найвищий ступінь: am + -sten: Er läuft am schnellsten. Перед іменником: der höchste Berg. Неправильні: gut → am besten, viel → am meisten, gern → am liebsten.', 'Superlativ', 'Превосходная степень: am + -sten: Er läuft am schnellsten. Перед существительным: der höchste Berg. Неправильные: gut → am besten, viel → am meisten, gern → am liebsten.'),
 ('so ... wie', 'Однаковість: so + прикметник + wie: Mein Bruder ist so alt wie ich. Нерівність: nicht so ... wie: Das Auto ist nicht so schnell wie das Flugzeug. Різниця: als: schneller als.', 'so ... wie', 'Равенство: so + прилагательное + wie: Mein Bruder ist so alt wie ich. Неравенство: nicht so ... wie: Das Auto ist nicht so schnell wie das Flugzeug. Разница: als: schneller als.'),
 ],
 gaps=[
 'Berlin ist ___ als Köln.|größer|groß,am größten,großer|Берлін більший за Кельн.|Берлин больше Кёльна.',
 'Das Auto ist ___ als das Fahrrad.|schneller|schnell,am schnellsten,schnellere|Машина швидша за велосипед.|Машина быстрее велосипеда.',
 'Ich esse ___ Pizza als Pasta.|lieber|gern,besser,am liebsten|Піцу я їм охочіше, ніж пасту.|Пиццу я ем охотнее, чем пасту.',
 'Das ist der ___ Berg.|höchste|hoch,höher,am höchsten|Це найвища гора.|Это самая высокая гора.',
 'Sie spricht ___ Deutsch als ich.|besser|gut,am besten,guter|Вона говорить німецькою краще за мене.|Она говорит по-немецки лучше меня.',
 'Mein Bruder ist so ___ wie ich.|alt|älter,älteste,am ältesten|Мій брат такий самий за віком, як я.|Мой брат такого же возраста, как я.',
 ])

gr(id='g2_nebensatz', title='Підрядні речення', title_ru='Придаточные предложения', sub='weil, dass, wenn, ob',
 explain=[
 ('Порядок слів', 'У підрядному реченні змінне дієслово стоїть в кінці: Ich bleibe zu Hause, weil ich krank bin. Перед сполучником завжди кома. Якщо підрядне на початку, у головному дієслово одразу після коми: Weil ich krank bin, bleibe ich zu Hause.', 'Порядок слов', 'В придаточном предложении изменяемый глагол стоит в конце: Ich bleibe zu Hause, weil ich krank bin. Перед союзом всегда запятая. Если придаточное в начале, в главном глагол сразу после запятой: Weil ich krank bin, bleibe ich zu Hause.'),
 ('weil, dass, wenn', 'weil — бо, тому що. dass — що: Ich glaube, dass er recht hat. wenn — якщо, коли: Wenn es regnet, bleibe ich zu Hause. З модальним дієслово в кінці стоїть останнім: weil ich arbeiten will.', 'weil, dass, wenn', 'weil — потому что. dass — что: Ich glaube, dass er recht hat. wenn — если, когда: Wenn es regnet, bleibe ich zu Hause. С модальным глагол в конце стоит последним: weil ich arbeiten will.'),
 ('ob', 'ob — чи, у непрямому питанні без питального слова: Ich frage mich, ob er kommt. Ich weiß nicht, ob das stimmt. З питальним словом: Ich weiß nicht, wann er kommt.', 'ob', 'ob — ли, в косвенном вопросе без вопросительного слова: Ich frage mich, ob er kommt. Ich weiß nicht, ob das stimmt. С вопросительным словом: Ich weiß nicht, wann er kommt.'),
 ],
 gaps=[
 'Ich bleibe zu Hause, ___ ich krank bin.|weil|denn,deshalb,und|Я залишаюся вдома, бо я хворий.|Я остаюсь дома, потому что я болен.',
 'Ich glaube, ___ er recht hat.|dass|ob,wenn,und|Я думаю, що він має рацію.|Я думаю, что он прав.',
 'Ich frage mich, ___ er kommt.|ob|dass,weil,und|Цікаво, чи він прийде.|Интересно, придёт ли он.',
 '___ es regnet, bleibe ich zu Hause.|Wenn|Dass,Ob,Aber|Якщо йде дощ, я залишаюся вдома.|Если идёт дождь, я остаюсь дома.',
 'Ich lerne Deutsch, weil ich in Deutschland ___.|arbeiten will|will arbeiten,arbeite will,wollen arbeiten|Я вчу німецьку, бо хочу працювати в Німеччині.|Я учу немецкий, потому что хочу работать в Германии.',
 'Er sagt, dass er morgen nicht ___.|kommt|kommen,kam,gekommen|Він каже, що завтра не прийде.|Он говорит, что завтра не придёт.',
 ])

gr(id='g2_reflexiv', title='Зворотні дієслова', title_ru='Возвратные глаголы', sub='ich freue mich',
 explain=[
 ('Займенники', 'Зворотне дієслово має займенник, що відноситься до підмета: ich freue mich, du freust dich, er/sie freut sich, wir freuen uns, ihr freut euch, sie freuen sich. Він у Akkusativ.', 'Местоимения', 'Возвратный глагол имеет местоимение, относящееся к подлежащему: ich freue mich, du freust dich, er/sie freut sich, wir freuen uns, ihr freut euch, sie freuen sich. Оно в Akkusativ.'),
 ('Типові дієслова', 'sich freuen (auf/über), sich interessieren für, sich treffen mit, sich erholen, sich beeilen, sich entscheiden, sich vorbereiten auf, sich waschen. Ich interessiere mich für Musik. Wir treffen uns um sechs.', 'Типичные глаголы', 'sich freuen (auf/über), sich interessieren für, sich treffen mit, sich erholen, sich beeilen, sich entscheiden, sich vorbereiten auf, sich waschen. Ich interessiere mich für Musik. Wir treffen uns um sechs.'),
 ('Dativ-займенник', 'Якщо є прямий додаток, займенник стає Dativ: ich wasche mich, але ich wasche mir die Hände. Форми: mir, dir, sich, uns, euch, sich.', 'Местоимение в Dativ', 'Если есть прямое дополнение, местоимение становится Dativ: ich wasche mich, но ich wasche mir die Hände. Формы: mir, dir, sich, uns, euch, sich.'),
 ],
 gaps=[
 'Ich freue ___ auf den Urlaub.|mich|dich,sich,mir|Я радію відпустці.|Я радуюсь отпуску.',
 'Er interessiert ___ für Musik.|sich|mich,ihn,ihm|Він цікавиться музикою.|Он интересуется музыкой.',
 'Wir treffen ___ um sechs.|uns|sich,euch,mich|Ми зустрічаємося о шостій.|Мы встречаемся в шесть.',
 'Du musst ___ beeilen.|dich|mich,sich,dir|Ти мусиш поспішити.|Ты должен поторопиться.',
 'Ihr erholt ___ am Wochenende.|euch|uns,sich,dich|Ви відпочиваєте на вихідних.|Вы отдыхаете на выходных.',
 'Ich wasche ___ die Hände.|mir|mich,sich,ich|Я мию руки.|Я мою руки.',
 ])

gr(id='g2_imperativ', title='Imperativ', title_ru='Imperativ', sub='Komm! Kommt! Kommen Sie!',
 explain=[
 ('Три форми', 'du: основа без -st: Komm! Mach! Gib! ihr: як у теперішньому: Kommt! Macht! Sie: дієслово перед Sie: Kommen Sie bitte! Додавай bitte для ввічливості.', 'Три формы', 'du: основа без -st: Komm! Mach! Gib! ihr: как в настоящем: Kommt! Macht! Sie: Kommen Sie! Глагол перед Sie: Kommen Sie bitte! Добавляй bitte для вежливости.'),
 ('Неправильні', 'Дієслова зі зміною голосної e → i: nehmen → Nimm!, geben → Gib!, lesen → Lies!, sprechen → Sprich! Але fahren → Fahr! (без змін). sein: Sei! Seid! Seien Sie!', 'Неправильные', 'Глаголы со сменой e → i: nehmen → Nimm!, geben → Gib!, lesen → Lies!, sprechen → Sprich! Но fahren → Fahr! (без изменений). sein: Sei! Seid! Seien Sie!'),
 ('Відокремлювані', 'Приставка йде в кінець: anrufen → Ruf mich an! aufstehen → Steh auf! zumachen → Mach die Tür zu! Для Sie: Rufen Sie mich an!', 'Отделяемые', 'Приставка уходит в конец: anrufen → Ruf mich an! aufstehen → Steh auf! zumachen → Mach die Tür zu! Для Sie: Rufen Sie mich an!'),
 ],
 gaps=[
 '___ bitte leise! (du, sein)|Sei|Bist,Sein,Seid|Будь тихіше, будь ласка!|Будь потише, пожалуйста!',
 '___ doch mal! (du, kommen)|Komm|Kommst,Kommt,Kam|Заходь!|Заходи!',
 '___ mir bitte das Salz! (du)|Gib|Gibst,Gebe,Gebt|Подай мені, будь ласка, сіль!|Передай мне, пожалуйста, соль!',
 '___ Sie bitte Platz!|Nehmen|Nimm,Nehmt,Nimmt|Сідайте, будь ласка!|Садитесь, пожалуйста!',
 '___ ihr bitte die Hausaufgaben!|Macht|Mach,Machen,Machst|Зробіть, будь ласка, домашнє завдання!|Сделайте, пожалуйста, домашнее задание!',
 'Ruf mich ___!|an|mit,zu,fern|Зателефонуй мені!|Позвони мне!',
 ])

gr(id='g2_konjunktiv', title='Ввічливо: Konjunktiv II', title_ru='Вежливо: Konjunktiv II', sub='ich hätte gern, könnten Sie',
 explain=[
 ('Ввічливі прохання', 'Könnten Sie mir helfen? Würden Sie das bitte wiederholen? Ich hätte gern einen Kaffee. Ich möchte ... Це м’якіше, ніж Kannst du, Gib mir. Форми: ich könnte, du könntest, Sie könnten; ich hätte; ich wäre.', 'Вежливые просьбы', 'Könnten Sie mir helfen? Würden Sie das bitte wiederholen? Ich hätte gern einen Kaffee. Ich möchte ... Это мягче, чем Kannst du, Gib mir. Формы: ich könnte, du könntest, Sie könnten; ich hätte; ich wäre.'),
 ('würde + інфінітив', 'Для більшості дієслів: würde + інфінітив: Ich würde gern nach Italien fahren. An deiner Stelle würde ich das nicht machen. Форми würde: ich würde, du würdest, er würde, wir würden, ihr würdet, sie würden.', 'würde + инфинитив', 'Для большинства глаголов: würde + инфинитив: Ich würde gern nach Italien fahren. An deiner Stelle würde ich das nicht machen. Формы würde: ich würde, du würdest, er würde, wir würden, ihr würdet, sie würden.'),
 ('Нереальні умови', 'Wenn ich Zeit hätte, würde ich kommen (але часу немає). Wenn ich reich wäre, würde ich reisen. Для sein і haben вживаємо власні форми: wäre, hätte.', 'Нереальные условия', 'Wenn ich Zeit hätte, würde ich kommen (но времени нет). Wenn ich reich wäre, würde ich reisen. Для sein и haben употребляем собственные формы: wäre, hätte.'),
 ],
 gaps=[
 '___ Sie mir bitte helfen?|Könnten|Könnte,Kannten,Gekonnt|Чи не могли б ви мені допомогти?|Не могли бы вы мне помочь?',
 'Ich ___ gern einen Kaffee.|hätte|hätten,hattet,gehabt|Я б хотів каву.|Я бы хотел кофе.',
 'An deiner Stelle ___ ich das nicht machen.|würde|werde,wurde,wird|На твоєму місці я б цього не робив.|На твоём месте я бы этого не делал.',
 'Wenn ich Zeit ___, würde ich kommen.|hätte|hätten,hattet,haben|Якби в мене був час, я б прийшов.|Если бы у меня было время, я бы пришёл.',
 'Ich ___ gern mit Ihnen sprechen.|möchte|möchtest,möchten,mochten|Я б хотів поговорити з вами.|Я хотел бы поговорить с вами.',
 'Wenn ich reich ___, würde ich reisen.|wäre|bin,wärst,wart|Якби я був багатим, я б подорожував.|Если бы я был богат, я бы путешествовал.',
 ])

gr(id='g2_zu', title='Інфінітив з zu, um ... zu', title_ru='Инфинитив с zu, um ... zu', sub='keine Lust zu arbeiten',
 explain=[
 ('Інфінітив з zu', 'Після багатьох дієслів і виразів інфінітив із zu: Ich habe keine Lust, heute zu arbeiten. Es ist schwer, Deutsch zu lernen. Ich habe vergessen, dich anzurufen. З відокремлюваними zu між приставкою й дієсловом: anzurufen, aufzustehen.', 'Инфинитив с zu', 'После многих глаголов и выражений инфинитив с zu: Ich habe keine Lust, heute zu arbeiten. Es ist schwer, Deutsch zu lernen. Ich habe vergessen, dich anzurufen. С отделяемыми zu между приставкой и глаголом: anzurufen, aufzustehen.'),
 ('Без zu', 'Після модальних дієслів і werden zu немає: Ich muss früh aufstehen. Ich kann schwimmen. Також після gehen, bleiben, lassen: Ich gehe einkaufen.', 'Без zu', 'После модальных глаголов и werden zu нет: Ich muss früh aufstehen. Ich kann schwimmen. Также после gehen, bleiben, lassen: Ich gehe einkaufen.'),
 ('um ... zu', 'um ... zu — щоб (мета, один підмет): Ich gehe zum Bäcker, um Brot zu kaufen. Er lernt Deutsch, um in Wien zu arbeiten. Коли підмети різні, вживають damit: Ich spare, damit du studieren kannst.', 'um ... zu', 'um ... zu — чтобы (цель, одно подлежащее): Ich gehe zum Bäcker, um Brot zu kaufen. Er lernt Deutsch, um in Wien zu arbeiten. Когда подлежащие разные, употребляют damit: Ich spare, damit du studieren kannst.'),
 ],
 gaps=[
 'Ich habe keine Lust, heute ___ arbeiten.|zu|um,für,an|Я не маю бажання сьогодні працювати.|Мне не хочется сегодня работать.',
 'Ich gehe zum Bäcker, ___ Brot zu kaufen.|um|für,damit,weil|Я йду до пекаря, щоб купити хліб.|Я иду к пекарю, чтобы купить хлеб.',
 'Es ist schwer, Deutsch ___ lernen.|zu|um,für,an|Важко вчити німецьку.|Трудно учить немецкий.',
 'Ich habe vergessen, dich ___.|anzurufen|zu anrufen,anzurufe,anrufen zu|Я забув тобі зателефонувати.|Я забыл тебе позвонить.',
 'Ich muss heute früh ___.|aufstehen|aufzustehen,zu aufstehen,aufgestanden|Мені треба сьогодні рано встати.|Мне надо сегодня рано встать.',
 'Er lernt Deutsch, ___ in Wien zu arbeiten.|um|für,weil,damit|Він вчить німецьку, щоб працювати у Відні.|Он учит немецкий, чтобы работать в Вене.',
 ])

gr(id='g2_futur', title='Futur I і сполучники', title_ru='Futur I и союзы', sub='ich werde, deshalb, trotzdem',
 explain=[
 ('Futur I', 'werden + інфінітив у кінці: Ich werde morgen anrufen. Es wird bald regnen. Wir werden nach Spanien fahren. werden: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden. У розмові часто досить Präsens із «morgen».', 'Futur I', 'werden + инфинитив в конце: Ich werde morgen anrufen. Es wird bald regnen. Wir werden nach Spanien fahren. werden: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden. В разговоре часто достаточно Präsens с «morgen».'),
 ('deshalb, trotzdem', 'Після deshalb і trotzdem дієслово на другому місці: Ich bin müde, deshalb gehe ich früh ins Bett. Es regnet, trotzdem gehen wir spazieren. Це не підрядні речення.', 'deshalb, trotzdem', 'После deshalb и trotzdem глагол на втором месте: Ich bin müde, deshalb gehe ich früh ins Bett. Es regnet, trotzdem gehen wir spazieren. Это не придаточные предложения.'),
 ('aber, denn, und, oder', 'aber, denn, und, oder, sondern не змінюють порядок слів: Ich mag Tee, aber ich trinke lieber Kaffee. Ich bleibe, denn ich bin müde. Порівняй: weil ich müde bin (дієслово в кінець).', 'aber, denn, und, oder', 'aber, denn, und, oder, sondern не меняют порядок слов: Ich mag Tee, aber ich trinke lieber Kaffee. Ich bleibe, denn ich bin müde. Сравни: weil ich müde bin (глагол в конец).'),
 ],
 gaps=[
 'Morgen ___ ich meine Oma besuchen.|werde|wurde,wirst,wirde|Завтра я навідаю бабусю.|Завтра я навещу бабушку.',
 'Es ___ bald regnen.|wird|werde,wurde,wirst|Скоро піде дощ.|Скоро пойдёт дождь.',
 'Ich bin müde, ___ gehe ich früh ins Bett.|deshalb|weil,dass,denn|Я втомлений, тому рано йду спати.|Я устал, поэтому рано ложусь спать.',
 'Es regnet, ___ gehen wir spazieren.|trotzdem|weil,wenn,dass|Йде дощ, але ми все одно йдемо гуляти.|Идёт дождь, но мы всё равно идём гулять.',
 'Ich mag Tee, ___ ich trinke lieber Kaffee.|aber|weil,dass,deshalb|Я люблю чай, але кава мені більше до смаку.|Я люблю чай, но кофе люблю больше.',
 'Wir ___ nächstes Jahr nach Spanien fahren.|werden|wird,wirst,würdet|Наступного року ми поїдемо до Іспанії.|В следующем году мы поедем в Испанию.',
 ])
