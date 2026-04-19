import { requireAdmin } from "@/lib/auth/current-user";

export default async function AdminDashboardPage() {
  const user = await requireAdmin();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-ink">
          Willkommen, {user.display_name ?? user.email}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Admin-Bereich des Velo- & Trial Club Luzern.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard kicker="Mitglieder" value="—" hint="Noch keine Daten" />
        <StatCard kicker="Termine" value="—" hint="Noch keine Daten" />
        <StatCard
          kicker="Offene Probetrainings"
          value="—"
          hint="Noch keine Daten"
        />
      </div>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h2 className="text-lg font-bold text-ink">Nächste Schritte</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Mitgliederverwaltung implementieren</li>
          <li>Terminkalender (Training · Wettkampf · Vereinstermin)</li>
          <li>Beitragsstatus nach Jahr</li>
          <li>Newsletter-Versand (Resend)</li>
          <li>Probetrainings-Eingang und Freigabe</li>
        </ul>
      </section>
    </div>
  );
}

function StatCard({
  kicker,
  value,
  hint,
}: {
  kicker: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
        {kicker}
      </p>
      <p className="mt-2 text-3xl font-black tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}
