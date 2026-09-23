# Case study system

The shared design system every case study on this site is built on. It was extracted from the KhiladiPro case study (`projects/khiladipro-redesign-claude.html`) after three rounds of redesign, so every rule here was tested against real feedback. The rejections are recorded as well as the choices, because they are the part that stops the next case study from repeating a mistake.

- **Code:** `assets/css/case-system.css` and `assets/js/case-system.js`, loaded before each case study's own files.
- **Reference implementation:** the KhiladiPro page. When this document and the code disagree, the code wins and this document gets fixed.
- **Verification:** `scripts/case-verify.py`.
- **Workflow for converting a case study:** `.claude/skills/case-study-system/SKILL.md`.

---

## 1. How a case study is put together

**Naming.** Every case study built on the system is `projects/<study>-redesign-claude.html` with `assets/css/<study>-redesign-claude.css` and `assets/js/<study>-redesign-claude.js`, beside the earlier version, which stays until the new one is approved and linked. For example: `khiladipro-redesign-claude`, `getmega-redesign-claude`, `sedp-redesign-claude`, `mega-poker-redesign-claude`. The four link to each other in a ring through their next-study cards (KhiladiPro, SEDP, Getmega, Mega Poker).

```html
<link rel="stylesheet" href="../assets/css/case-system.css?v=N">
<link rel="stylesheet" href="../assets/css/<study>.css?v=N">
…
<script src="../assets/js/case-system.js?v=N" defer></script>
<script src="../assets/js/<study>.js?v=N" defer></script>
```

A case study's own stylesheet does three things only:

1. **Sets its accents** in a `:root` block, sampled from that product's shipped screens (see §4).
2. **Styles its own demos**, the one or two interactions only this story needs.
3. **Uses tokens and nothing else.** No raw colours, radii, durations or font sizes. If a value is missing, it is added to the system, not typed in.

Its own script starts with `const { … } = window.CaseSystem;` and builds its demos from the engines in §8.

**Promote on the second use.** A pattern moves from a case study into the system the second time a case study needs it, not before. The demos listed in §9 are waiting for that second use.

---

## 2. The look

- **Dark only, no theme toggle.** A true near-black ground (`--bg #08080a`) with three surface steps above it. Rejected: warm bone or cream paper, and green grounds ("not very premium and professional").
- **Inter only**, weights 400, 500 and 600, with the display cut through the optical-size axis. The system monospace stack is for readouts only: counters, pixel values, step indices, block labels.
- **Chips with a dot, never uppercase tracked eyebrows.** Cream paper, a serif display face and uppercase letter-spaced mono eyebrows together read as AI-generated. That exact combination was rejected on sight ("too ai-made, the typography, ui elements").
- **Hairlines, not shadows.** Surfaces separate by a 1px line at 8, 14 or 24% white, or by a value step. Shadows are rare and come only from the elevation tokens.
- **Accents sampled from the product itself**, never picked from a palette. Glows are the accent at a low alpha, never a new colour.
- **Real product UI leads.** Devices and windows show shipped screens, never process artifacts.

## 3. Rhythm

Three vertical steps and nothing between them:

| Gap | Token | Wide screen | Phone |
|---|---|---|---|
| Between chapters (each side pays half) | `--section-y` | 128 + 128 = 256px | 64 + 64 = 128px |
| Between blocks inside a chapter | `--block-gap` | 128px | 72px |
| Under a chapter head, to its content | `--head-gap` | 64px | 32px |

- **No rule across the top of a section.** The break between chapters is carried by space alone. Borders were removed after "we dont need top borders for the sections".
- **A section owns its space as padding, never as an outer margin.**
- **A pinned stage fills its screen,** so it cannot lend space the way a centred desktop stage does. On a phone, the head above it, the block after it and the chapter after it each get their token minus the stage's own 16px inner padding. That is `.section--follow`, and `.ends-pinned` on a chapter that ends with a pinned stage.
- **Inside components, space comes from the 4px scale:** `--sp-1` to `--sp-10` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Controls use fixed sizes (26px chips, 38px buttons, 44px touch targets).
- **Density:** few elements, each with room. "Weird floating layouts" (two columns aligned to the bottom, islands of text) were rejected twice. The fix both times was a single vertical narrative with `align-items: start`.

