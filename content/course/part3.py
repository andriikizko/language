# -*- coding: utf-8 -*-
blk(id='jobs', title='Професії', sub='ким працювати, офіс, колеги', nouns='jobs',
 adjs=[], adjlist=['wichtig','schwer','leicht','interessant','langweilig','müde','fertig'], verbs=['arbeiten','studieren','verkaufen','lernen','helfen'],
 explain=[
 ('Професія без артикля', 'Про професію кажуть без артикля: Ich bin Lehrer. Sie ist Ärztin. Er ist Student. Але з прикметником артикль потрібен: Er ist ein guter Koch.'),
 ('Жіночі форми', 'Жіночу форму утворює суфікс -in: der Lehrer → die Lehrerin, der Student → die Studentin, der Koch → die Köchin (з умляутом), der Arzt → die Ärztin. У множині -innen: die Lehrerinnen.'),
 ('Де й ким працювати', 'als — у ролі: Ich arbeite als Ingenieur. bei — у компанії: Ich arbeite bei einer Firma. in — у приміщенні: Ich arbeite in einer Schule, in einem Restaurant. Studieren — вчитися в університеті: Ich studiere in Köln.'),
 ('Питання про професію', 'Was sind Sie von Beruf? Was machen Sie beruflich? Als Antwort: Ich bin Verkäuferin. Wo arbeiten Sie? — Bei einer Bank. Для друзів: Was machst du beruflich?'),
 ('В офісі', 'der Chef (керівник), der Kollege / die Kollegin (колега), das Gehalt (зарплата), der Vertrag (договір), die Besprechung (нарада), der Urlaub (відпустка), die Schicht (зміна), der Feierabend (кінець робочого дня).'),
 ],
 gaps=[
 'Ein ___ arbeitet im Krankenhaus.|Arzt|Bäcker,Koch,Lehrer|Лікар працює в лікарні.|Врач работает в больнице.',
 'Ein ___ backt Brot.|Bäcker|Arzt,Lehrer,Polizist|Пекар пече хліб.|Пекарь печёт хлеб.',
 'Eine ___ arbeitet im Restaurant und kocht.|Köchin|Lehrerin,Ärztin,Studentin|Кухарка працює в ресторані й готує.|Повар работает в ресторане и готовит.',
 'Ich arbeite ___ Ingenieur.|als|bei,mit,für|Я працюю інженером.|Я работаю инженером.',
 'Meine ___ heißt Anna. Wir arbeiten zusammen.|Kollegin|Wohnung,Hose,Reise|Мою колежанку звати Анна. Ми працюємо разом.|Мою коллегу зовут Анна. Мы работаем вместе.',
 'Er ist ___ von Beruf.|Koch|Köchin,Kochen,Küche|Він за професією кухар.|Он по профессии повар.',
 'Ich arbeite bei einer ___ in Köln.|Firma|Hose,Brille,Suppe|Я працюю у фірмі в Кельні.|Я работаю в фирме в Кёльне.',
 'Mein ___ sagt: Die Besprechung beginnt um neun Uhr.|Chef|Tisch,Hund,Regen|Мій керівник каже: нарада починається о дев\'ятій.|Мой начальник говорит: совещание начинается в девять.',
 ],
 dialogs=[
 dict(title='Знайомство на курсах', lines=[
  'Anna|Was machen Sie beruflich?|Ким ви працюєте?|Кем вы работаете?',
  'Ben|Ich bin Ingenieur. Und Sie?|Я інженер. А ви?|Я инженер. А вы?',
  'Anna|Ich bin Lehrerin.|Я вчителька.|Я учительница.',
  'Ben|Wo arbeiten Sie?|Де ви працюєте?|Где вы работаете?',
  'Anna|In einer Schule in Köln.|У школі в Кельні.|В школе в Кёльне.'],
  qs=[('Ким працює Бен?','Кем работает Бен?',['Лікарем|Врачом','Інженером|Инженером','Вчителем|Учителем','Кухарем|Поваром'],1),
      ('Де працює Анна?','Где работает Анна?',['У лікарні|В больнице','У школі в Кельні|В школе в Кёльне','В офісі|В офисе','У ресторані|В ресторане'],1)]),
 ])

