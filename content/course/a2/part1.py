# -*- coding: utf-8 -*-
# Формат: gap = "речення з ___|правильно|хибні,через,кому|uk|ru"; line = "Хто|de|uk|ru"; q = (uk, ru, ["uk|ru",...], індекс_правильного)
B = []
def blk(**k): B.append(k)

blk(id='a2_health', title='Здоров\'я й лікар', sub='запис, симптоми, аптека', nouns='a2_health', adjs=[],
 verbs=['sich fühlen','untersuchen','wehtun','einnehmen','husten','sich erholen','messen','impfen','behandeln','sich verletzen'],
 explain=[
 ('У лікаря: типові фрази', 'Ich habe einen Termin um 10 Uhr. Was fehlt Ihnen? — Mir geht es nicht gut. Ich habe seit zwei Tagen Fieber. Wo tut es weh? — Der Rücken tut mir weh. Зверни увагу: «мені болить» — це mir (Dativ) + tut weh. Лікарняний листок називається die Krankschreibung: Ich brauche eine Krankschreibung für meinen Arbeitgeber.'),
 ('Perfekt: що сталося?', 'Про минуле в розмові кажуть Perfekt: haben + Partizip II. Ich habe Tabletten genommen. Der Arzt hat mich untersucht. Partizip II регулярних дієслів: ge- + основа + -t (gemacht, gekauft). Неправильних: ge- + ... + -en (genommen, gegessen). Без ge-: дієслова з be-, ver-, er-, ent- та на -ieren (bekommen, verloren, untersucht). Докладно — у розділі «Граматика».'),
 ('Поради лікаря', 'Sie müssen viel trinken. Sie sollen im Bett bleiben. Наказовий спосіб ввічливої форми: Nehmen Sie die Tabletten dreimal am Tag. Ruhen Sie sich aus. Trinken Sie viel Tee. Дієслово стоїть на першому місці, після нього — Sie.'),
 ('В аптеці', 'Ich möchte etwas gegen Husten. Haben Sie Tropfen oder Salbe? Wie oft muss ich das nehmen? — Dreimal täglich nach dem Essen. Ліки «за рецептом» — rezeptpflichtig, без рецепта — rezeptfrei. Рецепт (das Rezept) виписує лікар.'),
 ('Страхування й екстрені випадки', 'У Німеччині лікар просить картку: die Gesundheitskarte. Ви застраховані в die Krankenkasse, і вона платить за лікування. Екстрений виклик — 112 (швидка, пожежна). Черговий лікар у неробочий час — 116 117. Закликати на допомогу: Hilfe! Ich brauche einen Krankenwagen!'),
 ],
 gaps=[
 'Ich habe einen ___ beim Arzt um zehn Uhr.|Termin|Fieber|Rezept,Spritze|У мене запис до лікаря о десятій.|У меня запись к врачу на десять часов.',
 'Der Rücken tut ___ weh.|mir|ich|mich,mein|Спина мене болить.|У меня болит спина.',
 'Der Arzt hat mich ___.|untersucht|untersuchen|untersuchst,geuntersucht|Лікар мене обстежив.|Врач меня обследовал.',
 'Ich habe Tabletten ___.|genommen|genommt|nehmen,genehmen|Я приймав таблетки.|Я принимал таблетки.',
 'Sie müssen viel Wasser ___.|trinken|trinkt|getrunken,trinke|Ви маєте пити багато води.|Вы должны пить много воды.',
 '___ Sie die Tabletten dreimal am Tag!|Nehmen|Nimmt|Nehme,Genommen|Приймайте таблетки тричі на день!|Принимайте таблетки три раза в день!',
 'In der ___ bekomme ich die Medikamente.|Apotheke|Praxis|Bäckerei,Schule|В аптеці я отримую ліки.|В аптеке я получаю лекарства.',
 'Das Medikament gibt es nur mit ___.|Rezept|Salbe|Termin,Spritze|Цей препарат продається лише за рецептом.|Этот препарат продаётся только по рецепту.',
 'Ich habe Husten und ___.|Schnupfen|Zahnarzt|Verband,Termin|У мене кашель і нежить.|У меня кашель и насморк.',
 'Die Krankenkasse ___ die Behandlung.|bezahlt|bezahlen|bezahlst,gezahlt|Лікарняна каса оплачує лікування.|Больничная касса оплачивает лечение.',
 'Bei einem Notfall rufe ich die ___ an.|112|110,116,119|У разі надзвичайної ситуації я дзвоню 112.|В экстренном случае я звоню 112.',
 'Seit drei Tagen ___ ich Fieber.|habe|bin|werde,hat|Вже три дні в мене температура.|Уже три дня у меня температура.',
 'Ich brauche eine ___ für meinen Chef.|Krankschreibung|Sprechstunde|Impfung,Praxis|Мені потрібен лікарняний для мого керівника.|Мне нужен больничный для моего начальника.',
 'Er hat sich beim Sport ___.|verletzt|verletzen|verletzte,geverletzt|Він травмувався під час спорту.|Он получил травму во время спорта.',
 ],
 dialogs=[
 dict(title='Запис до лікаря', lines=[
  'Praxis|Praxis Dr. Lange, guten Tag.|Практика доктора Ланге, добрий день.|Практика доктора Ланге, добрый день.',
  'Patient|Guten Tag, ich möchte einen Termin machen. Ich habe seit drei Tagen Fieber.|Добрий день, я хочу записатися. У мене три дні температура.|Добрый день, я хочу записаться. У меня три дня температура.',
  'Praxis|Können Sie heute um 15 Uhr kommen?|Чи можете прийти сьогодні о 15:00?|Можете прийти сегодня в 15:00?',
  'Patient|Ja, das passt. Muss ich etwas mitbringen?|Так, мені підходить. Мені треба щось принести?|Да, подходит. Мне нужно что-то принести?',
  'Praxis|Bringen Sie bitte Ihre Gesundheitskarte mit.|Візьміть, будь ласка, свою медичну картку.|Возьмите, пожалуйста, свою медицинскую карту.'],
  qs=[('Що в пацієнта?','Что у пациента?',['Біль у спині|Боль в спине','Температура|Температура','Кашель|Кашель','Алергія|Аллергия'],1),
      ('Коли запис?','Когда запись?',['Сьогодні о 15:00|Сегодня в 15:00','Завтра о 15:00|Завтра в 15:00','Сьогодні о 10:00|Сегодня в 10:00','У понеділок|В понедельник'],0)]),
 dict(title='В аптеці', lines=[
  'Kunde|Guten Tag, ich möchte etwas gegen Husten.|Добрий день, мені потрібно щось від кашлю.|Добрый день, мне нужно что-то от кашля.',
  'Apothekerin|Haben Sie ein Rezept?|У вас є рецепт?|У вас есть рецепт?',
  'Kunde|Nein, leider nicht.|Ні, на жаль.|Нет, к сожалению.',
  'Apothekerin|Dann gebe ich Ihnen Tropfen. Nehmen Sie dreimal täglich zehn Tropfen.|Тоді дам вам краплі. Приймайте тричі на день по десять крапель.|Тогда дам вам капли. Принимайте три раза в день по десять капель.',
  'Kunde|Danke. Was kostet das?|Дякую. Скільки це коштує?|Спасибо. Сколько это стоит?',
  'Apothekerin|Das macht 8,50 Euro.|Це 8,50 євро.|Это 8,50 евро.'],
  qs=[('Що дає аптекарка?','Что даёт аптекарь?',['Краплі|Капли','Мазь|Мазь','Таблетки|Таблетки','Пластир|Пластырь'],0),
      ('Скільки коштує?','Сколько стоит?',['5,80 €|5,80 €','8,50 €|8,50 €','10,50 €|10,50 €','3,50 €|3,50 €'],1)]),
 ])