## 4. Colour

**Roles, not colours.** Each case study sets these five in its own stylesheet, as channels, from its own product:

| Role | KhiladiPro value | Used for |
|---|---|---|
| `--accent-rgb` | 255 122 99 (coral) | Emphasis, the active state, the one thing to look at |
| `--positive-rgb` | 25 207 163 (mint) | Camera and tracking, anything that went well, "they came back" |
| `--caution-rgb` | 224 160 92 (amber) | Costs, trade-offs, caveats |
| `--action-a-rgb` / `--action-b-rgb` | 225 77 92 → 224 114 76 | The product's own action gradient: CTAs, big numbers, the author mark |
| `--on-accent` | #180706 | Text on a solid accent |

`--accent`, `--positive`, `--caution` and `--action` are derived from these channels, so a case study never touches them.

**One alpha ladder for every tint, glow, ring and wash:** `--a-0` to `--a-7` = 3, 6, 10, 14, 20, 28, 40, 60%. Write it as `rgb(var(--accent-rgb) / var(--a-2))`. Every accent tints the same way, and a new accent needs no new values.

**Ink:** `--fg` for headings and emphasis, `--fg-2` (72%) for body, `--fg-3` (52%) for quiet copy. `.lead` sits at the quiet step deliberately, much lighter than the heading above it, so the heading clearly leads. It was lowered twice on request ("reduce the opacity of .lead even more").

**Scrims** (glass and overlays over the ground): `--scrim-1` to `--scrim-4` = 50, 72, 86, 92%.

## 5. Type

Eight sizes, each with one job. Nothing else is allowed.

| Token | Size | Job |
|---|---|---|
| `--fs-display` | 34 to 44px | The one h1 |
| `--fs-title` | 24 to 30px | Chapter h2, big readouts, the testimonial |
| `--fs-heading` | 18 to 20px | h3, card titles, the question a screen answers |
| `--fs-lead` | 15 to 17px | Chapter leads, standout lines |
| `--fs-body` | 15px | Body |
| `--fs-ui` | 14px | Controls, list rows |
| `--fs-small` | 13px | Secondary copy, notes |
| `--fs-label` | 12px | Chips, labels, mono readouts |

- **The drop from heading to body is the hierarchy.** A lead never sizes up towards its heading, and a quote never sizes up towards its lead.
- **No large type.** A pass that enlarged the scale was rejected ("i dont like the large typography"). The scale above was kept deliberately.
- **Line height and tracking move against size:** display 1.04 / -0.03em, h2 1.14 / -0.024em, h3 1.3 / -0.018em, body 1.6 / -0.011em.
- **Measures:** leads at 58ch, body at 62ch, flow copy at 44ch.
- **Headings balance, paragraphs wrap pretty** (`text-wrap`).
- **Chapter head composition.** A chip on the left with `NN / 05` on the right, then the h2, then the lead, all stacked left on one measure. This fixed "does not yell senior designer".

## 6. Shape and elevation

- **Radius, by role:** `--r-1` 2px marks, `--r-2` 4px glyphs, `--r-3` 6px thumbnails, `--r-4` 8px small controls and zones, `--r-5` 12px controls and windows, `--r-6` 16px tiles and sheets, `--r-7` 20px cards and plates. Also `--r-pill`, `50%` for circles, and `--r-device` / `--r-screen`, elliptical radii that reproduce the screenshots' baked-in corner mask at any size.
- **Screen shape:** `--screen-ratio` is the shape of the study's screenshots and `--device-ratio` the device around one (screen plus its 2.1% bezel), so a pinned stage can size the device from its height. KhiladiPro's exports are 570 × 1230 with their own rounded mask; Getmega's are 9:16 (device ratio 0.573), and taller 1:2 exports crop from the top unless an image sets its own `object-position`.
- **Nested corners** step down by the padding between them: a 12px control with 4px padding holds 8px segments.
- **Elevation, the only shadows:** `--hi-edge` (a 1px top highlight on raised glass), `--shadow-1` (a press), `--shadow-2` (a swatch), `--shadow-3` (floating chrome), `--shadow-4` (windows and plates), `--shadow-device`.

