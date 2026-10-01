/* ============================================================================
   About, Thesis: the kalimba

   Fourteen tines in D major pentatonic, low notes in the middle and climbing
   outwards, as on a real kalimba. Sweep across, tap one, or play the keys A
   to J and Q to U while it is on screen. Sound comes from thesis.js.
   ========================================================================== */

(() => {
  'use strict';

  const { sound, reduced } = window.Thesis;
  const kalimba = document.querySelector('[data-tines]');
  if (!kalimba) return;

  const KEYS = 'asdfghjqwertyu';
  const COLOURS = ['var(--kp)', 'var(--sedp)', 'var(--gm)', 'var(--mp)', 'var(--ts)'];
  const order = [];
  for (let n = 13; n >= 0; n--) if (n % 2 === 1) order.push(n);
  for (let n = 0; n <= 13; n++) if (n % 2 === 0) order.push(n);

  const tines = order.map(n => {
    const tine = document.createElement('span');
    tine.className = 'tine';
    tine.dataset.n = String(n);
    tine.style.setProperty('--h', `${Math.round(170 - n * 7)}px`);
    tine.style.setProperty('--c', COLOURS[n % COLOURS.length]);
    kalimba.append(tine);
    return tine;
  });
  const byNote = new Map(tines.map(t => [Number(t.dataset.n), t]));

  function play(tine, vel = 0.9) {
    sound.pluck(Number(tine.dataset.n), vel);
    tine.classList.add('is-lit');
    clearTimeout(tine.lit);
    tine.lit = setTimeout(() => tine.classList.remove('is-lit'), 160);
    if (!reduced.matches) {
      tine.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(2.4deg)' },
        { transform: 'rotate(-1.6deg)' },
        { transform: 'rotate(0.8deg)' },
        { transform: 'rotate(0deg)' }
      ], { duration: 520, easing: 'ease-out' });
    }
  }

  let sweeping = false;
  let last = null;
  kalimba.addEventListener('pointerdown', event => {
    sweeping = true;
    kalimba.setPointerCapture(event.pointerId);
    const tine = event.target.closest('.tine');
    if (tine) {
      last = tine;
      play(tine, 1);
    }
  });
  kalimba.addEventListener('pointermove', event => {
    const hit = sweeping ? document.elementFromPoint(event.clientX, event.clientY) : event.target;
    const tine = hit && hit.closest && hit.closest('.tine');
    if (event.pointerType !== 'mouse' && !sweeping) return;
    if (tine && tine !== last) {
      last = tine;
      play(tine, sweeping ? 0.85 : 0.55);
    }
  });
  const stop = () => { sweeping = false; };
  kalimba.addEventListener('pointerup', stop);
  kalimba.addEventListener('pointercancel', stop);
  kalimba.addEventListener('pointerleave', () => { if (!sweeping) last = null; });

  let inView = false;
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { threshold: 0.4 }).observe(kalimba);
  document.addEventListener('keydown', event => {
    if (!inView || event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
    if (event.target.closest?.('input, textarea, [contenteditable]')) return;
    const n = KEYS.indexOf(event.key.toLowerCase());
    if (n >= 0) play(byNote.get(n), 0.9);
  });
})();
