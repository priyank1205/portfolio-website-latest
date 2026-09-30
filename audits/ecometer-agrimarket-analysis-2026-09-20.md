# Ecometer and Agrimarket — evidence and portfolio analysis

20 September 2026 · Analysis only. No portfolio copy, page redesign or implementation.

## 1. Recommendation

**Give Ecometer and Agrimarket a substantial, directly addressable section within the SEDP case study. Replace the present suite coda with two concise decision episodes and keep the Ecometer-to-SEDP modal comparison in SEDP’s comparison episode.** Retain one CEDA project in the main portfolio navigation. Do not restore the old standalone gallery, but do not reduce this work to a before/after image and a client-relationship paragraph either.

The earlier strategy underestimated the material. Ecometer contains a specific argument about making analytical choices understandable: which series is plotted, which market it represents, whether the reader is looking at absolute values or growth, and where the data comes from. Agrimarket contains a different argument: keep exact observations available beside temporal and geographical views, with interactions that help isolate a signal. These deserve more attention than repeated headers and buttons.

The reason to integrate is the **relative strength of the evidence**, not the existing redirect. SEDP has the dated decision record, attributed client feedback, author-confirmed shipping scope and published exports. Ecometer/Agrimarket currently have strong design artifacts but little equivalent evidence of how decisions were reached, what changed through collaboration, or what users subsequently did. Together they make a stronger case for adaptable analytical-product design than two separately introduced CEDA projects would today.

This is an editorial judgment, not a fact about recruiter behaviour. No recruiter testing was supplied.

## 2. Scope, sources and evidence rules

I read the supplied [portfolio strategy](/Users/priyank/Documents/portfolio-website/audits/portfolio-strategy-2026-09-14.md), [Khiladipro analysis](/Users/priyank/Documents/portfolio-website/audits/khiladipro-flagship-analysis-2026-09-19.md) and [SEDP analysis](/Users/priyank/Documents/portfolio-website/audits/sedp-flagship-analysis-2026-09-19.md) first. Their recommendations are hypotheses and historical context, not instructions to implement.

I then examined:

- The working branch `codex/khiladipro-product-story`, including its existing uncommitted changes. The current Ecometer page is a redirect; the full original case study survives at `projects/ecometer-agrimarket.html` in commit `c54f84581d5bf8c1ebb6624ef869bbd91e73eecc` and was read from that commit.
- All eleven original files in `assets/images/ecometer`, individually: four Ecometer interface frames, two Agrimarket before captures, four Agrimarket redesign frames and the dual-monitor presentation image. The homepage copy of that presentation image is byte-identical.
- The current [SEDP page](/Users/priyank/Documents/portfolio-website/projects/sedp-dashboard.html), especially its modal pair and suite section; the relevant SEDP workspace, comparison and published-export images; the [SEDP blueprint](/Users/priyank/Documents/portfolio-website/audits/sedp-case-study-blueprint-2026-09-19.md), [implementation review](/Users/priyank/Documents/portfolio-website/audits/sedp-review-2026-09-19/implementation-review.md), asset-preparation script and earlier audit references. The working SEDP-original page is also now a redirect.

**FACT — artifact:** directly visible in a file inspected for this analysis. A Figma frame proves the represented design, not successful implementation or use.

**FACT — recorded:** stated by the original case study, or quoted/reported in the supplied analyses and subsequent blueprint. This preserves its provenance; it is not a new independent verification. In particular, SEDP’s working notes were read through the local analysis/page, not reopened in Notion.

**INFERENCE:** a plausible interpretation of the design or its likely utility. It does not establish your original intention, a research finding, or a realised outcome.

**MISSING EVIDENCE:** not found in the reviewed branch material. This does not mean the work never happened or the evidence does not exist elsewhere.

This is a branch-material review. I did not inspect live products, reopen Figma/Notion, contact anyone, or reverify external links. Previous reports of domain availability are not treated as current facts. Only this analysis file was added.

## 3. What the work most strongly proves

### Ecometer on its own

**Strongest proof: the design makes the meaning and configuration of a multi-series chart inspectable.**

