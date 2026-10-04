/* Paste your IDs between the quotes. Leave "" to keep a tool switched off. */
const TRACK = {
  ga4: "G-P1MKDZYXEJ",           // Google Analytics 4, looks like G-XXXXXXXXXX
  ads: "AW-775397092",           // Google Ads, looks like AW-1234567890
  adsLeadLabel: "",  // Google Ads conversion label, looks like AbC-dEfGhIjK
  pixel: "1035205282905041"          // Facebook Pixel ID, digits only
};
(function () {
  try { const q = new URLSearchParams(location.search), s = q.get("utm_source") || (q.get("fbclid") ? "facebook" : q.get("gclid") ? "google-ads" : "");
    if (s || q.get("utm_campaign")) sessionStorage.setItem("rtc-src", [s, q.get("utm_medium"), q.get("utm_campaign")].filter(Boolean).join("/")); } catch (e) {}
  window.rtcSource = () => { try { return sessionStorage.getItem("rtc-src") || (document.referrer ? new URL(document.referrer).hostname : "direct"); } catch (e) { return "direct"; } };
  const add = src => { const s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); };
  window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
  const gid = TRACK.ga4 || TRACK.ads;
  if (gid) { add("https://www.googletagmanager.com/gtag/js?id=" + gid); gtag("js", new Date()); if (TRACK.ga4) gtag("config", TRACK.ga4); if (TRACK.ads) gtag("config", TRACK.ads); }
  if (TRACK.pixel) { !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js"); fbq("init", TRACK.pixel); fbq("track", "PageView"); }
  /* kind: whatsapp | call | lead */
  window.rtcTrack = (kind, label) => {
    try { window.fbq && fbq("track", kind === "lead" ? "Lead" : "Contact", { content_name: label || "" }); } catch (e) {}
    try { gtag("event", kind === "lead" ? "generate_lead" : kind + "_click", { event_label: label || "", page: location.pathname });
      if (TRACK.ads && TRACK.adsLeadLabel) gtag("event", "conversion", { send_to: TRACK.ads + "/" + TRACK.adsLeadLabel }); } catch (e) {}
  };
  document.addEventListener("click", e => { const a = e.target.closest("a"); if (!a) return; const h = a.getAttribute("href") || "";
    if (h.includes("wa.me/")) rtcTrack("whatsapp", location.pathname); else if (h.startsWith("tel:")) rtcTrack("call", location.pathname); });
})();
