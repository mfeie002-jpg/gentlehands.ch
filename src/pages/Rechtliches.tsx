import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const Rechtliches = () => {
  return (
    <Layout>
      <SEOHead
        title="Rechtliches | GentleHands Zürich"
        description="Impressum, AGB und Datenschutzrichtlinien von GentleHands Zürich. Transparenz und Rechtssicherheit für unsere Kundinnen."
        canonical="/rechtliches"
        noIndex={true}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-foreground mb-6">Rechtliches</h1>
            <p className="text-muted-foreground text-lg">
              Impressum, Allgemeine Geschäftsbedingungen und Datenschutz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          <div className="space-y-16">
            {/* Impressum */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="impressum"
              className="scroll-mt-32"
            >
              <h2 className="text-foreground mb-6">Impressum</h2>
              <div className="card-elevated p-8 space-y-4 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">GentleHands</p>
                  <p>[Platzhalter: Vollständiger Firmenname]</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Adresse</p>
                  <p>[Platzhalter: Strasse und Hausnummer]</p>
                  <p>[Platzhalter: PLZ Ort]</p>
                  <p>Schweiz</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Kontakt</p>
                  <p>E-Mail: kontakt@gentlehands.ch</p>
                  <p>Telefon: +41 00 000 00 00</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Vertretungsberechtigte Person</p>
                  <p>[Platzhalter: Name des Inhabers]</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Handelsregister</p>
                  <p>[Platzhalter: Handelsregistereintrag, falls vorhanden]</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">UID-Nummer</p>
                  <p>[Platzhalter: CHE-XXX.XXX.XXX]</p>
                </div>
              </div>
            </motion.div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-8"
            >
              <h3 className="font-display text-xl text-foreground mb-4">
                Wichtiger Hinweis
              </h3>
              <p className="text-muted-foreground">
                <strong>GentleHands ist kein Erotikstudio.</strong> Wir bieten
                ausschliesslich professionelle Entspannungs- und
                Wohlfühlmassagen an. Sexuelle Dienstleistungen jeglicher Art
                werden nicht angeboten und Anfragen diesbezüglich werden
                konsequent abgelehnt. Unsere Services richten sich an Frauen,
                die einen sicheren Raum für körperliche Entspannung und mentales
                Loslassen suchen.
              </p>
            </motion.div>

            {/* AGB */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="agb"
              className="scroll-mt-32"
            >
              <h2 className="text-foreground mb-6">
                Allgemeine Geschäftsbedingungen (AGB)
              </h2>
              <div className="card-elevated p-8 space-y-6 text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    1. Geltungsbereich
                  </h4>
                  <p>
                    Diese AGB gelten für alle Dienstleistungen von GentleHands.
                    Mit der Buchung eines Termins akzeptieren Sie diese
                    Bedingungen.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    2. Buchung und Terminbestätigung
                  </h4>
                  <p>
                    Terminanfragen über unsere Website sind unverbindlich. Ein
                    Vertrag kommt erst mit unserer schriftlichen Bestätigung
                    (per E-Mail oder SMS) zustande.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    3. Stornierung
                  </h4>
                  <p>
                    Termine können bis 24 Stunden vor dem vereinbarten Termin
                    kostenfrei storniert oder verschoben werden. Bei späteren
                    Absagen oder Nichterscheinen behalten wir uns vor, bis zu
                    100% des Preises zu berechnen. In begründeten Ausnahmefällen
                    (z.B. Krankheit mit Attest) finden wir eine kulante Lösung.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    4. Preise und Zahlung
                  </h4>
                  <p>
                    Alle Preise sind in Schweizer Franken (CHF) und verstehen
                    sich inklusive Mehrwertsteuer. Die Zahlung erfolgt nach der
                    Session. Wir akzeptieren Bargeld, Kreditkarten (Visa,
                    Mastercard) und TWINT.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    5. Gutscheine
                  </h4>
                  <p>
                    Gutscheine sind ab Kaufdatum 2 Jahre gültig und nicht gegen
                    Bargeld einlösbar. Restbeträge werden nicht ausgezahlt.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    6. Gesundheit
                  </h4>
                  <p>
                    Bei gesundheitlichen Einschränkungen, Schwangerschaft oder
                    akuten Erkrankungen informieren Sie uns bitte vor der
                    Session. Wir behalten uns vor, eine Massage aus
                    gesundheitlichen Gründen abzulehnen.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    7. Verhaltensregeln
                  </h4>
                  <p>
                    Wir erwarten respektvolles Verhalten. Unangemessenes
                    Verhalten oder Anfragen nach nicht angebotenen
                    Dienstleistungen führen zum sofortigen Abbruch der Session
                    ohne Erstattung.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    8. Haftung
                  </h4>
                  <p>
                    GentleHands haftet nicht für Schäden, die durch
                    Nichtbeachtung von Hinweisen entstehen. Die Haftung für
                    leichte Fahrlässigkeit ist ausgeschlossen, soweit gesetzlich
                    zulässig.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    9. Gerichtsstand
                  </h4>
                  <p>
                    Gerichtsstand ist Zürich, Schweiz. Es gilt ausschliesslich
                    Schweizer Recht.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Datenschutz */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="datenschutz"
              className="scroll-mt-32"
            >
              <h2 className="text-foreground mb-6">Datenschutzerklärung</h2>
              <div className="card-elevated p-8 space-y-6 text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    1. Verantwortliche Stelle
                  </h4>
                  <p>
                    Verantwortlich für die Datenverarbeitung auf dieser Website
                    ist GentleHands (siehe Impressum).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    2. Erhebung und Speicherung personenbezogener Daten
                  </h4>
                  <p>
                    Bei einer Buchung oder Kontaktanfrage erheben wir: Name,
                    E-Mail-Adresse, Telefonnummer, sowie die von Ihnen
                    angegebenen Präferenzen. Diese Daten werden ausschliesslich
                    zur Bearbeitung Ihrer Anfrage und zur Durchführung unserer
                    Services verwendet.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    3. Verwendungszweck
                  </h4>
                  <p>
                    Ihre Daten werden verwendet für: Terminvereinbarung und
                    -bestätigung, Kommunikation bezüglich Ihrer Buchung, und
                    falls gewünscht, Information über zukünftige Angebote.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    4. Weitergabe von Daten
                  </h4>
                  <p>
                    Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, es sei
                    denn, sie ist zur Vertragserfüllung erforderlich oder Sie
                    haben ausdrücklich eingewilligt.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    5. Ihre Rechte
                  </h4>
                  <p>
                    Sie haben das Recht auf Auskunft, Berichtigung, Löschung und
                    Einschränkung der Verarbeitung Ihrer Daten. Kontaktieren Sie
                    uns hierzu unter kontakt@gentlehands.ch.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    6. Cookies
                  </h4>
                  <p>
                    Diese Website verwendet technisch notwendige Cookies. Sie
                    können die Verwendung von Cookies in Ihren
                    Browsereinstellungen deaktivieren.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    7. Datensicherheit
                  </h4>
                  <p>
                    Wir setzen technische und organisatorische
                    Sicherheitsmassnahmen ein, um Ihre Daten zu schützen. Die
                    Datenübertragung erfolgt verschlüsselt (SSL/TLS).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Rechtliches;
