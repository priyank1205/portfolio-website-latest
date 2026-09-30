# What makes a portfolio feel premium

**Date:** 2026-09-22
**Brief:** analyse the visual design, premium feel, interaction design and overall experience of the four portfolios you liked, plus five more senior designers working at the same tier, and turn it into changes for your site.

## Subjects

| # | Who | Where | Role |
|---|-----|-------|------|
| 1 | **Tammy Taabassum** | taamannae.dev | Staff Product Designer, Gen AI, Figma |
| 2 | **Daniel Destefanis** | danield.design | Product Designer, Consumer, Anthropic |
| 3 | **Jakub Zegzulka** | zegzulka.com | Design, OpenAI (ex-Apple SPG, Meta Reality Labs) |
| 4 | **Jenny Wen** | jennywen.ca | Design lead, Claude and Cowork, Anthropic |
| 5 | Gavin Nelson | nelson.co | **Product Designer, OpenAI** (ex-Linear, ex-GitHub) |
| 6 | Rauno Freiberg | rauno.me | Interaction Designer, Vercel and Devouring Details |
| 7 | Emil Kowalski | emilkowal.ski | Design Engineer, Web team, Linear (ex-Vercel design) |
| 8 | Paco Coursey | paco.me | Webmaster, Linear (built the Vercel design system) |
| 9 | Brian Lovin | brianlovin.com | AI products, Notion (ex-Staff Designer GitHub, founded Campsite) |

1 to 4 are yours. 5 to 9 are the ones I went and found: all senior, all in the same Vercel, Linear, OpenAI, Anthropic orbit, all with sites that are beautiful for reasons you can measure.

Every number below is read off the live DOM and computed styles, not estimated.

---

## 1. Why you like those four

Before adding anyone, it is worth naming what your four have in common, because it is remarkably specific.

| | Tammy | Daniel | Jakub | Jenny |
|---|---|---|---|---|
| Font sizes, whole site | 6 | **4** | **2** | **2** |
| Largest type | 64px | **24px** | 16px | 72px |
| Box shadows | **none** | layered | **none** | **none** |
| Border radius on media | 12px | 48px | 2px | **0px** |
| Hover vocabulary | one | two | none | none |
| Ground | `#F1F1EE` | `#FFF` | `#FFF` | `#000` |

Two light, one white, one black, and they still feel like siblings. The shared DNA is not a palette. It is **subtraction**: almost no type sizes, almost no shadows, almost no motion, and one contained moment of personality each.

That is the thesis of this whole document. Premium is not something you add. It is what is left when you take enough away and then spend all the remaining attention on four or five details.

---

## 2. The nine, on visual craft

### 2.1 Tammy Taabassum, taamannae.dev

**Ground and surface.** Warm off-white `#F1F1EE`, card surface `#E2E2DE`, ink `#212529`, muted `#898989`. The card is a *darker* value than the page, not a lighter one with a shadow. On a light ground, recessing a surface reads as calmer than floating it.

**Zero box shadows on the entire site.** Separation is done with a `1.5px solid rgba(0,0,0,0.12)` hairline. That 1.5px is unusual and deliberate: 1px disappears on retina, 2px reads as a border. 1.5px reads as a drawn line.

**Type.** Manrope for everything, neulis-cursive for the H1 only. H1 64px / line-height 1.2. Body 16px / line-height 1.7 on a 325px measure. Six sizes total: 64, 24, 20, 18, 16, 13.

**A blur ladder.** `backdrop-filter` values of 1px, 2px, 4px, 8px. She has a *scale* for blur the way most people have a scale for spacing. The status pill uses `blur(10px)` behind a translucent fill so it picks up the thumbnail behind it.

**Spacing.** Gaps of 4, 8, 16, 32. Radii of 12, 32, 64, 100. Both are clean doubling scales.

**Interaction.** `transform: scale(1.05)` over `0.4s` on card hover. That is the whole vocabulary. One gesture, used once, everywhere.

**The premium move:** the thumbnails are animated GIFs of the real product. All the visual energy sits in the content, and the chrome around it is deliberately inert.

### 2.2 Daniel Destefanis, danield.design

The most sophisticated surface work of the nine. He is the one to study for *materials*.

**Three shadow recipes, each doing a different physical job.**

