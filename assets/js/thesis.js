/* ============================================================================
   Thesis: the behaviour, shared by the homepage, About and Writing

   The sentence follows the page: whichever section is in view lights its
   word in the pinned sentence, with a small picture, and the map beside it
   tracks progress through that section. Each word takes you to its section.
   Plates cross-fade through their screens, slowly, and hold still under a
   pointer. A quiet kalimba in D major pentatonic
   answers a few gestures; nothing sounds before one, and the switch turns it
   off. Pages opt in with data attributes:

     [data-spy]            a section the map and the sentence follow
     [data-word]           on a section: the word of the sentence it lights
     [data-chip]           on a section: the picture that word shows
     .w[data-word]         a word of the sentence
     [data-for]            a map link, naming the section id it follows
     [data-plate]          a plate of screens that cross-fade
     [data-theme-toggle]   the light and dark switch
     [data-mail]           an address whose letters play
   ========================================================================== */

(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const EMAIL = 'hello@priyank.design';

  /* --- Theme: dark by default, light on request, remembered -------------------- */

  const THEME_KEY = 'thesis-theme';
  const themeButtons = $$('[data-theme-toggle]');
  function paintTheme() {
    const light = document.documentElement.dataset.theme === 'light';
    themeButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(light));
      button.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      button.title = light ? 'Dark mode' : 'Light mode';
    });
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = light ? '#fbfbfa' : '#09090b';
  }
  themeButtons.forEach(button => button.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Not remembered; still applied.
    }
    paintTheme();
  }));
  paintTheme();

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
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(sound.on));
    toggleLabel.textContent = sound.on ? 'Sound on' : 'Sound off';
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      sound.set(!sound.on);
      paintToggle();
      if (sound.on) setTimeout(() => sound.chime(), 60);
    });
    paintToggle();
  }

  /* --- Toast, copy, clock ------------------------------------------------------- */

  const toastEl = $('[data-toast]');
  let toastTimer = 0;
  function toast(message, ms = 2600) {
    if (!toastEl) return;
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
    button.addEventListener('click', async event => {
      event.preventDefault();
      await copyText(button.dataset.copy);
      button.classList.add('is-copied');
      sound.chime();
      toast(button.dataset.copyToast || `Copied ${button.dataset.copy}`);
      clearTimeout(reset);
      reset = setTimeout(() => button.classList.remove('is-copied'), 2000);
    });
  });

  // A link to this page, for essays.
  $$('[data-copy-link]').forEach(button => button.addEventListener('click', async () => {
    await copyText(location.href.split('#')[0]);
    sound.chime();
    toast('Link copied.');
  }));

  const clocks = $$('[data-clock]');
  const format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  const tickClock = () => clocks.forEach(clock => {
    clock.textContent = clock.dataset.clock === 'short' ? `${format.format(new Date())} IST` : `Bengaluru ${format.format(new Date())} IST`;
  });
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

  /* --- Plates: cross-fade through the screens, slowly --------------------------- */

  // Each plate shows one screen at a time. The segment under it fills while
  // it shows; when it is full, the next screen fades in. A pointer on the card
  // holds the current screen still, and the plate only runs while on screen.
  const plates = $$('[data-plate]').map(plate => {
    const items = $$('.slide', plate);
    const capOut = $('[data-cap-out]', plate);
    const segs = $('.segs', plate);
    if (segs) segs.replaceChildren(...items.map(() => document.createElement('i')));
    return { plate, items, capOut, segs, ticks: segs ? [...segs.children] : [], index: -1 };
  });

  function show(p, i) {
    i = ((i % p.items.length) + p.items.length) % p.items.length;
    if (i === p.index) return;
    p.index = i;
    p.items.forEach((item, j) => item.classList.toggle('is-on', j === i));
    if (p.capOut) p.capOut.textContent = p.items[i].dataset.cap || '';
    p.ticks.forEach((t, j) => t.classList.toggle('is-on', j === i));
  }

  plates.forEach(p => {
    show(p, 0);
    if (p.items.length < 2 || !p.segs) return;
    p.segs.addEventListener('animationend', () => show(p, p.index + 1));
  });

  const running = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle('is-running', entry.isIntersecting && !reduced.matches);
  }), { threshold: 0.4 });
  plates.forEach(p => { if (p.items.length > 1) running.observe(p.plate); });

  /* --- The sentence follows the page -------------------------------------------- */

  const sections = $$('[data-spy]');
  const mapLinks = new Map($$('[data-for]').map(a => [a.dataset.for, a]));
  const words = $$('.w[data-word]');
  let current = null;

  function setCurrent(section) {
    if (section === current) return;
    current = section;
    mapLinks.forEach((a, id) => a.classList.toggle('is-on', !!section && id === section.id));
    const word = section ? section.dataset.word : null;
    words.forEach(w => w.classList.toggle('is-on', !!word && w.dataset.word === word));
    if (!section) return;
    // Keep the token itself, so the colour follows the theme when it changes.
    const colour = section.style.getPropertyValue('--c').trim() || getComputedStyle(section).getPropertyValue('--c').trim();
    if (colour) document.documentElement.style.setProperty('--c', colour);
    const w = word && words.find(x => x.dataset.word === word);
    if (w) {
      if (colour) w.style.setProperty('--c', colour);
      const img = $('img', w);
      if (img && section.dataset.chip) img.src = section.dataset.chip;
    }
  }

  function onScroll() {
    if (!sections.length) return;
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
      const link = mapLinks.get(section.id);
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

  // Each word takes you to its section; a word with several takes turns.
  words.forEach((w, i) => {
    const note = Number(w.dataset.note) || 5 + i * 2;
    w.addEventListener('click', event => {
      const matches = sections.filter(s => s.dataset.word === w.dataset.word);
      if (!matches.length) return;
      event.preventDefault();
      const next = matches[(matches.indexOf(current) + 1) % matches.length] || matches[0];
      go(next);
      sound.pluck(note, 0.6);
    });
    w.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') sound.pluck(note, 0.4);
    });
  });

  mapLinks.forEach(a => a.addEventListener('click', event => {
    const target = document.getElementById(a.dataset.for);
    if (!target) return;
    event.preventDefault();
    go(target);
  }));

  /* --- Anything that plays: an address, a row of chips ---------------------------- */

  $$('[data-mail]').forEach(mail => {
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
  });

  $$('[data-notes] > *').forEach((chip, i) => {
    const play = vel => {
      sound.pluck(i + 3, vel);
      chip.classList.add('is-lit');
      clearTimeout(chip.lit);
      chip.lit = setTimeout(() => chip.classList.remove('is-lit'), 260);
    };
    chip.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') play(0.5); });
    chip.addEventListener('click', () => play(0.8));
  });

  window.Thesis = { sound, toast, copyText, SCALE, reduced, go };
})();
