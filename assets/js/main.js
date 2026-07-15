const EMAIL = "hello@priyank.design";

// pointer and motion gates, shared by every module below
const fine = window.matchMedia("(pointer: fine)").matches;
const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Sound engine (sfx) ----------
// Every sound is synthesized from two primitives: a filtered oscillator voice
// and a filtered noise burst. All pitches sit in D major pentatonic, so any
// two sounds that overlap stay consonant. Quiet, soft, short: felt more than heard.
const sfx = (() => {
  const KEY = "pf-sfx";
  let ctx = null,
    master = null,
    noiseBuf = null;
  let muted = false,
    voices = 0,
    count = 0;
  const last = {};
  try {
    muted = localStorage.getItem(KEY) === "off";
  } catch {}

  function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.15;
    // gentle safety ceiling so stacked voices never get harsh
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.knee.value = 12;
    comp.ratio.value = 6;
    comp.attack.value = 0.002;
    comp.release.value = 0.15;
    master.connect(comp);
    comp.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }

  // browsers gate audio behind a gesture: unlock on the very first one
  ["pointerdown", "keydown", "touchstart"].forEach((ev) =>
    document.addEventListener(
      ev,
      () => {
        ensure();
        if (ctx && ctx.state !== "running") ctx.resume();
      },
      { once: true, capture: true, passive: true }
    )
  );

  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend();
    else ctx.resume();
  });

  // oscillator voice: gain envelope, optional lowpass, optional detuned partner
  function tone(o) {
    const t = ctx.currentTime + (o.at || 0);
    const dur = o.dur || 0.12;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(o.peak || 0.25, t + (o.attack || 0.003));
    g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    let out = g;
    if (o.cutoff) {
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = o.cutoff;
      g.connect(f);
      out = f;
    }
    out.connect(master);
    const mk = (cents, share) => {
      const osc = ctx.createOscillator();
      osc.type = o.type || "sine";
      osc.frequency.setValueAtTime(o.freq, t);
      if (o.glideTo)
        osc.frequency.exponentialRampToValueAtTime(o.glideTo, t + (o.glideDur || 0.05));
      if (cents) osc.detune.value = cents;
      const vg = ctx.createGain();
      vg.gain.value = share;
      osc.connect(vg);
      vg.connect(g);
      voices++;
      osc.onended = () => voices--;
      osc.start(t);
      osc.stop(t + dur + 0.03);
    };
    mk(0, o.detune ? 0.72 : 1);
    if (o.detune) mk(o.detune, 0.35);
  }

  // filtered white-noise burst for tactility
  function noiseBurst(o) {
    const t = ctx.currentTime + (o.at || 0);
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = o.type || "bandpass";
    f.frequency.value = o.freq;
    f.Q.value = o.q || 1;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(o.peak, t + (o.attack || 0.001));
    g.gain.exponentialRampToValueAtTime(0.0008, t + o.dur);
    src.connect(f);
    f.connect(g);
    g.connect(master);
    voices++;
    src.onended = () => voices--;
    src.start(t);
    src.stop(t + o.dur + 0.03);
  }

  // builders: a bare tick, a pitch slide, and a soft press with sheen and texture
  const rnd = (a, b) => a + Math.random() * (b - a);
  const blip = (freq, dur, peak, at) => tone({ freq, dur, peak, at, attack: 0.003 });
  const slide = (from, to, dur, peak, glideDur) =>
    tone({ freq: from, glideTo: to, glideDur, dur, peak, attack: 0.002 });
  const press = (body, sheen, sheenPeak, cutoff) => {
    tone({ freq: body, type: "triangle", cutoff, attack: 0.002, dur: 0.09, peak: 0.3 });
    tone({ freq: sheen, attack: 0.002, dur: 0.05, peak: sheenPeak });
    noiseBurst({ freq: 1800, q: 0.8, dur: 0.01, peak: 0.08 });
  };

  // D major pentatonic, Hz: D4 293.66, E4 329.63, A4 440, D5 587.33, E5 659.26,
  // F#5 739.99, A5 880, B5 987.77, D6 1174.66, E6 1318.51, A6 1760

  // ascending run for the interest chips, one degree per chip, low to high
  const PLUCK_SCALE = [587.33, 659.26, 739.99, 880, 987.77, 1174.66];

  const RECIPES = {
    hover: () => blip(1174.66, 0.045, 0.1),
    tick: () => blip(739.99, 0.055, 0.14),
    tap: () => press(587.33, 1174.66, 0.1, 2200),
    confirm: () => press(880, 1760, 0.08, 2600),
    chime: () => {
      tone({ freq: 880, detune: 7, attack: 0.008, dur: 0.26, peak: 0.32, cutoff: 3500 });
      tone({ freq: 1318.51, detune: 7, attack: 0.008, dur: 0.32, peak: 0.3, cutoff: 3500, at: 0.09 });
    },
    palOpen: () => {
      tone({ freq: 587.33, glideTo: 880, glideDur: 0.06, attack: 0.004, dur: 0.16, peak: 0.26, cutoff: 2600 });
      noiseBurst({ freq: 1400, type: "lowpass", attack: 0.05, dur: 0.14, peak: 0.05 });
    },
    palClose: () => slide(880, 587.33, 0.13, 0.2, 0.055),
    lbOpen: () => {
      tone({ freq: 293.66, glideTo: 295.72, glideDur: 0.3, attack: 0.012, dur: 0.35, peak: 0.26, cutoff: 1600 });
      tone({ freq: 440, glideTo: 443.08, glideDur: 0.3, attack: 0.012, dur: 0.35, peak: 0.16, cutoff: 1600 });
    },
    lbClose: () => {
      tone({ freq: 293.66, glideTo: 291.62, glideDur: 0.15, attack: 0.004, dur: 0.17, peak: 0.18, cutoff: 1600 });
      tone({ freq: 440, glideTo: 436.95, glideDur: 0.15, attack: 0.004, dur: 0.17, peak: 0.12, cutoff: 1600 });
    },
    navOpen: () => slide(329.63, 659.26, 0.11, 0.26, 0.03),
    navClose: () => slide(659.26, 329.63, 0.1, 0.2, 0.035),
    on: () => {
      blip(587.33, 0.06, 0.26);
      blip(880, 0.09, 0.3, 0.045);
    },
    off: () => {
      blip(880, 0.06, 0.26);
      blip(587.33, 0.09, 0.2, 0.045);
    },
    pop: () => slide(440, 880, 0.1, 0.26, 0.028),
    sparkle: () => {
      [587.33, 739.99, 880, 987.77, 1174.66].forEach((f, i) =>
        tone({ freq: f, detune: 8, attack: 0.005, dur: 0.22, peak: 0.22, cutoff: 3800, at: i * 0.055 })
      );
      tone({ freq: 1760, attack: 0.005, dur: 0.3, peak: 0.1, at: 0.275 });
      noiseBurst({ freq: 6000, q: 2, at: 0.1, dur: 0.25, peak: 0.045 });
    },

    // ---- hover palette ----
    // A small family of hover voices, chosen by audition. Crystalline and
    // airy throughout; each sound is bound to a semantic role (see the
    // HOVER_MAP below) so the material tells you what kind of thing you
    // are touching. Per-play randomness keeps rapid repeats alive.

    // struck crystal: high strike, inharmonic glass partial, resonant ping
    // — prominent things: buttons, project cards
    glassTick: () => {
      const f = 1760 * rnd(0.995, 1.005);
      tone({ freq: f, dur: 0.09, peak: 0.15, attack: 0.002 });
      tone({ freq: f * 2.32, dur: 0.045, peak: 0.045, attack: 0.001 });
      noiseBurst({ freq: 5600, q: 9, dur: 0.03, peak: 0.06 });
    },
    // water droplet: fast upward sine bend — the avatar's one playful note
    bubble: () => {
      const f0 = 440 * rnd(0.94, 1.06);
      tone({ freq: f0, glideTo: f0 * rnd(2.1, 2.4), glideDur: 0.05, dur: 0.1, peak: 0.26, attack: 0.004 });
    },
    // no pitch at all: a soft band of air sweeping upward — the email pill
    airBrush: () => {
      const t = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf;
      const f = ctx.createBiquadFilter();
      f.type = "bandpass";
      f.Q.value = 1.8;
      f.frequency.setValueAtTime(600, t);
      f.frequency.exponentialRampToValueAtTime(2600, t + 0.12);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.14, t + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.16);
      src.connect(f);
      f.connect(g);
      g.connect(master);
      voices++;
      src.onended = () => voices--;
      src.start(t, rnd(0, 0.5)); // random buffer offset: every brush differs
      src.stop(t + 0.18);
    },
    // fast rising chirp: two octaves in 50ms — the learned cue meaning
    // "a thumbnail preview will appear here"
    zipChirp: () => {
      const f0 = 587.33 * rnd(0.97, 1.03);
      tone({ freq: f0, glideTo: f0 * 4, glideDur: 0.05, cutoff: 3400, dur: 0.07, peak: 0.13, attack: 0.002 });
    },
    // three quiet high chimes with micro-offsets plus a dusting of hiss
    // — reserved for the availability badge, its one special moment
    stardust: () => {
      [1174.66, 1760, 2637.02].forEach((f, i) =>
        tone({ freq: f * rnd(0.995, 1.005), dur: 0.14 + i * 0.05, peak: 0.055, attack: 0.005, at: i * rnd(0.012, 0.022) })
      );
      noiseBurst({ freq: 9000, q: 1, dur: 0.09, peak: 0.03, attack: 0.02 });
    },
    // barely-there fabric tick: one grain of filtered noise, no pitch —
    // the near-subliminal default for every ordinary link
    velvetTick: () => {
      noiseBurst({ freq: 4200 * rnd(0.9, 1.1), q: 0.8, dur: 0.014, peak: 0.11 });
    },
    // analog wah: quiet saw through a resonant lowpass — the rail
    synthWah: () => {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = 293.66;
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.Q.value = 9;
      f.frequency.setValueAtTime(320, t);
      f.frequency.exponentialRampToValueAtTime(2100, t + 0.09);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.11, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.14);
      osc.connect(f);
      f.connect(g);
      g.connect(master);
      voices++;
      osc.onended = () => voices--;
      osc.start(t);
      osc.stop(t + 0.16);
    },

    // ---- interest chips (about page) ----
    // kalimba pluck: the step picks a scale degree, so the chip row plays
    // like an instrument — sweeping across it strums the pentatonic upward
    pluck: (step = 0) => {
      const f = PLUCK_SCALE[step % PLUCK_SCALE.length] * rnd(0.997, 1.003);
      tone({ freq: f, dur: 0.16, peak: 0.18, attack: 0.002 });
      noiseBurst({ freq: 3600, q: 2.5, dur: 0.012, peak: 0.05 });
    },
    // the same note bending up an octave — the chip's little click reward
    pluckPop: (step = 0) => {
      const f = PLUCK_SCALE[step % PLUCK_SCALE.length];
      tone({ freq: f, glideTo: f * 2, glideDur: 0.05, dur: 0.16, peak: 0.24, attack: 0.002 });
      noiseBurst({ freq: 4800, q: 3, dur: 0.02, peak: 0.06 });
    },
  };

  const GAP = { hover: 90, tick: 45 };
  // hover palette throttles like hover; stardust's longer tail gets more room
  ["glassTick", "bubble", "airBrush", "zipChirp", "stardust", "velvetTick", "synthWah"].forEach(
    (n) => (GAP[n] = 90)
  );
  GAP.stardust = 140;
  GAP.pluck = 30; // tight enough that a fast strum still voices every chip

  // returns true only if the sound actually fired; arg reaches the recipe
  // (only the parameterized ones read it — see pluck/pluckPop)
  function play(name, arg) {
    if (muted) return false;
    const recipe = RECIPES[name];
    if (!recipe) return false;
    const now = performance.now();
    if (now - (last[name] || 0) < (GAP[name] || 60)) return false;
    ensure();
    if (!ctx) return false;
    if (ctx.state !== "running") {
      ctx.resume();
      return false; // drop this one, the next will sound
    }
    if (voices >= 12) return false;
    last[name] = now;
    count++;
    recipe(arg);
    return true;
  }

  function setMuted(m) {
    muted = m;
    try {
      localStorage.setItem(KEY, m ? "off" : "on");
    } catch {}
    document.dispatchEvent(new CustomEvent("sfx:muted", { detail: m }));
  }

  function toggle() {
    if (muted) {
      setMuted(false);
      play("on");
    } else {
      play("off"); // farewell note first, then silence
      setMuted(true);
    }
    return !muted;
  }

  return {
    play,
    toggle,
    setMuted,
    get muted() {
      return muted;
    },
    get count() {
      return count;
    },
  };
})();