```css
/* 1. Glass panel over the shader hero */
box-shadow:
  inset 0 1px  0   rgba(255,255,255,0.20),   /* lit top rim   */
  inset 0 0    16px rgba(255,255,255,0.05),  /* internal glow */
        0 8px  32px rgba(0,0,0,0.12);        /* cast shadow   */

/* 2. Raised light surface */
box-shadow:
        0 1px  3px  rgba(0,0,0,0.06),
  inset 0 1px  0    rgba(255,255,255,0.50);  /* bevel highlight */

/* 3. Physically modelled drop shadow, five layers */
box-shadow:
  0 21px 6px rgba(0,0,0,0.00),
  0 14px 5px rgba(0,0,0,0.01),
  0  8px 5px rgba(0,0,0,0.05),
  0  3px 3px rgba(0,0,0,0.09),
  0  1px 2px rgba(0,0,0,0.10);
```

Recipe 3 is the one to internalise. A real object casts a shadow that is **dark and tight where it meets the surface and pale and diffuse further out**. Five layers, opacity rising as distance falls, top layer at literally zero. Compare that to the single `0 14px 34px rgba(0,0,0,0.38)` most sites ship, which reads as a sticker with a grey smudge under it.

Note also that both glass and raised surfaces carry an **inset white top edge**. That one line is most of what separates "card" from "object".

**Type.** GT Standard by Grilli Type, two weights, two font files at 62KB each. **Four sizes: 24, 20, 17, 16.** No display type anywhere. Tracking of +0.13px to +0.16px on small text.

**Geometry.** Radii 48, 32, 24, 18, 15, 8, 9999. Gaps 4, 8, 12, 16, 24, 64. Max widths 1554, 1496, 724.

**Motion.** `0.1s` to `0.25s` on `cubic-bezier(0.4, 0, 0.2, 1)`, plus `0.5s` for opacity fades only. Short, one curve, no bounce.

**The premium move:** the hero is a live shader with a sun button that opens two sliders. It is not decoration, it is the argument. The three pulsing dots in the card corner quote a chat typing indicator.

**One honest flaw:** the pink-on-teal body copy over the animated scene is hard to read. The glass is not opaque enough. Even here, legibility lost to beauty once.

### 2.3 Jakub Zegzulka, zegzulka.com

The emptiness specialist. Measured at a 760×818 viewport:

- Nav at `y=12`, 12px type.
- Next element, the metadata, at **`y=288`**. The top 35% of the first screen is empty.
- Metadata pinned to the corners at `x=12` and `x=718`, twelve pixels from the viewport edge.
- The 32px thesis line does not appear until `y=778`, the very bottom of screen one.
- Whole case study: 3.4 screens.

**Zero shadows. Radius 2px.** Nothing is elevated and nothing is rounded. The page is flat paper.

**The craft detail worth stealing: optical tracking.** Letter-spacing is **+0.7px and +0.4px on the 12px text, and -0.4px on the 32px thesis.** Small type gets opened up, large type gets tightened. Almost nobody does this and it is the difference between type that is set and type that is merely placed.

**Two font sizes, 16 and 12.** System sans, no webfont at all.

**The premium move:** confidence through restraint. A homepage of wordless full-viewport panels that assumes you recognise the Apple and Meta logos.

### 2.4 Jenny Wen, jennywen.ca

**Ground.** Pure `#000000`, text `#FFFFFF`, dates `#6B7280`. One of only two in the set that goes pure black.

**Type, measured at 760px wide.**

| | Value |
|---|---|
| Display (the name) | 72px, weight 800, line-height **1.0**, tracking **-1.8px (-2.5%)** |
| Body | 18px, line-height **1.625**, tracking -1% |
| Total sizes | **2** |

The display line-height is set solid at 1.0 and tracking is pulled in hard. Body goes the other way, 1.625 and generous. **Line height and tracking move inversely to size.** This single relationship is most of what makes typography look professional.

**Link treatment:** `text-underline-offset: 4px`, `text-decoration-thickness: 2px`. Thick underlines held well clear of the baseline, rather than the browser default hairline sitting on the descenders.

**Vertical rhythm:** entries land at y = 519, 1260, 2029, 2799, 4110. That is roughly **770px between entries, about one viewport of air each**.

**Zero shadows. Zero radius on images.** Square corners, flat on black.

**Images are small**, 547px wide next to a 467px text measure, left-aligned in a wide black field. She is not selling the screenshots.

**The premium move:** one 72px bold-italic logotype in a paid display serif (Swear Text Cilati), used exactly once, on a site that otherwise has a single type size. Because it is the only flourish, it carries the entire brand.

### 2.5 Gavin Nelson, nelson.co (OpenAI)

The best find of the five and probably your most useful single model, because he is a senior IC product designer shipping consumer AI at OpenAI, writing about mobile interaction craft.

