# SEDP flagship analysis

19 September 2026 · Pre-writing analysis for the flagship case study. No copy, no redesign.

**How to read this.** Every claim is tagged. **FACT** means an artifact, a live or archived page, the repo, your Notion notes, or your own stated facts say it. One user-stated fact governs the whole document: **everything you designed for SEDP was developed and shipped** (your words, 19 Sep 2026). I have not tried to verify that against the live product and do not need to; where I note differences between a design frame and a shipped artifact, they are refinements at build time, not scope cuts. **INFERENCE** means I concluded it and you should confirm it. **MISSING** means no evidence exists anywhere I could reach, and I did not invent it.

**What I studied.** Both page versions on this branch: the field-manual page at `projects/sedp-dashboard-original.html` (essentially what is deployed) and the September decision-led page at `projects/sedp-dashboard.html`. All 16 SEDP images and 11 Ecometer/Agrimarket images, read individually. The Notion portfolio pages that both HTML versions descend from. The 14 September strategy doc and the 5 September audit. Then two sources no version has used: your **working notes from the engagement itself** (Notion, `Freelance / Finished / CEDA / SEDP`: "Basics Cleared" 13 Sep 2023, "First Impressions" and "Feedback after 1st meeting" 8 Oct 2023, a ten-row task board 8 to 13 Oct 2023, "All UI Components" 20 Feb 2024, "Mail" 4 Mar 2024, "Mail 2" 9 Apr 2024), and the **Wayback Machine** (the old CEDA data portal from March 2023, and the shipped SEDP landing page captured 15 times between 10 Aug 2024 and 4 Aug 2026). I could not open the Figma file (`CEDA-Ecometer-MAIN`, visible in the screenshot tabs) or the X posts directly, and the archived SEDP chart page never finishes loading because its data API was not captured.

---

## 0. The verdict in five sentences

SEDP is the only project on your site with a dated paper trail of how the design actually happened: a kickoff note that records the client's users, their baseline of about two visitors a day and the three alternatives people used instead, your own first-impressions audit of the old portal, the client's feedback list after the first review, a task board with approval states, a twelve-item component inventory, and two emails about handover. None of that is on either page, and it is exactly the "what I considered, who pushed back" evidence the strategy doc said was missing everywhere. The shipped landing page in the Wayback Machine matches your design and contains two things the client asked for in that feedback list, which makes SEDP the second project where design-to-production can be shown screen for screen. Both current versions are built on a framing the notes contradict: the audience was never "any curious citizen" but journalists, young researchers and people in government, and the share feature was the route to a wider public. The redesign has the right skeleton and the only tradeoff; the original has the fuller image set and the constraint list; neither has the outcome sentence that only the Notion source still carries.

---

## 1. The versions, and what each one uniquely holds

| Version | Where | Words / images | Holds that the others lost |
|---|---|---|---|
| **Working notes** (Sep 2023 to Apr 2024) | Notion, `Freelance / Finished / CEDA / SEDP` | 7 short pages + a task board | The dated record. Users, baseline, alternatives, your audit of the old portal, the client's feedback, ten design tasks with statuses, the component inventory, the 15 April 2024 handover, one recorded disagreement. See section 2b. |
| **Notion portfolio page** (Jun 2026) | "Economic Dashboard Redesign - SEDP" | ~700 | The outcome paragraph both HTML versions dropped: faculty across CEDA and other Ashoka departments used the dashboards for their own research and gave qualitative feedback; CEDA told you they saw a wider audience than the previous researcher base, judged from social engagement. Also the wrong client name and the AI-rendered hero. |
| **Field manual** (`sedp-dashboard-original.html`, deployed) | branch | ~1,430 / 16 | The five-finding inventory of the old portal (F-01 to F-05), the four-goal brief as the client stated it, the four constraints (C-01 to C-04), the year-slider crop, the full testimonial, the bar-chart orientation rationale, and every image at full width. |
| **Decision-led** (`sedp-dashboard.html`, September) | branch | ~1,380 / 12 | The only tradeoff on any version (independent years and filters make mismatched comparisons possible). The "what has to travel with the chart" three-question frame. The clean separation of published use from audience growth. "Linked state highlighting was designed to" instead of asserted. The measurement list tied to journey stages. The missing-data and colour-blind notes. |