**FACT — artifact:** The main frame combines indicator categories, several lines, a “Displayed Charts” panel with per-series market labels, visibility and removal controls, a timeframe selector, source information, and export actions. A separate popover distinguishes absolute values from YoY, QoQ and MoM growth and explains the change to the y-axis. Another describes the indicator and links to methodology.

**INFERENCE:** This demonstrates attention to the decisions that affect interpretation, beyond making a line chart attractive. Series configuration, transformation and provenance have places in the interface. The portfolio can make a credible case for analytical interaction design from these artifacts.

**MISSING EVIDENCE:** a rendered growth-rate result, handling of incompatible units/frequencies, calculations or data rules, testing of the explanation, and the pre-redesign Ecometer interface. Do not claim that you invented these capabilities, eliminated misinterpretation, or enabled comparisons across any arbitrary indicators.

### Agrimarket on its own

**Strongest proof: exact data and visual patterns occupy the same workspace.**

**FACT — artifact:** A price summary and dated table remain on the left while the right side shows either a time series or a map. Commodity and geography selectors sit above both. The time-series view includes price/quantity and day/month/year controls, date range, legend and comparison action. The map view adds high/low location readouts. The download modal makes the selected context, period and format explicit.

**INFERENCE:** This gives a reader complementary ways to inspect the same domain: exact records, movement over time and geographical distribution. The persistent table is more distinctive than the shared header or heatmap palette.

**MISSING EVIDENCE:** whether all views stayed synchronised in production, how aggregations were calculated, the full compare flow, the completed pie-chart view, loading/error states, keyboard/touch equivalents, and small-screen behaviour. Visible controls do not prove those workflows.

### Alongside SEDP

**Strongest proof: a shared design language adapted to different analytical tasks.**

Ecometer organises series on a chart. Agrimarket organises observations, time and geography. SEDP organises indicator discovery, geographical comparison and self-contained publishing. That distinction is visible in the saved workspaces; the value judgment that it demonstrates adaptable systems thinking is an **INFERENCE**.

**FACT — recorded:** The local SEDP material quotes CEDA’s 8 October 2023 request for a comparison button using the Ecometer pattern. This is stronger evidence of intentional reuse than matching blue buttons. The recorded repeat engagement supports relationship continuity. Neither fact proves why CEDA rehired you or how much development time reuse saved.

Within the wider portfolio, this adds analytical semantics and dense desktop interaction to Khiladipro’s room-scale setup and event states. It does not need to compete with Khiladipro’s ownership narrative or repeat SEDP’s public-export outcome. Against the strategy’s Getmega systems story, its distinct contribution is adapting data representations across related products; it does not establish an equally complete component-state library.

## 4. The strongest decisions and artifacts, ranked

These are decisions **represented in the artifacts**. Unless separately sourced, the original rationale, alternatives and authorship of requirements remain unknown.

| Rank | Decision represented | FACT / evidence | Value and boundary |
|---|---|---|---|
| 1 | Explain a change in analytical meaning where it is selected | Ecometer growth-rate popover: absolute values, YoY/QoQ/MoM, explanation of percentage scale | Most distinctive Ecometer evidence. **INFERENCE:** supports informed transformation. **MISSING:** resulting chart and computational rules. |
| 2 | Keep exact observations beside the visualisation | Agrimarket default and map frames preserve summary/table while the right panel changes | Strongest combined UX/IA artifact. **INFERENCE:** reduces the need to switch contexts to inspect records. No measured reduction in effort. |
| 3 | Make plotted series manageable individually | Ecometer’s colour-linked series cards include retail/wholesale, visibility and remove controls; Add Chart configures a series | Strong analytical interaction evidence. A faded “Edible Oils” card depicts a visibility state. Persistence, click behaviour and cross-indicator compatibility are unverified. |
| 4 | Isolate one line while retaining surrounding context | Agrimarket hover frame shows the modal-price line prominent and other lines subdued | Concrete interaction craft. Original caption specifies 10% opacity; this is a recorded design specification, not a measurement or tested implementation. |
| 5 | Explain calculation context and provenance near use | Ecometer description/methodology popover; Agrimarket change tooltip says comparison uses the last available price | More valuable than generic “trust” language. The latter explicitly addresses unavailable intervening dates in the explanation, but does not prove a complete missing-data system. |
| 6 | Make the exported selection explicit | Agrimarket download modal shows commodity/geography/measure, date range, CSV/PNG/PDF choices and selected-format button | Shows continuation into another tool. Do not claim actual format availability, file fidelity or journalist adoption from this frame. |
| 7 | Adapt selection structure across products | Ecometer category-plus-configuration modal beside SEDP category-plus-results modal, supported by CEDA’s recorded request | Best system-evolution evidence. The pattern is adapted, not pixel-identical or proven to be one coded component. |
| 8 | Add textual anchors to a choropleth | Agrimarket high/low cards plus map and scale | Useful data-visualisation craft, but overlaps SEDP’s richer export readout. Keep as supporting evidence. |

