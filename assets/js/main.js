const EMAIL = "hello@priyank.design";

// ---------- Toast ----------
const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);
let toastTimer;

function showToast(html) {
  toast.innerHTML = html;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---------- Copy email (press C anywhere, or click buttons) ----------
function copyFallback() {
  const ta = document.createElement("textarea");
  ta.value = EMAIL;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {}
  ta.remove();
  return ok;
}

async function copyEmail() {
  let copied = false;
  try {
    await navigator.clipboard.writeText(EMAIL);
    copied = true;
  } catch {
    copied = copyFallback();
  }
  if (copied) {
    showToast('<span class="ok">✓</span>' + EMAIL + " copied to clipboard");
  } else {
    showToast("Email: " + EMAIL);
  }
}

document.addEventListener("keydown", (e) => {
  const t = e.target;
  const typing =
    t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key.toLowerCase() === "c") copyEmail();
});

document.querySelectorAll("[data-copy-email]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    await copyEmail();
    const prev = btn.textContent;
    btn.textContent = "Copied";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = prev;
      btn.classList.remove("copied");
    }, 1800);
  });
});

// ---------- Header border on scroll ----------
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// ---------- Mobile nav (hamburger) ----------
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const bar = header.querySelector(".wrap, .wrap-wide");
  const nav = header.querySelector(".site-nav");
  if (!bar || !nav) return;

  const btn = document.createElement("button");
  btn.className = "nav-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Toggle menu");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "<span></span><span></span><span></span>";
  bar.appendChild(btn);

  const close = () => {
    header.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) close();
  });
})();

// ---------- Card spotlight (cursor-following highlight) ----------
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });
});

