import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Probetraining",
  description:
    "Unverbindlich Velotrial ausprobieren: Der VCTL heisst Einsteiger*innen jeden Mittwoch am Trialplatz Luzern willkommen.",
};

const groups = [
  {
    group: "Junioren",
    time: "16:15 – 17:15",
    age: "ca. 6 – 11 Jahre",
    desc: "Spielerischer Einstieg, Balance, erste Tricks.",
  },
  {
    group: "Jugend",
    time: "17:15 – 18:45",
    age: "ca. 12 – 17 Jahre",
    desc: "Vom Rookie bis Advanced – ideal zum Reinfinden und Ambitionen entwickeln.",
  },
  {
    group: "Erwachsene",
    time: "19:00 – 20:15",
    age: "ab 18 Jahren",
    desc: "Alle Levels, vom Wiedereinstieg bis zum Advanced-Rider.",
  },
];

const checklist = [
  "Ein Velo (Trialbike wenn vorhanden – sonst MTB mit Plattformpedalen)",
  "Helm (Pflicht), Handschuhe & feste Schuhe",
  "Wettertaugliche Kleidung, in der du dich bewegen kannst",
  "Wasserflasche und ein kleiner Snack",
  "Lust, Neues zu probieren und ein paar Mal auf den Boden zu gucken",
];

export default function ProbetrainingPage() {
  return (
    <>
      <PageHeader
        kicker="Probetraining"
        title="Komm vorbei. Probier's aus."
        subtitle="Velotrial ist das perfekte Balance-Training fürs Velo. Dein erstes Training beim VCTL ist unverbindlich und kostenlos."
        image={{ src: "/images/probetraining.jpg", alt: "Zwei Velo-Fahrer*innen gemeinsam unterwegs" }}
      />

      {/* Ablauf */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 -mt-14 pb-16">
        <div className="grid gap-4 rounded-3xl bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 sm:grid-cols-3">
          <Step
            n="01"
            title="Anmelden"
            desc="Kurz Bescheid geben – damit wir wissen, wer kommt und in welcher Gruppe du starten sollst."
          />
          <Step
            n="02"
            title="Vorbeikommen"
            desc="Mittwochs am Trialplatz Luzern. Komm 10 Minuten vor Trainingsbeginn, damit wir dich in Ruhe einführen."
          />
          <Step
            n="03"
            title="Mitmachen"
            desc="Einstieg, Balance-Übungen, erste Tricks – ganz entspannt und ohne Druck."
          />
        </div>
      </section>

      {/* Gruppen passend fürs Probetraining */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
            Welche Gruppe?
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
            Such dir deinen Slot aus.
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Du bist dir nicht sicher, wo du reinpasst? Kein Problem – schreib
            uns bei der Anmeldung dein Alter und deine Erfahrung, wir finden
            gemeinsam die richtige Gruppe.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.group}
              className="rounded-2xl bg-white p-8 ring-1 ring-slate-200 transition hover:ring-brand-500 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                {g.time}
              </p>
              <h3 className="mt-3 text-2xl font-black text-ink">{g.group}</h3>
              <p className="mt-1 text-sm font-semibold text-muted">{g.age}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist + Anmeldeformular */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Checkliste */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
              Was du brauchst
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
              Checkliste fürs erste Mal.
            </h2>
            <ul className="mt-6 space-y-3">
              {checklist.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <svg
                      viewBox="0 0 24 24"
                      width={12}
                      height={12}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100 text-sm text-muted">
              <p className="font-semibold text-ink">Gut zu wissen</p>
              <p className="mt-2">
                Kein eigenes Trialbike? Kein Problem. Meld dich einfach bei
                uns – manchmal lässt sich für die ersten Male ein Ersatzbike
                organisieren.
              </p>
            </div>
          </div>

          {/* Formular (Platzhalter – Anbindung folgt) */}
          <div className="lg:col-span-7">
            <form
              action="#"
              method="post"
              className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 shadow-sm"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
                Anmeldung
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
                Meld dich fürs Probetraining an
              </h2>
              <p className="mt-2 text-sm text-muted">
                Wir melden uns innert wenigen Tagen mit allen Infos zurück.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Vorname" name="firstName" />
                <Field label="Nachname" name="lastName" />
                <Field label="E-Mail" name="email" type="email" />
                <Field label="Telefon" name="phone" type="tel" />
                <Field
                  label="Alter"
                  name="age"
                  type="number"
                  className="sm:col-span-1"
                />
                <div className="sm:col-span-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-ink">
                    Gruppe
                  </label>
                  <select
                    name="group"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Bitte wählen…
                    </option>
                    <option value="junioren">Junioren (6–11)</option>
                    <option value="jugend">Jugend (12–17)</option>
                    <option value="erwachsene">Erwachsene (ab 18)</option>
                    <option value="unsicher">Bin mir unsicher</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ink">
                    Nachricht (optional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    placeholder="Erfahrungslevel, Fragen, etc."
                  />
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Anmeldung senden
              </button>

              <p className="mt-4 text-xs text-muted">
                Hinweis: Die Anbindung an E-Mail / Backend wird im zweiten
                Schritt zusammen mit dem CRM realisiert.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
      <span className="font-mono text-sm font-bold text-brand-500">{n}</span>
      <h3 className="mt-2 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{desc}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="text-xs font-bold uppercase tracking-wider text-ink"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}
