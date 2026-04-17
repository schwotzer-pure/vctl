import Link from "next/link";
import { PageHeader } from "@/components/page-header";

// Seite bei jedem Request neu rendern, damit "heute" immer aktuell ist
// und abgelaufene Termine automatisch verschwinden.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Training",
  description:
    "Trainingszeiten, Gruppen, Trainer und Ferienregelung des VCTL am Trialplatz Luzern.",
};

type Session = {
  time: string;
  group: string;
  level: string;
};

const sessions: Session[] = [
  { time: "16:15 – 17:15", group: "Junioren", level: "Einstieg & Grundlagen" },
  { time: "17:15 – 18:45", group: "Jugend", level: "Rookie bis Advanced" },
  { time: "19:00 – 20:15", group: "Erwachsene", level: "Alle Levels" },
];

type PlanRow = {
  date: string;
  // Für Einzeltage: ISO-Datum. Für Zeiträume: ISO-Datum des Enddatums
  // (damit der Eintrag bis einschließlich letztem Ferientag sichtbar bleibt).
  iso: string;
  kw?: string;
  junioren?: string;
  jugend?: string;
  erwachsene?: string;
  note?: string;
  type?: "ferien" | "wettkampf";
};

const planAprilMai: PlanRow[] = [
  { date: "Mi, 01.04.", iso: "2026-04-01", kw: "14", junioren: "tbd", jugend: "tbd", erwachsene: "tbd" },
  { date: "Mi, 08.04.", iso: "2026-04-08", kw: "15", note: "Osterferien", type: "ferien" },
  { date: "Mi, 15.04.", iso: "2026-04-15", kw: "16", note: "Osterferien", type: "ferien" },
  { date: "So, 19.04.", iso: "2026-04-19", note: "Wettkampf Malvaglia", type: "wettkampf" },
  { date: "Mi, 22.04.", iso: "2026-04-22", kw: "17", junioren: "tbd", jugend: "tbd", erwachsene: "tbd" },
  { date: "Mi, 29.04.", iso: "2026-04-29", kw: "18", junioren: "Debi", jugend: "Debi", erwachsene: "Debi" },
  { date: "Mi, 06.05.", iso: "2026-05-06", kw: "19", junioren: "Debi", jugend: "Debi", erwachsene: "Debi" },
  { date: "Mi, 13.05.", iso: "2026-05-13", kw: "20", junioren: "Debi", jugend: "Debi", erwachsene: "Debi" },
  { date: "Mi, 20.05.", iso: "2026-05-20", kw: "21", junioren: "Debi", jugend: "Debi", erwachsene: "Debi" },
  { date: "Mi, 27.05.", iso: "2026-05-27", kw: "22", junioren: "Debi", jugend: "Debi", erwachsene: "Debi" },
];

const planJuniJuli: PlanRow[] = [
  { date: "Mi, 03.06.", iso: "2026-06-03", kw: "23", junioren: "tbd", jugend: "tbd", erwachsene: "tbd" },
  { date: "Sa, 06.06.", iso: "2026-06-06", note: "Wettkampf Valbirse", type: "wettkampf" },
  { date: "Mi, 10.06.", iso: "2026-06-10", kw: "24", junioren: "tbd", jugend: "tbd", erwachsene: "tbd" },
  { date: "Mi, 17.06.", iso: "2026-06-17", kw: "25", junioren: "tbd", jugend: "tbd", erwachsene: "tbd" },
  { date: "Mi, 24.06.", iso: "2026-06-24", kw: "26", junioren: "Debi", jugend: "Debi", erwachsene: "Debi" },
  { date: "So, 28.06.", iso: "2026-06-28", note: "Wettkampf Delémont", type: "wettkampf" },
  { date: "Mi, 01.07.", iso: "2026-07-01", kw: "27", junioren: "Debi", jugend: "Debi", erwachsene: "Debi" },
  // Sommerferien: Enddatum als iso, damit der Eintrag bis zum letzten Ferientag sichtbar bleibt.
  { date: "04.07. – 16.08.", iso: "2026-08-16", note: "Sommerferien – Spezialtraining", type: "ferien" },
];

// Liefert den heutigen Tag als Date auf 00:00:00.
function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// Filtert Plan-Zeilen auf alles ab heute.
function upcoming(rows: PlanRow[]): PlanRow[] {
  const today = startOfToday();
  return rows.filter((r) => new Date(r.iso) >= today);
}

