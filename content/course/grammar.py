# -*- coding: utf-8 -*-
# Граматика A1. explain: (h_uk, p_uk, h_ru, p_ru). gap: "речення з ___|правильно|хибні|uk|ru"
G = []
def gr(**k): G.append(k)

gr(id='g_articles', title='Артиклі', title_ru='Артикли', sub='der, die, das, ein, eine',
 explain=[
 ('Три роди', 'В іменників німецької є три роди: чоловічий (der), жіночий (die), середній (das). Рід треба вчити разом зі словом: der Tisch, die Lampe, das Buch. Він не завжди збігається з українським.', 'Три рода', 'У существительных в немецком три рода: мужской (der), женский (die), средний (das). Род надо учить вместе со словом: der Tisch, die Lampe, das Buch. Он не всегда совпадает с русским.'),
 ('Означений і неозначений', 'Означений артикль (der/die/das) — коли ми говоримо про конкретний предмет: Der Tisch ist neu. Неозначений (ein/eine) — коли предмет згадується вперше: Ich habe einen Tisch. Для середнього роду: ein Buch, для жіночого: eine Lampe.', 'Определённый и неопределённый', 'Определённый артикль (der/die/das) — когда речь о конкретном предмете: Der Tisch ist neu. Неопределённый (ein/eine) — когда предмет упоминается впервые: Ich habe einen Tisch. Средний род: ein Buch, женский: eine Lampe.'),
 ('Множина', 'У множині артикль завжди die: die Tische, die Lampen, die Bücher. Неозначеного артикля у множині немає: Ich habe Bücher.', 'Множественное число', 'Во множественном числе артикль всегда die: die Tische, die Lampen, die Bücher. Неопределённого артикля во множественном числе нет: Ich habe Bücher.'),
 ],
 gaps=[
 '___ Lampe ist neu.|Die|Der,Das,Ein|Лампа нова.|Лампа новая.',
 '___ Buch liegt auf dem Tisch.|Das|Der,Die,Eine|Книга лежить на столі.|Книга лежит на столе.',
 'Das ist ___ Haus.|ein|eine,einen,der|Це будинок.|Это дом.',
 'Ich habe ___ Schwester.|eine|ein,einen,der|У мене є сестра.|У меня есть сестра.',
 '___ Kinder spielen im Park.|Die|Der,Das,Ein|Діти грають у парку.|Дети играют в парке.',
 '___ Tisch ist groß.|Der|Die,Das,Eine|Стіл великий.|Стол большой.',
 ])

gr(id='g_plural', title='Множина іменників', title_ru='Множественное число', sub='-e, -en, -er, -s, умлаут',
 explain=[
 ('Основні закінчення', 'Множина утворюється по-різному: -e (der Tisch → die Tische), -en/-n (die Frau → die Frauen, die Lampe → die Lampen), -er (das Kind → die Kinder), -s (das Auto → die Autos), без закінчення (der Lehrer → die Lehrer).', 'Основные окончания', 'Множественное число образуется по-разному: -e (der Tisch → die Tische), -en/-n (die Frau → die Frauen, die Lampe → die Lampen), -er (das Kind → die Kinder), -s (das Auto → die Autos), без окончания (der Lehrer → die Lehrer).'),
 ('Умлаут', 'Часто голосна в корені змінюється: a → ä, o → ö, u → ü: der Apfel → die Äpfel, das Buch → die Bücher, der Bruder → die Brüder.', 'Умлаут', 'Часто гласная в корне меняется: a → ä, o → ö, u → ü: der Apfel → die Äpfel, das Buch → die Bücher, der Bruder → die Brüder.'),
 ('Як вчити', 'Правил багато, винятків теж. Тому множину вчимо разом зі словом: у Словнику вона вказана біля кожного іменника. Жіночі слова на -e майже завжди мають -n: die Tasche → die Taschen.', 'Как учить', 'Правил много, исключений тоже. Поэтому множественное число учим вместе со словом: в Словаре оно указано у каждого существительного. Женские слова на -e почти всегда получают -n: die Tasche → die Taschen.'),
 ],
 gaps=[
 'Ich habe zwei ___.|Brüder|Bruder,Bruders,Bruderen|У мене двоє братів.|У меня два брата.',
 'Im Park sind viele ___.|Kinder|Kind,Kindern,Kinde|У парку багато дітей.|В парке много детей.',
 'Wir haben drei ___.|Autos|Auto,Autoen,Autoe|У нас три автомобілі.|У нас три автомобиля.',
 'Die ___ sind rot.|Äpfel|Apfel,Apfeln,Apfels|Яблука червоні.|Яблоки красные.',
 'Zwei ___ kommen morgen.|Frauen|Frau,Fraue,Fraus|Дві жінки прийдуть завтра.|Две женщины придут завтра.',
 'Ich kaufe drei ___.|Taschen|Tasche,Tasches,Taschens|Я купую три сумки.|Я покупаю три сумки.',
 ])

