# Khiladipro flagship analysis

19 September 2026 · Pre-writing analysis for the flagship case study. No copy, no redesign.

**How to read this.** Every claim is tagged. **FACT** means an artifact, a live page, the repo, or your own stated facts say it. **INFERENCE** means I concluded it and you should confirm it. **MISSING** means no evidence exists in any version and I did not invent it.

**What I studied.** Four versions, not three: the Notion source (June 2026), the field-manual page that is live on priyank.design and identical to `master`, the August wide-canvas page preserved as `projects/khiladipro-original.html`, and the September decision-led rebuild at `projects/khiladipro.html` on this branch. All 26 image files, read individually. The Astra audit and the 14 September strategy doc. The live kpro.fit site, its registration page, the app store listing, and press from May and October 2025. I could not open the Figma file (no access from here) or the Wayback Machine (no snapshot of kpro.fit exists).

---

## 0. The verdict in five sentences

The project proves more than any version currently says, and the proof is in the artifacts rather than the prose: the registration flow you designed is still live on kpro.fit today, screen for screen, and the olympiad format you designed the first edition of became the company's flagship product. No version has noticed either fact. The three page versions each hold something the others lost: the live page has the cleanest facts, the August page has the specific evidence a design manager reads for, the September page has the right skeleton and the only tradeoffs. The thesis should narrow from "trust" in general to the one thing no other portfolio has: an interface that must work when nobody is holding the phone. The biggest remaining gap is not writing; it is that no version shows a single decision that changed because of a person or a test, and that evidence has to be recovered before the page is written.

---

## 1. The four versions, and what each one uniquely holds

| Version | Where | Words | Holds that the others lost |
|---|---|---|---|
| **Notion source** (June 2026) | Notion "Khiladipro" page | ~900 | The original target-group framing (primary: young sportsmen; secondary: adults returning to sport, olympiad as reach into the "non-serious" adjacent base). The sequencing of the engagement: onboarding was the first app task, olympiad screens the second. The IPL page's stated aim (bank on team loyalty to drive drill engagement). Also the fabricated metrics, which you already deleted and which must never return. |
| **Field manual** (live, `master`, July) | priyank.design | ~1,800 | The tightest factual brief: "execution-focused: strategy and success metrics stayed with the client." C-01 to C-05 as plain facts. "Acquisition wedge." The cleanest scorecard. Eight-step onboarding with one sentence each. The unvarnished tone. |
| **Stadium** (August, `khiladipro-original.html`) | branch | ~3,500 | The three-reader lens on the landing page. The fold comparison, desktop 1440 versus mobile 390, with "what the cut cost." The annotated registration screen (Jonty Rhodes named, date of birth as the eligibility gate). The nine-screen onboarding film with in-product labels proving the order. The two scored-test screens ("Drill 1: 20x Squats", "13/20"). The state strategy (before / during / after) plus four edge states, including the commitment sheet with "Est. 24 mins" and "360 khiladis have already completed this." The constraints ledger with "what it forced." The prototype index. |
| **Decision-led** (September, `khiladipro.html`) | branch | ~1,750 | The only two tradeoffs on any version (parent benefit below the mobile fold; guidance versus skip risk). The definition of activation as "first scoreable drill." The line "I shifted the hierarchy from things to tap to things to read while moving." The coverage note on failed uploads. Dropping the AI-rendered hero. The measurement list tied to journey stages. |

**Where the September rebuild lost ground, specifically (FACT, by diff of image inventories and text):**

- Eight of 23 images are demoted to "linked full-size only" or dropped: the Supervision explainer, face capture, body capture, the "Perfect!" verdict, the handoff card, the "Drill 1: 20x Squats" card, and the IPL page. The nine-screen progression that is the strongest interaction evidence is now four tabs.
- The constraints are compressed to one sentence ("an existing app language and a fixed summer launch window"). The team-of-four, the three audiences, and the pay-before-install constraint survive only as fragments.
- The three-reader argument became a three-item list. The fold comparison became one tradeoff sentence.
- "Est. 24 mins," "360 khiladis," the access code via email, and the kit delivery all vanish. These are the details that make the page read as a real product rather than a template.
- The testimonial is excerpted; the full text is on the homepage anyway, so this one is fine.

