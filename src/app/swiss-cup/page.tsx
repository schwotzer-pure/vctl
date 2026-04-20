import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Swiss-Cup 2026",
  description:
    "Swiss-Cup Wettkampftermine 2026 – der VCTL ist an den nationalen Trial-Wettkämpfen dabei.",
};

type Race = {
  date: string;
  day: string;
  location: string;
  note?: string;
  // ISO für Sortierung/Countdown
  iso: string;
};

const races: Race[] = [
  { date: "19. April", day: "So", location: "Malvaglia", iso: "2026-04-19" },
  { date: "6. Juni", day: "Sa", location: "Valbirse", iso: "2026-06-06" },
  { date: "28. Juni", day: "So", location: "Delémont", iso: "2026-06-28" },
  {
    date: "30. August",
    day: "So",
    location: "Vulliens",
    note: "Nach Sommerferien",
    iso: "2026-08-30",
  },
  {
    date: "6. September",
    day: "So",
    location: "Vordemwald",
    note: "Nach Sommerferien",
    iso: "2026-09-06",
  },
  {
    date: "13. September",
    day: "So",
    location: "Atzmännig",
    note: "Nach Sommerferien",
    iso: "2026-09-13",
  },
];

export default function SwissCupPage() {
  const todayISO = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Zurich",
  }).format(new Date());
  const upcomingRaces = races.filter((r) => r.iso >= todayISO);
  const nextRace = upcomingRaces[0] ?? null;

  return (
    <>
      <PageHeader
        kicker="Swiss-Cup 2026"
        title="Sechs Wettkämpfe. Eine Saison."
        subtitle="Vom Tessin bis in den Aargau: Der Swiss-Cup bringt die Trial-Community schweizweit zusammen. Der VCTL ist dabei."
        video={{ src: "/hero.mp4", objectPosition: "center 30%" }}
      />

      {/* Next Race Highlight */}
      {nextRace && (
        <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 -mt-14">
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
                  Nächster Wettkampf
                </p>
                <p className="mt-2 text-3xl font-black text-ink sm:text-4xl">
                  {nextRace.location}
                </p>
                <p className="mt-1 text-muted">
                  {nextRace.day}, {nextRace.date} 2026
                  {nextRace.note ? ` · ${nextRace.note}` : ""}
                </p>
              </div>
              <Link
                href="#anmeldung"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-700"
              >
                Anmeldung
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Termine Liste */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
              Kommende Termine
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
              Kalender 2026
            </h2>
          </div>
        </div>

        {upcomingRaces.length > 0 ? (
          <ol className="space-y-3">
            {upcomingRaces.map((r) => {
              const raceNumber = races.indexOf(r) + 1;
              return (
                <li
                  key={r.iso}
                  className="flex flex-wrap items-center gap-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:ring-brand-500 hover:shadow-lg hover:shadow-brand-500/10"
                >
                  <div className="flex items-center gap-5">
                    <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {r.day}
                      </span>
                      <span className="text-base font-black leading-none">
                        {r.date.split(" ")[0]}
                      </span>
                      <span className="text-[10px] font-semibold">
                        {r.date.split(" ")[1]}
                      </span>
                    </span>
                    <div>
                      <p className="text-lg font-black text-ink">{r.location}</p>
                      <p className="text-sm text-muted">
                        Rennen {raceNumber} von {races.length}
                        {r.note ? ` · ${r.note}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Geplant
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="text-muted">
            Die Saison 2026 ist abgeschlossen. Bis nächstes Jahr!
          </p>
        )}
      </section>

      {/* Anmeldung */}
      <section id="anmeldung" className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="overflow-hidden rounded-3xl bg-ink p-10 text-white sm:p-14">
          <div className="grid gap-8 lg:grid-cols-5 items-center">
            <div className="lg:col-span-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-400">
                Wichtig
              </span>
              <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Anmeldeformular bitte ausfüllen.
              </h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Auch wer 2026 an keinem Wettkampf teilnehmen kann, meldet sich
                bitte zurück – wir benötigen die Rückmeldung von{" "}
                <span className="font-bold text-white">allen</span> für die
                Planung (Betreuung, Fahrservice, Gruppierung).
              </p>
            </div>
            <div className="lg:col-span-2 lg:justify-self-end">
              <Link
                href="/probetraining"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-600"
              >
                Zur Anmeldung
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
