# -*- coding: utf-8 -*-
blk(id='food', title='Їжа й напої', sub='замовлення, прийоми їжі, посуд', nouns='food',
 adjs='food', verbs=['essen','trinken','kochen','bestellen','kaufen','bezahlen','kosten'],
 explain=[
 ('Їсти й пити', 'essen (du isst, er isst) і trinken. Назви речовин вживаються без артикля: Ich esse Brot. Ich trinke Wasser. Ich trinke jeden Morgen Kaffee.'),
 ('Замовлення', 'Ich möchte einen Kaffee, bitte. Або ввічливіше: Ich hätte gern eine Suppe. Після möchte іменник стоїть в Akkusativ, тому чоловічий рід змінюється: der Kaffee → einen Kaffee, der Salat → einen Salat. Жіночий і середній не змінюються: eine Suppe, ein Brot.'),
 ('Прийоми їжі', 'das Frühstück (сніданок), das Mittagessen (обід), das Abendessen (вечеря). «На сніданок» — zum Frühstück: Zum Frühstück esse ich ein Brötchen. Також: Guten Appetit! — Смачного!'),
 ('Смак', 'lecker (смачно), süß, sauer, salzig, scharf, bitter, frisch. Das schmeckt gut — це смачно. Das Essen ist lecker. Слово scharf означає і «гострий на смак», і «різкий».'),
 ('Голод і спрага', 'Ich habe Hunger. Ich habe Durst. Тут Hunger і Durst — іменники (der Hunger, der Durst) після haben, а не прикметники: українською «я голодний», німецькою — «я маю голод».'),
 ('Посуд', 'der Teller (тарілка), das Glas (склянка), die Tasse (чашка), der Löffel (ложка), die Gabel (виделка), das Messer (ніж), die Flasche (пляшка). Суп їдять ложкою — mit dem Löffel. Прийменник mit завжди вимагає Dativ: mit dem, mit der, mit dem.'),
 ],
 gaps=[
 'Ich trinke Kaffee ___ Milch.|mit|ohne,für,bei|Я п\'ю каву з молоком.|Я пью кофе с молоком.',
 'Zum Frühstück esse ich ein ___.|Brötchen|Apfel,Kuchen,Salat|На сніданок я їм булочку.|На завтрак я ем булочку.',
 'Ich habe Hunger. Ich möchte etwas ___.|essen|trinken,schlafen,lesen|Я голодний. Я хочу щось з\'їсти.|Я голоден. Я хочу что-нибудь поесть.',
 'Ich habe Durst. Ich möchte etwas ___.|trinken|essen,schlafen,tanzen|Мені хочеться пити. Я хочу щось випити.|Мне хочется пить. Я хочу что-нибудь выпить.',
 'Suppe isst man mit dem ___.|Löffel|Messer,Glas,Teller|Суп їдять ложкою.|Суп едят ложкой.',
 'Wasser trinkt man aus einem ___.|Glas|Teller,Gabel,Messer|Воду п\'ють зі склянки.|Воду пьют из стакана.',
 'Der Kuchen ist sehr ___.|lecker|laut,kurz,blau|Пиріг дуже смачний.|Пирог очень вкусный.',
 'Ich esse ___ Apfel.|einen|ein,eine,einer|Я їм яблуко.|Я ем яблоко.',
 ],
 dialogs=[
 dict(title='У ресторані', lines=[
  'Kellner|Guten Abend! Was möchten Sie trinken?|Добрий вечір! Що бажаєте випити?|Добрый вечер! Что желаете выпить?',
  'Gast|Ein Wasser und einen Kaffee, bitte.|Воду й каву, будь ласка.|Воду и кофе, пожалуйста.',
  'Kellner|Und zu essen?|А з їжі?|А из еды?',
  'Gast|Eine Suppe und einen Salat.|Суп і салат.|Суп и салат.',
  'Kellner|Gern. Guten Appetit!|Залюбки. Смачного!|Пожалуйста. Приятного аппетита!'],
  qs=[('Що замовив гість із напоїв?','Что заказал гость из напитков?',['Воду й каву|Воду и кофе','Чай і сік|Чай и сок','Пиво й вино|Пиво и вино','Лише воду|Только воду'],0),
      ('Що гість замовив поїсти?','Что гость заказал поесть?',['Суп і салат|Суп и салат','Піцу|Пиццу','Рибу й рис|Рыбу и рис','Пиріг|Пирог'],0)]),
 ])

