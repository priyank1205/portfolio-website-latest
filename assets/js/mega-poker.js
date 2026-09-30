(() => {
  'use strict';

  // The controls annotate one historical design. They never alter its payment state.
  const study = document.querySelector('[data-status-study]');
  if (study) {
    const tabs = [...study.querySelectorAll('[data-status-tab]')];
    const panels = [...study.querySelectorAll('[data-status-panel]')];
    const spotlight = study.querySelector('.status-spotlight');
    function select(index, focus = false) {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      study.dataset.status = tabs[index].dataset.statusTab;
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      panels[index].tabIndex = 0;
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          select(next, true);
        }
      });
    });
    select(1);
    study.querySelector('.status-controls').hidden = false;
    spotlight.hidden = false;
  }

  const dialog = document.querySelector('.image-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const detailImage = dialog.querySelector('img');
    const sizeButton = dialog.querySelector('[data-detail-size]');
    const closeButton = dialog.querySelector('[data-close]');
    let opener;
    document.querySelectorAll('[data-zoom]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        const figure = link.closest('figure');
        const source = link.querySelector('img');
        const caption = figure?.querySelector('figcaption');
        dialog.querySelector('#detail-title').textContent = figure?.querySelector('h3')?.textContent || source.alt;
        // The complete provenance note, including sample inconsistencies, travels with the image.
        dialog.querySelector('#detail-note').textContent = caption?.textContent.replace(/\s+/g, ' ').trim() || source.alt;
        detailImage.src = link.href;
        detailImage.alt = source.alt;
        dialog.style.setProperty('--native-width', `${source.getAttribute('width')}px`);
        dialog.classList.remove('actual-size');
        sizeButton.setAttribute('aria-pressed', 'false');
        sizeButton.textContent = 'Actual size';
        dialog.showModal();
        dialog.querySelector('.dialog-image-wrap').scrollTo(0, 0);
        dialog.querySelector('.dialog-note').scrollTop = 0;
        closeButton.focus();
      });
    });
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      detailImage.removeAttribute('src');
      opener?.focus({ preventScroll: true });
    });
    sizeButton.addEventListener('click', () => {
      const actualSize = dialog.classList.toggle('actual-size');
      sizeButton.setAttribute('aria-pressed', String(actualSize));
      sizeButton.textContent = actualSize ? 'Fit image' : 'Actual size';
    });
  }

  const chapterLinks = [...document.querySelectorAll('.chapter-links a')];
  const chapters = chapterLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scheduled = false;
  function updateChapter() {
    scheduled = false;
    let active = -1;
    chapters.forEach((chapter, index) => {
      if (chapter.getBoundingClientRect().top <= 160) active = index;
    });
    chapterLinks.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleChapter() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateChapter);
    }
  }
  window.addEventListener('scroll', scheduleChapter, { passive: true });
  window.addEventListener('resize', scheduleChapter, { passive: true });
  // Preserve existing artifact, source-note, and legacy section links.
  const legacy = { brief: 'overview', scorecard: 'delivery' };
  function revealTarget() {
    let hash;
    try { hash = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!hash) return;
    const target = document.getElementById(legacy[hash] || hash);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' });
      updateChapter();
    });
  }
  window.addEventListener('hashchange', revealTarget);
  window.addEventListener('load', revealTarget, { once: true });
  revealTarget();
  updateChapter();
})();
