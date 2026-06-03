"use client";

import { useActionState } from "react";
import { submitShirtBestellung, type FormState } from "./actions";

const initialState: FormState = {};

const kidsSizes = ["104", "116", "128", "140", "152", "164"];
const adultSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function ShirtForm() {
  const [state, action, pending] = useActionState(submitShirtBestellung, initialState);

  if (state.success) {
    return (
      <div className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 shadow-sm flex flex-col items-center text-center py-16">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <svg
            viewBox="0 0 24 24"
            width={32}
            height={32}
            fill="none"
            stroke="#fb923c"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-5 text-2xl font-black text-ink">Bestellung erfasst!</h3>
        <p className="mt-3 max-w-sm text-muted">
          Danke! Deine Grösse ist auf der Bestellliste. Du hörst von uns, sobald die
          Shirts da sind.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
        Nachbestellung
      </span>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
        Deine Shirtgrösse
      </h2>
      <p className="mt-2 text-sm text-muted">
        Trag dich kurz ein, damit wir wissen, welche Grösse wir für dich bestellen.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Vorname *" name="firstName" />
        <Field label="Nachname *" name="lastName" />
        <div className="sm:col-span-2">
          <label
            htmlFor="size"
            className="text-xs font-bold uppercase tracking-wider text-ink"
          >
            Grösse *
          </label>
          <select
            id="size"
            name="size"
            defaultValue=""
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="" disabled>
              Bitte wählen…
            </option>
            <optgroup label="Kindergrössen">
              {kidsSizes.map((s) => (
                <option key={`kids-${s}`} value={`kids-${s}`}>
                  Kinder {s}
                </option>
              ))}
            </optgroup>
            <optgroup label="Erwachsene">
              {adultSizes.map((s) => (
                <option key={`adult-${s}`} value={`adult-${s}`}>
                  Erwachsene {s}
                </option>
              ))}
            </optgroup>
          </select>
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
        {pending ? "Wird gesendet…" : "Bestellung senden"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
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
        required
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}
