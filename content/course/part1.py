# -*- coding: utf-8 -*-
# Формат: gap = "речення з ___|правильно|хибні,через,кому|uk|ru"; line = "Хто|de|uk|ru"; q = (uk, ru, ["uk|ru",...], індекс_правильного)
B = []
def blk(**k): B.append(k)

blk(id='numbers', title='Цифри й числа', sub='0–100, сотні, гроші', nouns='numbers',
 adjs=[], verbs=['zählen','rechnen','kosten','bezahlen'], numq=True,
 explain=[
 ('Числа 0–12', 'null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf. Їх треба вивчити напам\'ять — вони не утворюються за правилом. Слово «eins» стоїть саме по собі, а перед іменником число «один» — це ein / eine: ein Euro, eine Stunde.'),
 ('Числа 13–19', 'Одиниця + zehn: dreizehn, vierzehn, fünfzehn, achtzehn, neunzehn. Два винятки: sechzehn (а не sechszehn) і siebzehn (а не siebenzehn) — у них випадає частина слова.'),
 ('Десятки', 'zwanzig, dreißig, vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig. Dreißig — єдине з «ß». Sechzig і siebzig, як і 16 та 17, скорочені: sechs → sech-, sieben → sieb-.'),
 ('Складні числа 21–99', 'Німці читають спочатку одиниці, потім «und», потім десятки, і все це одним словом: 21 — einundzwanzig, 34 — vierunddreißig, 99 — neunundneunzig. У складних числах «один» втрачає -s: ein-und-zwanzig, а не eins-und-zwanzig.'),
 ('Сотні й тисячі', '100 — hundert, 200 — zweihundert, 350 — dreihundertfünfzig, 1000 — tausend, 2000 — zweitausend. Після сотень слово «und» не ставлять: 125 — hundertfünfundzwanzig. Мільйон — eine Million (жіночого роду).'),
 ('Гроші й телефон', '3,50 € читається drei Euro fünfzig. Після числа Euro і Cent не змінюються: zwei Euro, fünf Cent. Номер телефону називають цифра за цифрою, нуль — null: 0151 → null eins fünf eins.'),
 ],
 gaps=[
 'Zwei plus drei ist ___.|fünf|vier,sechs,acht|Два плюс три — ___.|Два плюс три — ___.',
 'Zehn minus vier ist ___.|sechs|fünf,sieben,acht|Десять мінус чотири — ___.|Десять минус четыре — ___.',
 'Ein Dutzend hat ___ Stück.|zwölf|zehn,elf,zwanzig|У дюжині ___ штук.|В дюжине ___ штук.',
 'Die Zahl 21 heißt ___.|einundzwanzig|zweiundzwanzig,einszwanzig,zwanzigeins|Число 21 називається ___.|Число 21 называется ___.',
 'Das Brot kostet 3,50 Euro, also drei Euro ___.|fünfzig|fünfunddreißig,zehn,zwanzig|Хліб коштує 3,50 € (три євро п\'ятдесят).|Хлеб стоит 3,50 € (три евро пятьдесят).',
 'Mein Bruder ist ___ Jahre alt.|sechzehn|sechzig,sechszehn,sechzen|Моєму брату 16 років.|Моему брату 16 лет.',
 'Ein Euro hat hundert ___.|Cent|Euro,Meter,Gramm|В одному євро сто ___.|В одном евро сто ___.',
 'Dreißig plus vierzig ist ___.|siebzig|sechzig,achtzig,fünfzig|Тридцять плюс сорок — ___.|Тридцать плюс сорок — ___.',
 ],
 dialogs=[
 dict(title='У супермаркеті', lines=[
  'Verkäuferin|Guten Tag! Was möchten Sie?|Добрий день! Що бажаєте?|Добрый день! Что желаете?',
  'Kunde|Ich möchte ein Brot und zwei Brötchen, bitte.|Я хочу один хліб і дві булочки, будь ласка.|Я хочу один хлеб и две булочки, пожалуйста.',
  'Verkäuferin|Das macht vier Euro fünfzig.|Разом чотири євро п\'ятдесят.|Всего четыре евро пятьдесят.',
  'Kunde|Hier sind fünf Euro.|Ось п\'ять євро.|Вот пять евро.',
  'Verkäuferin|Danke! Sie bekommen fünfzig Cent zurück.|Дякую! Ви отримуєте назад п\'ятдесят центів.|Спасибо! Вы получаете обратно пятьдесят центов.'],
  qs=[('Скільки коштує покупка?','Сколько стоит покупка?',['2,50 €','3,50 €','5,00 €','1,50 €'],1),
      ('Скільки решти отримує покупець?','Сколько сдачи получает покупатель?',['1,50 €','2,50 €','3,50 €','0,50 €'],0)]),
 dict(title='Знайомство', lines=[
  'Anna|Wie ist deine Telefonnummer?|Який твій номер телефону?|Какой у тебя номер телефона?',
  'Ben|Null eins fünf eins, zwei drei vier, sechs sieben acht.|0151 234 678.|0151 234 678.',
  'Anna|Danke. Wie alt bist du?|Дякую. Скільки тобі років?|Спасибо. Сколько тебе лет?',
  'Ben|Ich bin dreiundzwanzig. Und du?|Мені двадцять три. А тобі?|Мне двадцать три. А тебе?',
  'Anna|Ich bin zweiundzwanzig.|Мені двадцять два.|Мне двадцать два.'],
  qs=[('Скільки років Бену?','Сколько лет Бену?',['22','23','32','13'],1),
      ('Скільки років Анні?','Сколько лет Анне?',['23','12','22','32'],2)]),
 ])

