-- Mitbringsel als Liste statt fester Spalten, damit Optionen ohne Migration änderbar sind.
-- Bestehende Häkchen werden übernommen: Glühwein, Knabbereien, alkoholfrei → Wasser/Süssgetränk.

alter table gluehwein_anmeldungen
  add column if not exists mitbringsel text[] not null default '{}';

update gluehwein_anmeldungen
set mitbringsel = array_remove(array[
  case when bringt_gluehwein then 'gluehwein' end,
  case when bringt_knabbereien then 'knabbereien' end,
  case when bringt_alkoholfrei then 'wasser' end
], null)
where mitbringsel = '{}';

alter table gluehwein_anmeldungen
  drop column if exists bringt_gluehwein,
  drop column if exists bringt_knabbereien,
  drop column if exists bringt_alkoholfrei;
