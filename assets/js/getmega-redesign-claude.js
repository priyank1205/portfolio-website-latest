/* ============================================================================
   Getmega case study (Claude): this page's own behaviour

   Built on the shared case study system (case-system.js, loaded first), which
   runs the chrome, the screen gallery and the annotated artifacts. This file
   walks the on-demand flow and gives the loyalty mechanism its phone pager.
   ========================================================================== */

(() => {
  'use strict';

  const { $, $$, runScroll, swipePager, walk } = window.CaseSystem;

  /* --- 01 Pivot 01: the on-demand flow, one stage per stretch of scroll --- */

  const flow = $('[data-flow]');
  const steps = $('[data-steps]');
  if (flow && steps) walk(flow, steps);

  /* --- 03 The loyalty mechanism, swiped on a phone ------------------------ */

  const mech = $('[data-mech]');
  if (mech) {
    const items = $$('.mech-step', mech);
    swipePager(mech, items, (item, i) => `Step ${i + 1} of ${items.length}: ${$('b', item).textContent}`);
  }

  runScroll();
})();
