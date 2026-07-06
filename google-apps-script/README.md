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

8. In your Next.js project root, create `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

9. Restart the dev server: `npm run dev`

## Unlimited submissions

Every form submit adds **one new row**. There is no limit on:
- Number of leads
- Same person submitting multiple times
- Hero form + secondary form submissions

## Sheet columns

| Column | Description |
|--------|-------------|
| Timestamp | Date & time of submission |
| Full Name | Visitor name |
| Country Code | e.g. +91 |
| Mobile Number | 10-digit number |
| Full Phone | Country code + mobile |
| Email | Optional |
| City | City |
| Investment Budget | Hero form only |
| Form Source | Hero Form / Secondary Form |
| Page URL | Page URL when submitted |

## Test

Open your Web App URL in a browser. You should see:

```json
{"status":"running","message":"Odette Franchise lead capture API is active..."}
```

Then submit a test lead from the website and confirm a new row appears in the **Leads** sheet.
