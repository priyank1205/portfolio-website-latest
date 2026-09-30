# Reference portfolio teardown: designers at Anthropic, OpenAI and Figma

**Date:** 2026-09-22
**Subjects:** nine portfolios, ordered below by how much they explain themselves, from most to least.

| # | Who | Where | Role |
|---|-----|-------|------|
| 1 | Carl Thomas IV | carlthomasiv.com | Principal Product Designer, Ona (acquired by **OpenAI**) |
| 2 | Tammy (Taamannae) Taabassum | taamannae.dev | Staff Product Designer, Gen AI, **Figma** (ex-Meta, Xbox, Instok) |
| 3 | Leo Mancini | 73-slide public Google Slides deck | ex-**Anthropic**, Facebook, Square, Cash App, Indeed, Code for America |
| 4 | Jakub Zegzulka | zegzulka.com | Design, **OpenAI** (ex-Apple Special Projects, Meta Reality Labs) |
| 5 | Daniel Destefanis | danield.design | Product Designer, Consumer, **Anthropic** (ex-Figma, Discord) |
| 6 | Jenny Wen | jennywen.ca | Design lead for Claude and Cowork, **Anthropic** (ex-Director of Design, Figma) |
| 7 | Joel Lewenstein | joellewenstein.com | Head of Product Design, **Anthropic** (ex-Airtable, Quora) |
| 8 | Ian Silber | iansilber.com | Head of Product Design, **OpenAI** (ex-Global Illumination, Artifact, Instagram) |
| 9 | Vince Lin | vincelin.co | Claude Builder, Anthropic student programme (see the caveat in §9) |

Method: read the live DOM, computed styles, CSS rules, scripts and media manifests for the eight sites; exported and stepped through all 73 slides of the deck. Every number in this document is measured, not estimated.

---

## 0. Headline findings

### 0.1 The four things all nine do

1. **The artifact is the argument.** Every one leads with real, full-fidelity, real-data product UI. Not one leads with a process diagram, a persona, or a double diamond.
2. **Words are rationed and load-bearing.** Where text appears it is short, declarative, and written in the voice of a decision-maker, not a student documenting an assignment.
3. **Claims are externally verifiable.** All of them route the reader to third-party proof: release notes, App Store, company blog, acquisition coverage, a colleague's tweet, the live product itself.
4. **The type system is tiny.** One to three fonts, two to eight sizes, site-wide. Hierarchy comes from weight, colour, rules and space, almost never from size.

### 0.2 The gradient

The nine disagree about almost everything surface-level: light against dark, essay against showreel, six case studies against 73 slides. What actually separates them is one variable.

**The more externally verifiable a person's work is, the less they write.**

| Career stage | What the site is | Who |
|---|---|---|
| Building a reputation | Narrative case studies with outcomes, methodology, tradeoffs | Carl Thomas |
| Partly verifiable, partly not | Narrative for old work, proof links for new | Tammy Taabassum |
| Reputation established in public | Showreels and proof links, minimal text | Leo Mancini, Daniel Destefanis |
| Reputation precedes you | A dated changelog, a business card, or a toy | Jenny Wen, Joel Lewenstein, Ian Silber |

Carl writes 4,000 words because his work sits behind an enterprise login. Daniel writes twelve because you can download his app. Joel writes thirteen lines because you can watch him give the Config talk.

Two consequences, and they are the most useful thing in this document.

**First:** the strategic question for your site is not "how do I write better case studies." It is **"how do I move more of my work into the column that verifies itself?"** Every live URL, every Wayback capture, every named quote, every press mention lets you delete a paragraph. Deleting paragraphs is how the site gets better.

**Second:** do not skip ahead. A stage-four site made by a stage-one designer reads as empty, not confident. You are at stage one and Carl is your closest model. The value of knowing about stages three and four is knowing what you are aiming at, and understanding that every paragraph you write is a debt you are paying because the reader does not yet know who you are.

### 0.3 The striking one

**The three most senior design people across both companies have no portfolio at all.** Not a short one. None. Joel Lewenstein (Anthropic) publishes 5,887 bytes of HTML and nine outbound links. Ian Silber (OpenAI) publishes an air hockey game. Jenny Wen publishes a list of dates. Details in §6, §7, §8.

---

## 1. Carl Thomas IV, carlthomasiv.com (Ona, then OpenAI)

The most directly applicable of the nine, because his work requires explanation the way yours does.

### A caveat up front

This site is dark warm-black plus DM Serif Display plus DM Mono eyebrows plus filter chips plus numbered `01/02/03` rails, and the footer reads "Built with Claude Code & Next.js." That is very close to the visual formula you have already identified as reading AI-generated. **Take the writing and the information architecture; do not take the skin.** The type pairing and the mono eyebrows are the most replicated design-portfolio look of the last eighteen months.

With that said, the content architecture is the best of the nine.

### The case study structure (`/work/ona-conversations`)

Worth reproducing as a template, because every section does a distinct job.

| # | Section | What it is for |
|---|---------|----------------|
| 1 | Eyebrow: `ONA · AI & AGENTS · PRODUCT DESIGN · PRODUCT STRATEGY` | Instant taxonomy |
| 2 | **Title with a colon**: "Ona Sessions: Moving Work From Chat to PRs" | Name and thesis in one line |
| 3 | One-sentence deck | "…around the loop developers actually cared about: ask, review, edit, ship." |
| 4 | `Principal Product Designer · Shipped May 2026` | Role and proof-of-ship, one line, no table |
| 5 | Full-fidelity hero screenshot (real code, real filenames, legible) | The artifact |
| 6 | **Outcomes, at the top**: +69%, +39%, +38% | Payoff before the story |
| 7 | `OVERVIEW` | Market context, and the stakes |
| 8 | `THE MISMATCH` | Evidence: customer quotes, usage data, competitive scan |
| 9 | `THE PRINCIPLES BEHIND THE SHIFT` | 4 named principles |
| 10 | `CREATING CONVICTION` | How he made it real: mapping, Figma, working prototype |
| 11 | `DESIGNING THE BRIDGE` | 3-column before, bridge, after positioning |
| 12 | `WHAT SHIPPED` | Sub-sections, each headed by a full sentence |
| 13 | `WHAT WE CUT, AND WHAT WE KEPT` | Scope tradeoffs with reasoning |
| 14 | `SHIPPING UNDER REAL CONSTRAINTS` | Team shrank; he adjusted and wrote frontend |
| 15 | `ROLLOUT AND STABILIZATION` | 4-stage release plus a course correction |
| 16 | `OUTCOMES` | Same metrics, now with absolute numbers and a **methodology footnote** |
| 17 | `REFLECTION` | 4 lessons, including one unresolved |
| 18 | Link to the Ona engineering blog post | External proof |

