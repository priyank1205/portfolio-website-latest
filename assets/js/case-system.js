/* ============================================================================
   Case study system: behaviour

   Shared by every case study. It runs the chrome that works from markup alone
   (chapter rail, hero deck, screen gallery, annotated artifacts, count-up,
   pointer light, viewer, reveal) and exposes the engines a page builds its own demos from, as
   window.CaseSystem. Load it before the page's own script, both deferred.

   Every behaviour is progressive enhancement: without this file a case study
   still reads completely, it just stops being operable.
   ========================================================================== */

(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pad = n => String(n).padStart(2, '0');
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // Everything that needs the scroll position shares one rAF-throttled pass.
  const onScroll = [];
  let queued = false;
  const runScroll = () => { queued = false; onScroll.forEach(fn => fn()); };
  const queueScroll = () => { if (!queued) { queued = true; requestAnimationFrame(runScroll); } };
  addEventListener('scroll', queueScroll, { passive: true });
  addEventListener('resize', queueScroll, { passive: true });

  // Re-trigger the swap-in animation on text that changed.
  function swap(...els) {
    els.forEach(el => {
      el.classList.remove('swap');
      void el.offsetWidth;
      el.classList.add('swap');
    });
  }

  // Shared engine for the pinned sequences (onboarding, and the event states).
  // Scroll progress picks the index; goTo scrolls to a step's midpoint so the
  // controls land exactly, which matters when the page is being presented.
  function pinnedSequence(root, count, render) {
    const sticky = $('.flow-sticky', root);
    let index = -1;
    let target = 0;

    const travel = () => root.offsetHeight - sticky.offsetHeight;
    const stepTop = i => Math.round(
      root.getBoundingClientRect().top + scrollY + (travel() * (i + 0.5)) / count
    );

    function goTo(i) {
      target = clamp(i, 0, count - 1);
      scrollTo({ top: stepTop(target), behavior: reduced.matches ? 'instant' : 'smooth' });
    }

    function read() {
      const span = travel();
      if (span <= 0) { if (index !== 0) { index = 0; render(0); } return; }
      const progressed = clamp(-root.getBoundingClientRect().top / span, 0, 1);
      const next = clamp(Math.floor(progressed * count), 0, count - 1);
      if (next === index) return;
      index = next;
      target = next;
      render(next);
    }

    // Arrow keys work while the pinned stage owns the screen.
    addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.target.closest('input, textarea, select')) return;
      const box = sticky.getBoundingClientRect();
      if (box.bottom < 160 || box.top > innerHeight - 160) return;
      event.preventDefault();
      goTo(target + (event.key === 'ArrowRight' ? 1 : -1));
    });

    onScroll.push(read);
    root.classList.add('is-live');
    read();
    return { goTo, at: () => target };
  }

  function showFrame(screen, index) {
    $$('[data-frame]', screen).forEach((img, i) => img.classList.toggle('is-on', i === index));
  }

  // A line that changes with the step holds every version at once, stacked
  // in one grid cell, and shows only the current one. Its box is always as
  // tall as the longest version, so nothing around it moves between steps:
  // on a phone the device above keeps one size, and on a wide screen the
  // centred copy column stops shifting.
  function stack(el, texts) {
    el.classList.add('stack');
    el.textContent = '';
    const versions = texts.map(text => {
      const span = document.createElement('span');
      span.textContent = text;
      el.append(span);
      return span;
    });
    return index => versions.forEach((span, i) => span.classList.toggle('is-on', i === index));
  }

  // A set that swipes on a phone gets a pager: one segment per item, lit for
  // the item at the start edge, each one a way straight to its item. The
  // stylesheet only shows it where the set actually scrolls.
  // onChange(index), if given, hears which item has settled at the start.
  function swipePager(track, items, labelFor, onChange) {
    const edge = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const pager = document.createElement('div');
    pager.className = 'segments segments--pager';
    pager.setAttribute('role', 'group');
    pager.setAttribute('aria-label', 'Choose a card');

    const buttons = items.map((item, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', labelFor(item, i));
      button.append(document.createElement('span'));
      button.addEventListener('click', () => {
        const left = track.scrollLeft + item.getBoundingClientRect().left
          - track.getBoundingClientRect().left - edge();
        track.scrollTo({ left, behavior: reduced.matches ? 'instant' : 'smooth' });
      });
      pager.append(button);
      return button;
    });
    track.after(pager);

    let current = -1;
    function mark() {
      const start = track.getBoundingClientRect().left + edge();
      let best = 0;
      let gap = Infinity;
      items.forEach((item, i) => {
        const d = Math.abs(item.getBoundingClientRect().left - start);
        if (d < gap) { gap = d; best = i; }
      });
      if (best === current) return;
      current = best;
      buttons.forEach((button, i) => button.setAttribute('aria-current', String(i === best)));
      if (onChange) onChange(best);
    }

    let frame = 0;
    track.addEventListener('scroll', () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; mark(); });
    }, { passive: true });
    mark();
  }


  // A walk through a flow, one step per stretch of scroll, on the pinned
  // engine. Steps come from a list: each <li> carries data-title, an optional
  // data-phase, any extra data the page wants, and its copy as text. The
  // stage shows one [data-frame] per step; the meter gets a tick per step.
  // onStep(step, index) lets a page add its own layer (a diagram, a map).
  function walk(root, source, onStep) {
    const steps = $$('li', source).map(li => ({ ...li.dataset, copy: li.textContent.trim() }));
    const screen = $('[data-flow-screen]', root);
    const count = $('[data-flow-count]', root);
    const ticksWrap = $('[data-flow-ticks]', root);
    const titleEl = $('[data-flow-title]', root);
    const copyEl = $('[data-flow-copy]', root);
    const phaseEl = $('[data-flow-phase]', root);
    const frames = $$('[data-frame]', screen);
    const showTitle = stack(titleEl, steps.map(step => step.title));
    const showCopy = stack(copyEl, steps.map(step => step.copy));
    let index = -1;

    const ticks = steps.map(() => {
      const tick = document.createElement('button');
      ticksWrap.append(tick);
      return tick;
    });

    function render(next) {
      if (next === index) return;
      index = next;
      const step = steps[index];

      showFrame(screen, index);
      if (phaseEl && step.phase) phaseEl.lastChild.textContent = step.phase;
      showTitle(index);
      showCopy(index);
      count.textContent = `${pad(index + 1)} / ${pad(steps.length)}`;
      if (onStep) onStep(step, index);
      if (!reduced.matches) swap(...[phaseEl, titleEl, copyEl].filter(Boolean));

      ticks.forEach((tick, i) => {
        tick.classList.toggle('is-on', i === index);
        tick.classList.toggle('is-past', i < index);
        tick.setAttribute('aria-selected', String(i === index));
      });

      // Decode the neighbours so stepping never flashes an empty screen.
      [index + 1, index - 1].forEach(i => {
        const img = frames[i];
        if (img) img.loading = 'eager';
      });
    }

    const seq = pinnedSequence(root, steps.length, render);

    ticks.forEach((tick, i) => {
      tick.type = 'button';
      tick.setAttribute('role', 'tab');
      tick.setAttribute('aria-label', `Step ${i + 1}: ${steps[i].title}`);
      tick.addEventListener('click', () => seq.goTo(i));
    });
    $('[data-flow-prev]', root).addEventListener('click', () => seq.goTo(seq.at() - 1));
    $('[data-flow-next]', root).addEventListener('click', () => seq.goTo(seq.at() + 1));
    return seq;
  }

  // An annotated artifact: notes that spotlight their region of a design.
  // Each note carries data-region="top,right,bottom,left" as insets in
  // percent of the design. Optional step tabs switch the design shown; the
  // notes describe the first one, so choosing a note returns to it.
  function annotate(root) {
    const screen = $('[data-annot-screen]', root);
    const notes = $$('[data-note]', root);
    const pins = $$('[data-pin]', root);
    const tabs = $$('[role="tab"][data-step]', root);
    let step = 0;
    let locked = null;

    function show(i) {
      step = i;
      showFrame(screen, i);
      screen.dataset.shown = String(i);
      tabs.forEach((tab, n) => {
        tab.setAttribute('aria-selected', String(n === i));
        tab.tabIndex = n === i ? 0 : -1;
      });
    }

    function light(note) {
      const on = note !== null;
      if (on && step !== 0) show(0);
      screen.classList.toggle('is-lit', on);
      notes.forEach(n => n.setAttribute('aria-pressed', String(n === note)));
      pins.forEach(pin => pin.classList.toggle('is-on', on && pin.dataset.pin === note.dataset.note));
      if (!on) return;
      const [t, r, b, l] = note.dataset.region.split(',');
      screen.style.setProperty('--y1', `${t}%`);
      screen.style.setProperty('--x2', `${r}%`);
      screen.style.setProperty('--y2', `${b}%`);
      screen.style.setProperty('--x1', `${l}%`);
    }

    notes.forEach(note => {
      note.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') light(note); });
      note.addEventListener('pointerleave', () => light(locked));
      note.addEventListener('focus', () => light(note));
      note.addEventListener('blur', () => light(locked));
      note.addEventListener('click', () => { locked = locked === note ? null : note; light(locked); });
    });

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => { locked = null; light(null); show(i); });
      tab.addEventListener('keydown', event => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const next = (i + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        locked = null;
        light(null);
        show(next);
        tabs[next].focus();
      });
    });

    show(0);
  }

  /* --- Chapter rail ------------------------------------------------------- */

  const railLinks = $$('.rail a:not(.rail-home)');
  const chapters = railLinks.map(a => $(a.getAttribute('href')));
  const progress = $('.progress');
  const rail = $('.rail');
  const railTrack = $('.rail .wrap');
  const floatingNav = $('.nav');

  onScroll.push(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max > 0 ? Math.min(100, (scrollY / max) * 100) : 0}%`;

    // The floating pill steps aside once the chapter rail reaches the top.
    if (floatingNav && rail) {
      floatingNav.classList.toggle('is-off', rail.getBoundingClientRect().top <= 8);
    }

    let active = 0;
    chapters.forEach((chapter, i) => {
      if (chapter && chapter.getBoundingClientRect().top <= 180) active = i;
    });
    railLinks.forEach((link, i) => {
      if (i === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    // On a phone the tabs scroll: the active one comes to rest on the gutter,
    // the same left edge as the page beneath it.
    if (railTrack && railTrack.scrollWidth > railTrack.clientWidth) {
      const box = railTrack.getBoundingClientRect();
      const cur = railLinks[active].getBoundingClientRect();
      const edge = parseFloat(getComputedStyle(railTrack).paddingLeft) || 16;
      if (cur.left < box.left + edge - 1 || cur.right > box.right - edge + 1) {
        railTrack.scrollBy({ left: cur.left - box.left - edge, behavior: reduced.matches ? 'instant' : 'smooth' });
      }
    }
  });

  /* --- Hero: auto-cycling device ----------------------------------------- */

  const cycler = $('[data-cycler]');
  if (cycler) {
    const deck = $('[data-deck]', cycler);
    const items = $$('[data-deck-item]', cycler);
    const segments = $$('.segments button', cycler);
    const label = $('[data-cycler-label]', cycler);
    const count = $('[data-cycler-count]', cycler);
    // Each screen carries its own caption, as data-caption on its deck item.
    const captions = items.map(item => item.dataset.caption || label.textContent);
    let index = 0;
    let timer = null;

    // On a phone the deck is a scroll-snap filmstrip, so the screens sit side
    // by side and swiping is what moves them. On a wide screen it is a stack.
    const swipeable = () => deck.scrollWidth > deck.clientWidth + 4;

    function mark(next) {
      index = (next + items.length) % items.length;
      items.forEach((item, i) => item.classList.toggle('is-on', i === index));
      segments.forEach((seg, i) => {
        seg.setAttribute('aria-current', String(i === index));
        seg.classList.toggle('is-done', i < index);
      });
      label.textContent = captions[index];
      count.textContent = `${index + 1}/${items.length}`;
    }

    function show(next) {
      const to = (next + items.length) % items.length;
      if (swipeable()) {
        const item = items[to];
        deck.scrollTo({
          left: item.offsetLeft - (deck.clientWidth - item.offsetWidth) / 2,
          behavior: reduced.matches ? 'instant' : 'smooth'
        });
        return;
      }
      mark(to);
    }

    // Swiping is the source of truth once the filmstrip scrolls.
    let settle = null;
    deck.addEventListener('scroll', () => {
      if (!swipeable()) return;
      clearTimeout(settle);
      settle = setTimeout(() => {
        const mid = deck.scrollLeft + deck.clientWidth / 2;
        let best = 0;
        let gap = Infinity;
        items.forEach((item, i) => {
          const d = Math.abs(item.offsetLeft + item.offsetWidth / 2 - mid);
          if (d < gap) { gap = d; best = i; }
        });
        if (best !== index) mark(best);
      }, 90);
    }, { passive: true });

    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    function play() {
      if (reduced.matches || swipeable()) return;
      stop();
      timer = setInterval(() => show(index + 1), 4000);
    }

    segments.forEach((seg, i) => seg.addEventListener('click', () => { show(i); play(); }));
    cycler.addEventListener('pointerenter', stop);
    cycler.addEventListener('pointerleave', play);
    cycler.addEventListener('focusin', stop);
    cycler.addEventListener('focusout', play);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : play()));

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        entries.forEach(entry => (entry.isIntersecting ? play() : stop()));
      }, { threshold: 0.25 }).observe(cycler);
    } else {
      play();
    }
    show(0);
  }

  /* --- 03 Event: the pinned state sequence ------------------------------- */

  const states = $('[data-states]');
  const statesFlow = $('[data-states-flow]');
  if (states && statesFlow) {
    const screen = $('[data-states-screen]', states);
    const frames = $$('[data-frame]', screen);
    const thumbs = $$('[data-state]', states);
    const copies = $$('[data-state-copies] li').map(li => li.textContent.trim());
    const groupEl = $('[data-state-group]', states);
    const titleEl = $('[data-state-title]', states);
    const copyEl = $('[data-state-copy]', states);
    const qEl = $('[data-state-q]', states);
    const countEl = $('[data-states-count]', states);
    const showTitle = stack(titleEl, thumbs.map(thumb => thumb.dataset.title));
    const showCopy = stack(copyEl, thumbs.map((thumb, n) => copies[n] || ''));
    const showQ = stack(qEl, thumbs.map(thumb => thumb.dataset.q));

    function render(i) {
      showFrame(screen, i);
      thumbs.forEach((t, n) => t.setAttribute('aria-selected', String(n === i)));
      const thumb = thumbs[i];
      groupEl.textContent = thumb.dataset.group;
      showTitle(i);
      showCopy(i);
      showQ(i);
      countEl.textContent = `${pad(i + 1)} / ${pad(thumbs.length)}`;
      if (!reduced.matches) swap(groupEl, titleEl, copyEl, qEl);

      // Where the picker scrolls (a row of pills on a phone), the pill on
      // show is kept centred, so its neighbours stay visible either side.
      const list = thumb.parentElement;
      if (list.scrollWidth > list.clientWidth + 4) {
        const box = list.getBoundingClientRect();
        const cur = thumb.getBoundingClientRect();
        const offset = cur.left + cur.width / 2 - (box.left + box.width / 2);
        if (Math.abs(offset) > 1) {
          list.scrollBy({ left: offset, behavior: reduced.matches ? 'instant' : 'smooth' });
        }
      }

      const next = frames[i + 1];
      if (next) next.loading = 'eager';
    }

    const seq = pinnedSequence(statesFlow, thumbs.length, render);

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => seq.goTo(i));
      thumb.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (i + 1) % thumbs.length;
        if (event.key === 'ArrowLeft') next = (i - 1 + thumbs.length) % thumbs.length;
        if (next === undefined) return;
        event.preventDefault();
        thumbs[next].focus();
      });
    });
    $('[data-states-prev]', states).addEventListener('click', () => seq.goTo(seq.at() - 1));
    $('[data-states-next]', states).addEventListener('click', () => seq.goTo(seq.at() + 1));
  }

  /* --- 04 Outcome: the tally counts up ----------------------------------- */

  const tally = $('[data-tally]');
  if (tally) {
    const cells = $$('[data-count-to]', tally);
    // Each count's little drawing lights up alongside the number.
    const run = () => {
      tally.classList.add('is-counted');
      cells.forEach(cell => {
        const target = Number(cell.dataset.countTo);
        if (reduced.matches) { cell.textContent = pad(target); return; }
        const started = performance.now();
        const tick = now => {
          const t = clamp((now - started) / 900, 0, 1);
          cell.textContent = pad(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          run();
          self.disconnect();
        });
      }, { threshold: 0.4 }).observe(tally);
    } else {
      run();
    }
  }

  /* --- Annotated artifacts ------------------------------------------------ */

  $$('[data-annot]').forEach(annotate);

  /* --- Strips: a numbered sequence that swipes on a phone ---------------- */

  $$('[data-strip]').forEach(track => {
    const items = $$('.strip-item', track);
    swipePager(track, items, (item, i) => {
      const name = $('b', item) || $('figcaption', item);
      return `${i + 1} of ${items.length}${name ? `: ${name.textContent.trim()}` : ''}`;
    });
  });

  /* --- Pointer light on cards ------------------------------------------ */

  // The same soft light that follows the pointer on the priyank.design cards.
  $$('[data-spotlight]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - box.left}px`);
      card.style.setProperty('--my', `${event.clientY - box.top}px`);
    });
  });

  /* --- Artifact viewer ---------------------------------------------------- */

  const viewer = $('.viewer');
  if (viewer && typeof viewer.showModal === 'function') {
    const image = $('img', viewer);
    const caption = $('[data-viewer-caption]', viewer);

    $$('[data-zoom]').forEach(trigger => {
      trigger.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const src = trigger.dataset.zoomSrc || trigger.getAttribute('href');
        const inner = trigger.querySelector('img');
        const title = trigger.dataset.zoomAlt || inner?.alt || trigger.textContent.trim();
        image.alt = title;
        caption.textContent = title;
        image.classList.remove('is-portrait');
        // Phone-shaped exports only. A long desktop page is taller than it is
        // wide too, but it has to open at a desktop width to be legible.
        image.onload = () => image.classList.toggle('is-portrait', image.naturalHeight > image.naturalWidth * 1.5);
        image.src = src;
        viewer.showModal();
      });
    });

    $('[data-viewer-close]', viewer).addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', event => {
      if (event.target !== viewer) return;
      const box = viewer.getBoundingClientRect();
      const outside = event.clientX < box.left || event.clientX > box.right
        || event.clientY < box.top || event.clientY > box.bottom;
      if (outside) viewer.close();
    });
    viewer.addEventListener('close', () => image.removeAttribute('src'));
  }

  /* --- Reveal ------------------------------------------------------------- */

  const risers = $$('.rise');
  if (!('IntersectionObserver' in window) || reduced.matches) {
    risers.forEach(item => item.classList.add('is-in'));
  } else {
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        self.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    risers.forEach(item => observer.observe(item));
  }

  /* --- Copy and clock ----------------------------------------------------- */

  // [data-copy] copies its value and says so in place for a moment.
  $$('[data-copy]').forEach(button => {
    let reset = null;
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
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
      button.classList.add('is-done');
      clearTimeout(reset);
      reset = setTimeout(() => button.classList.remove('is-done'), 1800);
    });
  });

  // [data-clock] shows the time where I am, to the minute.
  const clocks = $$('[data-clock]');
  if (clocks.length) {
    const format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
    const tick = () => clocks.forEach(clock => { clock.textContent = `${format.format(new Date())} IST`; });
    tick();
    setInterval(tick, 30000);
  }

  window.CaseSystem = {
    reduced, pad, clamp, $, $$,
    onScroll, queueScroll, runScroll,
    swap, pinnedSequence, showFrame, stack, swipePager, walk, annotate
  };

  runScroll();
})();
