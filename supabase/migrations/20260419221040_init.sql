-- VCTL Initial Schema (Phase 2.1 Fundament)
-- Siehe Memory: project_vctl_datenmodell.md

-- ============================================================================
-- ENUMS
-- ============================================================================

create type mitgliedschaftstyp as enum ('aktiv', 'passiv', 'ehrenmitglied', 'fun', 'fun_extern', 'sponsor');
create type trainingsgruppe as enum ('junioren', 'jugend', 'erwachsene', 'fun');
create type vereins_funktion as enum ('vorstand', 'trainer_haupt', 'trainer_co', 'kassier');
create type system_rolle as enum ('mitglied', 'trainer', 'admin');
create type termin_typ as enum ('training', 'wettkampf', 'vereinstermin');
create type termin_sichtbarkeit as enum ('public', 'mitglieder', 'vorstand');
create type beitrag_status as enum ('offen', 'bezahlt', 'ausgenommen');
create type probetraining_status as enum ('neu', 'kontaktiert', 'eingeladen', 'angenommen', 'abgesagt');
create type newsletter_kampagne_status as enum ('draft', 'scheduled', 'sending', 'sent', 'failed');
create type newsletter_empfaenger_status as enum ('queued', 'sent', 'failed', 'bounced', 'opened');

-- ============================================================================
-- TABLES
-- ============================================================================