### The five sentences that make it credible

Everything above is structure. These are the moves.

**1. He names the internal opposition and says he overruled it.**
> "Reorganizing the product around Sessions instead of environments was not an obvious call… three of our most agent-forward enterprise customers were tied directly into the embedded editor. Pushing that into the background carried real risk, **and not everyone was sure we should. I made the argument anyway.**"

**2. He lets data contradict internal opinion, including possibly his own.**
> "Internally, opinions on keeping the editor ran strong… When I looked at real Core and Enterprise data, it did not show the editor mapping to real-world usage the way internal sentiment assumed."

**3. He documents a course correction that he later reversed.**
> "For a short period, we auto-opened the environment tab to reduce discomfort. As users adjusted, behavior showed they were not relying on it as much as expected. We later removed the auto-open behavior… Early discomfort can look like failure if you react too quickly."

**4. He footnotes his own metrics like a researcher.**
> "Anchored to full enterprise rollout 2026-04-06, measured over the 30 days following, against a 30-day pre-launch baseline. External cohort (all non-internal accounts). Launch sequence: PLG 2026-03-31, initial enterprise 2026-04-02, full rollout 2026-04-06."

And on the chart: *"Growth later in the period is shared with Automations, which grew from 20.2% to 40.5% of executions."* He actively attributes part of his own result to someone else's feature.

**5. He ends with a question he could not answer.**
> "Top of funnel softened later in ways I could not explain from the data I had, and that is the thread I would pull next. The first Session for a new user is a different problem than the tenth for an experienced one, and we designed mostly for the second."

This is the entire credibility engine. A portfolio that only contains wins reads as marketing. A portfolio containing a named risk, a reversed decision, a shared credit, a stated methodology and an open question reads as a practitioner's account. **This is the single thing most worth stealing from all nine sites.**

### Two reusable visual components

**The loop chain**: four bordered cards in a row with mono `01` to `04` labels and arrow glyphs between them.

```
01 Conversation   →   02 Execution      →   03 Review      →   04 Delivery
   Ask for work          Agent makes           Inspect            Ship the PR
                         changes               the diff
```

**The three-column bridge**: before, transitional, target, middle column highlighted.

```
WHERE CUSTOMERS WERE  ›  BRIDGE RELEASE              ›  WHERE ONA NEEDED TO GO
Environment-first        Conversation-first             Session-first
Code-first               Code still inspectable         Agent-led execution
Manual review            Review close to dialogue       Human review and judgment
Runtime visible          Environment when needed        Infrastructure in background
```

Four lines per column, no verbs. It communicates an entire product strategy in one glance and is trivially implementable.

### Typographic hierarchy without size

| Element | Treatment |
|---------|-----------|
| Section labels (`THE MISMATCH`) | DM Mono, about 11px, uppercase, wide tracking, **hairline rule beneath** |
| Sub-headings | DM Serif Display, sentence case, about 22px |
| Body | DM Sans, 16px |
| Metrics | DM Serif Display numerals about 48px, small `%`, small arrow |
| Captions | DM Sans, 14px, muted |

Only 8 sizes site-wide, biggest is 41px. The section labels read as document dividers, which makes the whole thing feel like a technical memo rather than a brochure. Appropriate for someone selling systems thinking.

### Card one-liners: every single one reframes the problem

> "Restructuring the mental model for a multi-tenant cloud console."
> "Reducing friction in the path from free to paid without the hard sell."
> "Zero-config database environments that spin up in milliseconds. No signup required."
> "Making team boundaries legible inside invite flows to reduce workspace confusion."
> "Giving Android developers a live, hierarchical view of their UI at runtime."

None say what he built. All say what changed. Each is one sentence, several adding a short second clause that names the constraint.

### Other structures worth noting

- **Filter chips by theme, not company**: `ALL / INFRASTRUCTURE / DX / GROWTH / AI & AGENTS`. Lets a recruiter self-serve for the thing they are hiring for.
- **A `NOW` section on the homepage**: "Right now I'm thinking about trust: specifically, how much of it AI tools have actually earned versus assumed." Signals a maintained site and a live point of view.
- **`/thinking`** split into `NOTES` (self-published) and `PUBLISHED ELSEWHERE` (4 pieces on the Ona blog, neon.tech, Medium), with honest `Author` versus `Co-Author` credits.
- **`CONVICTIONS`** on the About page: three named beliefs, each argued. "Systems over Simplicity", "Design is a leadership problem", "Ship fast, learn fast".
- Homepage shows **5** case studies, numbered `01` to `05`, with `VIEW ALL` going to the full 14.

---

## 2. Tammy Taabassum, taamannae.dev (Figma)

### The single best structural idea on this site

**Recent, senior work does not get a case study. It gets an outbound link to proof.**

Her 14 work cards split cleanly.

| Work | Links to |
|------|----------|
| Figma prompt to edit (2025) | Figma release notes |
| Figma Make × Supabase (2025) | A YouTube demo |
| Figma Make edit tool (2025) | Figma help centre article |
| First Draft relaunch (2024) | The Figma blog |
| Notifications (2024) | **A tweet from a colleague announcing it** |
| ChromeOS PWA (2024) | chromeos.dev, Google I/O keynote post |
| Octoshop (2022) | theygotacquired.com |
| Account settings, Meta (2022) | `facebook.com/settings`, the live product |
| Museum AR/VR, NFT gallery, Menti, BSc, Blueprint, MI (2020 to 2022) | Internal case study pages |

The read is unmistakable: *for anything recent, the world already vouches for me; here is the receipt.* Internal narrative case studies are reserved for older, smaller, side and student work where she owns the whole story and there is no external proof to point at. This inverts the usual portfolio instinct, that the biggest recent work gets the biggest case study, and it reads as far more confident.

### Card anatomy

