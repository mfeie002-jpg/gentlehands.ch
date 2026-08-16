import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { BedDouble, Droplets, Shirt, HeartHandshake, MessageCircle, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { LpHeader } from "@/components/lp/LpHeader";
import { LpFooter } from "@/components/lp/LpFooter";
import { LpMarketingConsent } from "@/components/lp/LpMarketingConsent";
import { LpVideoPortrait } from "@/components/lp/LpVideoPortrait";
import { LpLeadForm } from "@/components/lp/LpLeadForm";
import { LpLaunchChecklist } from "@/components/lp/LpLaunchChecklist";
import {
  campaignConfig,
  isSet,
  offerIsDisplayable,
  whatsappHref,
} from "@/config/campaign";
import { captureUtmParams, trackLpEvent, loadMetaPixel } from "@/lib/lpTracking";

const CANONICAL = "https://gentlehands.ch/lp/mobile-wellnessmassage-zuerich";

const brings = [
  { icon: BedDouble, title: "Stabile Massageliege", text: "Ich bringe eine stabile, gepflegte Massageliege mit und baue sie bei dir auf." },
  { icon: Shirt, title: "Frische Textilien", text: "Frisch gewaschene Tücher und Auflagen für jeden Termin." },
  { icon: Droplets, title: "Massageöl", text: "Hautfreundliches Massageöl. Sag mir einfach, wenn du etwas nicht möchtest." },
  { icon: HeartHandshake, title: "Ruhiger, professioneller Ablauf", text: "Vorgespräch, Massage, kurzer Abschluss – in ruhigem Tempo." },
];

const steps = [
  { title: "Termin anfragen", text: "Gewünschtes Zeitfenster und Postleitzahl angeben." },
  { title: "Persönliche Bestätigung erhalten", text: "Die Anfrage ist noch keine feste Buchung. Der Termin wird persönlich bestätigt." },
  { title: "Zurücklehnen", text: "GentleHands bringt die benötigte Ausstattung zum vereinbarten Ort mit." },
];

const safetyPoints = [
  "Nur bestätigte Termine",
  "Klare Preise und Bedingungen",
  "Professionelle Abdeckung mit Handtüchern",
  "Vertraulicher Umgang mit Kontaktdaten",
  "Keine erotischen oder sexuellen Dienstleistungen",
];

const faqs = [
  {
    q: "Was ist eine Wellnessmassage?",
    a: "Eine Wellnessmassage ist ein reines Entspannungsangebot. Sie ist keine medizinische oder therapeutische Behandlung und ersetzt keinen Arztbesuch.",
  },
  {
    q: "Was muss bei mir zu Hause vorhanden sein?",
    a: "Etwa zwei mal zwei Meter freie Fläche für die Massageliege, eine Steckdose in der Nähe ist hilfreich, und die Möglichkeit, sich vorher und nachher kurz zu waschen.",
  },
  {
    q: "Was bringt GentleHands mit?",
    a: "Massageliege, frische Textilien und Massageöl. Musik kann auf Wunsch dazukommen.",
  },
  {
    q: "Wie wird mit Grenzen und Privatsphäre umgegangen?",
    a: "Vor der Massage besprechen wir Ablauf, Wünsche und Grenzen. Du bist jederzeit professionell mit Handtüchern abgedeckt und kannst die Massage ohne Begründung unterbrechen oder beenden. Kontaktdaten werden vertraulich behandelt.",
  },
  {
    q: "Handelt es sich um ein erotisches Angebot?",
    a: "Nein. GentleHands bietet ausschliesslich seriöse, nicht-erotische Wellnessmassagen an. Anfragen mit sexuellem Hintergrund werden abgelehnt.",
  },
  {
    q: "Wer darf den kostenlosen Kennenlerntermin nutzen?",
    a: "Neue Kundinnen ab 18 Jahren im definierten Zürcher Einsatzgebiet, einmalig und nach persönlicher Terminbestätigung.",
  },
  {
    q: "Was passiert bei Schwangerschaft, akuten Beschwerden oder Erkrankungen?",
    a: "Bitte sag es vor dem Termin. In solchen Fällen ist eine Wellnessmassage nicht immer geeignet; kläre das bitte zuerst mit deiner Ärztin oder deinem Arzt ab. Wir sagen einen Termin lieber ab, als etwas zu riskieren.",
  },
  {
    q: "Wann ist ein Termin verbindlich?",
    a: "Erst nach der persönlichen Bestätigung. Eine Anfrage über das Formular ist noch keine Buchung.",
  },
];

const MobileWellnessmassageZuerich = () => {
  const location = useLocation();

  useEffect(() => {
    captureUtmParams(location.search);
    trackLpEvent("lp_view");
    loadMetaPixel(); // lädt nur bei vorhandener Marketing-Einwilligung
  }, [location.search]);

  const scrollToForm = () => {
    trackLpEvent("cta_primary_click");
    document.getElementById("anfrage")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("lp-firstName")?.focus({ preventScroll: true });
  };

  const providerName = String(campaignConfig.providerFirstName);

  return (
    <>
      <Helmet>
        <title>Mobile Wellnessmassage in Zürich – GentleHands</title>
        <meta
          name="description"
          content="Mobile Wellnessmassage für Frauen in Zürich: Massageliege, frische Textilien und Öl kommen zu dir nach Hause. Termin unverbindlich anfragen."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Mobile Wellnessmassage in Zürich – GentleHands" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen overflow-x-hidden bg-cream font-body text-foreground">
        <LpHeader />

        <main id="main-content" className="mx-auto w-full max-w-3xl px-4 pb-24">
          {/* 1. Hero */}
          <section className="pt-10 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-copper">
              Mobile Wellnessmassage · Zürich
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
              Deine Auszeit. Bei dir zu Hause.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Ich bringe Massageliege, frische Textilien und Massageöl mit. Du wählst einen passenden Termin und
              kannst dich in deiner vertrauten Umgebung entspannen.
            </p>

            {offerIsDisplayable && (
              <div className="mx-auto mt-6 max-w-md rounded-2xl border border-copper/30 bg-sand/40 p-5 text-left">
                <p className="font-display text-xl text-foreground">
                  Kostenlos kennenlernen: {String(campaignConfig.offerDurationMinutes)} Minuten für CHF{" "}
                  {String(campaignConfig.offerPrice)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{String(campaignConfig.offerConditions)}</p>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={scrollToForm}
                className="min-h-[52px] w-full rounded-xl bg-copper px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-copper-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper/40"
              >
                Kostenlosen Kennenlerntermin anfragen
              </button>

              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLpEvent("cta_whatsapp_click")}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-copper px-6 text-base font-medium text-copper focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper/40"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Frage per WhatsApp
                </a>
              )}
            </div>

            {isSet(campaignConfig.serviceAreaText) && (
              <p className="mt-4 text-sm text-muted-foreground">
                Einsatzgebiet: {String(campaignConfig.serviceAreaText)}
                {isSet(campaignConfig.serviceRadiusKm) ? ` (ca. ${campaignConfig.serviceRadiusKm} km)` : ""}
              </p>
            )}
          </section>

          {/* 2. Video / Portrait */}
          <section className="mt-14" aria-labelledby="video-heading">
            <h2 id="video-heading" className="mb-5 text-center font-display text-2xl">
              Kurz vorgestellt
            </h2>
            <LpVideoPortrait />
          </section>

          {/* 3. Was mitgebracht wird */}
          <section className="mt-14" aria-labelledby="brings-heading">
            <h2 id="brings-heading" className="mb-5 text-center font-display text-2xl">
              Was ich mitbringe
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {brings.map((item) => (
                <div key={item.title} className="rounded-2xl border border-copper/15 bg-background p-5">
                  <item.icon className="text-copper" size={24} aria-hidden="true" />
                  <h3 className="mt-3 font-display text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. So funktioniert es */}
          <section className="mt-14" aria-labelledby="steps-heading">
            <h2 id="steps-heading" className="mb-5 text-center font-display text-2xl">
              So funktioniert es
            </h2>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4 rounded-2xl border border-copper/15 bg-background p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-copper/10 font-display text-copper">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* 5. Über Morris und Sicherheit */}
          <section className="mt-14" aria-labelledby="about-heading">
            <h2 id="about-heading" className="mb-5 text-center font-display text-2xl">
              Wer kommt zu dir?
            </h2>
            <div className="rounded-2xl border border-copper/15 bg-background p-5">
              <p className="font-display text-lg">
                {isSet(campaignConfig.providerFullName) ? String(campaignConfig.providerFullName) : providerName}
              </p>
              {campaignConfig.verifiedQualifications.length > 0 ? (
                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                  {campaignConfig.verifiedQualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Es werden hier nur nachweislich geprüfte Qualifikationen genannt. Aktuell sind keine hinterlegt.
                </p>
              )}
              <p className="mt-4 text-sm text-muted-foreground">
                Vor jeder Massage besprechen wir den Ablauf, deine Wünsche und deine persönlichen Grenzen. Du
                entscheidest jederzeit, was angenehm ist, und kannst die Massage ohne Begründung unterbrechen oder
                beenden.
              </p>
              <ul className="mt-4 space-y-2">
                {safetyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                    <ShieldCheck size={18} className="mt-0.5 shrink-0 text-copper" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 6. Leadformular */}
          <section id="anfrage" className="mt-14 scroll-mt-6" aria-labelledby="form-heading">
            <h2 id="form-heading" className="mb-2 text-center font-display text-2xl">
              Termin anfragen
            </h2>
            <p className="mb-5 text-center text-sm text-muted-foreground">
              Wir fragen bewusst nur das Nötigste. Adresse und weitere Details besprechen wir persönlich.
            </p>
            <div className="rounded-2xl border border-copper/15 bg-background p-5">
              <ErrorBoundary>
                <LpLeadForm />
              </ErrorBoundary>
            </div>
          </section>

          {/* 8. FAQ */}
          <section className="mt-14" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-5 text-center font-display text-2xl">
              Häufige Fragen
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="mx-auto max-w-3xl px-4 pb-10">
            <LpMarketingConsent />
          </section>

          <LpLaunchChecklist />
        </main>

        <LpFooter />

        {/* Dauerhaft sichtbare mobile CTA-Leiste */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-copper/20 bg-cream/95 p-3 backdrop-blur-sm">
          <div className="mx-auto flex max-w-3xl gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="min-h-[48px] flex-1 rounded-xl bg-copper px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper/40"
            >
              Termin anfragen
            </button>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLpEvent("cta_whatsapp_click")}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-copper px-4 text-sm font-medium text-copper focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper/40"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileWellnessmassageZuerich;