## 7. Motion

One easing, `--ease: cubic-bezier(0.32, 0.72, 0, 1)`: fast out, long settle. No bounce, no overshoot. Durations are named by what they do:

| Token | ms | Used for |
|---|---|---|
| `--t-press` | 90 | Tap feedback: scale to 0.985 while pressed |
| `--t-quick` | 180 | Hover colour, small state changes (`--quick` is this plus the easing) |
| `--t-state` | 260 | Cross-fades between frames, toggles, zones lighting |
| `--t-swap` | 380 | Text and content swapping in |
| `--t-move` | 420 | Spatial moves: a band or spotlight sliding to a new region |
| `--t-travel` | 620 | Layout-scale travel: a window resizing, a figure crossing a room |
| `--t-enter` | 700 | Reveal on entry |
| `--t-draw` | 900 | A drawing or a count completing |
| `--stagger` | 60 | Between siblings entering together |

**Choreography**

- **Entry.** `.rise` fades and lifts 16px over `--t-enter` the first time an element reaches the viewport. Siblings stagger by `--i × --stagger`. Nothing re-animates on scroll back.
- **Text swap.** When a pinned stage changes step, the chip, title and copy re-enter from 7px below over `--t-swap`.
- **Draw on arrival.** A card's drawing plays when the card arrives: a bar scaling in, lines drawing, a count running. It plays once, after the entry, on a short delay.
- **Ambient loops** only when the motion demonstrates the claim: a pulse running down three reader lines into one URL, a dot travelling the "rehired" line, a figure jogging while "in motion". Each sets its own duration, and all stop under reduced motion.
- **Hover** changes colour, and on cards adds a 2 to 3px lift (kept for now, a known departure from the reference sites). Every hover rule sits inside `@media (hover: hover)`, so a tap never leaves a stuck lit state. `scripts/case-verify.py check` enforces this.
- **Reduced motion.** Every duration collapses and every loop stops. Scroll-driven stages still work, stepping without smooth scrolling.

## 8. Components and patterns in the system

Class names and hooks, with the KhiladiPro page as the working example of each.

**Chrome**

- **`.nav`** is the floating pill. On a phone it becomes a header row that scrolls away, and it steps aside (`.is-off`) once the chapter rail reaches the top.
- **`.rail`** is the sticky chapter rail, with a back button, numbered chapter links, a scroll progress line and the current chapter lit. On a phone it scrolls sideways edge to edge with fades, and the current tab rests on the gutter.
- **`.hero`** is a two-column hero with chips, h1, lead, two actions and a device. On a phone it stacks, and the actions become full-width rows.
- **`[data-cycler]` + `.deck`** holds the hero's screens, each with its caption as `data-caption`. On a wide screen they cross-fade on a 4s timer with a segment progress bar. On a phone they become a swiped filmstrip, where swiping is the source of truth.
- **`.facts-card`** is the thirty-second read: role, platforms, duration, team, and the outcome in the positive accent. A caveat row says honestly what the page cannot show and links to what replaces it. On a phone it is a spec list.
- **`.chead`** is the chapter head (§5).
- **`.foot`** is the footer; `.next` is the next-case-study card; `.quote` is the testimonial card.

**Controls**

- **`.chip`, `.btn`, `.btn--primary` and `.ibtn`.** All touch targets are 44px on a phone.
- **`.choice`** is the one segmented control, used for every either/or on a page ("we need harmony throughout the case study"). A one-time `.is-hint` pulse on the idle option makes sure nobody scrolls past it ("the toggle easily evades the eye").
- **`.segments`** is the pager bar. On the hero it runs as a timer; `.segments--pager` sits under a swiped set on a phone.

**Patterns**