```
[ animated GIF thumbnail, 12px radius, 65% aspect, on #E2E2DE ]
Title (24px/700)   [ SHIPPED ↗ ]  ← pill: 28px tall, 100px radius,
                                    1.5px border, 13px/700 uppercase,
                                    backdrop-filter: blur(10px)
One paragraph: what it was, what I did, who I worked with (16px/500, muted)
Figma · 2025                        ← meta line, 16px/600
```

Three details worth stealing:

- **The status pill carries the credibility, not the copy.** `SHIPPED` and `ACQUIRED` as a typed enum, with a tiny arrow at 30% opacity signalling "this goes somewhere real."
- **Thumbnails are animated GIFs of the actual product**, not static screenshots and not abstract art. `promptEdit.gif` shows the real prompt-to-edit interaction running.
- **The description names the collaboration**: "partnering with UX writing for technical copy and engineers to sort out edge cases, error states and bugs." That single clause proves she worked in a real team on real edge cases better than a paragraph claiming it would.

### Visual system

| Token | Value |
|-------|-------|
| Page background | `#F1F1EE` (warm off-white) |
| Text | `#212529`, muted `#898989` |
| Card surface | `#E2E2DE` |
| Body font | Manrope |
| Display font | neulis-cursive (a rounded geometric, only used for the H1) |
| **Total font sizes on the homepage** | **6**: 64, 24, 20, 18, 16, 13 |
| Grid | `repeat(3, 1fr)`, 32px gap, 2 col at 1048px, 1 col at 730px |
| Card hover | `transform: scale(1.05)`, `0.4s`. That is the entire interaction vocabulary. |

Note the restraint: **one** hover effect on the whole site, and it is the most obvious one possible. The energy budget goes into the thumbnails.

### The hero

Fixed line "Hello, I'm Tammy" in the display face at 64px, then a **rotating second line** cycling personality statements ("I value empathy & vulnerability", "I could eat my weight in Korean short ribs") entering with a blur-to-sharp transition. It is the only place the site is playful, and it is doing real work: in three seconds you know she is a person, not a deck.

Right column: photo, "Nice to meet cha'", a five-line bio, two social icons, separated by a vertical hairline. Below: `Currently / Gen AI @ Figma` and `Previously at / Meta, Xbox & Instok` as a two-up label and value pair.

### The case study template (`/projects/rom`)

Order of sections. Note what comes first.

1. Full-bleed hero image
2. Title plus a one-line subtitle
3. Context paragraph, **including an honest disclaimer**: "This project is not affiliated with the Royal Ontario Museum; it's just for practice."
4. Metadata block: **Problem / Outcome** (left, two columns) and **Role / Timeline** (right rail)
5. **"Final designs and solutions", the outcome, before any process**
6. User research findings: three big stat callouts (97%, 79%, 66%), each with a *verbatim participant quote* underneath
7. Low-fi sketches
8. **Usability testing, as three explicit Before/After pairs**
9. Brand identity, then logo system, then design system
10. Final VR experience

Two things to take.

- **Solutions before process.** A hiring manager who bounces after 40% of the page has still seen the work.
- **The Before/After pairs are microscopic and therefore believable.** "The 'view' button was unclear, some testers thought it was a view count → changed copy to 'View Collection.'" Nobody fabricates a detail that small. Three of those beat one grand redesign claim.

The feature-showcase sections flip to a **near-black full-bleed band** (`#252525`) inside the otherwise warm-light page. The reading environment stays light, the demo environment goes dark so screens pop. Cheap, effective device.

### The About page: two reusable inventions

- **"My super powers"**: four *named* capabilities, each with a paragraph of argument. Structure in ambiguity / Storytelling / Design speed / Design 🤝 development. A skills section that cannot be faked into a bar chart, and it gives an interviewer a phrase to quote back at you.
- **"Featured in"**: a dated list of 8 external mentions (Coursera article, Figma talk, a podcast, the acquisition write-up). Pure third-party credibility, zero self-assertion.

Plus: name pronunciation `/tah · maan · nuh/`, and the split into **"Day job"** and **"Out of office"**.

### The `/fun` page

Tabbed: Travel / Design / Art / Food. Travel is a paragraph plus a wall of 23 flag emoji. It costs nothing to build and it makes her three-dimensional. The footer rotates a joke every page: "Made without ☕️ because I hate coffee", "Remade with `</>` far too many times to count", "Assembled with the grace of a cat knocking over everything 🐾💥".

---

## 3. Leo Mancini, the 73-slide deck (ex-Anthropic)

The most extreme text-economy data point of the nine, and the most quietly brilliant.

### 73 slides. Roughly 3,500 characters of text. About 48 characters per slide.

There is no "problem." No "process." No "role." No metrics. No team. No timeline. Just, seventy times over:

> *One product screenshot at full fidelity, with one sentence above it describing what a person can now do.*

A sample of the captions, verbatim:

> Check your balance and review recent transactions.
> Understand your recent spending trends by filtering and sorting.
> Transfer money and set up direct deposit.
> Save for a goal and track your progress.
> Control card settings or order a replacement.
> Get reimbursed for expenses as a working caregiver.
> Find and compare training programs eligible for tuition assistance.
> Discover relevant jobs based on your searches.
> Answer questions about your business so that Square can process payments for you.
> When selling CBD on Square, we need to verify some information.

Every caption is written **from the user's side, in the user's language, as a capability**, never "I designed the transactions list." The cumulative effect over 70 slides is a designer who thinks exclusively in jobs-to-be-done. He never says that about himself. He does not have to.

Note "When selling CBD on Square, we need to verify some information." He kept the weird, specific, regulatory edge case in the deck. Real product work is full of those, and including one proves you did the real work.

### The chapter divider is the best single device in the nine

Slide 2 is a four-line manifesto:

> **I love making art with AI**
> I love building products with AI
> I love designing user interfaces
> I love shipping software (professionally for 13 years)

The **active line is white; the other three are dimmed to about 40%.** This exact slide recurs four times through the deck, each time with a different line lit. It is simultaneously the thesis, the table of contents, the progress indicator, and the section break: one asset, four jobs, zero chrome. In a 73-slide deck with no other navigation, you always know where you are.

The only credential in the entire manifesto is "(professionally for 13 years)", in parentheses, at the end of the last line.

### The title slide