**The case study template, `/work/linear-search`:**

```
Context        heading + 1 to 2 paragraphs + one video
Problem        heading + 1 to 2 paragraphs + one video
Scope          heading + 1 to 2 paragraphs + one image
Exploration    heading + 1 to 2 paragraphs + one image
Solution       heading + 1 to 2 paragraphs + one video
Display options heading + 1 to 2 paragraphs + one video
```

One heading, one or two short paragraphs, one asset. Repeated six times. The media files are literally named after the sections: `context.mp4`, `problem.mp4`, `scope.png`, `exploration.png`, `searchsolution.mp4`, `displayoptions.mp4`, `searchdetails.mp4`. All rendered at 608px.

**There is exactly one font size on the entire case study page: 15px.** H1, H2, body, captions. All of it. Hierarchy comes from weight (400 and 500) and from vertical space. Three colours: black, `#A1A1AA`, transparent.

**Video config:** `autoplay loop muted playsinline`, no poster. Silent, always running, mobile safe.

**Hero treatment:** the phone screenshot sits inside a soft neutral panel and **bleeds off the right edge** rather than floating centred in white. Cropping the composition is what makes it read as a product shot rather than a mockup.

**The writing is the other half of the craft.** This is how someone at this level describes motion:

> "A drag handle morphs into a chevron and triggers haptic feedback when you cross the close threshold, helping introduce the interaction."

> "The exit transition also scales with the distance of your drag. Longer pulls produce a more pronounced motion, so the animation more closely mirrors the physical gesture."

> "I built high-fidelity prototypes in Origami Studio and SwiftUI to tune arc-based enter and exit transitions so the overlay feels ephemeral and responsive."

Every sentence names a mechanism and gives a reason. No adjectives doing work that a specification should do. If you want one writing target for interaction sections, it is these three sentences.

He also has a `Scope` section that states the constraint before the solution: "The team wanted to avoid completely redesigning the bottom toolbar navigation, so I focused on reducing the worst navigation pain within the existing architecture."

**And:** his three ChatGPT items link out to x.com and openai.com announcements. Only the older Linear and GitHub work gets internal pages. The same proof-link instinct Tammy has, arrived at independently.

### 2.6 Rauno Freiberg, rauno.me (Vercel)

The interaction ceiling. If Daniel is materials, Rauno is mechanics.

**The homepage is horizontal.** Document width 5,834px against a 760px viewport, seven and a half screens wide. Vertical wheel scroll drives horizontal travel. `overscroll-behavior: none`, `touch-action: pan-x pan-y`.

**A minimap, not a nav.** A row of tick marks at the top with a bordered tracker box that slides across as you move, the current section filled yellow. It persists across pages. This is the same family as your kp filmstrip, executed as global navigation.

**Contextual cursors instead of a custom cursor.**

```
.cursor-resizing-ew *  { cursor: ew-resize; }
.cursor-moving *       { cursor: move; }
.cursor-grabbing *     { cursor: grabbing; }
.cursor-none *         { cursor: none; }
.index_contact button  { cursor: copy; }
```

He swaps the **system** cursor to match the current affordance. This is the sophisticated version of the custom-cursor trend: it communicates instead of decorating, and it costs one CSS class.

**`mix-blend-mode: difference`** on the centre crosshair, so it inverts against whatever card is under it. One property, and the mark is always legible on any background.

**Ground:** `hsl(0 0% 93%)`, a soft grey, never white. Custom typeface called "X", JetBrains Mono for numerics. Transitions at `0.2s ease-in-out`.

**`/craft` is the real credential:** a two-column masonry of roughly **80 dated interaction experiments** from 2021 to 2026, each a card with the title top-left, `Month Year` top-right, a thumbnail, and an optional footer action (`Read Essay`, `View Production`, `View Prototype`). Nobody can fake eighty dated artifacts.

**Also:** `2022.rauno.me` and `2023.rauno.me` still resolve. He keeps every previous version of his portfolio at a year subdomain. Your own site has redesign branches sitting in the repo; this is what to do with them.

### 2.7 Emil Kowalski, emilkowal.ski (Linear)

The plainest site in the set and the most rigorous token system. This is where to get your colour architecture.

**Two font sizes (16, 14). Two weights (400, 500). Four colours. One image. 344px text measure.** That is the whole homepage.

Ground `#FDFDFC`, ink `#21201C`, muted `#63635E`. **Warm near-white and warm near-black, never `#FFF` or `#000`.**

