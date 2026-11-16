# -*- coding: utf-8 -*-
# Іспит у стилі Goethe A2. Секції: lesen, schreiben, hoeren.
RF = ['richtig', 'falsch']
T1 = 'Liebe Sandra, ich habe gestern eine neue Wohnung gefunden! Sie liegt im Zentrum, im dritten Stock, und hat zwei Zimmer und einen kleinen Balkon. Die Miete ist 650 Euro, aber ich muss noch eine Kaution zahlen. Nächsten Monat ziehe ich um. Hilfst du mir? Dein Marco'
T2 = 'Lieber Herr Becker, vielen Dank für Ihre Einladung zum Fest am Samstag. Leider kann ich nicht kommen, weil ich mit meiner Familie zu meinen Eltern fahre. Ich wünsche Ihnen einen schönen Abend. Mit freundlichen Grüßen, Julia Hoffmann'
T3 = 'Schwimmbad Sonnenbad\nÖffnungszeiten: Mo geschlossen, Di–Fr 9–20 Uhr, Sa–So 10–18 Uhr\nEintritt: Erwachsene 5 Euro, Kinder bis 6 Jahre frei\nKinder von 7 bis 14 Jahren: 3 Euro'
T4 = 'Wegen Bauarbeiten fährt die Buslinie 12 vom 3. bis 14. Mai nicht bis zum Hauptbahnhof. Bitte nehmen Sie die Linie 5 oder gehen Sie zu Fuß. Die Haltestelle Rathaus ist ab dem 15. Mai wieder geöffnet.'
T5 = 'Mein Name ist Dana. Ich bin vor zwei Jahren aus der Ukraine nach Deutschland gekommen. Am Anfang war es schwer, weil ich kaum Deutsch gesprochen habe. Jetzt besuche ich einen Kurs, und ich habe schon viele Freunde. Nächstes Jahr möchte ich eine Ausbildung als Krankenschwester machen.'
LESEN = [
 (T1, 'Marco hat schon eine neue Wohnung gefunden.', RF, 0),
 (T1, 'Die Wohnung hat drei Zimmer.', RF, 1),
 (T1, 'Was muss Marco noch zahlen?', ['eine Kaution', 'die Möbel', 'eine Reise'], 0),
 (T2, 'Julia kommt zum Fest.', RF, 1),
 (T2, 'Warum kann Julia nicht kommen?', ['Sie ist krank.', 'Sie fährt zu ihren Eltern.', 'Sie muss arbeiten.'], 1),
 (T3, 'Wann ist das Schwimmbad am Montag geöffnet?', ['von 9 bis 20 Uhr', 'von 10 bis 18 Uhr', 'gar nicht'], 2),
 (T3, 'Ein Kind mit 5 Jahren zahlt Eintritt.', RF, 1),
 (T3, 'Was zahlt ein Kind mit 10 Jahren?', ['nichts', '3 Euro', '5 Euro'], 1),
 (T4, 'Die Linie 12 fährt im Mai nicht immer bis zum Hauptbahnhof.', RF, 0),
 (T4, 'Was kann man statt der Linie 12 nehmen?', ['die Linie 5', 'ein Taxi', 'die U-Bahn'], 0),
 (T5, 'Dana lebt seit zwei Jahren in Deutschland.', RF, 0),
 (T5, 'Dana hat jetzt keine Freunde.', RF, 1),
 (T5, 'Was möchte Dana nächstes Jahr machen?', ['einen Sprachkurs beginnen', 'eine Ausbildung anfangen', 'in die Ukraine fahren'], 1),
 ('Zimmer frei! Studentin sucht Mitbewohner für 3-Zimmer-Wohnung. Miete 300 Euro warm, Küche und Bad zusammen, Fahrradkeller. Besichtigung: täglich ab 18 Uhr.', 'Wann kann man die Wohnung ansehen?', ['am Wochenende', 'jeden Tag ab 18 Uhr', 'am Morgen'], 1),
]
TXT = 'Hallo! Ich heiße Pavel Kowal und bin 34 Jahre alt. Ich komme aus Charkiw und wohne seit einem Jahr in Hamburg. Ich arbeite als Elektriker. Mein Hobby ist Radfahren. Meine E-Mail: pavel.kowal@mail.de'
SCHREIBEN = [
 (TXT, 'Formular — Wohnort:', ['Charkiw', 'Hamburg', 'Berlin'], 1),
 (TXT, 'Formular — Beruf:', ['Elektriker', 'Lehrer', 'Koch'], 0),
 (TXT, 'Formular — Seit wann in Deutschland?', ['seit einem Monat', 'seit einem Jahr', 'seit zehn Jahren'], 1),
 ('Du schreibst deinem Chef eine E-Mail. Du bist krank.', 'Wähle den besten Satz:', ['Sehr geehrter Herr Braun, ich bin leider krank und kann heute nicht arbeiten.', 'Hallo Chef, ich krank bin und heute nicht arbeiten kann.', 'Herr Braun, ich krank heute, kein Arbeit.'], 0),
 ('Du möchtest einen Termin beim Amt verschieben.', 'Wähle den besten Satz:', ['Könnten Sie meinen Termin bitte auf nächste Woche verschieben?', 'Ich Termin verschieben nächste Woche Sie bitte.', 'Verschieben Sie Termin nächste Woche mir.'], 0),
 ('Du erklärst, warum du Deutsch lernst.', 'Wähle den besten Satz:', ['Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.', 'Ich lerne Deutsch, weil ich möchte in Deutschland arbeiten.', 'Ich lerne Deutsch, weil ich arbeiten in Deutschland möchte.'], 0),
 ('Du erzählst, was du gestern gemacht hast.', 'Wähle den besten Satz:', ['Gestern bin ich ins Kino gegangen und habe einen Film gesehen.', 'Gestern ich bin ins Kino gegangen und gesehen einen Film.', 'Gestern bin ich gegangen Kino und habe gesehen Film.'], 0),
 ('Du lädst einen Freund zu deinem Geburtstag ein.', 'Wähle die beste Nachricht:', ['Ich möchte dich zu meinem Geburtstag einladen. Hast du am Samstag Zeit?', 'Ich dich einladen Geburtstag Samstag, du kommen?', 'Geburtstag ich Samstag, kommst du Zeit?'], 0),
]
HOEREN = [
 (['Guten Tag, ich möchte einen Termin beim Zahnarzt.', 'Gern. Haben Sie Schmerzen?', 'Ja, seit gestern. Es tut sehr weh.', 'Dann kommen Sie bitte heute um 16 Uhr.'],
  [('Warum ruft der Mann an?', ['Er hat Zahnschmerzen.', 'Er hat Fieber.', 'Er braucht ein Rezept.'], 0), ('Wann hat er den Termin?', ['heute um 16 Uhr', 'morgen um 16 Uhr', 'heute um 14 Uhr'], 0)]),
 (['Hallo Tom, was machst du am Wochenende?', 'Am Samstag fahre ich mit Freunden zum See. Und du?', 'Ich muss leider arbeiten, aber am Sonntag habe ich frei.', 'Dann treffen wir uns am Sonntag zum Kaffee!'],
  [('Was macht Tom am Samstag?', ['Er fährt zum See.', 'Er arbeitet.', 'Er bleibt zu Hause.'], 0), ('Wann treffen sie sich?', ['am Samstag', 'am Sonntag', 'gar nicht'], 1)]),
 (['Entschuldigung, ich suche das Rathaus.', 'Gehen Sie hier geradeaus bis zur Ampel, dann rechts. Das Rathaus ist neben der Bank.', 'Ist es weit?', 'Nein, nur zehn Minuten zu Fuß.'],
  [('Wohin will die Frau?', ['zur Bank', 'zum Rathaus', 'zur Post'], 1), ('Wie lange dauert der Weg?', ['zehn Minuten', 'eine halbe Stunde', 'eine Stunde'], 0)]),
 (['Guten Abend, haben Sie einen Tisch für drei Personen?', 'Ja, bitte am Fenster. Hier ist die Karte.', 'Ich nehme die Gemüsesuppe und danach den Fisch.', 'Gern. Und was möchten Sie trinken?', 'Ein Wasser, bitte.'],
  [('Für wie viele Personen ist der Tisch?', ['für zwei', 'für drei', 'für vier'], 1), ('Was trinkt der Mann?', ['Wasser', 'Saft', 'Bier'], 0)]),
]