Black. A single row of **eight app icons**: Anthropic, Facebook, Code for America, Indeed, Square, Cash App, Peach. Not company wordmarks, the actual *product icons*, the things users tap. Below: "Leo Mancini" in bold, "Selected work" in grey. Nothing else.

### Slide craft

- Black background throughout, so every screenshot reads as a lit window.
- Caption: small, centred, top of slide, sentence case, ends with a period.
- **Screenshots bleed off the bottom edge.** Cropped by the slide frame rather than floating inside it. This is what makes them feel like real windows instead of images pasted on a canvas.
- Layouts recycle three arrangements: 1-up centred, 3-up phones, 1-up browser chrome. That is the whole system.
- Real data everywhere: `$256.12`, `SPDR S&P 500 · Jan 28 2024 3:30 PM · $1.16`, real job titles at real Austin employers. Nothing is Lorem.
- Older work is shown on **period-correct devices**. The 2019 Indeed work sits in an iPhone SE with a home button. He is not pretending it is new.
- Closing slide: "Thank you!" plus a button, `Email me at mancini@leo.gd`.

### Why a Google Slides deck at all

It loads instantly, works on any device, needs no maintenance, can be sent as a link or presented live in an interview, and, crucially, **the medium sets expectations correctly**: nobody opens a deck expecting a 3,000-word essay. Choosing Slides is itself a decision to be concise.

---

## 4. Jakub Zegzulka, zegzulka.com (OpenAI)

Ex-Meta Reality Labs (Orion AR glasses, Ray-Ban Meta), ex-Apple Special Projects Group, then OpenAI.

### The homepage has no words

Nav is `Jakub Zeg | Work Play | Info Résumé`, at 12px. Below it, a vertical stack of full-viewport panels, each one either a client logo on a near-white field or a full-bleed product photograph. No titles. No descriptions. No years. Six are links to project pages: `/p/apple`, `/p/meta`, `/p/undout`, `/p/avast`, `/p/loveandescape`, `/p/wondr`.

You are meant to recognise the logos and click. It is Leo Mancini's icon row expanded into a whole homepage.

### The project page: four-corner metadata

```
Meta, Orion                                              Internship
Art Direction, UX, Prototyping                                 2023
```

Bottom-left and bottom-right, 12px, on an otherwise empty white screen. Then the thesis, set larger:

> **Designing OS for Orion, the first AR Glasses by Meta.**

Then four short paragraphs of role description, then the media.

Two things stand out. First, `Internship` is stated plainly in the metadata rather than buried. Second, the role paragraphs describe **organisational** outcomes, not visual ones:

> "My project captured the attention of the design director, resulting in addition of more ICs (content, sound, 3D, prototyping) to support the design while I maintained focus on art direction, process, UI and UX."

> "I secured leadership approval and received positive feedback up to the VP level."

For an intern with no shippable metrics and an NDA over the product, "my work caused the company to staff up around it" is the strongest available proof of impact. That is transferable to any project where you cannot show numbers: **describe what the organisation did in response to the work.**

### The testimonial wall

The bottom of the case study is five quotes, each with a full name and job title.

> "It is amazing that, in addition to your great work, you managed to get the PMs onboard with your work, ramp up additional ICs. Seriously, this is a big time stuff that is well beyond what most interns can do."
> **Michael Ishigaki, Director of Product Design**

> "Excellent work, Jakub!"
> **Joshua To, VP of Product Design**

Plus a 3D designer, his intern manager, and a staff product designer.

No other portfolio in this set uses testimonials. This one leans on them entirely, and it works **because the titles are senior and the names are checkable**. Note also that he kept Joshua To's three-word quote. A short, slightly perfunctory line from a VP reads as more real than a polished paragraph, because a fabricated testimonial would never be that brief.

This is the device in the whole document that is most immediately usable by you.

### Measured

| Token | Value |
|-------|-------|
| Background | `#FFFFFF` |
| Text | `#000000` |
| Font | System sans stack, no webfont |
| **Total font sizes** | **2**: 16px for the thesis, 12px for everything else including nav and body |
| Media | 11 videos, 11 images on the homepage |
| Footer | `Contact` and `2077`, a future-dated copyright joke |

A 12px body size is unusual and would be a mistake on most sites. It works here because there is almost no text to read; the type is chrome around imagery, not content.

---

## 5. Daniel Destefanis, danield.design (Anthropic)

The most instructive of the nine about what senior craft signalling looks like.

### The case studies contain almost no words

Full text content of `/case-studies/figma-make`, in its entirety:

> **Figma Make**
> Helping people to turn their ideas into software.

That is it. Beneath it: **nine looping videos and two images.** Their filenames are the actual outline:

```
question-cards.mp4        loading-idea.mp4        updated-multi-upload.mp4
version-history.mp4       empty-state.mp4         prompt-enhance.mp4
html-to-design-clip.mp4   make-video.mp4          standalone.webp / design.webp
```

Read that list again. `empty-state`. `loading-idea`. `version-history`. `multi-upload`. These are the **unglamorous surfaces**, the states that only ship if a designer fought for them. He is not showing you a hero screen; he is showing you the seven places where the product could have felt cheap and does not. To another designer that is a far stronger claim than any paragraph.

`/case-studies/clocks` is similar: title, "A delightful alternative to Standby Mode", one sentence ("Clocks is an app designed, developed and released on the App Store") and a **View in App Store** link. The proof is that you can download it.

**This only works if you have this much shipped, watchable evidence.** It is an aspiration, not a template to copy tomorrow. But the principle, name the interaction and show the interaction, is copyable at any scale.

### Media engineering (directly actionable)

- Looping **MP4, not GIF**: `muted`, `loop`, `autoplay=false`, played and paused by an IntersectionObserver as they scroll into view. Only the visible one runs.
- Filenames encode the export width: `potrait-list-500w.mp4`, rendered at 500×1088. **The video is exported at the size it is displayed at.** No 1080p asset in a 500px slot.
- Two font files total, 62KB each (GT Standard Regular and Medium). Two weights for the entire site.

### The visual system is almost aggressively plain