blk(id='tech', title='Техніка й телефон', sub='дзвінки, інтернет, пристрої', nouns='tech',
 adjs=[], adjlist=['neu','alt','kaputt','leicht','schnell','langsam','leer','voll'], verbs=['anrufen','telefonieren','schreiben','benutzen','fernsehen','anmachen','ausmachen'],
 explain=[
 ('Дзвінки', 'anrufen — відокремлюване дієслово: Ich rufe dich an. Наказовий спосіб: Ruf mich an! Telefonieren з mit + Dativ: Ich telefoniere mit meiner Mutter. Die Nummer, die Nachricht (повідомлення), der Anruf (дзвінок).'),
 ('Інтернет і пошта', 'im Internet suchen (шукати в інтернеті), eine E-Mail schreiben, eine Nachricht schicken, das WLAN, das Passwort. Ich schreibe dir eine E-Mail — «я напишу тобі листа»; «тобі» в Dativ: dir.'),
 ('Рід і артикль', 'das Handy, das Telefon, das Gerät, der Computer, der Laptop, der Bildschirm, der Drucker, die Tastatur, die Maus, die Kamera. Англійські слова теж мають рід, його треба запам\'ятати разом зі словом: der Computer, але das Handy.'),
 ('haben + kein', 'Мій телефон не має зарядки — Mein Handy hat keinen Akku mehr. Заперечення з іменником: kein (n), keine (f), keinen (m, Akkusativ). Der Akku — чоловічого роду, тому keinen.'),
 ('Не працює', 'Mein Handy ist kaputt — телефон зламаний. Das WLAN funktioniert nicht — вай-фай не працює. Der Akku ist leer — акумулятор порожній. Ich brauche ein Ladegerät — мені потрібен зарядний пристрій.'),
 ],
 gaps=[
 'Ich telefoniere mit meinem ___.|Handy|Mantel,Messer,Brot|Я розмовляю по мобільному.|Я разговариваю по мобильному.',
 'Ich schreibe eine ___.|E-Mail|Kabel,Drucker,Bildschirm|Я пишу листа (електронного).|Я пишу электронное письмо.',
 'Der Akku ist leer. Ich brauche ein ___.|Ladegerät|Kissen,Glas,Brötchen|Акумулятор розряджений. Мені потрібен зарядний пристрій.|Аккумулятор разряжен. Мне нужно зарядное устройство.',
 'Ich suche die Adresse im ___.|Internet|Kühlschrank,Garten,Bad|Я шукаю адресу в інтернеті.|Я ищу адрес в интернете.',
 'Abends sehe ich oft ___.|fern|auf,ab,mit|Увечері я часто дивлюся телевізор.|Вечером я часто смотрю телевизор.',
 'Der Computer hat einen ___.|Bildschirm|Rock,Schal,Mantel|У комп\'ютера є екран.|У компьютера есть экран.',
 'Ich ___ dich später an.|rufe|rufst,ruft,rufen|Я зателефоную тобі пізніше.|Я позвоню тебе позже.',
 'Mein Handy ist kaputt. Es ___ nicht.|funktioniert|funktionieren,funktionierst,funktioniere|Мій телефон зламаний. Він не працює.|Мой телефон сломан. Он не работает.',
 ],
 dialogs=[
 dict(title='Телефонна розмова', lines=[
  'Tom|Hallo, hier ist Tom. Ist Anna da?|Привіт, це Том. Анна вдома?|Привет, это Том. Анна дома?',
  'Mutter|Nein, sie ist nicht zu Hause. Soll ich etwas sagen?|Ні, її немає вдома. Щось передати?|Нет, её нет дома. Что-нибудь передать?',
  'Tom|Ja, bitte sagen Sie ihr: Tom hat angerufen.|Так, скажіть їй, будь ласка: Том дзвонив.|Да, скажите ей, пожалуйста: Том звонил.',
  'Mutter|Kein Problem. Hat sie Ihre Nummer?|Без проблем. Вона має ваш номер?|Без проблем. У неё есть ваш номер?',
  'Tom|Ja, sie hat meine Handynummer.|Так, вона має мій мобільний номер.|Да, у неё есть мой мобильный номер.'],
  qs=[('Хто дзвонив?','Кто звонил?',['Том','Анна','Мама|Мама','Бен'],0),
      ('Чи має Анна номер Тома?','Есть ли у Анны номер Тома?',['Так|Да','Ні|Нет','Не знає|Не знает','Лише домашній|Только домашний'],0)]),
 ])

