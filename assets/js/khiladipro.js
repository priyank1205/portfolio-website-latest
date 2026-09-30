(() => {
  'use strict';

  // Content is fully readable without scripting; enhancement selects one artifact at a time.
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const list = group.querySelector('[data-tablist]');
    const tabs = Array.from(list.querySelectorAll('[data-tab]'));
    const panels = Array.from(group.querySelectorAll('[data-panel]'));
    if (!tabs.length || tabs.some(tab => !panels.some(panel => panel.id === tab.dataset.tab))) return;
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-orientation', 'vertical');
    let description;
    if (group.classList.contains('setup-proof') || group.classList.contains('event-proof')) {
      description = document.createElement('p');
      description.className = 'mobile-panel-description';
      description.setAttribute('aria-live', 'polite');
      list.after(description);
    }
    function select(index, focus = false) {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panel = panels.find(item => item.id === tab.dataset.tab);
        panel.hidden = !selected;
      });
      if (description) description.textContent = (tabs[index].querySelector('.step-description') || tabs[index].querySelector('span:nth-child(2) > span')).textContent;
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      tab.id = `${tab.dataset.tab}-tab`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', tab.dataset.tab);
      const panel = panels.find(item => item.id === tab.dataset.tab);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); select(next, true); }
      });
    });
    group.classList.add('is-enhanced');
    select(0);
  });

  const dialog = document.querySelector('.image-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('[data-image-caption]');
    document.querySelectorAll('[data-zoom]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const source = link.querySelector('img') || document.querySelector(`img[src="${link.getAttribute('href')}"]`);
        const title = source?.alt || link.textContent.trim();
        image.alt = title;
        caption.textContent = title;
        image.classList.remove('portrait');
        image.onload = () => image.classList.toggle('portrait', image.naturalHeight > image.naturalWidth);
        image.src = link.href;
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { image.removeAttribute('src'); });
  }

  // A single passive scroll listener updates reading position without altering scrolling.
  const navLinks = Array.from(document.querySelectorAll('.chapter-links a'));
  const chapters = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  const progress = document.querySelector('.reading-progress');
  let pending = false;
  function updatePosition() {
    pending = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0}%`;
    let active = 0;
    chapters.forEach((chapter, index) => { if (chapter && chapter.getBoundingClientRect().top <= 160) active = index; });
    navLinks.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function schedulePosition() {
    if (!pending) { pending = true; requestAnimationFrame(updatePosition); }
  }
  window.addEventListener('scroll', schedulePosition, { passive: true });
  window.addEventListener('resize', schedulePosition, { passive: true });
  document.querySelectorAll('details').forEach(item => item.addEventListener('toggle', schedulePosition));
  updatePosition();

  // Preserve the previous case study's shared deep links.
  const legacy = document.body.classList.contains('sedp-case')
    ? { old: 'decision-1', brief: 'overview', screen: 'decision-1', compare: 'decision-2', reach: 'decision-3', scorecard: 'outcome' }
    : { brief: 'overview', map: 'overview', believe: 'decision-1', commit: 'decision-1', setup: 'decision-2', return: 'decision-3', rehire: 'outcome', scorecard: 'outcome', closing: 'outcome' };
  const target = legacy[window.location.hash.slice(1)];
  if (target) document.getElementById(target)?.scrollIntoView();
})();
