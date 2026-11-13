// Client-sichere Konstanten und Typen. Hier keinen Server-Code importieren.

export const MITBRINGSEL = [
  { key: "lebkuchen", label: "Lebkuchen", hint: "Selbstgemacht oder gekauft, beides passt." },
  { key: "kuchen", label: "Kuchen", hint: "Für den süssen Teil des Abends." },
  { key: "knabbereien", label: "Knabbereien", hint: "Nüsse, Chips, Salzstangen." },
  { key: "gluehwein", label: "Glühwein", hint: "Rot oder weiss, gerne selbst gewürzt." },
  { key: "punsch", label: "Punsch", hint: "Warm und ohne Alkohol, für Kinder und Fahrende." },
  { key: "wasser", label: "Wasser / Süssgetränk", hint: "Mineral, Süssmost oder Cola." },
] as const;

export type MitbringselKey = (typeof MITBRINGSEL)[number]["key"];

export const MITBRINGSEL_KEYS: readonly MitbringselKey[] = MITBRINGSEL.map((o) => o.key);

export function isMitbringselKey(value: unknown): value is MitbringselKey {
  return typeof value === "string" && (MITBRINGSEL_KEYS as readonly string[]).includes(value);
}

export type Stats = {
  /** Anzahl abgegebener Anmeldungen */
  anmeldungen: number;
  /** Summe der angemeldeten Personen */
  personen: number;
  /** Wie viele Anmeldungen das jeweilige Mitbringsel gewählt haben */
  mitbringsel: Record<MitbringselKey, number>;
};

export function emptyMitbringselCounts(): Record<MitbringselKey, number> {
  return Object.fromEntries(MITBRINGSEL_KEYS.map((k) => [k, 0])) as Record<
    MitbringselKey,
    number
  >;
}

export const EMPTY_STATS: Stats = {
  anmeldungen: 0,
  personen: 0,
  mitbringsel: emptyMitbringselCounts(),
};