gr(id='g_sein_haben', title='sein і haben', title_ru='sein и haben', sub='бути й мати',
 explain=[
 ('sein — бути', 'ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. Ich bin Anna. Wir sind aus der Ukraine. Це неправильне дієслово, його форми треба вивчити напам\'ять.', 'sein — быть', 'ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. Ich bin Anna. Wir sind aus der Ukraine. Это неправильный глагол, его формы нужно выучить наизусть.'),
 ('haben — мати', 'ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben. Ich habe einen Bruder. Він також неправильний: зверни увагу на du hast, er hat.', 'haben — иметь', 'ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben. Ich habe einen Bruder. Он тоже неправильный: обрати внимание на du hast, er hat.'),
 ('Де що вживати', 'Вік, професія, національність, стан — sein: Ich bin 25. Ich bin Lehrer. Володіння, родичі, голод і спрага — haben: Ich habe Hunger. Ich habe eine Katze.', 'Что где употреблять', 'Возраст, профессия, национальность, состояние — sein: Ich bin 25. Ich bin Lehrer. Владение, родственники, голод и жажда — haben: Ich habe Hunger. Ich habe eine Katze.'),
 ],
 gaps=[
 'Ich ___ Student.|bin|bist,ist,habe|Я студент.|Я студент.',
 'Du ___ einen Bruder.|hast|habe,hat,bist|У тебе є брат.|У тебя есть брат.',
 'Wir ___ aus Kiew.|sind|bin,ist,seid|Ми з Києва.|Мы из Киева.',
 'Sie ___ zwei Kinder.|hat|hast,ist,bin|У неї двоє дітей.|У неё двое детей.',
 'Ihr ___ müde.|seid|sind,bist,habt|Ви втомлені.|Вы устали.',
 'Ich ___ Hunger.|habe|bin,hast,ist|Я голодний.|Я голоден.',
 ])

gr(id='g_present', title='Теперішній час', title_ru='Настоящее время', sub='закінчення дієслів',
 explain=[
 ('Закінчення', 'Від основи (infinitiv без -en) додаємо: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en. machen: ich mache, du machst, er macht, wir machen, ihr macht, sie machen.', 'Окончания', 'К основе (инфинитив без -en) добавляем: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en. machen: ich mache, du machst, er macht, wir machen, ihr macht, sie machen.'),
 ('Вставна -e-', 'Якщо основа закінчується на -t або -d, перед -st/-t додаємо -e-: arbeiten → du arbeitest, er arbeitet; finden → du findest.', 'Вставное -e-', 'Если основа оканчивается на -t или -d, перед -st/-t добавляем -e-: arbeiten → du arbeitest, er arbeitet; finden → du findest.'),
 ('Зміна голосної', 'У частини сильних дієслів у du і er/sie/es змінюється голосна: fahren → du fährst, er fährt; sprechen → du sprichst, er spricht; lesen → du liest. Такі форми дано у Словнику дієслів.', 'Смена гласной', 'У части сильных глаголов в du и er/sie/es меняется гласная: fahren → du fährst, er fährt; sprechen → du sprichst, er spricht; lesen → du liest. Такие формы даны в Словаре глаголов.'),
 ],
 gaps=[
 'Ich ___ Deutsch.|lerne|lernst,lernt,lernen|Я вчу німецьку.|Я учу немецкий.',
 'Du ___ im Büro.|arbeitest|arbeite,arbeitet,arbeiten|Ти працюєш в офісі.|Ты работаешь в офисе.',
 'Er ___ nach Berlin.|fährt|fahrt,fahre,fährst|Він їде до Берліна.|Он едет в Берлин.',
 'Wir ___ Kaffee.|trinken|trinkt,trinke,trinkst|Ми п\'ємо каву.|Мы пьём кофе.',
 'Sie ___ gut Deutsch.|spricht|sprichst,sprecht,sprich|Вона добре говорить німецькою.|Она хорошо говорит по-немецки.',
 'Ihr ___ Fußball.|spielt|spielst,spiele,spielen|Ви граєте у футбол.|Вы играете в футбол.',
 ])