Underneath it runs the Vercel Geist token set, which is the Radix Colors architecture: **a 12-step grey ramp plus a parallel 12-step alpha ramp plus a named shadow ladder.**

```
gray-100 #fdfdfc   gray-500 #e2e1de   gray-900  #8d8d86
gray-200 #f9f9f8   gray-600 #dad9d6   gray-1000 #82827c
gray-300 #f1f0ef   gray-700 #cfceca   gray-1100 #63635e
gray-400 #e9e9e7   gray-800 #bcbbb5   gray-1200 #21201c

alpha-100 #00000003   alpha-500 #0000001f   alpha-900  #00000072
alpha-200 #00000006   alpha-600 #00000026   alpha-1000 #0000007c
alpha-300 #0000000f   alpha-700 #00000031   alpha-1100 #0000009b
alpha-400 #00000017   alpha-800 #00000044   alpha-1200 #000000df
```

The alpha ramp is the part people miss. Solid greys break the moment you put them over an image or a coloured panel; alpha greys composite correctly everywhere. Borders, dividers, hover fills and overlays all come from the alpha ramp, never the solid one.

**The shadow ladder,** and note that every step is built on a 1px border-shadow:

```
--shadow-border  : 0 0 0 1px rgba(0,0,0,.08);
--shadow-small   : 0 0 0 1px rgba(0,0,0,.08), 0 2px 2px rgba(0,0,0,.04);
--shadow-medium  : 0 0 0 1px rgba(0,0,0,.08), 0 2px 2px rgba(0,0,0,.04),
                                              0 8px 8px -8px rgba(0,0,0,.04);
--shadow-large   : 0 0 0 1px rgba(0,0,0,.08), 0 2px 2px rgba(0,0,0,.04),
                                              0 8px 16px -4px rgba(0,0,0,.04);
--shadow-menu    : …, 0 4px 8px -4px rgba(0,0,0,.04), 0 16px 24px -8px rgba(0,0,0,.06);
--shadow-modal   : …, 0 8px 16px -4px rgba(0,0,0,.04), 0 24px 32px -8px rgba(0,0,0,.06);
```

**Maximum shadow opacity anywhere in the ladder is 8%, and that 8% is the hairline, not the blur.** The blurs are all 2 to 6%. Elevation is communicated by the *spread of the blur*, not by its darkness.

**Transitions:** `0.15s cubic-bezier(0.4, 0, 0.2, 1)` applied to `color, background-color, border-color, text-decoration-color, fill, stroke`. **Colour only. No transforms, no scale, no translate.** That is why a site with no animation still feels responsive rather than dead: everything that can change colour does so smoothly, and nothing moves.

### 2.8 Paco Coursey, paco.me (Linear)

The dark counterpart to Emil, and confirmation that the token architecture is a genre convention rather than one person's habit.

Ground `#1A1A1A`, ink `#F2F2F2`. **Three sizes: 17, 16, 14.** Söhne by Klim Type Foundry, with Inter as fallback.

Layout tokens are explicit and few:

```
--page-width    1072px
--content-width  640px
--page-top       128px
--header-height   48px
--footer-height   48px
--body-margin-left  max(24px, env(safe-area-inset-left))
```

Same Radix 12-step grey plus 12-step alpha plus a separate 12-step pure-black alpha ramp.

**One transition on the whole site: `text-decoration-color 0.24s`.** Hovering a link fades the underline colour in. Nothing else on the page moves, ever. It is the most restrained interaction in the study and it feels expensive.

### 2.9 Brian Lovin, brianlovin.com (Notion)

**On dark, he does not use grey values at all. He uses one colour at five opacities:** white at 1.0, 0.9, 0.7, 0.5, 0.32. Four sizes (24, 20, 18, 16), three weights, Inter, **no shadows anywhere**.

Transitions again `0.15s cubic-bezier(0.4, 0, 0.2, 1)` on colour properties only.

The alpha-only approach on dark is worth noting: it guarantees your text ramp stays harmonious no matter what the background behind it does, and it is impossible to get the hue drift you get from hand-picked greys.

---

## 3. The premium grammar

Eleven rules, each backed by the measurements above.

### Rule 1: four font sizes

Median across the nine is **four**. Gavin's case study pages run on **one**. Jenny and Jakub run whole sites on **two**.

| Site | Sizes | Largest |
|---|---|---|
| Gavin Nelson (case study) | 1 | 15px |
| Jenny Wen | 2 | 72px |
| Jakub Zegzulka | 2 | 16px |
| Emil Kowalski | 2 | 16px |
| Paco Coursey | 3 | 17px |
| Daniel Destefanis | 4 | 24px |
| Brian Lovin | 4 | 24px |
| Tammy Taabassum | 6 | 64px |
| Rauno Freiberg | 6 | 85px |

