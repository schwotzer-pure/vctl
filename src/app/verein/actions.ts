"use server";

import { Resend } from "resend";

export type FormState = {
  success?: boolean;
  error?: string;
};

const categoryLabels: Record<string, string> = {
  FUN: "FUN – Erwachsene ohne Trainingsabo (CHF 100)",
  AKTIV: "AKTIV – Erwachsene mit Trainingsabo (CHF 400)",
  GÖNNER: "GÖNNER – Unterstützungsmitgliedschaft (CHF 100)",
};

export async function submitMitgliedschaft(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const category = (formData.get("category") as string)?.trim();
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const birthdate = (formData.get("birthdate") as string)?.trim();
  const street = (formData.get("street") as string)?.trim();
  const zip = (formData.get("zip") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const emergencyFirstName = (formData.get("emergencyFirstName") as string)?.trim();
  const emergencyLastName = (formData.get("emergencyLastName") as string)?.trim();
  const emergencyPhone = (formData.get("emergencyPhone") as string)?.trim();
  const acceptStatutes = formData.get("acceptStatutes");
  const acceptInsurance = formData.get("acceptInsurance");
  const message = (formData.get("message") as string)?.trim();

  if (!category || !categoryLabels[category]) {
    return { error: "Bitte wähle eine Mitgliedschaftskategorie." };
  }
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !birthdate ||
    !street ||
    !zip ||
    !city ||
    !emergencyFirstName ||
    !emergencyLastName ||
    !emergencyPhone
  ) {
    return { error: "Bitte fülle alle Pflichtfelder aus." };
  }
  if (!acceptStatutes || !acceptInsurance) {
    return { error: "Bitte bestätige beide Hinweise." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "VCTL Mitgliedschaft <onboarding@resend.dev>",
    to: "christian.schwotzer@hellopure.io",
    replyTo: email,
    subject: `Mitgliedschafts-Anmeldung (${category}): ${firstName} ${lastName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#fb923c;padding:32px 40px;border-radius:16px 16px 0 0">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">Neue Mitgliedschafts-Anmeldung</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">VCTL – Velo- &amp; Trial Club Luzern</p>
        </div>
        <div style="background:#fff;padding:32px 40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px">
          <table style="width:100%;border-collapse:collapse;font-size:15px">
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600;width:35%">Kategorie</td>
              <td style="padding:12px 0;font-weight:700">${categoryLabels[category]}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600">Name</td>
              <td style="padding:12px 0;font-weight:700">${firstName} ${lastName}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600">E-Mail</td>
              <td style="padding:12px 0"><a href="mailto:${email}" style="color:#fb923c">${email}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600">Mobile</td>
              <td style="padding:12px 0">${phone}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600">Geburtsdatum</td>
              <td style="padding:12px 0">${birthdate}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600;vertical-align:top">Adresse</td>
              <td style="padding:12px 0">${street}<br>${zip} ${city}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600;vertical-align:top">Notfallkontakt</td>
              <td style="padding:12px 0">${emergencyFirstName} ${emergencyLastName}<br>${emergencyPhone}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:12px 0;color:#64748b;font-weight:600;vertical-align:top">Bestätigungen</td>
              <td style="padding:12px 0">✓ Statuten gelesen<br>✓ Versicherung ist Sache des Teilnehmers</td>
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