The geography row is also worth annotating: State, District and Mandi are ordered, with the latter two disabled-looking at “All of India.” **INFERENCE:** the design suggests dependent geographical selection. **MISSING:** rules for enabling the fields and preserving/resetting selections. Do not turn the row into a fully verified drill-down story.

### Visual craft: what deserves credit

**FACT — artifact:** The work uses restrained panels, consistent type hierarchy, subdued grid lines, colour-linked chart controls, segmented view selectors and repeated selected-context labels. Agrimarket has a strong division between numerical summary/table and visualisation. Ecometer reserves most of the canvas for the chart while keeping series controls adjacent. Export actions are grouped by surface in the more developed Agrimarket frames.

**INFERENCE:** The craft is strongest as information hierarchy and interaction-state presentation. It is weaker as evidence of finished data accuracy or accessibility. The subdued text, colour coding and hover emphasis merit scrutiny; no contrast measurements or accessibility results were supplied. Do not declare accessibility either solved or failed from these stills.

The better visual argument is how hierarchy changes with the analytical job. A long gallery of similarly styled maps dilutes it.

## 5. Before/after evidence: compelling, but bounded

### The strongest genuine comparison is Agrimarket

**FACT — artifact:** The old entry capture contains explanatory text and separate Time Series, Heat Map and Data Download buttons. The second old capture contains Price/Quantity, commodity and time inputs, a Submit button, and no chart in the captured state. The redesign shows a selected commodity, price summary, historical table and populated chart together, with controls around them.

**INFERENCE:** The represented entry experience changes from selecting a route/configuration before seeing data to inspecting a populated analytical workspace. The table and chart give the reader something concrete to interpret and refine. This is a meaningful IA change, not merely new styling.

Three constraints matter:

1. **The old product already had charts, maps and downloads.** Its introduction explicitly describes them. Do not say the redesign made those capabilities possible for the first time.
2. **The comparison is not matched task-for-task.** The old configuration capture appears to be a single-time view; the redesigned default is a time series. Present this as a change in entry structure and workspace organisation, not proof of fewer clicks or faster completion for the same task.
3. **The after image is a design frame.** SEDP’s user-confirmed “everything shipped” statement applies to SEDP. It cannot silently establish Ecometer/Agrimarket shipping scope.

Best future presentation: the old entry and configuration states as a small sequence, then a large default workspace with the table and chart legible. Give the changed information relationships three annotations. An unannotated tiny before/after pair proves mostly appearance.

### Other comparisons have different evidentiary roles

- **Ecometer:** no old interface was found. Use a decision/state sequence, not a claimed redesign before/after.
- **Agrimarket normal versus isolated legend state:** demonstrates a represented interaction state, not product impact. The two saved frames also differ in footer treatment and moving-average wording, so they are not a perfectly matched interaction pair.
- **Ecometer versus SEDP modal:** shows pattern adaptation. It is not a usability test or proof that every part of the later design descended unchanged from the earlier frame.
- **Agrimarket time series versus map:** shows alternate representations with a persistent left panel, not a before/after improvement.

## 6. What overlaps SEDP, and what adds evidence

