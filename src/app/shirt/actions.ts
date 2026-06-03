"use server";

import { Resend } from "resend";

export type FormState = {
  success?: boolean;
  error?: string;
};

const kidsSizes = ["104", "116", "128", "140", "152", "164"] as const;
const adultSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

const sizeLabels: Record<string, string> = {
  ...Object.fromEntries(kidsSizes.map((s) => [`kids-${s}`, `Kinder ${s}`])),
  ...Object.fromEntries(adultSizes.map((s) => [`adult-${s}`, `Erwachsene ${s}`])),
};

export async function submitShirtBestellung(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const size = (formData.get("size") as string)?.trim();

  if (!firstName || !lastName) {
    return { error: "Bitte Vor- und Nachname ausfüllen." };
  }
  if (!size || !sizeLabels[size]) {
    return { error: "Bitte eine Grösse auswählen." };
  }

  const sizeLabel = sizeLabels[size];

  if (!process.env.RESEND_API_KEY) {
    console.error("Shirt: RESEND_API_KEY is not set");
    return {
      error: "Versand vorübergehend nicht möglich. Bitte direkt bei mitglieder@vctl.ch melden.",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let resendError: unknown = null;
  try {
    const result = await resend.emails.send({
      from: "VCTL Shirt <onboarding@resend.dev>",
      to: "christian.schwotzer@hellopure.io",
      subject: `Shirt-Nachbestellung: ${firstName} ${lastName} (${sizeLabel})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#fb923c;padding:32px 40px;border-radius:16px 16px 0 0">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">Neue Shirt-Nachbestellung</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">VCTL – Velo- &amp; Trial Club Luzern</p>
          </div>
          <div style="background:#fff;padding:32px 40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px">
            <table style="width:100%;border-collapse:collapse;font-size:15px">
              <tr style="border-bottom:1px solid #f1f5f9">
                <td style="padding:12px 0;color:#64748b;font-weight:600;width:35%">Name</td>
                <td style="padding:12px 0;font-weight:700">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#64748b;font-weight:600">Grösse</td>
                <td style="padding:12px 0;font-weight:700">${sizeLabel}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });
    resendError = result.error;
  } catch (err) {
    console.error("Shirt: Resend threw:", err);
    return { error: "Versand fehlgeschlagen. Bitte später nochmals versuchen." };
  }

  if (resendError) {
    console.error("Shirt: Resend error:", resendError);
    return { error: "Versand fehlgeschlagen. Bitte später nochmals versuchen." };
  }

  return { success: true };
}
