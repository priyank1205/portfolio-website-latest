# SEDP case study blueprint

19 September 2026 · Implementation-ready specification for the flagship page. Builds on `audits/sedp-flagship-analysis-2026-09-19.md`; does not repeat its findings. No copy in here is final copy; headlines are working titles that state the decision.

**Governing facts from the author (user-confirmed, 19 Sep 2026).**
1. Everything designed for SEDP was developed and shipped.
2. The share image: the design fixed state-label positions and typography by hand and populated the values programmatically from the selected chart, so the export is a self-contained image rather than a screenshot. The developer found this hard. The CEDA team proposed shipping the heatmap alone, without labels or the readout. The author declined to lose the information that made the image interpretable, researched implementation approaches, worked through the problem with the developer, and the design shipped as intended. The 9 April 2024 email line ("This wont solve the use case of sharing the map. We have been able to find a way to show exactly how the design looked") refers to this.

**Global rules for the builder.**
- Every screenshot from the Figma file is labelled "Design frame, sample data" in its caption unless it is a clean export with real data. Chrome tabs and Figma URLs never appear.
- Every quotation from the working notes carries its date. Notes are quoted, not paraphrased into prose.
- One rehire mention (summary block) plus one in the outcome. One analytics limit, in the outcome, worded as "no access to usage data after handover."
- No skill tags, no journey diagram, no reading-time badge, no closing lesson, no pitch button, no "Fin."
- Headlines state a decision or a fact. If a headline could sit on any portfolio, cut it.
- Expanders may hold process detail. They may not hold the old-portal pair, the landing-page pair, the shipped export, or the component diagram.
- Shipped is the default. Because everything shipped, the page never says "designed" where it can say "shipped," and never hedges scope. Design frames are used only where a real-data capture does not yet exist, and are labelled as design frames because of their sample data, not because of doubt about shipping.

---

## Section 0 · Summary block

**Weight:** set piece for the skim. Above the first image. The whole recruiter path starts here.

**Purpose.** In sixty seconds: what the product was, who used it, why the system was hard, the role, the window, that it shipped, and the strongest defensible outcome with its limit.

**Content order.**
1. Thesis line (working version): CEDA's flagship socio-economic portal had about two visitors a day and sat behind a login. Its readers were journalists and researchers who could get the same numbers elsewhere. Rebuilt so the chart appears before any decision is asked, 480 indicators sit in one twelve-part structure, and any chart can leave as a sourced image CEDA still posts two years later.
2. Role facts, one line: sole product designer · two developers and one department head at CEDA · September 2023 kickoff, 15 April 2024 handover · second engagement for CEDA after Ecometer and Agrimarket.
3. What shipped, one line: chart workspace (map, bar, line; state and district), compare flow, discovery landing page, and the share export, all built as designed.
4. Outcome with limit, one line: the export is still CEDA's house format in 2026; no access to usage data after handover.

**Artifacts.** None inline. One small thumbnail strip may sit beside it: shipped export (28b166f2 crop), archived landing page, compare pair. Optional.

**Show vs say.** Say. This is the only text-first section.

**Reuse / cut.** Reuse the September "project-facts" dl structure. Cut the hero H1 pair ("Public data. Made legible."), the deck, "Explore the case study," and the reading time. Cut the AI render (57eb6636) everywhere on the site for this project, including the homepage card if it uses it.

**Truth boundaries.** "About two visitors a day" is the client's own figure from the 13 Sep 2023 kickoff note; attribute it as such wherever it appears in full ("CEDA's own count at kickoff"). "480 indicators" is from CEDA's public data-portal page today; say "around 480 variables across 23 datasets, by CEDA's current count." "Behind a login" refers to the old portal (Wayback, 31 Mar 2023). Do not say the new portal is open unless confirmed. "Two years later" is 8 and 24 March 2026 against the April 2024 handover.

---

## Section 1 · Where it started

**Weight:** supporting. One screen, no expanders.

**Purpose.** Establish the reader, the baseline, the alternatives, and the old product, so the three decisions read as consequential rather than cosmetic. Also establish the brief and the box.

