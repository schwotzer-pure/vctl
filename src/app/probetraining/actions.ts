"use server";

import { Resend } from "resend";

export type FormState = {
  success?: boolean;
  error?: string;
};

const groupLabels: Record<string, string> = {
  junioren: "Junioren (6–11 Jahre)",
  jugend: "Jugend (12–17 Jahre)",
  erwachsene: "Erwachsene (ab 18 Jahren)",
  unsicher: "Bin mir unsicher",
};

export async function submitProbetraining(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const age = (formData.get("age") as string)?.trim();
  const group = (formData.get("group") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!firstName || !lastName || !email) {
    return { error: "Bitte fülle Vorname, Nachname und E-Mail aus." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "VCTL Probetraining <onboarding@resend.dev>",
    to: "christian.schwotzer@gmail.com",
    replyTo: email,
    subject: `Probetraining-Anmeldung: ${firstName} ${lastName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#fb923c;padding:32px 40px;border-radius:16px 16px 0 0">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">Neue Probetraining-Anmeldung</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">VCTL – Velo- &amp; Trial Club Luzern</p>
        </div>
        <div style="background:#fff;padding:32px 40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px">
          <table style="width:100%;border-collapse:collapse;font-size:15px">
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600;width:35%">Name</td>
              <td style="padding:12px 0;font-weight:700">${firstName} ${lastName}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600">E-Mail</td>
              <td style="padding:12px 0"><a href="mailto:${email}" style="color:#fb923c">${email}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600">Telefon</td>
              <td style="padding:12px 0">${phone || "–"}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600">Alter</td>
              <td style="padding:12px 0">${age ? age + " Jahre" : "–"}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600">Gruppe</td>
              <td style="padding:12px 0">${groupLabels[group] ?? group ?? "–"}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#64748b;font-weight:600;vertical-align:top">Nachricht</td>
              <td style="padding:12px 0;white-space:pre-wrap">${message || "–"}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:10px;font-size:13px;color:#64748b">
            Auf diese Mail antworten schickt die Antwort direkt an ${email}.
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return { error: "Versand fehlgeschlagen. Bitte versuch es später nochmals." };
  }

  return { success: true };
}
