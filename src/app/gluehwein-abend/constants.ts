// Client-sichere Konstanten und Typen. Hier keinen Server-Code importieren.

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
