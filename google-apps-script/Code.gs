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
 * 5. Copy Web App URL → GOOGLE_SCRIPT_URL in your hosting environment
 */

const SHEET_NAME = "Leads";
const SCRIPT_VERSION = "2.1.0";

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

    const fullName = pickField_(data, ["fullName", "full_name", "name"]);
    const mobileNumber = pickField_(data, [
      "mobileNumber",
      "mobile_number",
      "mobile",
      "phone",
      "fullPhone",
      "full_phone",
    ]);
    const email = pickField_(data, ["email", "emailAddress", "email_address"]);
    const state = pickField_(data, ["state"]);
    const city = pickField_(data, ["city"]);
    const investmentBudget = pickField_(data, [
      "investmentBudget",
      "investment_budget",
      "budget",
    ]);

    if (!fullName) {
      return jsonResponse_({ success: false, error: "Full name is required" });
    }

    if (!mobileNumber) {
      return jsonResponse_({ success: false, error: "Mobile number is required" });
    }

    if (!email) {
      return jsonResponse_({ success: false, error: "Email is required" });
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
      return jsonResponse_({
        success: false,
        error: "Invalid investment budget: " + investmentBudget,
      });
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
    version: SCRIPT_VERSION,
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

function pickField_(data, keys) {
  for (var i = 0; i < keys.length; i++) {
    var value = data[keys[i]];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value).trim();
    }
  }

  return "";
}

function parseRequest_(e) {
  if (!e) {
    throw new Error("No request received");
  }

  if (e.postData && e.postData.contents) {
    var contentType = String(e.postData.type || "").toLowerCase();
    var contents = String(e.postData.contents || "");

    if (contentType.indexOf("application/json") > -1 || contents.charAt(0) === "{") {
      return JSON.parse(contents);
    }

    if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
      return parseFormBody_(contents);
    }

    try {
      return JSON.parse(contents);
    } catch (err) {
      return parseFormBody_(contents);
    }
  }

  if (e.parameter) {
    return e.parameter;
  }

  throw new Error("No data received");
}

function parseFormBody_(body) {
  var params = {};
  var pairs = String(body).split("&");

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    if (!pair) continue;

    var parts = pair.split("=");
    var key = decodeURIComponent(parts[0] || "").trim();
    var value = decodeURIComponent((parts[1] || "").replace(/\+/g, " ")).trim();

    if (key) {
      params[key] = value;
    }
  }

  return params;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