| Material | Classification | Treatment |
|---|---|---|
| Add/select-chart modal, with the 8 Oct 2023 request | Useful overlap: intentional reuse and adaptation | Keep the pair once, inside SEDP comparison. Explain the differences. |
| Chart-first entry in Agrimarket | Useful overlap: same principle applied to another domain | Short before/after supporting the table-plus-chart episode. Do not repeat SEDP’s full gate-removal argument. |
| Ecometer growth modes and per-series markets/visibility | Genuinely different analytical evidence | Restore prominently in the suite section. |
| Agrimarket table, temporal view, map and scoped export | Genuinely different workflow evidence | Preserve as one coherent episode, not four disconnected feature screenshots. |
| Legend isolation and last-available-price explanation | Different, concrete interaction/detail evidence | Keep readable crops next to the workspace. |
| Indicator provenance | Useful depth, overlapping SEDP context and sources | One supporting crop; no separate “building trust” chapter. |
| Heatmap with high/low cards | Useful but overlapping data-reading support | Small companion to Agrimarket’s workspace; SEDP keeps the main export-readout story. |
| Headers, blue outline buttons and common palette | Repetitive if treated as the system’s main proof | Compress to a small common/adapted inventory or brief caption. |
| Four-goal brief, team description, full testimonial, rehire | Repetitive storytelling | State relationship/scope once and keep one testimonial. |
| Sharing/social reach story | SEDP has materially stronger evidence | Keep SEDP’s implementation and publication evidence there. Do not transfer its outcomes to the earlier products. |

**Correction to the previous analysis:** Ecometer’s saved Add Chart modal has category browsing and two configuration dropdowns, but no visible search field. SEDP’s saved modal has search and a browsable results list. The recorded client request links the patterns; it does not prove Ecometer already had search. This difference makes the evolution more interesting, and the claim more precise.

Also narrow the earlier “every dashboard shares” statement: the pictured Agrimarket workspace does not have the Ecometer/SEDP left navigation rail, and Ecometer’s saved main frame does not show a heatmap panel. The evidence supports a common visual language and selected patterns, with differing compositions. It does not demonstrate one universal twelve-part system across all three, shared code, tokens, library governance or maintenance savings.

## 7. Evidence problems to resolve before presentation

These are limits of the supplied artifacts, not allegations about the shipped products.

| Finding | Classification | Consequence |
|---|---|---|
| Original case study says 2022–2023; old Agrimarket form displays 01/2024; redesigned frames display Aug/Sep 2024 | **FACT — artifact/recorded.** Frame provenance and real engagement dates are **MISSING** | Dates on sample data do not date the work. Could be later revisions, retrospective captures or placeholders. Do not choose an explanation or use these frames to prove a precise chronology. |
| Ecometer x-axis shows years through 2021; its range control shows 2004–2011 and duplicate 2008 handles | **FACT — artifact** | Strong interface structure, weak demonstration of working temporal behaviour. Label sample data; recover a coherent frame before making it a hero. |
| Agrimarket summary says ₹7,258.78 and +₹32.55 (+0.22%); previous displayed price is ₹7,221.27 | **FACT — artifact** | The visible difference is ₹37.51. Neither the stated change nor percentage matches the displayed pair. A “last available price” tooltip does not reconcile this consecutive-row example. |
| Several repeated prices have non-zero change values | **FACT — artifact** | Do not use these tables to demonstrate numerical correctness. |
| Normal Agrimarket frame says 7 Day Moving Avg; hover frame says 30 Day Moving Avg, with changed footer/source treatment | **FACT — artifact** | Avoid presenting them as an exact before/hover capture of one implementation. Recover matched states or label them design variants. |
| Agrimarket’s hover frame carries the Ecometer-style source line, unlike the default frame’s agricultural source | **FACT — artifact** | Treat as inconsistent design-frame content. Do not erase it and claim an untouched production capture. |
| Original body expands CEDA as “Center for Economic Development” | **FACT — recorded; contradicted by logo and other branch sources** | Use Centre for Economic Data and Analysis. |
| “Product Designer, UX Designer, Design Lead” appears alongside a one-designer team | **FACT — recorded** | Prefer the concrete scope and sole-designer role. The title list does not establish team leadership. |
| Dual-monitor cover contains an Ecometer export dialog absent from the flat frames | **FACT — artifact** | It suggests recoverable work, not verified behaviour. See recovery below. |

