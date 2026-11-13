// Nur serverseitig verwenden (zieht den Datenbank-Treiber mit).
import { fetchAnmeldungRows, storageBackend } from "./storage";
import { EMPTY_STATS, emptyMitbringselCounts, isMitbringselKey, type Stats } from "./constants";

export function isStorageConfigured(): boolean {
  return storageBackend() !== null;
}

/**
 * Liest die anonymen Zähler (nur Anzahlen, keine Namen). Läuft ausschliesslich
 * serverseitig, egal ob Neon/Postgres oder Supabase dahintersteht.
 */
export async function loadStats(): Promise<Stats> {
  if (!isStorageConfigured()) {
    console.warn("Glühwein: kein Speicher-Backend konfiguriert, Zähler bleiben leer.");
    return EMPTY_STATS;
  }

  let data;
  try {
    data = await fetchAnmeldungRows();
  } catch (error) {
    console.error("Glühwein: Zähler konnten nicht geladen werden:", error);
    return EMPTY_STATS;
  }

  const stats: Stats = {
    anmeldungen: data.length,
    personen: 0,
    mitbringsel: emptyMitbringselCounts(),
  };

  for (const row of data) {
    stats.personen += row.anzahl_personen ?? 0;
    for (const key of new Set(row.mitbringsel ?? [])) {
      if (isMitbringselKey(key)) stats.mitbringsel[key] += 1;
    }
  }

  return stats;
}