blk(id='clothes', title='Одяг', sub='що носити, розмір, магазин', nouns='clothes',
 adjs=[], adjlist=['neu','alt','lang','kurz','teuer','billig','eng','breit','hell','dunkel'], verbs=['tragen','anziehen','ausziehen','kaufen','gefallen'],
 explain=[
 ('Носити й вдягати', 'tragen (du trägst, er trägt) — носити, мати на собі: Ich trage eine Jacke. Anziehen — вдягати, і це відокремлюване дієслово: Ich ziehe den Mantel an. Ausziehen — знімати: Ich ziehe die Schuhe aus.'),
 ('Одяг у множині й однині', 'Ukrainian «штани» — множина, а німецьке die Hose — однина: Die Hose ist neu. Також die Jeans (мн. Jeans) і die Kleidung (однина, без множини): Die Kleidung ist teuer.'),
 ('Розмір і колір', 'Welche Größe haben Sie? — Ich habe Größe 38. Welche Farbe? — Blau. Якщо річ не підходить: Das ist zu klein, zu groß, zu eng, zu lang. Слово zu перед прикметником означає «занадто».'),
 ('passen і gefallen', 'Die Hose passt mir — штани мені підходять за розміром. Das Kleid gefällt mir — сукня мені подобається. Після цих дієслів «мені, тобі, йому» стоїть у Dativ: mir, dir, ihm. Запам\'ятай як готові звороти: gefällt mir, passt mir.'),
 ('Одяг і пори року', 'Im Winter: der Mantel, die Mütze, der Schal, die Handschuhe. Im Sommer: das T-Shirt, das Kleid, die Sandalen. Bei Regen: der Regenmantel, der Regenschirm. Усі ці слова є у списку «Слова блоку».'),
 ],
 gaps=[
 'Im Winter trage ich einen ___.|Mantel|Badeanzug,Kleid,Hose|Взимку я ношу пальто.|Зимой я ношу пальто.',
 'Bei Regen nehme ich einen ___.|Regenschirm|Badeanzug,Gürtel,Ring|Коли дощ, я беру парасольку.|Когда дождь, я беру зонт.',
 'Die Schuhe sind zu ___. Ich brauche Größe 42.|klein|laut,kalt,süß|Туфлі замалі. Мені потрібен розмір 42.|Туфли малы. Мне нужен размер 42.',
 'Handschuhe sind für die ___.|Hände|Füße,Augen,Ohren|Рукавички — для рук.|Перчатки — для рук.',
 'Eine Brille trägt man auf der ___.|Nase|Hand,Hose,Tür|Окуляри носять на носі.|Очки носят на носу.',
 'Socken zieht man an die ___ an.|Füße|Hände,Ohren,Augen|Шкарпетки вдягають на ноги.|Носки надевают на ноги.',
 'Das Kleid ___ mir sehr gut.|gefällt|gefallen,gefällst,gefallt|Сукня мені дуже подобається.|Платье мне очень нравится.',
 'Ich ziehe die Jacke ___.|an|auf,ab,zu|Я вдягаю куртку.|Я надеваю куртку.',
 ],
 dialogs=[
 dict(title='Приміряння штанів', lines=[
  'Kunde|Entschuldigung, haben Sie diese Hose in Größe 40?|Перепрошую, чи є ці штани в розмірі 40?|Извините, есть ли эти брюки в размере 40?',
  'Verkäuferin|Ja, hier. Möchten Sie die Hose anprobieren?|Так, ось. Бажаєте приміряти?|Да, вот. Хотите примерить?',
  'Kunde|Ja, gern.|Так, залюбки.|Да, с удовольствием.',
  'Kunde|Sie passt leider nicht. Sie ist zu klein.|Вони, на жаль, не підходять. Малі.|Они, к сожалению, не подходят. Малы.',
  'Verkäuferin|Ich hole Größe 42.|Я принесу розмір 42.|Я принесу размер 42.'],
  qs=[('Який розмір спочатку попросив покупець?','Какой размер сначала попросил покупатель?',['38','40','42','44'],1),
      ('Що не так зі штанами?','Что не так с брюками?',['Завеликі|Слишком велики','Замалі|Слишком малы','Задорогі|Слишком дороги','Не того кольору|Не того цвета'],1)]),
 ])