**Where the September rebuild lost ground (FACT, by diff):**

- The year-slider crop and the AI-rendered hero were dropped (the second is correct). Four images moved behind expanders or links: the landing page, the tooltip, the selector row, and both CEDA posts. The landing page, which the shipped product proves, is now hidden under "The other half of discovery."
- The old-portal findings went from five specific items (chart below the fold, "Binning" and "Quintile," detached slider, arbitrary palette, "Get Visualization" gate) to one sentence. The constraints went from four rows to a footnote.
- "One system, three dashboards" survives only as a footnote sentence, with no image showing the reuse.
- The testimonial became an excerpt; that is fine, the full text sits on the homepage.
- Both versions inherit the same placeholder hero (see section 4) and the same "citizen" framing.

**Where the original overreaches (FACT):** "only researchers could navigate," "audience never grew past a handful of academics," "in seconds," "turned SEDP from a lookup tool into an analysis tool," "featured charts based on usage," "public portal, no login" as a constraint, and "CEDA runs no logins or analytics" (the notes contradict the last two: see 2c).

---

## 2. What the project actually proves about you

### 2a. Things the artifacts prove (FACT)

1. **You audited before you drew.** "First Impressions" (8 Oct 2023) is your own list: the landing page did not say what it was for, charts were hidden under accordions, the first fold had no calls to action, category organisation gave no mental model; on the chart page the first fold had no data, too many choices were left to the user, loading multiple charts was unclear, notes were hidden behind a button, and the portal "should not wait for the user to click CTA every time they change some parameter." That last line is the chart-first decision, dated, in your words, before the client's feedback.
2. **You designed a structure that holds across 480 variables.** The component inventory (20 Feb 2024) is twelve parts: left navigation, chart-type and state/district selector, title, filters line, chart (map, bar, line), hover, timeline, download, share, heatmap panel, displayed states, filters. Every SEDP screen on disk is those twelve parts rearranged. That is an information-architecture argument a design manager can check against the screenshots.
3. **You found the data the old portal was hiding.** "9 categories in the existing SEDP. Data has 12 categories." You listed the three missing ones (Socio-Economic Status, Media, Social Attitudes) with their subcategories and asked for thumbnails. The category rail in the redesign is the visible result.
4. **You designed data states, not just the happy chart.** Heatmap by value and by count. A rule for negative values ("grey or something, divergent"). Continuous versus discrete legends, with the discrete logic left as a dependency on the client. Hover needing units in the API and an India comparison number. Share labels restricted to the India-states map. None of this is on either page.
5. **You reused patterns across the suite on purpose.** The compare modal (search plus category list) is the Ecometer "Add Chart" modal; the client asked for exactly that reuse. Every dashboard in the Figma file shares the header, the "Download data / Share chart" row, the compare button, the "More dashboards" rail, and the heatmap panel. The images to prove it are already in `assets/images/ecometer`.
6. **You designed an output that leaves the product, and it is still in use.** Two CEDA posts, 8 and 24 March 2026, almost two years after the April 2024 handover, use the share format with the Top 3 / Bottom 3 / median / national average readout you designed.

### 2b. New evidence no version has used (FACT, verified today)

