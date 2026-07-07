# Google Apps Script — Odette Lead Capture

This folder contains the **Google Apps Script** project that saves form leads to Google Sheets.

## Files

| File | Purpose |
|------|---------|
| `Code.gs` | Main script — receives form data, appends rows to sheet |
| `appsscript.json` | Apps Script project manifest |

## Setup (one time)

1. Open [Google Sheets](https://sheets.google.com) → create a new spreadsheet  
   Name it e.g. **Odette Franchise Leads**

2. **Extensions → Apps Script**

3. Remove the default `function myFunction()` code

4. Copy the full contents of **`Code.gs`** from this folder and paste into the Apps Script editor

5. Save the project (name it **Odette Lead Capture**)

6. In the function dropdown, select **`setupSheet`** → click **Run**  
   - Grant permissions when prompted  
   - This creates a **Leads** tab with column headers

7. **Deploy → New deployment**
   - Type: **Web app**
   - Description: `Odette lead capture`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the **Web App URL**

8. Add the Web App URL to your environment variables:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Set this in:
- `.env.local` for local development
- Your production host (e.g. Vercel → Project → Settings → Environment Variables)

9. Restart the dev server after changing env vars: `npm run dev`

## Sheet columns

| Column | Description |
|--------|-------------|
| Timestamp | Date & time of submission |
| Full Name | Visitor name |
| Mobile Number | Full phone number with country code |
| Email | Visitor email |
| State | Selected state |
| City | City entered by visitor |
| Investment Budget | Selected budget option |

## Test

Open your Web App URL in a browser. You should see:

```json
{"status":"running","version":"2.1.0","message":"Odette lead capture API is active."}
```

Then submit a test lead from the website and confirm a new row appears in the **Leads** sheet.

If emails arrive but rows do not appear, verify `GOOGLE_SCRIPT_URL` is set in production and redeploy the Apps Script after updating `Code.gs`.
