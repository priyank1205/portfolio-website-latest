/* ============================================================================
   KhiladiPro case study (Claude): this page's own demos

   Built on the shared case study system (case-system.js, loaded first), which
   runs the chrome and provides the engines used here. What lives in this file
   is specific to KhiladiPro: the onboarding walk and its room diagram, the
   rehearsal comparison, the landing lab, the form notes and the constraints.
   ========================================================================== */

(() => {
  'use strict';

  const {
    reduced, pad, $, $$, runScroll,
    swap, pinnedSequence, showFrame, stack, swipePager, walk
  } = window.CaseSystem;

  /* --- 00 Brief: the constraints, swiped on a phone ---------------------- */

  const cgrid = $('.cgrid');
  if (cgrid) {
    const cards = $$('.cons', cgrid);
    swipePager(cgrid, cards, (card, i) =>
      `Constraint ${i + 1} of ${cards.length}: ${$('h3', card).textContent}`);
  }

  /* --- 01 Onboarding: the scroll-driven flow ---------------------------------- */

  const flow = $('[data-flow]');
  const stepSource = $('[data-steps]');
  if (flow && stepSource) {
    // The system walks the steps; this page adds the room diagram, which
    // moves the phone and the player to where each step happens.
    const room = $('[data-room]', flow);
    const roomPhase = $('[data-room-phase]', flow);
    walk(flow, stepSource, step => {
      roomPhase.textContent = step.phase;
      room.style.setProperty('--phone-x', `${step.phone}%`);
      room.style.setProperty('--player-x', `${step.player}%`);
      room.classList.toggle('is-moving', step.moving === '1' && !reduced.matches);
    });
  }

  /* --- 01 Onboarding: the rehearsal, side by side ------------------------ */

  const rehearsal = $('[data-rehearsal]');
  if (rehearsal) {
    const zones = $$('.zone', rehearsal);
    const labels = $$('.zone-label', rehearsal);
    let locked = '-1';
    let demo = null;

    // One zone lights on both screens at once: that is the whole argument.
    function light(z) {
      const key = String(z);
      zones.forEach(zone => zone.classList.toggle('is-on', zone.dataset.zone === key));
      labels.forEach(label => {
        const on = label.dataset.zone === key;
        label.classList.toggle('is-on', on);
        label.setAttribute('aria-pressed', String(on));
      });
    }

    const stopDemo = () => { if (demo) { clearTimeout(demo); demo = null; } };

    labels.forEach(label => {
      const z = label.dataset.zone;
      label.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { stopDemo(); light(z); } });
      label.addEventListener('pointerleave', () => light(locked));
      label.addEventListener('focus', () => { stopDemo(); light(z); });
      label.addEventListener('blur', () => light(locked));
      label.addEventListener('click', () => { stopDemo(); locked = locked === z ? '-1' : z; light(locked); });
    });

    // Walk the three zones once, the first time the stage comes into view.
    if ('IntersectionObserver' in window && !reduced.matches) {
      new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          self.disconnect();
          let step = 0;
          const next = () => {
            if (step > 2) { demo = null; light(locked); return; }
            light(step++);
            demo = setTimeout(next, 1100);
          };
          demo = setTimeout(next, 450);
        });
      }, { threshold: 0.45 }).observe($('.rehearsal-stage', rehearsal));
    }
  }

  /* --- 02 Landing: the viewport lab -------------------------------------- */

  const lab = $('[data-lab]');
  if (lab) {
    const views = {
      desktop: {
        width: '100%',
        fold: '54%',
        label: '1440 px',
        size: '1440 × 900',
        note: 'The photograph sits alongside the offer, not below it.',
        rows: [
          ['Olympiad headline'],
          ['25 May to 15 June'],
          ['For Khiladis'],
          ['For Parents', 'parent'],
          ['Ages 12 to 18'],
          ['Register Now', 'cta']
        ],
        cut: []
      },
      mobile: {
        // A ratio, so the phone stays proportional at every container width.
        width: '44.5%',
        fold: '99.5%',
        label: '390 px',
        size: '390 × 844',
        note: 'The parent’s line loses its place entirely.',
        rows: [
          ['Shorter olympiad headline'],
          ['25 May to 15 June'],
          ['Photograph'],
          ['For Khiladis'],
          ['Register Now', 'cta']
        ],
        cut: [['For Parents', 'parent'], ['Ages 12 to 18']]
      }
    };

    const frame = $('[data-viewport]', lab);
    const labWindow = $('.viewport-page', lab);
    const tag = $('[data-lens-tag]', lab);
    const list = $('[data-fold-list]', lab);
    const note = $('[data-fold-note]', lab);
    const widthEl = $('[data-fold-width]', lab);
    const rulerLabel = $('[data-ruler-label]', lab);
    const cutPanel = $('[data-lab-cut]', lab);
    const cutCopy = $('[data-cut-copy]', lab);
    const buttons = $$('[data-vp-btn]', lab);
    const readers = $$('.reader', lab);
    let view = 'desktop';
    let locked = null;

    const bandFor = reader => reader.dataset[view === 'mobile' ? 'bandMobile' : 'bandDesktop'];

    function light(reader) {
      const band = reader && bandFor(reader);
      readers.forEach(item => item.setAttribute('aria-pressed', String(item === reader)));

      if (!reader || band === 'cut') {
        lab.classList.remove('is-lit');
        const isCut = Boolean(reader) && band === 'cut';
        cutPanel.hidden = !isCut;
        if (isCut) {
          cutCopy.textContent = ` ${reader.querySelector('.who').textContent} has to scroll before the page says anything to them.`;
        }
        return;
      }

      cutPanel.hidden = true;
      lab.classList.add('is-lit');
      tag.textContent = `${reader.querySelector('.num').textContent} · ${reader.querySelector('.ask').textContent}`;
      const [start, end] = band.split(',').map(Number);
      labWindow.style.setProperty('--b1', `${start}%`);
      labWindow.style.setProperty('--b2', `${100 - end}%`);
    }

    function render(name) {
      view = name;
      const data = views[name];

      // Set max-width directly: a transition never runs when the value
      // arrives through a custom property, so the frame would not resize.
      frame.style.maxWidth = data.width;
      labWindow.style.setProperty('--fold', data.fold);
      widthEl.textContent = data.label.replace(' px', '');
      rulerLabel.textContent = data.size;
      lab.classList.toggle('is-mobile', name === 'mobile');
      note.textContent = data.note;

      list.textContent = '';
      [...data.rows.map(r => [...r, false]), ...data.cut.map(r => [...r, true])]
        .forEach(([text, role, cut], i) => {
          const li = document.createElement('li');
          if (role) li.dataset.role = role;
          li.classList.toggle('is-cut', Boolean(cut));
          li.innerHTML = `<span class="num">${pad(i + 1)}</span>`;
          li.append(text);
          list.append(li);
        });

      $$('[data-vp-shot]', lab).forEach(shot => { shot.hidden = shot.dataset.vpShot !== name; });

      // On a phone the desktop export only reads if it can be panned.
      lab.classList.toggle('is-wide', name === 'desktop');

      const zoom = $('.lab-zoom', lab);
      const shown = $(`[data-vp-shot="${name}"] .lens-base`, lab);
      if (zoom && shown) {
        zoom.dataset.zoomSrc = shown.getAttribute('src');
        zoom.dataset.zoomAlt = shown.alt;
      }
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.vpBtn === name)));

      // Tell each reader whether this width still serves them.
      readers.forEach(reader => {
        const state = $('[data-reader-state]', reader);
        const cut = bandFor(reader) === 'cut';
        reader.classList.toggle('is-cut', cut);
        state.textContent = cut ? 'Below the fold at this width' : '';
      });

      light(locked);
    }

    buttons.forEach(button => button.addEventListener('click', () => {
      button.classList.remove('is-hint');
      render(button.dataset.vpBtn);
    }));

    // Pulse the unselected tile once, so nobody scrolls past the control.
    if ('IntersectionObserver' in window && !reduced.matches) {
      new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          self.disconnect();
          const idle = buttons.find(b => b.getAttribute('aria-pressed') === 'false');
          if (!idle) return;
          idle.classList.add('is-hint');
          setTimeout(() => idle.classList.remove('is-hint'), 4800);
        });
      }, { threshold: 0.35 }).observe(lab);
    }
    readers.forEach(reader => {
      reader.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') light(reader); });
      reader.addEventListener('pointerleave', () => light(locked));
      reader.addEventListener('focus', () => light(reader));
      reader.addEventListener('blur', () => light(locked));
      reader.addEventListener('click', () => { locked = locked === reader ? null : reader; light(locked); });
    });

    render('desktop');
  }

  /* --- Legacy deep links -------------------------------------------------- */

  const aliases = {
    overview: 'brief', map: 'brief',
    'decision-1': 'landing', believe: 'landing', commit: 'landing',
    'decision-2': 'onboarding', setup: 'onboarding',
    'decision-3': 'event', app: 'event', return: 'event',
    rehire: 'outcome', scorecard: 'outcome', closing: 'outcome'
  };
  const target = aliases[location.hash.slice(1)];
  if (target) $(`#${target}`)?.scrollIntoView();

  runScroll();
})();
