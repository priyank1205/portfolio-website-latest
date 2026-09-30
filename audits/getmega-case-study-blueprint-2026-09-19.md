# Getmega case-study blueprint

19 September 2026 · Implementation-ready specification. Not copy. Hand this to the model that builds the page together with `getmega-flagship-analysis-2026-09-19.md` (evidence) and the corrections in section 0.

---

## 0. Corrections that override the analysis

These come from Priyank on 19 September and win over anything in the analysis that conflicts.

1. **Getmega and Mega Poker stay separate case studies.** Mega Poker (2024) was a restructured, drastically changed company with a different CEO. That CEO had been Growth Head at Getmega, knew the work, and contacted Priyank directly. Retainer, 20 hours a month in roughly one week-long sprint, about 3 to 4 months. Treat as a later relationship signal only. Never "the same company rehired me". Never merge.
2. **The two pivots, accurately.** Original model: casual games in time-bounded tournaments, entry paid in gems, play as often as you like before close, top three split the pool; not near product-market fit. Pivot 1, late 2019, one to two months after joining: on-demand matchmaking (search for opponents, pooled entry fees, synchronous play, winner takes the pool) across three verticals, Casual, Card, Trivia; Trivia did best; liquidity was the structural problem. Pivot 2: cash tables (first called Instant): tables already running, join from the next hand, about six seats, sit with money, stakes per hand, rake per hand, leave when you like; applied to poker, rummy and casual; Trivia retired from this format; became the main money-making format. MTTs added later alongside cash tables as a funnel. **Not a third pivot.**
3. **Role across the pivots.** Repeatedly given the core flows each new model created: on-demand matchmaking, Instant / cash tables, MTTs, plus many other flows. Continuity of responsibility, not strategy ownership or organisational leadership.
4. **DAU.** Weekday DAU around 15k, later observed around 25k some time after the loyalty system launched. Chronology not reconstructable, effect not separable from other changes. No causation, no "engine", no experiment framing.
5. **Not user research.** The platform-hopping observation came from watching players stream on YouTube and Twitch, watching how they moved between products, and Priyank's own extensive play across real-money platforms. Call it player observation and domain immersion.
6. **New artifacts.** Four-stage on-demand flow from late 2019: matchmaking and match lock, pre-game lobby, in-game HUD (score, time remaining, rank), post-game leaderboard and winnings. These are Figma final designs for screens Priyank confirms shipped, not production captures. Now in `assets/images/getmega/` as `On Demad 1 - Finding opponents.png`, `On Demad 2 - Waiting in Lobby.png`, `On Demad 3 - Game with HUD.png`, `On Demad 4 - Leaderboard.png`.

---

## 1. Thesis and the two reading speeds

**Thesis (for the builder, not for the page verbatim):** Two years as the second product designer inside one real-money product whose business model changed twice. Each time the model changed, the core interaction changed with it, and Priyank was handed that core flow: on-demand matchmaking, then cash tables, then tournaments. Around those cores he designed the state systems and retention mechanisms a live-money product needs. Someone who saw that work from inside later hired him for a new company.

**Recruiter skim, 30 to 60 seconds:** summary block → hero board → timeline strip → the three episode headlines with their first figure → the coda line. That path must carry: second designer, two years, two model pivots, designed the core flow each time, dense state work, one qualified product outcome, one later relationship signal.

**Design-manager read, 5 to 8 minutes:** the same path plus every episode body, captions, the "how the work ran" block, the gallery, and the outcome limits.

**Target length:** about six minutes. Current page is eleven.

---

## 2. Section-by-section specification

### S1. Summary block (skim stop 1)