blk(id='home', title='Дім і меблі', sub='кімнати, де і куди, оренда', nouns='home',
 adjs=[], adjlist=['groß','klein','sauber','schmutzig','hell','dunkel','leise','laut','neu','alt','schön','schlecht','teuer','billig'], verbs=['wohnen','schlafen','aufräumen','putzen','öffnen','schließen'],
 explain=[
 ('Кімнати', 'das Zimmer, die Küche, das Bad, das Wohnzimmer, das Schlafzimmer, das Kinderzimmer, der Flur. «На кухні» — in der Küche, «у ванній» — im Bad, «у вітальні» — im Wohnzimmer. Im = in dem.'),
 ('Wo? і Wohin?', 'На питання wo? (де) після in стоїть Dativ: Ich bin in der Küche. Ich bin im Bad. На питання wohin? (куди) — Akkusativ: Ich gehe in die Küche. Ich gehe ins Bad (ins = in das). Для жіночого роду це різниця der/die, для середнього — dem/das.'),
 ('Es gibt', 'Es gibt + Akkusativ означає «є, існує»: Es gibt einen Balkon. Es gibt eine Küche. Es gibt ein Bad. Wie viele Zimmer hat die Wohnung? — Sie hat drei Zimmer.'),
 ('Де що стоїть', 'Прийменники місця: auf dem Tisch (на столі), an der Wand (на стіні), neben dem Sofa (поруч з диваном), in der Küche (на кухні). Після них — Dativ: dem, der, dem.'),
 ('Житло', 'die Miete (орендна плата), die Nebenkosten (комунальні, лише множина), die Kaution (застава), der Vermieter (орендодавець), der Mieter (орендар), der Umzug (переїзд). Die Wohnung kostet 600 Euro Miete.'),
 ],
 gaps=[
 'Wir essen in der ___.|Küche|Garage,Keller,Flur|Ми їмо на кухні.|Мы едим на кухне.',
 'Ich schlafe im ___.|Schlafzimmer|Bad,Keller,Garten|Я сплю в спальні.|Я сплю в спальне.',
 'Zum Duschen gehe ich ins ___.|Bad|Schlafzimmer,Wohnzimmer,Kinderzimmer|Щоб прийняти душ, я йду у ванну.|Чтобы принять душ, я иду в ванную.',
 'Die Lampe hängt an der ___.|Decke|Boden,Tisch,Treppe|Лампа висить на стелі.|Лампа висит на потолке.',
 'Das Buch liegt auf dem ___.|Tisch|Tür,Lampe,Küche|Книга лежить на столі.|Книга лежит на столе.',
 'Wir parken das Auto in der ___.|Garage|Küche,Bad,Treppe|Ми паркуємо авто в гаражі.|Мы паркуем машину в гараже.',
 'Es gibt ___ Balkon.|einen|ein,eine,einer|Є балкон.|Есть балкон.',
 'Ich wohne in einer ___, nicht in einem Haus.|Wohnung|Küche,Tür,Wand|Я живу в квартирі, а не в будинку.|Я живу в квартире, а не в доме.',
 ],
 dialogs=[
 dict(title='Пошук квартири', lines=[
  'Anna|Wie viele Zimmer hat die Wohnung?|Скільки кімнат у квартирі?|Сколько комнат в квартире?',
  'Vermieter|Sie hat drei Zimmer, eine Küche und ein Bad.|Три кімнати, кухня й ванна.|Три комнаты, кухня и ванная.',
  'Anna|Gibt es einen Balkon?|Чи є балкон?|Есть ли балкон?',
  'Vermieter|Ja, es gibt einen kleinen Balkon.|Так, є невеликий балкон.|Да, есть небольшой балкон.',
  'Anna|Wie hoch ist die Miete?|Яка орендна плата?|Какая арендная плата?',
  'Vermieter|Sechshundert Euro.|Шістсот євро.|Шестьсот евро.'],
  qs=[('Скільки кімнат у квартирі?','Сколько комнат в квартире?',['2','3','4','5'],1),
      ('Скільки коштує оренда?','Сколько стоит аренда?',['500 €','600 €','660 €','1000 €'],1)]),
 ])

