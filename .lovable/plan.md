# Kampagnen-Leads im Admin sichtbar machen

Die Landingpage `/lp/mobile-wellnessmassage-zuerich` sammelt Anfragen getrennt vom normalen Buchungsprozess in `campaign_leads`. Aktuell gibt es keine Oberfläche, um diese Leads zu sehen — sie sind nur in der Datenbank.

## Was gebaut wird

- Neuer Tab "Kampagnen-Leads" im bestehenden Admin-Bereich
- Tabelle mit: Eingang (Datum/Zeit), Vorname, Telefon, PLZ, Wunschtag, Zeitfenster, Kontaktweg, Kampagne, UTM-Quelle
- Statusfeld pro Lead: neu / kontaktiert / gebucht / abgesagt, direkt in der Liste änderbar
- Direkt-Aktionen pro Zeile: anrufen (tel:) und WhatsApp öffnen
- Filter nach Status und Sortierung nach Eingang (neueste zuerst)

## Technisch

- Read/Update auf `campaign_leads` nur für Admins (RLS-Policy über die bestehende `has_role`-Funktion), keine öffentlichen Leserechte
- Falls nötig: Spalte `status` mit Default `neu` ergänzen, inkl. GRANTs für `authenticated`/`service_role`
- Neue Komponente unter `src/components/admin/`, eingebunden in die bestehende Admin-Seite
- Keine Änderungen am Buchungswizard, an der Landingpage oder an der Edge-Function