**Content order.**
1. Three lines from the kickoff note, quoted with date (13 Sep 2023): the three reader groups; "Looking to scale up. Currently only around 2 visitors per day"; the three alternatives (NDAP by Niti Aayog, India Data Portal by ISB, download CSVs and chart in Excel).
2. The old portal, one annotated full-width figure: fcd1ef8b_sedp-portal-2.png with five callouts placed on the image: the "Get Visualization" gate; "Binning Style: By Range / By Quintile"; the year slider in the top bar far from the map; the instruction text "You can also compare two visualisations side-by-side" as the only trace of compare; the login wall (a small inset of the March 2023 registration form from Wayback).
3. The brief as CEDA stated it: the four goals (reduce complexity; consistent visual language across dashboards; clean and modern; grow the audience through shareable charts). Four rows only.
4. The box, four rows with what each forced: one system across SEDP, Ecometer and Agrimarket; CEDA's locked identity; a two-developer build; a seven-month window to a handover for internal testing.

**Show vs say.** Show the old portal with callouts; say the baseline and alternatives as quotes. The brief and constraints are a compact table, not prose.

**Reuse / restore / cut.** Restore the original's F-01 to F-05 as the five callouts (they are correct and specific). Restore C-01 to C-03 from the original; replace C-04 ("public portal, no login") with the seven-month window. Cut the original's context paragraph and its "if a reader has to learn the interface" pull quote. Cut the September "What I owned" box and "My design priority" panel.

**Truth boundaries.** The four goals are attributed to CEDA (they are in the author's Notion as the client's ask). Do not add "only researchers could navigate," "handful of academics," or any audience claim beyond the quoted note. The two blank questions in the kickoff note ("How is this different from Ecometer?", "What will they be looking for?") may be mentioned in one sentence as what was not known at the start; optional.

---

## Section 2 · Episode 1: The chart before the form

**Weight:** set piece. The interaction and IA proof.

**Purpose.** Show that the first decision was to remove the gate and let every control redraw the chart, that the decision was the author's own from a dated audit, and that the resulting workspace is one repeatable structure that holds across every indicator, geography and chart type.

**Content order.**
1. Decision headline (working): "Show the chart first. Let every control redraw it."
2. What I knew: four lines from "First Impressions" (8 Oct 2023), quoted with the date: first fold has no data; too many choices left to the user; notes hidden inside a button; "should not wait for the user to click CTA every time they change some parameter."
3. What I chose: old chart page beside new workspace, full width, matched framing. Left: fcd1ef8b (already shown in section 1, so use a tight crop of the control area and the red button). Right: a clean export of the workspace (replaces abf7a91d, which has Chrome). If no clean export exists yet, use abf7a91d cropped to remove the browser chrome and caption it "Design frame, sample data."
4. The structure: the same workspace image with twelve numbered labels overlaid, matching the 20 Feb 2024 component inventory (left navigation; chart type and state/district selector; title; filters line; chart; hover; timeline; download; share; heatmap panel; displayed states; filters). One sentence under it: every screen in the product is these twelve parts, and the same parts carry map, bar and line, state and district.
5. What the structure had to hold: the 9-versus-12 category finding (4 Mar 2024 note quoted: "9 categories in the existing SEDP. Data has 12 categories," with the three missing categories named). One sentence, beside the category rail crop from the workspace.
6. Data states, as one compact row of four crops with one-line captions, not a feature list: heatmap by value and by count (cb7c9aa7); tooltip with state, year, value and units (b37ade72); selector row (c505a00f); year slider under the chart (51fd44d7). Two further states are text-only in the same row: a divergent rule for negative values, and continuous versus discrete legends with the discrete logic left with CEDA.
7. Tradeoff, one sentence: the single non-scrolling desktop layout was a choice for the workspace at desk width; it is not claimed as universal, and small-screen behaviour is listed in the outcome as untested.
8. Collaboration note, one line, no drama: units had to come from the API, the India comparison number in the hover was a request on engineering, and the discrete legend logic waited on CEDA ("Akshi to come back with which," 20 Feb 2024).

**Show vs say.** Show: the before/after pair, the twelve-label overlay, the four crops. Say: the four audit lines and the category finding, as quotes with dates.