- **The baseline.** "Basics Cleared" (13 Sep 2023): "Looking to scale up. Currently only around 2 visitors per day." Users: journalists, researchers, people in the government. Where they got the data instead: NDAP by Niti Aayog, India Data Portal by ISB, or download CSVs and chart them in Excel. Two questions on that page are blank ("How is this dashboard different from Ecometer?", "What will they be looking for?"), which is itself honest material about what was and was not known at kickoff.
- **The client's feedback, itemised.** After the first review (8 Oct 2023) CEDA asked for: a search bar; "charts by source as a separate section rather than a meagre filter"; region filters brought outside as a radio; other ways of showing categories, with NDAP, IDP and Our World in Data as references; edit chart; heatmaps by value and by count; a compare button "same design as in ecometer, popup with browsing as well as search"; the compare flow; hover on map; line charts; a world map.
- **Two of those requests shipped exactly.** The archived landing page (10 Aug 2024 onward) has "Filter by Region: All / District / State" as pills, a "Browse charts by source" section, the "Most Viewed" featured-chart badge, and the search placeholder "Search chart by title. Eg: Inventory of the factory units," which is the placeholder from your Figma frame. Headline "India's Economy, visualized," same illustration. This is production proof of the landing page and of client feedback changing the design.
- **The task board.** Ten tasks between 8 and 13 Oct 2023 with statuses. Five were "Designs complete, waiting for approval" within the first week (edit title flow, heatmaps by value and count, hover on map, chart view basic structure, and **"Filters and Timeline separate in Compare Charts Flow"**). The last one matters: the independent years that the September page calls a tradeoff were a deliberate, tracked decision, not an accident.
- **The handover.** "Mail 2" (9 Apr 2024): "the 15th April hand over," the dashboard going to CEDA for internal testing while remaining features were finished, and a request for CEDA to use it internally and report bugs. The engagement therefore ran from roughly September 2023 to April 2024, about seven months, not "2023 to 2024."
- **One recorded disagreement.** Same email: "This wont solve the use case of sharing the map. We have been able to find a way to show exactly how the design looked (Also added the design below for reference)." Someone proposed a share implementation that did not solve the map case, and the reply was to render the design as specified. **INFERENCE:** the proposal came from the developers (Kaustuv is named) and the reply is yours or the team's. **MISSING:** who wrote which line. This is the only "who pushed back" moment in the project and it needs its context recovered.
- **The old portal was gated.** The Wayback capture of `ceda.ashoka.edu.in/data-portal/` on 31 March 2023 shows a registration form (name, email, password, occupation: student, faculty, social sciences professional, independent researcher, government, journalist, self-employed) and a login. The archived 2024 to 2026 SEDP landing page has no login wall. "Mail 2" also mentions a user-registration API still being built in April 2024. **MISSING:** whether opening a chart in the shipped SEDP asks for an account, and whether you designed that step. Until you know, do not state "public, no login" as either a constraint or an outcome; "the old portal sat behind a login" is safe on its own.
- **The shipped share export differs from the design, in ways that help you.** The March 2026 posts show the year in the title ("Year: 2021"), the unit in the title, two-decimal values, "Indian Average" rather than "India Average," a link to `ceda.ashoka.edu.in/` rather than the design's `data-portal/?sf=600`, and **"NA"** printed on a territory with no data (DNHDD). The rankings are internally consistent. So the audit's two share-map problems (inconsistent Top 3, no year) are design-mock problems, and the shipped artifact already answers them. Use the shipped export as the hero of the share episode and show the design beside it.
- **The domain may be down right now.** `sedp.ceda.ashoka.edu.in` and `ecometer.ceda.ashoka.edu.in` did not resolve on 19 Sep 2026, while the CEDA site still links to both and the last archive capture is 4 Aug 2026. `agmarknet.ceda.ashoka.edu.in` is live but reads as a plainer form-style page whose labels only partly match your Agrimarket design (Timeseries / Heatmap / Bar chart; "Download charts," "Share Chart"). **INFERENCE:** a hosting change, not a shutdown. Check before you link to anything.
- **A third CEDA item exists.** Your Notion CEDA page lists "Gender Data Portal" beneath SEDP (page edited 24 March 2026). **MISSING:** whether that was a third engagement, a proposal, or a note. If it was work, the rehire story changes from "came back once" to "three engagements over four years."

