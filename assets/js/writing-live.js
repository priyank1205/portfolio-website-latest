/* ============================================================================
   Writing, Live: the behaviour

   How far in you are, under the top bar. Notes that open where you read
   them, with a note of their own. A link you can copy. The rep counter in
   the essay, the sound and the chrome all come from live.js.
   ========================================================================== */

(() => {
  'use strict';

  const { sound, toast, copyText, SCALE } = window.Live;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* --- Reading progress ------------------------------------------------------ */

  const essay = $('#essay');
  const bar = $('[data-progress]');
  if (essay && bar) {
    const update = () => {
      const box = essay.getBoundingClientRect();
      const span = box.height - window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, -box.top / Math.max(1, span)));
      bar.style.setProperty('--p', p.toFixed(4));
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* --- Copy the link ---------------------------------------------------------- */

  $$('[data-copy-link]').forEach(button => button.addEventListener('click', async () => {
    await copyText(location.href.split('#')[0]);
    sound.chime();
    toast('Link copied. Send it to someone who would argue with it.');
  }));

  /* --- Notes open where you read them ----------------------------------------- */

  let pop = null;
  let openRef = null;
  function close() {
    if (pop) pop.remove();
    if (openRef) openRef.classList.remove('is-open');
    $$('.notes-list li.is-lit').forEach(li => li.classList.remove('is-lit'));
    pop = null;
    openRef = null;
  }
  function open(ref) {
    if (openRef === ref) return;
    close();
    const n = ref.dataset.note;
    const item = $(`[data-note-for="${n}"]`);
    if (!item) return;
    const text = item.firstChild.textContent.trim();
    pop = document.createElement('div');
    pop.className = 'note-pop';
    pop.setAttribute('role', 'note');
    pop.innerHTML = `<b>Note ${n}</b>${text}`;
    document.body.append(pop);
    const r = ref.getBoundingClientRect();
    const w = pop.offsetWidth;
    const left = Math.min(window.innerWidth - w - 16, Math.max(16, r.left + r.width / 2 - w / 2));
    pop.style.left = `${left + window.scrollX}px`;
    pop.style.top = `${r.bottom + window.scrollY + 10}px`;
    ref.classList.add('is-open');
    item.classList.add('is-lit');
    openRef = ref;
    sound.pluck(SCALE[6 + Number(n)], 0.45);
  }
  $$('.ref').forEach(ref => {
    ref.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') open(ref); });
    ref.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') close(); });
    ref.addEventListener('focus', () => open(ref));
    ref.addEventListener('blur', close);
    // On touch the first tap opens the note; the note list is still one scroll away.
    ref.addEventListener('click', event => {
      if (window.matchMedia('(hover: none)').matches && openRef !== ref) {
        event.preventDefault();
        open(ref);
      }
    });
  });
  window.addEventListener('scroll', () => { if (pop && !openRef?.matches(':focus')) close(); }, { passive: true });
})();
