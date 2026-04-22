import { PageHeader } from "@/components/page-header";
import Link from "next/link";

export const metadata = {
  title: "Verein",
  description:
    "Der Velo- & Trial Club Luzern – Vereinsgeschichte, Vorstand, Mitgliedschaft und Statuten.",
};

const vorstand = [
  { role: "Präsident", name: "Christian Arnosti", email: "praesident@vctl.ch" },
  { role: "Sportkommissär / Haupttrainer", name: "Debi Studer", email: "" },
  { role: "Kassier", name: "Chantal Häfliger", email: "" },
  { role: "Webmaster / Mitgliederverwaltung", name: "Daniel Wenger", email: "" },
  { role: "Vereinsentwicklung", name: "Christian Schwotzer", email: "" },
];

const memberships = [
  {
    key: "FUN",
    price: "CHF 100",
    desc: "Erwachsene ohne Trainingsabo. Aktiver Teil des Vereinslebens, ohne regelmässiges Training.",
  },
  {
    key: "AKTIV",
    price: "CHF 400",
    desc: "Erwachsene mit Trainingsabo. Wöchentliches Training inklusive.",
  },
  {
    key: "JUNIOR",
    price: "CHF 250",
    desc: "Personen unter 20 Jahren, Training inklusive. Eltern können FUN-Mitglied werden (ab dem 2. Kind kostenlos).",
  },
  {
    key: "GÖNNER",
    price: "CHF 100",
    desc: "Unterstützungsmitgliedschaft für alle, die den VCTL fördern möchten, ohne aktiv teilzunehmen.",
  },
  {
    key: "PASSIV",
    price: "CHF 50",
    desc: "Basismitgliedschaft ohne aktive Teilnahme.",
  },
  {
    key: "EHRENMITGLIED",
    price: "Gratis",
    desc: "Ehrenmitgliedschaft – Vergabe durch die Generalversammlung.",
  },
];

export default function VereinPage() {
  return (
    <>
      <PageHeader
        kicker="Verein"
        title="Der VCTL. Wer wir sind."
        subtitle="Gegründet 2012, fördern wir Velotrial im Freizeit- und Wettkampfbereich – mit Freude am Sport und am Miteinander."
        image={{ src: "/images/trainingsplatz.jpg", alt: "Trainingsplatz VCTL Luzern" }}
      />

      {/* Über den Verein */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
              Über uns
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
              Velotrial für alle.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Der Velo- & Trial Club Luzern (VCTL) wurde 2012 gegründet und
              fördert Velotrial auf allen Niveaus – vom ersten Probetraining bis
              zum Swiss-Cup. Wir trainieren jeden Mittwoch am Trialplatz Luzern
              in strukturierten Gruppen für Junioren, Jugend und Erwachsene.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Unser Fokus liegt auf Freude am Sport, gegenseitiger Unterstützung
              und nachhaltigem Velotrial. Wir sind politisch und religiös neutral
              und lehnen leistungssteigernde Mittel konsequent ab.
            </p>
          </div>

          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            <ValueCard
              title="Freude am Sport"
              desc="Bei uns steht der Spass am Velotrial im Vordergrund – für Einsteiger*innen genauso wie für ambitionierte Riders."
            />
            <ValueCard
              title="Umweltbewusst"
              desc="Wir betreiben Velotrial mit Respekt gegenüber der Natur und unserer Umgebung."
            />
            <ValueCard
              title="Fair Play"
              desc="Wir sind gegen Doping und stehen für fairen, sauberen Sport auf allen Ebenen."
            />
            <ValueCard
              title="Mitglied bei Swiss Cycling"
              desc="Wir sind Mitglied bei Swiss Cycling und beim Kantonalen Radsportverband Luzern."
            />
          </div>
        </div>
      </section>

      {/* Vorstand */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
            Vorstand
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
            Diese Leute stecken dahinter.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vorstand.map((v) => (
              <div
                key={v.name}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
              >
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-600">
                  {v.role}
                </p>
                <p className="mt-2 text-lg font-black text-ink">{v.name}</p>
                {v.email && (
                  <a
                    href={`mailto:${v.email}`}
                    className="mt-2 block text-xs text-muted hover:text-brand-600 transition-colors"
                  >
                    {v.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitglied werden */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20" id="mitglied-werden">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
            Mitglied werden
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
            Werde Teil des VCTL.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Als Mitglied profitierst du von geführtem Training, aktivem
            Vereinsleben, Nutzung der Anlage und weiteren Vorteilen. Wähle die
            Kategorie, die zu dir passt.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {memberships.map((m) => (
            <div
              key={m.key}
              className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:ring-brand-500 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                  {m.key}
                </span>
                <span className="text-lg font-black text-ink">{m.price}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Pro-Rata Hinweis */}
        <div className="mt-8 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100 text-sm text-muted max-w-2xl">
          <p className="font-semibold text-ink">Beitritt im Jahresverlauf</p>
          <ul className="mt-2 space-y-1">
            <li>Januar – Juni: voller Jahresbeitrag</li>
            <li>Juli – September: halber Beitrag</li>
            <li>Oktober – Dezember: beitragsfrei bis Ende Jahr</li>
          </ul>
        </div>

        {/* Anmelde-CTA */}
        <div className="mt-10">
          <Link
            href="/probetraining#anmeldung"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700"
          >
            Probetraining buchen
          </Link>
        </div>
      </section>
    </>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
      <h3 className="font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}
