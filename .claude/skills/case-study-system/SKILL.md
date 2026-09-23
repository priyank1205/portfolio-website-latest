---
name: case-study-system
description: Convert or build a portfolio case study on the shared case study system (the dark product-craft system extracted from the KhiladiPro case study), so it looks like part of the same family. Use when asked to convert, redesign, rebuild or create a case study page, to make a case study match KhiladiPro, or to add a new pattern to the case study system.
---

# Converting a case study onto the case study system

The system is the look, rhythm, motion and interaction language of `projects/khiladipro-redesign-claude.html`, extracted into shared files. Read these before touching anything:

1. `docs/case-study-system.md`: the principles, tokens, patterns, phone rules, content rules and the decision log. The decision log's rejections are binding; do not reintroduce a rejected treatment.
2. `assets/css/case-system.css` and `assets/js/case-system.js`: the system itself.
3. `projects/khiladipro-redesign-claude.html` with its own CSS and JS: the reference implementation of every pattern.
4. The study's blueprint in `audits/` if one exists (for example `audits/getmega-case-study-blueprint-2026-09-19.md`), and the memory notes on that study. The blueprint decides content; this system decides form.

## Workflow

**1. Take stock of the source page.** List every section, claim, image and link it has, in order, and every piece of the author's wording. Content is not rewritten silently: any line you write or change goes on a list for the author to check. Note what the product's own screens look like, because its accents will come from them.

**2. Sample the accents.** Pick the product's emphasis colour, its positive/success colour, a caution colour and its action gradient from the shipped screenshots (open them; sample real pixels). Set them as channels in the study's `:root` (`--accent-rgb`, `--positive-rgb`, `--caution-rgb`, `--action-a-rgb`, `--action-b-rgb`, `--on-accent`). Check contrast of accent text on `--bg` (4.5:1 for small text).

**3. Map sections to patterns.** For each chapter decide, in this order:
   - Which system component or pattern carries it (§8 of the doc): pinned sequence for any multi-step flow, screen gallery for named screens, tiles as an index, tally, cards, swiped set, facts card, chapter head.
   - Whether it needs its own demo. Each chapter should let the reader operate the argument, not read a caption about it: a switch that changes only what differs, a legend that lights what it names, a scroll that walks a flow. One demo per chapter at most, and simple beats clever ("keep it simple, clean but premium").
   - If a KhiladiPro demo (§9) fits, promote it into the system now, since this is its second use: move its CSS and JS into the system files, generalise the class names, keep KhiladiPro working (prove it with `snap`/`diff`), and update the doc.
   Write this map down and show it to the author before building if the study is new to the system.

**4. Build.** Create `projects/<study>-redesign-claude.html`, `assets/css/<study>-redesign-claude.css` and `assets/js/<study>-redesign-claude.js` beside the existing page (never overwrite it). Page skeleton, in order: nav, hero (chips, h1 with the accent-gradient emphasis, lead, two actions, device deck), facts card with its honest caveat, chapter rail, chapters (`00 / NN` numbering, each opening with `.chead`), outcome, source material, testimonial, next study, footer, viewer dialog. Then:
   - Load `case-system.css` before the study's CSS, and `case-system.js` before the study's JS, all deferred.
   - Tokens only in the study's files: colours through the alpha ladder, radii, durations, spacing, and the eight font sizes. No new values; if one is truly missing, add it to the system with a reason.
   - Every `:hover` rule inside `@media (hover: hover)`.
   - Phone layouts are designed per section (§10 of the doc), not left to shrink.

**5. Verify, then look.** Serve the site (`preview_start` with the `portfolio` entry), then:
   - `python3 scripts/case-verify.py check projects/<study>.html` must print OK.
   - `python3 scripts/case-verify.py shots projects/<study>.html`, then read the contact sheets section by section at 390 and 1440, comparing each section against its KhiladiPro counterpart for rhythm, type and density.
   - Operate every demo on the emulated phone (tap, swipe, step), and check the control and what it controls share the screen.

**6. Report.** What changed per section, the copy list for the author to check, anything left open, and before/after images. Keep the author's rejected-treatments list in mind when describing choices.

## Rules that are easy to break

- No em or en dashes in anything you write, including CSS and JS comments.
- No large type, no uppercase tracked eyebrows, no serif display, no cream or green grounds.
- No top borders between sections; the rhythm tokens carry the breaks.
- One segmented control style for every choice on a page (`.choice`).
- Nothing the reader must see can be skipped by scrolling: pin it or make it the scroll.
- On a phone, nothing pans sideways that could be shown whole, and no pinned device changes size between steps (`stack()` every changing line).
- Do not link to or screenshot a live production site unless the author asks; show the design.
