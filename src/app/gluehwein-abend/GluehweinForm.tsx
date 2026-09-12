"use client";

import { useActionState } from "react";
import { submitGluehweinAnmeldung, type FormState } from "./actions";
import { MITBRINGSEL, type MitbringselKey, type Stats } from "./data";

const initialState: FormState = {};

type Props = {
  /** Serverseitig geladene Zähler beim ersten Rendern. */
  stats: Stats;
};

export function GluehweinForm({ stats }: Props) {
  const [state, action, pending] = useActionState(submitGluehweinAnmeldung, initialState);

  const liveStats = state.stats ?? stats;

  if (state.success) {
    return <Danke stats={liveStats} chosen={state.chosen ?? []} />;
  }

  return (
    <form
      action={action}
      className="rounded-3xl bg-white p-6 shadow-2xl shadow-[#1b0f2e]/30 ring-1 ring-amber-200/70 sm:p-8"
    >
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
        Anmeldung
      </span>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
        Ich bin dabei!
      </h2>
      <p className="mt-2 text-sm text-muted">
        Trag dich kurz ein, damit wir wissen, wie viele Tassen wir bereitstellen.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Vorname *" name="vorname" autoComplete="given-name" />
        <Field label="Name *" name="nachname" autoComplete="family-name" />
        <div className="sm:col-span-2">
          <label
            htmlFor="personen"
            className="text-xs font-bold uppercase tracking-wider text-ink"
          >
            Anzahl Personen *
          </label>
          <input
            id="personen"
            name="personen"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            step={1}
            defaultValue={1}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
          <p className="mt-1.5 text-xs text-muted">Dich selbst mitgezählt – Kinder ebenfalls.</p>
        </div>
      </div>

      <fieldset className="mt-8">
        <legend className="text-xs font-bold uppercase tracking-wider text-ink">
          Ich bringe mit
        </legend>
        <p className="mt-1 text-xs text-muted">
          Freiwillig. Damit es nicht nur Guetzli gibt, siehst du, was schon abgedeckt ist.
        </p>
        <div className="mt-4 space-y-3">
          {MITBRINGSEL.map((option) => (
            <OptionCard
              key={option.key}
              option={option}
              count={liveStats.mitbringsel[option.key]}
            />
          ))}
        </div>
      </fieldset>

      {state.error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Wird eingetragen…" : "Zusagen & eintragen"}
        {!pending && <Sparkle />}
      </button>
    </form>
  );
}

function OptionCard({
  option,
  count,
}: {
  option: (typeof MITBRINGSEL)[number];
  count: number;
}) {
  return (
    <label
      htmlFor={option.key}
      className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-brand-400 hover:bg-brand-50/60 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:ring-2 has-[:checked]:ring-brand-500/20"
    >
      <input
        id={option.key}
        name={option.key}
        type="checkbox"
        className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-brand-600"
      />
      <span className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-sm font-bold text-ink">{option.label}</span>
          <span className="text-xs text-muted">{option.hint}</span>
        </span>
        <CountBadge count={count} />
      </span>
    </label>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count === 0) {
    return (
      <span className="shrink-0 self-start rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-muted ring-1 ring-slate-200">
        Noch niemand
      </span>
    );
  }
  return (
    <span
      className="shrink-0 self-start rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800 ring-1 ring-emerald-200"
      title={`${count} ${count === 1 ? "Person bringt" : "Personen bringen"} das bereits mit`}
    >
      {count}× dabei
    </span>
  );
}

function Danke({ stats, chosen }: { stats: Stats; chosen: MitbringselKey[] }) {
  const chosenLabels = MITBRINGSEL.filter((o) => chosen.includes(o.key));

  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-2xl shadow-[#1b0f2e]/30 ring-1 ring-amber-200/70 sm:p-10">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <svg
          viewBox="0 0 24 24"
          width={32}
          height={32}
          fill="none"
          stroke="#059669"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <h3 className="mt-5 text-2xl font-black text-ink">Du bist eingetragen!</h3>
      <p className="mx-auto mt-3 max-w-sm text-muted">
        Danke! Wir freuen uns auf einen gemütlichen Abend mit dir.
        {chosenLabels.length > 0 && " Und danke fürs Mitbringen:"}
      </p>
      {chosenLabels.length > 0 && (
        <ul className="mx-auto mt-3 flex max-w-md flex-wrap justify-center gap-2">
          {chosenLabels.map((o) => (
            <li
              key={o.key}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100"
            >
              {o.label.replace(/^Ich nehme /, "").replace(/ mit$/, "")}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 grid gap-3 rounded-2xl bg-slate-50 p-4 text-left ring-1 ring-slate-200 sm:grid-cols-3">
        <StatTile label="Anmeldungen" value={stats.anmeldungen} />
        <StatTile label="Personen total" value={stats.personen} />
        <StatTile
          label="Mitbringsel"
          value={
            stats.mitbringsel.gluehwein +
            stats.mitbringsel.knabbereien +
            stats.mitbringsel.alkoholfrei
          }
        />
      </div>
      <p className="mt-4 text-xs text-muted">
        Aktueller Stand inklusive deiner Anmeldung.
      </p>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-ink">{value}</p>
    </div>
  );
}

function Field({
  label,
  name,
  autoComplete,
}: {
  label: string;
  name: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-wider text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        autoComplete={autoComplete}
        maxLength={80}
        required
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}

function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zm7 11l.9 2.6 2.6.9-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13zM5 14l.7 2 2 .7-2 .7L5 19.4l-.7-2-2-.7 2-.7L5 14z" />
    </svg>
  );
}