// ---------- Magnetic buttons ----------
const fine = window.matchMedia("(pointer: fine)").matches;
const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (fine && !noMotion) {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      btn.style.transform = `translate(${dx * 3}px, ${dy * 3}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

// ---------- Scroll reveal (staggered, IO + scroll fallback) ----------
(function () {
  const pending = new Set(document.querySelectorAll(".reveal"));
  if (!pending.size) return;

  function show(el, i) {
    el.style.setProperty("--rd", i * 70 + "ms");
    el.classList.add("in");
    pending.delete(el);
  }

  function sweep() {
    if (!pending.size) return;
    const limit = window.innerHeight * 0.96;
    let i = 0;
    pending.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0) show(el, i++);
    });
    if (!pending.size) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  }

  let throttle = 0;
  function onScroll() {
    if (throttle) return;
    throttle = setTimeout(() => {
      throttle = 0;
      sweep();
    }, 80);
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        entries.forEach((e) => {
          if (!e.isIntersecting || !pending.has(e.target)) return;
          show(e.target, i++);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    pending.forEach((el) => io.observe(el));
  }

  // Fallback path for browsers/webviews that throttle IntersectionObserver
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  sweep();
})();

// ---------- Lightbox ----------
(function () {
  const triggers = document.querySelectorAll("figure.shot img, [data-lightbox]");
  if (!triggers.length) return;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML =
    '<button class="lb-close" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.remove("scroll");
    // very tall artifacts (e.g. full landing pages) get a scrollable
    // full-width view instead of being shrunk to fit the viewport
    const mode = () => {
      if (lbImg.naturalHeight > 2400 && lbImg.naturalHeight / lbImg.naturalWidth > 2) {
        lb.classList.add("scroll");
      }
    };
    if (lbImg.complete) mode();
    else lbImg.onload = mode;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  triggers.forEach((t) => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      const src = t.dataset && t.dataset.lightbox ? t.dataset.lightbox : t.src;
      if (!src) return;
      open(src, t.alt);
    });
  });

  function close() {
    lb.classList.remove("open", "scroll");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  lb.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) close();
  });
})();

// ---------- Footer local time (IST) ----------
(function () {
  const el = document.getElementById("local-time");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
  const tick = () => (el.textContent = fmt.format(new Date()) + " IST");
  tick();
  setInterval(tick, 30000);
})();

// ---------- Text scramble (shared helper) ----------
const SCRAMBLE_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/#*+";

function scrambleText(el, dur = 800) {
  if (noMotion) return;
  if (el.dataset.busy === "1") return;
  const txt = el.dataset.final || el.textContent;
  el.dataset.final = txt;
  el.dataset.busy = "1";
  const t0 = performance.now();
  function frame(now) {
    const p = Math.min(1, (now - t0) / dur);
    const cut = Math.floor(p * txt.length);
    let out = "";
    for (let i = 0; i < txt.length; i++) {
      const ch = txt[i];
      out +=
        i < cut || ch === " "
          ? ch
          : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(frame);
    else {
      el.textContent = txt;
      el.dataset.busy = "0";
    }
  }
  requestAnimationFrame(frame);
}

// ---------- Hero entrance choreography ----------
(function () {
  const wrap = document.querySelector(".hero .wrap");
  if (!wrap) return;
  const role = document.getElementById("hero-role");
  if (noMotion) return;
  const els = Array.from(wrap.children);
  els.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.filter = "blur(6px)";
  });
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const ease = "cubic-bezier(0.2, 0.6, 0.2, 1)";
      els.forEach((el, i) => {
        el.style.transition = `opacity 0.55s ${ease}, transform 0.55s ${ease}, filter 0.55s ${ease}`;
        el.style.transitionDelay = i * 85 + "ms";
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      if (role) setTimeout(() => scrambleText(role, 900), 400);
      // clear inline styles so CSS hover transitions (avatar) work afterwards
      setTimeout(() => {
        els.forEach((el) => {
          el.style.transition = "";
          el.style.transitionDelay = "";
          el.style.transform = "";
          el.style.filter = "";
        });
      }, 85 * els.length + 700);
    })
  );
})();

// ---------- Name scramble on hover ----------
(function () {
  const words = document.querySelectorAll("h1 [data-scramble]");
  if (!words.length || !fine || noMotion) return;
  words[0].closest("h1").addEventListener("pointerenter", () => {
    words.forEach((w) => scrambleText(w, 450));
  });
})();

// ---------- Hero dot grid (cursor reactive) ----------
(function () {
  const hero = document.querySelector(".hero");
  const canvas = document.querySelector(".hero-grid");
  if (!hero || !canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const SP = 26;
  const R = 170;
  let W = 0,
    H = 0,
    px = -9999,
    py = -9999,
    glow = 0,
    glowTarget = 0,
    raf = 0,
    dirty = true,
    base = null;

  // static grid is rendered once offscreen, then blitted each frame;
  // per-frame work is only the ~150 dots within cursor range
  function buildBase() {
    base = document.createElement("canvas");
    base.width = Math.max(1, W * DPR);
    base.height = Math.max(1, H * DPR);
    const b = base.getContext("2d");
    b.setTransform(DPR, 0, 0, DPR, 0, 0);
    b.fillStyle = "rgba(255,255,255,0.045)";
    for (let x = SP / 2; x < W; x += SP) {
      for (let y = SP / 2; y < H; y += SP) {
        b.beginPath();
        b.arc(x, y, 1.1, 0, 6.2832);
        b.fill();
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(base, 0, 0, W, H);
    if (glow < 0.01) return;
    const g = ctx.createRadialGradient(px, py, 0, px, py, 240);
    g.addColorStop(0, "rgba(240,163,68," + 0.09 * glow + ")");
    g.addColorStop(1, "rgba(240,163,68,0)");
    ctx.fillStyle = g;
    ctx.fillRect(Math.max(0, px - 240), Math.max(0, py - 240), 480, 480);
    const kx0 = Math.max(0, Math.floor((px - R - SP / 2) / SP));
    const ky0 = Math.max(0, Math.floor((py - R - SP / 2) / SP));
    for (let x = SP / 2 + kx0 * SP; x < W && x <= px + R; x += SP) {
      for (let y = SP / 2 + ky0 * SP; y < H && y <= py + R; y += SP) {
        let t = Math.max(0, 1 - Math.hypot(x - px, y - py) / R);
        t = t * t * glow;
        if (t < 0.02) continue;
        ctx.beginPath();
        ctx.arc(x, y, 1.1 + 0.8 * t, 0, 6.2832);
        ctx.fillStyle =
          "rgba(" +
          Math.round(255 - 15 * t) +
          "," +
          Math.round(255 - 92 * t) +
          "," +
          Math.round(255 - 187 * t) +
          "," +
          (0.045 + 0.5 * t) +
          ")";
        ctx.fill();
      }
    }
  }

  function loop() {
    const settled = Math.abs(glowTarget - glow) < 0.005;
    if (settled && !dirty) {
      raf = 0;
      return;
    }
    glow = settled ? glowTarget : glow + (glowTarget - glow) * 0.08;
    draw();
    dirty = false;
    raf = requestAnimationFrame(loop);
  }

  function resize() {
    const r = hero.getBoundingClientRect();
    W = r.width;
    H = r.height;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    buildBase();
    draw();
  }

  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(hero);
  else window.addEventListener("resize", resize, { passive: true });

  if (fine && !noMotion) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      glowTarget = 1;
      dirty = true;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener("pointerleave", () => {
      glowTarget = 0;
      dirty = true;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }
})();

// ---------- Live status line (IST) ----------
(function () {
  const el = document.getElementById("status-line");
  if (!el) return;
  let timeF, hourF;
  try {
    timeF = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    hourF = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return;
  }
  function phrase(h) {
    if (h < 6) return "probably asleep";
    if (h < 10) return "morning coffee, inbox open";
    if (h < 19) return "probably designing right now";
    return "winding down, still reachable";
  }
  function tick() {
    const d = new Date();
    const h = parseInt(hourF.format(d), 10) % 24;
    el.textContent = "It's " + timeF.format(d) + " in Bengaluru, " + phrase(h);
  }
  tick();
  setInterval(tick, 30000);
})();

// ---------- Avatar spin ----------
(function () {
  const av = document.getElementById("avatar");
  if (!av) return;
  let clicks = 0,
    timer;
  av.addEventListener("click", () => {
    if (!noMotion) {
      av.classList.remove("spin");
      void av.offsetWidth;
      av.classList.add("spin");
    }
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => (clicks = 0), 1600);
    if (clicks === 5) {
      clicks = 0;
      showToast("Okay, that's enough. Press <kbd>C</kbd> instead");
    }
  });
  av.addEventListener("animationend", () => av.classList.remove("spin"));
})();

// ---------- Intro keyword previews ----------
(function () {
  const kws = document.querySelectorAll(".kw[data-kw]");
  if (!kws.length || !fine) return;
  const DATA = {
    domains: [
      { img: "assets/images/home/2afef239_Getmega.jpg", label: "Mobile · Getmega", href: "projects/getmega.html" },
      { img: "assets/images/home/56f3ae8c_khiladipro.jpg", label: "Web · Khiladipro", href: "projects/khiladipro.html" },
      { img: "assets/images/home/414e7003_ceda.jpg", label: "Dashboards · SEDP", href: "projects/sedp-dashboard.html" },
    ],
    aitools: [
      { img: "assets/images/home/c78e4d10_icon128.png", label: "Hobby · YT extension", href: "#hobby" },
    ],
  };
  const card = document.createElement("div");
  card.className = "kw-card";
  document.body.appendChild(card);
  let hideTimer;

  function show(kw) {
    const items = DATA[kw.dataset.kw];
    if (!items) return;
    card.innerHTML = items
      .map(
        (it) =>
          '<a href="' +
          it.href +
          '"><img src="' +
          it.img +
          '" alt="" loading="lazy"><span class="kw-label">' +
          it.label +
          "</span></a>"
      )
      .join("");
    const r = kw.getBoundingClientRect();
    const half = card.offsetWidth / 2 || 130;
    const cx = Math.max(half + 14, Math.min(window.innerWidth - half - 14, r.left + r.width / 2));
    card.style.left = cx + "px";
    if (r.top < card.offsetHeight + 24) {
      card.classList.add("below");
      card.style.top = r.bottom + 10 + "px";
    } else {
      card.classList.remove("below");
      card.style.top = r.top - 10 + "px";
    }
    card.classList.add("show");
  }
  function scheduleHide() {
    hideTimer = setTimeout(() => card.classList.remove("show"), 180);
  }
  kws.forEach((kw) => {
    kw.addEventListener("pointerenter", () => {
      clearTimeout(hideTimer);
      show(kw);
    });
    kw.addEventListener("pointerleave", scheduleHide);
  });
  card.addEventListener("pointerenter", () => clearTimeout(hideTimer));
  card.addEventListener("pointerleave", scheduleHide);
})();

// ---------- Marquee peek cards ----------
(function () {
  const items = document.querySelectorAll(".marquee-item[data-peek]");
  if (!items.length || !fine) return;
  const peek = document.createElement("div");
  peek.className = "peek";
  peek.innerHTML = '<img alt=""><span><b></b>View case study ↗</span>';
  document.body.appendChild(peek);
  const img = peek.querySelector("img");
  const title = peek.querySelector("b");
  items.forEach((item) => {
    item.addEventListener("pointerenter", () => {
      img.src = item.dataset.peek;
      title.textContent = item.dataset.peekTitle || "";
      const r = item.getBoundingClientRect();
      const cx = Math.max(128, Math.min(window.innerWidth - 128, r.left + r.width / 2));
      peek.style.left = cx + "px";
      if (r.top < 240) {
        peek.classList.add("below");
        peek.style.top = r.bottom + 12 + "px";
      } else {
        peek.classList.remove("below");
        peek.style.top = r.top - 12 + "px";
      }
      peek.classList.add("show");
    });
    item.addEventListener("pointerleave", () => peek.classList.remove("show"));
  });
})();

// ---------- Command palette ----------
(function () {
  const inProjects = /\/projects\//.test(location.pathname);
  const root = inProjects ? "../" : "";
  const onHome = !inProjects && !/about\.html/.test(location.pathname);
  const sec = (hash) => (onHome ? hash : root + "index.html" + hash);
  const RESUME =
    "https://drive.google.com/file/d/0B0y_QT-8mXwgRFhmWEdUWkpKOHc/view?usp=sharing&resourcekey=0-Q4joErTGFsTqmVHZnpbYYw";

  const ACTIONS = [
    { ico: "→", label: "Go to work", act: () => (location.href = sec("#work")) },
    { ico: "→", label: "Go to about", act: () => (location.href = root + "about.html") },
    { ico: "→", label: "Go to contact", act: () => (location.href = sec("#contact")) },
    { ico: "@", label: "Copy email", kbd: "C", act: () => copyEmail() },
    { ico: "✉", label: "Email me", act: () => (location.href = "mailto:" + EMAIL) },
    { ico: "↗", label: "Open LinkedIn", act: () => window.open("https://www.linkedin.com/in/priyank1205/", "_blank", "noopener") },
    { ico: "↗", label: "Open resume", act: () => window.open(RESUME, "_blank", "noopener") },
  ];

  const overlay = document.createElement("div");
  overlay.className = "cmdk";
  overlay.innerHTML =
    '<div class="cmdk-box" role="dialog" aria-modal="true" aria-label="Command menu">' +
    '<input class="cmdk-input" type="text" placeholder="Type a command..." spellcheck="false" aria-label="Search commands">' +
    '<ul class="cmdk-list"></ul>' +
    '<div class="cmdk-foot"><span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>esc</kbd> close</span></div>' +
    "</div>";
  document.body.appendChild(overlay);
  const input = overlay.querySelector(".cmdk-input");
  const list = overlay.querySelector(".cmdk-list");
  let filtered = ACTIONS,
    active = 0;

  function render() {
    if (!filtered.length) {
      list.innerHTML = '<li class="cmdk-empty">No matches. Try "email"</li>';
      return;
    }
    list.innerHTML = filtered
      .map(
        (a, i) =>
          '<li class="cmdk-item' +
          (i === active ? " active" : "") +
          '" data-i="' +
          i +
          '"><span class="ico">' +
          a.ico +
          "</span>" +
          a.label +
          (a.kbd ? "<kbd>" + a.kbd + "</kbd>" : "") +
          "</li>"
      )
      .join("");
  }
  function openPal() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    input.value = "";
    filtered = ACTIONS;
    active = 0;
    render();
    input.focus();
  }
  function closePal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    input.blur();
  }
  function run(a) {
    closePal();
    a.act();
  }

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    filtered = ACTIONS.filter((a) => a.label.toLowerCase().includes(q));
    active = 0;
    render();
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      active = Math.min(filtered.length - 1, active + 1);
      render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      active = Math.max(0, active - 1);
      render();
    } else if (e.key === "Enter" && filtered[active]) {
      run(filtered[active]);
    }
  });
  list.addEventListener("click", (e) => {
    const li = e.target.closest(".cmdk-item");
    if (li) run(filtered[+li.dataset.i]);
  });
  list.addEventListener("pointermove", (e) => {
    const li = e.target.closest(".cmdk-item");
    if (li && +li.dataset.i !== active) {
      active = +li.dataset.i;
      render();
    }
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closePal();
      return;
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      overlay.classList.contains("open") ? closePal() : openPal();
      return;
    }
    const t = e.target;
    const typing =
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "/") {
      e.preventDefault();
      openPal();
    }
  });
})();

// ---------- Typed easter egg ----------
(function () {
  let buf = "";

  function confetti() {
    if (noMotion) return;
    const c = document.createElement("canvas");
    c.style.cssText = "position:fixed;inset:0;z-index:130;pointer-events:none";
    document.body.appendChild(c);
    const x = c.getContext("2d");
    const W = (c.width = window.innerWidth);
    const H = (c.height = window.innerHeight);
    const colors = ["#f0a344", "#4ade80", "#7ab8ff", "#ebeae6"];
    const parts = Array.from({ length: 130 }, () => ({
      x: W / 2,
      y: H * 0.65,
      vx: (Math.random() - 0.5) * 16,
      vy: -6 - Math.random() * 11,
      s: 4 + Math.random() * 5,
      r: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.3,
      col: colors[(Math.random() * colors.length) | 0],
    }));
    const t0 = performance.now();
    (function fr(now) {
      x.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.vx *= 0.99;
        p.r += p.vr;
        x.save();
        x.translate(p.x, p.y);
        x.rotate(p.r);
        x.fillStyle = p.col;
        x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
        x.restore();
      });
      if (now - t0 < 1800) requestAnimationFrame(fr);
      else c.remove();
    })(t0);
  }

  document.addEventListener("keydown", (e) => {
    const t = e.target;
    const typing =
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-4);
    if (buf === "hire") {
      buf = "";
      confetti();
      showToast('<span class="ok">✓</span>Excellent choice. Opening your email app');
      setTimeout(() => (location.href = "mailto:" + EMAIL), 1200);
    }
  });
})();
