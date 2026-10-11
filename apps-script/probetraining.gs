// Google Apps Script: verschickt Probetraining-Anmeldungen per Mail.
// Wird von src/app/probetraining/actions.ts via PROBETRAINING_WEBHOOK_URL aufgerufen.
//
// Deployment: script.google.com → Neues Projekt → diesen Code einfügen →
// Bereitstellen → Neue Bereitstellung → Typ "Web-App",
// Ausführen als "Ich", Zugriff "Jeder" → URL (endet auf /exec) kopieren.
// Nach Code-Änderungen: Bereitstellungen verwalten → neue Version bereitstellen.

const RECIPIENT = "debi.studer@x-fighter.ch";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.subject || !data.html) {
      throw new Error("subject oder html fehlt");
    }

    MailApp.sendEmail({
      to: RECIPIENT,
      subject: data.subject,
      body: data.text || "Neue Probetraining-Anmeldung (HTML-Mail).",
      htmlBody: data.html,
      replyTo: data.replyTo,
      name: "VTCL Probetraining",
    });

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