export default function TrainingPage() {
  const today = startOfToday();
  const aprilMai = upcoming(planAprilMai);
  const juniJuli = upcoming(planJuniJuli);
  const hasPlan = aprilMai.length > 0 || juniJuli.length > 0;

  // Ferien: Endedatum als ISO zum Filtern. Nur noch anzeigen solange laufend/zukünftig.
  const holidays = [
    {
      title: "Osterferien",
      dates: "FR 3. April – SO 19. April 2026",
      note: "Kein reguläres Training. Spezialtraining nach Absprache.",
      endIso: "2026-04-19",
    },
    {
      title: "Sommerferien",
      dates: "SA 4. Juli – SO 16. August 2026",
      note: "Spezialtrainings werden separat kommuniziert.",
      endIso: "2026-08-16",
    },
  ].filter((h) => new Date(h.endIso) >= today);

  return (
    <>
      <PageHeader
        kicker="Training"
        title="Jeden Mittwoch am Trialplatz Luzern."
        subtitle="Drei Gruppen, zwei Trainer*innen, ein Platz. Wir trainieren fokussiert – mit Platz für Einsteiger*innen und ambitionierte Riders."
        image={{ src: "/images/training.jpg", alt: "Biker in Aktion auf dem Trail" }}
      />

      {/* Gruppen */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-16 -mt-14">
        <div className="grid gap-5 md:grid-cols-3">
          {sessions.map((s) => (
            <div
              key={s.group}
              className="rounded-2xl bg-white p-8 shadow-lg shadow-slate-900/5 ring-1 ring-slate-100"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                {s.time}
              </p>
              <h3 className="mt-3 text-2xl font-black text-ink">{s.group}</h3>
              <p className="mt-2 text-sm text-muted">{s.level}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100 text-sm text-muted">
          <span className="font-semibold text-ink">Trainer*innen:</span>{" "}
          Debi (Haupttrainerin) & René (Co-Trainer). Zuteilung je Mittwoch
          siehe Trainingsplan.
        </div>
      </section>

      {/* Trainingsplan */}
      {hasPlan && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-16">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
                Trainingsplan 2026
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
                Kommende Trainings
              </h2>
            </div>
            <Legend />
          </div>

          {aprilMai.length > 0 && (
            <PlanTable title="April – Mai" rows={aprilMai} />
          )}
          {juniJuli.length > 0 && (
            <PlanTable title="Juni – Juli" rows={juniJuli} />
          )}

          <p className="mt-8 text-sm text-muted">
            Der vollständige Trainingsplan mit allen Daten, Trainer*innen und
            Spezialanlässen wird auf Clubdesk veröffentlicht und laufend
            aktualisiert.
          </p>
        </section>
      )}

      {/* Ferien */}
      {holidays.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
          <div className="grid gap-5 md:grid-cols-2">
            {holidays.map((h) => (
              <HolidayCard
                key={h.title}
                title={h.title}
                dates={h.dates}
                note={h.note}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="rounded-3xl bg-ink px-8 py-12 text-white sm:px-14">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
              Noch nie auf einem Trialbike gestanden? Komm beim Probetraining
              vorbei.
            </h3>
            <div className="lg:justify-self-end">
              <Link
                href="/probetraining"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-brand-50"
              >
                Probetraining anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PlanTable({ title, rows }: { title: string; rows: PlanRow[] }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-white">
            <tr className="text-left text-xs font-bold uppercase tracking-wider text-muted">
              <th className="px-6 py-3">Datum</th>
              <th className="px-3 py-3">KW</th>
              <th className="px-3 py-3">Junioren</th>
              <th className="px-3 py-3">Jugend</th>
              <th className="px-3 py-3">Erwachsene</th>
              <th className="px-6 py-3">Bemerkung</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r, idx) => {
              const bg =
                r.type === "ferien"
                  ? "bg-amber-50/60"
                  : r.type === "wettkampf"
                    ? "bg-emerald-50/70"
                    : idx % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50/50";
              return (
                <tr key={`${r.date}-${idx}`} className={bg}>
                  <td className="px-6 py-3 font-semibold text-ink whitespace-nowrap">
                    {r.date}
                  </td>
                  <td className="px-3 py-3 text-muted">{r.kw ?? "—"}</td>
                  <td className="px-3 py-3 text-ink">{r.junioren ?? "—"}</td>
                  <td className="px-3 py-3 text-ink">{r.jugend ?? "—"}</td>
                  <td className="px-3 py-3 text-ink">{r.erwachsene ?? "—"}</td>
                  <td className="px-6 py-3 text-muted">
                    {r.type === "wettkampf" && (
                      <span className="mr-2 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                        Wettkampf
                      </span>
                    )}
                    {r.type === "ferien" && (
                      <span className="mr-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                        Ferien
                      </span>
                    )}
                    {r.note}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
      <LegendDot color="bg-amber-300" label="Ferien / Spezialtraining" />
      <LegendDot color="bg-emerald-400" label="Wettkampf" />
      <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-ink">
        tbd = Trainer noch offen
      </span>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function HolidayCard({
  title,
  dates,
  note,
}: {
  title: string;
  dates: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-8 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
        Ferien
      </p>
      <h3 className="mt-2 text-2xl font-black text-ink">{title}</h3>
      <p className="mt-2 font-semibold text-ink">{dates}</p>
      <p className="mt-3 text-sm text-muted">{note}</p>
    </div>
  );
}