blk(id='body', title='Тіло', sub='частини тіла, лікар, самопочуття', nouns='body',
 adjs='feel', verbs=['sehen','hören','laufen','waschen','duschen','schlafen','helfen'],
 explain=[
 ('Частини тіла', 'der Kopf, das Gesicht, das Auge, das Ohr, die Nase, der Mund, der Zahn, der Hals, der Arm, die Hand, der Finger, der Bauch, der Rücken, das Bein, das Knie, der Fuß. Рід треба вчити разом зі словом.'),
 ('Множина', 'das Auge → die Augen, das Ohr → die Ohren, die Hand → die Hände (умляут), der Fuß → die Füße, der Zahn → die Zähne, der Arm → die Arme, das Bein → die Beine. У слів «Augen, Ohren» після прийменника mit додається -n: mit den Augen.'),
 ('Біль', 'Ich habe Kopfschmerzen — у мене болить голова (Schmerzen — множина). Також Mein Bauch tut weh. Або Mir tut der Bauch weh. Все це готові звороти: просто підстав частину тіла.'),
 ('У лікаря', 'Was fehlt Ihnen? Wie geht es Ihnen? Ich bin krank. Ich habe Fieber, Husten, Schnupfen. Лікар виписує das Rezept, ви йдете в die Apotheke і купуєте die Tablette. Seit wann? — Seit zwei Tagen.'),
 ('Хто що робить із тілом', 'Ich putze mir die Zähne. Ich wasche mir die Hände. Тут «мені» стоїть у Dativ (mir): я чищу собі зуби. Це німецька особливість: частина тіла + mir/dir/sich.'),
 ],
 gaps=[
 'Mit den ___ sehe ich.|Augen|Ohren,Händen,Füßen|Очима я бачу.|Глазами я вижу.',
 'Mit den ___ höre ich.|Ohren|Augen,Zähnen,Beinen|Вухами я чую.|Ушами я слышу.',
 'Ich putze mir die ___.|Zähne|Hände,Haare,Augen|Я чищу зуби.|Я чищу зубы.',
 'Mein Kopf ist heiß. Ich habe ___.|Fieber|Hunger,Durst,Zeit|Моя голова гаряча. У мене температура.|Моя голова горячая. У меня температура.',
 'Ich bin krank. Ich muss zum ___.|Arzt|Bäcker,Koch,Lehrer|Я хворий. Мені треба до лікаря.|Я болен. Мне нужно к врачу.',
 'Der Arzt gibt mir ein ___ für die Apotheke.|Rezept|Fenster,Kissen,Auto|Лікар дає мені рецепт для аптеки.|Врач даёт мне рецепт для аптеки.',
 'Mein ___ tut weh. Ich brauche eine Tablette.|Kopf|Haus,Bild,Buch|Моя голова болить. Мені потрібна таблетка.|Моя голова болит. Мне нужна таблетка.',
 'Ich bin krank. Ich bleibe im ___.|Bett|Park,Büro,Flugzeug|Я хворий. Я залишаюся в ліжку.|Я болен. Я остаюсь в постели.',
 ],
 dialogs=[
 dict(title='У лікаря', lines=[
  'Arzt|Guten Tag. Was fehlt Ihnen?|Добрий день. Що вас турбує?|Добрый день. Что вас беспокоит?',
  'Patient|Ich habe Kopfschmerzen und Fieber.|У мене болить голова і температура.|У меня болит голова и температура.',
  'Arzt|Seit wann?|Відколи?|С каких пор?',
  'Patient|Seit zwei Tagen.|Вже два дні.|Уже два дня.',
  'Arzt|Sie haben eine Grippe. Bleiben Sie im Bett und trinken Sie viel Tee.|У вас грип. Залишайтеся в ліжку й пийте багато чаю.|У вас грипп. Оставайтесь в постели и пейте много чая.'],
  qs=[('Відколи хворий пацієнт?','С каких пор болен пациент?',['Один день|Один день','Два дні|Два дня','Тиждень|Неделя','Місяць|Месяц'],1),
      ('Що радить лікар?','Что советует врач?',['Лишатися в ліжку й пити чай|Оставаться в постели и пить чай','Піти на роботу|Идти на работу','Їсти більше|Есть больше','Бігати|Бегать'],0)]),
 ])