**Reuse / restore / cut.** Reuse the September "before/after" pair idea but as two images side by side, not tabs; the audit already noted tabs make the reader hold one image in memory. Reuse the September "Start with data / Group related controls / Keep time beside the chart" notes as captions for the crops, shortened. Restore the year-slider crop from the original. Cut "A workspace for exploration," "The reader does the setup," and the "craft behind the structure" expander; its contents move into the crop row.

**Truth boundaries.** The chart-first decision is sourced to the author's own note, dated before the client's feedback list; say so, and do not claim research or testing. The workspace image is a design frame with sample data until a real-data capture exists; label it. Do not describe the bar-chart orientation here (it moves to episode 2). "Every screen is these twelve parts" is checkable against the image set; keep it as a claim about the design system, not about code.

---

## Section 3 · Episode 2: Finding the second chart

**Weight:** full episode, tightest of the three. Carries IA and the first traceable client-feedback-to-production proof.

**Purpose.** Show that comparison already existed and was invisible, that the fix was a button, a reused modal and a flow, that the independent-year decision was deliberate and has a cost, and that the discovery landing page was shaped by the client's feedback and shipped that way.

**Content order.**
1. Decision headline (working): "Comparison existed. Nobody could find it."
2. What I knew: two quotes. The old portal's own instruction text ("You can also compare two visualisations side-by-side by choosing two indicators on the top bar"), and the author's 8 Oct 2023 line "The ability to load multiple charts unclear."
3. What the client asked for (8 Oct 2023, quoted): "Need a button to compare data. Same design as in ecometer. Popup with browsing as well as search capabilities."
4. What I chose, three images in sequence, full width: the compare button in the action row (crop from the workspace); the compare modal (d0f2f7e0, cleaned or cropped, labelled design frame) placed beside the Ecometer Add Chart modal (0b119b0f, cropped to the modal) with a one-line caption that the pattern was reused across the suite at the client's request; the side-by-side pair (9345e24a, cleaned, labelled design frame).
5. Tradeoff: "Filters and Timeline separate in Compare Charts Flow" was a tracked task (task board, 8 Oct 2023, designs complete). The September tradeoff sentence stays: independent years and filters make comparison flexible and make mismatched comparisons possible. Then the September "what I would validate" line, shortened to one sentence and labelled prospective: ask a reader to explain one difference between the two charts.
6. Rank when position matters: the bar view (357f6b4f, cleaned, labelled design frame) with the original's caption about horizontal bars keeping state names readable, plus Top 20 / Bottom 20. One image, one caption.
7. The front door: the landing-page design (326e4183, cleaned) beside the archived shipped landing page (Wayback capture, 10 Aug 2024 or any later capture), full width. Two markers on the shipped image tied to two quoted client requests from 8 Oct 2023: "Region filters could be brought outside as a radio selection" beside the shipped "Filter by Region: All / District / State" pills; "Charts by Source as a separate section rather than a meagre filter" beside the shipped "Browse charts by source." A third marker, unquoted, on "Most Viewed" and the search placeholder, which match the design.

**Show vs say.** Show: modal beside modal, the pair, the landing design beside the archived page with markers. Say: the two old-portal quotes, the client's request, the tradeoff.

**Reuse / restore / cut.** Reuse the September tradeoff and the "known and exploratory searches" caption for the modal, shortened. Reuse the September "Let the question choose the chart" caption for the bar view, shortened. Restore the landing page to the main path (September hid it in "The other half of discovery"). Cut the September compare-explorer tabs; the three images stack. Cut "Help readers ask the next question" as a headline (keep as a caption if wanted). Cut the original's "Compare is the product" and "turned SEDP from a lookup tool into an analysis tool."

**Truth boundaries.** Say the old portal had comparison; the contribution is discoverability and flow. "Linked highlighting across both maps" is from the author's Notion caption; since everything shipped, it can be stated as shipped behaviour, but a still image cannot demonstrate it, so caption it as behaviour rather than pointing at the image as proof. The "Most Viewed" badge is the product's label; the author does not have the usage data behind it and the page should not claim to. Do not claim the client's NDAP/IDP/Our World in Data references were studied unless the author confirms; they may be listed as the references CEDA pointed to.

---

## Section 4 · Episode 3: The chart that leaves

