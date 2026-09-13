import { getPool, isPostgresConfigured } from "@/lib/db/postgres";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

// Speicher-Backend für die Glühwein-Anmeldung.
// Reihenfolge: DATABASE_URL (Neon/Postgres) vor Supabase. Ist nichts gesetzt,
// bleibt die Seite nutzbar, speichert aber nichts.

export type AnmeldungRow = {
  anzahl_personen: number;
  bringt_gluehwein: boolean;
  bringt_knabbereien: boolean;
  bringt_alkoholfrei: boolean;
};

export type NeueAnmeldung = AnmeldungRow & {
  vorname: string;
  nachname: string;
};

export type Backend = "postgres" | "supabase" | null;

const SELECT_COLUMNS =
  "anzahl_personen, bringt_gluehwein, bringt_knabbereien, bringt_alkoholfrei";

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function storageBackend(): Backend {
  if (isPostgresConfigured()) return "postgres";
  if (isSupabaseConfigured()) return "supabase";
  return null;
}

export async function fetchAnmeldungRows(): Promise<AnmeldungRow[]> {
  const backend = storageBackend();

  if (backend === "postgres") {
    const { rows } = await getPool().query<AnmeldungRow>(
      `select ${SELECT_COLUMNS} from gluehwein_anmeldungen`,
    );
    return rows;
  }

  if (backend === "supabase") {
    const { data, error } = await createServiceRoleClient()
      .from("gluehwein_anmeldungen")
      .select(SELECT_COLUMNS);
    if (error) throw error;
    return (data ?? []) as AnmeldungRow[];
  }

  throw new Error("Kein Speicher-Backend konfiguriert (DATABASE_URL oder Supabase).");
}

export async function insertAnmeldung(row: NeueAnmeldung): Promise<void> {
  const backend = storageBackend();

  if (backend === "postgres") {
    await getPool().query(
      `insert into gluehwein_anmeldungen
         (vorname, nachname, anzahl_personen, bringt_gluehwein, bringt_knabbereien, bringt_alkoholfrei)
       values ($1, $2, $3, $4, $5, $6)`,
      [
        row.vorname,
        row.nachname,
        row.anzahl_personen,
        row.bringt_gluehwein,
        row.bringt_knabbereien,
        row.bringt_alkoholfrei,
      ],
    );
    return;
  }

  if (backend === "supabase") {
    const { error } = await createServiceRoleClient()
      .from("gluehwein_anmeldungen")
      .insert(row);
    if (error) throw error;
    return;
  }

  throw new Error("Kein Speicher-Backend konfiguriert (DATABASE_URL oder Supabase).");
}