blk(id='days', title='Дні тижня й місяці', sub='час, дата, години', nouns='days',
 adjs=[], verbs=['anfangen','aufstehen','arbeiten','warten','ankommen'],
 explain=[
 ('Дні тижня', 'der Montag, der Dienstag, der Mittwoch, der Donnerstag, der Freitag, der Samstag, der Sonntag. Усі дні чоловічого роду. Скорочення: Mo, Di, Mi, Do, Fr, Sa, So. Субота й неділя разом — das Wochenende. «У понеділок» — am Montag.'),
 ('Місяці й пори року', 'Усі місяці теж чоловічого роду: der Januar, der Februar, der März, der April, der Mai, der Juni, der Juli, der August, der September, der Oktober, der November, der Dezember. Пори року: der Frühling, der Sommer, der Herbst, der Winter. «У січні, влітку» — im Januar, im Sommer.'),
 ('am, im, um — коли?', 'am + день і частина дня: am Montag, am Morgen, am Abend, am Wochenende. im + місяць і пора року: im Mai, im Winter. um + година: um acht Uhr. Виняток: ніч — in der Nacht (або просто nachts).'),
 ('Година', 'Wie spät ist es? — Es ist acht Uhr. Viertel nach acht = 8:15, Viertel vor neun = 8:45. Увага: halb neun = 8:30. Німці рахують «пів до наступної години», тобто halb neun — це пів на дев\'яту. 14:30 в офіційній мові — vierzehn Uhr dreißig.'),
 ('Рік і вік', 'Вік: Ich bin 35 (fünfunddreißig) Jahre alt. Рік народження: Ich bin 1991 geboren. Роки до 2000 читають «сотнями»: 1991 — neunzehnhunderteinundneunzig (дев\'ятнадцять сотень і дев\'яносто один). Дату народження — порядковим: am sechsten Januar.'),
 ('Дата', 'Der Wievielte ist heute? — Heute ist der fünfte Mai. Дату читають порядковим числівником із артиклем: der erste, der zweite, der dritte, der siebte. «П\'ятого травня» — am fünften Mai.'),
 ],
 gaps=[
 '___ Montag habe ich einen Termin.|Am|Im,Um,In|У понеділок я маю зустріч.|В понедельник у меня встреча.',
 'Im ___ ist es kalt.|Winter|Sommer,Juli,August|Взимку холодно.|Зимой холодно.',
 'Ein Jahr hat zwölf ___.|Monate|Tage,Wochen,Stunden|В році дванадцять місяців.|В году двенадцать месяцев.',
 'Der Tag nach Montag ist ___.|Dienstag|Mittwoch,Sonntag,Freitag|День після понеділка — ___.|День после понедельника — ___.',
 'Samstag und Sonntag sind das ___.|Wochenende|Monat,Jahr,Abend|Субота й неділя — це ___.|Суббота и воскресенье — это ___.',
 'Der Kurs beginnt ___ neun Uhr.|um|am,im,in|Курс починається о дев\'ятій годині.|Курс начинается в девять часов.',
 'Mein Geburtstag ist ___ Juli.|im|am,um,in|Мій день народження в липні.|Мой день рождения в июле.',
 'Heute ist Freitag. Morgen ist ___.|Samstag|Donnerstag,Sonntag,Montag|Сьогодні п\'ятниця. Завтра — ___.|Сегодня пятница. Завтра — ___.',
 'Halb neun ist ___ Uhr.|8:30|9:30,8:15,9:00|Пів на дев\'яту — це ___.|Половина девятого — это ___.',
 ],
 dialogs=[
 dict(title='Запис до лікаря', lines=[
  'Patient|Guten Tag, ich möchte einen Termin.|Добрий день, я хочу записатися.|Добрый день, я хочу записаться.',
  'Praxis|Gern. Passt Ihnen Dienstag um zehn Uhr?|Залюбки. Вам підходить вівторок о десятій?|Пожалуйста. Вам подходит вторник в десять?',
  'Patient|Am Dienstag habe ich leider keine Zeit. Geht es am Mittwoch?|У вівторок я, на жаль, не маю часу. Чи можна в середу?|Во вторник у меня, к сожалению, нет времени. Можно в среду?',
  'Praxis|Ja, am Mittwoch um halb elf.|Так, у середу о пів на одинадцяту.|Да, в среду в половине одиннадцатого.',
  'Patient|Perfekt, danke!|Чудово, дякую!|Отлично, спасибо!'],
  qs=[('Який день тижня домовилися?','Какой день недели договорились?',['Вівторок|Вторник','Середа|Среда','Четвер|Четверг','Понеділок|Понедельник'],1),
      ('О котрій годині запис?','В котором часу запись?',['10:00','11:30','10:30','9:30'],2)]),
 ])

