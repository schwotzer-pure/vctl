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

          <details className="group mt-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm open:bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-semibold text-ink select-none">
              <span className="inline-flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-600"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v.01M11 12h1v4h1" />
                </svg>
                Grössentabelle anzeigen
              </span>
              <svg
                viewBox="0 0 24 24"
                width={16}
                height={16}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted transition group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>

            <div className="mt-4 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Kindergrössen
                </h4>
                <div className="mt-2 overflow-hidden rounded-lg ring-1 ring-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-muted">
                      <tr>
                        <th className="px-3 py-2 font-bold uppercase tracking-wider">Grösse</th>
                        <th className="px-3 py-2 font-bold uppercase tracking-wider">Körpergrösse</th>
                        <th className="px-3 py-2 font-bold uppercase tracking-wider">Alter ca.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-ink">
                      <SizeRow size="104" body="99 – 104 cm" age="3 – 4 J." />
                      <SizeRow size="116" body="110 – 116 cm" age="5 – 6 J." />
                      <SizeRow size="128" body="122 – 128 cm" age="7 – 8 J." />
                      <SizeRow size="140" body="134 – 140 cm" age="9 – 10 J." />
                      <SizeRow size="152" body="146 – 152 cm" age="11 – 12 J." />
                      <SizeRow size="164" body="158 – 164 cm" age="13 – 14 J." />
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Erwachsene
                </h4>
                <div className="mt-2 overflow-hidden rounded-lg ring-1 ring-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-muted">
                      <tr>
                        <th className="px-3 py-2 font-bold uppercase tracking-wider">Grösse</th>
                        <th className="px-3 py-2 font-bold uppercase tracking-wider">Körpergrösse</th>
                        <th className="px-3 py-2 font-bold uppercase tracking-wider">Brustumfang</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-ink">
                      <SizeRow size="XS" body="162 – 168 cm" age="84 – 88 cm" />
                      <SizeRow size="S" body="168 – 174 cm" age="89 – 94 cm" />
                      <SizeRow size="M" body="174 – 180 cm" age="95 – 100 cm" />
                      <SizeRow size="L" body="180 – 186 cm" age="101 – 106 cm" />
                      <SizeRow size="XL" body="186 – 192 cm" age="107 – 112 cm" />
                      <SizeRow size="XXL" body="192 – 198 cm" age="113 – 118 cm" />
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-xs text-muted">
                Richtwerte — die effektive Passform kann je nach Hersteller leicht
                abweichen. Im Zweifel die nächstgrössere Grösse wählen.
              </p>
            </div>
          </details>
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

function SizeRow({ size, body, age }: { size: string; body: string; age: string }) {
  return (
    <tr>
      <td className="px-3 py-2 font-bold">{size}</td>
      <td className="px-3 py-2 text-muted">{body}</td>
      <td className="px-3 py-2 text-muted">{age}</td>
    </tr>
  );
}