The cover image’s generation provenance is not established here. Regardless of how it was made, it is a presentation mockup and should not carry a production or interaction claim.

The repeat engagement is a **recorded fact**, but “this redesign caused the rehire” remains an **INFERENCE**. The testimonial records satisfaction; it is not usability research. Precise dates, launch scope, specific user feedback, adoption, time saved, conversion, research, considered alternatives and implementation tradeoffs for Ecometer/Agrimarket remain **MISSING EVIDENCE** in this review.

## 8. Central thesis and decision episodes

These are analytical propositions and episode plans, not finished portfolio copy.

**Central thesis:** Your strongest contribution here is structuring how readers inspect and interpret economic data: explicit series and transformation choices in Ecometer, complementary numerical and visual views in Agrimarket, and reusable interaction patterns that could be adapted for SEDP.

For Ecometer alone, narrow this to **making a multi-series chart’s selection, transformation and provenance understandable**. Do not force Agrimarket’s stronger before/after into a story labelled only Ecometer.

### Episode A — Make the chart’s analytical choices explicit

- **Known:** The original page identifies Ecometer as a high-frequency economic-data portal. The frames show categories, market variants and multiple series.
- **Choice represented:** Separate indicator navigation, per-series control, transformation selection and methodology context.
- **Evidence sequence:** main workspace → selected-series panel and Add Chart crop → growth-rate popover → small methodology crop.
- **Interpretation:** the reader can inspect what is plotted and how it is being expressed.
- **Tradeoff to discuss as an inference:** more analytical control also means more interpretive responsibility; the explainer helps orient the reader, but the design shown does not establish guards against inappropriate comparisons.
- **Missing:** original alternatives, who requested growth modes, a transformed chart, frequency/units constraints and production behaviour. Do not manufacture a debate or research story to fill these slots.

### Episode B — Keep records available while exploring patterns

- **Known:** Old Agrimarket separated entry routes and required configuration in the captured state. The redesigned frames show a table alongside time series or map.
- **Choice represented:** persistent summary/table; temporal or geographical view beside it; isolation for a crowded chart; selection context carried into download.
- **Evidence sequence:** old entry/configuration → large default workspace → legend-state pair/detail → compact map and download crops.
- **Interpretation:** the same workspace supports inspection of exact observations and broader patterns, then taking a scoped selection elsewhere.
- **Tradeoff to discuss as an inference:** simultaneous table and chart reduce the space available to each and suit a wide desktop canvas; multi-line reading relies on colour and the represented hover treatment. No responsive/accessibility resolution is established.
- **Missing:** matched task output from the old product, rationale for the default/table emphasis, matched normal/hover states, export output and shipping scope.

### Episode C — Extend a pattern without freezing its structure

Keep this **inside SEDP’s existing comparison episode**, not as a third new suite chapter.

- **Known:** the recorded CEDA request refers to Ecometer; the two saved modals share category browsing but offer different content and search.
- **Choice represented:** category-plus-configuration becomes category-plus-searchable-results for SEDP’s selection task.
- **Evidence:** both modal crops and the dated client request, once.
- **Boundary:** supports requested reuse and visible adaptation. It does not prove reduced build time, shared component code, or that these exact frame versions were the ones reviewed in October 2023.

## 9. Final-form decision

| Form | Assessment |
|---|---|
| Standalone secondary case study | Enough visual work to fill one, but presently weak independent process/outcome evidence. Would restart much of the same CEDA context. Not the strongest use of attention today. |
| Short focused case study | Viable runner-up, particularly for analytical/B2B roles. It would need a tightly bounded thesis and clear design-versus-shipped status. Better if independent decision evidence is recovered. |
| Substantial section inside SEDP | **Recommended.** Preserves different analytical tasks while attaching them to the strongest documented CEDA work. |
| Compact suite / before-after section | Too compressed if it retains only matching chrome and the dramatic transformation. This is approximately the current problem. |
| Full combined three-project flagship | Could become an overlong engagement chronology. Keep SEDP’s existing decision spine and give the other two named, substantive supporting episodes. |