gr(id='g_wordorder', title='Порядок слів', title_ru='Порядок слов', sub='речення й питання',
 explain=[
 ('Дієслово на другому місці', 'У розповідному реченні відмінюване дієслово завжди на другому місці: Ich lerne heute Deutsch. Heute lerne ich Deutsch. Якщо на початок виходить інше слово, підмет іде після дієслова.', 'Глагол на втором месте', 'В повествовательном предложении спрягаемый глагол всегда на втором месте: Ich lerne heute Deutsch. Heute lerne ich Deutsch. Если в начало выходит другое слово, подлежащее идёт после глагола.'),
 ('Питання без питального слова', 'Загальне питання (так/ні) починається з дієслова: Lernst du Deutsch? Kommt er morgen?', 'Вопрос без вопросительного слова', 'Общий вопрос (да/нет) начинается с глагола: Lernst du Deutsch? Kommt er morgen?'),
 ('Питання з питальним словом', 'Питальне слово на першому місці, дієслово на другому: Wo wohnst du? Was machst du heute? Wann kommt der Bus?', 'Вопрос с вопросительным словом', 'Вопросительное слово на первом месте, глагол на втором: Wo wohnst du? Was machst du heute? Wann kommt der Bus?'),
 ],
 gaps=[
 'Heute ___ ich Deutsch.|lerne|ich,lernen,Deutsch|Сьогодні я вчу німецьку.|Сегодня я учу немецкий.',
 '___ du Kaffee?|Trinkst|Du,Kaffee,Trinken|Ти п\'єш каву?|Ты пьёшь кофе?',
 'Wo ___ du?|wohnst|du,wohne,Wohnung|Де ти живеш?|Где ты живёшь?',
 'Morgen ___ wir nach Wien.|fahren|wir,fährt,Wien|Завтра ми їдемо до Відня.|Завтра мы едем в Вену.',
 'Was ___ du heute?|machst|machen,du,mache|Що ти робиш сьогодні?|Что ты делаешь сегодня?',
 'Am Montag ___ er arbeiten.|muss|er,arbeitet,müssen|У понеділок він мусить працювати.|В понедельник он должен работать.',
 ])

gr(id='g_negation', title='Заперечення', title_ru='Отрицание', sub='nicht і kein',
 explain=[
 ('kein', 'kein заперечує іменник з неозначеним артиклем або без артикля: Ich habe einen Bruder → Ich habe keinen Bruder. Ich habe Zeit → Ich habe keine Zeit. Закінчення такі, як у ein: kein (m, n), keine (f, pl), keinen (m, Akk.).', 'kein', 'kein отрицает существительное с неопределённым артиклем или без артикля: Ich habe einen Bruder → Ich habe keinen Bruder. Ich habe Zeit → Ich habe keine Zeit. Окончания такие же, как у ein: kein (m, n), keine (f, pl), keinen (m, Akk.).'),
 ('nicht', 'nicht заперечує дієслово, прикметник або іменник з означеним артиклем: Ich arbeite nicht. Das Buch ist nicht neu. Ich kenne den Mann nicht. Nicht зазвичай стоїть наприкінці речення або перед прикметником.', 'nicht', 'nicht отрицает глагол, прилагательное или существительное с определённым артиклем: Ich arbeite nicht. Das Buch ist nicht neu. Ich kenne den Mann nicht. Nicht обычно стоит в конце предложения или перед прилагательным.'),
 ('Відповіді', 'Ja — так, nein — ні, doch — «ні, навпаки» у відповідь на заперечне питання: Hast du keine Zeit? — Doch, ich habe Zeit.', 'Ответы', 'Ja — да, nein — нет, doch — «нет, наоборот» в ответ на отрицательный вопрос: Hast du keine Zeit? — Doch, ich habe Zeit.'),
 ],
 gaps=[
 'Ich habe ___ Zeit.|keine|nicht,kein,keinen|У мене немає часу.|У меня нет времени.',
 'Er hat ___ Auto.|kein|nicht,keine,keinen|У нього немає автомобіля.|У него нет автомобиля.',
 'Ich komme heute ___.|nicht|kein,keine,keinen|Я сьогодні не прийду.|Я сегодня не приду.',
 'Das Wetter ist ___ gut.|nicht|kein,keine,keinen|Погода не гарна.|Погода нехорошая.',
 'Wir haben ___ Kinder.|keine|nicht,kein,keinen|У нас немає дітей.|У нас нет детей.',
 'Ich habe ___ Bruder.|keinen|kein,keine,nicht|У мене немає брата.|У меня нет брата.',
 ])