Hierarchy comes from **weight, colour and vertical space**. Size is the blunt instrument you reach for when you have not built the other three.

### Rule 2: hairlines, not shadows

**Five of the nine have zero box-shadows.** Tammy, Jakub, Jenny, Brian and Gavin separate surfaces with a 1 to 1.5px hairline at 8 to 12% opacity, or by stepping the background value.

When shadows are used, they obey two laws:
- **Multiple layers, low opacity.** Emil's ladder tops out at 6% on the blur. Daniel's five-layer recipe tops out at 10%.
- **Always paired with a hairline.** Every Geist shadow includes `0 0 0 1px rgba(0,0,0,.08)` as its first layer.

A single `0 14px 34px rgba(0,0,0,0.38)` is the most recognisable tell of an amateur surface.

### Rule 3: an alpha ramp, not a grey list

Emil, Paco and Brian all use alpha-composited neutrals. Twelve steps of solid grey for backgrounds and text, twelve matching steps of `rgba(0,0,0,x)` or `rgba(255,255,255,x)` for **borders, dividers, hover fills and overlays**.

Solid greys break over images and coloured panels. Alpha greys never do.

### Rule 4: never pure

`#FDFDFC`, `#EDEDED`, `#F1F1EE`, `#21201C`, `#1A1A1A`, `#171717`, `#0F0F0E`. Seven of nine avoid `#FFFFFF` and `#000000` entirely, and the greys are **warm**, drifting a point or two towards yellow.

Jenny's pure black is the exception and she earns it: her site has no surfaces at all, so there is nothing for the black to sit behind.

### Rule 5: line height and tracking move inversely to size

| Size | Line height | Tracking |
|---|---|---|
| 72px display (Jenny) | **1.0** | **-2.5%** |
| 64px display (Tammy) | 1.2 | 0 |
| 32px thesis (Jakub) | 1.07 | **-0.4px** |
| 18px body (Jenny) | **1.625** | -1% |
| 16px body (Tammy) | **1.7** | 0 |
| 12px meta (Jakub) | 1.5 | **+0.7px** |

Large type: tight leading, negative tracking. Small type: open leading, positive tracking. Jakub swings from +0.7px to -0.4px across a single page.

### Rule 6: one easing curve, one duration, colour only

`cubic-bezier(0.4, 0, 0.2, 1)` appears on Emil, Brian, Jenny and Daniel. Durations cluster at **0.15s to 0.25s**. Nothing bounces. Nothing overshoots.

Emil and Brian transition `color, background-color, border-color, text-decoration-color, fill, stroke` and nothing else. Paco transitions **one property on the entire site**. A site where nothing moves but every colour change is smooth reads as calm and expensive; a site where things scale and slide reads as busy.

### Rule 7: one hover gesture, used everywhere

Tammy: `scale(1.05)`. Paco: underline colour. Emil: text colour. Jakub and Jenny: nothing at all. Pick one and do not invent a second.

### Rule 8: contextual cursors beat custom cursors

Rauno swaps `cursor` to `ew-resize`, `move`, `grabbing`, `copy`, `none` depending on what the element does. This communicates rather than decorates, costs one CSS class, and never fights the OS.

### Rule 9: media is a system, not a collection

- **One asset per section, named after the section.** Gavin: `context.mp4`, `problem.mp4`, `scope.png`. Daniel: `empty-state.mp4`, `version-history.mp4`.
- **Exported at display width.** Daniel's `potrait-list-500w.mp4` is 500px wide and displays at 500px.
- **MP4 with `autoplay loop muted playsinline`,** started and stopped by an IntersectionObserver. Never GIF.
- **Compose, do not float.** Gavin's hero crops the phone against a soft panel and lets it bleed off the edge. Jakub's screenshots run off the bottom of the frame.

### Rule 10: buy one typeface or use the system stack, nothing in between

| Approach | Who |
|---|---|
| Paid display or text face | Daniel (GT Standard), Paco (Söhne), Jenny (Neue Haas Grotesk + Swear), Rauno (custom "X") |
| System stack, unadorned | Jakub, Gavin |
| Inter | Brian |

Nobody in this set reaches for a Google Font other than Inter. One well-chosen paid grotesk at two weights, or `ui-sans-serif, system-ui`, both read as considered. A free display serif does not.

