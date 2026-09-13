import { createServiceRoleClient } from "@/lib/supabase/service-role";

export const MITBRINGSEL = [
  {
    key: "gluehwein",
    column: "bringt_gluehwein",
    label: "Ich nehme Glühwein mit",
    hint: "Rot oder weiss, gerne selbst gewürzt.",
  },
  {
    key: "knabbereien",
    column: "bringt_knabbereien",
    label: "Ich nehme etwas zu knabbern mit",
    hint: "Guetzli, Nüsse, Chips, Lebkuchen, alles willkommen.",
  },
  {
    key: "alkoholfrei",
    column: "bringt_alkoholfrei",
    label: "Ich nehme ein alkoholfreies Getränk mit",
    hint: "Punsch, Tee oder Süssmost für Kinder und Fahrende.",
  },
] as const;

export type MitbringselKey = (typeof MITBRINGSEL)[number]["key"];

export type Stats = {
  /** Anzahl abgegebener Anmeldungen */
  anmeldungen: number;
  /** Summe der angemeldeten Personen */
  personen: number;
  /** Wie viele Anmeldungen das jeweilige Mitbringsel gewählt haben */
  mitbringsel: Record<MitbringselKey, number>;
};

export const EMPTY_STATS: Stats = {
  anmeldungen: 0,
  personen: 0,
  mitbringsel: { gluehwein: 0, knabbereien: 0, alkoholfrei: 0 },
};

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

/**
 * Liest die anonymen Zähler (nur Anzahlen, keine Namen). Läuft ausschliesslich
 * serverseitig mit dem Service-Role-Key.
 */
export async function loadStats(): Promise<Stats> {
  if (!isSupabaseConfigured()) {
    console.warn("Glühwein: Supabase ist nicht konfiguriert, Zähler bleiben leer.");
    return EMPTY_STATS;
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("gluehwein_anmeldungen")
    .select("anzahl_personen, bringt_gluehwein, bringt_knabbereien, bringt_alkoholfrei");

  if (error || !data) {
    console.error("Glühwein: Zähler konnten nicht geladen werden:", error);
    return EMPTY_STATS;
  }

  const stats: Stats = {
    anmeldungen: data.length,
    personen: 0,
    mitbringsel: { gluehwein: 0, knabbereien: 0, alkoholfrei: 0 },
  };

  for (const row of data) {
    stats.personen += row.anzahl_personen ?? 0;
    for (const option of MITBRINGSEL) {
      if (row[option.column]) stats.mitbringsel[option.key] += 1;
    }
  }

  return stats;
}
