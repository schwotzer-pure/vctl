-- Glühwein-Abend: öffentliche Anmeldung (Vorname, Name, Anzahl Personen + Mitbringsel)
-- INSERT läuft via Server Action (Service-Role-Key), Zähler werden ebenfalls serverseitig
-- aggregiert — es gibt bewusst keine public Policy, damit Namen nie im Browser landen.

create table gluehwein_anmeldungen (
  id uuid primary key default gen_random_uuid(),
  vorname text not null,
  nachname text not null,
  anzahl_personen integer not null check (anzahl_personen between 1 and 20),
  bringt_gluehwein boolean not null default false,
  bringt_knabbereien boolean not null default false,
  bringt_alkoholfrei boolean not null default false,
  created_at timestamptz not null default now()
);

create index gluehwein_anmeldungen_created_at_idx on gluehwein_anmeldungen (created_at);

alter table gluehwein_anmeldungen enable row level security;

create policy gluehwein_anmeldungen_admin_all on gluehwein_anmeldungen
  for all using (current_user_role() = 'admin');
