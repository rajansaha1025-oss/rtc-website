/* Shared by every page: sticky Call + WhatsApp bar (mobile) and tick-box document checklists. */
(function () {
  const D = { phone: "+8802227720014", wa: "8801711773086" };
  try { const a = JSON.parse(localStorage.getItem("rtc7") || "null"); ((a && a.rows) || []).forEach(r => { if (r.id === "setting_phone" && r.details) D.phone = r.details; if (r.id === "setting_whatsapp" && r.details) D.wa = String(r.details).replace(/\D/g, ""); }); } catch (e) {}
  try { const c = JSON.parse(localStorage.getItem("rtc-cache") || "null"); ((c && c.rows) || []).forEach(r => { if (r[0] === "setting" && r[1] === "phone" && r[2]) D.phone = r[2]; if (r[0] === "setting" && r[1] === "whatsapp" && r[2]) D.wa = String(r[2]).replace(/\D/g, ""); }); } catch (e) {}
  const tel = "tel:" + D.phone.replace(/[^\d+]/g, ""), wa = t => "https://wa.me/" + D.wa + (t ? "?text=" + encodeURIComponent(t) : "");
  /* sticky bar */
  const st = document.createElement("style");
  st.textContent = "#rtcbar{display:none}@media(max-width:899px){#rtcbar{position:fixed;left:0;right:0;bottom:0;z-index:900;display:flex;gap:8px;padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px));background:#fff;border-top:1px solid rgba(13,33,80,.14);box-shadow:0 -6px 20px -10px rgba(13,33,80,.35)}#rtcbar a{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 8px;border-radius:12px;font:600 15px 'Poppins','Hind Siliguri',sans-serif;text-decoration:none;color:#fff}#rtcbar .c{background:#1c4c96}#rtcbar .w{background:#25d366}body{padding-bottom:70px}.fab-wa,.wf{display:none!important}}html[data-theme=dark] #rtcbar{background:#0d2150;border-color:rgba(255,255,255,.14)}.ckl{list-style:none;padding-left:0!important}.ckl li{padding:5px 0!important}.ckl li::before{display:none!important}.ckl label{display:flex;gap:10px;align-items:flex-start;cursor:pointer;color:inherit}.ckl input{width:20px;height:20px;margin:2px 0 0;flex-shrink:0;accent-color:#16794f}.ckl input:checked+span{text-decoration:line-through;opacity:.6}.ckbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px}.ckbar small{opacity:.75}.ckbtn{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:50px;padding:10px 20px;background:#25d366;color:#fff;font:600 14px 'Poppins','Hind Siliguri',sans-serif;cursor:pointer;text-decoration:none}";
  document.head.appendChild(st);
  if (!document.getElementById("rtcbar") && !/admin|track\.html/.test(location.pathname)) {
    const b = document.createElement("div"); b.id = "rtcbar"; b.innerHTML = '<a class="c" href="' + tel + '"><span aria-hidden="true">📞</span> Call / কল</a><a class="w" href="' + wa("Assalamu alaikum, I need help.") + '" target="_blank" rel="noopener"><span aria-hidden="true">💬</span> WhatsApp</a>';
    document.body.appendChild(b);
  }
  /* checklists on service pages: any element with data-ck (a card holding a ul) */
  document.querySelectorAll("[data-ck]").forEach((card, n) => {
    const ul = card.querySelector("ul"); if (!ul) return;
    const svc = card.dataset.ck || document.title.split("|")[0].trim(), key = "rtc-ck:" + location.pathname + ":" + n;
    let on = {}; try { on = JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) {}
    ul.classList.add("ckl");
    [...ul.children].forEach((li, i) => { const tx = li.textContent.trim(); li.innerHTML = '<label><input type="checkbox" data-i="' + i + '"><span></span></label>'; li.querySelector("span").textContent = tx; li.querySelector("input").checked = !!on[i]; });
    const bar = document.createElement("div"); bar.className = "ckbar"; bar.innerHTML = '<small class="cnt"></small><a class="ckbtn" target="_blank" rel="noopener"><span aria-hidden="true">💬</span> Send on WhatsApp / হোয়াটসঅ্যাপে পাঠান</a>'; card.appendChild(bar);
    const upd = () => {
      const items = [...ul.querySelectorAll("li")], have = items.filter(l => l.querySelector("input").checked).map(l => l.textContent.trim()), miss = items.filter(l => !l.querySelector("input").checked).map(l => l.textContent.trim());
      bar.querySelector(".cnt").textContent = have.length + " / " + items.length + " ready";
      const msg = "Assalamu alaikum, I need help with: " + svc + "\nReady:\n" + (have.map(x => "- " + x).join("\n") || "- none yet") + "\nStill need / not sure:\n" + (miss.map(x => "- " + x).join("\n") || "- nothing");
      bar.querySelector(".ckbtn").href = wa(msg);
      const o = {}; items.forEach((l, i) => { if (l.querySelector("input").checked) o[i] = 1; }); try { localStorage.setItem(key, JSON.stringify(o)); } catch (e) {}
    };
    ul.addEventListener("change", upd); upd();
  });
})();