gr(id='g_akkusativ', title='Знахідний відмінок', title_ru='Винительный падеж', sub='Akkusativ',
 explain=[
 ('Що змінюється', 'Прямий додаток (кого? що?) стоїть у знахідному відмінку. Змінюється тільки чоловічий рід: der → den, ein → einen. Жіночий, середній і множина не змінюються: die Frau, das Kind, die Kinder.', 'Что меняется', 'Прямое дополнение (кого? что?) стоит в винительном падеже. Меняется только мужской род: der → den, ein → einen. Женский, средний род и множественное число не меняются: die Frau, das Kind, die Kinder.'),
 ('Приклади', 'Ich kaufe den Tisch. Ich kaufe einen Tisch. Ich sehe die Frau. Ich habe ein Kind. Er liebt seinen Bruder.', 'Примеры', 'Ich kaufe den Tisch. Ich kaufe einen Tisch. Ich sehe die Frau. Ich habe ein Kind. Er liebt seinen Bruder.'),
 ('Дієслова з Akkusativ', 'Найчастіші: haben, kaufen, sehen, lesen, trinken, essen, brauchen, suchen, machen, kennen. Після sein додаток стоїть у називному: Das ist der Tisch.', 'Глаголы с Akkusativ', 'Самые частые: haben, kaufen, sehen, lesen, trinken, essen, brauchen, suchen, machen, kennen. После sein дополнение стоит в именительном: Das ist der Tisch.'),
 ],
 gaps=[
 'Ich kaufe ___ Tisch.|den|der,dem,die|Я купую стіл.|Я покупаю стол.',
 'Er hat ___ Hund.|einen|ein,eine,einem|У нього є собака.|У него есть собака.',
 'Ich sehe ___ Frau.|die|den,der,dem|Я бачу жінку.|Я вижу женщину.',
 'Wir brauchen ___ Auto.|ein|einen,eine,einem|Нам потрібен автомобіль.|Нам нужна машина.',
 'Sie liebt ___ Bruder.|ihren|ihr,ihre,ihrem|Вона любить свого брата.|Она любит своего брата.',
 'Ich suche ___ Schlüssel.|den|der,dem,das|Я шукаю ключ.|Я ищу ключ.',
 ])

gr(id='g_modal', title='Модальні дієслова', title_ru='Модальные глаголы', sub='können, müssen, wollen…',
 explain=[
 ('Основні модальні', 'können (могти), müssen (мусити), wollen (хотіти), dürfen (мати дозвіл), sollen (бути повинним), mögen / möchten (хотіти, любити). Ich kann, du kannst, er kann; ich muss, du musst, er muss; ich will, du willst, er will.', 'Основные модальные', 'können (мочь), müssen (должен), wollen (хотеть), dürfen (иметь разрешение), sollen (быть должным), mögen / möchten (хотеть, любить). Ich kann, du kannst, er kann; ich muss, du musst, er muss; ich will, du willst, er will.'),
 ('Рамка речення', 'Модальне дієслово стоїть на другому місці, а смислове — у кінці в інфінітиві: Ich kann gut schwimmen. Wir müssen heute arbeiten. Möchtest du einen Kaffee trinken?', 'Рамка предложения', 'Модальный глагол стоит на втором месте, а смысловой — в конце в инфинитиве: Ich kann gut schwimmen. Wir müssen heute arbeiten. Möchtest du einen Kaffee trinken?'),
 ('möchten', 'Ввічлива форма «я хотів би»: ich möchte, du möchtest, er möchte, wir möchten. Ich möchte einen Tee, bitte. Так замовляють у кафе й магазині.', 'möchten', 'Вежливая форма «я хотел бы»: ich möchte, du möchtest, er möchte, wir möchten. Ich möchte einen Tee, bitte. Так заказывают в кафе и магазине.'),
 ],
 gaps=[
 'Ich ___ gut schwimmen.|kann|kannst,können,könnt|Я добре вмію плавати.|Я хорошо умею плавать.',
 'Wir ___ heute arbeiten.|müssen|muss,musst,müsst|Ми мусимо сьогодні працювати.|Мы должны сегодня работать.',
 'Du ___ hier nicht rauchen.|darfst|darf,dürfen,dürft|Тут не можна курити.|Здесь нельзя курить.',
 'Ich ___ einen Kaffee, bitte.|möchte|möchtest,möchten,möchtet|Я хотів би каву, будь ласка.|Я бы хотел кофе, пожалуйста.',
 'Er ___ nach Deutschland fahren.|will|willst,wollen,wollt|Він хоче поїхати до Німеччини.|Он хочет поехать в Германию.',
 'Ihr ___ Deutsch lernen.|müsst|muss,musst,müssen|Ви мусите вчити німецьку.|Вы должны учить немецкий.',
 ])