// sound toggle in the header nav, plus one delegated listener for hover ticks
(function () {
  const nav = document.querySelector(".site-nav");
  if (nav) {
    const btn = document.createElement("button");
    btn.className = "sfx-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle interface sounds");
    btn.innerHTML =
      '<span class="sfx-eq" aria-hidden="true"><span class="bar"></span><span class="bar"></span><span class="bar"></span></span>' +
      '<span class="sfx-lbl">Sound on</span>';
    const lbl = btn.querySelector(".sfx-lbl");
    const sync = () => {
      btn.setAttribute("aria-pressed", String(!sfx.muted));
      btn.title = sfx.muted ? "Turn sounds on" : "Turn sounds off";
      lbl.textContent = sfx.muted ? "Sound off" : "Sound on";
    };
    btn.addEventListener("click", () => sfx.toggle());
    document.addEventListener("sfx:muted", sync);
    sync();
    nav.appendChild(btn);

    // Audio cue: browsers gate sound until the document has user activation.
    // A link click propagates activation to the document it navigates to, so
    // anyone who arrived through the nav already has sound and needs no cue.
    // Keying off the activation itself rather than off which page we are on
    // covers both: internal navigation stays silent, while a cold landing, a
    // reload, or a deep link straight into a case study still gets the cue.
    const activated = navigator.userActivation
      ? navigator.userActivation.hasBeenActive
      : false;
    if (!sfx.muted && !activated) {
      document.body.classList.add("audio-locked");
      const hint = document.createElement("div");
      hint.className = "sfx-hint";
      const verb = window.matchMedia("(pointer: coarse)").matches ? "Tap" : "Click";
      hint.innerHTML =
        '<span class="ic" aria-hidden="true">\u{1F50A}</span>' + verb + " anywhere to enable sound";
      document.body.appendChild(hint);
      const showTimer = setTimeout(() => hint.classList.add("show"), 900);
      let dismissed = false;
      const dismiss = () => {
        if (dismissed) return;
        dismissed = true;
        clearTimeout(showTimer);
        hint.classList.remove("show");
        document.body.classList.remove("audio-locked");
        setTimeout(() => hint.remove(), 350);
        ["pointerdown", "keydown", "touchstart"].forEach((ev) =>
          document.removeEventListener(ev, dismiss, true)
        );
      };
      ["pointerdown", "keydown", "touchstart"].forEach((ev) =>
        document.addEventListener(ev, dismiss, { capture: true, passive: true })
      );
    }
  }

  // Semantic hover map: the sound names what kind of thing you're touching.
  // velvetTick is the near-silent default for ordinary links; glassTick marks
  // prominent targets; zipChirp is the learned "thumbnail preview" cue; the
  // one-offs (synthWah, airBrush, bubble, stardust) stay bound to their
  // unique interactions so they feel like discoveries.
  const HOVER_MAP = [
    // [selector, sound] — more specific selectors first
    [".badge-wrap", "stardust"],
    [".status-row.status-open", "stardust"], // availability, same voice as the badge
    [".status-row.status-loc", "velvetTick"],
    ["#avatar", "bubble"],
    [".kw[data-kw]", "zipChirp"],
    [".marquee-item", "zipChirp"],
    [".case-nav a", "zipChirp"], // same interaction as the marquee: peek at a project
    [".t-src", "zipChirp"],
    [".rail-link", "synthWah"],
    [".fm-rail a", "synthWah"],
    ["[data-copy-email]", "airBrush"],
    [".email-pill a", "airBrush"],
    [".btn", "glassTick"],
    [".project-card", "glassTick"],
    [
      ".site-nav a, .brand, .nav-toggle, .sfx-toggle, .link-mono, .ghost-hint a, .back-link, .tl-item",
      "velvetTick",
    ],
  ];

  // position of an interest chip within its row = its scale degree
  const chipStep = (chip) => [...chip.parentElement.children].indexOf(chip);

  if (fine)
    document.addEventListener("pointerover", (e) => {
      const chip = e.target.closest(".chip-row .chip");
      if (chip && !chip.contains(e.relatedTarget)) {
        sfx.play("pluck", chipStep(chip));
        return;
      }
      for (const [sel, name] of HOVER_MAP) {
        const el = e.target.closest(sel);
        if (el && !el.contains(e.relatedTarget)) {
          sfx.play(name);
          return;
        }
      }
    });

  // clicking a chip pops its note an octave with a squash-and-stretch boing
  // (works on touch too, where there is no hover to strum)
  document.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip-row .chip");
    if (!chip) return;
    sfx.play("pluckPop", chipStep(chip));
    if (noMotion) return;
    chip.classList.remove("boing");
    void chip.offsetWidth; // restart the animation on rapid re-clicks
    chip.classList.add("boing");
    // timer, not animationend: the event never comes if the chip leaves
    // the viewport mid-pop, and the class would stick
    clearTimeout(chip._boingTimer);
    chip._boingTimer = setTimeout(() => chip.classList.remove("boing"), 500);
  });
})();

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
    sfx.play("chime");
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
    sfx.play(open ? "navOpen" : "navClose");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (header.classList.contains("nav-open")) sfx.play("navClose");
      close();
    }
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
    sfx.play("lbOpen");
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
    if (!lb.classList.contains("open")) return;
    sfx.play("lbClose");
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