**Weight:** set piece. With the clarification this is now the strongest collaboration and influence evidence on the site, and the only episode with a shipped artifact from 2026. Equal length to episode 1, not half.

**Purpose.** Show that the export was designed as a second product surface with the context needed to read it; that a technically hard design produced a weaker proposed compromise; that the author investigated the implementation with the developer and the intended design shipped; and that CEDA still uses it two years on.

**Content order.**
1. Decision headline (working): "A shared chart has to explain itself without the portal."
2. What I knew: the fourth goal in CEDA's words (grow the audience through shareable charts), and one line from the 20 Feb 2024 inventory ("Share Chart: screenshot; label and value only for India-states map") showing where the design started.
3. What I chose: the map export design (7415e220), full width, with five callouts: indicator title and filters; Top 3 / Bottom 3; median and India average; legend; CEDA mark and portal link. The September three-question frame ("What am I looking at? How should I read it? Where can I go deeper?") stays as the three groupings of the callouts. Caption: "Design frame, sample data."
4. How it was built, in four short sentences and no adjectives: label positions and typography were fixed by hand in the design; values populate from the selected chart; the developer found this hard to implement; CEDA proposed exporting the heatmap alone, without labels or the readout.
5. What I did: the author researched implementation approaches and worked through the problem with the developer until the intended design could be built. Quote the 9 April 2024 line, dated: "This wont solve the use case of sharing the map. We have been able to find a way to show exactly how the design looked." One sentence on why the compromise was refused: without labels and the readout the image could not be read on its own, which was the point of the feature.
6. Shipped: the design export beside the 8 March 2026 CEDA post (28b166f2), full width, same scale. Under it, a short list of differences visible between the design frame and the shipped export, stated neutrally: the year and unit sit in the title; values carry two decimals; "Indian Average"; a territory without data prints "NA"; the link points to ceda.ashoka.edu.in. Caption them as differences between the frame and the shipped export, not as anyone's decision.
7. Persistence: the 24 March 2026 post (6a82ca54) as a second, smaller figure, with the link to the 8 March post on X. One sentence: two years after handover the export is still the house format for CEDA's data posts.
8. Gallery row, small: bar and line templates (d14c954d, 3f28812d), labelled design frames.

**Show vs say.** Show: the annotated design, the design-beside-shipped pair, the second post. Say: the four-sentence build story, the refused compromise, the email line.

**Reuse / restore / cut.** Reuse the September three questions and "Keep the reference in view" tone. Reuse the original's line that the image "carries its own headline readout." Cut the September share-explorer tabs (Map / Bar / Line); the map is the story, the others are a gallery row. Cut "the intended loop: a useful chart earns attention…" Cut the original's "CEDA's team still reaches for the share feature regularly" wording; replace with the dated posts.

**Truth boundaries.** The build story is told at the scale the author gave it: a hard implementation, a proposed simpler compromise from the CEDA team, investigation with the developer, the design shipped. No "fought," no "convinced," no named villain; the developer is a collaborator. Do not name the developer unless the author wants to. Views on the posts (148 and 116) are not cited. "Still the house format" rests on two posts; say "CEDA's posts in March 2026," not "regularly" or "widely." The differences list is descriptive; do not attribute the refinements to the author or to engineering. Do not claim the export was tested with readers.

---

## Section 5 · One system, three dashboards

**Weight:** short coda. One screen. This is where Ecometer and Agrimarket live from now on; the standalone Ecometer page is retired and its URL redirects here or to an anchor.

**Purpose.** Show the suite consistency the brief demanded, and how the relationship began, without a second case study.

**Content order.**
1. One line: SEDP was the third dashboard in one visual system, built in the same Figma file, by the same two developers.
2. A two-by-two of crops: SEDP header beside Agrimarket header (27977c07 crop); SEDP compare modal beside Ecometer Add Chart modal (already shown in episode 2; here as a small reminder or omit if it feels repeated, prefer omit); SEDP heatmap panel beside the Agrimarket heatmap with its "Highest price in / Lowest price in" cards (74b2db68 crop); SEDP "Download data / Share Chart" row beside the Ecometer row (e6f9dcfb crop).
3. How it began: the Agrimarket before pair (e0b09fb2, 981dbc44) beside the redesigned default view (27977c07). One caption: the first engagement, 2022 to 2023, and why CEDA came back for the flagship.

