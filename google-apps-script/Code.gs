/**
 * Odette Franchise Landing Page — Google Sheets Lead Capture
 *
 * Saves form fields plus submission timestamp:
 * Timestamp | Full Name | Mobile Number | Email | State | City | Investment Budget
 *
 * SETUP:
 * 1. Create a new Google Sheet
 * 2. Extensions → Apps Script → paste this file
 * 3. Run setupSheet() once → allow permissions
 * 4. Deploy → New deployment → Web app (Execute as: Me, Access: Anyone)
 * 5. Copy Web App URL → .env.local as GOOGLE_SCRIPT_URL
 */

const SHEET_NAME = "Leads";

/** Must match budget options in the enquiry form */
const ALLOWED_BUDGETS = [
  "₹45 Lakhs",
  "₹45–75 Lakhs",
  "Above ₹75 Lakhs",
];

/** Sheet columns: timestamp (auto) + the 6 enquiry form fields */
const SHEET_HEADERS = [
  "Timestamp",
  "Full Name",
  "Mobile Number",
  "Email",
  "State",
  "City",
  "Investment Budget",
];

function doPost(e) {
  try {
    const sheet = getSheet_();
    const data = parseRequest_(e);

    const fullName = String(data.fullName || "").trim();
    const mobileNumber = String(data.mobileNumber || "").trim();
    const email = String(data.email || "").trim();
    const state = String(data.state || "").trim();
    const city = String(data.city || "").trim();
    const investmentBudget = String(data.investmentBudget || "").trim();

    if (!fullName) {
      return jsonResponse_({ success: false, error: "Full name is required" });
    }

    if (!mobileNumber) {
      return jsonResponse_({ success: false, error: "Mobile number is required" });
    }

    if (!state) {
      return jsonResponse_({ success: false, error: "State is required" });
    }

    if (!city) {
      return jsonResponse_({ success: false, error: "City is required" });
    }

    if (!investmentBudget) {
      return jsonResponse_({ success: false, error: "Investment budget is required" });
    }

    if (ALLOWED_BUDGETS.indexOf(investmentBudget) === -1) {
      return jsonResponse_({ success: false, error: "Invalid investment budget" });
    }

    appendLeadRow_(sheet, {
      timestamp: new Date(),
      fullName: fullName,
      mobileNumber: mobileNumber,
      email: email,
      state: state,
      city: city,
      investmentBudget: investmentBudget,
    });

    return jsonResponse_({ success: true, message: "Lead saved successfully" });
  } catch (error) {
    return jsonResponse_({ success: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse_({
    status: "running",
    message: "Odette lead capture API is active.",
  });
}

/**
 * Run once after pasting this script.
 * Creates the sheet, sets headers, and removes any extra columns.
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  syncSheetLayout_(sheet);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    setupSheet();
    sheet = ss.getSheetByName(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    syncSheetLayout_(sheet);
  }

  return sheet;
}

function syncSheetLayout_(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol > SHEET_HEADERS.length) {
    sheet.deleteColumns(SHEET_HEADERS.length + 1, lastCol - SHEET_HEADERS.length);
  }

  sheet
    .getRange(1, 1, 1, SHEET_HEADERS.length)
    .setValues([SHEET_HEADERS])
    .setFontWeight("bold");

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 160);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(5, 160);
  sheet.setColumnWidth(6, 140);
  sheet.setColumnWidth(7, 200);

  sheet
    .getRange("A:A")
    .setNumberFormat("dd mmm yyyy, hh:mm:ss");

  // Mobile numbers start with "+" — force plain text so Sheets does not treat them as formulas
  sheet.getRange("C:C").setNumberFormat("@");
}

/** Writes one lead row; mobile is stored as text to avoid #ERROR! from leading "+" */
function appendLeadRow_(sheet, lead) {
  const nextRow = sheet.getLastRow() + 1;

  sheet.getRange(nextRow, 1).setValue(lead.timestamp);
  sheet.getRange(nextRow, 2).setValue(lead.fullName);
  sheet.getRange(nextRow, 3).setNumberFormat("@").setValue(lead.mobileNumber);
  sheet.getRange(nextRow, 4).setValue(lead.email);
  sheet.getRange(nextRow, 5).setValue(lead.state);
  sheet.getRange(nextRow, 6).setValue(lead.city);
  sheet.getRange(nextRow, 7).setValue(lead.investmentBudget);
}

function parseRequest_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("No data received");
  }

  const contentType = e.postData.type || "";

  if (contentType.indexOf("application/json") > -1) {
    return JSON.parse(e.postData.contents);
  }

  if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
    return e.parameter || {};
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return e.parameter || {};
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