blk(id='city', title='Місто й транспорт', sub='дорога, транспорт, квитки', nouns='city',
 adjs=[], adjlist=['weit','nah','schnell','langsam','teuer','billig','früh','spät'], verbs=['fahren','gehen','abfahren','ankommen','einsteigen','aussteigen','umsteigen','fliegen','reisen'],
 explain=[
 ('Транспорт: mit + Dativ', 'mit dem Bus (m), mit dem Zug (m), mit der U-Bahn (f), mit der Straßenbahn (f), mit dem Auto (n), mit dem Fahrrad (n). Пішки — zu Fuß. Після mit завжди Dativ: dem, der, dem.'),
 ('Як пройти', 'Wie komme ich zum Bahnhof? Zum = zu dem, zur = zu der: zum Bahnhof (m), zur Post (f), zum Museum (n). Відповіді: geradeaus (прямо), links (ліворуч), rechts (праворуч), an der Ampel (біля світлофора).'),
 ('Де що знаходиться', 'gegenüber (навпроти), neben (поруч), hinter (позаду), vor (перед), zwischen (між), in der Nähe (поблизу). Після них Dativ: Die Bank ist gegenüber dem Bahnhof. Das Café ist neben der Post.'),
 ('Поїздка', 'die Fahrkarte (квиток), die Abfahrt (відправлення), die Ankunft (прибуття), das Gleis (колія), der Fahrplan (розклад). Дієслова відокремлювані: Der Zug fährt um 8 Uhr ab. Er kommt um 10 Uhr an. Ich steige in Köln um.'),
 ('Міста й країни', 'До міста — nach: Ich fahre nach Berlin. До країни жіночого роду — in die: Ich fahre in die Ukraine, in die Slowakei. Мешкати: in der Stadt (у місті), auf dem Land (в селі, за містом).'),
 ],
 gaps=[
 'Ich fahre ___ dem Bus.|mit|bei,nach,aus|Я їду автобусом.|Я еду на автобусе.',
 'Wie komme ich ___ Bahnhof?|zum|zur,im,am|Як мені дістатися до вокзалу?|Как мне добраться до вокзала?',
 'Ich warte an der ___ auf den Bus.|Haltestelle|Tasche,Wand,Jacke|Я чекаю автобус на зупинці.|Я жду автобус на остановке.',
 'Das Flugzeug startet am ___.|Flughafen|Hafen,Park,Garten|Літак злітає з аеропорту.|Самолёт взлетает из аэропорта.',
 'Gehen Sie ___, dann links.|geradeaus|gern,nass,früh|Ідіть прямо, потім ліворуч.|Идите прямо, потом налево.',
 'Ich fahre mit der ___ zur Arbeit.|U-Bahn|Bus,Auto,Taxi|Я їду на роботу метро.|Я еду на работу на метро.',
 'Die Ampel ist rot. Ich muss ___.|warten|tanzen,lesen,singen|Світлофор червоний. Я мушу чекати.|Светофор красный. Я должен ждать.',
 'Die Bank ist ___ dem Bahnhof.|gegenüber|durch,ohne,für|Банк навпроти вокзалу.|Банк напротив вокзала.',
 'Ich fahre ___ Berlin.|nach|aus,bei,von|Я їду до Берліна.|Я еду в Берлин.',
 ],
 dialogs=[
 dict(title='Як пройти до вокзалу', lines=[
  'Tourist|Entschuldigung, wie komme ich zum Bahnhof?|Перепрошую, як мені дістатися вокзалу?|Извините, как мне добраться до вокзала?',
  'Passant|Gehen Sie hier geradeaus bis zur Ampel. Dort rechts. Der Bahnhof ist links.|Ідіть тут прямо до світлофора. Там праворуч. Вокзал буде ліворуч.|Идите здесь прямо до светофора. Там направо. Вокзал будет слева.',
  'Tourist|Ist das weit?|Це далеко?|Это далеко?',
  'Passant|Nein, nur zehn Minuten zu Fuß.|Ні, лише десять хвилин пішки.|Нет, только десять минут пешком.'],
  qs=[('Куди повернути біля світлофора?','Куда повернуть у светофора?',['Ліворуч|Налево','Праворуч|Направо','Прямо','Назад'],1),
      ('Скільки йти до вокзалу?','Сколько идти до вокзала?',['5 хвилин|5 минут','10 хвилин|10 минут','20 хвилин|20 минут','Година|Час'],1)]),
 ])