- **Pinned sequence** (`.flow`, `.flow-sticky`, `.flow-inner`, `.flow-meter`, `.flow-ticks`), run by `walk(root, stepList, onStep)`: steps come from an `<ol data-steps>` whose items carry `data-title`, an optional `data-phase` and their copy, which is also the no-script fallback. `onStep` lets a page add its own layer (KhiladiPro's room diagram). A multi-step flow pins while scrolling maps to steps, so nothing can be skimmed past. Explicit controls sit alongside: prev and next, one tick per step, and the arrow keys, because it gets presented live and read in detail. On a phone the device takes whatever height the copy leaves, and every changing line is stacked (`stack()`), so the device never resizes between steps.
- **Screen gallery** (`[data-states-flow]`, `.states`, `.state-picker`). The same pinned engine, with named screens. On a wide screen: thumbnails on the left, device in the centre, copy on the right. On a phone: device, then pills that run edge to edge with the current one centred, then copy. Each screen answers one question in the reader's voice (`.state-q`).
- **Tiles as an index** (`.surface`, `.proto`). A tile grid on a wide screen, with a hover preview, that becomes hairline index rows on a phone. A final call-to-action tile keeps its tint.
- **Tally** (`[data-tally]`, `[data-count-to]`). Counts run up once, and a small drawing of what is counted lights with them.
- **Cards** (`.card`, `.card--positive`, `.card--caution`). An accent rule that extends on hover, an icon, a title, a one-line lead and a hairline list.
- **Pointer light** (`[data-spotlight]`). A soft light follows the pointer on large cards.
- **Viewer** (`.viewer`, `[data-zoom]`). A full-size view of any artifact. On a phone it is full screen, and wide designs open at 960px and pan both ways, so "full size" is genuinely bigger. Only phone-shaped images count as portrait.
- **Annotated artifact** (`[data-annot]`, `.annot-*`). A design shown whole, with numbered pins and notes; each note carries `data-region="top,right,bottom,left"` in percent and spotlights it. Optional step tabs switch the design shown. Promoted from KhiladiPro's registration form on its second use, Getmega's sit flow and state board.
- **Block spacer** (`.block`): one block-gap above.
- **Video in a device:** muted, looping, `playsinline`, with a poster, a WebM source first and an MP4 after it. Never a GIF (Getmega's 1.5 MB GIF became 160 KB).
- **Swiped set** (`swipePager()`). Parallel cards of one shape sit side by side on a phone, with the next card's edge showing and a pager beneath, instead of a long stack. An optional `onChange(index)` hears which card has settled.

Promoted from Getmega on their second use in SEDP:

- **Rows** (`.rows`): label and value pairs on hairlines, for facts that are read rather than scanned.
- **Callout** (`.callout`, `--caution`, `--quiet`): the one line a section turns on (`.callout-line`) with a quieter line under it (`.callout-copy`). Either line can stand alone.
- **Standout** (`.standout`): a closing statement at lead size in full ink.
- **Split** (`.split`, `--flip`): copy beside media, centred on each other. Stacks at 1080.
- **Pair** (`.pair`, `--devices`): two figures side by side; `--devices` caps each at 240px and centres the pair.
- **Strip** (`.strip` with `[data-strip]`, `.strip-item`, `.strip-cap`): a numbered sequence of figures in reading order, becoming a swiped set with a pager on a phone.
- **Window** (`.window`, `.window-bar`, `.window-url`, `.window-screen`, `--fixed`): a browser window around a web artifact; `--fixed` crops every screen in a deck to one 16:10 shape from the top.
- **Wide hero** (`.hero--wide`): more room for a browser window on the device side, a filmstrip of windows on a phone.
- **Sub-head** (`.chead--sub`): a chapter head inside a chapter, one block-gap down, or none as a block's first child.
- **Expand** (`.annot-zoom`) on an annotated artifact, and **`.vh`** for text kept for assistive technology only.

Promoted from SEDP on their second use in Mega Poker: **`.fig-note`** (the caption under an annotated artifact) and **`.block-sm`** (a note one closer step below the figure it belongs to).

**Engines** (`window.CaseSystem`): `walk(root, stepList, onStep)`, `annotate(root)` (automatic on `[data-annot]`), `pinnedSequence(root, count, render)`, `stack(el, texts)`, `swap(...els)`, `showFrame(screen, i)`, `swipePager(track, items, labelFor, onChange)`, plus the shared scroll loop (`onScroll`, `queueScroll`, `runScroll`) and helpers (`$`, `$$`, `pad`, `clamp`, `reduced`).

## 9. Demos still owned by one study (candidates for promotion)

Each of these waits for its second use (§1). From KhiladiPro:

- **Room diagram.** Where the phone is and where the player is, at each onboarding step.
- **Same frame, different stakes** (`.rehearsal`). Two devices side by side with dashed zones drawn across both, and a legend that lights a zone on both at once. The general pattern is a locked-frame comparison.
- **Landing lab** (`.lab`). A real browser window whose bottom edge is the fold, with readers that light the part of the page that answers them, and a width switch. The general pattern: which audience a responsive page serves at each width.
- **Constraint drawings** (`.cons`, `.cviz`). Each constraint drawn as the thing it constrained, with the decision it forced. It has to demonstrate the constraint, not list it.
- **Rehire** (`.rehire`, `.eng`). Two engagements as windows, joined by the line between them.

From Getmega:

- **Copy beside two devices** (`.zoomin`, `.duo`): a flow narrowed to one step and one interaction.
- **A mechanism in order** (`.mech`): three devices with numbered captions, swiped on a phone.
- **Gallery** (`.shots`): uniform frames per shape, each opening full size.
- **Scope chips** (`.scope`), the **hinge** line (`.hinge`), and **how the work ran** (`.ran`).

From SEDP:

- **Plates** (`.frame`, `--small`, `--narrow`, `--strip`, `--fixed`, `--zoom`): light desktop crops on white plates, never upscaled past their natural size.
- **Notes as an index** (`.annot-body--below`): an annotated artifact too wide for a side list runs full width, with its notes under it in columns.
- **Before and after** (`.before-after`): the old control panel, narrow, beside the workspace that replaced it.
- **Numbered brief** (`.brief`, `.brief-list`).

From Mega Poker:

- **One device, read alone** (`.split--device`, `.annot-body--device`): a single phone at the hero's 300px, centred in its half of a split, so copy keeps the chapter's left edge and the devices step from side to side down the page. Two columns hold down to 760. On a phone an annotated device puts its notes first, as a swiped set that lights the note settling in place, with the screen under them, because a phone screen and its notes are taller than a phone's view.
- **Sample mismatch** (`.mismatch`, `--wide`): a design sample whose figures do not add up says so beside the figure, in the caution colour, at caption size.
- **Aligned pairs**: paired devices share rows through subgrid, so a label that wraps in one column does not push its device below the other. Promote with `.pair--devices` when a second study labels its pairs.

## 9a. Studies on the system

| Study | Page | Accents (sampled from the product) |
|---|---|---|
| KhiladiPro | `projects/khiladipro-redesign-claude.html` | Coral, mint, amber, red-to-orange action gradient |
| Getmega | `projects/getmega-redesign-claude.html` | Teal (its play colour), gold (winnings), red (alerts), flat teal action |
| SEDP (with Ecometer and Agrimarket) | `projects/sedp-redesign-claude.html` | The heatmap's pink, CEDA's navy lifted for the dark ground, the heatmap's light end for limits, its peach-to-crimson ramp |
| Mega Poker | `projects/mega-poker-redesign-claude.html` | Copper (its primary buttons), teal (its live cards, lifted), red (the unavailable offer), the copper button's own ramp |

## 10. Phones and tablets

A phone layout is designed, not shrunk. "It still looks so bad on mobile" was said twice before these rules held.

- **Components change form rather than shrink.** Tile grids become index rows, facts become a spec list, the rail and pill rows scroll edge to edge, parallel cards become a swiped set, and a card inside a card loses its chrome.
- **The control and what it controls are never a scroll apart.** The artifact sits directly under its switch, a legend under the zones it lights, notes under the pins they point at.
- **Nothing pans sideways that can be seen whole.** A design is shown fitted, and the viewer is where it gets legible.
- **Pinned stages fit the screen.** The device is height-driven and never clipped. Short screens drop what they cannot afford (the room diagram under 760px tall, body copy under 680px), and the copy column stretches so it keeps the left edge.
- **Layouts hold still.** Anything whose text changes reserves the height of its longest version.
- **Breakpoints:** 1180 (wide grids reflow), 1080 (two-column layouts stack), 900 (side-by-side demos stack), 760 (phone), 520 (small phone), plus the height queries above.
- **Touch:** 44px targets, a pressed state on everything tappable (there is no hover to announce it), and no tap highlight.
- **Verify at** 360×800, 375×667, 390×844 and 430×932 on phones, then 768 and 820 on tablets, then 1080 and 1440.

## 11. Content rules

- **No em dashes and no en dashes, anywhere:** page, CSS, JS, comments. "That is basic hygiene." Use a colon, comma, semicolon or full stop, and spell ranges out ("25 May to 15 June").
- **No fabricated metrics.** If there was no analytics access, say so once, plainly, and link to what you would measure.
- **Say it once.** Never show the same artifact twice (a landing page shown twice was rejected).
- **The author's words.** Keep the case study's wording; list any line you wrote or changed so the author can check it.
- **Per-study vocabulary** belongs to that study (KhiladiPro: "onboarding", never "setup"; no link to and no screenshot of the live kpro.fit site).
- **Evidence stays what it is.** A design export is never captioned into a production capture. A sample whose figures do not add up is shown unchanged, with the exact mismatch beside it, never silently repaired or cropped away. Sample dates and amounts are labelled as samples where a reader could mistake them for the engagement's.
- **Getmega and Mega Poker** are separate studies. Mega Poker's CEO had been Getmega's Growth Head; Mega Poker was a different, restructured company. Never "the same company rehired me". Each page tells that connection once.
- **Every section must be clear on a scan.** "What is it meant for? It should be very clear on just a scan what it is trying to say."

## 12. Decision log

**Kept**

- The dark product-craft direction, after the cream editorial version was rejected.
- The hero, the pinned onboarding walk, the source-material tiles, the testimonial and the footer, each approved as first built.
- Scroll-driven steps plus explicit step controls.
- One shared control style.
- The quieter lead.
- The rhythm table in §3.
- The rehire before the outcome.
- The event screens framed as the screens players opened daily, with the device in the centre.

**Rejected**

| What | Why, in the author's words or close to them |
|---|---|
| Cream paper, serif display, uppercase mono eyebrows, terracotta | "too ai-made, the typography, ui elements etc" |
| Static figures with captions | "the case study can have so many interactive elements which this does not have" |
| Two bottom-aligned columns, text islands | "weird floating layout", twice |
| A constraints table of text, then more cards of the same shape | "not easily scannable", "overwhelming", "should actually feel like it is demonstrating the constraints" |
| "Where it shows" preview panels for the constraints | removed on request |
| A one-device rig with a switch, then side-by-side phones with leader lines, then an annotation column | not premium enough; rethought from scratch |
| A wipe against production, crop cards, a zoom inspector, an objection accordion with a 2.2x zoom | "keep it simple, clean but premium" |
| A larger type scale | "i dont like the large typography" |
| Rules across the tops of sections, heavy section padding | "weird and unrhythmic" |
| A thumbnail strip that pushed the device out of view | navigation must never move the thing it navigates |
| Sideways panning of wide designs on phones | the page shows them whole, the viewer makes them legible |

## 13. Verification

```bash
python3 scripts/case-verify.py check projects/<study>.html
```

It checks for em and en dashes, ungated hover rules, unbalanced braces, and CSS rules the browser drops. At seven widths it checks for sideways scroll, console errors and pinned stages that move between steps.

For reading the page section by section:

```bash
python3 scripts/case-verify.py shots projects/<study>.html
```

For proving a refactor changed nothing (computed style of every element and pseudo-element at five widths):

```bash
python3 scripts/case-verify.py snap projects/<study>.html before
python3 scripts/case-verify.py snap projects/<study>.html after
python3 scripts/case-verify.py diff before after
```

**Traps that have bitten:**

- A duplicated brace silently killed every rule after it; check parsed-rule counts, not the file.
- `overflow-x: hidden` on `body` breaks sticky; use `clip`.
- A percentage padding on a scroll container feeds back into its column's width.
- A flex column inheriting `align-items: center` shrink-wraps once its wide children hide.
- Browser-pane screenshots lag a frame and freeze when the pane is hidden; verify state from the DOM or with the script.