Aim for roughly **600–850 words of added/reworked suite analysis**, plus captions and source detail, replacing the current coda rather than layering another gallery underneath it. Keep Ecometer and Agrimarket named and directly linkable. SEDP remains the flagship entry point; its metadata must distinguish its own team/window/shipping claims from the earlier products.

A short standalone study should be reconsidered if recovery produces both a concrete Ecometer/Agrimarket decision-change episode and convincing production or usage evidence around its distinctive analytical workflow. A complete earlier/new design pair may also materially strengthen that option. More screenshots of the same final state alone would not change the recommendation.

## 10. Exactly what survives, and where

All originals should remain archived. “Cut” below means omit from the public narrative, not delete source evidence.

| Original asset | What survives | Location and weight |
|---|---|---|
| [Ecometer main — e6f9dcfb](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/e6f9dcfb_1._Main.png) | Chart, selected-series panel, market labels, visibility state | Suite Episode A: primary workspace. Crop browser chrome; label design/sample data until replaced. |
| [Add Chart — 0b119b0f](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/0b119b0f_2._Add_Chart.png) | Category browsing plus series configuration | SEDP comparison episode beside its modal. Episode A references that example; no second full-size copy. |
| [Growth rate — 0849b72d](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/0849b72d_3._Chart_Growth_Rate.png) | Absolute/growth choices and explanation | Suite Episode A: prominent readable detail. This is essential restored evidence. |
| [Description — e4652152](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/e4652152_4._Chart_Description.png) | Indicator definition and methodology path | Episode A: small supporting crop, without repeating the entire dimmed workspace. |
| [Old entry — e0b09fb2](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/e0b09fb2_before1.png) | Separate routes and explanatory entry | Suite Episode B: small but readable first step in the before sequence. |
| [Old configuration — 981dbc44](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/981dbc44_before2.png) | Inputs and Submit before a populated chart | Episode B: second before step, with unmatched-state/date limits acknowledged. |
| [Agrimarket default — 27977c07](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/27977c07_1._Default_View.png) | Persistent table, chart, geography hierarchy and change explanation | Episode B: large central artifact. Annotate relationships, not every control. Recover coherent sample or real values. |
| [Legend state — 66609919](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/66609919_4._Hover_on_Modal_Prices_Legend.png) | Prominent modal-price line with others subdued | Episode B: matched detail pair if recovered; otherwise labelled design-state example. Essential restored interaction evidence. |
| [Map — 74b2db68](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/74b2db68_Map_View.png) | Persistent table plus different right-hand representation, high/low cards | Episode B: supporting alternate-view figure. Show enough left panel to prove continuity; current map-only crop loses that argument. |
| [Download — 3a8ce847](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/3a8ce847_3._Download_Modal.png) | Selection scope, dates, format and action | Episode B: small final step/crop. Complements SEDP’s public export with the analytical extraction task. |
| [Presentation cover — 6f3ae320](/Users/priyank/Documents/portfolio-website/assets/images/ecometer/6f3ae320_ceda2.jpg) | No main-path claim; preserve only as source/recovery lead | Omit from evidence narrative. Recover its Ecometer export dialog as a flat original if available. |

**Keep:** original before captures, both task-specific workspaces, modal reuse with dated attribution, one client testimonial, the relationship fact with careful chronology.

**Cut:** duplicate four-goal brief, title stack, generic “simple-to-use” claims, emoji gallery scaffolding, repeated rehire/outcome sections and a second social-sharing success story.

**Compress:** matching headers/actions into a small note or inventory. Reduce the repeated SEDP/Agrimarket map comparison; the Agrimarket map earns space for preserving its table and adding a different view, not simply looking similar.

**Restore:** Ecometer growth/provenance controls, Agrimarket table emphasis, the last-available-price explanation, legend isolation and scoped download. These are retained on disk but absent or unexplained in the current merge.

**Emphasise:** system adaptation and interpretable analytical controls. Mention the relationship near the SEDP summary and outcome, without presenting the before/after as the cause of rehire.