**Where the August page overreaches (FACT):** "The shipped product" caption on a ChatGPT render. "Most of that traffic arrived on a phone" (unsourced). "Payment UI is trust UI" over a screen with no payment field. "07 chapters" on a six-chapter page. "Every live event state" while the scorecard admits failed-upload states were not designed. Around thirty aphorisms and two-beat headlines that the strategy doc already flagged as reading as generated.

---

## 2. What the project actually proves about you

Reconstructed from artifacts, not from any version's prose.

### 2a. Things the screens themselves prove (FACT)

1. **You decomposed a one-line brief into surfaces and states.** The brief was "design the olympiad." What exists is a landing page (desktop and mobile), a three-step registration, a nine-screen first run, a scored-test loop, and seven event states (unregistered, code error, countdown, home, stage detail, points ledger, remaining tests). That inventory is the ownership proof and it does not need adjectives.
2. **You designed for a body across a room.** Face oval while the phone is held, body outline once it is propped, a one-word verdict at display size, a counter you can read mid-jump, and a "Skip for now" at the bottom of every setup screen. The typography scales as the distance grows. No pattern library covers this; the screens show you worked it out.
3. **You reused one pattern between rehearsal and competition.** The onboarding drills carry "Drill 1 of 3 / 2 of 3 / 3 of 3" labels; the scored test carries "Drill 1 of 3 - 20x Squats" and the same counter treatment. That is a small system inside an inherited language, and it is the closest thing to a design-system argument this project has.
4. **You put proof next to the commitment.** Two testimonials (a named ex-international cricketer, a named academy coach) sit level with the form fields at step one of three. Date of birth is a dropdown that only offers the eligible years. Eligibility is enforced, not explained.
5. **You made three promises on one page.** "For Khiladis" and "For Parents" cards, the age band beside the button, dates as the headline, register / compete / win with kit delivery. On mobile the parent card drops below the fold and the button goes full-width.
6. **You designed the waiting.** A countdown that hands you the rewards catalogue. A commitment sheet that says how long the test takes, what drills are in it, and how many peers finished it before you start.

### 2b. New evidence no version has used (FACT, verified today)

- **The registration flow you designed is live and unchanged.** kpro.fit/registration/khiladi today shows "Step 1 of 3 / Khiladi Registration", the same fields, the Jonty Rhodes and Saurabh Dwivedi quotes beside the form, and a date-of-birth dropdown spanning 2006 to 2016. This is the only production capture available for any project on your site, and it proves the design shipped as designed.
- **The olympiad became the company.** kpro.fit's homepage now reads "World's first sports & fitness olympiad" with "School Registration" and "Individual Registration" cards in the same dark, orange-gradient language. Press from May 2025 (the $1M pre-seed) lists "KPro Olympiad for schools" as a product line; October 2025 press says the company has run more than 20 olympiads. **INFERENCE:** the at-home summer olympiad you designed was the first edition of that product line. **MISSING:** confirmation from Khiladipro, and the dates that would make the sequence provable. Never claim credit for the business outcome; the claim to make is narrower and true: the format you designed the first version of is now the product.

### 2c. What it does not prove (MISSING, in every version)

- That anyone used it and what happened. No session, no test, no support ticket, no qualitative feedback beyond the testimonial.
- That any decision changed because of a person. Four people, daily contact, eight weeks, three fidelity passes, and not one recorded instance of the PM, engineer, or CEO altering a screen, or you altering theirs.
- What shipped in the app versus what you designed. The registration page is verified; the app screens are not.
- The dates. Every version says "2024-25" and "25 May to 15 June" without a year. The IPL follow-up has no month.
- The payment step itself. Steps 2 and 3 of registration exist in the prototype but are not on any page, and the entry fee is never stated.
- Whether the placement contradiction (illustration on the floor, copy says elevated surface) shipped that way. **FACT:** the contradiction is inside the design file, not just the caption, so it is a candidate for an honest "what I would fix" rather than something to hide.
- Whether "360 khiladis have already completed this" was live data or a placeholder.

---

## 3. The strongest and most distinctive decisions, ranked

Ranked by how distinctive the evidence is, then by how well the artifact supports the claim.

