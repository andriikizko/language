# -*- coding: utf-8 -*-
# Іспит у стилі Goethe B1. Секції: lesen, schreiben, hoeren.
RF = ['richtig', 'falsch']
T1 = 'Sehr geehrte Frau Neumann, ich schreibe Ihnen wegen der Wohnung in der Lindenstraße 8. Die Heizung ist seit zwei Wochen kaputt, obwohl ich Sie schon zweimal angerufen habe. Wenn das Problem nicht bis Freitag gelöst wird, werde ich die Miete kürzen. Ich bitte Sie, so schnell wie möglich einen Handwerker zu schicken. Mit freundlichen Grüßen, Tobias Klein'
T2 = 'Die Stadt Münster hat beschlossen, im Zentrum mehr Radwege zu bauen. Dadurch sollen weniger Autos in die Innenstadt fahren. Viele Geschäftsleute befürchten, dass ihre Kunden wegbleiben. Der Bürgermeister dagegen sagt, dass in anderen Städten der Umsatz nach dem Umbau sogar gestiegen sei. Die Bauarbeiten beginnen im März und sollen im Herbst fertig sein.'
T3 = 'Nach dem Abitur wusste ich lange nicht, was ich studieren sollte. Ich hatte mich für Medizin und für Informatik interessiert. Schließlich machte ich erst ein Praktikum in einem Krankenhaus. Nachdem ich gesehen hatte, wie anstrengend der Alltag dort ist, entschied ich mich für Informatik. Heute arbeite ich als Entwicklerin und bin sehr zufrieden.'
T4 = 'Volkshochschule Köln — Sprachkurse im Frühjahr\nDeutsch B1: montags und mittwochs, 18:00–20:30 Uhr, 12 Wochen, 240 Euro\nAnmeldung: bis zum 15. Februar online oder persönlich im Büro, Zimmer 12\nBitte bringen Sie einen Ausweis mit. Eine Ermäßigung gibt es für Arbeitslose und Studenten (Nachweis erforderlich).'
T5 = 'Liebe Mia, vielen Dank für deine Einladung zur Hochzeit! Ich freue mich sehr darauf, euch zu sehen. Leider kann ich erst am Samstagnachmittag kommen, weil ich am Vormittag noch arbeiten muss. Ich würde gern ein Geschenk mitbringen. Hast du eine Idee, worüber ihr euch freuen würdet? Liebe Grüße, Paul'
LESEN = [
 (T1, 'Die Heizung funktioniert seit zwei Wochen nicht.', RF, 0),
 (T1, 'Herr Klein hat die Vermieterin noch nicht kontaktiert.', RF, 1),
 (T1, 'Was will Herr Klein tun, wenn das Problem nicht gelöst wird?', ['die Miete kürzen', 'ausziehen', 'einen Anwalt anrufen'], 0),
 (T1, 'Bis wann soll das Problem gelöst werden?', ['bis Montag', 'bis Freitag', 'bis nächsten Monat'], 1),
 (T2, 'Münster will im Zentrum mehr Radwege bauen.', RF, 0),
 (T2, 'Alle Geschäftsleute sind mit dem Plan zufrieden.', RF, 1),
 (T2, 'Was sagt der Bürgermeister?', ['Der Umsatz ist in anderen Städten gestiegen.', 'Die Bauarbeiten sind zu teuer.', 'Es gibt zu viele Radfahrer.'], 0),
 (T2, 'Wann sollen die Bauarbeiten fertig sein?', ['im Frühling', 'im Herbst', 'im Winter'], 1),
 (T3, 'Die Autorin interessierte sich für zwei Studienfächer.', RF, 0),
 (T3, 'Sie hat Medizin studiert.', RF, 1),
 (T3, 'Warum entschied sie sich gegen Medizin?', ['Der Alltag im Krankenhaus war ihr zu anstrengend.', 'Sie bekam keinen Studienplatz.', 'Das Studium war zu teuer.'], 0),
 (T4, 'Der Kurs findet zweimal pro Woche statt.', RF, 0),
 (T4, 'Wie lange dauert der Kurs?', ['6 Wochen', '12 Wochen', '24 Wochen'], 1),
 (T4, 'Wer bekommt eine Ermäßigung?', ['alle Teilnehmer', 'Arbeitslose und Studenten', 'nur Studenten'], 1),
 (T5, 'Paul kann am Samstagvormittag nicht kommen.', RF, 0),
 (T5, 'Was möchte Paul mitbringen?', ['ein Geschenk', 'einen Kuchen', 'Blumen'], 0),
]
TXT = 'Name: Elena Brandt. Ich bin 29 Jahre alt und arbeite seit drei Jahren als Marketingmanagerin in Düsseldorf. Davor habe ich in Wien studiert. Ich spreche Deutsch, Englisch und ein bisschen Spanisch. In meiner Freizeit gehe ich gern wandern.'
SCHREIBEN = [
 (TXT, 'Lebenslauf — Wo hat sie studiert?', ['in Wien', 'in Düsseldorf', 'in Madrid'], 0),
 (TXT, 'Lebenslauf — Seit wann arbeitet sie als Managerin?', ['seit einem Jahr', 'seit drei Jahren', 'seit zehn Jahren'], 1),
 ('Du schreibst an das Amt, weil du einen Termin brauchst.', 'Wähle den besten Satz:', ['Sehr geehrte Damen und Herren, ich möchte einen Termin vereinbaren, um mich umzumelden.', 'Hallo Amt, ich will Termin, ummelden ich möchte.', 'Sehr geehrte Damen, ich möchte Termin um ummelden zu.'], 0),
 ('Du beschwerst dich über einen Fehler in einer Rechnung.', 'Wähle den besten Satz:', ['Ich möchte mich über die Rechnung beschweren, denn sie enthält einen Fehler.', 'Ich möchte mich auf die Rechnung beschweren, denn sie einen Fehler enthält.', 'Ich beschwere über Rechnung, weil Fehler ist da.'], 0),
 ('Du erklärst, warum du später kommst.', 'Wähle den besten Satz:', ['Ich komme etwas später, weil mein Zug Verspätung hat.', 'Ich komme etwas später, weil mein Zug hat Verspätung.', 'Ich komme etwas später, weil hat mein Zug Verspätung.'], 0),
 ('Du äußerst deine Meinung zu einem Thema.', 'Wähle den besten Satz:', ['Meiner Meinung nach sollte man mehr für die Umwelt tun.', 'Meiner Meinung nach man sollte mehr für die Umwelt tun.', 'Mein Meinung nach sollte man tun mehr für Umwelt.'], 0),
]
HOEREN = [
 (['Guten Tag, hier ist Weber. Mein Internet funktioniert seit gestern nicht mehr.', 'Haben Sie den Router schon neu gestartet?', 'Ja, zweimal. Aber es leuchtet kein Licht.', 'Dann schicke ich Ihnen einen Techniker. Passt Ihnen morgen Vormittag?', 'Ja, das wäre gut.'],
  [('Was ist das Problem?', ['Das Internet funktioniert nicht.', 'Das Telefon ist kaputt.', 'Die Rechnung ist falsch.'], 0), ('Wann kommt der Techniker?', ['morgen Vormittag', 'heute Abend', 'nächste Woche'], 0)]),
 (['Hast du gehört, dass die Preise für Bahnfahrkarten wieder steigen?', 'Ja, ab Januar. Obwohl die Züge oft Verspätung haben.', 'Deshalb fahre ich lieber mit dem Fahrrad zur Arbeit.', 'Ich würde auch gern, aber mein Weg ist zu weit.'],
  [('Was ist im Januar?', ['Die Fahrkarten werden teurer.', 'Die Züge fahren öfter.', 'Die Bahn streikt.'], 0), ('Wie fährt die zweite Person zur Arbeit?', ['mit dem Fahrrad', 'mit dem Zug', 'mit dem Auto'], 0)]),
 (['Entschuldigung, ich möchte diese Jacke umtauschen.', 'Was ist denn das Problem?', 'Sie ist leider zu klein. Hätten Sie eine größere Größe?', 'Haben Sie den Kassenbon dabei?', 'Ja, hier. Ich habe sie vor drei Tagen gekauft.', 'Dann ist das kein Problem.'],
  [('Warum möchte die Frau die Jacke umtauschen?', ['Sie ist zu klein.', 'Sie ist kaputt.', 'Sie ist zu teuer.'], 0), ('Wann hat sie die Jacke gekauft?', ['vor drei Tagen', 'gestern', 'vor einem Monat'], 0)]),
 (['Wir müssen noch das Formular ausfüllen, bevor wir zum Amt gehen.', 'Ich habe es schon unterschrieben. Es fehlt nur noch eine Kopie vom Ausweis.', 'Dann kopiere ich ihn schnell. Der Termin ist um zehn Uhr.', 'Gut, wir haben noch eine Stunde Zeit.'],
  [('Was fehlt noch?', ['eine Kopie vom Ausweis', 'die Unterschrift', 'das Formular'], 0), ('Wann ist der Termin?', ['um zehn Uhr', 'um elf Uhr', 'um neun Uhr'], 0)]),
]