// ---------- Hero dot grid (cursor reactive; any section with a .hero-grid canvas) ----------
(function () {
  const canvas = document.querySelector(".hero-grid");
  const hero = canvas ? canvas.parentElement : null;
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
      sfx.play("sparkle");
      showToast("Okay, that's enough. Press <kbd>C</kbd> instead");
    } else {
      sfx.play("pop");
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

// ---------- Peek cards (marquee links, timeline links) ----------
(function () {
  const items = document.querySelectorAll("[data-peek]");
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
    { ico: "@", label: "Copy email", kbd: "C", act: () => copyEmail(), sfx: false },
    { ico: "✉", label: "Email me", act: () => (location.href = "mailto:" + EMAIL) },
    { ico: "↗", label: "Open LinkedIn", act: () => window.open("https://www.linkedin.com/in/priyank1205/", "_blank", "noopener") },
    { ico: "↗", label: "Open resume", act: () => window.open(RESUME, "_blank", "noopener") },
    { ico: "♪", label: "Toggle sounds", act: () => sfx.toggle(), sfx: false },
    { ico: "✦", label: 'Psst: try typing "hire"', act: () => hireEgg(), sfx: false },
  ];

  // on case study pages, chapters become jumpable commands
  document.querySelectorAll(".fm-ch[id]").forEach((ch) => {
    const h = ch.querySelector("h2");
    const idx = ch.querySelector(".idx");
    if (!h) return;
    const num = idx ? idx.textContent.split("/")[0].trim() : "";
    const title = h.childNodes[0].textContent.trim();
    ACTIONS.push({
      ico: "#",
      label: "Jump to " + (num ? num + ": " : "") + title,
      act: () => (location.hash = "#" + ch.id),
    });
  });

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
      list.innerHTML = '<li class="cmdk-empty">No matches. Try "email", or maybe "hire"</li>';
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
    sfx.play("palOpen");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    input.value = "";
    filtered = ACTIONS;
    active = 0;
    render();
    input.focus();
  }
  function closePal(silent) {
    if (!silent && overlay.classList.contains("open")) sfx.play("palClose");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    input.blur();
  }
  function run(a) {
    if (a.sfx !== false) sfx.play("confirm");
    closePal(true);
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
      const prev = active;
      active = Math.min(filtered.length - 1, active + 1);
      if (active !== prev) sfx.play("tick");
      render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = active;
      active = Math.max(0, active - 1);
      if (active !== prev) sfx.play("tick");
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
function hireEgg() {
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
  confetti();
  sfx.play("sparkle");
  showToast('<span class="ok">✓</span>Excellent choice. Opening your email app');
  setTimeout(() => (location.href = "mailto:" + EMAIL), 1200);
}

(function () {
  let buf = "";
  document.addEventListener("keydown", (e) => {
    const t = e.target;
    const typing =
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-4);
    if (buf === "hire") {
      buf = "";
      hireEgg();
    }
  });
})();

// ---------- About hero entrance ----------
(function () {
  const hero = document.querySelector(".about-main .case-hero");
  if (!hero || noMotion) return;
  const els = [
    hero.querySelector(".section-label"),
    hero.querySelector("h1"),
    hero.querySelector(".case-sub"),
    hero.querySelector(".hero-status"),
    hero.querySelector(".about-photo"),
  ].filter(Boolean);
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
      const open = document.getElementById("status-open");
      const loc = document.getElementById("status-loc");
      setTimeout(() => {
        if (open) scrambleText(open, 700);
        if (loc) setTimeout(() => scrambleText(loc, 550), 150);
      }, 450);
      // clear inline styles so CSS hover transitions (portrait) work afterwards
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

// ---------- About status clock (live IST, blinking colon) ----------
(function () {
  const el = document.getElementById("about-clock");
  if (!el) return;
  let fmt;
  try {
    fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return;
  }
  function tick() {
    const parts = fmt.format(new Date()).split(":");
    el.innerHTML = parts[0] + '<span class="tick">:</span>' + parts[1] + " IST";
  }
  tick();
  setInterval(tick, 30000);
})();

// ---------- About portrait easter egg ----------
(function () {
  const photo = document.querySelector(".about-photo");
  if (!photo) return;
  photo.addEventListener("click", () => {
    sfx.play("pop");
    showToast("100% human, verified by absolutely no one");
  });
})();

// ---------- Timeline date decode on hover ----------
(function () {
  const items = document.querySelectorAll(".tl-item");
  if (!items.length || !fine || noMotion) return;
  items.forEach((it) => {
    const date = it.querySelector(".tl-date");
    if (!date) return;
    it.addEventListener("pointerenter", () => scrambleText(date, 380));
  });
})();

// ---------- Creed decode on reveal ----------
(function () {
  const lis = document.querySelectorAll(".about-creed li");
  if (!lis.length || noMotion || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        lis.forEach((li, i) => setTimeout(() => scrambleText(li, 480), 200 + i * 170));
      });
    },
    { threshold: 0.4 }
  );
  io.observe(lis[0].closest(".about-creed"));
})();

// ---------- Case study: hero entrance ----------
(function () {
  const inner = document.querySelector(".fm-hero-inner");
  if (!inner || noMotion) return;
  const els = [
    inner.querySelector(".back-link"),
    inner.querySelector(".fm-kicker"),
    inner.querySelector("h1"),
  ].filter(Boolean);
  const head = document.querySelector(".fm-head .wrap");
  if (head) els.push(...head.children);
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
        el.style.transitionDelay = i * 80 + "ms";
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      const kicker = inner.querySelector(".fm-kicker");
      if (kicker) setTimeout(() => scrambleText(kicker, 600), 350);
      setTimeout(() => {
        els.forEach((el) => {
          el.style.transition = "";
          el.style.transitionDelay = "";
          el.style.transform = "";
          el.style.filter = "";
        });
      }, 80 * els.length + 700);
    })
  );
})();