blk(id='colors', title='Кольори', sub='прикметники й опис речей',
 nouns=['Farbe','Blume','Himmel','Sonne','Schnee','Gras','Wolke','Meer','Blut','Apfel','Zitrone','Orange','Banane','Tomate','Gurke','Karotte','Muster'],
 adjs='colors', verbs=[],
 explain=[
 ('Основні кольори', 'rot, blau, gelb, grün, schwarz, weiß, grau, braun, orange, rosa, lila, beige. Це прикметники, а не іменники: з маленької літери.'),
 ('Колір після sein', 'Після sein (бути) прикметник не змінюється і не залежить від роду: Der Tisch ist rot. Die Tür ist rot. Das Auto ist rot. Die Autos sind rot.'),
 ('Колір перед іменником', 'Перед іменником у прикметника з\'являється закінчення: ein roter Tisch, eine rote Tür, ein rotes Auto. Повну тему закінчень вивчимо пізніше; поки запам\'ятай, що sein-конструкція (ist rot) закінчень не потребує.'),
 ('hell- і dunkel-', 'Відтінки утворюються приєднанням: hellblau, dunkelgrün, hellgrau, dunkelbraun. Кольори orange, rosa, lila, beige закінчень не отримують навіть перед іменником: ein rosa Kleid, eine lila Jacke.'),
 ('Питання про колір', 'Welche Farbe hat dein Auto? — Mein Auto ist schwarz. Wie gefällt dir die Farbe? — Sie gefällt mir. Слово die Farbe означає і «колір», і «фарба».'),
 ],
 gaps=[
 'Der Himmel ist ___.|blau|grün,rot,braun|Небо блакитне.|Небо голубое.',
 'Eine Banane ist ___.|gelb|blau,schwarz,lila|Банан жовтий.|Банан жёлтый.',
 'Schnee ist ___.|weiß|gelb,grün,braun|Сніг білий.|Снег белый.',
 'Gras ist ___.|grün|rot,blau,schwarz|Трава зелена.|Трава зелёная.',
 'Eine Tomate ist ___.|rot|blau,schwarz,weiß|Помідор червоний.|Помидор красный.',
 'Die Nacht ist ___.|dunkel|hell,rot,gelb|Ніч темна.|Ночь тёмная.',
 'Welche ___ hat dein Auto?|Farbe|Tasse,Hose,Schule|Якого кольору твоя машина?|Какого цвета твоя машина?',
 'Rot und Gelb ergibt ___.|orange|grün,lila,grau|Червоний і жовтий дають ___.|Красный и жёлтый дают ___.',
 ],
 dialogs=[
 dict(title='У магазині одягу', lines=[
  'Kundin|Guten Tag, ich suche eine Jacke.|Добрий день, я шукаю куртку.|Добрый день, я ищу куртку.',
  'Verkäufer|Welche Farbe möchten Sie?|Якого кольору бажаєте?|Какого цвета желаете?',
  'Kundin|Schwarz oder dunkelblau.|Чорну або темно-синю.|Чёрную или тёмно-синюю.',
  'Verkäufer|Diese Jacke gibt es in Schwarz und in Grau.|Ця куртка є в чорному та в сірому.|Эта куртка есть в чёрном и в сером.',
  'Kundin|Dann nehme ich Grau, bitte.|Тоді я візьму сіру, будь ласка.|Тогда я возьму серую, пожалуйста.'],
  qs=[('Які кольори назвала покупниця?','Какие цвета назвала покупательница?',['Чорний або темно-синій|Чёрный или тёмно-синий','Червоний або жовтий|Красный или жёлтый','Білий або сірий|Белый или серый','Зелений або коричневий|Зелёный или коричневый'],0),
      ('Яку куртку вона взяла?','Какую куртку она взяла?',['Чорну|Чёрную','Сіру|Серую','Темно-синю|Тёмно-синюю','Жодної|Никакую'],1)]),
 ])

