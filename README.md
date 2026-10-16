# RTC website v11
Upload everything to GitHub (replace old files; delete the old `theme.css`). Then:

1. **Firestore rules:** `firestore.rules` must contain your admin email (replace `REPLACE_WITH_ADMIN_EMAIL`), then Publish in Firebase Console > Firestore > Rules.
2. **Admin > More** now has: Gallery photos, Payment details (bKash/Nagad/bank), Customer file tracking, and Website notice with an end date (Eid / special offer hides itself). Contact page has a "Google Business Profile / review link" box.
3. **Leads** (the old Inbox): set each lead to New / Called / Converted / Lost and add a private note.
4. **Reviews:** add only real reviews with the customer's permission (name + city). The section stays hidden while empty. **Gallery** and **Team photos** the same: add real photos in admin.
5. Read `terms.html` and `refund-policy.html` once. They are sensible defaults, but they are your business rules: change anything that does not match how you work.
6. Search Console: re-submit `sitemap.xml` (22 pages now, including 6 guides).
7. Firebase Console only: App Check (reCAPTCHA v3) for Firestore; strong admin password / multi-factor.
8. Google Ads: paste the conversion label into `adsLeadLabel` in `track.js`.
9. Team photo files: `rajanpic.png`, `omeypic.png` (an `omey.png` exists; rename it). Or just upload from Admin > Team.
10. New domain later: replace the github.io links in the HTML files, sitemap.xml, robots.txt.

Guides are written without fee numbers or processing times on purpose: those change often. Update them if you want to quote current figures.