- **Purpose:** the entire argument in one block, before any image.
- **Content, in order:** one-line problem (a real-money gaming product looking for its model); role (second product designer, full time, 2019 to 2021); team (designers, PMs, engineers, CEO, in whichever wording section 6 settles); what was owned (on-demand flow, cash-table sit flow and buy-in, MTT surface, contest card system, loyalty and scratch-card mechanisms, wallet and history); strongest defensible facts, two lines: weekday DAU was around 15k during this period and was later observed around 25k; a team/product outcome whose relationship to the loyalty work cannot be isolated; a former Getmega growth head hired Priyank in 2024 for a different company.
- **Show vs say:** all say. No image in this block.
- **Reuse:** the pronoun note from the current CH 01 ("I" means flows driven end to end; "we" means the team) moves here, verbatim in spirit. It is the most senior sentence on the page.
- **Cut:** the outcome-data note, the "Chapter 06 keeps the score honest" line, the contents list as a feature (a plain jump list is fine).
- **Truth boundaries:** no "Senior". No "600 screens". No "engine". No "user research". "Second product designer" is the level claim; let it stand alone.
- **Weight:** set piece text, roughly 120 words.

### S2. Hero artifact (skim stop 2)

- **Purpose:** prove state-system capability in five seconds, and be a real artifact rather than a mockup.
- **Artifact:** `4b854647_states.png` (the thirteen-state board), full bleed, light on dark is fine as-is.
- **Show vs say:** show. One caption: what the board is (one contest card, thirteen states, core data anchored, badges, CTAs and trackers swap), and the board's own note that three Free/Paid variations were offered, quoted, not paraphrased into a story.
- **Cut:** `bb737df0_Getmega.jpg` (photoreal three-phone mockup). It shows no decision and its provenance is unknown. Also stop using it as the homepage thumbnail when the homepage is touched.
- **Truth boundaries:** do not describe the three variants. The frames are not available. The note is the evidence; the note is enough.
- **Weight:** set piece image.

### S3. Timeline strip (skim stop 3, replaces CH 01's T-01 to T-05 checklist)

- **Purpose:** make "two years inside one changing product" visible as a sequence, and name the two pivots exactly once on the page.
- **Content order:** five stops. (1) 2019, joined as second designer, product on timed gem tournaments, no artifact. (2) Late 2019, Pivot 1 to on-demand matchmaking, thumbnail: the on-demand HUD screen. (3) After that, Pivot 2 to cash tables, thumbnail: the buy-in sheet frame from the sit flow. (4) Later, MTTs added alongside, thumbnail: `35a817c2` cropped to its top half. (5) 2021, left; 2024 contacted by a former Getmega growth head for Mega Poker, no thumbnail, one line, links to the coda.
- **Show vs say:** each stop is a label (a year where one is confirmed, otherwise a relative label such as "after that" or "later"), one noun phrase, one thumbnail. No sentences. The strip is a table of contents made of product models.
- **Reuse:** the facts of T-02 and T-05 survive as strip labels. T-01 (real money on every screen) is context and goes. T-03 and T-04 (CEO reviews, team growth) move to S8.
- **Truth boundaries:** use relative order, not dates, for everything after Pivot 1. "Late 2019" for Pivot 1 is the only anchored date; 2019 (joined) and 2021 (left) are the tenure bounds. Do not assign a year to Pivot 2 or to the MTT addition; no source supports one. Do not use dates that appear inside screen UIs ("27 Aug 2019", "27 Jul 2020") as chronology; they are Figma placeholders and contradict the stated sequence. Do not present the March 2021 public relaunch as a pivot; it is not one of the two.
- **Weight:** skim device, one screen height at most.

### S4. Episode 1, set piece: three product models in two years

This is now the main episode. It has the only flow whose every screen is confirmed shipped, the only flow diagram, and the only animated artifact, and it is the argument no other page can make.

- **Purpose:** show that when the business model changed, the core interaction changed, and Priyank designed the new core each time. Make the reader understand why each model created a different interaction problem.
- **Structure:** what the model was → what broke → what replaced it → what was designed → shipped artifacts → the constraint that led to the next change. Used three times at decreasing length.

**1a. The model before (say only).** Two or three sentences: timed tournaments, gems, play until close, top three split the pool, not working. **No artifact.** Do not mock one up, do not use a stand-in screen.