// ---------- Case study: reading progress ----------
(function () {
  if (!document.querySelector(".case-body")) return;
  const bar = document.createElement("div");
  bar.className = "case-progress";
  document.body.appendChild(bar);
  let raf = 0;
  function update() {
    raf = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
  }
  const queue = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue, { passive: true });
  update();
})();

// ---------- Case study: chapter rail (scrollspy) ----------
(function () {
  const chs = Array.from(document.querySelectorAll(".fm-ch[id]"));
  if (chs.length < 2) return;
  const title = (ch) => {
    const h = ch.querySelector("h2");
    return h ? h.childNodes[0].textContent.trim() : "";
  };
  const rail = document.createElement("nav");
  rail.className = "fm-rail";
  rail.setAttribute("aria-label", "Chapters");
  rail.innerHTML = chs
    .map(
      (ch, i) =>
        '<a href="#' + ch.id + '"><b>' + String(i + 1).padStart(2, "0") + '</b><span class="t">' + title(ch) + "</span></a>"
    )
    .join("");
  document.body.appendChild(rail);
  const links = rail.querySelectorAll("a");

  let raf = 0;
  function spy() {
    raf = 0;
    const cut = window.innerHeight * 0.45;
    let on = -1;
    chs.forEach((ch, i) => {
      if (ch.getBoundingClientRect().top < cut) on = i;
    });
    links.forEach((a, i) => a.classList.toggle("on", i === on));
    rail.classList.toggle("show", on >= 0);
  }
  const queue = () => {
    if (!raf) raf = requestAnimationFrame(spy);
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue, { passive: true });
  spy();
})();