### 2c. Claims the evidence contradicts or weakens (FACT unless marked)

- "CEDA runs no logins or analytics." CEDA knew it had about two visitors a day, and the shipped landing page labels a featured chart "Most Viewed." Some measurement existed. The honest sentence is "I did not have access to usage data after handover."
- "Any curious citizen." Every dated note names journalists, researchers, academics, and government readers. The wider public was reached through the share images, not through the portal. Both versions aim the thesis at the wrong reader.
- "Turned a lookup tool into an analysis tool." The old portal's own instruction text offers side-by-side comparison, and your First Impressions note says "the ability to load multiple charts unclear." The true claim is smaller and better: comparison existed and nobody could find it; you made it a button, a modal, and a flow.
- The old portal also had a share icon, notes, download, and embed on the chart footer, plus legend keys that toggle states (a "displayed states" ancestor). The redesign's contribution to sharing is the self-contained image, not the existence of sharing.
- "Featured charts based on usage" (original) is supported by the shipped "Most Viewed" badge; keep it, attributed to the product rather than to your data.
- "Center for Economic Development" (Ecometer page, both Notion pages) is wrong. The official name is Centre for Economic Data and Analysis.

### 2d. What it does not prove (MISSING)

- That any reader outside CEDA used the redesigned compare flow, or what they compared. No session, no test, no quote from a journalist.
- Production images of the chart page. You have told me everything designed was shipped, so this is not a doubt about scope; it is that the page currently has no real-data capture of the workspace, the compare flow, or the share dialog, and the archive did not capture the chart page. Every workspace image on disk is a Figma frame with sample data.
- Quantified reach. The two March 2026 posts show 148 and 116 views. Do not cite reach numbers; cite persistence (two years on, still the house format).
- The Ecometer and Agrimarket engagement (2022 to 2023) has no working notes in Notion that I could find, so the "how the engagement started" section will rest on the before/after images alone unless you have email.

---

## 3. The strongest and most distinctive decisions, ranked

1. **Chart first, and live.** Removing the "Get Visualization" gate and making every control re-render the chart. Sourced to your own audit line, dated before client feedback. Carries product judgment and the clearest before/after on the site (old screenshot with the red button; new screenshot with the map already drawn).
2. **Twelve components for 480 variables.** The inventory plus the 9-versus-12 category finding. Carries information architecture and systems thinking with a checkable artifact. Nothing else in the portfolio has an explicit component inventory from the time of the work.
3. **Comparison made findable, with independent time.** The compare button, the reused Ecometer modal (client-requested reuse across the suite), and the tracked decision to keep filters and timeline separate per chart, with the tradeoff that follows. Carries interaction design and judgment under a real tradeoff.
4. **The self-contained export.** Title, filters, readout (Top 3, Bottom 3, median, national average), legend, attribution, link; shipped with year and "NA" states. Carries data-design craft and the only public outcome. Also holds the one recorded disagreement.
5. **The landing page shaped by feedback and shipped as designed.** Two client requests visible in production. Carries collaboration, the capability the strategy doc graded C.
6. **Data states.** Negative values, continuous versus discrete legends, units from the API, India number in the hover, labels only on state maps. Carries craft; belongs as a compact list inside episode 1, not a chapter.

Decisions that are currently on the page but do not deserve the space: the brand-tied heatmap colour (true, minor), the year slider reattachment (true, one crop), the vertical-bar rationale (fine as a caption), and the "Read → Compare → Share" journey graphic (decoration).

---

## 4. Lost, weakened, duplicated, over-polished

**Lost between Notion and both HTML versions**
- The outcome paragraph (faculty use across departments; client-reported wider audience). Recoverable as attributed hearsay: "CEDA told me…"
- All of section 2b, which was never on any page.