| Token | Value |
|-------|-------|
| Background | `#FFF` |
| Foreground | `#171717` |
| Font | GT Standard (Grilli Type), **credited in the footer** |
| **Total font sizes on the homepage** | **4**: 24, 20, 17, 16px |
| Border radii | 48px (big surfaces), 24px, 15px, 12px, 9999px (pills) |
| Transitions | 0.1s to 0.25s, `cubic-bezier(0.4, 0, 0.2, 1)`; 0.5s only for opacity fades |

**There is no display type on this site.** The hero "headline" ("Daniel is a product designer, artist, and software builder based in Chicago, Illinois.") is 24px. The page gets its presence from enormous 48px-radius surfaces and from motion, not from a 96px headline. Worth sitting with: he is signalling "I build software interfaces" rather than "I make posters," and the type scale is the signal.

### The hero is itself a portfolio piece

A live animated shader scene, an ocean surface with drifting caustics and sparkle highlights, with a **sun button that opens two range sliders** so you can play with it. Over it sits a frosted-glass card (`backdrop-filter`, `rgba(255,255,255,0.1)` fill) holding the bio, `Currently at Anthropic`, and a **live local clock** (`05:51PM Local`).

The whole hero is a demonstration, not a decoration: "I write shaders, I care about glass and light, and here is a control panel so you can verify it." The three pulsing dots in the card corner (`dotPulse` keyframes) quote the chat typing indicator, a private joke for anyone who builds AI products.

One honest criticism: the pink-on-teal body text over the animated scene is genuinely hard to read. The glass panel is not opaque enough. Beautiful, slightly at the expense of legible.

### Curation against archive

- **Homepage: 7 case studies.** That is it.
- **About page, bottom: "Archive of work", 22 rows**, each just `Project · Company · Month Year`, no images, no descriptions, running from *Code Layers, Figma, June 2026* back to *Agency Work, Palantir.net (not Palantir), April 2014*.

The archive proves twelve years of volume and range in about 40 lines of text, without putting a single weak thumbnail on the homepage. It also lets him list side projects (Design Lint, Variable Finder, Dieter Dots, Vector Fields) that would dilute the curated set but add enormously in aggregate.

### The About page voice

Three sections, each titled with a **complete sentence**, not a noun:

> **I love building things for others.**
> **Design is a team sport.**
> **Keep learning.**

Under "Design is a team sport" he states plainly: "At Discord, I led a team of 10 designers across three pillars. Since then, the pendulum has swung back the other way and I've enjoyed having my hands in the clay again." That sentence handles the "why is a former manager an IC?" question before anyone can ask it, and reframes it as a preference rather than a demotion. Signed off `<3`.

### Navigation

Pill-shaped buttons, 40px tall, 48px radius, 1px `#ECECEC` border. `Work` and `Contact` are **dropdowns**, not pages, so the whole case study list is one click from anywhere without leaving the page you are on. Media tiles open into a blurred modal (`backdrop-filter: blur(100px)`) rather than navigating away.

---

## 6. Jenny Wen, jennywen.ca (Anthropic)

### The changelog portfolio

There are no case studies and no project pages. The entire site is **one reverse-chronological list of 27 dated entries** running from January 2019 to March 2026, on a single scrolling page.

Each entry is exactly three parts:

```
March 2026
Dispatch  [sep]  We also shipped Dispatch for Cowork and Claude Code.
                 A new way to get Claude to do stuff when you're AFK.
[ one image, 547px wide ]
```

A date, a linked title, a separator glyph, one or two sentences, one image. That is the whole template, repeated 27 times without variation.

What makes it interesting is **what she lets into the list**. Shipped product work sits at the same weight as:

- podcast appearances (Lenny's, Dive Club)
- conference talks (Config 2021, 2023, 2024, CanUX)
- a university club talk in Waterloo
- a hiring panel for Figma's Early Career Week
- a Figma plugin she wrote in 2019 ("Really proud of myself for remembering how to do recursion, without looking it up")
- a joke widget ("Word magnets: turn any text into a set of fridge magnets")
- joining First Round's angel investing cohort

The effect is a career rendered as a continuous stream of output rather than a set of trophies. It reads as someone who has simply been making things for seven years, which is harder to fake than three polished case studies.

### The leadership signal: she credits people by name, constantly

Eleven of the 27 entries name collaborators explicitly.

> "I had the honor of supporting Keeyen Yeo, Khalil Cader, and Jakub Swiadek through the year in which they launched Figma's third product."

> "I'm very proud to have supported the team that made this happen: Natasha Tenggoro, Rocky Chen, Aosheng Ran, Matt Chan, and many other cross-functional folks."

> "In collab with Katie Szeto, Marcel Weekes, and Sho Kuwamato"

> "Such a fun one to jam with Andrew Schmidt on."

> "I worked closely with Rasmus Andersson on the first version of our Community"

At director and head-of-design level this is the work. She cannot claim the pixels, so she claims the enablement, and naming real people makes it verifiable. Anyone can check whether Keeyen Yeo exists and what he shipped.

This connects directly to Carl attributing part of his own metric to the Automations team. **Generous credit is a seniority signal, not a dilution of your claim.**

### She states scope honestly, including when it shrinks

> "I designed the core experience for FigJam's launch: its shapes, sticky notes, text, and all of their core interactions. I also designed cursor chat, emotes, and reactions."

Specific nouns. Not "led design for FigJam." And on her first Anthropic project:

> "As my first project at Anthropic, I led a visual redesign of Claude.ai: refreshing the look and feel, **unshipping stuff**, tightening a lot of small details, and making the product feel more coherent as it kept growing."

"Unshipping stuff" is a wonderful phrase to have in a portfolio. It is the whole job stated in two words, and nobody writes it unless they have done it.

### Visual system

| Token | Value |
|-------|-------|
| Background | Pure `#000000` |
| Text | `#FFFFFF`, dates in `#6B7280` |
| Body font | Neue Haas Grotesk Text |
| Display font | Swear Text Cilati, bold italic, used **once**, for the name |
| **Total font sizes on the site** | **2**: 96px for the name, 18px for everything else |
| Text measure | about 467px |
| Image width | 547px, slightly wider than the text column |
| Media | 35 images, **0 videos** |
| Nav | Right-aligned, sticky: Work, Notes, then five social links |

**Two font sizes.** The most extreme type discipline in the set. The 96px italic logotype is the only piece of visual personality on the page, and because it is the only one it lands hard.

The images are also **small**, roughly a third of the viewport width, left-aligned with a large empty black field to the right. She is not selling the screenshots. The layout assumes you already know what FigJam and Cowork are, and if you do not, the link will tell you.

---

## 7. Joel Lewenstein, joellewenstein.com (Anthropic)

The entire site, verbatim and complete:

```
Joel Lewenstein
I lead the design team at Anthropic

AI
  What's worth making? (2026)
  Fast company podcast (2026)
  Canva podcast (2026)
  Config talk (2025)
  Dive Club podcast (2024)
  Academy UX podcast (2024)

Older
  Software as LEGO (2021)
  Political Tech (2018)

Personal
  I wrote a kids book
```

Thirteen lines. Nine outbound links. Every one goes somewhere else: LinkedIn, YouTube, dive.club, Medium, Gumroad.

### Measured

| Token | Value |
|-------|-------|
| Background | `#081014`, a near-black with a blue cast |
| Text | `#FFFFFF` |
| Font | IBM Plex Mono at 13px for all content; Inter for the wrapper |
| Font sizes | 3: 18, 16, 13 |
| Weights | 2: 400 and 600 |
| **Total HTML** | **5,887 bytes** |
| Images, video, canvas, SVG | **0** |
| Built with | Webflow |

### What to take from it

Not the format. The **grouping and the dating**.

Three headers do all the information architecture: `AI` (what I am about now), `Older` (what I used to be about), `Personal` (that I am a person). Every item carries a year. A reader sees in four seconds that he has been thinking publicly about AI for two years straight, that he came from political tech and software tooling before that, and that he writes children's books.

That is a positioning statement built entirely out of a sorted link list. No adjectives. No "passionate about." The grouping is the argument.

If you strip your own site to a text file, what are your three group headers, and can a stranger tell what you are about from them alone? A useful exercise even if you never ship the text file.

---

## 8. Ian Silber, iansilber.com (OpenAI)

### The whole site is a toy

Black page. One sentence set on a circle, rotating slowly:

> "Ian Silber currently leads design at OpenAI. Previously, he was at Global Illumination, Artifact, Instagram, and more."

That is all the text. No nav, no work, no case studies, no résumé link.

Behind it:

- A **full-viewport reactive shader canvas** at 2048×1536. Drag across it and the background snaps from black to electric blue; the circle of text responds to pointer movement.
- A **hidden 15-second air hockey game**. The DOM carries a timer, a live score, a `+1` score burst, an end card reading `N goals / in 15 seconds`, a three-initial signature form, and a `play again` button.
- A **live, server-backed leaderboard** at `/api/leaderboard`, returning real entries with initials, scores and timestamps.

All of it ships as **one inline `<script>` of 173,956 characters**. No framework, no bundler artifacts, no dependencies. 179KB total document, one stylesheet.

### Why this is more than a gag

Read what it communicates to someone hiring or being hired by him:

1. He writes shaders.
2. He builds and ships game physics, an end-card flow, a form, and a persistence layer.
3. He did it as one hand-written file rather than pulling in three libraries.
4. He is confident enough to put zero work on the site of the person who leads ChatGPT design.

It is Daniel's shader hero taken to its endpoint: the site is not *about* the work, the site *is* the work.

### An honest detail

The leaderboard's top entries read `9,996,016,153` goals in 15 seconds. The score is client-submitted and unvalidated, so people have posted whatever number they liked. Two things follow: any value a browser hands your server is a suggestion, and this is clearly a weekend project he has not gone back to, which is fine and slightly reassuring.

### Measured

| Token | Value |
|-------|-------|
| Background | `#000000`, shifting to blue on interaction |
| Text | `#FFFFFF` |
| Font | Helvetica Neue, system stack, no webfont |
| Document | 179,393 bytes, one inline script of 173,956 |
| Dependencies | None |
| Accessibility | `aria-hidden` on the canvas, `aria-live="polite"` on the HUD, `role="dialog"` and `aria-modal` on the end card, `aria-label` on every initial input |

That last row matters. A throwaway toy, and the ARIA is done properly. The circle text, which is unreadable as DOM order, carries a correct `aria-label` with the sentence in reading order. Craft shows up in the parts nobody looks at.

---

## 9. Vince Lin, vincelin.co

**Caveat first.** He is listed on portfolio aggregators under Anthropic, but his actual title is **Claude Builder**, a student and campus programme, alongside Figma Campus Leader while studying CS and Art at Vanderbilt. He is not a product designer at Anthropic, and this document should not imply he is. His other roles are internships at Capital One, Cambridge Associates and Cambiar Education, plus founding designer at a startup called Pointer.

Included for one idea worth having.

### The hero is a thing he actually built

A full-viewport 3D scene of floating blocks under a flat blue sky, captioned:

> **yes, this is 100% built in Minecraft**

There is no `<canvas>` on the page and no three.js. It is not a WebGL simulation of Minecraft. He built a world in Minecraft, captured it, and shipped the capture.

That is a better move than a WebGL hero would have been. A shader says "I can code." A Minecraft build says "I make things for the pleasure of making them, and I will show you the weird one." Memorable in a way a technically harder but more generic hero would not be.

The self-description underneath is set one word per line, stacked: *A designer with an engineering background who loves to prototype, worldbuild, and play.* "Worldbuild" is doing real work there; it retroactively explains the hero.

### Measured

`bg #111111` · system sans · sizes 234px (the stacked hero word column), 25, 16, 12, 10 · no canvas, no three.js · five project pages · **a cal.com 30-minute booking link in the footer** next to the email address.

That booking link is the other thing to note. Every other portfolio here ends at `mailto:`. A one-click "book 30 minutes" removes a step, and it is trivial to add.

---

## 10. Cross-cutting patterns

### 10.1 Type scale discipline

| Site | Total font sizes | Largest | Fonts |
|------|------------------|---------|-------|
| **jennywen.ca** | **2** | 96px | 2 (one used once) |
| **zegzulka.com** | **2** | 16px | 1 (system) |
| Leo's deck | about 3 | about 40px | 1 |
| joellewenstein.com | 3 | 18px | 2 |
| **danield.design** | **4** | **24px** | **1** (2 weights) |
| vincelin.co | 5 | 234px | 1 |
| taamannae.dev | 6 | 64px | 2 |
| carlthomasiv.com | 8 | 41px | 3 (one superfamily: DM Serif, Sans, Mono) |

Nobody uses more than eight. The median is four. Three of them cap out at 24px or below. If your pages have more sizes than this, it is the cheapest available upgrade.

### 10.2 Motion budget

| Site | Interaction vocabulary |
|------|------------------------|
| taamannae.dev | `scale(1.05)` on card hover, `0.4s`. One effect, site-wide. |
| danield.design | `0.1s` to `0.25s` `cubic-bezier(.4,0,.2,1)` on hover and press; `0.5s` opacity fades; scroll-triggered video play/pause; one blur modal |
| carlthomasiv.com | Fade and translate reveals on scroll |
| jennywen.ca | None beyond a scroll-to-top button |
| joellewenstein.com | None |
| zegzulka.com | None beyond autoplaying panel video |
| iansilber.com | A shader and a game, which are the content |
| Leo's deck | None (it is slides) |

**Nobody has a scroll-jacked hero, a parallax section, a cursor follower, a page-transition curtain, or a magnetic button.** Not one of the nine. Where motion appears it is either functional (a video starting when it is on screen, a modal opening) or a demonstration of craft that *is* the content. The correlation between seniority and restraint is not subtle.

### 10.3 Where personality lives

All nine are formally reserved and then place personality in one or two designated slots.

- Tammy: rotating hero line, the `/fun` page, a rotating joke in the footer, name pronunciation.
- Daniel: the playable shader hero, `Made in Chicago`, the font credit, signing off `<3`.
- Leo: "I love…" four times, and a black deck with no hedging.
- Carl: `NOW`, plus "hiking, cooking, woodworking… with my wife and two dogs."
- Jenny: one 96px bold-italic logotype, and letting fridge-magnet widgets sit next to Cowork.
- Joel: "I wrote a kids book" as its own section header.
- Ian: the entire site.
- Jakub: a footer copyright reading `2077`.
- Vince: Minecraft.

The pattern is **contained whimsy**: never distributed across the whole site, always in a named container.

### 10.4 Proof architecture

| Mechanism | Who uses it |
|-----------|-------------|
| Outbound link to release notes, changelog or blog | Tammy, Carl, Jenny, Joel |
| Link to the live product or App Store | Tammy (facebook.com/settings), Daniel (App Store) |
| Third-party press or acquisition coverage | Tammy |
| A colleague's public post about the launch | Tammy |
| `SHIPPED` and `ACQUIRED` status pills | Tammy |
| "Shipped May 2026" in the byline | Carl |
| Speaking and writing credits list | Tammy ("Featured in"), Carl ("Published elsewhere"), Joel (the whole site), Jenny (interleaved) |
| Methodology footnote under every metric | Carl |
| Named testimonials with job titles | Jakub |
| Named collaborators inside the copy | Jenny (11 of 27 entries), Tammy, Carl |
| Organisational response as the outcome | Jakub |
| Real data in every screenshot | All nine |

### 10.5 The curated against archive split

Daniel: 7 curated, then a 22-row archive. Carl: 5 on home, 14 on `/work`. Tammy: 14 cards, newest first. Jenny: no curation at all, 27 entries in one stream. Jakub: 6 project pages, no hierarchy.

None of them show everything at equal weight except Jenny, and hers works because the entries are one sentence each. All of them show *that* they have more.

### 10.6 Sentence-as-heading

Daniel, Carl and Tammy all use complete sentences where a portfolio would normally use a noun.

- "I love building things for others." / "Design is a team sport." / "Keep learning." (Daniel)
- "Sessions became the product model" / "Code stayed visible because trust takes time" (Carl)
- "Final designs and solutions" (Tammy)

A noun heading ("Approach", "Process", "Impact") tells the reader what bucket they are in. A sentence heading tells them what you concluded. The second is always more useful and is never harder to write.

---

## 11. What none of them do

Worth listing, because these are the defaults a portfolio drifts into.

- No double diamond, no "my process" diagram, no generic empathy-map, persona or journey-map filler
- No skills bars, tool logos, or "Figma ██████░ 95%"
- No stock photography, no abstract 3D blobs, no gradient mesh backgrounds
- No testimonial carousel (Jakub has testimonials, but as a static list, not a slider)
- No "Let's work together!" with an animated arrow
- No metric without a source (Carl footnotes; the rest largely omit metrics rather than invent them)
- No password-protected case studies as the *only* proof of recent work. They route around NDA by linking to what is already public
- No scroll-jacking, parallax, or cursor effects
- No case study longer than its evidence justifies

---

## 12. Applying this to your site

You are at stage one of the gradient in §0.2: your work mostly is not publicly verifiable yet, so narrative has to carry it. Carl is your closest model. Your existing strategy work already picked stakes-based positioning and a Khiladipro / Getmega / SEDP flagship ranking, so most of this slots into that rather than replacing it.

### Tier 1: highest leverage, lowest effort

1. **Outcomes at the top, with a methodology footnote.** You already ruled out fabricated metrics. Where you have a real number, put it above the fold *and* footnote the window and cohort. Where you do not, say what you know: "Shipped to production, September 2024" beats a vague improvement claim. The footnote is what converts a number from marketing into evidence.

2. **A proof link on every card.** kpro.fit's registration page is live and matches the design, so that is a `LIVE ↗` pill on the Khiladipro card doing the same job as Tammy's `facebook.com/settings` link. Audit each of the five projects for one publicly verifiable artifact: a live URL, an app store listing, a press mention, a Wayback capture. You already have Wayback evidence for SEDP.

3. **Collect named testimonials.** The single highest-value item on this list. Two or three quotes with full names and real job titles, from people who saw you work on Khiladipro, GetMega or SEDP. A founder, a PM, an engineering lead. Put them at the bottom of the relevant case study, not on the homepage. Keep them short and do not edit them into marketing copy. A four-word quote from a CEO beats a polished paragraph from nobody in particular.

4. **Credit your collaborators by name.** Jenny Wen does it eleven times in 27 entries. You have a documented open question about the Khiladipro case study having no collaboration story. Naming the engineers, the PM and the founder, and saying what each did, *is* the collaboration story, and it costs you nothing you were otherwise claiming.

5. **Every card one-liner as a reframe, not a description.** Pass each of the five through the Carl test: does the sentence say what *changed for a user*, not what you made?

6. **Add a booking link.** One line, next to your email.

### Tier 2: medium effort

7. **A "what I cut and why" section on the flagship.** The strongest credibility move available and it costs nothing but honesty. Same for one reversed decision and one open question. Your notes already record that the Khiladipro study has no iteration story; "what we cut" may be the honest version of that section.

8. **Organisational outcomes where you have no metric.** Zegzulka's "resulting in addition of more ICs to support the design" is the model. Did a design of yours get staffed up, get copied into another surface, change how the team worked, survive a leadership review, or become the default pattern? That is an outcome and needs no dashboard.

9. **Caption every image the Leo way.** One sentence, user's side, sentence case, ends with a period. "Check your balance and review recent transactions." not "Dashboard screen." Your kp filmstrip and shot figures are the place to start, and doing this will reveal which shots have nothing to say and should go.

10. **Name your sections after interactions.** If a case study section cannot be named after the interaction problem it solves (`empty-state`, `version-history`, `prompt-enhance`) then ask whether it earns its place. A good editing filter for the kp chapters.

11. **A dated changelog instead of a bare archive.** Jenny Wen's format beats Daniel's table for your situation: same reverse-chronological spine, but **one sentence per entry** and a wider definition of what counts. Shipped features, yes, but also talks, writing, small tools, experiments. You have the Notion working notes, the Wayback research, the redesign experiments and an unusual AI-native workflow. A dated stream shows continuous output, which is exactly what a senior hire is assessed on and exactly what five polished case studies cannot show. It also solves a real problem: Ecometer and Mega Poker do not deserve flagship treatment but do deserve to exist, and in a dated stream they are two lines that help.

12. **Cut your type scale to six sizes and audit against it.** Your notes already endorse the CH 06 ladder for kp; extend that discipline site-wide. The median across these nine is four.

13. **Named convictions.** Three or four beliefs with an argument each, in the manner of Carl's `CONVICTIONS` or Tammy's "My super powers". This is what gives an interviewer a phrase to repeat about you in a debrief, and it generalises across every role you apply to.

### Tier 3: worth considering

14. **The deck as a second artifact.** A 40 to 70 slide black deck of your shipped screens, one user-capability caption each, sendable as a link and presentable in an interview. Different medium, different expectations, fast to assemble from assets you already have, and it forces the compression a website resists. Given how much shipped UI you have across Khiladipro, Getmega, Mega Poker and SEDP, this may be the highest ratio of impression to effort on the whole list.

15. **One demonstration, not decoration.** Daniel's shader hero and Ian Silber's air hockey game work because they *are* the argument. Your existing note says to build operable demos rather than reaching for the cream-and-serif look, and that instinct matches what the strongest sites here actually do. One real, operable thing beats any amount of scroll animation.

### Explicitly do not copy

- **Carl's visual skin** (dark, DM Serif, mono eyebrows, numbered rails). It is the look you already flagged, and his footer advertises the tool.
- **Daniel's near-zero-text case studies.** That requires a body of public, watchable, shipped work you can point at. Take the naming discipline, not the word count.
- **Tammy's outbound-only strategy for recent work.** Only works when the world has already written about it. You need the narrative to do that job for now.
- **Joel's or Ian's no-portfolio sites.** These are stage-four moves. Made at stage one they read as empty.

---

## Appendix: measured values

**carlthomasiv.com**
dark `#111110` / text `#F0EDE8`; light `--bg #fafafa` / `--text #111318` / `--border #11131814`
DM Serif Display (h1 41px/400, tracking -0.01em) plus DM Sans (16) plus DM Mono (11 uppercase)
8 sizes total: 41/22/16/15/14/12/11/10

**taamannae.dev**
`bg #F1F1EE` · `text #212529` · `muted #898989` · `card #E2E2DE` · `dark band #252525`
Manrope plus neulis-cursive · sizes 64/24/20/18/16/13
grid `repeat(3,1fr)` gap 32, 2col at 1048, 1col at 730 · card radius 12px · hover `scale(1.05) .4s`
status pill: 28px high, radius 100px, 1.5px border, 13px/700 uppercase, `backdrop-filter: blur(10px)`

**Leo Mancini deck**
73 slides · about 3,548 characters total · about 48 chars per slide
Black ground · 3 layouts (1-up, 3-up phones, browser chrome) · captions top-centred, sentence case
Manifesto divider recurs 4 times with one of four lines lit

**zegzulka.com**
`bg #fff` · text `#000` · system sans, no webfont
**2 font sizes: 16px thesis, 12px everything else**
11 videos, 11 images on the homepage · 6 project pages under `/p/`
four-corner metadata block · 5 named testimonials with job titles · footer reads `2077`

**danield.design**
`--background #fff` · `--foreground #171717` · `--font-primary "GT Standard"`
sizes 24/20/17/16 · radii 48/40/34/24/15/12/9999
`cubic-bezier(0.4, 0, 0.2, 1)` at 0.1s to 0.25s · opacity fades 0.5s
video: muted plus loop plus IntersectionObserver play/pause, exported at display width (`-500w.mp4`)
2 font files, 62KB each

**jennywen.ca**
`bg #000` · text `#fff` · dates `#6B7280`
Neue Haas Grotesk Text plus Swear Text Cilati (bold italic, used once)
**2 font sizes: 96px name, 18px everything else**
text measure about 467px · images 547px wide · 35 images, 0 video · 27 dated entries · 11 named collaborator credits

**joellewenstein.com**
`bg #081014` · text `#fff` · IBM Plex Mono 13px, Inter wrapper
3 sizes (18/16/13), 2 weights (400/600)
**5,887 bytes of HTML, 0 images** · 9 outbound links, 3 group headers · Webflow

**iansilber.com**
`bg #000`, shifts to blue on pointer interaction · text `#fff` · Helvetica Neue, no webfont
one inline script of 173,956 chars, 179,393 bytes total, no dependencies
reactive shader canvas 2048×1536 · hidden 15-second air hockey game · live leaderboard at `/api/leaderboard`
ARIA done properly throughout, including a reading-order `aria-label` on the circular text

**vincelin.co**
`bg #111` · system sans · sizes 234/25/16/12/10
Minecraft-built hero captured as media, no canvas and no three.js
5 project pages · cal.com booking link plus mailto in the footer