gr(id='g_separable', title='Відокремлювані дієслова', title_ru='Отделяемые глаголы', sub='aufstehen, einkaufen…',
 explain=[
 ('Префікс іде в кінець', 'У дієслів з префіксами an-, auf-, ein-, mit-, ab-, aus-, zu- префікс відділяється й іде в кінець речення: aufstehen → Ich stehe um sieben Uhr auf. einkaufen → Wir kaufen heute ein.', 'Приставка уходит в конец', 'У глаголов с приставками an-, auf-, ein-, mit-, ab-, aus-, zu- приставка отделяется и уходит в конец предложения: aufstehen → Ich stehe um sieben Uhr auf. einkaufen → Wir kaufen heute ein.'),
 ('З модальним', 'З модальним дієсловом відокремлюване дієслово залишається цілим в інфінітиві: Ich muss früh aufstehen. Wir wollen heute einkaufen.', 'С модальным', 'С модальным глаголом отделяемый глагол остаётся целым в инфинитиве: Ich muss früh aufstehen. Wir wollen heute einkaufen.'),
 ('Часті дієслова', 'aufstehen (вставати), anrufen (телефонувати), einkaufen (купувати), mitkommen (йти разом), fernsehen (дивитися телевізор), aufmachen (відкривати), zumachen (закривати).', 'Частые глаголы', 'aufstehen (вставать), anrufen (звонить), einkaufen (покупать), mitkommen (идти вместе), fernsehen (смотреть телевизор), aufmachen (открывать), zumachen (закрывать).'),
 ],
 gaps=[
 'Ich stehe um sieben Uhr ___.|auf|mit,zu,fern|Я встаю о сьомій.|Я встаю в семь.',
 'Wir kaufen heute ___.|ein|auf,an,mit|Ми сьогодні робимо покупки.|Мы сегодня делаем покупки.',
 'Er ruft mich ___.|an|mit,zu,fern|Він мені телефонує.|Он мне звонит.',
 'Kommst du ___?|mit|zu,fern,um|Ти йдеш з нами?|Ты идёшь с нами?',
 'Ich muss früh ___.|aufstehen|aufstehe,steht auf,stehen auf|Я мушу рано вставати.|Я должен рано вставать.',
 'Mach bitte die Tür ___.|zu|an,mit,ein|Зачини, будь ласка, двері.|Закрой, пожалуйста, дверь.',
 ])