### Rule 11: one contained moment of personality

Daniel's playable shader. Jenny's 72px logotype. Rauno's blend-mode crosshair and yellow circle. Tammy's rotating hero line. Jakub's `2077` copyright. Gavin's avatar as the only image in his nav.

Exactly one per site, in a named container, on a page that is otherwise completely sober. Distributed whimsy reads as noise; concentrated whimsy reads as confidence.

---

## 4. Your site, measured against this

I read `assets/css/style.css`. The foundation is good: you are already dark with `--bg: #0f0f0e` and `--ink: #ebeae6`, already on Inter plus JetBrains Mono, already using hairlines at `rgba(255,255,255,0.08)` and `0.16`. That is the right neighbourhood.

The gaps are all quantity, not direction.

| | Your site | Reference median | Gap |
|---|---|---|---|
| **Distinct font sizes** | **43** | 4 | 10× |
| Distinct border radii | 11 (0, 1, 2, 6, 8, 9, 12, 14, 16, 50%, 999px) | 4 to 6 | 2× |
| Transition durations | 9 (0.15 to 0.9s) | 1 to 2 | 5× |
| Easing curves | 7, including a bounce and an overshoot | 1 | 7× |
| Max shadow opacity | **38% and 50%** | 6 to 12% | 5× |
| Shadow layers | 1 | 3 to 5 | |
| Neutral ramp | 3 steps (`ink`, `ink-soft`, `muted`) | 12 + 12 alpha | 8× |

The three worst offenders:

**43 font sizes.** Forty-three. This is almost certainly the single largest reason the site does not feel as tight as the four you like. Values like `0.97rem`, `0.94rem`, `0.92rem`, `0.9rem` and `0.86rem` are all present, and no reader can perceive the difference between them; they just register as inconsistency.

**Shadows at 38% and 50% opacity.** `0 14px 34px rgba(0,0,0,0.38)` and `0 24px 80px rgba(0,0,0,0.5)`. Nothing in the reference class goes above 12%, and most go above 8% only for the hairline. On a dark ground these will be reading as grey haze rather than elevation.

**Seven easing curves including `cubic-bezier(0.34, 1.56, 0.64, 1)`.** That curve overshoots past 1 and bounces back. So does `cubic-bezier(0.3, 0.5, 0.2, 1.1)`. Bounce is the most reliable way to make an interface feel consumer rather than professional. Not one of the nine uses an overshoot curve anywhere.

---

## 5. What to change

Ordered by ratio of perceived quality gained to work required.

### Tier 1: half a day, biggest visible jump

**1. Collapse to a six-step type scale.**

Your current 43 values compress cleanly into this, which keeps your existing dark, mono-inflected character:

```css
--text-display: clamp(2rem, 4vw, 2.75rem);  /* page title, once per page */
--text-title:   1.375rem;   /* 22px  section and card titles */
--text-lead:    1.0625rem;  /* 17px  intro paragraphs        */
--text-body:    0.9375rem;  /* 15px  everything readable     */
--text-small:   0.8125rem;  /* 13px  captions, meta          */
--text-micro:   0.6875rem;  /* 11px  mono labels, eyebrows   */
```

Six values. Then `grep -oE 'font-size: *[^;]+' assets/css/*.css` and rewrite every hit to one of the six. Nothing else on this list will move the needle as much.

**2. Replace both shadows with a layered ladder.** Since you are on dark, shadows need to be near-black and the hairline does most of the work:

```css
--shadow-border: 0 0 0 1px rgba(255,255,255,0.08);
--shadow-sm: var(--shadow-border), 0 1px 2px rgba(0,0,0,0.24);
--shadow-md: var(--shadow-border), 0 2px 4px rgba(0,0,0,0.20),
                                   0 8px 16px -6px rgba(0,0,0,0.24);
--shadow-lg: var(--shadow-border), 0 2px 4px rgba(0,0,0,0.16),
                                   0 12px 24px -8px rgba(0,0,0,0.28),
                                   0 24px 48px -16px rgba(0,0,0,0.24);
```

Then delete `0 14px 34px rgba(0,0,0,0.38)` and `0 24px 80px rgba(0,0,0,0.5)`.

**3. One easing, two durations.**

```css
--ease: cubic-bezier(0.4, 0, 0.2, 1);
--dur-fast: 0.15s;   /* colour, opacity, borders */
--dur-slow: 0.3s;    /* layout, reveals          */
```

