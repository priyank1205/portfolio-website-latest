/* ============================================================================
   About, Live: the behaviour

   A board of magnets to rearrange, three principles drawn as small moving
   pictures, eight things I bring, each with a note, and the site's
   instrument, a kalimba in D major pentatonic. Sound, copy, the close and the
   chrome come from live.js.
   ========================================================================== */

(() => {
  'use strict';

  const { sound, SCALE, CYCLE, rgb, reduced, clamp } = window.Live;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* --- The board: magnets you can move ------------------------------------------ */

  const board = $('[data-board]');
  if (board) {
    const magnets = $$('.magnet', board);
    let held = null;

    magnets.forEach((magnet, i) => {
      magnet.addEventListener('pointerdown', event => {
        event.preventDefault();
        board.classList.remove('is-tidying');
        const b = board.getBoundingClientRect();
        const m = magnet.getBoundingClientRect();
        held = {
          magnet,
          sx: event.clientX,
          sy: event.clientY,
          dx: parseFloat(magnet.style.getPropertyValue('--dx')) || 0,
          dy: parseFloat(magnet.style.getPropertyValue('--dy')) || 0,
          // How far it may travel before it leaves the board.
          minX: b.left - m.left + 8,
          maxX: b.right - m.right - 8,
          minY: b.top - m.top + 8,
          maxY: b.bottom - m.bottom - 44
        };
        magnet.setPointerCapture(event.pointerId);
        magnet.classList.add('is-held');
        magnets.forEach(other => { other.style.zIndex = other === magnet ? 3 : 1; });
        sound.pluck(SCALE[clamp(i * 2 + 3, 0, 13)], 0.55);
      });
      magnet.addEventListener('pointermove', event => {
        if (!held || held.magnet !== magnet) return;
        const x = clamp(event.clientX - held.sx, held.minX, held.maxX);
        const y = clamp(event.clientY - held.sy, held.minY, held.maxY);
        magnet.style.setProperty('--dx', `${held.dx + x}px`);
        magnet.style.setProperty('--dy', `${held.dy + y}px`);
      });
      const drop = () => {
        if (!held || held.magnet !== magnet) return;
        held = null;
        magnet.classList.remove('is-held');
        sound.tick(1320, 0.04);
      };
      magnet.addEventListener('pointerup', drop);
      magnet.addEventListener('pointercancel', drop);
    });

    $('[data-tidy]', board).addEventListener('click', () => {
      board.classList.add('is-tidying');
      magnets.forEach(magnet => {
        magnet.style.removeProperty('--dx');
        magnet.style.removeProperty('--dy');
      });
      sound.chime();
    });
  }

  /* --- How I work: a tap on a phone does what a pointer does on a laptop -------- */

  $$('.principle').forEach((tile, i) => {
    tile.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') sound.pluck(SCALE[5 + i * 2], 0.45);
    });
    tile.addEventListener('click', () => {
      tile.classList.toggle('is-lit');
      sound.pluck(SCALE[5 + i * 2], 0.6);
    });
  });

  /* --- What I bring: each one has a note ---------------------------------------- */

  $$('[data-bring] .cap').forEach((cap, i) => {
    cap.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') sound.pluck(SCALE[clamp(3 + i, 0, 13)], 0.4);
    });
  });

  /* --- The kalimba -------------------------------------------------------------------- */

  const kalimba = $('[data-tines]');
  if (kalimba) {
    // Low notes in the middle, climbing outwards left and right, as on a real
    // kalimba. Keys: A to J play the lower seven, Q to U the upper seven.
    const KEYS = 'asdfghjqwertyu';
    const order = [];
    for (let n = 13; n >= 0; n--) {
      if (n % 2 === 1) order.push(n);
    }
    for (let n = 0; n <= 13; n++) {
      if (n % 2 === 0) order.push(n);
    }
    const tines = order.map(n => {
      const tine = document.createElement('span');
      tine.className = 'tine';
      tine.dataset.n = String(n);
      tine.dataset.key = KEYS[n].toUpperCase();
      tine.style.setProperty('--h', `${Math.round(230 - n * 10)}px`);
      tine.style.setProperty('--c', rgb(CYCLE[n % CYCLE.length]));
      kalimba.append(tine);
      return tine;
    });
    const byNote = new Map(tines.map(t => [Number(t.dataset.n), t]));

    function play(tine, vel = 0.9) {
      const n = Number(tine.dataset.n);
      sound.pluck(SCALE[n], vel);
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
      const tine = event.target.closest('.tine');
      sweeping = true;
      kalimba.setPointerCapture(event.pointerId);
      if (tine) {
        last = tine;
        play(tine, 1);
      }
    });
    kalimba.addEventListener('pointermove', event => {
      if (event.pointerType === 'mouse' && !sweeping) {
        const tine = event.target.closest('.tine');
        if (tine && tine !== last) {
          last = tine;
          play(tine, 0.6);
        }
        return;
      }
      if (!sweeping) return;
      const hit = document.elementFromPoint(event.clientX, event.clientY);
      const tine = hit && hit.closest('.tine');
      if (tine && tine !== last) {
        last = tine;
        play(tine, 0.85);
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
  }

  /* --- Chips that play ---------------------------------------------------------------- */

  $$('[data-chips] button').forEach((button, i) => {
    button.style.setProperty('--c', rgb(CYCLE[i % CYCLE.length]));
    const play = vel => {
      sound.pluck(SCALE[clamp(i + 4, 0, 13)], vel);
      button.classList.add('is-lit');
      clearTimeout(button.lit);
      button.lit = setTimeout(() => button.classList.remove('is-lit'), 260);
    };
    button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') play(0.6); });
    button.addEventListener('click', () => play(0.9));
  });

})();