## 11. Structure for two reading depths

### Recruiter skim: approximately 60–90 seconds for the suite evidence

1. **SEDP summary:** retain its main problem, role and strongest production evidence. Add a concise pointer to Ecometer/Agrimarket as related work with different analytical tasks, without folding their scope into “everything shipped.”
2. **SEDP comparison:** the Ecometer/SEDP modal pair and dated request communicate deliberate reuse in one glance.
3. **Named suite section after SEDP’s export episode, before outcome:** two visible decision summaries, with Ecometer’s workspace/growth control and Agrimarket’s before/default workspace as the primary figures. Make the section reachable from navigation and the existing legacy anchor.
4. **Shared outcome:** relationship continuity and testimonial once; keep SEDP publication evidence explicitly attributed to SEDP.

The skim should communicate three capabilities without requiring disclosure clicks: analytical choices made explicit, records kept beside patterns, patterns adapted between products.

### Design-manager read: another 3–5 minutes within the SEDP story

Use the same path, with depth immediately beside each artifact:

- Episode A: selected-series state → transformation explanation → methodology, with one clearly labelled inference about the control/interpretation tradeoff.
- Episode B: before-state limits → table/chart architecture → geography and change explanation → legend isolation → alternate map → scoped download.
- SEDP comparison episode: precisely what was reused and what differs, anchored in the dated request.
- Compact evidence note: frame provenance, product-specific shipping status and remaining outcome limits. Optional disclosures can hold additional source details, not the growth selector or table/legend evidence.

Do not make the manager traverse a second complete client introduction, browse ten undifferentiated screenshots, or infer the important distinction from a row of identical buttons. Do not lead SEDP chronologically with all earlier work; its strongest documented decisions should still arrive first.

## 12. Only recovery worth doing before implementation

1. **Scope and chronology, in one short record.** Confirm when Ecometer and Agrimarket were designed, which frames are later revisions, which named workflows shipped, and whether they preceded SEDP as shown. Existing emails/invoices or a precise author account may suffice. Resolve what the 2024 dates signify without assuming they date the engagement. This controls the relationship story and all “shipped” captions.
2. **A small coherent artifact set.** Recover Ecometer’s main chart plus one actual growth result; Agrimarket’s default and matched isolated-legend state; the scoped download dialog and one representative output. Prefer dated production evidence when available, otherwise clean original design frames explicitly labelled. Preserve historical originals; any later correction must be identified as such.
3. **One real decision-change episode.** Focus memory/Figma comments/email on the highest-value questions: why the persistent table/default time series, why these growth modes, or what a reviewer/developer changed about selection/export scope. Recover the initial proposal, specific input, resulting change and your part. Do not collect generic process documents or invent alternatives after the fact.
4. **The Ecometer export original visible only in the cover.** Its dialog visibly includes options about hidden charts and the selected timeframe. If authentic, a clean original plus clarification of the defaults could add unusually useful evidence about visible versus exported data. The mockup alone is insufficient, and this is optional rather than a blocker.
5. **One direct use signal, only if readily available.** A concrete reader/client example of using the table, transformation or download would be more valuable than another broad testimonial. Keep it attributed. If none exists, state that limit and proceed; do not start an open-ended analytics or retrospective research hunt.

No need to recover every screen, every meeting, a new process diagram, another decorative hero, or all historical dashboard variants. The aim is to establish status and strengthen the two distinctive episodes.

## 13. The three highest-leverage next actions

1. **Settle shipping scope and chronology for Ecometer/Agrimarket.** Create one product-by-product record covering dates, later frame revisions and what was actually built. Keep SEDP’s existing shipping confirmation separate.
2. **Recover the two strongest proof sequences.** Ecometer selection → growth control → real/coherent transformed result; Agrimarket populated table/chart → matched legend isolation → scoped export. Add one genuine decision-change record if available, prioritising these workflows.
3. **Revise the SEDP content outline before touching layout.** Replace the suite coda with the two named episodes, retain the modal evolution once in comparison, and use the asset-preservation table above as the implementation checklist. Reconsider a short standalone study only if recovered evidence materially strengthens its independent story.
