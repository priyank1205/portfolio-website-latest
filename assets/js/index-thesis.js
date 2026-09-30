/* ============================================================================
   Homepage, Thesis (dark): the behaviour

   The sentence follows the page: whichever piece of work is in view lights
   its word in the thesis, with a small picture, and the map beside it tracks
   progress. Each word takes you to its work. Plates step through their
   screens under the pointer, or with a swipe on touch. A quiet kalimba in D
   major pentatonic answers a few gestures; nothing sounds before one, and the
   switch turns it off.
   ========================================================================== */

(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const EMAIL = 'hello@priyank.design';

  /* --- Sound ---------------------------------------------------------------- */

  const SCALE = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.26, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98, 1760];

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
    let unlocked = false;

    function ensure() {
      if (ctx) return;
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      ctx = new Context();
      out = ctx.createGain();
      out.gain.value = 0.16;
      const echo = ctx.createDelay(1);
      echo.delayTime.value = 0.19;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.2;
      const wet = ctx.createGain();
      wet.gain.value = 0.18;
      out.connect(ctx.destination);
      out.connect(echo);
      echo.connect(feedback);
      feedback.connect(echo);
      echo.connect(wet);
      wet.connect(ctx.destination);
    }

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

    function osc(freq, dur, peak, at = 0) {
      const t = ctx.currentTime + at;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.0001, t);
      env.gain.exponentialRampToValueAtTime(peak, t + 0.003);
      env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      env.connect(out);
      const o = ctx.createOscillator();
      o.frequency.value = freq;
      o.connect(env);
      o.start(t);
      o.stop(t + dur + 0.05);
    }

    function ready() {
      if (!on || !unlocked) return false;
      ensure();
      if (!ctx) return false;
      if (ctx.state !== 'running') {
        ctx.resume();
        return false;
      }
      return true;
    }

    return {
      get on() { return on; },
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
      // A kalimba tine: a pure fundamental and a quick octave above it.
      pluck(n, vel = 1) {
        if (!ready()) return;
        const freq = SCALE[clamp(n, 0, SCALE.length - 1)];
        osc(freq, 1.3, 0.22 * vel);
        osc(freq * 2, 0.4, 0.045 * vel);
      },
      tick(n) {
        if (!ready()) return;
        osc(SCALE[clamp(n, 0, SCALE.length - 1)] * 2, 0.07, 0.035);
      },
      chime() {
        if (!ready()) return;
        [5, 7, 9, 12].forEach((n, i) => osc(SCALE[n], 1.1, 0.1, i * 0.07));
      }
    };
  })();

  const toggle = $('[data-sound-toggle]');
  const toggleLabel = $('[data-sound-label]');
  function paintToggle() {
    toggle.setAttribute('aria-pressed', String(sound.on));
    toggleLabel.textContent = sound.on ? 'Sound on' : 'Sound off';
  }
  toggle.addEventListener('click', () => {
    sound.set(!sound.on);
    paintToggle();
    if (sound.on) setTimeout(() => sound.chime(), 60);
  });
  paintToggle();

  /* --- Toast, copy, clock ------------------------------------------------------- */

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
      field.style.cssText = 'position:fixed;opacity:0';
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
      reset = setTimeout(() => button.classList.remove('is-copied'), 2000);
    });
  });

  const clock = $('[data-clock]');
  const format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  const tickClock = () => { clock.textContent = `Bengaluru ${format.format(new Date())} IST`; };
  tickClock();
  setInterval(tickClock, 30000);

  // Type h i r e anywhere: the address goes to the clipboard.
  let heard = '';
  document.addEventListener('keydown', async event => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) return;
    if (event.target.closest?.('input, textarea, [contenteditable]')) return;
    heard = (heard + event.key.toLowerCase()).slice(-4);
    if (heard !== 'hire') return;
    heard = '';
    await copyText(EMAIL);
    sound.chime();
    toast(`Good call. ${EMAIL} is on your clipboard.`, 4000);
  });

  /* --- Plates: step through the screens ---------------------------------------- */

  const plates = $$('[data-plate]').map(plate => {
    const slides = $('[data-slides]', plate);
    const items = $$('.slide', slides);
    const capOut = $('[data-cap-out]', plate);
    const segs = $('.segs', plate);
    segs.replaceChildren(...items.map(() => document.createElement('i')));
    return { plate, slides, items, capOut, ticks: [...segs.children], index: -1, visible: false, touched: false };
  });

  function show(p, i, withSound) {
    i = clamp(i, 0, p.items.length - 1);
    if (i === p.index) return;
    p.index = i;
    if (fine.matches) p.slides.style.transform = `translateX(${-i * 100}%)`;
    p.capOut.textContent = p.items[i].dataset.cap;
    p.ticks.forEach((t, j) => t.classList.toggle('is-on', j === i));
    if (withSound) sound.tick(i + 3);
  }

  plates.forEach(p => {
    show(p, 0, false);
    p.plate.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const box = p.plate.getBoundingClientRect();
      p.touched = true;
      show(p, Math.floor(((event.clientX - box.left) / box.width) * p.items.length), true);
    });
    p.plate.addEventListener('pointerleave', () => { p.touched = false; });
    p.plate.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(p, p.index + 1, true);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(p, p.index - 1, true);
      }
    });
    // On touch the plate is a swipe; the caption follows the scroll.
    p.slides.addEventListener('scroll', () => {
      if (fine.matches) return;
      show(p, Math.round(p.slides.scrollLeft / p.slides.clientWidth), false);
    }, { passive: true });
  });

  // Plates in view walk themselves, slowly, until a pointer takes over.
  const seen = new IntersectionObserver(entries => entries.forEach(entry => {
    const p = plates.find(q => q.plate === entry.target);
    if (p) p.visible = entry.isIntersecting;
  }), { threshold: 0.4 });
  plates.forEach(p => seen.observe(p.plate));
  setInterval(() => {
    if (reduced.matches || document.hidden || !fine.matches) return;
    plates.forEach(p => {
      if (p.visible && !p.touched) show(p, (p.index + 1) % p.items.length, false);
    });
  }, 2800);

  /* --- The sentence follows the page -------------------------------------------- */

  const sections = $$('.proj, .play-card, #writing');
  const tocLinks = new Map($$('[data-for]').map(a => [a.dataset.for, a]));
  const words = $$('[data-word]').filter(w => w.classList.contains('w'));
  const NOTES = { money: 5, scores: 7, data: 9 };
  let current = null;

  function setCurrent(section) {
    if (section === current) return;
    current = section;
    tocLinks.forEach((a, id) => a.classList.toggle('is-on', !!section && id === section.id));
    const word = section ? section.dataset.word : null;
    words.forEach(w => w.classList.toggle('is-on', w.dataset.word === word));
    if (!section) return;
    document.documentElement.style.setProperty('--c', getComputedStyle(section).getPropertyValue('--c').trim() || 'var(--kp)');
    if (word) {
      const w = words.find(x => x.dataset.word === word);
      w.style.setProperty('--c', section.style.getPropertyValue('--c'));
      $('img', w).src = `assets/images/home/shots/${section.dataset.chip}.webp`;
    }
  }

  function onScroll() {
    const mid = window.innerHeight * 0.45;
    let best = null;
    let bestDistance = Infinity;
    sections.forEach(section => {
      const box = section.getBoundingClientRect();
      const distance = box.top <= mid && box.bottom >= mid ? 0 : Math.min(Math.abs(box.top - mid), Math.abs(box.bottom - mid));
      if (distance < bestDistance) {
        bestDistance = distance;
        best = section;
      }
      const link = tocLinks.get(section.id);
      if (link) link.style.setProperty('--p', clamp((mid - box.top) / box.height, 0, 1).toFixed(3));
    });
    setCurrent(bestDistance < window.innerHeight * 0.6 ? best : null);
  }

  let pending = false;
  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      onScroll();
    });
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  const go = target => target.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });

  // Each word takes you to its work; money has two, so it takes turns.
  words.forEach(w => {
    w.addEventListener('click', event => {
      event.preventDefault();
      const matches = sections.filter(s => s.dataset.word === w.dataset.word);
      const next = matches[(matches.indexOf(current) + 1) % matches.length] || matches[0];
      go(next);
      sound.pluck(NOTES[w.dataset.word], 0.6);
    });
    w.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') sound.pluck(NOTES[w.dataset.word], 0.4);
    });
  });

  tocLinks.forEach(a => a.addEventListener('click', event => {
    const target = document.getElementById(a.dataset.for);
    if (!target) return;
    event.preventDefault();
    go(target);
  }));

  /* --- The address plays, in the colour of whatever is in view ----------------- */

  const mail = $('[data-mail]');
  const letters = [...mail.textContent].map(ch => {
    const span = document.createElement('span');
    span.className = 'mk';
    span.textContent = ch;
    return span;
  });
  mail.replaceChildren(...letters);
  mail.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse') return;
    const letter = event.target.closest?.('.mk');
    if (!letter || letter.contains(event.relatedTarget)) return;
    sound.pluck((letters.indexOf(letter) % 10) + 3, 0.35);
    letter.classList.add('is-lit');
    setTimeout(() => letter.classList.remove('is-lit'), 220);
  });
})();