| # | Decision | Evidence quality | Why it is distinctive |
|---|---|---|---|
| 1 | **Setup as a rehearsal that escalates by distance:** held phone → propped phone → movement → verdict, with a skip on every step | A: nine screens, in-product labels prove the order, type scale visibly changes | No other portfolio has an interface whose primary constraint is that the user is not holding the device |
| 2 | **Verdict and counter sized for the far side of a room** ("Perfect!", "13/20") | A: two screens, nothing else on them | Same reason; also the one interaction a recruiter will remember |
| 3 | **Proof beside the form, eligibility inside the form** | A+: the design, plus a live production page that matches it | Only production evidence on the site; shows the design survived engineering |
| 4 | **One page, three readers, in a fixed order; what mobile cuts** | B+: desktop and mobile screens, fold comparison; the tradeoff is stated but untested | Shows judgment about sequence and about cost, not just layout |
| 5 | **Commitment sheet: time, effort, and peers before a 24-minute test** | B: one screen, strong details, unknown if data was real | Small, specific, humane; reads as a real designer's instinct |
| 6 | **Waiting states that hand you something to do** | B: countdown with rewards; unregistered state that still sells | Good, but every event app does some version of this |
| 7 | **Camera rationale before the OS dialog, for minors** | B: one screen | Correct, but standard practice; do not lead with it |
| 8 | Peak-end confetti, points banked | C: one screen; citing a heuristic is not a decision | Cut the heuristic name, keep the screen |

---

## 4. Lost, weakened, duplicated, over-polished

**Lost (August → September) and worth restoring**

- The nine-screen film. This is the set piece and it is the evidence for decisions 1 and 2. Restore at full strength.
- The two scored-test screens. They close the loop: the same pattern, when it counts.
- The fold comparison with "what the cut cost." It is the only place any version shows a design choice as a cost.
- The constraints as a ledger with "what it forced." Compress to five rows and drop the chapter cross-references.
- The annotated registration with the named testimonials and the date-of-birth gate.
- The commitment sheet and the "Est. 24 mins" detail.
- The prototype index in one place. You have said this section works; keep it.

**Lost (Notion → everything after) and worth restoring, once verified**

- The engagement sequence: landing first, onboarding as the first app task, event screens second. It gives the story a timeline and makes the eight weeks concrete.
- The secondary target group (adults returning to sport) as the reason the olympiad was an acquisition play, if Khiladipro confirms it.

**Weakened**

- The brief. The live page states it in two sentences with the constraint that strategy and metrics stayed with the client. The September version replaces it with "The technology worked. The experience had to earn trust." Keep the live page's sentence; cut the couplet.
- Ownership. "Sole designer, four surfaces, three platforms, eight weeks, team of four" is on the live page in one line. September buries it in a two-column ownership box.

**Duplicated**

- The rehire is stated five times across the site and three times on the August page (TLDR, stat strip, chapter 05, closing). Once in the summary, once in the outcome.
- The analytics disclaimer appears in the hero meta, the TLDR, and the scorecard. Once, in the outcome.
- The brief restarts five times on the August page (hero, short version, numbers, docket, reframe). One start.

**Over-polished**

- Aphorisms and two-beat headlines on the August page ("This wasn't a funnel. It was a relay." "Payment UI is trust UI." "The score is the interface." "Trust is a screen, not a feature."). Keep at most two; let the screens carry the rest.
- Skill tags under decision headings on the September page ("Product framing · Information architecture"). A design manager infers skills from the decision; the tag reads as a template.
- The three-column journey (Choose & pay / Set up & try / Compete & return). Decorative, as the strategy doc said.
- "An honest scorecard" and "No numbers I can't stand behind." The honesty is a discipline, not a chapter title. The 2026 fabricated-metrics episode is private history and must stay private; the page should simply state the limit once and move on.

**Contradicted by the artifact (FACT, unchanged since the audit)**

