# Landingpage startklar machen

Die Landingpage `/lp/mobile-wellnessmassage-zuerich` ist fertig gebaut, aber blockiert: Solange Pflichtangaben fehlen, bleibt die Kampagne deaktiviert, das Kennenlern-Angebot und der WhatsApp-Button werden ausgeblendet.

## Was ich von dir brauche

Bitte gib mir diese Werte (einfach als Liste in den Chat):

1. Vollständiger Name für das Impressum
2. WhatsApp-Nummer im Format +41...
3. Kontakt-E-Mail-Adresse
4. Einsatzgebiet als Text (z. B. "Stadt Zürich und Umgebung")
5. Postleitzahlen, die du bedienst (z. B. 8004, 8005, 8048 …)
6. Einsatzradius in km
7. Zeitfenster, die du wirklich anbieten kannst (z. B. "17:00–19:00", "19:00–21:00")
8. Kennenlern-Angebot: aktiv ja/nein, Dauer, Preis (0 = gratis)
9. Meta Pixel ID (aus dem Meta Business Manager)
10. Echtes Portraitfoto von dir (und optional ein Video) — als Upload

## Was ich damit mache

- Alle Werte in die zentrale Kampagnen-Config eintragen, `TODO_REQUIRED` ersetzen
- Portrait/Video als Projekt-Asset einbinden und in der Config verlinken
- Angebot aktivieren, sobald Dauer, Preis und Bedingungen vollständig sind
- Kampagne scharf schalten, sobald die Launch-Checkliste keine offenen Punkte mehr zeigt
- Kurz prüfen: Mobilansicht 390 px, WhatsApp-Link funktioniert, Formular sendet, Zeitfenster-Auswahl gefüllt

## Wenn etwas noch fehlt

Fehlende Punkte bleiben auf `TODO_REQUIRED` und werden in der Admin-Checkliste angezeigt — die Kampagne bleibt dann bewusst deaktiviert, statt mit Platzhaltern online zu gehen. Ohne Meta Pixel ID lässt sich die Seite trotzdem starten; es fehlt dann nur das Conversion-Tracking.

## Technisch

- Betroffene Datei: `src/config/campaign.ts` (einzige Quelle der Wahrheit)
- Medien landen unter `src/assets/` und werden per Import referenziert
- Keine Änderungen am Buchungsprozess, an der Homepage oder am Lead-Backend
