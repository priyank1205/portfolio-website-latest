# Mega Poker — evidence and case-study analysis

20 September 2026 · Analysis before writing or redesign. Website and source assets unchanged.

## 1. Recommendation

**Mega Poker deserves a substantial standalone case study. Retain all four work areas in the main reading path, organised into three decision episodes.** Its strongest evidence is your ability to translate financial rules and commercial incentives into concrete product interfaces: balances with different uses, offers with conditions, transfer choices, withdrawal limits and processing states, and tournament selection. The visual execution makes those mechanisms inspectable. The work deserves more than a short retention anecdote or a gallery appended to Getmega.

The strongest central thesis, as an analytical direction rather than finished portfolio copy, is:

**Designing the decisions around committing, reallocating, and withdrawing money in an existing poker product, while working within inherited product rules and visual languages.**

This thesis accommodates product thinking, UX, interaction, visual design, and practical constraints. Business–user tension is an important part of it. The available evidence does **not** establish that you resolved that tension in users' favour, originated the commercial mechanism, or made the product demonstrably safer. Do not make an ethical victory the premise of the case study.

My assessment differs from the earlier strategy in two material ways:

- The tournament and add-cash work should remain decision episodes, not be demoted simply because Getmega also contains tournaments and wallets.
- Four minutes is an arbitrary ceiling. Aim for a 60–90-second recruiter route and approximately a 6–8-minute design-manager read, with optional deeper artifact inspection. Allocate space according to evidence, not the secondary label.

Mega Poker can remain fourth in the general portfolio order. That order manages attention and domain range; it does not imply a small project. The project is particularly useful evidence when a reviewer wants to inspect consumer transaction design and mobile UI craft.

## 2. Sources, evidence labels, and corrections

**FACT — artifact** means directly visible in an inspected image, source file, or working note. **FACT — reported** means the portfolio or a recorded statement by Priyank says it; it is not independently verified production evidence. **INFERENCE** means a reasoned interpretation of those facts. **MISSING EVIDENCE** means the reviewed material cannot establish the claim. Recommendations are editorial judgments, not historical facts.

### Material reviewed

Read the four requested documents first: [portfolio strategy](portfolio-strategy-2026-09-14.md), [Khiladipro analysis](khiladipro-flagship-analysis-2026-09-19.md), [Getmega analysis](getmega-flagship-analysis-2026-09-19.md), and [SEDP analysis](sedp-flagship-analysis-2026-09-19.md). Their recommendations are context, not instructions overriding the present request.

Then inspected:

- [Current Mega Poker page](../projects/mega-poker.html) on `codex/khiladipro-product-story`, including its uncommitted state; the original page at git commit `7311780`; the narrative rewrite at `30e92af`.
- Every one of the 15 files in [the Mega Poker asset directory](../assets/images/megapoker/). There are 12 unique design-screen exports, one old-product capture, one presentation mockup, and one exact duplicate of a withdrawal export. The page shows those 12 designs and the old capture as 13 numbered figures, plus the mockup hero.
- The [current Getmega page](../projects/getmega.html), its relevant wallet, payment, contest-state and leaderboard artifacts, and the [later Getmega blueprint](getmega-case-study-blueprint-2026-09-19.md).
- The [Notion portfolio source](https://app.notion.com/p/709ded138bca83efbe69819533a6932c) and the [working withdrawal brief](https://app.notion.com/p/1cd2435b2bc443ec82463fde7c8a1f4d). These supplement the branch material and help distinguish original scope from later portfolio interpretation.

The working brief links to [March'24 Designs in Figma](https://www.figma.com/design/z3lIbOCfZ1Us6rfDB08wxC/March-24-Designs?node-id=0-1) as the reference for the new language. A read attempt returned an access error. I did not inspect its frames, component library, prototype behaviour, or version history. It is not established that this reference file contains the entire delivered work.

This was an analysis of the sources and exported interfaces, not a production usability test, accessibility audit, legal review, or fresh verification of company availability.

### Corrections already recorded in the branch

**FACT — reported:** Section 0 of the later Getmega blueprint records Priyank's corrections: Mega Poker was a substantially restructured company with a different CEO, previously Getmega's Growth Head, who contacted Priyank directly. The engagement was a monthly retainer, roughly 20 hours a month in approximately week-long sprints over three to four months. The current Getmega page uses the narrower “a few months on a monthly retainer.”

Use that account rather than the earlier analysis's “same company rehired me” conclusion. A legacy Notion folder named Getmega does not override the subsequent explanation. The useful signal is that someone familiar with your work sought you out for a later brief. Keep the case studies separate and cross-link them once. Do not increase the portfolio's rehire count on this basis.

**FACT — reported:** The old Mega Poker page and Notion metadata say two months. That conflicts with the later correction. Do not market this as 50+ screens in two continuous months. Exact calendar dates remain unresolved; there is no need to recover them merely to state the retainer accurately.

### What the working brief adds

**FACT — artifact:** The working note requests better withdrawal communication, use of an already specified new language, self-transfer within instant and TDS flows, UPI, penny check, two delayed-summary variants, limits on the first screen using a shared WhatsApp video as reference, and an information button opening a TDS-calculation sheet. It explicitly excludes KYC flows. A scope-compilation task is checked; most listed tasks are unchecked. That is a scope record, not a completion ledger.

**FACT — artifact:** A “To Discuss” note questions the word “Stage” because it implies progress to a next stage. This is a small trace of attention to the mental model. Its author, resolution, and exact screen are not established. Do not inflate it into a stakeholder disagreement or a shipped copy change.

**MISSING EVIDENCE:** The reviewed portfolio source does not show alternatives, research, observed user behaviour, a consequential review change, or measured results. Its self-transfer explanation says the business wanted bonus nudges. The stronger ethical reframing appears in the later HTML narrative, without a corresponding decision record in the earlier source.

## 3. What Mega Poker most strongly proves

| Capability | Evidence | What a reviewer can reasonably conclude | Boundary |
|---|---|---|---|
| Product translation | Bonus placements at table exit, wallet and withdrawal; amount-dependent transfer tiers; tournament information exposed before entry | **INFERENCE:** you can translate commercial mechanics into choices at relevant points in a journey | Mechanism ownership, targeting rationale and effectiveness are not established |
| Transaction UX | Deposit breakdown by destination; withdrawal allowance and limits; requested versus net amount; processing tracker | **FACT:** the designs address the meaning and status of money, beyond payment form styling | Some exported numbers and terms contradict the clarity claim; comprehension is untested |
| Interaction design | Presets plus custom entry; offers with eligibility states; sheets; slider tiers; filter categories and values; processing stages and next actions | **FACT:** several distinct interaction patterns exist across a coherent product scope | Static exports do not prove live recalculation, gestures, timing or full branch behaviour |
| Visual design | Strong monetary hierarchy, grouped cards, amount alignment, sheet hierarchy, restrained illustration, accent differentiation | **INFERENCE:** this is among the portfolio's strongest mobile UI execution | The new visual language was already locked; brand/system authorship is not yours to claim without more evidence |
| Systems thinking | Repeated amount → adjustment → destination → total structures; a brief spanning verification, limits, speed and fees | **INFERENCE:** financial rules were considered across surfaces | This is not yet evidence of a component library, token system, or all 50+ screens |
| Ownership and collaboration | Sole designer, PM collaboration and weekly CEO updates in the source; later direct invitation recorded in the branch | **FACT — reported:** substantial individual design responsibility and an existing professional relationship | No concrete influence or tradeoff episode is documented; “team of three” describes named collaborators, not necessarily the whole delivery team |

### Its contribution to the portfolio

**Khiladipro** supplies the unusual physical interaction constraint and setup-to-competition work. Mega Poker adds precision around financial commitment and movement of funds. Both can show end-to-end surface ownership; that overlap reinforces reliability.

**Getmega** supplies duration inside a changing product, core gameplay transitions, a visible card-state system, and turn continuity. Mega Poker adds a later, bounded engagement with deeper withdrawal mechanics and more refined transaction surfaces. That is additional evidence of domain depth rather than an automatic duplicate.

**SEDP** supplies dense information architecture, traceable client feedback, and published output use. Mega Poker supplies a different information-design problem: what a displayed total means when its parts have different uses and restrictions. Do not imply it has SEDP's documented decision history or production proof.

The present strength is execution with product specificity. Research-led validation, measurable impact, influence under disagreement, and responsible-play outcomes remain unproven. A strong case study can be honest about this without repeating a disclaimer in every chapter.

## 4. Strongest work and the episodes it should carry

### Episode 1 — Withdrawal choices and self-transfer across the journey

**Recommendation:** Make this the central episode, combining the current self-transfer and withdrawal chapters. The offer is encountered at different moments within the same financial decision. Show the difference between those moments rather than restating “keep money in play” three times.

**FACT — artifacts:**

- [Leave-table sheet](../assets/images/megapoker/de8e9607_Leave_Table_Popup.png): celebration, profit amount, offer, transfer destination, bonus destination, total and CTA in a clear sequence.
- [Wallet](../assets/images/megapoker/4780d26a_Wallet_dark_theme.png): playable balance groups deposit and winnings, with bonus separately contained; the transfer offer sits beneath winnings.
- [Transfer sheet](../assets/images/megapoker/71d5db41_Wallet_dark_theme-1.png): 5%, 10%, and 20% tiers above an amount slider; principal and bonus separated in a calculation panel. Its ₹8,100 + ₹810 = ₹8,910 example is internally consistent.
- [Withdrawal entry](../assets/images/megapoker/16250962_TDS_free_withdrawal.png): available winnings, minimum, TDS-free amount, daily count, maximum and a disabled Continue button before input.
- [Withdrawal counter-offer](../assets/images/megapoker/ef645c15_3._Payout_Options-1.png): ₹900 requested, ₹100 deduction and ₹800 net, followed by a deposit-transfer option and a visible withdrawal alternative.
- [Submitted request](../assets/images/megapoker/4b31c272_3._Payout_Options.png): request received, support review, processed; an order ID, destination, 4–6-hour estimate, FAQ access, instant-withdrawal and cancellation controls.

**INFERENCE:** The strongest design idea is coordinating transaction choice with its consequences: where money moves, what incentive is attached, and what happens after a request. The post-submission state is particularly strong UX evidence because it distinguishes a received request from completed payment. The leave-table sheet is strong composition and placement evidence, but is not sufficient by itself to prove superior judgment.

**Decision attribution:** The source establishes that bonus nudges were part of the brief. It establishes the designed leave-table placement, but not who proposed it or what alternatives were considered. Attribute your work to interaction, presentation and flow design until the origin of the placement is recovered.

**Business–user tension, explicitly bounded:**

- **FACT:** The client wanted less money withdrawn. The offer increases in-product value by allocating funds to different balances.
- **INFERENCE:** A user choosing cash-out may value control and liquidity more than a larger in-product total. The shown bonus is not equivalent evidence of a better outcome for that user.
- **FACT:** The withdrawal alternative is visible. It is smaller and less prominent than the large Continue button; the transfer option is shown selected. The image does not establish whether that selection is the initial default.
- **FACT:** The wallet says “Check menu for withdrawal options,” while Transfer has its own visible button. A close icon on another sheet does not prove equal discoverability or an exit in one tap throughout the product.
- **MISSING EVIDENCE:** What happens after decline, whether the intercept recurs, complete bonus restrictions, whether transfer is reversible, production timing, and any responsible-play safeguards or review.

Present these as limits of the evidence and, where appropriate, a retrospective critique. Do not claim you rejected obstructive alternatives unless you remember doing so. Do not claim safeguards existed because the portfolio now says they should have existed.

**Recovery that would deepen this episode:** the original withdrawal board, particularly UPI and penny-check states, the fee/speed variants and TDS explanation. These could turn a few attractive screens into an evidenced financial-flow system. Recover representative branches, not every screen for display.

### Episode 2 — Deposit offers with different destinations for money

**Recommendation:** Keep a compact main-path episode with the amount selection and summary visible together; use the offer states as a supporting detail.

**FACT — artifacts:** [Amount selection](../assets/images/megapoker/b0ce1de6_500_selected.png) combines presets, custom amount, applied offer/removal, summary access, payment method and charge. [Payment offers](../assets/images/megapoker/3eeb2c0a_Payment_Offers.png) shows an available and an unavailable offer with an activation condition. [Deposit summary](../assets/images/megapoker/d99a89c2_500_Deposit_Summary.png) separates GST, cashback into deposit and bonus into locked bonus.

**INFERENCE:** This is a more substantive problem than styling an add-cash form: a headline total aggregates funds with different uses. Separating adjustments and destinations is the valuable information-design work. It is useful overlap with Getmega because the actual calculation and restriction model is different from merely listing balances or selecting a payment method.

**Important distinction:** The payment-offer card's minimum-deposit condition concerns eligibility to apply an offer. It does not explain how money already in the locked-bonus balance becomes usable. The current heading “Locked offers say how to unlock them” should not stand in for evidence of the latter.

**Tension:** “Pay ₹500, get ₹750” can be persuasive while concealing the practical difference between ₹500 deposit and ₹250 locked bonus until the breakdown is opened. The breakdown makes the distinction visible there; it does not establish comprehension or that every user saw it before payment. The current source has substantial consistency problems, listed below. Keep the design problem and evidence, but remove absolute claims that the arithmetic was always complete or correct.

**Visual work worth showing:** selected-state border and checkmark; repeated principal amount; aligned signed rows; indented destination labels; divisional rules; the relationship between summary and final payment action. Show these details rather than praising “premium UI.”

### Episode 3 — Tournament discovery and entry decisions

**Recommendation:** Keep a full main-path before/after episode. This is the strongest immediate visual demonstration of a substantial redesign and prevents the case study from becoming a narrow retention story.

**FACT — artifacts:** The [old capture](../assets/images/megapoker/71340e2f_PHOTO-2024-07-05-16-48-50.jpg) shows repeated Freeroll listings with prize, time, participant counts and Register buttons. The [new list](../assets/images/megapoker/157dd30a_Tournament_Tab_45.png) shows game controls, Filters, Sort By, late-registration grouping, Live badges, prize pool, first prize, game type, a wallet label, participation count/capacity and a ₹30 action. A [filter sheet](../assets/images/megapoker/0ace83e5_Tournament_Tab_44.png) shows Entry Fee and Wallet as categories on the left and wallet values on the right. [Completed details](../assets/images/megapoker/81036f81_Completed_Tournament_Details.png) groups times, entries, late registration, re-entry, breaks, stack and blind structure, with tabs for prizes and ranking.

**INFERENCE:** The redesign brings more of the entry decision into the list and separates scanning, filtering and detailed inspection. It demonstrates product IA as well as visual hierarchy.

**The visible tradeoff:** The old capture fits roughly five tournament rows; the new design fits one complete card and part of the next beneath its banner and controls. More information per tournament reduces list density. This is an observed cost, not evidence that you deliberately debated it or that players preferred the result. It is a useful design-manager discussion if you can recall why that balance was chosen.

**Correct the current narrative:**

- The old sample is explicitly Freeroll. “Price was hidden” is not established by comparing its Register buttons with paid entries in the redesign.
- The old cards already show time and participant counts. Explain the added state and capacity information rather than claiming the old list had no useful detail.
- The new screenshot still repeats a tournament card. It does not demonstrate multiple differentiated tournament identities.
- A trophy-associated “40%” is visible. Its meaning is not sufficiently labelled to call it a user's odds of winning. Confirm the rule or avoid interpreting it.
- “Winnings” is shown on the card. Whether this identifies the payout destination, eligible entry wallet, or another rule needs confirmation; the page currently assumes payout wallet.
- The filter is a category-and-options pattern, not “entry fee on one side, wallet type on the other.” The entry-fee options and complete interaction are not shown, so “two taps” is unsupported.
- The source reports a fixed-header constraint, but the old and new whole-screen headers and navigation differ visibly. State the reported scope constraint; do not caption this pair “header untouched” as visual proof. Recover the exact starting version only if preserving the shell becomes a central claim.

**Visual work worth showing:** the move from compressed rows to grouped cards, alignment of prize and action, separation of identity/state/data/action, relationship of teal status and copper emphasis, and the details sheet's typographic hierarchy. The larger cards have a real cost; acknowledging it strengthens the analysis.

### Systems and visual craft across episodes

**FACT:** The source says the new language was locked before this engagement, with some flows assigned to the old language and some to the new. The exports share dark surfaces, rounded containers, monetary hierarchy and sheet structures, while accent and control treatments vary.

**INFERENCE:** You show adaptability inside an inherited product and repeatable patterns for financial information. The useful systems story is how common rules were expressed across screens and contexts. It is not yet a claim that you designed a new brand or a formal multi-theme system.

**Recommendation:** Show three or four annotated details within the episodes, not a separate aesthetic gallery that repeats the same screens. If a reusable component board or branch map survives, it can add evidence. Do not retroactively construct one and present it as a historical artifact. A newly prepared explanatory diagram must be labelled as such.

## 5. Export and claim discrepancies to resolve

These are observed facts about the portfolio assets. They do not prove that production had the same defects. Do not silently correct an export and then imply it is the original shipped screen.

| Artifact / claim | Finding | Consequence for the case study |
|---|---|---|
| Leave-table calculation | ₹1,248.50 + ₹250 = ₹1,498.50; the displayed total is ₹1,508.50. Also, exactly 20% of ₹1,248.50 is ₹249.70, so the ₹250 line requires a rounding rule | Recover the correct original; do not lead with “show the math whole” over this export |
| Deposit summary | Rows use ₹500 and ₹750; the button says Pay ₹200; the dimmed background selects ₹200; the offer says GETM200 while the selection screen uses GETM500 | The artifact directly contradicts “the number on the card and the number on the button never disagree” |
| Unavailable offer | Activation text requires ₹500; the lower description says deposit ₹200 or above | The reusable eligible/ineligible pattern is strong, but the condition is inconsistent |
| Withdrawal counter-offer | ₹900 − ₹100 = ₹800 is internally consistent; a ₹45 bonus has a separate Apply Now action while the total remains ₹900 | Do not say the extra bonus has already been applied or assume the ₹100 calculation is legally validated |
| Summary terminology | Source text calls deposit tax TDS; the image calls it GST; withdrawal image calls TDS “fees” | Describe what the historical UI labels show. Recover product calculation rules before explaining tax correctness or savings |
| Wallet / transfer pair | The wallet has ₹0.90 winnings; the transfer sheet displays a much larger range and amount | These are separate example states, not one numerically continuous recorded session |
| Transfer slider | One static state exists; its export shows no visible confirmation action | Show tiered amount selection, not a verified animation or a complete executable flow |
| Tournament variants | The list and filter-sheet background have different controls/groupings; the new list highlights Refer in the bottom navigation | Establish final versus variant before showing a continuous sequence |
| Header constraint | The reference capture and new design have visibly different headers | Do not claim the pair proves unchanged surrounding UI |
| Dates | The submitted-request example says August 2023; completed-tournament content says July 2024 | UI sample dates are not engagement timestamps |
| Unused asset | `5a52378b_3._Payout_Options-1.png` and `ef645c15_3._Payout_Options-1.png` are byte-identical | Do not restore the former as an additional state or alternative |
| Hero | The file is named `ChatGPT_Image_Apr_22_2026_05_03_37_PM.jpg` and is a device presentation image | Use actual design exports for primary evidence; do not treat the mockup as production proof |

**Other claims requiring restraint:**

- **50+ withdrawal screens:** FACT — reported in the source. Only three unique withdrawal-specific exports are present locally. The brief supports breadth of requirements; it does not independently count completed screens. Keep the number as your reported scope, preferably paired with an inventory, not as proof of comprehensive state coverage.
- **All four flows shipped:** the later HTML scorecard says so; the original source describes designs. Current evidence does not independently separate delivered, approved and implemented work. Preserve the distinction and seek a bounded confirmation, rather than assuming either that it shipped or that it did not.
- **Every exit one tap away; staying worth more:** unsupported globally, and too strong given the visible navigation and different balance types. Delete these absolutes.
- **Fast exit:** a processing estimate is visible, but no measured completion time or complete path is available.
- **Shutdown caused by a ban:** the reviewed source asserts it; no primary evidence was recovered here. The earlier analysis's app-listing-removal argument also does not prove a shutdown date or its cause. Omit the causal claim unless directly sourced. Missing analytics does not require a shutdown explanation.
- **A/B test “before full rollout, not after”:** the page's reflection can imply a test happened later. No such test is documented. State a prospective test only, if retained.
- **Failed and pending states:** one pending/review design exists. The page's broad reflection does not establish exactly which other states were omitted. Recover coverage before claiming either exhaustive handling or a specific implementation gap.

The point of these corrections is to let the work carry an appropriately strong claim. Numerical correctness, balance meaning and action hierarchy are integral to the transaction-design argument, so they deserve more attention than decorative refinement.

## 6. Getmega overlap: preserve evidence, remove repeated arguments

| Product area | What Getmega demonstrates | What Mega Poker adds | Treatment |
|---|---|---|---|
| Wallet | Balances as context for joining a live table; cash and pass structures | Reallocation of winnings, separate bonus destination, relation between offer and withdrawal | Keep Mega Poker wallet with transfer context; explain its balance model briefly once |
| Add cash | Payment choices, insufficient-balance copy, reward at deposit success | Offer eligibility and adjustment/destination breakdown before payment | Keep the main-path episode; skip generic explanation of why payment clarity matters |
| Tournament cards | Contest lifecycle across thirteen visible states | Selection hierarchy, price on action, filters, capacity, and a before/after list | Keep the redesign episode; do not call it another thirteen-state system |
| Tournament detail | Live status, rank, turn continuity and return to play | Selection and completed-event inspection | Keep the details sheet as supporting breadth, without repeating an MTT lifecycle tour |
| Retention | Tasks, milestones, timed claims and scratch cards over repeated visits | Transfer incentives at specific money decisions | Show placement and financial consequences; avoid another general loyalty narrative |
| Slider | Animated value lifting above the thumb during buy-in | Amount-dependent transfer tiers and separate principal/bonus totals | Keep both: different interaction evidence. Mega Poker motion remains unverified |
| Sticky player rank | Visible, inspectable Getmega artifact | Notion mentions a Mega Poker sticky-row image missing from the branch | Optional supporting recovery only; no new chapter unless it adds a materially different behaviour |
| Visual change | Work across product models and eras | Application of inherited styles within one scoped engagement | Keep the practical constraint; do not claim the later work is a direct before/after evolution of the earlier product |

The current Getmega page already reduces the wallet to a small supporting figure. The earlier audits' description of two full competing wallet chapters is therefore no longer accurate for this branch. There is no need to cut Mega Poker to solve repetition that has already been reduced elsewhere.

Use the same test everywhere: **does the second example show a different rule, interaction, constraint, or visible level of execution?** If yes, retain it. If it only repeats “money requires trust,” compress the prose, not the artifact.

## 7. Keep, cut, compress, restore, emphasise

| Action | Recommendation |
|---|---|
| **Keep** | All four work areas; tournament before/after; transfer placement and tiers; deposit breakdown; withdrawal limits and processing tracker; sole-designer scope and named collaborators |
| **Cut** | “Leak” as the user's problem; unsupported ethical reframing; “every exit” and “all arithmetic” absolutes; claims of demonstrated odds, fast withdrawal or comprehension; causal shutdown explanation; generic trust aphorisms; duplicate withdrawal export |
| **Compress** | Product introduction and three-wallet explanation to one short block; visual-migration explanation to one sourced note; repeated offer explanations into one journey; screen-count and outcome limitations to one occurrence each; completed tournament details to a compact supporting figure |
| **Restore** | Working-brief scope and KYC exclusion; later retainer/relationship correction; representative missing withdrawal branches if recoverable; limits/TDS explanation as product work rather than background; stronger separation of original source statements from later narrative |
| **Emphasise** | Actual transaction choices; where each balance goes; the post-submission state; tournament density tradeoff; concrete UI hierarchy; what was supplied by the product team versus designed by you |

The source contains a missing sticky-leaderboard reference. Treat it as a candidate, not an automatic restoration priority: Getmega already proves that pattern well. Conversely, UPI verification and withdrawal fee/speed branches are worth seeking because they could materially expand what Mega Poker proves.

The visual-language constraint should stop being an apology. It can explain why the work spans different treatments while showing your design contribution within each. Keep responsibility bounded: application and flow craft are already valuable.

## 8. Recommended size and reading structure

### Substantial enough to show the work

Retain the substance of the existing 12 unique design exports, using primary figures and purposeful details rather than repeating full-screen images. A sensible initial budget is approximately 1,200–1,600 words including substantive captions, plus optional state inspection. That is an editorial budget, not a requirement to fill space. Screens take time to inspect, so the deep read can reasonably be six to eight minutes even with restrained prose.

If the withdrawal board supplies real branches and one review or iteration, extend that episode. If it does not, show exactly the available set and name its boundary. Do not build a fifty-thumbnail wall merely to substantiate a count.

### One structure, two reading speeds

| Section | Recruiter skim | Design-manager depth |
|---|---|---|
| Summary | Specific scope, sole designer, Android, 2024 retainer, familiar former colleague's invitation | PM/CEO collaboration and inherited-rule/style boundary; delivered/production distinction |
| Opening artifact | Actual tournament before/after with two or three observable changes | Added decision information and lost list density; avoid false paid-versus-free price comparison |
| Central episode: withdrawal and self-transfer | Amount, destination, bonus and request status across a few selected screens | Limits → deduction/transfer choice → processing; leave-table and wallet entry points; fee/speed and verification branches if recovered; unresolved choice asymmetry |
| Deposit episode | What ₹500 buys and where the extra amount goes | Presets/custom input, offer eligibility, adjustments and balance destinations; corrected, consistent example values |
| Tournament episode | Price, state and format made visible in the list | Annotate the opening pair rather than repeat it; filters, completed details, information density, fixed-scope constraint |
| Delivery and outcome | Scope delivered as reported, with implementation status stated accurately | One recovered change or review if available; no invented impact; concise remaining limits |
| Cross-link | Getmega as earlier work | Relationship accurately described, with no merger or inflated rehire claim |

The opening tournament pair is a visual preview; its detailed analysis belongs in episode 3, linked rather than duplicated. The most distinctive financial work still receives the greatest narrative weight.

**Recruiter route, 60–90 seconds:** summary → opening pair → three episode conclusions and their primary artifacts → delivery boundary. It should demonstrate breadth without requiring the reader to open an accordion or understand poker strategy.

**Design-manager route, six to eight minutes:** inspect the transfer/withdrawal choices, trace one internally consistent deposit example, inspect tournament hierarchy and its cost, then read the scope and evidence limits. Optional detail can hold extra branches or working-note excerpts. Essential evidence should be visible in the main path.

No generic research/persona/ideation/testing chapter is needed. For each episode use only the slots the evidence can fill: brief or rule → design choice visible in the artifact → consequence or tradeoff → evidence limit. Add alternatives, feedback and results only when actually recovered.

## 9. Evidence worth recovering before implementation

This is a bounded recovery list. New research conducted today cannot establish the historical rationale, and a newly invented alternative cannot prove past exploration.

| Priority | Recover | Why it changes the case study | If unavailable |
|---|---|---|---|
| **1** | The actual withdrawal delivery board/flow and final exports: representative UPI setup, penny check, fee/speed variants, TDS explanation, decline route and request states; a view showing scope | Establishes breadth, branch logic, the 50+ claim and what happens after the offer | Use the visible subset; state the reported count without implying verified coverage |
| **1** | Consistent original exports and product rules for deposit and transfer; exact bonus destinations, restrictions and rounding | Fixes the artifacts central to the financial-clarity argument | Label sample data/variants; any portfolio-only correction must be disclosed and cannot become shipped evidence |
| **2** | One concrete decision memory, preferably with a Figma version or PM/CEO message: who chose the leave-table moment or changed withdrawal choice/hierarchy, what changed, and why | Converts retrospective interpretation into attributable product judgment or collaboration | Keep the demonstrated final design; omit the invented decision history |
| **2** | Bounded delivery confirmation for the four areas: designed, handed over, implemented, and any important build change; one production capture if available | Establishes the outcome without requiring inaccessible analytics | Attribute delivery/shipping claims to the source; do not invent performance |
| **3** | Exact tournament baseline/final version, plus meaning of 40% and Winnings and final filter states | Makes the before/after and selection model accurate | Narrow to visible improvements; do not claim unchanged header, odds or complete filtering behaviour |

Useful memory prompts are specific: Was self-transfer placement yours or in the brief? Was the selected option a default or a state after input? Where could users see bonus restrictions? Why did the card become that tall? What did the PM or CEO materially change? What did engineering actually build? Record a recollection as a recollection, not as a contemporaneous note.

The existing branch correction is sufficient for “a few months on a retainer”; do not reopen settled client identity or ask for invoices unless exact dates become necessary. Do not spend recovery time seeking a generic testimonial, a fresh mockup, all fifty screens for display, tax-law prose, or a company-shutdown history. Recover a shutdown source only if you decide that statement genuinely belongs on the page.

## 10. The three highest-leverage next actions

1. **Recover the withdrawal flow and establish the rules behind the money.** Obtain the actual delivery board and a small representative branch set, plus bonus restrictions, rounding and fee/speed logic. This is the one recovery task most likely to reveal substantially stronger work than the current page shows.
2. **Resolve the evidence contradictions before designing the portfolio page.** Select consistent original exports for the deposit and leave-table calculations, establish tournament final versus variant, and record delivered versus implemented scope. Apply the already recorded retainer and client-relationship correction. Preserve provenance for any later presentation-only correction.
3. **Settle an evidence outline for the three episodes, incorporating one real decision memory if recoverable.** Map each claim to an artifact or attributed recollection; preserve withdrawal/self-transfer, deposits and tournament discovery in the main path; test the outline against a 90-second skim and a six-to-eight-minute read. Begin copy and layout only after that outline stands on the evidence.