**Weakened in September**
- Old-portal findings, constraints, and suite consistency (see section 1).
- The landing page, hidden behind an expander even though it is the one screen with production proof.
- Full-width evidence generally: the compare pair and the share templates are now tabs; the audit already noted that tabs make the reader hold one image in memory while looking at another.

**Duplicated**
- The rehire is told on the homepage card, the About badge, both SEDP pages and the Ecometer page. Twice is enough: summary line and outcome.
- The analytics disclaimer appears at the top of the original and twice in the redesign. Once, in the outcome, with the corrected wording.
- The Ecometer page repeats the four-goal brief word for word.

**Over-polished or generic**
- "Public data. Made legible." and "Open access is only the beginning." are headlines without a fact in them. "Help readers ask the next question." and "Design for the reader who never opens the portal." are the good two; keep those.
- The skill tags under each decision ("Information architecture · Prioritization").
- "What this project taught me: the chart is only useful when someone can make sense of it."
- The "Let's make complex things clearer" button.

**Contradicted by the artifact (FACT, from the files)**
- The hero and every workspace screenshot carry placeholder data: "Average Value of Consumption … (Rupees in last 30 days)" with a "59,000 tonnes" tooltip, a 2004 to 2011 slider, a legend of 0 to 240 next to a share map with values in the tens of thousands, and an Ecometer source line ("Department of Consumer Affairs, Govt. of India, NHB Residex") under an NSS indicator. These are Figma frames with sample data. The shipped posts prove the real thing exists; use them, and label the Figma frames "design, sample data" wherever they stay.
- Chrome tabs and a Figma URL on five screenshots.
- The share-map Top 3 in the design (Uttar Pradesh 38.91k listed above Tamil Nadu 47.11k and Goa 45.21k). Solved by swapping in the shipped export.

---

## 5. Thesis and episodes

### The thesis I recommend

> CEDA's flagship data portal had about two visitors a day and a login wall, and its readers were journalists and researchers who could get the same numbers from three other places. I rebuilt it so the chart appears before any decision is asked of you, so 480 indicators sit in one twelve-part structure, and so any chart can leave as a sourced image that CEDA still posts two years later.

Why this and not the strategy doc's "legible to someone who did not build it": that version is true but aims at a general reader the project never had. The notes give you a sharper and more defensible reader, a numeric baseline you can cite as the client's own words, and alternatives (NDAP, India Data Portal, Excel) that turn "make it intuitive" into a competitive choice. It also lets the page say what a hiring manager wants to hear from a data project: who the user was, what they used instead, what changed, and where the evidence stops.

Two theses I considered and would not use. "Compare is the product" (original): comparison already existed, and the strongest artifact is the export, not the compare pair. "Public data made legible" (September): no reader, no baseline, no number.

### The episodes that carry it

**Episode 1: The chart before the form.** From your audit list to the single-screen workspace: the gate removed, the twelve components, the three missing categories, the data states. Evidence: old screenshot (annotated: red button, binning, detached slider), new workspace, the tooltip and selector crops, the component inventory as a list, the First Impressions list quoted. Collaboration slot: "Akshi to come back with which" on discrete legends; units in the API. Gap to close: one production capture of the chart page.

**Episode 2: Finding the second chart.** Comparison existed and was invisible. The compare button, the modal reused from Ecometer at the client's request, search plus categories plus source browsing, the landing page as the same IA at the front door, and the tracked decision to keep years and filters independent, with its tradeoff. Evidence: compare modal, side-by-side pair, landing design beside the archived shipped landing page, the client's feedback list with the two shipped items marked. This episode carries the collaboration proof.

