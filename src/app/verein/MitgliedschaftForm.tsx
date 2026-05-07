"use client";

import { useActionState, useState } from "react";
import { submitMitgliedschaft, type FormState } from "./actions";

const initialState: FormState = {};

const JUNIOR_PDF_URL =
  "https://app.clubdesk.com/clubdesk/m_30880/fileservlet?id=1000108&s=djEtmj3QiEbvXdJmcIGHityfTWk-HepMwWVulzUqu4qEZ-4=";

const STATUTEN_URL =
  "https://app.clubdesk.com/clubdesk/m_30880/fileservlet?id=1000198&s=djEtH5HdwgkJSvYl7sSE5BPgheuusr6muQZ6sv5NIJlGNw4=";

type Category = {
  key: "FUN" | "AKTIV" | "JUNIOR" | "GÖNNER";
  price: string;
  short: string;
};

const categories: Category[] = [
  { key: "FUN", price: "CHF 100", short: "Erwachsene ohne Trainingsabo" },
  { key: "AKTIV", price: "CHF 400", short: "Erwachsene mit Trainingsabo" },
  { key: "JUNIOR", price: "CHF 250", short: "Unter 20, Training inklusive" },
  { key: "GÖNNER", price: "CHF 100", short: "Unterstützungsmitgliedschaft" },
];

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.2em] text-brand-600 ${className}`}>
      {children}
    </p>
  );
}

function Checkbox({
  name,
  required = false,
  children,
}: {
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
      <input
        type="checkbox"
        name={name}
        required={required}
        value="1"
        className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-brand-600 accent-brand-600 focus:ring-2 focus:ring-brand-500/30"
      />
      <span>{children}</span>
    </label>
  );
}

export function MitgliedschaftForm() {
  const [state, action, pending] = useActionState(submitMitgliedschaft, initialState);
  const [selected, setSelected] = useState<Category["key"] | null>(null);

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
          Danke! Wir melden uns innert wenigen Tagen mit den nächsten Schritten und der Rechnung.
        </p>
      </div>
    );
  }

  const isJunior = selected === "JUNIOR";

  return (
    <form action={action} className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
        Anmeldung
      </span>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
        Werde Mitglied beim VCTL
      </h2>
      <p className="mt-2 text-sm text-muted">
        Wähle deine Kategorie und schick uns deine Daten – wir melden uns mit Rechnung und allen weiteren Infos.
      </p>

      {/* Category selector */}
      <fieldset className="mt-6">
        <legend className="text-xs font-bold uppercase tracking-wider text-ink">
          Kategorie *
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {categories.map((c) => {
            const active = selected === c.key;
            return (
              <label
                key={c.key}
                className={`relative cursor-pointer rounded-2xl border-2 p-4 transition ${
                  active
                    ? "border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/20"
                    : "border-slate-200 bg-white hover:border-brand-300"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={c.key}
                  checked={active}
                  onChange={() => setSelected(c.key)}
                  className="sr-only"
                  required
                />
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                    active ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"
                  }`}>
                    {c.key}
                  </span>
                  <span className="text-sm font-black text-ink">{c.price}</span>
                </div>
                <p className="mt-2 text-xs leading-snug text-muted">{c.short}</p>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Junior: PDF download instead of online form */}
      {isJunior && (
        <div className="mt-6 rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
          <p className="text-sm font-bold text-ink">
            Anmeldung Jugendmitglieder via PDF
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Für Mitglieder unter 20 Jahren benötigen wir die unterzeichnete Anmeldung
            der Eltern bzw. Erziehungsberechtigten. Bitte lade das PDF herunter, fülle
            es aus und sende es per Mail an{" "}
            <a href="mailto:mitglieder@vctl.ch" className="font-semibold text-brand-700 hover:underline">
              mitglieder@vctl.ch
            </a>.
          </p>
          <a
            href={JUNIOR_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            PDF herunterladen
          </a>
        </div>
      )}

      {/* Online form fields (hidden for JUNIOR) */}
      {!isJunior && (
        <>
          <SectionTitle className="mt-8">Persönliche Daten</SectionTitle>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Vorname *" name="firstName" required />
            <Field label="Nachname *" name="lastName" required />
            <Field label="E-Mail *" name="email" type="email" required />
            <Field label="Mobile *" name="phone" type="tel" required />
            <Field label="Geburtsdatum *" name="birthdate" type="date" required />
          </div>

          <SectionTitle className="mt-8">Adresse</SectionTitle>
          <div className="mt-3 grid gap-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <Field label="Strasse & Nr. *" name="street" required />
            </div>
            <div className="sm:col-span-2">
              <Field label="PLZ *" name="zip" required />
            </div>
            <div className="sm:col-span-4">
              <Field label="Ort *" name="city" required />
            </div>
          </div>

          <SectionTitle className="mt-8">Notfallkontakt</SectionTitle>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Vorname *" name="emergencyFirstName" required />
            <Field label="Nachname *" name="emergencyLastName" required />
            <div className="sm:col-span-2">
              <Field label="Mobile *" name="emergencyPhone" type="tel" required />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-xs font-bold uppercase tracking-wider text-ink">
              Nachricht (optional)
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Bemerkungen, Fragen, etc."
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="mt-8 space-y-3">
            <Checkbox name="acceptStatutes" required>
              Ich habe die <a href={STATUTEN_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:underline">Statuten</a> gelesen.
            </Checkbox>
            <Checkbox name="acceptInsurance" required>
              Ich weiss nun, dass Versicherung Sache des Teilnehmers ist.
            </Checkbox>
          </div>

          {state.error && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-200">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || !selected}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Wird gesendet…" : "Anmeldung senden"}
          </button>
        </>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-wider text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}

