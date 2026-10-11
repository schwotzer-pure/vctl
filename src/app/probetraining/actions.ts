"use server";

import { Resend } from "resend";

export type FormState = {
  success?: boolean;
  error?: string;
};

const groupLabels: Record<string, string> = {
  junioren: "Kinder (6–11 Jahre)",
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

  const groupLabel = groupLabels[group] ?? group ?? "–";
  const subject = `Probetraining-Anmeldung: ${firstName} ${lastName}`;
  const text = [
    `Name: ${firstName} ${lastName}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone || "–"}`,
    `Alter: ${age ? age + " Jahre" : "–"}`,
    `Gruppe: ${groupLabel}`,
    `Nachricht: ${message || "–"}`,
  ].join("\n");
  const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#fb923c;padding:32px 40px;border-radius:16px 16px 0 0">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">Neue Probetraining-Anmeldung</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">VTCL – Velo- &amp; Trial Club Luzern</p>
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
              <td style="padding:12px 0">${groupLabel}</td>
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
    `;

  const mail = { subject, html, text, replyTo: email };

  // Apps Script liefert an Debi, Resend an Christian. Erfolg wenn mindestens
  // einer durchgeht, damit keine Anmeldung verloren geht.
  const [webhookOk, resendOk] = await Promise.all([
    sendViaWebhook(mail),
    sendViaResend(mail),
  ]);

  if (!webhookOk && !resendOk) {
    return { error: "Versand fehlgeschlagen. Bitte versuch es später nochmals." };
  }

  return { success: true };
}

type Mail = { subject: string; html: string; text: string; replyTo: string };

// --- Google Apps Script Webhook (apps-script/probetraining.gs) -------------

async function sendViaWebhook(mail: Mail): Promise<boolean> {
  const url = process.env.PROBETRAINING_WEBHOOK_URL;
  if (!url) {
    console.warn("Probetraining: PROBETRAINING_WEBHOOK_URL is not set, skipping webhook");
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mail),
      // Apps Script darf bis ~5s brauchen, also kein zu enges Limit.
      signal: AbortSignal.timeout(10_000),
    });
    // Apps Script antwortet auch bei Fehlern mit HTTP 200, darum den Body prüfen.
    const body = await res.text();
    let ok = false;
    try {
      ok = JSON.parse(body).ok === true;
    } catch {}
    if (!res.ok || !ok) {
      console.error("Probetraining: Webhook failed", res.status, body.slice(0, 500));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Probetraining: Webhook threw:", err);
    return false;
  }
}

// --- Resend ----------------------------------------------------------------

// Resend-Sandbox (onboarding@resend.dev) liefert nur an die Account-Owner-Adresse.
async function sendViaResend(mail: Mail): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("Probetraining: RESEND_API_KEY is not set");
    return false;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "VTCL Probetraining <onboarding@resend.dev>",
      to: "christian.schwotzer@hellopure.io",
      ...mail,
    });
    if (error) {
      console.error("Probetraining: Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Probetraining: Resend threw:", err);
    return false;
  }
}