**Episode 3: The chart that leaves.** The 1:1 export as a second product surface; what has to travel (the September page's three questions are good); the design beside the shipped export, with the differences named (year in title, NA state, link); the "this won't solve the use case of sharing the map" exchange; the two 2026 posts as persistence, not reach. Half the length of the others, and the bar and line templates go to a gallery row.

Each episode in the shape the audit proposed: what I knew → what I considered → what I chose and gave up → who pushed back → what the artifact shows. For the first time on your site, every slot has something dated to put in it.

---

## 6. Keep, cut, compress, restore, emphasise

**Keep**
- The September skeleton: summary → three decisions → outcome with limits.
- The September tradeoff on independent years, now with its source (the task board).
- The "what has to travel with the chart" frame.
- The original's five old-portal findings and the four-goal brief in the client's words.
- The bar-orientation caption and the year-slider crop.
- One full testimonial, once.

**Cut**
- The AI-rendered hero from every surface, including the homepage card image if it is the same render.
- Every screenshot with Chrome tabs, replaced by clean Figma exports labelled as design.
- "Public portal, no login" as a constraint, until verified.
- "Any curious citizen," "only researchers," "handful of academics," "in seconds," "lookup tool into an analysis tool."
- The journey triptych, the skill tags, "Fin.," the closing lesson, the pitch button, the analytics note at the top.
- The Ecometer page as a standalone case study; keep its before/after pair and the Add Chart modal as evidence inside SEDP.

**Compress**
- Brief and constraints to one screen: four goals, four rows (suite consistency, locked brand, two developers, seven-month window), each with what it forced.
- Rehire to two mentions. Analytics limit to one sentence, reworded.
- Episode 3 to half length.

**Restore**
- The old-portal findings at full strength, with the annotated old screenshot.
- The landing page to the main path, paired with the archived production capture.
- Suite consistency as an image row: SEDP compare modal beside Ecometer Add Chart, SEDP header beside Agrimarket header.
- The Notion outcome paragraph, attributed.
- Full-width evidence for the compare pair and the share export.

**Emphasise**
- The baseline and the reader in the first thirty seconds of the page.
- The dated notes as the spine: quote three or four lines verbatim, with dates, as pull material instead of aphorisms.
- Design beside shipped, twice: landing page (archive) and share export (X posts).
- The engagement window (Sep 2023 to Apr 2024 handover) in the summary block instead of "2023 to 2024."

---

## 7. Structure, for a skim and for a deep read

```
Summary block (60 seconds, above the first image)
  ├─ Thesis line
  ├─ Role facts: sole designer · two developers · Sep 2023 to Apr 2024 handover · second CEDA engagement
  ├─ What shipped: workspace, compare, landing page, share export; landing page archived, exports in CEDA's posts
  └─ Outcome with its limit: still the house share format in 2026; no usage data after handover

Where it started (one screen)
  ├─ The client's own numbers and readers, quoted from the kickoff note
  ├─ The three alternatives readers used instead
  ├─ Annotated old portal: gate, jargon, detached slider, hidden compare, login
  └─ Four goals as stated; four constraints with what each forced

Episode 1 · The chart before the form                          (the set piece)
  ├─ Decision headline
  ├─ Your audit list, dated, four lines
  ├─ Old vs new, matched framing, full width
  ├─ Twelve components as a labelled diagram over the workspace
  ├─ Data states: value/count, negative, discrete vs continuous, units, India number
  └─ [to capture] the shipped chart page with real data, to replace the sample-data frame

Episode 2 · Finding the second chart
  ├─ Decision headline
  ├─ Compare existed; what made it invisible
  ├─ Button → modal (reused from Ecometer, at the client's request) → side by side
  ├─ Tradeoff: independent years and filters, from the task board
  ├─ Landing page: design beside the archived shipped page, two client requests marked
  └─ The client's feedback list, quoted

Episode 3 · The chart that leaves                              (half length)
  ├─ Decision headline
  ├─ What has to travel (three questions)
  ├─ Design beside shipped export, differences named (year, NA, link)
  ├─ "This won't solve the use case of sharing the map"
  └─ Two 2026 posts, dated; bar and line templates as a gallery row

One system, three dashboards                                    (one screen)
  ├─ Modal beside modal, header beside header
  └─ The Agrimarket before/after pair as how the relationship began

Outcome, with its limit stated once
  ├─ Persistence of the share format; client-reported wider audience, attributed
  ├─ No usage data after handover; what I would measure (three lines)
  └─ What I would test (labelled prospective): compare comprehension, missing data, colour

Testimonial, full
Next case study
```

**Skim path** (recruiter, two minutes): summary block, three decision headlines, one full-width figure per episode, outcome line. **Deep path** (design manager, eight minutes): the audit list, the component diagram, the feedback list with shipped items marked, the tradeoff, the design-beside-shipped pairs. Expanders may hide process notes; they may not hide the landing page, the compare pair, or the shipped export.

---

## 8. Evidence, memories, and assets to recover before writing

In priority order. The first four change what the page can claim.

1. **Open the Figma file (`CEDA-Ecometer-MAIN`) and export clean frames** for every screenshot that currently carries Chrome. While there, check version history around October 2023 and February to April 2024 for one structural change between first review and handover, and for any comment thread from Akshi or the developers.
2. **Find the two emails behind "Mail" and "Mail 2."** Who wrote "This wont solve the use case of sharing the map," what was proposed, and how it was resolved. Also the handover email: what was delivered on 15 April 2024 and what was finished afterwards. This is the collaboration episode.
3. **Capture the shipped chart page with real data.** Not to check scope (you have confirmed everything shipped) but because every workspace image on the page is a sample-data Figma frame. When the domain is back, capture the workspace, the compare flow, and the share dialog at 1440 with the date; if it stays down, ask CEDA for captures. Note whether opening a chart asks for an account.
4. **Ask CEDA two questions** (Akshi Chawla, or whoever runs the X account now): may you quote the "wider audience" remark and attribute it; is the Gender Data Portal a third engagement, and if so, when.
5. **Capture the archived landing page** at `web.archive.org/web/20240810081436/https://sedp.ceda.ashoka.edu.in/` and the March 2023 login wall at `web.archive.org/web/20230331031559/https://ceda.ashoka.edu.in/data-portal/` as dated PNGs. The Wayback pages did not screenshot cleanly from here; do it in a normal browser at full width.
6. **Pin the engagement dates** from invoices or email: kickoff month (the notes start 13 Sep 2023) and final delivery after the 15 April 2024 handover. Do the same for Ecometer and Agrimarket (2022 to 2023) so the suite timeline is real.
7. **The second X post's permalink.** Only the 8 March 2026 post is linked; the 24 March 2026 post is a screenshot without a URL.
8. **The old portal's share behaviour.** The March 2023 chart footer has a share icon. If you remember what it did (link? image?), write it down; it defines what your export added.
9. **Your own memory of the discrete-versus-continuous legend decision** and the world map that was requested and does not appear in any screenshot. Both are "what I considered and gave up" material even if unsourced.
10. **The Ecometer working notes**, if they exist anywhere other than Notion.

---

## 9. The three highest-leverage next actions

1. **Recover the two emails and the Figma history, then write the collaboration episode first.** Half a day of yours. The disagreement in "Mail 2," the client's feedback list, and the two shipped landing-page items are the only evidence on your whole site that a design changed because of another person. Get the context before the memory of it fades further.
2. **Replace every placeholder artifact with a shipped or clean one.** Clean Figma exports for the workspace and compare screens, the March 2026 export as the share hero with the design beside it, the archived landing page beside its design, the old login wall beside the old chart page. Two hours once the Figma file is open. This fixes every credibility finding the audit raised for SEDP without a sentence of new copy.
3. **Write the episode outline from the notes, not from either page.** One page per episode: decision headline, the dated note that sources it, the figure list in order, the tradeoff, the collaboration slot. Build the merged page on the September skeleton with the original's findings and image set restored. Do not touch layout until the outline holds without a single line the notes cannot support.