**1b. Pivot 1: on-demand matchmaking (show).** Four new screens as a horizontal film, one per stage, one sentence each, in this order: matchmaking / searching and match lock → pre-game lobby → in-game HUD with score, time remaining, rank → post-game leaderboard and winnings. Caption the film once as final designs that shipped, late 2019. If Priyank supplies variants per stage, pick one representative screen per stage; put the rest in the gallery only if they show a different state (an error, a timeout), otherwise omit.
  - Say, in one short paragraph after the film: three verticals, Trivia worked best, the others less so, and the structural problem: the format needs enough compatible players searching at the same moment. This liquidity sentence is the hinge of the whole episode; it gets its own line, not a pull quote.
  - What the four screens show, for accurate captions: a named contest ("Wings Contest") with a five-minute window, 2 to 8 players and a pool that grows as players lock in ("Locking in 00:01"); a lobby with a five-second start and "Each of you gets 1 attempt"; a HUD with score, time remaining and rank ("4/8"); a results screen with current rank, score and current winnings while opponents are "Still playing". The results screen is labelled "Instant Winnings"; do not read that as the later "Instant" cash-table format.
  - **Truth boundaries:** the screens are Figma final designs, not production captures; Priyank confirms they shipped, so say "final designs that shipped" and never "production" or "captures". Do not claim numbers for Trivia. Do not describe player feedback.

**1c. Pivot 2: cash tables (show, biggest sub-section).**
  - Say first, briefly: the market signal (most Indian real-money spend going to poker and rummy) plus the liquidity problem led to a format where the game is already running and you join it. Name "Instant, later cash tables" once.
  - Artifact order: (i) `102b090c_Frame_427320186.png`, the sit flow diagram, full bleed showcase. Caption the branches: enough balance vs not enough, autojoin vs choose a seat, the buy-in step, cancel paths that land somewhere. (ii) `b6cb2746_1._Wallet.png`, small, single figure: the money the player sits with. One caption line. Do not explain the three-wallet structure in text; Mega Poker owns money-in and money-out. (iii) `00dcd3d8_Buy-in_slider_animation.gif`, the buy-in step zoomed in: the value label lifts above the thumb on press. This is the natural zoom from flow → step → interaction, and it moves the slider from figure 16 into the first minute of the page.
  - **Visual transition from 1b to 1c:** the on-demand film is linear (four steps, left to right, a game you wait for). The sit flow is a branching diagram into a table that is already running. Let that contrast be the visual argument; use the same figure-numbering and caption style on both so it reads as one designer's system. No arrows, no "before/after" labels, no decorative journey diagram.
  - Say once: cash tables became the main format and the main revenue format for most of the tenure. Trivia was retired from this format.
  - **Truth boundaries:** "many rounds of redesign" of the sit flow may be stated once as a fact; do not build an iteration story, no earlier versions exist. Do not quote rake percentages or table sizes beyond "about six seats". Trivia: the 2021 wallet screen in the gallery shows Trivia Game Passes, so say "retired from the cash-table format" rather than "retired" outright, unless Priyank says otherwise.

**1d. MTTs added (show, short).**
  - Artifact: `35a817c2_2._Arena_Details_Copy_37.png` cropped to the top: title, Registered state, countdown, 12/100 registered, prize pool. Crop out the rank-payout table (its figures do not sum to the pool).
  - Say: tournaments were added once cash tables were the core, drew strong participation, and funnelled players into cash tables. One sentence that the details page has a state per tournament stage. Hand off: the tournament's states and turn-keeping are Episode 2.
  - **Truth boundaries:** "not a third pivot" is a framing instruction, not page copy; just do not call it a pivot. "Pros / whales requested it" may stay as Priyank's account, one clause. No participation numbers.

- **Reuse / restore / cut / compress:** reuse the sit flow, wallet, slider, MTT details. Restore nothing from Notion here except the sharper phrasing of "fish" and "whales" if a poker-vocabulary line is wanted. Cut CH 02's pull quote about the handshake, CH 02's payment and history figures (gallery), CH 03's lobby and rebuy figures (gallery), the "Rules without a rulebook" annotation.
- **Weight:** the largest section on the page, roughly 40 percent of reading time.

### S5. Episode 2, set piece: states and turns

