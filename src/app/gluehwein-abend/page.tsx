import { GluehweinForm } from "./GluehweinForm";
import { loadStats } from "./data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Glühwein-Abend",
  description:
    "Melde dich für den VTCL Glühwein-Abend an. Gemütlich, warm und mit der ganzen Trial-Familie.",
  robots: { index: false, follow: false },
};

// Eckdaten des Abends. Hier anpassen, sobald Datum und Ort fix sind.
const EVENT = {
  datum: "Mittwoch, 2. Dezember 2026",
  zeit: "ab 18:00 Uhr",
  ort: "Trialplatz Luzern",
  hinweis: "Warm anziehen, wir sind draussen am Feuer.",
};

export default async function GluehweinAbendPage() {
  const stats = await loadStats();

  return (
    <>
      <section className="relative overflow-hidden bg-[#140b22] text-white">
        {/* Nachthimmel: tiefes Violett → Bordeaux, unten warmer Feuerschein */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-night-sky" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-ember-glow" />
        <Sterne />
        <Schnee />

        {/* Weicher Übergang in die Formular-Fläche */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-px left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #2a1236 100%)" }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-32 pb-36 lg:grid-cols-[1.2fr_1fr] lg:px-10 lg:pt-40 lg:pb-48">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ring-amber-200/40 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.8)]" />
              VTCL · Vereinsabend
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Glühwein-Abend
              <br />
              <span className="text-gradient-gold">am Feuer.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Ein gemütlicher Abend für die ganze Trial-Familie: heisser Glühwein,
              Kinderpunsch, etwas zu knabbern und viel Zeit zum Plaudern. Bring mit,
              wen du magst, und sag uns kurz, ob du dabei bist.
            </p>

            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              <InfoTile icon={<KalenderIcon />} label="Wann" value={EVENT.datum} />
              <InfoTile icon={<UhrIcon />} label="Zeit" value={EVENT.zeit} />
              <InfoTile icon={<PinIcon />} label="Wo" value={EVENT.ort} />
            </dl>
            <p className="mt-4 text-sm text-amber-100/80">{EVENT.hinweis}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#anmeldung"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#2a1236] shadow-lg shadow-amber-500/30 transition hover:bg-amber-200"
              >
                Jetzt anmelden
              </a>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/25">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)]" />
                {stats.personen === 0
                  ? "Noch keine Zusagen. Sei die erste!"
                  : `Bereits ${stats.personen} ${stats.personen === 1 ? "Person" : "Personen"} dabei`}
              </span>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-sm lg:block">
            <Tasse />
          </div>
        </div>
      </section>

      <section
        id="anmeldung"
        className="relative -mb-24 bg-[#2a1236] pb-28 pt-2 scroll-mt-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-ember-glow opacity-70" />
        <div className="relative mx-auto max-w-2xl px-6 lg:px-10">
          <GluehweinForm stats={stats} />
          <p className="mt-6 text-center text-xs text-white/60">
            Wir speichern nur Name und Personenzahl für die Planung. Die Zähler bei den
            Mitbringseln sind anonym. Niemand sieht, wer was mitnimmt.
          </p>
        </div>
      </section>
    </>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-300/20 text-amber-200">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-200/80">
          {label}
        </dt>
        <dd className="truncate text-sm font-bold text-white">{value}</dd>
      </div>
    </div>
  );
}

/** Deterministische Schneeflocken ohne Math.random, damit Server und Client übereinstimmen. */
function Schnee() {
  const flakes = Array.from({ length: 36 }, (_, i) => {
    const left = (i * 37 + 11) % 100;
    const size = 2 + ((i * 7) % 5);
    const duration = 9 + ((i * 13) % 10);
    const delay = -((i * 5) % 12);
    const drift = ((i % 3) - 1) * 40;
    const opacity = 0.35 + ((i * 3) % 6) / 10;
    return { left, size, duration, delay, drift, opacity };
  });

  return (
    <div aria-hidden className="snowfall">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ["--drift" as string]: `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function Sterne() {
  const stars = Array.from({ length: 28 }, (_, i) => ({
    left: (i * 53 + 7) % 100,
    top: (i * 29 + 3) % 60,
    size: 1 + (i % 3),
    delay: (i * 0.7) % 4,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Dampfende Glühwein-Tasse als Illustration. */
function Tasse() {
  return (
    <svg
      viewBox="0 0 320 340"
      className="h-auto w-full drop-shadow-[0_30px_50px_rgba(251,146,60,0.35)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="mug" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="wine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b91c1c" />
          <stop offset="1" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="steam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Dampf */}
      <g className="steam" fill="none" stroke="url(#steam)" strokeWidth="10" strokeLinecap="round">
        <path className="steam-1" d="M120 120c-20-25 20-45 0-70" />
        <path className="steam-2" d="M160 110c-20-25 20-45 0-70" />
        <path className="steam-3" d="M200 120c-20-25 20-45 0-70" />
      </g>

      {/* Henkel */}
      <path
        d="M236 170c40 0 60 20 60 50s-20 50-60 50"
        fill="none"
        stroke="url(#mug)"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M236 170c40 0 60 20 60 50s-20 50-60 50"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.25"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Tasse */}
      <path
        d="M80 140h160c8 0 14 6 13 14l-10 130c-1 12-10 20-22 20H99c-12 0-21-8-22-20L67 154c-1-8 5-14 13-14z"
        fill="url(#mug)"
      />
      <ellipse cx="160" cy="140" rx="80" ry="16" fill="#fef3c7" />
      <ellipse cx="160" cy="140" rx="68" ry="11" fill="url(#wine)" />
      {/* Orangenscheibe */}
      <circle cx="190" cy="138" r="9" fill="#fb923c" />
      <circle cx="190" cy="138" r="6" fill="#fdba74" />
      {/* Zimtstange */}
      <rect x="126" y="118" width="6" height="40" rx="3" fill="#92400e" transform="rotate(-20 129 138)" />
      {/* Sternanis */}
      <path
        d="M150 132l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z"
        fill="#78350f"
        opacity="0.9"
      />

      {/* Dekor: Schneeflocken auf der Tasse */}
      <g stroke="#fff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round">
        <path d="M120 210v30M105 225h30M110 214l20 22M130 214l-20 22" />
        <path d="M195 240v22M184 251h22M188 243l14 16M202 243l-14 16" />
      </g>
    </svg>
  );
}

function KalenderIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  );
}

function UhrIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
