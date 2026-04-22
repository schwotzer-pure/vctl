import { PageHeader } from "@/components/page-header";
import { ProbetrainingForm } from "./ProbetrainingForm";

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
  "Helm (Pflicht), Handschuhe & feste Schuhe",
  "Wettertaugliche Kleidung, in der du dich bewegen kannst",
  "Wasserflasche und ein kleiner Snack",
];

export default function ProbetrainingPage() {
  return (
    <>
      <PageHeader
        kicker="Probetraining"
        title="Komm vorbei. Probier's aus."
        subtitle="Velotrial ist das perfekte Balance-Training fürs Velo. Dein erstes Training beim VCTL ist unverbindlich und kostenlos."
        video={{ src: "/probetraining.mp4" }}
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

      {/* Wegbeschrieb */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
              Anfahrt
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
              So findest du uns.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Der Trialplatz befindet sich am Murmattweg in Luzern, gut
              erreichbar mit ÖV und Auto.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100 text-sm">
              <p className="font-bold text-ink">Trialplatz Luzern</p>
              <p className="mt-1 text-muted">Murmattweg 6</p>
              <p className="text-muted">6005 Luzern</p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Murmattweg+6,+6005+Luzern"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Route öffnen
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm aspect-video">
            <iframe
              src="https://www.google.com/maps?q=Murmattweg+6,+6005+Luzern&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Trialplatz Luzern"
            />
          </div>
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
                Kein eigenes Trialbike? Kein Problem. Wir klären dies gemeinsam
                vor dem ersten Training.
              </p>
            </div>
          </div>

          <div id="anmeldung" className="lg:col-span-7">
            <ProbetrainingForm />
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

