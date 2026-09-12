"use server";

import { revalidatePath } from "next/cache";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import {
  MITBRINGSEL,
  isSupabaseConfigured,
  loadStats,
  type MitbringselKey,
  type Stats,
} from "./data";

export type FormState = {
  success?: boolean;
  error?: string;
  /** Aktuelle Zähler nach dem Eintrag – damit die Danke-Ansicht live ist. */
  stats?: Stats;
  /** Was die Person selbst angekreuzt hat. */
  chosen?: MitbringselKey[];
};

const MAX_PERSONEN = 20;

export async function submitGluehweinAnmeldung(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const vorname = (formData.get("vorname") as string | null)?.trim() ?? "";
  const nachname = (formData.get("nachname") as string | null)?.trim() ?? "";
  const personenRaw = (formData.get("personen") as string | null)?.trim() ?? "";

  if (!vorname || !nachname) {
    return { error: "Bitte Vorname und Name ausfüllen." };
  }
  if (vorname.length > 80 || nachname.length > 80) {
    return { error: "Der Name ist etwas gar lang – bitte kürzen." };
  }

  const personen = Number.parseInt(personenRaw, 10);
  if (!Number.isInteger(personen) || personen < 1 || personen > MAX_PERSONEN) {
    return {
      error: `Bitte eine Personenzahl zwischen 1 und ${MAX_PERSONEN} angeben.`,
    };
  }

  const chosen = MITBRINGSEL.filter((o) => formData.get(o.key) === "on").map(
    (o) => o.key,
  );

  if (!isSupabaseConfigured()) {
    console.error("Glühwein: Supabase ist nicht konfiguriert, Anmeldung verworfen.");
    return {
      error:
        "Die Anmeldung kann gerade nicht gespeichert werden. Bitte später nochmals versuchen.",
    };
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("gluehwein_anmeldungen").insert({
    vorname,
    nachname,
    anzahl_personen: personen,
    bringt_gluehwein: chosen.includes("gluehwein"),
    bringt_knabbereien: chosen.includes("knabbereien"),
    bringt_alkoholfrei: chosen.includes("alkoholfrei"),
  });

  if (error) {
    console.error("Glühwein: Insert fehlgeschlagen:", error);
    return {
      error:
        "Speichern fehlgeschlagen. Bitte später nochmals versuchen oder direkt bei mitglieder@snakebite-vtcl.ch melden.",
    };
  }

  revalidatePath("/gluehwein-abend");

  return { success: true, chosen, stats: await loadStats() };
}
