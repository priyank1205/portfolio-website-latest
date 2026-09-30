/* ============================================================================
   About (Claude): this page's own behaviour

   Built on the shared case study system (case-system.js, loaded first), which
   runs the chrome, the reveal, the copy button and the clock. This file makes
   the two instruments play: every note is synthesized, and nothing sounds
   until the reader touches a string or a key.
   ========================================================================== */

(() => {
  'use strict';

  const { $, $$, reduced } = window.CaseSystem;

  const section = $('#offhours');
  if (!section) return;

  /* --- Sound: one voice for a nylon string, one for a felt hammer --------- */

  const sound = (() => {
    let ctx = null;
    let out = null;
    let noise = null;
    let voices = 0;

    function ensure() {
      if (ctx) return;
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      ctx = new Context();
      out = ctx.createGain();
      out.gain.value = 0.15;
      // A soft ceiling, so a fast run of notes never turns harsh.
      const ceiling = ctx.createDynamicsCompressor();
      ceiling.threshold.value = -20;
      ceiling.knee.value = 12;
      ceiling.ratio.value = 6;
      ceiling.attack.value = 0.002;
      ceiling.release.value = 0.15;
      out.connect(ceiling);
      ceiling.connect(ctx.destination);
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }

    // Browsers only start audio from a gesture: unlock on the first one.
    ['pointerdown', 'keydown', 'touchstart'].forEach(type => document.addEventListener(type, () => {
      ensure();
      if (ctx && ctx.state !== 'running') ctx.resume();
    }, { once: true, capture: true, passive: true }));

    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden) ctx.suspend();
      else ctx.resume();
    });

    // An oscillator with a gain envelope, an optional lowpass and an optional
    // detuned partner for warmth.
    function tone({ freq, type = 'sine', dur, peak, cutoff, detune }) {
      const t = ctx.currentTime;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(peak, t + 0.002);
      env.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      let node = env;
      if (cutoff) {
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = cutoff;
        env.connect(filter);
        node = filter;
      }
      node.connect(out);
      const voice = (cents, share) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = freq;
        if (cents) osc.detune.value = cents;
        const level = ctx.createGain();
        level.gain.value = share;
        osc.connect(level);
        level.connect(env);
        voices++;
        osc.onended = () => { voices--; };
        osc.start(t);
        osc.stop(t + dur + 0.03);
      };
      voice(0, detune ? 0.72 : 1);
      if (detune) voice(detune, 0.35);
    }

    // A short burst of filtered noise: the nail, or the hammer.
    function burst({ freq, q, dur, peak }) {
      const t = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = freq;
      filter.Q.value = q;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(peak, t + 0.001);
      env.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      src.connect(filter);
      filter.connect(env);
      env.connect(out);
      voices++;
      src.onended = () => { voices--; };
      src.start(t);
      src.stop(t + dur + 0.03);
    }

    function ready() {
      ensure();
      if (!ctx) return false;
      if (ctx.state !== 'running') {
        ctx.resume();
        return false;
      }
      return voices < 32;
    }

    return {
      // Nylon: a warm triangle, a faint octave and the click of a nail.
      string(freq) {
        if (!ready()) return;
        const f = freq * (0.998 + Math.random() * 0.004);
        tone({ freq: f, type: 'triangle', cutoff: f * 6, dur: 0.85, peak: 0.17, detune: 5 });
        tone({ freq: f * 2, dur: 0.3, peak: 0.045 });
        burst({ freq: 2400, q: 1.5, dur: 0.015, peak: 0.05 });
      },
      // A felt hammer: the same shape, shorter in the octave.
      key(freq) {
        if (!ready()) return;
        tone({ freq, type: 'triangle', cutoff: freq * 5, dur: 0.8, peak: 0.2, detune: 4 });
        tone({ freq: freq * 2, dur: 0.2, peak: 0.04 });
        burst({ freq: 3200, q: 1, dur: 0.012, peak: 0.04 });
      }
    };
  })();

  /* --- The instruments ----------------------------------------------------- */

  // True pitches, like the instruments they draw. Strings top to bottom.
  const HZ = {
    C4: 261.63, 'C#4': 277.18, D4: 293.66, 'D#4': 311.13, E4: 329.63,
    F4: 349.23, 'F#4': 369.99, G4: 392, 'G#4': 415.3, A4: 440,
    'A#4': 466.16, B4: 493.88, C5: 523.25, 'C#5': 554.37, D5: 587.33,
    'D#5': 622.25, E5: 659.26
  };

  const playable = $$('.uke-string, .p-key', section);
  const byKey = new Map(playable.map(el => [el.dataset.key, el]));
  const last = new WeakMap();

  function play(el) {
    const isString = el.classList.contains('uke-string');
    const name = isString ? el.dataset.name : el.dataset.note;
    // A run across the strings should voice every note, but not re-fire one
    // the pointer is still resting on.
    const now = performance.now();
    if (now - (last.get(el) || 0) < 35) return;
    last.set(el, now);

    if (isString) sound.string(HZ[name]);
    else sound.key(HZ[name]);

    const readout = $('[data-readout]', el.closest('.instrument'));
    readout.textContent = `${name.replace('#', '♯')} · ${HZ[name].toFixed(2)} Hz`;

    if (reduced.matches) return;
    el.classList.remove('play');
    void el.getBoundingClientRect();
    el.classList.add('play');
    clearTimeout(el.playTimer);
    el.playTimer = setTimeout(() => el.classList.remove('play'), isString ? 450 : 180);
  }

  const pick = target => target.closest && target.closest('.uke-string, .p-key');

  // A mouse plays by passing over, the way a hand brushes strings.
  section.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse') return;
    const el = pick(event.target);
    if (el && !el.contains(event.relatedTarget)) play(el);
  });

  // A finger plays on touch, and keeps playing as it slides across.
  let sliding = null;
  section.addEventListener('pointerdown', event => {
    const el = pick(event.target);
    if (!el) return;
    play(el);
    if (event.pointerType !== 'mouse') sliding = el;
  });

  section.addEventListener('pointermove', event => {
    if (!sliding || event.pointerType === 'mouse') return;
    const el = pick(document.elementFromPoint(event.clientX, event.clientY) || document.body);
    if (el && el !== sliding) {
      sliding = el;
      play(el);
    }
  });

  ['pointerup', 'pointercancel'].forEach(type => section.addEventListener(type, () => { sliding = null; }));

  // Focused, a string or key plays on Enter or Space.
  playable.forEach(el => el.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    play(el);
  }));

  // While the instruments are on screen, the number row plucks the strings
  // and the letter rows play the keys.
  let inView = false;
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
  }, { threshold: 0.2 }).observe($('.instruments', section));

  document.addEventListener('keydown', event => {
    if (!inView || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest('input, textarea, [contenteditable]')) return;
    const el = byKey.get(event.key.toLowerCase());
    if (el) play(el);
  });
})();