gr(id='g_possessive', title='Присвійні займенники', title_ru='Притяжательные местоимения', sub='mein, dein, sein, ihr',
 explain=[
 ('Форми', 'ich → mein, du → dein, er → sein, sie → ihr, es → sein, wir → unser, ihr → euer, sie/Sie → ihr/Ihr. Закінчення такі, як у ein/kein: mein Bruder, meine Schwester, mein Kind, meine Kinder.', 'Формы', 'ich → mein, du → dein, er → sein, sie → ihr, es → sein, wir → unser, ihr → euer, sie/Sie → ihr/Ihr. Окончания такие же, как у ein/kein: mein Bruder, meine Schwester, mein Kind, meine Kinder.'),
 ('Знахідний відмінок', 'У чоловічому роді в Akkusativ: meinen, deinen, seinen: Ich liebe meinen Bruder. Du kennst meinen Vater.', 'Винительный падеж', 'В мужском роде в Akkusativ: meinen, deinen, seinen: Ich liebe meinen Bruder. Du kennst meinen Vater.'),
 ('Чий — чия', 'Займенник залежить від власника, а закінчення — від роду того, що належить: Anna und ihr Bruder. Peter und seine Schwester.', 'Чей — чья', 'Местоимение зависит от владельца, а окончание — от рода того, что принадлежит: Anna und ihr Bruder. Peter und seine Schwester.'),
 ],
 gaps=[
 'Das ist ___ Bruder.|mein|meine,meinen,meinem|Це мій брат.|Это мой брат.',
 'Das ist ___ Schwester.|meine|mein,meinen,meiner|Це моя сестра.|Это моя сестра.',
 'Wo ist ___ Handy?|dein|deine,deinen,deiner|Де твій телефон?|Где твой телефон?',
 'Anna und ___ Mann kommen.|ihr|sein,seine,ihre|Анна і її чоловік приходять.|Анна и её муж приходят.',
 'Peter und ___ Frau wohnen hier. (Peter = er)|seine|ihre,sein|Петро і його дружина живуть тут.|Пётр и его жена живут здесь.',
 'Ich liebe ___ Eltern.|meine|mein,meinen,meiner|Я люблю своїх батьків.|Я люблю своих родителей.',
 ])

gr(id='g_preps', title='Прийменники', title_ru='Предлоги', sub='in, an, auf, mit, zu, nach',
 explain=[
 ('З Dativ', 'Після mit, nach, von, zu, aus, bei, seit завжди давальний відмінок: mit dem Bus, nach der Arbeit, zu dem (zum) Arzt, aus der Ukraine. Артиклі в Dativ: dem (m, n), der (f), den + -n (pl).', 'С Dativ', 'После mit, nach, von, zu, aus, bei, seit всегда дательный падеж: mit dem Bus, nach der Arbeit, zu dem (zum) Arzt, aus der Ukraine. Артикли в Dativ: dem (m, n), der (f), den + -n (pl).'),
 ('Wo? і Wohin?', 'Прийменники in, an, auf, vor, hinter, neben, über, unter, zwischen: на питання Wo? (де?) — Dativ: Ich bin in der Schule. На питання Wohin? (куди?) — Akkusativ: Ich gehe in die Schule.', 'Wo? и Wohin?', 'Предлоги in, an, auf, vor, hinter, neben, über, unter, zwischen: на вопрос Wo? (где?) — Dativ: Ich bin in der Schule. На вопрос Wohin? (куда?) — Akkusativ: Ich gehe in die Schule.'),
 ('Скорочення', 'in dem → im, an dem → am, zu dem → zum, zu der → zur, in das → ins: Ich bin im Büro. Ich fahre zur Arbeit.', 'Сокращения', 'in dem → im, an dem → am, zu dem → zum, zu der → zur, in das → ins: Ich bin im Büro. Ich fahre zur Arbeit.'),
 ],
 gaps=[
 'Ich fahre mit ___ Bus.|dem|den,der,das|Я їду автобусом.|Я еду на автобусе.',
 'Ich wohne in ___ Stadt.|der|die,dem,den|Я живу в місті.|Я живу в городе.',
 'Ich gehe in ___ Schule.|die|der,dem,den|Я йду до школи.|Я иду в школу.',
 'Er kommt aus ___ Ukraine.|der|die,dem,den|Він родом з України.|Он родом из Украины.',
 'Nach ___ Arbeit gehe ich nach Hause.|der|die,dem,den|Після роботи я йду додому.|После работы я иду домой.',
 'Ich gehe zum ___.|Arzt|Arztes,Ärzte,Arzten|Я йду до лікаря.|Я иду к врачу.',
 ])