Delete `cubic-bezier(0.34, 1.56, 0.64, 1)` and `cubic-bezier(0.3, 0.5, 0.2, 1.1)` outright. Your existing `cubic-bezier(0.2, 0.6, 0.2, 1)` is a reasonable house curve if you prefer to keep it, but keep only one.

**4. Prefer colour transitions to transform transitions.** Audit every `transition` that animates `transform`, `scale` or `translate` on hover and ask whether a `background-color` or `border-color` change would do the job. Keep one transform hover in the whole site, at most.

**5. Collapse radii to four.** You have eleven. Keep `2px` (inline chips), `10px` (small surfaces), `14px` (cards, your existing `--radius`), `999px` (pills). Delete 1, 6, 8, 9, 12, 16.

### Tier 2: a day, fixes the "almost right" feeling

**6. Build a proper neutral ramp.** You have three ink values and two line values. Add the alpha ramp, which is what you will actually use for borders, dividers, hover fills and overlays on a dark ground:

```css
--a1:  rgba(255,255,255,0.03);   --a7:  rgba(255,255,255,0.24);
--a2:  rgba(255,255,255,0.05);   --a8:  rgba(255,255,255,0.32);
--a3:  rgba(255,255,255,0.08);   --a9:  rgba(255,255,255,0.45);
--a4:  rgba(255,255,255,0.11);   --a10: rgba(255,255,255,0.56);
--a5:  rgba(255,255,255,0.15);   --a11: rgba(255,255,255,0.72);
--a6:  rgba(255,255,255,0.19);   --a12: rgba(255,255,255,0.93);
```

Your existing `--line` and `--line-strong` become `--a3` and `--a5`. Text ramp becomes `--a12`, `--a11`, `--a9`. Every hover fill becomes `--a2` or `--a3`.

**7. Set your type optically.**

```css
/* display */  line-height: 1.05; letter-spacing: -0.025em;
/* title   */  line-height: 1.2;  letter-spacing: -0.015em;
/* body    */  line-height: 1.65; letter-spacing: 0;
/* small   */  line-height: 1.5;  letter-spacing: 0.005em;
/* micro   */  line-height: 1.4;  letter-spacing: 0.06em;  /* mono uppercase */
```

Inter in particular needs the negative tracking at display sizes; it is drawn loose by default.

**8. Fix link underlines.** `text-underline-offset: 4px; text-decoration-thickness: 1.5px;` with the colour transitioning on hover rather than the underline appearing and disappearing. Jenny uses 4px and 2px; on dark, 1.5px is enough.

**9. Rebuild the case-study section template as Gavin's.** One heading, one or two short paragraphs, one asset, named after the section. Apply it to the kp chapters. It will immediately show you which sections have no asset worth showing and should be cut.

**10. Convert every animated GIF and heavy image to MP4** with `autoplay loop muted playsinline` plus an IntersectionObserver, exported at its display width. Name the file after the interaction it shows.

### Tier 3: the things that will actually make it feel like theirs

**11. Add a one-line optical polish pass.** These are the details that separate the four you like from competent work:

- `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;` on body, for dark grounds specifically.
- `font-variant-numeric: tabular-nums;` on every metric, year and date, so numbers stop jittering.
- An inset top highlight on any raised surface: `inset 0 1px 0 rgba(255,255,255,0.06)`.
- `::selection { background: var(--accent-dim); }` so even selecting text is on-brand.
- A real focus ring: `box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent);`

**12. Compose your product shots, do not float them.** Put screenshots inside a soft panel a step off the page background, crop them, let them bleed off one edge. Stop centring full device mockups in empty space.

**13. Pick one contained moment.** You get exactly one. Given your positioning, the strongest candidate is **an operable demo of a real interaction you shipped**, in the hero or at the top of the flagship, in the manner of Daniel's shader and Ian Silber's game. Not a scroll animation. Something the reader can grab.

**14. Adopt Rauno's version archive.** You have `khiladipro-original.html`, `khiladipro-redesign-claude.html`, `sedp-dashboard-original.html` and a `compare.html` sitting in the repo. Rauno publishes his old portfolios at `2022.rauno.me` and `2023.rauno.me`. Publishing your iterations at a subdomain or an `/archive` route turns dead files into evidence that you iterate.

**15. Consider buying one typeface.** Inter is genuinely fine and Brian Lovin ships it. But GT Standard, Söhne and Neue Haas Grotesk are doing real work on three of the sites you liked, and a single licensed grotesk at two weights is probably the cheapest available step-change in perceived quality. If you would rather not, go the other way to `ui-sans-serif, system-ui` like Gavin and Jakub. The one thing not to do is stack multiple free display faces.

