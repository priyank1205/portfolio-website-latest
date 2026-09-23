/* ============================================================================
   Getmega case study (Claude): this page's own behaviour

   Built on the shared case study system (case-system.js, loaded first), which
   runs the chrome, the screen gallery and the annotated artifacts. This file
   walks the on-demand flow.
   ========================================================================== */

(() => {
  'use strict';

  const { $, runScroll, walk } = window.CaseSystem;

  /* --- 01 Pivot 01: the on-demand flow, one stage per stretch of scroll --- */

  const flow = $('[data-flow]');
  const steps = $('[data-steps]');
  if (flow && steps) walk(flow, steps);

  runScroll();
})();