- Landing page: "Lorem ipsum" under "Win Big!" and the Adobe Stock watermark on the cricketer.
- Placement: illustration on the floor, copy says elevated. In the design file itself.
- "The shipped product" on the ChatGPT render. The render must not be captioned as shipped anywhere.
- "Payment field" claims over a basic-details form.
- "Most traffic arrived on a phone," "India's first" (kpro.fit now says "world's first," which suggests the client's own claim; attribute it to them or drop it).

---

## 5. Thesis and episodes

### The thesis I recommend

> A paid competition refereed by a phone camera, designed so a parent would pay for it before installing anything, a 13-year-old could set it up alone, and the verdict felt fair from across the room.

Three trust handoffs, one physical. The physical one is the signature. This is narrower than the strategy doc's site-wide "stakes" thesis and consistent with it: this project is the stakes thesis's clearest instance, because the thing being trusted is a machine's judgment of a child.

**Two theses I considered and would not use.** "End-to-end ownership under a hard deadline" (the strategy doc's role for this project) is true but it is what every freelancer's flagship claims, and the ownership facts fit in one line of the summary block. "The trust relay" (August) is the right idea at the wrong altitude; five abstract stages hide the two concrete ones that matter.

### The episodes that carry it

**Episode 1: The far side of the room.** The first run as a rehearsal that escalates by distance, ending in a verdict you can read mid-movement, then the same pattern reused when the test counts. Carries: interaction design, systems discipline inside an inherited language, and the unusual-problem argument. Evidence: nine screens plus two. Gap to close: one observed setup, or one review that changed a step, or the honest note that the placement instruction contradicts its own illustration and what you would do about it.

**Episode 2: One page, three readers, and the card.** The landing page as a fixed order of promises, what mobile cuts and what that costs, and proof carried into the form where the parent commits. Carries: product framing, IA, conversion judgment, and now production proof. Evidence: desktop, mobile, fold comparison, annotated registration, live capture. Gap to close: the lo-fi to shipped structural change, and the payment step.

**Episode 3 (short): Designing the waiting.** The commitment sheet, the countdown that hands you the rewards, the code error beside its field, the points ledger. Carries: state design, coverage. This should be half the length of the other two, or an evidence gallery with one insight rather than a full chapter. The candidate insight is the commitment sheet: before a child starts a 24-minute test, show the time, the drills, and how many peers finished.

Each episode should follow the structure the audit proposed and the strategy doc endorsed: what I knew → what I considered → what I chose and gave up → who pushed back → what the artifact shows. Today no episode can fill the "who pushed back" slot, and the "considered" slot is empty except for the lo-fi and mid-fi links. Those two slots are the recovery job in section 8.

---

## 6. Keep, cut, compress, restore, emphasise

**Keep**
- The September skeleton: summary → decisions → outcome with limits → closing.
- The two September tradeoffs and the "first scoreable drill" definition of activation.
- The live page's brief sentence and its constraint list, as facts.
- The nine-screen film and the prototype index (your stated favourites, and they earn it).
- The full testimonial, once, near the outcome.

**Cut**
- The AI-rendered hero from everywhere on this page. Replace with real screens; the film's first frame or the registration page can be the hero.
- The journey triptych, the skill tags, "Fin.", "P.S. type hire," the sound hint, the stat strip (the numbers belong in the summary line).
- The relay map, the "three things this taught me" list, and the closing pitch paragraph.
- All but two aphorisms.
- "Peak-end rule" by name.

**Compress**
- Brief plus constraints to one screen: two sentences and five rows.
- The rehire to two mentions.
- Analytics limit to one sentence in the outcome.
- Episode 3 to half length.

**Restore**
- Fold comparison with cost. Annotated registration. Scored-test pair. Commitment sheet. Constraints ledger. Engagement sequence from Notion, if confirmed.

**Emphasise**
- The live registration page as production proof, placed in Episode 2 and mentioned in the summary.
- What the olympiad became, attributed to public sources and stated narrowly, in the outcome.
- The physical constraint, in the first thirty seconds of the page: the summary block should say "across the room" before it says "eight weeks."

---

## 7. Structure, for a skim and for a deep read

```
Summary block (60 seconds, above the first image)
  ├─ Thesis line
  ├─ Role facts, one line: sole designer · web, Android, iOS · ~8 weeks · team of four · rehired
  ├─ What shipped, one line, with "registration still live" and its link
  └─ Outcome with its limit, one line

Brief and box (one screen)
  ├─ Two sentences: the ask as it came in; strategy and metrics stayed with the client
  └─ Five constraints, each with what it forced (no chapter cross-refs)

Episode 1 · The far side of the room                       (the set piece)
  ├─ Decision headline
  ├─ Nine-screen film, one sentence per screen
  ├─ Coda: the same pattern when it counts ("Drill 1: 20x Squats" → "13/20")
  ├─ Tradeoff: guidance versus skip
  └─ [to recover] one change or one observation; the placement fix

Episode 2 · One page, three readers, and the card
  ├─ Decision headline
  ├─ Three readers on the shipped page (lens), then desktop vs mobile fold with the cost
  ├─ Registration annotated; production capture beside it, dated
  ├─ Tradeoff: parent line below the mobile fold
  └─ [to recover] lo-fi → shipped structural change; the payment step

Episode 3 · Designing the waiting                          (half length)
  ├─ One insight: the commitment sheet
  └─ State gallery: unregistered, error, countdown, home, ledger, remaining

Shipped versus designed                                    (new, needs evidence)
  ├─ What engineering kept, changed, cut
  └─ The IPL page as a small proof artifact of the rehire

Outcome, with its limit stated once
  ├─ Rehire; what the olympiad became (attributed)
  ├─ No analytics access; what I would measure (three lines)
  └─ What I would test, labelled prospective; what I would fix (placement, gender field, failed upload)

Everything clickable                                        (prototype index)
Testimonial, full
Next case study
```

**Skim path** (recruiter, two minutes): summary block, three decision headlines, one figure per episode, outcome line. Every decision headline must state the decision, not a theme. **Deep path** (design manager, eight minutes): the film, the fold comparison, the annotated registration, the tradeoffs, the shipped-versus-designed inventory. Expanders can hide process, never evidence: the registration artifact was hidden behind "Behind the decision" in September and that is the wrong way round.

---

## 8. Evidence, memories, and assets to recover before writing

In priority order. The first three change what the page can claim; the rest change how well it reads.

1. **The change record.** Open the Figma file and find one structural difference between the lo-fi, mid-fi, and shipped landing page, and one between an early and final onboarding step. Check version history and comments for who asked for what. This is the only source for "what I considered" and "who pushed back."
2. **One message to Aakash Verma (and, if you have the relationship, Utkarsh Yadav) with five questions:** Which year was the 25 May to 15 June window? What did you or engineering change from my designs? Was the placement instruction shipped with the floor illustration? Was "360 khiladis have completed this" live data? Can I say the 2024/25 at-home olympiad was the first edition of the KPro Olympiad? Ask permission to say so.
3. **Production captures, dated.** kpro.fit/registration/khiladi today (I confirmed it is live and matches; capture it at 1440 and 390). The app store listing screenshots, if any show onboarding or olympiad screens. The kpro.fit homepage as the descendant of the landing page. There is no Wayback snapshot, so the 2024/25 landing page is unrecoverable from the web; if you have a browser screenshot, a client email, or an ad creative from the campaign, that is the only source.
4. **Dates for both engagements.** Start and end months for the olympiad work and for the IPL page. Your email or invoices will have them.
5. **The payment step.** Steps 2 and 3 of registration from the prototype, and the entry fee, so Episode 2 can show the commitment it talks about.
6. **The Notion target-group framing.** Confirm the secondary audience and the acquisition rationale were the client's words, so they can be attributed.
7. **The landing-page export.** Either a clean export from Figma, or agree to label the current one as a design-stage artifact. The lorem-ipsum card and the watermark cannot appear under a "shipped" claim.
8. **Your own memory of one disagreement.** Eight weeks, four people, daily contact. One example of a screen you argued for, or one you gave up, is worth more than any paragraph on the page. Write it down before it fades, even if it cannot be sourced.
9. **Public sources for the outcome.** YourStory (October 2025) and Entrepreneur India (May 2025) for "more than 20 olympiads" and "KPro Olympiad for schools," to attribute the narrow claim in the outcome.

---

## 9. The three highest-leverage next actions

1. **Recover the decision evidence: Figma change record plus one message to Khiladipro with the five questions above.** Half a day of yours. Nothing else can fill the two empty slots (what I considered, who pushed back) that separate a rationale page from a decision page.
2. **Capture production proof and settle the dates.** Screenshot the live registration page at two widths with today's date, pull the app store screenshots, pin the year of the event window and the months of both engagements. Two hours. This turns Episode 2 from "the design rationale" into "the design that shipped."
3. **Write the episode outline, not the copy: one page per episode with the decision headline, the figure list in order, the tradeoff, and the recovered evidence slot.** Then build the merged page on the September skeleton with the August set pieces restored and the corrections list applied. Do not touch layout until the outline holds without a single aphorism.
