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
  var activeCat = "all";

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
    var btn = $("#lang-toggle");
    btn.textContent = lang === "en" ? "FR" : "EN";
    btn.setAttribute("aria-label", lang === "en" ? "Passer en français" : "Switch to English");
    document.title = lang === "en"
      ? "Le Hangar Fumoir — Maple-smoked Texas-style BBQ · Lévis"
      : "Le Hangar Fumoir — BBQ style texan fumé à l'érable · Lévis";
    storage("hangar-lang", lang);
    renderTabs();
    renderMenu();
    renderHours();
  }

  $("#lang-toggle").addEventListener("click", function () { applyLang(lang === "en" ? "fr" : "en"); });

  /* ---------- En-tête ---------- */
  var header = $(".header");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = $("#burger"), nav = $("#nav");
  function closeNav() { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () {
    var open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    header.classList.add("is-solid");
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeNav); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

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
      return '<button class="tab" role="tab" type="button" data-cat="' + c.id + '" aria-selected="' + sel + '" tabindex="' + (sel ? 0 : -1) + '">'
        + esc(c[lang]) + "<small>" + n + "</small></button>";
    }).join("");
  }

  function price(item) {
    if (item.price === null || item.price === undefined) {
      return '<span class="item__price item__price--ask">' + esc(t("menu.ask")) + "</span>";
    }
    var p = lang === "en" ? "$" + item.price : item.price + " $";
    var unit = item[lang].unit ? "<small>" + esc(item[lang].unit) + "</small>" : "";
    return '<span class="item__price">' + p + unit + "</span>";
  }

  function itemHtml(item, i) {
    var d = item[lang];
    var badge = item.badge === "hot" ? '<span class="badge badge--hot">' + esc(t("menu.hot")) + "</span>"
              : item.badge === "limited" ? '<span class="badge">' + esc(t("menu.limited")) + "</span>" : "";
    return '<article class="item" style="animation-delay:' + (i * 40) + 'ms">'
      + '<h3 class="item__name">' + esc(d.name) + badge + "</h3>"
      + price(item)
      + '<p class="item__desc">' + esc(d.desc) + "</p></article>";
  }

  function renderMenu() {
    var html = "";
    if (activeCat === "all") {
      var i = 0;
      C.categories.forEach(function (c) {
        var items = C.menu.filter(function (m) { return m.cat === c.id; });
        if (!items.length) return;
        html += '<h3 class="menu-group">' + esc(c[lang]) + "</h3>";
        items.forEach(function (m) { html += itemHtml(m, i++); });
      });
    } else {
      C.menu.filter(function (m) { return m.cat === activeCat; }).forEach(function (m, i) { html += itemHtml(m, i); });
    }
    listEl.innerHTML = html;
  }

  tabsEl.addEventListener("click", function (e) {
    var b = e.target.closest(".tab");
    if (!b) return;
    activeCat = b.dataset.cat;
    renderTabs(); renderMenu();
    $('.tab[data-cat="' + activeCat + '"]', tabsEl).focus();
  });
  tabsEl.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var tabs = $$(".tab", tabsEl);
    var idx = tabs.indexOf(document.activeElement);
    var next = tabs[(idx + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    next.click();
  });

  /* ---------- Heures ---------- */
  function fmt(hhmm) {
    if (lang === "fr") return hhmm.replace(":", " h ");
    var p = hhmm.split(":"), h = +p[0], ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + (p[1] !== "00" ? ":" + p[1] : "") + " " + ap;
  }
  function toMin(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }

  function renderHours() {
    var days = t("days"), now = new Date(), today = now.getDay();
    var order = [1, 2, 3, 4, 5, 6, 0]; // lundi en premier
    $("#hours").innerHTML = "<tbody>" + order.map(function (d) {
      var h = C.hours[d];
      var val = h ? fmt(h[0]) + " – " + fmt(h[1]) : t("visit.closedDay");
      return '<tr class="' + (d === today ? "is-today" : "") + '"><td>' + days[d] + "</td><td>" + val + "</td></tr>";
    }).join("") + "</tbody>";

    var h = C.hours[today], mins = now.getHours() * 60 + now.getMinutes();
    var open = !!h && mins >= toMin(h[0]) && mins < toMin(h[1]);
    var badge = $("#open-badge");
    badge.textContent = open ? t("visit.open") : t("visit.closed");
    badge.className = "open-badge " + (open ? "is-open" : "is-closed");
  }

  /* ---------- Formulaire traiteur ---------- */
  var form = $("#catering-form"), status = $("#form-status");
  var dateInput = $("#f-date");
  var tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().slice(0, 10);

  function check(input) {
    var field = input.closest(".field"), ok = true, v = input.value.trim();
    if (input.name === "name") ok = v.length > 1;
    if (input.name === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    if (input.name === "date") ok = !!v && v >= dateInput.min;
    if (input.name === "guests") ok = +v >= 10;
    field.classList.toggle("is-invalid", !ok);
    input.setAttribute("aria-invalid", String(!ok));
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
    var bad = required.filter(function (i) { return !check(i); });
    if (bad.length) { setStatus(t("form.fix"), "err"); bad[0].focus(); return; }

    var fd = new FormData(form);
    var meats = fd.getAll("meats").join(", ") || "—";

    if (!C.formEndpoint) {
      var body = [
        "Nom : " + fd.get("name"),
        "Courriel : " + fd.get("email"),
        "Téléphone : " + (fd.get("phone") || "—"),
        "Date : " + fd.get("date"),
        "Personnes : " + fd.get("guests"),
        "Événement : " + fd.get("type"),
        "Viandes : " + meats,
        "",
        fd.get("message") || ""
      ].join("\n");
      var subject = "Demande de traiteur — " + fd.get("date") + " — " + fd.get("guests") + " pers.";
      window.location.href = "mailto:" + C.contact.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      setStatus(t("form.mailto"), "ok");
      return;
    }

    var btn = $("button[type=submit]", form);
    btn.disabled = true; setStatus(t("form.sending"));
    fd.set("meats", meats);
    fd.set("_subject", "Demande de traiteur — " + fd.get("date"));
    fetch(C.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); setStatus(t("form.ok"), "ok"); })
      .catch(function () { setStatus(t("form.fail") + " " + C.contact.email + ".", "err"); })
      .then(function () { btn.disabled = false; });
  });

  /* ---------- Démarrage ---------- */
  $("#year").textContent = new Date().getFullYear();
  var urlLang = new URLSearchParams(location.search).get("lang");
  var initial = urlLang || storage("hangar-lang") || "fr";
  applyLang(initial === "en" ? "en" : "fr");
})();
