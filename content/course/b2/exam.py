# -*- coding: utf-8 -*-
# Іспит у стилі Goethe B2. Секції: lesen, schreiben, hoeren.
RF = ['richtig', 'falsch']
T1 = 'Immer mehr Unternehmen führen die Vier-Tage-Woche ein. Laut einer aktuellen Studie fühlen sich die Beschäftigten dadurch weniger gestresst, und die Produktivität sinkt nicht, wie viele Kritiker befürchtet hatten. Allerdings lässt sich das Modell nicht in allen Branchen umsetzen: In der Pflege oder im Handwerk fehlen schlicht die Arbeitskräfte, um die Lücken zu füllen. Gewerkschaften fordern daher, dass der Staat die Einführung finanziell unterstützt.'
T2 = 'Nachdem die Stadt jahrelang über ein neues Verkehrskonzept gestritten hatte, wurde nun beschlossen, die Innenstadt für private Autos weitgehend zu sperren. Befürworter sehen darin eine Chance, die Luft zu verbessern und den Aufenthalt attraktiver zu machen. Händler hingegen warnen vor Umsatzeinbußen. Der Stadtrat sagte zu, die Auswirkungen nach einem Jahr zu überprüfen und bei Bedarf nachzubessern.'
T3 = 'Der Autor argumentiert, dass soziale Medien das Verhältnis zwischen Politik und Bürgern grundlegend verändert haben. Einerseits könnten Politiker unmittelbar mit Wählern kommunizieren, ohne den Umweg über Journalisten zu gehen. Andererseits begünstige die Logik der Plattformen zugespitzte Aussagen, weil sie mehr Aufmerksamkeit erzeugen als differenzierte Positionen. Er schlussfolgert, die Demokratie sei nicht gefährdet, wenn die Nutzer Quellen kritisch prüften.'
T4 = 'Sehr geehrte Damen und Herren, hiermit kündige ich fristgerecht meinen Vertrag zum 31. März. Bitte bestätigen Sie mir den Eingang dieser Kündigung schriftlich. Sollten Sie bis zum 15. Februar keine Bestätigung senden, werde ich rechtliche Schritte einleiten. Außerdem bitte ich um Rückzahlung der zu viel berechneten Gebühr von 48 Euro. Mit freundlichen Grüßen, Daniel Hofmann'
LESEN = [
 (T1, 'Laut der Studie sinkt die Produktivität durch die Vier-Tage-Woche.', RF, 1),
 (T1, 'Die Beschäftigten fühlen sich weniger gestresst.', RF, 0),
 (T1, 'Warum lässt sich das Modell nicht überall umsetzen?', ['Es fehlen Arbeitskräfte in manchen Branchen.', 'Die Gewerkschaften lehnen es ab.', 'Es ist gesetzlich verboten.'], 0),
 (T1, 'Was fordern die Gewerkschaften?', ['staatliche finanzielle Unterstützung', 'mehr Urlaub', 'höhere Steuern'], 0),
 (T2, 'Die Stadt hat ein neues Verkehrskonzept beschlossen.', RF, 0),
 (T2, 'Alle Händler unterstützen das Konzept.', RF, 1),
 (T2, 'Was sagte der Stadtrat zu?', ['die Folgen nach einem Jahr zu überprüfen', 'die Parkplätze zu erweitern', 'Händler zu entschädigen'], 0),
 (T2, 'Was erhoffen sich die Befürworter?', ['bessere Luft und attraktivere Innenstadt', 'mehr Parkplätze', 'niedrigere Preise'], 0),
 (T3, 'Der Autor sagt, soziale Medien hätten das Verhältnis zwischen Politik und Bürgern verändert.', RF, 0),
 (T3, 'Journalisten sind laut Autor für Politiker unverzichtbar.', RF, 1),
 (T3, 'Warum begünstigen Plattformen zugespitzte Aussagen?', ['Sie erzeugen mehr Aufmerksamkeit.', 'Sie sind gesetzlich vorgeschrieben.', 'Sie sind kürzer zu schreiben.'], 0),
 (T3, 'Wann ist die Demokratie laut Autor nicht gefährdet?', ['wenn Nutzer Quellen kritisch prüfen', 'wenn Politiker seltener posten', 'wenn Plattformen verboten werden'], 0),
 (T4, 'Herr Hofmann kündigt seinen Vertrag zum 31. März.', RF, 0),
 (T4, 'Er verlangt eine mündliche Bestätigung.', RF, 1),
 (T4, 'Was passiert, wenn er bis zum 15. Februar keine Bestätigung erhält?', ['Er leitet rechtliche Schritte ein.', 'Er zahlt eine Gebühr.', 'Er verlängert den Vertrag.'], 0),
 (T4, 'Wie viel Geld fordert er zurück?', ['48 Euro', '84 Euro', '15 Euro'], 0),
]
SCHREIBEN = [
 ('Du formulierst eine Beschwerde an einen Vermieter (formell).', 'Wähle den besten Satz:', ['Hiermit beschwere ich mich über die defekte Heizung, deren Reparatur seit Wochen aussteht.', 'Ich beschwere mich, dass die Heizung kaputt ist und nichts passiert, hey.', 'Hiermit beschwere ich über die defekte Heizung, die Reparatur steht seit Wochen aus.'], 0),
 ('Du gibst die Aussage eines Ministers wieder (Konjunktiv I).', 'Wähle den besten Satz:', ['Der Minister erklärte, er sei mit dem Ergebnis zufrieden.', 'Der Minister erklärte, er wäre mit dem Ergebnis zufrieden gewesen sein.', 'Der Minister erklärte, er ist mit dem Ergebnis sei zufrieden.'], 0),
 ('Du schreibst über eine verpasste Chance (nicht erfüllte Bedingung in der Vergangenheit).', 'Wähle den besten Satz:', ['Hätte ich früher reagiert, wäre der Schaden kleiner gewesen.', 'Hätte ich früher reagiert, ist der Schaden kleiner gewesen.', 'Wäre ich früher reagiert, hätte der Schaden kleiner gewesen.'], 0),
 ('Du verwendest den Nominalstil in einem offiziellen Bericht.', 'Wähle den besten Satz:', ['Bei Nichtzahlung der Gebühr wird eine Mahnung versandt.', 'Wenn man nicht zahlt, dann Mahnung wird versandt.', 'Bei nicht zahlen der Gebühr eine Mahnung versandt wird.'], 0),
 ('Du drückst aus, dass etwas trotz Schwierigkeiten gelungen ist.', 'Wähle den besten Satz:', ['Trotz der Schwierigkeiten hat das Projekt erfolgreich abgeschlossen werden können.', 'Trotz die Schwierigkeiten das Projekt hat erfolgreich abgeschlossen.', 'Obwohl der Schwierigkeiten ist das Projekt erfolgreich abgeschlossen.'], 0),
 ('Du erklärst, wie man Energie spart (Methode).', 'Wähle den besten Satz:', ['Man kann viel Energie sparen, indem man elektrische Geräte ganz ausschaltet.', 'Man kann viel Energie sparen, indem man schaltet elektrische Geräte ganz aus.', 'Man kann viel Energie sparen, damit man elektrische Geräte ganz auszuschalten.'], 0),
]
HOEREN = [
 (['Guten Morgen, ich rufe wegen der Stellenanzeige als Projektleiterin an.', 'Ja, wir suchen jemanden mit mindestens drei Jahren Erfahrung.', 'Ich habe fünf Jahre in der Logistik gearbeitet und leite seit zwei Jahren ein Team.', 'Das klingt gut. Könnten Sie Ihre Unterlagen bis Freitag schicken?', 'Natürlich, ich schicke sie noch heute.'],
  [('Worum geht es im Gespräch?', ['um eine Stellenanzeige', 'um eine Wohnung', 'um eine Reise'], 0), ('Bis wann sollen die Unterlagen geschickt werden?', ['bis Freitag', 'bis Montag', 'bis nächsten Monat'], 0)]),
 (['Wie fanden Sie den Vortrag über künstliche Intelligenz?', 'Interessant, aber etwas einseitig. Es wurden fast nur die Vorteile genannt.', 'Das sehe ich auch so. Die Risiken für den Arbeitsmarkt kamen zu kurz.', 'Vielleicht kann man das in der Diskussion nachholen.'],
  [('Was kritisiert die zweite Person?', ['Der Vortrag war einseitig.', 'Der Vortrag war zu lang.', 'Der Vortrag war langweilig.'], 0), ('Was kam zu kurz?', ['die Risiken für den Arbeitsmarkt', 'die technischen Details', 'die Kosten'], 0)]),
 (['Laut einer neuen Umfrage nutzen 70 Prozent der Deutschen täglich das Smartphone für Nachrichten.', 'Gleichzeitig vertrauen nur 40 Prozent den Meldungen aus sozialen Netzwerken.', 'Experten raten deshalb, mehrere Quellen zu vergleichen, bevor man Informationen teilt.'],
  [('Wie viele nutzen das Smartphone für Nachrichten?', ['70 Prozent', '40 Prozent', '90 Prozent'], 0), ('Was raten Experten?', ['mehrere Quellen vergleichen', 'keine Nachrichten lesen', 'nur Zeitungen lesen'], 0)]),
 (['Ich überlege, meinen Handyvertrag zu kündigen. Er ist mir zu teuer geworden.', 'Hast du die Kündigungsfrist geprüft?', 'Ja, sie beträgt drei Monate zum Ende der Laufzeit.', 'Dann solltest du es möglichst schnell schriftlich tun, sonst verlängert er sich automatisch.', 'Stimmt. Ich schreibe heute noch das Kündigungsschreiben.'],
  [('Warum will die Person kündigen?', ['Der Vertrag ist zu teuer.', 'Der Empfang ist schlecht.', 'Sie zieht um.'], 0), ('Was passiert ohne rechtzeitige Kündigung?', ['Der Vertrag verlängert sich automatisch.', 'Der Vertrag endet sofort.', 'Der Preis sinkt.'], 0)]),
]