-- profiles: 1:1 mit auth.users
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  rolle system_rolle not null default 'mitglied',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- mitglieder: Vereinsmitglieder (auch ohne Login)
create table mitglieder (
  id uuid primary key default gen_random_uuid(),
  clubdesk_id text unique,
  profile_id uuid unique references profiles(id) on delete set null,
  -- Stammdaten
  anrede text,
  vorname text not null,
  nachname text not null,
  geburtsdatum date,
  geschlecht text,
  nationalitaet text,
  -- Adresse
  strasse text,
  adress_zusatz text,
  plz text,
  ort text,
  land text default 'CH',
  -- Kontakt
  email text,
  email_alt text,
  tel_privat text,
  tel_mobil text,
  tel_geschaeft text,
  -- Verein
  eintritt date,
  austritt date,
  mitgliedschaftstyp mitgliedschaftstyp not null,
  trainingsgruppe trainingsgruppe,
  -- Beziehungen
  gesetzlicher_vertreter_id uuid references mitglieder(id) on delete set null,
  notfallkontakt_1 text,
  notfallkontakt_2 text,
  -- Sonstige
  bemerkungen text,
  bild_url text,
  newsletter_opt_out boolean not null default false,
  newsletter_opt_out_token text unique default encode(gen_random_bytes(24), 'hex'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index mitglieder_nachname_idx on mitglieder (nachname);
create index mitglieder_trainingsgruppe_idx on mitglieder (trainingsgruppe);
create index mitglieder_gesetzlicher_vertreter_idx on mitglieder (gesetzlicher_vertreter_id);

-- mitglied_funktionen: M:N, Funktionen pro Mitglied
create table mitglied_funktionen (
  mitglied_id uuid not null references mitglieder(id) on delete cascade,
  funktion vereins_funktion not null,
  primary key (mitglied_id, funktion)
);

-- beitraege: ein Eintrag pro Mitglied × Jahr
create table beitraege (
  id uuid primary key default gen_random_uuid(),
  mitglied_id uuid not null references mitglieder(id) on delete cascade,
  jahr integer not null,
  betrag_chf numeric(10, 2),
  status beitrag_status not null default 'offen',
  bezahlt_am date,
  bemerkung text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (mitglied_id, jahr)
);

create index beitraege_jahr_idx on beitraege (jahr);
create index beitraege_status_idx on beitraege (status);

-- termine: reiner Schaukalender
create table termine (
  id uuid primary key default gen_random_uuid(),
  typ termin_typ not null,
  titel text not null,
  beschreibung text,
  ort text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  externer_link text,
  cancelled boolean not null default false,
  cancelled_grund text,
  sichtbarkeit termin_sichtbarkeit not null default 'public',
  notizen text,
  serie_id uuid,
  erstellt_von uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index termine_starts_at_idx on termine (starts_at);
create index termine_typ_idx on termine (typ);
create index termine_serie_id_idx on termine (serie_id);

-- termin_zielgruppen: M:N
create table termin_zielgruppen (
  termin_id uuid not null references termine(id) on delete cascade,
  trainingsgruppe trainingsgruppe not null,
  primary key (termin_id, trainingsgruppe)
);

-- probetraining_anmeldungen: öffentliches Formular
create table probetraining_anmeldungen (
  id uuid primary key default gen_random_uuid(),
  vorname text not null,
  nachname text not null,
  geburtsdatum date,
  email text not null,
  tel_mobil text,
  gesetzlicher_vertreter_name text,
  gesetzlicher_vertreter_email text,
  gewuenschte_trainingsgruppe trainingsgruppe,
  erfahrung text,
  nachricht text,
  dsgvo_einwilligung boolean not null,
  status probetraining_status not null default 'neu',
  bearbeitet_von uuid references profiles(id) on delete set null,
  bearbeitet_am timestamptz,
  notizen text,
  converted_to_mitglied_id uuid references mitglieder(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index probetraining_status_idx on probetraining_anmeldungen (status);

-- newsletter_kampagnen
create table newsletter_kampagnen (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  betreff text not null,
  inhalt_md text not null,
  status newsletter_kampagne_status not null default 'draft',
  erstellt_von uuid references profiles(id) on delete set null,
  geplant_fuer timestamptz,
  gesendet_am timestamptz,
  segment_filter jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- newsletter_empfaenger: Audit-Trail pro Versand
create table newsletter_empfaenger (
  id uuid primary key default gen_random_uuid(),
  kampagne_id uuid not null references newsletter_kampagnen(id) on delete cascade,
  mitglied_id uuid references mitglieder(id) on delete set null,
  email text not null,
  gesendet_am timestamptz,
  status newsletter_empfaenger_status not null default 'queued',
  resend_message_id text,
  fehler text,
  created_at timestamptz not null default now()
);

create index newsletter_empfaenger_kampagne_idx on newsletter_empfaenger (kampagne_id);

-- notification_subscriptions: generisches Event-Abo
create table notification_subscriptions (
  profile_id uuid not null references profiles(id) on delete cascade,
  event_typ text not null,
  aktiv boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (profile_id, event_typ)
);

-- notification_log: Audit-Trail
create table notification_log (
  id uuid primary key default gen_random_uuid(),
  event_typ text not null,
  payload jsonb,
  subscriber_id uuid references profiles(id) on delete set null,
  kanal text not null default 'email',
  gesendet_am timestamptz not null default now(),
  status text not null,
  fehler text
);

create index notification_log_event_typ_idx on notification_log (event_typ);

-- ============================================================================
-- TRIGGERS: updated_at auto-refresh
-- ============================================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at_profiles before update on profiles for each row execute function set_updated_at();
create trigger set_updated_at_mitglieder before update on mitglieder for each row execute function set_updated_at();
create trigger set_updated_at_beitraege before update on beitraege for each row execute function set_updated_at();
create trigger set_updated_at_termine before update on termine for each row execute function set_updated_at();
create trigger set_updated_at_probetraining before update on probetraining_anmeldungen for each row execute function set_updated_at();
create trigger set_updated_at_newsletter_kampagnen before update on newsletter_kampagnen for each row execute function set_updated_at();
create trigger set_updated_at_notification_subs before update on notification_subscriptions for each row execute function set_updated_at();

-- ============================================================================
-- TRIGGERS: profile automatisch beim Signup anlegen
-- ============================================================================

create or replace function handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_auth_user();

-- ============================================================================
-- HELPER: aktuelle Rolle (SECURITY DEFINER, um RLS-Rekursion zu vermeiden)
-- ============================================================================

create or replace function current_user_role()
returns system_rolle
language sql
security definer
set search_path = public
stable
as $$
  select rolle from profiles where id = auth.uid();
$$;

create or replace function current_user_mitglied_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select id from mitglieder where profile_id = auth.uid();
$$;

create or replace function current_user_trainingsgruppe()
returns trainingsgruppe
language sql
security definer
set search_path = public
stable
as $$
  select trainingsgruppe from mitglieder where profile_id = auth.uid();
$$;

-- ============================================================================
-- RLS: aktivieren auf allen Tabellen
-- ============================================================================

alter table profiles enable row level security;
alter table mitglieder enable row level security;
alter table mitglied_funktionen enable row level security;
alter table beitraege enable row level security;
alter table termine enable row level security;
alter table termin_zielgruppen enable row level security;
alter table probetraining_anmeldungen enable row level security;
alter table newsletter_kampagnen enable row level security;
alter table newsletter_empfaenger enable row level security;
alter table notification_subscriptions enable row level security;
alter table notification_log enable row level security;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- profiles ---------------------------------------------------------------
create policy profiles_select_own on profiles
  for select using (id = auth.uid() or current_user_role() = 'admin');

create policy profiles_update_own on profiles
  for update using (id = auth.uid())
  with check (id = auth.uid());

create policy profiles_admin_all on profiles
  for all using (current_user_role() = 'admin');

-- mitglieder -------------------------------------------------------------
create policy mitglieder_select_own_or_children on mitglieder
  for select using (
    profile_id = auth.uid()
    or gesetzlicher_vertreter_id = current_user_mitglied_id()
    or (current_user_role() = 'trainer' and trainingsgruppe = current_user_trainingsgruppe())
    or current_user_role() = 'admin'
  );

create policy mitglieder_update_own on mitglieder
  for update using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

create policy mitglieder_admin_write on mitglieder
  for all using (current_user_role() = 'admin');

-- mitglied_funktionen ----------------------------------------------------
create policy mitglied_funktionen_select on mitglied_funktionen
  for select using (
    mitglied_id = current_user_mitglied_id()
    or current_user_role() = 'admin'
  );

create policy mitglied_funktionen_admin_write on mitglied_funktionen
  for all using (current_user_role() = 'admin');

-- beitraege --------------------------------------------------------------
create policy beitraege_select_own on beitraege
  for select using (
    mitglied_id = current_user_mitglied_id()
    or current_user_role() = 'admin'
  );

create policy beitraege_admin_write on beitraege
  for all using (current_user_role() = 'admin');

-- termine ----------------------------------------------------------------
create policy termine_select_visibility on termine
  for select using (
    sichtbarkeit = 'public'
    or (sichtbarkeit = 'mitglieder' and auth.uid() is not null)
    or (sichtbarkeit = 'vorstand' and current_user_role() = 'admin')
  );

create policy termine_admin_write on termine
  for all using (current_user_role() = 'admin');

-- termin_zielgruppen -----------------------------------------------------
create policy termin_zielgruppen_select on termin_zielgruppen
  for select using (
    exists (
      select 1 from termine t where t.id = termin_zielgruppen.termin_id
      and (
        t.sichtbarkeit = 'public'
        or (t.sichtbarkeit = 'mitglieder' and auth.uid() is not null)
        or (t.sichtbarkeit = 'vorstand' and current_user_role() = 'admin')
      )
    )
  );

create policy termin_zielgruppen_admin_write on termin_zielgruppen
  for all using (current_user_role() = 'admin');

-- probetraining_anmeldungen ---------------------------------------------
-- INSERT läuft via Server Action (Service-Role-Key), keine public Policy
create policy probetraining_admin_all on probetraining_anmeldungen
  for all using (current_user_role() = 'admin');

-- newsletter_kampagnen ---------------------------------------------------
create policy newsletter_kampagnen_admin_trainer on newsletter_kampagnen
  for all using (current_user_role() in ('admin', 'trainer'));

-- newsletter_empfaenger --------------------------------------------------
create policy newsletter_empfaenger_admin_trainer on newsletter_empfaenger
  for all using (current_user_role() in ('admin', 'trainer'));

-- notification_subscriptions: jeder pflegt seine eigenen Abos ------------
create policy notification_subs_own on notification_subscriptions
  for all using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

-- notification_log: Admin darf lesen, Service-Role schreibt --------------
create policy notification_log_admin_read on notification_log
  for select using (current_user_role() = 'admin');
