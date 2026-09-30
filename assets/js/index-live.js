/* ============================================================================
   Homepage, Live: the behaviour

   Everything here is something a visitor can play. A small synthesizer gives
   the page its voice; the name and the email are its instruments; four
   product pieces run the way their products did; two clients speak in turn;
   the career is a timeline with a playhead. Nothing sounds before the first
   gesture, and the switch in the top bar turns it all off.
   ========================================================================== */

(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const restart = (node, className) => {
    node.classList.remove(className);
    void node.offsetWidth;
    node.classList.add(className);
  };

  // D major pentatonic, two octaves up from D4: the page's only scale, so any
  // two notes that overlap still agree.
  const SCALE = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.26, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98, 1760];

  // The palette is borrowed from the products.
  const ACCENTS = {
    kp: [255, 122, 99],
    sedp: [232, 80, 104],
    gm: [60, 192, 156],
    mp: [211, 164, 134],
    live: [74, 222, 128],
    ink: [245, 245, 246]
  };
  const CYCLE = ['kp', 'sedp', 'gm', 'mp'];
  const rgb = name => ACCENTS[name].join(' ');

  /* --- Sound --------------------------------------------------------------- */

  const sound = (() => {
    const KEY = 'pa-sound';
    let on = true;
    try {
      on = localStorage.getItem(KEY) !== 'off';
    } catch {
      // Storage can be blocked; sound simply starts on.
    }
    let ctx = null;
    let out = null;
    let noise = null;
    let voices = 0;
    let unlocked = false;

    function ensure() {
      if (ctx) return;
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      ctx = new Context();
      out = ctx.createGain();
      out.gain.value = 0.18;
      const ceiling = ctx.createDynamicsCompressor();
      ceiling.threshold.value = -18;
      ceiling.knee.value = 12;
      ceiling.ratio.value = 5;
      ceiling.attack.value = 0.003;
      ceiling.release.value = 0.2;
      // A short, dark echo gives every note a little room.
      const echo = ctx.createDelay(1);
      echo.delayTime.value = 0.19;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.22;
      const dark = ctx.createBiquadFilter();
      dark.type = 'lowpass';
      dark.frequency.value = 2400;
      const wet = ctx.createGain();
      wet.gain.value = 0.2;
      out.connect(ceiling);
      out.connect(echo);
      echo.connect(dark);
      dark.connect(feedback);
      feedback.connect(echo);
      dark.connect(wet);
      wet.connect(ceiling);
      ceiling.connect(ctx.destination);
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }

    // Browsers only start audio from a gesture: every gesture is a chance.
    ['pointerdown', 'keydown', 'touchstart'].forEach(type => document.addEventListener(type, () => {
      unlocked = true;
      if (!on) return;
      ensure();
      if (ctx && ctx.state !== 'running') ctx.resume();
    }, { capture: true, passive: true }));

    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden) ctx.suspend();
      else if (on) ctx.resume();
    });

    function osc({ freq, type = 'sine', dur = 0.5, peak = 0.2, attack = 0.003, cutoff = 0, at = 0, glide = 0 }) {
      const t = ctx.currentTime + at;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.0001, t);
      env.gain.exponentialRampToValueAtTime(peak, t + attack);
      env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      let node = env;
      if (cutoff) {
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = cutoff;
        env.connect(filter);
        node = filter;
      }
      node.connect(out);
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (glide) o.frequency.exponentialRampToValueAtTime(glide, t + dur * 0.6);
      o.connect(env);
      voices++;
      o.onended = () => { voices--; };
      o.start(t);
      o.stop(t + dur + 0.05);
    }

    function hiss({ freq = 3000, q = 1.2, dur = 0.02, peak = 0.04, at = 0 }) {
      const t = ctx.currentTime + at;
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = freq;
      filter.Q.value = q;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.0001, t);
      env.gain.exponentialRampToValueAtTime(peak, t + 0.002);
      env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(filter);
      filter.connect(env);
      env.connect(out);
      voices++;
      src.onended = () => { voices--; };
      src.start(t);
      src.stop(t + dur + 0.05);
    }

    function ready() {
      if (!on || !unlocked) return false;
      ensure();
      if (!ctx) return false;
      if (ctx.state !== 'running') {
        ctx.resume();
        return false;
      }
      return voices < 48;
    }

    return {
      get on() { return on; },
      get unlocked() { return unlocked; },
      set(value) {
        on = value;
        try {
          localStorage.setItem(KEY, value ? 'on' : 'off');
        } catch {
          // Not remembered; still applied.
        }
        if (value && unlocked) {
          ensure();
          if (ctx) ctx.resume();
        }
      },
      // A kalimba tine: a pure fundamental, a bright inharmonic overtone that
      // dies fast, and the click of a thumb.
      pluck(freq, vel = 1) {
        if (!ready()) return;
        osc({ freq, dur: 1.5, peak: 0.24 * vel, attack: 0.002 });
        osc({ freq: freq * 2, dur: 0.5, peak: 0.05 * vel });
        osc({ freq: freq * 5.4, dur: 0.12, peak: 0.035 * vel, cutoff: 9000 });
        hiss({ freq: 2800, q: 1.5, dur: 0.012, peak: 0.03 * vel });
      },
      tick(freq = 1760, peak = 0.06) {
        if (!ready()) return;
        osc({ freq, dur: 0.06, peak, attack: 0.001 });
      },
      pop() {
        if (!ready()) return;
        osc({ freq: 520, glide: 900, dur: 0.16, peak: 0.12, type: 'triangle', cutoff: 3000 });
      },
      swoosh() {
        if (!ready()) return;
        hiss({ freq: 1200, q: 0.6, dur: 0.24, peak: 0.05 });
      },
      chime() {
        if (!ready()) return;
        [5, 7, 9, 12].forEach((n, i) => osc({ freq: SCALE[n], dur: 1.2, peak: 0.12, at: i * 0.07 }));
      },
      fanfare() {
        if (!ready()) return;
        SCALE.forEach((freq, i) => osc({ freq, dur: 1.1, peak: 0.09, at: i * 0.045 }));
      }
    };
  })();

  const toggle = $('[data-sound-toggle]');
  const toggleLabel = $('[data-sound-label]');
  function paintToggle() {
    toggle.setAttribute('aria-pressed', String(sound.on));
    toggleLabel.textContent = sound.on ? 'Sound on' : 'Sound off';
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      sound.set(!sound.on);
      paintToggle();
      if (sound.on) setTimeout(() => sound.chime(), 80);
    });
    paintToggle();
  }

  /* --- Toast, copy, clock, chrome ------------------------------------------ */

  const toastEl = $('[data-toast]');
  let toastTimer = 0;
  function toast(message, ms = 2600) {
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), ms);
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const field = document.createElement('textarea');
      field.value = value;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
  }

  $$('[data-copy]').forEach(button => {
    let reset = 0;
    button.addEventListener('click', async () => {
      await copyText(button.dataset.copy);
      button.classList.add('is-copied');
      sound.chime();
      toast(`Copied ${button.dataset.copy}`);
      clearTimeout(reset);
      reset = setTimeout(() => button.classList.remove('is-copied'), 1800);
    });
  });

  const clocks = $$('[data-clock]');
  if (clocks.length) {
    const format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
    const tick = () => clocks.forEach(clock => { clock.textContent = `${format.format(new Date())} IST`; });
    tick();
    setInterval(tick, 30000);
  }

  /* Chrome */
  const top = $('[data-top]');
  const onScroll = () => top.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $$('.tile').forEach(tile => tile.addEventListener('pointermove', e => {
    const b = tile.getBoundingClientRect();
    tile.style.setProperty('--mx', `${e.clientX - b.left}px`);
    tile.style.setProperty('--my', `${e.clientY - b.top}px`);
  }));

  /* Hero: the name is an instrument */
  const hero = $('[data-hero]');
  const nameEl = $('[data-name]');
  const pointer = { x: -9999, y: -9999, inside: false };

  const field = (() => {
    const canvas = $('[data-field]');
    const g = canvas.getContext('2d');
    const GAP = 28;
    let w = 0, h = 0, dots = [], ripples = [], raf = 0, visible = true;
    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = (h % GAP) / 2; y < h; y += GAP) for (let x = (w % GAP) / 2; x < w; x += GAP) dots.push(x, y);
      draw(performance.now());
    }
    function draw(now) {
      g.clearRect(0, 0, w, h);
      ripples = ripples.filter(r => now - r.t < 1600);
      const px = pointer.inside ? pointer.x : -9999;
      const py = pointer.inside ? pointer.y : -9999;
      for (let i = 0; i < dots.length; i += 2) {
        const x = dots[i], y = dots[i + 1];
        let a = 0.07 * Math.min(1, y / (h * 0.7));
        let r = 255, gr = 255, b = 255, s = 1;
        const dp = Math.hypot(x - px, y - py);
        if (dp < 180) a += 0.24 * (1 - dp / 180) ** 2;
        for (const rp of ripples) {
          const age = (now - rp.t) / 1000;
          const band = Math.exp(-((Math.hypot(x - rp.x, y - rp.y) - age * 640) ** 2) / 968) * (1 - age / 1.6);
          if (band > 0.02) { a += band * 0.9; s += band * 1.8; [r, gr, b] = rp.rgb; }
        }
        if (a < 0.02) continue;
        g.fillStyle = `rgba(${r},${gr},${b},${Math.min(1, a).toFixed(3)})`;
        const size = 1.5 * s;
        g.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }
    function loop(now) { draw(now); raf = ripples.length && visible ? requestAnimationFrame(loop) : 0; }
    function poke() { if (!raf && visible) raf = requestAnimationFrame(loop); }
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) poke(); }).observe(canvas);
    let t = 0;
    window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(resize, 120); });
    resize();
    return { poke, ripple(x, y, color) { if (reduced.matches) return; ripples.push({ x, y, rgb: color, t: performance.now() }); if (ripples.length > 10) ripples.shift(); poke(); } };
  })();

  const keys = $$('.key', nameEl).map((el, i) => {
    const accent = CYCLE[i % CYCLE.length];
    el.style.setProperty('--c', `rgb(${rgb(accent)})`);
    return { el, i, letter: el.textContent.toLowerCase(), hz: SCALE[i], color: ACCENTS[accent], cx: 0, cy: 0, e: 0, v: 0, heat: 0, lit: 0 };
  });
  const keyOf = new Map(keys.map(k => [k.el, k]));
  function measure() {
    const box = hero.getBoundingClientRect();
    keys.forEach(k => { const r = k.el.getBoundingClientRect(); k.cx = r.left - box.left + r.width / 2; k.cy = r.top - box.top + r.height / 2; });
  }
  let running = false, last = 0;
  function wake() { if (running) return; running = true; last = performance.now(); requestAnimationFrame(step); }
  function step(now) {
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;
    let busy = false;
    keys.forEach(k => {
      let target = 0;
      if (pointer.inside && !reduced.matches) {
        const dx = pointer.x - k.cx, dy = (pointer.y - k.cy) * 1.3;
        target = Math.exp(-(dx * dx + dy * dy) / 30000);
      }
      k.heat += (target - k.heat) * Math.min(1, dt * 12);
      if (Math.abs(target - k.heat) > 0.003) busy = true;
      const a = -300 * k.e - 10 * k.v;
      k.v += a * dt; k.e += k.v * dt;
      if (Math.abs(k.e) < 0.001 && Math.abs(k.v) < 0.01) { k.e = 0; k.v = 0; } else busy = true;
      k.el.style.setProperty('--wg', (600 + k.heat * 260 + Math.abs(k.e) * 160).toFixed(1));
      k.el.style.setProperty('--wd', clamp(100 + k.heat * 12 + k.e * 26, 75, 125).toFixed(1));
      k.el.style.transform = k.e ? `translateY(${(-k.e * 0.05).toFixed(4)}em)` : '';
    });
    if (busy) requestAnimationFrame(step); else running = false;
  }
  const hintText = $('[data-hint-text]');
  if (window.matchMedia('(hover: none)').matches) hintText.textContent = 'Play my name: tap it, or slide a finger along it.';
  const played = new Set();
  let typed = '', finished = false, lastIndex = -1;
  function setHint(text) { if (hintText.textContent === text) return; hintText.textContent = text; restart(hintText, 'hint-in'); }
  function strike(k, vel = 1, silent = false) {
    if (!reduced.matches) k.v += 7.5 * vel;
    k.el.classList.add('is-lit');
    clearTimeout(k.lit);
    k.lit = setTimeout(() => k.el.classList.remove('is-lit'), 140);
    field.ripple(k.cx, k.cy, k.color);
    lastIndex = k.i;
    wake();
    if (silent) return;
    sound.pluck(k.hz, vel);
    played.add(k.i);
    if (sound.on && !sound.unlocked) setHint('Tap once to wake the sound, then play.');
    else if (played.size >= 5 && !finished) setHint('Nice. Now try typing it.');
    if (played.size === keys.length && !finished) celebrate();
  }
  function celebrate() { finished = true; setHint('Perfect pitch. Now play with the work.'); sound.fanfare(); wave(0.7); }
  function wave(vel = 0.5) { keys.forEach((k, i) => setTimeout(() => strike(k, vel, true), i * 55)); }
  hero.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const b = hero.getBoundingClientRect();
    pointer.x = e.clientX - b.left; pointer.y = e.clientY - b.top; pointer.inside = true;
    wake(); field.poke();
  });
  hero.addEventListener('pointerleave', () => { pointer.inside = false; wake(); field.poke(); });
  nameEl.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const el = e.target.closest?.('.key');
    if (el && !el.contains(e.relatedTarget)) strike(keyOf.get(el), 0.8);
  });
  let sliding = null;
  nameEl.addEventListener('pointerdown', e => {
    const el = e.target.closest?.('.key');
    if (!el) return;
    sliding = e.pointerType === 'mouse' ? null : keyOf.get(el);
    strike(keyOf.get(el), 1);
  });
  nameEl.addEventListener('pointermove', e => {
    if (!sliding) return;
    const hit = document.elementFromPoint(e.clientX, e.clientY);
    const el = hit && hit.closest('.key');
    if (el && keyOf.get(el) !== sliding) { sliding = keyOf.get(el); strike(sliding, 0.9); }
  });
  ['pointerup', 'pointercancel'].forEach(t => nameEl.addEventListener(t, () => { sliding = null; }));
  let heroInView = true;
  new IntersectionObserver(([e]) => { heroInView = e.isIntersecting; }, { threshold: 0.35 }).observe(hero);
  document.addEventListener('keydown', e => {
    if (!heroInView || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
    if (e.target.closest?.('input, textarea, [contenteditable]')) return;
    const letter = e.key.toLowerCase();
    if (letter.length !== 1) return;
    for (let s = 1; s <= keys.length; s++) {
      const k = keys[(lastIndex + s + keys.length) % keys.length];
      if (k.letter !== letter) continue;
      strike(k, 1);
      typed = (typed + letter).slice(-7);
      if ((typed === 'priyank' || typed === 'agarwal') && !finished) celebrate();
      return;
    }
  });
  function intro() {
    if (reduced.matches) { measure(); return; }
    keys.forEach((k, i) => k.el.animate([{ opacity: 0, transform: 'translateY(0.3em)', filter: 'blur(8px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 800, delay: 60 + i * 38, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }));
    setTimeout(() => { measure(); wave(0.45); }, 60 + keys.length * 38 + 600);
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { measure(); intro(); });
  window.addEventListener('resize', () => { clearTimeout(measure.t); measure.t = setTimeout(measure, 140); });

  /* KhiladiPro: the drill that counts */
  const kp = $('[data-kp]');
  if (kp) {
    const screen = $('[data-kp-screen]', kp), svg = $('[data-kp-body]', kp), countEl = $('[data-kp-count]', kp);
    const countWrap = countEl.parentElement, done = $('[data-kp-done]', kp), again = $('[data-kp-again]', kp), burst = $('[data-kp-burst]', kp);
    const STAND = { head: [100, 30], neck: [100, 50], sL: [80, 58], sR: [120, 58], eL: [72, 94], eR: [128, 94], wL: [69, 128], wR: [131, 128], pel: [100, 130], hL: [89, 132], hR: [111, 132], kL: [87, 184], kR: [113, 184], aL: [86, 236], aR: [114, 236] };
    const SQUAT = { head: [100, 78], neck: [100, 98], sL: [80, 106], sR: [120, 106], eL: [66, 122], eR: [134, 122], wL: [95, 118], wR: [105, 118], pel: [100, 172], hL: [86, 174], hR: [114, 174], kL: [71, 196], kR: [129, 196], aL: [86, 236], aR: [114, 236] };
    const BONES = [['head', 'neck'], ['neck', 'pel'], ['sL', 'sR'], ['hL', 'hR'], ['sL', 'eL'], ['eL', 'wL'], ['sR', 'eR'], ['eR', 'wR'], ['hL', 'kL'], ['kL', 'aL'], ['hR', 'kR'], ['kR', 'aR']];
    const JOINTS = ['sL', 'sR', 'eL', 'eR', 'wL', 'wR', 'hL', 'hR', 'kL', 'kR', 'aL', 'aR'];
    const NS = 'http://www.w3.org/2000/svg';
    const make = (tag, attrs) => { const n = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v)); svg.append(n); return n; };
    make('path', { class: 'kp-frame', d: 'M50 30V16h14M150 30V16h-14M50 230v14h14M150 230v14h-14' });
    const glow = BONES.map(() => make('line', { class: 'kp-bone kp-bone--glow' }));
    const bones = BONES.map(() => make('line', { class: 'kp-bone' }));
    const head = make('circle', { class: 'kp-head', r: 12 });
    const joints = JOINTS.map(() => make('circle', { class: 'kp-joint', r: 3.2 }));
    function pose(t) {
      const p = {};
      Object.keys(STAND).forEach(n => { p[n] = [STAND[n][0] + (SQUAT[n][0] - STAND[n][0]) * t, STAND[n][1] + (SQUAT[n][1] - STAND[n][1]) * t]; });
      BONES.forEach(([a, b], i) => [glow[i], bones[i]].forEach(l => { l.setAttribute('x1', p[a][0]); l.setAttribute('y1', p[a][1]); l.setAttribute('x2', p[b][0]); l.setAttribute('y2', p[b][1]); }));
      head.setAttribute('cx', p.head[0]); head.setAttribute('cy', p.head[1]);
      JOINTS.forEach((n, i) => { joints[i].setAttribute('cx', p[n][0]); joints[i].setAttribute('cy', p[n][1]); });
    }
    pose(0);
    const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    const tween = (from, to, ms) => new Promise(res => { const t0 = performance.now(); const f = now => { const k = Math.min(1, (now - t0) / ms); pose(from + (to - from) * ease(k)); if (k < 1) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
    let count = 13, busy = false, queued = 0;
    async function rep() {
      if (count >= 20) return;
      if (busy) { queued = Math.min(queued + 1, 3); return; }
      busy = true;
      if (!reduced.matches) { await tween(0, 1, 250); await tween(1, 0, 290); }
      count += 1;
      countEl.textContent = count;
      restart(countWrap, 'is-bump');
      screen.classList.add('is-rep');
      setTimeout(() => screen.classList.remove('is-rep'), 240);
      sound.pluck(SCALE[clamp(count - 7, 0, 13)], 0.7);
      busy = false;
      if (count >= 20) { queued = 0; setTimeout(finish, 260); } else if (queued > 0) { queued -= 1; rep(); }
    }
    function finish() {
      done.hidden = false;
      screen.setAttribute('aria-hidden', 'true');
      screen.tabIndex = -1;
      if (!reduced.matches) {
        const colors = ['#ff7a63', '#25e2b0', '#ffd84d', '#ffffff', '#e85068'];
        burst.replaceChildren(...Array.from({ length: 32 }, (_, i) => {
          const bit = document.createElement('i');
          const ang = Math.random() * Math.PI * 2, dist = 70 + Math.random() * 120;
          bit.style.setProperty('--dx', `${Math.cos(ang) * dist}px`);
          bit.style.setProperty('--dy', `${Math.sin(ang) * dist}px`);
          bit.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
          bit.style.setProperty('--c', colors[i % colors.length]);
          bit.style.animationDelay = `${Math.random() * 140}ms`;
          return bit;
        }));
      }
      sound.chime();
      again.focus({ preventScroll: true });
    }
    screen.addEventListener('click', rep);
    again.addEventListener('click', () => { count = 13; countEl.textContent = count; done.hidden = true; screen.removeAttribute('aria-hidden'); screen.tabIndex = 0; pose(0); screen.focus({ preventScroll: true }); });
  }

  /* Getmega: one card, thirteen states */
  const gm = $('[data-gm]');
  if (gm) {
    const S = (name, o) => ({ name, game: 'Carrom', live: true, k2: 'Big Blind', v2: '₹40', k3: 'Players Joined', v3: '128', ...o });
    const STATES = [
      S('Paid', { status: ['entry', 'Entry ₹500', 'ends'] }),
      S('Free', { game: 'Poker', status: ['free', 'Free Entry', 'ends'] }),
      S('Live (free) LB', { game: 'Poker', status: ['free', 'Free Entry', 'ends'] }),
      S('Upcoming LB', { game: 'Poker', live: false, status: ['free', 'Free Entry', 'starts'] }),
      S('Early bird', { game: 'Poker', k3: 'Slots', v3: '21/1000', chip: 'Filling Fast', status: ['entry', 'Entry <s>₹500</s> ₹400', 'ends'] }),
      S('You lost', { live: false, status: ['lost', 'You Lost', 'Contest Over!'] }),
      S('You won', { live: false, status: ['won', 'Yay! You Won', 'Contest Over!'] }),
      S('Point rate', { k2: 'Point Rate', v2: '₹0.10 to ₹0.20', status: ['entry', 'Entry ₹500', 'ends'] }),
      S('Joined and winning', { game: 'Poker Mania', k3: 'Current Rank', v3: '20/1019', status: ['up', 'You are Winning', 'ends'] }),
      S('Joined and losing', { game: 'Poker Mania', k3: 'Current Rank', v3: '20/1019', status: ['down', 'You are Losing', 'ends'] }),
      S('Declaring results', { game: 'Poker Mania', live: false, k3: 'Final Rank', v3: '- -', status: ['wait', 'Waiting for Results', 'ends'] }),
      S('Entry closes soon', { k2: 'Point Rate', v2: '₹0.10 to ₹0.20', v3: '1022', status: ['entry', 'Entry ₹500', 'closes'] }),
      S('Ending soon', { k2: 'Point Rate', v2: '₹0.10 to ₹0.20', status: ['entry', 'Entry ₹500', 'soon'] })
    ];
    const ICON = {
      entry: ['#13936f', '<path d="M8 6h8M8 10h8M10 6c3.5 0 4.5 1.8 4.5 3.3S13 13 10 13l5 5"/>'],
      free: ['#13936f', '<path d="M20 12v8H4v-8M3 8h18v4H3zM12 20V8M12 8H8a2 2 0 1 1 0-4c2.5 0 4 4 4 4zM12 8h4a2 2 0 1 0 0-4c-2.5 0-4 4-4 4z"/>'],
      won: ['#13936f', '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>'],
      lost: ['#e0344b', '<path d="M7 7l10 10M17 7 7 17"/>'],
      up: ['#1fa56b', '<path d="M12 19V5M6 11l6-6 6 6"/>'],
      down: ['#e0344b', '<path d="M12 5v14M6 13l6 6 6-6"/>'],
      wait: ['#f0a52b', '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9"/>']
    };
    const GAME = {
      Carrom: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="4"/><circle cx="6" cy="6" r="1.2" fill="#fff"/><circle cx="18" cy="6" r="1.2" fill="#fff"/><circle cx="6" cy="18" r="1.2" fill="#fff"/><circle cx="18" cy="18" r="1.2" fill="#fff"/></svg>',
      Poker: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C9 7 4 9 4 13.5A4 4 0 0 0 11 16c-.3 2-1.2 3.6-3 5h8c-1.8-1.4-2.7-3-3-5a4 4 0 0 0 7-2.5C20 9 15 7 12 2z"/></svg>'
    };
    const el = { icon: $('[data-gm-icon]', gm), game: $('[data-gm-game]', gm), live: $('[data-gm-live]', gm), k2: $('[data-gm-k2]', gm), v2: $('[data-gm-v2]', gm), k3: $('[data-gm-k3]', gm), v3: $('[data-gm-v3]', gm), status: $('[data-gm-status]', gm), index: $('[data-gm-index]', gm), name: $('[data-gm-name]', gm) };
    const ticksWrap = $('[data-gm-ticks]', gm);
    const ticks = STATES.map((s, i) => { const t = document.createElement('span'); t.addEventListener('click', () => go(i, true)); ticksWrap.append(t); return t; });
    const START = { ends: 97462, starts: 97462, closes: 262, soon: 11062 };
    const clock = { ...START };
    const two = n => String(n).padStart(2, '0');
    const long = s => `${Math.floor(s / 86400)}d ${Math.floor((s % 86400) / 3600)}h ${Math.floor((s % 3600) / 60)}m ${two(s % 60)}s`;
    const sub = kind => {
      if (kind === 'ends') return `Ends in ${long(clock.ends)}`;
      if (kind === 'starts') return `Starts in ${long(clock.starts)}`;
      if (kind === 'closes') return `<em class="is-hot">Hurry! Entry closes in ${Math.floor(clock.closes / 60)}m ${two(clock.closes % 60)}s</em>`;
      if (kind === 'soon') return `<em class="is-hot">Ends in ${Math.floor(clock.soon / 3600)}h ${Math.floor((clock.soon % 3600) / 60)}m ${two(clock.soon % 60)}s</em>`;
      return kind;
    };
    let index = 0, auto = true;
    const swap = node => restart(node, 'gm-swap');
    const set = (node, html) => { if (node.innerHTML === html) return; node.innerHTML = html; swap(node); };
    function render(animate) {
      const s = STATES[index];
      const [kind, title, when] = s.status;
      if (el.game.textContent !== s.game || !el.icon.innerHTML) {
        el.icon.innerHTML = GAME[s.game === 'Carrom' ? 'Carrom' : 'Poker'];
        el.icon.classList.toggle('is-poker', s.game !== 'Carrom');
        if (animate) swap(el.icon);
      }
      set(el.game, s.game);
      el.live.hidden = !s.live;
      set(el.k2, s.k2); set(el.v2, s.v2); set(el.k3, s.k3);
      set(el.v3, s.chip ? `${s.v3}<span class="gm-chip">${s.chip}</span>` : s.v3);
      const [color, path] = ICON[kind];
      el.status.innerHTML = `<span class="gm-s-icon" style="background:${color}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg></span><span class="gm-s-text"><b>${title}</b><span data-gm-sub>${sub(when)}</span></span>`;
      if (animate) swap(el.status);
      el.index.textContent = `${two(index + 1)}/13`;
      el.name.textContent = s.name;
      ticks.forEach((t, i) => t.classList.toggle('is-on', i === index));
    }
    function go(i, user) { index = (i + STATES.length) % STATES.length; if (user) { auto = false; sound.pluck(SCALE[index % SCALE.length], 0.55); } render(true); }
    $('[data-gm-prev]', gm).addEventListener('click', () => go(index - 1, true));
    $('[data-gm-next]', gm).addEventListener('click', () => go(index + 1, true));
    let visible = false;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.4 }).observe(gm);
    setInterval(() => {
      if (!visible) return;
      Object.keys(clock).forEach(k => { clock[k] = clock[k] > 0 ? clock[k] - 1 : START[k]; });
      const node = $('[data-gm-sub]', el.status);
      const when = STATES[index].status[2];
      if (node && clock[when] !== undefined) node.innerHTML = sub(when);
    }, 1000);
    setInterval(() => { if (visible && auto && !reduced.matches) go(index + 1, false); }, 2600);
    render(false);
  }

  /* Mega Poker: principal and bonus */
  const mp = $('[data-mp]');
  if (mp) {
    const range = $('[data-mp-range]', mp);
    const min = Number(range.min), max = Number(range.max);
    const money = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const tiers = $$('[data-tier]', mp);
    const principal = $('[data-mp-principal]', mp), bonus = $('[data-mp-bonus]', mp), bonusLabel = $('[data-mp-bonus-label]', mp), total = $('[data-mp-total]', mp);
    const bonusRow = bonus.parentElement;
    const TIERS = [[2500, 5], [6000, 10], [Infinity, 20]];
    let tier = -1, lastStep = -1, lastTick = 0;
    function update(user) {
      const v = Number(range.value);
      const t = TIERS.findIndex(([limit]) => v < limit);
      const pct = TIERS[t][1];
      const b = (v * pct) / 100;
      range.style.setProperty('--p', `${((v - min) / (max - min)) * 100}%`);
      principal.textContent = `₹${money.format(v)}`;
      bonus.textContent = `₹${money.format(b)}`;
      bonusLabel.textContent = `Extra ${pct}% (Bonus Wallet)`;
      total.textContent = `₹${money.format(v + b)}`;
      tiers.forEach((n, i) => n.classList.toggle('is-on', i === t));
      if (user) {
        if (tier !== -1 && t !== tier) { restart(bonusRow, 'is-bump'); sound.chime(); }
        else {
          const s = Math.round(v / 250), now = performance.now();
          if (s !== lastStep && now - lastTick > 45) { lastTick = now; sound.tick(700 + ((v - min) / (max - min)) * 1400, 0.05); }
          lastStep = s;
        }
      }
      tier = t;
    }
    range.addEventListener('input', () => update(true));
    update(false);
  }

  /* SEDP: chart first, then share */
  const sedp = $('[data-sedp]');
  if (sedp) {
    const PLACES = ['Kerala', 'Tamil Nadu', 'Maharashtra', 'Karnataka', 'Gujarat', 'West Bengal', 'Uttar Pradesh', 'Bihar'];
    const IND = [
      { q: 'Monthly spend per person, by state', title: 'Average monthly spend per person, by state (₹)', fmt: v => `₹${v.toLocaleString('en-IN')}`, values: [6600, 6100, 5800, 5700, 5300, 4400, 4000, 3600] },
      { q: 'Households with internet access, by state', title: 'Households with internet access, by state (%)', fmt: v => `${v}%`, values: [78, 68, 70, 66, 63, 52, 49, 42] },
      { q: 'Literacy rate, by state', title: 'Literacy rate, by state (%)', fmt: v => `${v}%`, values: [96, 82, 84, 77, 79, 76, 70, 64] }
    ];
    const RAMP = ['#b3163c', '#c9284a', '#dc4456', '#e8606a', '#ef8577', '#f3a386', '#f6bc9b', '#f8d0b3'];
    const list = $('[data-sedp-bars]', sedp), question = $('[data-sedp-q]', sedp), segs = $$('[data-sedp-seg] button', sedp);
    const card = $('[data-sedp-card]', sedp), share = $('[data-sedp-share]', sedp), close = $('[data-sedp-close]', sedp);
    const rows = PLACES.map(place => { const li = document.createElement('li'); li.innerHTML = `<span class="sedp-n">${place}</span><span class="sedp-track"><span class="sedp-fill"></span></span><span class="sedp-v"></span>`; list.append(li); return li; });
    let current = 0, order = [];
    function show(i, user) {
      current = i;
      const ind = IND[i];
      const topV = Math.max(...ind.values);
      order = ind.values.map((v, j) => [v, j]).sort((a, b) => b[0] - a[0]);
      order.forEach(([v, j], rank) => { const li = rows[j]; li.style.setProperty('--row', rank); li.style.setProperty('--w', `${(v / topV) * 100}%`); li.style.setProperty('--fill', RAMP[rank]); $('.sedp-v', li).textContent = ind.fmt(v); });
      question.textContent = ind.q;
      segs.forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.ind) === i)));
      if (user) sound.swoosh();
    }
    segs.forEach(b => b.addEventListener('click', () => show(Number(b.dataset.ind), true)));
    rows.forEach(li => li.style.setProperty('--w', '0%'));
    order = IND[0].values.map((v, j) => [v, j]).sort((a, b) => b[0] - a[0]);
    order.forEach(([, j], rank) => rows[j].style.setProperty('--row', rank));
    new IntersectionObserver(([e], o) => { if (!e.isIntersecting) return; o.disconnect(); setTimeout(() => show(current, false), 200); }, { threshold: 0.35 }).observe(list);
    share.addEventListener('click', () => {
      const ind = IND[current];
      $('[data-sedp-card-q]', card).textContent = ind.title;
      const item = ([v, j], n, rank) => `<li style="--i:${n};--fill:${RAMP[rank]}"><i></i><span>${PLACES[j]}</span><b>${ind.fmt(v)}</b></li>`;
      $('[data-sedp-top]', card).innerHTML = order.slice(0, 3).map((e, n) => item(e, n, n)).join('');
      $('[data-sedp-bottom]', card).innerHTML = order.slice(-3).reverse().map((e, n) => item(e, n + 3, 7 - n)).join('');
      card.hidden = false;
      sedp.classList.add('is-sharing');
      sound.pop();
      close.focus({ preventScroll: true });
    });
    close.addEventListener('click', () => { card.hidden = true; sedp.classList.remove('is-sharing'); share.focus({ preventScroll: true }); });
  }

  /* Record: a timeline with a playhead */
  const player = $('[data-player]');
  if (player) {
    const items = $$('[data-chapters] li', player).map(li => ({ year: li.dataset.year, accent: li.dataset.accent, name: $('b', li).textContent, role: $('span', li).textContent, text: $('p', li).textContent, quote: $('blockquote', li) ? $('blockquote', li).innerHTML : '' }));
    const track = $('[data-player-track]', player), head = $('[data-player-head]', player), stopsWrap = $('[data-player-stops]', player);
    const now = $('[data-player-now]', player), yearEl = $('[data-player-year]', player), indexEl = $('[data-player-index]', player), playButton = $('[data-player-play]', player);
    const lastI = items.length - 1;
    const stops = items.map((item, i) => {
      const x = (i / lastI) * 100;
      const dot = document.createElement('span'); dot.className = 'stop'; dot.style.setProperty('--x', `${x}%`); dot.style.setProperty('--sc', rgb(item.accent));
      const year = document.createElement('span'); year.className = 'stop-year'; year.style.setProperty('--x', `${x}%`); year.textContent = item.year;
      stopsWrap.append(dot, year);
      return { dot, year, x };
    });
    yearEl.textContent = '';
    let shownYear = '';
    function showYear(text, dir) {
      if (text === shownYear) return;
      shownYear = text;
      const old = yearEl.lastElementChild;
      const next = document.createElement('span'); next.className = 'y'; next.textContent = text; yearEl.append(next);
      if (!old) return;
      if (reduced.matches) { old.remove(); return; }
      const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
      next.animate([{ transform: `translateY(${dir * 60}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 650, easing });
      old.animate([{ transform: 'none', opacity: 1 }, { transform: `translateY(${-dir * 60}%)`, opacity: 0 }], { duration: 520, easing, fill: 'forwards' }).onfinish = () => old.remove();
    }
    let index = -1, dragging = false, timer = 0;
    function set(i, note = false) {
      i = clamp(i, 0, lastI);
      if (i === index) return;
      const prev = index;
      index = i;
      const item = items[i];
      player.style.setProperty('--pc', rgb(item.accent));
      if (!dragging) { track.style.setProperty('--p', `${stops[i].x}%`); head.style.setProperty('--hx', `${stops[i].x}%`); }
      stops.forEach((s, n) => { s.dot.classList.toggle('is-past', n <= i); s.year.classList.toggle('is-on', n === i); });
      showYear(item.year, i >= prev ? 1 : -1);
      now.innerHTML = `<div class="pn-in"><p class="pn-tag"><i></i>Chapter ${String(i + 1).padStart(2, '0')} · ${item.year}</p><p class="pn-name">${item.name}</p><p class="pn-role">${item.role}</p><p class="pn-text">${item.text}</p>${item.quote ? `<blockquote class="pn-quote">${item.quote}</blockquote>` : ''}</div>`;
      indexEl.textContent = String(i + 1).padStart(2, '0');
      track.setAttribute('aria-valuenow', String(i + 1));
      track.setAttribute('aria-valuetext', `${item.year}, ${item.name}`);
      if (note) sound.pluck(SCALE[clamp(i + 3, 0, 13)], 0.55);
    }
    const ratioAt = x => { const b = track.getBoundingClientRect(); return clamp((x - b.left) / b.width, 0, 1); };
    function drag(e) { const r = ratioAt(e.clientX); head.style.setProperty('--hx', `${r * 100}%`); track.style.setProperty('--p', `${r * 100}%`); set(Math.round(r * lastI), true); }
    track.addEventListener('pointerdown', e => { stop(); dragging = true; track.classList.add('is-dragging'); track.setPointerCapture(e.pointerId); drag(e); });
    track.addEventListener('pointermove', e => { if (dragging) drag(e); });
    const release = () => { if (!dragging) return; dragging = false; track.classList.remove('is-dragging'); track.style.setProperty('--p', `${stops[index].x}%`); head.style.setProperty('--hx', `${stops[index].x}%`); };
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);
    track.addEventListener('keydown', e => {
      const moves = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };
      let target = null;
      if (e.key in moves) target = index + moves[e.key]; else if (e.key === 'Home') target = 0; else if (e.key === 'End') target = lastI;
      if (target === null) return;
      e.preventDefault(); stop(); set(target, true);
    });
    function play() {
      if (index >= lastI) set(0, true);
      player.classList.add('is-playing');
      playButton.setAttribute('aria-label', 'Pause the timeline');
      timer = setInterval(() => { if (index >= lastI) { stop(); return; } set(index + 1, true); }, 1800);
    }
    function stop() { clearInterval(timer); timer = 0; player.classList.remove('is-playing'); playButton.setAttribute('aria-label', 'Play the timeline'); }
    playButton.addEventListener('click', () => (timer ? stop() : play()));
    set(3);
  }

  /* Contact: the address plays too */
  const mailText = $('[data-mail-text]');
  if (mailText) {
    const text = mailText.textContent;
    mailText.textContent = '';
    const letters = [...text].map(ch => { const l = document.createElement('span'); l.className = 'mk'; l.textContent = ch; mailText.append(l); return l; });
    mailText.addEventListener('pointerover', e => {
      if (e.pointerType !== 'mouse') return;
      const l = e.target.closest?.('.mk');
      if (!l || l.contains(e.relatedTarget)) return;
      const i = letters.indexOf(l);
      l.style.setProperty('--c', `rgb(${rgb(CYCLE[i % CYCLE.length])})`);
      sound.pluck(SCALE[(i % 10) + 4], 0.4);
      restart(l, 'is-lit');
    });
  }

  /* --- Kind words: two clients who came back, in turn ------------------------ */

  const words = $('[data-words]');
  if (words) {
    const figs = $$('figure', words);
    const count = $('[data-words-n]', words);
    let at = 0;
    let auto = true;
    function showQuote(i, user) {
      at = (i + figs.length) % figs.length;
      figs.forEach((f, j) => f.classList.toggle('is-on', j === at));
      count.textContent = `${at + 1}/${figs.length}`;
      words.style.setProperty('--q-rgb', `var(--${figs[at].dataset.accent}-rgb)`);
      if (user) {
        auto = false;
        sound.pluck(SCALE[at ? 7 : 5], 0.5);
      }
    }
    $('[data-words-prev]', words).addEventListener('click', () => showQuote(at - 1, true));
    $('[data-words-next]', words).addEventListener('click', () => showQuote(at + 1, true));
    let inView = false;
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { threshold: 0.5 }).observe(words);
    setInterval(() => { if (auto && inView && !reduced.matches && !document.hidden) showQuote(at + 1, false); }, 7000);
    showQuote(0, false);
  }

  /* --- Type h i r e ----------------------------------------------------------- */

  const confetti = (() => {
    const canvas = $('[data-confetti]');
    const g = canvas.getContext('2d');
    let parts = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick() {
      g.clearRect(0, 0, w, h);
      parts.forEach(p => {
        p.vy += 0.34;
        p.vx *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        p.life += 1;
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.r);
        g.globalAlpha = Math.max(0, 1 - p.life / 170);
        g.fillStyle = p.c;
        g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        g.restore();
      });
      parts = parts.filter(p => p.life < 170 && p.y < h + 40);
      raf = parts.length ? requestAnimationFrame(tick) : 0;
      if (!raf) g.clearRect(0, 0, w, h);
    }

    return {
      burst() {
        resize();
        const colors = ['#ff7a63', '#e85068', '#3cc09c', '#d3a486', '#f5f5f6'];
        for (let i = 0; i < 180; i++) {
          const left = i % 2 === 0;
          parts.push({
            x: left ? -10 : w + 10,
            y: h * 0.78,
            vx: (left ? 1 : -1) * (6 + Math.random() * 10),
            vy: -(10 + Math.random() * 13),
            r: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.3,
            s: 7 + Math.random() * 7,
            c: colors[i % colors.length],
            life: 0
          });
        }
        if (!raf) raf = requestAnimationFrame(tick);
      }
    };
  })();

  let heard = '';
  document.addEventListener('keydown', async event => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) return;
    if (event.target.closest('input, textarea, [contenteditable]')) return;
    heard = (heard + event.key.toLowerCase()).slice(-4);
    if (heard !== 'hire') return;
    heard = '';
    await copyText('hello@priyank.design');
    if (!reduced.matches) confetti.burst();
    sound.fanfare();
    toast('Excellent taste. My email is on your clipboard: hello@priyank.design', 4200);
  });
})();
