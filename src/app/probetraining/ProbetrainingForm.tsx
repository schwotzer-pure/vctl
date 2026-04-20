"use client";

import { useActionState } from "react";
import { submitProbetraining, type FormState } from "./actions";

const initialState: FormState = {};

export function ProbetrainingForm() {
  const [state, action, pending] = useActionState(submitProbetraining, initialState);

  if (state.success) {
    return (
      <div className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 shadow-sm flex flex-col items-center text-center py-16">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="#fb923c" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-5 text-2xl font-black text-ink">Anmeldung erhalten!</h3>
        <p className="mt-3 max-w-sm text-muted">
          Danke! Wir melden uns innert wenigen Tagen mit allen Infos fürs Probetraining.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 shadow-sm">
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
        <Field label="Vorname *" name="firstName" />
        <Field label="Nachname *" name="lastName" />
        <Field label="E-Mail *" name="email" type="email" />
        <Field label="Telefon" name="phone" type="tel" />
        <Field label="Alter" name="age" type="number" className="sm:col-span-1" />
        <div className="sm:col-span-1">
          <label className="text-xs font-bold uppercase tracking-wider text-ink">
            Gruppe
          </label>
          <select
            name="group"
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="" disabled>Bitte wählen…</option>
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
            placeholder="Erfahrungslevel, Fragen, etc."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {state.error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Wird gesendet…" : "Anmeldung senden"}
      </button>
    </form>
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
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-wider text-ink">
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