- **Purpose:** systems thinking and interaction judgment in a live-money product: one component that survives every situation, and one principle that keeps a player from losing a hand.
- **Content order:** (i) the thirteen-state board is already the hero; here, reference it and show a tight crop of three or four cards (Early bird, Joined and winning, Declaring results, Entry closes soon) so the swap logic is readable at body width. (ii) The turn-keeping trio, in this order: `4a7a5717_7.1_Menu_Options_Copy_66.png` (leaderboard with the player's row pinned at the bottom and "18 spots away from paid places"), `b953625a_7.1_Menu_Options_Copy_67.png` (stats sheet with the Your Turn / Play pill), then `d5983694_7._Play_Copy_73.png` and `dbf6ad9a_Currently_playing_-_popup.png` as a pair (floating bubble and the currently-playing sheet).
- **Show vs say:** show the artifacts; say the principle once: poker is turn-based, a missed turn folds the hand, so every surface a player might be looking at instead of the table has a way back that fires when it is their turn. Then let the three figures repeat the point without repeating the sentence.
- **Reuse:** current Detail 01 text is close to right; trim. The multi-tabling honesty callout stays, shortened to: this exact UI stayed a concept; a simpler multi-tabling feature shipped later. Drop "directly paved the way", "stress-tested our interaction patterns", "proved mobile poker did not have to be single-screen".
- **Cut:** "The craft file" as a chapter name and frame; "This is what design-at-scale actually looks like" in the board caption; the pull quote about waiting.
- **Truth boundaries:** the board's three-options note is quoted, not expanded. The contest card is described as a retention feature across game verticals (the board shows Carrom and Poker Mania), not as an MTT component. Do not say the card system was adopted across the app or by other designers; the "we paid for its absence as the team grew" reflection may stay in S9 as a reflection, without specifics that do not exist.
- **Weight:** second set piece, roughly 25 percent.

### S6. Episode 3, supporting: making players come back

- **Purpose:** show a retention mechanism designed as a system, grounded in an observation about how real-money players behave, with the outcome stated at its true strength.
- **Content order:** (i) the observation, said: real-money players move to wherever the tournaments are good and the opponents beatable, seen by watching players stream on YouTube and Twitch, watching them move between products, and playing extensively across platforms. Two sentences, first person, no method name. (ii) The product team's response, said in one sentence: a loyalty programme of gameplay-tied tasks; Priyank designed it end to end. (iii) Artifacts in mechanism order: `c582d16c_3.2_Task_complete_-_Milestones.png` (hero task with programmed swap and claim) → `7f653508_1.2_All_milestones_Copy_3_1.png` (milestone ladder 20, 50, 200, 500 hands) → `114f4553_4.1_Cashback_won_-_Claim_from_today.png` (one reward paid across seven daily claims). (iv) Scratch cards as the second mechanism, conceptualised by Priyank: `6f81aac1_temp_wallet_copy_43_1.png` (three tiers, unlock time, expiry) → `c8032c35_1.6_add_cash_copy_6_1.png` (card awarded at the deposit-success moment). (v) The number, last, one sentence: weekday DAU was around 15k during this period and was later observed around 25k; a team/product outcome not separable from other changes happening around the same time.
- **Show vs say:** the screens carry the mechanism; the text carries the observation and the limit. The mechanism is the evidence; the number is a footnote to it.
- **Reuse:** the three current captions for Figs. 11 to 13 are accurate and can be trimmed. "Three tiers, two timers" and "Earned, not given" captions are fine.
- **Cut:** "The real number" callout and the whole "engine" sentence. The pull quote "Five million installs and fifteen thousand weekday players". The "5M+ installs" line can appear once, in S1 or here, as the public figure it is.
- **Truth boundaries:** no "user research". No causation, no percentage, no "after the loyalty program" phrasing that implies sequence-as-cause. "Conceptualised the scratch-card system" is Priyank's claim from the Notion source; keep it as first person.
- **Weight:** supporting, roughly 15 percent.

### S7. Gallery, collapsed: the rest of the surface

- **Purpose:** breadth without length. Optional evidence for the deep read.
- **Artifacts, in order:** `15349737_2.1_Payment_Page_2.png` (payment modes; caption the "Low balance. You need ₹74 more" line), `444d1339_Group_427319798.png` (cash history as a signed ledger with a Processing state), `01e5d1d8_7._Lobby.png` and `f3de50b9_14._Rebuy_Info.png` (landscape re-layouts for the landscape games; keep "Rummy and Pool" as Priyank's account), `e25d1633_2_Final_2.png` and `0244195e_Unlock_success_2.png` (a 2021 growth experiment: features behind a minimum deposit; the success sheet suggests a first game), any on-demand variants that show a distinct state.
- **Cut from the page entirely:** `fd5142cb_2.2_2.png` and `49750288_2.1_2.png` (referral). They strengthen nothing.
- **Truth boundaries:** the gallery may carry a one-line note that the earlier screens use the dark language and the 2021 screens the light one, to explain the visual inconsistency. Do not present the eras as evidence of the pivots; they do not map to them.
- **Weight:** gallery, collapsed by default.

### S8. How the work ran (short, facts only)

- **Purpose:** the seniority facts, stated once, without adjectives.
- **Content:** three or four lines. Joined as the second product designer. Design reviews with the CEO ran daily. The design team grew to N by the time Priyank left and he helped run the hiring pipeline. For most of the two years he held the product-to-engineering context for the flows he designed.
- **Show vs say:** say. No artifact exists.
- **Cut:** every second and third repetition of "conduit", "daily CEO reviews", "two pivots", "600 screens" elsewhere on the page. Each fact appears here once and in S1 at most.
- **Truth boundaries:** no episode of a review changing a decision (none is recorded; do not imply one). No "shaped how the team worked" without a specific. "Helped run the hiring pipeline" stays as stated. Pick one team-size statement; the Notion team property lists three designers in the immediate squad and the body copy says ten, so the page must not carry both (see checklist).
- **Weight:** short block, roughly 60 words.

### S9. Outcome and limits, once

- **Purpose:** close honestly in one place.
- **Content:** what shipped (list of five); what the numbers say and do not say (5M+ public installs; DAU as in S6, one line); three "what I'd do differently" bullets kept from the current page: build the component system earlier, brief retention mechanics and responsible-play guardrails together, write decisions down. Drop the multi-table testing bullet or keep it; it is honest either way.
- **Cut:** "Two pivots shipped without the design function becoming the bottleneck"; "Fin."; the three-column scorecard format if the site is moving away from it (content survives as two short lists).
- **Weight:** short.

### S10. Coda: a later signal

- **Purpose:** the relationship signal, correctly scoped, and the handoff to the Mega Poker page.
- **Content:** two or three sentences. In 2024 the CEO of Mega Poker, who had been Growth Head at Getmega and knew this work from inside, contacted Priyank directly to work on Mega Poker's money flows on a monthly retainer. Link to the Mega Poker case study.
- **Show vs say:** say. No image, or the Mega Poker card thumbnail as a link.
- **Truth boundaries:** not the same company, not a rehire, not "they called back". Mega Poker is described as a different, restructured company with a different CEO. Duration "a few months on a monthly retainer"; do not state a number of months on this page.
- **Weight:** coda, under 60 words.

---

## 3. Final section order

1. Summary block
2. Hero: thirteen-state board
3. Timeline strip (five stops)
4. Episode 1: three product models in two years (1a model before · 1b on-demand · 1c cash tables · 1d MTTs added)
5. Episode 2: states and turns
6. Episode 3: making players come back
7. How the work ran
8. Outcome and limits
9. Coda: a later signal → Mega Poker
10. Gallery (collapsed; may sit between 6 and 7 if the template needs it above the fold of the closing sections)
11. Next case study

Default skim path: 1, 2, 3, the first figure and headline of 4, 5, 6, then 9. Everything else is the deep read.

---

## 4. Exact artifact order within each major episode

**Episode 1**
1. (no artifact) timed-tournament model, text only
2. `On Demad 1 - Finding opponents.png` matchmaking / match lock
3. `On Demad 2 - Waiting in Lobby.png` pre-game lobby
4. `On Demad 3 - Game with HUD.png` in-game HUD (score, time, rank)
5. `On Demad 4 - Leaderboard.png` post-game leaderboard / winnings
6. `102b090c_Frame_427320186.png` sit flow, full bleed
7. `b6cb2746_1._Wallet.png` wallet, small
8. `00dcd3d8_Buy-in_slider_animation.gif` buy-in slider
9. `35a817c2_2._Arena_Details_Copy_37.png` MTT details, top crop

**Episode 2**
1. `4b854647_states.png` crop of three or four cards (full board is the hero)
2. `4a7a5717_7.1_Menu_Options_Copy_66.png` pinned leaderboard row
3. `b953625a_7.1_Menu_Options_Copy_67.png` Your Turn pill in the stats sheet
4. `d5983694_7._Play_Copy_73.png` + `dbf6ad9a_Currently_playing_-_popup.png` multi-table concept pair, with the concept note

**Episode 3**
1. `c582d16c_3.2_Task_complete_-_Milestones.png` hero task
2. `7f653508_1.2_All_milestones_Copy_3_1.png` milestone ladder
3. `114f4553_4.1_Cashback_won_-_Claim_from_today.png` seven-day claim
4. `6f81aac1_temp_wallet_copy_43_1.png` scratch tiers
5. `c8032c35_1.6_add_cash_copy_6_1.png` scratch card at deposit success

**Gallery:** `15349737`, `444d1339`, `01e5d1d8`, `f3de50b9`, `e25d1633`, `0244195e`, on-demand variants if any.

**Removed from the page:** `bb737df0_Getmega.jpg`, `fd5142cb_2.2_2.png`, `49750288_2.1_2.png`.

---

## 5. Asset and action checklist (only what is still needed)

1. **On-demand screens: done.** The four files are in `assets/images/getmega/`. The builder may rename them (the names contain spaces and the typo "Demad") but must keep the stage order.
2. **Settle the team-size sentence.** One statement only: either "grew to ten by the time I left" or the squad numbers. Confirm "helped run the hiring pipeline" is the wording to keep.
3. **Crop the MTT details figure** above the rank-payout table (payouts sum to more than the pool), and either drop the landscape lobby from the gallery or accept that its prize pool differs from the portrait lobby's.
4. **Confirm the Trivia line.** Default if unconfirmed: "retired from the cash-table format", because the 2021 wallet screen in the gallery shows Trivia passes.

Not needed: the three Free/Paid variant frames (the note is the evidence), a CEO-review reversal (none exists; the page will not claim one), earlier sit-flow versions (no iteration story), a DAU window (reframed), a research method (reframed), production captures (the on-demand screens are final designs that shipped, which is enough), hero provenance (the hero is cut).

Follow-ups outside this page, for later passes: the Mega Poker page's meta block (duration to "a few months, retainer", the client line, and the "shut after the ban" sentence, which is contradicted by the December 2024 Play listing removal); the homepage Getmega card (proof line and thumbnail); the About timeline.

---

## 6. Dropped from the earlier analysis

- **Merging Getmega and Mega Poker**, the "same company called back" coda, and the "three of three clients rehired, one being the former employer" line. Replaced by the S10 relationship signal. The strategy doc's "two of three freelance clients came back" (CEDA, Khiladipro) stands as it was.
- **Episode 3 candidates** (pivot-through-artifacts vs sit-flow rounds). Resolved: the pivot story is Episode 1 with real content and a confirmed-shipped flow; there is no sit-flow iteration story.
- **Artifact dates as chronology** ("MTT 27 Aug 2019", "scratch cards 27 Jul 2020"). They contradict the stated sequence (on-demand in late 2019, cash tables after, MTTs after that) and are Figma placeholders. Do not use.
- **Dark and light eras as pivot evidence.** The eras track the 2021 public relaunch, not the two model pivots. Demoted to a one-line gallery note.
- **Recovery asks** for the DAU window, the research method, a CEO-review reversal, the three card variants, earlier sit-flow rounds, the shipped multi-tabling feature, and production captures. Resolved, reframed, or no longer load-bearing.
- **"The March 2021 campaign is a confounder" as a page concern.** Moot once the number is stated as a non-attributed team outcome.
- **The claim that the Getmega page's wallet chapter duplicates Mega Poker's.** Both pages keep wallets; the Getmega page shows one wallet figure as "what the player sits with" and never explains money-in or money-out.
