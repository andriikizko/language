# -*- coding: utf-8 -*-
# Іспит у стилі Goethe A1. Секції: lesen, schreiben, hoeren. Формат питання: (текст, питання, [варіанти], індекс_правильного)
RF = ['richtig', 'falsch']
LESEN = [
 ('Hallo Tom, ich komme heute um 18 Uhr nach Hause. Ich bringe Brot und Milch mit. Kochst du bitte Suppe? Bis später, Anna', 'Anna kommt um 18 Uhr nach Hause.', RF, 0),
 ('Hallo Tom, ich komme heute um 18 Uhr nach Hause. Ich bringe Brot und Milch mit. Kochst du bitte Suppe? Bis später, Anna', 'Anna kocht die Suppe.', RF, 1),
 ('Liebe Frau Weber, leider kann ich am Montag nicht kommen. Ich bin krank und gehe zum Arzt. Ich komme am Mittwoch wieder. Viele Grüße, Peter Braun', 'Peter Braun ist krank.', RF, 0),
 ('Liebe Frau Weber, leider kann ich am Montag nicht kommen. Ich bin krank und gehe zum Arzt. Ich komme am Mittwoch wieder. Viele Grüße, Peter Braun', 'Peter kommt am Dienstag wieder.', RF, 1),
 ('Neue Wohnung! Ich wohne jetzt in der Gartenstraße 12. Die Wohnung hat drei Zimmer, eine Küche und einen Balkon. Am Samstag feiere ich! Kommst du? Lena', 'Lena hat eine neue Wohnung.', RF, 0),
 ('Neue Wohnung! Ich wohne jetzt in der Gartenstraße 12. Die Wohnung hat drei Zimmer, eine Küche und einen Balkon. Am Samstag feiere ich! Kommst du? Lena', 'Die Wohnung hat keinen Balkon.', RF, 1),
 ('Bäckerei Müller\nMo–Fr: 6.30–18.00 Uhr\nSa: 6.30–13.00 Uhr\nSonntag geschlossen', 'Wann ist die Bäckerei am Samstag geöffnet?', ['bis 18 Uhr', 'bis 13 Uhr', 'gar nicht'], 1),
 ('Achtung! Heute kein Wasser im Haus von 9 bis 14 Uhr. Ihr Hausmeister', 'Was ist heute von 9 bis 14 Uhr?', ['Es gibt kein Wasser.', 'Der Hausmeister kommt.', 'Das Haus ist zu.'], 0),
 ('Sprachschule Lingua\nDeutschkurs A1: Montag und Mittwoch, 18.30–20.00 Uhr\nPreis: 80 Euro im Monat', 'Wie oft ist der Kurs in der Woche?', ['einmal', 'zweimal', 'fünfmal'], 1),
 ('Verkaufe Fahrrad, blau, 2 Jahre alt, 150 Euro. Tel. 0172 555 1234, ab 17 Uhr', 'Wann kann man anrufen?', ['am Morgen', 'ab 17 Uhr', 'um 12 Uhr'], 1),
 ('Rauchen verboten', 'Was bedeutet das Schild?', ['Man darf hier nicht rauchen.', 'Man darf hier essen.', 'Man muss hier warten.'], 0),
 ('Ausgang', 'Was bedeutet das Schild?', ['Hier ist der Eingang.', 'Hier geht man hinaus.', 'Hier ist die Toilette.'], 1),
 ('Bitte leise sein! Kinder schlafen.', 'Was soll man hier machen?', ['laut sprechen', 'leise sein', 'Musik hören'], 1),
 ('Pause von 12 bis 13 Uhr', 'Was heißt das?', ['Von 12 bis 13 Uhr ist geschlossen.', 'Von 12 bis 13 Uhr ist offen.', 'Man muss um 12 Uhr zahlen.'], 0),
 ('Ticket bitte vor der Fahrt entwerten!', 'Was muss man vor der Fahrt machen?', ['Das Ticket entwerten.', 'Das Ticket verkaufen.', 'Das Ticket verlieren.'], 0),
]
SCHREIBEN = [
 ('Hallo! Ich heiße Olena Koval. Ich bin 28 Jahre alt und komme aus Lwiw. Ich wohne in Köln und arbeite als Verkäuferin. Meine Telefonnummer ist 0151 2345678.', 'Formular — Vorname:', ['Olena', 'Koval', 'Köln'], 0),
 ('Hallo! Ich heiße Olena Koval. Ich bin 28 Jahre alt und komme aus Lwiw. Ich wohne in Köln und arbeite als Verkäuferin. Meine Telefonnummer ist 0151 2345678.', 'Formular — Nachname:', ['Olena', 'Koval', 'Lwiw'], 1),
 ('Hallo! Ich heiße Olena Koval. Ich bin 28 Jahre alt und komme aus Lwiw. Ich wohne in Köln und arbeite als Verkäuferin. Meine Telefonnummer ist 0151 2345678.', 'Formular — Wohnort:', ['Lwiw', 'Köln', 'Ukraine'], 1),
 ('Hallo! Ich heiße Olena Koval. Ich bin 28 Jahre alt und komme aus Lwiw. Ich wohne in Köln und arbeite als Verkäuferin. Meine Telefonnummer ist 0151 2345678.', 'Formular — Beruf:', ['Lehrerin', 'Verkäuferin', 'Ärztin'], 1),
 ('Du schreibst eine SMS an einen Freund. Du kommst heute später. Welcher Satz passt?', 'Wähle die beste Nachricht:', ['Ich komme heute später, um 19 Uhr.', 'Ich später kommen heute Uhr.', 'Ich kommst später heute.'], 0),
 ('Du bist krank und rufst bei der Arbeit an. Welcher Satz passt?', 'Wähle die beste Nachricht:', ['Guten Morgen, ich bin krank und komme heute nicht.', 'Guten Morgen, ich krank bin heute nicht komme.', 'Guten Morgen, ich habe krank heute.'], 0),
 ('Du möchtest einen Termin beim Arzt.', 'Wähle den besten Satz:', ['Ich möchte bitte einen Termin am Montag.', 'Ich Termin Montag möchte bitte einen.', 'Ich will Arzt Termin Montag.'], 0),
 ('Du stellst dich vor.', 'Wähle den besten Satz:', ['Ich heiße Max, ich bin 30 Jahre alt und wohne in Berlin.', 'Ich Max heiße, 30 Jahre bin ich, in Berlin wohnen.', 'Meine Name Max, ich 30 alt, wohne Berlin.'], 0),
]
HOEREN = [
 (['Guten Tag! Ich möchte zwei Brötchen und ein Brot, bitte.', 'Gern. Das macht drei Euro fünfzig.', 'Hier bitte. Danke und tschüss!'], [('Was kauft die Frau?', ['Brötchen und Brot', 'Kuchen und Milch', 'Kaffee und Brot'], 0), ('Wie viel kostet es?', ['3,15 Euro', '3,50 Euro', '5,30 Euro'], 1)]),
 (['Entschuldigung, wie komme ich zum Bahnhof?', 'Gehen Sie geradeaus und dann links. Der Bahnhof ist neben der Post.', 'Vielen Dank!'], [('Wohin will der Mann?', ['zur Post', 'zum Bahnhof', 'zur Bank'], 1), ('Wo ist der Bahnhof?', ['neben der Post', 'hinter dem Haus', 'gegenüber der Schule'], 0)]),
 (['Hallo Tina, hast du am Samstag Zeit?', 'Ja, warum?', 'Wir gehen schwimmen. Um zehn Uhr am Schwimmbad.', 'Super, ich komme gern!'], [('Was machen sie am Samstag?', ['Sie gehen schwimmen.', 'Sie gehen einkaufen.', 'Sie arbeiten.'], 0), ('Um wie viel Uhr treffen sie sich?', ['um neun', 'um zehn', 'um elf'], 1)]),
 (['Praxis Doktor Lange, guten Morgen.', 'Guten Morgen, mein Name ist Schmidt. Ich habe Fieber und Husten. Ich brauche einen Termin.', 'Kommen Sie heute um 15 Uhr.', 'Danke, bis später.'], [('Was hat Herr Schmidt?', ['Kopfschmerzen', 'Fieber und Husten', 'Bauchschmerzen'], 1), ('Wann ist der Termin?', ['heute um 15 Uhr', 'morgen um 15 Uhr', 'heute um 13 Uhr'], 0)]),
]
