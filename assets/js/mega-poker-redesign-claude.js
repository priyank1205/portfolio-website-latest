/* ============================================================================
   Mega Poker case study (Claude): this page's own behaviour

   Built on the shared case study system (case-system.js, loaded first), which
   runs the chrome, the hero deck, the strip and the annotated screens. On a
   phone, the notes under each annotated screen swipe; this file gives them a
   pager and lights the note that settles in place.
   ========================================================================== */

(() => {
  'use strict';

  const { $, $$, swipePager } = window.CaseSystem;
  const phone = window.matchMedia('(max-width: 760px)');

  $$('.annot-body--device').forEach(body => {
    const track = $('.annot-notes', body);
    const items = $$('li', track);
    const notes = items.map(item => $('[data-note]', item));

    // Nothing lights until the reader swipes or uses the pager.
    let swiped = false;
    track.addEventListener('scroll', () => { swiped = true; }, { passive: true });

    swipePager(track, items, (item, i) => `${i + 1} of ${items.length}: ${$('h4', item).textContent.trim()}`, i => {
      if (!phone.matches || !swiped) return;
      if (notes[i].getAttribute('aria-pressed') !== 'true') notes[i].click();
    });
  });
})();
