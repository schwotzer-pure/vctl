import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO – Duotone (Orange × Tiefschwarz) via CSS Blend-Modi */}
      <section className="relative overflow-hidden text-white bg-[#0a0806]">
        {/* Duotone-Stack: eigener Stacking-Context, damit Blend-Modi nur hier wirken */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate"
          style={{ backgroundColor: "#0a0806" }}
        >
          {/* Layer A: Video in Graustufen, blendet als "screen" auf den dunklen Sockel */}
          <video
            src="/swiss-cup.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              filter: "grayscale(100%) contrast(1.2)",
              mixBlendMode: "screen",
            }}
          />
          {/* Layer B: Orange-Fläche, blendet als "multiply" — färbt die Lichter orange,
                      Schatten bleiben schwarz. Ergebnis = echtes Duotone. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#fb923c",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        {/* Vignette links für Textlesbarkeit */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,8,6,0.7) 0%, rgba(10,8,6,0.3) 45%, rgba(10,8,6,0) 75%)",
          }}
        />

        {/* Dezenter Orange-Glow unten rechts als Akzent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(40% 50% at 95% 95%, rgba(249,115,22,0.35), transparent 70%)",
          }}
        />

        {/* Weicher Übergang zum nächsten Bereich */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-px left-0 right-0 h-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #ffffff 100%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-40 lg:px-10 lg:pt-44 lg:pb-52">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white ring-1 ring-white/30 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Saison 2026 läuft
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Balance. Kontrolle.
              <br />
              <span className="text-white/90">Velotrial in Luzern.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Wir trainieren jeden Mittwoch am Trialplatz Luzern – für
              Junioren, Jugend und Erwachsene. Vom ersten Balance-Trick bis
              zum Swiss-Cup.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/probetraining#anmeldung"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-600 shadow-lg shadow-black/10 transition hover:bg-brand-50"
              >
                Probetraining buchen
                <ArrowRight />
              </Link>
              <Link
                href="/training"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/40 transition hover:bg-white/10 hover:text-white"
              >
                Trainingszeiten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK-FACTS */}
      <section className="relative -mt-24 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-4 rounded-3xl bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 sm:grid-cols-3">
            <QuickFact
              kicker="Jeden Mittwoch"
              title="Trialplatz Luzern"
              desc="Festes Training Woche für Woche."
            />
            <QuickFact
              kicker="3 Gruppen"
              title="Junioren · Jugend · Erwachsene"
              desc="Von 16:15 bis 20:15 Uhr."
            />
            <QuickFact
              kicker="Swiss-Cup 2026"
              title="6 Wettkämpfe"
              desc="April bis September – schweizweit."
            />
          </div>
        </div>
      </section>

      {/* Der Club */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
              Der Club
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Velotrial für alle, die{" "}
              <span className="text-gradient-brand">Balance lieben</span>.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Der Velo- & Trial Club Luzern (VCTL) fördert Velotrial vom
              Einstieg bis zur Wettkampfebene. Wir setzen auf geregelte
              Trainings, eine starke Nachwuchsförderung und ein aktives
              Vereinsleben.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/training"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
              >
                Trainingsplan
              </Link>
              <Link
                href="/swiss-cup"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink ring-1 ring-slate-300 transition hover:bg-slate-100"
              >
                Swiss-Cup Termine
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
            <FeatureCard
              title="Geregelte Trainings"
              desc="Strukturierte Einheiten mit Debi (Haupttrainer) und René (Co-Trainer)."
              accent="01"
            />
            <FeatureCard
              title="Nachwuchsförderung"
              desc="Wir bringen unsere Kids aktiv an den Swiss-Cup – inkl. Fahr- & Betreuungsservice."
              accent="02"
            />
            <FeatureCard
              title="Aktives Vereinsleben"
              desc="Grill & Chill im Sommer, gemeinsame Events und eine Kaffee/Bier-Ecke am Platz."
              accent="03"
            />
            <FeatureCard
              title="Offen für alle Levels"
              desc="Vom ersten Probetraining bis zum Advanced-Rider – jede*r findet die passende Gruppe."
              accent="04"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-hero-gradient px-8 py-14 text-white sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(50% 70% at 100% 0%, rgba(255,255,255,0.3), transparent 60%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-black tracking-tight sm:text-4xl">
                Reinschnuppern? Beim Probetraining findest du raus, ob
                Velotrial dein Ding ist.
              </h3>
            </div>
            <div className="lg:justify-self-end">
              <Link
                href="/probetraining#anmeldung"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-600 shadow-lg shadow-black/10 transition hover:bg-brand-50"
              >
                Zum Probetraining <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function QuickFact({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
        {kicker}
      </p>
      <p className="mt-2 text-lg font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{desc}</p>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  accent,
}: {
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:ring-brand-500 hover:shadow-lg hover:shadow-brand-500/10">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-ink">{title}</h3>
        <span className="font-mono text-sm font-bold text-brand-500">
          {accent}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