// ---------- Case study: chapter index + fin decode ----------
(function () {
  const els = document.querySelectorAll(".fm-ch .idx, .fin");
  if (!els.length || noMotion || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        scrambleText(e.target, 520);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
})();

// ---------- Home: project index decode + year tag scramble ----------
(function () {
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;

  // index chips decode as their card scrolls into view
  const pis = document.querySelectorAll(".project-thumb .pi");
  if (pis.length && !noMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          setTimeout(() => scrambleText(e.target, 650), 260);
        });
      },
      { threshold: 0.4 }
    );
    pis.forEach((pi) => io.observe(pi));
  }

  // year tag decodes on card hover
  if (fine && !noMotion) {
    cards.forEach((card) => {
      const tag = card.querySelector(".tag");
      if (!tag) return;
      tag.dataset.final = tag.textContent;
      card.addEventListener("mouseenter", () => scrambleText(tag, 420));
    });
  }
})();

// ---------- Home: hobby ghost slot (cycles experiment ideas) ----------
(function () {
  const slot = document.getElementById("ghost-slot");
  if (!slot || noMotion || !("IntersectionObserver" in window)) return;
  const IDEAS = ["TBD", "a Figma plugin?", "an AI toy?", "a tiny game?", "your idea?"];
  let i = 0;
  let timer = null;

  function next() {
    i = (i + 1) % IDEAS.length;
    slot.dataset.final = IDEAS[i];
    scrambleText(slot, 500);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!timer) timer = setInterval(next, 2800);
        } else if (timer) {
          clearInterval(timer);
          timer = null;
        }
      });
    },
    { threshold: 0.3 }
  );
  io.observe(slot);
})();

// ---------- Contact: rail handle decode on hover ----------
(function () {
  const links = document.querySelectorAll(".rail-link");
  if (!links.length || !fine || noMotion) return;
  links.forEach((link) => {
    const handle = link.querySelector(".rail-handle");
    if (!handle) return;
    handle.dataset.final = handle.textContent;
    link.addEventListener("pointerenter", () => scrambleText(handle, 380));
  });
})();
