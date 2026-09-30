/* ============================================================================
   About, Live: the behaviour

   A board of magnets to rearrange, a switch that reorders the record for
   whoever is asking, three values you can flip through, a table of what I
   can own that names its receipts, and the site's instrument, a kalimba in D
   major pentatonic. Sound, copy and the chrome come from live.js.
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

  /* --- What you came for: one record, three readers ------------------------------- */

  const ask = $('[data-ask]');
  if (ask) {
    const tabs = $$('[role="tab"]', ask);
    const thumb = $('[data-ask-thumb]', ask);
    function choose(i, focus) {
      tabs.forEach((tab, j) => {
        const on = j === i;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        panel.hidden = !on;
        panel.classList.toggle('is-on', on);
      });
      thumb.style.setProperty('--i', i);
      ask.style.setProperty('--a', `var(--${tabs[i].dataset.a}-rgb)`);
      if (focus) tabs[i].focus();
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        choose(i);
        sound.pluck(SCALE[4 + i * 2], 0.6);
      });
      tab.addEventListener('keydown', event => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
        if (!step) return;
        event.preventDefault();
        choose((i + step + tabs.length) % tabs.length, true);
      });
    });
    choose(0);
  }

  /* --- Values: flip through each moment ------------------------------------------- */

  $$('[data-flip]').forEach(tile => {
    const buttons = $$('[data-show]', tile);
    const images = $$('.value-phone img, .value-sheet img', tile);
    const cap = $('[data-cap]', tile);
    buttons.forEach((button, i) => button.addEventListener('click', () => {
      buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
      images.forEach((img, j) => img.classList.toggle('is-on', j === i));
      cap.textContent = button.dataset.cap;
      sound.pluck(SCALE[6 + i * 2], 0.5);
    }));
  });

  /* --- What I can own: each dot names where ------------------------------------------ */

  const can = $('[data-can]');
  if (can) {
    const table = $('table', can);
    const heads = $$('thead th', table);
    const names = heads.map(th => th.textContent.trim());
    const note = $('[data-can-note]', can);
    const idle = note.innerHTML;
    const colourOf = i => heads[i].style.getPropertyValue('--a');
    let lit = [];

    function light(cells, row) {
      lit.forEach(el => el.classList.remove('is-hot'));
      lit = [];
      if (row) { row.classList.add('is-hot'); lit.push(row); }
      cells.forEach(td => {
        td.classList.add('is-hot');
        const head = heads[td.cellIndex];
        head.classList.add('is-hot');
        lit.push(td, head);
      });
    }

    function say(cells, label) {
      if (!cells.length) {
        note.innerHTML = idle;
        return;
      }
      const parts = cells.map(td => `<span style="--a:${colourOf(td.cellIndex)}"><i></i><b>${names[td.cellIndex]}</b> ${td.dataset.note}</span>`);
      note.innerHTML = `<span class="n-in">${label ? `<b>${label}.</b> ` : ''}${parts.join('<span class="sep" aria-hidden="true">/</span>')}</span>`;
    }

    // Each column carries its product's colour down to its dots.
    $$('tbody tr', table).forEach(row => {
      $$('td', row).forEach(td => {
        td.style.setProperty('--a', colourOf(td.cellIndex));
        if (td.dataset.note) {
          td.tabIndex = 0;
          td.setAttribute('aria-label', `${names[td.cellIndex]}: ${td.dataset.note}`);
        }
      });
      const cells = $$('td[data-note]', row);
      const label = $('th', row).textContent;
      row.addEventListener('pointerenter', () => {
        light(cells, row);
        say(cells, label);
      });
    });

    $$('td[data-note]', table).forEach(td => {
      const show = () => {
        light([td], td.parentElement);
        say([td], $('th', td.parentElement).textContent);
        sound.tick(1100 + td.cellIndex * 120, 0.035);
      };
      td.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') show(); });
      td.addEventListener('focus', show);
      td.addEventListener('click', show);
    });

    table.addEventListener('pointerleave', () => {
      light([]);
      say([]);
    });
  }

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
