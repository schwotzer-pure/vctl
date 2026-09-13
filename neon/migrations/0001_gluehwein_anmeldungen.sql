-- Glühwein-Abend: öffentliche Anmeldung (Vorname, Name, Anzahl Personen + Mitbringsel)
-- Neon-/Postgres-Variante ohne Supabase-RLS: Zugriff läuft ausschliesslich serverseitig
-- über DATABASE_URL, der Browser sieht nur die anonymen Zähler.

create table if not exists gluehwein_anmeldungen (
  id uuid primary key default gen_random_uuid(),
  vorname text not null,
  nachname text not null,
  anzahl_personen integer not null check (anzahl_personen between 1 and 20),
  bringt_gluehwein boolean not null default false,
  bringt_knabbereien boolean not null default false,
  bringt_alkoholfrei boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists gluehwein_anmeldungen_created_at_idx
  on gluehwein_anmeldungen (created_at);