**Show vs say.** Show almost entirely. Two sentences of text.

**Reuse / cut.** Reuse the Ecometer page's before/after images and its "Download Data modal for researchers and journalists" idea only if a third crop is wanted. Cut the Ecometer page's brief (it duplicates SEDP's), its emoji headings, "Click any image," the "Design Lead" role line, and the wrong client name.

**Truth boundaries.** "Center for Economic Development" never appears; the client is the Centre for Economic Data and Analysis. The rehire is stated here once, factually, as the sequence of engagements. Nothing about the Gender Data Portal until confirmed.

---

## Section 6 · Outcome, with its limit

**Weight:** supporting. Short.

**Purpose.** State what can be shown, what CEDA reported, and where the evidence stops, once.

**Content order.**
1. What shipped, one line (repeat of the summary line is acceptable).
2. Persistence: the export in CEDA's March 2026 posts, linked.
3. Client-reported, attributed: the Notion outcome paragraph, compressed to two sentences and framed as report: CEDA told the author that faculty across CEDA and other Ashoka departments used the dashboards for their own research, and that they saw a wider audience than the earlier researcher base, judged from engagement on social media. Labelled as the client's assessment, not a measurement.
4. The limit, once: no access to usage data after handover, so no adoption or retention figures are claimed.
5. What I would measure, three lines tied to the three episodes (time to a useful chart; find and interpret a second indicator; exports to referred visits). Reuse the September list.
6. What I would test and fix, labelled prospective, three lines: comprehension of mismatched comparisons; missing-data language in the workspace (the export already prints NA); colour-blind and keyboard access to values; small-screen behaviour.
7. Testimonial, full text, once, with the client's title. Use one wording site-wide (check the original source for "work with him again" versus "be working with him again").

**Show vs say.** Say. One link to the X post; no new images.

**Reuse / cut.** Reuse the September measurement list and "what I would strengthen" pair. Cut "The charts made it beyond the dashboard" as a headline if it reads as a claim of reach; a factual headline is fine. Cut the original's "What I'd do differently" column and the three-column scorecard; the prospective list above replaces it. Cut "Fin.," the closing lesson block, and the pitch button.

**Truth boundaries.** "CEDA runs no logins or analytics" is removed everywhere. The wider-audience sentence is the client's report and must read as such. "Usability-test with non-experts, not just faculty" implies faculty testing happened; do not imply it unless the author confirms sessions took place; "faculty feedback" (qualitative, from use) is what the Notion source supports.

---

## Section 7 · Next case study

Standard related-cases block. Nothing else below the testimonial.

---

## Skim path versus deep path

**Skim (30 to 60 seconds), in order:** summary block → episode 1 headline and the before/after pair → episode 2 headline and the landing design beside the archived shipped page → episode 3 headline and the design export beside the March 2026 post → outcome line and testimonial. Every one of those figures is full width and never inside an expander. The chapter nav lists exactly these five stops.

**Deep (5 to 8 minutes):** everything above plus the quoted notes, the twelve-label overlay, the data-state crops, the compare sequence, the tradeoff and prospective-test lines, the build story in episode 3, the differences list, the suite coda, and the outcome's limits. Expanders are allowed only for: the full First Impressions and client feedback lists (beyond the quoted lines), the full component inventory as text, and the prospective measurement detail.

---

## Final section order

1. Summary block
2. Where it started (baseline, old portal annotated, brief, box)
3. Episode 1 · The chart before the form (set piece)
4. Episode 2 · Finding the second chart (full, tightest)
5. Episode 3 · The chart that leaves (set piece)
6. One system, three dashboards (coda; absorbs Ecometer and Agrimarket)
7. Outcome, with its limit, and the testimonial
8. Next case study

## Exact artifact order within each episode

**Episode 1**
1. Four quoted lines, First Impressions, 8 Oct 2023
2. Old chart-page controls crop (fcd1ef8b) beside new workspace (clean export; fallback abf7a91d cropped, labelled)
3. Workspace with twelve numbered labels (20 Feb 2024 inventory)
4. Category rail crop with the 9-versus-12 quote (4 Mar 2024)
5. Crop row: cb7c9aa7 · b37ade72 · c505a00f · 51fd44d7, plus two text-only states
6. Tradeoff line (desktop layout) and collaboration line (units in API, India number, discrete legend)

**Episode 2**
1. Two quotes: old portal instruction text; "ability to load multiple charts unclear" (8 Oct 2023)
2. Client request quote (8 Oct 2023)
3. Compare button crop
4. Compare modal (d0f2f7e0, cleaned) beside Ecometer Add Chart (0b119b0f crop)
5. Side-by-side pair (9345e24a, cleaned)
6. Tradeoff: task-board line (8 Oct 2023) plus the September sentence plus one prospective test line
7. Bar view (357f6b4f, cleaned) with orientation caption
8. Landing design (326e4183, cleaned) beside archived shipped landing page, with two quoted-request markers and one match marker

**Episode 3**
1. Fourth goal in CEDA's words; inventory line on share (20 Feb 2024)
2. Map export design (7415e220) with five callouts in three groups
3. Four-sentence build story; the proposed compromise
4. Investigation with the developer; the 9 April 2024 quote; why the compromise was refused
5. Design export beside 8 March 2026 post (28b166f2), same scale; differences list
6. 24 March 2026 post (6a82ca54), smaller; link to the 8 March post
7. Gallery row: d14c954d · 3f28812d

## Asset and action checklist (only what is still needed)

1. Clean exports from the Figma file for: workspace with tooltip, compare modal, side-by-side pair, bar view, landing page. Removes the Chrome tabs and Figma URL from five images. If the frames still contain the sample indicator ("59,000 tonnes," 2004 to 2011 slider, Ecometer source line), either swap in a real indicator in Figma before exporting or keep the "Design frame, sample data" label.
2. Real-data captures of the shipped chart page, compare flow and share dialog at 1440, dated, when the domain is reachable again (sedp.ceda.ashoka.edu.in did not resolve on 19 Sep 2026). These replace the labelled design frames in episodes 1 and 2. Not a scope check; a sample-data fix.
3. Two dated Wayback captures at full width from a normal browser: the shipped landing page (`web.archive.org/web/20240810081436/https://sedp.ceda.ashoka.edu.in/`) and the old login wall (`web.archive.org/web/20230331031559/https://ceda.ashoka.edu.in/data-portal/`).
4. Permalink for the 24 March 2026 CEDA post (only the 8 March post is linked today).
5. Kickoff month confirmed from email or invoice (notes begin 13 Sep 2023) and the final delivery date after the 15 April 2024 handover, so the summary can state the window exactly. Same for Ecometer and Agrimarket (2022 to 2023).
6. Permission or comfort to quote CEDA's "wider audience" remark as the client's report, and one testimonial wording to use site-wide.
7. A yes or no on the Gender Data Portal listed under CEDA in Notion. If it was a third engagement, the summary and coda change; if not, nothing changes.
8. Decide whether the developer is named on the page. Default: not named.

## Dropped from the earlier analysis because the clarification resolves it

- The MISSING tag on who wrote the 9 April 2024 email line and what was proposed. Resolved: CEDA proposed the heatmap-only compromise; the author and the developer found the way to build the design.
- Recovery item 1's second half (searching Figma history and comments for "who pushed back"). The collaboration evidence now comes from the author's account plus the dated email line; Figma is needed only for clean exports.
- Recovery item 2 (finding the two emails to establish authorship and resolution). Only the handover date and delivery date remain useful, folded into checklist item 5.
- The question to CEDA "did the developers change anything from the designs." Resolved by governing fact 1.
- The MISSING tags on whether linked hover, the compare modal, displayed states and heatmap-by-count shipped. Resolved by governing fact 1; the remaining need is real-data images, not verification.
- Recovery item 8 (what the old portal's share icon did) and item 9 (memory of the world map and the discrete legend). Not needed for any section above.
- The "half length" instruction for episode 3. It is now a full set piece.
- The INFERENCE that the developer proposed the compromise. It was the CEDA team's suggestion in response to the developer's difficulty.

Still open and unchanged from the analysis: whether opening a chart in the shipped portal asks for an account (affects only whether the page may say "open, no login" about the new product; the old login wall is safe to state), and the Gender Data Portal.