gr(id='g_perfekt', title='Минулий час Perfekt', title_ru='Прошедшее время Perfekt', sub='haben/sein + Partizip II',
 explain=[
 ('Утворення', 'Perfekt = haben або sein у теперішньому часі + Partizip II в кінці: Ich habe Deutsch gelernt. Wir haben Kaffee getrunken. Partizip II регулярних дієслів: ge- + основа + -t (machen → gemacht), сильних: ge- + ... + -en (trinken → getrunken).', 'Образование', 'Perfekt = haben или sein в настоящем времени + Partizip II в конце: Ich habe Deutsch gelernt. Wir haben Kaffee getrunken. Partizip II правильных глаголов: ge- + основа + -t (machen → gemacht), сильных: ge- + ... + -en (trinken → getrunken).'),
 ('haben чи sein', 'З sein — дієслова руху й зміни стану: gehen → ist gegangen, fahren → ist gefahren, kommen → ist gekommen, aufstehen → ist aufgestanden. З haben — усі інші.', 'haben или sein', 'С sein — глаголы движения и изменения состояния: gehen → ist gegangen, fahren → ist gefahren, kommen → ist gekommen, aufstehen → ist aufgestanden. С haben — все остальные.'),
 ('У розмові', 'У розмовній німецькій про минуле майже завжди кажуть Perfekt: Was hast du gestern gemacht? — Ich habe gearbeitet und bin dann nach Hause gegangen.', 'В разговоре', 'В разговорном немецком о прошлом почти всегда говорят Perfekt: Was hast du gestern gemacht? — Ich habe gearbeitet und bin dann nach Hause gegangen.'),
 ],
 gaps=[
 'Ich habe Deutsch ___.|gelernt|lernt,gelernen,lernte|Я вчив німецьку.|Я учил немецкий.',
 'Wir haben Kaffee ___.|getrunken|getrinkt,trinkt,getrunkt|Ми пили каву.|Мы пили кофе.',
 'Er ist nach Berlin ___.|gefahren|gefahrn,gefahrt,fährt|Він поїхав до Берліна.|Он поехал в Берлин.',
 'Gestern ___ ich lange gearbeitet.|habe|bin,hast,ist|Вчора я довго працював.|Вчера я долго работал.',
 'Sie ___ um sechs Uhr aufgestanden.|ist|hat,bin,bist|Вона встала о шостій.|Она встала в шесть.',
 'Hast du die Hausaufgaben ___?|gemacht|macht,gemachen,machte|Ти зробив домашнє завдання?|Ты сделал домашнее задание?',
 ])

gr(id='g_questions', title='Питальні слова', title_ru='Вопросительные слова', sub='wer, was, wo, wann…',
 explain=[
 ('Основні слова', 'wer (хто), was (що), wo (де), wohin (куди), woher (звідки), wann (коли), warum (чому), wie (як), wie viel (скільки), welcher (який з).', 'Основные слова', 'wer (кто), was (что), wo (где), wohin (куда), woher (откуда), wann (когда), warum (почему), wie (как), wie viel (сколько), welcher (какой из).'),
 ('Приклади', 'Wer bist du? Was machst du? Wo wohnst du? Woher kommst du? Wohin gehst du? Wann kommt der Bus? Warum lernst du Deutsch? Wie heißt du? Wie viel kostet das?', 'Примеры', 'Wer bist du? Was machst du? Wo wohnst du? Woher kommst du? Wohin gehst du? Wann kommt der Bus? Warum lernst du Deutsch? Wie heißt du? Wie viel kostet das?'),
 ('Wo, woher, wohin', 'Wo — місце: Wo bist du? Woher — походження: Woher kommst du? — Aus Kiew. Wohin — напрямок: Wohin fährst du? — Nach Berlin.', 'Wo, woher, wohin', 'Wo — место: Wo bist du? Woher — происхождение: Woher kommst du? — Aus Kiew. Wohin — направление: Wohin fährst du? — Nach Berlin.'),
 ],
 gaps=[
 '___ heißt du?|Wie|Wer,Wo,Wann|Як тебе звати?|Как тебя зовут?',
 '___ wohnst du?|Wo|Wohin,Woher,Wer|Де ти живеш?|Где ты живёшь?',
 '___ kommst du?|Woher|Wer,Wo,Wie viel|Звідки ти?|Откуда ты?',
 '___ fährst du?|Wohin|Wer,Wessen,Wo|Куди ти їдеш?|Куда ты едешь?',
 '___ kostet das Brot?|Wie viel|Wer,Wo,Wann|Скільки коштує хліб?|Сколько стоит хлеб?',
 '___ lernst du Deutsch?|Warum|Wohin,Woher,Wer|Чому ти вчиш німецьку?|Почему ты учишь немецкий?',
 ])