blk(id='hobby', title='Хобі й вільний час', sub='спорт, музика, погода', nouns='hobby',
 adjs=[], adjlist=['lustig','interessant','langweilig','müde','frei','fröhlich','kalt','warm','heiß'], verbs=['spielen','singen','tanzen','schwimmen','wandern','lesen','lachen','sammeln'],
 explain=[
 ('gern', 'Ich spiele gern Fußball — я люблю грати у футбол. Слово gern ставимо після дієслова: Ich höre gern Musik. Ich lese gern Bücher. Не люблю — nicht gern: Ich koche nicht gern.'),
 ('spielen', 'Spielen вживається зі спортом і інструментами: Fußball spielen, Tennis spielen, Gitarre spielen, Klavier spielen. Також Karten spielen, Schach spielen. Du spielst, er spielt — правильне дієслово.'),
 ('gehen + інфінітив', 'Для руху «йду займатися» німці кажуть gehen + інфінітив у кінці: Ich gehe schwimmen. Wir gehen wandern. Ich gehe einkaufen. Дієслово gehen змінюється, інфінітив залишається в кінці речення.'),
 ('Погода', 'Es regnet. Es schneit. Die Sonne scheint. Es ist kalt, warm, heiß. Das Wetter ist schön. Der Wind — der Wind. Слово es у «Es regnet» — формальний підмет, його завжди треба ставити.'),
 ('Як часто', 'immer (завжди), oft (часто), manchmal (іноді), selten (рідко), nie (ніколи). Слово стоїть після дієслова: Ich gehe oft schwimmen. Ich spiele manchmal Gitarre.'),
 ],
 gaps=[
 'Ich spiele gern ___.|Fußball|Brot,Tür,Hose|Я люблю грати у футбол.|Я люблю играть в футбол.',
 'Am Wochenende gehe ich ___.|wandern|Wanderung,Wander,wanderst|На вихідних я ходжу в похід.|В выходные я хожу в поход.',
 'Ich höre gern ___.|Musik|Brot,Tisch,Schuh|Я люблю слухати музику.|Я люблю слушать музыку.',
 'Im Winter gibt es oft ___.|Schnee|Gras,Sand,Hitze|Взимку часто буває сніг.|Зимой часто бывает снег.',
 'Heute scheint die ___. Es ist warm.|Sonne|Mond,Regen,Wind|Сьогодні світить сонце. Тепло.|Сегодня светит солнце. Тепло.',
 'In meiner Freizeit ___ ich Gitarre.|spiele|spielst,spielt,spielen|У вільний час я граю на гітарі.|В свободное время я играю на гитаре.',
 'Ich lese gern ein ___.|Buch|Brot,Messer,Brötchen|Я люблю читати книгу.|Я люблю читать книгу.',
 'Wir gehen zusammen ins ___.|Kino|Wetter,Brot,Telefon|Ми йдемо разом у кіно.|Мы идём вместе в кино.',
 ],
 dialogs=[
 dict(title='Вільний час', lines=[
  'Anna|Was machst du in deiner Freizeit?|Що ти робиш у вільний час?|Что ты делаешь в свободное время?',
  'Ben|Ich spiele Fußball und gehe oft schwimmen.|Я граю у футбол і часто ходжу плавати.|Я играю в футбол и часто хожу плавать.',
  'Anna|Und am Wochenende?|А на вихідних?|А в выходные?',
  'Ben|Am Wochenende wandere ich mit meiner Familie.|На вихідних я ходжу в похід з родиною.|В выходные я хожу в поход с семьёй.'],
  qs=[('Чим займається Бен у вільний час?','Чем занимается Бен в свободное время?',['Футбол і плавання|Футбол и плавание','Танці й спів|Танцы и пение','Читання|Чтение','Шахи|Шахматы'],0),
      ('Що Бен робить на вихідних?','Что Бен делает в выходные?',['Ходить у похід із родиною|Ходит в поход с семьёй','Спить|Спит','Працює|Работает','Вчить німецьку|Учит немецкий'],0)]),
 ])