### Do not do

- Do not add a custom cursor blob. Use contextual `cursor` values.
- Do not add scroll-jacking, parallax or reveal-on-scroll curtains. None of the nine has any.
- Do not add a second hover gesture.
- Do not add gradients, glows or mesh backgrounds.
- Do not use any easing curve that overshoots.
- Do not raise a shadow above about 12% on any single layer.

---

## Appendix: measured values, all nine

**taamannae.dev** · `#F1F1EE` ground, `#E2E2DE` card, `#212529` ink, `#898989` muted · Manrope + neulis-cursive · 6 sizes (64/24/20/18/16/13) · h1 64/1.2, body 16/1.7, measure 325px · **no shadows**, `1.5px solid rgba(0,0,0,0.12)` hairline · radii 12/32/64/100 · gaps 4/8/16/32 · backdrop-blur ladder 1/2/4/8px · hover `scale(1.05) 0.4s`

**danield.design** · `#FFF` / `#171717` · GT Standard, 2 weights, 2 files at 62KB · **4 sizes (24/20/17/16)** · radii 48/32/24/18/15/8/9999 · gaps 4/8/12/16/24/64 · maxw 1554/1496/724 · tracking +0.13 to +0.16px · `0.1s to 0.25s cubic-bezier(0.4,0,0.2,1)`, 0.5s opacity · three shadow recipes incl. a five-layer physical ramp · video `-500w.mp4` at 500×1088, IntersectionObserver play/pause

**zegzulka.com** · `#FFF` / `#000` · system sans, no webfont · **2 sizes (16/12)** · **no shadows**, radius 2px · metadata at `y=288` on an 818px viewport, `x=12` and `x=718` · thesis 32px at `y=778` · case study 3.4 screens · tracking **+0.7px at 12px, -0.4px at 32px** · lh 24/18/34.24px

**jennywen.ca** · `#000` / `#FFF`, dates `#6B7280` · Neue Haas Grotesk Text + Swear Text Cilati (once) · **2 sizes** · display 72px/1.0/-1.8px/w800 · body 18px/1.625/-1% · measure 467px, images 547px, **radius 0** · **no shadows** · `text-underline-offset 4px`, `thickness 2px` · ~770px between entries · 35 images, 0 video

**nelson.co** · `#FFF` / `#000`, muted `#A1A1AA` · `ui-sans-serif, system-ui` · **2 sizes site-wide (16/15), 1 size on case studies (15px)** · 2 weights · measure 745px, media 608px · 5 videos + 4 images per study, `autoplay loop muted playsinline` · assets named per section

**rauno.me** · `hsl(0 0% 93%)` ground · custom "X" + JetBrains Mono · 6 sizes (85/75/32/16/14/13) · document 5,834px wide against a 760px viewport · minimap tracker nav · contextual cursors (`ew-resize`/`move`/`grabbing`/`copy`/`none`) · `mix-blend-mode: difference` crosshair · `0.2s ease-in-out` · radii 12/9999 · `/craft` holds ~80 dated experiments · prior versions live at `2022.rauno.me`, `2023.rauno.me`

**emilkowal.ski** · `#FDFDFC` / `#21201C`, muted `#63635E` · **2 sizes (16/14), 2 weights, 4 colours, 1 image** · measure 344px · Geist 12-step grey + 12-step alpha ramp · shadow ladder, max 8% and that is the hairline · `0.15s cubic-bezier(0.4,0,0.2,1)` on colour properties only

**paco.me** · `#1A1A1A` / `#F2F2F2` · Söhne (Klim) + Inter fallback · **3 sizes (17/16/14)** · `--content-width 640px`, `--page-width 1072px`, `--page-top 128px`, header/footer 48px · Radix 12-step grey + alpha + black-alpha · **one transition site-wide: `text-decoration-color 0.24s`**

**brianlovin.com** · black ground · Inter · 4 sizes (24/20/18/16), 3 weights · **text ramp is alpha-white only: 1.0 / 0.9 / 0.7 / 0.5 / 0.32** · **no shadows** · measure 749px · `0.15s cubic-bezier(0.4,0,0.2,1)` on colour properties only

**Your `assets/css/style.css`** · `#0f0f0e` / `#ebeae6`, muted `#82806f`, accent `#f0a344` · Inter + JetBrains Mono · **43 font sizes** · 11 radii · 9 durations · 7 easings incl. 2 overshoots · shadows at 38% and 50%, single layer · 3-step neutral ramp, no alpha ramp · maxw 760/1120
