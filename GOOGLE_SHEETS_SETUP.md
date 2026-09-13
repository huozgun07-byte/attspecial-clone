# Google Sheets lead logging — setup

Every real lead submission (`/api/lead`) can also append a row to a Google
Sheet, via a small Google Apps Script "Web App" that acts as a webhook. No
Google Cloud service account or billing is needed — this uses the free,
built-in Apps Script editor attached to a Sheet.

## 1. Create the Sheet

1. Go to https://sheets.google.com and create a new blank spreadsheet.
2. Name it something like **"AT&T Fiber Leads"**.

## 2. Add the Apps Script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete any boilerplate code in `Code.gs` and paste this in its place:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Source", "Street", "Unit", "Zip",
      "Moving", "Availability", "Phone", "Email", "IP"
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.source || "",
    data.street || "",
    data.unit || "",
    data.zip || "",
    data.moving ? "Yes" : "No",
    data.available === undefined ? "" : (data.available ? "Available" : "Not available"),
    data.phone || "",
    data.email || "",
    data.ip || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click the disk/save icon (or Ctrl+S). Name the project, e.g. "Lead Webhook".

## 3. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Description: anything, e.g. "Lead webhook v1".
4. **Execute as:** Me (your Google account).
5. **Who has access:** Anyone.
6. Click **Deploy**.
7. Google will ask you to authorize the script (it's your own script, so this
   is safe) — click **Authorize access**, pick your account, and if it warns
   "Google hasn't verified this app", click **Advanced → Go to Lead Webhook
   (unsafe)** and allow it.
8. Copy the **Web app URL** it gives you — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Add it to the project

Add this line to `.env.local` (same file as `RESEND_API_KEY`):

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
```

Restart `npm run dev` if it doesn't pick it up automatically, then submit a
test form on the site — a new row should appear in the "Leads" tab of your
Sheet within a couple of seconds.

## Notes

- If you ever edit the Apps Script code, you need to create a **new
  deployment** (Deploy → Manage deployments → edit → New version) for the
  change to take effect — editing the code alone does not update the live
  Web App URL's behavior until you redeploy.
- This webhook has no authentication beyond the unguessable URL. That's
  normal for this kind of lightweight integration, but don't post the URL
  publicly.
