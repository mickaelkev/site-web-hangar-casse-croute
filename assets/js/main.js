/* ==========================================================================
   Le Hangar Fumoir — comportements
   ========================================================================== */
(function () {
  "use strict";

  var C = window.HANGAR;
  var EN = window.HANGAR_EN;
  var FR_EXTRA = window.HANGAR_FR_EXTRA;
  var FR = {};               // textes FR d'origine, lus dans le HTML
  var lang = "fr";
  var FR_ATTR = new WeakMap();
  var activeCat = (C.categories && C.categories[0]) ? C.categories[0].id : "all";

  function $(s, root) { return (root || document).querySelector(s); }
  function $$(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }
  function t(key) {
    if (lang === "en" && EN[key] !== undefined) return EN[key];
    if (FR_EXTRA[key] !== undefined) return FR_EXTRA[key];
    return FR[key] !== undefined ? FR[key] : key;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function storage(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  /* ---------- Langue ---------- */
  $$("[data-i18n]").forEach(function (el) { FR[el.dataset.i18n] = el.textContent; });

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang === "en" ? "en" : "fr";
    $$("[data-i18n]").forEach(function (el) {
      var key = el.dataset.i18n;
      el.textContent = lang === "en" && EN[key] !== undefined ? EN[key] : FR[key];
    });
    $$("[data-i18n-attr]").forEach(function (el) {
      var saved = FR_ATTR.get(el) || {};
      el.dataset.i18nAttr.split(";").forEach(function (pair) {
        var p = pair.split(":"), attr = p[0].trim(), key = p[1].trim();
        if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
        el.setAttribute(attr, lang === "en" && EN[key] !== undefined ? EN[key] : saved[attr]);
      });
      FR_ATTR.set(el, saved);
    });
    var btn = $("#lang-toggle");
    btn.lang = lang === "en" ? "fr" : "en";
    btn.innerHTML = lang === "en" ? 'FR<span class="sr"> – Français</span>' : 'EN<span class="sr"> – English</span>';
    document.title = lang === "en" && EN["meta.title"] ? EN["meta.title"] : FR_TITLE;
    storage("hangar-lang", lang);
    // Transmettre la langue à l'autre site (le stockage local ne traverse pas les domaines)
    $$("a[data-sister]").forEach(function (a) {
      if (!a.dataset.base) a.dataset.base = a.getAttribute("href");
      var u = new URL(a.dataset.base, location.href);
      if (lang === "en") u.searchParams.set("lang", "en"); else u.searchParams.delete("lang");
      a.href = u.toString();
    });
    if (new URLSearchParams(location.search).has("lang") && window.history && history.replaceState) {
      var here = new URL(location.href);
      here.searchParams.set("lang", lang);
      history.replaceState(null, "", here);
    }
    if (tabsEl) { renderTabs(); renderMenu(false); }
    if ($("#hours")) renderHours();
  }
  var FR_TITLE = document.title;

  $("#lang-toggle").addEventListener("click", function () {
    var next = lang === "en" ? "fr" : "en";
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(function () { applyLang(next); });
    } else {
      applyLang(next);
    }
  });

  /* ---------- En-tête ---------- */
  var header = $(".header");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = $("#burger"), nav = $("#nav");
  var mobile = window.matchMedia("(max-width: 900px)");
  function isOpen() { return nav.classList.contains("is-open"); }
  function closeNav(returnFocus) {
    if (!isOpen()) return;
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    onScroll();
    if (returnFocus) burger.focus();
  }
  burger.addEventListener("click", function () {
    var open = !isOpen();
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    header.classList.add("is-solid");
    if (open) $("a", nav).focus();
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { closeNav(false); }); });
  document.addEventListener("keydown", function (e) {
    if (!isOpen() || !mobile.matches) return;
    if (e.key === "Escape") { closeNav(true); return; }
    if (e.key !== "Tab") return;
    var items = $$("a", nav).concat(burger);          // boucle : liens du menu puis bouton
    var i = items.indexOf(document.activeElement);
    e.preventDefault();
    items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
  });
  mobile.addEventListener("change", function () { closeNav(false); });

  // Lien actif selon la section visible
  if ("IntersectionObserver" in window) {
    var links = $$("a[href^='#']", nav);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) { var s = $(l.getAttribute("href")); if (s) io.observe(s); });
  }

  /* ---------- Menu ---------- */
  var tabsEl = $("#menu-tabs"), listEl = $("#menu-list");

  function renderTabs() {
    var cats = [{ id: "all", fr: t("menu.all"), en: t("menu.all") }].concat(C.categories);
    tabsEl.innerHTML = cats.map(function (c) {
      var n = c.id === "all" ? C.menu.length : C.menu.filter(function (m) { return m.cat === c.id; }).length;
      var sel = c.id === activeCat;
      return '<button class="tab" role="tab" type="button" id="tab-' + c.id + '" aria-controls="menu-list" data-cat="' + c.id + '" aria-selected="' + sel + '" tabindex="' + (sel ? 0 : -1) + '">'
        + esc(c[lang]) + '<small aria-hidden="true">' + n + '</small><span class="sr"> (' + n + ')</span></button>';
    }).join("");
    listEl.setAttribute("aria-labelledby", "tab-" + activeCat);
  }


  function money(n) {
    var str = n % 1 === 0 ? String(n) : n.toFixed(2);
    return lang === "en" ? "$" + str : str.replace(".", ",") + "\u00a0$";
  }

  function price(item) {
    if (item.stock === false) {
      return '<span class="item__price item__price--ask">' + esc(t("menu.out")) + "</span>";
    }
    if (item.price === null || item.price === undefined) {
      return '<span class="item__price item__price--ask">' + esc(t("menu.ask")) + "</span>";
    }
    var unit = item[lang].unit ? "<small>" + esc(item[lang].unit) + "</small>" : "";
    return '<span class="item__price">' + money(item.price) + unit + "</span>";
  }

  function itemHtml(item, i, animate) {
    var d = item[lang];
    var badge = item.badge === "hot" ? '<span class="badge badge--hot">' + esc(t("menu.hot")) + "</span>"
              : item.badge === "limited" ? '<span class="badge">' + esc(t("menu.limited")) + "</span>" : "";
    var anim = animate ? ' style="animation-delay:' + (Math.min(i, 8) * 30) + 'ms"' : "";
    return '<article class="item' + (item.stock === false ? " item--out" : "") + (animate ? "" : " item--static") + '"' + anim + ">"
      + '<h3 class="item__name">' + esc(d.name) + badge + "</h3>"
      + price(item)
      + '<p class="item__desc">' + esc(d.desc) + "</p></article>";
  }

  function renderMenu(animate) {
    var html = "";
    if (activeCat === "all") {
      var i = 0;
      C.categories.forEach(function (c) {
        var items = C.menu.filter(function (m) { return m.cat === c.id; });
        if (!items.length) return;
        html += '<h3 class="menu-group">' + esc(c[lang]) + "</h3>";
        items.forEach(function (m) { html += itemHtml(m, i++, animate); });
      });
    } else {
      C.menu.filter(function (m) { return m.cat === activeCat; }).forEach(function (m, i) { html += itemHtml(m, i, animate); });
    }
    listEl.innerHTML = html;
  }

  /* Met à jour les onglets sans les reconstruire : la transition joue */
  function selectTab(cat) {
    $$(".tab", tabsEl).forEach(function (b) {
      var on = b.dataset.cat === cat;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    listEl.setAttribute("aria-labelledby", "tab-" + cat);
  }

  if (tabsEl) {
  tabsEl.addEventListener("click", function (e) {
    var b = e.target.closest(".tab");
    if (!b || b.dataset.cat === activeCat) { if (b) b.focus(); return; }
    activeCat = b.dataset.cat;
    selectTab(activeCat);
    renderMenu(true);
    b.focus();
  });
  tabsEl.addEventListener("keydown", function (e) {
    var tabs = $$(".tab", tabsEl), idx = tabs.indexOf(document.activeElement), next;
    if (e.key === "ArrowRight") next = tabs[(idx + 1) % tabs.length];
    else if (e.key === "ArrowLeft") next = tabs[(idx - 1 + tabs.length) % tabs.length];
    else if (e.key === "Home") next = tabs[0];
    else if (e.key === "End") next = tabs[tabs.length - 1];
    else return;
    e.preventDefault();
    next.click();
  });

  }
  /* ---------- Heures ---------- */
  function fmt(hhmm) {
    if (lang === "fr") { var q = hhmm.split(":"); return +q[0] + "\u00a0h" + (q[1] !== "00" ? "\u00a0" + q[1] : ""); }
    var p = hhmm.split(":"), h = +p[0], ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + (p[1] !== "00" ? ":" + p[1] : "") + " " + ap;
  }
  function toMin(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }

  /* Heure et jour à Lévis, quel que soit le fuseau de l'appareil */
  function levisNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
      }).formatToParts(new Date());
      var get = function (k) { for (var i = 0; i < parts.length; i++) if (parts[i].type === k) return parts[i].value; };
      return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")), mins: +get("hour") * 60 + +get("minute") };
    } catch (e) {
      var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function renderHours() {
    var days = t("days"), L = levisNow(), today = L.day;
    var order = [1, 2, 3, 4, 5, 6, 0]; // lundi en premier
    $("#hours").innerHTML = "<tbody>" + order.map(function (d) {
      var h = C.hours[d];
      var val = h ? fmt(h[0]) + " – " + fmt(h[1]) : t("visit.closedDay");
      return '<tr class="' + (d === today ? "is-today" : "") + '"><td>' + days[d] + "</td><td>" + val + "</td></tr>";
    }).join("") + "</tbody>";

    var h = C.hours[today], mins = L.mins;
    var open = !!h && mins >= toMin(h[0]) && mins < toMin(h[1]);
    var badge = $("#open-badge");
    badge.textContent = open ? t("visit.open") : t("visit.closed");
    badge.className = "open-badge " + (open ? "is-open" : "is-closed");
  }

  /* ---------- Formulaire traiteur ---------- */
  var form = $("#catering-form");
  if (form) {
  var status = $("#form-status");
  var dateInput = $("#f-date");
  var LIMITS = { name: 100, email: 254, phone: 30, date: 10, guests: 4, type: 60, message: 1500 };
  var MAX_GUESTS = 2000;
  var ENDPOINT_OK = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/;

  function pad(n) { return ("0" + n).slice(-2); }
  function isoLocal(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  var tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = isoLocal(tomorrow);            // date locale, pas UTC

  function check(input) {
    var field = input.closest(".field"), ok = true, v = input.value.trim();
    if (input.name === "name") ok = v.length > 1 && v.length <= LIMITS.name;
    if (input.name === "email") ok = v.length <= LIMITS.email && /^[^\s@<>"(),;:]+@[^\s@<>"(),;:]+\.[^\s@<>"(),;:]{2,}$/.test(v);
    if (input.name === "date") ok = /^\d{4}-\d{2}-\d{2}$/.test(v) && v >= dateInput.min;
    if (input.name === "guests") ok = /^\d{1,4}$/.test(v) && +v >= 10 && +v <= MAX_GUESTS;
    field.classList.toggle("is-invalid", !ok);
    input.setAttribute("aria-invalid", String(!ok));
    var help = $(".field__help", field), err = $(".field__err", field);
    var ids = [help && help.id, !ok && err && err.id].filter(Boolean).join(" ");
    if (ids) input.setAttribute("aria-describedby", ids); else input.removeAttribute("aria-describedby");
    return ok;
  }
  var required = $$("[required]", form);
  required.forEach(function (i) {
    i.addEventListener("blur", function () { if (i.value) check(i); });
    i.addEventListener("input", function () { if (i.closest(".field").classList.contains("is-invalid")) check(i); });
  });

  function setStatus(msg, kind) { status.textContent = msg; status.className = "form__status" + (kind ? " is-" + kind : ""); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Anti-robot : champ piège rempli (invisible pour les humains).
    var trap = form.elements["_gotcha"];
    if (trap && trap.value) {
      form.reset(); setStatus(t("form.ok"), "ok"); return;   // on fait semblant, sans rien envoyer
    }

    var bad = required.filter(function (i) { return !check(i); });
    if (bad.length) { setStatus(t("form.fix"), "err"); bad[0].focus(); return; }

    var fd = new FormData(form);
    function val(k) { return String(fd.get(k) || "").trim().slice(0, LIMITS[k] || 100); }
    var meats = fd.getAll("meats").map(String).join(", ").slice(0, 200) || "—";

    if (!C.formEndpoint) {
      var body = [
        "Nom : " + val("name"),
        "Courriel : " + val("email"),
        "Téléphone : " + (val("phone") || "—"),
        "Date : " + val("date"),
        "Personnes : " + val("guests"),
        "Événement : " + val("type"),
        "Viandes : " + meats,
        "",
        val("message")
      ].join("\n");
      var subject = "Demande de traiteur — " + val("date") + " — " + val("guests") + " pers.";
      // encodeURIComponent empêche toute injection d'en-têtes (CR/LF, &cc=, &bcc=)
      window.location.href = "mailto:" + C.contact.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      setStatus(t("form.mailto") + " " + t("form.mailto.alt") + " " + C.contact.email + ".", "ok");
      return;
    }

    if (!ENDPOINT_OK.test(C.formEndpoint)) {      // garde-fou contre une erreur dans config.js
      setStatus(t("form.fail") + " " + C.contact.email + ".", "err");
      return;
    }

    var btn = $("button[type=submit]", form);
    if (btn.disabled) return;
    btn.disabled = true; setStatus(t("form.sending"));

    // Liste blanche : seuls ces champs partent chez Formspree.
    var out = new FormData();
    ["name", "email", "phone", "date", "guests", "type", "message"].forEach(function (k) { out.append(k, val(k)); });
    out.append("meats", meats);
    out.append("_subject", "Demande de traiteur — " + val("date"));
    out.append("_gotcha", "");

    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 15000) : null;

    fetch(C.formEndpoint, {
      method: "POST", body: out, credentials: "omit", referrerPolicy: "strict-origin-when-cross-origin",
      headers: { Accept: "application/json" }, signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (r) { if (!r.ok) throw new Error(String(r.status)); form.reset(); setStatus(t("form.ok"), "ok"); })
      .catch(function () { setStatus(t("form.fail") + " " + C.contact.email + ".", "err"); })
      .then(function () { if (timer) clearTimeout(timer); btn.disabled = false; });
  });

  }

  /* ---------- Photos facultatives : retirer l'image si elle ne charge pas ---------- */
  $$("img[data-optional]").forEach(function (img) {
    function drop() { if (img.parentNode) img.parentNode.removeChild(img); }
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) { drop(); return; }
    img.addEventListener("error", drop, { once: true });
  });

  /* ---------- Spécial du jour (casse-croûte) ---------- */
  var todayNum = levisNow().day;
  $$(".special[data-day]").forEach(function (el) {
    if (+el.dataset.day === todayNum) el.classList.add("is-today");
  });

  /* ---------- Apparitions au défilement + animation des 15 pas ---------- */
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = mqReduce.matches;
  $$("[data-count]").forEach(function (path) {
    var n = +path.dataset.count, html = "";
    for (var i = 0; i < n; i++) {
      html += '<svg class="foot' + (i % 2 ? " foot--r" : "") + '" style="--i:' + i + '" viewBox="0 0 20 36"><use href="#footprint"/></svg>';
    }
    path.innerHTML = html;
  });
  var revealEls = $$(".reveal, .steps15");
  if (!reduced && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }
  function showAll() { revealEls.forEach(function (el) { el.classList.add("is-in"); }); }
  if (mqReduce.addEventListener) mqReduce.addEventListener("change", function (e) { if (e.matches) showAll(); });
  /* Filet de sécurité : tout ce qui est déjà au-dessus du bas de l'écran après 3 s est montré */
  setTimeout(function () {
    revealEls.forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in"); });
  }, 3000);

  /* ---------- Pause des animations (WCAG 2.2.2) ---------- */
  var mt = $("#motion-toggle");
  if (mt) {
    var setPaused = function (on) { document.documentElement.classList.toggle("is-paused", on); mt.setAttribute("aria-pressed", String(on)); storage("hangar-paused", on ? "1" : "0"); };
    setPaused(storage("hangar-paused") === "1");
    mt.addEventListener("click", function () { setPaused(mt.getAttribute("aria-pressed") !== "true"); });
  }

  if ($("#hours")) setInterval(renderHours, 60000);

  /* ---------- Façade Google Maps : l'iframe n'est créée qu'au clic ---------- */
  $$(".map-facade").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var f = document.createElement("iframe");
      f.title = a.title;
      f.src = a.dataset.embed;
      f.referrerPolicy = "no-referrer-when-downgrade";
      f.allowFullscreen = true;
      a.replaceWith(f);
    });
  });

  /* ---------- Démarrage ---------- */
  $("#year").textContent = new Date().getFullYear();
  var urlLang = new URLSearchParams(location.search).get("lang");
  var initial = urlLang || storage("hangar-lang") || "fr";
  applyLang(initial === "en" ? "en" : "fr");
})();
