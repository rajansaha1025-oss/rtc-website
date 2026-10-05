/* Shared by the website and the admin. Same Firestore data model as v6, so your saved content keeps working. */
export const PID = "rtcwebsite-25306", COL = "rtc_content";
export const REST = `https://firestore.googleapis.com/v1/projects/${PID}/databases/(default)/documents/`;
export const DEF = {
  phone: "+880 2227720014", whatsapp: "8801711773086", email: "rajantravelrtc@gmail.com",
  facebook: "https://www.facebook.com/rajantravelrtc", address: "Kandapara, Narsingdi, Dhaka, Bangladesh",
  map: "https://maps.app.goo.gl/R4DuQWmXRBp28EJa7",
  trade_no: "No. 5625/1297 · Narsingdi Pourashava · valid to 30 Jun 2027",
  travel_no: "Reg. No. 0017514 · Ministry of Civil Aviation and Tourism · valid to 25 Jul 2029"
};
export const REQ = {
  visa: ["Passport (valid 6+ months)", "Passport-size photos", "NID or birth certificate", "Bank statement and income proof", "Travel dates"],
  medical: ["Passport (valid 6+ months)", "Passport-size photos", "Doctor's prescription or hospital letter", "Patient and attendant details", "Bank statement"],
  pass: ["NID or birth certificate", "Passport-size photos", "Old passport (if any)", "Address proof"],
  tkt: ["Passport copy", "Route and travel date", "Passenger name exactly as in passport"],
  tktd: ["NID, passport or birth certificate copy (as per airline rule)", "Route and travel date", "Passenger name exactly as in NID or passport", "Contact phone number"],
  tkt2: ["Existing ticket or booking reference", "New date or reason", "Passport or NID copy"],
  hotel: ["Destination and hotel or resort preference", "Check-in and check-out dates", "Number of guests and rooms", "Budget per night", "Guest NID or passport copy"],
  hotelI: ["Country, city and hotel preference", "Check-in and check-out dates", "Number of guests and rooms", "Budget per night", "Passport copies of all guests"],
  nid: ["Birth certificate or old NID", "Parents' NID", "Address proof", "Photo"],
  tin: ["NID copy", "Photo", "Phone and email", "Job or business details"],
  pol: ["NID or passport copy", "Photos", "Purpose (job, visa, abroad)", "Address details"],
  brta: ["NID copy", "Photos", "Existing licence or vehicle papers (if any)", "Blood group and address"],
  bmet: ["Passport copy", "NID copy", "Passport-size photos", "Visa, job offer or work permit copy (if any)", "Skill or training certificate (if any)", "Phone number and email"],
  bc: ["Parents' NID or birth certificates", "Child's hospital card, vaccination card or school certificate", "Existing certificate (for correction or copy)", "Address proof"],
  dc: ["Deceased person's NID or birth certificate", "Death proof (doctor/hospital certificate or chairman/councillor letter)", "Applicant's NID and relationship", "Address details"],
  adm: ["Previous certificates and mark sheets", "Photos", "Guardian's NID", "Preferred institution"],
  tour: ["Number of travellers", "Travel dates", "Budget range", "Passport copies (international trips)"]
};
/* [icon, English, Bangla, "Service name:docs key;..."]. Names match v6 so old hide/document settings still apply. */
export const CAT = [
  ["🛂", "Visa", "ভিসা", "India Tourist Visa:visa;India Medical Visa:medical;India Tirtha (Pilgrim) Visa:visa;India Double Entry Visa:visa;Malaysia Visit Visa:visa;Malaysia Business Visa:visa;Australia Visitor Visa:visa;Australia Student Visa:visa;Dubai / UAE Visa:visa;Other Country Visa:visa"],
  ["📘", "Passport", "পাসপোর্ট", "New Passport:pass;Passport Renewal:pass;Lost or Damaged Re-issue:pass;Passport Correction:pass"],
  ["✈️", "Air Tickets", "এয়ার টিকেট", "Domestic Ticket:tktd;Domestic Date Change:tkt2;Domestic Refund / Cancellation:tkt2;International Ticket:tkt;International Date Change:tkt2;International Refund / Cancellation:tkt2"],
  ["🏨", "Hotels", "হোটেল", "Domestic Hotel Booking:hotel;Resort and Group Stay:hotel;International Hotel Booking:hotelI"],
  ["🗂️", "Documents", "ডকুমেন্ট", "NID Service:nid;TIN Certificate:tin;Police Clearance:pol;BRTA Service:brta;BMET Registration / Clearance:bmet;Birth Certificate:bc;Death Certificate:dc"],
  ["🎓", "Admission", "ভর্তি", "School Admission:adm;College Admission:adm;University Admission:adm"],
  ["🏝️", "Tours", "ট্যুর", "Domestic Tour:tour;International Tour:tour"]
];
export const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const lines = s => String(s || "").split("|").map(x => x.trim()).filter(Boolean);
/* Reads all content docs. A tiny "_v" doc changes on every admin save, so normal visits cost one small read. */
export async function load() {
  const get = u => fetch(REST + u).then(r => r.json());
  let c = null; try { c = JSON.parse(localStorage.getItem("rtc7") || "null"); } catch (e) {}
  try {
    const v = (await get(COL + "/_v")).fields?.title?.stringValue || "0";
    if (c && c.v === v && Date.now() - c.t < 216e5 && !/[?&]fresh/.test(location.search)) return c.rows;
    const j = await get(COL + "?pageSize=300");
    const rows = (j.documents || []).map(d => { const o = { id: d.name.split("/").pop() }; for (const k in d.fields || {}) { const f = d.fields[k]; o[k] = f.stringValue ?? f.integerValue ?? ""; } return o; });
    try { localStorage.setItem("rtc7", JSON.stringify({ t: Date.now(), v, rows })); } catch (e) {}
    return rows;
  } catch (e) { return c ? c.rows : []; }
}
