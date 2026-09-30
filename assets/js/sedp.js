(() => {
  'use strict';

  // An artifact walkthrough, not a simulation of the historical product.
  // Without JavaScript all three frames remain readable in document order.
  const walkthrough = document.querySelector('[data-walkthrough]');
  if (walkthrough) {
    const controls = walkthrough.querySelector('.walkthrough-controls');
    const tabs = [...walkthrough.querySelectorAll('[role="tab"]')];
    const panels = [...walkthrough.querySelectorAll('[data-frame]')];
    function selectFrame(index, focus = false) {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
      });
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      tab.addEventListener('click', () => selectFrame(index));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          selectFrame(next, true);
        }
      });
    });
    selectFrame(0);
    controls.hidden = false;
  }

  const dialog = document.querySelector('.image-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('[data-image-caption]');
    const sizeButton = dialog.querySelector('[data-detail-size]');
    const closeButton = dialog.querySelector('[data-close-dialog]');
    let opener;
    document.querySelectorAll('[data-zoom]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        const source = link.querySelector('img');
        const figureCaption = link.closest('figure')?.querySelector('figcaption');
        image.alt = source?.alt || link.textContent.trim();
        // A full capture link must keep its own identity rather than inherit a crop's title.
        const title = source ? source.alt : link.textContent.trim();
        let note = '';
        if (figureCaption) {
          const copy = figureCaption.cloneNode(true);
          copy.querySelectorAll('a').forEach(anchor => anchor.remove());
          note = copy.textContent.replace(/\s+/g, ' ').trim();
        }
        caption.textContent = [title, note].filter(Boolean).join(' — ');
        image.src = link.href;
        dialog.showModal();
        closeButton.focus();
      });
    });
    sizeButton.addEventListener('click', () => {
      const actual = dialog.classList.toggle('actual-size');
      sizeButton.setAttribute('aria-pressed', String(actual));
      sizeButton.textContent = actual ? 'Fit image' : 'Actual size';
    });
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      dialog.classList.remove('actual-size');
      sizeButton.setAttribute('aria-pressed', 'false');
      sizeButton.textContent = 'Actual size';
      image.removeAttribute('src');
      opener?.focus({ preventScroll: true });
    });
  }

  const navLinks = [...document.querySelectorAll('.chapter-links a')];
  const chapters = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scheduled = false;
  function updatePosition() {
    scheduled = false;
    let active = -1;
    chapters.forEach((chapter, index) => {
      if (chapter.getBoundingClientRect().top <= 160) active = index;
    });
    navLinks.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function schedulePosition() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updatePosition);
    }
  }
  window.addEventListener('scroll', schedulePosition, { passive: true });
  window.addEventListener('resize', schedulePosition, { passive: true });
  // Keep old links useful, including direct links into the supporting studies.
  const legacy = { old: 'decision-1', brief: 'overview', screen: 'decision-1', compare: 'decision-2', reach: 'decision-3', scorecard: 'outcome' };
  function revealTarget() {
    let hash;
    try { hash = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!hash) return;
    const target = document.getElementById(legacy[hash] || hash);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' });
      updatePosition();
    });
  }
  window.addEventListener('hashchange', revealTarget);
  window.addEventListener('load', revealTarget, { once: true });
  revealTarget();
  updatePosition();
})();
