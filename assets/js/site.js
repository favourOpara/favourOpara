/* ==========================================================================
   Favour Sobechi Opara / Security Operations Console
   Zero-dependency behaviour layer.
   Replaces: AOS, Typed.js, PureCounter, Waypoints, Isotope, imagesLoaded,
             GLightbox, Swiper and Bootstrap JS.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- Theme */

  var THEME_KEY = "fo-theme";

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "light" ? "#f4f5f8" : "#08090c");
    var btn = $(".theme-btn");
    if (btn) btn.setAttribute("aria-label", "Switch to " + (t === "light" ? "dark" : "light") + " theme");
  }

  var stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(stored || "dark");

  var themeBtn = $(".theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ----------------------------------------------------------- Boot screen */

  (function boot() {
    var el = $(".boot");
    if (!el) return;

    if (reduced) {
      el.hidden = true;
      return;
    }

    var lines = $$(".boot__log li", el);
    var bar = $(".boot__bar i", el);
    var i = 0;

    function step() {
      if (i < lines.length) {
        lines[i].classList.add("is-in");
        i++;
        if (bar) bar.style.width = (i / lines.length) * 100 + "%";
        setTimeout(step, 170);
      } else {
        setTimeout(function () {
          el.classList.add("is-done");
          setTimeout(function () { el.hidden = true; }, 700);
        }, 260);
      }
    }

    setTimeout(step, 120);

    // Never let the overlay trap the page.
    setTimeout(function () {
      el.classList.add("is-done");
      setTimeout(function () { el.hidden = true; }, 700);
    }, 3200);
  })();

  /* ------------------------------------------------- Scroll reveal (AOS) */

  var revealables = $$("[data-reveal]");

  if ("IntersectionObserver" in window && !reduced) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        revealIO.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    revealables.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ------------------------------------------------------- Role typewriter */

  (function roles() {
    var host = $("#role");
    if (!host) return;

    var items = (host.getAttribute("data-roles") || "").split("|").filter(Boolean);
    if (!items.length) return;

    if (reduced) {
      host.textContent = items[0];
      return;
    }

    var ri = 0, ci = 0, erasing = false;

    function tick() {
      var word = items[ri];

      if (!erasing) {
        ci++;
        host.textContent = word.slice(0, ci);
        if (ci === word.length) {
          erasing = true;
          return setTimeout(tick, 1750);
        }
        return setTimeout(tick, 52);
      }

      ci--;
      host.textContent = word.slice(0, ci);
      if (ci === 0) {
        erasing = false;
        ri = (ri + 1) % items.length;
        return setTimeout(tick, 320);
      }
      return setTimeout(tick, 26);
    }

    setTimeout(tick, 900);
  })();

  /* ------------------------------------------- Count-up metrics (counter) */

  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    if (reduced) { el.textContent = String(target); return; }

    var dur = 1250;
    var t0 = null;

    function frame(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      // easeOutExpo
      var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = String(Math.round(target * e));
      if (p < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        countUp(en.target);
        countIO.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { countIO.observe(el); });
  } else {
    counters.forEach(countUp);
  }

  /* --------------------------------------------------- Segmented meters */

  var TICKS = 20;

  $$("[data-meter]").forEach(function (host) {
    var v = parseFloat(host.getAttribute("data-meter")) || 0;
    var lit = Math.round((v / 100) * TICKS);
    var frag = document.createDocumentFragment();

    for (var t = 0; t < TICKS; t++) {
      var seg = document.createElement("i");
      seg.style.setProperty("--t", String(t));
      if (t < lit) seg.className = "on";
      frag.appendChild(seg);
    }

    host.appendChild(frag);
  });

  /* Light up meters and timeline nodes as they arrive. Both react to .is-in,
     so they can share one observer. */
  var lightUp = $$(".cap-group").concat($$(".tl__item"));

  if ("IntersectionObserver" in window) {
    var meterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        meterIO.unobserve(en.target);
      });
    }, { threshold: 0.25 });
    lightUp.forEach(function (el) { meterIO.observe(el); });
  } else {
    lightUp.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ----------------------------------------------------- Hero node field */

  (function field() {
    var cv = $("#field");
    if (!cv || reduced) return;

    var ctx = cv.getContext("2d");
    if (!ctx) return;

    var nodes = [];
    var w = 0, h = 0, dpr = 1;
    var pointer = { x: -9999, y: -9999 };
    var running = true;
    var raf = null;

    function palette() {
      return root.getAttribute("data-theme") === "light"
        ? { node: "91, 61, 245", link: "91, 61, 245" }
        : { node: "150, 170, 255", link: "124, 92, 255" };
    }

    var colors = palette();

    function size() {
      var r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.min(Math.round((w * h) / 15000), 110);
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.5 + 0.7
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      var LINK = 132;

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        // Gentle drift toward the cursor, reads as traffic converging.
        var pdx = pointer.x - n.x;
        var pdy = pointer.y - n.y;
        var pd2 = pdx * pdx + pdy * pdy;
        if (pd2 < 26000 && pd2 > 1) {
          var pull = 0.00028;
          n.vx += pdx * pull;
          n.vy += pdy * pull;
        }

        // Cap velocity so the field never runs away.
        var sp = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (sp > 0.55) {
          n.vx = (n.vx / sp) * 0.55;
          n.vy = (n.vy / sp) * 0.55;
        }

        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x;
          var dy = n.y - m.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d > LINK) continue;

          ctx.strokeStyle = "rgba(" + colors.link + "," + (1 - d / LINK) * 0.3 + ")";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(" + colors.node + ", 0.65)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) raf = requestAnimationFrame(draw);
    }

    size();
    draw();

    var rt = null;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { size(); colors = palette(); }, 180);
    });

    window.addEventListener("pointermove", function (e) {
      var r = cv.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    }, { passive: true });

    window.addEventListener("pointerleave", function () {
      pointer.x = pointer.y = -9999;
    });

    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        setTimeout(function () { colors = palette(); }, 0);
      });
    }

    // Stop painting when the hero is off-screen or the tab is hidden.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !running) {
            running = true;
            raf = requestAnimationFrame(draw);
          } else if (!en.isIntersecting && running) {
            running = false;
            if (raf) cancelAnimationFrame(raf);
          }
        });
      }).observe(cv);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    });
  })();

  /* ------------------------------------------------------- Nav + progress */

  var nav = $(".nav");
  var bar = $(".progress i");
  var toTop = $(".to-top");
  var spines = $$(".tl");

  var sections = $$("[data-section]");
  var navLinks = $$(".nav__links a");
  var railBtns = $$(".rail button");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (nav) nav.classList.toggle("is-stuck", y > 12);
    if (bar) bar.parentNode.style.setProperty("--p", (max > 0 ? (y / max) * 100 : 0) + "%");
    if (toTop) toTop.classList.toggle("is-on", y > window.innerHeight * 0.8);

    // Timeline spine fill tracks the viewport centre. There is one spine per
    // column, so every one has to be driven independently.
    var mid = window.innerHeight * 0.55;
    spines.forEach(function (spine) {
      var r = spine.getBoundingClientRect();
      if (!r.height) return;
      var p = (mid - r.top) / r.height;
      spine.style.setProperty("--fill", Math.max(0, Math.min(1, p)) * 100 + "%");
    });

    // Active section: the last one whose top has passed the trigger line.
    var line = y + window.innerHeight * 0.32;
    var current = sections.length ? sections[0].id : null;

    sections.forEach(function (s) {
      if (s.offsetTop <= line) current = s.id;
    });

    navLinks.forEach(function (a) {
      a.setAttribute("aria-current", a.getAttribute("href") === "#" + current ? "true" : "false");
    });

    railBtns.forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-to") === current ? "true" : "false");
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener("resize", onScroll);
  onScroll();

  railBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var t = document.getElementById(b.getAttribute("data-to"));
      if (t) t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* --------------------------------------------------------- Mobile sheet */

  (function sheet() {
    var burger = $(".burger");
    var panel = $(".sheet");
    if (!burger || !panel) return;

    function set(open) {
      panel.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (nav) nav.classList.toggle("is-sheet", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    burger.addEventListener("click", function () {
      set(!panel.classList.contains("is-open"));
    });

    /* Anchor jumps are swallowed while the body is scroll-locked, so drive the
       scroll manually once the lock has lifted. */
    $$("a", panel).forEach(function (a, i) {
      a.style.setProperty("--i", String(i));

      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href") || "";
        var target = href.charAt(0) === "#" ? document.getElementById(href.slice(1)) : null;

        set(false);
        if (!target) return;

        e.preventDefault();
        requestAnimationFrame(function () {
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
          if (history.replaceState) history.replaceState(null, "", href);
        });
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        set(false);
        burger.focus();
      }
    });
  })();

  /* ------------------------------------------------- Risk matrix (custom) */

  (function matrix() {
    var grid = $("#matrix");
    var src = $("#riskData");
    if (!grid || !src) return;

    var L_LABELS = ["Rare", "Unlikely", "Possible", "Likely", "Almost certain"];
    var I_LABELS = ["Insignificant", "Minor", "Moderate", "Major", "Severe"];

    var items = $$("li", src).map(function (li, idx) {
      return {
        n: idx + 1,
        l: Math.max(1, Math.min(5, parseInt(li.getAttribute("data-l"), 10) || 1)),
        i: Math.max(1, Math.min(5, parseInt(li.getAttribute("data-i"), 10) || 1)),
        title: li.getAttribute("data-title") || "",
        desc: li.getAttribute("data-desc") || "",
        domain: li.getAttribute("data-domain") || "",
        href: li.getAttribute("data-href") || ""
      };
    });

    function band(score) {
      if (score <= 4) return 1;
      if (score <= 8) return 2;
      if (score <= 12) return 3;
      if (score <= 17) return 4;
      return 5;
    }

    var cells = {};
    var frag = document.createDocumentFragment();

    // Rows run severe (impact 5) at the top down to insignificant (1).
    for (var imp = 5; imp >= 1; imp--) {
      var ylab = document.createElement("div");
      ylab.className = "matrix__ylab";
      ylab.textContent = I_LABELS[imp - 1];
      frag.appendChild(ylab);

      for (var lik = 1; lik <= 5; lik++) {
        var score = imp * lik;
        var cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("data-band", String(band(score)));
        cell.setAttribute("role", "gridcell");
        cell.setAttribute("aria-label",
          I_LABELS[imp - 1] + " impact, " + L_LABELS[lik - 1] + " likelihood, score " + score);

        var sc = document.createElement("span");
        sc.className = "cell__score";
        sc.textContent = score;
        cell.appendChild(sc);

        cells[lik + ":" + imp] = cell;
        frag.appendChild(cell);
      }
    }

    // Bottom axis: spacer + five likelihood labels.
    frag.appendChild(document.createElement("div"));
    for (var k = 0; k < 5; k++) {
      var xlab = document.createElement("div");
      xlab.className = "matrix__xlab";
      xlab.textContent = L_LABELS[k];
      frag.appendChild(xlab);
    }

    grid.appendChild(frag);

    /* Read-out panel */
    var out = {
      badge: $("#roBadge"),
      title: $("#roTitle"),
      desc: $("#roDesc"),
      lik: $("#roLik"),
      imp: $("#roImp"),
      score: $("#roScore"),
      domain: $("#roDomain"),
      link: $("#roLink")
    };

    var pins = [];

    function select(item, pin) {
      pins.forEach(function (p) {
        p.classList.toggle("is-on", p === pin);
        p.setAttribute("aria-pressed", String(p === pin));
      });

      var score = item.l * item.i;
      var b = band(score);
      var heat = "var(--heat-" + b + ")";
      var word = ["Low", "Moderate", "Elevated", "High", "Critical"][b - 1];

      var panel = $(".readout");
      if (panel) panel.style.setProperty("--cell", heat);

      if (out.badge) out.badge.textContent = word;
      if (out.title) out.title.textContent = item.title;
      if (out.desc) out.desc.textContent = item.desc;
      if (out.lik) out.lik.textContent = L_LABELS[item.l - 1];
      if (out.imp) out.imp.textContent = I_LABELS[item.i - 1];
      if (out.score) out.score.textContent = score + " / 25";
      if (out.domain) out.domain.textContent = item.domain;

      if (out.link) {
        if (item.href) {
          out.link.href = item.href;
          out.link.hidden = false;
        } else {
          out.link.hidden = true;
        }
      }
    }

    items.forEach(function (item, idx) {
      var cell = cells[item.l + ":" + item.i];
      if (!cell) return;

      var pin = document.createElement("button");
      pin.type = "button";
      pin.className = "pin";
      pin.textContent = item.n;
      pin.style.setProperty("--d", String(idx));
      pin.setAttribute("aria-pressed", "false");
      pin.setAttribute("title", item.title);
      pin.setAttribute("aria-label",
        item.title + ": " + L_LABELS[item.l - 1] + " likelihood, " + I_LABELS[item.i - 1] + " impact");

      pin.addEventListener("click", function () { select(item, pin); });
      pin.addEventListener("mouseenter", function () { select(item, pin); });
      pin.addEventListener("focus", function () { select(item, pin); });

      cell.appendChild(pin);
      pins.push(pin);
    });

    if (items.length) select(items[0], pins[0]);
  })();

  /* ------------------------------------------------ Case filters (Isotope) */

  (function filters() {
    var bar = $(".filters");
    var wrap = $(".cases");
    if (!bar || !wrap) return;

    var cards = $$(".case", wrap);

    // Label each chip with a live count.
    $$("button", bar).forEach(function (b) {
      var f = b.getAttribute("data-filter");
      var n = f === "*"
        ? cards.length
        : cards.filter(function (c) { return c.getAttribute("data-cat") === f; }).length;

      var sup = document.createElement("sup");
      sup.textContent = n;
      b.appendChild(sup);

      b.addEventListener("click", function () {
        $$("button", bar).forEach(function (o) {
          o.setAttribute("aria-pressed", String(o === b));
        });

        cards.forEach(function (c) {
          var show = f === "*" || c.getAttribute("data-cat") === f;

          if (reduced) {
            c.hidden = !show;
            return;
          }

          if (show) {
            c.hidden = false;
            requestAnimationFrame(function () { c.classList.remove("is-out"); });
          } else {
            c.classList.add("is-out");
            setTimeout(function () {
              if (c.classList.contains("is-out")) c.hidden = true;
            }, 300);
          }
        });
      });
    });
  })();

  /* ---------------------------------------------------------- Copy buttons */

  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");

      function done() {
        btn.classList.add("is-done");
        setTimeout(function () { btn.classList.remove("is-done"); }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
        return;
      }

      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    });
  });

  /* -------------------------------------------------------- Current year */

  var yr = $("#year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