blk(id='family', title='Родина', sub='хто є хто, вік, діти', nouns='family',
 adjs='feel', adjlist=['verheiratet','ledig','freundlich','nett','jung','alt','glücklich','traurig','krank','gesund','müde','fröhlich'], verbs=['heißen','wohnen','heiraten','leben','lieben','kennen'],
 explain=[
 ('Члени родини', 'der Vater — die Mutter, der Bruder — die Schwester, der Sohn — die Tochter, der Onkel — die Tante, der Opa — die Oma. Слова die Eltern (батьки), die Geschwister (брати й сестри), die Großeltern (дідусь і бабуся) вживаються лише у множині: Meine Eltern sind nett.'),
 ('Присвійні mein, dein, sein, ihr', 'Закінчення залежить від роду того, що належить: mein Vater (m), meine Mutter (f), mein Kind (n), meine Eltern (мн.). Sein — «його», ihr — «її»: Das ist sein Bruder (його брат). Das ist ihr Bruder (її брат).'),
 ('Ich habe + Akkusativ', 'Після haben іменник стоїть в Akkusativ: чоловічий рід змінюється — ein → einen. Ich habe einen Bruder (m), eine Schwester (f), ein Kind (n). Заперечення: Ich habe keinen Bruder, keine Schwester, kein Kind.'),
 ('Множина з умляутом', 'У багатьох слів родини множина утворюється з умляутом: der Vater → die Väter, die Mutter → die Mütter, der Bruder → die Brüder, die Tochter → die Töchter. Der Sohn → die Söhne (умляут + -e).'),
 ('Вік і стан', 'Wie alt bist du? — Ich bin 25 Jahre alt. Слово Jahre після числа лишається, «alt» ставимо в кінці. Verheiratet — одружений/заміжня, ledig — неодружений/незаміжня. Ich habe zwei Kinder — у мене двоє дітей.'),
 ],
 gaps=[
 'Das ist ___ Mutter.|meine|mein,meinen,meiner|Це моя мама.|Это моя мама.',
 'Das ist ___ Bruder.|mein|meine,meinen,meiner|Це мій брат.|Это мой брат.',
 'Ich habe ___ Schwester.|eine|ein,einen,einer|У мене є сестра.|У меня есть сестра.',
 'Ich habe ___ Bruder.|einen|ein,eine,einer|У мене є брат.|У меня есть брат.',
 'Meine Eltern sind meine Mutter und mein ___.|Vater|Sohn,Onkel,Opa|Мої батьки — це моя мама і мій ___.|Мои родители — это моя мама и мой ___.',
 'Die Mutter meiner Mutter ist meine ___.|Großmutter|Tante,Schwester,Cousine|Мама моєї мами — моя ___.|Мама моей мамы — моя ___.',
 'Mein Bruder und meine Schwester sind meine ___.|Geschwister|Eltern,Großeltern,Enkel|Мій брат і моя сестра — мої ___.|Мой брат и моя сестра — мои ___.',
 'Wie viele ___ hast du?|Kinder|Kind,Kindern,Kinde|Скільки в тебе дітей?|Сколько у тебя детей?',
 'Der Sohn von meinem Onkel ist mein ___.|Cousin|Neffe,Opa,Enkel|Син мого дядька — мій двоюрідний брат.|Сын моего дяди — мой двоюродный брат.',
 ],
 dialogs=[
 dict(title='Фото родини', lines=[
  'Anna|Wer ist das auf dem Foto?|Хто це на фото?|Кто это на фото?',
  'Ben|Das ist meine Familie. Das sind mein Vater und meine Mutter.|Це моя родина. Це мій тато і моя мама.|Это моя семья. Это мой папа и моя мама.',
  'Anna|Und wer ist das?|А хто це?|А кто это?',
  'Ben|Das ist meine Schwester Lisa. Sie ist zwölf Jahre alt.|Це моя сестра Ліза. Їй дванадцять років.|Это моя сестра Лиза. Ей двенадцать лет.',
  'Anna|Hast du auch einen Bruder?|У тебе є ще й брат?|У тебя есть ещё и брат?',
  'Ben|Nein, ich habe nur eine Schwester.|Ні, у мене лише сестра.|Нет, у меня только сестра.'],
  qs=[('Скільки років Лізі?','Сколько лет Лизе?',['2','12','20','21'],1),
      ('Чи є у Бена брат?','Есть ли у Бена брат?',['Так, один|Да, один','Так, двоє|Да, двое','Ні|Нет','Невідомо|Неизвестно'],2)]),
 ])
