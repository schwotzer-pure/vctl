-- Glühwein-Abend: Anzahl Kinder pro Anmeldung (in anzahl_personen enthalten).
-- Erwachsene = anzahl_personen - anzahl_kinder.

alter table gluehwein_anmeldungen
  add column if not exists anzahl_kinder integer not null default 0;

alter table gluehwein_anmeldungen
  drop constraint if exists gluehwein_anmeldungen_kinder_check;

alter table gluehwein_anmeldungen
  add constraint gluehwein_anmeldungen_kinder_check
  check (anzahl_kinder >= 0 and anzahl_kinder <= anzahl_personen);
