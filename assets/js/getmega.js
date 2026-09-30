(() => {
  'use strict';

  const dialog = document.querySelector('.image-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('img');
    const sizeButton = dialog.querySelector('[data-detail]');
    const closeButton = dialog.querySelector('[data-close]');
    let opener;
    document.querySelectorAll('[data-zoom]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        const source = link.querySelector('img');
        const caption = link.closest('figure')?.querySelector('figcaption');
        const isBoardDetail = Boolean(link.querySelector('.card-crop'));
        const title = isBoardDetail ? `Original state board — ${source.alt}` : source.alt;
        dialog.querySelector('#image-title').textContent = title;
        dialog.querySelector('#image-note').textContent = caption?.textContent.replace(/\s+/g, ' ').trim() || title;
        image.src = link.href;
        image.alt = title;
        dialog.style.setProperty('--native-width', `${source.getAttribute('width')}px`);
        dialog.classList.remove('full-size');
        sizeButton.setAttribute('aria-pressed', 'false');
        sizeButton.textContent = 'Actual size';
        dialog.showModal();
        dialog.querySelector('.dialog-image-wrap').scrollTo(0, 0);
        dialog.querySelector('.dialog-note').scrollTop = 0;
        closeButton.focus();
      });
    });
    sizeButton.addEventListener('click', () => {
      const actual = dialog.classList.toggle('full-size');
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
      image.removeAttribute('src');
      opener?.focus({ preventScroll: true });
    });
  }

  // Pause the original animation in place, retaining its exact visual content.
  const animation = document.querySelector('.animation');
  if (animation) {
    const gif = animation.querySelector('img');
    const canvas = animation.querySelector('canvas');
    const button = document.querySelector('.motion-toggle');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = false;
    function setPaused(value) {
      if (!gif.complete || !gif.naturalWidth) return;
      paused = value;
      if (paused) {
        canvas.width = gif.naturalWidth;
        canvas.height = gif.naturalHeight;
        canvas.getContext('2d').drawImage(gif, 0, 0);
      }
      canvas.hidden = !paused;
      gif.hidden = paused;
      button.textContent = paused ? 'Play animation' : 'Pause animation';
      button.setAttribute('aria-pressed', String(paused));
    }
    function ready() { button.hidden = false; setPaused(reduced.matches); }
    gif.addEventListener('load', ready);
    if (gif.complete && gif.naturalWidth) ready();
    button.addEventListener('click', () => setPaused(!paused));
    reduced.addEventListener('change', event => setPaused(event.matches));
  }

  const links = [...document.querySelectorAll('.chapter-links a')];
  const chapters = links.map(link => document.querySelector(link.getAttribute('href')));
  let scheduled = false;
  function updateChapter() {
    scheduled = false;
    let active = -1;
    chapters.forEach((chapter, index) => {
      if (chapter.getBoundingClientRect().top <= 160) active = index;
    });
    links.forEach((link, index) => {
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
  window.addEventListener('load', scheduleChapter, { once: true });
  updateChapter();
})();
