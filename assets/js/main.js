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
