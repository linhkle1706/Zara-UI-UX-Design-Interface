/**
 * Zara redesign evaluation: shared results store.
 * Paste into the Google Sheet: Extensions -> Apps Script -> Code.gs, then
 * Deploy -> New deployment -> Web app (Execute as: Me, Who has access: Anyone).
 */
var SHEET_NAME = 'Responses';
var FEATURES = ["home_pills","home_navbar","menu_taxonomy","header_safe_area","lookbook_metadata",
  "search_autocomplete","search_ranking","smart_filter","pdp_photo_ratio","pdp_size_inline","pdp_add_cta",
  "bag_edit_size","checkout_stepper","payment_honesty","cookie_consent","auth_tabs","returns_stepper"];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    var header = ['submittedAt', 'testerId', 'ratingsJSON'];
    FEATURES.forEach(function (f) { header.push(f + '_old', f + '_new', f + '_prefer'); });
    sh.appendRow(header);
    sh.setFrozenRows(1);
  }
  return sh;
}

function num_(v) { v = Number(v); return v >= 1 && v <= 5 ? Math.round(v) : ''; }

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents || '{}');
    var ratings = (d && typeof d.ratings === 'object' && d.ratings) || {};
    var clean = {};
    var row = [String(d.submittedAt || new Date().toISOString()).slice(0, 40), String(d.testerId || '').slice(0, 60)];
    FEATURES.forEach(function (f) {
      var r = ratings[f] || {};
      var p = ['old', 'same', 'new'].indexOf(r.p) >= 0 ? r.p : '';
      clean[f] = { o: num_(r.o) || undefined, n: num_(r.n) || undefined, p: p || undefined };
    });
    row.push(JSON.stringify(clean));
    FEATURES.forEach(function (f) { row.push(clean[f].o || '', clean[f].n || '', clean[f].p || ''); });
    var sh = sheet_();
    // one row per tester: replace an earlier answer from the same tester
    var ids = sh.getLastRow() > 1 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues() : [];
    for (var i = 0; i < ids.length; i++) {
      if (row[1] && ids[i][0] === row[1]) { sh.getRange(i + 2, 1, 1, row.length).setValues([row]); return out_({ ok: true, replaced: true }); }
    }
    sh.appendRow(row);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  var sh = sheet_();
  var last = sh.getLastRow();
  var rows = last > 1 ? sh.getRange(2, 1, last - 1, 3).getValues() : [];
  var responses = rows.map(function (r) {
    var ratings = {};
    try { ratings = JSON.parse(r[2]); } catch (e) {}
    return { submittedAt: r[0], testerId: r[1], ratings: ratings };
  });
  return out_({ count: responses.length, responses: responses });
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
