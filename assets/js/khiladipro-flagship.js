(() => {
  'use strict';
  const film = document.querySelector('.film');
  const frames = [...film.querySelectorAll('.film-frame')];
  const controls = document.querySelector('.film-controls');
  const previous = controls.querySelector('[data-film-prev]');
  const next = controls.querySelector('[data-film-next]');
  const position = controls.querySelector('.film-position');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  function updateFilm() {
    const left = film.getBoundingClientRect().left;
    current = frames.reduce((best, frame, i) => Math.abs(frame.getBoundingClientRect().left - left) < Math.abs(frames[best].getBoundingClientRect().left - left) ? i : best, 0);
    previous.disabled = film.scrollLeft < 2;
    next.disabled = film.scrollLeft >= film.scrollWidth - film.clientWidth - 2;
    const right = film.getBoundingClientRect().right;
    const lastVisible = frames.reduce((last,frame,i) => frame.getBoundingClientRect().left < right - 12 ? i : last, current);
    position.textContent = `${String(current + 1).padStart(2, '0')}–${String(lastVisible + 1).padStart(2, '0')} / 09`;
  }
  function move(direction) {
    const target = frames[Math.max(0, Math.min(frames.length - 1, current + direction))];
    film.scrollBy({left: target.getBoundingClientRect().left - film.getBoundingClientRect().left, behavior: reduced.matches ? 'instant' : 'smooth'});
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  film.addEventListener('keydown', event => {
    if (event.target !== film) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
    if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); film.scrollTo({left:event.key === 'Home' ? 0 : film.scrollWidth,behavior:reduced.matches?'instant':'smooth'}); }
  });
  film.addEventListener('scroll', updateFilm, {passive:true});
  window.addEventListener('resize', updateFilm, {passive:true});
  controls.hidden = false;
  updateFilm();

  const lens = document.querySelector('[data-lens]');
  const readers = [...lens.querySelectorAll('[data-band]')];
  const band = lens.querySelector('.lens-band');
  let selected = null;
  function showReader(reader) {
    lens.classList.toggle('is-active', Boolean(reader));
    readers.forEach(item => item.setAttribute('aria-pressed', String(item === reader)));
    if (!reader) return;
    const [start,end] = reader.dataset.band.split(',').map(Number);
    band.style.top = `${start}%`;
    band.style.height = `${end-start}%`;
  }
  readers.forEach(reader => {
    reader.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') showReader(reader); });
    reader.addEventListener('pointerleave', () => showReader(selected));
    reader.addEventListener('focus', () => showReader(reader));
    reader.addEventListener('blur', () => showReader(selected));
    reader.addEventListener('click', () => { selected = selected === reader ? null : reader; showReader(selected); });
  });

  // Preserve the August index's preview images, labels and destinations.
  const preview = document.querySelector('.prototype-preview');
  const previewImage = preview.querySelector('img');
  const previewLabel = preview.querySelector('span');
  function showPreview(link) {
    if (!matchMedia('(hover:hover) and (min-width:801px)').matches) return;
    previewImage.src = link.dataset.peek;
    previewLabel.textContent = link.dataset.peekTitle;
    const rect = link.getBoundingClientRect();
    preview.style.left = `${Math.max(12,Math.min(innerWidth - 252,rect.left))}px`;
    preview.style.top = `${Math.max(12,Math.min(innerHeight - 280,rect.top - 275))}px`;
    preview.classList.add('is-visible');
  }
  document.querySelectorAll('.kp-proto').forEach(link => {
    link.addEventListener('pointerenter', () => showPreview(link));
    link.addEventListener('focus', () => showPreview(link));
    link.addEventListener('pointerleave', () => preview.classList.remove('is-visible'));
    link.addEventListener('blur', () => preview.classList.remove('is-visible'));
  });
  window.addEventListener('scroll', () => {
    const focused = document.activeElement;
    if (focused?.matches('.kp-proto')) {
      const rect = focused.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) { showPreview(focused); return; }
    }
    preview.classList.remove('is-visible');
  }, {passive:true});

  // Keep the current chapter visible in the narrow-screen navigation rail.
  const chapterRail = document.querySelector('.chapter-links');
  const keepChapterVisible = () => {
    if (chapterRail.scrollWidth <= chapterRail.clientWidth) return;
    const active = chapterRail.querySelector('[aria-current]');
    if (!active) return;
    const railRect = chapterRail.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (activeRect.left < railRect.left + 16 || activeRect.right > railRect.right - 16) {
      chapterRail.scrollBy({left:activeRect.left-railRect.left-20,behavior:reduced.matches?'instant':'smooth'});
    }
  };
  new MutationObserver(keepChapterVisible).observe(chapterRail, {subtree:true,attributes:true,attributeFilter:['aria-current']});

  // Preserve the master version's section URLs as well as the shared aliases.
  const masterAliases = {landing:'decision-1',onboarding:'decision-2',app:'decision-3'};
  const legacyTarget = masterAliases[location.hash.slice(1)];
  if (legacyTarget) document.getElementById(legacyTarget)?.scrollIntoView();
})();
