/* ============================================================================
   KhiladiPro, Thesis: this page's behaviour

   Built on thesis.js (loaded first), which already runs the theme switch,
   the sound, copying, the clock, the plates that cross-fade, and the map:
   every [data-for] link in the rail follows its chapter and fills as you
   read. What lives here is specific to this study:

     the rail          arrives once the opening has scrolled away
     the opening line  its surface words light up under a pointer
     reels             a row of screens, one lit at a time, on a timer
     the walk          nine onboarding screens, walked by scrolling
     keys              notes that point at a picture: zones, readers, pins
     the fold          two widths of one landing page, and who loses out
     the tally         numbers that count up, a segment at a time
   ========================================================================== */

(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const T = window.Thesis || {};
  const quiet = { pluck() {}, tick() {}, chime() {} };
  const sound = T.sound || quiet;
  const reduced = T.reduced || window.matchMedia('(prefers-reduced-motion: reduce)');
  const go = T.go || (target => target.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' }));
  const mouse = event => event.pointerType === 'mouse';

  // Run once, the first time something is well inside the window.
  function once(el, fn, threshold = 0.4) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const io = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      io.disconnect();
      fn();
    }, { threshold });
    io.observe(el);
  }

  /* --- The rail ------------------------------------------------------------- */

  const rail = $('[data-chapters]');
  const bar = $('.bar');
  if (rail && bar && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      rail.classList.toggle('is-shown', !entry.isIntersecting && entry.boundingClientRect.top < 0);
    }).observe(bar);
  }

  // On a phone the rail scrolls sideways; keep the chapter in view centred.
  const list = $('[data-ch-list]');
  let shownLink = null;
  function followRail() {
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const on = $('a.is-on', list);
    if (!on || on === shownLink) return;
    shownLink = on;
    list.scrollTo({ left: on.offsetLeft - (list.clientWidth - on.offsetWidth) / 2, behavior: reduced.matches ? 'auto' : 'smooth' });
  }

  let railPending = false;
  window.addEventListener('scroll', () => {
    if (railPending) return;
    railPending = true;
    requestAnimationFrame(() => {
      railPending = false;
      followRail();
    });
  }, { passive: true });

  // Any in-page link that thesis.js has not already taken scrolls smoothly.
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    const link = event.target.closest?.('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    event.preventDefault();
    go(target);
    history.replaceState(null, '', link.getAttribute('href'));
  });

  /* --- The opening line ---------------------------------------------------- */

  // thesis.js plucks each word and takes it to its chapter; here a word
  // also lights up, with its picture, while a pointer or focus is on it.
  const words = $$('.hero-s .w');
  words.forEach(word => {
    word.addEventListener('pointerenter', event => { if (mouse(event)) word.classList.add('is-hot'); });
    word.addEventListener('pointerleave', () => word.classList.remove('is-hot'));
    word.addEventListener('focus', () => word.classList.add('is-hot'));
    word.addEventListener('blur', () => word.classList.remove('is-hot'));
  });

  // One slow pass on arrival, so the words read as things to touch.
  if (!reduced.matches) {
    words.forEach((word, i) => {
      setTimeout(() => word.classList.add('is-hot'), 1100 + i * 900);
      setTimeout(() => word.classList.remove('is-hot'), 1100 + i * 900 + 820);
    });
  }

  /* --- Reels: a row of screens, one lit at a time ------------------------------ */

  // The segment under the lit screen fills; when it is full the next one
  // lights. A pointer on the reel holds it, it only runs while on screen,
  // and any screen or segment can be picked by hand.
  function reel(root, items, onShow) {
    const ticksEl = $('[data-reel-ticks]', root);
    const cap = $('[data-reel-cap]', root);
    let index = -1;

    const ticks = items.map((item, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Show ${item.getAttribute('aria-label')}`);
      button.append(document.createElement('i'));
      if (i && item.dataset.group && item.dataset.group !== items[i - 1].dataset.group) button.classList.add('is-gs');
      button.addEventListener('click', () => show(i, true));
      return button;
    });
    ticksEl.replaceChildren(...ticks);

    function show(i, byHand = false) {
      i = (i + items.length) % items.length;
      if (i === index) return;
      index = i;
      items.forEach((item, j) => {
        item.classList.toggle('is-on', j === i);
        item.setAttribute('aria-current', String(j === i));
      });
      ticks.forEach((tick, j) => tick.setAttribute('aria-current', String(j === i)));
      if (cap) cap.textContent = items[i].dataset.cap || items[i].dataset.group || '';
      if (onShow) onShow(i, byHand);
      if (byHand) sound.pluck(3 + i, 0.5);
    }

    items.forEach((item, i) => item.addEventListener('click', () => show(i, true)));
    ticksEl.addEventListener('animationend', () => show(index + 1));

    root.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1), true);
      ticks[index].focus();
    });

    // A sideways swipe steps through on touch.
    let startX = null;
    root.addEventListener('pointerdown', event => { if (!mouse(event)) startX = event.clientX; });
    root.addEventListener('pointerup', event => {
      if (startX === null) return;
      const dx = event.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1), true);
    });
    root.addEventListener('pointercancel', () => { startX = null; });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => entries.forEach(entry => {
        root.classList.toggle('is-running', entry.isIntersecting && !reduced.matches);
      }), { threshold: 0.4 }).observe(root);
    }

    show(0);
    return { show, get index() { return index; } };
  }

  const film = $('[data-reel="film"]');
  if (film) reel(film, $$('.film-item', film));

  // The event: the lit screen moves to the middle and its question follows.
  const days = $('[data-reel="days"]');
  if (days) {
    const items = $$('.day', days);
    const copy = $('.days-copy', days);
    const q = $('[data-days-q]', days);
    const title = $('[data-days-title]', days);
    const text = $('[data-days-copy]', days);
    reel(days, items, i => {
      items.forEach((item, j) => {
        const d = j - i;
        const far = Math.abs(d);
        item.style.setProperty('--d', d);
        item.style.setProperty('--s', d ? 0.86 : 1);
        item.style.setProperty('--o', d ? (far === 1 ? 0.5 : far === 2 ? 0.24 : 0.1) : 1);
        item.tabIndex = far > 2 ? -1 : 0;
      });
      q.textContent = items[i].dataset.q;
      title.textContent = items[i].getAttribute('aria-label');
      text.textContent = items[i].dataset.text;
      copy.classList.remove('is-new');
      void copy.offsetWidth;
      copy.classList.add('is-new');
    });
  }

  /* --- The walk: nine screens, walked by scrolling --------------------------------- */

  const walk = $('[data-walk]');
  if (walk) {
    const pin = $('.walk-pin', walk);
    const steps = $$('[data-walk-steps] li').map(li => ({ ...li.dataset, copy: li.textContent.trim() }));
    const shots = $$('[data-walk-screen] img', walk);
    const room = $('[data-room]', walk);
    const phase = $('[data-walk-phase]', walk);
    const count = $('[data-walk-count]', walk);
    const title = $('[data-walk-title]', walk);
    const copy = $('[data-walk-copy]', walk);
    const textBox = $('.walk-text', walk);
    const prev = $('[data-walk-prev]', walk);
    const next = $('[data-walk-next]', walk);
    const n = steps.length;
    let index = -1;

    const ticks = steps.map((step, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Screen ${i + 1}: ${step.title}`);
      button.append(document.createElement('i'));
      button.addEventListener('click', () => jump(i));
      return button;
    });
    $('[data-walk-ticks]', walk).replaceChildren(...ticks);

    const span = () => walk.offsetHeight - pin.offsetHeight;

    // Land in the middle of a step's stretch, so it is clearly the one shown.
    function jump(i) {
      i = clamp(i, 0, n - 1);
      const top = walk.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + span() * ((i + 0.5) / n), behavior: reduced.matches ? 'auto' : 'smooth' });
    }

    function render(i) {
      const step = steps[i];
      const moved = index !== -1;
      index = i;
      shots.forEach((shot, j) => shot.classList.toggle('is-on', j === i));
      ticks.forEach((tick, j) => tick.setAttribute('aria-current', String(j === i)));
      phase.textContent = step.phase;
      count.textContent = `${i + 1} of ${n}`;
      title.textContent = step.title;
      copy.textContent = step.copy;
      room.style.setProperty('--phone-x', `${step.phone}%`);
      room.style.setProperty('--player-x', `${step.player}%`);
      room.classList.toggle('is-down', step.down === '1');
      room.classList.toggle('is-moving', step.moving === '1' && !reduced.matches);
      prev.disabled = i === 0;
      next.disabled = i === n - 1;
      if (moved) {
        textBox.classList.remove('is-new');
        void textBox.offsetWidth;
        textBox.classList.add('is-new');
        sound.tick(2 + i);
      }
    }

    function onScroll() {
      const length = span();
      const p = length > 0 ? clamp(-walk.getBoundingClientRect().top / length, 0, 0.99999) : 0;
      const raw = p * n;
      const i = Math.floor(raw);
      const f = raw - i;
      ticks.forEach((tick, j) => tick.style.setProperty('--f', j < i ? 1 : j === i ? f.toFixed(3) : 0));
      if (i !== index) render(i);
    }

    prev.addEventListener('click', () => jump(index - 1));
    next.addEventListener('click', () => jump(index + 1));
    render(0);
    onScroll();
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
  }

  /* --- Keys: notes that point at a picture ----------------------------------------- */

  // Hover or focus previews, a click holds, a second click lets go. While
  // nothing is held, the picture shows the preview, then returns to rest.
  function keys(buttons, apply) {
    let held = null;
    let preview = null;
    const paint = () => {
      const lit = preview ?? held;
      buttons.forEach(button => {
        const id = button.dataset.key;
        button.classList.toggle('is-on', id === lit);
        button.setAttribute('aria-pressed', String(id === held));
      });
      apply(lit);
    };
    buttons.forEach(button => {
      const id = button.dataset.key;
      const note = 4 + Number(id) * 2;
      button.addEventListener('pointerenter', event => {
        if (!mouse(event)) return;
        preview = id;
        paint();
        sound.pluck(note, 0.35);
      });
      button.addEventListener('pointerleave', () => { preview = null; paint(); });
      button.addEventListener('focus', () => { preview = id; paint(); });
      button.addEventListener('blur', () => { preview = null; paint(); });
      button.addEventListener('click', () => {
        held = held === id ? null : id;
        preview = null;
        paint();
        sound.pluck(note, 0.6);
      });
    });
    paint();
    return {
      // A slow pass through every note, once, then back to rest.
      tour(ids, ms = 1100) {
        if (reduced.matches) return;
        let k = 0;
        const step = () => {
          if (held !== null) return;
          preview = k < ids.length ? ids[k] : null;
          paint();
          if (k++ < ids.length) setTimeout(step, ms);
        };
        setTimeout(step, 400);
      }
    };
  }

  // Same frame: one part lights on both screens at once.
  const pair = $('[data-pair]');
  if (pair) {
    const zoneKeys = $$('.key[data-zone]', pair);
    zoneKeys.forEach(button => { button.dataset.key = button.dataset.zone; });
    const zones = $$('.zone', pair);
    const control = keys(zoneKeys, lit => zones.forEach(zone => zone.classList.toggle('is-on', zone.dataset.zone === lit)));
    once($('.plate--pair', pair), () => control.tour(['0', '1', '2']), 0.5);
  }

  // The form: each decision spotlights where it lives.
  const annot = $('[data-annot]');
  if (annot) {
    const notes = $$('.key[data-note]', annot);
    const marks = $$('.mark[data-note]', annot);
    const shot = $('[data-form]', annot);
    const spot = $('[data-spot]', annot);
    [...notes, ...marks].forEach(button => { button.dataset.key = button.dataset.note; });
    const regions = Object.fromEntries(notes.map(note => [note.dataset.note, note.dataset.region.split(',')]));
    const apply = lit => {
      [...notes, ...marks].forEach(button => button.classList.toggle('is-on', button.dataset.note === lit));
      shot.classList.toggle('is-lit', lit !== null);
      if (lit === null) return;
      const [t, r, b, l] = regions[lit];
      spot.style.cssText = `--t:${t}%;--r:${r}%;--b:${b}%;--l:${l}%`;
    };
    // The numbered marks on the form and the notes below share one state.
    keys([...notes, ...marks], apply);
  }

  /* --- The fold: one page at two widths ---------------------------------------------- */

  const lab = $('[data-lab]');
  if (lab) {
    const views = {
      desktop: {
        label: '1440 px',
        note: 'The photograph sits alongside the offer, not below it.',
        zoom: '../assets/images/khiladipro/web/landing-desktop.webp',
        alt: 'The full olympiad landing page at desktop width',
        rows: ['Olympiad headline', '25 May to 15 June', 'For Khiladis', 'For Parents', 'Ages 12 to 18', 'Register now'],
        cut: []
      },
      mobile: {
        label: '390 px',
        note: 'The parent’s line loses its place entirely.',
        zoom: '../assets/images/khiladipro/web/landing-mobile.webp',
        alt: 'The olympiad landing page at phone width',
        rows: ['Shorter olympiad headline', '25 May to 15 June', 'Photograph', 'For Khiladis', 'Register now'],
        cut: ['For Parents', 'Ages 12 to 18']
      }
    };

    const plate = $('[data-lab-plate]', lab);
    const pages = $$('[data-page]', lab);
    const sizeButtons = $$('[data-vp]', lab);
    const readers = $$('.reader', lab);
    const cap = $('[data-lab-cap]', lab);
    const restCap = cap.textContent;
    const cut = $('[data-lab-cut]', lab);
    const cutCopy = $('[data-lab-cut-copy]', lab);
    const width = $('[data-fold-width]', lab);
    const items = $('[data-fold-items]', lab);
    const note = $('[data-fold-note]', lab);
    const zoom = $('.lab-bar [data-zoom]', lab);
    readers.forEach((reader, i) => { reader.dataset.key = String(i); });
    let view = 'desktop';
    let lit = null;

    const bandFor = reader => reader.dataset[view === 'mobile' ? 'bandMobile' : 'bandDesktop'];

    function light(id) {
      lit = id;
      const reader = id === null ? null : readers[Number(id)];
      const band = reader && bandFor(reader);
      readers.forEach(r => r.classList.toggle('is-on', r === reader));
      cap.textContent = reader ? `${reader.querySelector('b').textContent}: ${reader.querySelector('.ask').textContent}` : restCap;
      if (!reader || band === 'cut') {
        lab.classList.remove('is-lit');
        cut.hidden = !reader;
        if (reader) cutCopy.textContent = ` ${reader.querySelector('b').textContent} has to scroll before the page says anything to them.`;
        return;
      }
      cut.hidden = true;
      const [start, end] = band.split(',').map(Number);
      plate.style.setProperty('--b1', `${start}%`);
      plate.style.setProperty('--b2', `${100 - end}%`);
      lab.classList.add('is-lit');
    }

    function render(name) {
      view = name;
      const data = views[name];
      pages.forEach(page => {
        const on = page.dataset.page === name;
        page.classList.toggle('is-on', on);
        page.setAttribute('aria-hidden', String(!on));
      });
      sizeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.vp === name)));
      width.textContent = data.label;
      note.textContent = data.note;
      items.replaceChildren(...[...data.rows.map(text => [text, false]), ...data.cut.map(text => [text, true])].map(([text, isCut], i) => {
        const span = document.createElement('span');
        span.textContent = text;
        span.style.animationDelay = `${i * 40}ms`;
        if (isCut) span.classList.add('is-cut');
        return span;
      }));
      zoom.dataset.zoomSrc = data.zoom;
      zoom.dataset.zoomAlt = data.alt;
      zoom.dataset.zoomTall = name === 'mobile' ? '1' : '';
      readers.forEach(reader => {
        const isCut = bandFor(reader) === 'cut';
        reader.classList.toggle('is-cut', isCut);
        $('[data-reader-state]', reader).textContent = isCut ? 'Below the fold at this width' : '';
      });
      light(lit);
    }

    sizeButtons.forEach((button, i) => button.addEventListener('click', () => {
      render(button.dataset.vp);
      sound.pluck(6 + i * 3, 0.5);
    }));
    const control = keys(readers, light);
    render('desktop');
    once(plate, () => control.tour(['0', '1', '2'], 1300), 0.45);
  }

  /* --- The tally: count up, a segment at a time ------------------------------------- */

  const tally = $('[data-tally]');
  if (tally) {
    const cells = $$('dt[data-count]', tally).map(dt => {
      const total = Number(dt.dataset.count);
      const segs = $('.tally-segs', dt.parentElement);
      segs.replaceChildren(...Array.from({ length: total }, () => document.createElement('i')));
      return { dt, total, segs: [...segs.children] };
    });
    const paint = (cell, value) => {
      cell.dt.textContent = value;
      cell.segs.forEach((seg, i) => seg.classList.toggle('is-off', i >= value));
    };
    if (!reduced.matches) {
      cells.forEach(cell => paint(cell, 0));
      once(tally, () => cells.forEach((cell, c) => {
        for (let v = 1; v <= cell.total; v += 1) {
          setTimeout(() => {
            paint(cell, v);
            if (c === 1) sound.tick(v);
          }, 180 * c + 90 * v);
        }
      }), 0.5);
    }
  }

  /* --- Drawings, journeys and lists that answer a pointer ------------------------------ */

  $$('[data-draw]').forEach(el => once(el, () => el.classList.add('is-in'), 0.45));

  ['.jr', '.proto'].forEach(selector => $$(selector).forEach((el, i) => {
    el.addEventListener('pointerenter', event => { if (mouse(event)) sound.pluck(3 + i, 0.35); });
  }));

  /* --- Full size ----------------------------------------------------------------------- */

  const viewer = $('[data-viewer]');
  if (viewer && typeof viewer.showModal === 'function') {
    const img = $('img', viewer);
    $$('[data-zoom]').forEach(button => button.addEventListener('click', () => {
      img.src = button.dataset.zoomSrc;
      img.alt = button.dataset.zoomAlt || '';
      viewer.classList.toggle('is-tall', button.dataset.zoomTall === '1');
      viewer.showModal();
      $('.viewer-body', viewer).scrollTop = 0;
    }));
    $('[data-viewer-close]', viewer).addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  }
})();