blk(id='a2_travel', title='Подорожі', sub='відпустка, готель, вокзал, Perfekt з sein', nouns='a2_travel', adjs=[],
 verbs=['buchen','verreisen','übernachten','packen','besichtigen','fotografieren','genießen','landen','verpassen','abfliegen','stornieren','vermissen'],
 explain=[
 ('Планування поїздки', 'Ich möchte einen Flug nach Wien buchen. Wir haben ein Hotelzimmer für drei Nächte reserviert. Wann fliegt das Flugzeug ab? Wann kommt es an? Використовуй haben для buchen/reservieren (Perfekt: gebucht, reserviert) та sein для руху: Wir sind nach Wien geflogen.'),
 ('Perfekt з sein', 'Дієслова руху й зміни стану утворюють Perfekt з sein: gehen → ist gegangen, fahren → ist gefahren, fliegen → ist geflogen, kommen → ist gekommen, ankommen → ist angekommen, bleiben → ist geblieben. Ich bin gestern angekommen. Wir sind zwei Wochen geblieben. Дієслова без руху — з haben: Ich habe viel fotografiert.'),
 ('У готелі', 'Ich habe ein Zimmer reserviert. Auf den Namen Koval. Ist das Frühstück inklusive? — Ja, von 7 bis 10 Uhr. Wo ist der Aufzug? Können Sie mir ein Taxi rufen? Бронювання: die Buchung. Скасувати — stornieren: Ich möchte die Buchung stornieren.'),
 ('Präteritum: war і hatte', 'Про минулу подорож часто використовують Präteritum від sein і haben: Das Wetter war schön. Wir waren am Strand. Das Hotel hatte einen Pool. Es war nicht teuer. Вони короткі й зручніші за Perfekt: ich war, du warst, er war, wir waren; ich hatte, du hattest, er hatte, wir hatten.'),
 ('Затримки й проблеми', 'Der Zug hat Verspätung. Wir sind im Stau gestanden. Ich habe meinen Anschluss verpasst. Mein Gepäck ist nicht angekommen. Ich möchte eine Reklamation machen. Корисні слова: der Flug, der Koffer, der Reisepass, das Gepäck, die Grenze, die Verspätung, der Stau.'),
 ],
 gaps=[
 'Wir haben ein Hotelzimmer für drei Nächte ___.|gebucht|buchen|gebuchen,bucht|Ми забронювали готельний номер на три ночі.|Мы забронировали номер в отеле на три ночи.',
 'Gestern ___ wir in Wien angekommen.|sind|haben|waren,ist|Вчора ми приїхали до Відня.|Вчера мы приехали в Вену.',
 'Ich bin zwei Wochen in Italien ___.|geblieben|geblieben gehabt|bleiben,bleibt|Я два тижні пробув в Італії.|Я две недели пробыл в Италии.',
 'Gestern ___ das Wetter schön.|war|ist|hat,wird|Вчора була гарна погода.|Вчера была хорошая погода.',
 'Gestern ___ wir am Strand.|waren|haben|wurden,sind sein|Вчора ми були на пляжі.|Вчера мы были на пляже.',
 'Das Hotel ___ einen Pool.|hatte|war|hast,hattest|У готелі був басейн.|В отеле был бассейн.',
 'Der Zug hat ___.|Verspätung|Gepäck|Koffer,Ticket|Потяг запізнюється.|Поезд опаздывает.',
 'Ich habe meinen Anschluss ___.|verpasst|verpassen|verpasste,geverpasst|Я пропустив пересадку.|Я пропустил пересадку.',
 'Ich möchte die Buchung ___.|stornieren|storniert|stornierst,gestorniert|Я хочу скасувати бронювання.|Я хочу отменить бронирование.',
 'Ist das Frühstück ___?|inklusive|inkl.|inkludiert,inklusiv|Сніданок включений?|Завтрак включён?',
 'Wir sind nach Spanien ___.|geflogen|geflogt|fliegen,geflug|Ми полетіли до Іспанії.|Мы полетели в Испанию.',
 'Für die Reise nach Amerika brauchst du ein ___.|Visum|Gepäck|Ticket,Bad|Для поїздки до Америки тобі потрібна віза.|Для поездки в Америку тебе нужна виза.',
 'Mein Koffer ist nicht ___.|angekommen|ankommen|angekommt,geankommen|Моя валіза не прибула.|Мой чемодан не прибыл.',
 'Ich habe viele Fotos ___.|gemacht|gemachen|machte,macht|Я зробив багато фото.|Я сделал много фото.',
 ],
 dialogs=[
 dict(title='У готелі', lines=[
  'Rezeption|Guten Abend! Wie kann ich Ihnen helfen?|Добрий вечір! Чим можу допомогти?|Добрый вечер! Чем могу помочь?',
  'Gast|Guten Abend, ich habe ein Zimmer reserviert. Mein Name ist Koval.|Добрий вечір, я бронював номер. Моє прізвище Коваль.|Добрый вечер, я бронировал номер. Моя фамилия Коваль.',
  'Rezeption|Ja, ein Einzelzimmer für drei Nächte. Hier ist Ihr Schlüssel, Zimmer 214.|Так, одномісний номер на три ночі. Ось ваш ключ, номер 214.|Да, одноместный номер на три ночи. Вот ваш ключ, номер 214.',
  'Gast|Ist das Frühstück inklusive?|Сніданок включений?|Завтрак включён?',
  'Rezeption|Ja, von 7 bis 10 Uhr im Erdgeschoss.|Так, з 7 до 10 години на першому поверсі.|Да, с 7 до 10 часов на первом этаже.'],
  qs=[('На скільки ночей номер?','На сколько ночей номер?',['На одну|На одну','На три|На три','На п\'ять|На пять','На сім|На семь'],1),
      ('Де сніданок?','Где завтрак?',['У номері|В номере','На першому поверсі|На первом этаже','У ресторані назовні|В ресторане снаружи','Сніданку немає|Завтрака нет'],1)]),
 dict(title='Розмова про відпустку', lines=[
  'Anna|Wie war dein Urlaub?|Як минула твоя відпустка?|Как прошёл твой отпуск?',
  'Tom|Super! Wir sind eine Woche in Spanien gewesen.|Чудово! Ми були тиждень в Іспанії.|Отлично! Мы были неделю в Испании.',
  'Anna|Und wie war das Wetter?|А яка була погода?|А какая была погода?',
  'Tom|Sehr schön, jeden Tag Sonne. Wir waren viel am Strand.|Дуже гарна, щодня сонце. Ми багато були на пляжі.|Очень хорошая, каждый день солнце. Мы много были на пляже.',
  'Anna|Habt ihr auch Ausflüge gemacht?|А екскурсії ви робили?|А экскурсии вы делали?',
  'Tom|Ja, wir haben Barcelona besichtigt.|Так, ми оглядали Барселону.|Да, мы осматривали Барселону.'],
  qs=[('Скільки Том був в Іспанії?','Сколько Том был в Испании?',['Тиждень|Неделю','Два тижні|Две недели','Три дні|Три дня','Місяць|Месяц'],0),
      ('Яке місто вони оглянули?','Какой город они осмотрели?',['Мадрид|Мадрид','Барселону|Барселону','Севілью|Севилью','Валенсію|Валенсию'],1)]),
 ])
